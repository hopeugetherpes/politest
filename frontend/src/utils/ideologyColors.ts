/**
 * Par de cores (base + pastel) de cada categoria do espectro. Ver
 * docs/nova-identidade/politest-identidade-visual.md §5.
 */
export interface IdeologyColor {
  key: IdeologyColorKey;
  base: string;
  bg: string;
}

export type IdeologyColorKey =
  | 'esq-radical'
  | 'esquerda'
  | 'centro'
  | 'direita'
  | 'ext-direita'
  | 'terceira'
  | 'libertario'
  | 'anarquismo';

const PALETTE: Record<IdeologyColorKey, IdeologyColor> = {
  'esq-radical': { key: 'esq-radical', base: '#830214', bg: '#ECD5D8' },
  esquerda: { key: 'esquerda', base: '#035732', bg: '#D5ECE2' },
  centro: { key: 'centro', base: '#4B5058', bg: '#DDE0E3' },
  direita: { key: 'direita', base: '#2D4778', bg: '#D6E0F2' },
  'ext-direita': { key: 'ext-direita', base: '#001743', bg: '#D5DAE6' },
  terceira: { key: 'terceira', base: '#4B2A63', bg: '#E2D5EC' },
  libertario: { key: 'libertario', base: '#946201', bg: '#F0E4C8' },
  anarquismo: { key: 'anarquismo', base: '#2B2B2B', bg: '#E2DFD8' }
};

// English API categories and internal home spectrum IDs.
const ALIASES: Record<string, IdeologyColorKey> = {
  'radical left': 'esq-radical',
  'left-radical': 'esq-radical',
  esquerda: 'esquerda',
  left: 'esquerda',
  centro: 'centro',
  center: 'centro',
  direita: 'direita',
  right: 'direita',
  'far-right': 'ext-direita',
  'right-extreme': 'ext-direita',
  'third position': 'terceira',
  'third-position': 'terceira',
  libertarian: 'libertario',
  anarquismo: 'anarquismo',
  anarchist: 'anarquismo'
};

export const SPECTRUM_ORDER: IdeologyColor[] = [
  PALETTE['esq-radical'],
  PALETTE.esquerda,
  PALETTE.centro,
  PALETTE.direita,
  PALETTE['ext-direita'],
  PALETTE.terceira,
  PALETTE.libertario,
  PALETTE.anarquismo
];

export function resolveIdeologyColor(category: string): IdeologyColor {
  return PALETTE[ALIASES[category.trim().toLowerCase()] ?? 'centro'];
}

/** Variáveis CSS que os componentes editoriais leem (--cat/--cat-bg ou --c/--cb). */
export function catStyle(category: string): Record<string, string> {
  const color = resolveIdeologyColor(category);
  return { '--cat': color.base, '--cat-bg': color.bg };
}

export function localCatStyle(category: string): Record<string, string> {
  const color = resolveIdeologyColor(category);
  return { '--c': color.base, '--cb': color.bg };
}
