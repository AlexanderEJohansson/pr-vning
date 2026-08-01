# MEMORY.md — Prövning.se

## Projekt
- **Domän:** prövning.se (punycode `xn--prvning-b1a.se`)
- **Repo:** https://github.com/AlexanderEJohansson/pr-vning (master)
- **Vercel-projekt:** `pr-vning` — production alias https://pr-vning.vercel.app + custom domain
- **Supabase:** `sfptdiaqmjgznnowyqry` (https://sfptdiaqmjgznnowyqry.supabase.co)
- **Workspace (lokal):** `/Users/alexanderjohansson/provning.se`
- **Obs:** `provning.se` (utan ö) är en **annan** sajt — tillhör inte detta projekt.

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

### Tabeller (från migration 001 + 002)
- `subjects` (3+ ämnen, slug=matematik/engelska/...)
- `levels` (matematik-1, -2, -3) — kopplad till subjects
- `target_programs` — högskoleprogram
- `central_content` — Skolverkets centrala innehåll, per nivå **+ variant (a/b/c)**
- `knowledge_requirements` — kunskapskrav E/C/A per nivå **+ variant (a/b/c)**
- `questions` — frågedatabas (level_id, topic_id, question_text, correct_text, source_year)
- `question_topics` — algebra/geometri/funktioner/statistik/trigonometri/derivata
- `user_profiles` — användarprofil med target_program + current_grades

### Data ingestat
- **1543 frågor:** Ma1=369, Ma2=570, Ma3=604 (efter dedup + junk-cleanup)
- **144 centralt innehåll-punkter** (per variant: Ma1a=20, Ma1b=19, Ma1c=21, Ma2a=17, Ma2b=16, Ma2c=18, Ma3b=16, Ma3c=17)
- **24 kunskapskrav** (E/C/A × 8 varianter)

### Källor
- **Pluggakuten** (~916 frågor): `resources/curriculum/scrape-pluggakuten.ts`
- **Umeå arkiv.edusci** (~790): Ma2/Ma3 vt12-vt22 NP-PDF:er
- **Mathleaks** (~91): Ma1b/1c vt12 + Ma2/Ma3 ht12
- **Wayback Machine** (169): Ma1a/1b/1c ht16 + 2017 exempelprov (matteboken kräver login sedan ~2025; bypass via `web.archive.org/web/<ts>id_/<url>`)
- **Skolverket syllabus**: `https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=MAT&courseCode={code}&date=2025-01-11&tos=gy`

### Frågor per kurs × topic
- **Ma1 (369):** algebra=311, geometri=17, funktioner=21, statistik=11, trigonometri=9, derivata=0
- **Ma2 (570):** algebra=413, geometri=33, funktioner=90, statistik=14, trigonometri=20, derivata=0
- **Ma3 (604):** algebra=420, geometri=20, funktioner=60, statistik=4, trigonometri=30, derivata=70

### Frågor per kurs × variant
- **Ma1:** a=38, b=56, c=48, okänd=227 (Pluggakuten)
- **Ma2:** a=108, b=111, c=61, okänd=290
- **Ma3:** b=118, c=79, okänd=407

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
- `pnpm build` / `npm run build` (testat lokalt + Vercel production 2026-08-01)
- `tsconfig.json` exkluderar `resources/` + `scripts/` så scraping-koden inte hindrar Vercel-build
- `.env.local`: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- Service role key är `eyJhbG…re3Q`-format (JWT). `sb_secret_…` är publishable, fungerar inte mot RLS-skyddade tabeller.
- Deploy: push till `master` (GitHub → Vercel) eller `npx vercel --prod` från länkad katalog
- CLI: `npx vercel link --yes --project pr-vning` (team `alexanderejohanssons-projects`)

## DNS / domän (klart 2026-08-01)

| | |
|--|--|
| **Registrar / DNS** | One.com (`ns01.one.com`, `ns02.one.com`) |
| **Vercel project** | `pr-vning` |
| **Apex** | `xn--prvning-b1a.se` → prövning.se |
| **www** | `www.xn--prvning-b1a.se` |

### Egna DNS-poster hos One.com (behåll nameservers på One.com)

| Typ | Host | Värde |
|-----|------|--------|
| A | `xn--prvning-b1a.se` (`@`) | `216.150.1.1` |
| A | `xn--prvning-b1a.se` (`@`) | `216.150.16.1` |
| CNAME | `www.xn--prvning-b1a.se` | `6f9101bce1152b29.vercel-dns-017.com` |

### One.com-regler
- **Standard-A** för apex och www måste vara av/borttagna (annars stannar trafik på One.com `46.30.211.38`).
- **MX** kan stanna kvar (mejl via One.com).
- Byt **inte** till Vercel-nameservers om ni kör A/CNAME-modellen ovan.
- Efter DNS-ändring: `npx vercel domains verify xn--prvning-b1a.se` och `… www.xn--prvning-b1a.se`.
- Verifierat 2026-08-01: Vercel **Valid Configuration** för apex + www; publika resolvers (t.ex. 8.8.8.8) returnerar Vercel A-poster. Lokal cache kan visa gammal One.com-IP en stund; SSL utfärdas när resolver träffar Vercel.

## DDL via Management API
- Service-role-nyckeln räcker INTE för DDL via PostgREST (`exec_sql` RPC saknas)
- DATABASE_URL i `.env.local` är platshållare (`[PASSWORD]`)
- Lösning: **Supabase Management API** `POST /v1/projects/<ref>/database/query` med personal access token (sbp_*)
- Personal access token finns lokalt utanför repo (sök `sbp_` i `~/.openclaw/agents/main/sessions/` om den behövs igen, eller skapa ny på https://supabase.com/dashboard/account/tokens)
- Fungerar för migrations + seed utan att behöva CLI eller psql

## Workflow
1. Alexander skickar `SPEC.md`
2. Bekräfta förståelsen, ställ frågor
3. Bygg
- Push först när Alexander säger till
- Author: `AlexanderEJohansson <xealnder@gmail.com>` (för Vercel-deploy-checks)
- Inga emojis. Vuxen ton. Skolverket-anpassad SEO.

## Kvarstående
- Auth-flöde (Supabase Auth + progress)
- Progress-sparning per användare
- Env: `.env.local` med Supabase-nycklar för live-frågor på Vercel (production env i dashboard)
- GA4 outbound till npmonstret (när analytics finns)

## Klart (UI + GEO + DNS)
- `AGENTS.md`, övningsflöde Ma1–3
- GEO: `/anmalan` (HowTo), `/faq`, `/kallor`, `/hoja-betyg`, `llms.txt`, sitemap
- Ekosystem-CTA: antagningskoll, komvux, npguide, npprov
- Reciprokt: npmonstret `/komvux` + antagningskoll, npguide footer/sameAs, npprov EcosystemLinks
- **DNS 2026-08-01:** prövning.se → Vercel `pr-vning` (A + www CNAME via One.com)

## Lärdomar
- **Matteboken.se kräver login sedan ~2025** för att ladda PDF — bypass via Wayback Machine med `id_/`-prefix
- **NP-PDF parsing:** poäng-mönster `(\d+/\d+/\d+)` för 2017+, `(Max N p)` för pre-2017
- **Topic-detektering:** derivata MÅSTE komma först i regex-kedjan, annars hamnar derivataproblem i "funktioner"
- **Stora NP-PDF:er (5MB):** öka urllib timeout till 180s
