import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

interface SaveSkillRequest {
  name: string
  slug: string
  description: string
  category: string
  complexity: string
  version: string
  author: string
  license: string
  triggers: string[]
  tags: string[]
  content: string
  rawContent: string
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const supabase = await createClient()
    if (!supabase) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Please sign in to save skills' },
        { status: 401 }
      )
    }

    // Parse request body
    const body: SaveSkillRequest = await request.json()
    const {
      name,
      slug,
      description,
      category,
      complexity,
      version,
      author,
      license,
      triggers,
      tags,
      content,
      rawContent,
    } = body

    // Validate required fields
    if (!name || !slug || !description || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Ensure slug is unique by appending user-specific suffix
    const uniqueSlug = `${slug}-${user.id.slice(0, 8)}`

    // Check if slug already exists
    const { data: existingSkill } = await supabase
      .from('skills')
      .select('id')
      .eq('slug', uniqueSlug)
      .single()

    if (existingSkill) {
      // Update existing skill
      const { data: updatedSkill, error: updateError } = await supabase
        .from('skills')
        .update({
          name,
          description,
          category_id: category,
          complexity,
          version,
          author: `AI Generated (${user.email || 'User'})`,
          license,
          triggers,
          tags,
          content,
          readme: rawContent,
          status: 'draft',
          updated_at: new Date().toISOString(),
        })
        .eq('slug', uniqueSlug)
        .select('id')
        .single()

      if (updateError) {
        console.error('Update error:', updateError)
        return NextResponse.json(
          { error: 'Failed to update skill' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        skillId: updatedSkill.id,
        slug: uniqueSlug,
        message: 'Skill updated successfully',
      })
    }

    // Insert new skill
    const { data: newSkill, error: insertError } = await supabase
      .from('skills')
      .insert({
        name,
        slug: uniqueSlug,
        description,
        category_id: category,
        complexity,
        version,
        author: `AI Generated (${user.email || 'User'})`,
        license,
        triggers,
        tags,
        content,
        readme: rawContent,
        status: 'draft',
        validated: false,
        verified: false,
        featured: false,
        install_count: 0,
        view_count: 0,
        review_count: 0,
        avg_rating: 0,
      })
      .select('id')
      .single()

    if (insertError) {
      console.error('Insert error:', insertError)
      return NextResponse.json(
        { error: 'Failed to save skill' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      skillId: newSkill.id,
      slug: uniqueSlug,
      message: 'Skill saved successfully',
    })
  } catch (error) {
    console.error('Save skill error:', error)
    return NextResponse.json(
      { error: 'Failed to save skill. Please try again.' },
      { status: 500 }
    )
  }
}

// Get user's saved skills
export async function GET() {
  try {
    const supabase = await createClient()
    if (!supabase) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Please sign in to view your skills' },
        { status: 401 }
      )
    }

    // Get user's AI-generated skills (draft status, author contains their email)
    const { data: skills, error: fetchError } = await supabase
      .from('skills')
      .select('*')
      .eq('status', 'draft')
      .ilike('author', `%${user.email}%`)
      .order('created_at', { ascending: false })

    if (fetchError) {
      console.error('Fetch error:', fetchError)
      return NextResponse.json(
        { error: 'Failed to fetch skills' },
        { status: 500 }
      )
    }

    return NextResponse.json({ skills })
  } catch (error) {
    console.error('Get skills error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    )
  }
}
