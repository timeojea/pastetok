'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { TikTokVideo } from '@/lib/tiktok';
import VideoPreview from '@/components/download/VideoPreview';
import DownloadOptions from '@/components/download/DownloadOptions';

export default function DownloadPage() {
  const [video, setVideo] = useState<TikTokVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('tiktok_video');
      if (!stored) {
        router.replace('/');
        return;
      }
      const parsed = JSON.parse(stored) as TikTokVideo;
      setVideo(parsed);
    } catch {
      router.replace('/');
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <AlertCircle className="h-10 w-10 text-red-400" />
        <p className="text-gray-400">Aucune vidéo trouvée.</p>
        <Link href="/" className="text-brand-400 hover:text-brand-300 text-sm underline">
          Retour à l&apos;accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Télécharger une autre vidéo
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          <VideoPreview video={video} />
          <DownloadOptions video={video} />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Tips card */}
          <div className="rounded-xl bg-gray-900 border border-gray-800 p-4">
            <h3 className="text-white font-semibold text-sm mb-2">Conseils</h3>
            <ul className="text-xs text-gray-400 space-y-1.5 list-disc list-inside">
              <li>Choisissez "Sans filigrane" pour une meilleure qualité</li>
              <li>Sur mobile, appuyez longuement pour sauvegarder</li>
              <li>Le MP3 extrait uniquement la bande sonore</li>
              <li>Respectez les droits des créateurs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
