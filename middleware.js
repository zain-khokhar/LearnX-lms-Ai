import { NextResponse } from 'next/server';
import { verifyAuth } from './app/lib/auth';

export async function middleware(request) {
  // List of paths that don't require authentication
  const publicPaths = ['/dashboard/login', '/dashboard/signup', '/api/auth/login', '/api/auth/signup'];
  
  if (publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/dashboard/login', request.url));
  }

  try {
    await verifyAuth(token);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/dashboard/login', request.url));
  }
}

// Configure which paths should be protected by the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (authentication API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};
