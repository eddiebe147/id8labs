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
   */
  timeouts: {
    navigation: 30000,
    action: 10000,
    assertion: 5000,
    animation: 1000,
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
} as const;
