-- ============================================================================
-- Prövning.se — Migration 005: Public read-policy på questions
-- Fångar miss i 001 — questions hade RLS men ingen SELECT-policy,
-- vilket gjorde att anon-läsning gav tomma resultat.
-- Frågorna är publik data (NP + Pluggakuten), så public read är OK.
-- ============================================================================

BEGIN;

DROP POLICY IF EXISTS "Questions: public read" ON public.questions;
CREATE POLICY "Questions: public read" ON public.questions FOR SELECT
  USING (true);

-- Verifiering
DO $$
DECLARE
  pol_count INT;
BEGIN
  SELECT COUNT(*) INTO pol_count FROM pg_policies
   WHERE schemaname='public' AND tablename='questions';
  RAISE NOTICE 'Questions-policies: % st', pol_count;
END $$;

COMMIT;
