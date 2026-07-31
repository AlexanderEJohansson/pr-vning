import type { Metadata } from 'next';
import Link from 'next/link';
import { AnimateIn } from '@/components/AnimateIn';
import { JsonLd, breadcrumbSchema } from '@/components/JsonLd';
import { SourceList } from '@/components/SourceList';
import { sourcesByKind, SOURCES, SOURCES_UPDATED } from '@/lib/sources';

export const metadata: Metadata = {
  title: 'Källor',
  description:
    'Verifierade källor bakom Prövning.se: Skolverket, lag, kommun-exempel och länkar till NP-Monstret, NP-guide och npprov.se.',
};

export default function KallorPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Hem', url: 'https://xn--prvning-b1a.se/' },
          { name: 'Källor', url: 'https://xn--prvning-b1a.se/kallor' },
        ])}
      />

      <AnimateIn>
        <nav className="text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-800">
            Hem
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700">Källor</span>
        </nav>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Källor</h1>
        <p className="mt-3 text-slate-600 leading-relaxed">
          Prövning.se är inte en myndighet. Fakta om prövning baseras på offentliga
          källor. Kommunlänkar är exempel för anmälan — kontrollera alltid aktuell
          information lokalt. Senast genomgången {SOURCES_UPDATED}.
        </p>
      </AnimateIn>

      <div className="mt-10 space-y-8">
        <SourceList sources={sourcesByKind('myndighet')} title="Myndighet" />
        <SourceList sources={sourcesByKind('lag')} title="Lag" />
        <SourceList sources={sourcesByKind('kommun')} title="Kommun-exempel (anmälan)" />
        <SourceList sources={sourcesByKind('ekosystem')} title="Ekosystem (träning och guider)" />
      </div>

      <p className="mt-10 text-sm text-slate-500">
        Totalt {SOURCES.length} poster. För forskningsdjup om nationella prov, se{' '}
        <a
          href="https://npguide.se/forskning"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-emerald-700 underline underline-offset-2"
        >
          npguide.se/forskning
        </a>{' '}
        och{' '}
        <a
          href="https://npguide.se/kallor"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-emerald-700 underline underline-offset-2"
        >
          npguide.se/kallor
        </a>
        .
      </p>
    </main>
  );
}
