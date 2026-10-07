import TermsView from '@/components/legal/TermsView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('fr', 'terms');

export default function Page() {
  return <TermsView lang="fr" />;
}
