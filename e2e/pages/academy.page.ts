import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page object for the Academy hub (/academy)
 * Handles the main academy page with course catalog, progress tracking, and roadmap
 */
export class AcademyPage extends BasePage {
  // Hero section
  readonly heroSection: Locator;
  readonly heroTitle: Locator;
  readonly startFoundationButton: Locator;

  // Progress tracking
  readonly progressBar: Locator;
  readonly progressCount: Locator;
  readonly resumeButton: Locator;

  // Course catalog
  readonly courseGrid: Locator;
  readonly courseCards: Locator;
  readonly foundationCourseCard: Locator;

  // Learning roadmap
  readonly roadmapSection: Locator;

  // Sign-in prompt (for anonymous users)
  readonly signInPrompt: Locator;

  constructor(page: Page) {
    super(page);

    // Hero section - Look for the ID8Labs Academy heading/subtitle
    this.heroSection = page.locator('section').first();
    this.heroTitle = page.getByRole('heading', { level: 1 });
    this.startFoundationButton = page.getByRole('link', { name: /Start Foundation Course/i });

    // Progress tracking (only visible when authenticated)
    this.progressBar = page.locator('[class*="progress"]').first();
    this.progressCount = page.getByText(/\/57 modules/i);
    this.resumeButton = page.getByRole('link', { name: /Resume|Continue/i });

    // Course catalog - Links to course pages
    this.courseGrid = page.locator('#curriculum');
    // Course cards are Links that contain the course title and go to /academy/ or /courses/
    this.courseCards = page.locator('a[href*="/academy/"], a[href*="/courses/"]');
    // Use the "Start Foundation Course" button which is always visible
    this.foundationCourseCard = page.getByRole('link', { name: /Start Foundation Course/i });

    // Learning roadmap section
    this.roadmapSection = page.locator('section').filter({ hasText: /Your Learning Journey/i });

    // Sign-in prompt
    this.signInPrompt = page.getByText(/Sign in to track your progress/i);
  }

  /**
   * Navigate to the academy hub
   */
  async goto() {
    await super.goto('/academy');
  }

  /**
   * Get all visible course cards
   */
  async getCourseCards(): Promise<Locator[]> {
    return this.courseCards.all();
  }

  /**
   * Get course card by name from the curriculum section
   */
  getCourseCard(courseName: string): Locator {
    // Look for course card with a "Start Free" or "Learn More" button within it
    return this.page.locator('section#curriculum a').filter({ hasText: courseName }).first();
  }

  /**
   * Click on a specific course
   */
  async navigateToCourse(courseName: string) {
    // Scroll to curriculum section first
    await this.page.evaluate(() => {
      const curriculum = document.getElementById('curriculum');
      if (curriculum) curriculum.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await this.page.waitForTimeout(500);

    // Find the course link that contains the course name and "Start Free" or "Learn More"
    const courseButton = this.page.getByRole('link', { name: new RegExp(`Start Free|Learn More`, 'i') })
      .filter({ has: this.page.getByText(courseName, { exact: false }).locator('..') })
      .first();

    // If that doesn't work, fall back to finding a link in the curriculum section
    const courseLink = this.page.locator('#curriculum').getByRole('link', { name: new RegExp(courseName, 'i') }).first();

    // Try the more specific selector first
    if (await courseLink.count() > 0) {
      await courseLink.scrollIntoViewIfNeeded();
      await courseLink.click();
      await this.waitForPageLoad();
    }
  }

  /**
   * Start the foundation course
   */
  async startFoundationCourse() {
    // Scroll down to make the foundation link visible
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 3));
    await this.page.waitForTimeout(500);
    await this.foundationCourseCard.scrollIntoViewIfNeeded();
    await this.foundationCourseCard.click();
    await this.waitForPageLoad();
  }

  /**
   * Check if progress bar is visible (indicates authenticated user)
   */
  async isProgressBarVisible(): Promise<boolean> {
    return this.progressCount.isVisible();
  }

  /**
   * Check if sign-in prompt is visible (indicates anonymous user)
   */
  async isSignInPromptVisible(): Promise<boolean> {
    return this.signInPrompt.isVisible();
  }

  /**
   * Get the current progress text (e.g., "5/57 modules")
   */
  async getProgressText(): Promise<string | null> {
    if (await this.progressCount.isVisible()) {
      return this.progressCount.textContent();
    }
    return null;
  }

  /**
   * Click resume button to continue learning
   */
  async clickResume() {
    await this.resumeButton.click();
    await this.waitForPageLoad();
  }

  /**
   * Verify the academy page structure
   */
  async verifyAcademyStructure() {
    await expect(this.heroTitle).toBeVisible();
    // Should have at least 7 course references
    const courseCount = await this.page.locator('a[href*="/academy/"], a[href*="/courses/"]').count();
    expect(courseCount).toBeGreaterThanOrEqual(7);
  }

  /**
   * Count visible courses
   */
  async getCourseCount(): Promise<number> {
    const cards = await this.getCourseCards();
    return cards.length;
  }

  /**
   * Scroll to roadmap section
   */
  async scrollToRoadmap() {
    await this.scrollToElement(this.roadmapSection);
  }

  /**
   * Verify all 7 courses are listed
   */
  async verifyAllCoursesListed() {
    // Scroll to curriculum section first to make courses visible
    await this.page.evaluate(() => {
      const curriculum = document.getElementById('curriculum');
      if (curriculum) curriculum.scrollIntoView();
    });
    await this.page.waitForTimeout(500);

    const expectedCourses = [
      'AI Conversation Fundamentals',
      'AI Partner Mastery',
      'Prompt Engineering',
      'Claude for Knowledge Workers',
      'AI for Leaders',
      'AI at Scale',
      'Private AI',
    ];

    for (const course of expectedCourses) {
      // Check that the text exists in the page (may be hidden by viewport)
      const courseElement = this.page.getByText(course, { exact: false });
      const count = await courseElement.count();
      expect(count).toBeGreaterThan(0);
    }
  }
}
