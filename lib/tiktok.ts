export interface TikTokVideo {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  thumbnail: string;
  duration: number;
  plays: number;
  likes: number;
  noWatermarkUrl: string;
  watermarkUrl: string;
  audioUrl: string;
}

export interface TikTokApiResponse {
  success: boolean;
  video?: TikTokVideo;
  error?: string;
}

// Using tikwm.com public API — no key required
const TIKWM_API = 'https://www.tikwm.com/api/';

export async function fetchTikTokVideo(url: string): Promise<TikTokApiResponse> {
  try {
    const response = await fetch(TIKWM_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (compatible; PasteTok/1.0)',
      },
      body: new URLSearchParams({ url, hd: '1' }).toString(),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      return { success: false, error: 'Service temporairement indisponible.' };
    }

    const data = await response.json();

    if (data.code !== 0 || !data.data) {
      const msg = data.msg?.toLowerCase() || '';
      if (msg.includes('private') || msg.includes('privé')) {
        return { success: false, error: 'Cette vidéo est privée.' };
      }
      if (msg.includes('not found') || msg.includes('deleted')) {
        return { success: false, error: 'Vidéo introuvable ou supprimée.' };
      }
      return { success: false, error: 'Impossible de récupérer la vidéo. Vérifiez le lien.' };
    }

    const d = data.data;

    return {
      success: true,
      video: {
        id: d.id || '',
        title: d.title || '',
        author: d.author?.nickname || d.author?.unique_id || 'Inconnu',
        authorAvatar: d.author?.avatar || '',
        thumbnail: d.cover || d.origin_cover || '',
        duration: d.duration || 0,
        plays: d.play_count || 0,
        likes: d.digg_count || 0,
        noWatermarkUrl: d.play || d.wmplay || '',
        watermarkUrl: d.wmplay || d.play || '',
        audioUrl: d.music || '',
      },
    };
  } catch (err) {
    if (err instanceof Error && err.name === 'TimeoutError') {
      return { success: false, error: 'La requête a expiré. Réessayez.' };
    }
    return { success: false, error: 'Erreur réseau. Réessayez dans quelques instants.' };
  }
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}
