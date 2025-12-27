import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Products page object for ID8Labs products listing
 */
export class ProductsPage extends BasePage {
  readonly pageTitle: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.getByRole('heading', { level: 1 });
    this.productCards = page.locator('a[href*="/products/"]');
  }

  async goto() {
    await super.goto('/products');
  }

  async getProductCount(): Promise<number> {
    return this.productCards.count();
  }

  async getAllProductLinks(): Promise<string[]> {
    const links = await this.productCards.all();
    const hrefs: string[] = [];
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href) hrefs.push(href);
    }
    return [...new Set(hrefs)];
  }

  async clickProductByName(name: string) {
    const card = this.page.getByRole('link', { name: new RegExp(name, 'i') }).first();
    await card.click();
    await this.waitForPageLoad();
  }
}

/**
 * Individual product page object
 */
export class ProductDetailPage extends BasePage {
  readonly productTitle: Locator;
  readonly productDescription: Locator;
  readonly ctaButton: Locator;
  readonly backLink: Locator;

  constructor(page: Page) {
    super(page);
    this.productTitle = page.getByRole('heading', { level: 1 });
    this.productDescription = page.locator('p').first();
    this.ctaButton = page.getByRole('link', { name: /get started|try|learn more|join|book/i }).first();
    this.backLink = page.getByRole('link', { name: /back|home|products/i }).first();
  }

  async goto(productSlug: string) {
    await super.goto(`/products/${productSlug}`);
  }

  async verifyProductPage() {
    await expect(this.productTitle).toBeVisible();
  }

  async getProductTitle(): Promise<string> {
    return this.productTitle.innerText();
  }

  async hasCtaButton(): Promise<boolean> {
    return this.ctaButton.isVisible();
  }
}

/**
 * Product slugs for navigation
 */
export const productSlugs = [
  'composer',
  'deepstack',
  'pause',
  'pipeline',
  'llc-ops',
  'clear',
  'factory',
  'lexicon',
  'xplace',
] as const;

export type ProductSlug = (typeof productSlugs)[number];
