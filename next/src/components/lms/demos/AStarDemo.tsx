'use client';

import { useMemo, useState } from 'react';

type Cell = { r: number; c: number };

function manhattan(a: Cell, b: Cell) {
  return Math.abs(a.r - b.r) + Math.abs(a.c - b.c);
}

function reconstruct(came: Record<string, string>, goalKey: string): string[] {
  const path = [goalKey];
  let cur = goalKey;
  while (came[cur]) {
    cur = came[cur];
    path.push(cur);
  }
  return path.reverse();
}

function key(cell: Cell) {
  return cell.r + ',' + cell.c;
}

function neighbors(cell: Cell, n = 10) {
  const dirs = [
    { r: 1, c: 0 },
    { r: -1, c: 0 },
    { r: 0, c: 1 },
    { r: 0, c: -1 },
  ];
  const out: Cell[] = [];
  for (const d of dirs) {
    const nr = cell.r + d.r;
    const nc = cell.c + d.c;
    if (nr >= 0 && nr < n && nc >= 0 && nc < n) out.push({ r: nr, c: nc });
  }
  return out;
}

function astar(n = 10, walls: Set<string>, start: Cell, goal: Cell) {
  const open = new Set<string>();
  const came: Record<string, string> = {};
  const g: Record<string, number> = {};
  const f: Record<string, number> = {};

  const sKey = key(start);
  const gKey = key(goal);

  open.add(sKey);
  g[sKey] = 0;
  f[sKey] = manhattan(start, goal);

  while (open.size > 0) {
    let curKey = '';
    let bestF = Infinity;
    open.forEach((k) => {
      const fk = f[k] ?? Infinity;
      if (fk < bestF) {
        bestF = fk;
        curKey = k;
      }
    });

    if (curKey === gKey) {
      return reconstruct(came, curKey);
    }

    open.delete(curKey);
    const [r, c] = curKey.split(',').map(Number);
    const cur: Cell = { r, c };

    for (const nb of neighbors(cur, n)) {
      const nbKey = key(nb);
      if (walls.has(nbKey)) continue;
      const tentative = (g[curKey] ?? Infinity) + 1;
      if (tentative < (g[nbKey] ?? Infinity)) {
        came[nbKey] = curKey;
        g[nbKey] = tentative;
        f[nbKey] = tentative + manhattan(nb, goal);
        open.add(nbKey);
      }
    }
  }
  return [];
}

export default function AStarDemo() {
  const n = 12;
  const [density, setDensity] = useState(0.18);
  const [seed, setSeed] = useState(1);

  const walls = useMemo(() => {
    const s = new Set<string>();
    let rnd = seed * 9301 + 49297;
    const rand = () => (rnd = (rnd * 1103515245 + 12345) % 0x100000000) / 0x100000000;
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if ((r === 0 && c === 0) || (r === n - 1 && c === n - 1)) continue;
        if (rand() < density) s.add(key({ r, c }));
      }
    }
    return s;
  }, [n, density, seed]);

  const path = useMemo(() => astar(n, walls, { r: 0, c: 0 }, { r: n - 1, c: n - 1 }), [n, walls]);
  const pathSet = useMemo(() => new Set(path), [path]);

  const size = 18;

  return (
    <div className="my-4">
      <div className="flex items-center gap-3 mb-2">
        <label className="text-sm">obstacles = {(density * 100).toFixed(0)}%</label>
        <input
          aria-label="density"
          type="range"
          min={0}
          max={0.4}
          step={0.02}
          value={density}
          onChange={(e) => setDensity(parseFloat(e.target.value))}
        />
        <button className="px-2 py-1 text-sm border rounded" onClick={() => setSeed((s) => s + 1)}>random</button>
      </div>
      <svg width={n * size} height={n * size} viewBox={`0 0 ${n * size} ${n * size}`} className="w-full max-w-sm">
        <rect x={0} y={0} width={n * size} height={n * size} fill="#f8fafc" />
        {/* grid */}
        {Array.from({ length: n + 1 }).map((_, i) => (
          <>
            <line key={`h${i}`} x1={0} y1={i * size} x2={n * size} y2={i * size} stroke="#e5e7eb" />
            <line key={`v${i}`} x1={i * size} y1={0} x2={i * size} y2={n * size} stroke="#e5e7eb" />
          </>
        ))}
        {/* walls */}
        {Array.from(walls).map((k) => {
          const [r, c] = k.split(',').map(Number);
          return <rect key={k} x={c * size} y={r * size} width={size} height={size} fill="#111827" opacity={0.2} />;
        })}
        {/* path */}
        {path.map((k) => {
          const [r, c] = k.split(',').map(Number);
          return <rect key={k} x={c * size + 3} y={r * size + 3} width={size - 6} height={size - 6} fill="#34d399" opacity={0.8} />;
        })}
        {/* start & goal */}
        <rect x={3} y={3} width={size - 6} height={size - 6} fill="#3b82f6" />
        <rect x={(n - 1) * size + 3} y={(n - 1) * size + 3} width={size - 6} height={size - 6} fill="#ef4444" />
      </svg>
    </div>
  );
}
