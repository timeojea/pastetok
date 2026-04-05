# PasteTok — Project Context

> Read this file first at the start of every session.

---

## What this project is

A TikTok video downloader web platform monetized via Adsterra ads.
Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Prisma + SQLite.

---

## What has been built (completed)

### Core
- [x] Full Next.js 14 project scaffolded and **builds successfully** (`npm run build` passes)
- [x] Prisma schema with `Download` and `RateLimit` tables (SQLite)
- [x] `lib/tiktok.ts` — tikwm.com API client (no API key needed)
- [x] `lib/security.ts` — URL validation (TikTok domains only), IP hashing (HMAC-SHA256), input sanitization
- [x] `lib/rate-limit.ts` — 20 req/hour per IP via SQLite
- [x] `lib/adsterra.ts` — centralized Adsterra zone config (env vars)

### API Routes
- [x] `POST /api/download` — fetches TikTok video metadata + download URLs
- [x] `GET /api/proxy` — server-side proxy to avoid CORS issues on download
- [x] `GET /api/stats` — admin stats endpoint (Bearer token auth)
- [x] `POST /api/contact` — contact form handler (logs only, no email sending yet)

### Pages
- [x] `/` — Hero section with URL input, HowItWorks (3 steps), FAQ accordion
- [x] `/download` — Video preview, 3 download options (no watermark / watermark / MP3), sidebar banner ad
- [x] `/admin` — Password-protected stats dashboard with daily chart
- [x] `/contact` — Contact form with client+server validation
- [x] `/mentions-legales`, `/cgu`, `/politique-de-confidentialite` — static legal pages

### Ads (Adsterra)
- [x] `AdsterraBanner` — 728×90 header, 300×250 sidebar
- [x] `AdsterraNative` — between sections on homepage
- [x] `AdsterraPopunder` — injected once at app mount
- [x] `AdsterraSocialBar` — shown during download interstitial
- [x] `AdInterstitial` — 5-second countdown modal before download unlocks

### SEO / Config
- [x] `app/sitemap.ts` and `app/robots.ts` (auto-generated)
- [x] Open Graph + Twitter Card metadata
- [x] Schema.org WebApplication
- [x] CSP headers (Adsterra domains whitelisted)
- [x] Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- [x] `vercel.json` deployment config
- [x] `README.md`

---

## What still needs to be done

### High priority
- [ ] **Email sending on contact form** — `app/api/contact/route.ts` currently only `console.log`s.
  Integrate [Resend](https://resend.com) (`npm install resend`) or Nodemailer.
  The hook is at line ~19 in `app/api/contact/route.ts`.

- [ ] **OG image** — `public/og-image.png` is referenced in metadata but does not exist yet.
  Create a 1200×630px image for social sharing previews.

- [ ] **SQLite persistence on Vercel** — SQLite uses the filesystem which is ephemeral on Vercel.
  For production: migrate to **Turso** (SQLite-compatible, free tier) or **Neon/Supabase** (PostgreSQL).
  Only requires changing `DATABASE_URL` and the Prisma provider from `sqlite` to `postgresql`.

- [ ] **Adsterra zone IDs** — `.env` has empty strings for all 5 zones.
  User needs to create zones in their Adsterra dashboard and fill them in.

### Medium priority
- [ ] **DMCA / takedown handling** — no automated process. Currently just the contact form.
  Consider adding a dedicated `/dmca` page.

- [ ] **Cookie consent banner** — required for GDPR compliance since Adsterra drops 3rd-party cookies.
  Could use a simple client component that sets `localStorage` on accept.

- [ ] **Error page** — no custom `app/not-found.tsx` or `app/error.tsx` yet.

- [ ] **Mobile nav menu** — `Header.tsx` hides nav links on mobile (`hidden md:flex`).
  Add a hamburger menu for small screens.

### Low priority / nice to have
- [ ] **Download history** — client-side (localStorage) list of recently downloaded videos.
- [ ] **Telegram bot / webhook** — receive contact form messages via Telegram instead of email.
- [ ] **i18n** — currently French-only. Could add English with `next-intl`.
- [ ] **Dark/light toggle** — currently hardcoded dark theme.
- [ ] **Lighthouse audit** — run once deployed to verify score > 90 target.

---

## Key files to know

| File | Purpose |
|---|---|
| `lib/tiktok.ts` | TikTok API client — change provider here if tikwm.com goes down |
| `lib/adsterra.ts` | All ad zone IDs in one place |
| `lib/rate-limit.ts` | Rate limiting logic — adjust `MAX_REQUESTS` here |
| `lib/security.ts` | URL whitelist — add domains here if needed |
| `components/download/AdInterstitial.tsx` | 5s countdown — change `COUNTDOWN_SECONDS` to adjust |
| `app/api/contact/route.ts:19` | Where to plug in email sending |
| `prisma/schema.prisma` | DB models — run `npx prisma db push` after any change |
| `.env` | All config — never commit this file |

---

## How to run locally

```bash
npm install
npx prisma db push
npm run dev
# → http://localhost:3000
```

## Current env state

`.env` exists with dev defaults. All Adsterra zone IDs are empty (ads won't show until filled).
`DATABASE_URL` points to `./dev.db` (auto-created on first `prisma db push`).
