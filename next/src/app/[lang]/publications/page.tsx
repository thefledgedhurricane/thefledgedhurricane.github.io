import { Metadata } from 'next';
import { getDictionary, locales, type Locale } from '@/lib/dictionaries';
import PublicationsClient from './PublicationsClient';

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
    title: dict.publications?.meta_title || 'Publications & Recherche',
    description: dict.publications?.meta_desc || '',
  };
}

export default async function PublicationsPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);
  return <PublicationsClient dict={dict} />;
}
