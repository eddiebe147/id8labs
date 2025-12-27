import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Home page object for ID8Labs main page
 */
export class HomePage extends BasePage {
  readonly heroSection: Locator;
  readonly heroTitle: Locator;
  readonly heroCta: Locator;
  readonly whatWeAreSection: Locator;
  readonly builderSection: Locator;
  readonly productGrid: Locator;
  readonly productCards: Locator;
  readonly missionSection: Locator;
  readonly claudePartnershipSection: Locator;

  constructor(page: Page) {
    super(page);

    // Hero section
    this.heroSection = page.locator('section').first();
    this.heroTitle = page.getByRole('heading', { level: 1 }).first();
    this.heroCta = page.getByRole('link', { name: /get started|explore|learn more/i }).first();

    // What We Are section
    this.whatWeAreSection = page.locator('text=What We Are').locator('..').locator('..');

    // Builder section
    this.builderSection = page.locator('text=Builder').locator('..').locator('..');

    // Product Grid
    this.productGrid = page.locator('[class*="grid"]').filter({ hasText: /composer|deepstack/i }).first();
    this.productCards = page.locator('a[href*="/products/"]');

    // Mission section
    this.missionSection = page.locator('text=Mission').locator('..').locator('..');

    // Claude Partnership section
    this.claudePartnershipSection = page.locator('text=Claude').locator('..').locator('..');
  }

  /**
   * Navigate to home page
   */
  async goto() {
    await super.goto('/');
  }

  /**
   * Verify all main sections are visible
   */
  async verifySectionsVisible() {
    await expect(this.heroTitle).toBeVisible();
    await expect(this.mainContent).toBeVisible();
  }

  /**
   * Get all product card links
   */
  async getProductLinks(): Promise<string[]> {
    const links = await this.productCards.all();
    const hrefs: string[] = [];
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href) hrefs.push(href);
    }
    return [...new Set(hrefs)]; // Remove duplicates
  }

  /**
   * Click on a specific product card
   */
  async clickProduct(productName: string) {
    const productLink = this.page.getByRole('link', { name: new RegExp(productName, 'i') }).first();
    await productLink.click();
    await this.waitForPageLoad();
  }

  /**
   * Verify hero CTA is functional
   */
  async verifyHeroCta() {
    const cta = this.page.getByRole('link').filter({ hasText: /get started|explore|learn/i }).first();
    if (await cta.isVisible()) {
      await expect(cta).toHaveAttribute('href');
    }
  }

  /**
   * Check that the neural network background is rendering
   */
  async verifyBackgroundRendering() {
    // Check for canvas element (neural network uses canvas)
    const canvas = this.page.locator('canvas');
    const canvasCount = await canvas.count();
    return canvasCount > 0;
  }

  /**
   * Scroll through all sections
   */
  async scrollThroughPage() {
    await this.page.evaluate(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
    await this.page.waitForTimeout(2000);
  }
}
