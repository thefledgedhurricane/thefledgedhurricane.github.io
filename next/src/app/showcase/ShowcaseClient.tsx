'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const Scene = dynamic(() => import('./scene'), {
  ssr: false,
  loading: () => (
    <div className="h-[60vh] flex items-center justify-center text-gray-500">
      Chargement de la scène 3D…
    </div>
  ),
});

export default function ShowcaseClient() {
  const [wallColor, setWallColor] = useState<string>('#e5e7eb'); // gray-200
  const [lightColor, setLightColor] = useState<string>('#ffffff');
  const [ambient, setAmbient] = useState<number>(0.6);
  const [directional, setDirectional] = useState<number>(1.2);
  const [highDetail, setHighDetail] = useState<boolean>(true);

  return (
    <div className="relative">
      <div className="absolute right-4 top-4 z-10 w-80 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/85 dark:bg-gray-900/85 backdrop-blur p-4 shadow-lg">
        <div className="text-sm font-medium mb-3 text-gray-800 dark:text-gray-200">Paramètres de la scène</div>
        <div className="space-y-4 text-sm">
          <div className="flex items-center justify-between">
            <label className="text-gray-600 dark:text-gray-300">Couleur des murs</label>
            <input aria-label="Couleur des murs" type="color" value={wallColor} onChange={(e) => setWallColor(e.target.value)} className="h-8 w-10 p-0 bg-transparent border-0" />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-gray-600 dark:text-gray-300">Couleur lumière</label>
            <input aria-label="Couleur de la lumière" type="color" value={lightColor} onChange={(e) => setLightColor(e.target.value)} className="h-8 w-10 p-0 bg-transparent border-0" />
          </div>
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-1">Ambiante: {ambient.toFixed(2)}</label>
            <input aria-label="Intensité ambiante" type="range" min={0} max={2} step={0.05} value={ambient} onChange={(e) => setAmbient(parseFloat(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-1">Directionnelle: {directional.toFixed(2)}</label>
            <input aria-label="Intensité directionnelle" type="range" min={0} max={2} step={0.05} value={directional} onChange={(e) => setDirectional(parseFloat(e.target.value))} className="w-full" />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-gray-600 dark:text-gray-300">Détails élevés</label>
            <input aria-label="Activer détails élevés" type="checkbox" checked={highDetail} onChange={(e) => setHighDetail(e.target.checked)} />
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Astuce: si aucun bouton VR n’apparaît, votre navigateur ou appareil peut ne pas supporter WebXR.
          </div>
        </div>
      </div>

      <Scene wallColor={wallColor} lightColor={lightColor} ambientIntensity={ambient} dirIntensity={directional} highDetail={highDetail} />
    </div>
  );
}
