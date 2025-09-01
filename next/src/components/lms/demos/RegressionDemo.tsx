'use client';

import { useMemo, useState } from 'react';

function fitLinear(x: number[], y: number[]) {
  const n = x.length;
  const sx = x.reduce((a, b) => a + b, 0);
  const sy = y.reduce((a, b) => a + b, 0);
  const sxx = x.reduce((a, b) => a + b * b, 0);
  const sxy = x.reduce((acc, xi, i) => acc + xi * y[i], 0);
  const denom = n * sxx - sx * sx;
  if (denom === 0) return { w: 0, b: 0 };
  const w = (n * sxy - sx * sy) / denom;
  const b = (sy - w * sx) / n;
  return { w, b };
}

function mse(x: number[], y: number[], w: number, b: number) {
  const n = x.length;
  let s = 0;
  for (let i = 0; i < n; i++) {
    const yhat = w * x[i] + b;
    const e = yhat - y[i];
    s += e * e;
  }
  return s / n;
}

export default function RegressionDemo() {
  const [noise, setNoise] = useState(1.0);
  const data = useMemo(() => {
    const xs: number[] = [];
    const ys: number[] = [];
    for (let i = 0; i < 30; i++) {
      const xi = -4 + (8 * i) / 29;
      const yi = 1.5 * xi + 0.7 + (Math.sin(i * 1.7) * 0.2 + (i % 2 ? -1 : 1)) * noise * 0.5;
      xs.push(xi);
      ys.push(yi);
    }
    return { xs, ys };
  }, [noise]);

  const { w, b } = useMemo(() => fitLinear(data.xs, data.ys), [data]);
  const loss = useMemo(() => mse(data.xs, data.ys, w, b), [data, w, b]);

  // scale to SVG
  const scaleX = (x: number) => 160 + x * 25;
  const scaleY = (y: number) => 100 - y * 25;

  return (
    <div className="my-4">
      <div className="flex items-center gap-3 mb-2">
        <label className="text-sm">bruit = {noise.toFixed(1)}</label>
        <input
          aria-label="noise"
          type="range"
          min={0}
          max={3}
          step={0.1}
          value={noise}
          onChange={(e) => setNoise(parseFloat(e.target.value))}
        />
        <span className="text-sm text-gray-500">MSE ≈ {loss.toFixed(2)}</span>
      </div>
      <svg width={360} height={220} viewBox="0 0 360 220" className="w-full max-w-md">
        <rect x={0} y={0} width={360} height={220} fill="#f8fafc" />
        {data.xs.map((x, i) => (
          <circle key={i} cx={scaleX(x)} cy={scaleY(data.ys[i])} r={3} fill="#60a5fa" />
        ))}
        {/* line */}
        <line x1={scaleX(-4)} y1={scaleY(w * -4 + b)} x2={scaleX(4)} y2={scaleY(w * 4 + b)} stroke="#ef4444" strokeWidth={2} />
        <text x={10} y={20} fontSize={12} fill="#111827">y = {w.toFixed(2)}x + {b.toFixed(2)}</text>
      </svg>
    </div>
  );
}
