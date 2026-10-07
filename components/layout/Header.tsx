import Link from 'next/link';
import { DICT, ROUTES, type Lang } from '@/lib/i18n';
import LangSwitch from './LangSwitch';

export default function Header({ lang }: { lang: Lang }) {
  const t = DICT[lang].nav;
  return (
    <header className="border-b border-gray-800 bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link href={ROUTES[lang].home} className="flex items-center gap-2 group">
          <span className="text-2xl font-black tracking-tight text-white group-hover:text-brand-400 transition-colors">
            Paste<span className="text-brand-500">Tok</span>
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
            <Link href={ROUTES[lang].home} className="hover:text-white transition-colors">{t.home}</Link>
            <Link href={ROUTES[lang].contact} className="hover:text-white transition-colors">{t.contact}</Link>
          </nav>
          <LangSwitch />
        </div>
      </div>
    </header>
  );
}
