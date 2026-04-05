import CryptoJS from 'crypto-js';

const TIKTOK_DOMAINS = [
  'tiktok.com',
  'www.tiktok.com',
  'vm.tiktok.com',
  'vt.tiktok.com',
  'm.tiktok.com',
];

export function isValidTikTokUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();
    return TIKTOK_DOMAINS.some((d) => hostname === d || hostname.endsWith('.' + d));
  } catch {
    return false;
  }
}

export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT || 'pastetok-default-salt';
  return CryptoJS.HmacSHA256(ip, salt).toString();
}

export function sanitizeString(input: string): string {
  return input.replace(/[<>"'`]/g, '').trim().slice(0, 2048);
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return '0.0.0.0';
}
