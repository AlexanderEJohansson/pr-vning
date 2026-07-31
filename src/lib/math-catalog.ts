/**
 * Matematik-kurser for provning — varianter, topics, uppskattade fragantal.
 * Fragor lastas live fran API; counts ar fallback for UI nar API saknas.
 */

export type MathVariant = 'a' | 'b' | 'c';
export type MathLevelSlug = 'matematik-1' | 'matematik-2' | 'matematik-3';

export interface MathTopic {
  slug: string;
  name: string;
  description: string;
}

export interface MathCourseVariant {
  variant: MathVariant;
  label: string;
  courseCode: string;
  shortName: string;
}

export interface MathLevelInfo {
  slug: MathLevelSlug;
  name: string;
  levelNumber: 1 | 2 | 3;
  description: string;
  variants: MathCourseVariant[];
  estimatedQuestions: number;
  topics: MathTopic[];
}

export const MATH_TOPICS: MathTopic[] = [
  { slug: 'algebra', name: 'Algebra', description: 'Ekvationer, uttryck, potenser' },
  { slug: 'geometri', name: 'Geometri', description: 'Former, vinklar, area, volym' },
  { slug: 'funktioner', name: 'Funktioner', description: 'Linjara och andragradiga funktioner' },
  { slug: 'statistik', name: 'Statistik', description: 'Data, medelvarde, sannolikhet' },
  { slug: 'trigonometri', name: 'Trigonometri', description: 'Sinus, cosinus, tangens' },
  { slug: 'derivata', name: 'Derivata', description: 'Derivata och tillampningar (Ma3)' },
];

export const MATH_LEVELS: MathLevelInfo[] = [
  {
    slug: 'matematik-1',
    name: 'Matematik 1',
    levelNumber: 1,
    description:
      'Grundlaggande matematik for komvux. Algebra, geometri, statistik och enklare funktioner.',
    estimatedQuestions: 369,
    variants: [
      { variant: 'a', label: 'Matematik 1a', courseCode: 'MATMAT01a', shortName: '1a' },
      { variant: 'b', label: 'Matematik 1b', courseCode: 'MATMAT01b', shortName: '1b' },
      { variant: 'c', label: 'Matematik 1c', courseCode: 'MATMAT01c', shortName: '1c' },
    ],
    topics: MATH_TOPICS.filter((t) => t.slug !== 'derivata'),
  },
  {
    slug: 'matematik-2',
    name: 'Matematik 2',
    levelNumber: 2,
    description:
      'Algebra, funktioner, trigonometri och statistik. Kravs for de flesta hogskoleprogram.',
    estimatedQuestions: 570,
    variants: [
      { variant: 'a', label: 'Matematik 2a', courseCode: 'MATMAT02a', shortName: '2a' },
      { variant: 'b', label: 'Matematik 2b', courseCode: 'MATMAT02b', shortName: '2b' },
      { variant: 'c', label: 'Matematik 2c', courseCode: 'MATMAT02c', shortName: '2c' },
    ],
    topics: MATH_TOPICS.filter((t) => t.slug !== 'derivata'),
  },
  {
    slug: 'matematik-3',
    name: 'Matematik 3',
    levelNumber: 3,
    description:
      'Derivata, integraler, algebra och geometri. Vanligt krav for tekniska utbildningar.',
    estimatedQuestions: 604,
    variants: [
      { variant: 'b', label: 'Matematik 3b', courseCode: 'MATMAT03b', shortName: '3b' },
      { variant: 'c', label: 'Matematik 3c', courseCode: 'MATMAT03c', shortName: '3c' },
    ],
    topics: MATH_TOPICS,
  },
];

export function getMathLevel(slug: string): MathLevelInfo | undefined {
  return MATH_LEVELS.find((l) => l.slug === slug);
}

export function isMathLevelSlug(slug: string): slug is MathLevelSlug {
  return MATH_LEVELS.some((l) => l.slug === slug);
}

export function isValidVariant(level: MathLevelInfo, variant: string): variant is MathVariant {
  return level.variants.some((v) => v.variant === variant);
}
