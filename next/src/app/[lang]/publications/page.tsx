import { Metadata } from 'next';
import { getDictionary, type Locale } from '@/lib/dictionaries';
import { getPublications } from '@/lib/content';
import PublicationsClient from './PublicationsClient';


export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale) as { publications?: Record<string, string> };
  return {
    title: dict.publications?.meta_title || 'Publications & Recherche',
    description: dict.publications?.meta_desc || '',
  };
}

export default async function PublicationsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const publications = getPublications().map((item) => ({ id: item.publicationId, title: item.title,
    authors: item.authors.join('; '), year: item.year, journal: item.venue, doi: item.doi,
    citedBy: item.citedBy, type: item.publicationType, abstract: item.abstract,
    keywords: item.tags, link: item.url }));
  return <PublicationsClient dict={dict} publications={publications} />;
}
