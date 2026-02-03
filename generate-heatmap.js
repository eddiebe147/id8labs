#!/usr/bin/env node
/**
 * Generate activity heatmap from real git history
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const repos = [
  '/Users/eddiebelaval/Development/id8/id8labs',
  '/Users/eddiebelaval/Development/id8/id8composer-rebuild',
  '/Users/eddiebelaval/Development/id8/products/deepstack',
  '/Users/eddiebelaval/Development/id8/products/milo',
  '/Users/eddiebelaval/Development/id8/lexicon',
  '/Users/eddiebelaval/Development/id8/tools/llc-ops',
  '/Users/eddiebelaval/Development/id8/tools/claude-settings',
]

function generateActivityHeatmap() {
  console.log('📅 Generating activity heatmap from git history...\n')

  const startDate = new Date('2025-10-13') // First commit
  const endDate = new Date()
  
  // Create a map of dates to commit counts
  const commitsByDate = {}

  for (const repoPath of repos) {
    if (!fs.existsSync(path.join(repoPath, '.git'))) {
      console.log(`  ⚠️  Skipping ${path.basename(repoPath)} (no .git)`)
      continue
    }

    try {
      const log = execSync(
        `git log --since="${startDate.toISOString()}" --until="${endDate.toISOString()}" --format="%aI" --all`,
        { cwd: repoPath, encoding: 'utf8' }
      ).trim()

      if (!log) continue

      const dates = log.split('\n')
      dates.forEach(dateStr => {
        const date = new Date(dateStr).toISOString().split('T')[0]
        commitsByDate[date] = (commitsByDate[date] || 0) + 1
      })

      console.log(`  ✓ ${path.basename(repoPath)}: ${dates.length} commits`)
    } catch (err) {
      console.log(`  ⚠️  Could not read git log for ${path.basename(repoPath)}`)
    }
  }

  console.log(`\n📊 Total days with commits: ${Object.keys(commitsByDate).length}`)

  // Convert to weekly format (Sunday-Saturday)
  const weeks = []
  let currentDate = new Date(startDate)
  
  // Start from the first Sunday before or on the start date
  while (currentDate.getDay() !== 0) {
    currentDate.setDate(currentDate.getDate() - 1)
  }

  let currentWeek = []
  const actualStartDate = new Date(startDate)

  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0]
    
    // Only count commits on or after the actual start date
    const commits = currentDate >= actualStartDate ? (commitsByDate[dateStr] || 0) : 0
    
    currentWeek.push(commits)
    
    if (currentWeek.length === 7) {
      weeks.push([...currentWeek])
      currentWeek = []
    }

    currentDate.setDate(currentDate.getDate() + 1)
  }

  // Handle last partial week
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(0)
    weeks.push(currentWeek)
  }

  console.log(`\n📅 Generated ${weeks.length} weeks of activity data\n`)

  // Print formatted array for easy copy-paste
  console.log('const activityData = [')
  weeks.forEach((week, i) => {
    const weekStr = `  [${week.join(', ')}]`
    const comment = i === 0 ? ' // Oct week 1' : 
                    i === weeks.length - 1 ? ' // Current week' : ''
    console.log(weekStr + (i < weeks.length - 1 ? ',' : '') + comment)
  })
  console.log(']\n')

  // Also show some stats
  const totalCommits = weeks.flat().reduce((a, b) => a + b, 0)
  const maxDay = Math.max(...weeks.flat())
  const daysWithActivity = weeks.flat().filter(d => d > 0).length

  console.log(`📈 Stats:`)
  console.log(`   Total commits shown: ${totalCommits}`)
  console.log(`   Max commits in one day: ${maxDay}`)
  console.log(`   Days with activity: ${daysWithActivity}`)
  console.log(`   Weeks tracked: ${weeks.length}`)
  console.log(`\n`)

  return weeks
}

generateActivityHeatmap()
