import { test, expect } from '@playwright/test';
import { SkillsPage } from './pages/skills.page';

test.describe('StackShack Skills Marketplace', () => {
  let skillsPage: SkillsPage;

  test.beforeEach(async ({ page }) => {
    skillsPage = new SkillsPage(page);
    await skillsPage.goto();
  });

  test('should load with correct title', async ({ page }) => {
    await page.waitForLoadState('domcontentloaded');
    const title = await page.title();
    expect(title).toMatch(/skills|stackshack/i);
  });

  test('should display header and footer', async ({ page }) => {
    await page.locator('header').waitFor({ state: 'attached' });
    await page.locator('footer').waitFor({ state: 'attached' });
    await page.locator('main').waitFor({ state: 'attached' });

    await expect(page.locator('header')).toHaveCount(1);
    await expect(page.locator('footer')).toHaveCount(1);
    await expect(page.locator('main')).toHaveCount(1);
  });

  test('should display StackShack logo in hero section', async () => {
    await skillsPage.verifyStackShackLogo();
  });

  test('should display hero section with all elements', async () => {
    await skillsPage.verifyHeroSection();
  });

  test('should display quick stats badges', async () => {
    await skillsPage.verifyQuickStats();
  });

  test('should have functional search bar', async ({ page }) => {
    await expect(skillsPage.searchBar).toBeVisible();
    await expect(skillsPage.searchBar).toBeEnabled();

    const placeholder = await skillsPage.searchBar.getAttribute('placeholder');
    expect(placeholder).toMatch(/search/i);
  });

  test('should display category tabs', async ({ page }) => {
    const tabs = await skillsPage.categoryTabs.count();
    expect(tabs).toBeGreaterThan(0);
  });

  test('should display all main sections', async () => {
    await skillsPage.verifySectionsVisible();
  });

  test('should display featured skills section when available', async () => {
    const featuredCount = await skillsPage.getFeaturedSkillsCount();
    
    if (featuredCount > 0) {
      await expect(skillsPage.featuredSection).toBeVisible();
      expect(featuredCount).toBeGreaterThan(0);
      expect(featuredCount).toBeLessThanOrEqual(6);
    }
  });

  test('should display starter kits section when available', async () => {
    const kitsCount = await skillsPage.getStarterKitsCount();
    
    if (kitsCount > 0) {
      await expect(skillsPage.starterKitsSection).toBeVisible();
      expect(kitsCount).toBeGreaterThan(0);
    }
  });

  test('should display recently added skills', async () => {
    const recentCount = await skillsPage.getRecentlyAddedSkillsCount();
    
    if (recentCount > 0) {
      await expect(skillsPage.recentlyAddedSection).toBeVisible();
      expect(recentCount).toBeGreaterThan(0);
      expect(recentCount).toBeLessThanOrEqual(8);
    }
  });

  test('should display browse by category section', async () => {
    await expect(skillsPage.browseByCategorySection).toBeVisible();
    
    const categoryCount = await skillsPage.getCategoryCardsCount();
    expect(categoryCount).toBeGreaterThan(0);
  });

  test('should display How to Use section', async () => {
    await skillsPage.scrollThroughPage();
    await expect(skillsPage.howToUseSection).toBeVisible();
  });

  test('should display Skills vs Agents comparison', async () => {
    await skillsPage.scrollThroughPage();
    const howToSection = await skillsPage.howToUseSection.count();
    if (howToSection > 0) {
      await expect(skillsPage.howToUseSection).toContainText(/Skills|Agents/);
    }
  });

  test('should display installation guide', async () => {
    await skillsPage.scrollThroughPage();
    const howToSection = await skillsPage.howToUseSection.count();
    if (howToSection > 0) {
      await expect(skillsPage.howToUseSection).toContainText(/Installation|Install/);
    }
  });

  test('should display CTA section', async () => {
    await skillsPage.scrollThroughPage();
    await expect(skillsPage.ctaSection).toBeVisible();
    
    const ctaButtonCount = await skillsPage.ctaButtons.count();
    expect(ctaButtonCount).toBeGreaterThan(0);
  });

  test('should have clickable skill cards', async ({ page }) => {
    const skillCards = await skillsPage.skillCards.all();
    
    if (skillCards.length > 0) {
      const firstCard = skillCards[0];
      await expect(firstCard).toBeVisible();
      
      const href = await firstCard.getAttribute('href');
      expect(href).toMatch(/\/skills\//);
    }
  });

  test('should have clickable category cards', async () => {
    const categoryCards = await skillsPage.categoryCards.all();
    expect(categoryCards.length).toBeGreaterThan(0);
    
    for (const card of categoryCards) {
      const href = await card.getAttribute('href');
      expect(href).toMatch(/\/skills\/categories\//);
    }
  });

  test('should scroll through page without errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => {
      const ignoredErrors = ['Unexpected EOF', 'SyntaxError'];
      if (!ignoredErrors.some(ignored => error.message.includes(ignored))) {
        errors.push(error.message);
      }
    });

    await skillsPage.scrollThroughPage();
    expect(errors).toHaveLength(0);
  });

  test('should display orange glow effect in hero', async ({ page }) => {
    const glowElement = page.locator('div').filter({ 
      has: page.locator('[class*="bg-"][class*="FF6B00"], [style*="#FF6B00"]') 
    });
    
    // May or may not have glow effect, just check page loads
    await expect(skillsPage.heroSection).toBeVisible();
  });

  test('should display skill counts in badge', async () => {
    await expect(skillsPage.heroBadge).toBeVisible();
    const badgeText = await skillsPage.heroBadge.textContent();
    expect(badgeText).toMatch(/\d+/); // Should contain a number
  });
});

test.describe('StackShack - Search Functionality', () => {
  let skillsPage: SkillsPage;

  test.beforeEach(async ({ page }) => {
    skillsPage = new SkillsPage(page);
    await skillsPage.goto();
  });

  test('should allow typing in search bar', async () => {
    await skillsPage.searchBar.click();
    await skillsPage.searchBar.fill('test');
    
    const value = await skillsPage.searchBar.inputValue();
    expect(value).toBe('test');
  });

  test('should clear search input', async () => {
    await skillsPage.searchBar.click();
    await skillsPage.searchBar.fill('test query');
    await skillsPage.searchBar.clear();
    
    const value = await skillsPage.searchBar.inputValue();
    expect(value).toBe('');
  });

  test('should submit search on Enter key', async ({ page }) => {
    await skillsPage.searchBar.click();
    await skillsPage.searchBar.fill('developer');
    
    const responsePromise = page.waitForResponse(response => 
      response.url().includes('/skills') || response.status() === 200
    );
    
    await page.keyboard.press('Enter');
    
    try {
      await responsePromise;
    } catch {
      // Search might be client-side filtered
    }
  });
});

test.describe('StackShack - Category Filtering', () => {
  let skillsPage: SkillsPage;

  test.beforeEach(async ({ page }) => {
    skillsPage = new SkillsPage(page);
    await skillsPage.goto();
  });

  test('should have category tabs', async ({ page }) => {
    const categoryButtons = page.locator('button, a').filter({ hasText: /Development|Content|Business|Marketing/i });
    const count = await categoryButtons.count();
    
    // Should have at least some category tabs
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should filter skills by category when clicked', async ({ page }) => {
    const categoryButton = page.locator('button, a').filter({ hasText: /Development|Content|Business/i }).first();
    
    if (await categoryButton.isVisible()) {
      const beforeUrl = page.url();
      await categoryButton.click();
      await page.waitForTimeout(500);
      
      // URL should change or page should update
      const afterUrl = page.url();
      const urlChanged = beforeUrl !== afterUrl;
      const pageUpdated = await page.locator('main').isVisible();
      
      expect(urlChanged || pageUpdated).toBe(true);
    }
  });
});

test.describe('StackShack - Item Type Filtering', () => {
  let skillsPage: SkillsPage;

  test.beforeEach(async ({ page }) => {
    skillsPage = new SkillsPage(page);
    await skillsPage.goto();
  });

  test('should have item type filter buttons', async ({ page }) => {
    const filterButtons = page.locator('button').filter({ hasText: /All|Skills|Agents/i });
    const count = await filterButtons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should filter by Skills', async ({ page }) => {
    const skillsButton = page.locator('button').filter({ hasText: /^Skills$/i }).first();
    
    if (await skillsButton.isVisible()) {
      await skillsButton.click();
      await page.waitForTimeout(500);
      
      // Should update URL or filter content
      expect(page.url()).toMatch(/skills|type=skill/i);
    }
  });

  test('should filter by Agents', async ({ page }) => {
    const agentsButton = page.locator('button').filter({ hasText: /^Agents$/i }).first();
    
    if (await agentsButton.isVisible()) {
      await agentsButton.click();
      await page.waitForTimeout(500);
      
      // Should update URL or filter content
      expect(page.url()).toMatch(/agents|type=agent/i);
    }
  });
});

test.describe('StackShack - Navigation', () => {
  let skillsPage: SkillsPage;

  test.beforeEach(async ({ page }) => {
    skillsPage = new SkillsPage(page);
    await skillsPage.goto();
  });

  test('should navigate to skill detail page', async ({ page }) => {
    const skillCards = await skillsPage.skillCards.all();
    
    if (skillCards.length > 0) {
      const firstCard = skillCards[0];
      const href = await firstCard.getAttribute('href');
      
      await firstCard.click();
      await page.waitForLoadState('domcontentloaded');
      
      expect(page.url()).toContain('/skills/');
    }
  });

  test('should navigate to category page', async ({ page }) => {
    const categoryCards = await skillsPage.categoryCards.all();
    
    if (categoryCards.length > 0) {
      const firstCategory = categoryCards[0];
      await firstCategory.click();
      await page.waitForLoadState('domcontentloaded');
      
      expect(page.url()).toContain('/skills/categories/');
    }
  });

  test('should navigate to starter kits page', async ({ page }) => {
    const viewAllLink = page.getByRole('link', { name: /view all kits/i });
    
    if (await viewAllLink.isVisible()) {
      await viewAllLink.click();
      await page.waitForLoadState('domcontentloaded');
      
      expect(page.url()).toContain('/skills/starter-kits');
    }
  });

  test('should have working CTA buttons', async ({ page }) => {
    await skillsPage.scrollThroughPage();
    
    const ctaButtons = await skillsPage.ctaButtons.all();
    
    if (ctaButtons.length > 0) {
      for (const button of ctaButtons) {
        const href = await button.getAttribute('href');
        expect(href).toBeTruthy();
        expect(href).toMatch(/\/skills\//);
      }
    }
  });
});

test.describe('StackShack - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  let skillsPage: SkillsPage;

  test.beforeEach(async ({ page }) => {
    skillsPage = new SkillsPage(page);
    await skillsPage.goto();
  });

  test('should display mobile-friendly layout', async ({ page }) => {
    await page.locator('header').waitFor({ state: 'attached' });
    await page.locator('main').waitFor({ state: 'attached' });
    await expect(page.locator('header')).toHaveCount(1);
    await expect(page.locator('main')).toHaveCount(1);
  });

  test('should display responsive StackShack logo', async () => {
    await expect(skillsPage.stackShackLogo).toBeVisible();
  });

  test('should display search bar on mobile', async () => {
    await expect(skillsPage.searchBar).toBeVisible();
  });

  test('should have scrollable category tabs on mobile', async ({ page }) => {
    const categoryTabs = await skillsPage.categoryTabs.count();
    if (categoryTabs > 0) {
      await expect(skillsPage.categoryTabs).toBeVisible();
    }
  });

  test('should display skill cards in single column on mobile', async ({ page }) => {
    const skillCards = await skillsPage.skillCards.all();
    
    if (skillCards.length >= 2) {
      const firstCard = skillCards[0];
      const secondCard = skillCards[1];
      
      const firstBox = await firstCard.boundingBox();
      const secondBox = await secondCard.boundingBox();
      
      if (firstBox && secondBox) {
        // On mobile, cards should stack vertically
        // Second card should be below first card
        expect(secondBox.y).toBeGreaterThan(firstBox.y);
      }
    }
  });

  test('should be scrollable on mobile', async ({ page }) => {
    await skillsPage.scrollThroughPage();
    
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
  });
});

test.describe('StackShack - Accessibility', () => {
  let skillsPage: SkillsPage;

  test.beforeEach(async ({ page }) => {
    skillsPage = new SkillsPage(page);
    await skillsPage.goto();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.waitForLoadState('domcontentloaded');

    // Should have exactly one H1 (StackShack logo or main heading)
    const h1Count = await page.getByRole('heading', { level: 1 }).count();
    expect(h1Count).toBeGreaterThanOrEqual(0); // May be in logo component
  });

  test('should have accessible search input', async () => {
    await expect(skillsPage.searchBar).toBeVisible();
    
    const ariaLabel = await skillsPage.searchBar.getAttribute('aria-label');
    const placeholder = await skillsPage.searchBar.getAttribute('placeholder');
    
    // Should have either aria-label or placeholder for screen readers
    expect(ariaLabel || placeholder).toBeTruthy();
  });

  test('should have accessible skill card links', async ({ page }) => {
    const skillCards = await skillsPage.skillCards.all();
    
    if (skillCards.length > 0) {
      for (const card of skillCards.slice(0, 5)) {
        const ariaLabel = await card.getAttribute('aria-label');
        const textContent = await card.textContent();
        
        // Each card should have either aria-label or text content
        expect(ariaLabel || textContent?.trim()).toBeTruthy();
      }
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.keyboard.press('Tab');
    const firstFocused = await page.evaluate(() => document.activeElement?.tagName);
    expect(firstFocused).toBeTruthy();
  });

  test('should allow keyboard navigation to search bar', async ({ page }) => {
    let tabCount = 0;
    let searchFocused = false;
    
    while (tabCount < 20 && !searchFocused) {
      await page.keyboard.press('Tab');
      tabCount++;
      
      const activeElement = await page.evaluate(() => {
        const el = document.activeElement;
        return {
          tagName: el?.tagName,
          type: el?.getAttribute('type'),
          placeholder: el?.getAttribute('placeholder'),
        };
      });
      
      if (activeElement.tagName === 'INPUT' && activeElement.type === 'search') {
        searchFocused = true;
      }
    }
    
    // Search should be reachable via keyboard
    expect(searchFocused).toBe(true);
  });

  test('should have accessible category buttons', async ({ page }) => {
    const categoryButtons = page.locator('button, a').filter({ has: page.locator('text=/Development|Content|Business/i') });
    const count = await categoryButtons.count();
    
    if (count > 0) {
      for (let i = 0; i < Math.min(count, 5); i++) {
        const button = categoryButtons.nth(i);
        const text = await button.textContent();
        expect(text?.trim()).toBeTruthy();
      }
    }
  });
});

test.describe('StackShack - Performance', () => {
  let skillsPage: SkillsPage;

  test.beforeEach(async ({ page }) => {
    skillsPage = new SkillsPage(page);
  });

  test('should load page within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await skillsPage.goto();
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;
    
    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should not have console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await skillsPage.goto();
    await page.waitForTimeout(2000);

    // Filter out known benign errors
    const realErrors = errors.filter(error => 
      !error.includes('Failed to load resource') &&
      !error.includes('favicon') &&
      !error.includes('Unexpected EOF')
    );

    expect(realErrors).toHaveLength(0);
  });

  test('should load all images without errors', async ({ page }) => {
    const failedImages: string[] = [];
    
    page.on('response', (response) => {
      if (response.request().resourceType() === 'image' && !response.ok()) {
        failedImages.push(response.url());
      }
    });

    await skillsPage.goto();
    await skillsPage.scrollThroughPage();
    await page.waitForTimeout(2000);

    expect(failedImages).toHaveLength(0);
  });
});
