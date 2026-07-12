import { Metadata } from 'next';
import { getDictionary, type Locale } from '@/lib/dictionaries';
import PostsClient from './PostsClient';
import { getPosts } from '@/lib/content';


export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale) as { posts?: Record<string, string> };
  return {
    title: dict.posts?.meta_title || 'Blog',
    description: dict.posts?.meta_desc || '',
  };
}

export default async function PostsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  return <PostsClient dict={dict} lang={locale} posts={getPosts(locale)} />;
}
