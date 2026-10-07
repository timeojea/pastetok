import HomeView from '@/components/views/HomeView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('en', 'home');

export default function Page() {
  return <HomeView lang="en" />;
}
