// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl

  if (url.pathname === '/') {
    url.pathname = '/overview'
    return NextResponse.redirect(url)
  }

  // For everything else, continue normally
  return NextResponse.next()
}

// Limit middleware to specific paths
export const config = {
  matcher: ['/'], // runs only on the root path
}
