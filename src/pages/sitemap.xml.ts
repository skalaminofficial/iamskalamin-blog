import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../config';
import { langCodes } from '../i18n/languages';
import { getAllPosts, getTags, postPath } from '../utils/posts';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL(SITE.url);
  const urls: { path: string; lastmod?: Date }[] = [];

  for (const lang of langCodes) {
    urls.push({ path: `/${lang}/` }, { path: `/${lang}/blog/` }, { path: `/${lang}/tags/` });
    for (const { tag } of await getTags(lang)) urls.push({ path: `/${lang}/tags/${tag}/` });
  }

  for (const post of await getAllPosts()) {
    urls.push({ path: postPath(post), lastmod: post.data.updatedDate ?? post.data.pubDate });
  }

  for (const page of await getCollection('pages')) {
    const [lang, ...rest] = page.id.split('/');
    urls.push({ path: `/${lang}/${rest.join('/')}/`, lastmod: page.data.updatedDate });
  }

  const body = urls
    .map(({ path, lastmod }) => {
      const loc = esc(new URL(path, base).href);
      const mod = lastmod ? `<lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>` : '';
      return `<url><loc>${loc}</loc>${mod}</url>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
