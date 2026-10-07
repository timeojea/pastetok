import type { ReactNode } from 'react';

export interface LegalSection {
  title: string;
  body: ReactNode;
}

export const linkClass = 'text-brand-400 hover:text-brand-300 underline';

export default function LegalPage({
  title,
  sections,
  updated,
}: {
  title: string;
  sections: LegalSection[];
  updated?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">{title}</h1>
      <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="text-white text-xl font-semibold mb-3">{s.title}</h2>
            {s.body}
          </section>
        ))}
        {updated && <p className="text-xs text-gray-500 pt-4 border-t border-gray-800">{updated}</p>}
      </div>
    </div>
  );
}
