import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function POST(request) {
  const cookieStore = await cookies();
    const crypto = require('crypto');
  const expectedToken = crypto
    .createHmac('sha256', process.env.ADMIN_SESSION_SECRET)
    .update('admin-authenticated')
    .digest('hex');
  const isLoggedIn = cookieStore.get('admin_session')?.value === expectedToken;
  if (!isLoggedIn) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get('file');
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const arrayBuffer = await file.arrayBuffer();

  const { error } = await supabase.storage.from('site-images').upload(fileName, arrayBuffer, {
    contentType: file.type,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data } = supabase.storage.from('site-images').getPublicUrl(fileName);
  return NextResponse.json({ url: data.publicUrl });
}