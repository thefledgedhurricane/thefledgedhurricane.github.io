import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thefledgedhurricane.github.io';

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages only for now - dynamic content will be handled differently
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/publications`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/teaching`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/showcase`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  const teachingPaths = [
    'teaching/parcours',
    'teaching/parcours/ia-specialise',
    'teaching/parcours/intro-ia-fondamentaux',
    'teaching/parcours/intro-ia-types-ml',
    'teaching/modules/ia-1-introduction',
    'teaching/modules/ia-2-apprentissage-supervise',
    'teaching/modules/ia-3-apprentissage-non-supervise',
    'teaching/modules/ia-4-deep-learning-tabular',
    'teaching/modules/intelligence-artificielle',
    'teaching/modules/programmation-bases',
    'teaching/modules/algorithmique',
    'teaching/modules/python',
    'teaching/modules/langage-c',
    'teaching/modules/developpement-web',
  ].map((path) => ({
    url: `${baseUrl}/${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...teachingPaths];
}
