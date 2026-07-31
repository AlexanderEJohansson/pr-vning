import { NextResponse } from 'next/server';
import { createServerClient, hasSupabaseEnv } from '@/lib/supabase/server';

// GET /api/programs — list all target programs
export async function GET() {
  if (!hasSupabaseEnv()) {
    return NextResponse.json(
      { error: 'Supabase is not configured', programs: [] },
      { status: 503 }
    );
  }

  const supabase = await createServerClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase unavailable', programs: [] }, { status: 503 });
  }

  const { data: programs, error } = await supabase
    .from('target_programs')
    .select('id, name, slug, description, requirements')
    .eq('is_active', true)
    .order('name');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ programs: programs || [] });
}
