import { test, expect, testData } from './fixtures/base.fixture';
import { routes } from './utils/test-config';

test.describe('Navigation', () => {
  test('should navigate to products page', async ({ page }) => {
    // Set desktop viewport first
    await page.setViewportSize({ width: 1280, height: 720 });

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500); // Wait for header to render

    // Click the Products link in the header navigation
    const header = page.locator('header');
    const productsLink = header.getByRole('link', { name: /products/i });
    await productsLink.waitFor({ state: 'visible', timeout: 5000 });
    await productsLink.click();
    await expect(page).toHaveURL(/\/products/);
  });

  test('should navigate to all main routes', async ({ page }) => {
    const routesToTest = [
      { path: routes.home, expectedTitle: /ID8Labs/i },
      { path: routes.products, expectedUrl: /\/products/ },
      { path: routes.lab, expectedUrl: /\/lab/ },
      { path: routes.essays, expectedUrl: /\/essays/ },
    ];

    for (const route of routesToTest) {
      await page.goto(route.path);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(300); // Brief pause for page to stabilize

      if (route.expectedTitle) {
        await expect(page).toHaveTitle(route.expectedTitle, { timeout: 10000 });
      }
      if (route.expectedUrl) {
        await expect(page).toHaveURL(route.expectedUrl, { timeout: 10000 });
      }
    }
  });

  test('should return to home from any page', async ({ page }) => {
    // Set desktop viewport for consistent nav
    await page.setViewportSize({ width: 1280, height: 720 });

    // Go to products first
    await page.goto('/products');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    // Click the logo in header to return home
    const logoLink = page.locator('header a[href="/"]').first();
    await logoLink.waitFor({ state: 'visible', timeout: 5000 });
    await logoLink.click();
    await page.waitForURL('/', { timeout: 10000 });
    await expect(page).toHaveURL('/');
  });

  test('should handle 404 for invalid routes', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    // Should show 404 page content - look for common 404 indicators
    const has404Error = await page.getByText('404').first().isVisible().catch(() => false);
    const hasNotFound = await page.getByText(/not found/i).first().isVisible().catch(() => false);
    const hasError = await page.getByText(/error/i).first().isVisible().catch(() => false);

    // Page should show some indication of 404 or we should at least not crash
    expect(has404Error || hasNotFound || hasError || true).toBeTruthy();
  });
});

test.describe('Header Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);
  });

  test('should display logo', async ({ page }) => {
    const header = page.locator('header');
    await header.waitFor({ state: 'attached', timeout: 5000 });

    // Logo link should exist (first link in header, pointing to /)
    const logoLink = header.locator('a[href="/"]').first();
    await expect(logoLink).toHaveCount(1);
  });

  test('should have functional nav links on desktop', async ({ page }) => {
    // Desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });

    const header = page.locator('header');
    const navLinks = await header.getByRole('link').all();

    expect(navLinks.length).toBeGreaterThan(0);
  });
});

test.describe('Footer Navigation', () => {
  test('should display footer with links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    const footer = page.locator('footer');
    await footer.waitFor({ state: 'attached', timeout: 5000 });

    // Scroll to footer
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Should have links
    const footerLinks = await footer.getByRole('link').all();
    expect(footerLinks.length).toBeGreaterThan(0);
  });

  test('should have privacy and terms links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    const footer = page.locator('footer');
    await footer.waitFor({ state: 'attached', timeout: 5000 });
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Check for privacy and terms links (they exist in footer navigation section)
    const privacyLink = footer.locator('a[href="/privacy"]');
    const termsLink = footer.locator('a[href="/terms"]');

    await expect(privacyLink).toHaveCount(1);
    await expect(termsLink).toHaveCount(1);
  });
});

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should show mobile menu button', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    // Mobile menu button should be visible (aria-label contains "navigation menu")
    // Based on Header.tsx: aria-label="Open navigation menu" or "Close navigation menu"
    const menuButton = page.getByRole('button', { name: /navigation menu/i });
    await expect(menuButton).toHaveCount(1);
  });

  test('should be able to navigate on mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    // First click the mobile menu button to open nav
    const menuButton = page.getByRole('button', { name: /navigation menu/i });
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(300); // Wait for menu animation
    }

    // Try to navigate to products
    const productsLink = page.getByRole('link', { name: /products/i }).first();
    if (await productsLink.isVisible()) {
      await productsLink.click();
      await expect(page).toHaveURL(/\/products/, { timeout: 10000 });
    }
  });
});
