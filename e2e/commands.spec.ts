import { test, expect } from '@playwright/test'

test.describe('Commands Browse Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/commands')
  })

  test('should display commands page with header', async ({ page }) => {
    // Check hero section
    await expect(page.locator('h1')).toContainText('Workflow Commands')
    await expect(page.getByText('Workflow Commands')).toBeVisible()
    
    // Check badge showing count
    await expect(page.getByText(/\d+ Workflow Commands/)).toBeVisible()
  })

  test('should display commands grid', async ({ page }) => {
    // Wait for commands to load
    await page.waitForSelector('article', { timeout: 5000 })
    
    // Check that we have command cards
    const commandCards = page.locator('article')
    const count = await commandCards.count()
    expect(count).toBeGreaterThan(0)
    
    // Check first card has expected elements
    const firstCard = commandCards.first()
    await expect(firstCard.locator('h3')).toBeVisible()
    await expect(firstCard.getByText(/installs?/i)).toBeVisible()
  })

  test('should filter by category', async ({ page }) => {
    // Wait for page to load
    await page.waitForSelector('article')
    
    // Get initial count
    const initialCards = page.locator('article')
    const initialCount = await initialCards.count()
    
    // Click a category filter (e.g., git)
    const categoryButton = page.getByRole('link', { name: /git \(\d+\)/i })
    if (await categoryButton.count() > 0) {
      await categoryButton.first().click()
      
      // Wait for URL to update
      await page.waitForURL(/category=git/)
      
      // Check filtered results
      const filteredCards = page.locator('article')
      const filteredCount = await filteredCards.count()
      
      // Should have results (might be same or fewer)
      expect(filteredCount).toBeGreaterThan(0)
    }
  })

  test('should navigate to command detail page', async ({ page }) => {
    // Wait for commands to load
    await page.waitForSelector('article')
    
    // Click first command card
    const firstCard = page.locator('article').first()
    const commandName = await firstCard.locator('h3').textContent()
    await firstCard.click()
    
    // Should navigate to detail page
    await expect(page).toHaveURL(/\/commands\/[^/]+/)
    
    // Detail page should show command info
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.getByText(/Installation/i)).toBeVisible()
  })

  test('should add command to stack', async ({ page }) => {
    // Wait for commands to load
    await page.waitForSelector('article')
    
    // Click "Add" button on first card
    const firstCard = page.locator('article').first()
    const addButton = firstCard.getByRole('button', { name: /Add/i })
    await addButton.click()
    
    // Button should change to "In Stack"
    await expect(firstCard.getByText('In Stack')).toBeVisible()
    
    // Stack builder should appear
    await expect(page.getByText('Stack Builder')).toBeVisible()
    
    // Stack should show 1 item
    await expect(page.getByText(/1 item/)).toBeVisible()
  })
})

test.describe('Command Detail Page', () => {
  test('should display command details', async ({ page }) => {
    // Visit a specific command (we'll use first one from API)
    await page.goto('/commands')
    await page.waitForSelector('article')
    
    // Get first command slug from URL
    const firstCard = page.locator('article').first()
    await firstCard.click()
    
    // Should show command details
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.getByText(/Installation/i)).toBeVisible()
    await expect(page.getByText(/Command/i)).toBeVisible()
    
    // Should show back button
    await expect(page.getByRole('link', { name: /Back to Commands/i })).toBeVisible()
  })

  test('should add command to stack from detail page', async ({ page }) => {
    // Navigate to a command detail page
    await page.goto('/commands')
    await page.waitForSelector('article')
    const firstCard = page.locator('article').first()
    await firstCard.click()
    
    // Click "Add to Stack" button
    const addButton = page.getByRole('button', { name: /Add to Stack/i }).first()
    await addButton.click()
    
    // Button should change
    await expect(page.getByText('In Stack')).toBeVisible()
    
    // Stack builder should appear
    await expect(page.getByText('Stack Builder')).toBeVisible()
  })

  test('should navigate back to commands list', async ({ page }) => {
    await page.goto('/commands')
    await page.waitForSelector('article')
    const firstCard = page.locator('article').first()
    await firstCard.click()
    
    // Click back button
    await page.getByRole('link', { name: /Back to Commands/i }).click()
    
    // Should be back on commands page
    await expect(page).toHaveURL('/commands')
    await expect(page.locator('h1')).toContainText('Workflow Commands')
  })
})
