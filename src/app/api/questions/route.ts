import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, hasSupabaseEnv } from '@/lib/supabase/server';

// GET /api/questions?level=matematik-2&variant=b&topic=algebra&limit=20&offset=0
export async function GET(req: NextRequest) {
  if (!hasSupabaseEnv()) {
    return NextResponse.json(
      { error: 'Supabase is not configured', questions: [], pagination: { total: 0 } },
      { status: 503 }
    );
  }

  const supabase = await createServerClient();
  if (!supabase) {
    return NextResponse.json(
      { error: 'Supabase unavailable', questions: [], pagination: { total: 0 } },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(req.url);

  const levelSlug = searchParams.get('level');
  const variant = searchParams.get('variant');
  const topicSlug = searchParams.get('topic');
  const limit = Math.min(Number(searchParams.get('limit')) || 20, 100);
  const offset = Math.max(Number(searchParams.get('offset')) || 0, 0);
  const includeNullVariant = searchParams.get('includeNullVariant') !== 'false';

  if (!levelSlug) {
    return NextResponse.json(
      { error: 'Missing required query parameter: level' },
      { status: 400 }
    );
  }

  const { data: level, error: levelErr } = await supabase
    .from('levels')
    .select('id, slug, name')
    .eq('slug', levelSlug)
    .maybeSingle();

  if (levelErr) return NextResponse.json({ error: levelErr.message }, { status: 500 });
  if (!level) return NextResponse.json({ error: `Level "${levelSlug}" not found` }, { status: 404 });

  let topicId: string | null = null;
  if (topicSlug) {
    const fullSlug = topicSlug.startsWith('matematik-') ? topicSlug : `matematik-${topicSlug}`;
    const { data: topic } = await supabase
      .from('question_topics')
      .select('id')
      .eq('slug', fullSlug)
      .maybeSingle();
    if (!topic) {
      return NextResponse.json({ error: `Topic "${topicSlug}" not found` }, { status: 404 });
    }
    topicId = topic.id;
  }

  let query = supabase
    .from('questions')
    .select('id, question_text, correct_text, source_year, variant, topic_id', { count: 'exact' })
    .eq('level_id', level.id);

  if (variant && ['a', 'b', 'c'].includes(variant)) {
    if (includeNullVariant) {
      query = query.or(`variant.eq.${variant},variant.is.null`);
    } else {
      query = query.eq('variant', variant);
    }
  }
  if (topicId) query = query.eq('topic_id', topicId);

  query = query.range(offset, offset + limit - 1).order('id');

  const { data, error, count } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    level: { slug: level.slug, name: level.name },
    filters: { variant: variant || null, topic: topicSlug || null, includeNullVariant },
    pagination: { limit, offset, total: count ?? 0 },
    questions: data || [],
  });
}
