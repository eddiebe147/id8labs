import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Lazy-load Supabase client
let supabase: SupabaseClient | null = null

function getSupabase() {
  if (!supabase) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase not configured')
    }

    supabase = createClient(supabaseUrl, supabaseServiceKey)
  }
  return supabase
}

// GitHub API types
interface GitHubCommit {
  sha: string
  commit: {
    message: string
    author: {
      date: string
    }
  }
  stats?: {
    additions: number
    deletions: number
  }
}

interface GitHubRepo {
  full_name: string
  language: string
  size: number
}

// Repos to track - all active ID8Labs projects
const TRACKED_REPOS = [
  // Core products
  { owner: 'eddiebelaval', repo: 'id8labs' },
  { owner: 'eddiebelaval', repo: 'id8composer-rebuild' },
  { owner: 'eddiebelaval', repo: 'Deepstack' },
  { owner: 'eddiebelaval', repo: 'milo' },
  { owner: 'eddiebelaval', repo: 'lexicon' },
  { owner: 'eddiebelaval', repo: 'llc-ops' },
  // Infrastructure
  { owner: 'eddiebelaval', repo: 'claude-settings' },
  { owner: 'eddiebelaval', repo: 'umami' },
  // AI Academy
  { owner: 'eddiebelaval', repo: 'ai-academy-anthropic' },
  { owner: 'eddiebelaval', repo: 'ai-academy-openai' },
  { owner: 'eddiebelaval', repo: 'ai-academy-huggingface' },
  { owner: 'eddiebelaval', repo: 'ai-academy-ms-genai' },
  { owner: 'eddiebelaval', repo: 'ai-academy-curriculum' },
  { owner: 'eddiebelaval', repo: 'ai-academy-frameworks' },
  { owner: 'eddiebelaval', repo: 'ai-academy-community' },
]

// Fetch commits from a repo
async function fetchRepoCommits(
  owner: string,
  repo: string,
  token: string
): Promise<GitHubCommit[]> {
  const commits: GitHubCommit[] = []
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
          console.log(`Repo ${owner}/${repo} not found or private`)
          return []
        }
        throw new Error(`GitHub API error: ${response.status}`)
      }

      const data = await response.json()
      if (!data.length) break

      commits.push(...data)
      if (data.length < perPage) break
      page++

      // Safety limit
      if (page > 20) break
    }
  } catch (error) {
    console.error(`Error fetching commits for ${owner}/${repo}:`, error)
  }

  return commits
}

// Count commits - all commits are Claude co-authored (we always work together)
function countClaudeCommits(commits: GitHubCommit[]): number {
  // Every commit is a collaboration - no filtering needed
  return commits.length
}

// Get first and last commit dates
function getCommitDateRange(commits: GitHubCommit[]): {
  first: string | null
  last: string | null
} {
  if (!commits.length) return { first: null, last: null }

  const dates = commits
    .map((c) => new Date(c.commit.author.date))
    .sort((a, b) => a.getTime() - b.getTime())

  return {
    first: dates[0].toISOString().split('T')[0],
    last: dates[dates.length - 1].toISOString().split('T')[0],
  }
}

// Fetch repo languages
async function fetchRepoLanguages(
  owner: string,
  repo: string,
  token: string
): Promise<Record<string, number>> {
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

// Calculate LOC from commit stats (simplified - uses repo size as proxy)
async function fetchRepoStats(
  owner: string,
  repo: string,
  token: string
): Promise<{ additions: number; deletions: number }> {
  try {
    // Get weekly commit activity for additions/deletions
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

    // Sum up all weekly stats [timestamp, additions, deletions]
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

// Main sync function
async function syncGitHubStats() {
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    throw new Error('GITHUB_TOKEN not configured')
  }

  let totalCommits = 0
  let claudeCommits = 0
  let totalAdditions = 0
  let totalDeletions = 0
  let firstCommitDate: string | null = null
  let lastCommitDate: string | null = null
  const languageBytes: Record<string, number> = {}

  // Aggregate stats from all tracked repos
  for (const { owner, repo } of TRACKED_REPOS) {
    // Fetch commits
    const commits = await fetchRepoCommits(owner, repo, token)
    totalCommits += commits.length
    claudeCommits += countClaudeCommits(commits)

    // Get date range
    const dates = getCommitDateRange(commits)
    if (dates.first) {
      if (!firstCommitDate || dates.first < firstCommitDate) {
        firstCommitDate = dates.first
      }
    }
    if (dates.last) {
      if (!lastCommitDate || dates.last > lastCommitDate) {
        lastCommitDate = dates.last
      }
    }

    // Get LOC stats
    const stats = await fetchRepoStats(owner, repo, token)
    totalAdditions += stats.additions
    totalDeletions += stats.deletions

    // Get languages
    const langs = await fetchRepoLanguages(owner, repo, token)
    for (const [lang, bytes] of Object.entries(langs)) {
      languageBytes[lang] = (languageBytes[lang] || 0) + bytes
    }

    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 100))
  }

  // Convert language bytes to percentages
  const totalBytes = Object.values(languageBytes).reduce((a, b) => a + b, 0)
  const languagePercentages: Record<string, number> = {}

  if (totalBytes > 0) {
    for (const [lang, bytes] of Object.entries(languageBytes)) {
      const pct = Math.round((bytes / totalBytes) * 100)
      if (pct >= 1) {
        languagePercentages[lang] = pct
      }
    }
  }

  const client = getSupabase()

  // First, get or create the stats row (singleton pattern)
  let { data: existingStats } = await client
    .from('claude_stats')
    .select('id')
    .limit(1)
    .single()

  // If no row exists, create one
  if (!existingStats) {
    const { data: newRow, error: insertError } = await client
      .from('claude_stats')
      .insert({
        commits_together: claudeCommits,
        lines_added: totalAdditions,
        lines_removed: totalDeletions,
        lines_of_code: totalAdditions,
        first_commit_date: firstCommitDate,
        last_commit_date: lastCommitDate,
        milestones_hit: 0,
        languages: languagePercentages,
        last_synced_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (insertError) throw insertError

    return {
      stats: newRow,
      meta: {
        total_commits_all_repos: totalCommits,
        claude_commits: claudeCommits,
        repos_scanned: TRACKED_REPOS.length,
        created: true,
      },
    }
  }

  // Build update object - only update LOC if we got valid data (GitHub API sometimes returns 0)
  const updateData: Record<string, unknown> = {
    commits_together: claudeCommits,
    first_commit_date: firstCommitDate,
    last_commit_date: lastCommitDate,
    languages: languagePercentages,
    last_synced_at: new Date().toISOString(),
  }

  // Only update LOC stats if GitHub returned non-zero values
  if (totalAdditions > 0) {
    updateData.lines_added = totalAdditions
    updateData.lines_of_code = totalAdditions
  }
  if (totalDeletions > 0) {
    updateData.lines_removed = totalDeletions
  }

  // Update the existing row with WHERE clause
  const { data, error } = await client
    .from('claude_stats')
    .update(updateData)
    .eq('id', existingStats.id)
    .select()
    .single()

  if (error) throw error

  return {
    stats: data,
    meta: {
      total_commits_all_repos: totalCommits,
      claude_commits: claudeCommits,
      repos_scanned: TRACKED_REPOS.length,
    },
  }
}

// GET - Manual sync trigger or fetch current stats
export async function GET() {
  try {
    const result = await syncGitHubStats()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error syncing GitHub stats:', error)
    return NextResponse.json(
      { error: 'Failed to sync GitHub stats', details: String(error) },
      { status: 500 }
    )
  }
}

// POST - Webhook handler for GitHub push events
export async function POST(request: Request) {
  try {
    // Verify GitHub webhook signature (optional but recommended)
    const signature = request.headers.get('x-hub-signature-256')
    const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET

    // If webhook secret is configured, verify signature
    if (webhookSecret && signature) {
      const body = await request.text()
      const crypto = await import('crypto')
      const expectedSignature =
        'sha256=' +
        crypto.createHmac('sha256', webhookSecret).update(body).digest('hex')

      if (signature !== expectedSignature) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }

      // Re-parse the body since we consumed it
      const payload = JSON.parse(body)

      // Only sync on push events
      if (payload.ref && payload.commits) {
        const result = await syncGitHubStats()
        return NextResponse.json({ synced: true, ...result })
      }
    } else {
      // No signature verification - just sync
      const result = await syncGitHubStats()
      return NextResponse.json({ synced: true, ...result })
    }

    return NextResponse.json({ message: 'Event received but not processed' })
  } catch (error) {
    console.error('Error handling webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed', details: String(error) },
      { status: 500 }
    )
  }
}
