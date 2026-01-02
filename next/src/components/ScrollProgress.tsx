'use client';

import { useEffect, useState } from 'react';

/**
 * Modern Scroll Progress Indicator - 2025 Trend
 * Provides visual feedback of scroll position with gradient animation
 */
export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      const totalScroll = documentHeight - windowHeight;
      const progress = (scrollTop / totalScroll) * 100;
      
      setScrollProgress(progress);
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Fixed top progress bar with gradient */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 z-[9999] pointer-events-none"
        style={{
          background: `linear-gradient(90deg, 
            #003C6C 0%, 
            #00A0B0 ${scrollProgress}%, 
            transparent ${scrollProgress}%, 
            transparent 100%)`
        }}
      />
      
      {/* Animated dot at the end of progress */}
      <div
        className="fixed top-0 z-[9999] pointer-events-none"
        style={{
          left: `${scrollProgress}%`,
          transform: 'translateX(-50%)',
        }}
      >
        <div className="w-3 h-3 bg-mckinsey-teal-500 rounded-full animate-pulse shadow-lg shadow-mckinsey-teal-500/50" />
      </div>
    </>
  );
}
