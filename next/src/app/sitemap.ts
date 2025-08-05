import { MetadataRoute } from 'next';
import { getProjects } from '@/lib/sanity';
import { Project } from '@/lib/sanity-types';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
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
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Dynamic project pages
  let projectPages: MetadataRoute.Sitemap = [];
  
  try {
    const projects = await getProjects();
    projectPages = projects.map((project: Project) => ({
        url: `${baseUrl}/projects/${project.slug.current}`,
        lastModified: new Date(project._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: project.featured ? 0.9 : 0.7,
    }));
  } catch (error) {
    console.error('Error generating sitemap for projects:', error);
  }

  return [...staticPages, ...projectPages];
}