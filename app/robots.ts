import { MetadataRoute } from 'next'

/**
 * Robots.txt Configuration
 *
 * Tells search engine crawlers which pages they can access
 * Standard production configuration allowing all crawlers
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [],
    },
    sitemap: 'https://id8labs.com/sitemap.xml',
  }
}
