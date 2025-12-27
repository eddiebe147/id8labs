import { test, expect, testData } from './fixtures/base.fixture';
import { routes } from './utils/test-config';

test.describe('Navigation', () => {
  test('should navigate to products page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Set desktop viewport to ensure nav is visible
    await page.setViewportSize({ width: 1280, height: 720 });

    // Click the Products link in the header navigation
    const header = page.locator('header');
    const productsLink = header.getByRole('link', { name: /products/i });
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

      if (route.expectedTitle) {
        await expect(page).toHaveTitle(route.expectedTitle);
      }
      if (route.expectedUrl) {
        await expect(page).toHaveURL(route.expectedUrl);
      }
    }
  });

  test('should return to home from any page', async ({ page }) => {
    // Set desktop viewport for consistent nav
    await page.setViewportSize({ width: 1280, height: 720 });

    // Go to products first
    await page.goto('/products');
    await page.waitForLoadState('domcontentloaded');

    // Click the logo in header to return home
    // Use the link with text "id8Labs" which is the logo
    const logoLink = page.locator('header a[href="/"]');
    await logoLink.waitFor({ state: 'visible' });
    await logoLink.click({ force: true });
    await page.waitForURL('/');
    await expect(page).toHaveURL('/');
  });

  test('should handle 404 for invalid routes', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    await page.waitForLoadState('networkidle');

    // Should show 404 page content - look for "404 Error" or "Page not found"
    const has404Error = await page.getByText('404 Error').isVisible();
    const hasPageNotFound = await page.getByText('Page not found').isVisible();

    expect(has404Error || hasPageNotFound).toBeTruthy();
  });
});

test.describe('Header Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display logo', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Logo should be visible
    const logo = header.getByRole('link').first();
    await expect(logo).toBeVisible();
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
    await page.waitForLoadState('networkidle');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Scroll to footer
    await footer.scrollIntoViewIfNeeded();

    // Should have links
    const footerLinks = await footer.getByRole('link').all();
    expect(footerLinks.length).toBeGreaterThan(0);
  });

  test('should have privacy and terms links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Check for privacy and terms links (they are small text links in footer)
    const privacyLink = footer.locator('a[href="/privacy"]');
    const termsLink = footer.locator('a[href="/terms"]');

    await expect(privacyLink).toBeVisible();
    await expect(termsLink).toBeVisible();
  });
});

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should show mobile menu button', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Mobile menu button should be visible (aria-label contains "navigation menu")
    const menuButton = page.getByRole('button', { name: /navigation menu/i });
    await expect(menuButton).toBeVisible();
  });

  test('should be able to navigate on mobile', async ({ page }) => {
    await page.goto('/');

    // Try to navigate to products
    const productsLink = page.getByRole('link', { name: /products/i }).first();
    if (await productsLink.isVisible()) {
      await productsLink.click();
      await expect(page).toHaveURL(/\/products/);
    }
  });
});
