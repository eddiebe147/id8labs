import { NextResponse } from 'next/server'
import { getAllSkills, getAllCategories, getSkillCounts } from '@/lib/skills'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const skills = await getAllSkills()
    const categories = await getAllCategories()
    const counts = await getSkillCounts()
    
    // Check if tables exist
    const { error: skillsError } = await supabase.from('skills').select('count', { count: 'exact', head: true })
    const { error: catsError } = await supabase.from('skill_categories').select('count', { count: 'exact', head: true })

    return NextResponse.json({
      success: true,
      skillsCount: skills.length,
      categoriesCount: categories.length,
      counts,
      tablesCheck: {
        skills: !skillsError,
        categories: !catsError,
        skillsError: skillsError?.message,
        catsError: catsError?.message
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
