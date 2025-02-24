

// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth-token');
  const publicPaths = ['/login', '/signup'];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  if (!authToken && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (authToken && isPublicPath) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
