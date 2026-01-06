/**
 * Skills Marketplace Components
 *
 * A complete UI component library for the ID8Labs Skills Marketplace.
 * Inspired by aitmpl.com's store-like UX with stack building functionality.
 */

// Main card component
export { SkillCard } from './SkillCard'

// Search functionality
export { SkillSearchBar } from './SkillSearchBar'

// Installation UI
export { SkillInstallButton } from './SkillInstallButton'

// Stack builder (cart-like UX) - KEY DIFFERENTIATOR
export { SkillStackBuilder, useSkillStack } from './SkillStackBuilder'

// Category navigation
export {
  CategoryTabs,
  CategoryList,
  CategoryBadge
} from './CategoryTabs'

// Filtering
export { SkillFilters, InlineFilters } from './SkillFilters'

// Starter kits / collections
export {
  SkillStarterKits,
  FeaturedStarterKit
} from './SkillStarterKits'

// Trust badges and indicators
export {
  TrustBadges,
  VerifiedBadge,
  OfficialBadge,
  FeaturedBadge,
  ComplexityBadge,
  QualityTierBadge,
  StarRating,
} from './TrustBadges'

// Re-export types from lib
export type {
  Skill,
  SkillCategory,
  SkillCollection,
  SkillFilters as SkillFiltersType
} from '@/lib/skills'
