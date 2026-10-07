import LegalNoticeView from '@/components/legal/LegalNoticeView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('fr', 'legal');

export default function Page() {
  return <LegalNoticeView lang="fr" />;
}
