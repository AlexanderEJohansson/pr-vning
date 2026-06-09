/**
 * Prövning.se — Pluggakuten Scraper
 * 
 * Usage:
 *   npx tsx resources/curriculum/scrape-pluggakuten.ts
 *   npx tsx resources/curriculum/scrape-pluggakuten.ts --limit 30
 */

import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';
import { chromium } from '/usr/lib/node_modules/playwright/index.mjs';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const LEVEL_MAP: Record<string, string> = {
  'matte-1': 'matematik-1',
  'matte-2': 'matematik-2',
  'matte-3': 'matematik-3',
  'matte-4': 'matematik-3',
  'matte-5': 'matematik-3',
  'fysik-1': 'matematik-1',
  'fysik-2': 'matematik-2',
  'kemi-1': 'matematik-1',
  'kemi-2': 'matematik-2',
  'biologi-1': 'matematik-1',
  'biologi-2': 'matematik-2',
};

const TOPIC_MAP: Record<string, string> = {
  'algebra-1': 'matematik-algebra',
  'algebra-2': 'matematik-algebra',
  'algebraiska-uttryck': 'matematik-algebra',
  'funktioner': 'matematik-funktioner',
  'funktioner-och-grafer': 'matematik-funktioner',
  'grafer-och-asymptoter': 'matematik-funktioner',
  'geometri-1': 'matematik-geometri',
  'logik-och-geometri': 'matematik-geometri',
  'derivata': 'matematik-derivata',
  'derivata-2': 'matematik-derivata',
  'integraler-1': 'matematik-integral',
  'integraler': 'matematik-integral',
  'integraler-och-tillampningar': 'matematik-integral',
  'trigonometri-1': 'matematik-trigonometri',
  'trigonometri-2': 'matematik-trigonometri',
  'statistik': 'matematik-statistik',
  'sannolikhet-och-statistik': 'matematik-statistik',
  'andragradsekvationer': 'matematik-algebra',
  'logaritmer': 'matematik-algebra',
  'linjara-ekvationssystem': 'matematik-algebra',
  'procent': 'matematik-algebra',
  'aritmetik': 'matematik-algebra',
  'mangdlara': 'matematik-algebra',
  'kombinatorik': 'matematik-algebra',
  'talfoljder-och-bevisteknik': 'matematik-algebra',
  'kongruensrakning': 'matematik-algebra',
  'differentialekvationer': 'matematik-derivata',
  'komplexa-tal': 'matematik-algebra',
  'bevismetoder': 'matematik-algebra',
  'naturliga-logaritmer': 'matematik-derivata',
};

async function getCategories() {
  const res = await fetch('https://www.pluggakuten.se/api/menu/structure');
  const data = await res.json() as Record<string, any>;
  const targets: Array<{ url: string; level: string; topic: string }> = [];
  for (const item of Object.values(data)) {
    const url: string = item.url || '';
    const match = url.match(/^\/amne\/(matematik|fysik|kemi|biologi)\/(matte|fysik|kemi|biologi)-(\d)\//);
    if (match) {
      const [, subject, levelSlug, num] = match;
      const level = LEVEL_MAP[`${levelSlug}-${num}`];
      if (level) {
        const topicSlug = url.split('/')[4] || '';
        const topic = TOPIC_MAP[topicSlug] || `${subject}-matematik`;
        targets.push({ url: `https://www.pluggakuten.se${url}`, level, topic });
      }
    }
  }
  return targets;
}

async function getThreads(browser: any, url: string) {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  const threads = await page.evaluate(() => {
    const links: Array<{ url: string; title: string }> = [];
    document.querySelectorAll('a[href^="/trad/"]').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href.match(/^\/trad\/[a-z0-9-]+\/$/) && !href.includes('/reply')) {
        const title = a.textContent?.trim() || '';
        if (title.length > 5 && title.length < 200) links.push({ url: href, title });
      }
    });
    return links;
  });
  await page.close();
  return threads;
}

async function getQA(browser: any, url: string) {
  const page = await browser.newPage();
  await page.goto(`https://www.pluggakuten.se${url}`, { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(1500);

  const data = await page.evaluate(() => {
    const body = document.body.innerText;
    // Must have Postad: to be a real thread page
    if (!body.includes('Postad:')) return { question: '', answer: '' };

    const parts = body.split('Postad:');
    if (parts.length < 3) return { question: '', answer: '' };

    // Part 1: question post — first line = date, second = title, then question text
    const firstPost = parts[1] || '';
    const firstLines = firstPost.split('\n').filter(l => l.trim());
    let question = '';
    let skipCount = 0;
    for (const l of firstLines) {
      const t = l.trim();
      if (t.length < 20) { skipCount++; continue; }
      if (t.match(/^\d+\s+\w+/)) { skipCount++; continue; }
      if (skipCount < 2) { skipCount++; continue; } // skip date + title
      if (t.match(/^\d+\s*$/)) continue;
      if (t.includes('Online') || t.includes('Avmarkera') || t.includes('#')) continue;
      question = t;
      break;
    }

    // Part 2: first answer — first line = date, possibly "Redigerad:", then answer
    const secondPost = parts[2] || '';
    const ansLines = secondPost.split('\n').filter(l => l.trim());
    let answer = '';
    for (let i = 0; i < ansLines.length; i++) {
      const t = ansLines[i].trim();
      if (t.length < 20) continue;
      if (t.match(/^\d+\s+\w+/)) continue;
      if (t.match(/^\d+\s*$/)) continue;
      if (t.includes('Online') || t.includes('Avmarkera') || t.includes('#')) continue;
      if (t.startsWith('Redigerad:')) continue;
      answer = t;
      break;
    }

    return { question: question.trim(), answer: answer.trim() };
  });
  await page.close();
  if (data.question && data.answer && data.question.length > 15 && data.answer.length > 15) {
    return data;
  }
  return null;
}

async function saveQuestion(data: { level_slug: string; topic_slug: string; question_text: string; answer_text: string }) {
  const { data: level } = await supabase.from('levels').select('id').eq('slug', data.level_slug).single();
  if (!level) return false;
  let topicId: string | null = null;
  const { data: topic } = await supabase.from('question_topics').select('id').eq('slug', data.topic_slug).single();
  if (topic) topicId = topic.id;
  const { error } = await supabase.from('questions').insert({
    level_id: level.id,
    topic_id: topicId,
    question_text: data.question_text.slice(0, 2000),
    question_type: 'free_text',
    correct_text: data.answer_text.slice(0, 4000),
    source_year: 2024,
  });
  if (error && !error.message.includes('duplicate')) return false;
  return true;
}

async function main() {
  const args = process.argv.slice(2);
  const limitArg = parseInt(args.find(a => a.startsWith('--limit='))?.split('=')[1] || '30');
  console.log('Prövning.se Pluggakuten Scraper\n');
  const categories = await getCategories();
  console.log(`${categories.length} kategorier\n`);
  const browser = await chromium.launch({ headless: true });
  let saved = 0;
  let skipped = 0;
  for (const cat of categories) {
    console.log(`[CAT] ${cat.url}`);
    const threads = await getThreads(browser, cat.url);
    console.log(`  ${threads.length} trådar`);
    for (const thread of threads.slice(0, limitArg)) {
      process.stdout.write(`  ${thread.title.slice(0, 50)}...`);
      try {
        const qa = await getQA(browser, thread.url);
        if (qa) {
          const ok = await saveQuestion({ level_slug: cat.level, topic_slug: cat.topic, question_text: qa.question, answer_text: qa.answer });
          if (ok) { saved++; console.log(' OK'); }
          else { skipped++; console.log(' SKIP'); }
        } else { skipped++; console.log(' SKIP'); }
      } catch (e) { skipped++; console.log(' ERR'); }
      await new Promise(r => setTimeout(r, 300));
    }
    console.log('');
  }
  await browser.close();
  console.log(`Klart! ${saved} frågor sparade, ${skipped} hoppade över.`);
}

main().catch(console.error);
