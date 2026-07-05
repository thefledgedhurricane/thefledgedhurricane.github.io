/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  transpilePackages: ['react-markdown', 'vfile', 'unified', 'remark-parse', 'remark-rehype', 'mdast-util-from-markdown', 'mdast-util-to-hast', 'micromark', 'hast-util-to-html'],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
    NEXT_PUBLIC_COMMIT_SHA: process.env.GITHUB_SHA || 'development',
  },
  // Note: Custom headers are handled by Netlify/_headers file in production
  // They don't work with static export during development
};

module.exports = nextConfig;