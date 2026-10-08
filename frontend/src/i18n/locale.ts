export type Lang = 'en' | 'fr';

export function languageForPath(path: string): Lang {
  return /^\/fr(?:\/|\.html|$)/.test(path) ? 'fr' : 'en';
}

export function unprefixedPath(path: string): string {
  return path.replace(/^\/fr(?=\/|\.html|$)/, '').replace(/\.html$/, '').replace(/\/+$/, '') || '/';
}

export const LANG: Lang = typeof window === 'undefined' ? 'en' : languageForPath(window.location.pathname);

export function localePath(path: string, lang: Lang = LANG): string {
  const bare = unprefixedPath(path);
  return lang === 'fr' ? `/fr${bare === '/' ? '' : bare}` : bare;
}

export function languageSwitchUrl(): string {
  return localePath(window.location.pathname, LANG === 'fr' ? 'en' : 'fr') + window.location.search + window.location.hash;
}
