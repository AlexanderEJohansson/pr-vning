# Prövning.se — Agent rules

## Produkt
Gratis ovningsportal for vuxna komvuxelever som laser upp mattebetyg infor hogskola.
Primart: Matematik 1a/1b/1c, 2a/2b/2c, 3b/3c.
Ton: vuxen och rak. **Inga emojis** nagonstans (UI, copy, commits).

## Design
- Bakgrund `#F8FAFC`, primar `#10B981`, text slate
- Font Inter, `rounded-xl` / `rounded-2xl`
- Samma visuella system som NP-Monstret, men mer professionellt

## Tech
- Next.js 15 App Router, TypeScript, Tailwind v4, Supabase, pnpm (eller npm)
- Statisk kursdata i `src/lib/courses.ts` + `src/lib/math-catalog.ts`
- Frågor via `/api/questions` (Supabase). Saknas env: visa tydligt fel, krascha inte build.

## Loop (autonomt)
1. Implementera
2. Kor `npm run build` (eller `pnpm build`)
3. Om fail: fixa och kor om (max 5 forsok)
4. Pusha/committa **bara** nar Alexander ber om det
5. Efter storre features: kor `/check-work` om tillgangligt

## DNS / deploy
- **Live:** https://prövning.se (punycode `xn--prvning-b1a.se`), www via CNAME
- **Vercel-projekt:** `pr-vning` (även https://pr-vning.vercel.app)
- **DNS-host:** One.com (egna A/CNAME, nameservers stannar hos One.com)
- Apex A: `216.150.1.1` + `216.150.16.1` · www CNAME: `6f9101bce1152b29.vercel-dns-017.com`
- `provning.se` (utan ö) är **inte** vår domän
- Rör inte DNS utan att bli ombedd; detaljer i `MEMORY.md` → avsnitt DNS

## Referens
Se `MEMORY.md` for databas-state, källor, DNS och kvarvarande arbete.
