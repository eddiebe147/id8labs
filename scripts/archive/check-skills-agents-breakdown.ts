#!/usr/bin/env npx tsx
/**
 * Check Skills vs Agents Breakdown
 * Analyze how items are categorized
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function checkBreakdown() {
  console.log('🔍 Analyzing Skills vs Agents Breakdown\n')

  // Get all published skills
  const { data: allSkills, error } = await supabase
    .from('skills')
    .select('id, slug, name, tags')
    .eq('status', 'published')
    .order('slug')

  if (error) {
    console.error('❌ Error:', error)
    return
  }

  console.log(`📊 Total published items: ${allSkills.length}\n`)

  // Categorize by tags
  const hasAgentTag = allSkills.filter(s => 
    s.tags && Array.isArray(s.tags) && s.tags.includes('agent')
  )
  
  const noAgentTag = allSkills.filter(s => 
    !s.tags || !Array.isArray(s.tags) || !s.tags.includes('agent')
  )

  const hasAgentInSlug = allSkills.filter(s => s.slug.startsWith('agent-'))
  const noAgentInSlug = allSkills.filter(s => !s.slug.startsWith('agent-'))

  console.log('By Tags:')
  console.log(`  Items WITH 'agent' tag:     ${hasAgentTag.length}`)
  console.log(`  Items WITHOUT 'agent' tag:  ${noAgentTag.length}`)
  console.log(`  Total:                      ${hasAgentTag.length + noAgentTag.length}\n`)

  console.log('By Slug Prefix:')
  console.log(`  Slugs starting with 'agent-': ${hasAgentInSlug.length}`)
  console.log(`  Slugs NOT starting with 'agent-': ${noAgentInSlug.length}`)
  console.log(`  Total:                        ${hasAgentInSlug.length + noAgentInSlug.length}\n`)

  // Check for items with agent- prefix but no agent tag
  const agentSlugNoTag = allSkills.filter(s => 
    s.slug.startsWith('agent-') && 
    (!s.tags || !Array.isArray(s.tags) || !s.tags.includes('agent'))
  )

  if (agentSlugNoTag.length > 0) {
    console.log(`⚠️  Found ${agentSlugNoTag.length} items with 'agent-' prefix but NO 'agent' tag:\n`)
    agentSlugNoTag.slice(0, 10).forEach(s => {
      console.log(`  - ${s.slug}: tags = ${JSON.stringify(s.tags || [])}`)
    })
    if (agentSlugNoTag.length > 10) {
      console.log(`  ... and ${agentSlugNoTag.length - 10} more`)
    }
    console.log()
  }

  // Check for items with agent tag but no agent- prefix
  const agentTagNoSlug = allSkills.filter(s => 
    s.tags && Array.isArray(s.tags) && s.tags.includes('agent') &&
    !s.slug.startsWith('agent-')
  )

  if (agentTagNoSlug.length > 0) {
    console.log(`⚠️  Found ${agentTagNoSlug.length} items WITH 'agent' tag but no 'agent-' prefix:\n`)
    agentTagNoSlug.forEach(s => {
      console.log(`  - ${s.slug}`)
    })
    console.log()
  }

  console.log('='.repeat(60))
  console.log('📊 Summary')
  console.log('='.repeat(60))
  console.log(`Total items:                  ${allSkills.length}`)
  console.log(`Items with 'agent' tag:       ${hasAgentTag.length}`)
  console.log(`Items without 'agent' tag:    ${noAgentTag.length}`)
  console.log(`\nAgent prefix count:           ${hasAgentInSlug.length}`)
  console.log(`Non-agent prefix count:       ${noAgentInSlug.length}`)
  console.log(`\nMismatch (agent- but no tag): ${agentSlugNoTag.length}`)
  console.log('='.repeat(60))
}

checkBreakdown()
  .then(() => {
    console.log('\n✅ Analysis complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Analysis failed:', error)
    process.exit(1)
  })
