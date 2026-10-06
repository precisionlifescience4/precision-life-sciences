import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export function sessionToken() {
  return crypto
    .createHmac('sha256', process.env.ADMIN_SESSION_SECRET)
    .update('admin-authenticated')
    .digest('hex');
}

export function safeEqual(a = '', b = '') {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export async function isAdmin() {
  if (!process.env.ADMIN_SESSION_SECRET) return false;
  const cookieStore = await cookies();
  return safeEqual(cookieStore.get('admin_session')?.value, sessionToken());
}

// Usage: const denied = await requireAdmin(); if (denied) return denied;
export async function requireAdmin() {
  if (await isAdmin()) return null;
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
