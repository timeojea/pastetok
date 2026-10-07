import TermsView from '@/components/legal/TermsView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('en', 'terms');

export default function Page() {
  return <TermsView lang="en" />;
}
