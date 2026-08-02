import { ECOSYSTEM, withEcosystemUtm } from '@/lib/ecosystem';

type Variant = 'full' | 'antagning' | 'train' | 'compact';

/** campaign: page slug for utm_campaign (e.g. home, anmalan, hoja-betyg) */
export function EcosystemCta({
  variant = 'full',
  campaign = 'site',
}: {
  variant?: Variant;
  campaign?: string;
}) {
  const antagning = withEcosystemUtm(ECOSYSTEM.antagningskoll.href, campaign);
  const komvux = withEcosystemUtm(ECOSYSTEM.komvux.href, campaign);
  const monstrets = withEcosystemUtm(ECOSYSTEM.npmonstret.href, campaign);
  const npcoachen = withEcosystemUtm(ECOSYSTEM.npcoachen.href, campaign);
  const pris = withEcosystemUtm(ECOSYSTEM.pris.href, campaign);
  const register = withEcosystemUtm(ECOSYSTEM.register.href, campaign);
  const npguide = withEcosystemUtm(ECOSYSTEM.npguide.href, campaign);
  const npprov = withEcosystemUtm(ECOSYSTEM.npprov.href, campaign);

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
          href={antagning}
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
        <h2 className="text-lg font-bold text-slate-900">
          Behöver du fler ämnen eller personlig plan?
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Här övar du Matematik 1–3 inför prövning. För bredare träning, komvux
          och NPcoachen (nästa steg utifrån dina luckor) finns NP-Monstret.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={npcoachen}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
          >
            NPcoachen
          </a>
          <a
            href={register}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Kom igång (NP-Monstret)
          </a>
          <a
            href={komvux}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Komvux-träning
          </a>
          <a
            href={pris}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Priser
          </a>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          NP-Monstret ersätter inte prövning eller anmälan via kommun/skola.
        </p>
      </aside>
    );
  }

  if (variant === 'compact') {
    return (
      <p className="text-sm text-slate-600">
        Kolla behörighet med{' '}
        <a
          href={antagning}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-emerald-700 underline underline-offset-2"
        >
          NP-Monstrets antagningskoll
        </a>
        . Personlig plan via{' '}
        <a
          href={npcoachen}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-emerald-700 underline underline-offset-2"
        >
          NPcoachen
        </a>
        . Mer träning på{' '}
        <a
          href={monstrets}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-emerald-700 underline underline-offset-2"
        >
          npmonstret.se
        </a>
        . Regler på{' '}
        <a
          href={npguide}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-emerald-700 underline underline-offset-2"
        >
          npguide.se
        </a>
        . NP-arkiv på{' '}
        <a
          href={npprov}
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

  // Full: max tre syskon-länkar med tydlig roll (undvik länkspam)
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
      <h2 className="text-lg font-bold text-slate-900">När du behöver något annat</h2>
      <p className="mt-2 text-sm text-slate-600">
        Här: prövning och matte 1–3. Andra sajter i samma ekosystem fyller andra behov.
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          {
            href: antagning,
            label: 'Antagningskoll',
            description: 'Vad som brukar krävas till olika utbildningar.',
          },
          {
            href: npcoachen,
            label: 'NPcoachen',
            description: 'Personlig träning i fler ämnen och årskurser.',
          },
          {
            href: npguide,
            label: 'NP-guide',
            description: 'Regler och skolpersonal — om du jobbar i skolan.',
          },
        ].map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full rounded-xl border border-slate-100 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/40"
            >
              <span className="font-semibold text-emerald-800">{item.label}</span>
              <span className="mt-1 block text-sm text-slate-600">{item.description}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-slate-500">
        Provarkiv med källa:{' '}
        <a href={npprov} target="_blank" rel="noopener noreferrer" className="underline">
          npprov.se
        </a>
        . Priser för bredare träning:{' '}
        <a href={pris} target="_blank" rel="noopener noreferrer" className="underline">
          npmonstret.se/pris
        </a>
        .
      </p>
    </section>
  );
}
