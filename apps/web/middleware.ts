import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: ['/create-project', '/user-edit/:path*', '/project-edit/:path*'],
};
