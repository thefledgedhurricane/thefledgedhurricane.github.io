/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
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