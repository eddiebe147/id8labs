/**
 * Essays module - re-exports from mdx-essays for backwards compatibility
 *
 * Direct imports from '@/lib/mdx-essays' are preferred for new code.
 * This file exists only for backwards compatibility.
 */
export {
  type Essay,
  type MdxEssay,
  getAllEssays,
  getEssayBySlug,
  getEssaysByCategory,
  // Legacy aliases
  getMdxEssays,
  getMdxEssayBySlug,
} from './mdx-essays'
