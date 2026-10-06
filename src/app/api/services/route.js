import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET() {
  const { data, error } = await supabase.from('services').select('*').order('sort_order');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

const COLORS = ['hbv', 'hcv', 'hiv', 'flu', 'cchf', 'navy'];

export async function PUT(request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id, name, description, price, target_gene, sample_type, turnaround_time, reaction_volume, storage_condition, shelf_life, slug, color } = await request.json();

  const update = { name, description, price, target_gene, sample_type, turnaround_time, reaction_volume, storage_condition, shelf_life };

  // Card label and colour are editable. Only accept known colours, and keep the
  // reserved "support" label for the research services row, which the home page hides.
  if (color !== undefined) {
    if (!COLORS.includes(color)) return NextResponse.json({ error: 'Unknown colour' }, { status: 400 });
    update.color = color;
  }
  if (slug !== undefined) {
    const label = String(slug).trim().slice(0, 24);
    if (!label) return NextResponse.json({ error: 'Card label cannot be empty' }, { status: 400 });
    const { data: current } = await supabaseAdmin.from('services').select('slug').eq('id', id).single();
    if (current?.slug === 'support' || label.toLowerCase() === 'support') {
      if (label !== current?.slug) return NextResponse.json({ error: 'The label "support" is reserved' }, { status: 400 });
    } else {
      update.slug = label;
    }
  }

  const { error } = await supabaseAdmin.from('services').update(update).eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
