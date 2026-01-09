/**
 * Unified Writing Content Loader
 * 
 * Combines essays and newsletter issues into a single content feed
 */

import { getAllEssays, type Essay } from './essays'
import { getAllIssues, type NewsletterIssuePreview } from './newsletter/issues'

export type WritingCategory = 'essay' | 'research' | 'release' | 'newsletter'

export interface WritingItem {
  slug: string
  title: string
  subtitle?: string
  date: string
  category: WritingCategory
  readTime: string
  excerpt: string
  tags?: string[]
  featured?: boolean
  // Newsletter-specific fields
  issueNumber?: number
}

/**
 * Convert an essay to a writing item
 */
function essayToWritingItem(essay: Essay): WritingItem {
  return {
    slug: essay.slug,
    title: essay.title,
    subtitle: essay.subtitle,
    date: essay.date,
    category: essay.category,
    readTime: essay.readTime,
    excerpt: essay.excerpt,
    tags: essay.tags,
    featured: essay.featured,
  }
}

/**
 * Convert a newsletter issue to a writing item
 */
function newsletterToWritingItem(issue: NewsletterIssuePreview): WritingItem {
  return {
    slug: `newsletter/${issue.slug}`,
    title: issue.title,
    subtitle: issue.bigIdeaTitle,
    date: issue.date,
    category: 'newsletter',
    readTime: '5 min read',
    excerpt: issue.excerpt,
    tags: ['newsletter', 'signal:noise'],
    issueNumber: issue.issueNumber,
  }
}

/**
 * Get all writing content (essays + newsletters)
 */
export function getAllWriting(): WritingItem[] {
  const essays = getAllEssays().map(essayToWritingItem)
  const newsletters = getAllIssues().map(newsletterToWritingItem)
  
  // Combine and sort by date (newest first)
  const allContent = [...essays, ...newsletters]
  return allContent.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

/**
 * Get writing content filtered by category
 */
export function getWritingByCategory(category: WritingCategory): WritingItem[] {
  return getAllWriting().filter(item => item.category === category)
}

/**
 * Get a specific writing item by slug
 */
export function getWritingBySlug(slug: string): WritingItem | undefined {
  return getAllWriting().find(item => item.slug === slug)
}
