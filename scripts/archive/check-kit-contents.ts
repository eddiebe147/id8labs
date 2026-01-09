#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
  const { data: kits, error: kitsError } = await supabase
    .from('skill_collections')
    .select('id, name, slug')
    .eq('is_official', true)
    .order('created_at');

  if (kitsError) {
    console.error('Error fetching kits:', kitsError);
    process.exit(1);
  }

  for (const kit of kits!) {
    console.log(`\n📦 ${kit.name} (${kit.slug})`);
    
    const { data: skills, error: skillsError } = await supabase
      .from('skill_collection_items')
      .select('skill:skills(slug, name, category_id)')
      .eq('collection_id', kit.id);

    if (skillsError) {
      console.error(`Error fetching skills for ${kit.name}:`, skillsError);
      continue;
    }

    console.log(`   Skills: ${skills?.length || 0}`);
    skills?.forEach((s: any) => {
      if (s.skill) {
        console.log(`   - ${s.skill.name} (${s.skill.slug})`);
      }
    });
  }
}

main();
