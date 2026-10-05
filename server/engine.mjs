import { axes, questions, archetypes, neutralVector } from './data.mjs';
import { ApiError, answerScores, compatibility, normalizeVariant, scoreVector, scoreAnswers, parseVector } from './scoring.mjs';
import { catalogs, allowsReligion, normalizeReligion, rankCatalog, dimensionMatches } from './matching.mjs';
import { outliers, strongestTension, recommendBooks } from './insights.mjs';

const labels = ['Strongly agree', 'Agree', 'Neutral or It depends', 'Disagree', 'Strongly disagree'];
export function quiz(variant) {
  const normalized = normalizeVariant(variant);
  const questionCount = normalized === 'extreme' ? 240 : normalized === 'extended' ? 60 : 36;
  return {
    title: 'Politest', description: `A quiz of ${questionCount} questions to estimate your position on the 12 political axes.`,
    variant: normalized, questionCount, questionsPerAxis: normalized === 'extreme' ? 0 : questionCount / 12,
    axes, questions,
    answerOptions: [...answerScores].map(([id, scoreTowardAgreement], i) => ({ id, label: labels[i], scoreTowardAgreement })),
    archetypeQuestions: archetypes.map(question => ({
      id: question.id, label: question.label.en, text: question.text.en,
      options: question.options.map(option => ({ id: option.id, text: option.text.en }))
    }))
  };
}

export const vectorFromAxes = results => Object.fromEntries(results.map(axis => [axis.axisId, axis.leftPercent]));
const resultCache = new Map();
export function buildResult(results, rawReligion) {
  const religion = normalizeReligion(rawReligion);
  const key = `${religion ?? ''}|${results.map(axis => axis.leftPercent).join(',')}`;
  if (resultCache.has(key)) return resultCache.get(key);
  const user = vectorFromAxes(results);
  const ideologies = rankCatalog('ideology', user, religion);
  const personalities = rankCatalog('personality', user, religion);
  const countries = rankCatalog('country', user, religion);
  const matches = ideologies.slice(0, 4);
  const personalityMatches = personalities.slice(0, 8);
  const topPersonalityMatch = personalities[0];
  const topCountryMatch = countries.find(match => !match.historical);
  const topHistoricalCountryMatch = countries.find(match => match.historical);
  const bestPerCategory = new Map();
  for (const match of personalities) if (match.category != null && !bestPerCategory.has(match.category)) bestPerCategory.set(match.category, match);
  const categoryBestMatches = [...bestPerCategory.values()].sort((a, b) => b.compatibility - a.compatibility);
  const unusual = outliers(user);
  const result = {
    axes: results, topMatch: matches[0], matches, bottomIdeologyMatch: ideologies.at(-1), topCountryMatch,
    topCountryMatches: countries.slice(0, 3), topHistoricalCountryMatch,
    countryDimensionMatches: dimensionMatches('country', user, religion, [topCountryMatch.countryId, topHistoricalCountryMatch.countryId]),
    bottomCountryMatches: countries.slice(-3).sort((a, b) => a.compatibility - b.compatibility),
    topPersonalityMatch, personalityMatches,
    dimensionMatches: dimensionMatches('personality', user, religion, [topPersonalityMatch.personalityId]),
    categoryBestMatches, bottomPersonalityMatches: personalities.slice(-3).sort((a, b) => a.compatibility - b.compatibility),
    mostUnusualAxis: unusual[0], mostCommonAxis: unusual.at(-1), axisTension: strongestTension(user),
    bookRecommendations: recommendBooks(personalityMatches, categoryBestMatches)
  };
  // Bounded, in-memory computation cache; no database or stored quiz answers.
  if (resultCache.size >= 128) resultCache.delete(resultCache.keys().next().value);
  resultCache.set(key, result);
  return result;
}
export const resultByAnswers = (request, religion) => buildResult(scoreAnswers(request), religion);
export const resultByValues = (values, religion) => buildResult(typeof values === 'string' ? parseVector(values) : scoreVector(values), religion);

export function compareItem(type, item) {
  return {
    type, id: item.id, name: item.name,
    caption: type === 'personality' ? item.role : type === 'country' && item.historical && item.period?.trim() ? item.period : item.category,
    imagePath: type === 'personality' ? item.imagePath : type === 'country' ? item.flagPath : null,
    category: item.category, historical: type === 'country' ? item.historical : false
  };
}

export function compareCatalog(rawReligion) {
  const religion = normalizeReligion(rawReligion);
  return ['personality', 'country', 'ideology'].flatMap(type => catalogs[type].items
    .filter(item => allowsReligion(item.religions, religion)).map(item => compareItem(type, item)));
}

export function compare(type, id, values) {
  const catalog = Object.hasOwn(catalogs, type) ? catalogs[type] : null;
  if (!catalog) throw new ApiError(400, 'Invalid comparison type');
  const item = catalog.items.find(candidate => candidate.id === id);
  if (!item) throw new ApiError(404, `Profile not found: ${type}/${id}`);
  const user = vectorFromAxes(typeof values === 'string' ? parseVector(values) : scoreVector(values));
  const vector = catalog.profiles.get(id)?.vector ?? neutralVector;
  return { item: compareItem(type, item), description: item.description, compatibility: compatibility(user, vector), vector };
}
