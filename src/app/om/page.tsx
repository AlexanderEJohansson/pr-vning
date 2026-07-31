import type { Metadata } from 'next';
import Link from 'next/link';
import { AnimateIn } from '@/components/AnimateIn';

export const metadata: Metadata = {
  title: 'Om prövning',
  description:
    'Vad är en prövning på komvux? Hur funkar Prövning.se? För dig som läser upp mattebetyg.',
};

export default function OmPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <AnimateIn>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Om prövning och Prövning.se
        </h1>
      </AnimateIn>

      <div className="mt-8 space-y-8 text-slate-600 leading-relaxed">
        <AnimateIn delayMs={40}>
          <section>
            <h2 className="text-lg font-bold text-slate-900">Vad är en prövning?</h2>
            <p className="mt-2">
              En prövning är ett prov som ger dig betyg i en kurs utan att du har
              läst hela kursen i klass. På komvux är prövning vanligt för vuxna som
              snabbt vill få betyg — till exempel Matematik 2 inför högskolan.
            </p>
            <p className="mt-2">
              Prövningen är oftast skriftlig, ibland med muntlig del. Det är skolan
              eller kommunen som anordnar prövningen; Prövning.se ersätter inte det
              officiella provet.
            </p>
          </section>
        </AnimateIn>

        <AnimateIn delayMs={80}>
          <section>
            <h2 className="text-lg font-bold text-slate-900">Vad är Prövning.se?</h2>
            <p className="mt-2">
              En gratis övningssajt för dig som ska ta prövning eller läsa upp
              betyg i matematik. Fokus just nu: Matematik 1, 2 och 3 (varianter
              a/b/c där det gäller).
            </p>
            <p className="mt-2">
              Frågorna kommer från bland annat tidigare nationella prov och
              övningsmaterial. Materialet är avsett för träning — inte som facit
              för ett pågående nationellt prov.
            </p>
          </section>
        </AnimateIn>

        <AnimateIn delayMs={120}>
          <section>
            <h2 className="text-lg font-bold text-slate-900">Vem är det till för?</h2>
            <p className="mt-2">
              Vuxna på komvux (ungefär 18–45 år) som siktar på högskolebehörighet
              eller specifika programkrav. Tonen är rak och vuxen — ingen
              skolbarns-app.
            </p>
          </section>
        </AnimateIn>

        <AnimateIn delayMs={160}>
          <section>
            <h2 className="text-lg font-bold text-slate-900">Kostar det?</h2>
            <p className="mt-2">
              Övningen på Prövning.se är gratis. Själva prövningen hos komvux kan
              kosta en avgift — det bestämmer din skola eller kommun.
            </p>
          </section>
        </AnimateIn>

        <AnimateIn delayMs={200}>
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <h2 className="text-lg font-bold text-slate-900">Redo att börja?</h2>
            <p className="mt-2 text-sm">
              Välj kurs, filtrera om du vill, och öva i din egen takt.
            </p>
            <Link
              href="/kurser"
              className="mt-4 inline-block rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600"
            >
              Till kurserna
            </Link>
          </section>
        </AnimateIn>
      </div>
    </main>
  );
}
