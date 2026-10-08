import type { QuizPayload, QuizResult, QuizVariant, SubmittedAnswer, CompareItem, CompareDetail, CompareType } from '../frontend/src/types/quiz';
export function quiz(variant: QuizVariant): QuizPayload;
export function resultByAnswers(request: { variant: QuizVariant; answers: SubmittedAnswer[]; archetype: Record<string, string> }, religion: string | null): QuizResult;
export function resultByValues(values: number[], religion: string | null): QuizResult;
export function compareCatalog(religion: string | null): CompareItem[];
export function compare(type: CompareType, id: string, values: number[]): CompareDetail;
