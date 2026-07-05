import { Metadata } from 'next';
import { getDictionary, locales, type Locale } from '@/lib/dictionaries';
import TeachingClient from './TeachingClient';

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
    title: dict.teaching?.meta_title || 'Enseignement & Formation',
    description: dict.teaching?.meta_desc || '',
  };
}

export default async function TeachingPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);
  return <TeachingClient dict={dict} lang={params.lang} />;
}
