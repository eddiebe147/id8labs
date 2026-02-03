#!/usr/bin/env node
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  const { data, error } = await supabase
    .from('claude_stats')
    .select('*')
    .single()

  if (error) {
    console.error('Error:', error)
    return
  }

  console.log('\n📊 Current Stats in Database:\n')
  console.log(`Commits: ${data.commits_together}`)
  console.log(`Lines Added: ${data.lines_added?.toLocaleString() || 0}`)
  console.log(`Lines Removed: ${data.lines_removed?.toLocaleString() || 0}`)
  console.log(`Net LOC: ${data.lines_of_code?.toLocaleString() || 0}`)
  console.log(`Projects Shipped: ${data.projects_shipped}`)
  console.log(`Milestones: ${data.milestones_hit}`)
  console.log(`First Commit: ${data.first_commit_date}`)
  console.log(`Last Commit: ${data.last_commit_date}`)
  console.log(`Languages:`, data.languages)
  console.log(`\nQuality Metrics:`)
  console.log(`  Tests Written: ${data.tests_written || 0}`)
  console.log(`  Builds Succeeded: ${data.builds_succeeded || 0}%`)
  console.log(`  Bugs Fixed: ${data.bugs_fixed || 0}`)
  console.log(`\nUsage Stats:`)
  console.log(`  Sessions: ${data.sessions_count || 0}`)
  console.log(`  Hours Collaborated: ${data.hours_collaborated || 0}`)
  console.log(`  Agents Used:`, Object.keys(data.agents_used || {}).length)
  console.log(`  Skills Used:`, Object.keys(data.skills_used || {}).length)
  console.log(`  MCP Servers:`, Object.keys(data.mcp_used || {}).length)
  console.log(`\nLast Synced: ${data.last_synced_at}`)
  console.log(`\n`)
  
  console.log('Full data:', JSON.stringify(data, null, 2))
}

main()
