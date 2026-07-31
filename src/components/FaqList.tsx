import Link from 'next/link';
import type { FaqItem, FaqPart } from '@/lib/faq-data';

function Part({ part }: { part: FaqPart }) {
  if (part.type === 'text') return <>{part.text}</>;
  if (part.external) {
    return (
      <a
        href={part.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-emerald-700 underline decoration-emerald-200 underline-offset-2 hover:text-emerald-800"
      >
        {part.label}
      </a>
    );
  }
  return (
    <Link
      href={part.href}
      className="font-medium text-emerald-700 underline decoration-emerald-200 underline-offset-2 hover:text-emerald-800"
    >
      {part.label}
    </Link>
  );
}

export function FaqList({
  items,
  title = 'Vanliga frågor',
}: {
  items: FaqItem[];
  title?: string;
}) {
  return (
    <section className="space-y-4" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-xl font-bold text-slate-900">
        {title}
      </h2>
      <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-card">
        {items.map((item) => (
          <details key={item.id} className="group px-5 py-4">
            <summary className="cursor-pointer list-none font-semibold text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-3">
                <span>{item.question}</span>
                <span className="mt-0.5 shrink-0 text-slate-400 transition group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {item.answerParts.map((part, i) => (
                <Part key={i} part={part} />
              ))}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
