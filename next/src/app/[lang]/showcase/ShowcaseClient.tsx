'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { type Locale } from '@/lib/dictionaries';

const showcaseText = {
  ar: {
    loading: "جاري تحميل المشهد ثلاثي الأبعاد...",
    settings: "إعدادات المشهد",
    wall_color: "لون الجدران",
    light_color: "لون الضوء",
    ambient: "الإضاءة المحيطة",
    directional: "الإضاءة الموجهة",
    high_detail: "تفاصيل عالية",
    hint: "تنبيه: إذا لم يظهر زر الواقع الافتراضي (VR)، قد يكون متصفحك أو جهازك لا يدعم WebXR."
  },
  fr: {
    loading: "Chargement de la scène 3D…",
    settings: "Paramètres de la scène",
    wall_color: "Couleur des murs",
    light_color: "Couleur lumière",
    ambient: "Ambiante",
    directional: "Directionnelle",
    high_detail: "Détails élevés",
    hint: "Astuce: si aucun bouton VR n’apparaît, votre navigateur ou appareil peut ne pas supporter WebXR."
  },
  en: {
    loading: "Loading 3D scene...",
    settings: "Scene settings",
    wall_color: "Wall color",
    light_color: "Light color",
    ambient: "Ambient",
    directional: "Directional",
    high_detail: "High detail",
    hint: "Tip: if no VR button appears, your browser or device may not support WebXR."
  },
  es: {
    loading: "Cargando escena 3D...",
    settings: "Configuración de escena",
    wall_color: "Color de pared",
    light_color: "Color de luz",
    ambient: "Ambiente",
    directional: "Direccional",
    high_detail: "Detalles altos",
    hint: "Sugerencia: si no aparece el botón de RV, su navegador o dispositivo puede no admitir WebXR."
  }
};

// Dynamically import the scene (WebGL) to bypass server-side rendering issues
const Scene = dynamic(() => import('./scene'), {
  ssr: false,
  loading: () => (
    <div className="h-[60vh] flex items-center justify-center text-gray-500">
      Loading...
    </div>
  ),
});

interface ShowcaseClientProps {
  lang: Locale;
}

export default function ShowcaseClient({ lang }: ShowcaseClientProps) {
  const t = showcaseText[lang] || showcaseText.en;
  const [wallColor, setWallColor] = useState<string>('#e5e7eb');
  const [lightColor, setLightColor] = useState<string>('#ffffff');
  const [ambient, setAmbient] = useState<number>(0.6);
  const [directional, setDirectional] = useState<number>(1.2);
  const [highDetail, setHighDetail] = useState<boolean>(true);

  return (
    <div className="relative">
      <div className="absolute right-4 top-4 z-10 w-80 rounded-xl border border-gray-200 bg-white/85 backdrop-blur p-4 shadow-lg">
        <div className="text-sm font-medium mb-3 text-gray-800">{t.settings}</div>
        <div className="space-y-4 text-sm">
          <div className="flex items-center justify-between">
            <label className="text-gray-600">{t.wall_color}</label>
            <input aria-label={t.wall_color} type="color" value={wallColor} onChange={(e) => setWallColor(e.target.value)} className="h-8 w-10 p-0 bg-transparent border-0" />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-gray-600">{t.light_color}</label>
            <input aria-label={t.light_color} type="color" value={lightColor} onChange={(e) => setLightColor(e.target.value)} className="h-8 w-10 p-0 bg-transparent border-0" />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">{t.ambient}: {ambient.toFixed(2)}</label>
            <input aria-label={t.ambient} type="range" min={0} max={2} step={0.05} value={ambient} onChange={(e) => setAmbient(parseFloat(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">{t.directional}: {directional.toFixed(2)}</label>
            <input aria-label={t.directional} type="range" min={0} max={2} step={0.05} value={directional} onChange={(e) => setDirectional(parseFloat(e.target.value))} className="w-full" />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-gray-600">{t.high_detail}</label>
            <input aria-label={t.high_detail} type="checkbox" checked={highDetail} onChange={(e) => setHighDetail(e.target.checked)} />
          </div>
          <div className="text-xs text-gray-500">
            {t.hint}
          </div>
        </div>
      </div>

      <Scene wallColor={wallColor} lightColor={lightColor} ambientIntensity={ambient} dirIntensity={directional} highDetail={highDetail} />
    </div>
  );
}
