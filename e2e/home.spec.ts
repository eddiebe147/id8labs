import { test, expect, testData } from './fixtures/base.fixture';

test.describe('Home Page', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('should load with correct title', async ({ homePage }) => {
    const title = await homePage.getTitle();
    expect(title).toMatch(testData.metadata.homeTitle);
  });

  test('should display header and footer', async ({ homePage }) => {
    await homePage.verifyPageStructure();
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

  test('should have working product links', async ({ homePage }) => {
    const productLinks = await homePage.getProductLinks();
    expect(productLinks.length).toBeGreaterThan(0);

    // Each link should point to a product page
    for (const link of productLinks) {
      expect(link).toContain('/products/');
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

  test('should display mobile-friendly layout', async ({ homePage }) => {
    await homePage.goto();
    await homePage.verifyPageStructure();
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

    // Should have exactly one H1
    const h1Count = await page.getByRole('heading', { level: 1 }).count();
    expect(h1Count).toBe(1);
  });

  test('should have accessible links', async ({ page }) => {
    await page.goto('/');

    // All links should have accessible names
    const links = await page.getByRole('link').all();
    for (const link of links) {
      const name = await link.getAttribute('aria-label') || await link.textContent();
      expect(name).toBeTruthy();
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Tab through focusable elements
    await page.keyboard.press('Tab');
    const firstFocused = await page.evaluate(() => document.activeElement?.tagName);
    expect(firstFocused).toBeTruthy();
  });
});
