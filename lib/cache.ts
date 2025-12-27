import { NextResponse } from 'next/server'

/**
 * Cache configuration for different API routes
 *
 * stale-while-revalidate: Serve stale content while fetching fresh data
 * This is optimal for dashboards and frequently-polled endpoints
 */
export const CachePresets = {
  // Stats/dashboard data: cache 30s, revalidate up to 60s
  STATS: {
    'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
  },
  // Observations: cache 60s, revalidate up to 5min
  CONTENT: {
    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
  },
  // Static data that rarely changes: cache 1hr
  STATIC: {
    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
  },
  // No caching (for mutations, auth, etc.)
  NO_CACHE: {
    'Cache-Control': 'no-store, no-cache, must-revalidate',
  },
} as const

/**
 * Create a cached JSON response with proper headers
 */
export function cachedJsonResponse<T>(
  data: T,
  preset: keyof typeof CachePresets = 'STATS',
  status = 200
): NextResponse {
  return NextResponse.json(data, {
    status,
    headers: CachePresets[preset],
  })
}

/**
 * Simple in-memory cache for expensive operations
 * Useful for GitHub API calls, database aggregations, etc.
 */
class MemoryCache {
  private cache = new Map<string, { data: unknown; expiry: number }>()

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null
    if (Date.now() > entry.expiry) {
      this.cache.delete(key)
      return null
    }
    return entry.data as T
  }

  set<T>(key: string, data: T, ttlMs: number): void {
    this.cache.set(key, {
      data,
      expiry: Date.now() + ttlMs,
    })
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }
}

// Singleton instance
export const memoryCache = new MemoryCache()

/**
 * Wrapper for expensive async operations with caching
 */
export async function withCache<T>(
  key: string,
  fn: () => Promise<T>,
  ttlMs = 30000
): Promise<T> {
  const cached = memoryCache.get<T>(key)
  if (cached !== null) {
    return cached
  }

  const data = await fn()
  memoryCache.set(key, data, ttlMs)
  return data
}
