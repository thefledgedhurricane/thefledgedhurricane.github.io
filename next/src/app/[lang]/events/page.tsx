import { Metadata } from 'next';
import { getDictionary, locales, type Locale } from '@/lib/dictionaries';
import EventsClient from './EventsClient';

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
    title: dict.events?.meta_title || 'Events',
    description: dict.events?.meta_desc || '',
  };
}

export default async function EventsPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);
  return <EventsClient dict={dict} lang={params.lang} />;
}
