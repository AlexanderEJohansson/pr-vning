import { SUBJECTS, LEVELS, TARGET_PROGRAMS } from '@/lib/courses';

/**
 * Seed script — Körs för att populera databasen med master data.
 * Usage: npx tsx scripts/seed.ts
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

async function seed() {
  console.log('🌱 Seeding Prövning.se database...\n');

  // 1. Target Programs
  console.log('📚 Target Programs...');
  for (const program of TARGET_PROGRAMS) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/target_programs`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=ignore-duplicates',
      },
      body: JSON.stringify({
        name: program.name,
        slug: program.slug,
        description: program.description,
        requirements: { math_requirement: program.mathRequirement },
        is_active: true,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.log(`  ⚠️  ${program.slug}: ${err.slice(0, 50)}`);
    } else {
      console.log(`  ✅ ${program.name}`);
    }
  }

  // 2. Subjects
  console.log('\n📖 Subjects...');
  for (const subject of SUBJECTS) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/subjects`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=ignore-duplicates',
      },
      body: JSON.stringify({
        name: subject.name,
        slug: subject.slug,
        description: subject.name,
        is_active: true,
      }),
    });
    if (res.ok) console.log(`  ✅ ${subject.name}`);
  }

  // 3. Levels (needs subject_id lookup first)
  console.log('\n📐 Levels...');
  for (const level of LEVELS) {
    // Get subject_id
    const subjectRes = await fetch(
      `${SUPABASE_URL}/rest/v1/subjects?slug=eq.${level.subjectSlug}&select=id`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        },
      }
    );
    const subjects = await subjectRes.json();
    if (!subjects.length) {
      console.log(`  ⚠️  ${level.slug}: subject not found`);
      continue;
    }
    const subjectId = subjects[0].id;

    const res = await fetch(`${SUPABASE_URL}/rest/v1/levels`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=ignore-duplicates',
      },
      body: JSON.stringify({
        subject_id: subjectId,
        level_number: level.levelNumber,
        name: level.name,
        slug: level.slug,
        gy25_course_code: level.gy25Code,
        gy25_name: level.gy25Name,
        gy11_course_code: level.gy11Code,
        description: level.description,
        is_active: true,
      }),
    });
    if (res.ok) console.log(`  ✅ ${level.name}`);
  }

  console.log('\n✨ Seed complete!');
}

seed().catch(console.error);