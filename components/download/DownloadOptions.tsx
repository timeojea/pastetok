'use client';

import { useState } from 'react';
import { Download, Loader2, Music, Video, Sparkles } from 'lucide-react';
import { TikTokVideo, downloadFile } from '@/lib/tiktok';
import { DICT, type Lang } from '@/lib/i18n';

interface DownloadOptionsProps {
  video: TikTokVideo;
  lang: Lang;
}

type DownloadType = 'no_watermark' | 'watermark' | 'audio';

interface Option {
  type: DownloadType;
  text: 'noWatermark' | 'watermark' | 'audio';
  icon: React.ElementType;
  url: (v: TikTokVideo) => string;
  filename: (v: TikTokVideo) => string;
  highlight?: boolean;
}

const options: Option[] = [
  {
    type: 'no_watermark',
    text: 'noWatermark',
    icon: Sparkles,
    url: (v) => v.noWatermarkUrl,
    filename: (v) => `tiktok_${v.id}_nowm.mp4`,
    highlight: true,
  },
  {
    type: 'watermark',
    text: 'watermark',
    icon: Video,
    url: (v) => v.watermarkUrl,
    filename: (v) => `tiktok_${v.id}.mp4`,
  },
  {
    type: 'audio',
    text: 'audio',
    icon: Music,
    url: (v) => v.audioUrl,
    filename: (v) => `tiktok_${v.id}.mp3`,
  },
];

export default function DownloadOptions({ video, lang }: DownloadOptionsProps) {
  const t = DICT[lang].options;
  const [pending, setPending] = useState<DownloadType | null>(null);
  const [opened, setOpened] = useState(false);

  async function handleDownloadClick(opt: Option) {
    const url = opt.url(video);
    if (!url || pending) return;
    setPending(opt.type);
    try {
      setOpened((await downloadFile(url, opt.filename(video))) === 'opened');
    } finally {
      setPending(null);
    }
  }

  return (
    <div className="space-y-3">
      <h3 className="text-white font-semibold text-sm mb-4">{t.heading}</h3>
      {options.map((opt) => {
        const url = opt.url(video);
        const disabled = !url || pending !== null;
        const isPending = pending === opt.type;
        return (
          <button
            key={opt.type}
            onClick={() => handleDownloadClick(opt)}
            disabled={disabled}
            className={`w-full flex items-center gap-4 rounded-xl px-4 py-3 text-left transition-all disabled:opacity-40 disabled:cursor-not-allowed border ${
              opt.highlight
                ? 'bg-brand-500/10 border-brand-500/30 hover:bg-brand-500/20 hover:border-brand-500/50'
                : 'bg-gray-900 border-gray-800 hover:bg-gray-800 hover:border-gray-700'
            }`}
          >
            <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${
              opt.highlight ? 'bg-brand-500/20' : 'bg-gray-800'
            }`}>
              <opt.icon className={`h-5 w-5 ${opt.highlight ? 'text-brand-400' : 'text-gray-400'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`font-semibold text-sm ${opt.highlight ? 'text-brand-300' : 'text-white'}`}>
                  {t[opt.text].label}
                </span>
                {opt.highlight && (
                  <span className="rounded-full bg-brand-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {t.recommended}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400">{t[opt.text].description}</p>
            </div>
            {isPending ? (
              <Loader2 className="h-4 w-4 flex-shrink-0 animate-spin text-brand-400" />
            ) : (
              <Download className={`h-4 w-4 flex-shrink-0 ${opt.highlight ? 'text-brand-400' : 'text-gray-500'}`} />
            )}
          </button>
        );
      })}

      {opened && (
        <p className="text-xs text-gray-400">
          {t.opened}
        </p>
      )}
    </div>
  );
}
