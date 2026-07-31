import { ECOSYSTEM } from '@/lib/ecosystem';

type Variant = 'full' | 'antagning' | 'train' | 'compact';

export function EcosystemCta({ variant = 'full' }: { variant?: Variant }) {
  if (variant === 'antagning') {
    return (
      <aside className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Nästa steg
        </p>
        <h2 className="mt-1 text-lg font-bold text-slate-900">
          Vet du vilka betyg du behöver?
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          {ECOSYSTEM.antagningskoll.description}
        </p>
        <a
          href={ECOSYSTEM.antagningskoll.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Öppna NP-Monstrets antagningskoll
        </a>
      </aside>
    );
  }

  if (variant === 'train') {
    return (
      <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <h2 className="text-lg font-bold text-slate-900">Träna mer på NP-Monstret</h2>
        <p className="mt-2 text-sm text-slate-600">{ECOSYSTEM.komvux.description}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={ECOSYSTEM.komvux.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
          >
            Komvux-träning
          </a>
          <a
            href={ECOSYSTEM.npmonstret.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            npmonstret.se
          </a>
        </div>
      </aside>
    );
  }

  if (variant === 'compact') {
    return (
      <p className="text-sm text-slate-600">
        Kolla behörighet med{' '}
        <a
          href={ECOSYSTEM.antagningskoll.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-emerald-700 underline underline-offset-2"
        >
          NP-Monstrets antagningskoll
        </a>
        . Mer träning på{' '}
        <a
          href={ECOSYSTEM.npmonstret.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-emerald-700 underline underline-offset-2"
        >
          npmonstret.se
        </a>
        . Regler på{' '}
        <a
          href={ECOSYSTEM.npguide.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-emerald-700 underline underline-offset-2"
        >
          npguide.se
        </a>
        . NP-arkiv på{' '}
        <a
          href={ECOSYSTEM.npprov.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-emerald-700 underline underline-offset-2"
        >
          npprov.se
        </a>
        .
      </p>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
      <h2 className="text-lg font-bold text-slate-900">Samma ekosystem — olika roller</h2>
      <p className="mt-2 text-sm text-slate-600">
        Prövning.se hjälper dig förstå prövning, anmäla dig rätt och öva matte. De andra
        sajterna tar vid där det passar dig.
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {[
          ECOSYSTEM.antagningskoll,
          ECOSYSTEM.komvux,
          ECOSYSTEM.npguide,
          ECOSYSTEM.npprov,
        ].map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-slate-100 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/40"
            >
              <span className="font-semibold text-emerald-800">{item.label}</span>
              <span className="mt-1 block text-sm text-slate-600">{item.description}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
