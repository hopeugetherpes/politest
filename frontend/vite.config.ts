import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { catalogueDevPlugin } from './scripts/catalogue-dev';

function asyncCssLinkPlugin() {
  return {
    name: 'async-css-link',
    apply: 'build' as const,
    transformIndexHtml(html: string) {
      return html.replace(
        /<link rel="stylesheet" crossorigin href="([^"]+\.css)">/g,
        `<link rel="stylesheet" crossorigin href="$1" media="print" onload="this.media='all'">
    <noscript><link rel="stylesheet" crossorigin href="$1"></noscript>`
      );
    }
  };
}

export default defineConfig(({ mode }) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const cwd = (globalThis as { process?: { cwd: () => string } }).process?.cwd?.() ?? '.';
  const env = loadEnv(mode, cwd, '');
  const proxyTarget = env.VITE_API_PROXY_TARGET || 'http://localhost:8080';

  return {
    plugins: [react(), asyncCssLinkPlugin(), catalogueDevPlugin()],
    test: {
      environment: 'node',
    },
    server: {
      // Run `npm run api:dev` at the repository root to serve the integrated API.
      port: 5173,
      strictPort: true,
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: true
        }
      }
    }
  };
});
