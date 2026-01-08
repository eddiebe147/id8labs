import { test, expect } from '@playwright/test'

test.describe('Stack Builder - Flip Animation & Floating Panel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/skills')
    await page.waitForLoadState('networkidle')
  })

  test('should show floating stack builder after adding a skill', async ({ page }) => {
    // Stack builder should NOT be visible initially
    const stackBuilder = page.locator('div:has-text("Stack Builder")').first()
    await expect(stackBuilder).not.toBeVisible()

    // Click "Add to Stack" on first skill card
    const addButton = page.locator('button:has-text("Add to Stack")').first()
    await addButton.click()

    // Stack builder should appear in bottom-right
    await expect(stackBuilder).toBeVisible()
    await expect(stackBuilder).toHaveText(/Stack Builder/)
    await expect(stackBuilder).toHaveText(/1 item/)
  })

  test('should show flip animation when adding skill', async ({ page }) => {
    // Add first skill
    const firstCard = page.locator('article').first()
    const addButton = firstCard.locator('button:has-text("Add to Stack")')
    
    await addButton.click()
    
    // Wait for animation
    await page.waitForTimeout(800)
    
    // Button should change to "In Stack"
    await expect(addButton).toHaveText(/In Stack/)
  })

  test('should expand and collapse stack builder', async ({ page }) => {
    // Add a skill first
    await page.locator('button:has-text("Add to Stack")').first().click()
    
    // Wait for panel to appear
    await page.waitForTimeout(500)
    
    // Panel should be expanded by default
    const expandedContent = page.locator('text=Skills (1)')
    await expect(expandedContent).toBeVisible()
    
    // Click header to collapse
    const header = page.locator('button:has-text("Stack Builder")')
    await header.click()
    
    // Content should be hidden
    await expect(expandedContent).not.toBeVisible()
    
    // Click again to expand
    await header.click()
    await expect(expandedContent).toBeVisible()
  })

  test('should add multiple skills and group them', async ({ page }) => {
    // Add 3 skills
    const addButtons = page.locator('button:has-text("Add to Stack")')
    await addButtons.nth(0).click()
    await page.waitForTimeout(300)
    await addButtons.nth(1).click()
    await page.waitForTimeout(300)
    await addButtons.nth(2).click()
    
    // Stack should show 3 items
    await expect(page.locator('text=/3 items/')).toBeVisible()
    
    // Skills should be grouped
    await expect(page.locator('text=/Skills \\(\\d+\\)/')).toBeVisible()
  })

  test('should generate install command', async ({ page }) => {
    // Add a skill
    await page.locator('button:has-text("Add to Stack")').first().click()
    await page.waitForTimeout(500)
    
    // Generated command should be visible
    await expect(page.locator('text=Installation Command')).toBeVisible()
    
    // Should have bash script
    await expect(page.locator('code:has-text("#!/bin/bash")')).toBeVisible()
    await expect(page.locator('code:has-text("mkdir -p ~/.claude/skills")')).toBeVisible()
    
    // Should have Copy button
    const copyButton = page.locator('button:has-text("Copy")').last()
    await expect(copyButton).toBeVisible()
  })

  test('should copy command to clipboard', async ({ page }) => {
    // Add a skill
    await page.locator('button:has-text("Add to Stack")').first().click()
    await page.waitForTimeout(500)
    
    // Click copy button
    const copyButton = page.locator('button:has-text("Copy")').last()
    await copyButton.click()
    
    // Button should show "Copied!"
    await expect(page.locator('button:has-text("Copied!")')).toBeVisible()
    
    // Should change back after 2 seconds
    await page.waitForTimeout(2500)
    await expect(page.locator('button:has-text("Copy")')).toBeVisible()
  })

  test('should remove individual skill from stack', async ({ page }) => {
    // Add 2 skills
    await page.locator('button:has-text("Add to Stack")').nth(0).click()
    await page.waitForTimeout(300)
    await page.locator('button:has-text("Add to Stack")').nth(1).click()
    await page.waitForTimeout(500)
    
    // Should have 2 items
    await expect(page.locator('text=/2 items/')).toBeVisible()
    
    // Hover over first item and click remove
    const firstItem = page.locator('[class*="space-y-2"]').first()
    await firstItem.hover()
    const removeButton = firstItem.locator('button[aria-label="Remove from stack"]').first()
    await removeButton.click()
    
    // Should now have 1 item
    await expect(page.locator('text=/1 item/')).toBeVisible()
  })

  test('should clear all skills from stack', async ({ page }) => {
    // Add 2 skills
    await page.locator('button:has-text("Add to Stack")').nth(0).click()
    await page.waitForTimeout(300)
    await page.locator('button:has-text("Add to Stack")').nth(1).click()
    await page.waitForTimeout(500)
    
    // Click clear all button (trash icon)
    const clearButton = page.locator('button[aria-label="Clear all"]')
    await clearButton.click()
    
    // Stack builder should disappear
    await expect(page.locator('div:has-text("Stack Builder")')).not.toBeVisible()
  })

  test('should persist stack across page refresh', async ({ page }) => {
    // Add a skill
    await page.locator('button:has-text("Add to Stack")').first().click()
    await page.waitForTimeout(500)
    
    // Verify stack is visible
    await expect(page.locator('text=/1 item/')).toBeVisible()
    
    // Refresh page
    await page.reload()
    await page.waitForLoadState('networkidle')
    
    // Stack should still be visible with same item
    await expect(page.locator('text=/1 item/')).toBeVisible()
    
    // Clean up - clear stack
    const clearButton = page.locator('button[aria-label="Clear all"]')
    await clearButton.click()
  })

  test('should position stack builder in bottom-right corner', async ({ page }) => {
    // Add a skill
    await page.locator('button:has-text("Add to Stack")').first().click()
    await page.waitForTimeout(500)
    
    // Get stack builder position
    const stackBuilder = page.locator('div:has-text("Stack Builder")').first()
    const box = await stackBuilder.boundingBox()
    
    // Should be in bottom-right area
    expect(box).not.toBeNull()
    if (box) {
      const viewport = page.viewportSize()
      expect(box.x).toBeGreaterThan(viewport!.width - 500) // Near right edge
      expect(box.y).toBeGreaterThan(viewport!.height - 600) // Near bottom
    }
  })

  test('should handle rapid clicks without duplicates', async ({ page }) => {
    const addButton = page.locator('button:has-text("Add to Stack")').first()
    
    // Click multiple times rapidly
    await addButton.click()
    await addButton.click()
    await addButton.click()
    
    await page.waitForTimeout(500)
    
    // Should only have 1 item (no duplicates)
    await expect(page.locator('text=/1 item/')).toBeVisible()
  })
})
