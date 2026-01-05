import { test as base, expect } from '@playwright/test';
import { AcademyPage, CoursePage, ModulePage } from '../pages';
import { academyCourses, TOTAL_MODULES } from '../utils/test-config';

/**
 * Extended test fixtures for Academy testing
 */
type AcademyFixtures = {
  academyPage: AcademyPage;
  coursePage: CoursePage;
  modulePage: ModulePage;
};

/**
 * Custom test fixture that provides academy page objects
 */
export const test = base.extend<AcademyFixtures>({
  academyPage: async ({ page }, use) => {
    const academyPage = new AcademyPage(page);
    await use(academyPage);
  },

  coursePage: async ({ page }, use) => {
    const coursePage = new CoursePage(page);
    await use(coursePage);
  },

  modulePage: async ({ page }, use) => {
    const modulePage = new ModulePage(page);
    await use(modulePage);
  },
});

export { expect };

/**
 * Academy test data
 */
export const academyTestData = {
  courses: academyCourses,
  totalModules: TOTAL_MODULES,

  /**
   * Foundation course details
   */
  foundation: {
    slug: 'ai-conversation-fundamentals',
    title: 'AI Conversation Fundamentals',
    path: '/courses/ai-conversation-fundamentals',
    modules: 6,
    estimatedTime: '45 min',
  },

  /**
   * Locked courses (require foundation completion)
   */
  lockedCourses: [
    'ai-partner-mastery',
    'prompt-engineering-creators',
    'claude-for-knowledge-workers',
    'ai-for-leaders',
    'ai-at-scale',
    'private-ai',
  ],

  /**
   * Course progression order
   */
  courseOrder: [
    'ai-conversation-fundamentals',
    'ai-partner-mastery',
    'prompt-engineering-creators',
    'claude-for-knowledge-workers',
    'ai-for-leaders',
    'ai-at-scale',
    'private-ai',
  ],

  /**
   * Test user credentials (for authenticated tests)
   * These should be test accounts with known state
   */
  testUsers: {
    newUser: {
      email: 'test-new@id8labs.test',
      hasProgress: false,
    },
    partialProgress: {
      email: 'test-partial@id8labs.test',
      hasProgress: true,
      completedModules: 3,
    },
    foundationComplete: {
      email: 'test-foundation@id8labs.test',
      hasProgress: true,
      foundationComplete: true,
    },
  },
};

/**
 * Helper to verify common page structure
 */
export async function verifyPageLoads(page: AcademyPage | CoursePage | ModulePage) {
  await page.verifyPageStructure();
}

/**
 * Helper to scroll to completion (for module tests)
 */
export async function completeModule(modulePage: ModulePage) {
  await modulePage.scrollThroughModule();
  await modulePage.page.waitForTimeout(3500); // Wait for completion animation
}
