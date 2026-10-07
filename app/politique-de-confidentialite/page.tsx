import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  robots: { index: false },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Politique de confidentialité</h1>
      <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
        <section>
          <h2 className="text-white text-xl font-semibold mb-3">1. Données collectées</h2>
          <p>
            <strong>Aucune.</strong> PasteTok est un site statique sans serveur ni base de données :
            nous ne collectons, ne stockons et ne journalisons aucune donnée (ni adresse IP, ni URL,
            ni statistiques, ni compte TikTok).
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">2. Services tiers</h2>
          <p>Votre navigateur communique directement avec :</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong>tikwm.com</strong>, qui reçoit l&apos;URL TikTok collée pour en extraire les liens de
              téléchargement ;
            </li>
            <li>
              <strong>les serveurs TikTok</strong> (CDN), d&apos;où le fichier est téléchargé ;
            </li>
            <li>
              <strong>GitHub Pages</strong>, qui héberge le site et peut journaliser les adresses IP des
              visiteurs pour des raisons de sécurité (voir la{' '}
              <a
                href="https://docs.github.com/fr/site-policy/privacy-policies/github-general-privacy-statement"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-400 hover:text-brand-300 underline"
              >
                déclaration de confidentialité de GitHub
              </a>
              ).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">3. Stockage local</h2>
          <p>
            Les informations de la vidéo en cours sont gardées dans le <em>sessionStorage</em> de votre
            navigateur le temps d&apos;afficher la page de téléchargement. Elles sont effacées à la
            fermeture de l&apos;onglet et ne nous sont jamais transmises.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">4. Cookies et publicités</h2>
          <p>Ce site ne dépose aucun cookie et n&apos;affiche aucune publicité.</p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">5. Contact</h2>
          <p>
            Pour toute question, voir la page{' '}
            <Link href="/contact" className="text-brand-400 hover:text-brand-300 underline">Contact</Link>.
          </p>
        </section>

        <p className="text-xs text-gray-500 pt-4 border-t border-gray-800">
          Dernière mise à jour : octobre 2026
        </p>
      </div>
    </div>
  );
}
