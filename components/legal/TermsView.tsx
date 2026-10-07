import Link from 'next/link';
import { DICT, ROUTES, type Lang } from '@/lib/i18n';
import LegalPage, { linkClass, type LegalSection } from './LegalPage';

function sections(lang: Lang): LegalSection[] {
  const privacy = (
    <Link href={ROUTES[lang].privacy} className={linkClass}>{DICT[lang].meta.titles.privacy}</Link>
  );
  const list = (items: string[]) => (
    <ul className="list-disc list-inside mt-2 space-y-1">
      {items.map((i) => <li key={i}>{i}</li>)}
    </ul>
  );

  if (lang === 'en') {
    return [
      { title: '1. Purpose', body: <p>These Terms of Use define how the PasteTok service may be used. PasteTok is a tool for downloading public TikTok videos for personal purposes.</p> },
      { title: '2. Acceptance', body: <p>Using the service implies full acceptance of these Terms. If you do not accept them, please do not use the service.</p> },
      {
        title: '3. Permitted use',
        body: (
          <>
            <p>The service is strictly for personal, non-commercial use. It is forbidden to:</p>
            {list([
              'Download videos for commercial purposes without the creators’ prior consent',
              'Redistribute, resell or monetize downloaded videos',
              'Use the service in an automated way or for scraping',
              'Download copyrighted content without permission',
            ])}
          </>
        ),
      },
      { title: '4. Limitation of liability', body: <p>PasteTok provides a technical tool with no guarantee of permanent availability. We cannot be held liable for unlawful use by users. The service may be interrupted at any time without notice.</p> },
      { title: '5. Intellectual property', body: <p>Downloaded videos remain the exclusive property of their creators. PasteTok claims no rights over content passing through the service.</p> },
      { title: '6. Personal data', body: <p>See our {privacy}.</p> },
      { title: '7. Changes', body: <p>These Terms may be changed at any time. The date of the last update is shown at the bottom of the page.</p> },
    ];
  }
  return [
    { title: '1. Objet', body: <p>Les présentes CGU définissent les modalités d&apos;utilisation du service PasteTok, outil permettant le téléchargement de vidéos TikTok publiques à des fins personnelles.</p> },
    { title: '2. Acceptation', body: <p>L&apos;utilisation du service implique l&apos;acceptation pleine et entière des présentes CGU. Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser ce service.</p> },
    {
      title: '3. Usage autorisé',
      body: (
        <>
          <p>Le service est réservé à un usage strictement personnel et non commercial. Il est interdit de :</p>
          {list([
            'Télécharger des vidéos à des fins commerciales sans accord préalable des créateurs',
            'Redistribuer, revendre ou monétiser les vidéos téléchargées',
            'Utiliser le service de manière automatisée ou à des fins de scraping',
            'Télécharger du contenu protégé par des droits d’auteur sans autorisation',
          ])}
        </>
      ),
    },
    { title: '4. Limitation de responsabilité', body: <p>PasteTok fournit un outil technique sans garantie de disponibilité permanente. Nous ne saurions être tenus responsables des utilisations illicites faites par les utilisateurs. Le service peut être interrompu à tout moment sans préavis.</p> },
    { title: '5. Propriété intellectuelle', body: <p>Les vidéos téléchargées restent la propriété exclusive de leurs créateurs. PasteTok ne revendique aucun droit sur les contenus transitant par son service.</p> },
    { title: '6. Données personnelles', body: <p>Voir notre {privacy}.</p> },
    { title: '7. Modification des CGU', body: <p>Ces CGU peuvent être modifiées à tout moment. La date de dernière mise à jour figure en bas de page.</p> },
  ];
}

export default function TermsView({ lang }: { lang: Lang }) {
  return (
    <LegalPage
      title={DICT[lang].meta.titles.terms}
      sections={sections(lang)}
      updated={lang === 'en' ? 'Last updated: October 2026' : 'Dernière mise à jour : octobre 2026'}
    />
  );
}
