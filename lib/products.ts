/**
 * Unified Product & Service Configuration
 *
 * Central source of truth for all ID8Labs offerings.
 * Supports three purchase types:
 * - 'stripe': One-time payment via Stripe checkout
 * - 'booking': Calendar booking via Cal.com (with optional payment)
 * - 'free': Direct access, no payment required
 */

export type PurchaseType = 'stripe' | 'booking' | 'free'
export type ProductCategory = 'ai-implementation' | 'claude-code-training' | 'self-paced-course' | 'free-resource' | 'coming-soon'

export interface Product {
  id: string
  name: string
  description: string
  category: ProductCategory
  purchaseType: PurchaseType

  // Pricing (in cents for Stripe, display string for booking)
  price: number | null // null for "Custom Quote"
  priceDisplay: string
  originalPrice?: number // For showing discounts
  currency: 'usd'

  // Features list for display
  features: string[]

  // Flags
  popular?: boolean
  tier?: string

  // Stripe-specific (for purchaseType: 'stripe')
  stripeProductId?: string // Optional: link to existing Stripe product

  // Cal.com-specific (for purchaseType: 'booking')
  calEventTypeSlug?: string // e.g., 'workshop-2hr', 'sprint-intake'
  duration?: string // e.g., '2 hours', '4 weeks'

  // Success page configuration
  successRedirect?: string // Where to redirect after purchase
  accessInstructions?: string // Instructions shown on success page
}

export const PRODUCTS: Record<string, Product> = {
  // ─────────────────────────────────────────────────────────────
  // AI Implementation Services (Booking-based)
  // ─────────────────────────────────────────────────────────────
  'workshop': {
    id: 'workshop',
    name: 'The Workshop',
    description: '2-hour intensive session. Walk in confused, walk out with workflows you\'ll use tomorrow.',
    category: 'ai-implementation',
    purchaseType: 'booking',
    price: 29700,
    priceDisplay: '$297',
    currency: 'usd',
    tier: 'Tier 1',
    duration: '2 hours',
    calEventTypeSlug: 'workshop',
    features: [
      'Live prompt demonstrations',
      'Custom applications for your work',
      '20 prompt templates (PDF)',
      '30 days follow-up support',
    ],
    successRedirect: '/services/success?type=workshop',
    accessInstructions: 'Check your email for calendar invite and prep materials.',
  },

  'sprint': {
    id: 'sprint',
    name: 'The Sprint',
    description: '4 weeks. We implement 3 AI workflows together. You learn by doing, with me guiding every step.',
    category: 'ai-implementation',
    purchaseType: 'booking',
    price: 199700,
    priceDisplay: '$1,997',
    currency: 'usd',
    tier: 'Tier 2',
    popular: true,
    duration: '4 weeks',
    calEventTypeSlug: 'sprint-intake',
    features: [
      'Weekly 90-min working sessions',
      '3 fully implemented workflows',
      'Custom templates and SOPs',
      'Daily async support',
      'Recorded sessions for reference',
    ],
    successRedirect: '/services/success?type=sprint',
    accessInstructions: 'I\'ll reach out within 24 hours to schedule our first session.',
  },

  'build': {
    id: 'build',
    name: 'The Build',
    description: '8+ weeks. Full operational transformation. We don\'t just add AI — we rebuild your workflows from the ground up.',
    category: 'ai-implementation',
    purchaseType: 'booking',
    price: null, // Custom quote
    priceDisplay: 'Custom Quote',
    currency: 'usd',
    tier: 'Tier 3',
    duration: '8+ weeks',
    calEventTypeSlug: 'build-discovery',
    features: [
      'Process audit using proven frameworks (Lean, Kaizen, Six Sigma principles)',
      'Refinement protocol: Question → Delete → Simplify → Accelerate → Automate',
      'Custom AI systems built for your operation',
      'Team training + full documentation',
      '90 days of hands-on support',
    ],
    successRedirect: '/services/success?type=build',
    accessInstructions: 'Let\'s start with a discovery call to scope your project.',
  },

  // ─────────────────────────────────────────────────────────────
  // Claude Code Training (Booking-based with payment)
  // ─────────────────────────────────────────────────────────────
  'claude-code-basics': {
    id: 'claude-code-basics',
    name: 'Claude Code Basics',
    description: '90-minute live session. Get set up, learn the commands, and start building with Claude Code the right way.',
    category: 'claude-code-training',
    purchaseType: 'booking',
    price: 14900,
    priceDisplay: '$149',
    currency: 'usd',
    tier: 'Fundamentals',
    duration: '90 minutes',
    calEventTypeSlug: 'claude-code-basics',
    features: [
      'Live Zoom session (1:1 or small group)',
      'Installation & configuration walkthrough',
      'Core commands and workflows',
      'Prompt patterns that actually work',
      'Cheat sheet PDF included',
    ],
    successRedirect: '/services/success?type=claude-code-basics',
  },

  'claude-code-builders': {
    id: 'claude-code-builders',
    name: 'Claude Code for Builders',
    description: '3 live sessions over 2 weeks. Build real projects with hooks, MCP servers, plugins, and context systems.',
    category: 'claude-code-training',
    purchaseType: 'booking',
    price: 49700,
    priceDisplay: '$497',
    currency: 'usd',
    tier: 'Builder',
    popular: true,
    duration: '3 sessions / 2 weeks',
    calEventTypeSlug: 'claude-code-builders',
    features: [
      'Three 90-min live sessions',
      'Hooks & automation setup',
      'MCP server integration',
      'Custom plugin development',
      'Context systems that persist',
      'Your own project as the curriculum',
    ],
    successRedirect: '/services/success?type=claude-code-builders',
  },

  'build-with-claude': {
    id: 'build-with-claude',
    name: 'Build With Claude',
    description: '6-week live cohort. We build a production app together from scratch. You ship something real.',
    category: 'claude-code-training',
    purchaseType: 'booking',
    price: 149700,
    priceDisplay: '$1,497',
    currency: 'usd',
    tier: 'Partner',
    duration: '6 weeks (cohort)',
    calEventTypeSlug: 'build-with-claude-cohort',
    features: [
      'Weekly 2-hour live build sessions',
      'Full project from idea to deployment',
      'Subagents, pipelines, and orchestration',
      'Code review and architecture guidance',
      'Small cohort (max 6 people)',
      'Private Discord/Slack access',
    ],
    successRedirect: '/services/success?type=build-with-claude',
  },

  // ─────────────────────────────────────────────────────────────
  // Self-Paced Courses (Stripe checkout)
  // ─────────────────────────────────────────────────────────────
  'claude-for-knowledge-workers': {
    id: 'claude-for-knowledge-workers',
    name: 'Claude Code for Knowledge Workers',
    description: 'Complete 6-module course + lifetime updates. No programming required — just delegation.',
    category: 'self-paced-course',
    purchaseType: 'stripe',
    price: 9900,
    priceDisplay: '$99',
    originalPrice: 19700,
    currency: 'usd',
    features: [
      'Module 0: The Mental Model Shift (30 min)',
      'Module 1: Your First Delegation (45 min)',
      'Module 2: Working With Your Files (60 min)',
      'Module 3: Writing With Claude (60 min)',
      'Module 4: Research & Analysis (60 min)',
      'Module 5: Building Workflows (60 min)',
      'Lifetime updates',
    ],
    successRedirect: '/courses/claude-for-knowledge-workers?success=true',
    accessInstructions: 'Your course access is now active. Start with Module 1!',
  },

  // ─────────────────────────────────────────────────────────────
  // Free Resources
  // ─────────────────────────────────────────────────────────────
  'ai-conversation-fundamentals': {
    id: 'ai-conversation-fundamentals',
    name: 'AI Conversation Fundamentals',
    description: 'Learn the mental models that make every AI interaction more effective — 45 min course.',
    category: 'free-resource',
    purchaseType: 'free',
    price: 0,
    priceDisplay: 'Free',
    currency: 'usd',
    features: [
      'Mental models for effective AI conversation',
      'Self-paced video lessons',
      '45 minutes total',
    ],
    successRedirect: '/courses/ai-conversation-fundamentals',
  },

  'module-0-free': {
    id: 'module-0-free',
    name: 'Module 0: The Mental Model Shift',
    description: 'Free preview of Claude Code for Knowledge Workers. 30 min introduction.',
    category: 'free-resource',
    purchaseType: 'free',
    price: 0,
    priceDisplay: 'Free',
    currency: 'usd',
    features: [
      'Installation walkthrough',
      'Your first delegation (Downloads cleanup)',
      'Core mental model',
    ],
    successRedirect: '/courses/claude-for-knowledge-workers/module-0',
  },

  // ─────────────────────────────────────────────────────────────
  // Academy Courses (Free, creator-focused)
  // ─────────────────────────────────────────────────────────────
  'prompt-engineering-creators': {
    id: 'prompt-engineering-creators',
    name: 'Prompt Engineering for Creators',
    description: 'Learn the 9 techniques that make every AI conversation more effective — through real examples from writers, content creators, and indie makers.',
    category: 'free-resource',
    purchaseType: 'free',
    price: 0,
    priceDisplay: 'Free',
    currency: 'usd',
    features: [
      'Module 1: The Anatomy of a Great Prompt',
      'Module 2: Say What You Mean',
      'Module 3: Give Claude a Job Description',
      'Module 4: Context Without Confusion',
      'Module 5: Get the Format You Need',
      'Module 6: Help Claude Think',
      'Module 7: Show, Don\'t Just Tell',
      'Module 8: Keep Claude Honest',
      'Module 9: Build Your Prompt Library',
    ],
    successRedirect: '/academy/prompt-engineering-creators',
  },
} as const

export type ProductId = keyof typeof PRODUCTS

// ─────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────

export function getProduct(id: string): Product | undefined {
  return PRODUCTS[id]
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return Object.values(PRODUCTS).filter(p => p.category === category)
}

export function getProductsByPurchaseType(type: PurchaseType): Product[] {
  return Object.values(PRODUCTS).filter(p => p.purchaseType === type)
}

export function getStripeProducts(): Product[] {
  return getProductsByPurchaseType('stripe')
}

export function getBookingProducts(): Product[] {
  return getProductsByPurchaseType('booking')
}

export function getFreeProducts(): Product[] {
  return getProductsByPurchaseType('free')
}

export function getLearningProducts(): Product[] {
  return Object.values(PRODUCTS).filter(p =>
    p.category === 'self-paced-course' ||
    p.category === 'free-resource' ||
    p.category === 'claude-code-training'
  )
}

export function getImplementationServices(): Product[] {
  return getProductsByCategory('ai-implementation')
}

export function getAcademyCourses(): Product[] {
  return Object.values(PRODUCTS).filter(p =>
    p.category === 'free-resource' || p.category === 'self-paced-course'
  )
}

// For backwards compatibility with existing checkout code
// Only includes products that can be purchased via Stripe (have a fixed price)
export const COURSE_PRODUCTS = {
  'claude-for-knowledge-workers': {
    name: PRODUCTS['claude-for-knowledge-workers'].name,
    description: PRODUCTS['claude-for-knowledge-workers'].description,
    price: PRODUCTS['claude-for-knowledge-workers'].price as number, // Always has a price
    currency: PRODUCTS['claude-for-knowledge-workers'].currency,
  },
} as const

export type CourseProductId = keyof typeof COURSE_PRODUCTS
