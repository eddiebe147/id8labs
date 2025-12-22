import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

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
export async function GET() {
  try {
    const client = getSupabaseAnon()
    const { data, error } = await client
      .from('claude_stats')
      .select('*')
      .single()

    if (error) throw error

    // Calculate derived stats
    const firstCommit = data.first_commit_date
      ? new Date(data.first_commit_date)
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

    return NextResponse.json({
      stats: {
        ...data,
        months_building: monthsBuilding,
        session_uptime_days: sessionUptime,
      },
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}

// POST - Increment tool usage (for hooks) - uses service role for write access
export async function POST(request: Request) {
  try {
    // Simple API key auth
    const authHeader = request.headers.get('authorization')
    const apiKey = process.env.CLAUDE_STATS_API_KEY

    if (!apiKey || authHeader !== `Bearer ${apiKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { tool, increment = 1 } = body

    if (!tool || !['bash', 'read', 'edit', 'write'].includes(tool)) {
      return NextResponse.json(
        { error: 'Invalid tool. Must be: bash, read, edit, or write' },
        { status: 400 }
      )
    }

    const client = getSupabaseService()
    const column = `tool_${tool}`

    // Use raw SQL for atomic increment
    const { data, error } = await client.rpc('increment_tool_usage', {
      tool_column: column,
      increment_by: increment,
    })

    if (error) {
      // Fallback: fetch and update
      const { data: current } = await client
        .from('claude_stats')
        .select(column)
        .single()

      if (current) {
        const { data: updated, error: updateError } = await client
          .from('claude_stats')
          .update({ [column]: (current[column] || 0) + increment })
          .select()
          .single()

        if (updateError) throw updateError
        return NextResponse.json({ stats: updated })
      }
      throw error
    }

    return NextResponse.json({ success: true, tool, increment })
  } catch (error) {
    console.error('Error updating tool usage:', error)
    return NextResponse.json(
      { error: 'Failed to update tool usage' },
      { status: 500 }
    )
  }
}
