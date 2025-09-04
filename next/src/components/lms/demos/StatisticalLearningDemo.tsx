"use client";

import { useMemo, useState } from 'react';

function fitLinear(xs: number[], ys: number[]) {
  const n = xs.length;
  const meanX = xs.reduce((a, b) => a + b, 0) / n;
  const meanY = ys.reduce((a, b) => a + b, 0) / n;
  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (xs[i] - meanX) * (ys[i] - meanY);
    den += (xs[i] - meanX) ** 2;
  }
  const w1 = den === 0 ? 0 : num / den;
  const w0 = meanY - w1 * meanX;
  return { w0, w1 };
}

export default function StatisticalLearningDemo() {
  const [surface, setSurface] = useState(120); // m²
  const [rooms, setRooms] = useState(2);

  const data = useMemo(() => {
    // Tiny synthetic dataset (surface, rooms) -> price
    const xs = [
      [80, 1],
      [100, 2],
      [120, 2],
      [150, 3],
      [200, 4],
    ];
    const ys = [150, 200, 230, 300, 400]; // k€

    // Fit two separate univariate linear models for intuition
    const s = xs.map((v) => v[0]);
    const r = xs.map((v) => v[1]);
    const fs = fitLinear(s, ys);
    const fr = fitLinear(r, ys);
    return { xs, ys, fs, fr };
  }, []);

  const predSurface = useMemo(() => data.fs.w0 + data.fs.w1 * surface, [data, surface]);
  const predRooms = useMemo(() => data.fr.w0 + data.fr.w1 * rooms, [data, rooms]);
  const blended = Math.round((predSurface * 0.7 + predRooms * 0.3) * 10) / 10;

  return (
    <div className="rounded-lg border bg-white dark:bg-gray-900 p-4">
      <h4 className="font-semibold mb-2">Apprentissage statistique — régression simple</h4>
      <div className="text-sm text-gray-500 mb-4">
        Modèle jouet: combinaison de deux régressions univariées pour l&apos;intuition.
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <label className="flex items-center gap-2">
          <span className="text-sm w-28">Surface (m²)</span>
          <input type="range" min={40} max={220} step={5} value={surface} onChange={(e) => setSurface(parseInt(e.target.value))} className="w-full" />
          <span className="text-sm tabular-nums w-10 text-right">{surface}</span>
        </label>
        <label className="flex items-center gap-2">
          <span className="text-sm w-28">Chambres</span>
          <input type="range" min={1} max={5} step={1} value={rooms} onChange={(e) => setRooms(parseInt(e.target.value))} className="w-full" />
          <span className="text-sm tabular-nums w-10 text-right">{rooms}</span>
        </label>
        <div className="rounded border p-2 text-sm bg-gray-50 dark:bg-gray-800">
          <div>Prix estimé: <strong>{blended} k€</strong></div>
          <div className="text-xs text-gray-500">Surface: {predSurface.toFixed(1)} k€ • Chambres: {predRooms.toFixed(1)} k€</div>
        </div>
      </div>
  <div className="text-xs text-gray-500">Ce composant est illustratif et n&apos;est pas un modèle multivarié exact.</div>
    </div>
  );
}
