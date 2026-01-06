#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Define skill slugs for each kit (using actual slugs from database)
const KIT_CONTENTS = {
  'frontend-dev': [
    // Frontend/fullstack dev skills
    'nextjs-project-manager',
    'ui-builder',
    'api-design',
    'testing-qa',
    'performance-optimization',
    'deployment-automation',
    'state-management',
    'database-design',
    'error-monitoring',
    'analytics-tracking',
    'file-uploads',
    'real-time-features',
  ],
  'content-creator': [
    // Writing & content creation
    'copywriter',
    'blog-post-writer',
    'technical-writer',
    'case-study-writer',
    'script-writer',
    'white-paper-author',
    'seo-analyst',
    'content-calendar-planner',
    'brand-voice-coach',
    'ad-copy-writer',
    'landing-page-optimizer',
    'email-campaign-builder',
  ],
  'business-ops': [
    // Business operations & management
    'accounts-reconciler',
    'billing-manager',
    'financial-reporter',
    'cost-optimizer',
    'budget-planner',
    'procurement-assistant',
    'invoice-generator',
    'kpi-dashboard',
    'operations-optimizer',
    'vendor-manager',
    'inventory-manager',
    'subscription-lifecycle-manager',
  ],
  'researcher': [
    // Research & analysis
    'market-research-analyst',
    'competitive-intelligence',
    'survey-analyzer',
    'data-analyzer',
    'trend-spotter',
    'literature-review',
    'user-research',
    'seo-analyst',
    'financial-analyst',
    'industry-expert',
  ],
  'solopreneur': [
    // Best mix for solo founders
    'copywriter',
    'financial-reporter',
    'ui-builder',
    'seo-analyst',
    'api-design',
    'kpi-dashboard',
    'customer-success',
    'pitch-deck-creator',
    'landing-page-optimizer',
    'ad-copy-writer',
    'invoice-generator',
    'budget-planner',
    'market-research-analyst',
    'deployment-automation',
    'id8labs',
  ],
};

async function main() {
  console.log('🚀 Populating Starter Kits\n');

  for (const [kitSlug, skillSlugs] of Object.entries(KIT_CONTENTS)) {
    console.log(`📦 ${kitSlug}...`);

    // Get collection ID
    const { data: collection, error: collectionError } = await supabase
      .from('skill_collections')
      .select('id, name')
      .eq('slug', kitSlug)
      .single();

    if (collectionError || !collection) {
      console.error(`   ❌ Collection not found: ${kitSlug}`);
      continue;
    }

    let added = 0;
    let notFound = 0;

    for (const skillSlug of skillSlugs) {
      // Get skill ID
      const { data: skill, error: skillError } = await supabase
        .from('skills')
        .select('id, name')
        .eq('slug', skillSlug)
        .single();

      if (skillError || !skill) {
        console.log(`   ⚠️  Skill not found: ${skillSlug}`);
        notFound++;
        continue;
      }

      // Add to collection (without order_index)
      const { error: insertError } = await supabase
        .from('skill_collection_items')
        .insert({
          collection_id: collection.id,
          skill_id: skill.id,
        })
        .select()
        .single();

      if (insertError) {
        // Check if already exists
        if (insertError.code === '23505') {
          // Duplicate, skip silently
          continue;
        }
        console.error(`   ❌ Error adding ${skillSlug}:`, insertError.message);
      } else {
        added++;
      }
    }

    console.log(`   ✅ Added ${added} skills (${notFound} not found)\n`);
  }

  console.log('✨ Done!');
}

main();
