import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET() {
  const { data, error } = await supabase.from('faqs').select('*').order('sort_order');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { question, answer, sort_order } = await request.json();
  const { error } = await supabaseAdmin.from('faqs').insert({ question, answer, sort_order });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function PUT(request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id, question, answer, sort_order } = await request.json();
  const { error } = await supabaseAdmin.from('faqs').update({ question, answer, sort_order }).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await request.json();
  const { error } = await supabaseAdmin.from('faqs').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
