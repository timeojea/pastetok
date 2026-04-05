'use client';

import { useEffect, useRef } from 'react';

interface AdsterraBannerProps {
  zone: string;
  width: number;
  height: number;
  className?: string;
}

export default function AdsterraBanner({ zone, width, height, className }: AdsterraBannerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  useEffect(() => {
    if (!zone || injected.current || !ref.current) return;
    injected.current = true;

    const atOptions = {
      key: zone,
      format: 'iframe',
      height,
      width,
      params: {},
    };

    const scriptOptions = document.createElement('script');
    scriptOptions.type = 'text/javascript';
    scriptOptions.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

    const scriptInvoke = document.createElement('script');
    scriptInvoke.type = 'text/javascript';
    scriptInvoke.src = `//www.highperformanceformat.com/${zone}/invoke.js`;
    scriptInvoke.async = true;

    ref.current.appendChild(scriptOptions);
    ref.current.appendChild(scriptInvoke);
  }, [zone, width, height]);

  if (!zone) return null;

  return (
    <div
      ref={ref}
      className={className}
      style={{ minWidth: width, minHeight: height, overflow: 'hidden' }}
      aria-label="Advertisement"
    />
  );
}
