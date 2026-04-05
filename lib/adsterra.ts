export const ADSTERRA_CONFIG = {
  bannerHeader: process.env.NEXT_PUBLIC_ADSTERRA_BANNER_HEADER || '',
  bannerSidebar: process.env.NEXT_PUBLIC_ADSTERRA_BANNER_SIDEBAR || '',
  nativeHome: process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_HOME || '',
  popunder: process.env.NEXT_PUBLIC_ADSTERRA_POPUNDER || '',
  socialBar: process.env.NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR || '',
};

export type AdZoneKey = keyof typeof ADSTERRA_CONFIG;
