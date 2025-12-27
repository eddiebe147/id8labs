import { test as base, expect } from '@playwright/test';
import { HomePage, ProductsPage, ProductDetailPage } from '../pages';

/**
 * Extended test fixtures with pre-configured page objects
 */
type TestFixtures = {
  homePage: HomePage;
  productsPage: ProductsPage;
  productDetailPage: ProductDetailPage;
};

/**
 * Custom test fixture that provides page objects
 */
export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },

  productDetailPage: async ({ page }, use) => {
    const productDetailPage = new ProductDetailPage(page);
    await use(productDetailPage);
  },
});

export { expect };

/**
 * Test data fixtures
 */
export const testData = {
  /**
   * Valid product slugs that should load
   */
  products: [
    { slug: 'composer', title: 'Composer', hasPage: true },
    { slug: 'deepstack', title: 'DeepStack', hasPage: true },
    { slug: 'pause', title: 'Pause', hasPage: true },
    { slug: 'pipeline', title: 'Pipeline', hasPage: true },
    { slug: 'llc-ops', title: 'LLC', hasPage: true },
    { slug: 'clear', title: 'Clear', hasPage: true },
    { slug: 'factory', title: 'Factory', hasPage: true },
    { slug: 'lexicon', title: 'Lexicon', hasPage: true },
    { slug: 'xplace', title: 'XPlace', hasPage: true },
  ],

  /**
   * Main navigation links
   */
  navigationLinks: [
    { label: 'Products', href: '/products' },
    { label: 'Lab', href: '/lab' },
    { label: 'Essays', href: '/essays' },
    { label: 'Contact', href: '/contact' },
  ],

  /**
   * Footer links
   */
  footerLinks: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],

  /**
   * Expected metadata
   */
  metadata: {
    homeTitle: /ID8Labs/i,
    homeDescription: /AI tools/i,
  },
};
