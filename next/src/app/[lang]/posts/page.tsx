import { Metadata } from 'next';
import { getDictionary, locales, type Locale } from '@/lib/dictionaries';
import PostsClient from './PostsClient';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang) as any;
  return {
    title: dict.posts?.meta_title || 'Blog',
    description: dict.posts?.meta_desc || '',
  };
}

export default async function PostsPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);
  return <PostsClient dict={dict} lang={params.lang} />;
}
