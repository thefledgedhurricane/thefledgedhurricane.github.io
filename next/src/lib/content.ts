import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import type { Locale } from './dictionaries';

export interface PostContent {
  locale: Locale;
  translationKey: string;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTime: number;
  category: string;
  tags: string[];
  featured: boolean;
  image?: string;
  body: string;
}

const contentRoot = path.join(process.cwd(), 'content');

function scalar(value: string): string | boolean | number | string[] {
  const clean = value.trim().replace(/^['"]|['"]$/g, '');
  if (clean === 'true' || clean === 'false') return clean === 'true';
  if (/^\d+$/.test(clean)) return Number(clean);
  if (clean.startsWith('[') && clean.endsWith(']')) {
    return clean.slice(1, -1).split(',').map((item) => item.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
  }
  return clean;
}

function parseMdx(source: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error('MDX file is missing YAML frontmatter');
  const data: Record<string, string | boolean | number | string[]> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(':');
    if (separator > 0) data[line.slice(0, separator).trim()] = scalar(line.slice(separator + 1));
  }
  return { data, body: match[2].trim() };
}

export function getPosts(locale: Locale): PostContent[] {
  const directory = path.join(contentRoot, 'posts', locale);
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const { data, body } = parseMdx(fs.readFileSync(path.join(directory, file), 'utf8'));
      return {
        locale,
        translationKey: String(data.translationKey),
        slug: String(data.slug),
        title: String(data.title),
        description: String(data.description),
        publishedAt: String(data.publishedAt),
        readingTime: Number(data.readingTime),
        category: String(data.category),
        tags: Array.isArray(data.tags) ? data.tags : [],
        featured: Boolean(data.featured),
        image: data.image ? String(data.image) : undefined,
        body,
      };
    })
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export function getPost(locale: Locale, slug: string) {
  return getPosts(locale).find((post) => post.slug === slug);
}
