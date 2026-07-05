import { Metadata } from 'next';
import { getDictionary, locales, type Locale } from '@/lib/dictionaries';
import TeachingClient from './TeachingClient';


export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale) as any;
  return {
    title: dict.teaching?.meta_title || 'Enseignement & Formation',
    description: dict.teaching?.meta_desc || '',
  };
}

export default async function TeachingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  return <TeachingClient dict={dict} lang={locale} />;
}
