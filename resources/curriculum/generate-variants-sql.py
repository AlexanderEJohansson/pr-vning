#!/usr/bin/env python3
"""
Generate full SQL script for migration 002 (variants) + reseed of central_content + knowledge_requirements
per variant (a/b/c) for all 8 mattekurser.

Run: python3 resources/curriculum/generate-variants-sql.py
Output: supabase/migrations/002_curriculum_variants_seed.sql
"""
import json
import os
import re

# variant -> level slug
COURSE_TO_LEVEL = {
    'MATMAT01a': ('matematik-1', 'a'),
    'MATMAT01b': ('matematik-1', 'b'),
    'MATMAT01c': ('matematik-1', 'c'),
    'MATMAT02a': ('matematik-2', 'a'),
    'MATMAT02b': ('matematik-2', 'b'),
    'MATMAT02c': ('matematik-2', 'c'),
    'MATMAT03b': ('matematik-3', 'b'),
    'MATMAT03c': ('matematik-3', 'c'),
}

def sql_escape(s):
    return s.replace("'", "''")

def main():
    here = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(here, 'data')
    out = os.path.join(here, '..', '..', 'supabase', 'migrations', '002_curriculum_variants_seed.sql')

    # Sanitize KR text — strip next-course bleed-over ("Matematik 4, ...")
    BLEED_PATTERNS = [
        r'\s*Matematik\s+\d,\s+\d+\s+po.{0,200}',  # "Matematik 4, 100 po.." eller "Matematik 4, 100 poäng"
        r'\s*Matematik\s+\d,\s+Kurskod.*',
        r'\s*Kurskod:\s+MATMAT\d.*',
    ]
    def clean_kr(text):
        for p in BLEED_PATTERNS:
            m = re.search(p, text)
            if m:
                text = text[:m.start()].rstrip()
        return text

    lines = []
    lines.append("-- ============================================================================")
    lines.append("-- Prövning.se — Migration 002: Curriculum varianter (per a/b/c)")
    lines.append("-- Auto-generated from resources/curriculum/data/*.json (do not edit manually)")
    lines.append("-- ============================================================================")
    lines.append("")
    lines.append("BEGIN;")
    lines.append("")
    lines.append("-- 1. Variant-kolumn på båda tabellerna")
    lines.append("ALTER TABLE public.central_content")
    lines.append("  ADD COLUMN IF NOT EXISTS variant CHAR(1) CHECK (variant IN ('a', 'b', 'c'));")
    lines.append("ALTER TABLE public.knowledge_requirements")
    lines.append("  ADD COLUMN IF NOT EXISTS variant CHAR(1) CHECK (variant IN ('a', 'b', 'c'));")
    lines.append("CREATE INDEX IF NOT EXISTS idx_cc_level_variant ON public.central_content(level_id, variant);")
    lines.append("CREATE INDEX IF NOT EXISTS idx_kr_level_variant ON public.knowledge_requirements(level_id, variant);")
    lines.append("")
    lines.append("-- 2. Rensa befintliga rader (vi seedar om allt per variant)")
    lines.append("DELETE FROM public.central_content;")
    lines.append("DELETE FROM public.knowledge_requirements;")
    lines.append("")

    cc_total = 0
    kr_total = 0

    for code, (level_slug, variant) in COURSE_TO_LEVEL.items():
        path = os.path.join(data_dir, f'{code}-parsed.json')
        with open(path) as f:
            d = json.load(f)
        cc = d.get('central_content', [])
        kr = d.get('knowledge_requirements', {})

        lines.append(f"-- ── {code} (variant={variant}, level={level_slug}) ─────────────")
        lines.append(f"-- Centralt innehåll: {len(cc)} punkter")

        # Get level_id via subquery
        level_subq = f"(SELECT id FROM public.levels WHERE slug = '{level_slug}')"

        for i, content in enumerate(cc):
            content_clean = content.strip()
            if not content_clean:
                continue
            lines.append(
                f"INSERT INTO public.central_content (level_id, variant, content, order_index, version) "
                f"VALUES ({level_subq}, '{variant}', '{sql_escape(content_clean)}', {i}, '2025-skolverket');"
            )
            cc_total += 1

        for grade in ('E', 'C', 'A'):
            text = clean_kr(kr.get(grade, '').strip())
            if not text:
                continue
            order_map = {'E': 0, 'C': 1, 'A': 2}
            lines.append(
                f"INSERT INTO public.knowledge_requirements (level_id, variant, grade_level, description, order_index) "
                f"VALUES ({level_subq}, '{variant}', '{grade}', '{sql_escape(text)}', {order_map[grade]});"
            )
            kr_total += 1
        lines.append("")

    lines.append("-- 3. Verifiering")
    lines.append("DO $$")
    lines.append("DECLARE")
    lines.append("  cc_count INT;")
    lines.append("  kr_count INT;")
    lines.append("BEGIN")
    lines.append("  SELECT COUNT(*) INTO cc_count FROM public.central_content;")
    lines.append("  SELECT COUNT(*) INTO kr_count FROM public.knowledge_requirements;")
    lines.append(f"  RAISE NOTICE 'Centralt innehåll: % rader (förväntat {cc_total})', cc_count;")
    lines.append(f"  RAISE NOTICE 'Kunskapskrav: % rader (förväntat {kr_total})', kr_count;")
    lines.append("END $$;")
    lines.append("")
    lines.append("COMMIT;")

    with open(out, 'w') as f:
        f.write('\n'.join(lines) + '\n')

    print(f"Wrote {out}")
    print(f"  Centralt innehåll: {cc_total} rader")
    print(f"  Kunskapskrav: {kr_total} rader")

if __name__ == '__main__':
    main()
