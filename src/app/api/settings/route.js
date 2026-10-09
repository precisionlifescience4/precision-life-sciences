import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { isAdmin, requireAdmin } from '@/lib/adminAuth';

export async function GET() {
  const { data, error } = await supabase.from('settings').select('*').eq('id', 1).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (await isAdmin()) return NextResponse.json(data);

  const publicEmail = data.email?.toLowerCase().endsWith('@precisionlifesciences.com.pk')
    ? data.email
    : null;
  return NextResponse.json({
    email: publicEmail,
    phone: data.phone,
    whatsapp: data.whatsapp,
    address: data.address,
    maps_link: data.maps_link,
    facebook: data.facebook,
    instagram: data.instagram,
    youtube: data.youtube,
  });
}

export async function PUT(request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id: _id, ...fields } = await request.json();
  const { error } = await supabaseAdmin.from('settings').update(fields).eq('id', 1);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
