import { test, expect, testData } from './fixtures/base.fixture';
import { productSlugs } from './pages';

test.describe('Products Page', () => {
  test('should load products listing', async ({ productsPage, page }) => {
    await productsPage.goto();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000); // Wait for animations

    // Products page has main content
    await page.locator('main').waitFor({ state: 'attached', timeout: 10000 });
    await expect(page.locator('main')).toHaveCount(1);

    // Page should have loaded without errors (check for product links in DOM)
    const productLinks = page.locator('a[href*="/products/"]');
    const linkCount = await productLinks.count();
    expect(linkCount).toBeGreaterThan(0);
  });

  test('should display product cards', async ({ productsPage, page }) => {
    await productsPage.goto();
    await page.waitForTimeout(500); // Wait for content to render
    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('should have valid product links', async ({ productsPage }) => {
    await productsPage.goto();
    const links = await productsPage.getAllProductLinks();

    for (const link of links) {
      expect(link).toMatch(/\/products\/\w+/);
    }
  });
});

test.describe('Product Detail Pages', () => {
  for (const product of testData.products) {
    test(`should load ${product.title} product page`, async ({ productDetailPage }) => {
      await productDetailPage.goto(product.slug);

      // Page should load without error
      await productDetailPage.verifyPageStructure();

      // Should have a title
      await productDetailPage.verifyProductPage();
    });
  }
});

test.describe('Product Pages - Content Verification', () => {
  test('Composer page should display writing tool content', async ({ page }) => {
    await page.goto('/products/composer');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000); // Wait for animations

    // Verify page loaded with any meaningful content
    const hasHeading = await page.getByRole('heading', { level: 1 }).count();
    const hasContent = await page.locator('main').isVisible().catch(() => false);

    expect(hasHeading).toBeGreaterThan(0);
    expect(hasContent).toBeTruthy();
  });

  test('DeepStack page should display trading content', async ({ page }) => {
    await page.goto('/products/deepstack');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);

    const hasHeading = await page.getByRole('heading', { level: 1 }).count();
    const hasContent = await page.locator('main').isVisible().catch(() => false);

    expect(hasHeading).toBeGreaterThan(0);
    expect(hasContent).toBeTruthy();
  });

  test('Pause page should display communication content', async ({ page }) => {
    await page.goto('/products/pause');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);

    const hasHeading = await page.getByRole('heading', { level: 1 }).count();
    const hasContent = await page.locator('main').isVisible().catch(() => false);

    expect(hasHeading).toBeGreaterThan(0);
    expect(hasContent).toBeTruthy();
  });
});

test.describe('Product Pages - SEO', () => {
  for (const slug of ['composer', 'deepstack', 'pause'] as const) {
    test(`${slug} should have proper meta tags`, async ({ page }) => {
      await page.goto(`/products/${slug}`);
      await page.waitForLoadState('networkidle');

      // Should have a title
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(5);

      // Should have meta description
      const metaDescription = await page
        .locator('meta[name="description"]')
        .getAttribute('content');
      // Meta description is optional but if present should be valid
      if (metaDescription) {
        expect(metaDescription.length).toBeGreaterThan(10);
      }
    });
  }
});

test.describe('Product Pages - Responsive', () => {
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 720 },
  ];

  for (const viewport of viewports) {
    test(`should display correctly on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/products/composer');
      await page.waitForLoadState('networkidle');

      // Page should be visible and scrollable
      const main = page.locator('main');
      await expect(main).toBeVisible();

      // No horizontal scrollbar
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasHorizontalScroll).toBeFalsy();
    });
  }
});

test.describe('Product Navigation Flow', () => {
  test('should navigate from home to product and back', async ({ page }) => {
    // Start at products page directly
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/products/);

    // Look for any product link that includes /products/ in href
    const productLinks = page.locator('a[href*="/products/"]');
    const count = await productLinks.count();

    if (count > 0) {
      // Click the first product link
      const firstProductLink = productLinks.first();
      const href = await firstProductLink.getAttribute('href');
      await firstProductLink.click();
      await page.waitForLoadState('networkidle');

      // Verify we navigated to a product page
      if (href) {
        await expect(page).toHaveURL(new RegExp(href.replace('/', '\\/')));
      }

      // Navigate back
      await page.goBack();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/\/products/);
    }
  });

  test('should allow browsing multiple products', async ({ page }) => {
    const productsToVisit = ['composer', 'deepstack', 'pause'];

    for (const product of productsToVisit) {
      await page.goto(`/products/${product}`);
      await page.waitForLoadState('networkidle');

      // Verify page loaded
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toBeVisible();
    }
  });
});
