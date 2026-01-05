import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page object for individual module pages (/academy/[course]/module-[n])
 * Handles module content, completion, and navigation
 */
export class ModulePage extends BasePage {
  // Module header
  readonly moduleTitle: Locator;
  readonly moduleNumber: Locator;
  readonly breadcrumb: Locator;

  // Module content
  readonly moduleContent: Locator;
  readonly contentSections: Locator;

  // Module completion (at bottom of page)
  readonly completionSection: Locator;
  readonly moduleCompleteMessage: Locator;
  readonly nextModuleButton: Locator;
  readonly nextCourseButton: Locator;

  // Navigation
  readonly previousModuleLink: Locator;
  readonly backToCourseLink: Locator;

  constructor(page: Page) {
    super(page);

    // Module header
    this.moduleTitle = page.getByRole('heading', { level: 1 });
    this.moduleNumber = page.getByText(/Module \d+/i);
    this.breadcrumb = page.locator('nav[aria-label="breadcrumb"], [class*="breadcrumb"]');

    // Module content
    this.moduleContent = page.locator('article, [class*="content"], main').first();
    this.contentSections = page.locator('section, [class*="section"]');

    // Module completion (appears at bottom when user scrolls there)
    this.completionSection = page.locator('[class*="complete"], [class*="completion"]').last();
    this.moduleCompleteMessage = page.getByText(/Module Complete|Completed|Well done/i);
    this.nextModuleButton = page.getByRole('link', { name: /Next Module|Continue|Module \d+/i });
    this.nextCourseButton = page.getByRole('link', { name: /Next Course|Next:/i });

    // Navigation
    this.previousModuleLink = page.getByRole('link', { name: /Previous|Back/i });
    this.backToCourseLink = page.getByRole('link', { name: /Back to Course|Course Overview/i });
  }

  /**
   * Navigate to a specific module
   */
  async goto(courseSlug: string, moduleNumber: number) {
    const path = courseSlug === 'ai-conversation-fundamentals' || courseSlug === 'claude-for-knowledge-workers'
      ? `/courses/${courseSlug}/module-${moduleNumber}`
      : `/academy/${courseSlug}/module-${moduleNumber}`;
    await super.goto(path);
  }

  /**
   * Scroll to the bottom to trigger auto-completion
   */
  async scrollToBottom() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await this.page.waitForTimeout(1000); // Wait for scroll animation and completion trigger
  }

  /**
   * Scroll through the entire module content
   */
  async scrollThroughModule() {
    const scrollHeight = await this.page.evaluate(() => document.body.scrollHeight);
    const viewportHeight = this.page.viewportSize()?.height || 800;
    const steps = Math.ceil(scrollHeight / (viewportHeight * 0.8));

    for (let i = 0; i < steps; i++) {
      await this.page.evaluate((step) => {
        window.scrollTo(0, step * window.innerHeight * 0.8);
      }, i);
      await this.page.waitForTimeout(300);
    }

    // Final scroll to absolute bottom
    await this.scrollToBottom();
  }

  /**
   * Check if module completion message is visible
   */
  async isModuleComplete(): Promise<boolean> {
    return this.moduleCompleteMessage.isVisible();
  }

  /**
   * Navigate to the next module
   */
  async goToNextModule() {
    await this.nextModuleButton.click();
    await this.waitForPageLoad();
  }

  /**
   * Navigate to the next course (when at last module)
   */
  async goToNextCourse() {
    await this.nextCourseButton.click();
    await this.waitForPageLoad();
  }

  /**
   * Navigate back to course overview
   */
  async goBackToCourse() {
    await this.backToCourseLink.click();
    await this.waitForPageLoad();
  }

  /**
   * Verify module page structure
   */
  async verifyModuleStructure() {
    await expect(this.moduleTitle).toBeVisible();
    await expect(this.moduleContent).toBeVisible();
  }

  /**
   * Get the current module number from the page
   */
  async getCurrentModuleNumber(): Promise<number | null> {
    const url = this.page.url();
    const match = url.match(/module-(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  }

  /**
   * Check if this is the last module in the course
   */
  async isLastModule(): Promise<boolean> {
    return this.nextCourseButton.isVisible();
  }

  /**
   * Check if there's a next module available
   */
  async hasNextModule(): Promise<boolean> {
    return this.nextModuleButton.isVisible();
  }

  /**
   * Wait for module completion to trigger
   */
  async waitForCompletion(timeout: number = 5000) {
    await this.scrollToBottom();
    await this.moduleCompleteMessage.waitFor({ state: 'visible', timeout });
  }

  /**
   * Complete module and go to next
   */
  async completeAndContinue() {
    await this.scrollThroughModule();

    // Wait for completion UI
    await this.page.waitForTimeout(3500); // Completion shows for ~3 seconds

    // Click next module or next course
    if (await this.nextModuleButton.isVisible()) {
      await this.goToNextModule();
    } else if (await this.nextCourseButton.isVisible()) {
      await this.goToNextCourse();
    }
  }
}
