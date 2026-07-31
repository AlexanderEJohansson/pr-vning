import type { Source } from '@/lib/sources';
import { SOURCES_UPDATED } from '@/lib/sources';

export function SourceList({
  sources,
  title = 'Källor',
  compact = false,
}: {
  sources: Source[];
  title?: string;
  compact?: boolean;
}) {
  return (
    <section className={compact ? '' : 'rounded-2xl border border-slate-200 bg-white p-6 shadow-card'}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        <p className="text-xs text-slate-400">Kontrollerade {SOURCES_UPDATED}</p>
      </div>
      <ul className="mt-4 space-y-3">
        {sources.map((s) => (
          <li key={s.id} className="text-sm">
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-700 underline decoration-emerald-200 underline-offset-2 hover:text-emerald-800"
            >
              {s.title}
            </a>
            {!compact && <p className="mt-0.5 text-slate-500">{s.note}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}
