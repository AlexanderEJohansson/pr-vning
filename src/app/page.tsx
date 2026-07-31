import Link from 'next/link';
import { AnimateIn } from '@/components/AnimateIn';
import { MATH_LEVELS } from '@/lib/math-catalog';

const totalQuestions = MATH_LEVELS.reduce((sum, l) => sum + l.estimatedQuestions, 0);

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto max-w-5xl px-4 pb-16 pt-14 sm:pt-20">
        <AnimateIn>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            Komvux · prövning · matematik
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Öva inför prövning i matematik — gratis
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            För dig som läser upp betyg på komvux eller tar prövning. Över{' '}
            {totalQuestions.toLocaleString('sv-SE')} frågor i Matematik 1, 2 och 3.
            Vuxen ton, ingen barnslig app.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/kurser"
              className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              Välj din kurs
            </Link>
            <Link
              href="/om"
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Om prövning
            </Link>
          </div>
        </AnimateIn>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {MATH_LEVELS.map((level, i) => (
            <AnimateIn key={level.slug} delayMs={80 * (i + 1)}>
              <Link
                href={`/kurser/${level.slug}`}
                className="card-gradient-border shadow-card shadow-card-hover block rounded-2xl border border-slate-200 bg-white p-6 transition"
              >
                <div className="flex items-baseline justify-between">
                  <h2 className="text-xl font-bold text-slate-900">{level.name}</h2>
                  <span className="text-sm font-medium text-emerald-600">
                    {level.estimatedQuestions} frågor
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{level.description}</p>
                <p className="mt-4 text-xs font-medium text-slate-400">
                  {level.variants.map((v) => v.shortName).join(' · ')}
                </p>
              </Link>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delayMs={320} className="mt-16 rounded-2xl border border-slate-200 bg-white p-8 shadow-card">
          <h2 className="text-lg font-bold text-slate-900">Så funkar det</h2>
          <ol className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Välj kurs',
                body: 'Matematik 1, 2 eller 3 — och rätt variant (a/b/c) om du vill.',
              },
              {
                step: '2',
                title: 'Filtrera ämne',
                body: 'Algebra, funktioner, derivata och mer. Eller blanda allt.',
              },
              {
                step: '3',
                title: 'Öva i din takt',
                body: 'Läs uppgiften, tänk själv, visa facit när du är redo.',
              },
            ].map((item) => (
              <li key={item.step} className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">
                  {item.step}
                </span>
                <div>
                  <p className="font-semibold text-slate-800">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </AnimateIn>
      </section>
    </main>
  );
}
