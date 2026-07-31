export function QuickAnswer({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
        Snabbsvar
      </p>
      <div className="mt-2 text-base leading-relaxed text-slate-800">{children}</div>
    </div>
  );
}
