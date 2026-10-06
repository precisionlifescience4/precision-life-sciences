import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/adminAuth';

const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const formData = await request.formData();
  const file = formData.get('file');
  if (!file || typeof file === 'string') return NextResponse.json({ error: 'No file' }, { status: 400 });
  if (!file.type.startsWith('image/')) return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: 'Image must be under 4 MB' }, { status: 413 });

  const fileName = `${Date.now()}-${file.name.replace(/[^\w.-]+/g, '-')}`;
  const arrayBuffer = await file.arrayBuffer();

  const { error } = await supabaseAdmin.storage.from('site-images').upload(fileName, arrayBuffer, {
    contentType: file.type,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data } = supabaseAdmin.storage.from('site-images').getPublicUrl(fileName);
  return NextResponse.json({ url: data.publicUrl });
}
