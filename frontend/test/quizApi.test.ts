import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { quiz, resultByValues } from '../../server/engine.mjs';

const fetchMock = vi.fn(() => { throw new Error('No API requests are allowed'); });

beforeEach(() => {
  vi.resetModules();
  vi.stubGlobal('fetch', fetchMock);
  fetchMock.mockClear();
});
afterEach(() => vi.unstubAllGlobals());

describe('local quiz service', () => {
  it.each(['short', 'extended', 'extreme'] as const)('loads the %s format without an API', async variant => {
    const service = await import('../src/services/quizApi');
    const result = await service.fetchQuiz(variant);
    expect(result).toEqual(quiz(variant));
    expect(result.questionCount).toBe(variant === 'short' ? 36 : variant === 'extended' ? 60 : 240);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('reconstructs shared results and comparisons without network requests', async () => {
    const service = await import('../src/services/quizApi');
    const values = [65, 80, 35, 30, 20, 75, 40, 70, 35, 15, 75, 60];
    const result = await service.fetchSharedResult(values, 'judaism');
    expect(result).toEqual(resultByValues(values, 'judaism'));
    const catalog = await service.fetchCompareCatalog('judaism');
    expect(catalog.length).toBeGreaterThan(500);
    const detail = await service.fetchCompare(catalog[0].type, catalog[0].id, values);
    expect(detail.item.id).toBe(catalog[0].id);
    expect(detail.compatibility).toBeGreaterThanOrEqual(0);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('scores all 240 answers locally', async () => {
    const service = await import('../src/services/quizApi');
    const payload = await service.fetchQuiz('extreme');
    const answers = payload.questions.map(question => ({ questionId: question.id, answer: 'AGREE' as const }));
    const result = await service.submitResults('extreme', answers, { sociedade: 'A' });
    expect(result.axes).toHaveLength(12);
    expect(result.matches).toHaveLength(4);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns a localized error for invalid input', async () => {
    vi.stubGlobal('window', { location: { pathname: '/fr' } });
    const service = await import('../src/services/quizApi');
    await expect(service.fetchSharedResult([101])).rejects.toThrow('Impossible de calculer le résultat.');
  });

  it('translates questions, answer options, comparisons and results on French paths', async () => {
    vi.stubGlobal('window', { location: { pathname: '/fr/240questions' } });
    const service = await import('../src/services/quizApi');
    const payload = await service.fetchQuiz('extreme');
    expect(payload.questions[0].text).toContain('gouvernements régionaux');
    expect(payload.answerOptions.map(option => option.label)).toEqual(['Tout à fait d’accord', 'D’accord', 'Neutre ou cela dépend', 'Pas d’accord', 'Pas du tout d’accord']);
    const result = await service.fetchSharedResult(Array(12).fill(50));
    expect(result.axes[0].intensity).toBe('Équilibré');
    expect(result.axes[1].label).toBe('Représentation');
    expect(result.topMatch.longDescription).toContain('La compatibilité indique');
    const catalog = await service.fetchCompareCatalog();
    const netherlands = catalog.find(item => item.name === 'Pays-Bas')!;
    expect(netherlands.type).toBe('country');
    const detail = await service.fetchCompare(netherlands.type, netherlands.id, Array(12).fill(50));
    expect(detail.item.name).toBe('Pays-Bas');
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
