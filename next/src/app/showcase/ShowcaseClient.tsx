'use client';

import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('./scene'), {
  ssr: false,
  loading: () => (
    <div className="h-[60vh] flex items-center justify-center text-gray-500">
      Chargement de la scène 3D…
    </div>
  ),
});

export default function ShowcaseClient() {
  return <Scene />;
}
