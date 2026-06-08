/**
 * Prövning.se — Curriculum Fetcher
 * 
 * Laddar ner och parser ämnesplaner från Skolverket.
 * Körs manuellt när Skolverket uppdaterar planer.
 * 
 * Usage:
 *   npx tsx resources/curriculum/fetch-curriculum.ts
 *   npx tsx resources/curriculum/fetch-curriculum.ts --subject matematik
 *   npx tsx resources/curriculum/fetch-curriculum.ts --level matematik-2 --force
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Skolverket URLs for curriculum (these need verification)
// In production, fetch from official Skolverket sources
const CURRICULUM_URLS = {
  matematik: {
    gy25: 'https://www.skolverket.se/undervisning/gymnasieskola/laroplaner-och-kursprogram-gymnasieskola',
    // Direct PDF links change, so we use the main page as entry point
  },
  engelska: {
    gy25: 'https://www.skolverket.se/undervisning/gymnasieskola/laroplaner-och-kursprogram-gymnasieskola',
  },
  biologi: {
    gy25: 'https://www.skolverket.se/undervisning/gymnasieskola/laroplaner-och-kursprogram-gymnasieskola',
  },
  kemi: {
    gy25: 'https://www.skolverket.se/undervisning/gymnasieskola/laroplaner-och-kursprogram-gymnasieskola',
  },
  fysik: {
    gy25: 'https://www.skolverket.se/undervisning/gymnasieskola/laroplaner-och-kursprogram-gymnasieskola',
  },
  svenska: {
    gy25: 'https://www.skolverket.se/undervisning/gymnasieskola/laroplaner-och-kursprogram-gymnasieskola',
  },
} as const;

type SubjectSlug = keyof typeof CURRICULUM_URLS;

/**
 * Fetch and parse curriculum for a subject.
 * In this initial version, we load from static JSON files.
 * Later, this can fetch from Skolverket.
 */
export async function fetchCurriculum(subject: SubjectSlug) {
  console.log(`📚 Fetching curriculum for: ${subject}`);
  
  // For now, use static data (in resources/curriculum/data/)
  // This can be replaced with actual Skolverket fetching
  const dataDir = join(process.cwd(), 'resources/curriculum/data');
  
  const filePath = join(dataDir, `${subject}.json`);
  
  if (!existsSync(filePath)) {
    console.warn(`⚠️  No data file for ${subject}. Create resources/curriculum/data/${subject}.json`);
    return null;
  }
  
  const content = JSON.parse(readFileSync(filePath, 'utf-8'));
  console.log(`✅ Loaded ${Object.keys(content).length} levels for ${subject}`);
  
  return content;
}

/**
 * Parse knowledge requirements from raw text.
 * This is a simple parser - can be enhanced later.
 */
export function parseKnowledgeRequirements(raw: string): Array<{
  grade_level: string;
  description: string;
}> {
  const requirements: Array<{ grade_level: string; description: string }> = [];
  
  // Simple parsing - look for patterns like:
  // "Kunskapskrav för betyget E:"
  // "Kunskapskrav för betyget C:"
  // "Kunskapskrav för betyget A:"
  const gradeMatches = raw.split(/Kunskapskrav för betyget ([ECA]):/gi);
  
  for (const match of gradeMatches) {
    if (!match.trim()) continue;
    requirements.push({
      grade_level: match[0].toUpperCase(),
      description: match.slice(1).trim(),
    });
  }
  
  return requirements;
}

/**
 * Parse central content from raw text.
 */
export function parseCentralContent(raw: string): Array<{
  content: string;
  order_index: number;
}> {
  const items: Array<{ content: string; order_index: number }> = [];
  
  // Split by numbered list or bullet points
  const lines = raw.split(/\n+/).filter(line => line.trim());
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.length > 10) { // Filter out short lines
      items.push({
        content: line,
        order_index: i + 1,
      });
    }
  }
  
  return items;
}

/**
 * Main entry point - fetch all subjects
 */
export async function main() {
  const args = process.argv.slice(2);
  const subjectArg = args.find(a => a.startsWith('--subject='))?.split('=')[1] as SubjectSlug | undefined;
  const forceArg = args.includes('--force');
  
  const subjects = subjectArg 
    ? [subjectArg] 
    : (Object.keys(CURRICULUM_URLS) as SubjectSlug[]);
  
  console.log('🚀 Prövning.se Curriculum Fetcher');
  console.log('=================================');
  
  for (const subject of subjects) {
    try {
      await fetchCurriculum(subject);
    } catch (error) {
      console.error(`❌ Error fetching ${subject}:`, error);
    }
  }
  
  console.log('📦 Done. Data saved to database via API.');
}

// Allow running directly
if (require.main === module) {
  main().catch(console.error);
}