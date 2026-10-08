import french from './catalog-fr.json' with { type: 'json' };
import ideologies from '../../../backend/src/main/resources/data/ideologies.json' with { type: 'json' };

const ideologyById = new Map(ideologies.map(item => [item.id, item]));
const translate = text => Object.hasOwn(french, text) ? french[text] : text;
const period = text => translate(text).replace(/\ba\.C\.|\bBC\b/g, 'av. J.-C.')
  .replace(/\bAD\b/g, 'apr. J.-C.').replace(/\bpresent\b/gi, 'aujourd’hui');

// Return a translated copy. IDs, weights, vectors, ranks and the cached English
// result are never changed, so language cannot affect the matching calculation.
export function localize(value) {
  if (typeof value === 'string') return translate(value);
  if (Array.isArray(value)) return value.map(localize);
  if (value === null || typeof value !== 'object') return value;
  const output = Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localize(item)]));
  for (const key of ['period', 'lifespan']) if (typeof value[key] === 'string') output[key] = period(value[key]);
  if (value.ideologyId && typeof value.description === 'string') {
    const original = ideologyById.get(value.ideologyId);
    if (original) {
      output.description = translate(original.description);
      if (value.longDescription) output.longDescription = output.description +
        ' La compatibilité indique à quel point vos réponses sont proches de ce profil.';
    }
  }
  if (typeof value.questionCount === 'number' && Array.isArray(value.answerOptions)) {
    output.description = `Un test de ${value.questionCount} questions pour situer vos convictions sur les 12 axes politiques.`;
  }
  return output;
}
