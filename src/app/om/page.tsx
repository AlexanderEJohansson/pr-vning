import type { Metadata } from 'next';
import Link from 'next/link';
import { AnimateIn } from '@/components/AnimateIn';
import { EcosystemCta } from '@/components/EcosystemCta';
import { JsonLd, breadcrumbSchema } from '@/components/JsonLd';
import { QuickAnswer } from '@/components/QuickAnswer';
import { SourceList } from '@/components/SourceList';
import { ECOSYSTEM } from '@/lib/ecosystem';
import { sourceById } from '@/lib/sources';

export const metadata: Metadata = {
  title: 'Om prövning och Prövning.se',
  description:
    'Vad är prövning för betyg? Hur funkar Prövning.se? För vuxna som vill höja gymnasiebetyg via komvux eller gymnasiet.',
};

export default function OmPage() {
  const sources = [
    sourceById('skolverket-provning')!,
    sourceById('skolverket-allmanna-rad')!,
    sourceById('antagningskoll')!,
  ];

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Hem', url: 'https://xn--prvning-b1a.se/' },
          { name: 'Om', url: 'https://xn--prvning-b1a.se/om' },
        ])}
      />

      <AnimateIn>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Om prövning och Prövning.se
        </h1>
      </AnimateIn>

      <div className="mt-6">
        <QuickAnswer>
          <p>
            En prövning är en bedömning av dina kunskaper mot{' '}
            <strong>hela</strong> betygskriterierna i en kurs eller nivå. Prövning.se
            är en oberoende, gratis sajt som förklarar hur det funkar, hur du anmäler
            dig, och låter dig öva matematik — vi är inte Skolverket och tar inte emot
            anmälan.
          </p>
        </QuickAnswer>
      </div>

      <div className="mt-10 space-y-8 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-slate-900">Vad är en prövning?</h2>
          <p className="mt-2">
            Enligt Skolverket är en prövning en bedömning av den prövandes kunskaper i
            förhållande till betygskriterierna. Den avser aldrig bara en del av kursen
            — utan en hel kurs, nivå eller ett helt ämne beroende på skolform.
          </p>
          <p className="mt-2">
            På komvux är prövning vanligt för vuxna som vill få eller höja betyg inför
            högskola. På gymnasiet gäller delvis andra regler beroende på om du är elev
            eller inte. Läs mer hos{' '}
            <a
              href={ECOSYSTEM.skolverketProvning.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-700 underline underline-offset-2"
            >
              Skolverket om prövning för betyg
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900">Vad är Prövning.se?</h2>
          <p className="mt-2">
            En gratis övnings- och vägledningssajt för dig som ska ta prövning eller
            läsa upp betyg i matematik. Fokus: Matematik 1, 2 och 3 (varianter a/b/c
            där det gäller), plus guider om anmälan och vanliga frågor.
          </p>
          <p className="mt-2">
            Frågorna kommer från bland annat tidigare nationella prov och
            övningsmaterial. Materialet är avsett för träning — inte som facit för ett
            pågående nationellt prov.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900">Vem är det till för?</h2>
          <p className="mt-2">
            Vuxna (ungefär 18–45 år) som vill höja gymnasiebetyg, få behörighet eller
            klara en prövning — ofta via komvux. Tonen är rak och vuxen.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900">Hur hänger ekosystemet ihop?</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm">
            <li>
              <strong>Prövning.se</strong> — prövning, anmälan, öva matte 1–3
            </li>
            <li>
              <a
                href={ECOSYSTEM.antagningskoll.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-700 underline underline-offset-2"
              >
                NP-Monstrets antagningskoll
              </a>{' '}
              — vad som krävs för utbildningar
            </li>
            <li>
              <a
                href={ECOSYSTEM.npmonstret.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-700 underline underline-offset-2"
              >
                NP-Monstret
              </a>{' '}
              — mer träning och komvux
            </li>
            <li>
              <a
                href={ECOSYSTEM.npguide.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-700 underline underline-offset-2"
              >
                NP-guide
              </a>{' '}
              — regler och forskning om nationella prov
            </li>
            <li>
              <a
                href={ECOSYSTEM.npprov.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-700 underline underline-offset-2"
              >
                npprov.se
              </a>{' '}
              — NP-arkiv och proveniens
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900">Kostar det?</h2>
          <p className="mt-2">
            Övningen på Prövning.se är gratis. Själva prövningen hos komvux eller skola
            kan kosta — det bestämmer din kommun eller skola.
          </p>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/anmalan"
            className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600"
          >
            Så anmäler du dig
          </Link>
          <Link
            href="/hoja-betyg"
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Höja betyg
          </Link>
          <Link
            href="/faq"
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            FAQ
          </Link>
        </div>

        <EcosystemCta variant="antagning" />
        <SourceList sources={sources} title="Primära källor" />
      </div>
    </main>
  );
}
