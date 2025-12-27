import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Performance optimizations
  experimental: {
    // Optimize package imports for smaller bundles
    optimizePackageImports: ['framer-motion', '@radix-ui/react-icons'],
  },

  // Image optimization
  images: {
    // Enable optimization on Vercel (was unoptimized: true)
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Headers for caching static assets
  async headers() {
    return [
      {
        // Cache static assets for 1 year
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache JS/CSS chunks for 1 year (they have content hashes)
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Production-only optimizations can go here
    // Note: framer-motion tree-shaking is handled by optimizePackageImports
    return config
  },
}

export default withBundleAnalyzer(nextConfig)
