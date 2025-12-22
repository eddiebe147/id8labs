import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Lazy-load Supabase client to avoid build-time errors
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

// GET - Fetch all observations
export async function GET() {
  try {
    const client = getSupabase()
    const { data, error } = await client
      .from('claude_observations')
      .select('*')
      .order('date', { ascending: false })

    if (error) throw error

    return NextResponse.json({ observations: data })
  } catch (error) {
    console.error('Error fetching observations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch observations' },
      { status: 500 }
    )
  }
}

// POST - Add a new observation (requires API key)
export async function POST(request: Request) {
  try {
    // Simple API key auth for Claude to add observations
    const authHeader = request.headers.get('authorization')
    const apiKey = process.env.CLAUDE_OBSERVATIONS_API_KEY

    if (!apiKey || authHeader !== `Bearer ${apiKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { text, category = 'observation', date } = body

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    const client = getSupabase()
    const { data, error } = await client
      .from('claude_observations')
      .insert({
        text,
        category,
        date: date || new Date().toISOString().split('T')[0],
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ observation: data })
  } catch (error) {
    console.error('Error adding observation:', error)
    return NextResponse.json(
      { error: 'Failed to add observation' },
      { status: 500 }
    )
  }
}
