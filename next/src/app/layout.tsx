import type { Metadata } from 'next';
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import AnimatedMeshGradient from '@/components/AnimatedMeshGradient';
import FloatingOrbs from '@/components/FloatingOrbs';

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

const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Portfolio',
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Personal portfolio showcasing projects and skills',
  // Par défaut, pointer vers le domaine GitHub Pages (utile si la variable d'env n'est pas fournie en CI)
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://thefledgedhurricane.github.io',
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
  // Laisser chaque page définir sa canonical si nécessaire
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


  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#A4863D" />
      </head>
      <body className={`antialiased transition-colors duration-500 font-sans bg-white text-gray-900`}>
        {/* 2025 Modern UI Enhancements */}
        <FloatingOrbs />
        <AnimatedMeshGradient />
        <ScrollProgress />
        <CustomCursor />
        
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}