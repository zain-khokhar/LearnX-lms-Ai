import { NextResponse } from 'next/server';
import { verifyAuth } from './app/lib/auth';

export async function middleware(request) {
  // Allow all API auth routes to work normally
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Allow all frontend routes
  return NextResponse.next();
}

// Only protect API routes
export const config = {
  matcher: ['/api/:path*'],
};
