import LegalNoticeView from '@/components/legal/LegalNoticeView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('en', 'legal');

export default function Page() {
  return <LegalNoticeView lang="en" />;
}
