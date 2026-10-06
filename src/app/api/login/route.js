import { NextResponse } from 'next/server';
import { sessionToken, safeEqual } from '@/lib/adminAuth';
import { rateLimited, clientIp } from '@/lib/rateLimit';

export async function POST(request) {
  if (rateLimited(`login:${clientIp(request)}`, 8, 15 * 60 * 1000)) {
    return NextResponse.json({ success: false, error: 'Too many attempts. Try again later.' }, { status: 429 });
  }

  const { password } = await request.json().catch(() => ({}));
  const expected = process.env.ADMIN_PASSWORD;

  if (expected && process.env.ADMIN_SESSION_SECRET && typeof password === 'string' && safeEqual(password, expected)) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_session', sessionToken(), {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  }

  await new Promise((r) => setTimeout(r, 600));
  return NextResponse.json({ success: false }, { status: 401 });
}
