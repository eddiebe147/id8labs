import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Skills page object for StackShack marketplace with Sidebar Layout
 */
export class SkillsPage extends BasePage {
  // Hero section
  readonly heroSection: Locator;
  readonly stackShackLogo: Locator;
  readonly heroBadge: Locator;
  readonly heroSubtitle: Locator;
  readonly searchBar: Locator;
  readonly quickStats: Locator;

  // Sidebar
  readonly sidebar: Locator;
  readonly sidebarOverlay: Locator;
  readonly mobileFilterButton: Locator;
  readonly sidebarCloseButton: Locator;

  // Sidebar - Filter Section
  readonly filterSection: Locator;
  readonly typeFilterAll: Locator;
  readonly typeFilterSkills: Locator;
  readonly typeFilterAgents: Locator;
  readonly categoryCheckboxes: Locator;
  readonly clearFiltersButton: Locator;

  // Sidebar - Starter Kits Widget
  readonly starterKitsWidget: Locator;
  readonly starterKitLinks: Locator;
  readonly browseAllKitsLink: Locator;

  // Sidebar - Help Accordion
  readonly helpAccordion: Locator;
  readonly helpInstallSection: Locator;
  readonly helpSkillsVsAgentsSection: Locator;
  readonly viewFullGuideLink: Locator;

  // Main Content
  readonly mainContent: Locator;
  readonly resultsCount: Locator;
  readonly skillsGrid: Locator;
  readonly skillCards: Locator;
  readonly emptyState: Locator;

  constructor(page: Page) {
    super(page);

    // Hero section
    this.heroSection = page.locator('section').first();
    this.stackShackLogo = page.locator('span').filter({ hasText: /STACKSHACK/ });
    this.heroBadge = page.locator('div').filter({ hasText: /Skills & Agents/ }).first();
    this.heroSubtitle = page.locator('p').filter({ hasText: /Free skills & agents for Claude Code/ });
    this.searchBar = page.locator('input[type="search"], input[placeholder*="Search"]');
    this.quickStats = page.locator('div').filter({ hasText: /Categories|Free|Verified/ });

    // Sidebar
    this.sidebar = page.locator('aside');
    this.sidebarOverlay = page.locator('div.fixed.inset-0.bg-black\\/50');
    this.mobileFilterButton = page.locator('button').filter({ hasText: /Filters/ }).first();
    this.sidebarCloseButton = this.sidebar.locator('button').filter({ has: page.locator('svg') }).first();

    // Sidebar - Filter Section
    this.filterSection = this.sidebar.locator('div').filter({ hasText: /Type/ }).first();
    this.typeFilterAll = this.sidebar.locator('input[type="radio"][value="all"]');
    this.typeFilterSkills = this.sidebar.locator('input[type="radio"][value="skills"]');
    this.typeFilterAgents = this.sidebar.locator('input[type="radio"][value="agents"]');
    this.categoryCheckboxes = this.sidebar.locator('input[type="checkbox"]');
    this.clearFiltersButton = this.sidebar.locator('button').filter({ hasText: /Clear/ });

    // Sidebar - Starter Kits Widget
    this.starterKitsWidget = this.sidebar.locator('div').filter({ hasText: /Quick Start/i });
    this.starterKitLinks = this.starterKitsWidget.locator('a[href*="/skills/starter-kits/"]');
    this.browseAllKitsLink = this.sidebar.locator('a').filter({ hasText: /Browse all kits/i });

    // Sidebar - Help Accordion
    this.helpAccordion = this.sidebar.locator('div').filter({ hasText: /Help/i }).last();
    this.helpInstallSection = this.sidebar.locator('button').filter({ hasText: /How to Install/i });
    this.helpSkillsVsAgentsSection = this.sidebar.locator('button').filter({ hasText: /Skills vs Agents/i });
    this.viewFullGuideLink = this.sidebar.locator('a').filter({ hasText: /View full guide/i });

    // Main Content
    this.mainContent = page.locator('div.flex-1');
    this.resultsCount = page.locator('p').filter({ hasText: /Showing.*of.*items/i });
    this.skillsGrid = page.locator('div.grid');
    this.skillCards = page.locator('a[href*="/skills/"]').filter({ has: page.locator('h3, h4, article') });
    this.emptyState = page.locator('div').filter({ hasText: /No skills found/i });
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
   * Open mobile sidebar (on mobile viewports)
   */
  async openMobileSidebar() {
    if (await this.mobileFilterButton.isVisible()) {
      await this.mobileFilterButton.click();
      await this.page.waitForTimeout(300); // Wait for animation
    }
  }

  /**
   * Close mobile sidebar
   */
  async closeMobileSidebar() {
    if (await this.sidebarCloseButton.isVisible()) {
      await this.sidebarCloseButton.click();
      await this.page.waitForTimeout(300);
    } else if (await this.sidebarOverlay.isVisible()) {
      await this.sidebarOverlay.click();
      await this.page.waitForTimeout(300);
    }
  }

  /**
   * Filter by type (All/Skills/Agents)
   */
  async filterByType(type: 'all' | 'skills' | 'agents') {
    const radio = type === 'all' ? this.typeFilterAll : 
                  type === 'skills' ? this.typeFilterSkills : 
                  this.typeFilterAgents;
    
    await radio.check();
    await this.page.waitForTimeout(300); // Wait for filter to apply
  }

  /**
   * Filter by category (toggle checkbox)
   */
  async toggleCategoryFilter(categoryName: string) {
    const checkbox = this.sidebar.locator('label').filter({ hasText: new RegExp(categoryName, 'i') })
      .locator('input[type="checkbox"]');
    await checkbox.click();
    await this.page.waitForTimeout(300);
  }

  /**
   * Clear all filters
   */
  async clearFilters() {
    await this.clearFiltersButton.click();
    await this.page.waitForTimeout(300);
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
      await cards[index].click();
      await this.waitForPageLoad();
    }
  }

  /**
   * Get all visible skill card titles
   */
  async getSkillCardTitles(): Promise<string[]> {
    const cards = await this.skillCards.all();
    const titles: string[] = [];
    for (const card of cards) {
      const heading = card.locator('h3, h4, h5').first();
      if (await heading.count() > 0) {
        const title = await heading.textContent();
        if (title) titles.push(title.trim());
      }
    }
    return titles;
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
   * Expand help section (How to Install or Skills vs Agents)
   */
  async expandHelpSection(section: 'install' | 'difference') {
    const button = section === 'install' ? this.helpInstallSection : this.helpSkillsVsAgentsSection;
    await button.click();
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
    await expect(this.filterSection).toBeVisible();
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

  /**
   * Check if empty state is shown
   */
  async isEmptyStateVisible(): Promise<boolean> {
    return await this.emptyState.isVisible();
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
}
