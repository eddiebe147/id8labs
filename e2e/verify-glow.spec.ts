import { test, expect } from '@playwright/test'

test('verify green glow appears on card when added to stack', async ({ page }) => {
  await page.goto('/skills')
  await page.waitForLoadState('networkidle')
  
  // Find first skill card
  const firstCard = page.locator('article').first()
  
  // Take screenshot BEFORE adding
  await page.screenshot({ 
    path: 'test-results/before-add-to-stack.png',
    fullPage: false 
  })
  
  // Get card's initial classes
  const beforeClasses = await firstCard.getAttribute('class')
  console.log('BEFORE classes:', beforeClasses)
  
  // Click Add to Stack
  const addButton = firstCard.locator('button:has-text("Add to Stack")')
  await addButton.click()
  
  // Wait for transition
  await page.waitForTimeout(500)
  
  // Get card's classes after adding
  const afterClasses = await firstCard.getAttribute('class')
  console.log('AFTER classes:', afterClasses)
  
  // Take screenshot AFTER adding
  await page.screenshot({ 
    path: 'test-results/after-add-to-stack.png',
    fullPage: false 
  })
  
  // Verify green glow classes are present
  expect(afterClasses).toContain('ring-emerald-500')
  expect(afterClasses).toContain('shadow-')
  
  // Button should say "In Stack"
  await expect(addButton).toHaveText(/In Stack/)
  
  // Stack builder should be visible
  await expect(page.locator('text=Stack Builder')).toBeVisible()
  
  console.log('✅ Green glow verified!')
  console.log('📸 Screenshots saved to test-results/')
})
