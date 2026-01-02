'use client';

import { useEffect, useRef } from 'react';

/**
 * Floating Orbs Background - 2025 Premium Trend
 * Smooth floating spheres with glassmorphism effect
 */
export default function FloatingOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const setCanvasSize = () => {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Orb class
    class Orb {
      x: number;
      y: number;
      radius: number;
      dx: number;
      dy: number;
      color: string;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.radius = Math.random() * 150 + 50;
        this.dx = (Math.random() - 0.5) * 0.3;
        this.dy = (Math.random() - 0.5) * 0.3;
        
        // Premium colors: Navy, Teal, Gold
        const colors = [
          'rgba(0, 60, 108, 0.15)',   // Navy
          'rgba(0, 160, 176, 0.15)',  // Teal
          'rgba(201, 167, 92, 0.10)', // Gold
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.x += this.dx;
        this.y += this.dy;

        // Bounce off edges
        if (this.x + this.radius > canvas!.width || this.x - this.radius < 0) {
          this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas!.height || this.y - this.radius < 0) {
          this.dy = -this.dy;
        }
      }

      draw() {
        if (!ctx) return;

        // Create radial gradient for glassmorphism effect
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius
        );

        gradient.addColorStop(0, this.color.replace(/[\d.]+\)$/g, `${this.opacity})`));
        gradient.addColorStop(0.5, this.color.replace(/[\d.]+\)$/g, `${this.opacity * 0.5})`));
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Add blur effect
        ctx.filter = 'blur(40px)';
        ctx.fill();
        ctx.filter = 'none';
      }
    }

    // Create orbs
    const orbs: Orb[] = [];
    const orbCount = Math.min(5, Math.floor(canvas!.width / 400));

    for (let i = 0; i < orbCount; i++) {
      orbs.push(new Orb());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);

      orbs.forEach(orb => {
        orb.update();
        orb.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        opacity: 0.8,
        mixBlendMode: 'normal'
      }}
    />
  );
}
