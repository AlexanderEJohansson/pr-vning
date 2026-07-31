import type { Metadata } from 'next';
import Link from 'next/link';
import { AnimateIn } from '@/components/AnimateIn';
import { MATH_LEVELS } from '@/lib/math-catalog';

export const metadata: Metadata = {
  title: 'Kurser',
  description:
    'Välj Matematik 1, 2 eller 3 och öva inför prövning på komvux. Gratis frågebank.',
};

export default function KurserPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <AnimateIn>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Kurser</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Välj den mattekurs du ska pröva eller läsa upp. Du kan filtrera på variant
          (1a, 2b, 3c …) och ämnesområde när du startar övningen.
        </p>
      </AnimateIn>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {MATH_LEVELS.map((level, i) => (
          <AnimateIn key={level.slug} delayMs={i * 80}>
            <Link
              href={`/kurser/${level.slug}`}
              className="card-gradient-border shadow-card shadow-card-hover flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                  Nivå {level.levelNumber}
                </span>
                <span className="text-sm font-medium text-slate-500">
                  ~{level.estimatedQuestions} frågor
                </span>
              </div>
              <h2 className="mt-4 text-xl font-bold text-slate-900">{level.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                {level.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {level.variants.map((v) => (
                  <span
                    key={v.variant}
                    className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
                  >
                    {v.shortName}
                  </span>
                ))}
              </div>
              <span className="mt-5 text-sm font-semibold text-emerald-600">
                Öppna kurs →
              </span>
            </Link>
          </AnimateIn>
        ))}
      </div>

      <AnimateIn delayMs={280} className="mt-12 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-bold text-slate-900">Vilken variant ska jag välja?</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li>
            <strong className="text-slate-800">a</strong> — ofta yrkesprogram / mer
            tillämpad inriktning
          </li>
          <li>
            <strong className="text-slate-800">b</strong> — samhälls- och
            ekonomiinriktning (vanligast på komvux)
          </li>
          <li>
            <strong className="text-slate-800">c</strong> — naturvetenskap / teknik
          </li>
        </ul>
        <p className="mt-3 text-sm text-slate-500">
          Osäker? Börja utan filter — du får blandade uppgifter och kan snäva in senare.
        </p>
      </AnimateIn>
    </main>
  );
}
