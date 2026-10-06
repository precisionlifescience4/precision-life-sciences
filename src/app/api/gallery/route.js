import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET() {
  const { data, error } = await supabase.from('gallery').select('*').order('sort_order');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { image_url, caption, sort_order } = await request.json();
  const { error } = await supabaseAdmin.from('gallery').insert({ image_url, caption, sort_order });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await request.json();
  const { error } = await supabaseAdmin.from('gallery').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
