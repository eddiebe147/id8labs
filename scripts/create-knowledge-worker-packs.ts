#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Define the 5 new knowledge worker packs
const NEW_PACKS = [
  {
    slug: 'executive-assistant',
    name: 'Executive Assistant Kit',
    description: 'Everything an EA needs: scheduling, reporting, correspondence, and operations support',
    emoji: '📋',
    author: 'ID8Labs',
    is_official: true,
    is_public: true,
    skills: [
      'expense-tracker',
      'invoice-generator',
      'presentation-maker',
      'report-builder',
      'letter-writer',
      'spreadsheet-builder',
      'resume-cv-creator',
      'email-notifications',
      'kpi-dashboard',
      'operations-optimizer',
      'customer-success',
      'onboarding-designer',
    ],
  },
  {
    slug: 'data-analyst',
    name: 'Data Analyst Kit',
    description: 'Turn data into insights with analytics, visualization, and reporting tools',
    emoji: '📊',
    author: 'ID8Labs',
    is_official: true,
    is_public: true,
    skills: [
      'data-analyzer',
      'spreadsheet-builder',
      'report-builder',
      'kpi-dashboard',
      'sentiment-analyzer',
      'survey-analyzer',
      'log-analyzer',
      'feedback-analyzer',
      'financial-analyst',
      'trend-spotter',
      'churn-predictor',
      'analytics-tracking',
    ],
  },
  {
    slug: 'consultant-strategist',
    name: 'Consultant & Strategist Kit',
    description: 'Strategy consulting essentials: research, analysis, deliverables, and client presentations',
    emoji: '💼',
    author: 'ID8Labs',
    is_official: true,
    is_public: true,
    skills: [
      'competitive-intelligence',
      'market-research-analyst',
      'industry-expert',
      'pitch-deck-creator',
      'case-study-writer',
      'white-paper-author',
      'presentation-maker',
      'business-plan-writer',
      'financial-analyst',
      'data-analyzer',
      'trend-spotter',
      'valuation-analyst',
    ],
  },
  {
    slug: 'product-manager',
    name: 'Product Manager Kit',
    description: 'Ship better products: user research, feedback analysis, roadmaps, and metrics',
    emoji: '🚀',
    author: 'ID8Labs',
    is_official: true,
    is_public: true,
    skills: [
      'user-research',
      'competitive-intelligence',
      'feedback-analyzer',
      'kpi-dashboard',
      'onboarding-designer',
      'nps-survey-creator',
      'presentation-maker',
      'api-documentation-writer',
      'analytics-tracking',
      'churn-predictor',
      'survey-analyzer',
      'data-analyzer',
      'ab-test-designer',
    ],
  },
  {
    slug: 'knowledge-ops',
    name: 'Knowledge & Operations Kit',
    description: 'Documentation, training, and operational excellence for teams',
    emoji: '📚',
    author: 'ID8Labs',
    is_official: true,
    is_public: true,
    skills: [
      'knowledge-graph-builder',
      'help-article-writer',
      'faq-builder',
      'infrastructure-documenter',
      'technical-writer',
      'onboarding-designer',
      'api-documentation-writer',
      'operations-optimizer',
      'process-documenter',
      'compliance-checker',
      'report-builder',
      'presentation-maker',
    ],
  },
];

async function main() {
  console.log('📦 Creating 5 Knowledge Worker Starter Packs\n');

  for (const pack of NEW_PACKS) {
    console.log(`\n🔨 Creating: ${pack.name}`);
    
    // Create collection
    const { data: collection, error: collectionError } = await supabase
      .from('skill_collections')
      .insert({
        slug: pack.slug,
        name: pack.name,
        description: pack.description,
        emoji: pack.emoji,
        author: pack.author,
        is_official: pack.is_official,
        is_public: pack.is_public,
      })
      .select()
      .single();

    if (collectionError) {
      if (collectionError.code === '23505') {
        console.log(`  ⚠️  Collection already exists: ${pack.slug}`);
        // Get existing collection
        const { data: existing } = await supabase
          .from('skill_collections')
          .select('id')
          .eq('slug', pack.slug)
          .single();
        
        if (existing) {
          console.log(`  ℹ️  Using existing collection ID: ${existing.id}`);
          // Continue with populating skills...
        }
        continue;
      }
      console.error(`  ❌ Error creating collection: ${collectionError.message}`);
      continue;
    }

    console.log(`  ✅ Created collection: ${collection.id}`);
    
    // Add skills to collection
    let added = 0;
    let notFound = 0;

    for (const skillSlug of pack.skills) {
      const { data: skill, error: skillError } = await supabase
        .from('skills')
        .select('id, name')
        .eq('slug', skillSlug)
        .single();

      if (skillError || !skill) {
        console.log(`     ⚠️  Skill not found: ${skillSlug}`);
        notFound++;
        continue;
      }

      const { error: insertError } = await supabase
        .from('skill_collection_items')
        .insert({
          collection_id: collection.id,
          skill_id: skill.id,
        })
        .select()
        .single();

      if (insertError) {
        if (insertError.code === '23505') {
          // Duplicate, skip
          continue;
        }
        console.error(`     ❌ Error adding ${skillSlug}: ${insertError.message}`);
      } else {
        added++;
      }
    }

    console.log(`  ✅ Added ${added} skills (${notFound} not found)`);
  }

  console.log('\n✨ All knowledge worker packs created!');
  
  // Show summary
  const { data: allCollections } = await supabase
    .from('skill_collections')
    .select('name, slug')
    .eq('is_official', true)
    .order('created_at');

  console.log('\n📊 Total Official Starter Packs:');
  allCollections?.forEach((c, i) => {
    console.log(`${i + 1}. ${c.name} (${c.slug})`);
  });
}

main();
