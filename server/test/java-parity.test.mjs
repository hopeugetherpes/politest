import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { quiz, resultByAnswers, resultByValues, compare, compareCatalog } from '../engine.mjs';
import { catalogs } from '../matching.mjs';

const fixtures = JSON.parse(readFileSync(new URL('./fixtures/java-reference.json', import.meta.url), 'utf8'));
const canonical = value => Array.isArray(value) ? value.map(canonical) : value && typeof value === 'object'
  ? Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])])) : value;
const digest = value => createHash('sha256').update(JSON.stringify(canonical(value))).digest('hex');

test('complete API responses match the original Java engine', () => {
  assert.ok(fixtures.cases.length >= 1000, 'Reference includes every catalog vector and all three formats');
  for (const fixture of fixtures.cases) {
    let result;
    switch (fixture.operation) {
      case 'quiz': result = quiz(fixture.variant); break;
      case 'answers': result = resultByAnswers(fixture.request, fixture.religion); break;
      case 'values': result = resultByValues(fixture.values, fixture.religion); break;
      case 'compareCatalog': result = compareCatalog(fixture.religion); break;
      case 'compare': result = compare(fixture.type, fixture.id, fixture.values); break;
      case 'catalog': result = catalogs[fixture.type].items; break;
      default: throw new Error('Unknown fixture operation');
    }
    assert.equal(digest(result), fixture.sha256, `Java response differs for ${fixture.label}`);
  }
});
