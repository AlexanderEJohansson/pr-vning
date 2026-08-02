import Link from 'next/link';
import { ECOSYSTEM, withEcosystemUtm } from '@/lib/ecosystem';

const internal = [
  { href: '/hoja-betyg', label: 'Höja betyg' },
  { href: '/anmalan', label: 'Anmälan-guide' },
  { href: '/kurser', label: 'Kurser' },
  { href: '/faq', label: 'FAQ' },
  { href: '/kallor', label: 'Källor' },
  { href: '/om', label: 'Om' },
];

const external = [
  {
    href: withEcosystemUtm(ECOSYSTEM.larinsikt.href, 'footer'),
    label: 'Lärinsikt AB (bolag)',
  },
  {
    href: withEcosystemUtm(ECOSYSTEM.antagningskoll.href, 'footer'),
    label: 'Antagningskoll (behörighet)',
  },
  {
    href: withEcosystemUtm(ECOSYSTEM.npcoachen.href, 'footer'),
    label: 'NPcoachen (mer träning)',
  },
  { href: ECOSYSTEM.npguide.href, label: 'npguide.se (regler / skola)' },
  { href: ECOSYSTEM.npprov.href, label: 'npprov.se (provarkiv)' },
  { href: ECOSYSTEM.skolverketProvning.href, label: 'Skolverket om prövning' },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-semibold text-slate-800">
              Prövning<span className="text-emerald-500">.se</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Förklaring, anmälan-vägledning och matteövning inför prövning. Vi tar
              inte emot din anmälan — det gör kommunen eller skolan.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              På den här sajten
            </p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {internal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-600 hover:text-slate-900">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Ekosystem och källor
            </p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {external.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-slate-900"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-slate-100 pt-6 text-xs text-slate-400">
          Officiella regler om prövning finns hos Skolverket. Anmälan och avgifter
          sköts av din kommun eller skola. Senast kontrollerad: augusti 2026 · Bolag:{' '}
          <a
            href={withEcosystemUtm(ECOSYSTEM.larinsikt.href, 'footer')}
            className="underline hover:text-slate-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lärinsikt AB
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
