/**
 * Essay Frontmatter Validator
 *
 * Scans all MDX files in content/essays/ and validates frontmatter
 * against the required schema. Catches common mistakes like wrong
 * field names (publishedAt vs date) before they hit production.
 *
 * Run: npx tsx scripts/validate-essays.ts
 * Or:  npm run validate:essays
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const ESSAYS_DIR = path.join(process.cwd(), 'content', 'essays')

const REQUIRED_FIELDS = ['title', 'date'] as const
const RECOMMENDED_FIELDS = ['category', 'excerpt', 'tags'] as const
const VALID_CATEGORIES = ['essay', 'research', 'release'] as const

// Known wrong field names → correct field names
// severity: 'error' = breaks the site (wrong date displayed), 'warn' = non-standard but auto-corrected
const KNOWN_ALIASES: Record<string, { canonical: string; severity: 'error' | 'warn' }> = {
  publishedAt: { canonical: 'date', severity: 'error' },
  published_at: { canonical: 'date', severity: 'error' },
  createdAt: { canonical: 'date', severity: 'error' },
  created_at: { canonical: 'date', severity: 'error' },
  description: { canonical: 'excerpt', severity: 'warn' },
  summary: { canonical: 'excerpt', severity: 'warn' },
  abstract: { canonical: 'excerpt', severity: 'warn' },
  readingTime: { canonical: 'readTime', severity: 'warn' },
  reading_time: { canonical: 'readTime', severity: 'warn' },
  image: { canonical: 'heroImage', severity: 'warn' },
  cover: { canonical: 'heroImage', severity: 'warn' },
  coverImage: { canonical: 'heroImage', severity: 'warn' },
}

interface ValidationResult {
  file: string
  errors: string[]
  warnings: string[]
}

function validateFile(filename: string): ValidationResult {
  const filePath = path.join(ESSAYS_DIR, filename)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data: frontmatter } = matter(fileContents) as { data: Record<string, any>; content: string }

  const errors: string[] = []
  const warnings: string[] = []

  // Check for aliased fields
  for (const [alias, mapping] of Object.entries(KNOWN_ALIASES)) {
    if (frontmatter[alias] !== undefined) {
      if (frontmatter[mapping.canonical] === undefined) {
        const msg = `Uses "${alias}" instead of "${mapping.canonical}" — rename to "${mapping.canonical}"`
        if (mapping.severity === 'error') {
          errors.push(msg + ' (causes wrong date on the site)')
        } else {
          warnings.push(msg + ' (auto-corrected at runtime but should be fixed)')
        }
      } else {
        warnings.push(
          `Has both "${alias}" and "${mapping.canonical}" — "${alias}" is ignored, remove it`
        )
      }
    }
  }

  // Check required fields
  for (const field of REQUIRED_FIELDS) {
    if (!frontmatter[field]) {
      errors.push(`Missing required field: ${field}`)
    }
  }

  // Validate date format
  if (frontmatter.date) {
    const dateStr = String(frontmatter.date)
    // gray-matter auto-parses YYYY-MM-DD into Date objects, so string dates
    // that don't match the pattern are genuinely malformed
    if (typeof frontmatter.date === 'string' && !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      warnings.push(
        `Date "${dateStr}" should be YYYY-MM-DD format (e.g., "2026-02-08")`
      )
    }
  }

  // Validate category
  if (frontmatter.category) {
    if (!VALID_CATEGORIES.includes(frontmatter.category)) {
      errors.push(
        `Invalid category "${frontmatter.category}" — must be one of: ${VALID_CATEGORIES.join(', ')}`
      )
    }
  }

  // Check recommended fields
  for (const field of RECOMMENDED_FIELDS) {
    if (!frontmatter[field]) {
      warnings.push(`Missing recommended field: ${field}`)
    }
  }

  // Validate tags is an array
  if (frontmatter.tags && !Array.isArray(frontmatter.tags)) {
    errors.push('Tags must be an array (e.g., ["AI", "Claude Code"])')
  }

  return { file: filename, errors, warnings }
}

function main() {
  if (!fs.existsSync(ESSAYS_DIR)) {
    console.error(`Essays directory not found: ${ESSAYS_DIR}`)
    process.exit(1)
  }

  const files = fs.readdirSync(ESSAYS_DIR).filter(
    f => f.endsWith('.mdx') || f.endsWith('.md')
  )

  console.log(`\nValidating ${files.length} essay files...\n`)

  let totalErrors = 0
  let totalWarnings = 0
  const results: ValidationResult[] = []

  for (const file of files) {
    try {
      const result = validateFile(file)
      results.push(result)
      totalErrors += result.errors.length
      totalWarnings += result.warnings.length
    } catch (err) {
      console.error(`Failed to parse ${file}:`, err)
      totalErrors++
    }
  }

  // Print results — only files with issues
  const issues = results.filter(r => r.errors.length > 0 || r.warnings.length > 0)

  if (issues.length === 0) {
    console.log(`All ${files.length} essays passed validation.\n`)
    process.exit(0)
  }

  for (const result of issues) {
    console.log(`--- ${result.file} ---`)
    for (const error of result.errors) {
      console.error(`  ERROR: ${error}`)
    }
    for (const warning of result.warnings) {
      console.warn(`  WARN:  ${warning}`)
    }
    console.log('')
  }

  console.log(
    `\nSummary: ${totalErrors} error(s), ${totalWarnings} warning(s) across ${issues.length} file(s)\n`
  )

  if (totalErrors > 0) {
    console.error(
      'Required frontmatter schema:\n' +
      '  title: string (required)\n' +
      '  date: "YYYY-MM-DD" (required)\n' +
      '  category: "essay" | "research" | "release" (recommended)\n' +
      '  excerpt: string (recommended)\n' +
      '  tags: string[] (recommended)\n' +
      '  readTime: string (auto-calculated if missing)\n' +
      '  subtitle: string (optional)\n' +
      '  featured: boolean (optional)\n'
    )
    process.exit(1)
  }

  // Warnings only — exit cleanly
  process.exit(0)
}

main()
