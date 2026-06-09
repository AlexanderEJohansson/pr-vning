/**
 * Save parsed Skolverket curriculum data to Supabase.
 */
import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const DATA_DIR = join(process.cwd(), 'resources/curriculum/data');

const LEVEL_MAP: Record<string, string> = {
  'MATMAT01a': 'matematik-1', 'MATMAT01b': 'matematik-1', 'MATMAT01c': 'matematik-1',
  'MATMAT02a': 'matematik-2', 'MATMAT02b': 'matematik-2', 'MATMAT02c': 'matematik-2',
  'MATMAT03b': 'matematik-3', 'MATMAT03c': 'matematik-3',
};

const CODES = ['MATMAT01a', 'MATMAT01b', 'MATMAT01c', 'MATMAT02a', 'MATMAT02b', 'MATMAT02c', 'MATMAT03b', 'MATMAT03c'];

async function saveToDb() {
  for (const code of CODES) {
    const parsed = JSON.parse(readFileSync(join(DATA_DIR, `${code}-parsed.json`), 'utf-8'));
    const levelSlug = LEVEL_MAP[code];

    // Get level_id
    const { data: level } = await supabase.from('levels').select('id').eq('slug', levelSlug).single();
    if (!level) { console.log(`${code}: level ${levelSlug} not found`); continue; }
    const levelId = level.id;

    // Clear old entries
    await supabase.from('central_content').delete().eq('level_id', levelId);
    await supabase.from('knowledge_requirements').delete().eq('level_id', levelId);

    // Insert central content
    for (let i = 0; i < parsed.central_content.length; i++) {
      await supabase.from('central_content').insert({
        level_id: levelId,
        content: parsed.central_content[i],
        order_index: i,
        version: 'Gy25-2025',
      });
    }

    // Insert knowledge requirements
    const gradeOrder = { E: 0, C: 1, A: 2 };
    for (const [grade, text] of Object.entries(parsed.knowledge_requirements)) {
      await supabase.from('knowledge_requirements').insert({
        level_id: levelId,
        grade_level: grade,
        description: text as string,
        order_index: gradeOrder[grade as keyof typeof gradeOrder] ?? 0,
      });
    }

    console.log(`${code}: ${parsed.central_content.length} CI items, ${Object.keys(parsed.knowledge_requirements).length} KR saved`);
  }
  console.log('\nKlart!');
}

saveToDb().catch(console.error);