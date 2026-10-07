import PrivacyView from '@/components/legal/PrivacyView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('en', 'privacy');

export default function Page() {
  return <PrivacyView lang="en" />;
}
