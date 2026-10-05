import { ApiError } from './scoring.mjs';
import { quiz, resultByAnswers, resultByValues, compareCatalog, compare } from './engine.mjs';
import { catalogs } from './matching.mjs';

const maxBodyBytes = 64 * 1024;

async function readBody(request) {
  if (request.body !== undefined) {
    const serialized = typeof request.body === 'string' ? request.body : JSON.stringify(request.body);
    if (Buffer.byteLength(serialized) > maxBodyBytes) throw new ApiError(413, 'Request body is too large');
    try { return typeof request.body === 'string' ? JSON.parse(request.body) : request.body; }
    catch { throw new ApiError(400, 'Invalid JSON'); }
  }
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += bytes.length;
    if (size > maxBodyBytes) throw new ApiError(413, 'Request body is too large');
    chunks.push(bytes);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { throw new ApiError(400, 'Invalid JSON'); }
}

export function routePath(request, url) {
  // Vercel may expose either the original URL or the rewritten function URL.
  if (url.pathname === '/api/handler') {
    const route = request.query?.__route ?? url.searchParams.get('__route');
    if (typeof route !== 'string') throw new ApiError(404, 'API route not found');
    return '/api/' + route.replace(/^\/+/, '');
  }
  return url.pathname;
}

export default async function handler(request, response) {
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Cache-Control', 'no-store');
  try {
    const url = new URL(request.url, 'http://localhost');
    const path = routePath(request, url);
    const query = url.searchParams;
    // Query parameters are also available on Vercel's request after a rewrite.
    const param = name => query.get(name) ?? request.query?.[name];
    const method = request.method ?? 'GET';
    const expectedMethod = path === '/api/results' ? 'POST' : 'GET';
    if (method !== expectedMethod && method !== 'HEAD') {
      response.setHeader('Allow', expectedMethod);
      throw new ApiError(405, 'Method not allowed');
    }
    if (method === 'HEAD' && expectedMethod === 'POST') throw new ApiError(405, 'Method not allowed');

    let payload;
    if (path === '/api/health') payload = { status: 'ok' };
    else if (path === '/api/quiz') payload = quiz(param('variant'));
    else if (path === '/api/results') {
      if (!/^application\/json(?:\s*;|$)/i.test(request.headers['content-type'] ?? '')) throw new ApiError(415, 'Use application/json');
      payload = resultByAnswers(await readBody(request), param('religion'));
    } else if (path === '/api/results/by-axes') payload = resultByValues(param('v'), param('religion'));
    else if (path === '/api/compare/catalog') payload = compareCatalog(param('religion'));
    else if (path === '/api/compare') payload = compare(param('type'), param('id'), param('v'));
    else {
      const route = /^\/api\/(ideologies|countries|personalities)(?:\/([^/]+))?$/.exec(path);
      if (!route) throw new ApiError(404, 'API route not found');
      const type = { ideologies: 'ideology', countries: 'country', personalities: 'personality' }[route[1]];
      if (route[2]) {
        let id;
        try { id = decodeURIComponent(route[2]); } catch { throw new ApiError(400, 'Invalid profile ID'); }
        payload = catalogs[type].items.find(item => item.id === id);
        if (!payload) throw new ApiError(404, 'Profile not found');
      } else payload = catalogs[type].items;
    }
    response.statusCode = 200;
    response.end(method === 'HEAD' ? undefined : JSON.stringify(payload));
  } catch (error) {
    response.statusCode = error instanceof ApiError ? error.status : 500;
    if (!(error instanceof ApiError)) console.error('Politest API error:', error.stack);
    response.end(JSON.stringify({ message: error instanceof ApiError ? error.message : 'Unable to calculate this result. Please try again.' }));
  }
}
