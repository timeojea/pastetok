import Image from 'next/image';
import { Play, Heart, Clock, User } from 'lucide-react';
import { TikTokVideo, formatDuration, formatCount } from '@/lib/tiktok';

interface VideoPreviewProps {
  video: TikTokVideo;
}

export default function VideoPreview({ video }: VideoPreviewProps) {
  return (
    <div className="rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden">
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        {/* Thumbnail */}
        <div className="relative flex-shrink-0 w-full sm:w-32 aspect-[9/16] sm:aspect-auto sm:h-48 rounded-xl overflow-hidden bg-gray-800">
          {video.thumbnail ? (
            <Image
              src={video.thumbnail}
              alt={video.title || 'TikTok thumbnail'}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="h-8 w-8 text-gray-600" />
            </div>
          )}
          {video.duration > 0 && (
            <div className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white font-mono">
              {formatDuration(video.duration)}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h2 className="text-white font-semibold text-sm leading-relaxed line-clamp-3 mb-3">
            {video.title || 'Vidéo TikTok'}
          </h2>
          <div className="flex flex-wrap gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              @{video.author}
            </span>
            {video.duration > 0 && (
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {formatDuration(video.duration)}
              </span>
            )}
            {video.likes > 0 && (
              <span className="flex items-center gap-1">
                <Heart className="h-3.5 w-3.5" />
                {formatCount(video.likes)}
              </span>
            )}
            {video.plays > 0 && (
              <span className="flex items-center gap-1">
                <Play className="h-3.5 w-3.5" />
                {formatCount(video.plays)} vues
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
