import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, hasSupabaseEnv } from '@/lib/supabase/server';

// GET /api/levels — list all levels
export async function GET(req: NextRequest) {
  if (!hasSupabaseEnv()) {
    return NextResponse.json(
      { error: 'Supabase is not configured', levels: [] },
      { status: 503 }
    );
  }

  const supabase = await createServerClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase unavailable', levels: [] }, { status: 503 });
  }

  const { searchParams } = new URL(req.url);
  const subject = searchParams.get('subject');

  let query = supabase
    .from('levels')
    .select(`
      id, slug, name, level_number,
      gy25_course_code, gy25_name, gy11_course_code,
      description, is_active,
      subjects!inner(id, name, slug)
    `)
    .eq('is_active', true)
    .order('level_number');

  if (subject) {
    query = query.eq('subjects.slug', subject);
  }

  const { data: levels, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ levels: levels || [] });
}
