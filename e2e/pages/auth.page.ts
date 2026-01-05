import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page object for Sign In page (/sign-in)
 */
export class SignInPage extends BasePage {
  // Form elements
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly googleButton: Locator;

  // Auth method toggle
  readonly magicLinkTab: Locator;
  readonly passwordTab: Locator;

  // Messages
  readonly errorMessage: Locator;
  readonly magicLinkSentMessage: Locator;

  // Navigation links
  readonly signUpLink: Locator;

  constructor(page: Page) {
    super(page);

    // Form elements
    this.emailInput = page.locator('input[type="email"]').first();
    this.passwordInput = page.locator('input[type="password"]');
    this.submitButton = page.getByRole('button', { name: /Sign in|Send Magic Link/i });
    this.googleButton = page.getByRole('button', { name: /Continue with Google/i });

    // Auth method toggle - use exact match to avoid conflict with "Send Magic Link" button
    this.magicLinkTab = page.getByRole('button', { name: 'Magic Link', exact: true });
    this.passwordTab = page.getByRole('button', { name: 'Password', exact: true });

    // Messages
    this.errorMessage = page.locator('.text-red-600, .text-red-400');
    this.magicLinkSentMessage = page.getByText(/Check your email/i);

    // Navigation
    this.signUpLink = page.getByRole('link', { name: /Sign up/i });
  }

  async goto(redirect?: string) {
    const path = redirect ? `/sign-in?redirect=${encodeURIComponent(redirect)}` : '/sign-in';
    await super.goto(path);
  }

  async selectMagicLinkAuth() {
    await this.magicLinkTab.click();
  }

  async selectPasswordAuth() {
    await this.passwordTab.click();
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async signInWithPassword(email: string, password: string) {
    await this.selectPasswordAuth();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submitForm();
  }

  async requestMagicLink(email: string) {
    await this.selectMagicLinkAuth();
    await this.fillEmail(email);
    await this.submitForm();
  }

  async verifyMagicLinkSent() {
    await expect(this.magicLinkSentMessage).toBeVisible();
  }

  async verifyErrorMessage(message?: string) {
    await expect(this.errorMessage).toBeVisible();
    if (message) {
      await expect(this.errorMessage).toContainText(message);
    }
  }

  async navigateToSignUp() {
    await this.signUpLink.click();
    await this.waitForPageLoad();
  }
}

/**
 * Page object for Sign Up page (/sign-up)
 */
export class SignUpPage extends BasePage {
  // Form elements
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly googleButton: Locator;

  // Messages
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  // Navigation links
  readonly signInLink: Locator;

  // Page title
  readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);

    // Form elements
    this.emailInput = page.locator('input[type="email"]');
    this.submitButton = page.getByRole('button', { name: /Send Magic Link/i });
    this.googleButton = page.getByRole('button', { name: /Continue with Google/i });

    // Messages
    this.errorMessage = page.locator('.text-red-600, .text-red-400');
    this.successMessage = page.getByText(/Check your email/i);

    // Navigation
    this.signInLink = page.getByRole('link', { name: /Sign in/i });

    // Title
    this.pageTitle = page.getByRole('heading', { name: /Create your account/i });
  }

  async goto(redirect?: string) {
    const path = redirect ? `/sign-up?redirect=${encodeURIComponent(redirect)}` : '/sign-up';
    await super.goto(path);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async signUpWithEmail(email: string) {
    await this.fillEmail(email);
    await this.submitForm();
  }

  async verifySuccessMessage() {
    await expect(this.successMessage).toBeVisible();
  }

  async verifyErrorMessage(message?: string) {
    await expect(this.errorMessage).toBeVisible();
    if (message) {
      await expect(this.errorMessage).toContainText(message);
    }
  }

  async navigateToSignIn() {
    await this.signInLink.click();
    await this.waitForPageLoad();
  }
}
