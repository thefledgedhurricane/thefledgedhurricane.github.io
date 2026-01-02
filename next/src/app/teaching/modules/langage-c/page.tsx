'use client';

import CourseOverview from '@/components/lms/CourseOverview';

const lessons = [
  { 
    id: 1, 
    title: "Introduction au langage C", 
    duration: "35 min", 
    content: "Histoire, compilation, premiers programmes",
    details: `Le langage C, créé par Dennis Ritchie en 1972 aux Bell Labs, est l'un des langages les plus influents de l'histoire.

**Caractéristiques :**
• **Bas niveau :** Proche du matériel (mémoire, processeur).
• **Rapide :** Très peu d'abstraction, code compilé optimisé.
• **Portable :** Un code C standard peut être compilé sur presque toutes les architectures.

**Compilation :**
Le C est un langage compilé. Le code source (.c) est transformé en code machine (binaire) par un compilateur (gcc, clang).
\`gcc main.c -o mon_programme\`

**Structure d'un programme :**
\`\`\`c
#include <stdio.h> // Inclusion de bibliothèque standard

int main() {       // Point d'entrée
    printf("Hello, World!\\n");
    return 0;      // Code de retour (0 = succès)
}
\`\`\`
`
  },
  { 
    id: 2, 
    title: "Types de données fondamentaux", 
    duration: "45 min", 
    content: "int, char, float, double, sizeof",
    details: `En C, chaque variable a un type fixe qui détermine sa taille en mémoire.

**Types entiers :**
• \`char\` (1 octet) : Caractère ASCII ou petit entier (-128 à 127).
• \`int\` (généralement 4 octets) : Entier standard.
• \`short\` (2 octets), \`long\` (4 ou 8 octets).
• \`unsigned\` : Pour les nombres positifs uniquement (double la capacité positive).

**Types flottants :**
• \`float\` (4 octets) : Précision simple.
• \`double\` (8 octets) : Double précision (recommandé).

**L'opérateur sizeof :**
Permet de connaître la taille exacte d'un type sur votre machine.
\`printf("%lu", sizeof(int));\`
`
  },
  { 
    id: 3, 
    title: "Variables et constantes", 
    duration: "30 min", 
    content: "Déclaration, initialisation, const",
    details: `**Déclaration :**
\`int age;\` (La valeur est indéterminée/poubelle si non initialisée !)

**Initialisation :**
\`int age = 25;\`

**Constantes :**
Le mot-clé \`const\` protège une variable contre la modification.
\`const float PI = 3.14159;\`
\`PI = 3.14;\` // Erreur de compilation !

**Portée (Scope) :**
• **Locale :** Accessible uniquement dans le bloc {} où elle est déclarée.
• **Globale :** Accessible partout (à éviter si possible).
`
  },
  { 
    id: 4, 
    title: "Opérateurs en C", 
    duration: "40 min", 
    content: "Arithmétiques, bits, assignation",
    details: `Le C offre une large gamme d'opérateurs.

**Arithmétiques :** +, -, *, /, % (modulo).
Attention : \`5 / 2\` donne \`2\` (division entière). \`5.0 / 2\` donne \`2.5\`.

**Incrémentation :**
\`i++\` (utilise puis incrémente) vs \`++i\` (incrémente puis utilise).

**Opérateurs bit à bit (Bitwise) :**
Très utilisés en programmation système/embarquée.
• \`&\` (ET), \`|\` (OU), \`^\` (XOR), \`~\` (NON)
• \`<<\` (Décalage gauche), \`>>\` (Décalage droite)

**Logiques :**
\`&&\` (ET), \`||\` (OU), \`!\` (NON).
En C, 0 est Faux, tout le reste est Vrai.
`
  },
  { 
    id: 5, 
    title: "Structures de contrôle", 
    duration: "50 min", 
    content: "if, switch, while, for, break/continue",
    details: `**If / Else :**
\`\`\`c
if (age >= 18) {
    printf("Majeur");
} else {
    printf("Mineur");
}
\`\`\`

**Switch :**
Utile pour tester une variable contre plusieurs constantes.
\`\`\`c
switch (option) {
    case 1: printf("Jouer"); break;
    case 2: printf("Quitter"); break;
    default: printf("Erreur");
}
\`\`\`

**Boucles :**
• \`for\` : Quand on connaît le nombre d'itérations.
• \`while\` : Tant qu'une condition est vraie.
• \`do...while\` : Exécute au moins une fois.
`
  },
  { 
    id: 6, 
    title: "Tableaux", 
    duration: "55 min", 
    content: "Tableaux 1D, 2D, chaînes de caractères",
    details: `Un tableau est une zone mémoire contiguë stockant des éléments de même type.

**Déclaration :**
\`int notes[5];\` (Indices de 0 à 4).

**Initialisation :**
\`int notes[] = {10, 20, 30};\`.

**Chaînes de caractères (Strings) :**
En C, ce sont des tableaux de \`char\` terminés par un caractère nul \`\\0\`.
\`char nom[] = "Alice";\`
En mémoire : \`['A', 'l', 'i', 'c', 'e', '\\0']\`
Attention aux débordements de tampon (buffer overflow) !
`
  },
  { 
    id: 7, 
    title: "Pointeurs - Fondamentaux", 
    duration: "75 min", 
    content: "Adresses, déréférencement, arithmétique",
    details: `Le concept le plus puissant et redouté du C.
Un pointeur est une variable qui contient l'adresse mémoire d'une autre variable.

**Opérateurs :**
• \`&\` (Adresse de) : Donne l'adresse d'une variable.
• \`*\` (Valeur pointée / Déréférencement) : Accède à la valeur à l'adresse.

**Exemple :**
\`\`\`c
int a = 42;
int *p = &a; // p contient l'adresse de a
printf("%d", *p); // Affiche 42
*p = 100; // Modifie a via le pointeur
\`\`\`

**Pourquoi ?**
• Passer de gros objets aux fonctions sans les copier.
• Modifier des variables hors de la fonction locale.
• Allocation dynamique de mémoire.
`
  },
  { id: 8, title: "Pointeurs et tableaux", duration: "60 min", content: "Relation pointeur-tableau, passage par référence" },
  { id: 9, title: "Allocation dynamique", duration: "65 min", content: "malloc, calloc, realloc, free" },
  { id: 10, title: "Structures et unions", duration: "50 min", content: "struct, typedef, union, enum" },
  { id: 11, title: "Fichiers en C", duration: "45 min", content: "fopen, fread, fwrite, fclose" },
  { id: 12, title: "Préprocesseur", duration: "35 min", content: "#include, #define, macros, compilation conditionnelle" },
  { id: 13, title: "Gestion des erreurs", duration: "40 min", content: "errno, perror, gestion mémoire" },
  { id: 14, title: "Projet final", duration: "90 min", content: "Gestionnaire de données en C" },
];

const objectives = [
  "Comprendre la gestion de la mémoire",
  "Maîtriser les pointeurs et l'arithmétique d'adresses",
  "Développer des applications système performantes",
  "Gérer l'allocation dynamique de mémoire",
  "Manipuler des fichiers et des structures de données complexes"
];

const prerequisites = [
  "Bases de la programmation recommandées",
  "Compréhension de la logique binaire (optionnel mais utile)",
  "Environnement de développement C (GCC, Clang, ou Visual Studio)"
];



export default function LangageCPage() {
  return (
    <CourseOverview
      title="Langage C — Maîtrise Système"
      description="Programmation bas niveau et performance"
      level="Intermédiaire"
      duration="18h"
      lessonCount={14}
      lessons={lessons}
      objectives={objectives}
      prerequisites={prerequisites}
    />
  );
}

