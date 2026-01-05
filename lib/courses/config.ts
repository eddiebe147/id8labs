import { CourseConfig } from './types'

// All academy courses with their configuration
export const COURSES: Record<string, CourseConfig> = {
  'ai-conversation-fundamentals': {
    slug: 'ai-conversation-fundamentals',
    title: 'AI Conversation Fundamentals',
    path: '/courses/ai-conversation-fundamentals',
    modules: 6,
    isFoundation: true,
    recommendedOrder: 1,
    description: 'Master the basics of AI interaction',
  },
  'ai-partner-mastery': {
    slug: 'ai-partner-mastery',
    title: 'AI Partner Mastery',
    path: '/academy/ai-partner-mastery',
    modules: 8,
    isFoundation: false,
    recommendedOrder: 2,
    description: 'Day-to-day AI collaboration',
  },
  'prompt-engineering-creators': {
    slug: 'prompt-engineering-creators',
    title: 'Prompt Engineering for Creators',
    path: '/academy/prompt-engineering-creators',
    modules: 9,
    isFoundation: false,
    recommendedOrder: 3,
    description: 'Better prompts & outputs',
  },
  'claude-for-knowledge-workers': {
    slug: 'claude-for-knowledge-workers',
    title: 'Claude for Knowledge Workers',
    path: '/courses/claude-for-knowledge-workers',
    modules: 10,
    isFoundation: false,
    recommendedOrder: 4,
    description: 'Deep workflow mastery',
  },
  'ai-for-leaders': {
    slug: 'ai-for-leaders',
    title: 'AI for Leaders',
    path: '/academy/ai-for-leaders',
    modules: 8,
    isFoundation: false,
    recommendedOrder: 5,
    description: 'Organizational strategy',
  },
  'ai-at-scale': {
    slug: 'ai-at-scale',
    title: 'AI at Scale',
    path: '/academy/ai-at-scale',
    modules: 8,
    isFoundation: false,
    recommendedOrder: 6,
    description: 'Team adoption',
  },
  'private-ai': {
    slug: 'private-ai',
    title: 'Private AI',
    path: '/academy/private-ai',
    modules: 8,
    isFoundation: false,
    recommendedOrder: 7,
    description: 'Security & compliance',
  },
}

// Foundation course slug
export const FOUNDATION_COURSE = 'ai-conversation-fundamentals'

// Total modules across all courses
export const TOTAL_MODULES = Object.values(COURSES).reduce(
  (sum, course) => sum + course.modules,
  0
)

// Get courses in recommended order
export const COURSES_BY_ORDER = Object.values(COURSES).sort(
  (a, b) => a.recommendedOrder - b.recommendedOrder
)

// Get next recommended course after a given course
export function getNextRecommendedCourse(currentSlug: string): CourseConfig | null {
  const current = COURSES[currentSlug]
  if (!current) return null

  const next = COURSES_BY_ORDER.find(
    (course) => course.recommendedOrder === current.recommendedOrder + 1
  )
  return next || null
}

// Get module path for a course
export function getModulePath(courseSlug: string, moduleNumber: number): string {
  const course = COURSES[courseSlug]
  if (!course) return ''
  return `${course.path}/module-${moduleNumber}`
}

// Check if a course requires foundation
export function requiresFoundation(courseSlug: string): boolean {
  const course = COURSES[courseSlug]
  return course ? !course.isFoundation : false
}
