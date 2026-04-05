import { NextRequest, NextResponse } from 'next/server';
import { isValidTikTokUrl, hashIp, getClientIp } from '@/lib/security';
import { checkRateLimit } from '@/lib/rate-limit';

const ALLOWED_HOSTS = [
  'tiktokcdn.com',
  'tiktokcdn-us.com',
  'tikwm.com',
  'muscdn.com',
];

function isAllowedProxyHost(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return ALLOWED_HOSTS.some((h) => hostname === h || hostname.endsWith('.' + h));
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const videoUrl = searchParams.get('url');
  const filename = searchParams.get('filename') || 'video.mp4';

  if (!videoUrl) {
    return NextResponse.json({ error: 'URL manquante.' }, { status: 400 });
  }

  if (!isAllowedProxyHost(videoUrl)) {
    return NextResponse.json({ error: 'Source non autorisée.' }, { status: 403 });
  }

  // Light rate limit check for proxy
  const ip = getClientIp(request);
  const hashedIp = hashIp(ip);
  const { allowed } = await checkRateLimit(hashedIp);
  if (!allowed) {
    return NextResponse.json({ error: 'Trop de requêtes.' }, { status: 429 });
  }

  try {
    const upstream = await fetch(videoUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PasteTok/1.0)',
        Referer: 'https://www.tiktok.com/',
      },
      signal: AbortSignal.timeout(30000),
    });

    if (!upstream.ok) {
      return NextResponse.json({ error: 'Fichier introuvable.' }, { status: 502 });
    }

    const contentType = upstream.headers.get('content-type') || 'video/mp4';
    const contentLength = upstream.headers.get('content-length');

    const headers = new Headers({
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
      'Cache-Control': 'no-store',
    });
    if (contentLength) headers.set('Content-Length', contentLength);

    return new NextResponse(upstream.body, { status: 200, headers });
  } catch {
    return NextResponse.json({ error: 'Erreur lors du téléchargement.' }, { status: 502 });
  }
}
