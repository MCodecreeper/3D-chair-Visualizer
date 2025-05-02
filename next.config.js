/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200],
    formats: ['image/webp'],
    minimumCacheTTL: 31536000,
    contentDispositionType: 'inline',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.(jpg|jpeg|png|webp)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[contenthash:8][ext]',
      },
    });

    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }

    return config;
  },
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  },
  productionBrowserSourceMaps: false,
  compress: true,
};

module.exports = nextConfig;