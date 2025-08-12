'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      // Valeur douce et stable pour la landing
      lerp: 0.1,
    });

    let raf = 0;
    const rafLoop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(rafLoop);
    };
    raf = requestAnimationFrame(rafLoop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
