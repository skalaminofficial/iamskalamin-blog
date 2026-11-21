import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/languages';

export type Post = CollectionEntry<'blog'>;
export const PAGE_SIZE = 9;

// ফাইলের পথ থেকে ভাষা ও স্লাগ: blog/bn/my-post.md → bn, my-post
export const postLang = (post: Post) => post.id.split('/')[0] as Lang;
export const postSlug = (post: Post) => post.id.split('/').slice(1).join('/');
export const postPath = (post: Post) => `/${postLang(post)}/blog/${postSlug(post)}/`;

// ড্রাফট শুধু লোকাল ডেভেলপমেন্টে দেখায়, লাইভ সাইটে নয়
const isPublished = ({ data }: Post) => import.meta.env.DEV || !data.draft;

export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', isPublished);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getPosts(lang: Lang): Promise<Post[]> {
  return (await getAllPosts()).filter((p) => postLang(p) === lang);
}

export async function getTags(lang: Lang) {
  const counts = new Map<string, number>();
  for (const post of await getPosts(lang)) {
    for (const tag of post.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** ট্যাগের সুন্দর নাম (JSON-এ না থাকলে ট্যাগটাই দেখায়) */
export function tagLabel(t: (key: string) => string, tag: string): string {
  const key = `tag.${tag}`;
  const value = t(key);
  return value === key ? tag : value;
}
