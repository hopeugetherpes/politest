// Generate English catalog pages from the backend data after the Vite build.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ideologiesIndexPage, IDEOLOGIES_CSS } from './ideologies-index.mjs';
import { personalitiesIndexPage, PERSONALITIES_CSS } from './personalities-index.mjs';
import { personalityPage, PROFILE_CSS } from './personality-page.mjs';
import { ideologyPage } from './ideology-page.mjs';
import { countryPage, COUNTRY_PAGE_CSS } from './country-page.mjs';
import { countriesIndexPage, COUNTRIES_CSS } from './countries-index.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DATA_DIR = resolve(ROOT, '../backend/src/main/resources/data');
const CATALOGUE_ONLY = process.argv.includes('--catalogue-only');
const DIST = join(ROOT, CATALOGUE_ONLY ? 'node_modules/.cache/catalogue-pages' : 'dist');
const SITE = 'https://politest.anatole.co';
const GOOGLE_ANALYTICS_SNIPPET = `<!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-JF63DF6BNM"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-JF63DF6BNM');
    </script>`;

const readJson = (path) => JSON.parse(readFileSync(join(DATA_DIR, path), 'utf8'));

const baseAxes = readJson('axes.json');
const baseIdeologies = readJson('ideologies.json');
const baseCountries = readJson('countries.json');
const basePersonalities = readJson('personalities.json');
const ideologyProfiles = new Map(readJson('ideology-profiles.json').map((p) => [p.ideologyId, p.vector]));
const countryProfiles = new Map(readJson('countries-profiles.json').map((p) => [p.countryId, p.vector]));
const personalityProfiles = new Map(readJson('personality-profiles.json').map((p) => [p.personalityId, p.vector]));

const STR = {
  en: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    prefix: '',
    home: 'Home',
    navIdeologies: 'Ideologies',
    navCountries: 'Countries',
    navPersonalities: 'Personalities',
    takeTheTest: 'Take the test',
    axesTitle: 'Profile across the 12 axes',
    ctaTitle: 'Where do you stand on the political spectrum?',
    ctaText: 'Take the quiz and discover your compatibility with ideologies, countries, and personalities across the 12 axes.',
    currentCountry: 'Modern country',
    historicalRegime: (period) => `Historical regime${period ? ` · ${period}` : ''}`,
    flagAlt: (name) => `Flag: ${name}`,
    imageSource: 'Image source',
    homeAria: 'Politest — home page',
    balanced: 'Balanced',
    intensity: ['Balanced', 'Leaning', 'Strong', 'Very strong'],
    subjectPrefix: (name) => name,
    ideologyTitle: (name) => `${name} — what it is and its position on the 12 political axes | Politest`,
    countryTitle: (name) => `${name} — political profile across the 12 axes | Politest`,
    personalityTitle: (name) => `${name} — political position on the 12 axes | Politest`,
    ideologyHeadline: (name) => `${name} — political position on the 12 axes`,
    countryHeadline: (name) => `${name} — political profile across the 12 axes`,
    ideologiesIndexTitle: (n) => `Political ideologies: full list of ${n} currents | Politest`,
    ideologiesIndexDesc: (n) => `Explore ${n} political ideologies — from communism to libertarianism — with descriptions and positions on 12 axes. Find yours with the Politest political quiz.`,
    ideologiesIndexHeading: 'Political ideologies',
    countriesIndexTitle: (n) => `Political profiles of ${n} countries and historical regimes | Politest`,
    countriesIndexDesc: (n) => `Compare the political profile of ${n} countries and historical regimes across 12 axes — democracy, economy, liberties, and more. Find your most compatible country.`,
    countriesIndexHeading: 'Countries and regimes',
    personalitiesIndexTitle: (n) => `${n} political personalities and their positions | Politest`,
    personalitiesIndexDesc: (n) => `See the political position of ${n} historical and contemporary personalities across 12 axes. Discover who you resemble most with the Politest quiz.`,
    personalitiesIndexHeading: 'Political personalities'
  }
};

const LOCALES = ['en'];

function groupBy(list, keyFn) {
  const map = new Map();
  for (const item of list) {
    const key = keyFn(item);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(item);
  }
  return map;
}

const escapeHtml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

function truncate(text, max = 158) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

// ── Páginas de índice ───────────────────────────────────────────────────────
function buildIndexes(L) {
  const p = L.s.prefix;
  const n = { i: L.ideologies.length, c: L.countries.length, p: L.personalities.length };

  return [
    ideologiesIndexPage(L, {
      locale: L.locale,
      site: SITE,
      gaSnippet: GOOGLE_ANALYTICS_SNIPPET,
      escapeHtml,
      profiles: ideologyProfiles,
      title: L.s.ideologiesIndexTitle(n.i),
      description: L.s.ideologiesIndexDesc(n.i)
    }),
    countriesIndexPage(L, {
      locale: L.locale,
      site: SITE,
      gaSnippet: GOOGLE_ANALYTICS_SNIPPET,
      escapeHtml,
      profiles: countryProfiles,
      title: L.s.countriesIndexTitle(n.c),
      description: L.s.countriesIndexDesc(n.c)
    }),
    personalitiesIndexPage(L, {
      locale: L.locale,
      site: SITE,
      gaSnippet: GOOGLE_ANALYTICS_SNIPPET,
      escapeHtml,
      profiles: personalityProfiles,
      title: L.s.personalitiesIndexTitle(n.p),
      description: L.s.personalitiesIndexDesc(n.p)
    })
  ];
}

// ── Montagem por locale ─────────────────────────────────────────────────────
function buildLocaleContext(locale) {
  const ideologies = baseIdeologies;
  const countries = baseCountries;
  const personalities = basePersonalities;
  return {
    locale,
    s: STR[locale],
    axes: baseAxes,
    ideologies,
    countries,
    personalities,
    countryById: new Map(countries.map((c) => [c.id, c])),
    personalityById: new Map(personalities.map((p) => [p.id, p])),
    ideologiesByCountry: groupBy(ideologies, (i) => i.countryId),
    ideologiesByPersonality: groupBy(ideologies, (i) => i.personalityId)
  };
}

function writePage(prefix, { basePath, html }) {
  const file = join(DIST, `${(prefix + basePath).replace(/^\//, '')}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  return prefix + basePath;
}

// App routes keep the English home metadata; shared results have their own URL.
function buildAppRoutes() {
  const index = readFileSync(join(DIST, 'index.html'), 'utf8');
  writeFileSync(join(DIST, '240questions.html'), index);
  const results = index.replace(/^\s*<link rel="canonical"[^\n]*\n/m, '');
  writeFileSync(join(DIST, 'results.html'), results);
}

const allPaths = [];
for (const locale of LOCALES) {
  const L = buildLocaleContext(locale);
  const profileCtx = {
    locale,
    site: SITE,
    gaSnippet: GOOGLE_ANALYTICS_SNIPPET,
    escapeHtml,
    truncate,
    profiles: { ideology: ideologyProfiles, country: countryProfiles, personality: personalityProfiles }
  };
  const pages = [
    ...buildIndexes(L),
    ...L.ideologies.map((i) => ideologyPage(L, i, profileCtx)),
    ...L.countries.map((c) => countryPage(L, c, profileCtx)),
    ...L.personalities.map((p) => personalityPage(L, p, profileCtx))
  ];
  for (const page of pages) allPaths.push(writePage(L.s.prefix, page));
}

if (!CATALOGUE_ONLY) buildAppRoutes();

writeFileSync(join(DIST, 'ideologies.css'), IDEOLOGIES_CSS);
writeFileSync(join(DIST, 'personalities.css'), PERSONALITIES_CSS);
writeFileSync(join(DIST, 'profile.css'), PROFILE_CSS + COUNTRY_PAGE_CSS);
writeFileSync(join(DIST, 'countries.css'), COUNTRIES_CSS);

const today = new Date().toISOString().slice(0, 10);
const sitemapUrls = ['/', ...allPaths]
  .map((p) => `  <url><loc>${SITE}${p}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n');
writeFileSync(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`
);

writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`Geradas ${allPaths.length} páginas (${LOCALES.join(', ')}) + sitemap.xml + robots.txt + ideologies.css + personalities.css + profile.css + countries.css em dist/`);
