import { describe, expect, it } from 'vitest';
import { localize } from '../src/i18n/catalog.mjs';
import french from '../src/i18n/catalog-fr.json';
import { fr } from '../src/i18n/fr';
import { languageForPath, localePath, unprefixedPath } from '../src/i18n/locale';
import { quiz, resultByValues, compareCatalog } from '../../server/engine.mjs';
import axes from '../../backend/src/main/resources/data/axes.json';
import questions from '../../backend/src/main/resources/data/questions-pool.json';
import ideologies from '../../backend/src/main/resources/data/ideologies.json';
import countries from '../../backend/src/main/resources/data/countries.json';
import personalities from '../../backend/src/main/resources/data/personalities.json';
import books from '../../backend/src/main/resources/data/books.json';

const dictionary: Record<string, string> = french;

describe('complete French localization', () => {
  it('has a nonempty French snapshot for every visible catalog field', () => {
    for (const [items, fields] of [
      [axes, ['label', 'leftPole', 'rightPole']],
      [questions, ['text']],
      [ideologies, ['name', 'category', 'description', 'phrase']],
      [countries, ['name', 'category', 'description']],
      [personalities, ['role', 'description']]
    ] as const) {
      for (const item of items) for (const field of fields) {
        const source = (item as unknown as Record<string, string>)[field];
        expect(dictionary[source], `${item.id}/${field}`).toBeTruthy();
      }
    }
    for (const book of books) expect(dictionary[book.title.en], book.personalityId).toBeTruthy();
    const payload = quiz('extreme');
    for (const item of payload.archetypeQuestions ?? []) {
      expect(dictionary[item.label]).toBeTruthy();
      expect(dictionary[item.text]).toBeTruthy();
      for (const option of item.options) expect(dictionary[option.text]).toBeTruthy();
    }
    expect(questions).toHaveLength(240);
  });

  it('keeps question identity, polarity, weight and order unchanged', () => {
    const en = quiz('extreme');
    const translated = localize(en);
    expect(translated.questions.map(({ id, axisId, agreePole, weight }) => ({ id, axisId, agreePole, weight }))).toEqual(en.questions.map(({ id, axisId, agreePole, weight }) => ({ id, axisId, agreePole, weight })));
    expect(translated.archetypeQuestions?.map(item => [item.id, item.options.map(option => option.id)])).toEqual(en.archetypeQuestions?.map(item => [item.id, item.options.map(option => option.id)]));
    expect(en.questions[0].text).toBe(questions[0].text);
  });

  it.each([{ values: Array(12).fill(50) }, { values: [1, 99, 25, 80, 10, 76, 35, 60, 5, 100, 20, 66] }])('preserves every number and identifier in results while translating text', ({ values }) => {
    const result = resultByValues(values, 'islam');
    const original = JSON.stringify(result);
    const translated = localize(result);
    function numbers(value: unknown, key = ''): unknown {
      if (Array.isArray(value)) return value.map(item => numbers(item));
      if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, numbers(item, key)]));
      return typeof value === 'string' && !/Id$|^id$|imagePath|flagPath|dimension$|^url$/.test(key) ? '<text>' : value;
    }
    expect(numbers(translated)).toEqual(numbers(result));
    expect(JSON.stringify(result)).toBe(original);
  });

  it('preserves internal category and icon keys', () => {
    expect(fr.discoveryItems.map(item => item.icon)).toEqual(['ideology','country','personality','spectrum','profile','compatibility']);
    expect(fr.spectrumItems.map(item => item.id)).toEqual(['left-radical','left','center','right','right-extreme','third-position','libertarian','anarchist']);
    const catalog = compareCatalog(null);
    expect(localize(catalog).map(item => [item.type, item.id])).toEqual(catalog.map(item => [item.type, item.id]));
  });

  it('maps localized routes without losing the shared-result path', () => {
    expect(languageForPath('/fr/results')).toBe('fr');
    expect(languageForPath('/france')).toBe('en');
    expect(localePath('/results', 'fr')).toBe('/fr/results');
    expect(localePath('/fr/countries/france', 'en')).toBe('/countries/france');
    expect(unprefixedPath('/fr/240questions.html')).toBe('/240questions');
  });
});
