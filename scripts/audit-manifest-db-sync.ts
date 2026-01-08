#!/usr/bin/env npx tsx
/**
 * Audit Manifest vs Database Sync
 * Find which skills are in DB but not in manifest
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const MANIFEST_PATH = '/Users/eddiebelaval/Development/id8/claude-settings/skills-manifest.json'

async function auditSync() {
  console.log('🔍 Auditing Manifest vs Database Sync\n')

  // Read manifest
  const manifestRaw = fs.readFileSync(MANIFEST_PATH, 'utf-8')
  const manifest = JSON.parse(manifestRaw)
  const manifestSlugs = new Set(Object.keys(manifest.skills))

  console.log(`📋 Manifest: ${manifestSlugs.size} skills`)

  // Get all skills from database
  const { data: dbSkills, error } = await supabase
    .from('skills')
    .select('slug, name, status')
    .order('slug')

  if (error) {
    console.error('❌ Error fetching from database:', error)
    return
  }

  console.log(`🗄️  Database: ${dbSkills.length} skills total\n`)

  // Count by status
  const statusCounts: Record<string, number> = {}
  dbSkills.forEach(skill => {
    statusCounts[skill.status] = (statusCounts[skill.status] || 0) + 1
  })

  console.log('Status Breakdown:')
  Object.entries(statusCounts).forEach(([status, count]) => {
    console.log(`  - ${status}: ${count}`)
  })
  console.log()

  // Find skills in DB but not in manifest
  const inDbNotManifest = dbSkills.filter(skill => !manifestSlugs.has(skill.slug))

  if (inDbNotManifest.length > 0) {
    console.log(`\n⚠️  Found ${inDbNotManifest.length} skills in DB but NOT in manifest:\n`)
    inDbNotManifest.forEach(skill => {
      console.log(`  - ${skill.slug} (${skill.name}) [${skill.status}]`)
    })
  }

  // Find skills in manifest but not in DB
  const dbSlugs = new Set(dbSkills.map(s => s.slug))
  const inManifestNotDb = Array.from(manifestSlugs).filter(slug => !dbSlugs.has(slug))

  if (inManifestNotDb.length > 0) {
    console.log(`\n⚠️  Found ${inManifestNotDb.length} skills in manifest but NOT in DB:\n`)
    inManifestNotDb.forEach(slug => {
      console.log(`  - ${slug} (${manifest.skills[slug].name})`)
    })
  }

  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 Sync Summary')
  console.log('='.repeat(60))
  console.log(`Manifest count:           ${manifestSlugs.size}`)
  console.log(`Database count (total):   ${dbSkills.length}`)
  console.log(`Database (published):     ${statusCounts['published'] || 0}`)
  console.log(`Database (draft):         ${statusCounts['draft'] || 0}`)
  console.log(`Database (archived):      ${statusCounts['archived'] || 0}`)
  console.log(`\nIn DB, not in manifest:   ${inDbNotManifest.length}`)
  console.log(`In manifest, not in DB:   ${inManifestNotDb.length}`)
  console.log(`Difference:               ${dbSkills.length - manifestSlugs.size}`)
  console.log('='.repeat(60))
}

auditSync()
  .then(() => {
    console.log('\n✅ Audit complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Audit failed:', error)
    process.exit(1)
  })
