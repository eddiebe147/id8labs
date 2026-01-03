import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { cachedJsonResponse, CachePresets, withCache } from '@/lib/cache'

// Lazy-load Supabase clients
let supabaseAnon: SupabaseClient | null = null
let supabaseService: SupabaseClient | null = null

function getSupabaseAnon() {
  if (!supabaseAnon) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase not configured')
    }

    supabaseAnon = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseAnon
}

function getSupabaseService() {
  if (!supabaseService) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase service role not configured')
    }

    supabaseService = createClient(supabaseUrl, supabaseServiceKey)
  }
  return supabaseService
}

// GET - Fetch current stats (no sync) - uses anon key for public read access
// Optimized with edge caching and in-memory cache
export async function GET() {
  try {
    // Use in-memory cache for 30s to reduce DB calls during high traffic
    const stats = await withCache('claude-stats', async () => {
      const client = getSupabaseAnon()
      const { data, error } = await client
        .from('claude_stats')
        .select('*')
        .single()

      if (error) throw error
      return data
    }, 30000) // 30 second TTL

    // Calculate derived stats
    const firstCommit = stats.first_commit_date
      ? new Date(stats.first_commit_date)
      : null
    const now = new Date()
    const monthsBuilding = firstCommit
      ? Math.ceil(
          (now.getTime() - firstCommit.getTime()) / (1000 * 60 * 60 * 24 * 30)
        )
      : 0

    const sessionUptime = firstCommit
      ? Math.ceil(
          (now.getTime() - firstCommit.getTime()) / (1000 * 60 * 60 * 24)
        )
      : 0

    // Return with CDN cache headers (30s cache, 60s stale-while-revalidate)
    return cachedJsonResponse({
      stats: {
        ...stats,
        months_building: monthsBuilding,
        session_uptime_days: sessionUptime,
      },
    }, 'STATS')
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}

// POST - Increment stats (tools, agents, skills, MCP, quality) - uses service role for write access
export async function POST(request: Request) {
  try {
    // Simple API key auth
    const authHeader = request.headers.get('authorization')
    const apiKey = process.env.CLAUDE_STATS_API_KEY

    if (!apiKey || authHeader !== `Bearer ${apiKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { type = 'tool', name, tool, increment = 1 } = body

    // Support legacy 'tool' param or new 'name' param
    const itemName = name || tool

    const client = getSupabaseService()

    // Fetch current stats
    const { data: current, error: fetchError } = await client
      .from('claude_stats')
      .select('*')
      .limit(1)
      .single()

    if (fetchError) {
      console.error('Fetch error:', fetchError)
      throw fetchError
    }

    if (!current) {
      throw new Error('No stats row found')
    }

    const record = current as Record<string, unknown>
    let updatePayload: Record<string, unknown> = { updated_at: new Date().toISOString() }

    switch (type) {
      case 'tool': {
        // Legacy tool increment (bash, read, edit, write)
        if (!itemName || !['bash', 'read', 'edit', 'write'].includes(itemName)) {
          return NextResponse.json(
            { error: 'Invalid tool. Must be: bash, read, edit, or write' },
            { status: 400 }
          )
        }
        const column = `tool_${itemName}`
        const currentValue = (record[column] as number) || 0
        updatePayload[column] = currentValue + increment
        break
      }

      case 'agent': {
        // Increment agent usage in JSONB
        if (!itemName) {
          return NextResponse.json({ error: 'Agent name required' }, { status: 400 })
        }
        const agentsUsed = (record.agents_used as Record<string, number>) || {}
        agentsUsed[itemName] = (agentsUsed[itemName] || 0) + increment
        updatePayload.agents_used = agentsUsed
        break
      }

      case 'skill': {
        // Increment skill usage in JSONB
        if (!itemName) {
          return NextResponse.json({ error: 'Skill name required' }, { status: 400 })
        }
        const skillsUsed = (record.skills_used as Record<string, number>) || {}
        skillsUsed[itemName] = (skillsUsed[itemName] || 0) + increment
        updatePayload.skills_used = skillsUsed
        break
      }

      case 'mcp': {
        // Increment MCP server usage in JSONB
        if (!itemName) {
          return NextResponse.json({ error: 'MCP server name required' }, { status: 400 })
        }
        const mcpUsed = (record.mcp_used as Record<string, number>) || {}
        mcpUsed[itemName] = (mcpUsed[itemName] || 0) + increment
        updatePayload.mcp_used = mcpUsed
        break
      }

      case 'session': {
        // Increment session count
        const currentSessions = (record.sessions_count as number) || 0
        updatePayload.sessions_count = currentSessions + increment
        break
      }

      case 'quality': {
        // Increment quality metric (tests_written, builds_succeeded, bugs_fixed)
        if (!itemName || !['tests_written', 'builds_succeeded', 'bugs_fixed'].includes(itemName)) {
          return NextResponse.json(
            { error: 'Invalid quality metric. Must be: tests_written, builds_succeeded, or bugs_fixed' },
            { status: 400 }
          )
        }
        const currentValue = (record[itemName] as number) || 0
        updatePayload[itemName] = currentValue + increment
        break
      }

      default:
        return NextResponse.json(
          { error: 'Invalid type. Must be: tool, agent, skill, mcp, session, or quality' },
          { status: 400 }
        )
    }

    // Update the stats
    const { error: updateError } = await client
      .from('claude_stats')
      .update(updatePayload)
      .eq('id', record.id as string)

    if (updateError) {
      console.error('Update error:', updateError)
      throw updateError
    }

    return NextResponse.json({ success: true, type, name: itemName, increment })
  } catch (error) {
    console.error('Error updating stats:', error)
    return NextResponse.json(
      { error: 'Failed to update stats' },
      { status: 500 }
    )
  }
}
