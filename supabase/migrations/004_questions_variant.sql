-- ============================================================================
-- Prövning.se — Migration 004: Variant-kolumn på questions
-- Frågor från NP är typade per variant (Ma1b, Ma2a, Ma3c osv).
-- Pluggakuten-frågor saknar variant och kvarstår NULL.
-- ============================================================================

BEGIN;

ALTER TABLE public.questions
  ADD COLUMN IF NOT EXISTS variant CHAR(1) CHECK (variant IN ('a', 'b', 'c'));

CREATE INDEX IF NOT EXISTS idx_questions_level_variant ON public.questions(level_id, variant);

-- Backfill från correct_text-mönstret "(NP MaXY-...)"
UPDATE public.questions
   SET variant = LOWER(SUBSTRING(correct_text FROM 'NP Ma\d([abc])'))
 WHERE correct_text ~ 'NP Ma\d[abc]'
   AND variant IS NULL;

-- Verifiering
DO $$
DECLARE
  total INT; with_variant INT; without INT;
BEGIN
  SELECT COUNT(*) INTO total FROM public.questions;
  SELECT COUNT(*) INTO with_variant FROM public.questions WHERE variant IS NOT NULL;
  SELECT COUNT(*) INTO without FROM public.questions WHERE variant IS NULL;
  RAISE NOTICE 'Frågor totalt: %, med variant: %, utan variant: %', total, with_variant, without;
END $$;

COMMIT;
