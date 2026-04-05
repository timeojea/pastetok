import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import HowItWorks from '@/components/home/HowItWorks';
import FAQ from '@/components/home/FAQ';
import dynamic from 'next/dynamic';
import { ADSTERRA_CONFIG } from '@/lib/adsterra';

const AdsterraNative = dynamic(() => import('@/components/ads/AdsterraNative'), { ssr: false });

export const metadata: Metadata = {
  title: 'PasteTok — Téléchargeur de vidéos TikTok gratuit, sans filigrane',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Native ad between sections */}
      {ADSTERRA_CONFIG.nativeHome && (
        <div className="py-4 bg-gray-950 flex justify-center">
          <AdsterraNative zone={ADSTERRA_CONFIG.nativeHome} className="w-full max-w-5xl px-4" />
        </div>
      )}

      <HowItWorks />
      <FAQ />
    </>
  );
}
