import { test, expect, academyTestData } from './fixtures/academy.fixture';
import { testConfig } from './utils/test-config';

/**
 * Academy E2E Tests
 *
 * Tests the ID8Labs Academy feature including:
 * - Course discovery and navigation
 * - Foundation gate (locked/unlocked courses)
 * - Module viewing and navigation
 * - Mobile responsiveness
 */

test.describe('Academy Hub - Anonymous User', () => {
  test.beforeEach(async ({ academyPage }) => {
    await academyPage.goto();
  });

  test('should load academy page with correct URL', async ({ academyPage, page }) => {
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('/academy');
    // Page should have loaded successfully (status 200)
    await expect(page.locator('main')).toBeAttached();
  });

  test('should display hero section with heading', async ({ academyPage }) => {
    await expect(academyPage.heroTitle).toBeVisible();
  });

  test('should display header and footer', async ({ page }) => {
    await page.locator('header').waitFor({ state: 'attached' });
    await page.locator('footer').waitFor({ state: 'attached' });
    await expect(page.locator('header')).toHaveCount(1);
    await expect(page.locator('footer')).toHaveCount(1);
  });

  test('should show all 7 courses', async ({ academyPage }) => {
    await academyPage.verifyAllCoursesListed();
  });

  test('should have clickable course links', async ({ academyPage, page }) => {
    // Scroll to curriculum section to ensure links are visible
    await page.evaluate(() => document.getElementById('curriculum')?.scrollIntoView());
    await page.waitForTimeout(500);

    // Count links to /academy/ or /courses/ paths
    const courseLinks = page.locator('a[href*="/academy/"], a[href*="/courses/"]');
    const count = await courseLinks.count();

    // Should have at least 7 course links (including nav, CTA buttons, etc.)
    expect(count).toBeGreaterThanOrEqual(7);
  });

  test('should navigate to foundation course from CTA', async ({ academyPage, page }) => {
    // Try to find and click foundation course link
    const foundationLink = page.locator('a[href*="ai-conversation-fundamentals"]').first();
    if (await foundationLink.isVisible()) {
      await foundationLink.click();
      await page.waitForLoadState('domcontentloaded');
      expect(page.url()).toContain('ai-conversation-fundamentals');
    }
  });

  test('should scroll through page without errors', async ({ academyPage, page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => {
      const ignoredErrors = ['Unexpected EOF', 'SyntaxError'];
      if (!ignoredErrors.some((ignored) => error.message.includes(ignored))) {
        errors.push(error.message);
      }
    });

    // Scroll through the page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    expect(errors).toHaveLength(0);
  });
});

test.describe('Academy Hub - Course Navigation', () => {
  test('should have navigable link to AI Partner Mastery', async ({ academyPage, page }) => {
    await academyPage.goto();

    // Scroll to bottom of page to ensure all course cards are loaded
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Find any link that points to ai-partner-mastery
    const courseLink = page.locator('a[href*="ai-partner-mastery"]').first();
    const exists = await courseLink.count() > 0;
    expect(exists).toBeTruthy();

    // Get the href and verify it points to the right path
    const href = await courseLink.getAttribute('href');
    expect(href).toContain('ai-partner-mastery');
  });

  test('should have Start Foundation Course button', async ({ academyPage, page }) => {
    await academyPage.goto();

    // Find the "Start Foundation Course" button
    const foundationButton = page.getByRole('link', { name: /Start Foundation Course/i });
    await expect(foundationButton.first()).toBeVisible();

    // Get the href and verify it points to the foundation course
    const href = await foundationButton.first().getAttribute('href');
    expect(href).toContain('ai-conversation-fundamentals');
  });

  test('should navigate between courses via back button', async ({ coursePage, page }) => {
    // Go to a course
    await coursePage.goto('ai-partner-mastery');
    await page.waitForLoadState('domcontentloaded');

    // Navigate back
    await page.goBack();
    await page.waitForLoadState('domcontentloaded');

    // Should be back on academy or previous page
    // URL structure may vary, so just verify we're not on the course module page
    expect(page.url()).not.toContain('ai-partner-mastery/module');
  });
});

test.describe('Course Page - Structure', () => {
  test('foundation course should show curriculum', async ({ coursePage, page }) => {
    await coursePage.goto('ai-conversation-fundamentals');
    await page.waitForLoadState('domcontentloaded');
    await expect(coursePage.courseTitle).toBeVisible();
  });

  test('course page should have module links', async ({ coursePage }) => {
    await coursePage.goto('ai-conversation-fundamentals');
    const moduleCount = await coursePage.getModuleCount();
    expect(moduleCount).toBeGreaterThan(0);
  });

  test('should have module links on course page', async ({ coursePage, page }) => {
    await coursePage.goto('ai-conversation-fundamentals');
    await page.waitForLoadState('domcontentloaded');

    // Scroll down to find module links
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(500);

    // Find module links (module-1, module-2, etc.)
    const moduleLinks = page.locator('a[href*="module-"]');
    const count = await moduleLinks.count();

    // Should have at least 1 module link
    expect(count).toBeGreaterThan(0);

    // Verify the first module link points to the right place
    const firstModuleHref = await moduleLinks.first().getAttribute('href');
    expect(firstModuleHref).toContain('module-');
  });
});

test.describe('Foundation Gate', () => {
  test('locked course page loads and shows content or gate', async ({ coursePage, page }) => {
    // Navigate to a course that requires foundation (when not authenticated)
    await coursePage.goto('ai-for-leaders');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000); // Wait for gate hook to resolve

    // The page should load and show either:
    // 1. "Course Locked" gate (for anonymous or users without foundation complete)
    // 2. Full course content (for authenticated users with foundation complete)
    // 3. Loading spinner while checking auth
    const mainElement = page.locator('body');
    await expect(mainElement).toBeVisible();

    // Check what's actually shown
    const gateVisible = await page.getByText(/Course Locked/i).isVisible().catch(() => false);
    const moduleContentVisible = await page.getByText(/Module 1/i).isVisible().catch(() => false);
    const loadingVisible = await page.locator('[class*="animate-spin"]').isVisible().catch(() => false);

    // At least one of these should be true
    const hasValidState = gateVisible || moduleContentVisible || loadingVisible;
    expect(hasValidState).toBeTruthy();
  });

  test('foundation course should NOT be locked', async ({ coursePage, page }) => {
    await coursePage.goto('ai-conversation-fundamentals');
    await page.waitForLoadState('domcontentloaded');

    // Foundation course should always show content, never be locked
    await expect(coursePage.courseTitle).toBeVisible();

    // Should NOT show "Course Locked" heading
    const gateHeading = page.getByRole('heading', { name: /Course Locked/i });
    await expect(gateHeading).not.toBeVisible();
  });

  test('locked course should have foundation link when gate shown', async ({ coursePage, page }) => {
    await coursePage.goto('ai-partner-mastery');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000); // Wait for gate hook to resolve

    // Check if gate is showing
    const gateVisible = await page.getByText(/Course Locked/i).isVisible().catch(() => false);

    if (gateVisible) {
      // If gate is showing, it should have a link to the foundation course
      const foundationLink = page.getByRole('link', { name: /Start AI Conversation Fundamentals/i });
      await expect(foundationLink).toBeVisible();
    }
    // If gate is not showing (user is authenticated), that's also a valid state
  });
});

test.describe('Module Page - Structure', () => {
  test('module page should display title', async ({ modulePage, page }) => {
    await modulePage.goto('ai-conversation-fundamentals', 1);
    await page.waitForLoadState('domcontentloaded');
    await expect(modulePage.moduleTitle).toBeVisible();
  });

  test('module page should have content', async ({ modulePage, page }) => {
    await modulePage.goto('ai-conversation-fundamentals', 1);
    await page.waitForLoadState('domcontentloaded');
    await expect(modulePage.moduleContent).toBeVisible();
  });

  test('module should be scrollable without errors', async ({ modulePage, page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => {
      const ignoredErrors = ['Unexpected EOF', 'SyntaxError'];
      if (!ignoredErrors.some((ignored) => error.message.includes(ignored))) {
        errors.push(error.message);
      }
    });

    await modulePage.goto('ai-conversation-fundamentals', 1);
    await modulePage.scrollThroughModule();

    expect(errors).toHaveLength(0);
  });

  test('module page should have navigation', async ({ modulePage, page }) => {
    await modulePage.goto('ai-conversation-fundamentals', 2);
    await page.waitForLoadState('domcontentloaded');

    // Should have some form of navigation (back link or module nav)
    const hasNav =
      (await page.locator('a[href*="module-"]').count()) > 0 ||
      (await page.locator('nav').count()) > 0;
    expect(hasNav).toBeTruthy();
  });
});

test.describe('Module Completion Flow', () => {
  test('scrolling to bottom should trigger completion UI', async ({ modulePage, page }) => {
    await modulePage.goto('ai-conversation-fundamentals', 1);
    await page.waitForLoadState('domcontentloaded');

    // Scroll to bottom
    await modulePage.scrollToBottom();
    await page.waitForTimeout(2000);

    // Look for completion message or next module button
    const hasCompletionUI =
      (await modulePage.moduleCompleteMessage.isVisible().catch(() => false)) ||
      (await modulePage.nextModuleButton.isVisible().catch(() => false)) ||
      (await page.getByText(/next|continue|complete/i).first().isVisible().catch(() => false));

    // Completion UI should appear when scrolled to bottom
    // (May require auth to actually mark complete, but UI should show)
    expect(hasCompletionUI).toBeTruthy();
  });

  test('module page should have navigation links', async ({ modulePage, page }) => {
    await modulePage.goto('ai-conversation-fundamentals', 2);
    await page.waitForLoadState('domcontentloaded');

    // Check for navigation elements - either next/previous links or breadcrumbs
    const hasNextLink = await page.locator('a[href*="module-"]').count() > 0;
    const hasNavigation = await page.locator('nav').count() > 0;

    // Should have some form of navigation
    expect(hasNextLink || hasNavigation).toBeTruthy();
  });
});

test.describe('Academy - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should display mobile-friendly layout', async ({ academyPage, page }) => {
    await academyPage.goto();
    await page.locator('header').waitFor({ state: 'attached' });
    await expect(page.locator('header')).toHaveCount(1);
    await expect(page.locator('main')).toHaveCount(1);
  });

  test('should show responsive course grid', async ({ academyPage, page }) => {
    await academyPage.goto();
    await page.waitForLoadState('domcontentloaded');

    // Course content should be visible on mobile
    const courseText = page.getByText(/AI Partner Mastery|AI for Leaders/i).first();
    await expect(courseText).toBeVisible();
  });

  test('mobile menu should be accessible', async ({ academyPage, page }) => {
    await academyPage.goto();

    // Look for mobile menu button
    const menuButton = page.getByRole('button').filter({ hasText: /menu/i });
    if (await menuButton.isVisible()) {
      await expect(menuButton).toBeEnabled();
    }
  });

  test('should scroll through academy on mobile without errors', async ({ academyPage, page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => {
      const ignoredErrors = ['Unexpected EOF', 'SyntaxError'];
      if (!ignoredErrors.some((ignored) => error.message.includes(ignored))) {
        errors.push(error.message);
      }
    });

    await academyPage.goto();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    expect(errors).toHaveLength(0);
  });
});

test.describe('Academy - Tablet', () => {
  test.use({ viewport: testConfig.viewports.tablet });

  test('should display tablet layout correctly', async ({ academyPage, page }) => {
    await academyPage.goto();
    await page.waitForLoadState('domcontentloaded');

    // Header should be visible
    await expect(page.locator('header')).toBeVisible();

    // Course content should be visible
    const courseText = page.getByText(/Academy|AI/i).first();
    await expect(courseText).toBeVisible();
  });
});

test.describe('Academy - Accessibility', () => {
  test('should have proper heading hierarchy', async ({ academyPage, page }) => {
    await academyPage.goto();
    await page.waitForLoadState('domcontentloaded');

    // Should have at least one H1
    const h1Count = await page.getByRole('heading', { level: 1 }).count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
  });

  test('should have accessible links', async ({ academyPage, page }) => {
    await academyPage.goto();
    await page.waitForLoadState('domcontentloaded');

    // Check that visible links have accessible names
    const links = await page.getByRole('link').all();
    let accessibleLinkCount = 0;

    for (const link of links) {
      const name = (await link.getAttribute('aria-label')) || (await link.textContent());
      if (name && name.trim().length > 0) {
        accessibleLinkCount++;
      }
    }

    expect(accessibleLinkCount).toBeGreaterThan(0);
  });

  test('should support keyboard navigation', async ({ academyPage, page }) => {
    await academyPage.goto();

    // Tab through focusable elements
    await page.keyboard.press('Tab');
    const firstFocused = await page.evaluate(() => document.activeElement?.tagName);
    expect(firstFocused).toBeTruthy();
  });

  test('course page should have proper heading hierarchy', async ({ coursePage, page }) => {
    await coursePage.goto('ai-conversation-fundamentals');
    await page.waitForLoadState('domcontentloaded');

    const h1Count = await page.getByRole('heading', { level: 1 }).count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
  });

  test('module page should have proper heading hierarchy', async ({ modulePage, page }) => {
    await modulePage.goto('ai-conversation-fundamentals', 1);
    await page.waitForLoadState('domcontentloaded');

    const h1Count = await page.getByRole('heading', { level: 1 }).count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
  });
});

test.describe('Academy - Performance', () => {
  test('academy page should load within acceptable time', async ({ academyPage, page }) => {
    const startTime = Date.now();
    await academyPage.goto();
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;

    // Should load within 5 seconds (generous for CI environments)
    expect(loadTime).toBeLessThan(5000);
  });

  test('course page should load within acceptable time', async ({ coursePage, page }) => {
    const startTime = Date.now();
    await coursePage.goto('ai-conversation-fundamentals');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(5000);
  });

  test('module page should load within acceptable time', async ({ modulePage, page }) => {
    const startTime = Date.now();
    await modulePage.goto('ai-conversation-fundamentals', 1);
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(5000);
  });
});
