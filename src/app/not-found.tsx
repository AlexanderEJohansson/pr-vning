import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-slate-900">Sidan finns inte</h1>
      <p className="mt-3 text-slate-600">
        Länken kan vara fel eller sidan har flyttats.
      </p>
      <Link
        href="/kurser"
        className="mt-6 inline-block rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600"
      >
        Till kurserna
      </Link>
    </main>
  );
}
