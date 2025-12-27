import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  hasPurchasedClient,
  isPaidModule,
  PAID_MODULES,
  FREE_MODULES
} from '@/lib/purchase'
import { server } from '../mocks/server'
import { http, HttpResponse } from 'msw'

describe('lib/purchase', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('hasPurchasedClient', () => {
    it('should export hasPurchasedClient function', () => {
      expect(hasPurchasedClient).toBeDefined()
      expect(typeof hasPurchasedClient).toBe('function')
    })

    it('should return a promise', () => {
      const result = hasPurchasedClient('claude-for-knowledge-workers')
      expect(result).toBeInstanceOf(Promise)
    })

    it('should accept a product ID parameter', async () => {
      // This tests that the function can be called with different product IDs
      await expect(hasPurchasedClient('claude-for-knowledge-workers')).resolves.toBeDefined()
      await expect(hasPurchasedClient('some-other-product')).resolves.toBeDefined()
    })

    it('should return boolean value', async () => {
      const result = await hasPurchasedClient('claude-for-knowledge-workers')
      expect(typeof result).toBe('boolean')
    })

    // Note: Full integration tests for hasPurchasedClient require actual Supabase client mocking
    // which is complex with SSR. These tests verify the function signature and basic behavior.
    // E2E tests should cover the full purchase flow with real database interactions.
  })

  describe('isPaidModule', () => {
    it('should return true for paid modules', () => {
      const paidModules = ['module-1', 'module-2', 'module-3', 'module-4', 'module-5']

      paidModules.forEach(module => {
        expect(isPaidModule(module)).toBe(true)
      })
    })

    it('should return false for free modules', () => {
      const freeModules = ['module-0']

      freeModules.forEach(module => {
        expect(isPaidModule(module)).toBe(false)
      })
    })

    it('should return false for unknown modules', () => {
      const unknownModules = ['module-99', 'invalid-module', 'module-test']

      unknownModules.forEach(module => {
        expect(isPaidModule(module)).toBe(false)
      })
    })

    it('should be case-sensitive', () => {
      expect(isPaidModule('MODULE-1')).toBe(false)
      expect(isPaidModule('Module-1')).toBe(false)
      expect(isPaidModule('module-1')).toBe(true)
    })
  })

  describe('PAID_MODULES constant', () => {
    it('should contain all paid module slugs', () => {
      expect(PAID_MODULES).toEqual([
        'module-1',
        'module-2',
        'module-3',
        'module-4',
        'module-5',
      ])
    })

    it('should be an array', () => {
      expect(Array.isArray(PAID_MODULES)).toBe(true)
    })

    it('should not be empty', () => {
      expect(PAID_MODULES.length).toBeGreaterThan(0)
    })

    it('should contain unique values', () => {
      const uniqueModules = new Set(PAID_MODULES)
      expect(uniqueModules.size).toBe(PAID_MODULES.length)
    })
  })

  describe('FREE_MODULES constant', () => {
    it('should contain all free module slugs', () => {
      expect(FREE_MODULES).toEqual(['module-0'])
    })

    it('should be an array', () => {
      expect(Array.isArray(FREE_MODULES)).toBe(true)
    })

    it('should not be empty', () => {
      expect(FREE_MODULES.length).toBeGreaterThan(0)
    })

    it('should contain unique values', () => {
      const uniqueModules = new Set(FREE_MODULES)
      expect(uniqueModules.size).toBe(FREE_MODULES.length)
    })
  })

  describe('Module lists integrity', () => {
    it('should not have overlap between PAID_MODULES and FREE_MODULES', () => {
      const paidSet = new Set(PAID_MODULES)
      const freeSet = new Set(FREE_MODULES)

      FREE_MODULES.forEach(module => {
        expect(paidSet.has(module)).toBe(false)
      })

      PAID_MODULES.forEach(module => {
        expect(freeSet.has(module)).toBe(false)
      })
    })

    it('should have at least one paid module', () => {
      expect(PAID_MODULES.length).toBeGreaterThanOrEqual(1)
    })

    it('should have at least one free module', () => {
      expect(FREE_MODULES.length).toBeGreaterThanOrEqual(1)
    })
  })
})
