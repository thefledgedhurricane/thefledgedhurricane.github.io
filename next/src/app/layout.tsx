import type { Metadata } from 'next';
import './globals.css';

// Root layout — minimal shell.
// <html>, <Header>, <Footer> are now provided by [lang]/layout.tsx
// This root layout only provides the globals.css import and base metadata.
export const metadata: Metadata = {
  title: {
    default: 'Dr. Ihababdelbasset ANNAKI',
    template: '%s | Dr. Ihababdelbasset ANNAKI',
  },
  description: 'Academic platform — Research, Teaching & AI Projects',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://thefledgedhurricane.github.io'
  ),
  keywords: ['artificial intelligence', 'machine learning', 'virtual reality', 'education', 'research', 'Dr. Ihababdelbasset ANNAKI'],
  authors: [{ name: 'Dr. Ihababdelbasset ANNAKI' }],
  creator: 'Dr. Ihababdelbasset ANNAKI',
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // The [lang]/layout.tsx handles <html lang> and <body>.
  // This layout wraps only the root redirect page (/ar).
  return children;
}