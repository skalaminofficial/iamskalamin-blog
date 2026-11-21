import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  // ডিপ্লয়ের পর আসল ঠিকানা বসাবেন
  site: 'https://iamskalaminblog.pages.dev',
  trailingSlash: 'always',
  integrations: [mdx()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'bn'],
    routing: { prefixDefaultLocale: true },
  },
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
