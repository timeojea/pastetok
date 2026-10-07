'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { DICT, type Lang } from '@/lib/i18n';

export default function FAQ({ lang }: { lang: Lang }) {
  const t = DICT[lang].faq;
  const faqs = t.items;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 bg-gray-900/50">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
          {t.title}
        </h2>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl bg-gray-900 border border-gray-800 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-white hover:text-brand-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 flex-shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed animate-fade-in border-t border-gray-800 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
