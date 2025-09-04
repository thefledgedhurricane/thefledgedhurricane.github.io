"use client";

import { useMemo, useState } from 'react';

type Fact = Record<string, any>;

const rules = [
  {
    name: 'suspicion_fievre',
    when: (f: Fact) => (f.temperature ?? 0) > 38 && !!f.maux_de_tete,
    then: (f: Fact) => ({ ...f, suspicion_fievre: true }),
  },
  {
    name: 'possibilite_grippe',
    when: (f: Fact) => !!f.suspicion_fievre && !!f.toux,
    then: (f: Fact) => ({ ...f, possibilite_grippe: true }),
  },
  {
    name: 'recommander_repos',
    when: (f: Fact) => !!f.possibilite_grippe,
    then: (f: Fact) => ({ ...f, recommandation: 'Repos et hydratation' }),
  },
];

function inferForward(facts: Fact) {
  const trace: string[] = [];
  let changed = true;
  let current = { ...facts };
  while (changed) {
    changed = false;
    for (const r of rules) {
      if (r.when(current)) {
        const next = r.then(current);
        if (JSON.stringify(next) !== JSON.stringify(current)) {
          current = next;
          changed = true;
          trace.push(`Règle appliquée: ${r.name}`);
        }
      }
    }
  }
  return { result: current, trace };
}

export default function SymbolicReasoningDemo() {
  const [temperature, setTemperature] = useState(37.5);
  const [maux, setMaux] = useState(false);
  const [toux, setToux] = useState(false);

  const { result, trace } = useMemo(
    () => inferForward({ temperature, maux_de_tete: maux, toux }),
    [temperature, maux, toux]
  );

  return (
    <div className="rounded-lg border bg-white dark:bg-gray-900 p-4">
  <h4 className="font-semibold mb-3">Système expert (chaînage avant)</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <label className="flex items-center gap-2">
          <span className="text-sm w-32">Température</span>
          <input
            type="range"
            min={35}
            max={41}
            step={0.1}
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full"
          />
          <span className="text-sm tabular-nums w-12 text-right">{temperature.toFixed(1)}°C</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={maux} onChange={(e) => setMaux(e.target.checked)} />
          <span className="text-sm">Maux de tête</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={toux} onChange={(e) => setToux(e.target.checked)} />
          <span className="text-sm">Toux</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 rounded border bg-gray-50 dark:bg-gray-800">
          <div className="text-xs text-gray-500 mb-2">Trace d&apos;inférence</div>
          <ul className="text-sm list-disc pl-5 space-y-1">
            {trace.length === 0 && <li>Aucune règle appliquée</li>}
            {trace.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
        <div className="p-3 rounded border bg-gray-50 dark:bg-gray-800">
          <div className="text-xs text-gray-500 mb-2">Conclusions</div>
          <div className="text-sm space-y-1">
            <div>Suspicion fièvre: {result.suspicion_fievre ? 'Oui' : 'Non'}</div>
            <div>Possibilité grippe: {result.possibilite_grippe ? 'Oui' : 'Non'}</div>
            <div>Recommandation: {result.recommandation ?? '—'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
