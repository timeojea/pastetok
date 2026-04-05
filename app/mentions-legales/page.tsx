import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions légales',
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Mentions légales</h1>
      <div className="prose prose-invert prose-sm max-w-none space-y-6 text-gray-300">
        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Éditeur du site</h2>
          <p>
            Le site PasteTok est édité à titre personnel. Pour tout contact,
            veuillez utiliser le formulaire disponible sur la page{' '}
            <a href="/contact" className="text-brand-400 hover:text-brand-300 underline">Contact</a>.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Hébergement</h2>
          <p>
            Ce site est hébergé sur des serveurs conformes à la réglementation européenne en matière
            de protection des données. L&apos;hébergeur peut être contacté via la page Contact.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Propriété intellectuelle</h2>
          <p>
            PasteTok est un outil technique de téléchargement. Nous ne stockons,
            reproduisons ni distribuons aucune vidéo. Les contenus téléchargés restent
            la propriété de leurs auteurs respectifs. Toute utilisation commerciale des
            vidéos téléchargées sans l&apos;accord de leurs créateurs est strictement interdite.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Responsabilité</h2>
          <p>
            L&apos;éditeur du site décline toute responsabilité quant à l&apos;utilisation faite
            des vidéos téléchargées via cet outil. L&apos;utilisateur est seul responsable du
            respect des droits d&apos;auteur et des conditions générales de TikTok.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-3">Cookies et publicités</h2>
          <p>
            Ce site utilise des services publicitaires tiers (Adsterra) susceptibles de
            déposer des cookies sur votre terminal. Vous pouvez configurer votre navigateur
            pour refuser ces cookies.
          </p>
        </section>
      </div>
    </div>
  );
}
