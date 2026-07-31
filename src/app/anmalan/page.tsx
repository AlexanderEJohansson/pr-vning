import type { Metadata } from 'next';
import Link from 'next/link';
import { AnimateIn } from '@/components/AnimateIn';
import { EcosystemCta } from '@/components/EcosystemCta';
import {
  JsonLd,
  breadcrumbSchema,
  howToSchema,
  faqPageSchema,
} from '@/components/JsonLd';
import { QuickAnswer } from '@/components/QuickAnswer';
import { SourceList } from '@/components/SourceList';
import { ECOSYSTEM } from '@/lib/ecosystem';
import { faqByIds } from '@/lib/faq-data';
import { KOMMUN_EXAMPLES, sourceById, SOURCES_UPDATED } from '@/lib/sources';
import { FaqList } from '@/components/FaqList';

export const metadata: Metadata = {
  title: 'Anmälan till prövning — gymnasiet och komvux',
  description:
    'Hur anmäler du dig till prövning för att höja gymnasiebetyg? Steg för steg för vuxna via komvux och gymnasieskola. Skolverket, kommun-exempel och nästa steg.',
  openGraph: {
    title: 'Anmälan till prövning — Prövning.se',
    description:
      'Steg-för-steg: hur vuxna anmäler sig till prövning via kommun och gymnasium. Inte en myndighetssajt.',
  },
};

const HOWTO_STEPS = [
  {
    name: 'Bestäm kurs eller nivå',
    text: 'Välj vilken mattekurs eller nivå du behöver (till exempel Matematik 2b). Prövning gäller hela kursen eller nivån, inte bara en del.',
  },
  {
    name: 'Kolla vad utbildningen kräver',
    text: 'Använd NP-Monstrets antagningskoll och bekräfta mot den utbildning du siktar på, så du inte pluggar fel nivå.',
  },
  {
    name: 'Välj väg: komvux eller gymnasieskola',
    text: 'De flesta vuxna går via kommunens komvux. Är du elev på gymnasiet kontaktar du i första hand din skola. Är du inte elev kan du pröva vid skola som anordnar ämnet, eller via komvux.',
  },
  {
    name: 'Hitta din kommun eller skola',
    text: 'Sök på kommunens webbplats efter prövning och komvux, eller kontakta gymnasieskolan som anordnar ämnet. Det finns ingen nationell anmälningsknapp.',
  },
  {
    name: 'Följ lokal anmälan och avgift',
    text: 'Anmäl dig enligt kommunens eller skolans rutin. Fråga om avgift, datum och vad prövningen innehåller.',
  },
  {
    name: 'Öva tills du är redo',
    text: 'Träna på hela kursens innehåll. Använd Prövning.se för Matematik 1–3 och NP-Monstret för mer träning.',
  },
];

const PAGE_URL = 'https://xn--prvning-b1a.se/anmalan';

export default function AnmalanPage() {
  const relatedFaq = faqByIds([
    'hur-anmaler-jag',
    'gymnasium-eller-komvux',
    'kostar-det',
    'tid',
    'far-jag-prova-igen',
  ]);

  const sources = [
    sourceById('skolverket-provning')!,
    sourceById('skolverket-allmanna-rad')!,
    sourceById('stockholm')!,
    sourceById('malmo')!,
    sourceById('uppsala')!,
  ];

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Hem', url: 'https://xn--prvning-b1a.se/' },
            { name: 'Anmälan', url: PAGE_URL },
          ]),
          howToSchema({
            name: 'Hur anmäler man sig till prövning för betyg?',
            description:
              'Steg för vuxna som vill anmäla sig till prövning via komvux eller gymnasieskola i Sverige.',
            steps: HOWTO_STEPS,
            url: PAGE_URL,
          }),
          faqPageSchema(relatedFaq, PAGE_URL),
        ]}
      />

      <AnimateIn>
        <nav className="text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-800">
            Hem
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700">Anmälan</span>
        </nav>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
          Så anmäler du dig till prövning
        </h1>
      </AnimateIn>

      <div className="mt-6">
        <QuickAnswer>
          <p>
            Det finns ingen nationell e-tjänst för prövning. Du anmäler dig via{' '}
            <strong>din kommuns komvux</strong> (vanligast för vuxna) eller via en{' '}
            <strong>gymnasieskola</strong> som anordnar ämnet. Rättigheter och regler
            beskrivs av{' '}
            <a
              href={ECOSYSTEM.skolverketProvning.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-800 underline underline-offset-2"
            >
              Skolverket
            </a>
            . Prövning.se hjälper dig förstå stegen och öva — vi tar inte emot anmälan.
          </p>
        </QuickAnswer>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">Steg för steg</h2>
        <ol className="mt-5 space-y-4">
          {HOWTO_STEPS.map((step, i) => (
            <li
              key={step.name}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">{step.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.text}</p>
                {i === 1 && (
                  <a
                    href={ECOSYSTEM.antagningskoll.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm font-semibold text-emerald-700 underline underline-offset-2"
                  >
                    Öppna NP-Monstrets antagningskoll
                  </a>
                )}
                {i === 5 && (
                  <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold">
                    <Link href="/kurser" className="text-emerald-700 underline underline-offset-2">
                      Öva matte här
                    </Link>
                    <a
                      href={ECOSYSTEM.komvux.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 underline underline-offset-2"
                    >
                      Mer träning på NP-Monstret
                    </a>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <h2 className="text-lg font-bold text-slate-900">Vuxen via komvux</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Vanligaste vägen om du vill höja eller komplettera gymnasiebetyg. Gå till
            din kommuns webbplats för vuxenutbildning, sök på prövning, och följ
            anmälningsrutin. Du kan ofta pröva även om du tidigare fått betyg — men
            kolla lokalt.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <h2 className="text-lg font-bold text-slate-900">Gymnasium</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            <strong>Elev:</strong> prövning vid den egna skolenheten, med begränsningar
            om du redan har godkänt betyg på nivån. <strong>Inte elev:</strong> rätt att
            pröva vid skola som anordnar ämnet på den nivå det gäller. Kontakta skolan
            eller SYV — det är de som organiserar.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">Exempel: kommuners sidor</h2>
        <p className="mt-2 text-sm text-slate-600">
          Länkarna är exempel för att komma igång. Sidor flyttas ibland. Senast
          kontrollerade {SOURCES_UPDATED}. Hittar du inte din kommun: sök{' '}
          <em>[kommunnamn] prövning komvux</em>.
        </p>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {KOMMUN_EXAMPLES.map((k) => (
            <li key={k.name}>
              <a
                href={k.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col rounded-xl border border-slate-200 bg-white px-4 py-3 transition hover:border-emerald-200 hover:bg-emerald-50/40"
              >
                <span className="font-semibold text-slate-900">{k.name}</span>
                <span className="text-sm text-emerald-700">{k.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10">
        <EcosystemCta variant="antagning" />
      </div>

      <div className="mt-12">
        <FaqList items={relatedFaq} title="Frågor om anmälan" />
      </div>

      <div className="mt-12">
        <SourceList sources={sources} title="Källor till den här sidan" />
      </div>

      <p className="mt-8 text-center text-sm text-slate-500">
        <Link href="/faq" className="font-medium text-emerald-700 underline underline-offset-2">
          Alla vanliga frågor
        </Link>
        {' · '}
        <Link href="/hoja-betyg" className="font-medium text-emerald-700 underline underline-offset-2">
          Höja gymnasiebetyg
        </Link>
        {' · '}
        <Link href="/kurser" className="font-medium text-emerald-700 underline underline-offset-2">
          Öva matte
        </Link>
      </p>
    </main>
  );
}
