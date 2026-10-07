import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-gray-800 bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black tracking-tight text-white group-hover:text-brand-400 transition-colors">
            Paste<span className="text-brand-500">Tok</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
