/** মিনিটে পড়ার সময় (প্রতি মিনিটে ২০০ শব্দ ধরে) */
export function readingTime(text = ''): number {
  const clean = text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_~`\[\]()!-]/g, ' ');
  const words = clean.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
