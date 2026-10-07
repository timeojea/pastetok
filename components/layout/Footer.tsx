import Link from 'next/link';
import { DICT, ROUTES, type Lang } from '@/lib/i18n';

export default function Footer({ lang }: { lang: Lang }) {
  const t = DICT[lang].footer;
  const r = ROUTES[lang];
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-gray-800 bg-gray-950 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-400">
          <div>
            <p className="text-white font-bold text-lg mb-2">
              Paste<span className="text-brand-500">Tok</span>
            </p>
            <p className="text-xs leading-relaxed">{t.tagline}</p>
          </div>
          <div>
            <p className="text-white font-semibold mb-2">{t.links}</p>
            <ul className="space-y-1">
              <li><Link href={r.legal} className="hover:text-white transition-colors">{t.legal}</Link></li>
              <li><Link href={r.terms} className="hover:text-white transition-colors">{t.terms}</Link></li>
              <li><Link href={r.privacy} className="hover:text-white transition-colors">{t.privacy}</Link></li>
              <li><Link href={r.contact} className="hover:text-white transition-colors">{t.contact}</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold mb-2">{t.legalTitle}</p>
            <p className="text-xs leading-relaxed">
              {t.legalText}
              <a
                href="https://www.tiktok.com/legal/terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                {t.tiktokTerms}
              </a>.
            </p>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-gray-600">
          © {currentYear} PasteTok. {t.rights}
        </p>
      </div>
    </footer>
  );
}
