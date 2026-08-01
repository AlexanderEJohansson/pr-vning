import Link from 'next/link';
import { ECOSYSTEM, withEcosystemUtm } from '@/lib/ecosystem';

const internal = [
  { href: '/hoja-betyg', label: 'Höja betyg' },
  { href: '/anmalan', label: 'Anmälan' },
  { href: '/kurser', label: 'Kurser' },
  { href: '/faq', label: 'FAQ' },
  { href: '/kallor', label: 'Källor' },
  { href: '/om', label: 'Om' },
];

const external = [
  {
    href: withEcosystemUtm(ECOSYSTEM.antagningskoll.href, 'footer'),
    label: 'NP-Monstret antagningskoll',
  },
  {
    href: withEcosystemUtm(ECOSYSTEM.npcoachen.href, 'footer'),
    label: 'NPcoachen',
  },
  {
    href: withEcosystemUtm(ECOSYSTEM.komvux.href, 'footer'),
    label: 'NP-Monstret komvux',
  },
  {
    href: withEcosystemUtm(ECOSYSTEM.pris.href, 'footer'),
    label: 'NP-Monstret priser',
  },
  {
    href: withEcosystemUtm(ECOSYSTEM.npmonstret.href, 'footer'),
    label: 'npmonstret.se',
  },
  { href: ECOSYSTEM.npguide.href, label: 'npguide.se' },
  { href: ECOSYSTEM.npprov.href, label: 'npprov.se' },
  { href: ECOSYSTEM.skolverketProvning.href, label: 'Skolverket prövning' },
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
              Gratis vägledning och övning inför prövning i matematik. För vuxna som
              vill höja gymnasiebetyg. Inte en myndighetssajt.
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
          sköts av din kommun eller skola. Senast kontrollerad: augusti 2026 · Del av
          Lärinsikt-ekosystemet (npmonstret.se, npguide.se, npprov.se).
        </p>
      </div>
    </footer>
  );
}
