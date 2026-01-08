import { test, expect } from '@playwright/test'

test.describe('Settings Browse Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/settings')
  })

  test('should display settings page with header', async ({ page }) => {
    // Check hero section
    await expect(page.locator('h1')).toContainText('Configuration Settings')
    
    // Check badge showing count
    await expect(page.getByText(/\d+ Configuration Settings/)).toBeVisible()
  })

  test('should display settings grid', async ({ page }) => {
    // Wait for settings to load
    await page.waitForSelector('article', { timeout: 5000 })
    
    // Check that we have setting cards
    const settingCards = page.locator('article')
    const count = await settingCards.count()
    expect(count).toBeGreaterThan(0)
    
    // Check first card has expected elements
    const firstCard = settingCards.first()
    await expect(firstCard.locator('h3')).toBeVisible()
    await expect(firstCard.getByText(/installs?/i)).toBeVisible()
  })

  test('should filter by category', async ({ page }) => {
    // Wait for page to load
    await page.waitForSelector('article')
    
    // Get initial count
    const initialCards = page.locator('article')
    const initialCount = await initialCards.count()
    
    // Click a category filter if available
    const categoryButton = page.getByRole('link', { name: /model \(\d+\)/i })
    if (await categoryButton.count() > 0) {
      await categoryButton.first().click()
      
      // Wait for URL to update
      await page.waitForURL(/category=model/)
      
      // Check filtered results
      const filteredCards = page.locator('article')
      const filteredCount = await filteredCards.count()
      
      // Should have results
      expect(filteredCount).toBeGreaterThan(0)
    }
  })

  test('should navigate to setting detail page', async ({ page }) => {
    // Wait for settings to load
    await page.waitForSelector('article')
    
    // Click first setting card
    const firstCard = page.locator('article').first()
    await firstCard.click()
    
    // Should navigate to detail page
    await expect(page).toHaveURL(/\/settings\/[^/]+/)
    
    // Detail page should show setting info
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.getByText(/Installation/i)).toBeVisible()
  })

  test('should add setting to stack', async ({ page }) => {
    // Wait for settings to load
    await page.waitForSelector('article')
    
    // Click "Add" button on first card
    const firstCard = page.locator('article').first()
    const addButton = firstCard.getByRole('button', { name: /Add/i })
    await addButton.click()
    
    // Button should change to "In Stack"
    await expect(firstCard.getByText('In Stack')).toBeVisible()
    
    // Stack builder should appear
    await expect(page.getByText('Stack Builder')).toBeVisible()
  })
})

test.describe('Setting Detail Page', () => {
  test('should display setting details', async ({ page }) => {
    // Visit settings page first
    await page.goto('/settings')
    await page.waitForSelector('article')
    
    // Click first setting
    const firstCard = page.locator('article').first()
    await firstCard.click()
    
    // Should show setting details
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.getByText(/Installation/i)).toBeVisible()
    await expect(page.getByText(/Configuration/i)).toBeVisible()
    
    // Should show back button
    await expect(page.getByRole('link', { name: /Back to Settings/i })).toBeVisible()
  })

  test('should display model configuration', async ({ page }) => {
    await page.goto('/settings')
    await page.waitForSelector('article')
    const firstCard = page.locator('article').first()
    await firstCard.click()
    
    // Check for configuration section
    const configSection = page.getByText(/Configuration/i)
    await expect(configSection).toBeVisible()
  })

  test('should add setting to stack from detail page', async ({ page }) => {
    // Navigate to a setting detail page
    await page.goto('/settings')
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

  test('should navigate back to settings list', async ({ page }) => {
    await page.goto('/settings')
    await page.waitForSelector('article')
    const firstCard = page.locator('article').first()
    await firstCard.click()
    
    // Click back button
    await page.getByRole('link', { name: /Back to Settings/i }).click()
    
    // Should be back on settings page
    await expect(page).toHaveURL('/settings')
    await expect(page.locator('h1')).toContainText('Configuration Settings')
  })
})
