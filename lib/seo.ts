import type { Metadata } from 'next';
import { DICT, LANGS, ROUTES, type Lang, type PageKey } from './i18n';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://trk78.github.io/pastetok').replace(/\/$/, '');
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'PasteTok';

export const absoluteUrl = (lang: Lang, page: PageKey) => SITE_URL + ROUTES[lang][page];

/** Site-wide metadata for a language's root layout. */
export function siteMetadata(lang: Lang): Metadata {
  const m = DICT[lang].meta;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: m.siteTitle, template: `%s | ${SITE_NAME}` },
    description: m.description,
    keywords: m.keywords,
    authors: [{ name: SITE_NAME }],
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      locale: m.locale,
      siteName: SITE_NAME,
      title: m.siteTitle,
      description: m.ogDescription,
    },
    twitter: { card: 'summary', title: m.siteTitle, description: m.ogDescription },
    other: {
      'application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: SITE_NAME,
        url: absoluteUrl(lang, 'home'),
        description: m.appDescription,
        inLanguage: lang,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      }),
    },
  };
}

/** Per-page metadata: title, canonical URL and hreflang alternates. */
export function pageMetadata(lang: Lang, page: PageKey): Metadata {
  const m = DICT[lang].meta;
  const isLegal = page === 'legal' || page === 'terms' || page === 'privacy';
  return {
    title: page === 'home' ? { absolute: m.homeTitle } : m.titles[page],
    alternates: {
      canonical: absoluteUrl(lang, page),
      languages: {
        ...Object.fromEntries(LANGS.map((l) => [l, absoluteUrl(l, page)])),
        'x-default': absoluteUrl('fr', page),
      },
    },
    openGraph: { url: absoluteUrl(lang, page) },
    ...(isLegal && { robots: { index: false } }),
  };
}
