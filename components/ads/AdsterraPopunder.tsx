'use client';

import { useEffect, useRef } from 'react';

interface AdsterraPopunderProps {
  zone: string;
}

// Injecte le script popunder une seule fois au montage global
let popunderInjected = false;

export default function AdsterraPopunder({ zone }: AdsterraPopunderProps) {
  const injected = useRef(false);

  useEffect(() => {
    if (!zone || popunderInjected || injected.current) return;
    injected.current = true;
    popunderInjected = true;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      var _pop = _pop || [];
      _pop.push(['siteId', '${zone}']);
      _pop.push(['minBid', 0]);
      _pop.push(['popundersPerIP', '0']);
      _pop.push(['delayBetween', 0]);
      _pop.push(['default', false]);
      _pop.push(['defaultPerDay', 0]);
      _pop.push(['topmostLayer', true]);
    `;
    document.head.appendChild(script);

    const scriptSrc = document.createElement('script');
    scriptSrc.type = 'text/javascript';
    scriptSrc.async = true;
    scriptSrc.setAttribute('data-cfasync', 'false');
    scriptSrc.src = `//financepowerpouch.com/pfe/current/tag.min.js?z=${zone}`;
    document.head.appendChild(scriptSrc);
  }, [zone]);

  return null; // no visible DOM element
}
