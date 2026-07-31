import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-semibold text-slate-700">Prövning.se</span>
          {' — '}
          gratis övning inför prövning i matematik på komvux.
        </p>
        <div className="flex gap-4">
          <Link href="/kurser" className="hover:text-slate-800">
            Kurser
          </Link>
          <Link href="/om" className="hover:text-slate-800">
            Om
          </Link>
        </div>
      </div>
    </footer>
  );
}
