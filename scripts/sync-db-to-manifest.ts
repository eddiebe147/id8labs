#!/usr/bin/env npx tsx
/**
 * Sync Database Skills to Manifest
 * Adds the 43 missing skills from database to manifest
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

// Map database categories to manifest categories
const CATEGORY_MAP: Record<string, string> = {
  'code': 'nextjs-stack',
  'business': 'business-ops',
  'design': 'ui-ux',
  'writing': 'content',
  'communication': 'social-media',
  'research': 'strategic',
  'personal': 'business-ops',
  'meta': 'tooling',
  'domain': 'appstore'
}

async function syncToManifest() {
  console.log('🔄 Syncing Database Skills to Manifest\n')

  // Read manifest
  const manifestRaw = fs.readFileSync(MANIFEST_PATH, 'utf-8')
  const manifest = JSON.parse(manifestRaw)
  const manifestSlugs = new Set(Object.keys(manifest.skills))

  console.log(`📋 Current manifest: ${manifestSlugs.size} skills`)

  // Get missing skills from database
  const { data: allSkills, error } = await supabase
    .from('skills')
    .select('slug, name, description, category_id, triggers, version')
    .eq('status', 'published')
    .order('slug')

  if (error) {
    console.error('❌ Error fetching from database:', error)
    return
  }

  const missingSkills = allSkills.filter(skill => !manifestSlugs.has(skill.slug))
  
  console.log(`🔍 Found ${missingSkills.length} skills to add\n`)

  if (missingSkills.length === 0) {
    console.log('✅ Manifest is already in sync!')
    return
  }

  // Add missing skills to manifest
  let added = 0
  for (const skill of missingSkills) {
    const manifestCategory = CATEGORY_MAP[skill.category_id || 'meta'] || 'tooling'
    
    manifest.skills[skill.slug] = {
      name: skill.name,
      description: skill.description,
      source: 'repo',
      repository: 'eddiebelaval/claude-settings',
      path: `skills/${skill.slug}`,
      installPath: `~/.claude/skills/${skill.slug}`,
      version: skill.version || '1.0.0',
      category: manifestCategory,
      triggers: skill.triggers || []
    }

    console.log(`  ✅ Added: ${skill.slug} (${manifestCategory})`)
    added++
  }

  // Update metadata
  manifest.totalSkills = Object.keys(manifest.skills).length
  manifest.lastUpdated = new Date().toISOString()
  manifest.description = `Complete skills manifest for ID8Labs Skills Marketplace - ${manifest.totalSkills} skills`

  // Write updated manifest
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf-8')

  console.log('\n' + '='.repeat(60))
  console.log('📊 Sync Summary')
  console.log('='.repeat(60))
  console.log(`✅ Added to manifest:    ${added}`)
  console.log(`📈 New total skills:     ${manifest.totalSkills}`)
  console.log(`📝 Manifest updated:     ${MANIFEST_PATH}`)
  console.log('='.repeat(60))
}

syncToManifest()
  .then(() => {
    console.log('\n🎉 Sync complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Sync failed:', error)
    process.exit(1)
  })
