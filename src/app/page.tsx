export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Prövning.se
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Gratis övning inför prövning i matematik på komvux.
          <br />Matematik 1, 2 och 3 för dig som läser upp betyg.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/kurser"
            className="rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 transition"
          >
            Välj din kurs
          </a>
          <a
            href="/om"
            className="rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold px-6 py-3 transition"
          >
            Om prövning
          </a>
        </div>
      </div>
    </main>
  );
}
