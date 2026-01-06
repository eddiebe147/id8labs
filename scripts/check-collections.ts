#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
  const { data, error } = await supabase
    .from('skill_collections')
    .select('*')
    .order('is_official', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Error:', error);
    process.exit(1);
  }

  console.log('Existing Starter Kits:');
  console.log(JSON.stringify(data, null, 2));
  console.log('\nTotal:', data?.length || 0);
}

main();
