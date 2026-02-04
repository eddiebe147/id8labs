#!/usr/bin/env node
/**
 * Sync Claude stats from GitHub - Direct execution
 * Run: node sync-stats-now.js
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const TRACKED_REPOS = [
  { owner: 'eddiebelaval', repo: 'id8labs' },
  { owner: 'eddiebelaval', repo: 'id8composer-rebuild' },
  { owner: 'eddiebelaval', repo: 'Deepstack' },
  { owner: 'eddiebelaval', repo: 'milo' },
  { owner: 'eddiebelaval', repo: 'lexicon' },
  { owner: 'eddiebelaval', repo: 'llc-ops' },
  { owner: 'eddiebelaval', repo: 'claude-settings' },
  { owner: 'eddiebelaval', repo: 'umami' },
  { owner: 'eddiebelaval', repo: 'ai-academy-anthropic' },
  { owner: 'eddiebelaval', repo: 'ai-academy-openai' },
  { owner: 'eddiebelaval', repo: 'ai-academy-huggingface' },
  { owner: 'eddiebelaval', repo: 'ai-academy-ms-genai' },
  { owner: 'eddiebelaval', repo: 'ai-academy-curriculum' },
  { owner: 'eddiebelaval', repo: 'ai-academy-frameworks' },
  { owner: 'eddiebelaval', repo: 'ai-academy-community' },
]

async function fetchRepoCommits(owner, repo, token) {
  const commits = []
  let page = 1
  const perPage = 100

  try {
    while (true) {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/commits?per_page=${perPage}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      )

      if (!response.ok) {
        if (response.status === 404) {
          console.log(`  ⚠️  Repo not found: ${owner}/${repo}`)
          return []
        }
        break
      }

      const data = await response.json()
      if (!Array.isArray(data) || data.length === 0) break

      commits.push(...data)

      if (data.length < perPage) break
      page++
    }

    return commits
  } catch (error) {
    console.error(`  ❌ Error fetching ${owner}/${repo}:`, error.message)
    return []
  }
}

async function fetchRepoStats(owner, repo, token) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/stats/code_frequency`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    )

    if (!response.ok) return { additions: 0, deletions: 0 }

    const data = await response.json()
    if (!Array.isArray(data)) return { additions: 0, deletions: 0 }

    let additions = 0
    let deletions = 0

    for (const week of data) {
      if (Array.isArray(week) && week.length >= 3) {
        additions += week[1] || 0
        deletions += Math.abs(week[2] || 0)
      }
    }

    return { additions, deletions }
  } catch {
    return { additions: 0, deletions: 0 }
  }
}

async function fetchRepoLanguages(owner, repo, token) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/languages`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    )

    if (!response.ok) return {}
    return await response.json()
  } catch {
    return {}
  }
}

async function syncGitHubStats() {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    throw new Error('GITHUB_TOKEN not found in environment')
  }

  console.log('🔄 Syncing GitHub stats...\n')

  let totalCommits = 0
  let totalAdditions = 0
  let totalDeletions = 0
  let firstCommitDate = null
  let lastCommitDate = null
  const allLanguages = {}

  for (const { owner, repo } of TRACKED_REPOS) {
    process.stdout.write(`📦 ${owner}/${repo}... `)

    const [commits, stats, languages] = await Promise.all([
      fetchRepoCommits(owner, repo, token),
      fetchRepoStats(owner, repo, token),
      fetchRepoLanguages(owner, repo, token),
    ])

    totalCommits += commits.length
    totalAdditions += stats.additions
    totalDeletions += stats.deletions

    // Track first and last commit dates
    if (commits.length > 0) {
      const repoFirstCommit = new Date(
        commits[commits.length - 1].commit.author.date
      )
      const repoLastCommit = new Date(commits[0].commit.author.date)

      if (!firstCommitDate || repoFirstCommit < firstCommitDate) {
        firstCommitDate = repoFirstCommit
      }
      if (!lastCommitDate || repoLastCommit > lastCommitDate) {
        lastCommitDate = repoLastCommit
      }
    }

    // Aggregate languages
    for (const [lang, bytes] of Object.entries(languages)) {
      allLanguages[lang] = (allLanguages[lang] || 0) + bytes
    }

    console.log(`✓ ${commits.length} commits, +${stats.additions}/-${stats.deletions}`)
  }

  // Calculate language percentages
  const totalBytes = Object.values(allLanguages).reduce((a, b) => a + b, 0)
  const languagePercentages = {}

  for (const [lang, bytes] of Object.entries(allLanguages)) {
    const percentage = Math.round((bytes / totalBytes) * 100)
    if (percentage >= 1) {
      languagePercentages[lang] = percentage
    }
  }

  const linesOfCode = totalAdditions - totalDeletions

  console.log('\n📊 Aggregated Stats:')
  console.log(`   Commits: ${totalCommits}`)
  console.log(`   Lines Added: ${totalAdditions.toLocaleString()}`)
  console.log(`   Lines Removed: ${totalDeletions.toLocaleString()}`)
  console.log(`   Net LOC: ${linesOfCode.toLocaleString()}`)
  console.log(`   First Commit: ${firstCommitDate?.toISOString().split('T')[0]}`)
  console.log(`   Last Commit: ${lastCommitDate?.toISOString().split('T')[0]}`)
  console.log(`   Languages: ${Object.keys(languagePercentages).join(', ')}`)

  return {
    commits_together: totalCommits,
    lines_added: totalAdditions,
    lines_removed: totalDeletions,
    lines_of_code: linesOfCode,
    first_commit_date: firstCommitDate?.toISOString(),
    last_commit_date: lastCommitDate?.toISOString(),
    languages: languagePercentages,
    last_synced_at: new Date().toISOString(),
  }
}

async function main() {
  try {
    const stats = await syncGitHubStats()

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
        ...stats,
        updated_at: new Date().toISOString(),
      })
      .eq('id', current.id)

    if (updateError) {
      throw updateError
    }

    console.log('✅ Stats updated successfully!\n')
  } catch (error) {
    console.error('\n❌ Sync failed:', error.message)
    process.exit(1)
  }
}

main()
