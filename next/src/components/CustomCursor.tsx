'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop fine pointer and if user doesn't prefer reduced motion
    const isFine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(isFine && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let ringX = 0, ringY = 0;
    let raf = 0;

    const move = (e: MouseEvent) => {
      const x = e.clientX, y = e.clientY;
      // instant dot
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      // lerped ring
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      const update = () => {
        ringX = lerp(ringX, x, 0.18);
        ringY = lerp(ringY, y, 0.18);
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        raf = requestAnimationFrame(update);
      };
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    const enterInteractive = () => {
      ring.classList.add('scale-150', 'opacity-100');
      ring.classList.remove('opacity-70');
    };
    const leaveInteractive = () => {
      ring.classList.remove('scale-150');
      ring.classList.add('opacity-70');
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (target.closest('a, button, [role="button"], input, textarea, select, [data-cursor="interactive"]')) {
        enterInteractive();
      } else {
        leaveInteractive();
      }
    };

    const handleDown = () => ring.classList.add('scale-125');
    const handleUp = () => ring.classList.remove('scale-125');

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', handleOver, { passive: true });
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move as any);
      window.removeEventListener('mouseover', handleOver as any);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* small dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000] -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-gray-900 dark:bg-gray-100 mix-blend-difference"
      />
      {/* ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 h-9 w-9 rounded-full border border-gray-900/70 dark:border-gray-100/70 mix-blend-difference opacity-70 transition-transform duration-150 ease-out"
      />
    </>
  );
}
