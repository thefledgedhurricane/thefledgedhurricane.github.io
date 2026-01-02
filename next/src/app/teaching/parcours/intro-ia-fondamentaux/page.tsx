
export default function IntroIaFondamentaux() {
  return (
    <main className="prose mx-auto p-4">
      <h1>Qu'est-ce que l'IA ?</h1>
      <p><strong>Définition</strong>: L'intelligence artificielle (IA) regroupe les techniques permettant à une machine d'exécuter des tâches exigeant habituellement des capacités cognitives humaines (raisonner, percevoir, apprendre, planifier).</p>
      <h2>Contexte historique</h2>
      <p>L'IA moderne naît de la convergence de plusieurs disciplines : mathématiques (logique, statistiques), informatique (algorithmique, calcul), psychologie cognitive et philosophie de l'esprit.</p>
      <h3>Périodes marquantes</h3>
      <ul>
        <li><strong>1943</strong> : McCulloch & Pitts modélisent le neurone artificiel</li>
        <li><strong>1950</strong> : Alan Turing propose le "Test de Turing" comme critère d'intelligence</li>
        <li><strong>1956</strong> : Conférence de Dartmouth - naissance officielle du champ "Intelligence Artificielle"</li>
        <li><strong>1957-1969</strong> : Ère du perceptron (Rosenblatt) et découverte de ses limites (Minsky & Papert)</li>
        <li><strong>1970-1980</strong> : "Hiver de l'IA" - désillusion et réduction des financements</li>
        <li><strong>1986</strong> : Renaissance avec la rétropropagation (Rumelhart, Hinton, Williams)</li>
        <li><strong>1997</strong> : Deep Blue bat Kasparov aux échecs</li>
        <li><strong>2012</strong> : AlexNet révolutionne ImageNet - début de l'ère Deep Learning</li>
        <li><strong>2017-aujourd'hui</strong> : Transformers, modèles fondamentaux (GPT, BERT), IA générative</li>
      </ul>
      <h2>Grandes familles d'approches</h2>
      <h3>IA symbolique (GOFAI - Good Old-Fashioned AI)</h3>
      <p><strong>Principe</strong> : Représentation explicite des connaissances sous forme de symboles manipulés par des règles logiques.</p>
      <ul>
        <li>Raisonnement déductif</li>
        <li>Bases de connaissances (ontologies, règles de production)</li>
        <li>Systèmes experts</li>
        <li>Planification et recherche dans des espaces d'états</li>
      </ul>
      <p><strong>Avantages</strong> : Explicabilité, contrôle précis, raisonnement logique rigoureux</p>
      <p><strong>Inconvénients</strong> : Difficulté à gérer l'incertitude, explosion combinatoire, acquisition des connaissances</p>
      <h3>IA statistique (Machine Learning)</h3>
      <p><strong>Principe</strong> : Apprentissage de patterns à partir de données, optimisation d'objectifs statistiques.</p>
    </main>
  );
}
