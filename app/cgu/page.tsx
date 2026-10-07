import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation",
  robots: { index: false },
};

export default function CGUPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Conditions Générales d&apos;Utilisation</h1>
      <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
        <section>
          <h2 className="text-white text-xl font-semibold mb-3">1. Objet</h2>
          <p>
            Les présentes CGU définissent les modalités d&apos;utilisation du service PasteTok,
            outil permettant le téléchargement de vidéos TikTok publiques à des fins personnelles.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">2. Acceptation</h2>
          <p>
            L&apos;utilisation du service implique l&apos;acceptation pleine et entière des présentes CGU.
            Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser ce service.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">3. Usage autorisé</h2>
          <p>Le service est réservé à un usage strictement personnel et non commercial. Il est interdit de :</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Télécharger des vidéos à des fins commerciales sans accord préalable des créateurs</li>
            <li>Redistribuer, revendre ou monétiser les vidéos téléchargées</li>
            <li>Utiliser le service de manière automatisée ou à des fins de scraping</li>
            <li>Télécharger du contenu protégé par des droits d&apos;auteur sans autorisation</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">4. Limitation de responsabilité</h2>
          <p>
            PasteTok fournit un outil technique sans garantie de disponibilité permanente.
            Nous ne saurions être tenus responsables des utilisations illicites faites par les utilisateurs.
            Le service peut être interrompu à tout moment sans préavis.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">5. Propriété intellectuelle</h2>
          <p>
            Les vidéos téléchargées restent la propriété exclusive de leurs créateurs.
            PasteTok ne revendique aucun droit sur les contenus transitant par son service.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">6. Données personnelles</h2>
          <p>
            Voir notre <Link href="/politique-de-confidentialite" className="text-brand-400 hover:text-brand-300 underline">
              Politique de confidentialité
            </Link>.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">7. Modification des CGU</h2>
          <p>
            Ces CGU peuvent être modifiées à tout moment. La date de dernière mise à jour figure en bas de page.
          </p>
        </section>

        <p className="text-xs text-gray-500 pt-4 border-t border-gray-800">
          Dernière mise à jour : avril 2026
        </p>
      </div>
    </div>
  );
}
