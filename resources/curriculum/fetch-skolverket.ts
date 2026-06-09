/**
 * Prövning.se — Skolverket Curriculum Fetcher
 * 
 * Hämtar centralt innehåll och kunskapskrav för matematik 1-3 (Gy25)
 * från syllabuswebb.skolverket.se och sparar till Supabase.
 * 
 * Usage:
 *   npx tsx resources/curriculum/fetch-skolverket.ts
 */

import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Gy25 matematikkurser vi vill hämta
const COURSES = [
  { code: 'MATMAT01a', name: 'Matematik 1a', slug: 'matematik-1' },
  { code: 'MATMAT01b', name: 'Matematik 1b', slug: 'matematik-1' },
  { code: 'MATMAT01c', name: 'Matematik 1c', slug: 'matematik-1' },
  { code: 'MATMAT02a', name: 'Matematik 2a', slug: 'matematik-2' },
  { code: 'MATMAT02b', name: 'Matematik 2b', slug: 'matematik-2' },
  { code: 'MATMAT02c', name: 'Matematik 2c', slug: 'matematik-2' },
  { code: 'MATMAT03b', name: 'Matematik 3b', slug: 'matematik-3' },
  { code: 'MATMAT03c', name: 'Matematik 3c', slug: 'matematik-3' },
] as const;

type CourseCode = typeof COURSES[number]['code'];

interface ParsedCourse {
  code: CourseCode;
  name: string;
  slug: string;
  centralContent: string[];
  knowledgeRequirements: { grade: 'E' | 'C' | 'A'; text: string }[];
}

/**
 * Fetch a course page from Skolverket and extract content.
 */
async function fetchCoursePage(code: string): Promise<{ centralContent: string[]; kr: { grade: 'E' | 'C' | 'A'; text: string }[] }> {
  const url = `https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=MAT&courseCode=${code}&date=2025-01-11&tos=gy`;
  
  const res = await fetch(url);
  const html = await res.text();
  
  // Save raw HTML for debugging
  const dataDir = join(process.cwd(), 'resources/curriculum/data');
  writeFileSync(join(dataDir, `${code}.html`), html);
  
  // Parse central content: look for the course section then extract bullets under "Centralt innehåll"
  // The HTML has structured sections per course
  const centralContent: string[] = [];
  const kr: { grade: 'E' | 'C' | 'A'; text: string }[] = [];
  
  // Extract bullet points under centralt innehåll (lines starting with "- " after course header)
  // We use a simple approach: find the course section header, then extract all list items until next course
  const coursePattern = new RegExp(`<h3[^>]*>\\[${code.replace('MAT', 'MATMAT')}\\]|\\b${code}\\b</h3>([\\s\\S]*?)(?=<h3[^>]*>|\\Z)`, 'i');
  // Actually let's use a simpler approach: find the section between course headers
  
  // Split by course headers (h3 with course name)
  const sectionMatch = html.match(new RegExp(`<h2[^>]*>.*?${code}.*?</h2>([\\s\\S]*?)(?=<h2[^>]*>|</body>)`, 'i'));
  const section = sectionMatch ? sectionMatch[1] : html;
  
  // Extract bullet points: lines that start with "-" after stripping HTML
  // Simple approach: find text between <li> tags in central content section
  const ciMatch = section.match(/Centralt innehåll([\s\S]*?)(?=Betygskriterier|Kunskapskriterier|$)/i);
  if (ciMatch) {
    const ciText = ciMatch[1];
    // Extract text from list items
    const liMatches = ciText.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi);
    for (const m of liMatches) {
      const text = m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      if (text.length > 10) centralContent.push(text);
    }
  }
  
  // Extract betygskriterier
  const krMatch = section.match(/Betygskriterier([\s\S]*?)$/i);
  if (krMatch) {
    const krText = krMatch[1];
    for (const grade of ['E', 'C', 'A'] as const) {
      const gradePattern = new RegExp(`Betyget ${grade}([\\s\\S]*?)(?=Betyget|${'|'.repeat('')}|$)`, 'i');
      const gMatch = krText.match(gradePattern);
      if (gMatch) {
        let text = gMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        // Remove "Elevens kunskaper..." style sentences
        text = text.replace(/^Elevens kunskaper[^.]+\.\s*/i, '');
        if (text.length > 20) kr.push({ grade, text });
      }
    }
  }
  
  return { centralContent, kr };
}

/**
 * Fetch all courses and save to Supabase.
 */
async function main() {
  console.log('Fetching Skolverket curriculum for Matematik 1-3 (Gy25)...\n');
  
  for (const course of COURSES) {
    console.log(`[${course.code}] ${course.name}...`);
    
    // Check if we already have data (skip if not --force)
    const dataPath = join(process.cwd(), 'resources/curriculum/data', `${course.code}.html`);
    let html: string;
    
    if (existsSync(dataPath)) {
      console.log('  (using cached HTML)');
      html = readFileSync(dataPath, 'utf-8');
    } else {
      const url = `https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=MAT&courseCode=${course.code}&date=2025-01-11&tos=gy`;
      const res = await fetch(url);
      if (!res.ok) {
        console.log(`  ERROR: HTTP ${res.status}`);
        continue;
      }
      html = await res.text();
      writeFileSync(dataPath, html);
      console.log('  Fetched and cached');
      await new Promise(r => setTimeout(r, 1000)); // Rate limit
    }
    
    // Parse the course-specific section
    const parsed = parseCourseHTML(html, course.code);
    console.log(`  Centralt innehåll: ${parsed.centralContent.length} punkter`);
    console.log(`  Kunskapskrav: ${parsed.knowledgeRequirements.length} poster`);
    
    // Save parsed data
    writeFileSync(
      join(process.cwd(), 'resources/curriculum/data', `${course.code}-parsed.json`),
      JSON.stringify(parsed, null, 2)
    );
    
    // Save to Supabase
    await saveToDatabase(parsed, course.slug);
    
    console.log('  Saved to database\n');
  }
  
  console.log('Klart!');
}

/**
 * Parse a specific course's content from the full subject HTML.
 */
function parseCourseHTML(html: string, courseCode: string): { centralContent: string[]; knowledgeRequirements: { grade: 'E' | 'C' | 'A'; text: string }[] } {
  const centralContent: string[] = [];
  const knowledgeRequirements: { grade: 'E' | 'C' | 'A'; text: string }[] = [];
  
  // Find the section for this specific course
  // Courses appear as h3 or h2 with the course name/code
  // We need to find the section between this course's header and the next course header
  
  // Try to find the course heading pattern
  const courseHeaderMatch = html.match(new RegExp(`<h[23][^>]*>.*?\\b${courseCode}\\b.*?</h[23]>`, 'i'));
  if (!courseHeaderMatch) {
    console.log(`  WARNING: Could not find header for ${courseCode}`);
    return { centralContent, knowledgeRequirements };
  }
  
  const headerEnd = courseHeaderMatch.index! + courseHeaderMatch[0].length;
  
  // Find next course header or end
  const nextCoursePattern = /<h[23][^>]*>\s*\[?(MATMAT\d[abc]?)\]/gi;
  const nextMatches = [...html.matchAll(nextCoursePattern)];
  const nextHeader = nextMatches.find(m => m.index! > headerEnd);
  const sectionEnd = nextHeader ? nextHeader.index! : html.length;
  
  const section = html.slice(headerEnd, sectionEnd);
  
  // Extract centralt innehåll
  const ciMatch = section.match(/Centralt innehåll([\s\S]*?)(?=Betygskriterier|Kunskapskriterier|Kunskapskrav|$)/i);
  if (ciMatch) {
    const ciSection = ciMatch[1];
    // Extract list items
    const liMatches = ciSection.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi);
    for (const m of liMatches) {
      let text = m[1].replace(/<[^>]+>/g, ' ').replace(/\s{2,}/g, ' ').trim();
      if (text.length > 10) centralContent.push(text);
    }
    
    // Also try extracting text between <p> or <span> that look like bullet content
    if (centralContent.length === 0) {
      // Try markdown-style bullets
      const bulletMatches = ciSection.matchAll(/[-•]\s*([^\n<]+)/g);
      for (const m of bulletMatches) {
        const text = m[1].replace(/<[^>]+>/g, ' ').trim();
        if (text.length > 10) centralContent.push(text);
      }
    }
  }
  
  // Extract betygskriterier (E, C, A)
  const gradeOrder = ['E', 'C', 'A'] as const;
  for (const grade of gradeOrder) {
    const gradePattern = new RegExp(`Betyget\\s+${grade}([\\s\\S]*?)(?=Betyget\\s+[A-Z]|${grade === 'A' ? '$' : ''})`, 'i');
    const gMatch = section.match(gradePattern);
    if (gMatch) {
      let text = gMatch[1]
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .trim();
      // Split by sentence-like boundaries (each criterion on its own)
      // Take first substantial paragraph
      const sentences = text.split(/(?<=[.])/).filter(s => s.trim().length > 30);
      if (sentences.length > 0) {
        // Join all criteria for this grade into one text
        text = sentences.join(' ').trim();
      }
      if (text.length > 20) {
        knowledgeRequirements.push({ grade, text });
      }
    }
  }
  
  return { centralContent, knowledgeRequirements };
}

/**
 * Save parsed course data to Supabase.
 */
async function saveToDatabase(
  parsed: { centralContent: string[]; knowledgeRequirements: { grade: 'E' | 'C' | 'A'; text: string }[] },
  levelSlug: string
) {
  // Get level_id
  const { data: level } = await supabase
    .from('levels')
    .select('id')
    .eq('slug', levelSlug)
    .single();
  
  if (!level) {
    console.log(`  ERROR: Level ${levelSlug} not found in database`);
    return;
  }
  
  const levelId = level.id;
  
  // Save central content
  for (let i = 0; i < parsed.centralContent.length; i++) {
    const content = parsed.centralContent[i];
    await supabase.from('central_content').upsert({
      level_id: levelId,
      content,
      order_index: i,
      version: 'Gy25-2025',
    }, {
      onConflict: 'level_id,order_index',
    });
  }
  
  // Save knowledge requirements
  for (const kr of parsed.knowledgeRequirements) {
    await supabase.from('knowledge_requirements').upsert({
      level_id: levelId,
      grade_level: kr.grade,
      description: kr.text,
      order_index: ['E', 'C', 'A'].indexOf(kr.grade),
    }, {
      onConflict: 'level_id,grade_level',
    });
  }
}

main().catch(console.error);