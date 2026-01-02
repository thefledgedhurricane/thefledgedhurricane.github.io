'use client';

import { useEffect, useRef } from 'react';

/**
 * Animated Gradient Mesh Background - 2025 Trend
 * Dynamic, flowing gradient mesh for modern premium feel
 */
export default function AnimatedMeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Mesh gradient points
    const createGradientMesh = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Create multiple radial gradients that move
      const gradient1 = ctx.createRadialGradient(
        centerX + Math.sin(time * 0.001) * 200,
        centerY + Math.cos(time * 0.001) * 200,
        0,
        centerX + Math.sin(time * 0.001) * 200,
        centerY + Math.cos(time * 0.001) * 200,
        canvas.width * 0.6
      );
      gradient1.addColorStop(0, 'rgba(0, 160, 176, 0.15)'); // Teal
      gradient1.addColorStop(1, 'transparent');

      const gradient2 = ctx.createRadialGradient(
        centerX - Math.cos(time * 0.0015) * 300,
        centerY - Math.sin(time * 0.0015) * 150,
        0,
        centerX - Math.cos(time * 0.0015) * 300,
        centerY - Math.sin(time * 0.0015) * 150,
        canvas.width * 0.5
      );
      gradient2.addColorStop(0, 'rgba(0, 60, 108, 0.12)'); // Navy
      gradient2.addColorStop(1, 'transparent');

      const gradient3 = ctx.createRadialGradient(
        centerX + Math.sin(time * 0.0012 + Math.PI) * 250,
        centerY + Math.cos(time * 0.0012 + Math.PI) * 180,
        0,
        centerX + Math.sin(time * 0.0012 + Math.PI) * 250,
        centerY + Math.cos(time * 0.0012 + Math.PI) * 180,
        canvas.width * 0.4
      );
      gradient3.addColorStop(0, 'rgba(201, 167, 92, 0.08)'); // Gold
      gradient3.addColorStop(1, 'transparent');

      return [gradient1, gradient2, gradient3];
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradients = createGradientMesh();
      
      // Draw each gradient layer
      gradients.forEach(gradient => {
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      time += 1;
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
        opacity: 0.6,
        mixBlendMode: 'overlay'
      }}
    />
  );
}
