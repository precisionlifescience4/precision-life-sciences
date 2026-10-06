import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET() {
  const { data, error } = await supabase.from('services').select('*').order('sort_order');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id, name, description, price, target_gene, sample_type, turnaround_time, reaction_volume, storage_condition, shelf_life } = await request.json();

  const { error } = await supabaseAdmin
    .from('services')
    .update({ name, description, price, target_gene, sample_type, turnaround_time, reaction_volume, storage_condition, shelf_life })
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
