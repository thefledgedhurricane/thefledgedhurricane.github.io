import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { generateJsonLd } from '@/lib/jsonld';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ subsets: ['latin'], weight: ['300','400','500','600','700'], variable: '--font-poppins' });

const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Portfolio',
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Personal portfolio showcasing projects and skills',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000',
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['portfolio', 'developer', 'projects', 'web development', 'software engineer'],
  authors: [{ name: 'Portfolio Owner' }],
  creator: 'Portfolio Owner',
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = generateJsonLd({
    type: 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  });

  return (
  <html lang="en" className={`scroll-smooth ${inter.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2563eb" />
      </head>
  <body className={`antialiased transition-colors duration-300 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100`}>
        <Header />
        <main>
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}