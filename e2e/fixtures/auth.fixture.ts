import { test as base, expect } from '@playwright/test';
import { SignInPage, SignUpPage } from '../pages';

/**
 * Extended test fixtures for Auth testing
 */
type AuthFixtures = {
  signInPage: SignInPage;
  signUpPage: SignUpPage;
};

/**
 * Custom test fixture that provides auth page objects
 */
export const test = base.extend<AuthFixtures>({
  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);
    await use(signInPage);
  },

  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);
    await use(signUpPage);
  },
});

export { expect };

/**
 * Auth test data
 */
export const authTestData = {
  // Test email addresses (won't actually send)
  testEmails: {
    valid: 'test@example.com',
    invalid: 'not-an-email',
    newUser: 'newuser@test.com',
  },

  // Common redirect paths for testing
  redirectPaths: {
    course: '/courses/claude-for-knowledge-workers',
    module: '/courses/claude-for-knowledge-workers/module-1',
    academy: '/academy',
    dashboard: '/dashboard',
  },

  // Error messages to verify
  errorMessages: {
    invalidEmail: 'Invalid email',
    userNotFound: 'Invalid login credentials',
    invalidCredentials: 'Invalid login credentials',
  },
};
