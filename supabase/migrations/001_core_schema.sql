-- ============================================================================
-- Prövning.se — Migration 001: Core Schema
-- Stabil, modulär grund. Statisk curriculum-data separat från user-data.
-- ============================================================================

-- ── 1. MASTER DATA: TARGET_PROGRAMS ─────────────────────────────────────
-- Högskoleprogram som användaren siktar mot.
-- Lägg till nya program utan att bryta något.
CREATE TABLE IF NOT EXISTS public.target_programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  requirements JSONB,  -- e.g. { "math_requirement": "Matematik 4" }
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 2. MASTER DATA: SUBJECTS ─────────────────────────────────────────────
-- Ämnen: Matematik, Engelska, etc.
CREATE TABLE IF NOT EXISTS public.subjects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,          -- "Matematik"
  slug TEXT NOT NULL UNIQUE,   -- "matematik"
  gy25_subject_code TEXT,      -- e.g. "MATMAT02" for Gy25
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 3. MASTER DATA: LEVELS ────────────────────────────────────────────────
-- Nivåer per ämne (t.ex. "Matematik fortsättning nivå 2" = Ma2)
-- Koppling till både Gy25 (nya) och Gy11 (gamla, för bakåtkompatibilitet)
CREATE TABLE IF NOT EXISTS public.levels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  level_number INTEGER NOT NULL,   -- 1, 2, 3 (relative within subject)
  name TEXT NOT NULL,              -- "Matematik fortsättning nivå 2"
  slug TEXT NOT NULL UNIQUE,       -- "matematik-2"
  gy25_course_code TEXT,           -- e.g. "MATMAT02a" (a/b/c variant)
  gy25_name TEXT,                  -- e.g. "Matematik 2a"
  gy11_course_code TEXT,           -- e.g. "Matematik B"
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_levels_subject ON public.levels(subject_id);
CREATE INDEX IF NOT EXISTS idx_levels_slug ON public.levels(slug);

-- ── 4. MASTER DATA: KNOWLEDGE_REQUIREMENTS ───────────────────────────────
-- Kunskapskrav från Skolverket per nivå och betygsnivå (E, C, A)
CREATE TABLE IF NOT EXISTS public.knowledge_requirements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  level_id UUID NOT NULL REFERENCES public.levels(id) ON DELETE CASCADE,
  grade_level CHAR(1) NOT NULL CHECK (grade_level IN ('E', 'C', 'A')),
  description TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_kr_level ON public.knowledge_requirements(level_id);
CREATE INDEX IF NOT EXISTS idx_kr_grade ON public.knowledge_requirements(grade_level);

-- ── 5. MASTER DATA: CENTRAL_CONTENT ──────────────────────────────────────
-- Centralt innehåll från Skolverket per nivå
CREATE TABLE IF NOT EXISTS public.central_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  level_id UUID NOT NULL REFERENCES public.levels(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  version TEXT NOT NULL DEFAULT '1.0',   -- for tracking when Skolverket updates
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cc_level ON public.central_content(level_id);

-- ── 6. USER PROFILES ──────────────────────────────────────────────────────
-- Användarens profil – mål, betyg, valda nivåer.
-- Flexibelt: current_grades som JSONB för enkel expansion.
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  target_program_id UUID REFERENCES public.target_programs(id),
  target_program_custom TEXT,  -- om eget program, fritext
  current_grades JSONB DEFAULT '{}',  -- e.g. { "matematik-2": "D", "engelska-5": "C" }
  selected_level_ids UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "UP: user manages own" ON public.user_profiles;
CREATE POLICY "UP: user manages own" ON public.user_profiles FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "UP: readable by authenticated" ON public.user_profiles;
CREATE POLICY "UP: readable by authenticated" ON public.user_profiles FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- ── 7. USER PROGRESS ──────────────────────────────────────────────────────
-- Användarens framsteg per nivå.
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_profile_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  level_id UUID NOT NULL REFERENCES public.levels(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  completion_percentage INTEGER NOT NULL DEFAULT 0 CHECK (completion_percentage BETWEEN 0 AND 100),
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_profile_id, level_id)
);

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "UPg: user manages own" ON public.user_progress;
CREATE POLICY "UPg: user manages own" ON public.user_progress FOR ALL
  USING (
    user_profile_id IN (SELECT id FROM public.user_profiles WHERE user_id = auth.uid())
  ) WITH CHECK (
    user_profile_id IN (SELECT id FROM public.user_profiles WHERE user_id = auth.uid())
  );

-- ── 8. GRANT SELECT ON MASTER DATA ────────────────────────────────────────
GRANT SELECT ON public.target_programs TO authenticated;
GRANT SELECT ON public.subjects TO authenticated;
GRANT SELECT ON public.levels TO authenticated;
GRANT SELECT ON public.knowledge_requirements TO authenticated;
GRANT SELECT ON public.central_content TO authenticated;