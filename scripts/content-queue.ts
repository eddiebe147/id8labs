#!/usr/bin/env npx tsx
/**
 * Content Queue CLI
 * Manage essay scheduling from the command line
 *
 * Usage:
 *   npx tsx scripts/content-queue.ts add <slug> <title>
 *   npx tsx scripts/content-queue.ts list
 *   npx tsx scripts/content-queue.ts schedule <slug>
 *   npx tsx scripts/content-queue.ts process
 *   npx tsx scripts/content-queue.ts stats
 */

import { config } from 'dotenv'
import { resolve } from 'path'

// Load env from project root
config({ path: resolve(process.cwd(), '.env.local') })

import {
  queueEssay,
  addDraft,
  scheduleDraft,
  listQueue,
  getDueItems,
  getQueueStats,
  getNextSlot,
  markPublished,
  markFailed,
  updateSocialStatus,
  deleteFromQueue,
  reschedule,
  getBySlug,
  type QueuedContent
} from '../lib/content-queue'

// Status icons
const STATUS_ICONS: Record<string, string> = {
  draft: '📝',
  scheduled: '📅',
  published: '✅',
  failed: '❌'
}

const SOCIAL_ICONS: Record<string, string> = {
  pending: '⏳',
  queued: '📤',
  posted: '✅',
  skipped: '⏭️'
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'Not scheduled'
  const date = new Date(dateStr)
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

function printItem(item: QueuedContent, verbose = false) {
  const icon = STATUS_ICONS[item.status] || '❓'
  const socialIcon = SOCIAL_ICONS[item.social_status] || '❓'

  console.log(`\n${icon} [${item.status.toUpperCase()}] ${item.title}`)
  console.log(`   Slug: ${item.slug}`)
  console.log(`   Scheduled: ${formatDate(item.scheduled_at)}`)
  console.log(`   Social: ${socialIcon} ${item.social_status} → ${item.social_platforms.join(', ')}`)

  if (verbose) {
    console.log(`   ID: ${item.id}`)
    console.log(`   Type: ${item.content_type}`)
    console.log(`   Priority: ${item.priority}`)
    console.log(`   Source: ${item.source_path}`)
    if (item.published_at) {
      console.log(`   Published: ${formatDate(item.published_at)}`)
    }
    if (item.error_message) {
      console.log(`   Error: ${item.error_message}`)
    }
  }
}

async function main() {
  const [, , command, ...args] = process.argv

  if (!command) {
    console.log(`
📚 Content Queue CLI

Commands:
  add <slug> <title>     Add essay directly to queue (auto-scheduled)
  draft <slug> <title>   Add essay as draft (schedule later)
  list [status]          List queue items (optional: draft/scheduled/published/failed)
  schedule <slug>        Schedule a draft essay
  reschedule <slug> <time>  Reschedule an essay (time: ISO or "tomorrow 9am")
  process                Publish due essays
  stats                  Show queue statistics
  next                   Show next available publish slot
  delete <slug>          Remove from queue
  help                   Show this help

Examples:
  npx tsx scripts/content-queue.ts add my-essay "My Great Essay"
  npx tsx scripts/content-queue.ts list scheduled
  npx tsx scripts/content-queue.ts schedule my-draft-essay
  npx tsx scripts/content-queue.ts process
`)
    return
  }

  try {
    switch (command) {
      case 'add': {
        const [slug, ...titleParts] = args
        const title = titleParts.join(' ')

        if (!slug || !title) {
          console.error('Usage: add <slug> <title>')
          process.exit(1)
        }

        console.log(`\n📤 Adding essay to queue...`)
        const item = await queueEssay(slug, title)
        console.log(`\n✅ Essay queued!`)
        printItem(item, true)
        break
      }

      case 'draft': {
        const [slug, ...titleParts] = args
        const title = titleParts.join(' ')

        if (!slug || !title) {
          console.error('Usage: draft <slug> <title>')
          process.exit(1)
        }

        console.log(`\n📝 Adding draft...`)
        const item = await addDraft(slug, title)
        console.log(`\n✅ Draft added!`)
        printItem(item, true)
        console.log(`\n💡 Run 'schedule ${slug}' when ready to publish.`)
        break
      }

      case 'list': {
        const [status] = args
        console.log(`\n📋 Content Queue${status ? ` (${status})` : ''}\n`)

        const items = await listQueue({
          status: status as string | undefined,
          limit: 50
        })

        if (items.length === 0) {
          console.log('   No items in queue.')
        } else {
          for (const item of items) {
            printItem(item)
          }
        }

        console.log('\n')
        break
      }

      case 'schedule': {
        const [slugOrId] = args

        if (!slugOrId) {
          console.error('Usage: schedule <slug>')
          process.exit(1)
        }

        const existing = await getBySlug(slugOrId)
        if (!existing) {
          console.error(`❌ Essay not found: ${slugOrId}`)
          process.exit(1)
        }

        console.log(`\n📅 Scheduling "${existing.title}"...`)
        const item = await scheduleDraft(existing.id)
        console.log(`\n✅ Scheduled!`)
        printItem(item, true)
        break
      }

      case 'reschedule': {
        const [slugOrId, ...timeParts] = args
        const timeStr = timeParts.join(' ')

        if (!slugOrId || !timeStr) {
          console.error('Usage: reschedule <slug> <time>')
          console.error('Time can be ISO format or natural like "tomorrow 9am"')
          process.exit(1)
        }

        const existing = await getBySlug(slugOrId)
        if (!existing) {
          console.error(`❌ Essay not found: ${slugOrId}`)
          process.exit(1)
        }

        // Parse time (simple version - ISO or relative)
        let newTime: Date
        if (timeStr.toLowerCase().includes('tomorrow')) {
          newTime = new Date()
          newTime.setDate(newTime.getDate() + 1)
          const hourMatch = timeStr.match(/(\d+)\s*(am|pm)/i)
          if (hourMatch) {
            let hour = parseInt(hourMatch[1])
            if (hourMatch[2].toLowerCase() === 'pm' && hour < 12) hour += 12
            if (hourMatch[2].toLowerCase() === 'am' && hour === 12) hour = 0
            newTime.setHours(hour, 0, 0, 0)
          } else {
            newTime.setHours(9, 0, 0, 0)
          }
        } else {
          newTime = new Date(timeStr)
          if (isNaN(newTime.getTime())) {
            console.error('❌ Invalid time format')
            process.exit(1)
          }
        }

        console.log(`\n📅 Rescheduling "${existing.title}"...`)
        const item = await reschedule(existing.id, newTime)
        console.log(`\n✅ Rescheduled!`)
        printItem(item, true)
        break
      }

      case 'process': {
        console.log(`\n🔄 Processing due items...\n`)

        const dueItems = await getDueItems()

        if (dueItems.length === 0) {
          console.log('   No items due for publishing.')
          console.log('\n')
          break
        }

        console.log(`   Found ${dueItems.length} item(s) to process.\n`)

        for (const item of dueItems) {
          console.log(`\n🚀 Publishing: ${item.title}`)
          console.log(`   Slug: ${item.slug}`)

          try {
            // Here you would integrate with your actual publish flow
            // For now, we just mark it as published
            console.log(`   → Would publish ${item.source_path}`)
            console.log(`   → Would post to: ${item.social_platforms.join(', ')}`)

            // Mark as published
            await markPublished(item.id)
            console.log(`   ✅ Marked as published`)

            // Update social status to queued (actual posting happens separately)
            await updateSocialStatus(item.id, 'queued')
            console.log(`   📤 Social posts queued`)

          } catch (err) {
            const message = err instanceof Error ? err.message : 'Unknown error'
            console.error(`   ❌ Failed: ${message}`)
            await markFailed(item.id, message)
          }
        }

        console.log('\n✨ Done processing!\n')
        break
      }

      case 'stats': {
        console.log(`\n📊 Queue Statistics\n`)

        const stats = await getQueueStats()

        console.log(`   Total items: ${stats.total}`)
        console.log(`   ─────────────────`)
        console.log(`   📝 Drafts:     ${stats.draft}`)
        console.log(`   📅 Scheduled:  ${stats.scheduled}`)
        console.log(`   ✅ Published:  ${stats.published}`)
        console.log(`   ❌ Failed:     ${stats.failed}`)
        console.log(`   ─────────────────`)
        console.log(`   Today remaining: ${stats.todayRemaining} posts`)

        console.log('\n')
        break
      }

      case 'next': {
        console.log(`\n🕐 Next Available Slot\n`)

        const nextSlot = await getNextSlot()
        console.log(`   ${formatDate(nextSlot.toISOString())}`)
        console.log('\n')
        break
      }

      case 'delete': {
        const [slugOrId] = args

        if (!slugOrId) {
          console.error('Usage: delete <slug>')
          process.exit(1)
        }

        const existing = await getBySlug(slugOrId)
        if (!existing) {
          console.error(`❌ Essay not found: ${slugOrId}`)
          process.exit(1)
        }

        console.log(`\n🗑️  Deleting "${existing.title}"...`)
        await deleteFromQueue(existing.id)
        console.log(`   ✅ Deleted from queue.\n`)
        break
      }

      case 'help':
        // Recursive call with no command shows help
        process.argv = [process.argv[0], process.argv[1]]
        await main()
        break

      default:
        console.error(`Unknown command: ${command}`)
        console.error('Run without arguments to see help.')
        process.exit(1)
    }
  } catch (err) {
    console.error('\n❌ Error:', err instanceof Error ? err.message : err)
    process.exit(1)
  }
}

main()
