'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/dictionaries';
import type { PostContent } from '@/lib/content';

interface PostsDictionary {
  posts?: Record<string, string>;
}

export default function PostsClient({ dict, lang, posts }: { dict: PostsDictionary; lang: Locale; posts: PostContent[] }) {
  const t = dict.posts || {};
  return <main className="min-h-screen bg-white text-gray-900">
    <section className="relative h-[55vh] overflow-hidden">
      <Image src="/posts/hello-hero.svg" alt="" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-mckinsey-navy-900/70 flex flex-col items-center justify-center px-6 text-center text-white">
        <span className="text-sm mb-5">{t.badge || 'Blog'}</span>
        <h1 className="text-5xl md:text-7xl mb-6">{t.title || 'Articles'}</h1>
        <p className="max-w-2xl text-lg text-white/80">{t.desc}</p>
      </div>
    </section>
    <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12">
      {posts.map((post) => <article key={post.translationKey} className="group">
        <Link href={`/${lang}/posts/${post.slug}/`} className="block focus-visible:outline focus-visible:outline-2">
          {post.image && <div className="relative aspect-[16/9] overflow-hidden mb-6"><Image src={post.image} alt="" fill className="object-cover group-hover:scale-105 transition-transform" /></div>}
          <div className="text-sm text-mckinsey-teal-600 mb-3">{post.category} · {post.readingTime} {t.min_read || 'min'}</div>
          <h2 className="text-3xl text-mckinsey-navy-900 mb-3 group-hover:text-mckinsey-teal-600">{post.title}</h2>
          <p className="text-gray-600 leading-relaxed">{post.description}</p>
        </Link>
      </article>)}
    </section>
  </main>;
}
