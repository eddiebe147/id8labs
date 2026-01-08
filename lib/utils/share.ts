/**
 * Stack Sharing Utilities
 * URL-based stack sharing without authentication
 */

import type { SavedStack } from '@/lib/stores/stack-store'

/**
 * Encode stack data to base64 URL-safe string
 */
export function encodeStackData(stack: SavedStack): string {
  const json = JSON.stringify(stack)
  const base64 = Buffer.from(json).toString('base64')
  // Make URL-safe
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

/**
 * Decode base64 URL-safe string to stack data
 */
export function decodeStackData(encoded: string): SavedStack | null {
  try {
    // Restore base64 format
    const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/')
    // Add padding if needed
    const padded = base64 + '=='.slice(0, (4 - (base64.length % 4)) % 4)
    
    const json = Buffer.from(padded, 'base64').toString('utf-8')
    const stack = JSON.parse(json) as SavedStack
    
    // Validate structure
    if (!stack.items || !Array.isArray(stack.items)) {
      return null
    }
    
    return stack
  } catch (error) {
    console.error('Failed to decode stack data:', error)
    return null
  }
}

/**
 * Generate shareable URL for stack
 */
export function generateShareUrl(stack: SavedStack, baseUrl: string = ''): string {
  const encoded = encodeStackData(stack)
  const url = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '')
  return `${url}/share/${encoded}`
}

/**
 * Extract stack data from share URL
 */
export function extractStackFromUrl(url: string): SavedStack | null {
  try {
    // Extract encoded data from URL
    const match = url.match(/\/share\/([A-Za-z0-9_-]+)/)
    if (!match) {
      return null
    }
    
    return decodeStackData(match[1])
  } catch (error) {
    console.error('Failed to extract stack from URL:', error)
    return null
  }
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    return false
  }
  
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    return false
  }
}
