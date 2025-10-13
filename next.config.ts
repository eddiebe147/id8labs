import type { NextConfig } from 'next'

/**
 * Next.js Configuration
 *
 * Production-optimized settings for ID8Labs
 */
const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Remove X-Powered-By header for security
  poweredByHeader: false,

  // Enable compression for better performance
  compress: true,

  // Image optimization configuration (for future use)
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Experimental features for better performance
  // Note: optimizeCss disabled due to critters dependency issue
  // experimental: {
  //   optimizeCss: true,
  // },
}

export default nextConfig
