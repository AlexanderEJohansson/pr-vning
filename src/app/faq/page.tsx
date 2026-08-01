import type { Metadata } from 'next';
import Link from 'next/link';
import { AnimateIn } from '@/components/AnimateIn';
import { EcosystemCta } from '@/components/EcosystemCta';
import { FaqList } from '@/components/FaqList';
import { JsonLd, breadcrumbSchema, faqPageSchema } from '@/components/JsonLd';
import { QuickAnswer } from '@/components/QuickAnswer';
import { FAQ_ITEMS } from '@/lib/faq-data';
import { ECOSYSTEM } from '@/lib/ecosystem';

export const metadata: Metadata = {
  title: 'FAQ — prövning, komvux och höja betyg',
  description:
    'Vanliga frågor om prövning för betyg, anmälan, komvux, gymnasiet, avgift och hur du övar. För vuxna som vill höja gymnasiebetyg.',
};

const PAGE_URL = 'https://xn--prvning-b1a.se/faq';

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Hem', url: 'https://xn--prvning-b1a.se/' },
            { name: 'FAQ', url: PAGE_URL },
          ]),
          faqPageSchema(FAQ_ITEMS, PAGE_URL),
        ]}
      />

      <AnimateIn>
        <nav className="text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-800">
            Hem
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700">FAQ</span>
        </nav>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
          Vanliga frågor om prövning
        </h1>
      </AnimateIn>

      <div className="mt-6">
        <QuickAnswer>
          <p>
            Här svarar vi rakt på frågor från vuxna som vill höja gymnasiebetyg via
            prövning eller komvux. Officiella regler: {''}
            <a
              href={ECOSYSTEM.skolverketProvning.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-800 underline underline-offset-2"
            >
              Skolverket
            </a>
            . Behörighet:{' '}
            <a
              href={ECOSYSTEM.antagningskoll.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-800 underline underline-offset-2"
            >
              NP-Monstrets antagningskoll
            </a>
            .
          </p>
        </QuickAnswer>
      </div>

      <div className="mt-10">
        <FaqList items={FAQ_ITEMS} title={`${FAQ_ITEMS.length} frågor och svar`} />
      </div>

      <div className="mt-12 space-y-6">
        <EcosystemCta variant="antagning" campaign="faq" />
        <EcosystemCta variant="train" campaign="faq" />
      </div>

      <p className="mt-10 text-center text-sm text-slate-500">
        <Link href="/anmalan" className="font-medium text-emerald-700 underline underline-offset-2">
          Anmälningsguide
        </Link>
        {' · '}
        <Link href="/kallor" className="font-medium text-emerald-700 underline underline-offset-2">
          Källor
        </Link>
        {' · '}
        <a
          href={ECOSYSTEM.npguideFaq.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-emerald-700 underline underline-offset-2"
        >
          FAQ om nationella prov (NP-guide)
        </a>
      </p>
    </main>
  );
}
