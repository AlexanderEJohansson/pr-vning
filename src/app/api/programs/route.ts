import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

// GET /api/programs — list all target programs
export async function GET() {
  const supabase = await createServerClient();

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
