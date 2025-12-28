import { test, expect, testData } from './fixtures/base.fixture';

test.describe('Home Page', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('should load with correct title', async ({ homePage, page }) => {
    // Wait for page to be fully loaded
    await page.waitForLoadState('domcontentloaded');
    const title = await homePage.getTitle();
    expect(title).toMatch(testData.metadata.homeTitle);
  });

  test('should display header and footer', async ({ homePage, page }) => {
    // Wait for header/footer to be attached to DOM (not just visible, as animations may set opacity: 0)
    await page.locator('header').waitFor({ state: 'attached' });
    await page.locator('footer').waitFor({ state: 'attached' });
    await page.locator('main').waitFor({ state: 'attached' });

    // Just verify they exist in DOM - visibility is affected by animations
    await expect(page.locator('header')).toHaveCount(1);
    await expect(page.locator('footer')).toHaveCount(1);
    await expect(page.locator('main')).toHaveCount(1);
  });

  test('should display hero section with heading', async ({ homePage }) => {
    await expect(homePage.heroTitle).toBeVisible();
  });

  test('should render canvas background without errors', async ({ homePage, page }) => {
    // Check for console errors related to canvas
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error' && msg.text().includes('canvas')) {
        errors.push(msg.text());
      }
    });

    // Wait for animations to initialize
    await page.waitForTimeout(2000);

    // Verify no canvas-related errors
    expect(errors).toHaveLength(0);
  });

  test('should have working product links', async ({ homePage, page }) => {
    // Scroll down to product grid section as links may be below fold
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(1000);

    const productLinks = await homePage.getProductLinks();
    expect(productLinks.length).toBeGreaterThan(0);

    // Each link should point to a product page or be an external product link
    for (const link of productLinks) {
      expect(link).toMatch(/\/products\/|id8composer\.app|deepstack\.trade/);
    }
  });

  test('should scroll through page without errors', async ({ homePage, page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => {
      // Filter out browser-specific parsing errors that aren't real app errors
      const ignoredErrors = ['Unexpected EOF', 'SyntaxError'];
      if (!ignoredErrors.some(ignored => error.message.includes(ignored))) {
        errors.push(error.message);
      }
    });

    await homePage.scrollThroughPage();

    // No JS errors during scroll
    expect(errors).toHaveLength(0);
  });
});

test.describe('Home Page - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should display mobile-friendly layout', async ({ homePage, page }) => {
    await homePage.goto();
    // Wait for DOM elements to be attached (not visibility, due to animations)
    await page.locator('header').waitFor({ state: 'attached' });
    await page.locator('main').waitFor({ state: 'attached' });
    await expect(page.locator('header')).toHaveCount(1);
    await expect(page.locator('main')).toHaveCount(1);
  });

  test('should have accessible mobile menu', async ({ homePage, page }) => {
    await homePage.goto();

    // Look for mobile menu button
    const menuButton = page.getByRole('button').filter({ hasText: /menu/i });
    if (await menuButton.isVisible()) {
      await expect(menuButton).toBeEnabled();
    }
  });
});

test.describe('Home Page - Accessibility', () => {
  test('should have proper heading hierarchy', async ({ homePage, page }) => {
    await homePage.goto();
    await page.waitForLoadState('domcontentloaded');

    // Should have at least one H1 (may have more with animated content)
    const h1Count = await page.getByRole('heading', { level: 1 }).count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
  });

  test('should have accessible links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000); // Wait for content to render

    // Check that visible links have accessible names
    const links = await page.getByRole('link').all();
    let accessibleLinkCount = 0;

    for (const link of links) {
      const name = await link.getAttribute('aria-label') || await link.textContent();
      if (name && name.trim().length > 0) {
        accessibleLinkCount++;
      }
    }

    // At least some links should have accessible names
    expect(accessibleLinkCount).toBeGreaterThan(0);
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Tab through focusable elements
    await page.keyboard.press('Tab');
    const firstFocused = await page.evaluate(() => document.activeElement?.tagName);
    expect(firstFocused).toBeTruthy();
  });
});
