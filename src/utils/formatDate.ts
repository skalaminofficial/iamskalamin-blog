import type { Lang } from '../i18n/languages';

const locales: Record<string, string> = { en: 'en-US', bn: 'bn-BD' };
const localeOf = (lang: Lang) => locales[lang] ?? lang;

export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(localeOf(lang), {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** সংখ্যা ভাষা অনুযায়ী: 5 → ৫ (বাংলায়) */
export function formatNumber(n: number, lang: Lang): string {
  return new Intl.NumberFormat(localeOf(lang)).format(n);
}
