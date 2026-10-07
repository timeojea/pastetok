import { Inter } from 'next/font/google';
import '@/app/globals.css';
import Header from './Header';
import Footer from './Footer';
import type { Lang } from '@/lib/i18n';

const inter = Inter({ subsets: ['latin'] });

// Shared <html> shell for each language's root layout (app/(fr) and app/(en)).
export default function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang} className="dark">
      <body className={inter.className}>
        <Header lang={lang} />
        <main className="min-h-screen">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
