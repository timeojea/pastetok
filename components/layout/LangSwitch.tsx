'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Languages } from 'lucide-react';
import { DICT, ROUTES, matchRoute } from '@/lib/i18n';

// Links to the same page in the other language.
export default function LangSwitch() {
  const { lang, page } = matchRoute(usePathname() || '/');
  const other = lang === 'fr' ? 'en' : 'fr';

  return (
    <Link
      href={ROUTES[other][page]}
      hrefLang={other}
      aria-label={DICT[lang].nav.switchTo}
      title={DICT[lang].nav.switchTo}
      className="flex items-center gap-1.5 rounded-lg border border-gray-700 px-2.5 py-1 text-xs font-semibold text-gray-300 hover:border-brand-500 hover:text-white transition-colors"
    >
      <Languages className="h-3.5 w-3.5" />
      {other.toUpperCase()}
    </Link>
  );
}
