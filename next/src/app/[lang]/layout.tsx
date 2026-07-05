import type { Metadata } from 'next';
import { Noto_Sans_Arabic } from 'next/font/google';
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { locales, isRTL, type Locale } from '@/lib/dictionaries';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  title: {
    default: 'Dr. Ihababdelbasset ANNAKI',
    template: '%s | Dr. Ihababdelbasset ANNAKI',
  },
  description: 'Academic platform — Research, Teaching & AI Projects',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://thefledgedhurricane.github.io'
  ),
};

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const { lang } = params;
  const dir = isRTL(lang) ? 'rtl' : 'ltr';

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable} ${notoArabic.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#A4863D" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"
          integrity="sha384-GMR9m/tUiK3wDFA96qhCFYeA5A14McPk5DX1T5Yuaa4E5C1Wv9Gr1yk6XdeyqB"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`antialiased transition-colors duration-500 font-sans bg-white text-gray-900 ${
          dir === 'rtl' ? 'font-arabic' : ''
        }`}
      >
        <Header lang={lang} />
        {children}
        <Footer lang={lang} />
      </body>
    </html>
  );
}
