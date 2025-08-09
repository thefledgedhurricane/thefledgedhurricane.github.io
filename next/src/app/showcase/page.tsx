export const metadata = {
  title: 'Showcase',
  description: 'Démonstration 3D interactive (WebGL) avec Three.js.',
};

import ShowcaseClient from './ShowcaseClient';

export default function ShowcasePage() {
  return (
    <div className="flex-1">
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-light tracking-tight mb-3">Showcase</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          Une petite démo 3D en WebGL intégrée au site, utilisant React Three Fiber et Three.js.
        </p>
      </section>

      <div className="border-t border-gray-100 dark:border-gray-800">
        <ShowcaseClient />
      </div>
    </div>
  );
}
