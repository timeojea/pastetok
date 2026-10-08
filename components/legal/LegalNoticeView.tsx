import Link from 'next/link';
import { DICT, ROUTES, type Lang } from '@/lib/i18n';
import LegalPage, { linkClass, type LegalSection } from './LegalPage';

const REPO = (
  <a href="https://github.com/trk78/pastetok" target="_blank" rel="noopener noreferrer" className={linkClass}>
    github.com/trk78/pastetok
  </a>
);

const GITHUB_ADDRESS = 'GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107';

function sections(lang: Lang): LegalSection[] {
  const contact = (
    <Link href={ROUTES[lang].contact} className={linkClass}>Contact</Link>
  );
  if (lang === 'en') {
    return [
      { title: 'Publisher', body: <p>PasteTok is published by a private individual. For any inquiry, see the {contact} page.</p> },
      { title: 'Hosting', body: <p>This site is hosted by GitHub Pages — {GITHUB_ADDRESS}, USA. Source code (MIT license): {REPO}.</p> },
      { title: 'Intellectual property', body: <p>PasteTok is a technical download tool. We do not store, reproduce or distribute any video. Downloaded content remains the property of its respective authors. Any commercial use of downloaded videos without their creators&apos; consent is strictly prohibited.</p> },
      { title: 'Liability', body: <p>The publisher accepts no liability for how videos downloaded with this tool are used. Users are solely responsible for respecting copyright and TikTok&apos;s terms of service.</p> },
      { title: 'Cookies and advertising', body: <p>This site sets no cookies and shows no ads.</p> },
    ];
  }
  return [
    { title: 'Éditeur du site', body: <p>Le site PasteTok est édité à titre personnel. Pour tout contact, voir la page {contact}.</p> },
    { title: 'Hébergement', body: <p>Ce site est hébergé par GitHub Pages — {GITHUB_ADDRESS}, États-Unis. Code source (licence MIT) : {REPO}.</p> },
    { title: 'Propriété intellectuelle', body: <p>PasteTok est un outil technique de téléchargement. Nous ne stockons, reproduisons ni distribuons aucune vidéo. Les contenus téléchargés restent la propriété de leurs auteurs respectifs. Toute utilisation commerciale des vidéos téléchargées sans l&apos;accord de leurs créateurs est strictement interdite.</p> },
    { title: 'Responsabilité', body: <p>L&apos;éditeur du site décline toute responsabilité quant à l&apos;utilisation faite des vidéos téléchargées via cet outil. L&apos;utilisateur est seul responsable du respect des droits d&apos;auteur et des conditions générales de TikTok.</p> },
    { title: 'Cookies et publicités', body: <p>Ce site ne dépose aucun cookie et n&apos;affiche aucune publicité.</p> },
  ];
}

export default function LegalNoticeView({ lang }: { lang: Lang }) {
  return <LegalPage title={DICT[lang].meta.titles.legal} sections={sections(lang)} />;
}
