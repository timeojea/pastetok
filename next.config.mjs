/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.tiktokcdn.com' },
      { protocol: 'https', hostname: '*.tiktokcdn-us.com' },
      { protocol: 'https', hostname: 'p16-sign.tiktokcdn-us.com' },
      { protocol: 'https', hostname: 'p19-sign.tiktokcdn-us.com' },
      { protocol: 'https', hostname: 'p77-sign.tiktokcdn-us.com' },
      { protocol: 'https', hostname: 'p16-sign-va.tiktokcdn.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.adsterra.com *.adsrv.org *.highperformanceformat.com *.highcpmgate.com *.financepowerpouch.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: *.tiktokcdn.com *.tiktokcdn-us.com *.adsterra.com *.adsrv.org",
              "media-src 'self' blob: *.tiktokcdn.com *.tiktokcdn-us.com",
              "connect-src 'self' *.adsterra.com *.adsrv.org *.highperformanceformat.com *.highcpmgate.com",
              "frame-src 'self' *.adsterra.com *.adsrv.org",
              "font-src 'self' data:",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
