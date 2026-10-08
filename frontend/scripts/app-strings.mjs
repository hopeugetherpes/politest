// Reuse the app's dictionaries in generated pages without a second copy of text.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

async function readDictionary(file, variable) {
  const content = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '../src/i18n', file), 'utf8');
  const source = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true);
  let initializer;
  const visit = node => {
    if (ts.isVariableDeclaration(node) && node.name.getText(source) === variable) initializer = node.initializer;
    ts.forEachChild(node, visit);
  };
  visit(source);
  if (!initializer) throw new Error(`Dictionary not found: ${file}/${variable}`);
  const code = ts.transpileModule(`export default ${initializer.getText(source)};`, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 }
  }).outputText;
  return (await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'))).default;
}

export const APP_STRINGS = {
  en: await readDictionary('index.ts', 'en'),
  fr: await readDictionary('fr.ts', 'fr')
};
export const AXIS_EXPLANATIONS = { en: APP_STRINGS.en.axisExplanations, fr: APP_STRINGS.fr.axisExplanations };
