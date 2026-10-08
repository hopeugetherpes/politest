import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createServer, type ViteDevServer } from 'vite';
import { catalogueDevPlugin } from '../scripts/catalogue-dev';

describe('local catalogue navigation', () => {
  let server: ViteDevServer;
  let base: string;

  beforeAll(async () => {
    server = await createServer({
      configFile: false,
      root: fileURLToPath(new URL('..', import.meta.url)),
      plugins: [catalogueDevPlugin()],
      optimizeDeps: { noDiscovery: true },
      server: { host: '127.0.0.1', port: 0 }
    });
    await server.listen();
    base = server.resolvedUrls!.local[0];

    // A cold cache generates every catalogue page; allow extra time on CI runners.
    const response = await fetch(`${base}ideologies`);
    expect(response.status).toBe(200);
    await response.text();
  }, 60_000);

  afterAll(async () => {
    server?.httpServer?.closeAllConnections();
    await server?.close();
  });

  it.each(['ideologies', 'personalities', 'countries'])('serves the English %s catalog instead of the quiz homepage', async (catalogue) => {
      const response = await fetch(`${base}${catalogue}`);
      const html = await response.text();
      expect(response.status).toBe(200);
      expect(html).toContain('<html lang="en">');
      expect(html).toContain('aria-current="page"');
      expect(html).not.toContain('/src/main.tsx');
      expect(html).toContain(`/${catalogue}/`);
  });

  it.each(['ideologies', 'personalities', 'countries'])('serves the French %s catalog and preserves localized navigation', async catalogue => {
    const response = await fetch(`${base}fr/${catalogue}`);
    const html = await response.text();
    expect(response.status).toBe(200);
    expect(html).toContain('<html lang="fr">');
    expect(html).toContain(`href="/fr/${catalogue}/`);
    expect(html).toContain('English 🇬🇧');
    expect(html).not.toContain('/src/main.tsx');
  });

  it('redirects former English paths and preserves query parameters', async () => {
    for (const path of ['en', 'en/personalities/donald-trump', 'en/countries?search=test']) {
      const response = await fetch(base + path, { redirect: 'manual' });
      expect(response.status).toBe(308);
      expect(response.headers.get('location')).toBe(path.replace(/^en/, '') || '/');
    }
  });

  it('serves detail pages, clean URL aliases and generated styles', async () => {
    for (const path of ['en/personalities/donald-trump', 'personalities.html', 'en/countries/?search=test', 'profile.css']) {
      const response = await fetch(base + path);
      expect(response.status).toBe(200);
      expect(await response.text()).not.toContain('/src/main.tsx');
    }
    expect((await fetch(base + 'profile.css')).headers.get('content-type')).toContain('text/css');
  });

  it('keeps the quiz homepage and returns 404 for missing catalogue entries', async () => {
    expect(await (await fetch(base)).text()).toContain('/src/main.tsx');
    expect((await fetch(base + 'en/personalities/nonexistent-profile')).status).toBe(404);
  });
});
