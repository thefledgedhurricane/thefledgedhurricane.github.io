import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getPost, getPosts } from '@/lib/content';
import { locales, type Locale } from '@/lib/dictionaries';

export function generateStaticParams() {
  return locales.flatMap((lang) => getPosts(lang).map(({ slug }) => ({ lang, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getPost(lang, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/${lang}/posts/${slug}/`,
      languages: Object.fromEntries(locales.flatMap((locale) => {
        const translated = getPosts(locale).find((item) => item.translationKey === post.translationKey);
        return translated ? [[locale, `/${locale}/posts/${translated.slug}/`]] : [];
      })),
    },
    openGraph: { title: post.title, description: post.description, type: 'article', publishedTime: post.publishedAt, images: post.image ? [post.image] : [] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ lang: Locale; slug: string }> }) {
  const { lang, slug } = await params;
  const post = getPost(lang, slug);
  if (!post) notFound();
  return <main className="max-w-4xl mx-auto px-6 py-32">
    <div className="text-sm text-mckinsey-teal-600 mb-5">{post.category} · {post.readingTime} min</div>
    <h1 className="text-4xl md:text-6xl text-mckinsey-navy-900 mb-6 leading-tight">{post.title}</h1>
    <p className="text-xl text-gray-600 mb-12">{post.description}</p>
    <article className="markdown-content prose prose-lg max-w-none"><ReactMarkdown>{post.body}</ReactMarkdown></article>
  </main>;
}
