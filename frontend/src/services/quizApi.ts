import { LANG, t } from '../i18n';
import type { CompareDetail, CompareItem, CompareType, QuizPayload, QuizResult, QuizVariant, SubmittedAnswer } from '../types/quiz';

// Load the versioned engine only when a quiz starts or a result is opened.
// All calculations stay in this browser; there is no API or environment variable.
const loadEngine = () => import('../../../server/engine.mjs');
let enginePromise: ReturnType<typeof loadEngine> | undefined;

async function run<T>(operation: (engine: Awaited<ReturnType<typeof loadEngine>>) => T, errorMessage: string): Promise<T> {
  try {
    const engine = await (enginePromise ??= loadEngine());
    const value = operation(engine);
    if (LANG === 'en') return value;
    const { localize } = await import('../i18n/catalog.mjs');
    return localize(value);
  } catch {
    throw new Error(errorMessage);
  }
}

export function fetchQuiz(variant: QuizVariant = 'short'): Promise<QuizPayload> {
  return run(engine => engine.quiz(variant), t.errLoadQuiz);
}

export function submitResults(
  variant: QuizVariant,
  answers: SubmittedAnswer[],
  archetype: Record<string, string> = {},
  religion: string | null = null
): Promise<QuizResult> {
  return run(engine => engine.resultByAnswers({ variant, answers, archetype }, religion), t.errCalc);
}

export function fetchSharedResult(leftPercents: number[], religion: string | null = null): Promise<QuizResult> {
  return run(engine => engine.resultByValues(leftPercents, religion), t.errCalc);
}

export function fetchCompareCatalog(religion: string | null = null): Promise<CompareItem[]> {
  return run(engine => engine.compareCatalog(religion), t.compareLoadError);
}

export function fetchCompare(type: CompareType, id: string, leftPercents: number[]): Promise<CompareDetail> {
  return run(engine => engine.compare(type, id, leftPercents), t.compareLoadError);
}
