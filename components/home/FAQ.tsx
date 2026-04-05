'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Est-ce gratuit ?',
    a: 'Oui, PasteTok est entièrement gratuit et sans inscription.',
  },
  {
    q: 'Comment supprimer le filigrane TikTok ?',
    a: 'Choisissez l\'option "Sans filigrane" sur la page de téléchargement. Notre outil utilise l\'URL de streaming originale sans watermark.',
  },
  {
    q: 'Puis-je télécharger des vidéos privées ?',
    a: 'Non. Seules les vidéos publiques peuvent être téléchargées. Les vidéos privées ou supprimées ne sont pas accessibles.',
  },
  {
    q: 'Quel est le nombre maximum de téléchargements ?',
    a: 'Vous pouvez effectuer jusqu\'à 20 téléchargements par heure par adresse IP.',
  },
  {
    q: 'Stockez-vous mes vidéos ?',
    a: 'Non. Nous ne stockons aucune vidéo sur nos serveurs. Le lien de téléchargement pointe directement vers les serveurs TikTok.',
  },
  {
    q: 'C\'est légal ?',
    a: 'PasteTok est un outil de téléchargement personnel. Vous êtes responsable du respect des droits d\'auteur. N\'utilisez pas les vidéos téléchargées à des fins commerciales sans l\'accord des créateurs.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 bg-gray-900/50">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
          Questions fréquentes
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
