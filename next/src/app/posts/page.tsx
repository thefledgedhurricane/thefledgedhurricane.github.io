import { Metadata } from 'next';
import Link from 'next/link';
import { getPosts, urlFor } from '@/lib/sanity';
import { Post } from '@/lib/sanity-types';
import { generateJsonLd } from '@/lib/jsonld';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Blog Posts',
  description: 'Articles, insights, and thoughts by Dr. Ihababdelbasset ANNAKI on AI, technology, and research.',
  openGraph: {
    title: 'Blog Posts | Dr. Ihababdelbasset ANNAKI',
    description: 'Articles, insights, and thoughts on AI, technology, and research.',
    type: 'website',
  },
};

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden">
      {post.featuredImage && (
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={urlFor(post.featuredImage).width(600).height(400).url()}
            alt={post.featuredImage.alt || post.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
            {post.category}
          </div>
          {post.featured && (
            <div className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
              En vedette
            </div>
          )}
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
          <Link href={`/posts/${post.slug.current}`}>
            {post.title}
          </Link>
        </h2>
        
        {post.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            {post.authors && post.authors.length > 0 && (
              <span>Par {post.authors[0].name}</span>
            )}
            <span>
              {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          {post.readingTime && (
            <span>{post.readingTime} min de lecture</span>
          )}
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default async function PostsPage() {
  const posts = await getPosts();
  
  // Sort posts by publication date (most recent first)
  const sortedPosts = posts.sort((a: Post, b: Post) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
  
  const featuredPosts = sortedPosts.filter((post: Post) => post.featured);
  
  const jsonLd = generateJsonLd({
    type: 'WebPage',
    name: 'Blog Posts',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/posts`,
    description: 'Articles, insights, and thoughts by Dr. Ihababdelbasset ANNAKI on AI, technology, and research.',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez mes articles, réflexions et analyses sur l'Intelligence Artificielle, 
              la technologie et la recherche académique.
            </p>
          </div>
          
          {/* Posts Content */}
          {posts.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  <strong>{posts.length}</strong> article{posts.length > 1 ? 's' : ''} publié{posts.length > 1 ? 's' : ''}
                  {featuredPosts.length > 0 && (
                    <> • <strong>{featuredPosts.length}</strong> en vedette</>
                  )}
                </p>
              </div>
              
              {/* Featured Posts */}
              {featuredPosts.length > 0 && (
                <section className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    Articles en Vedette
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {featuredPosts.slice(0, 6).map((post: Post) => (
                      <PostCard key={post._id} post={post} />
                    ))}
                  </div>
                </section>
              )}
              
              {/* All Posts */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Tous les Articles
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {sortedPosts.map((post: Post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              </section>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Aucun Article</h2>
                <p className="text-gray-600">
                  Les articles de blog apparaîtront ici une fois qu&apos;ils seront publiés dans le CMS Sanity.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}