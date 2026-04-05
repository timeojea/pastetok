'use client';

import { useEffect, useRef } from 'react';

interface AdsterraNativeProps {
  zone: string;
  className?: string;
}

export default function AdsterraNative({ zone, className }: AdsterraNativeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  useEffect(() => {
    if (!zone || injected.current || !ref.current) return;
    injected.current = true;

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = `//pl${zone}.highcpmgate.com/${zone}/invoke.js`;

    ref.current.appendChild(script);
  }, [zone]);

  if (!zone) return null;

  return (
    <div
      ref={ref}
      className={className}
      aria-label="Advertisement"
    />
  );
}
