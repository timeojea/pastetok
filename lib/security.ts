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

export function sanitizeString(input: string): string {
  return input.replace(/[<>"'`]/g, '').trim().slice(0, 2048);
}
