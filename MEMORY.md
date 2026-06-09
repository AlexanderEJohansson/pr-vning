# MEMORY.md — Prövning.se

## Projekt
- **Domän:** prövning.se (provning.se redirect)
- **Repo:** https://github.com/AlexanderEJohansson/pr-vning (master)
- **Vercel:** auto-deploy från push
- **Supabase:** `sfptdiaqmjgznnowyqry` (https://sfptdiaqmjgznnowyqry.supabase.co)
- **Workspace:** `/home/ubuntu/.openclaw/workspace/provning-se/`

## Tech
- Next.js 15 (App Router) + TypeScript
- Tailwind v4 + shadcn-style komponenter
- Supabase JS-klient (auth + Postgres)
- pnpm

## Designspråk
Samma som NP-Monstret: `#F8FAFC` bg, `#10B981` emerald, slate-text, Inter, rounded-2xl, AnimateIn-stagger, gradient-borders. **INGA EMOJIS** någonstans (UI, copy, mejl, commits).

## Målgrupp
Vuxna komvuxelever (18-45 år) som läser upp mattebetyg inför högskola. Ton: vuxen och rak.

## Kurser
Matematik 1a/1b/1c, 2a/2b/2c, 3b/3c (ev. fler ämnen senare).

## Databas-state (per 2026-06-09)

### Tabeller (från migration 001)
- `subjects` (3+ ämnen, slug=matematik/engelska/...)
- `levels` (matematik-1, -2, -3) — kopplad till subjects
- `target_programs` — högskoleprogram
- `central_content` — Skolverkets centrala innehåll, per nivå
- `knowledge_requirements` — kunskapskrav E/C/A per nivå
- `questions` — frågedatabas (level_id, topic_id, question_text, correct_text, source_year)
- `question_topics` — algebra/geometri/funktioner/statistik/trigonometri/derivata
- `user_profiles` — användarprofil med target_program + current_grades

### Data ingestat
- **1584 frågor:** Ma1=393, Ma2=577, Ma3=614 (efter dedup)
- **56 centralt innehåll-punkter** (8 kurser × ~7 punkter)
- **9 kunskapskrav** (E/C/A × 3 nivåer)

### Källor
- **Pluggakuten** (~916 frågor): `resources/curriculum/scrape-pluggakuten.ts`
- **Umeå arkiv.edusci** (~790): Ma2/Ma3 vt12-vt22 NP-PDF:er
- **Mathleaks** (~91): Ma1b/1c vt12 + Ma2/Ma3 ht12
- **Wayback Machine** (169): Ma1a/1b/1c ht16 + 2017 exempelprov (matteboken kräver login sedan ~2025; bypass via `web.archive.org/web/<ts>id_/<url>`)
- **Skolverket syllabus**: `https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=MAT&courseCode={code}&date=2025-01-11&tos=gy`

### Frågor per kurs × topic
- **Ma1 (393):** algebra=332, geometri=18, funktioner=22, statistik=12, trigonometri=9, derivata=0
- **Ma2 (577):** algebra=415, geometri=33, funktioner=90, statistik=14, trigonometri=25, derivata=0
- **Ma3 (614):** algebra=424, geometri=20, funktioner=60, statistik=4, trigonometri=34, derivata=72

## Filstruktur
```
src/
  app/
    api/
      levels/route.ts       — GET /api/levels?subject=matematik
      programs/route.ts     — GET /api/programs
    layout.tsx, page.tsx
  lib/
    courses.ts              — Static course data
    supabase/{client,server}.ts
resources/
  curriculum/
    scrape-pluggakuten.ts        — Pluggakuten scraper
    parse-skolverket.py          — Skolverket HTML → JSON (centralt innehåll + KR)
    save-skolverket.ts           — Skolverket JSON → Supabase
    parse-np-pdfs.py             — Umeå NP-PDF:er (initial)
    parse-np-pdfs-extra.py       — Umeå Ma2/Ma3 vt15-vt16
    parse-np-pdfs-extra2.py      — Umeå vt12-ht15 (bulk)
    parse-np-mathleaks.py        — Mathleaks-källan
    parse-np-matte1-wayback.py   — Matte 1 via Wayback Machine
    data/                        — HTML-cache + JSON (gitignored)
    np-pdfs/                     — PDF-cache + JSON (gitignored, 611 MB)
supabase/
  migrations/001_core_schema.sql
```

## Build / deploy
- `pnpm build` fungerar (testat 2026-06-09)
- `tsconfig.json` exkluderar `resources/` + `scripts/` så scraping-koden inte hindrar Vercel-build
- `.env.local`: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- Service role key är `eyJhbG…re3Q`-format (JWT). `sb_secret_…` är publishable, fungerar inte mot RLS-skyddade tabeller.

## Workflow
1. Alexander skickar `SPEC.md`
2. Bekräfta förståelsen, ställ frågor
3. Bygg
- Push först när Alexander säger till
- Author: `AlexanderEJohansson <xealnder@gmail.com>` (för Vercel-deploy-checks)
- Inga emojis. Vuxen ton. Skolverket-anpassad SEO.

## Kvarstående
- `/kurser`-sida (homepage länkar dit, finns inte än)
- Frågevisning UI
- Quiz/övningsflöde
- Auth-flöde
- (Allt detta väntar på SPEC.md)

## Lärdomar
- **Matteboken.se kräver login sedan ~2025** för att ladda PDF — bypass via Wayback Machine med `id_/`-prefix
- **NP-PDF parsing:** poäng-mönster `(\d+/\d+/\d+)` för 2017+, `(Max N p)` för pre-2017
- **Topic-detektering:** derivata MÅSTE komma först i regex-kedjan, annars hamnar derivataproblem i "funktioner"
- **Stora NP-PDF:er (5MB):** öka urllib timeout till 180s
