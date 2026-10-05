import { axes, axisIds, questionById, archetypeById } from './data.mjs';

export class ApiError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}
export const round1 = value => Math.round(value * 10) / 10;
export const clamp = value => Math.max(0, Math.min(100, value));
export const compareText = (a, b) => a < b ? -1 : a > b ? 1 : 0;
export const answerScores = new Map([['STRONGLY_AGREE', 1], ['AGREE', 0.75], ['NEUTRAL', 0.5], ['DISAGREE', 0.25], ['STRONGLY_DISAGREE', 0]]);

export function normalizeVariant(value) {
  const variant = String(value ?? '').trim().toLowerCase();
  if (['', 'short', 'curta'].includes(variant)) return 'short';
  if (['extended', 'extensa'].includes(variant)) return 'extended';
  if (['extreme', 'extrema', '240', '240questions'].includes(variant)) return 'extreme';
  throw new ApiError(400, 'Invalid quiz variant');
}

export function scoreVector(values) {
  if (!Array.isArray(values) || values.length !== axes.length || values.some(value => !Number.isFinite(value) || value < 0 || value > 100)) {
    throw new ApiError(400, 'Invalid axis vector');
  }
  return axes.map((axis, i) => {
    const leftPercent = round1(clamp(values[i]));
    const rightPercent = round1(100 - leftPercent);
    const distance = Math.abs(leftPercent - 50);
    return {
      axisId: axis.id, label: axis.label, leftPole: axis.leftPole, rightPole: axis.rightPole,
      leftPercent, rightPercent, dominantPole: leftPercent >= rightPercent ? axis.leftPole : axis.rightPole,
      intensity: distance < 7.5 ? 'Balanced' : distance < 22.5 ? 'Leaning' : distance < 37.5 ? 'Strong' : 'Very strong'
    };
  });
}

export function parseVector(raw) {
  if (typeof raw !== 'string' || raw.split(',').some(value => !value.trim())) throw new ApiError(400, 'Invalid axis vector');
  return scoreVector(raw.split(',').map(value => Number(value.trim())));
}

export function scoreAnswers(request) {
  if (!request || !Array.isArray(request.answers) || !request.answers.length || request.answers.length > 240) {
    throw new ApiError(400, 'Submit between 1 and 240 answers');
  }
  const scores = new Map();
  const add = (id, score, weight) => {
    const previous = scores.get(id) ?? { total: 0, weight: 0 };
    previous.total += score * weight;
    previous.weight += weight;
    scores.set(id, previous);
  };
  for (const submitted of request.answers) {
    const question = questionById.get(submitted?.questionId);
    if (!question || !answerScores.has(submitted?.answer)) throw new ApiError(400, 'Invalid question or answer');
    const agreement = answerScores.get(submitted.answer);
    add(question.axisId, question.agreePole === 'LEFT' ? agreement : 1 - agreement, question.weight);
  }
  if (request.archetype != null) {
    if (typeof request.archetype !== 'object' || Array.isArray(request.archetype)) throw new ApiError(400, 'Invalid archetype answers');
    for (const [questionId, optionId] of Object.entries(request.archetype)) {
      const option = archetypeById.get(questionId)?.options.find(candidate => candidate.id === optionId);
      if (!option) throw new ApiError(400, `Invalid archetype answer: ${questionId}=${optionId}`);
      for (const [axisId, value] of Object.entries(option.effects)) add(axisId, value / 100, 1);
    }
  }
  if (axisIds.some(id => !scores.has(id))) throw new ApiError(400, 'Answers must cover all 12 axes');
  return scoreVector(axisIds.map(id => {
    const score = scores.get(id);
    return (score.weight === 0 ? 0.5 : score.total / score.weight) * 100;
  }));
}

// Port of ProfileMatchScorer: retain all four terms and the near-center direction radius.
export function compatibility(user, target, ids = axisIds) {
  let similarity = 0, dot = 0, userNorm = 0, targetNorm = 0, userMagnitude = 0, targetMagnitude = 0, maxDiff = 0;
  for (const id of ids) {
    const u = user[id] ?? 50, t = target[id] ?? 50, diff = Math.abs(u - t);
    const uc = u - 50, tc = t - 50;
    let axis = Math.max(0, 1 - (diff / 50) ** 2);
    if (uc * tc < 0) axis *= 1 - 0.45 * Math.tanh(Math.abs(uc) / 25) * Math.tanh(Math.abs(tc) / 25);
    similarity += axis;
    dot += uc * tc;
    userNorm += uc * uc;
    targetNorm += tc * tc;
    userMagnitude += Math.abs(uc);
    targetMagnitude += Math.abs(tc);
    maxDiff = Math.max(maxDiff, diff);
  }
  const augment = ids.length * 8 * 8;
  const axisSimilarity = 100 * similarity / ids.length;
  const cosine = (dot + augment) / Math.sqrt((userNorm + augment) * (targetNorm + augment));
  const direction = 50 + 50 * cosine;
  const magnitude = 100 - 2 * Math.abs(userMagnitude / ids.length - targetMagnitude / ids.length);
  const outlier = 100 * Math.max(0, 1 - (maxDiff / 100) ** 2.5);
  return round1(clamp(0.42 * axisSimilarity + 0.33 * direction + 0.18 * magnitude + 0.07 * outlier));
}

export function percentile(score, scores) {
  return scores.length ? round1(100 * scores.filter(value => value < score).length / scores.length) : 0;
}

export function percentiles(scores) {
  const sorted = [...scores].sort((a, b) => a - b);
  return scores.map(score => {
    let low = 0, high = sorted.length;
    while (low < high) {
      const mid = (low + high) >>> 1;
      if (sorted[mid] < score) low = mid + 1;
      else high = mid;
    }
    return round1(100 * low / sorted.length);
  });
}
