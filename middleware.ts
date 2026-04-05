import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Block direct access to admin from bots/crawlers
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const ua = request.headers.get('user-agent') || '';
    if (/bot|crawler|spider|slurp|bingbot|googlebot/i.test(ua)) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
