import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import HowItWorks from '@/components/home/HowItWorks';
import FAQ from '@/components/home/FAQ';

export const metadata: Metadata = {
  title: 'PasteTok — Téléchargeur de vidéos TikTok gratuit, sans filigrane',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <HowItWorks />
      <FAQ />
    </>
  );
}
