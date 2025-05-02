/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Faster minification
  images: {
    domains: [], // Add domains if using external images
    deviceSizes: [640, 750, 828, 1080, 1200], // Optimize for mobile
    formats: ['image/webp'], // Prefer WebP
  },
  experimental: {
    optimizeCss: true, // Optimize CSS output
    scrollRestoration: true, // Improve navigation performance
  },
  compiler: {
    removeConsole: {
      exclude: ['error'], // Remove console.logs in production, keep errors
    },
  },
};

module.exports = nextConfig;