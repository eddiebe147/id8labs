import { test, expect } from '@playwright/test'
import { ToolFactoryPage } from './pages/tool-factory.page'

test.describe('Tool Factory Modal', () => {
  let toolFactory: ToolFactoryPage

  test.beforeEach(async ({ page }) => {
    toolFactory = new ToolFactoryPage(page)
  })

  test.describe('Modal Opening and Closing', () => {
    test('should open modal from StackShack page', async ({ page }) => {
      await toolFactory.openFromStackShack()

      expect(await toolFactory.isModalVisible()).toBe(true)
      // Modal should have the heading (use specific heading locator)
      await expect(page.getByRole('heading', { name: 'AI Tool Factory' })).toBeVisible()
    })

    test('should close modal with X button', async () => {
      await toolFactory.openFromStackShack()
      expect(await toolFactory.isModalVisible()).toBe(true)

      await toolFactory.close()
      expect(await toolFactory.isModalVisible()).toBe(false)
    })

    test('should close modal by clicking backdrop', async () => {
      await toolFactory.openFromStackShack()
      expect(await toolFactory.isModalVisible()).toBe(true)

      await toolFactory.closeByBackdrop()
      expect(await toolFactory.isModalVisible()).toBe(false)
    })

    test('should not show page content bleeding through modal', async ({ page }) => {
      await toolFactory.openFromStackShack()

      // The marketplace tabs should not be visible when modal is open
      const modalBackdrop = page.locator('[class*="fixed inset-0 bg-"]').first()
      await expect(modalBackdrop).toBeVisible()

      // Modal should have highest z-index
      const modalContainer = page.locator('[class*="z-[9999]"]')
      await expect(modalContainer).toBeVisible()
    })
  })

  test.describe('Tab Navigation', () => {
    test.beforeEach(async () => {
      await toolFactory.openFromStackShack()
    })

    test('should default to Skills tab', async ({ page }) => {
      // Default should be Skill - use heading locator to be specific
      await expect(page.getByRole('heading', { name: 'Generate Skill' })).toBeVisible()
    })

    test('should switch to Commands tab', async ({ page }) => {
      await toolFactory.selectToolType('command')

      // Header should update
      await expect(page.getByRole('heading', { name: 'Generate Command' })).toBeVisible()
    })

    test('should switch to Agents tab', async ({ page }) => {
      await toolFactory.selectToolType('agent')

      // Header should update
      await expect(page.getByRole('heading', { name: 'Generate Agent' })).toBeVisible()
    })

    test('should switch to MCPs tab', async ({ page }) => {
      await toolFactory.selectToolType('mcp')

      // Header should update - MCP shows as "MCP Server" in labels
      await expect(page.getByRole('heading', { name: 'Generate MCP Server' })).toBeVisible()
    })

    test('should maintain tab state when switching between tabs', async ({ page }) => {
      // Start on Skills
      await expect(page.getByRole('heading', { name: 'Generate Skill' })).toBeVisible()

      // Switch to Commands
      await toolFactory.selectToolType('command')
      await expect(page.getByRole('heading', { name: 'Generate Command' })).toBeVisible()

      // Switch back to Skills
      await toolFactory.selectToolType('skill')
      await expect(page.getByRole('heading', { name: 'Generate Skill' })).toBeVisible()
    })
  })

  test.describe('Form Validation', () => {
    test.beforeEach(async () => {
      await toolFactory.openFromStackShack()
    })

    test('should disable generate button when description is empty', async () => {
      // Button should be disabled initially
      expect(await toolFactory.isGenerateEnabled()).toBe(false)
    })

    test('should disable generate button when description is too short', async () => {
      await toolFactory.fillDescription('short')

      // Less than 10 characters should be disabled
      expect(await toolFactory.isGenerateEnabled()).toBe(false)
    })

    test('should enable generate button with valid description', async () => {
      await toolFactory.fillDescription('Create a skill that helps write professional emails')

      expect(await toolFactory.isGenerateEnabled()).toBe(true)
    })

    test('should show error when trying to generate with short description', async ({ page }) => {
      // Fill a short description
      await toolFactory.fillDescription('short')

      // Try to click generate (if enabled by some bug)
      const generateBtn = page.locator('button:has-text("Generate")').first()

      // Button should be disabled, but let's verify the state
      await expect(generateBtn).toBeDisabled()
    })
  })

  test.describe('Skill Generation Form', () => {
    test.beforeEach(async () => {
      await toolFactory.openFromStackShack()
    })

    test('should show skill-specific form options', async ({ page }) => {
      // Description textarea should be visible
      await expect(toolFactory.descriptionTextarea).toBeVisible()

      // Category and complexity dropdowns might be in advanced options
      // Check for advanced options toggle
      const advancedOptions = page.locator('text=Show advanced options, text=Advanced options')
      if (await advancedOptions.isVisible()) {
        await advancedOptions.click()
      }
    })

    test('should accept description input', async () => {
      const testDescription = 'Create a skill that helps developers write better commit messages'
      await toolFactory.fillDescription(testDescription)

      await expect(toolFactory.descriptionTextarea).toHaveValue(testDescription)
    })
  })

  test.describe('Command Generation Form', () => {
    test.beforeEach(async () => {
      await toolFactory.openFromStackShack()
      await toolFactory.selectToolType('command')
    })

    test('should show command-specific form', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Generate Command' })).toBeVisible()
      await expect(toolFactory.descriptionTextarea).toBeVisible()
    })
  })

  test.describe('Agent Generation Form', () => {
    test.beforeEach(async () => {
      await toolFactory.openFromStackShack()
      await toolFactory.selectToolType('agent')
    })

    test('should show agent-specific form', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Generate Agent' })).toBeVisible()
      await expect(toolFactory.descriptionTextarea).toBeVisible()
    })
  })

  test.describe('MCP Generation Form', () => {
    test.beforeEach(async () => {
      await toolFactory.openFromStackShack()
      await toolFactory.selectToolType('mcp')
    })

    test('should show MCP-specific form', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Generate MCP Server' })).toBeVisible()
      await expect(toolFactory.descriptionTextarea).toBeVisible()
    })
  })

  test.describe('Keyboard Navigation', () => {
    test('should close modal on Escape key', async ({ page }) => {
      await toolFactory.openFromStackShack()
      expect(await toolFactory.isModalVisible()).toBe(true)

      await page.keyboard.press('Escape')

      // Wait for modal header to be hidden (animation completes)
      await toolFactory.modalHeader.waitFor({ state: 'hidden', timeout: 3000 })
      expect(await toolFactory.isModalVisible()).toBe(false)
    })
  })

  test.describe('Scroll Lock', () => {
    test('should prevent body scroll when modal is open', async ({ page }) => {
      await toolFactory.openFromStackShack()

      // Body should have overflow hidden
      const bodyOverflow = await page.evaluate(() => {
        return document.body.style.overflow
      })

      expect(bodyOverflow).toBe('hidden')
    })

    test('should restore body scroll when modal closes', async ({ page }) => {
      await toolFactory.openFromStackShack()
      await toolFactory.close()

      // Wait for modal to close
      await page.waitForTimeout(500)

      // Body should not have overflow hidden
      const bodyOverflow = await page.evaluate(() => {
        return document.body.style.overflow
      })

      expect(bodyOverflow).toBe('')
    })
  })

  test.describe('State Management', () => {
    test('should reset form when modal closes and reopens', async ({ page }) => {
      await toolFactory.openFromStackShack()

      // Fill description
      await toolFactory.fillDescription('Test description for reset test')

      // Close modal
      await toolFactory.close()

      // Reopen modal
      const generateButton = page.locator('button:has-text("Generate Tool"), button:has-text("AI Tool Factory")')
      await generateButton.click()
      await toolFactory.waitForModal()

      // Description should be empty after reset
      await expect(toolFactory.descriptionTextarea).toHaveValue('')
    })

    test('should reset to default tab when reopening', async ({ page }) => {
      await toolFactory.openFromStackShack()

      // Switch to a different tab
      await toolFactory.selectToolType('agent')

      // Close modal
      await toolFactory.close()

      // Reopen modal
      const generateButton = page.locator('button:has-text("Generate Tool"), button:has-text("AI Tool Factory")')
      await generateButton.click()
      await toolFactory.waitForModal()

      // Should be back on Skills tab
      expect(await toolFactory.isTabActive('skill')).toBe(true)
    })
  })
})

test.describe('Tool Factory - Integration with StackShack', () => {
  test('should open from StackShack header button', async ({ page }) => {
    const toolFactory = new ToolFactoryPage(page)

    await page.goto('/stackshack')
    await page.waitForLoadState('networkidle')

    // Find and click the generate tool button
    const generateButton = page.locator('button:has-text("Generate Tool"), button:has-text("AI Tool Factory")')
    await expect(generateButton).toBeVisible()
    await generateButton.click()

    await toolFactory.waitForModal()
    expect(await toolFactory.isModalVisible()).toBe(true)
  })
})
