// app/api/device-info/route.ts
import { NextRequest } from 'next/server';
import { headers } from 'next/headers';
import { UAParser } from 'ua-parser-js'; // Named import!

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
  const userAgent = request.headers.get('user-agent') || ''

  // Optional fallback: try to reconstruct from client hints
  if (!userAgent || userAgent.length < 10) {
    const secChUa = request.headers.get('sec-ch-ua')
    console.log('UA missing, got sec-ch-ua:', secChUa)
    // You can even use a library like `ua-client-hints` if needed
  }

  const parser = new UAParser(userAgent)
  const result = parser.getResult()

    // Or one-liner: const result = new UAParser(userAgent).getResult();

    const data = {
      os: result.os.name ?? 'Unknown OS',
      osVersion: result.os.version ?? 'Unknown',
      browser: result.browser.name ?? 'Unknown Browser',
      browserVersion: result.browser.version ?? 'Unknown',
      device: result.device.model ?? result.device.vendor ?? 'Desktop',
      deviceType: result.device.type ?? 'desktop',
      isMobile: result.device.type === 'mobile',
      isTablet: result.device.type === 'tablet',
      isDesktop: !result.device.type || ['desktop', 'console'].includes(result.device.type),
      userAgent: userAgent.slice(0, 200),
    };

    return Response.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Device info parsing failed:', error);
    return Response.json(
      { error: 'Failed to parse device info' },
      { status: 500 }
    );
  }
}