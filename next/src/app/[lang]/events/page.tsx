import { Metadata } from 'next';
import { getDictionary, type Locale } from '@/lib/dictionaries';
import EventsClient from './EventsClient';
import { getEvents } from '@/lib/content';


export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale) as { events?: Record<string, string> };
  return {
    title: dict.events?.meta_title || 'Events',
    description: dict.events?.meta_desc || '',
  };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const events = getEvents(locale).map((event) => ({
    id: event.eventId, title: event.title, description: event.description,
    startDate: event.startsAt, endDate: event.endsAt, type: event.eventType,
    location: event.location, isVirtual: event.isVirtual, organizer: event.organizer,
    featured: event.featured, details: event.details,
  }));
  return <EventsClient dict={dict} lang={locale} events={events} />;
}
