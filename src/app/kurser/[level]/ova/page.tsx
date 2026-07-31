import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PracticeSession } from '@/components/PracticeSession';
import {
  getMathLevel,
  isMathLevelSlug,
  isValidVariant,
  MATH_LEVELS,
  type MathVariant,
} from '@/lib/math-catalog';

type Props = {
  params: Promise<{ level: string }>;
  searchParams: Promise<{ variant?: string; topic?: string }>;
};

export function generateStaticParams() {
  return MATH_LEVELS.map((l) => ({ level: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { level: slug } = await params;
  const level = getMathLevel(slug);
  if (!level) return { title: 'Öva' };
  return {
    title: `Öva ${level.name}`,
    description: `Öva inför prövning i ${level.name}.`,
  };
}

export default async function OvaPage({ params, searchParams }: Props) {
  const { level: slug } = await params;
  const sp = await searchParams;

  if (!isMathLevelSlug(slug)) notFound();
  const level = getMathLevel(slug)!;

  let variant: MathVariant | null = null;
  if (sp.variant) {
    if (!isValidVariant(level, sp.variant)) notFound();
    variant = sp.variant;
  }

  const topic = sp.topic || null;
  const topicMeta = topic
    ? level.topics.find((t) => t.slug === topic) || null
    : null;
  if (topic && !topicMeta) notFound();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <PracticeSession
        level={level.slug}
        levelName={level.name}
        variant={variant}
        topic={topic}
        topicName={topicMeta?.name}
      />
    </main>
  );
}
