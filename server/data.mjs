import { readFileSync } from 'node:fs';

// Use the original, versioned catalogs as the single source of data for both engines.
const read = name => JSON.parse(readFileSync(new URL(`../backend/src/main/resources/data/${name}.json`, import.meta.url), 'utf8'));
const fields = (item, names) => Object.fromEntries(names.map(name => [name, item[name] ?? null]));
const index = (items, key = 'id') => new Map(items.map(item => [item[key], item]));

export const axes = read('axes');
export const questions = read('questions-pool');
export const archetypes = read('archetype-questions');
export const ideologies = read('ideologies').map(item => fields(item, ['id', 'name', 'category', 'description', 'phrase', 'countryId', 'personalityId', 'vector', 'religions']));
export const countries = read('countries').map(item => fields(item, ['id', 'name', 'category', 'description', 'flagPath', 'flagKind', 'flagSourceName', 'flagSourceUrl', 'flagNote', 'historical', 'period', 'vector', 'religions']));
export const personalities = read('personalities').map(item => fields(item, ['id', 'name', 'role', 'category', 'lifespan', 'description', 'imagePath', 'imageSourceName', 'imageSourceUrl', 'imageNote', 'religions']));
export const ideologyProfiles = index(read('ideology-profiles'), 'ideologyId');
export const countryProfiles = index(read('countries-profiles'), 'countryId');
export const personalityProfiles = index(read('personality-profiles'), 'personalityId');
export const books = index(read('books'), 'personalityId');
export const questionById = index(questions);
export const archetypeById = index(archetypes);
export const ideologyById = index(ideologies);
export const countryById = index(countries);
export const personalityById = index(personalities);
export const axisIds = axes.map(axis => axis.id);
export const neutralVector = Object.fromEntries(axisIds.map(id => [id, 50]));

for (const [items, profiles] of [[ideologies, ideologyProfiles], [countries, countryProfiles], [personalities, personalityProfiles]]) {
  for (const item of items) {
    const vector = profiles.get(item.id)?.vector;
    if (!vector || Object.keys(vector).length !== axisIds.length || axisIds.some(id => !Number.isFinite(vector[id]) || vector[id] < 0 || vector[id] > 100)) {
      throw new Error(`Invalid catalog vector: ${item.id}`);
    }
  }
}
