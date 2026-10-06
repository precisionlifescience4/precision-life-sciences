import { NextResponse } from 'next/server';

async function getExpectedToken(secret) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode('admin-authenticated'));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function middleware(request) {
  const cookie = request.cookies.get('admin_session')?.value;
  const secret = process.env.ADMIN_SESSION_SECRET;
  // Fail closed: with no secret configured nobody is treated as logged in.
  const isLoggedIn = Boolean(secret && cookie && cookie === (await getExpectedToken(secret)));
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login' && !isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};