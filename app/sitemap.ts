import { MetadataRoute } from 'next';
import { LANGS, type PageKey } from '@/lib/i18n';
import { absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

const PAGES: { page: PageKey; changeFrequency: 'daily' | 'monthly' | 'yearly'; priority: number }[] = [
  { page: 'home', changeFrequency: 'daily', priority: 1 },
  { page: 'contact', changeFrequency: 'monthly', priority: 0.5 },
  { page: 'legal', changeFrequency: 'yearly', priority: 0.2 },
  { page: 'terms', changeFrequency: 'yearly', priority: 0.2 },
  { page: 'privacy', changeFrequency: 'yearly', priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ page, changeFrequency, priority }) =>
    LANGS.map((lang) => ({
      url: absoluteUrl(lang, page),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: { languages: Object.fromEntries(LANGS.map((l) => [l, absoluteUrl(l, page)])) },
    })),
  );
}
