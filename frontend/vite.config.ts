import { defineConfig } from 'vitest/config';
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

export default defineConfig({
  plugins: [react(), asyncCssLinkPlugin(), catalogueDevPlugin()],
  test: { environment: 'node' },
  server: { port: 5173, strictPort: true }
});
