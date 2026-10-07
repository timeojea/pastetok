import RootShell from '@/components/layout/RootShell';
import { siteMetadata } from '@/lib/seo';

export const metadata = siteMetadata('en');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
