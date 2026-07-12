import { MetadataRoute } from 'next';
import { locales } from '../lib/dictionaries';
import { courses } from '../lib/lms-data';
import { getPosts } from '../lib/content';

export const dynamic = 'force-static';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thefledgedhurricane.github.io';

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Root redirect entry
  sitemapEntries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1.0,
  });

  // Localized static pages
  const staticPages = ['about', 'projects', 'posts', 'publications', 'teaching', 'events', 'showcase', 'contact'];

  for (const lang of locales) {
    // Language home index
    sitemapEntries.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    // Localized sections
    for (const page of staticPages) {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/${page}`,
        lastModified: new Date(),
        changeFrequency: page === 'about' || page === 'contact' || page === 'showcase' ? 'monthly' : 'weekly',
        priority: 0.8,
      });
    }

    for (const post of getPosts(lang)) {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/posts/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }

    // Localized dynamic courses
    for (const course of courses) {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/teaching/modules/${course.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return sitemapEntries;
}
