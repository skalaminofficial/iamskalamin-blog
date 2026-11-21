export const languages = {
  en: { nativeName: 'English', htmlLang: 'en', dir: 'ltr' },
  bn: { nativeName: 'বাংলা', htmlLang: 'bn', dir: 'ltr' },
  // নতুন ভাষা: এখানে এক লাইন + একটি JSON ফাইল + astro.config.mjs-এর locales
  // ar: { nativeName: 'العربية', htmlLang: 'ar', dir: 'rtl' },
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';
export const langCodes = Object.keys(languages) as Lang[];
