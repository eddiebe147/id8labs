import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Skills page object for StackShack marketplace
 */
export class SkillsPage extends BasePage {
  // Hero section
  readonly heroSection: Locator;
  readonly stackShackLogo: Locator;
  readonly heroBadge: Locator;
  readonly heroSubtitle: Locator;
  readonly searchBar: Locator;
  readonly quickStats: Locator;

  // Category tabs
  readonly categoryTabs: Locator;
  readonly itemTypeFilter: Locator;

  // Sections
  readonly featuredSection: Locator;
  readonly featuredSkills: Locator;
  readonly starterKitsSection: Locator;
  readonly starterKits: Locator;
  readonly recentlyAddedSection: Locator;
  readonly recentlyAddedSkills: Locator;
  readonly browseByCategorySection: Locator;
  readonly categoryCards: Locator;

  // How to Use section
  readonly howToUseSection: Locator;
  readonly skillsVsAgentsComparison: Locator;
  readonly installationGuide: Locator;
  readonly usageExamples: Locator;

  // CTA Section
  readonly ctaSection: Locator;
  readonly ctaButtons: Locator;

  // Skill cards
  readonly skillCards: Locator;

  constructor(page: Page) {
    super(page);

    // Hero section
    this.heroSection = page.locator('section').first();
    this.stackShackLogo = page.locator('span').filter({ hasText: /STACKSHACK/ });
    this.heroBadge = page.locator('div').filter({ hasText: /Skills & Agents/ }).first();
    this.heroSubtitle = page.locator('p').filter({ hasText: /Free skills & agents for Claude Code/ });
    this.searchBar = page.locator('input[type="search"], input[placeholder*="Search"]');
    this.quickStats = page.locator('div').filter({ hasText: /Categories|Free|Verified/ });

    // Category tabs and filters
    this.categoryTabs = page.locator('[role="tablist"], nav').filter({ has: page.locator('button, a') });
    this.itemTypeFilter = page.locator('button').filter({ hasText: /All|Skills|Agents/ });

    // Sections
    this.featuredSection = page.locator('section').filter({ hasText: /Featured/i }).first();
    this.featuredSkills = this.featuredSection.locator('a[href*="/skills/"]');
    this.starterKitsSection = page.locator('section').filter({ hasText: /Starter Kits/i });
    this.starterKits = this.starterKitsSection.locator('a[href*="/skills/"]');
    this.recentlyAddedSection = page.locator('section').filter({ hasText: /Recently Added/i });
    this.recentlyAddedSkills = this.recentlyAddedSection.locator('a[href*="/skills/"]');
    this.browseByCategorySection = page.locator('section').filter({ hasText: /Browse by Category/i });
    this.categoryCards = this.browseByCategorySection.locator('a[href*="/skills/categories/"]');

    // How to Use section
    this.howToUseSection = page.locator('section').filter({ hasText: /How to Install & Use/i });
    this.skillsVsAgentsComparison = this.howToUseSection.locator('text=Skills').locator('..').locator('..');
    this.installationGuide = this.howToUseSection.locator('text=Installation Guide').locator('..').locator('..');
    this.usageExamples = this.howToUseSection.locator('text=Real-World Examples').locator('..').locator('..');

    // CTA Section
    this.ctaSection = page.locator('section').filter({ hasText: /Build your stack/i });
    this.ctaButtons = this.ctaSection.locator('a.btn, button.btn');

    // Skill cards
    this.skillCards = page.locator('a[href*="/skills/"]').filter({ has: page.locator('h3, h4') });
  }

  /**
   * Navigate to skills page
   */
  async goto() {
    await super.goto('/skills');
  }

  /**
   * Search for skills
   */
  async search(query: string) {
    await this.searchBar.waitFor({ state: 'visible' });
    await this.searchBar.click();
    await this.searchBar.fill(query);
    await this.page.keyboard.press('Enter');
    await this.waitForPageLoad();
  }

  /**
   * Click on a category tab
   */
  async clickCategory(categoryName: string) {
    const categoryButton = this.page.locator('button, a').filter({ hasText: new RegExp(categoryName, 'i') }).first();
    await categoryButton.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Filter by item type (All, Skills, Agents)
   */
  async filterByType(type: 'All' | 'Skills' | 'Agents') {
    const filterButton = this.page.locator('button').filter({ hasText: new RegExp(type, 'i') }).first();
    await filterButton.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Click on a skill card
   */
  async clickSkillCard(index: number = 0) {
    const cards = await this.skillCards.all();
    if (cards.length > index) {
      await cards[index].click();
      await this.waitForPageLoad();
    }
  }

  /**
   * Click on a starter kit
   */
  async clickStarterKit(kitName: string) {
    const kitLink = this.page.locator('a').filter({ hasText: new RegExp(kitName, 'i') }).first();
    await kitLink.click();
    await this.waitForPageLoad();
  }

  /**
   * Click on a category card
   */
  async clickCategoryCard(categoryName: string) {
    const categoryCard = this.page.locator('a[href*="/skills/categories/"]').filter({ hasText: new RegExp(categoryName, 'i') }).first();
    await categoryCard.click();
    await this.waitForPageLoad();
  }

  /**
   * Get all visible skill card titles
   */
  async getSkillCardTitles(): Promise<string[]> {
    const cards = await this.skillCards.all();
    const titles: string[] = [];
    for (const card of cards) {
      const heading = card.locator('h3, h4').first();
      const title = await heading.textContent();
      if (title) titles.push(title.trim());
    }
    return titles;
  }

  /**
   * Get featured skills count
   */
  async getFeaturedSkillsCount(): Promise<number> {
    return await this.featuredSkills.count();
  }

  /**
   * Get starter kits count
   */
  async getStarterKitsCount(): Promise<number> {
    return await this.starterKits.count();
  }

  /**
   * Get recently added skills count
   */
  async getRecentlyAddedSkillsCount(): Promise<number> {
    return await this.recentlyAddedSkills.count();
  }

  /**
   * Get category cards count
   */
  async getCategoryCardsCount(): Promise<number> {
    return await this.categoryCards.count();
  }

  /**
   * Verify hero section is visible
   */
  async verifyHeroSection() {
    await expect(this.stackShackLogo).toBeVisible();
    await expect(this.heroSubtitle).toBeVisible();
    await expect(this.searchBar).toBeVisible();
  }

  /**
   * Verify all main sections are visible
   */
  async verifySectionsVisible() {
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.heroSection).toBeVisible();

    // Check if featured section exists (may not have featured skills)
    const featuredCount = await this.featuredSection.count();
    if (featuredCount > 0) {
      await expect(this.featuredSection).toBeVisible();
    }

    // Check if starter kits section exists
    const starterKitsCount = await this.starterKitsSection.count();
    if (starterKitsCount > 0) {
      await expect(this.starterKitsSection).toBeVisible();
    }

    // Check if recently added section exists
    const recentlyAddedCount = await this.recentlyAddedSection.count();
    if (recentlyAddedCount > 0) {
      await expect(this.recentlyAddedSection).toBeVisible();
    }

    // Browse by category should always exist
    await expect(this.browseByCategorySection).toBeVisible();
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

  /**
   * Verify StackShack logo styling
   */
  async verifyStackShackLogo() {
    await expect(this.stackShackLogo).toBeVisible();
    const logoText = await this.stackShackLogo.textContent();
    expect(logoText).toContain('STACK');
    expect(logoText).toContain('SHACK');
  }

  /**
   * Verify quick stats badges
   */
  async verifyQuickStats() {
    const statsText = await this.quickStats.allTextContents();
    const combinedText = statsText.join(' ');
    expect(combinedText).toMatch(/Categories|Free|Verified/);
  }
}
