import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Simple in-memory cache for essays
let essaysCache: Essay[] | null = null
let cacheTimestamp: number = 0
const CACHE_TTL = 60 * 1000 // 1 minute in development

export interface Essay {
  slug: string
  title: string
  subtitle?: string
  date: string
  publishDate?: string  // Optional: schedule for future publication (YYYY-MM-DD)
  category: 'research' | 'release' | 'essay'
  readTime: string
  excerpt: string
  content: string
  heroImage?: string
  author?: string
  tags?: string[]
  featured?: boolean
}

// Backwards compatibility type alias
export type MdxEssay = Essay

const ESSAYS_DIR = path.join(process.cwd(), 'content', 'essays')

function toIsoDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

function normalizeDate(value: unknown): string | undefined {
  if (!value) return undefined

  if (value instanceof Date && !isNaN(value.getTime())) {
    return toIsoDate(value)
  }

  if (typeof value === 'string') {
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value

    const parsed = new Date(value)
    if (!isNaN(parsed.getTime())) {
      return toIsoDate(parsed)
    }
  }

  return undefined
}

function getStableFileDate(filePath: string): string {
  try {
    const stats = fs.statSync(filePath)
    const fallback = stats.birthtime && !isNaN(stats.birthtime.getTime())
      ? stats.birthtime
      : stats.mtime

    return toIsoDate(fallback)
  } catch {
    return '1970-01-01'
  }
}

/**
 * Check if an essay should be published based on publishDate
 * If no publishDate is set, the essay is published immediately
 * If publishDate is in the future, the essay is hidden until that date
 */
function isPublished(publishDate?: string): boolean {
  if (!publishDate) return true  // No publishDate = publish immediately

  const today = new Date()
  today.setHours(0, 0, 0, 0)  // Compare dates only, not times

  const pubDate = new Date(publishDate)
  pubDate.setHours(0, 0, 0, 0)

  return pubDate <= today
}

/**
 * Calculate read time based on word count (~200 words per minute)
 */
function calculateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
}

/**
 * Extract excerpt from content (first paragraph after frontmatter)
 */
function extractExcerpt(content: string, maxLength = 200): string {
  // Find first substantive paragraph (skip headings and empty lines)
  const paragraphs = content.split('\n\n')
  for (const p of paragraphs) {
    const trimmed = p.trim()
    // Skip headings, horizontal rules, and empty content
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('---') && trimmed.length > 20) {
      // Clean up markdown formatting
      const cleaned = trimmed
        .replace(/\*\*(.*?)\*\*/g, '$1')  // Bold
        .replace(/\*(.*?)\*/g, '$1')       // Italic
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links

      if (cleaned.length > maxLength) {
        return cleaned.substring(0, maxLength).trim() + '...'
      }
      return cleaned
    }
  }
  return ''
}

/**
 * Map frontmatter tags to category
 */
function inferCategory(tags?: string[]): 'essay' | 'research' | 'release' {
  if (!tags) return 'essay'

  const tagSet = new Set(tags.map(t => t.toLowerCase()))

  if (tagSet.has('release') || tagSet.has('release-notes')) return 'release'
  if (tagSet.has('research') || tagSet.has('market-research')) return 'research'

  return 'essay'
}

/**
 * Get all essays from the content/essays directory
 * Results are cached to avoid repeated filesystem reads
 */
export function getAllEssays(): Essay[] {
  // Return cached results if still valid
  const now = Date.now()
  if (essaysCache && (now - cacheTimestamp) < CACHE_TTL) {
    return essaysCache
  }

  // Check if directory exists
  if (!fs.existsSync(ESSAYS_DIR)) {
    console.warn(`Essays directory not found: ${ESSAYS_DIR}`)
    return []
  }

  const files = fs.readdirSync(ESSAYS_DIR)
  const mdxFiles = files.filter(file => file.endsWith('.mdx') || file.endsWith('.md'))

  const essays: Essay[] = []

  for (const filename of mdxFiles) {
    try {
      const filePath = path.join(ESSAYS_DIR, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')

      const { data: frontmatter, content } = matter(fileContents)

      // Generate slug from filename (remove extension)
      const slug = filename.replace(/\.(mdx|md)$/, '')

      // Normalize frontmatter dates (handles YAML Date objects and strings)
      const publishDate = normalizeDate(frontmatter.publishDate)
      if (!isPublished(publishDate)) {
        // Skip essays scheduled for future publication
        continue
      }

      // Map frontmatter to Essay interface
      const essayDate = normalizeDate(frontmatter.date) || publishDate || getStableFileDate(filePath)

      const essay: Essay = {
        slug,
        title: frontmatter.title || 'Untitled',
        subtitle: frontmatter.subtitle,
        date: essayDate,
        publishDate: publishDate,
        category: frontmatter.category || inferCategory(frontmatter.tags),
        readTime: frontmatter.readTime || calculateReadTime(content),
        excerpt: frontmatter.excerpt || extractExcerpt(content),
        content: content,
        heroImage: frontmatter.heroImage,
        author: frontmatter.author,
        tags: frontmatter.tags,
        featured: frontmatter.featured
      }

      essays.push(essay)
    } catch (error) {
      console.error(`Error parsing MDX file ${filename}:`, error)
    }
  }

  // Sort by publishDate if available, otherwise by date (newest first)
  const sorted = essays.sort((a, b) => {
    const dateA = new Date(a.publishDate || a.date).getTime()
    const dateB = new Date(b.publishDate || b.date).getTime()
    return dateB - dateA
  })

  // Update cache
  essaysCache = sorted
  cacheTimestamp = now

  return sorted
}

// Backwards compatibility alias
export const getMdxEssays = getAllEssays

/**
 * Get a single essay by slug
 */
export function getEssayBySlug(slug: string): Essay | undefined {
  return getAllEssays().find(essay => essay.slug === slug)
}

/**
 * Get essays filtered by category
 */
export function getEssaysByCategory(category: Essay['category']): Essay[] {
  return getAllEssays().filter(essay => essay.category === category)
}

// Backwards compatibility alias
export const getMdxEssayBySlug = getEssayBySlug
