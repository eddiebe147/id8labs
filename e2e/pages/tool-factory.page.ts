import { Locator, Page } from '@playwright/test'
import { BasePage } from './base.page'

/**
 * Page object for the AI Tool Factory modal
 */
export class ToolFactoryPage extends BasePage {
  // Modal container
  readonly modal: Locator
  readonly modalBackdrop: Locator
  readonly closeButton: Locator
  readonly modalHeader: Locator

  // Open button on StackShack
  readonly openButton: Locator

  // Tab navigation
  readonly tabSkill: Locator
  readonly tabCommand: Locator
  readonly tabAgent: Locator
  readonly tabMCP: Locator
  readonly tabContainer: Locator

  // Common form elements
  readonly descriptionTextarea: Locator
  readonly generateButton: Locator
  readonly errorMessage: Locator

  // Generation state elements
  readonly generatingIndicator: Locator
  readonly generationCompleteIndicator: Locator
  readonly streamingPreview: Locator
  readonly copyButton: Locator
  readonly startOverButton: Locator
  readonly continueToPreviewButton: Locator

  constructor(page: Page) {
    super(page)

    // Open button - the main trigger on StackShack page
    this.openButton = page.getByRole('button', { name: /AI Tool Factory/i })

    // Modal structure - using text content that's always present
    this.modalHeader = page.getByRole('heading', { name: 'AI Tool Factory' })
    this.modal = page.locator('.fixed.inset-0').filter({ has: this.modalHeader })
    this.modalBackdrop = page.locator('[class*="fixed"][class*="inset-0"][class*="bg-"]').first()
    this.closeButton = page.getByRole('button', { name: 'Close' })

    // Tab container and tabs - find within the modal content area (not backdrop)
    // The modal content has a specific structure with a header containing "AI Tool Factory"
    const modalContent = page.locator('[class*="bg-"][class*="rounded-2xl"][class*="shadow"]')
    this.tabContainer = modalContent.locator('[class*="bg-"][class*="rounded-xl"]').first()
    // Tabs use icons plus optional labels - locate by their position in the tab bar
    this.tabSkill = this.tabContainer.getByRole('button').nth(0)
    this.tabCommand = this.tabContainer.getByRole('button').nth(1)
    this.tabAgent = this.tabContainer.getByRole('button').nth(2)
    this.tabMCP = this.tabContainer.getByRole('button').nth(3)

    // Common form elements - scoped to modal content to avoid matching StackShack search bar
    this.descriptionTextarea = modalContent.getByRole('textbox').first()
    this.generateButton = modalContent.getByRole('button', { name: /^Generate/ })
    this.errorMessage = page.locator('[class*="bg-red"]')

    // Generation state
    this.generatingIndicator = page.getByText(/Generating your/i)
    this.generationCompleteIndicator = page.getByText(/Generation complete/i)
    this.streamingPreview = page.locator('pre')
    this.copyButton = page.getByRole('button', { name: /Copy/i })
    this.startOverButton = page.getByRole('button', { name: /Start Over|Cancel/i })
    this.continueToPreviewButton = page.getByRole('button', {
      name: /Continue to Preview/i,
    })
  }

  /**
   * Open the Tool Factory modal from StackShack
   */
  async openFromStackShack() {
    await this.goto('/stackshack')
    await this.waitForPageLoad()
    await this.openButton.waitFor({ state: 'visible', timeout: 10000 })
    await this.openButton.click()
    await this.modalHeader.waitFor({ state: 'visible', timeout: 5000 })
  }

  /**
   * Wait for modal to be visible
   */
  async waitForModal() {
    await this.modalHeader.waitFor({ state: 'visible', timeout: 5000 })
  }

  /**
   * Close the modal
   */
  async close() {
    await this.closeButton.click()
    await this.modalHeader.waitFor({ state: 'hidden', timeout: 3000 })
  }

  /**
   * Close modal by clicking backdrop
   */
  async closeByBackdrop() {
    // Click on the backdrop area (fixed position background)
    await this.page.mouse.click(10, 10)
    await this.modalHeader.waitFor({ state: 'hidden', timeout: 3000 })
  }

  /**
   * Switch to a specific tool type tab
   */
  async selectToolType(type: 'skill' | 'command' | 'agent' | 'mcp') {
    const tabs = {
      skill: this.tabSkill,
      command: this.tabCommand,
      agent: this.tabAgent,
      mcp: this.tabMCP,
    }
    await tabs[type].click()
    // Wait for the header to update
    await this.page.waitForTimeout(200)
  }

  /**
   * Fill description field
   */
  async fillDescription(description: string) {
    await this.descriptionTextarea.fill(description)
  }

  /**
   * Click generate button
   */
  async clickGenerate() {
    await this.generateButton.click()
  }

  /**
   * Check if generate button is enabled
   */
  async isGenerateEnabled(): Promise<boolean> {
    return !(await this.generateButton.isDisabled())
  }

  /**
   * Wait for generation to start
   */
  async waitForGenerating() {
    await this.generatingIndicator.waitFor({ state: 'visible', timeout: 10000 })
  }

  /**
   * Wait for generation to complete
   */
  async waitForGenerationComplete(timeout = 60000) {
    await this.generationCompleteIndicator.waitFor({ state: 'visible', timeout })
  }

  /**
   * Get streamed content
   */
  async getStreamedContent(): Promise<string> {
    return (await this.streamingPreview.textContent()) || ''
  }

  /**
   * Copy generated content
   */
  async copyContent() {
    await this.copyButton.click()
    await this.page.getByText('Copied').waitFor({ state: 'visible', timeout: 2000 })
  }

  /**
   * Continue to preview after generation
   */
  async continueToPreview() {
    await this.continueToPreviewButton.click()
  }

  /**
   * Start over / reset form
   */
  async startOver() {
    await this.startOverButton.click()
  }

  /**
   * Check if modal is visible
   */
  async isModalVisible(): Promise<boolean> {
    return await this.modalHeader.isVisible()
  }

  /**
   * Check if error message is visible
   */
  async hasError(): Promise<boolean> {
    return await this.errorMessage.isVisible()
  }

  /**
   * Get error message text
   */
  async getErrorText(): Promise<string> {
    return (await this.errorMessage.textContent()) || ''
  }

  /**
   * Get the header text which indicates active tool type
   * Scoped to modal content area to avoid matching other page elements
   */
  async getHeaderText(): Promise<string> {
    const modalContent = this.page.locator('[class*="bg-"][class*="rounded-2xl"][class*="shadow"]')
    const header = modalContent.locator('h3').first()
    return (await header.textContent()) || ''
  }

  /**
   * Check if a specific tab is active based on the header text
   */
  async isTabActive(type: 'skill' | 'command' | 'agent' | 'mcp'): Promise<boolean> {
    const expectedLabels = {
      skill: 'Generate Skill',
      command: 'Generate Command',
      agent: 'Generate Agent',
      mcp: 'Generate MCP Server',
    }
    const header = await this.getHeaderText()
    return header.includes(expectedLabels[type])
  }
}
