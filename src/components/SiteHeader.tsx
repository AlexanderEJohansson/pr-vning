import Link from 'next/link';

const links = [
  { href: '/hoja-betyg', label: 'Höja betyg' },
  { href: '/anmalan', label: 'Anmälan-guide' },
  { href: '/kurser', label: 'Kurser' },
  { href: '/faq', label: 'FAQ' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4">
        <Link
          href="/"
          className="shrink-0 text-lg font-bold tracking-tight text-slate-900"
          aria-label="Prövning.se — startsida"
        >
          Prövning<span className="text-emerald-500">.se</span>
        </Link>
        <nav className="flex items-center gap-0.5 overflow-x-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 sm:px-3"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://npmonstret.se/antagningskoll?utm_source=provning&utm_medium=ecosystem&utm_campaign=header"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 whitespace-nowrap rounded-xl bg-emerald-500 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            Antagningskoll
          </a>
        </nav>
      </div>
    </header>
  );
}
