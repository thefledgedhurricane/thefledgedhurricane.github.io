'use client';

import React, { ReactNode } from 'react';
import CourseOverview from '@/components/lms/CourseOverview';
import { 
  Section, 
  Paragraph, 
  BulletList, 
  CodeBlock, 
  Callout, 
  SubSection, 
  ExampleBox,
  Highlight,
  InlineCode 
} from '@/components/lesson/LessonContent';

const lessons = [
  { 
    id: 1, 
    title: "Introduction & Logique de Programmation", 
    duration: "45 min", 
    content: {
      component: () => (
        <>
          <Section title="Introduction à la Logique de Programmation">
            <Paragraph>
              La programmation n'est pas seulement une affaire de code, c'est avant tout une manière de penser. 
              Avant d'écrire la moindre ligne de code, un bon développeur doit savoir analyser un problème et 
              le décomposer en étapes simples.
            </Paragraph>

            <SubSection title="Qu'est-ce qu'un algorithme ?">
              <Paragraph>
                Un algorithme est simplement une suite d'instructions précises pour accomplir une tâche. 
                C'est comme une recette de cuisine :
              </Paragraph>
              <BulletList items={[
                'Prenez 2 œufs',
                'Battez-les',
                'Faites chauffer la poêle',
                'Versez les œufs'
              ]} />
              <Paragraph>
                En informatique, c'est la même chose, mais avec des données.
              </Paragraph>
            </SubSection>

            <SubSection title="La pensée computationnelle">
              <Paragraph>
                Pour parler à un ordinateur, il faut adopter la pensée computationnelle qui repose sur 4 piliers :
              </Paragraph>
              <BulletList items={[
                'Décomposition : Briser un gros problème en petits problèmes.',
                'Reconnaissance de motifs : Identifier des similitudes.',
                'Abstraction : Ignorer les détails inutiles pour se concentrer sur l\'essentiel.',
                'Algorithmique : Écrire les étapes de résolution.'
              ]} />
            </SubSection>

            <SubSection title="Du langage naturel au pseudo-code">
              <Paragraph>
                Le pseudo-code est une façon d'écrire un algorithme sans se soucier de la syntaxe stricte 
                d'un langage de programmation.
              </Paragraph>
              <ExampleBox title="Exemple de pseudo-code">
                <CodeBlock language="pseudocode" code={`DÉBUT
  AFFICHER "Quel est votre âge ?"
  LIRE age
  SI age >= 18 ALORS
    AFFICHER "Vous êtes majeur"
  SINON
    AFFICHER "Vous êtes mineur"
  FIN SI
FIN`} />
              </ExampleBox>
            </SubSection>
          </Section>
        </>
      )
    },
    content_old: `# Introduction à la Logique de Programmation

La programmation n'est pas seulement une affaire de code, c'est avant tout une manière de penser. Avant d'écrire la moindre ligne de code, un bon développeur doit savoir analyser un problème et le décomposer en étapes simples.

## Qu'est-ce qu'un algorithme ?

Un algorithme est simplement une suite d'instructions précises pour accomplir une tâche. C'est comme une recette de cuisine :
1. Prenez 2 œufs
2. Battez-les
3. Faites chauffer la poêle
4. Versez les œufs

En informatique, c'est la même chose, mais avec des données.

## La pensée computationnelle

Pour parler à un ordinateur, il faut adopter la pensée computationnelle qui repose sur 4 piliers :
1. **Décomposition** : Briser un gros problème en petits problèmes.
2. **Reconnaissance de motifs** : Identifier des similitudes.
3. **Abstraction** : Ignorer les détails inutiles pour se concentrer sur l'essentiel.
4. **Algorithmique** : Écrire les étapes de résolution.

## Du langage naturel au pseudo-code

Le pseudo-code est une façon d'écrire un algorithme sans se soucier de la syntaxe stricte d'un langage de programmation.

**Exemple :**
\`\`\`
DÉBUT
  AFFICHER "Quel est votre âge ?"
  LIRE age
  SI age >= 18 ALORS
    AFFICHER "Vous êtes majeur"
  SINON
    AFFICHER "Vous êtes mineur"
  FIN SI
FIN
\`\`\`
`,
    details: `La programmation commence bien avant d'écrire du code. Elle débute par la capacité à décomposer un problème complexe en étapes simples.

**Au programme :**
• Qu'est-ce qu'un algorithme ? Analogie avec une recette de cuisine.
• La pensée computationnelle : décomposition, reconnaissance de motifs, abstraction.
• Du langage naturel au pseudo-code.
• Comment un ordinateur "réfléchit" : binaire, instructions, processeur.

**Objectif :** Comprendre comment structurer sa pensée pour dialoguer avec la machine.`,
    exercises: [
      {
        id: 'ex1',
        title: "L'algorithme du café",
        description: "Écrivez un algorithme détaillé (étape par étape) pour préparer une tasse de café instantané. N'oubliez aucun détail (faire bouillir l'eau, prendre une tasse, etc.).",
        solution: `DÉBUT
  Prendre une tasse
  Prendre une cuillère
  Prendre du café instantané
  Prendre du sucre (optionnel)
  Faire chauffer de l'eau jusqu'à ébullition
  Mettre une cuillère de café dans la tasse
  SI on veut du sucre ALORS
    Ajouter du sucre
  FIN SI
  Verser l'eau chaude dans la tasse
  Mélanger avec la cuillère
  Servir
FIN`
      },
      {
        id: 'ex2',
        title: "Calcul de moyenne",
        description: "Écrivez le pseudo-code pour calculer la moyenne de 3 notes saisies par l'utilisateur.",
        solution: `DÉBUT
  AFFICHER "Entrez la note 1 :"
  LIRE note1
  AFFICHER "Entrez la note 2 :"
  LIRE note2
  AFFICHER "Entrez la note 3 :"
  LIRE note3
  
  somme = note1 + note2 + note3
  moyenne = somme / 3
  
  AFFICHER "La moyenne est : " + moyenne
FIN`
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: "Qu'est-ce qu'un algorithme ?",
        options: [
          "Un composant électronique de l'ordinateur",
          "Une suite d'instructions pour résoudre un problème",
          "Un langage de programmation très ancien",
          "Une erreur dans un programme"
        ],
        correctAnswer: 1,
        explanation: "Un algorithme est une séquence finie et non ambiguë d'opérations ou d'instructions permettant de résoudre un problème."
      },
      {
        id: 'q2',
        question: "Quelle étape ne fait PAS partie de la pensée computationnelle ?",
        options: [
          "Décomposition",
          "Abstraction",
          "Compilation",
          "Reconnaissance de motifs"
        ],
        correctAnswer: 2,
        explanation: "La compilation est une étape technique de transformation du code, pas une étape de réflexion ou de conception (pensée computationnelle)."
      }
    ],
    cheatSheet: `# Aide-mémoire : Logique & Algorithmique

## Structure de base
\`\`\`
DÉBUT
  // Instructions
FIN
\`\`\`

## Variables
\`\`\`
nom_variable ← valeur
\`\`\`

## Entrées / Sorties
\`\`\`
LIRE variable      // Entrée utilisateur
AFFICHER "Texte"   // Sortie écran
\`\`\`

## Conditions
\`\`\`
SI condition ALORS
  // Instructions si VRAI
SINON
  // Instructions si FAUX
FIN SI
\`\`\`

## Boucles
\`\`\`
TANT QUE condition FAIRE
  // Instructions
FIN TANT QUE

POUR i DE 1 À 10 FAIRE
  // Instructions
FIN POUR
\`\`\`
`
  },
  { 
    id: 2, 
    title: "Variables et Types de Données",
    duration: "1h 00",
    content: {
      component: () => (
        <>
          <Section title="Variables et Types de Données">
            <Paragraph>
              Pour qu'un programme soit utile, il doit pouvoir manipuler des données. C'est là qu'interviennent les variables.
            </Paragraph>

            <SubSection title="La métaphore de la boîte">
              <Paragraph>
                Imaginez une variable comme une boîte de rangement :
              </Paragraph>
              <BulletList items={[
                'Elle a une étiquette (son nom).',
                'Elle a un contenu (sa valeur).',
                'Elle a une forme spécifique (son type).'
              ]} />
              <CodeBlock language="javascript" code={`let age = 25;
let nom = "Alice";`} />
              <Paragraph>
                Ici, nous avons créé deux boîtes : une étiquetée "age" contenant le nombre 25, 
                et une étiquetée "nom" contenant le texte "Alice".
              </Paragraph>
            </SubSection>

            <SubSection title="Les Types Primitifs">
              <Paragraph>
                Les ordinateurs traitent différents types de données différemment :
              </Paragraph>
              <BulletList items={[
                'Entiers (Integer / int) : Nombres sans virgule (ex: 42, -10, 0).',
                'Flottants (Float / Double) : Nombres à virgule (ex: 3.14, -0.01).',
                'Chaînes de caractères (String) : Texte (ex: "Bonjour").',
                'Booléens (Boolean) : Vrai ou Faux (True/False).'
              ]} />
            </SubSection>

            <SubSection title="Déclaration et Affectation">
              <BulletList items={[
                'Déclaration : Créer la boîte (ex: int score;).',
                'Affectation : Mettre quelque chose dedans (ex: score = 100;).',
                'Initialisation : Faire les deux en même temps (ex: int score = 100;).'
              ]} />
            </SubSection>
          </Section>
        </>
      )
    },
    details: `Pour traiter de l'information, un programme doit pouvoir la stocker. C'est le rôle des variables.

**Concepts clés :**
• La métaphore de la "boîte" étiquetée.
• Les types primitifs : Entiers (int), Décimaux (float/double), Texte (string), Booléens (true/false).
• Déclaration vs Affectation vs Initialisation.
• Le typage : statique vs dynamique, fort vs faible.

**Mise en pratique :** Créer une fiche d'identité virtuelle stockant diverses informations.`,
    exercises: [
      {
        id: 'ex2-1',
        title: "Typage des données",
        description: "Pour chacune des valeurs suivantes, indiquez quel serait le type de variable le plus approprié (Entier, Float, String, Booléen) : 1) Le nombre d'élèves dans une classe 2) Le prix d'un article (ex: 19.99) 3) Le nom d'une ville 4) Si la lumière est allumée ou éteinte.",
        solution: `1) Entier (int) - On ne peut pas avoir un demi-élève.
2) Float (ou Double) - Nécessite des décimales.
3) String - C'est du texte.
4) Booléen - Vrai (allumé) ou Faux (éteint).`
      }
    ],
    quiz: [
      {
        id: 'q2-1',
        question: "Quelle instruction permet de stocker la valeur 10 dans la variable 'x' ?",
        options: [
          "10 = x",
          "x == 10",
          "x = 10",
          "x : 10"
        ],
        correctAnswer: 2,
        explanation: "En programmation (dans la plupart des langages), le signe '=' est l'opérateur d'affectation. Il met la valeur de droite dans la variable de gauche."
      }
    ],
    cheatSheet: `# Aide-mémoire : Variables

## Types courants
*   \`int\` : Entier (1, 2, 100)
*   \`float\` : Décimal (1.5, 3.14)
*   \`string\` : Texte ("Hello")
*   \`bool\` : Logique (true, false)

## Opérations
*   \`=\` : Affectation (x = 5)
*   \`+\` : Addition (5 + 2)
*   \`-\` : Soustraction
*   \`*\` : Multiplication
*   \`/\` : Division
`
  },
  { 
    id: 3, 
    title: "Les Structures Conditionnelles", 
    duration: "1h 15", 
    content: {
      component: () => (
        <>
          <Section title="Les Structures Conditionnelles">
            <Paragraph>
              Un programme intelligent doit pouvoir réagir différemment selon les situations. 
              Les conditions permettent à votre code de prendre des décisions.
            </Paragraph>

            <SubSection title="L'instruction IF / ELSE">
              <Paragraph>
                La structure de base pour prendre une décision :
              </Paragraph>
              <CodeBlock language="pseudocode" code={`SI condition ALORS
  // Instructions si la condition est vraie
SINON
  // Instructions si la condition est fausse
FIN SI`} />
            </SubSection>

            <SubSection title="Les opérateurs de comparaison">
              <BulletList items={[
                '== : égal à',
                '!= : différent de',
                '< : inférieur à',
                '> : supérieur à',
                '<= : inférieur ou égal',
                '>= : supérieur ou égal'
              ]} />
            </SubSection>

            <SubSection title="Les opérateurs logiques">
              <BulletList items={[
                'ET (AND) : Les deux conditions doivent être vraies',
                'OU (OR) : Au moins une condition doit être vraie',
                'NON (NOT) : Inverse la condition'
              ]} />
              <ExampleBox title="Exemple : Contrôle d'âge">
                <CodeBlock language="javascript" code={`if (age >= 18 && hasID) {
  console.log("Accès autorisé");
} else {
  console.log("Accès refusé");
}`} />
              </ExampleBox>
            </SubSection>
          </Section>
        </>
      )
    },
    details: `Un programme intelligent doit pouvoir réagir différemment selon les situations.

**Notions abordées :**
• L'instruction IF / ELSE IF / ELSE.
• Les opérateurs de comparaison (==, !=, <, >, <=, >=).
• Les opérateurs logiques (ET, OU, NON) et les tables de vérité.
• Les structures imbriquées (conditions dans des conditions).
• Le Switch/Case pour les choix multiples.

**Exercice type :** Créer un programme qui détermine si une année est bissextile ou calculer le prix d'un billet selon l'âge.`
  },
  { 
    id: 4, 
    title: "Les Boucles et l'Itération", 
    duration: "1h 30", 
    content: {
      component: () => (
        <>
          <Section title="Les Boucles et l'Itération">
            <Paragraph>
              La puissance de l'ordinateur réside dans sa capacité à répéter des tâches très rapidement sans se fatiguer.
            </Paragraph>

            <SubSection title="La boucle WHILE (Tant que)">
              <Paragraph>
                Répète des instructions tant qu'une condition est vraie.
              </Paragraph>
              <CodeBlock language="pseudocode" code={`TANT QUE condition FAIRE
  // Instructions à répéter
FIN TANT QUE`} />
              <Callout type="warning">
                Attention aux boucles infinies ! Assurez-vous que la condition devient fausse à un moment donné.
              </Callout>
            </SubSection>

            <SubSection title="La boucle FOR (Pour)">
              <Paragraph>
                Utilisée pour répéter un nombre précis de fois.
              </Paragraph>
              <CodeBlock language="javascript" code={`for (let i = 0; i < 10; i++) {
  console.log("Itération : " + i);
}`} />
            </SubSection>

            <SubSection title="Instructions de contrôle">
              <BulletList items={[
                'break : Sort immédiatement de la boucle',
                'continue : Passe à l\'itération suivante'
              ]} />
            </SubSection>
          </Section>
        </>
      )
    },
    details: `La puissance de l'ordinateur réside dans sa capacité à répéter des tâches très rapidement sans se fatiguer.

**Au programme :**
• La boucle TANT QUE (While) : répétition basée sur une condition.
• La boucle POUR (For) : répétition comptée ou sur une collection.
• Les boucles infinies et comment les éviter.
• Les instructions de contrôle : Break et Continue.

**Exercice type :** Calculer la factorielle d'un nombre, afficher une table de multiplication, deviner un nombre mystère.`
  },
  { 
    id: 5, 
    title: "Les Fonctions et la Modularité", 
    duration: "1h 30", 
    content: {
      component: () => (
        <>
          <Section title="Les Fonctions et la Modularité">
            <Paragraph>
              Au lieu d'écrire tout le code d'un bloc, nous apprenons à créer des blocs réutilisables : les fonctions.
            </Paragraph>

            <SubSection title="Définition d'une fonction">
              <CodeBlock language="javascript" code={`function calculerMoyenne(note1, note2, note3) {
  const somme = note1 + note2 + note3;
  const moyenne = somme / 3;
  return moyenne;
}

// Appel de la fonction
const resultat = calculerMoyenne(15, 18, 16);`} />
            </SubSection>

            <SubSection title="Concepts clés">
              <BulletList items={[
                'Paramètres : Variables dans la définition de la fonction',
                'Arguments : Valeurs passées lors de l\'appel',
                'Return : Renvoie un résultat',
                'Scope : Portée des variables (locales vs globales)'
              ]} />
            </SubSection>

            <Callout type="tip">
              <Paragraph>
                <Highlight>Principe DRY</Highlight> : Don't Repeat Yourself. Si vous copiez-collez du code, 
                c'est probablement le moment de créer une fonction !
              </Paragraph>
            </Callout>
          </Section>
        </>
      )
    },
    details: `Au lieu d'écrire tout le code d'un bloc, nous apprenons à créer des blocs réutilisables.

**Concepts clés :**
• Définition et appel de fonction.
• Paramètres et Arguments : passer des données à la fonction.
• La valeur de retour (Return) : récupérer le résultat.
• Portée des variables (Scope) : variables locales vs globales.
• Le principe DRY (Don't Repeat Yourself).

**Mise en pratique :** Créer une bibliothèque de fonctions mathématiques simples.`
  },
  { 
    id: 6, 
    title: "Les Tableaux et Listes", 
    duration: "1h 15", 
    content: {
      component: () => (
        <>
          <Section title="Les Tableaux et Listes">
            <Paragraph>
              Comment stocker 1000 notes d'étudiants sans créer 1000 variables ? Utilisez un tableau !
            </Paragraph>

            <SubSection title="Déclaration et initialisation">
              <CodeBlock language="javascript" code={`// Déclaration d'un tableau
const notes = [15, 18, 12, 16, 14];

// Accès à un élément (l'indexation commence à 0)
console.log(notes[0]); // Affiche 15
console.log(notes[2]); // Affiche 12`} />
              <Callout type="warning">
                Important : L'indexation commence à 0 ! Le premier élément est à l'index 0.
              </Callout>
            </SubSection>

            <SubSection title="Parcourir un tableau">
              <CodeBlock language="javascript" code={`for (let i = 0; i < notes.length; i++) {
  console.log("Note " + i + ": " + notes[i]);
}`} />
            </SubSection>

            <SubSection title="Opérations courantes">
              <BulletList items={[
                'push() : Ajouter un élément à la fin',
                'pop() : Retirer le dernier élément',
                'indexOf() : Trouver la position d\'un élément',
                'sort() : Trier le tableau'
              ]} />
            </SubSection>
          </Section>
        </>
      )
    },
    details: `Comment stocker 1000 notes d'étudiants sans créer 1000 variables ?

**Notions abordées :**
• Déclaration et initialisation de tableaux.
• Accès aux éléments par index (attention au zéro !).
• Parcourir un tableau avec une boucle.
• Opérations courantes : ajouter, supprimer, rechercher, trier.
• Tableaux multidimensionnels (matrices).

**Exercice type :** Calculer la moyenne d'une classe, trouver la note maximale et minimale.`
  },
  { 
    id: 7, 
    title: "Manipulation de Texte (Strings)", 
    duration: "1h 00", 
    content: {
      component: () => (
        <>
          <Section title="Manipulation de Texte (Strings)">
            <Paragraph>
              Le texte est l'une des données les plus courantes en informatique. Apprenons à le manipuler efficacement.
            </Paragraph>

            <SubSection title="Concaténation et interpolation">
              <CodeBlock language="javascript" code={`// Concaténation
const prenom = "Alice";
const nom = "Dupont";
const nomComplet = prenom + " " + nom;

// Interpolation (template literals)
const message = \`Bonjour, je m'appelle \${nomComplet}\`;`} />
            </SubSection>

            <SubSection title="Méthodes utiles">
              <CodeBlock language="javascript" code={`const texte = "Bonjour le Monde";

texte.length;              // 16
texte.toUpperCase();       // "BONJOUR LE MONDE"
texte.toLowerCase();       // "bonjour le monde"
texte.substring(0, 7);     // "Bonjour"
texte.includes("Monde");   // true
texte.replace("Monde", "Tous"); // "Bonjour le Tous"`} />
            </SubSection>

            <SubSection title="Découpage et jointure">
              <CodeBlock language="javascript" code={`// Split : diviser une chaîne
const mots = "pomme,banane,orange".split(",");
// Résultat : ["pomme", "banane", "orange"]

// Join : assembler un tableau
const phrase = mots.join(" et ");
// Résultat : "pomme et banane et orange"`} />
            </SubSection>
          </Section>
        </>
      )
    },
    details: `Le texte est l'une des données les plus courantes en informatique.

**Au programme :**
• Concaténation et interpolation.
• Méthodes utiles : longueur, majuscules/minuscules, sous-chaînes (substring).
• Recherche et remplacement de caractères.
• Découpage (split) et jointure (join).

**Exercice type :** Vérifier si un mot est un palindrome, compter le nombre de voyelles.`
  },
  { 
    id: 8, 
    title: "Dictionnaires et Objets", 
    duration: "1h 15", 
    content: {
      component: () => (
        <>
          <Section title="Dictionnaires et Objets">
            <Paragraph>
              Les objets permettent d'associer des données entre elles de manière logique, en utilisant des paires clé-valeur.
            </Paragraph>

            <SubSection title="Créer un objet">
              <CodeBlock language="javascript" code={`const etudiant = {
  nom: "Dupont",
  prenom: "Alice",
  age: 20,
  notes: [15, 18, 16]
};

// Accès aux propriétés
console.log(etudiant.nom);     // "Dupont"
console.log(etudiant.age);     // 20`} />
            </SubSection>

            <SubSection title="Modifier et ajouter des propriétés">
              <CodeBlock language="javascript" code={`// Modifier
etudiant.age = 21;

// Ajouter une nouvelle propriété
etudiant.email = "alice@example.com";`} />
            </SubSection>

            <SubSection title="Différence avec les tableaux">
              <BulletList items={[
                'Tableaux : Indexés par des nombres (0, 1, 2...)',
                'Objets : Indexés par des clés (noms de propriétés)'
              ]} />
              <Callout type="tip">
                Utilisez un objet quand vous voulez représenter une entité avec plusieurs caractéristiques (utilisateur, produit, etc.).
              </Callout>
            </SubSection>
          </Section>
        </>
      )
    },
    details: `Associer des données entre elles de manière logique.

**Concepts clés :**
• Le concept de clé-valeur.
• Différence avec les tableaux indexés.
• Accès, ajout et modification de données.
• Cas d'usage : représenter une entité complexe (un utilisateur, un produit).

**Mise en pratique :** Créer un répertoire téléphonique simple.`
  },
  { 
    id: 9, 
    title: "Entrées / Sorties et Fichiers", 
    duration: "1h 00", 
    content: {
      component: () => (
        <>
          <Section title="Entrées / Sorties et Fichiers">
            <Paragraph>
              Jusqu'ici, nos données disparaissaient à la fin du programme. Apprenons à les sauvegarder de manière permanente.
            </Paragraph>

            <SubSection title="Lecture et écriture console">
              <CodeBlock language="javascript" code={`// Afficher dans la console
console.log("Bonjour !");

// Lire depuis l'utilisateur (Node.js)
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Quel est votre nom ? ', (nom) => {
  console.log(\`Bonjour \${nom}!\`);
  rl.close();
});`} />
            </SubSection>

            <SubSection title="Manipulation de fichiers">
              <Paragraph>
                En programmation, nous pouvons lire et écrire dans des fichiers pour sauvegarder des données.
              </Paragraph>
              <CodeBlock language="javascript" code={`const fs = require('fs');

// Écrire dans un fichier
fs.writeFileSync('journal.txt', 'Entrée du 01/01/2026');

// Lire un fichier
const contenu = fs.readFileSync('journal.txt', 'utf8');
console.log(contenu);`} />
            </SubSection>

            <SubSection title="Format CSV">
              <Paragraph>
                Le format CSV (Comma-Separated Values) est idéal pour stocker des données structurées sous forme de tableau.
              </Paragraph>
              <CodeBlock language="plaintext" code={`nom,prenom,age
Dupont,Alice,20
Martin,Bob,22
Bernard,Claire,19`} />
            </SubSection>
          </Section>
        </>
      )
    },
    details: `Jusqu'ici, nos données disparaissaient à la fin du programme. Apprenons à les sauvegarder.

**Au programme :**
• Lire depuis la console (input) et écrire (print).
• Ouvrir, lire et écrire dans des fichiers texte (.txt).
• Gestion des erreurs d'ouverture de fichier.
• Le format CSV pour les données structurées.

**Projet :** Créer un journal de bord qui sauvegarde les entrées dans un fichier.`
  },
  { 
    id: 10, 
    title: "Projet Final : Gestionnaire de Tâches", 
    duration: "2h 00", 
    content: {
      component: () => (
        <>
          <Section title="Projet Final : Gestionnaire de Tâches">
            <Paragraph>
              Il est temps de mettre en pratique tous les concepts que vous avez appris ! Vous allez créer une application complète de gestion de tâches.
            </Paragraph>

            <SubSection title="Cahier des charges">
              <BulletList items={[
                'Ajouter une nouvelle tâche',
                'Afficher toutes les tâches',
                'Marquer une tâche comme terminée',
                'Supprimer une tâche',
                'Sauvegarder les tâches dans un fichier',
                'Charger les tâches au démarrage'
              ]} />
            </SubSection>

            <SubSection title="Structure suggérée">
              <CodeBlock language="javascript" code={`// Représentation d'une tâche
const tache = {
  id: 1,
  titre: "Apprendre la programmation",
  terminee: false
};

// Fonctions à créer
function ajouterTache(titre) { /* ... */ }
function afficherTaches() { /* ... */ }
function terminerTache(id) { /* ... */ }
function supprimerTache(id) { /* ... */ }
function sauvegarder() { /* ... */ }
function charger() { /* ... */ }`} />
            </SubSection>

            <Callout type="success">
              <Paragraph>
                <strong>Félicitations !</strong> En terminant ce projet, vous aurez créé votre première application complète. 
                C'est une étape majeure dans votre parcours de programmeur.
              </Paragraph>
            </Callout>

            <SubSection title="Pour aller plus loin">
              <BulletList items={[
                'Ajouter une date limite pour chaque tâche',
                'Créer des catégories de tâches',
                'Implémenter une recherche de tâches',
                'Ajouter des priorités (haute, moyenne, basse)'
              ]} />
            </SubSection>
          </Section>
        </>
      )
    },
    details: `Un projet complet pour mettre en œuvre tous les concepts vus.

**Cahier des charges :**
• Le programme doit permettre d'ajouter, voir, et supprimer des tâches.
• Les tâches ont un titre et un statut (fait/à faire).
• Les données doivent être sauvegardées dans un fichier.
• Le code doit être organisé en fonctions.
• L'interface se fait en ligne de commande (CLI).

**Objectif :** Réaliser votre première application complète et fonctionnelle.`
  }
];

export default function ProgrammationBasesPage() {
  return (
    <CourseOverview
      title="Fondamentaux de la Programmation"
      description="Ce cours est votre point de départ dans le monde du développement logiciel. Il ne s'agit pas d'apprendre un langage spécifique par cœur, mais de comprendre les concepts universels qui régissent tous les langages de programmation. À la fin de ce module, vous aurez acquis la logique nécessaire pour aborder n'importe quel langage (Python, Java, C++, JavaScript) avec confiance."
      level="Débutant"
      duration="12 heures"
      lessonCount={10}
      lessons={lessons}
      syllabusOnly={false}
      objectives={[
        "Comprendre la logique algorithmique",
        "Maîtriser les variables et types de données",
        "Utiliser les conditions et les boucles",
        "Structurer le code avec des fonctions",
        "Manipuler des collections de données",
        "Lire et écrire des fichiers simples"
      ]}
      prerequisites={[
        "Aucune connaissance préalable en programmation n'est requise",
        "Savoir utiliser un ordinateur (gestion de fichiers, clavier)",
        "Esprit logique et curiosité"
      ]}
    />
  );
}


