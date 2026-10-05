import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import handler from './http.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../frontend/dist');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8' };
const port = Number(process.env.PORT ?? 8080);
const host = process.env.HOST ?? '127.0.0.1';

createServer((request, response) => {
  const url = new URL(request.url, 'http://localhost');
  if (url.pathname === '/api' || url.pathname.startsWith('/api/')) return handler(request, response);
  // A production preview of the same-origin app; Vite can proxy to this API in dev mode.
  let path;
  try { path = resolve(root, '.' + decodeURIComponent(url.pathname)); }
  catch { response.writeHead(400).end(); return; }
  if (!path.startsWith(root + sep) && path !== root) { response.writeHead(403).end(); return; }
  const isFile = value => existsSync(value) && statSync(value).isFile();
  if (!isFile(path)) path = isFile(path + '.html') ? path + '.html' : resolve(root, 'index.html');
  if (!isFile(path)) { response.writeHead(404).end('Run npm run build to preview the frontend.'); return; }
  response.setHeader('Content-Type', types[extname(path)] ?? 'application/octet-stream');
  createReadStream(path).pipe(response);
}).listen(port, host, () => console.log(`Politest listening on http://${host}:${port}`));
