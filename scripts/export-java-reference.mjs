// Optional maintainer tool. Run the Java reference with origin checks and rate limits
// disabled on localhost, then export synthetic fixtures. Not part of a Vercel build.
import { writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { axes, axisIds, questions, archetypes, ideologyProfiles, countryProfiles, personalityProfiles } from '../server/data.mjs';
import { catalogs } from '../server/matching.mjs';

const base = process.argv[2] ?? 'http://127.0.0.1:8080';
const cases = [];
const canonical = value => Array.isArray(value) ? value.map(canonical) : value && typeof value === 'object'
  ? Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])])) : value;
const digest = value => createHash('sha256').update(JSON.stringify(canonical(value))).digest('hex');
const neutral = axisIds.map(() => 50);
const addValues = (label, values, religion) => cases.push({ operation: 'values', label, values, ...(religion ? { religion } : {}) });

for (const variant of ['short', 'extended', 'extreme']) {
  cases.push({ operation: 'quiz', label: `quiz:${variant}`, variant });
  const perAxis = variant === 'short' ? 3 : variant === 'extended' ? 5 : 20;
  const selected = axes.flatMap(axis => questions.filter(question => question.axisId === axis.id).slice(0, perAxis));
  for (const answer of ['STRONGLY_AGREE', 'AGREE', 'NEUTRAL', 'DISAGREE', 'STRONGLY_DISAGREE']) {
    cases.push({ operation: 'answers', label: `${variant}:${answer}`, request: {
      variant, answers: selected.map(question => ({ questionId: question.id, answer })), archetype: {}
    } });
  }
}
for (const question of archetypes) {
  for (const option of question.options) {
    const selected = axes.flatMap(axis => questions.filter(candidate => candidate.axisId === axis.id).slice(0, 3));
    cases.push({ operation: 'answers', label: `archetype:${question.id}:${option.id}`, request: {
      variant: 'short', answers: selected.map(candidate => ({ questionId: candidate.id, answer: 'NEUTRAL' })), archetype: { [question.id]: option.id }
    } });
  }
}
for (const [type, profiles] of [['ideology', ideologyProfiles], ['country', countryProfiles], ['personality', personalityProfiles]]) {
  for (const [id, profile] of profiles) addValues(`profile:${type}:${id}`, axisIds.map(axis => profile.vector[axis]));
  cases.push({ operation: 'catalog', label: `catalog:${type}`, type });
  for (const item of catalogs[type].items.slice(0, 6)) {
    cases.push({ operation: 'compare', label: `compare:${type}:${item.id}`, type, id: item.id, values: neutral });
  }
}
for (const value of [0, 25, 42.49, 42.5, 49.99, 50, 50.05, 57.49, 57.5, 75, 100]) addValues(`uniform:${value}`, axisIds.map(() => value));
for (let i = 0; i < axisIds.length; i++) {
  for (const value of [0, 100]) addValues(`one-axis:${axisIds[i]}:${value}`, neutral.map((n, index) => index === i ? value : n));
}
let seed = 0x504f4c49;
const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
for (let i = 0; i < 80; i++) addValues(`random:${i}`, axisIds.map(() => Math.round(random() * 1000) / 10));
for (const religion of ['catholic', 'protestant', 'orthodox', 'judaism', 'islam', 'buddhism', 'christianity', 'other']) {
  cases.push({ operation: 'compareCatalog', label: `compareCatalog:${religion}`, religion });
  for (const value of [20, 50, 80]) addValues(`religion:${religion}:${value}`, axisIds.map(() => value), religion);
}
cases.push({ operation: 'compareCatalog', label: 'compareCatalog:unfiltered' });

const responses = [];
for (let index = 0; index < cases.length; index++) {
  const fixture = cases[index];
  const religion = fixture.religion ? `&religion=${fixture.religion}` : '';
  let path, options;
  switch (fixture.operation) {
    case 'quiz': path = `/api/quiz?variant=${fixture.variant}`; break;
    case 'answers': path = '/api/results?lang=en' + religion; options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(fixture.request) }; break;
    case 'values': path = '/api/results/by-axes?v=' + fixture.values.join(',') + religion; break;
    case 'compareCatalog': path = '/api/compare/catalog?lang=en' + religion; break;
    case 'compare': path = `/api/compare?type=${fixture.type}&id=${fixture.id}&v=${fixture.values.join(',')}`; break;
    case 'catalog': path = '/api/' + { ideology: 'ideologies', country: 'countries', personality: 'personalities' }[fixture.type]; break;
  }
  const response = await fetch(base + path, options);
  if (!response.ok) throw new Error(`${fixture.label}: HTTP ${response.status} ${await response.text()}`);
  const result = await response.json();
  fixture.sha256 = digest(result);
  if (process.env.REFERENCE_DEBUG_FILE) responses.push(result);
  if ((index + 1) % 100 === 0) console.log(`Java reference: ${index + 1}/${cases.length}`);
}
mkdirSync(new URL('../server/test/fixtures/', import.meta.url), { recursive: true });
const reference = 'Java 21 engine in backend/, commit 61701eee2bba3b9229d646bdfddc472954bf2226';
const generatedFrom = 'Synthetic answers, catalog vectors and deterministic seeded inputs; no visitor data.';
writeFileSync(new URL('../server/test/fixtures/java-reference.json', import.meta.url),
  `{"reference":${JSON.stringify(reference)},\n"generatedFrom":${JSON.stringify(generatedFrom)},\n"cases":[\n` +
  cases.map(fixture => JSON.stringify(fixture)).join(',\n') + '\n]}\n');
if (process.env.REFERENCE_DEBUG_FILE) writeFileSync(process.env.REFERENCE_DEBUG_FILE, JSON.stringify(responses));
console.log(`Exported ${cases.length} Java reference responses.`);
