import { notFound } from 'next/navigation';
import { client, queries, urlFor } from '@/lib/sanity';
import { Post } from '@/lib/sanity-types';
import { generateJsonLd } from '@/lib/jsonld';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';

interface PostPageProps {
  params: {
    slug: string;
  };
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const post = await client.fetch(queries.postBySlug, { slug });
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Portable Text components for rich content rendering
const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <Image
          src={urlFor(value).width(800).height(600).url()}
          alt={value.alt || 'Article image'}
          width={800}
          height={600}
          className="rounded-lg shadow-md"
        />
        {value.caption && (
          <p className="text-sm text-gray-600 text-center mt-2 italic">
            {value.caption}
          </p>
        )}
      </div>
    ),
    codeBlock: ({ value }: any) => (
      <div className="my-6">
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <code className={`language-${value.language || 'text'}`}>
            {value.code}
          </code>
        </pre>
        {value.filename && (
          <p className="text-sm text-gray-600 mt-2">
            Fichier: <code className="bg-gray-100 px-1 rounded">{value.filename}</code>
          </p>
        )}
      </div>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{children}</code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target={value.blank ? '_blank' : '_self'}
        rel={value.blank ? 'noopener noreferrer' : undefined}
        className="text-blue-600 hover:text-blue-800 underline"
      >
        {children}
      </a>
    ),
  },
};

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.slug);
  
  if (!post) {
    notFound();
  }

  const jsonLd = generateJsonLd({
    type: 'BlogPosting',
    name: post.title,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/posts/${post.slug.current}`,
    description: post.excerpt || '',
    datePublished: post.publishedAt,
    author: post.authors?.[0]?.name || 'Dr. Ihababdelbasset ANNAKI',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-500">
                <li>
                  <Link href="/" className="hover:text-gray-700">
                    Accueil
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li>
                  <Link href="/posts" className="hover:text-gray-700">
                    Articles
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li className="text-gray-900 font-medium truncate">
                  {post.title}
                </li>
              </ol>
            </nav>

            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center space-x-4 mb-6">
                {post.category && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                )}
                {post.featured && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    En vedette
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>
              
              {post.excerpt && (
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-6">
                  {post.authors && post.authors.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span>Par</span>
                      <span className="font-medium text-gray-900">
                        {post.authors[0].name}
                      </span>
                    </div>
                  )}
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                {post.readingTime && (
                  <span>{post.readingTime} min de lecture</span>
                )}
              </div>
            </header>
          </div>
        </div>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="max-w-6xl mx-auto px-6 lg:px-8 -mt-8 mb-12">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              <Image
                src={urlFor(post.featuredImage).width(1200).height(675).url()}
                alt={post.featuredImage.alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-6 lg:px-8 pb-16">
          <div className="prose prose-lg max-w-none">
            {post.content && (
              <PortableText
                value={post.content}
                components={portableTextComponents}
              />
            )}
          </div>
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Navigation */}
        <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-16">
          <div className="border-t border-gray-200 pt-8">
            <Link
              href="/posts"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour aux articles
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Article non trouvé',
    };
  }

  return {
    title: post.title,
    description: post.excerpt || `Article par ${post.authors?.[0]?.name || 'Dr. Ihababdelbasset ANNAKI'}`,
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.authors?.map(author => author.name) || ['Dr. Ihababdelbasset ANNAKI'],
      images: post.featuredImage ? [{
        url: urlFor(post.featuredImage).width(1200).height(630).url(),
        width: 1200,
        height: 630,
        alt: post.featuredImage.alt || post.title,
      }] : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const posts = await client.fetch(`*[_type == "post"]{ slug }`);
    return posts.map((post: any) => ({
      slug: post.slug.current,
    }));
  } catch (error) {
    console.error('Error generating static params for posts:', error);
    return [];
  }
}