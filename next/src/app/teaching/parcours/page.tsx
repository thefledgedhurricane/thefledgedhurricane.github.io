import Link from 'next/link';

export default function ParcoursIndex() {
  return (
    <main className="prose mx-auto p-4">
      <h1>Parcours d'Intelligence Artificielle</h1>
      <p>Bienvenue dans le parcours d'apprentissage de l'IA. Retrouvez ci-dessous les modules et leçons disponibles :</p>
      <ul>
        <li>
          <strong>Fondamentaux</strong>
          <ul>
            <li>
              <Link href="/teaching/parcours/intro-ia-fondamentaux">Qu'est-ce que l'IA ?</Link>
            </li>
          </ul>
        </li>
        <li>
          <strong>Apprentissage automatique</strong>
          <ul>
            <li>
              <Link href="/teaching/parcours/intro-ia-types-ml">Types d'apprentissage automatique</Link>
            </li>
          </ul>
        </li>
      </ul>
    </main>
  );
}
