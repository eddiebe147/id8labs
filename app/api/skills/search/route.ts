import { NextRequest, NextResponse } from 'next/server'
import { searchSkills } from '@/lib/skills'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')
  const limit = parseInt(searchParams.get('limit') || '10', 10)

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ skills: [] })
  }

  try {
    const skills = await searchSkills(query.trim(), Math.min(limit, 50))
    return NextResponse.json({ skills })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ skills: [], error: 'Search failed' }, { status: 500 })
  }
}
