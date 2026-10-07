import PrivacyView from '@/components/legal/PrivacyView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('fr', 'privacy');

export default function Page() {
  return <PrivacyView lang="fr" />;
}
