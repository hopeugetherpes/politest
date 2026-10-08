// Generate English and French catalog pages from the backend data after the Vite build.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { localize } from '../src/i18n/catalog.mjs';
import { APP_STRINGS } from './app-strings.mjs';
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
  },
  fr: {
    htmlLang: 'fr',
    ogLocale: 'fr_FR',
    prefix: '/fr',
    home: "Accueil",
    navIdeologies: "Idéologies",
    navCountries: "Pays",
    navPersonalities: "Personnalités",
    takeTheTest: "Passer le test",
    axesTitle: "Profil sur les 12 axes",
    ctaTitle: "Où en êtes-vous sur le spectre politique ?",
    ctaText: "Passez le test pour découvrir votre compatibilité avec les idéologies, les pays et les personnalités sur les 12 axes.",
    currentCountry: "Pays actuel",
    historicalRegime: (period) => `Régime historique${period ? ` · ${period}` : ''}`,
    flagAlt: (name) => `Drapeau: ${name}`,
    imageSource: "Source de l'image",
    homeAria: "Politest — page d'accueil",
    balanced: "Équilibré",
    intensity: ["Équilibré", "Tendance", "Forte", "Très forte"],
    subjectPrefix: (name) => name,
    ideologyTitle: (name) => `${name} — définition et position sur les 12 axes politiques | Politest`,
    countryTitle: (name) => `${name} — profil politique sur les 12 axes | Politest`,
    personalityTitle: (name) => `${name} — position sur les 12 axes politiques | Politest`,
    ideologyHeadline: (name) => `${name} — Position politique sur les 12 axes`,
    countryHeadline: (name) => `${name} — profil politique sur les 12 axes`,
    ideologiesIndexTitle: (n) => `Idéologies politiques : liste complète des ${n} courants | Politest`,
    ideologiesIndexDesc: (n) => `Explorez ${n} idéologies politiques, du communisme au libertarianisme, avec leurs descriptions et leurs positions sur 12 axes. Découvrez la vôtre avec Politest.`,
    ideologiesIndexHeading: "Idéologies politiques",
    countriesIndexTitle: (n) => `Profils politiques de ${n} pays et régimes historiques | Politest`,
    countriesIndexDesc: (n) => `Comparez les profils de ${n} pays et régimes historiques sur 12 axes : démocratie, économie, libertés et bien plus. Découvrez le pays le plus compatible avec vous.`,
    countriesIndexHeading: "Pays et régimes",
    personalitiesIndexTitle: (n) => `${n} personnalités politiques et leurs positions | Politest`,
    personalitiesIndexDesc: (n) => `Découvrez les positions de ${n} personnalités historiques et contemporaines sur 12 axes. Voyez qui vous ressemble le plus avec Politest.`,
    personalitiesIndexHeading: "Personnalités politiques"
  }
};

const LOCALES = ['en', 'fr'];

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
      escapeHtml,
      profiles: ideologyProfiles,
      title: L.s.ideologiesIndexTitle(n.i),
      description: L.s.ideologiesIndexDesc(n.i)
    }),
    countriesIndexPage(L, {
      locale: L.locale,
      site: SITE,
      escapeHtml,
      profiles: countryProfiles,
      title: L.s.countriesIndexTitle(n.c),
      description: L.s.countriesIndexDesc(n.c)
    }),
    personalitiesIndexPage(L, {
      locale: L.locale,
      site: SITE,
      escapeHtml,
      profiles: personalityProfiles,
      title: L.s.personalitiesIndexTitle(n.p),
      description: L.s.personalitiesIndexDesc(n.p)
    })
  ];
}

// ── Montagem por locale ─────────────────────────────────────────────────────
function buildLocaleContext(locale) {
  const ideologies = locale === 'fr' ? localize(baseIdeologies) : baseIdeologies;
  const countries = locale === 'fr' ? localize(baseCountries) : baseCountries;
  const personalities = locale === 'fr' ? localize(basePersonalities) : basePersonalities;
  return {
    locale,
    s: STR[locale],
    axes: locale === 'fr' ? localize(baseAxes) : baseAxes,
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
  const languagePath = prefix ? basePath : `/fr${basePath}`;
  const languageLabel = prefix ? 'English 🇬🇧' : 'Français 🇫🇷';
  const otherLang = prefix ? 'en' : 'fr';
  html = html.replace('</nav>', `<a href="${languagePath}" hreflang="${otherLang}" lang="${otherLang}">${languageLabel}</a></nav>`);
  html = html.replace('</head>', `<link rel="alternate" hreflang="en" href="${SITE}${basePath}" /><link rel="alternate" hreflang="fr" href="${SITE}/fr${basePath}" /></head>`);
  writeFileSync(file, html);
  return prefix + basePath;
}

// App routes keep the English home metadata; shared results have their own URL.
function buildAppRoutes() {
  const index = readFileSync(join(DIST, 'index.html'), 'utf8');
  const alternates = `<link rel="alternate" hreflang="en" href="${SITE}/" /><link rel="alternate" hreflang="fr" href="${SITE}/fr" />`;
  writeFileSync(join(DIST, 'index.html'), index.replace('</head>', alternates + '</head>'));
  writeFileSync(join(DIST, '240questions.html'), index);
  writeFileSync(join(DIST, 'results.html'), index.replace(/<link rel="canonical"[^>]*>/, ''));
  const s = APP_STRINGS.fr;
  let fr = index.replace('<html lang="en">', '<html lang="fr">')
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(s.docTitle)}</title>`)
    .replace(/(<meta[^>]*content=")[^"]*("[^>]*(?:name|property)="(?:description|og:description|twitter:description)"[^>]*>)/g, `$1${escapeHtml(s.introLead)}$2`)
    .replace(/(<meta[^>]*(?:name|property)="(?:description|og:description|twitter:description)"[^>]*content=")[^"]*(")/g, `$1${escapeHtml(s.introLead)}$2`)
    .replace(/(<meta[^>]*(?:name|property)="(?:og:title|twitter:title)"[^>]*content=")[^"]*(")/g, `$1${escapeHtml(s.docTitle)}$2`)
    .replace(/(<meta[^>]*name="keywords"[^>]*content=")[^"]*(")/g, '$1test politique, idéologie politique, spectre politique, gauche, droite, centre, démocratie, économie, 12 axes, Politest$2')
    .replace('name="language" content="English"', 'name="language" content="Français"')
    .replace('property="og:locale" content="en_US"', 'property="og:locale" content="fr_FR"')
    .replaceAll(`href="${SITE}/"`, `href="${SITE}/fr"`)
    .replaceAll(`content="${SITE}/"`, `content="${SITE}/fr"`)
    .replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, (_all, text) => {
      const block = JSON.parse(text);
      if (block['@type'] === 'FAQPage') block.mainEntity = s.faqItems.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } }));
      else {
        block.alternateName = ['Politest — test politique', 'Politest — test d’idéologie'];
        block.url = SITE + '/fr'; block.inLanguage = 'fr'; block.description = s.introLead;
        block.keywords = 'test politique, idéologie politique, 12 axes';
        block.about = Object.values(s.homeAxes).map(axis => axis.label);
      }
      return '<script type="application/ld+json">' + JSON.stringify(block) + '</script>';
    });
  fr = fr.replace('</head>', alternates + '</head>');
  mkdirSync(join(DIST, 'fr'), { recursive: true });
  writeFileSync(join(DIST, 'fr.html'), fr);
  writeFileSync(join(DIST, 'fr/240questions.html'), fr);
  writeFileSync(join(DIST, 'fr/results.html'), fr.replace(/<link rel="canonical"[^>]*>/, ''));
}

const allPaths = [];
for (const locale of LOCALES) {
  const L = buildLocaleContext(locale);
  const profileCtx = {
    locale,
    site: SITE,
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
const sitemapUrls = ['/', '/fr', ...allPaths]
  .map((p) => `  <url><loc>${SITE}${p}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n');
writeFileSync(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`
);

writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`Geradas ${allPaths.length} páginas (${LOCALES.join(', ')}) + sitemap.xml + robots.txt + ideologies.css + personalities.css + profile.css + countries.css em dist/`);
