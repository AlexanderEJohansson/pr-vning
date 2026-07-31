'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { MathLevelSlug, MathVariant } from '@/lib/math-catalog';

export type PracticeQuestion = {
  id: string;
  question_text: string;
  correct_text: string | null;
  source_year: string | number | null;
  variant: string | null;
};

type LoadState = 'loading' | 'ready' | 'empty' | 'error';

type Props = {
  level: MathLevelSlug;
  levelName: string;
  variant?: MathVariant | null;
  topic?: string | null;
  topicName?: string | null;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function PracticeSession({
  level,
  levelName,
  variant,
  topic,
  topicName,
}: Props) {
  const [state, setState] = useState<LoadState>('loading');
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [total, setTotal] = useState(0);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [seen, setSeen] = useState(0);
  const [revealedCount, setRevealedCount] = useState(0);

  const load = useCallback(async () => {
    setState('loading');
    setError(null);
    setIndex(0);
    setRevealed(false);
    setSeen(0);
    setRevealedCount(0);

    const params = new URLSearchParams({
      level,
      limit: '40',
      offset: '0',
    });
    if (variant) params.set('variant', variant);
    if (topic) params.set('topic', topic);

    try {
      const res = await fetch(`/api/questions?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || `Kunde inte ladda frågor (${res.status})`);
        setState('error');
        return;
      }
      const list: PracticeQuestion[] = data.questions || [];
      setTotal(data.pagination?.total ?? list.length);
      if (list.length === 0) {
        setQuestions([]);
        setState('empty');
        return;
      }
      setQuestions(shuffle(list));
      setState('ready');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Nätverksfel');
      setState('error');
    }
  }, [level, variant, topic]);

  useEffect(() => {
    void load();
  }, [load]);

  const current = questions[index] ?? null;
  const progressLabel = useMemo(() => {
    if (!current) return '';
    return `Fråga ${index + 1} av ${questions.length}`;
  }, [current, index, questions.length]);

  function goNext() {
    if (index >= questions.length - 1) return;
    setIndex((i) => i + 1);
    setRevealed(false);
    setSeen((s) => s + 1);
  }

  function goPrev() {
    if (index <= 0) return;
    setIndex((i) => i - 1);
    setRevealed(false);
  }

  function reveal() {
    if (!revealed) {
      setRevealed(true);
      setRevealedCount((c) => c + 1);
    }
  }

  const filterBits = [
    variant ? `variant ${variant}` : null,
    topicName || topic || null,
  ].filter(Boolean);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-emerald-600">Övning</p>
          <h1 className="text-2xl font-bold text-slate-900">{levelName}</h1>
          {filterBits.length > 0 && (
            <p className="mt-1 text-sm text-slate-500">{filterBits.join(' · ')}</p>
          )}
        </div>
        <Link
          href={`/kurser/${level}`}
          className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Byt filter
        </Link>
      </div>

      {state === 'loading' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
          Laddar frågor...
        </div>
      )}

      {state === 'error' && (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
          <p className="font-semibold text-red-800">Kunde inte hämta frågor</p>
          <p className="mt-2 text-sm text-red-700">{error}</p>
          <p className="mt-3 text-sm text-red-600/80">
            Kontrollera att Supabase-nycklar finns i miljön (NEXT_PUBLIC_SUPABASE_URL och
            NEXT_PUBLIC_SUPABASE_ANON_KEY).
          </p>
          <button
            type="button"
            onClick={() => void load()}
            className="mt-5 rounded-xl bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800"
          >
            Försök igen
          </button>
        </div>
      )}

      {state === 'empty' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="font-semibold text-slate-800">Inga frågor matchade filtret</p>
          <p className="mt-2 text-sm text-slate-500">
            Prova en annan variant eller ta bort ämnesfilter.
          </p>
          <Link
            href={`/kurser/${level}`}
            className="mt-5 inline-block rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
          >
            Tillbaka till kursen
          </Link>
        </div>
      )}

      {state === 'ready' && current && (
        <>
          <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
            <span>{progressLabel}</span>
            <span>
              {total > questions.length
                ? `${questions.length} av ${total} i denna omgång`
                : `${total} frågor totalt`}
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{ width: `${((index + 1) / questions.length) * 100}%` }}
            />
          </div>

          <article className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-4 flex flex-wrap gap-2 text-xs font-medium">
              {current.variant && (
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-emerald-700">
                  Variant {current.variant}
                </span>
              )}
              {current.source_year != null && (
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-slate-600">
                  {String(current.source_year)}
                </span>
              )}
            </div>

            <div className="whitespace-pre-wrap text-base leading-relaxed text-slate-800 sm:text-lg">
              {current.question_text}
            </div>

            {revealed && current.correct_text && (
              <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  Facit / ledtråd
                </p>
                <div className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
                  {current.correct_text}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {!revealed ? (
                <button
                  type="button"
                  onClick={reveal}
                  className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600"
                >
                  Visa svar
                </button>
              ) : (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={index >= questions.length - 1}
                  className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {index >= questions.length - 1 ? 'Sista frågan' : 'Nästa fråga'}
                </button>
              )}
              <button
                type="button"
                onClick={goPrev}
                disabled={index <= 0}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              >
                Föregående
              </button>
              <button
                type="button"
                onClick={() => void load()}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Ny omgång
              </button>
            </div>
          </article>

          <p className="mt-4 text-center text-xs text-slate-400">
            Visade svar i omgången: {revealedCount}
            {seen > 0 ? ` · Navigerade: ${seen + 1}` : ''}
          </p>
        </>
      )}
    </div>
  );
}
