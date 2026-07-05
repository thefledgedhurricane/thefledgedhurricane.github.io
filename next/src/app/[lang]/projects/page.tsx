import { Metadata } from 'next';
import { getDictionary, locales, type Locale } from '@/lib/dictionaries';
import ProjectsClient from './ProjectsClient';

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
    title: dict.projects?.meta_title || 'Projects',
    description: dict.projects?.meta_desc || '',
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);
  return <ProjectsClient dict={dict} lang={params.lang} />;
}
