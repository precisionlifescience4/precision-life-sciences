import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET() {
  const { data, error } = await supabase.from('site_content').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const obj = {};
  data.forEach((row) => { obj[row.key] = row.value; });
  return NextResponse.json(obj);
}

export async function PUT(request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const body = await request.json();
  const updates = Object.entries(body).map(([key, value]) => ({ key, value }));
  const { error } = await supabaseAdmin.from('site_content').upsert(updates);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
