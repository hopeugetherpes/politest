import axesData from '../backend/src/main/resources/data/axes.json' with { type: 'json' };
import questionsData from '../backend/src/main/resources/data/questions-pool.json' with { type: 'json' };
import archetypesData from '../backend/src/main/resources/data/archetype-questions.json' with { type: 'json' };
import ideologiesData from '../backend/src/main/resources/data/ideologies.json' with { type: 'json' };
import countriesData from '../backend/src/main/resources/data/countries.json' with { type: 'json' };
import personalitiesData from '../backend/src/main/resources/data/personalities.json' with { type: 'json' };
import ideologyProfilesData from '../backend/src/main/resources/data/ideology-profiles.json' with { type: 'json' };
import countryProfilesData from '../backend/src/main/resources/data/countries-profiles.json' with { type: 'json' };
import personalityProfilesData from '../backend/src/main/resources/data/personality-profiles.json' with { type: 'json' };
import booksData from '../backend/src/main/resources/data/books.json' with { type: 'json' };

// Use the original, versioned catalogs as the single source of data for both engines.
// Static JSON imports let the same tested engine run in Node and in the browser.
const sources = { axes: axesData, 'questions-pool': questionsData, 'archetype-questions': archetypesData,
  ideologies: ideologiesData, countries: countriesData, personalities: personalitiesData,
  'ideology-profiles': ideologyProfilesData, 'countries-profiles': countryProfilesData,
  'personality-profiles': personalityProfilesData, books: booksData };
const read = name => sources[name];
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
