-- ============================================================================
-- Prövning.se — Migration 003: Target programs seed
-- Vanliga svenska högskoleprogram med matematikkrav.
-- Källa: antagning.se / universitets behörighetskrav (2025)
-- ============================================================================

BEGIN;

DELETE FROM public.target_programs;

INSERT INTO public.target_programs (name, slug, description, requirements, is_active) VALUES
-- Teknik / ingenjör
('Civilingenjör', 'civilingenjor',
  'Civilingenjörsprogram (KTH, Chalmers, LiU, LU). Kräver mest matte av alla utbildningar.',
  '{"math": "Matematik 4", "extra": ["Fysik 2", "Kemi 1"], "category": "teknik"}'::jsonb, true),
('Högskoleingenjör', 'hogskoleingenjor',
  'Högskoleingenjörsprogram. Något lägre matematikkrav än civilingenjör.',
  '{"math": "Matematik 3c", "extra": ["Fysik 2", "Kemi 1"], "category": "teknik"}'::jsonb, true),
('Arkitekt', 'arkitekt',
  'Arkitektprogram (KTH, Chalmers, LTH, Umeå). Kräver Ma3c och Fy2.',
  '{"math": "Matematik 3c", "extra": ["Fysik 2"], "category": "teknik"}'::jsonb, true),
('Datavetenskap / IT', 'datavetenskap',
  'Datavetenskap, programmering, mjukvaruutveckling.',
  '{"math": "Matematik 3c", "category": "teknik"}'::jsonb, true),

-- Medicin / vård
('Läkare', 'lakare',
  'Läkarprogram (5,5 år). Kräver Ma4, Bi2, Ke2, Fy2 och meritpoäng.',
  '{"math": "Matematik 4", "extra": ["Biologi 2", "Kemi 2", "Fysik 2"], "category": "medicin"}'::jsonb, true),
('Tandläkare', 'tandlakare',
  'Tandläkarprogram. Likvärdigt med läkarprogrammet i krav.',
  '{"math": "Matematik 4", "extra": ["Biologi 2", "Kemi 2", "Fysik 2"], "category": "medicin"}'::jsonb, true),
('Veterinär', 'veterinar',
  'Veterinärprogram (SLU). Höga krav på biologi och kemi.',
  '{"math": "Matematik 4", "extra": ["Biologi 2", "Kemi 2", "Fysik 2"], "category": "medicin"}'::jsonb, true),
('Apotekare', 'apotekare',
  'Apotekarprogram (5 år). Kräver Ma3c eller motsvarande.',
  '{"math": "Matematik 3c", "extra": ["Biologi 2", "Kemi 2", "Fysik 2"], "category": "medicin"}'::jsonb, true),
('Sjuksköterska', 'sjukskoterska',
  'Sjuksköterskeprogram. Grundläggande matte räcker (Ma2).',
  '{"math": "Matematik 2", "extra": ["Naturkunskap 2"], "category": "medicin"}'::jsonb, true),
('Fysioterapeut', 'fysioterapeut',
  'Fysioterapeut/sjukgymnast. Kräver Ma2 och Naturkunskap 2.',
  '{"math": "Matematik 2", "extra": ["Naturkunskap 2"], "category": "medicin"}'::jsonb, true),
('Psykolog', 'psykolog',
  'Psykologprogram (5 år). Kräver Ma2 och Sh1b/2a+2b.',
  '{"math": "Matematik 2", "category": "medicin"}'::jsonb, true),

-- Naturvetenskap
('Civilingenjör i bioteknik', 'civilingenjor-bioteknik',
  'Bioteknik och kemiteknik. Kräver Ma4, Bi2, Ke2, Fy2.',
  '{"math": "Matematik 4", "extra": ["Biologi 2", "Kemi 2", "Fysik 2"], "category": "teknik"}'::jsonb, true),
('Naturvetenskaplig kandidat', 'naturvetenskap',
  'Kandidat i naturvetenskap (biologi, kemi, fysik, matematik).',
  '{"math": "Matematik 3c", "extra": ["Biologi 2", "Kemi 2", "Fysik 2"], "category": "naturvetenskap"}'::jsonb, true),

-- Ekonomi / juridik
('Civilekonom', 'civilekonom',
  'Civilekonomprogram (4 år). Kräver Ma3b eller 3c.',
  '{"math": "Matematik 3b", "category": "ekonomi"}'::jsonb, true),
('Ekonomi kandidat', 'ekonomi-kandidat',
  'Kandidatprogram i företagsekonomi eller nationalekonomi.',
  '{"math": "Matematik 3b", "category": "ekonomi"}'::jsonb, true),
('Jurist', 'jurist',
  'Juristprogram (4,5 år). Kräver Hi1b/1a1+1a2 och Sh1b/1a1+1a2.',
  '{"math": "Matematik 2", "extra": ["Historia 1b", "Samhällskunskap 1b"], "category": "samhalle"}'::jsonb, true),
('Fastighetsmäklare', 'fastighetsmaklare',
  'Fastighetsmäklarprogram (3 år).',
  '{"math": "Matematik 2", "category": "ekonomi"}'::jsonb, true),

-- Samhälle / lärare
('Socionom', 'socionom',
  'Socionomprogram (3,5 år). Kräver grundläggande behörighet och Sh1b.',
  '{"math": "Matematik 2", "extra": ["Samhällskunskap 1b"], "category": "samhalle"}'::jsonb, true),
('Lärare F-3', 'larare-f3',
  'Grundlärarprogram förskoleklass och årskurs 1-3.',
  '{"math": "Matematik 2", "extra": ["Naturkunskap 1b", "Samhällskunskap 1b"], "category": "lararutbildning"}'::jsonb, true),
('Lärare 4-6', 'larare-4-6',
  'Grundlärarprogram årskurs 4-6.',
  '{"math": "Matematik 2", "extra": ["Naturkunskap 1b", "Samhällskunskap 1b"], "category": "lararutbildning"}'::jsonb, true),
('Lärare 7-9 / Gymnasielärare matte', 'larare-matte',
  'Ämneslärare i matematik. Kräver Ma3c eller Ma4 beroende på inriktning.',
  '{"math": "Matematik 3c", "category": "lararutbildning"}'::jsonb, true),
('Förskollärare', 'forskollarare',
  'Förskollärarprogram (3,5 år).',
  '{"math": "Matematik 2", "extra": ["Naturkunskap 1b", "Samhällskunskap 1b"], "category": "lararutbildning"}'::jsonb, true),

-- Övriga vanliga
('Polis', 'polis',
  'Polisutbildning. Inga specifika ämneskrav utöver grundläggande behörighet.',
  '{"math": "Matematik 1", "category": "annat"}'::jsonb, true),
('Officer', 'officer',
  'Försvarsmaktens officersprogram (3 år).',
  '{"math": "Matematik 2", "category": "annat"}'::jsonb, true),
('Annat / Eget program', 'annat',
  'Sätt eget mål om du inte hittar din utbildning här.',
  '{"math": null, "category": "annat"}'::jsonb, true);

-- Verifiering
DO $$
DECLARE
  cnt INT;
BEGIN
  SELECT COUNT(*) INTO cnt FROM public.target_programs;
  RAISE NOTICE 'Target programs: % rader', cnt;
END $$;

COMMIT;
