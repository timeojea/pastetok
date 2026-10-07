import ContactView from '@/components/views/ContactView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('en', 'contact');

export default function Page() {
  return <ContactView lang="en" />;
}
