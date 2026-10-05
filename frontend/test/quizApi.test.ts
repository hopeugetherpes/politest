import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { t } from '../src/i18n';

let api: typeof import('../src/services/quizApi');
const fetchMock = vi.fn<typeof fetch>();

beforeEach(async () => {
  vi.resetModules();
  vi.stubEnv('VITE_API_URL', '');
  vi.stubGlobal('fetch', fetchMock);
  fetchMock.mockReset();
  api = await import('../src/services/quizApi');
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe('quiz API connection', () => {
  it.each(['short', 'extended', 'extreme'] as const)('loads the %s format from the API', async (variant) => {
    const payload = { variant, questions: [] };
    fetchMock.mockResolvedValue(new Response(JSON.stringify(payload), { headers: { 'Content-Type': 'application/json' } }));
    await expect(api.fetchQuiz(variant)).resolves.toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(`/api/quiz?variant=${variant}&lang=en`, { headers: undefined });
  });

  it('uses the configured backend origin without surrounding spaces or trailing slashes', async () => {
    vi.stubEnv('VITE_API_URL', ' https://backend.example.test/// ');
    vi.resetModules();
    api = await import('../src/services/quizApi');
    fetchMock.mockResolvedValue(new Response('{}'));
    await api.fetchQuiz();
    expect(fetchMock).toHaveBeenCalledWith('https://backend.example.test/api/quiz?variant=short&lang=en', { headers: undefined });
  });

  it('submits answers and the selected variant to the results endpoint', async () => {
    const answers = [{ questionId: 'question-1', answer: 'AGREE' as const }];
    const result = { axes: [], topMatch: { ideologyId: 'example' } };
    fetchMock.mockResolvedValue(new Response(JSON.stringify(result)));
    await expect(api.submitResults('short', answers)).resolves.toEqual(result);
    expect(fetchMock).toHaveBeenCalledWith('/api/results?lang=en', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variant: 'short', answers, archetype: {} })
    });
  });

  it.each([200, 503])('reports a service error for an HTML response with status %s', async (status) => {
    fetchMock.mockResolvedValue(new Response('<!doctype html><html>Frontend fallback</html>', {
      status, headers: { 'Content-Type': 'text/html; charset=utf-8' }
    }));
    await expect(api.fetchQuiz()).rejects.toThrow(t.errApiUnavailable);
  });

  it('reports a service error for malformed JSON', async () => {
    fetchMock.mockResolvedValue(new Response('{not JSON}', { headers: { 'Content-Type': 'application/json' } }));
    await expect(api.fetchQuiz()).rejects.toThrow(t.errApiUnavailable);
  });

  it('reports a service error when the network or CORS blocks the request', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));
    await expect(api.fetchQuiz()).rejects.toThrow(t.errApiUnavailable);
  });

  it('preserves a useful JSON error returned by the backend', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ message: 'Origin is not allowed' }), { status: 403 }));
    await expect(api.fetchQuiz()).rejects.toThrow('Origin is not allowed');
  });
});
