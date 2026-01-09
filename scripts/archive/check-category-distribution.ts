#!/usr/bin/env npx tsx
/**
 * Check Category Distribution in Database
 * See how skills are actually categorized
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function checkCategories() {
  console.log('🔍 Analyzing Category Distribution\n')

  // Get all skills with their categories
  const { data: skills, error } = await supabase
    .from('skills')
    .select('id, slug, name, category_id, tags')
    .eq('status', 'published')
    .order('category_id')

  if (error) {
    console.error('❌ Error:', error)
    return
  }

  // Count by category
  const categoryCounts: Record<string, number> = {}
  const categoryExamples: Record<string, string[]> = {}

  skills.forEach(skill => {
    const cat = skill.category_id || 'null'
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1
    
    if (!categoryExamples[cat]) {
      categoryExamples[cat] = []
    }
    if (categoryExamples[cat].length < 5) {
      categoryExamples[cat].push(skill.slug)
    }
  })

  console.log('📊 Skills by Category:\n')
  Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`${cat}: ${count} skills`)
      console.log(`  Examples: ${categoryExamples[cat].join(', ')}`)
      console.log()
    })

  // Count agents vs skills
  const hasAgentTag = skills.filter(s => 
    s.tags && Array.isArray(s.tags) && s.tags.includes('agent')
  ).length
  
  const noAgentTag = skills.length - hasAgentTag

  console.log('='.repeat(60))
  console.log('📊 Summary')
  console.log('='.repeat(60))
  console.log(`Total skills: ${skills.length}`)
  console.log(`With 'agent' tag: ${hasAgentTag}`)
  console.log(`Without 'agent' tag (true skills): ${noAgentTag}`)
  console.log()
  console.log('Category Breakdown:')
  Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      const pct = ((count / skills.length) * 100).toFixed(1)
      console.log(`  ${cat}: ${count} (${pct}%)`)
    })
  console.log('='.repeat(60))
}

checkCategories()
  .then(() => {
    console.log('\n✅ Analysis complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Failed:', error)
    process.exit(1)
  })
