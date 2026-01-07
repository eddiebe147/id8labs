import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Skills page object for StackShack marketplace with Server-Side Sidebar
 * Note: Filters use URL-based navigation (Links), not client-side radio/checkboxes
 */
export class SkillsPage extends BasePage {
  // Hero section
  readonly heroSection: Locator;
  readonly stackShackLogo: Locator;
  readonly heroBadge: Locator;
  readonly heroSubtitle: Locator;
  readonly searchBar: Locator;
  readonly quickStats: Locator;

  // Sidebar (desktop only - hidden on mobile with lg:block)
  readonly sidebar: Locator;

  // Sidebar - Filter Section (uses Links, not radio buttons)
  readonly filterSection: Locator;
  readonly filterHeader: Locator;
  readonly typeFilterAll: Locator;
  readonly typeFilterSkills: Locator;
  readonly typeFilterAgents: Locator;
  readonly categoryLinks: Locator;
  readonly clearFiltersLink: Locator;

  // Sidebar - Starter Kits Widget
  readonly starterKitsSection: Locator;
  readonly starterKitLinks: Locator;
  readonly browseAllKitsLink: Locator;

  // Sidebar - Help Accordion
  readonly helpSection: Locator;
  readonly helpInstallDetails: Locator;
  readonly helpSkillsVsAgentsDetails: Locator;

  // Main Content
  readonly mainContent: Locator;
  readonly resultsCount: Locator;
  readonly skillsGrid: Locator;
  readonly skillCards: Locator;
  readonly activeFilters: Locator;
  readonly clearAllLink: Locator;

  // Mobile (sidebar is hidden, uses MobileFilterButton which links to /skills)
  readonly mobileFilterButton: Locator;

  constructor(page: Page) {
    super(page);

    // Hero section
    this.heroSection = page.locator('section').first();
    this.stackShackLogo = page.locator('h1').first();
    this.heroBadge = page.locator('div').filter({ hasText: /Skills & Agents/ }).first();
    this.heroSubtitle = page.locator('p').filter({ hasText: /Free skills & agents for Claude Code/ });
    this.searchBar = page.locator('input[type="search"], input[placeholder*="Search"]');
    this.quickStats = page.locator('div').filter({ hasText: /Categories/ }).first();

    // Sidebar (desktop only)
    this.sidebar = page.locator('aside');

    // Sidebar - Filter Section (Link-based)
    // Use href selectors to be precise since text can match multiple (e.g., "Skills" matches "Meta-Skills")
    this.filterSection = this.sidebar.locator('div').filter({ hasText: /Type/ }).first();
    this.filterHeader = this.sidebar.locator('h3').filter({ hasText: /Filters/i });
    this.typeFilterAll = this.sidebar.locator('a[href="/skills"]').first();
    this.typeFilterSkills = this.sidebar.locator('a[href*="type=skills"]');
    this.typeFilterAgents = this.sidebar.locator('a[href*="type=agents"]');
    // Category links have emoji spans (span.text-lg) and go to /skills?category=*
    this.categoryLinks = this.sidebar.locator('a[href*="category="]');
    this.clearFiltersLink = this.sidebar.locator('a').filter({ hasText: 'Clear' });

    // Sidebar - Starter Kits Widget
    this.starterKitsSection = this.sidebar.locator('h3').filter({ hasText: /Starter Kits/i }).locator('..');
    this.starterKitLinks = this.sidebar.locator('a[href*="/skills/starter-kits#"]');
    this.browseAllKitsLink = this.sidebar.locator('a').filter({ hasText: /Browse all kits/i });

    // Sidebar - Help Accordion (uses <details> elements)
    this.helpSection = this.sidebar.locator('h3').filter({ hasText: /Help/i }).locator('..');
    this.helpInstallDetails = this.sidebar.locator('details').filter({ hasText: /How to Install/ });
    this.helpSkillsVsAgentsDetails = this.sidebar.locator('details').filter({ hasText: /Skills vs Agents/ });

    // Main Content
    this.mainContent = page.locator('div.flex-1.min-w-0').first();
    // Results count is in a div: "Showing X of Y items"
    this.resultsCount = page.locator('div').filter({ hasText: /^Showing \d+/ }).first();
    this.skillsGrid = page.locator('div.grid').first();
    this.skillCards = page.locator('article');
    this.activeFilters = page.locator('div').filter({ hasText: /Active filters:/ }).first();
    this.clearAllLink = page.locator('a').filter({ hasText: /Clear all/ });

    // Mobile filter button
    this.mobileFilterButton = page.locator('a.lg\\:hidden').filter({ hasText: /Filters/ });
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
   * Filter by type using URL navigation
   */
  async filterByType(type: 'all' | 'skills' | 'agents') {
    if (type === 'all') {
      // Navigate directly since "All Items" just goes to /skills
      await this.page.goto('/skills');
    } else {
      // Use direct navigation instead of clicking - more reliable
      await this.page.goto(`/skills?type=${type}`);
    }
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Filter by category using URL navigation
   */
  async filterByCategory(categoryId: string) {
    await this.page.goto(`/skills?category=${categoryId}`);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Clear all filters
   */
  async clearFilters() {
    // Navigate directly to /skills to clear all filters - most reliable
    await this.page.goto('/skills');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get current results count text
   */
  async getResultsCount(): Promise<string> {
    return await this.resultsCount.textContent() || '';
  }

  /**
   * Get number of visible skill cards
   */
  async getVisibleSkillCardsCount(): Promise<number> {
    return await this.skillCards.count();
  }

  /**
   * Click on a skill card by index
   */
  async clickSkillCard(index: number = 0) {
    const cards = await this.skillCards.all();
    if (cards.length > index) {
      await cards[index].locator('a').first().click();
      await this.waitForPageLoad();
    }
  }

  /**
   * Click on a starter kit in sidebar
   */
  async clickStarterKit(index: number = 0) {
    const kits = await this.starterKitLinks.all();
    if (kits.length > index) {
      await kits[index].click();
      await this.waitForPageLoad();
    }
  }

  /**
   * Expand help section
   */
  async expandHelpSection(section: 'install' | 'difference') {
    const details = section === 'install' ? this.helpInstallDetails : this.helpSkillsVsAgentsDetails;
    const summary = details.locator('summary');
    await summary.click();
    await this.page.waitForTimeout(200);
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
   * Verify sidebar is visible (desktop)
   */
  async verifySidebarVisible() {
    await expect(this.sidebar).toBeVisible();
  }

  /**
   * Verify main content grid is visible
   */
  async verifyGridVisible() {
    await expect(this.mainContent).toBeVisible();
    await expect(this.skillsGrid).toBeVisible();
  }

  /**
   * Verify StackShack logo styling
   */
  async verifyStackShackLogo() {
    await expect(this.stackShackLogo).toBeVisible();
  }

  /**
   * Verify quick stats badges
   */
  async verifyQuickStats() {
    const statsText = await this.quickStats.textContent();
    expect(statsText).toMatch(/Categories/);
  }

  /**
   * Scroll through page
   */
  async scrollThroughPage() {
    await this.page.evaluate(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
    await this.page.waitForTimeout(2000);
  }

  /**
   * Check if filters are active
   */
  async hasActiveFilters(): Promise<boolean> {
    return await this.activeFilters.isVisible() || await this.clearFiltersLink.isVisible();
  }
}
