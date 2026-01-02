'use client';

import CourseOverview from '@/components/lms/CourseOverview';

const lessons = [
  { 
    id: 1, 
    title: "Qu'est-ce que l'IA ?", 
    duration: "45 min", 
    content: "Définitions, mythes et réalités",
    details: `L'Intelligence Artificielle (IA) est souvent mal comprise, oscillant entre fantasmes de science-fiction et réalité technologique.

**Définition formelle :**
L'IA est un ensemble de théories et de techniques mises en œuvre en vue de réaliser des machines capables de simuler l'intelligence humaine.

**Les deux types d'IA :**
1. **IA Faible (Narrow AI) :** Systèmes conçus pour une tâche spécifique (ex: échecs, reconnaissance faciale, ChatGPT). C'est la seule forme d'IA qui existe aujourd'hui.
2. **IA Forte (General AI) :** Machine dotée d'une conscience et d'une intelligence générale comparable ou supérieure à l'humain. C'est encore théorique.

**Concepts clés :**
• **Algorithme :** Suite d'instructions pour résoudre un problème.
• **Modèle :** Représentation mathématique apprise à partir de données.
• **Données :** Le "carburant" nécessaire pour entraîner les modèles modernes.

**Exercice de réflexion :**
Parmi les technologies suivantes, lesquelles sont de l'IA ?
- Un calculateur de poche
- Un GPS (Google Maps)
- Un thermostat intelligent
- Un personnage non-joueur dans un jeu vidéo`
  },
  { 
    id: 2, 
    title: "Contexte historique", 
    duration: "45 min", 
    content: "De Turing au Deep Learning",
    details: `L'histoire de l'IA est marquée par des cycles d'enthousiasme ("étés") et de désillusion ("hivers").

**Les grandes dates :**
• **1950 :** Alan Turing propose le "Test de Turing" pour évaluer l'intelligence d'une machine.
• **1956 :** Conférence de Dartmouth, naissance officielle du terme "Intelligence Artificielle".
• **1997 :** Deep Blue (IBM) bat Garry Kasparov aux échecs.
• **2012 :** AlexNet révolutionne la reconnaissance d'images grâce au Deep Learning.
• **2016 :** AlphaGo bat le champion du monde de Go.
• **2022 :** Lancement de ChatGPT, démocratisation de l'IA générative.

**Pourquoi maintenant ?**
Trois facteurs ont permis l'explosion récente de l'IA :
1. La puissance de calcul (GPU)
2. La disponibilité massive de données (Big Data)
3. L'amélioration des algorithmes (Réseaux de neurones profonds)`
  },
  { 
    id: 3, 
    title: "IA Symbolique vs Statistique", 
    duration: "60 min", 
    content: "Systèmes experts vs Machine Learning",
    details: `Il existe deux grandes approches pour créer de l'intelligence artificielle.

**1. IA Symbolique (GOFAI - Good Old-Fashioned AI) :**
• Basée sur des règles logiques explicites (Si... Alors...).
• **Exemple :** Systèmes experts médicaux des années 80.
• **Avantages :** Explicable, logique parfaite.
• **Limites :** Ne peut pas gérer l'ambiguïté ou apprendre de nouvelles situations.

**2. IA Statistique (Machine Learning) :**
• Basée sur l'apprentissage à partir de données.
• La machine déduit les règles elle-même en observant des exemples.
• **Exemple :** Reconnaissance de chats dans des images.
• **Avantages :** Peut gérer des tâches complexes et floues (vision, langage).
• **Limites :** "Boîte noire" (difficile à expliquer), nécessite beaucoup de données.

Aujourd'hui, l'IA statistique domine, mais l'IA symbolique reste utile pour le raisonnement logique.`
  },
  { 
    id: 4, 
    title: "Les grandes familles d'algorithmes", 
    duration: "60 min", 
    content: "Supervisé, Non-supervisé, Renforcement",
    details: `Le Machine Learning se divise en trois grandes catégories d'apprentissage.

**1. Apprentissage Supervisé (Supervised Learning) :**
• La machine apprend à partir d'exemples étiquetés (Entrée -> Sortie attendue).
• **Tâches :** Classification (Spam ou Non-Spam), Régression (Prédire le prix d'une maison).
• **Analogie :** Un élève apprend avec un professeur qui corrige ses exercices.

**2. Apprentissage Non-supervisé (Unsupervised Learning) :**
• La machine explore des données sans étiquettes pour trouver des structures cachées.
• **Tâches :** Clustering (Regrouper des clients similaires), Réduction de dimension.
• **Analogie :** Un enfant trie des objets par forme sans connaître leur nom.

**3. Apprentissage par Renforcement (Reinforcement Learning) :**
• Un agent apprend en interagissant avec un environnement par essais et erreurs (Récompense/Punition).
• **Applications :** Robotique, Jeux vidéo, AlphaGo.
• **Analogie :** Dresser un chien avec des friandises.`
  },
  { 
    id: 5, 
    title: "Réseaux de neurones artificiels", 
    duration: "75 min", 
    content: "Inspiration biologique et fonctionnement",
    details: `Les réseaux de neurones sont au cœur du Deep Learning.

**Inspiration biologique :**
Ils imitent grossièrement le fonctionnement du cerveau humain, avec des neurones connectés par des synapses.

**Structure d'un neurone artificiel :**
1. **Entrées (Inputs) :** Données pondérées par des "poids" (weights).
2. **Somme pondérée :** On additionne toutes les entrées.
3. **Fonction d'activation :** Décide si le neurone "s'active" ou non (ex: ReLU, Sigmoid).
4. **Sortie (Output) :** Le résultat transmis aux neurones suivants.

**Le Deep Learning (Apprentissage Profond) :**
C'est l'utilisation de réseaux de neurones avec de nombreuses couches cachées ("profondeur"). Chaque couche apprend des caractéristiques de plus en plus abstraites (bords -> formes -> objets).`
  },
  { 
    id: 6, 
    title: "Applications actuelles", 
    duration: "50 min", 
    content: "Vision, NLP, Robotique",
    details: `L'IA transforme de nombreux secteurs.

**Vision par ordinateur (Computer Vision) :**
• Diagnostic médical (radiologie)
• Voitures autonomes (détection d'obstacles)
• Surveillance et sécurité

**Traitement du Langage Naturel (NLP) :**
• Traduction automatique (DeepL, Google Translate)
• Assistants vocaux (Siri, Alexa)
• Génération de texte (ChatGPT)

**Autres domaines :**
• **Finance :** Détection de fraude, trading haute fréquence.
• **Industrie :** Maintenance prédictive.
• **Art :** Génération d'images (Midjourney, DALL-E).`
  },
  { 
    id: 7, 
    title: "Enjeux éthiques et sociétaux", 
    duration: "60 min", 
    content: "Biais, explicabilité, impact sur l'emploi",
    details: `Le déploiement massif de l'IA soulève des questions cruciales.

**1. Biais algorithmiques :**
Les IA reproduisent les préjugés présents dans leurs données d'entraînement (racisme, sexisme).
*Exemple : Un algorithme de recrutement qui favorise les hommes.*

**2. Explicabilité (Black Box) :**
Comment faire confiance à une décision médicale ou judiciaire prise par une IA si on ne comprend pas son raisonnement ?

**3. Impact sur l'emploi :**
L'automatisation va remplacer certaines tâches, mais aussi créer de nouveaux métiers. La transition sera un défi majeur.

**4. Désinformation (Deepfakes) :**
La capacité de générer de fausses vidéos ou audios réalistes menace la vérité et la démocratie.`
  },
  { 
    id: 8, 
    title: "Le futur de l'IA", 
    duration: "45 min", 
    content: "AGI, défis techniques et philosophiques",
    details: `Vers où allons-nous ?

**L'IA Générale (AGI) :**
Le "Saint Graal" de la recherche : une IA capable d'apprendre n'importe quelle tâche intellectuelle humaine. Les experts sont divisés sur sa faisabilité et son échéance (10 ans ? 50 ans ? Jamais ?).

**Défis techniques :**
• Apprentissage avec moins de données (Few-shot learning).
• Consommation énergétique des modèles.
• Raisonnement et bon sens (Common sense).

**La Singularité :**
Hypothèse d'un moment où l'IA dépassera l'intelligence humaine et s'améliorera elle-même de manière exponentielle, rendant le futur imprévisible.`
  },
];

const objectives = [
  "Comprendre ce qu'est réellement l'Intelligence Artificielle",
  "Connaître l'histoire et les évolutions majeures du domaine",
  "Distinguer les différentes approches (symbolique, connexionniste)",
  "Identifier les cas d'usage pertinents de l'IA",
  "Développer un esprit critique sur les enjeux de l'IA"
];

const prerequisites = [
  "Aucun prérequis technique",
  "Curiosité pour la technologie",
  "Esprit ouvert"
];

export default function IAFondamentauxPage() {
  return (
    <CourseOverview
      title="Fondamentaux de l'IA"
      description="Une exploration complète de l'Intelligence Artificielle : de ses origines historiques à ses impacts futurs sur notre société."
      level="Débutant"
      duration="8h de contenu"
      lessonCount={8}
      lessons={lessons}
      objectives={objectives}
      prerequisites={prerequisites}
    />
  );
}
