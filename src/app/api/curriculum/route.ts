import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

// GET /api/curriculum?level=matematik-2&variant=b
// Returns central_content + knowledge_requirements for a given level (and optionally variant)
export async function GET(req: NextRequest) {
  const supabase = await createServerClient();
  const { searchParams } = new URL(req.url);

  const levelSlug = searchParams.get('level');
  const variant = searchParams.get('variant'); // 'a' | 'b' | 'c' | null

  if (!levelSlug) {
    return NextResponse.json(
      { error: 'Missing required query parameter: level' },
      { status: 400 }
    );
  }

  // Resolve level_id
  const { data: level, error: levelErr } = await supabase
    .from('levels')
    .select('id, slug, name, gy25_course_code, gy25_name, description')
    .eq('slug', levelSlug)
    .maybeSingle();

  if (levelErr) {
    return NextResponse.json({ error: levelErr.message }, { status: 500 });
  }
  if (!level) {
    return NextResponse.json({ error: `Level "${levelSlug}" not found` }, { status: 404 });
  }

  // Build queries
  let ccQuery = supabase
    .from('central_content')
    .select('content, order_index, variant, version')
    .eq('level_id', level.id)
    .order('order_index');

  let krQuery = supabase
    .from('knowledge_requirements')
    .select('grade_level, description, variant, order_index')
    .eq('level_id', level.id)
    .order('order_index');

  if (variant && ['a', 'b', 'c'].includes(variant)) {
    ccQuery = ccQuery.eq('variant', variant);
    krQuery = krQuery.eq('variant', variant);
  }

  const [ccRes, krRes] = await Promise.all([ccQuery, krQuery]);

  if (ccRes.error) return NextResponse.json({ error: ccRes.error.message }, { status: 500 });
  if (krRes.error) return NextResponse.json({ error: krRes.error.message }, { status: 500 });

  return NextResponse.json({
    level,
    variant: variant || null,
    central_content: ccRes.data || [],
    knowledge_requirements: krRes.data || [],
  });
}
