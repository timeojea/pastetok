import { prisma } from './db';

const MAX_REQUESTS = 20;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export async function checkRateLimit(hashedIp: string): Promise<{
  allowed: boolean;
  remaining: number;
  resetAt: Date;
}> {
  const now = new Date();

  const record = await prisma.rateLimit.findUnique({ where: { hashedIp } });

  if (!record || record.resetAt < now) {
    const resetAt = new Date(now.getTime() + WINDOW_MS);
    await prisma.rateLimit.upsert({
      where: { hashedIp },
      update: { count: 1, resetAt },
      create: { hashedIp, count: 1, resetAt },
    });
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetAt };
  }

  if (record.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt };
  }

  const updated = await prisma.rateLimit.update({
    where: { hashedIp },
    data: { count: { increment: 1 } },
  });

  return {
    allowed: true,
    remaining: MAX_REQUESTS - updated.count,
    resetAt: updated.resetAt,
  };
}
