import type { Metadata } from 'next';

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
          <p>Nous collectons et traitons les données suivantes :</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Adresse IP <strong>anonymisée</strong> (hashée via HMAC-SHA256) pour le rate limiting</li>
            <li>URL des vidéos téléchargées (sans données personnelles)</li>
            <li>Horodatage et type de téléchargement (statistiques anonymes)</li>
          </ul>
          <p className="mt-2">
            Nous ne collectons <strong>ni nom, ni email, ni données de compte TikTok</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">2. Finalités du traitement</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Prévention des abus (rate limiting)</li>
            <li>Statistiques d&apos;utilisation anonymes</li>
            <li>Amélioration du service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">3. Base légale</h2>
          <p>
            Le traitement est fondé sur notre intérêt légitime à sécuriser et améliorer notre service
            (article 6.1.f du RGPD).
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">4. Durée de conservation</h2>
          <p>
            Les données de logs sont conservées pour une durée maximale de <strong>90 jours</strong>,
            puis supprimées automatiquement.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">5. Publicités (Adsterra)</h2>
          <p>
            Ce site utilise le réseau publicitaire Adsterra. Ces publicités peuvent utiliser des cookies
            tiers pour personnaliser les annonces. Pour en savoir plus :{' '}
            <a
              href="https://www.adsterra.com/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 hover:text-brand-300 underline"
            >
              Politique de confidentialité Adsterra
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">6. Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et d&apos;effacement
            de vos données. Pour exercer ces droits, contactez-nous via la page{' '}
            <a href="/contact" className="text-brand-400 hover:text-brand-300 underline">Contact</a>.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">7. Cookies</h2>
          <p>
            Ce site utilise uniquement des cookies fonctionnels nécessaires à son bon fonctionnement.
            Les cookies publicitaires sont gérés par Adsterra. Vous pouvez les désactiver via les
            paramètres de votre navigateur.
          </p>
        </section>

        <p className="text-xs text-gray-500 pt-4 border-t border-gray-800">
          Dernière mise à jour : avril 2026
        </p>
      </div>
    </div>
  );
}
