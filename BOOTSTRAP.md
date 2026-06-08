# BOOTSTRAP.md — Prövning.se

_Lästes vid varje ny session. Efter first run, radera denna fil._

---

## Projektöversikt

**Vad:** Prövning.se — gratis övningsportal för vuxna komvuxelever som läser upp betyg inför högskolan.
**Primärt ämne:** Matematik (kurser: Matematik 1a/1b/1c, 2a/2b/2c, 3b/3c)
**Målgrupp:** Vuxna (18-45 år) på komvux som siktar på högskolebehörighet
**Affärsmodell:** Gratis (ingen betalvägg i initial version)
**Unik position:** Finns inga existerande verktyg för detta specifikt — ingen "prövningsövning" finns som separat produkt.

---

## Design Language

**Utgångspunkt:** Samma visuella system som NP-Monstret.

| Element | Värde |
|---------|-------|
| Bakgrund | `#F8FAFC` (slate-50) |
| Primär färg | `#10B981` (emerald-500) |
| Text | `#1E293B` (slate-800) |
| Font | Inter (Google Fonts) |
| Border-radius | `rounded-xl` (12px), `rounded-2xl` (16px) |
| Shadows | `.shadow-card` + `.shadow-card-hover` |
| Gradient | Hover: emerald → blue → violet (`.card-gradient-border`) |
| Animations | `AnimateIn` stagger på alla kort-gridar (80ms steg) |
| Ikoner | Lucide React |
| Emoji | **FÖRBJUDET** — ingen emoji anywhere (UI, copy, mejl, commit) |

**Målgruppsanpassning:**
- Samma design men tonen är mer "vuxen och rak"
- Färre monster-referenser, mer ren professionell känsla
- Men bevara det som funkar: AnimateIn, gradient-borders, card-shadow

---

## Tech Stack

| Del | Val |
|-----|-----|
| Framework | Next.js 15 (App Router) |
| Språk | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Database | Eget Supabase-projekt (nyckel kommer) |
| Auth | Supabase Auth (email + Google) |
| Hosting | Vercel (auto-deploy på git push) |
| Repository | Nytt GitHub-repo (ej Larinsikt-org, eget) |
| AI | MyClaw/Minimax via lib/ai/client.ts (samma som NP-Monstret) |

---

## Arbetsprocess (KRITISKT)

### Före byggande
1. Alexander skriver `SPEC.md` och skickar till mig
2. Jag bekräftar att jag förstått (sammanfattar, frågar om ok)
3. **Först därefter börjar jag bygga**

### Under byggande
- Jag bygger så mycket själv som möjligt
- Pushar till GitHub först när Alexander säger till
- Vercel deployar automatiskt (ingen manuell godkännande)
- Alltid `git commit --author="AlexanderEJohansson <xealnder@gmail.com>"`

### Arkitektur-regler
- Alla databas-queries skrivs i routes, aldrig i komponenter
- Migrationer i `supabase/migrations/`
- Tabellnamn: plural, snake_case (`teacher_questions` inte `teacher_question`)
- RLS på alla tabeller
- Inget bygge innan Alexander bekräftat att jag förstått specen

---

## Innehåll: Komvux-mattekurser

**Kurser som ska stödjas:**
- Matematik 1a (grön)
- Matematik 1b (blå)
- Matematik 1c (röd)
- Matematik 2a, 2b, 2c
- Matematik 3b, 3c

**Målgrupp-specifikt:**
- Användaren kan ha varit borta från skolan i åratal
- Korta förklaringar, steg-för-steg, dyslexivänligt
- Progress-spårning: eleven ska se hur långt hen kommit
- Ingenting för barn/ungdom — vuxen ton genomgående

**SEO-nyckelord att prioritera:**
- "prövning matte", "läsa upp mattebetyg", "komvux matte", "matematik 2 komvux"
- "högskolebehörighet matte", "prövning matematik 1", "matematik 3c övning"

---

## Workspace

```
/home/ubuntu/.openclaw/workspace/provning-se/   ← all kod här
```

**Egna filer för projektet:**
- `MEMORY.md` (långsiktig minne för detta projekt)
- `SPEC.md` (Alexander skriver, jag bekräftar)
- `supabase/migrations/` (egna migrationer)
- `.env.local` (kommer när Supabase-nyckel är klar)

---

## Credentials (待)

- [ ] Supabase: behöver nyckel
- [ ] Vercel: behöver access
- [ ] GitHub: behöver PAT för nytt repo

---

_Radera denna fil efter first run när MEMORY.md är uppdaterad._