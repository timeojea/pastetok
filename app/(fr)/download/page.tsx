import DownloadView from '@/components/views/DownloadView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('fr', 'download');

export default function Page() {
  return <DownloadView lang="fr" />;
}
