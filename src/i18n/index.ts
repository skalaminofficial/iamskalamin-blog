import en from './en.json';
import bn from './bn.json';
import { defaultLang, languages, type Lang } from './languages';

const dictionaries: Record<Lang, Record<string, string>> = { en, bn };

export const isLang = (value?: string): value is Lang =>
  !!value && value in languages;

/** URL থেকে ভাষা বের করে: /bn/blog/ → 'bn' */
export function getLangFromUrl(url: URL): Lang {
  const first = url.pathname.split('/').filter(Boolean)[0];
  return isLang(first) ? first : defaultLang;
}

/** অনুবাদ ফাংশন। কী না পেলে ইংরেজি, তাও না পেলে কী-টাই দেখায় */
export function useTranslations(lang: Lang) {
  return function t(key: string, vars: Record<string, string | number> = {}): string {
    let text = dictionaries[lang]?.[key] ?? dictionaries[defaultLang][key] ?? key;
    for (const [name, value] of Object.entries(vars)) {
      text = text.replaceAll(`{${name}}`, String(value));
    }
    return text;
  };
}

/** ভাষাসহ পথ: localePath('bn', 'blog') → /bn/blog/ */
export function localePath(lang: Lang, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `/${lang}/${clean}/` : `/${lang}/`;
}

/** একই পেজের অন্য ভাষার লিংক (ভাষা বদলানোর বাটনের জন্য) */
export function switchLangPath(url: URL, target: Lang): string {
  const parts = url.pathname.split('/').filter(Boolean);
  if (isLang(parts[0])) parts.shift();
  return localePath(target, parts.join('/'));
}
