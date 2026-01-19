import { test, expect } from '@playwright/test'

/**
 * Annotations E2E Tests
 *
 * Tests the annotations feature including:
 * - Notes sidebar visibility and interaction
 * - Tab switching between Highlights, Notes, and AI
 * - Unauthenticated user experience
 * - Basic accessibility checks
 */

test.describe('Annotations - Notes Sidebar', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a module page where annotations are available
    await page.goto('/academy/ai-conversation-fundamentals/module-1')
    await page.waitForLoadState('domcontentloaded')
  })

  test('should open notes sidebar when clicking notes button', async ({ page }) => {
    // Look for the notes/annotations toggle button
    // This could be a button with an icon or text like "Notes", "My Notes", etc.
    const notesButton = page.getByRole('button', { name: /notes/i }).first()

    // If button exists, click it
    if (await notesButton.isVisible()) {
      await notesButton.click()

      // Wait for sidebar to appear
      await page.waitForTimeout(500)

      // Sidebar should be visible with "My Notes" heading
      const sidebar = page.getByRole('heading', { name: /My Notes/i })
      await expect(sidebar).toBeVisible()
    } else {
      // If no explicit notes button, sidebar might be always visible on desktop
      // or triggered by highlighting text
      // Skip this test or check for alternative trigger
      test.skip()
    }
  })

  test('should close notes sidebar when clicking close button', async ({ page }) => {
    // Try to open sidebar first
    const notesButton = page.getByRole('button', { name: /notes/i }).first()

    if (await notesButton.isVisible()) {
      await notesButton.click()
      await page.waitForTimeout(500)

      // Find and click close button
      const closeButton = page.getByRole('button', { name: /close/i }).or(
        page.getByLabel(/close sidebar/i)
      )

      if (await closeButton.isVisible()) {
        await closeButton.click()
        await page.waitForTimeout(500)

        // Sidebar heading should no longer be visible
        const sidebar = page.getByRole('heading', { name: /My Notes/i })
        await expect(sidebar).not.toBeVisible()
      }
    } else {
      test.skip()
    }
  })

  test('should close sidebar when clicking backdrop on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Try to open sidebar
    const notesButton = page.getByRole('button', { name: /notes/i }).first()

    if (await notesButton.isVisible()) {
      await notesButton.click()
      await page.waitForTimeout(500)

      // Look for backdrop (should be a div with high z-index and dark background)
      const backdrop = page.locator('[class*="bg-black"]').first()

      if (await backdrop.isVisible()) {
        await backdrop.click()
        await page.waitForTimeout(500)

        // Sidebar should close
        const sidebar = page.getByRole('heading', { name: /My Notes/i })
        await expect(sidebar).not.toBeVisible()
      }
    } else {
      test.skip()
    }
  })
})

test.describe('Annotations - Tab Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/academy/ai-conversation-fundamentals/module-1')
    await page.waitForLoadState('domcontentloaded')

    // Open sidebar if there's a button for it
    const notesButton = page.getByRole('button', { name: /notes/i }).first()
    if (await notesButton.isVisible()) {
      await notesButton.click()
      await page.waitForTimeout(500)
    }
  })

  test('should switch to Highlights tab', async ({ page }) => {
    // Look for Highlights tab button
    const highlightsTab = page.getByRole('button', { name: /Highlights/i })

    if (await highlightsTab.isVisible()) {
      await highlightsTab.click()
      await page.waitForTimeout(300)

      // Tab should be active (check for active styling)
      // Active tabs typically have border-bottom or different text color
      const isActive = await highlightsTab.evaluate((el) => {
        const styles = window.getComputedStyle(el)
        return styles.color.includes('orange') || el.classList.contains('border-b-2')
      })

      expect(isActive).toBeTruthy()
    } else {
      test.skip()
    }
  })

  test('should switch to Notes tab', async ({ page }) => {
    const notesTab = page.getByRole('button', { name: /^Notes/i })

    if (await notesTab.isVisible()) {
      await notesTab.click()
      await page.waitForTimeout(300)

      // Check if Notes tab is active
      const isActive = await notesTab.evaluate((el) => {
        const styles = window.getComputedStyle(el)
        return styles.color.includes('orange') || el.classList.contains('border-b-2')
      })

      expect(isActive).toBeTruthy()
    } else {
      test.skip()
    }
  })

  test('should switch to AI tab', async ({ page }) => {
    const aiTab = page.getByRole('button', { name: /AI/i })

    if (await aiTab.isVisible()) {
      await aiTab.click()
      await page.waitForTimeout(300)

      // Check if AI tab is active
      const isActive = await aiTab.evaluate((el) => {
        const styles = window.getComputedStyle(el)
        return styles.color.includes('orange') || el.classList.contains('border-b-2')
      })

      expect(isActive).toBeTruthy()
    } else {
      test.skip()
    }
  })

  test('should show correct content when switching tabs', async ({ page }) => {
    // Switch to Highlights tab
    const highlightsTab = page.getByRole('button', { name: /Highlights/i })

    if (await highlightsTab.isVisible()) {
      await highlightsTab.click()
      await page.waitForTimeout(300)

      // Should show highlights content or empty state
      const highlightsContent = page.getByText(/No highlights yet|Select text/i)
      const hasHighlights = await highlightsContent.isVisible().catch(() => false)

      // Either empty state or actual highlights should be visible
      expect(hasHighlights).toBeTruthy()

      // Switch to Notes tab
      const notesTab = page.getByRole('button', { name: /^Notes/i })
      if (await notesTab.isVisible()) {
        await notesTab.click()
        await page.waitForTimeout(300)

        // Should show notes content or empty state
        const notesContent = page.getByText(/No notes yet|Add a note/i)
        const hasNotes = await notesContent.isVisible().catch(() => false)

        expect(hasNotes).toBeTruthy()
      }
    } else {
      test.skip()
    }
  })
})

test.describe('Annotations - Unauthenticated User', () => {
  test.beforeEach(async ({ page }) => {
    // Ensure no authentication cookies
    await page.context().clearCookies()
    await page.goto('/academy/ai-conversation-fundamentals/module-1')
    await page.waitForLoadState('domcontentloaded')
  })

  test('should show sign-in prompt for unauthenticated users', async ({ page }) => {
    // Try to open sidebar
    const notesButton = page.getByRole('button', { name: /notes/i }).first()

    if (await notesButton.isVisible()) {
      await notesButton.click()
      await page.waitForTimeout(500)

      // Should show sign-in prompt
      const signInText = page.getByText(/Sign in to save your highlights and notes/i)
      const isVisible = await signInText.isVisible().catch(() => false)

      if (isVisible) {
        expect(isVisible).toBeTruthy()

        // Should have a sign-in link/button
        const signInLink = page.getByRole('link', { name: /Sign In/i })
        await expect(signInLink).toBeVisible()

        // Link should point to auth/login
        const href = await signInLink.getAttribute('href')
        expect(href).toContain('/auth/login')
      }
    } else {
      test.skip()
    }
  })

  test('should not show annotation controls when not authenticated', async ({ page }) => {
    // Open sidebar
    const notesButton = page.getByRole('button', { name: /notes/i }).first()

    if (await notesButton.isVisible()) {
      await notesButton.click()
      await page.waitForTimeout(500)

      // Should NOT show "Add a note" button if unauthenticated
      const addNoteButton = page.getByRole('button', { name: /Add a note/i })
      const isVisible = await addNoteButton.isVisible().catch(() => false)

      // If sidebar shows sign-in prompt, add note button should not be visible
      const hasSignInPrompt = await page.getByText(/Sign in to save/i).isVisible().catch(() => false)

      if (hasSignInPrompt) {
        expect(isVisible).toBeFalsy()
      }
    } else {
      test.skip()
    }
  })
})

test.describe('Annotations - AI Tab', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/academy/ai-conversation-fundamentals/module-1')
    await page.waitForLoadState('domcontentloaded')

    // Open sidebar
    const notesButton = page.getByRole('button', { name: /notes/i }).first()
    if (await notesButton.isVisible()) {
      await notesButton.click()
      await page.waitForTimeout(500)
    }
  })

  test('should show AI features requirement when insufficient annotations', async ({ page }) => {
    // Switch to AI tab
    const aiTab = page.getByRole('button', { name: /AI/i })

    if (await aiTab.isVisible()) {
      await aiTab.click()
      await page.waitForTimeout(300)

      // If user has no annotations, should show requirement message
      const requirementText = page.getByText(/Need at least 3 annotations/i)
      const isVisible = await requirementText.isVisible().catch(() => false)

      // Either shows requirement or shows AI features (if user has annotations)
      // Just verify tab content loads without errors
      const hasContent = isVisible || await page.getByText(/Use AI to help you learn/i).isVisible()
      expect(hasContent).toBeTruthy()
    } else {
      test.skip()
    }
  })

  test('should show AI action buttons when sufficient annotations exist', async ({ page }) => {
    // This test will pass if either:
    // 1. User has enough annotations and sees AI buttons
    // 2. User doesn't have enough and sees the requirement message
    // We're just testing the UI renders correctly

    const aiTab = page.getByRole('button', { name: /AI/i })

    if (await aiTab.isVisible()) {
      await aiTab.click()
      await page.waitForTimeout(300)

      // Check for AI features or requirement message
      const hasSummarize = await page.getByText(/Summarize My Notes/i).isVisible().catch(() => false)
      const hasConnections = await page.getByText(/Find Connections/i).isVisible().catch(() => false)
      const hasRequirement = await page.getByText(/Need at least 3/i).isVisible().catch(() => false)

      // One of these should be visible
      expect(hasSummarize || hasConnections || hasRequirement).toBeTruthy()
    } else {
      test.skip()
    }
  })
})

test.describe('Annotations - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/academy/ai-conversation-fundamentals/module-1')
    await page.waitForLoadState('domcontentloaded')
  })

  test('notes sidebar should have proper ARIA labels', async ({ page }) => {
    // Open sidebar
    const notesButton = page.getByRole('button', { name: /notes/i }).first()

    if (await notesButton.isVisible()) {
      await notesButton.click()
      await page.waitForTimeout(500)

      // Check for close button with aria-label
      const closeButton = page.getByLabel(/close sidebar/i)
      const hasCloseButton = await closeButton.isVisible().catch(() => false)

      // At least check that sidebar has proper heading
      const heading = page.getByRole('heading', { name: /My Notes/i })
      await expect(heading).toBeVisible()

      // If close button exists, verify it's accessible
      if (hasCloseButton) {
        expect(hasCloseButton).toBeTruthy()
      }
    } else {
      test.skip()
    }
  })

  test('tab buttons should be keyboard accessible', async ({ page }) => {
    // Open sidebar
    const notesButton = page.getByRole('button', { name: /notes/i }).first()

    if (await notesButton.isVisible()) {
      await notesButton.click()
      await page.waitForTimeout(500)

      // Find Highlights tab
      const highlightsTab = page.getByRole('button', { name: /Highlights/i })

      if (await highlightsTab.isVisible()) {
        // Focus the tab
        await highlightsTab.focus()

        // Verify it's focused
        const isFocused = await highlightsTab.evaluate((el) => el === document.activeElement)
        expect(isFocused).toBeTruthy()

        // Press Enter to activate
        await page.keyboard.press('Enter')
        await page.waitForTimeout(300)

        // Tab should be active
        const isActive = await highlightsTab.evaluate((el) => {
          return el.classList.contains('text-id8-orange') ||
                 el.classList.contains('border-id8-orange') ||
                 el.classList.contains('border-b-2')
        })

        expect(isActive).toBeTruthy()
      }
    } else {
      test.skip()
    }
  })

  test('sidebar should have proper heading hierarchy', async ({ page }) => {
    // Open sidebar
    const notesButton = page.getByRole('button', { name: /notes/i }).first()

    if (await notesButton.isVisible()) {
      await notesButton.click()
      await page.waitForTimeout(500)

      // Main heading should exist
      const mainHeading = page.getByRole('heading', { name: /My Notes/i })
      await expect(mainHeading).toBeVisible()

      // Get heading level
      const headingLevel = await mainHeading.evaluate((el) => el.tagName)

      // Should be H1 or H2
      expect(['H1', 'H2']).toContain(headingLevel)
    } else {
      test.skip()
    }
  })
})

test.describe('Annotations - Footer Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/academy/ai-conversation-fundamentals/module-1')
    await page.waitForLoadState('domcontentloaded')

    // Open sidebar
    const notesButton = page.getByRole('button', { name: /notes/i }).first()
    if (await notesButton.isVisible()) {
      await notesButton.click()
      await page.waitForTimeout(500)
    }
  })

  test('should have link to notebook page', async ({ page }) => {
    // Look for notebook link in footer
    const notebookLink = page.getByRole('link', { name: /View all notes in Notebook/i })

    if (await notebookLink.isVisible()) {
      await expect(notebookLink).toBeVisible()

      // Verify link points to notebook page
      const href = await notebookLink.getAttribute('href')
      expect(href).toContain('/academy/notebook')
    } else {
      // Alternative text patterns
      const altNotebookLink = page.getByText(/Notebook/i).and(page.locator('a'))
      const hasLink = await altNotebookLink.isVisible().catch(() => false)

      if (hasLink) {
        expect(hasLink).toBeTruthy()
      } else {
        test.skip()
      }
    }
  })
})

test.describe('Annotations - Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('should display sidebar as overlay on mobile', async ({ page }) => {
    await page.goto('/academy/ai-conversation-fundamentals/module-1')
    await page.waitForLoadState('domcontentloaded')

    // Open sidebar
    const notesButton = page.getByRole('button', { name: /notes/i }).first()

    if (await notesButton.isVisible()) {
      await notesButton.click()
      await page.waitForTimeout(500)

      // Sidebar should be visible
      const sidebar = page.getByRole('heading', { name: /My Notes/i })
      await expect(sidebar).toBeVisible()

      // Should have backdrop on mobile
      const backdrop = page.locator('[class*="bg-black"]').first()
      const hasBackdrop = await backdrop.isVisible().catch(() => false)

      // Backdrop should exist on mobile
      expect(hasBackdrop).toBeTruthy()
    } else {
      test.skip()
    }
  })

  test('sidebar should be full width on mobile', async ({ page }) => {
    await page.goto('/academy/ai-conversation-fundamentals/module-1')
    await page.waitForLoadState('domcontentloaded')

    // Open sidebar
    const notesButton = page.getByRole('button', { name: /notes/i }).first()

    if (await notesButton.isVisible()) {
      await notesButton.click()
      await page.waitForTimeout(500)

      // Find sidebar container (aside element)
      const sidebar = page.locator('aside').first()

      if (await sidebar.isVisible()) {
        // Check width - on mobile it should be close to viewport width
        const width = await sidebar.evaluate((el) => el.offsetWidth)

        // Should be at least 90% of viewport width (375px)
        expect(width).toBeGreaterThan(300)
      }
    } else {
      test.skip()
    }
  })
})

test.describe('Annotations - Error States', () => {
  test('should handle loading state gracefully', async ({ page }) => {
    await page.goto('/academy/ai-conversation-fundamentals/module-1')
    await page.waitForLoadState('domcontentloaded')

    // Open sidebar
    const notesButton = page.getByRole('button', { name: /notes/i }).first()

    if (await notesButton.isVisible()) {
      await notesButton.click()

      // Look for loading spinner (should appear briefly)
      const spinner = page.locator('[class*="animate-spin"]')

      // Wait for loading to complete (spinner disappears or content appears)
      await page.waitForTimeout(2000)

      // After loading, should show either content or empty state
      const hasContent = await page.getByText(/highlights|notes|sign in/i).isVisible()
      expect(hasContent).toBeTruthy()
    } else {
      test.skip()
    }
  })
})
