/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200],
    formats: ['image/webp'],
  },
};

module.exports = nextConfig;