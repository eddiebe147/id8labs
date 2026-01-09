/**
 * Newsletter Issues Management
 *
 * Handles fetching and managing newsletter issues for the archive page.
 * Issues are stored in lib/email/templates/newsletter-template.ts
 * and can also be loaded from content/newsletter MDX files.
 */

import { NEWSLETTER_ISSUE_1, NEWSLETTER_ISSUE_2, type NewsletterIssue } from '@/lib/email/templates/newsletter-template'

export interface NewsletterIssuePreview {
  slug: string
  issueNumber: number
  title: string
  date: string
  excerpt: string
  bigIdeaTitle: string
}

// All defined issues (add new issues here)
const ALL_ISSUES: NewsletterIssue[] = [
  NEWSLETTER_ISSUE_1,
  NEWSLETTER_ISSUE_2,
]

/**
 * Convert a full issue to a preview for listing
 */
function issueToPreview(issue: NewsletterIssue): NewsletterIssuePreview {
  return {
    slug: `issue-${issue.issueNumber}`,
    issueNumber: issue.issueNumber,
    title: issue.subject,
    date: issue.date,
    excerpt: issue.bigIdea.content.substring(0, 200).replace(/<[^>]*>/g, '').trim() + '...',
    bigIdeaTitle: issue.bigIdea.title,
  }
}

/**
 * Get all published newsletter issues
 */
export function getAllIssues(): NewsletterIssuePreview[] {
  return ALL_ISSUES
    .sort((a, b) => b.issueNumber - a.issueNumber)
    .map(issueToPreview)
}

/**
 * Get a specific issue by slug
 */
export function getIssueBySlug(slug: string): NewsletterIssue | null {
  const match = slug.match(/^issue-(\d+)$/)
  if (!match) return null

  const issueNumber = parseInt(match[1], 10)
  return ALL_ISSUES.find(i => i.issueNumber === issueNumber) || null
}

/**
 * Get the latest issue
 */
export function getLatestIssue(): NewsletterIssue | null {
  if (ALL_ISSUES.length === 0) return null
  return ALL_ISSUES.reduce((latest, current) =>
    current.issueNumber > latest.issueNumber ? current : latest
  )
}

/**
 * Get total number of published issues
 */
export function getIssueCount(): number {
  return ALL_ISSUES.length
}

// Re-export types
export type { NewsletterIssue } from '@/lib/email/templates/newsletter-template'
