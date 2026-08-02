import type { Metadata } from 'next';
import Link from 'next/link';
import { AnimateIn } from '@/components/AnimateIn';
import { CiteMagnet, CITE_MAGNETS } from '@/components/CiteMagnet';
import { EcosystemCta } from '@/components/EcosystemCta';
import { FaqList } from '@/components/FaqList';
import { JsonLd, faqPageSchema } from '@/components/JsonLd';
import { QuickAnswer } from '@/components/QuickAnswer';
import { ECOSYSTEM, withEcosystemUtm } from '@/lib/ecosystem';
import { faqByIds, FAQ_HOME_IDS } from '@/lib/faq-data';
import { MATH_LEVELS } from '@/lib/math-catalog';

export const metadata: Metadata = {
  title:
    'Prövning.se — Vägledning för vuxna: prövning, anmälan via kommun & Matte 1–3',
  description:
    'Vuxen och vill höja gymnasiebetyg? Förklaring av prövning, hur anmälan funkar via kommun eller skola (vi tar inte emot anmälan), och gratis övning i Matematik 1–3. Inte Skolverket.',
};

const homeFaq = faqByIds(FAQ_HOME_IDS);
const totalQuestions = MATH_LEVELS.reduce((sum, l) => sum + l.estimatedQuestions, 0);

export default function HomePage() {
  return (
    <main>
      {/* Organization + WebSite i root layout; FAQ endast här */}
      <JsonLd data={faqPageSchema(homeFaq, 'https://xn--prvning-b1a.se/')} />

      <section className="mx-auto max-w-5xl px-4 pb-8 pt-14 sm:pt-16">
        <AnimateIn>
          <p className="text-sm font-semibold tracking-wide text-emerald-700">
            För dig som är vuxen och vill höja betyg
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl text-balance">
            Förstå prövning, hitta rätt anmälan och öva matte
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Vi förklarar hur prövning funkar, var du anmäler dig (kommun eller skola)
            och låter dig öva Matematik 1–3 gratis. Vi tar inte emot anmälan och är
            inte Skolverket.
          </p>
        </AnimateIn>

        <div className="mt-8 space-y-4">
          <CiteMagnet text={CITE_MAGNETS.home} />
          <QuickAnswer>
            <p>
              Börja med att kolla vad din utbildning kräver via{' '}
              <a
                href={withEcosystemUtm(ECOSYSTEM.antagningskoll.href, 'home')}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-emerald-800 underline underline-offset-2"
              >
                NP-Monstrets antagningskoll
              </a>
              , anmäl dig via{' '}
              <Link href="/anmalan" className="font-semibold text-emerald-800 underline underline-offset-2">
                din kommun eller skola
              </Link>
              , och{' '}
              <Link href="/kurser" className="font-semibold text-emerald-800 underline underline-offset-2">
                öva matte här
              </Link>
              . Prövning.se är inte Skolverket — officiella regler finns hos myndigheten.
            </p>
          </QuickAnswer>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            {
              href: withEcosystemUtm(ECOSYSTEM.antagningskoll.href, 'home'),
              external: true,
              step: '1',
              title: 'Vad behöver du?',
              body: 'Kolla behörighet med NP-Monstrets antagningskoll innan du väljer kurs.',
              cta: 'Öppna antagningskoll',
            },
            {
              href: '/anmalan',
              external: false,
              step: '2',
              title: 'Anmäl dig rätt',
              body: 'Steg för komvux och gymnasium. Exempel från kommuner. Ingen nationell knapp.',
              cta: 'Så anmäler du dig',
            },
            {
              href: '/kurser',
              external: false,
              step: '3',
              title: 'Öva matte',
              body: `Över ${totalQuestions.toLocaleString('sv-SE')} frågor i Matematik 1, 2 och 3.`,
              cta: 'Välj kurs',
            },
          ].map((card, i) => {
            const className =
              'card-gradient-border shadow-card shadow-card-hover flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition';
            const inner = (
              <>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">
                  {card.step}
                </span>
                <h2 className="mt-4 text-lg font-bold text-slate-900">{card.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{card.body}</p>
                <span className="mt-4 text-sm font-semibold text-emerald-600">{card.cta} →</span>
              </>
            );
            return (
              <AnimateIn key={card.step} delayMs={60 * (i + 1)}>
                {card.external ? (
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link href={card.href} className={className}>
                    {inner}
                  </Link>
                )}
              </AnimateIn>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-xl font-bold text-slate-900">Öva Matematik 1–3</h2>
          <Link href="/hoja-betyg" className="text-sm font-medium text-emerald-700 underline underline-offset-2">
            Guide: höja betyg
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {MATH_LEVELS.map((level, i) => (
            <AnimateIn key={level.slug} delayMs={40 * i}>
              <Link
                href={`/kurser/${level.slug}`}
                className="shadow-card shadow-card-hover block rounded-2xl border border-slate-200 bg-white p-5 transition"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold text-slate-900">{level.name}</h3>
                  <span className="text-xs font-medium text-slate-500">
                    ~{level.estimatedQuestions}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">{level.description}</p>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
          <h2 className="text-lg font-bold text-slate-900">Snabbfakta om prövning</h2>
          <ul className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
            <li className="flex gap-2">
              <span className="font-bold text-emerald-600">·</span>
              Gäller hela kursen eller nivån — inte bara en del.
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-emerald-600">·</span>
              Anmälan sker lokalt (kommun/skola), inte nationellt.
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-emerald-600">·</span>
              Vuxna går oftast via komvux; gymnasieelever via sin skola.
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-emerald-600">·</span>
              Avgift och tider bestäms lokalt.
            </li>
          </ul>
          <p className="mt-4 text-sm text-slate-500">
            Källa:{' '}
            <a
              href={ECOSYSTEM.skolverketProvning.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-700 underline underline-offset-2"
            >
              Skolverket — Prövning för betyg
            </a>
            . Mer i{' '}
            <Link href="/faq" className="font-medium text-emerald-700 underline underline-offset-2">
              FAQ
            </Link>{' '}
            och{' '}
            <Link href="/kallor" className="font-medium text-emerald-700 underline underline-offset-2">
              källor
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-10">
        <FaqList items={homeFaq} title="Vanliga frågor" />
        <p className="mt-4 text-sm text-slate-500">
          <Link href="/faq" className="font-medium text-emerald-700 underline underline-offset-2">
            Visa alla frågor
          </Link>
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 space-y-6">
        <EcosystemCta variant="full" campaign="home" />
        <EcosystemCta variant="train" campaign="home" />
        <EcosystemCta variant="compact" campaign="home" />
      </section>
    </main>
  );
}
