'use client';

import { useEffect, useState } from 'react';
import { Brain, Cpu, Eye, Zap } from 'lucide-react';

/**
 * Animated Tech Icons - 2025 Trend
 * Floating tech icons with smooth animations
 */
export default function AnimatedTechIcons() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const icons = [
    { Icon: Brain, delay: 0, position: 'top-20 left-20' },
    { Icon: Cpu, delay: 0.5, position: 'top-40 right-32' },
    { Icon: Eye, delay: 1, position: 'bottom-32 left-40' },
    { Icon: Zap, delay: 1.5, position: 'bottom-20 right-20' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
      {icons.map(({ Icon, delay, position }, index) => (
        <div
          key={index}
          className={`absolute ${position}`}
          style={{
            animation: `float 6s ease-in-out ${delay}s infinite`,
          }}
        >
          <Icon className="w-16 h-16 text-mckinsey-navy-600" strokeWidth={1} />
        </div>
      ))}

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
      `}</style>
    </div>
  );
}
