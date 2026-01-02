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
import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const SortingVisualizer = dynamic(() => import('@/components/interactive/SortingVisualizer'), { ssr: false });
const DataStructureVisualizer = dynamic(() => import('@/components/interactive/DataStructureVisualizer'), { ssr: false });

const lessons = [
  { 
    id: 1, 
    title: "Introduction à l'algorithmique", 
    duration: "30 min",
    content: {
      component: () => (
        <>
          <Section title="Introduction à l'algorithmique">
            <Paragraph>
              Un algorithme est une suite finie et non ambiguë d'opérations ou d'instructions permettant de résoudre 
              un problème ou d'obtenir un résultat.
            </Paragraph>

            <SubSection title="Pourquoi étudier l'algorithmique ?">
              <BulletList items={[
                'Efficacité : Résoudre des problèmes plus rapidement et avec moins de ressources.',
                'Indépendance : Les concepts sont valables quel que soit le langage de programmation.',
                'Recrutement : C\'est la base des entretiens techniques (FAANG, etc.).'
              ]} />
            </SubSection>

            <SubSection title="Propriétés d'un bon algorithme">
              <BulletList items={[
                'Clarté : Chaque étape doit être précise.',
                'Finitude : Il doit se terminer après un nombre fini d\'étapes.',
                'Efficacité : Il doit être aussi rapide et économe en mémoire que possible.'
              ]} />
            </SubSection>
          </Section>
        </>
      )
    },
    details: `Découvrez ce qu'est un algorithme, pourquoi l'algorithmique est fondamentale et les propriétés d'un bon algorithme.`
  },
  { 
    id: 2, 
    title: "Complexité algorithmique (Big O)", 
    duration: "45 min",
    content: {
      component: () => (
        <>
          <Section title="Complexité algorithmique (Big O)">
            <Paragraph>
              La notation Big O (Grand O) permet de classifier les algorithmes selon la façon dont leur temps d'exécution 
              ou leur consommation mémoire augmente avec la taille de l'entrée (n).
            </Paragraph>

            <SubSection title="Complexités courantes (du meilleur au pire)">
              <BulletList items={[
                'O(1) - Constant : Accès à un tableau par index.',
                'O(log n) - Logarithmique : Recherche binaire.',
                'O(n) - Linéaire : Parcours simple d\'une liste.',
                'O(n log n) - Linéaireithmique : Tri rapide (QuickSort), Tri fusion (MergeSort).',
                'O(n²) - Quadratique : Boucles imbriquées (Tri à bulles).',
                'O(2ⁿ) - Exponentiel : Problèmes récursifs naïfs (Fibonacci sans mémoïsation).'
              ]} />
            </SubSection>

            <SubSection title="Pourquoi c'est important ?">
              <Callout type="warning">
                <Paragraph>
                  Pour n = 1 000 000 :
                </Paragraph>
                <BulletList items={[
                  'O(n) ≈ 1 seconde',
                  'O(n²) ≈ 11 jours !'
                ]} />
              </Callout>
            </SubSection>
          </Section>
        </>
      )
    },
    details: `Apprenez la notation Big O pour analyser l'efficacité des algorithmes en temps et en espace.`
  },
  { 
    id: 3, 
    title: "Algorithmes de tri", 
    duration: "60 min", 
    content: "Bulles, insertion, sélection, fusion, rapide",
    details: `Trier des données est une opération fondamentale en informatique.

**Tri à bulles (Bubble Sort) - O(n²) :**
On compare les éléments adjacents et on les échange s'ils sont dans le mauvais ordre. Simple mais inefficace.

**Tri par insertion (Insertion Sort) - O(n²) :**
On construit la liste triée élément par élément, comme on trie des cartes à jouer dans sa main. Efficace pour les petites listes.

**Tri rapide (Quick Sort) - O(n log n) :**
On choisit un "pivot", on place les éléments plus petits à gauche et les plus grands à droite, puis on répète récursivement. C'est souvent le plus rapide en pratique.

**Tri fusion (Merge Sort) - O(n log n) :**
On divise la liste en deux moitiés, on les trie récursivement, puis on fusionne les deux moitiés triées. Stable et prévisible.
`
  },
  { 
    id: 4, 
    title: "Algorithmes de recherche", 
    duration: "45 min", 
    content: "Linéaire, binaire, interpolation",
    details: `Comment trouver un élément dans une collection ?

**Recherche Linéaire - O(n) :**
On parcourt chaque élément un par un. Fonctionne sur des listes non triées.

**Recherche Binaire (Dichotomie) - O(log n) :**
Nécessite une liste **triée**. On regarde l'élément du milieu :
- Si c'est celui qu'on cherche, fini.
- Si ce qu'on cherche est plus petit, on cherche dans la moitié gauche.
- Sinon, dans la moitié droite.
On divise l'espace de recherche par 2 à chaque étape.
`
  },
  { 
    id: 5, 
    title: "Structures de données linéaires", 
    duration: "50 min", 
    content: "Tableaux, listes chaînées, piles, files",
    details: `Les structures de données organisent l'information pour un accès efficace.

**Tableaux (Arrays) :**
• Taille fixe (souvent).
• Accès O(1) par index.
• Insertion/Suppression O(n) (il faut décaler les éléments).

**Listes chaînées (Linked Lists) :**
• Chaque élément pointe vers le suivant.
• Taille dynamique.
• Insertion/Suppression O(1) (si on a la référence).
• Accès O(n) (il faut tout parcourir).

**Piles (Stacks) - LIFO (Last In, First Out) :**
• Comme une pile d'assiettes.
• Opérations : push (ajouter), pop (retirer).
• Usage : Appels de fonctions (récursion), Annuler (Undo).

**Files (Queues) - FIFO (First In, First Out) :**
• Comme une file d'attente.
• Opérations : enqueue (ajouter), dequeue (retirer).
• Usage : Gestion des tâches d'impression, requêtes serveur.
`
  },
  { id: 6, title: "Arbres et graphes", duration: "75 min", content: "Arbres binaires, parcours, graphes" },
  { id: 7, title: "Tables de hachage", duration: "40 min", content: "Fonctions de hachage, collisions" },
  { id: 8, title: "Programmation dynamique", duration: "60 min", content: "Mémoïsation, tabulation, problèmes classiques" },
  { id: 9, title: "Algorithmes gloutons", duration: "45 min", content: "Stratégies d'optimisation locale" },
  { id: 10, title: "Diviser pour régner", duration: "50 min", content: "Récursivité, merge sort, quick sort" },
  { id: 11, title: "Algorithmes sur les graphes", duration: "70 min", content: "BFS, DFS, Dijkstra, A*" },
  { id: 12, title: "Projet final : résolution de problèmes", duration: "90 min", content: "Application des concepts sur des cas réels" },
];

const sortingAlgorithms = ['bubble', 'selection', 'insertion', 'quick', 'merge'] as const;
const dataStructures = ['bst', 'heap', 'linkedList', 'stack', 'queue'] as const;

const objectives = [
  "Comprendre la complexité algorithmique (Big O)",
  "Maîtriser les algorithmes de tri et de recherche",
  "Utiliser les structures de données linéaires et non-linéaires",
  "Résoudre des problèmes complexes avec la programmation dynamique",
  "Optimiser les performances de vos applications"
];

const prerequisites = [
  "Connaissances de base en programmation",
  "Notions de mathématiques (logique, fonctions)",
  "Esprit analytique"
];

export default function AlgorithmiquePage() {
  return (
    <CourseOverview
      title="Algorithmique & Structures de Données"
      description="Maîtrisez les fondamentaux de l'informatique"
      level="Intermédiaire"
      duration="10h"
      lessonCount={12}
      lessons={lessons}
      objectives={objectives}
      prerequisites={prerequisites}
    />
  );
}



