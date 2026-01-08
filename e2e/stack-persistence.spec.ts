import { test, expect } from '@playwright/test'

test.describe('Stack Persistence', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
  })

  test('should save current stack', async ({ page }) => {
    // Add items to stack
    await page.goto('/skills')
    await page.waitForSelector('article')
    
    // Add first skill
    const firstCard = page.locator('article').first()
    await firstCard.getByRole('button', { name: /Add/i }).click()
    
    // Wait for stack builder to appear
    await expect(page.getByText('Stack Builder')).toBeVisible()
    
    // Click save button
    await page.getByRole('button', { name: /Save Stack/i }).click()
    
    // Save dialog should appear
    await expect(page.getByText(/Save Stack/i)).toBeVisible()
    
    // Enter stack name
    await page.getByPlaceholder(/My Awesome Stack/i).fill('Test Stack')
    await page.getByPlaceholder(/What's this stack for?/i).fill('Testing stack persistence')
    
    // Click save button in dialog
    await page.getByRole('button', { name: /Save Stack/i }).last().click()
    
    // Dialog should close
    await expect(page.getByText(/Save Stack/i)).not.toBeVisible()
    
    // Stack builder header should show stack name
    await expect(page.getByText('Test Stack')).toBeVisible()
  })

  test('should load saved stack', async ({ page }) => {
    // First create a saved stack
    await page.goto('/skills')
    await page.waitForSelector('article')
    const firstCard = page.locator('article').first()
    await firstCard.getByRole('button', { name: /Add/i }).click()
    
    // Save the stack
    await page.getByRole('button', { name: /Save Stack/i }).click()
    await page.getByPlaceholder(/My Awesome Stack/i).fill('Loadable Stack')
    await page.getByRole('button', { name: /Save Stack/i }).last().click()
    
    // Clear the current stack
    await page.getByRole('button', { name: /Clear/i }).click()
    
    // Stack should be empty
    await expect(page.getByText('Stack Builder')).not.toBeVisible()
    
    // Navigate to a page with stack builder capability
    await page.goto('/skills')
    
    // Open load dialog (we need to add an item first to show stack builder)
    await page.locator('article').first().getByRole('button', { name: /Add/i }).click()
    await page.getByRole('button', { name: /Load/i }).click()
    
    // Load dialog should appear
    await expect(page.getByText('Load Stack')).toBeVisible()
    
    // Click load on the saved stack
    await page.getByRole('button', { name: /Load/i }).last().click()
    
    // Stack should be loaded
    await expect(page.getByText('Loadable Stack')).toBeVisible()
  })

  test('should export stack as JSON', async ({ page }) => {
    // Create a stack
    await page.goto('/commands')
    await page.waitForSelector('article')
    const firstCard = page.locator('article').first()
    await firstCard.getByRole('button', { name: /Add/i }).click()
    
    // Click export button
    await page.getByRole('button', { name: /Export/i }).click()
    
    // Export dialog should appear
    await expect(page.getByText('Export Stack')).toBeVisible()
    
    // Should show JSON content
    const jsonTextarea = page.locator('textarea').first()
    await expect(jsonTextarea).toBeVisible()
    const jsonContent = await jsonTextarea.inputValue()
    
    // JSON should be valid and contain items
    expect(() => JSON.parse(jsonContent)).not.toThrow()
    const parsed = JSON.parse(jsonContent)
    expect(parsed.items).toBeDefined()
    expect(parsed.items.length).toBeGreaterThan(0)
  })

  test('should delete saved stack', async ({ page }) => {
    // Create a saved stack
    await page.goto('/settings')
    await page.waitForSelector('article')
    const firstCard = page.locator('article').first()
    await firstCard.getByRole('button', { name: /Add/i }).click()
    
    // Save the stack
    await page.getByRole('button', { name: /Save Stack/i }).click()
    await page.getByPlaceholder(/My Awesome Stack/i).fill('Stack to Delete')
    await page.getByRole('button', { name: /Save Stack/i }).last().click()
    
    // Open load dialog
    await page.getByRole('button', { name: /Load/i }).click()
    
    // Should see the saved stack
    await expect(page.getByText('Stack to Delete')).toBeVisible()
    
    // Find and click delete button
    const stackCard = page.locator('text=Stack to Delete').locator('..')
    
    // Note: This test might need adjustment based on actual UI structure
    // We're simulating the delete action
    page.on('dialog', dialog => dialog.accept()) // Auto-accept confirm dialog
    
    // Click the delete button (trash icon)
    // This selector might need adjustment based on actual implementation
    await stackCard.getByRole('button').last().click()
    
    // Stack should be removed from list
    await expect(page.getByText('Stack to Delete')).not.toBeVisible()
  })

  test('should persist stack across page reloads', async ({ page }) => {
    // Add items to stack
    await page.goto('/commands')
    await page.waitForSelector('article')
    const firstCard = page.locator('article').first()
    await firstCard.getByRole('button', { name: /Add/i }).click()
    
    // Save stack
    await page.getByRole('button', { name: /Save Stack/i }).click()
    await page.getByPlaceholder(/My Awesome Stack/i).fill('Persistent Stack')
    await page.getByRole('button', { name: /Save Stack/i }).last().click()
    
    // Reload page
    await page.reload()
    
    // Navigate back to a page where we can see the stack
    await page.goto('/commands')
    
    // Stack should still exist (add another item to trigger stack builder)
    await page.waitForSelector('article')
    const secondCard = page.locator('article').nth(1)
    await secondCard.getByRole('button', { name: /Add/i }).click()
    
    // Check that we have 2 saved stacks indicator
    await expect(page.getByText(/saved/)).toBeVisible()
  })

  test('should switch between multiple stacks', async ({ page }) => {
    // Create first stack
    await page.goto('/skills')
    await page.waitForSelector('article')
    await page.locator('article').first().getByRole('button', { name: /Add/i }).click()
    
    await page.getByRole('button', { name: /Save Stack/i }).click()
    await page.getByPlaceholder(/My Awesome Stack/i).fill('Stack One')
    await page.getByRole('button', { name: /Save Stack/i }).last().click()
    
    // Clear stack
    await page.getByRole('button', { name: /Clear/i }).click()
    
    // Create second stack
    await page.goto('/commands')
    await page.waitForSelector('article')
    await page.locator('article').first().getByRole('button', { name: /Add/i }).click()
    
    await page.getByRole('button', { name: /Save Stack/i }).click()
    await page.getByPlaceholder(/My Awesome Stack/i).fill('Stack Two')
    await page.getByRole('button', { name: /Save Stack/i }).last().click()
    
    // Open load dialog
    await page.getByRole('button', { name: /Load/i }).click()
    
    // Should see both stacks
    await expect(page.getByText('Stack One')).toBeVisible()
    await expect(page.getByText('Stack Two')).toBeVisible()
    
    // Should show "Current" indicator on Stack Two
    const stackTwoCard = page.locator('text=Stack Two').locator('..')
    await expect(stackTwoCard.getByText('Current')).toBeVisible()
  })

  test('should import stack from JSON', async ({ page }) => {
    await page.goto('/skills')
    await page.waitForSelector('article')
    
    // Add item to show stack builder
    await page.locator('article').first().getByRole('button', { name: /Add/i }).click()
    
    // Click import button
    await page.getByRole('button', { name: /Import/i }).click()
    
    // Import dialog should appear
    await expect(page.getByText('Import Stack')).toBeVisible()
    
    // Create valid JSON
    const validJson = JSON.stringify({
      id: 'test_import',
      name: 'Imported Stack',
      description: 'Test import',
      items: [{
        id: 'test_1',
        slug: 'test-skill',
        name: 'Test Skill',
        description: 'Test description',
        type: 'skill'
      }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
    
    // Paste JSON
    await page.locator('textarea').last().fill(validJson)
    
    // Click import button
    await page.getByRole('button', { name: /Import Stack/i }).last().click()
    
    // Should show success message (this might be an alert)
    page.on('dialog', dialog => {
      expect(dialog.message()).toContain('imported successfully')
      dialog.accept()
    })
  })
})
