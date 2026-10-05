import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request) {
  const { password } = await request.json();

  if (password === process.env.ADMIN_PASSWORD) {
    const token = crypto
      .createHmac('sha256', process.env.ADMIN_SESSION_SECRET)
      .update('admin-authenticated')
      .digest('hex');

    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}