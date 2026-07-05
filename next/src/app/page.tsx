'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { defaultLocale, locales, type Locale } from '@/lib/dictionaries';

const localePreferenceKey = 'preferred-locale';

function isLocale(value: string | null): value is Locale {
  return value !== null && locales.includes(value as Locale);
}

function detectLocale(): Locale {
  const savedLocale = window.localStorage.getItem(localePreferenceKey);
  if (isLocale(savedLocale)) return savedLocale;

  for (const language of navigator.languages) {
    const languageCode = language.toLowerCase().split('-')[0];
    if (isLocale(languageCode)) return languageCode;
  }

  return defaultLocale;
}

export default function RootPage() {
  useEffect(() => {
    window.location.replace(`/${detectLocale()}/`);
  }, []);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-5">Choose your language</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/ar/" className="rounded-full border px-5 py-2">العربية</Link>
          <Link href="/fr/" className="rounded-full border px-5 py-2">Français</Link>
          <Link href="/en/" className="rounded-full border px-5 py-2">English</Link>
          <Link href="/es/" className="rounded-full border px-5 py-2">Español</Link>
        </div>
      </div>
    </main>
  );
}
