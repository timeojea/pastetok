import { Github } from 'lucide-react';
import { DICT, type Lang } from '@/lib/i18n';

// Fully static site (GitHub Pages): no backend for a contact form.
// Contact goes through the open source project's GitHub issues.
const ISSUES_URL = 'https://github.com/trk78/pastetok/issues';

export default function ContactView({ lang }: { lang: Lang }) {
  const t = DICT[lang].contact;
  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">{t.title}</h1>
      <p className="text-gray-400 text-sm mb-8">{t.text}</p>

      <a
        href={ISSUES_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 text-sm transition-all"
      >
        <Github className="h-4 w-4" /> {t.button}
      </a>
    </div>
  );
}
