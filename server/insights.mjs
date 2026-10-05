import { axes, ideologyProfiles, ideologyById, books } from './data.mjs';
import { compareText, round1 } from './scoring.mjs';

const profiles = [...ideologyProfiles.values()];
const distributions = new Map(axes.map(axis => {
  const values = profiles.map(profile => profile.vector[axis.id]).sort((a, b) => a - b);
  const middle = Math.floor(values.length / 2);
  const median = values.length % 2 ? values[middle] : (values[middle - 1] + values[middle]) / 2;
  return [axis.id, { values, median }];
}));

export function outliers(user) {
  return axes.map(axis => {
    const value = user[axis.id];
    const { values, median } = distributions.get(axis.id);
    const balanced = Math.abs(value - 50) < 7.5;
    const above = value >= median;
    const behind = values.filter(candidate => above ? candidate < value : candidate > value).length;
    return {
      axisId: axis.id, label: axis.label, userPercent: round1(value), catalogMedian: round1(median),
      distanceFromMedian: round1(Math.abs(value - median)),
      dominantPole: balanced ? null : value > 50 ? axis.leftPole : axis.rightPole,
      balanced, abovePole: above ? axis.leftPole : axis.rightPole, abovePercent: round1(100 * behind / values.length)
    };
  }).sort((a, b) => b.distanceFromMedian - a.distanceFromMedian || compareText(a.label, b.label));
}

function correlation(first, second) {
  const xs = profiles.map(profile => profile.vector[first.id]);
  const ys = profiles.map(profile => profile.vector[second.id]);
  const meanX = xs.reduce((a, b) => a + b, 0) / xs.length;
  const meanY = ys.reduce((a, b) => a + b, 0) / ys.length;
  let numerator = 0, sumSqX = 0, sumSqY = 0;
  for (let i = 0; i < xs.length; i++) {
    const dx = xs[i] - meanX, dy = ys[i] - meanY;
    numerator += dx * dy;
    sumSqX += dx * dx;
    sumSqY += dy * dy;
  }
  const denominator = Math.sqrt(sumSqX * sumSqY);
  return denominator === 0 ? 0 : numerator / denominator;
}

const side = value => Math.abs(value - 50) < 10 ? 0 : value > 50 ? 1 : -1;
// Correlations and examples depend only on the versioned catalog, never on visitor data.
const tensionPairs = [];
for (let i = 0; i < axes.length; i++) {
  for (let j = i + 1; j < axes.length; j++) {
    const first = axes[i], second = axes[j], corr = correlation(first, second);
    if (Math.abs(corr) < 0.45) continue;
    const sides = new Map();
    for (const firstSide of [-1, 1]) {
      for (const secondSide of [-1, 1]) {
        const matching = profiles.filter(profile => side(profile.vector[first.id]) === firstSide && side(profile.vector[second.id]) === secondSide);
        sides.set(`${firstSide},${secondSide}`, {
          matching: matching.length,
          examples: matching.map(profile => ideologyById.get(profile.ideologyId)?.name).filter(Boolean).slice(0, 3)
        });
      }
    }
    tensionPairs.push({ first, second, corr, sides });
  }
}

export function strongestTension(user) {
  let best = null, bestScore = 0;
  for (const { first, second, corr, sides } of tensionPairs) {
    const a = user[first.id] - 50, b = user[second.id] - 50;
    if (Math.abs(a) < 15 || Math.abs(b) < 15 || (a * b > 0) === (corr > 0)) continue;
    const { matching, examples } = sides.get(`${a > 0 ? 1 : -1},${b > 0 ? 1 : -1}`);
    const score = Math.abs(corr) * (1 - matching / profiles.length);
    if (score > bestScore) {
      bestScore = score;
      best = {
        firstAxisLabel: first.label, firstPole: a > 0 ? first.leftPole : first.rightPole,
        secondAxisLabel: second.label, secondPole: b > 0 ? second.leftPole : second.rightPole,
        matchingIdeologies: matching, catalogSize: profiles.length, examples
      };
    }
  }
  return best;
}

export function recommendBooks(generalMatches, categoryMatches) {
  const candidates = new Map();
  for (const match of [...generalMatches, ...categoryMatches]) {
    if (books.has(match.personalityId) && !candidates.has(match.personalityId)) candidates.set(match.personalityId, match);
  }
  return [...candidates.values()].sort((a, b) => b.compatibility - a.compatibility).slice(0, 3).map(match => {
    const book = books.get(match.personalityId);
    const title = book.title?.en ?? null;
    const directUrl = book.url?.en;
    const url = directUrl?.trim() ? directUrl : 'https://www.amazon.com/s?' + new URLSearchParams({ k: `${title} ${match.name}`, i: 'stripbooks' });
    return {
      personalityId: match.personalityId, personalityName: match.name, imagePath: match.imagePath,
      title, year: book.year, url, compatibility: match.compatibility
    };
  });
}
