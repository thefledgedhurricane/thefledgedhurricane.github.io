export type Locale = 'ar' | 'fr' | 'en' | 'es';
export const defaultLocale: Locale = 'ar';
export const locales: Locale[] = ['ar', 'fr', 'en', 'es'];
export const rtlLocales: Locale[] = ['ar'];

export function isRTL(lang: Locale): boolean {
  return rtlLocales.includes(lang);
}

const dictionaries: Record<Locale, () => Promise<Record<string, unknown>>> = {
  ar: () => import('@/dictionaries/ar.json').then((m) => m.default),
  fr: () => import('@/dictionaries/fr.json').then((m) => m.default),
  en: () => import('@/dictionaries/en.json').then((m) => m.default),
  es: () => import('@/dictionaries/es.json').then((m) => m.default),
};

export async function getDictionary(lang: Locale) {
  return dictionaries[lang]();
}
