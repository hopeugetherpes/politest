import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import handler from '../http.mjs';
import { axes, questions, archetypes } from '../data.mjs';

test('same-origin API supports all quiz formats, results, shared links and comparisons', async () => {
  const server = createServer(handler);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const get = path => fetch(base + path);
  try {
    for (const [variant, count] of [['short', 36], ['extended', 60], ['extreme', 240]]) {
      const response = await get(`/api/quiz?variant=${variant}`);
      assert.equal(response.status, 200);
      assert.match(response.headers.get('content-type'), /application\/json/);
      const metadata = await response.json();
      assert.equal(metadata.title, 'Politest');
      assert.equal(metadata.questionCount, count);
      assert.equal(metadata.questions.length, 240);
      const answers = axes.flatMap(axis => questions.filter(question => question.axisId === axis.id).slice(0, count / 12))
        .map(question => ({ questionId: question.id, answer: 'NEUTRAL' }));
      const response2 = await fetch(base + '/api/results', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ variant, answers, archetype: {} }) });
      assert.equal(response2.status, 200);
      assert.equal(response2.headers.get('cache-control'), 'no-store');
      const result = await response2.json();
      assert.equal(result.axes.length, 12);
      assert.equal(result.topMatch.ideologyId, 'centrismo-radical');
      const values = result.axes.map(axis => axis.leftPercent).join(',');
      assert.deepEqual(await (await get('/api/results/by-axes?v=' + values)).json(), result);
      const compared = await (await get(`/api/compare?type=ideology&id=${result.topMatch.ideologyId}&v=${values}`)).json();
      assert.equal(compared.compatibility, result.topMatch.compatibility);
      assert.equal(compared.item.id, result.topMatch.ideologyId);
    }
    const rewritten = await get('/api/handler?__route=quiz&variant=extreme');
    assert.equal((await rewritten.json()).questionCount, 240);
    const catalog = await (await get('/api/compare/catalog?religion=judaism')).json();
    assert.ok(catalog.length > 100);
    assert.ok(catalog.some(item => item.type === 'personality'));
    assert.ok(catalog.some(item => item.type === 'country'));
    assert.ok(catalog.some(item => item.type === 'ideology'));
    assert.deepEqual(await (await get('/api/health')).json(), { status: 'ok' });
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});

test('invalid requests produce JSON errors and never fall back to the frontend', async () => {
  const server = createServer(handler);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const neutral = Array(12).fill(50).join(',');
  try {
    for (const [path, status, options] of [
      ['/api/unknown', 404], ['/api/quiz?variant=bad', 400], ['/api/results', 405],
      ['/api/results/by-axes', 400], ['/api/results/by-axes?v=50,50', 400],
      ['/api/results/by-axes?v=101,' + Array(11).fill(50).join(','), 400],
      ['/api/results/by-axes?v=NaN,' + Array(11).fill(50).join(','), 400],
      [`/api/compare?type=unknown&id=none&v=${neutral}`, 400],
      [`/api/compare?type=country&id=missing&v=${neutral}`, 404],
      ['/api/countries/missing', 404],
      ['/api/results', 415, { method: 'POST', body: '{}' }],
      ['/api/results', 400, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' }],
      ['/api/results', 400, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"answers":[]}' }],
      ['/api/results', 413, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ padding: 'a'.repeat(65536) }) }]
    ]) {
      const response = await fetch(base + path, options);
      assert.equal(response.status, status, path);
      assert.match(response.headers.get('content-type'), /application\/json/);
      assert.equal(typeof (await response.json()).message, 'string');
    }
    const answers = axes.flatMap(axis => questions.filter(question => question.axisId === axis.id).slice(0, 3))
      .map(question => ({ questionId: question.id, answer: 'NEUTRAL' }));
    for (const request of [
      { answers: [{ questionId: 'missing', answer: 'NEUTRAL' }] },
      { answers: [{ questionId: questions[0].id, answer: 'missing' }] },
      { answers, archetype: { [archetypes[0].id]: 'missing' } },
      { answers, archetype: [] }, { answers: [answers[0]] }
    ]) {
      const response = await fetch(base + '/api/results', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(request) });
      assert.equal(response.status, 400);
      assert.equal(typeof (await response.json()).message, 'string');
    }
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
