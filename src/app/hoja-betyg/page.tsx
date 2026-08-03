import type { Metadata } from 'next';
import Link from 'next/link';
import { AnimateIn } from '@/components/AnimateIn';
import { CiteMagnet, CITE_MAGNETS } from '@/components/CiteMagnet';
import { EcosystemCta } from '@/components/EcosystemCta';
import { FaqList } from '@/components/FaqList';
import { JsonLd, breadcrumbSchema, faqPageSchema } from '@/components/JsonLd';
import { QuickAnswer } from '@/components/QuickAnswer';
import { ECOSYSTEM, withEcosystemUtm } from '@/lib/ecosystem';
import { faqByIds } from '@/lib/faq-data';

export const metadata: Metadata = {
  title: 'Så höjer du gymnasiebetyg som vuxen',
  description:
    'Prövning eller läsa kurs, anmälan lokalt, och övning. Kort steg-för-steg för dig som vill komplettera gymnasiebetyg.',
  alternates: { canonical: 'https://xn--prvning-b1a.se/hoja-betyg' },
  openGraph: { url: 'https://xn--prvning-b1a.se/hoja-betyg' },
};

const PAGE_URL = 'https://xn--prvning-b1a.se/hoja-betyg';

const faq = faqByIds([
  'vad-kravs-program',
  'gymnasium-eller-komvux',
  'hur-anmaler-jag',
  'hur-pluggar-jag',
  'provning-vs-kurs-vs-np',
  'underkand',
  'flera-ganger',
  'betyg-tid',
  'npcoachen',
]);

export default function HojaBetygPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Hem', url: 'https://xn--prvning-b1a.se/' },
            { name: 'Höja betyg', url: PAGE_URL },
          ]),
          faqPageSchema(faq, PAGE_URL),
        ]}
      />

      <AnimateIn>
        <nav className="text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-800">
            Hem
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700">Höja betyg</span>
        </nav>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 text-balance">
          Höja gymnasiebetyg som vuxen
        </h1>
      </AnimateIn>

      <div className="mt-6 space-y-4">
        <CiteMagnet text={CITE_MAGNETS.hoja} />
        <QuickAnswer>
          <p>
            Kolla först <strong>vad utbildningen kräver</strong>, välj sedan
            prövning eller kurs, anmäl dig hos kommun eller skola, och öva hela
            innehållet. Behörighet:{' '}
            <a
              href={withEcosystemUtm(ECOSYSTEM.antagningskoll.href, 'hoja-betyg')}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-800 underline underline-offset-2"
            >
              antagningskoll
            </a>
            . Matte 1–3 övar du här.
          </p>
        </QuickAnswer>
      </div>

      <ol className="mt-10 space-y-4">
        {[
          {
            title: '1. Vad krävs för ditt mål?',
            body: (
              <>
                Olika program kräver olika mattenivåer och ämnen. Kolla{' '}
                <a
                  href={withEcosystemUtm(ECOSYSTEM.antagningskoll.href, 'hoja-betyg')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-emerald-700 underline underline-offset-2"
                >
                  antagningskoll på NP-Monstret
                </a>{' '}
                och bekräfta mot den utbildning du söker.
              </>
            ),
          },
          {
            title: '2. Välj väg: prövning eller läsa kurs',
            body: (
              <>
                Prövning passar om du redan kan innehållet och vill ha betyg snabbt. Läsa
                kurs på komvux passar om du behöver mer undervisning. Läs mer under{' '}
                <Link href="/om" className="font-medium text-emerald-700 underline underline-offset-2">
                  om prövning
                </Link>
                .
              </>
            ),
          },
          {
            title: '3. Anmäl dig rätt',
            body: (
              <>
                Via kommunens komvux eller gymnasieskola — inte via en nationell knapp.
                Följ{' '}
                <Link href="/anmalan" className="font-medium text-emerald-700 underline underline-offset-2">
                  anmälningsguiden
                </Link>
                .
              </>
            ),
          },
          {
            title: '4. Öva hela kursen',
            body: (
              <>
                Prövning täcker hela betygskriterierna. Börja med{' '}
                <Link href="/kurser" className="font-medium text-emerald-700 underline underline-offset-2">
                  Matematik 1–3 här
                </Link>
                . Behöver du fler ämnen:{' '}
                <a
                  href={withEcosystemUtm(ECOSYSTEM.npcoachen.href, 'hoja-betyg')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-emerald-700 underline underline-offset-2"
                >
                  NPcoachen
                </a>
                .
              </>
            ),
          },
        ].map((step) => (
          <li
            key={step.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card"
          >
            <h2 className="font-bold text-slate-900">{step.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 space-y-6">
        <EcosystemCta variant="antagning" campaign="hoja-betyg" />
        <EcosystemCta variant="train" campaign="hoja-betyg" />
      </div>

      <div className="mt-12">
        <FaqList items={faq} title="Relaterade frågor" />
      </div>
    </main>
  );
}
