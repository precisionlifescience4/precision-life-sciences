import { NextResponse } from 'next/server';
import crypto from 'crypto';

export function middleware(request) {
  const cookie = request.cookies.get('admin_session')?.value;
  const expectedToken = crypto
    .createHmac('sha256', process.env.ADMIN_SESSION_SECRET)
    .update('admin-authenticated')
    .digest('hex');

  const isLoggedIn = cookie === expectedToken;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login' && !isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};