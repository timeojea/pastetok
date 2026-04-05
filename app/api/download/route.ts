import { NextRequest, NextResponse } from 'next/server';
import { fetchTikTokVideo } from '@/lib/tiktok';
import { isValidTikTokUrl, hashIp, sanitizeString, getClientIp } from '@/lib/security';
import { checkRateLimit } from '@/lib/rate-limit';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const hashedIp = hashIp(ip);

  // Rate limiting
  const { allowed, remaining, resetAt } = await checkRateLimit(hashedIp);
  if (!allowed) {
    return NextResponse.json(
      { error: `Trop de requêtes. Réessayez après ${resetAt.toLocaleTimeString('fr-FR')}.` },
      {
        status: 429,
        headers: {
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': resetAt.toISOString(),
          'Retry-After': String(Math.ceil((resetAt.getTime() - Date.now()) / 1000)),
        },
      }
    );
  }

  let body: { url?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 });
  }

  const rawUrl = sanitizeString(body.url || '');
  if (!rawUrl) {
    return NextResponse.json({ error: 'URL manquante.' }, { status: 400 });
  }

  if (!isValidTikTokUrl(rawUrl)) {
    return NextResponse.json(
      { error: "URL invalide. Seules les URLs TikTok (tiktok.com, vm.tiktok.com) sont acceptées." },
      { status: 400 }
    );
  }

  const result = await fetchTikTokVideo(rawUrl);

  // Log to DB
  await prisma.download.create({
    data: {
      sourceUrl: rawUrl,
      downloadType: 'fetch',
      hashedIp,
      videoId: result.video?.id || null,
      author: result.video?.author || null,
      success: result.success,
    },
  }).catch(() => {}); // non-blocking

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 422 });
  }

  return NextResponse.json(
    { video: result.video },
    {
      headers: {
        'X-RateLimit-Remaining': String(remaining),
        'X-RateLimit-Reset': resetAt.toISOString(),
      },
    }
  );
}
