export const metadata = {
  title: 'Immersive Classroom (VR)',
  description: 'Démonstration 3D/VR WebGL: salle de classe interactive avec éclairage ajustable, couleurs des murs et téléportation.',
};

import ShowcaseClient from './ShowcaseClient';

export default function ShowcasePage() {
  return (
    <div className="flex-1">
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-light tracking-tight mb-3">Immersive Classroom (VR)</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          Entrez dans une salle de classe 3D/VR: ajustez l’éclairage, changez la couleur des murs et déplacez-vous par téléportation.
        </p>
      </section>

      <div className="border-t border-gray-100 dark:border-gray-800">
        <ShowcaseClient />
      </div>
    </div>
  );
}
