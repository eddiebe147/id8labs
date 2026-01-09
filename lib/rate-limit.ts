/**
 * Simple in-memory rate limiting for API routes
 *
 * Note: In serverless environments, each instance has its own memory,
 * so this is per-instance rate limiting. For stricter limits across
 * all instances, use Vercel KV or Upstash Redis.
 *
 * This provides protection against:
 * - Single-user abuse (hammering from one IP)
 * - Basic bot protection
 * - Runaway client bugs
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

// Store rate limit entries by key (IP address)
const rateLimitMap = new Map<string, RateLimitEntry>()

// Test mode: skip rate limiting in test environment
const isTestEnvironment = process.env.NODE_ENV === 'test' || process.env.VITEST === 'true'

/**
 * Clear all rate limit entries (for testing)
 */
export function clearRateLimits(): void {
  rateLimitMap.clear()
}

// Clean up old entries every 5 minutes to prevent memory leaks
const CLEANUP_INTERVAL = 5 * 60 * 1000
let lastCleanup = Date.now()

function cleanup() {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL) return

  lastCleanup = now
  const keysToDelete: string[] = []
  rateLimitMap.forEach((entry, key) => {
    if (entry.resetTime < now) {
      keysToDelete.push(key)
    }
  })
  keysToDelete.forEach(key => rateLimitMap.delete(key))
}

export interface RateLimitConfig {
  /** Maximum requests allowed in the window */
  limit: number
  /** Window size in milliseconds */
  windowMs: number
}

export interface RateLimitResult {
  /** Whether the request is allowed */
  allowed: boolean
  /** Remaining requests in the current window */
  remaining: number
  /** Time in ms until the window resets */
  resetIn: number
}

/**
 * Get the rate limit key from a request (usually IP address)
 */
export function getRateLimitKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() || 'unknown'
  return ip
}

/**
 * Check if a request should be rate limited
 *
 * @param key - Unique identifier for the client (usually IP)
 * @param config - Rate limit configuration
 * @returns Result indicating if request is allowed
 */
export function checkRateLimit(
  key: string,
  config: RateLimitConfig
): RateLimitResult {
  // Skip rate limiting in test environment
  if (isTestEnvironment) {
    return {
      allowed: true,
      remaining: config.limit,
      resetIn: config.windowMs,
    }
  }

  cleanup()

  const now = Date.now()
  const entry = rateLimitMap.get(key)

  // No existing entry or window has expired - start fresh
  if (!entry || entry.resetTime < now) {
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    })
    return {
      allowed: true,
      remaining: config.limit - 1,
      resetIn: config.windowMs,
    }
  }

  // Check if over limit
  if (entry.count >= config.limit) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: entry.resetTime - now,
    }
  }

  // Increment count
  entry.count++
  return {
    allowed: true,
    remaining: config.limit - entry.count,
    resetIn: entry.resetTime - now,
  }
}

/**
 * Pre-configured rate limits for different endpoint types
 */
export const RATE_LIMITS = {
  /** Public forms like subscribe, feedback, waitlist */
  publicForm: {
    limit: 10,
    windowMs: 60 * 1000, // 10 per minute
  },
  /** Search and read-heavy endpoints */
  search: {
    limit: 60,
    windowMs: 60 * 1000, // 60 per minute
  },
  /** AI-powered endpoints (expensive) */
  ai: {
    limit: 20,
    windowMs: 60 * 1000, // 20 per minute
  },
  /** Analytics tracking (high volume OK) */
  tracking: {
    limit: 100,
    windowMs: 60 * 1000, // 100 per minute
  },
} as const

/**
 * Helper to create rate limit response headers
 */
export function rateLimitHeaders(result: RateLimitResult, config: RateLimitConfig): Record<string, string> {
  return {
    'X-RateLimit-Limit': config.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': Math.ceil(result.resetIn / 1000).toString(),
  }
}
