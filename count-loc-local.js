#!/usr/bin/env node
/**
 * Count Lines of Code from local repos
 * Accurate count using native tools
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Map GitHub repos to local paths
const REPO_PATHS = [
  { name: 'id8labs', path: '/Users/eddiebelaval/Development/id8/id8labs' },
  { name: 'id8composer-rebuild', path: '/Users/eddiebelaval/Development/id8/id8composer-rebuild' },
  { name: 'deepstack', path: '/Users/eddiebelaval/Development/id8/products/deepstack' },
  { name: 'milo', path: '/Users/eddiebelaval/Development/id8/products/milo' },
  { name: 'lexicon', path: '/Users/eddiebelaval/Development/id8/lexicon' },
  { name: 'llc-ops', path: '/Users/eddiebelaval/Development/id8/tools/llc-ops' },
  { name: 'claude-settings', path: '/Users/eddiebelaval/Development/id8/tools/claude-settings' },
]

// File extensions to count by language
const LANGUAGE_EXTENSIONS = {
  TypeScript: ['.ts', '.tsx'],
  JavaScript: ['.js', '.jsx'],
  Python: ['.py'],
  MDX: ['.mdx'],
  CSS: ['.css', '.scss', '.sass'],
  HTML: ['.html'],
  JSON: ['.json'],
  Markdown: ['.md'],
}

function countLinesInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    return content.split('\n').length
  } catch {
    return 0
  }
}

function getLanguageFromExtension(ext) {
  for (const [lang, extensions] of Object.entries(LANGUAGE_EXTENSIONS)) {
    if (extensions.includes(ext)) {
      return lang
    }
  }
  return null
}

function walkDirectory(dir, stats, excludeDirs = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      // Skip common exclusions
      if (
        entry.name === 'node_modules' ||
        entry.name === '.next' ||
        entry.name === 'dist' ||
        entry.name === 'build' ||
        entry.name === '.git' ||
        entry.name === 'coverage' ||
        entry.name === '__pycache__' ||
        entry.name === '.cache' ||
        entry.name === 'out' ||
        excludeDirs.includes(entry.name)
      ) {
        continue
      }
      walkDirectory(fullPath, stats, excludeDirs)
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name)
      const lang = getLanguageFromExtension(ext)

      if (lang) {
        const lines = countLinesInFile(fullPath)
        stats.totalLines += lines
        stats.fileCount += 1
        stats.languageLines[lang] = (stats.languageLines[lang] || 0) + lines
        stats.languageFiles[lang] = (stats.languageFiles[lang] || 0) + 1
      }
    }
  }
}

function countRepoStats(repoPath) {
  const stats = {
    totalLines: 0,
    fileCount: 0,
    languageLines: {},
    languageFiles: {},
  }

  if (!fs.existsSync(repoPath)) {
    return stats
  }

  walkDirectory(repoPath, stats)
  return stats
}

function getGitStats(repoPath) {
  try {
    if (!fs.existsSync(path.join(repoPath, '.git'))) {
      return { commits: 0, firstCommit: null, lastCommit: null }
    }

    const commitCount = execSync('git rev-list --count HEAD', {
      cwd: repoPath,
      encoding: 'utf8',
    }).trim()

    const firstCommit = execSync('git log --reverse --format=%aI | head -1', {
      cwd: repoPath,
      encoding: 'utf8',
      shell: '/bin/bash'
    }).trim()

    const lastCommit = execSync('git log -1 --format=%aI', {
      cwd: repoPath,
      encoding: 'utf8',
    }).trim()

    return {
      commits: parseInt(commitCount, 10),
      firstCommit: firstCommit || null,
      lastCommit: lastCommit || null,
    }
  } catch {
    return { commits: 0, firstCommit: null, lastCommit: null }
  }
}

async function main() {
  console.log('📊 Counting Lines of Code from local repositories...\n')

  let totalLines = 0
  let totalFiles = 0
  let totalCommits = 0
  const aggregatedLanguages = {}
  let globalFirstCommit = null
  let globalLastCommit = null

  for (const { name, path: repoPath } of REPO_PATHS) {
    process.stdout.write(`📦 ${name}... `)

    if (!fs.existsSync(repoPath)) {
      console.log('❌ Not found')
      continue
    }

    const codeStats = countRepoStats(repoPath)
    const gitStats = getGitStats(repoPath)

    totalLines += codeStats.totalLines
    totalFiles += codeStats.fileCount
    totalCommits += gitStats.commits

    // Aggregate languages
    for (const [lang, lines] of Object.entries(codeStats.languageLines)) {
      aggregatedLanguages[lang] = (aggregatedLanguages[lang] || 0) + lines
    }

    // Track earliest and latest commits
    if (gitStats.firstCommit) {
      const firstDate = new Date(gitStats.firstCommit)
      if (!globalFirstCommit || firstDate < globalFirstCommit) {
        globalFirstCommit = firstDate
      }
    }

    if (gitStats.lastCommit) {
      const lastDate = new Date(gitStats.lastCommit)
      if (!globalLastCommit || lastDate > globalLastCommit) {
        globalLastCommit = lastDate
      }
    }

    console.log(
      `✓ ${codeStats.totalLines.toLocaleString()} lines, ${gitStats.commits} commits`
    )
  }

  // Calculate language percentages
  const totalLanguageLines = Object.values(aggregatedLanguages).reduce(
    (a, b) => a + b,
    0
  )
  const languagePercentages = {}

  for (const [lang, lines] of Object.entries(aggregatedLanguages)) {
    const percentage = Math.round((lines / totalLanguageLines) * 100)
    if (percentage >= 1) {
      languagePercentages[lang] = percentage
    }
  }

  console.log('\n📊 Aggregated Stats:')
  console.log(`   Total Lines: ${totalLines.toLocaleString()}`)
  console.log(`   Total Files: ${totalFiles.toLocaleString()}`)
  console.log(`   Total Commits: ${totalCommits.toLocaleString()}`)
  console.log(`   First Commit: ${globalFirstCommit?.toISOString().split('T')[0]}`)
  console.log(`   Last Commit: ${globalLastCommit?.toISOString().split('T')[0]}`)
  console.log('\n📝 Language Breakdown:')
  for (const [lang, lines] of Object.entries(aggregatedLanguages).sort(
    ([, a], [, b]) => b - a
  )) {
    console.log(`   ${lang}: ${lines.toLocaleString()} lines (${languagePercentages[lang] || 0}%)`)
  }

  console.log('\n💾 Updating Supabase...')

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase credentials not found')
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  // Get the stats row
  const { data: current, error: fetchError } = await supabase
    .from('claude_stats')
    .select('id')
    .limit(1)
    .single()

  if (fetchError || !current) {
    throw new Error('Stats row not found in database')
  }

  // Update with new stats
  const { error: updateError } = await supabase
    .from('claude_stats')
    .update({
      commits_together: totalCommits,
      lines_added: totalLines, // Using total lines as proxy for additions
      lines_removed: 0, // Not tracking deletions in this simplified count
      lines_of_code: totalLines,
      first_commit_date: globalFirstCommit?.toISOString(),
      last_commit_date: globalLastCommit?.toISOString(),
      languages: languagePercentages,
      last_synced_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', current.id)

  if (updateError) {
    throw updateError
  }

  console.log('✅ Stats updated successfully!\n')
  console.log('🌐 View live at: https://id8labs.io/claude-corner\n')
}

main().catch((error) => {
  console.error('\n❌ Error:', error.message)
  process.exit(1)
})
