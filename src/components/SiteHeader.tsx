import Link from 'next/link';

const links = [
  { href: '/kurser', label: 'Kurser' },
  { href: '/om', label: 'Om' },
];

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-slate-900">
          Prövning<span className="text-emerald-500">.se</span>
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/kurser"
            className="ml-2 rounded-xl bg-emerald-500 px-3.5 py-1.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            Börja öva
          </Link>
        </nav>
      </div>
    </header>
  );
}
