import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer') return false;
  return token === process.env.ADMIN_PASSWORD;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const days = Math.min(parseInt(searchParams.get('days') || '7'), 90);
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  const [total, byType, recent, dailyCounts] = await Promise.all([
    prisma.download.count({ where: { createdAt: { gte: since }, success: true } }),
    prisma.download.groupBy({
      by: ['downloadType'],
      _count: true,
      where: { createdAt: { gte: since }, success: true },
    }),
    prisma.download.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
      where: { createdAt: { gte: since } },
      select: { id: true, createdAt: true, downloadType: true, author: true, success: true },
    }),
    prisma.$queryRaw<{ date: string; count: number }[]>`
      SELECT date(createdAt) as date, COUNT(*) as count
      FROM Download
      WHERE createdAt >= ${since.toISOString()} AND success = 1
      GROUP BY date(createdAt)
      ORDER BY date ASC
    `,
  ]);

  return NextResponse.json({ total, byType, recent, dailyCounts, days });
}
