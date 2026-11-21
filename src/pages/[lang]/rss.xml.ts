import type { APIRoute } from 'astro';
import { SITE } from '../../config';
import { langCodes, type Lang } from '../../i18n/languages';
import { getPosts, postPath } from '../../utils/posts';

const esc = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export function getStaticPaths() {
  return langCodes.map((lang) => ({ params: { lang } }));
}

export const GET: APIRoute = async ({ params, site }) => {
  const lang = params.lang as Lang;
  const base = site ?? new URL(SITE.url);
  const posts = (await getPosts(lang)).slice(0, 30);
  const self = new URL(`/${lang}/rss.xml`, base).href;

  const items = posts
    .map((post) => {
      const link = new URL(postPath(post), base).href;
      const categories = post.data.tags.map((t) => `<category>${esc(t)}</category>`).join('');
      return `<item><title>${esc(post.data.title)}</title><link>${link}</link><guid isPermaLink="true">${link}</guid><pubDate>${post.data.pubDate.toUTCString()}</pubDate><description>${esc(post.data.description)}</description>${categories}</item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${esc(SITE.name[lang])}</title><link>${new URL(`/${lang}/`, base).href}</link><description>${esc(SITE.description[lang])}</description><language>${lang}</language><atom:link href="${self}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
