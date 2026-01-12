/**
 * Skills Marketplace Types
 * Extracted to separate file to avoid server-side dependencies
 */

export interface SkillCategory {
  id: string
  name: string
  description: string | null
  emoji: string | null
  display_order: number
  created_at: string
}

export interface Skill {
  id: string
  slug: string
  name: string
  description: string
  category_id: string | null
  complexity: 'simple' | 'complex' | 'multi-agent'
  version: string
  author: string
  license: string
  triggers: string[]
  commands: string[]
  tags: string[]
  content: string | null
  readme: string | null
  repo_url: string | null
  repo_path: string | null
  quality_score: number | null
  quality_tier: 'bronze' | 'silver' | 'gold' | 'platinum' | null
  validated: boolean
  install_count: number
  view_count: number
  review_count: number
  avg_rating: number
  status: 'draft' | 'review' | 'published' | 'archived'
  featured: boolean
  verified: boolean
  created_at: string
  updated_at: string
  published_at: string | null
  // Joined data
  category?: SkillCategory
}

export interface SkillReview {
  id: string
  skill_id: string
  user_id: string
  rating: number
  title: string | null
  body: string | null
  helpful_count: number
  created_at: string
  updated_at: string
}

export interface SkillCollection {
  id: string
  slug: string
  name: string
  description: string | null
  emoji: string | null
  cover_image_url?: string | null
  author: string
  is_official: boolean
  is_public?: boolean
  skill_count?: number
  created_at: string
  updated_at: string
  // Configuration kits support
  content_type?: 'skill_bundle' | 'configuration' | null
  install_prompt?: string | null
  // Joined data
  skills?: Skill[]
}

export interface SkillStack {
  id: string
  share_id: string
  name: string
  description: string | null
  skills: string[]
  created_at: string
  updated_at: string
}

export type InstallMethod = 'copy' | 'curl' | 'git' | 'npm' | 'manual'
