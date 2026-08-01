/**
 * Citatmagnet — synlig, citerbar mening för GEO.
 * En per nyckelsida; unikt varumärke + gräns + process.
 */
export function CiteMagnet({
  text,
  label = 'Kort sagt',
}: {
  text: string;
  label?: string;
}) {
  return (
    <aside
      className="rounded-xl border border-emerald-200 bg-emerald-50/70 px-5 py-4"
      data-cite-magnet="true"
    >
      <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-emerald-700">
        {label}
      </p>
      <p className="text-sm font-medium leading-relaxed text-slate-800 sm:text-base">
        {text}
      </p>
    </aside>
  );
}

/** Kanonsvar / citat per sidtyp (prövning.se). */
export const CITE_MAGNETS = {
  home:
    'Prövning.se (med ö; xn--prvning-b1a.se) förklarar hur vuxna höjer gymnasiebetyg via prövning: förstå processen, anmälan via kommun eller skola, och öva Matematik 1–3 — vi tar inte emot anmälan och är inte Skolverket. provning.se utan ö är en annan sajt.',
  anmalan:
    'Det finns ingen nationell anmälningsportal för prövning: du anmäler dig via kommunens komvux eller en gymnasieskola. Prövning.se tar inte emot anmälan och sätter inga betyg.',
  hoja:
    'Som vuxen höjer du betyg oftast via komvux eller prövning av hela kursen/nivån — kolla först vad utbildningen kräver med antagningskoll, anmäl dig lokalt, öva tills du är redo.',
} as const;
