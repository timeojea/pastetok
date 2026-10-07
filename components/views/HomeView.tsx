import HeroSection from '@/components/home/HeroSection';
import HowItWorks from '@/components/home/HowItWorks';
import FAQ from '@/components/home/FAQ';
import type { Lang } from '@/lib/i18n';

export default function HomeView({ lang }: { lang: Lang }) {
  return (
    <>
      <HeroSection lang={lang} />
      <HowItWorks lang={lang} />
      <FAQ lang={lang} />
    </>
  );
}
