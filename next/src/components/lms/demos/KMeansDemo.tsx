'use client';

import { useMemo, useState } from 'react';

type Point = { x: number; y: number };

function euclid(a: Point, b: Point) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

function kmeans(points: Point[], k: number, iters = 6) {
  // init centroids by picking first k points (deterministic for demo)
  let centroids = points.slice(0, k).map((p) => ({ ...p }));
  let assigns = new Array(points.length).fill(0);

  for (let t = 0; t < iters; t++) {
    // assign
    for (let i = 0; i < points.length; i++) {
      let best = 0;
      let bestD = Infinity;
      for (let c = 0; c < k; c++) {
        const d = euclid(points[i], centroids[c]);
        if (d < bestD) {
          bestD = d;
          best = c;
        }
      }
      assigns[i] = best;
    }
    // update
    const sums = Array.from({ length: k }, () => ({ x: 0, y: 0, n: 0 }));
    for (let i = 0; i < points.length; i++) {
      const a = assigns[i];
      sums[a].x += points[i].x;
      sums[a].y += points[i].y;
      sums[a].n += 1;
    }
    for (let c = 0; c < k; c++) {
      if (sums[c].n > 0) {
        centroids[c] = { x: sums[c].x / sums[c].n, y: sums[c].y / sums[c].n };
      }
    }
  }
  return { centroids, assigns };
}

export default function KMeansDemo() {
  const [k, setK] = useState(3);
  const points = useMemo<Point[]>(() => {
    // simple deterministic blobs
    const pts: Point[] = [];
    const seeds = [
      { cx: 40, cy: 40 },
      { cx: 140, cy: 140 },
      { cx: 240, cy: 60 },
      { cx: 280, cy: 150 },
      { cx: 80, cy: 120 },
    ];
    for (let s = 0; s < seeds.length; s++) {
      for (let i = 0; i < 18; i++) {
        const a = (i * 137.5) % 360;
        const r = (i % 9) * 2 + 6;
        const x = seeds[s].cx + Math.cos((a * Math.PI) / 180) * r;
        const y = seeds[s].cy + Math.sin((a * Math.PI) / 180) * r;
        pts.push({ x, y });
      }
    }
    return pts;
  }, []);

  const { centroids, assigns } = useMemo(() => kmeans(points, k), [points, k]);

  const colors = ['#ef4444', '#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'];

  return (
    <div className="my-4">
      <div className="flex items-center gap-3 mb-2">
        <label className="text-sm">k = {k}</label>
        <input
          aria-label="k"
          type="range"
          min={2}
          max={5}
          value={k}
          onChange={(e) => setK(parseInt(e.target.value, 10))}
        />
      </div>
      <svg width={340} height={200} viewBox="0 0 320 180" className="w-full max-w-sm">
        <rect x={0} y={0} width={320} height={180} fill="#f8fafc" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={2.5} fill={colors[assigns[i] % colors.length]} />
        ))}
        {centroids.map((c, i) => (
          <rect key={`c${i}`} x={c.x - 4} y={c.y - 4} width={8} height={8} fill={colors[i % colors.length]} stroke="#111827" />
        ))}
      </svg>
    </div>
  );
}
