'use client';

import { useState } from 'react';
import Link from 'next/link';
import CourseOverview from '@/components/lms/CourseOverview';

const lessons = [
  { 
    id: 1, 
    title: "Introduction au Web", 
    duration: "35 min", 
    content: "Internet, HTTP, navigateurs, HTML de base",
    details: `Le Web est un système d'information hypertexte fonctionnant sur Internet.

**Comment ça marche ?**
• **Client (Navigateur) :** Demande une page (Requête HTTP).
• **Serveur :** Renvoie les fichiers (HTML, CSS, JS).
• **DNS :** L'annuaire qui traduit "google.com" en adresse IP.

**HTML (HyperText Markup Language) :**
C'est le squelette de la page.
\`\`\`html
<h1>Mon Titre</h1>
<p>Un paragraphe de texte.</p>
<a href="https://google.com">Un lien</a>
\`\`\`
`
  },
  { 
    id: 2, 
    title: "HTML5 sémantique", 
    duration: "50 min", 
    content: "Structure, balises, formulaires, accessibilité",
    details: `Le HTML sémantique donne du sens au contenu pour les moteurs de recherche (SEO) et les lecteurs d'écran (Accessibilité).

**Structure moderne :**
• \`<header>\` : En-tête (logo, nav).
• \`<nav>\` : Liens de navigation.
• \`<main>\` : Contenu principal.
• \`<article>\` : Contenu autonome (blog post).
• \`<section>\` : Section thématique.
• \`<footer>\` : Pied de page.

**Formulaires :**
\`\`\`html
<form>
  <label for="email">Email :</label>
  <input type="email" id="email" required>
  <button type="submit">Envoyer</button>
</form>
\`\`\`
`
  },
  { 
    id: 3, 
    title: "CSS — Fondamentaux", 
    duration: "55 min", 
    content: "Sélecteurs, box model, couleurs, typographie",
    details: `CSS (Cascading Style Sheets) gère l'apparence.

**Sélecteurs :**
• Balise : \`p { color: red; }\`
• Classe : \`.btn { background: blue; }\` (Réutilisable)
• ID : \`#header { height: 100px; }\` (Unique)

**Le Box Model :**
Tout élément HTML est une boîte composée de :
1. **Content :** Le texte/image.
2. **Padding :** Espace intérieur.
3. **Border :** Bordure.
4. **Margin :** Espace extérieur.

\`\`\`css
.box {
  width: 200px;
  padding: 20px;
  border: 1px solid black;
  margin: 10px;
}
\`\`\`
`
  },
  { 
    id: 4, 
    title: "CSS — Layout moderne", 
    duration: "60 min", 
    content: "Flexbox, Grid, responsive design",
    details: `Fini les \`float\` et les \`table\` pour la mise en page !

**Flexbox (1 dimension) :**
Idéal pour aligner des éléments sur une ligne ou une colonne.
\`\`\`css
.container {
  display: flex;
  justify-content: center; /* Horizontal */
  align-items: center;     /* Vertical */
}
\`\`\`

**CSS Grid (2 dimensions) :**
Idéal pour les grilles complexes (lignes et colonnes).
\`\`\`css
.grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* 3 colonnes */
  gap: 20px;
}
\`\`\`

**Responsive Design :**
Adapter le site au mobile avec les Media Queries.
\`\`\`css
@media (max-width: 768px) {
  .sidebar { display: none; }
}
\`\`\`
`
  },
  { 
    id: 5, 
    title: "JavaScript — Bases", 
    duration: "65 min", 
    content: "Variables, fonctions, DOM, événements",
    details: `JavaScript rend la page interactive.

**Variables :**
\`const\` (constante), \`let\` (variable), \`var\` (ancien, à éviter).

**DOM (Document Object Model) :**
Manipuler le HTML depuis le JS.
\`\`\`javascript
const btn = document.querySelector('.btn');
btn.textContent = "Cliqué !";
\`\`\`

**Événements :**
\`\`\`javascript
btn.addEventListener('click', () => {
  alert("Bonjour !");
});
\`\`\`
`
  },
  { 
    id: 6, 
    title: "JavaScript Moderne & TypeScript", 
    duration: "60 min", 
    content: "ES6+, Async/await, Types, Interfaces",
    details: `Le JavaScript moderne (ES6+) et TypeScript améliorent la productivité et la robustesse.

**Fonctions fléchées & Destructuring :**
\`\`\`javascript
const add = (a, b) => a + b;
const { name, age } = user;
\`\`\`

**Async / Await :**
Gérer les opérations asynchrones (API) proprement.
\`\`\`javascript
async function getData() {
  const res = await fetch('/api/data');
  const data = await res.json();
}
\`\`\`

**TypeScript :**
Ajoute le typage statique au JS.
\`\`\`typescript
interface User {
  id: number;
  name: string;
}

function greet(user: User) {
  console.log(\`Hello \${user.name}\`);
}
\`\`\`
`
  },
  { 
    id: 7, 
    title: "Introduction à React", 
    duration: "70 min", 
    content: "Composants, JSX, props, state",
    details: `React est une bibliothèque pour créer des interfaces utilisateur basées sur des composants.

**Composant Fonctionnel (avec TS) :**
\`\`\`tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export default function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
\`\`\`

**JSX :**
Une syntaxe qui ressemble à du HTML mais qui est du JavaScript.
`
  },
  { 
    id: 8, 
    title: "React — Hooks & State", 
    duration: "65 min", 
    content: "useState, useEffect, custom hooks",
    details: `Les Hooks permettent d'utiliser l'état et le cycle de vie dans les composants fonctionnels.

**useState :**
Gérer l'état local.
\`\`\`tsx
const [count, setCount] = useState<number>(0);
\`\`\`

**useEffect :**
Gérer les effets de bord (chargement de données, abonnements).
\`\`\`tsx
useEffect(() => {
  document.title = \`Compteur : \${count}\`;
}, [count]); // Se déclenche quand 'count' change
\`\`\`
`
  },
  { 
    id: 9, 
    title: "Next.js — Fondamentaux", 
    duration: "60 min", 
    content: "App Router, pages, routing, SSR",
    details: `Next.js est un framework React pour la production (SSR, Routing, Optimisations).

**App Router :**
Chaque dossier dans \`app/\` devient une route.
• \`app/page.tsx\` -> \`/\`
• \`app/about/page.tsx\` -> \`/about\`

**Server Components (par défaut) :**
Rendu sur le serveur pour plus de performance et de SEO.
\`\`\`tsx
// app/page.tsx
export default async function Page() {
  const data = await getData(); // Appel direct à la BDD possible
  return <main>{data.title}</main>;
}
\`\`\`
`
  },
  { 
    id: 10, 
    title: "Styling avec Tailwind", 
    duration: "50 min", 
    content: "Utility-first CSS, responsive, thèmes",
    details: `Tailwind CSS permet de styliser directement dans le HTML avec des classes utilitaires.

**Exemple :**
\`\`\`tsx
<div className="bg-blue-500 text-mckinsey-navy-800 p-4 rounded-lg shadow-md hover:bg-blue-600">
  Bouton stylé
</div>
\`\`\`

**Avantages :**
• Pas de fichiers CSS séparés.
• Design System cohérent.
• Responsive facile (\`md:flex\`).
`
  },
  { 
    id: 11, 
    title: "Déploiement", 
    duration: "40 min", 
    content: "Vercel, Netlify, CI/CD, optimisation",
    details: `Mettre son site en ligne gratuitement et simplement.

**Vercel (Créateurs de Next.js) :**
1. Connecter son repo GitHub.
2. Vercel détecte Next.js.
3. Déploiement automatique à chaque \`git push\`.

**Optimisations :**
• Images (Next/Image).
• Polices (Next/Font).
• Minification automatique.
`
  },
  { 
    id: 12, 
    title: "Projet final", 
    duration: "90 min", 
    content: "Portfolio moderne de A à Z",
    details: `Création d'un portfolio complet (comme celui-ci !).

**Étapes :**
1. Setup Next.js + TypeScript + Tailwind.
2. Création des composants (Header, Hero, Projects).
3. Gestion des données (JSON ou CMS).
4. Animations (Framer Motion).
5. Déploiement sur Vercel.

**Objectif :** Avoir un projet concret à montrer aux recruteurs.
`
  },
];

const objectives = [
  "Maîtriser HTML5, CSS3 et JavaScript moderne",
  "Créer des interfaces réactives avec React",
  "Développer des applications full-stack avec Next.js",
  "Utiliser Tailwind CSS pour le styling",
  "Déployer vos applications sur le web"
];

const prerequisites = [
  "Aucune connaissance préalable requise",
  "Un ordinateur avec un éditeur de code (VS Code recommandé)",
  "Curiosité et envie d'apprendre"
];



export default function DeveloppementWebPage() {
  return (
    <CourseOverview
      title="Développement Web Moderne"
      description="HTML, CSS, JavaScript, React & Next.js"
      level="Débutant"
      duration="14h"
      lessonCount={12}
      lessons={lessons}
      objectives={objectives}
      prerequisites={prerequisites}
    />
  );
}

