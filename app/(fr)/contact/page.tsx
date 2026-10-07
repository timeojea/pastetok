import ContactView from '@/components/views/ContactView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('fr', 'contact');

export default function Page() {
  return <ContactView lang="fr" />;
}
