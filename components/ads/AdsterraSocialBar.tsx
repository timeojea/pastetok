'use client';

import { useEffect, useRef } from 'react';

interface AdsterraSocialBarProps {
  zone: string;
}

export default function AdsterraSocialBar({ zone }: AdsterraSocialBarProps) {
  const injected = useRef(false);

  useEffect(() => {
    if (!zone || injected.current) return;
    injected.current = true;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `//pl${zone}.highcpmgate.com/${zone}/invoke.js`;
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    document.body.appendChild(script);
  }, [zone]);

  return null;
}
