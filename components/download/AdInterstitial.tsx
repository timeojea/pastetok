'use client';

import { useState, useEffect, useCallback } from 'react';
import { Download, Loader2, Shield } from 'lucide-react';
import dynamic from 'next/dynamic';
import { ADSTERRA_CONFIG } from '@/lib/adsterra';

const AdsterraSocialBar = dynamic(() => import('@/components/ads/AdsterraSocialBar'), { ssr: false });

interface AdInterstitialProps {
  downloadUrl: string;
  filename: string;
  label: string;
  onClose?: () => void;
}

const COUNTDOWN_SECONDS = 5;

export default function AdInterstitial({ downloadUrl, filename, label, onClose }: AdInterstitialProps) {
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (countdown <= 0) {
      setUnlocked(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleDownload = useCallback(() => {
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(downloadUrl)}&filename=${encodeURIComponent(filename)}`;
    const a = document.createElement('a');
    a.href = proxyUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    onClose?.();
  }, [downloadUrl, filename, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4">
      {ADSTERRA_CONFIG.socialBar && (
        <AdsterraSocialBar zone={ADSTERRA_CONFIG.socialBar} />
      )}

      <div className="relative w-full max-w-sm rounded-2xl bg-gray-900 border border-gray-800 p-6 text-center shadow-2xl animate-slide-up">
        <div className="flex items-center justify-center mb-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/10 border border-brand-500/20">
            {unlocked ? (
              <Download className="h-6 w-6 text-brand-400" />
            ) : (
              <Loader2 className="h-6 w-6 text-brand-400 animate-spin" />
            )}
          </div>
        </div>

        <h3 className="text-white font-bold text-lg mb-1">
          {unlocked ? 'Prêt !' : 'Préparation du téléchargement'}
        </h3>
        <p className="text-gray-400 text-sm mb-6">
          {unlocked
            ? `Cliquez pour télécharger "${label}"`
            : `Votre lien sera disponible dans ${countdown} seconde${countdown > 1 ? 's' : ''}…`}
        </p>

        {/* Progress bar */}
        {!unlocked && (
          <div className="mb-5 h-1.5 w-full rounded-full bg-gray-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-brand-500 transition-all duration-1000"
              style={{ width: `${((COUNTDOWN_SECONDS - countdown) / COUNTDOWN_SECONDS) * 100}%` }}
            />
          </div>
        )}

        <button
          onClick={unlocked ? handleDownload : undefined}
          disabled={!unlocked}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Download className="h-4 w-4" />
          Télécharger
        </button>

        <div className="mt-3 flex items-center justify-center gap-1 text-xs text-gray-600">
          <Shield className="h-3 w-3" />
          Fichier sécurisé · Aucun virus
        </div>
      </div>
    </div>
  );
}
