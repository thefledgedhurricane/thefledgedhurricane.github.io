import { notFound } from 'next/navigation';
import { client, queries, urlFor } from '@/lib/sanity';
import { Post } from '@/lib/sanity-types';
import { generateJsonLd, generateBreadcrumbJsonLd } from '@/lib/jsonld';
import PortableTextRenderer from '@/components/PortableTextRenderer';
import Link from 'next/link';
import Image from 'next/image';
import ShareButtons from '@/components/ShareButtons';

interface PostPageProps { params: { slug: string } }

async function getPost(slug: string): Promise<Post | null> {
  try {
    const post = await client.fetch(queries.postBySlug, { slug });
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}



export default async function PostPage({ params }: any) {
  const { slug } = params;
  const post = await getPost(slug);
  
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
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Accueil', url: `${process.env.NEXT_PUBLIC_SITE_URL}/` },
    { name: 'Articles', url: `${process.env.NEXT_PUBLIC_SITE_URL}/posts` },
    { name: post.title, url: `${process.env.NEXT_PUBLIC_SITE_URL}/posts/${post.slug.current}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
  <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
        {/* Hero Section */}
        <div className="bg-gray-50 dark:bg-gray-900 py-16 transition-colors">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200">
                    Accueil
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li>
                  <Link href="/posts" className="hover:text-gray-700 dark:hover:text-gray-200">
                    Articles
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li className="text-gray-900 dark:text-white font-medium truncate">
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
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
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
                      <span className="font-medium text-gray-900 dark:text-gray-100">
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
          {post.content && (
            <PortableTextRenderer content={post.content} />
          )}
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Partager</h3>
            <ShareButtons
              url={`${process.env.NEXT_PUBLIC_SITE_URL}/posts/${post.slug.current}`}
              title={post.title}
              summary={post.excerpt || ''}
            />
          </div>
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

export async function generateMetadata({ params }: any) {
  const { slug } = params;
  const post = await getPost(slug);
  
  if (!post) {
    return {
      title: 'Article non trouvé',
    };
  }

  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/posts/${post.slug.current}`;

  const ogImage = post.featuredImage
    ? urlFor(post.featuredImage).width(1200).height(630).url()
    : '/og-image.jpg';

  return {
    title: post.title,
    description: post.excerpt || `Article par ${post.authors?.[0]?.name || 'Dr. Ihababdelbasset ANNAKI'}`,
    alternates: {
      canonical: `/posts/${post.slug.current}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      type: 'article',
      publishedTime: post.publishedAt,
      url: pageUrl,
      authors: post.authors?.map(author => author?.name).filter(Boolean) || ['Dr. Ihababdelbasset ANNAKI'],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.featuredImage?.alt || post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || '',
      images: [ogImage],
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