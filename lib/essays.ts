import { getMdxEssays, type MdxEssay } from './mdx-essays'

// Re-export the Essay type from MDX essays for backwards compatibility
export type Essay = MdxEssay

/**
 * Get all essays from MDX files
 * Essays are stored in content/essays/*.mdx
 */
export function getAllEssays(): Essay[] {
  return getMdxEssays()
}

/**
 * Get a single essay by slug
 */
export function getEssayBySlug(slug: string): Essay | undefined {
  return getMdxEssays().find(essay => essay.slug === slug)
}

/**
 * Get essays filtered by category
 */
export function getEssaysByCategory(category: Essay['category']): Essay[] {
  return getMdxEssays().filter(essay => essay.category === category)
}
