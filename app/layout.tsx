import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import dynamic from 'next/dynamic';
import { ADSTERRA_CONFIG } from '@/lib/adsterra';

const AdsterraPopunder = dynamic(() => import('@/components/ads/AdsterraPopunder'), { ssr: false });

const inter = Inter({ subsets: ['latin'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pastetok.com';
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'PasteTok';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Téléchargeur de vidéos TikTok gratuit`,
    template: `%s | ${siteName}`,
  },
  description:
    'Téléchargez des vidéos TikTok gratuitement en HD, sans filigrane ou en MP3. Rapide, gratuit, sans inscription.',
  keywords: ['télécharger tiktok', 'tiktok sans filigrane', 'tiktok downloader', 'télécharger vidéo tiktok', 'tiktok mp3'],
  authors: [{ name: siteName }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    siteName,
    title: `${siteName} — Téléchargeur de vidéos TikTok gratuit`,
    description: 'Téléchargez des vidéos TikTok gratuitement en HD, sans filigrane ou en MP3.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} — Téléchargeur de vidéos TikTok gratuit`,
    description: 'Téléchargez des vidéos TikTok gratuitement en HD, sans filigrane ou en MP3.',
    images: ['/og-image.png'],
  },
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: siteName,
      url: siteUrl,
      description: 'Téléchargeur de vidéos TikTok gratuit',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    }),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className={inter.className}>
        {ADSTERRA_CONFIG.popunder && (
          <AdsterraPopunder zone={ADSTERRA_CONFIG.popunder} />
        )}
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
