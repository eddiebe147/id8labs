/**
 * Test configuration and environment utilities
 */

export const testConfig = {
  /**
   * Base URLs for different environments
   */
  environments: {
    local: 'http://localhost:3000',
    preview: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
    production: 'https://id8labs.app',
  },

  /**
   * Current environment based on env vars
   */
  get currentEnv(): 'local' | 'preview' | 'production' {
    if (process.env.CI && process.env.VERCEL_URL) return 'preview';
    if (process.env.PRODUCTION_TEST) return 'production';
    return 'local';
  },

  /**
   * Get the base URL for the current environment
   */
  get baseUrl(): string {
    return process.env.PLAYWRIGHT_BASE_URL || this.environments[this.currentEnv] || this.environments.local;
  },

  /**
   * Timeouts configuration
   * Increased for production testing where network latency is higher
   */
  timeouts: {
    navigation: 30000,
    action: 10000,
    assertion: 10000,
    animation: 1500, // Increased for animation-heavy pages
  },

  /**
   * Viewport configurations for responsive testing
   */
  viewports: {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1280, height: 720 },
    widescreen: { width: 1920, height: 1080 },
  },
} as const;

/**
 * Routes for the application
 */
export const routes = {
  home: '/',
  products: '/products',
  composer: '/products/composer',
  deepstack: '/products/deepstack',
  pause: '/products/pause',
  pipeline: '/products/pipeline',
  llcOps: '/products/llc-ops',
  lab: '/lab',
  essays: '/essays',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
  courses: '/courses',
  services: '/services',
  resources: '/resources',
  // Academy routes
  academy: '/academy',
  academyFoundation: '/courses/ai-conversation-fundamentals',
  academyPartnerMastery: '/academy/ai-partner-mastery',
  academyPromptEngineering: '/academy/prompt-engineering-creators',
  academyKnowledgeWorkers: '/courses/claude-for-knowledge-workers',
  academyLeaders: '/academy/ai-for-leaders',
  academyAtScale: '/academy/ai-at-scale',
  academyPrivateAI: '/academy/private-ai',
} as const;

/**
 * Test data selectors - Using data-testid attributes
 * These should be added to components for reliable testing
 */
export const testIds = {
  // Header
  header: 'header',
  headerLogo: 'header-logo',
  headerNav: 'header-nav',
  mobileMenuButton: 'mobile-menu-button',
  mobileMenu: 'mobile-menu',

  // Hero section
  hero: 'hero-section',
  heroTitle: 'hero-title',
  heroCta: 'hero-cta',

  // Product grid
  productGrid: 'product-grid',
  productCard: 'product-card',

  // Footer
  footer: 'footer',
  footerLinks: 'footer-links',
  footerSocial: 'footer-social',

  // Forms
  emailInput: 'email-input',
  submitButton: 'submit-button',
  leadMagnetModal: 'lead-magnet-modal',

  // Academy
  academyHero: 'academy-hero',
  academyProgressBar: 'academy-progress-bar',
  academyResumeButton: 'academy-resume-button',
  academyCourseGrid: 'academy-course-grid',
  academyCourseCard: 'academy-course-card',
  academyRoadmap: 'academy-roadmap',
  foundationGate: 'foundation-gate',
  moduleComplete: 'module-complete',
  moduleContent: 'module-content',
} as const;

/**
 * Academy course data for testing
 */
export const academyCourses = {
  foundation: {
    slug: 'ai-conversation-fundamentals',
    title: 'AI Conversation Fundamentals',
    path: '/courses/ai-conversation-fundamentals',
    modules: 6,
  },
  partnerMastery: {
    slug: 'ai-partner-mastery',
    title: 'AI Partner Mastery',
    path: '/academy/ai-partner-mastery',
    modules: 8,
  },
  promptEngineering: {
    slug: 'prompt-engineering-creators',
    title: 'Prompt Engineering for Creators',
    path: '/academy/prompt-engineering-creators',
    modules: 9,
  },
  knowledgeWorkers: {
    slug: 'claude-for-knowledge-workers',
    title: 'Claude for Knowledge Workers',
    path: '/courses/claude-for-knowledge-workers',
    modules: 10,
  },
  leaders: {
    slug: 'ai-for-leaders',
    title: 'AI for Leaders',
    path: '/academy/ai-for-leaders',
    modules: 8,
  },
  atScale: {
    slug: 'ai-at-scale',
    title: 'AI at Scale',
    path: '/academy/ai-at-scale',
    modules: 8,
  },
  privateAI: {
    slug: 'private-ai',
    title: 'Private AI',
    path: '/academy/private-ai',
    modules: 8,
  },
} as const;

export const TOTAL_MODULES = 57; // Sum of all course modules
