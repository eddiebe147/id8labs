import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page object for individual course pages (/academy/[course] or /courses/[course])
 * Handles course overview, curriculum, and foundation gate
 */
export class CoursePage extends BasePage {
  // Course header
  readonly courseTitle: Locator;
  readonly courseDescription: Locator;
  readonly startCourseButton: Locator;

  // Curriculum section
  readonly curriculumSection: Locator;
  readonly moduleList: Locator;
  readonly moduleLinks: Locator;

  // Foundation gate (shown when course is locked)
  readonly foundationGate: Locator;
  readonly foundationGateMessage: Locator;
  readonly foundationGateLink: Locator;

  // Progress indicators
  readonly courseProgressBar: Locator;
  readonly completedModulesCount: Locator;

  // What you'll build section
  readonly deliverablesSection: Locator;

  constructor(page: Page) {
    super(page);

    // Course header
    this.courseTitle = page.getByRole('heading', { level: 1 });
    this.courseDescription = page.locator('p').filter({ hasText: /module|min|hour/i }).first();
    this.startCourseButton = page.getByRole('link', { name: /Start Course|Begin|Module 1/i });

    // Curriculum section - The modules are linked with href containing module-N
    this.curriculumSection = page.locator('section').filter({ hasText: /Module|Curriculum/i }).first();
    this.moduleList = page.locator('section').filter({ hasText: /Module 1|Module 2/i });
    // Module links can be in various formats: /courses/.../module-N or /academy/.../module-N
    this.moduleLinks = page.locator('a[href*="/module-"]');

    // Foundation gate - Shows "Course Locked" when user hasn't completed foundation
    this.foundationGate = page.getByRole('heading', { name: /Course Locked/i });
    this.foundationGateMessage = page.getByText(/Complete the foundation course first/i);
    this.foundationGateLink = page.getByRole('link', { name: /Start AI Conversation Fundamentals/i });

    // Progress indicators
    this.courseProgressBar = page.locator('[class*="progress"]').first();
    this.completedModulesCount = page.getByText(/\d+\/\d+ completed/i);

    // What you'll build
    this.deliverablesSection = page.locator('section').filter({ hasText: /What You'll Build|Deliverables/i });
  }

  /**
   * Navigate to a specific course
   */
  async goto(courseSlug: string) {
    // Handle both /academy/ and /courses/ paths
    const path = courseSlug === 'ai-conversation-fundamentals' || courseSlug === 'claude-for-knowledge-workers'
      ? `/courses/${courseSlug}`
      : `/academy/${courseSlug}`;
    await super.goto(path);
  }

  /**
   * Check if the foundation gate is blocking this course
   */
  async isFoundationGateLocked(): Promise<boolean> {
    // Check for "Course Locked" heading which appears when gate is active
    return this.foundationGate.isVisible().catch(() => false);
  }

  /**
   * Get the number of modules in the course
   */
  async getModuleCount(): Promise<number> {
    const links = await this.moduleLinks.all();
    return links.length;
  }

  /**
   * Navigate to a specific module
   */
  async navigateToModule(moduleNumber: number) {
    const moduleLink = this.page.locator(`a[href*="module-${moduleNumber}"]`).first();
    await moduleLink.click();
    await this.waitForPageLoad();
  }

  /**
   * Start the course (go to module 1)
   */
  async startCourse() {
    await this.startCourseButton.click();
    await this.waitForPageLoad();
  }

  /**
   * Navigate to foundation course from gate
   */
  async goToFoundationFromGate() {
    await this.foundationGateLink.click();
    await this.waitForPageLoad();
  }

  /**
   * Verify course page structure
   */
  async verifyCourseStructure() {
    await expect(this.courseTitle).toBeVisible();
    // Should have curriculum or at least some content visible
    const hasContent = await this.curriculumSection.isVisible() || await this.moduleLinks.count() > 0;
    expect(hasContent).toBeTruthy();
  }

  /**
   * Verify locked course shows foundation gate
   */
  async verifyFoundationGateShown() {
    await expect(this.foundationGateMessage).toBeVisible();
    await expect(this.foundationGateLink).toBeVisible();
  }

  /**
   * Verify unlocked course shows full content
   */
  async verifyUnlockedContent() {
    // Gate should not be visible
    const isLocked = await this.foundationGateMessage.isVisible();
    expect(isLocked).toBeFalsy();
    // Should see curriculum
    await expect(this.curriculumSection).toBeVisible();
  }

  /**
   * Get all module links
   */
  async getModuleLinks(): Promise<string[]> {
    const links = await this.moduleLinks.all();
    const hrefs: string[] = [];
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href) hrefs.push(href);
    }
    return hrefs;
  }

  /**
   * Check if course has progress displayed
   */
  async hasProgressIndicator(): Promise<boolean> {
    return this.completedModulesCount.isVisible();
  }
}
