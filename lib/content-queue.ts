/**
 * Content Queue System
 * Manages essay scheduling with smart spacing
 *
 * Usage:
 *   - queueEssay(slug, title) - Add essay to queue
 *   - getNextSlot() - Find next available publish time
 *   - processQueue() - Publish due essays
 */

import { createClient } from '@supabase/supabase-js'

// Types
export interface QueuedContent {
  id: string
  title: string
  slug: string
  content_type: 'essay' | 'research' | 'announcement'
  source_path: string | null
  status: 'draft' | 'scheduled' | 'published' | 'failed'
  priority: number
  scheduled_at: string | null
  published_at: string | null
  social_status: 'pending' | 'queued' | 'posted' | 'skipped'
  social_platforms: string[]
  social_posted_at: string | null
  error_message: string | null
  retry_count: number
  created_at: string
  updated_at: string
}

export interface SpacingConfig {
  min_gap_hours: number
  max_gap_hours: number
  max_posts_per_day: number
  timezone: string
}

export interface QueueStats {
  total: number
  draft: number
  scheduled: number
  published: number
  failed: number
  todayRemaining: number
}

// Get admin Supabase client (for server-side operations)
function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error('Supabase credentials not configured')
  }

  return createClient(url, key)
}

/**
 * Get smart spacing configuration
 */
export async function getSpacingConfig(): Promise<SpacingConfig> {
  const supabase = getAdminClient()

  const { data, error } = await supabase
    .from('smart_spacing_config')
    .select('*')
    .limit(1)
    .single()

  if (error) {
    // Return defaults if table doesn't exist yet
    return {
      min_gap_hours: 3,
      max_gap_hours: 4,
      max_posts_per_day: 6,
      timezone: 'America/New_York'
    }
  }

  return data
}

/**
 * Calculate next available publish slot
 *
 * Inbox model: 1 essay per day at 9am
 * - If today's 9am slot is available (not passed, not taken), use it
 * - Otherwise, find next available day at 9am
 */
export async function getNextSlot(): Promise<Date> {
  const supabase = getAdminClient()
  const config = await getSpacingConfig()

  const PUBLISH_HOUR = 9 // 9am daily

  // Get all scheduled items to find occupied slots
  const { data: scheduledItems } = await supabase
    .from('content_queue')
    .select('scheduled_at')
    .in('status', ['scheduled'])
    .not('scheduled_at', 'is', null)
    .order('scheduled_at', { ascending: true })

  // Build set of occupied dates (YYYY-MM-DD format)
  const occupiedDates = new Set<string>()
  if (scheduledItems) {
    for (const item of scheduledItems) {
      const date = new Date(item.scheduled_at)
      const dateKey = date.toISOString().split('T')[0]
      occupiedDates.add(dateKey)
    }
  }

  // Start from today
  const now = new Date()
  let candidate = new Date(now)
  candidate.setHours(PUBLISH_HOUR, 0, 0, 0)

  // If today's slot already passed, start from tomorrow
  if (candidate <= now) {
    candidate.setDate(candidate.getDate() + 1)
  }

  // Find next available slot (not occupied)
  // Limit search to 365 days to prevent infinite loop
  for (let i = 0; i < 365; i++) {
    const dateKey = candidate.toISOString().split('T')[0]
    if (!occupiedDates.has(dateKey)) {
      return candidate
    }
    // Try next day
    candidate.setDate(candidate.getDate() + 1)
  }

  // Fallback: return tomorrow at 9am (shouldn't happen in practice)
  const fallback = new Date(now)
  fallback.setDate(fallback.getDate() + 1)
  fallback.setHours(PUBLISH_HOUR, 0, 0, 0)
  return fallback
}

/**
 * Add essay to queue
 */
export async function queueEssay(
  slug: string,
  title: string,
  options: {
    contentType?: 'essay' | 'research' | 'announcement'
    priority?: number
    sourcePath?: string
    scheduledAt?: Date | null
    socialPlatforms?: string[]
  } = {}
): Promise<QueuedContent> {
  const supabase = getAdminClient()

  const {
    contentType = 'essay',
    priority = 3,
    sourcePath = `essays/${slug}.mdx`,
    scheduledAt = null,
    socialPlatforms = ['twitter', 'linkedin']
  } = options

  // If no specific time, use smart spacing
  let publishTime = scheduledAt
  if (!publishTime) {
    publishTime = await getNextSlot()
  }

  const { data, error } = await supabase
    .from('content_queue')
    .insert({
      title,
      slug,
      content_type: contentType,
      source_path: sourcePath,
      status: 'scheduled',
      priority,
      scheduled_at: publishTime.toISOString(),
      social_platforms: socialPlatforms
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to queue essay: ${error.message}`)
  }

  return data
}

/**
 * Add draft to queue (no schedule yet)
 */
export async function addDraft(
  slug: string,
  title: string,
  options: {
    contentType?: 'essay' | 'research' | 'announcement'
    priority?: number
    sourcePath?: string
  } = {}
): Promise<QueuedContent> {
  const supabase = getAdminClient()

  const {
    contentType = 'essay',
    priority = 3,
    sourcePath = `essays/${slug}.mdx`
  } = options

  const { data, error } = await supabase
    .from('content_queue')
    .insert({
      title,
      slug,
      content_type: contentType,
      source_path: sourcePath,
      status: 'draft',
      priority
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to add draft: ${error.message}`)
  }

  return data
}

/**
 * Schedule a draft essay
 */
export async function scheduleDraft(
  id: string,
  scheduledAt?: Date
): Promise<QueuedContent> {
  const supabase = getAdminClient()

  const publishTime = scheduledAt || await getNextSlot()

  const { data, error } = await supabase
    .from('content_queue')
    .update({
      status: 'scheduled',
      scheduled_at: publishTime.toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to schedule: ${error.message}`)
  }

  return data
}

/**
 * Get queue statistics
 */
export async function getQueueStats(): Promise<QueueStats> {
  const supabase = getAdminClient()
  const config = await getSpacingConfig()

  const { data, error } = await supabase
    .from('content_queue')
    .select('status, scheduled_at')

  if (error) {
    throw new Error(`Failed to get stats: ${error.message}`)
  }

  // Count by status
  const stats: QueueStats = {
    total: data.length,
    draft: 0,
    scheduled: 0,
    published: 0,
    failed: 0,
    todayRemaining: 0
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  let todayScheduled = 0

  for (const item of data) {
    stats[item.status as keyof typeof stats]++

    // Count today's scheduled posts
    if (item.scheduled_at) {
      const schedTime = new Date(item.scheduled_at)
      if (schedTime >= today && schedTime < tomorrow) {
        todayScheduled++
      }
    }
  }

  stats.todayRemaining = Math.max(0, config.max_posts_per_day - todayScheduled)

  return stats
}

/**
 * List queue items
 */
export async function listQueue(
  filter?: {
    status?: string
    contentType?: string
    limit?: number
  }
): Promise<QueuedContent[]> {
  const supabase = getAdminClient()

  let query = supabase
    .from('content_queue')
    .select('*')
    .order('scheduled_at', { ascending: true, nullsFirst: false })
    .order('priority', { ascending: true })
    .order('created_at', { ascending: true })

  if (filter?.status) {
    query = query.eq('status', filter.status)
  }

  if (filter?.contentType) {
    query = query.eq('content_type', filter.contentType)
  }

  if (filter?.limit) {
    query = query.limit(filter.limit)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Failed to list queue: ${error.message}`)
  }

  return data
}

/**
 * Get items due for publishing
 */
export async function getDueItems(): Promise<QueuedContent[]> {
  const supabase = getAdminClient()

  const { data, error } = await supabase
    .from('content_queue')
    .select('*')
    .eq('status', 'scheduled')
    .lte('scheduled_at', new Date().toISOString())
    .order('scheduled_at', { ascending: true })

  if (error) {
    throw new Error(`Failed to get due items: ${error.message}`)
  }

  return data
}

/**
 * Mark item as published
 */
export async function markPublished(id: string): Promise<QueuedContent> {
  const supabase = getAdminClient()

  const { data, error } = await supabase
    .from('content_queue')
    .update({
      status: 'published',
      published_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to mark published: ${error.message}`)
  }

  return data
}

/**
 * Mark item as failed
 */
export async function markFailed(id: string, errorMessage: string): Promise<QueuedContent> {
  const supabase = getAdminClient()

  const { data, error } = await supabase
    .from('content_queue')
    .update({
      status: 'failed',
      error_message: errorMessage,
      retry_count: supabase.rpc ? undefined : 1 // Increment if RPC available
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to mark failed: ${error.message}`)
  }

  return data
}

/**
 * Update social post status
 */
export async function updateSocialStatus(
  id: string,
  socialStatus: 'pending' | 'queued' | 'posted' | 'skipped'
): Promise<QueuedContent> {
  const supabase = getAdminClient()

  const update: Record<string, unknown> = { social_status: socialStatus }
  if (socialStatus === 'posted') {
    update.social_posted_at = new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('content_queue')
    .update(update)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update social status: ${error.message}`)
  }

  return data
}

/**
 * Delete an item from the queue
 */
export async function deleteFromQueue(id: string): Promise<void> {
  const supabase = getAdminClient()

  const { error } = await supabase
    .from('content_queue')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`Failed to delete: ${error.message}`)
  }
}

/**
 * Reschedule an item
 */
export async function reschedule(id: string, newTime: Date): Promise<QueuedContent> {
  const supabase = getAdminClient()

  const { data, error } = await supabase
    .from('content_queue')
    .update({
      scheduled_at: newTime.toISOString(),
      status: 'scheduled'
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to reschedule: ${error.message}`)
  }

  return data
}

/**
 * Get a single queue item by slug
 */
export async function getBySlug(slug: string): Promise<QueuedContent | null> {
  const supabase = getAdminClient()

  const { data, error } = await supabase
    .from('content_queue')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null // Not found
    throw new Error(`Failed to get item: ${error.message}`)
  }

  return data
}
