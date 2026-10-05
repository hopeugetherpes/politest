import {
  ideologies, countries, personalities, ideologyProfiles, countryProfiles, personalityProfiles, neutralVector
} from './data.mjs';
import { compatibility, compareText, percentile, percentiles } from './scoring.mjs';

const selectable = ['catholic', 'protestant', 'orthodox', 'judaism', 'islam', 'buddhism'];
export function normalizeReligion(raw) {
  const value = String(raw ?? '').trim().toLowerCase();
  return value === 'christianity' || selectable.includes(value) ? value : null;
}

export function allowsReligion(religions, preference) {
  if (!religions?.length) return true;
  const preferred = preference === 'christianity' ? ['catholic', 'protestant', 'orthodox'] : preference ? [preference] : [];
  const matches = religions.some(value => preferred.includes(value));
  const hasSelectable = religions.some(value => selectable.includes(value));
  if (religions.includes('only')) return hasSelectable ? matches : preference == null;
  return preference == null || matches || !hasSelectable;
}

export const catalogs = {
  ideology: { items: ideologies, profiles: ideologyProfiles },
  country: { items: countries, profiles: countryProfiles },
  personality: { items: personalities, profiles: personalityProfiles }
};
export const vectorFor = (type, item) => catalogs[type].profiles.get(item.id)?.vector ?? item.vector ?? neutralVector;
const byScoreThenName = (a, b) => b.score - a.score || compareText(a.item.name, b.item.name);

function descriptionParts(raw) {
  let clean = String(raw ?? '').trim().replace(/\s+/g, ' ');
  const note = clean.indexOf('METHODOLOGICAL NOTE');
  if (note >= 0) clean = clean.slice(0, note).trim();
  const start = /\s+Politically:/.exec(clean);
  if (!start) return { summary: clean, political: '', economic: '', social: '' };
  const fields = clean.slice(start.index + start[0].length).split(/\s+\|\s+/);
  const normalize = value => value ? value.slice(0, 1).toLowerCase() + value.slice(1) : 'variable depending on context';
  return {
    summary: clean.slice(0, start.index).trim(),
    political: normalize((fields[0] ?? '').trim()),
    economic: normalize((fields[1] ?? '').replace(/^Economically:\s*/, '').trim()),
    social: normalize((fields[2] ?? '').replace(/^Socially:\s*/, '').trim())
  };
}

function descriptions(raw) {
  const parts = descriptionParts(raw);
  const sentences = parts.summary.split(/(?<=[.!?])\s+/);
  let short = sentences[0];
  if (sentences.length > 1 && short.length < 140) short += ' ' + sentences[1];
  if (short.length > 230) {
    let cut = short.lastIndexOf(' ', 229);
    if (cut < 115) cut = 229;
    short = short.slice(0, cut).trim() + '...';
  }
  let long = parts.summary + (parts.summary.endsWith('.') ? '' : '.');
  long += ' Compatibility indicates how close your answers are to this profile.';
  if (parts.political || parts.economic || parts.social) {
    long += ` In practical terms: political values and form of government tend to be ${parts.political}; the economy tends to be ${parts.economic}; social norms tend to be ${parts.social}.`;
  }
  return { description: short, longDescription: long };
}

// Description text is catalog data, so it can be prepared once per function instance.
const ideologyDescriptions = new Map(ideologies.map(item => [item.id, descriptions(item.description)]));
export function toMatch(type, item, score, rankPercentile) {
  const common = { name: item.name, category: item.category, compatibility: score, compatibilityPercentile: rankPercentile };
  if (type === 'ideology') return {
    ideologyId: item.id, ...common, ...ideologyDescriptions.get(item.id), phrase: item.phrase
  };
  if (type === 'personality') return {
    personalityId: item.id, ...common, role: item.role, lifespan: item.lifespan, description: item.description,
    imagePath: item.imagePath, imageSourceName: item.imageSourceName, imageSourceUrl: item.imageSourceUrl,
    imageNote: item.imageNote, vector: vectorFor(type, item)
  };
  return {
    countryId: item.id, ...common, description: item.description, flagPath: item.flagPath, flagKind: item.flagKind,
    flagSourceName: item.flagSourceName, flagSourceUrl: item.flagSourceUrl, flagNote: item.flagNote,
    historical: item.historical, period: item.period, vector: vectorFor(type, item)
  };
}

export function rankCatalog(type, user, religion) {
  const scored = catalogs[type].items.map(item => ({ item, score: compatibility(user, vectorFor(type, item)) }));
  const ranks = percentiles(scored.map(candidate => candidate.score));
  return scored.map((candidate, i) => ({ ...candidate, rank: ranks[i] }))
    .filter(candidate => allowsReligion(candidate.item.religions, religion))
    .sort(byScoreThenName)
    .map(candidate => toMatch(type, candidate.item, candidate.score, candidate.rank));
}

const dimensions = [
  ['political', ['estrutura', 'representacao', 'poder', 'diplomacia', 'imigracao', 'intervencao', 'tecnologia', 'controle', 'comercio', 'religiao', 'economia', 'moral']],
  ['social', ['representacao', 'moral', 'religiao', 'economia', 'controle', 'comercio', 'imigracao', 'poder', 'tecnologia']],
  ['economic', ['economia', 'controle', 'comercio']]
];

export function dimensionMatches(type, user, religion, initialExcluded) {
  const excluded = new Set(initialExcluded);
  const matches = [];
  for (const [dimension, ids] of dimensions) {
    const candidates = catalogs[type].items
      .filter(item => !excluded.has(item.id) && allowsReligion(item.religions, religion))
      .map(item => ({ item, score: compatibility(user, vectorFor(type, item), ids) }))
      .sort(byScoreThenName);
    if (!candidates.length) continue;
    const best = candidates[0];
    matches.push({ dimension, match: toMatch(type, best.item, best.score, percentile(best.score, candidates.map(value => value.score))) });
    excluded.add(best.item.id);
  }
  return matches;
}
