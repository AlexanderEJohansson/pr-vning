import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AnimateIn } from '@/components/AnimateIn';
import { EcosystemCta } from '@/components/EcosystemCta';
import { getMathLevel, isMathLevelSlug, MATH_LEVELS } from '@/lib/math-catalog';
import { ECOSYSTEM } from '@/lib/ecosystem';

type Props = { params: Promise<{ level: string }> };

export function generateStaticParams() {
  return MATH_LEVELS.map((l) => ({ level: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { level: slug } = await params;
  const level = getMathLevel(slug);
  if (!level) return { title: 'Kurs' };
  return {
    title: `${level.name} — öva inför prövning`,
    description: level.description,
  };
}

export default async function CoursePage({ params }: Props) {
  const { level: slug } = await params;
  if (!isMathLevelSlug(slug)) notFound();
  const level = getMathLevel(slug)!;

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <AnimateIn>
        <nav className="text-sm text-slate-500">
          <Link href="/kurser" className="hover:text-slate-800">
            Kurser
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700">{level.name}</span>
        </nav>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
          {level.name}
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">{level.description}</p>
        <p className="mt-2 text-sm text-slate-500">
          Cirka {level.estimatedQuestions} frågor i databasen.
        </p>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          Osäker på om du behöver just {level.name}? Kolla först{' '}
          <a
            href={ECOSYSTEM.antagningskoll.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-emerald-700 underline underline-offset-2"
          >
            NP-Monstrets antagningskoll
          </a>
          . Ska du anmäla prövning? Se{' '}
          <Link href="/anmalan" className="font-medium text-emerald-700 underline underline-offset-2">
            anmälningsguiden
          </Link>
          .
        </p>
      </AnimateIn>

      <section className="mt-10">
        <AnimateIn delayMs={60}>
          <h2 className="text-lg font-bold text-slate-900">1. Välj variant (valfritt)</h2>
          <p className="mt-1 text-sm text-slate-500">
            Lämna blankt för blandade frågor, inklusive generella uppgifter utan
            variant.
          </p>
        </AnimateIn>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <AnimateIn delayMs={80}>
            <Link
              href={`/kurser/${level.slug}/ova`}
              className="shadow-card shadow-card-hover flex h-full flex-col rounded-2xl border-2 border-emerald-500 bg-white p-5 transition"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                Rekommenderat
              </span>
              <span className="mt-2 font-bold text-slate-900">Alla varianter</span>
              <span className="mt-1 text-sm text-slate-500">
                Blandat material — bra om du är osäker
              </span>
            </Link>
          </AnimateIn>
          {level.variants.map((v, i) => (
            <AnimateIn key={v.variant} delayMs={100 + i * 40}>
              <Link
                href={`/kurser/${level.slug}/ova?variant=${v.variant}`}
                className="card-gradient-border shadow-card shadow-card-hover flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition"
              >
                <span className="font-bold text-slate-900">{v.label}</span>
                <span className="mt-1 text-xs text-slate-400">{v.courseCode}</span>
                <span className="mt-3 text-sm font-medium text-emerald-600">
                  Öva {v.shortName} →
                </span>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <AnimateIn>
          <h2 className="text-lg font-bold text-slate-900">2. Eller filtrera på ämne</h2>
          <p className="mt-1 text-sm text-slate-500">
            Kombinera med variant via länkarna under varje ämne.
          </p>
        </AnimateIn>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {level.topics.map((topic, i) => (
            <AnimateIn key={topic.slug} delayMs={i * 40}>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
                <h3 className="font-semibold text-slate-900">{topic.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{topic.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`/kurser/${level.slug}/ova?topic=${topic.slug}`}
                    className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                  >
                    Alla
                  </Link>
                  {level.variants.map((v) => (
                    <Link
                      key={v.variant}
                      href={`/kurser/${level.slug}/ova?topic=${topic.slug}&variant=${v.variant}`}
                      className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200"
                    >
                      {v.shortName}
                    </Link>
                  ))}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      <div className="mt-12 space-y-6">
        <EcosystemCta variant="antagning" />
        <EcosystemCta variant="train" />
      </div>
    </main>
  );
}
