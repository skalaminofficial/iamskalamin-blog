# Sheikh Al-Amin Ariyan: Personal Blog

A fast, modern, multilingual personal blog about technology, travel and life. Built with [Astro](https://astro.build), content stored in Git, deployed on Cloudflare Pages.

## Features

- Bilingual (English and Bengali), easy to extend with more languages
- Light, dark and system themes, plus four accent colors
- Full-text search ([Pagefind](https://pagefind.app)), runs in the browser
- Markdown and MDX posts with tags, reading time, table of contents and related posts
- SEO: sitemap, RSS per language, OpenGraph, structured data, hreflang
- Security headers and a strict Content Security Policy
- Privacy Policy, Cookie Policy and Terms of Use pages

## Tech stack

| Part | Choice |
|---|---|
| Framework | Astro |
| Content | Markdown/MDX in `src/content` |
| Styling | Plain CSS with design tokens |
| Search | Pagefind |
| Hosting | Cloudflare Pages |
| CI | GitHub Actions |

## Local development

Requires Node.js 22.22.0 or newer.

```bash
npm install
npm run dev
```

Build and preview the production site (search only works on a built site):

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  content/     Posts (blog/) and static pages (pages/), one folder per language
  components/  Reusable UI (layout, blog, search, seo, ui)
  layouts/     Page frames (BaseLayout, PostLayout)
  pages/       Routes: every file becomes a URL
  i18n/        Languages and translation JSON files
  styles/      Design tokens, global and article styles
  utils/       Helpers
public/        Static files: headers, robots.txt, icons, manifest
```

## Writing a post

Create `src/content/blog/<lang>/<slug>.md`:

```md
---
title: "My post"
description: "A short summary"
pubDate: 2026-11-21
tags: ["tech"]
draft: false
---

Content here.
```

Use the same file name in each language folder to link translations together. Tags are lowercase English words; add a display name in each `src/i18n/*.json` as `tag.<name>`.

## Adding a language

1. Add the language to `src/i18n/languages.ts`
2. Create `src/i18n/<code>.json` and register it in `src/i18n/index.ts`
3. Add the code to `locales` in `astro.config.mjs`
4. Add content folders `src/content/blog/<code>/` and `src/content/pages/<code>/`

## Deployment (Cloudflare Pages)

- Build command: `npm run build`
- Build output directory: `dist`

## Security

See [SECURITY.md](SECURITY.md).

## License

Code is released under the [MIT License](LICENSE). Written content and images in `src/content` are © Sheikh Al-Amin Ariyan, all rights reserved.
