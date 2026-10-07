'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { TikTokVideo } from '@/lib/tiktok';
import VideoPreview from '@/components/download/VideoPreview';
import DownloadOptions from '@/components/download/DownloadOptions';
import { DICT, ROUTES, type Lang } from '@/lib/i18n';

export default function DownloadView({ lang }: { lang: Lang }) {
  const t = DICT[lang].download;
  const home = ROUTES[lang].home;
  const [video, setVideo] = useState<TikTokVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('tiktok_video');
      if (!stored) {
        router.replace(home);
        return;
      }
      const parsed = JSON.parse(stored) as TikTokVideo;
      setVideo(parsed);
    } catch {
      router.replace(home);
    } finally {
      setLoading(false);
    }
  }, [router, home]);

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
        <p className="text-gray-400">{t.notFound}</p>
        <Link href={home} className="text-brand-400 hover:text-brand-300 text-sm underline">
          {t.backHome}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Link
        href={home}
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {t.back}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          <VideoPreview video={video} lang={lang} />
          <DownloadOptions video={video} lang={lang} />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Tips card */}
          <div className="rounded-xl bg-gray-900 border border-gray-800 p-4">
            <h3 className="text-white font-semibold text-sm mb-2">{t.tipsTitle}</h3>
            <ul className="text-xs text-gray-400 space-y-1.5 list-disc list-inside">
              {t.tips.map((tip) => <li key={tip}>{tip}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
