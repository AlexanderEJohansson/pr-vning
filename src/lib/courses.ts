/**
 * Prövning.se — Course/Level definitions
 * Static data. All levels, subjects, and programs.
 * This is the source of truth for the app.
 * 
 * When Skolverket updates curriculum, update this file + run migration for DB.
 */

export type SubjectSlug = 'matematik' | 'engelska' | 'biologi' | 'kemi' | 'fysik' | 'svenska';

export type LevelSlug =
  | 'matematik-1'
  | 'matematik-2'
  | 'matematik-3'
  | 'engelska-5'
  | 'engelska-6'
  | 'engelska-7'
  | 'biologi-1'
  | 'biologi-2'
  | 'kemi-1'
  | 'kemi-2'
  | 'fysik-1'
  | 'fysik-2'
  | 'svenska-1'
  | 'svenska-2'
  | 'svenska-3';

export interface Subject {
  slug: SubjectSlug;
  name: string;
  nameShort: string;  // "Ma", "En", "Bi"
  color: string;      // Tailwind color for badges
  icon: string;       // Lucide icon name
}

export interface Level {
  slug: LevelSlug;
  subjectSlug: SubjectSlug;
  levelNumber: number;  // 1, 2, 3 within subject
  name: string;        // "Matematik 2"
  gy25Code: string;    // "MATMAT02a"
  gy25Name: string;    // "Matematik 2a"
  gy11Code: string;    // "Matematik B"
  description: string;
  creditPoints?: number;
  estimatedHours?: number;  // how many hours to complete
  priority: number;         // 1 = highest priority (matte2 for most programs)
}

export interface TargetProgram {
  slug: string;
  name: string;
  mathRequirement: string;  // e.g. "Matematik 3" or "Matematik 2"
  description: string;
  category: 'teknik' | 'medicin' | 'ekonomi' | 'samhalle' | 'humaniora' | 'annat';
}

// ── SUBJECTS ────────────────────────────────────────────────────────────────

export const SUBJECTS: Subject[] = [
  {
    slug: 'matematik',
    name: 'Matematik',
    nameShort: 'Ma',
    color: 'emerald',
    icon: 'calculator',
  },
  {
    slug: 'engelska',
    name: 'Engelska',
    nameShort: 'En',
    color: 'blue',
    icon: 'globe',
  },
  {
    slug: 'biologi',
    name: 'Biologi',
    nameShort: 'Bi',
    color: 'green',
    icon: 'leaf',
  },
  {
    slug: 'kemi',
    name: 'Kemi',
    nameShort: 'Ke',
    color: 'purple',
    icon: 'flask-conical',
  },
  {
    slug: 'fysik',
    name: 'Fysik',
    nameShort: 'Fy',
    color: 'indigo',
    icon: 'atom',
  },
  {
    slug: 'svenska',
    name: 'Svenska',
    nameShort: 'Sv',
    color: 'amber',
    icon: 'book-open',
  },
];

// ── LEVELS ─────────────────────────────────────────────────────────────────────

export const LEVELS: Level[] = [
  // Matematik
  {
    slug: 'matematik-1',
    subjectSlug: 'matematik',
    levelNumber: 1,
    name: 'Matematik 1',
    gy25Code: 'MATMAT01a/b/c',
    gy25Name: 'Matematik 1a/1b/1c',
    gy11Code: 'Matematik A',
    description: 'Grundläggande matematik. Algebra, geometri, sannolikhet, statistik.',
    creditPoints: 100,
    estimatedHours: 100,
    priority: 2,
  },
  {
    slug: 'matematik-2',
    subjectSlug: 'matematik',
    levelNumber: 2,
    name: 'Matematik 2',
    gy25Code: 'MATMAT02a/b/c',
    gy25Name: 'Matematik 2a/2b/2c',
    gy11Code: 'Matematik B',
    description: 'Algebra, funktioner, trigonometri, statistik. Krävs för de flesta högskoleprogram.',
    creditPoints: 100,
    estimatedHours: 100,
    priority: 1,  // HIGHEST — most programs need this
  },
  {
    slug: 'matematik-3',
    subjectSlug: 'matematik',
    levelNumber: 3,
    name: 'Matematik 3',
    gy25Code: 'MATMAT03b/c',
    gy25Name: 'Matematik 3b/3c',
    gy11Code: 'Matematik C',
    description: 'Derivata, integraler, algebra, geometri. Krävs för tekniska utbildningar.',
    creditPoints: 100,
    estimatedHours: 100,
    priority: 1,
  },
  // Engelska
  {
    slug: 'engelska-5',
    subjectSlug: 'engelska',
    levelNumber: 5,
    name: 'Engelska 5',
    gy25Code: 'ENGENG05',
    gy25Name: 'Engelska 5',
    gy11Code: 'Engelska5',
    description: 'Grundläggande engelska. Läsning, skrivning, muntlig kommunikation.',
    creditPoints: 100,
    estimatedHours: 80,
    priority: 2,
  },
  {
    slug: 'engelska-6',
    subjectSlug: 'engelska',
    levelNumber: 6,
    name: 'Engelska 6',
    gy25Code: 'ENGENG06',
    gy25Name: 'Engelska 6',
    gy11Code: 'Engelska 6',
    description: 'Avancerad engelska. Akademiskt språk, analys, diskussion.',
    creditPoints: 100,
    estimatedHours: 80,
    priority: 2,
  },
  // Biologi
  {
    slug: 'biologi-1',
    subjectSlug: 'biologi',
    levelNumber: 1,
    name: 'Biologi 1',
    gy25Code: 'BIOBIO01',
    gy25Name: 'Biologi 1',
    gy11Code: 'Biologi A',
    description: 'Cellbiologi, evolution, ekologi.',
    creditPoints: 100,
    estimatedHours: 80,
    priority: 3,
  },
  {
    slug: 'biologi-2',
    subjectSlug: 'biologi',
    levelNumber: 2,
    name: 'Biologi 2',
    gy25Code: 'BIOBIO02',
    gy25Name: 'Biologi 2',
    gy11Code: 'Biologi B',
    description: 'Genetik, mikrobiologi, bioteknik.',
    creditPoints: 100,
    estimatedHours: 80,
    priority: 3,
  },
  // Kemi
  {
    slug: 'kemi-1',
    subjectSlug: 'kemi',
    levelNumber: 1,
    name: 'Kemi 1',
    gy25Code: 'KEKEM01',
    gy25Name: 'Kemi 1',
    gy11Code: 'Kemi A',
    description: 'Atomer, kemiska bindningar, reaktioner, stökiometri.',
    creditPoints: 100,
    estimatedHours: 80,
    priority: 3,
  },
  {
    slug: 'kemi-2',
    subjectSlug: 'kemi',
    levelNumber: 2,
    name: 'Kemi 2',
    gy25Code: 'KEKEM02',
    gy25Name: 'Kemi 2',
    gy11Code: 'Kemi B',
    description: 'Organisk kemi, kemisk jämvikt, analytisk kemi.',
    creditPoints: 100,
    estimatedHours: 80,
    priority: 3,
  },
  // Fysik
  {
    slug: 'fysik-1',
    subjectSlug: 'fysik',
    levelNumber: 1,
    name: 'Fysik 1',
    gy25Code: 'FYSFYS01',
    gy25Name: 'Fysik 1',
    gy11Code: 'Fysik A',
    description: 'Mekanik, termodynamik, ellära, vågrörelser.',
    creditPoints: 150,
    estimatedHours: 120,
    priority: 3,
  },
  {
    slug: 'fysik-2',
    subjectSlug: 'fysik',
    levelNumber: 2,
    name: 'Fysik 2',
    gy25Code: 'FYSFYS02',
    gy25Name: 'Fysik 2',
    gy11Code: 'Fysik B',
    description: 'Kvantfysik, kärnfysik, astrofysik.',
    creditPoints: 100,
    estimatedHours: 80,
    priority: 3,
  },
  // Svenska
  {
    slug: 'svenska-1',
    subjectSlug: 'svenska',
    levelNumber: 1,
    name: 'Svenska 1',
    gy25Code: 'SVESVE01',
    gy25Name: 'Svenska 1',
    gy11Code: 'Svenska A',
    description: 'Läsning, skrivande, kommunikation.',
    creditPoints: 100,
    estimatedHours: 80,
    priority: 2,
  },
  {
    slug: 'svenska-2',
    subjectSlug: 'svenska',
    levelNumber: 2,
    name: 'Svenska 2',
    gy25Code: 'SVESVE02',
    gy25Name: 'Svenska 2',
    gy11Code: 'Svenska B',
    description: 'Argumenterande text, litteraturanalys, språklig medvetenhet.',
    creditPoints: 100,
    estimatedHours: 80,
    priority: 2,
  },
  {
    slug: 'svenska-3',
    subjectSlug: 'svenska',
    levelNumber: 3,
    name: 'Svenska 3',
    gy25Code: 'SVESVE03',
    gy25Name: 'Svenska 3',
    gy11Code: 'Svenska C',
    description: 'Akademiskt skrivande, retorik, djupare litteraturstudier.',
    creditPoints: 100,
    estimatedHours: 80,
    priority: 2,
  },
];

// ── TARGET PROGRAMS ─────────────────────────────────────────────────────────

export const TARGET_PROGRAMS: TargetProgram[] = [
  {
    slug: 'civilingenjor',
    name: 'Civilingenjör',
    mathRequirement: 'Matematik 3',
    description: 'Tekniska högskoleutbildningar. Kräver ofta Matematik 3 + Fysik 1/2.',
    category: 'teknik',
  },
  {
    slug: 'hogskoleingenjor',
    name: 'Högskoleingenjör',
    mathRequirement: 'Matematik 2',
    description: '3-åriga ingenjörsprogram. Kräver Matematik 2.',
    category: 'teknik',
  },
  {
    slug: 'lakare',
    name: 'Läkare',
    mathRequirement: 'Matematik 2',
    description: 'Läkarprogrammet. Kräver Matematik 2, Biologi 1, Kemi 1, Fysik 1.',
    category: 'medicin',
  },
  {
    slug: 'sjukskoterska',
    name: 'Sjuksköterska',
    mathRequirement: 'Matematik 1',
    description: 'Sjuksköterskeprogrammet. Kräver Matematik 1.',
    category: 'medicin',
  },
  {
    slug: 'ekonom',
    name: 'Ekonom',
    mathRequirement: 'Matematik 2',
    description: 'Ekonomprogrammet. Kräver Matematik 2.',
    category: 'ekonomi',
  },
  {
    slug: 'jurist',
    name: 'Jurist',
    mathRequirement: 'Matematik 1',
    description: 'Juristprogrammet. Kräver Matematik 1.',
    category: 'samhalle',
  },
  {
    slug: 'polismastare',
    name: 'Polis/Socionom',
    mathRequirement: 'Matematik 1',
    description: 'Samhällsvetenskapliga program. Kräver Matematik 1.',
    category: 'samhalle',
  },
  {
    slug: 'behorighet',
    name: 'Allmän behörighet',
    mathRequirement: 'Matematik 1',
    description: 'För dig som vill läsa på högskolan men saknar specifika krav.',
    category: 'annat',
  },
];

// ── HELPERS ─────────────────────────────────────────────────────────────────

export function getLevelsBySubject(subjectSlug: SubjectSlug): Level[] {
  return LEVELS.filter(l => l.subjectSlug === subjectSlug).sort((a, b) => a.levelNumber - b.levelNumber);
}

export function getLevelBySlug(slug: LevelSlug): Level | undefined {
  return LEVELS.find(l => l.slug === slug);
}

export function getSubjectBySlug(slug: SubjectSlug): Subject | undefined {
  return SUBJECTS.find(s => s.slug === slug);
}

export function getProgramBySlug(slug: string): TargetProgram | undefined {
  return TARGET_PROGRAMS.find(p => p.slug === slug);
}

export function getRecommendedLevels(programSlug: string): Level[] {
  const program = getProgramBySlug(programSlug);
  if (!program) return [];
  
  // For now, recommend based on math requirement
  const mathReq = program.mathRequirement;
  const mathLevel = LEVELS.find(l => l.name === mathReq);
  
  const levels: Level[] = [];
  
  // Always include math requirement
  if (mathLevel) levels.push(mathLevel);
  
  // For civilingenjör, also include lower levels
  if (programSlug === 'civilingenjor' || programSlug === 'hogskoleingenjor') {
    const ma1 = LEVELS.find(l => l.slug === 'matematik-1');
    const ma2 = LEVELS.find(l => l.slug === 'matematik-2');
    if (ma1) levels.unshift(ma1);
    if (ma2 && !levels.find(l => l.slug === 'matematik-2')) levels.splice(1, 0, ma2);
  }
  
  return levels;
}
