interface JsonLdBase {
  '@context': string;
  '@type': string;
}

interface OrganizationJsonLd extends JsonLdBase {
  '@type': 'Organization';
  name: string;
  url: string;
  description?: string;
  logo?: string;
  sameAs?: string[];
}

interface PersonJsonLd extends JsonLdBase {
  '@type': 'Person';
  name: string;
  url: string;
  description?: string;
  image?: string;
  jobTitle?: string;
  worksFor?: {
    '@type': 'Organization';
    name: string;
  };
  sameAs?: string[];
}

interface BlogPostingJsonLd extends JsonLdBase {
  '@type': 'BlogPosting';
  headline: string;
  description: string;
  image: string;
  author: {
    '@type': 'Person';
    name: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  datePublished: string;
  dateModified?: string;
  url: string;
}

interface WebPageJsonLd extends JsonLdBase {
  '@type': 'WebPage';
  name: string;
  description: string;
  url: string;
  mainEntity?: any;
}

type JsonLdType = OrganizationJsonLd | PersonJsonLd | BlogPostingJsonLd | WebPageJsonLd;

interface GenerateJsonLdParams {
  type: 'Organization' | 'Person' | 'BlogPosting' | 'WebPage';
  name: string;
  url: string;
  description?: string;
  image?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  jobTitle?: string;
  logo?: string;
  sameAs?: string[];
}

export function generateJsonLd(params: GenerateJsonLdParams): JsonLdType {
  const baseJsonLd = {
    '@context': 'https://schema.org',
    '@type': params.type,
  };

  switch (params.type) {
    case 'Organization':
      return {
        ...baseJsonLd,
        '@type': 'Organization',
        name: params.name,
        url: params.url,
        description: params.description,
        logo: params.logo,
        sameAs: params.sameAs,
      } as OrganizationJsonLd;

    case 'Person':
      return {
        ...baseJsonLd,
        '@type': 'Person',
        name: params.name,
        url: params.url,
        description: params.description,
        image: params.image,
        jobTitle: params.jobTitle,
        sameAs: params.sameAs,
      } as PersonJsonLd;

    case 'BlogPosting':
      return {
        ...baseJsonLd,
        '@type': 'BlogPosting',
        headline: params.name,
        description: params.description || '',
        image: params.image || '',
        author: {
          '@type': 'Person',
          name: params.author || 'Portfolio Owner',
        },
        publisher: {
          '@type': 'Organization',
          name: process.env.NEXT_PUBLIC_SITE_NAME || 'Portfolio',
          logo: {
            '@type': 'ImageObject',
            url: params.logo || '/logo.png',
          },
        },
        datePublished: params.datePublished || new Date().toISOString(),
        dateModified: params.dateModified,
        url: params.url,
      } as BlogPostingJsonLd;

    case 'WebPage':
      return {
        ...baseJsonLd,
        '@type': 'WebPage',
        name: params.name,
        description: params.description || '',
        url: params.url,
      } as WebPageJsonLd;

    default:
      throw new Error(`Unsupported JSON-LD type: ${params.type}`);
  }
}

export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}