import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-gray-800 bg-gray-950 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-400">
          <div>
            <p className="text-white font-bold text-lg mb-2">
              Paste<span className="text-brand-500">Tok</span>
            </p>
            <p className="text-xs leading-relaxed">
              Téléchargez des vidéos TikTok gratuitement, sans filigrane.
              Outil tiers non affilié à TikTok.
            </p>
          </div>
          <div>
            <p className="text-white font-semibold mb-2">Liens</p>
            <ul className="space-y-1">
              <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>
              <li><Link href="/cgu" className="hover:text-white transition-colors">CGU</Link></li>
              <li><Link href="/politique-de-confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold mb-2">Légal</p>
            <p className="text-xs leading-relaxed">
              Nous ne stockons aucune vidéo sur nos serveurs.
              Respectez les droits d&apos;auteur et les{' '}
              <a
                href="https://www.tiktok.com/legal/terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                CGU de TikTok
              </a>.
            </p>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-gray-600">
          © {currentYear} PasteTok. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
