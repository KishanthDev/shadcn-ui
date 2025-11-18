// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone() // clone it so we can modify safely

  // 1. Redirect root → /copilot-dashboard
  if (url.pathname === '/') {
    url.pathname = '/copilot-dashboard'
    return NextResponse.redirect(url)
  }

  // 2. Forward real User-Agent + Sec-CH-UA headers to API routes (critical on Vercel!)
  const requestHeaders = new Headers(request.headers)

  // Preserve original User-Agent (Vercel often strips it without this)
  const userAgent = request.headers.get('user-agent')
  if (userAgent) {
    requestHeaders.set('user-agent', userAgent)
  }

  // Also forward modern client hints (many browsers send UA info here instead)
  const secChUa = request.headers.get('sec-ch-ua')
  if (secChUa) {
    requestHeaders.set('sec-ch-ua', secChUa)
  }

  const secChUaPlatform = request.headers.get('sec-ch-ua-platform')
  if (secChUaPlatform) {
    requestHeaders.set('sec-ch-ua-platform', secChUaPlatform)
  }

  // Only apply header forwarding on your device-info route (or all API routes)
  if (url.pathname.startsWith('/api/device-info')) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  // For all other requests, just continue normally
  return NextResponse.next()
}

// Run middleware on:
// - Root path (for redirect)
// - Your device-info API route (for UA forwarding)
export const config = {
  matcher: [
    '/',
    '/api/device-info',        // ← this ensures UA is forwarded
    // Or use: '/api/:path*'   // if you have more API routes needing real UA
  ],
}