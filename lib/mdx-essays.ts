import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface MdxEssay {
  slug: string
  title: string
  subtitle?: string
  date: string
  category: 'research' | 'release' | 'essay'
  readTime: string
  excerpt: string
  content: string
  heroImage?: string
  author?: string
  tags?: string[]
  featured?: boolean
}

const ESSAYS_DIR = path.join(process.cwd(), 'content', 'essays')

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
 * Get all MDX essays from the content/essays directory
 */
export function getMdxEssays(): MdxEssay[] {
  // Check if directory exists
  if (!fs.existsSync(ESSAYS_DIR)) {
    console.warn(`Essays directory not found: ${ESSAYS_DIR}`)
    return []
  }

  const files = fs.readdirSync(ESSAYS_DIR)
  const mdxFiles = files.filter(file => file.endsWith('.mdx') || file.endsWith('.md'))

  const essays: MdxEssay[] = []

  for (const filename of mdxFiles) {
    try {
      const filePath = path.join(ESSAYS_DIR, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')

      const { data: frontmatter, content } = matter(fileContents)

      // Generate slug from filename (remove extension)
      const slug = filename.replace(/\.(mdx|md)$/, '')

      // Map frontmatter to Essay interface
      const essay: MdxEssay = {
        slug,
        title: frontmatter.title || 'Untitled',
        subtitle: frontmatter.subtitle,
        date: frontmatter.date || new Date().toISOString().split('T')[0],
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

  // Sort by date (newest first)
  return essays.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

/**
 * Get a single MDX essay by slug
 */
export function getMdxEssayBySlug(slug: string): MdxEssay | undefined {
  const essays = getMdxEssays()
  return essays.find(essay => essay.slug === slug)
}
