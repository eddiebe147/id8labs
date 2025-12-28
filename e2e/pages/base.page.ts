import { Page, Locator, expect } from '@playwright/test';
import { testConfig } from '../utils/test-config';

/**
 * Base page object providing common functionality for all pages
 */
export abstract class BasePage {
  readonly page: Page;
  readonly header: Locator;
  readonly footer: Locator;
  readonly mainContent: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('header').first();
    this.footer = page.locator('footer').first();
    this.mainContent = page.locator('main');
  }

  /**
   * Navigate to a specific path
   */
  async goto(path: string = '/') {
    await this.page.goto(path);
    await this.waitForPageLoad();
  }

  /**
   * Wait for page to fully load (DOM content + animations)
   * Note: Using domcontentloaded instead of networkidle for better reliability
   * networkidle is flaky with animated content and background processes
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
    // Wait for any initial animations to settle
    await this.page.waitForTimeout(testConfig.timeouts.animation);
  }

  /**
   * Verify core page elements are visible
   */
  async verifyPageStructure() {
    await expect(this.header).toBeVisible();
    await expect(this.footer).toBeVisible();
    await expect(this.mainContent).toBeVisible();
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Check if page has no console errors
   */
  async verifyNoConsoleErrors(): Promise<string[]> {
    const errors: string[] = [];
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    return errors;
  }

  /**
   * Take a screenshot for visual comparison or debugging
   */
  async takeScreenshot(name: string) {
    await this.page.screenshot({
      path: `test-results/screenshots/${name}.png`,
      fullPage: true,
    });
  }

  /**
   * Scroll to an element
   */
  async scrollToElement(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(300); // Wait for smooth scroll
  }

  /**
   * Check if an element is in viewport
   */
  async isInViewport(locator: Locator): Promise<boolean> {
    const box = await locator.boundingBox();
    if (!box) return false;

    const viewport = this.page.viewportSize();
    if (!viewport) return false;

    return (
      box.x >= 0 &&
      box.y >= 0 &&
      box.x + box.width <= viewport.width &&
      box.y + box.height <= viewport.height
    );
  }

  /**
   * Header navigation methods
   */
  async getHeaderLinks(): Promise<string[]> {
    const links = await this.header.locator('a').all();
    return Promise.all(links.map((link) => link.getAttribute('href') as Promise<string>));
  }

  async clickHeaderLink(text: string) {
    await this.header.getByRole('link', { name: text }).click();
    await this.waitForPageLoad();
  }

  /**
   * Mobile menu helpers
   */
  async openMobileMenu() {
    const menuButton = this.page.getByRole('button', { name: /menu/i });
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await this.page.waitForTimeout(300); // Animation delay
    }
  }

  async closeMobileMenu() {
    const closeButton = this.page.getByRole('button', { name: /close/i });
    if (await closeButton.isVisible()) {
      await closeButton.click();
      await this.page.waitForTimeout(300);
    }
  }
}
