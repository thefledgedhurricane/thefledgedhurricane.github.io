---
title: Introduction à la Programmation avec le Langage C
summary: Un cours pratique et progressif pour apprendre les bases de la programmation en C, comprendre ses concepts fondamentaux et écrire des programmes simples.
date: 2024-12-18
type: docs
tags:
  - C
  - Programmation
  - Débutant
  - Logique
image:
  caption: "Illustration des bases de la programmation en langage C."
---

### Objectifs  
À la fin de ce cours, les étudiants seront capables de :  
1. **Comprendre les concepts fondamentaux du langage C** : variables, types, et structures de contrôle.  
2. **Écrire des programmes simples en C** pour résoudre des problèmes concrets.  
3. **Manipuler les tableaux et les chaînes de caractères** efficacement.  
4. **Utiliser les fonctions pour une programmation modulaire et réutilisable.**  
5. **Découvrir la gestion de mémoire en C** avec les pointeurs et les allocations dynamiques.

---

## Table des matières  

1. **Introduction au langage C**  
   - Qu'est-ce que le langage C ?  
   - Pourquoi apprendre le C ?  

2. **Les bases du C : Syntaxe et variables**  
   - Structure de base d’un programme C.  
   - Déclaration et initialisation des variables.  
   - Types de données primitifs.  

3. **Structures de contrôle**  
   - Conditions : `if`, `else`, `switch`.  
   - Boucles : `for`, `while`, `do...while`.  

4. **Tableaux et chaînes de caractères**  
   - Définir et manipuler des tableaux.  
   - Travailler avec les chaînes de caractères.  

5. **Les fonctions en C**  
   - Définir et appeler des fonctions.  
   - Passer des paramètres par valeur ou par référence.  

6. **Les pointeurs et la gestion de la mémoire**  
   - Introduction aux pointeurs.  
   - Allocation dynamique de mémoire.  

7. **Projet final : Un programme interactif en C**  
   - Créer un mini-calculateur qui effectue des opérations de base.  

---



## 1. **Introduction au langage C**

### **1.1 Qu’est-ce que le langage C ?**  
Le langage C est un langage de programmation compilé, créé dans les années 1970 par Dennis Ritchie. Il est connu pour sa performance et sa capacité à travailler près du matériel.  

### **1.2 Pourquoi apprendre le C ?**  
- **Performance élevée** : Utilisé pour des systèmes où la vitesse est critique (systèmes d’exploitation, pilotes matériels).  
- **Base des langages modernes** : C a influencé de nombreux langages comme C++, Java, et Python.  
- **Contrôle sur la mémoire** : Vous gérez la mémoire manuellement, ce qui développe votre compréhension des systèmes informatiques.  

---

## 2. **Structure de base d’un programme C**

Un programme en C suit une structure bien définie :  

### **Structure d’un programme C**  
1. Inclusion des bibliothèques nécessaires.  
2. Déclaration des fonctions.  
3. Fonction principale `main()`.  
4. Instructions à exécuter.  

**Exemple : Un programme minimal en C**  
```c
#include <stdio.h>  // Inclusion de la bibliothèque standard pour printf

int main() {        // Début de la fonction principale
    printf("Bonjour le monde !\n");  // Affiche un message
    return 0;       // Retourne 0 pour indiquer que le programme s'est bien terminé
}
```

---

## 3. **Variables et types de données**

### **3.1 Qu’est-ce qu’une variable ?**  
Une variable est un espace mémoire où une valeur est stockée. Elle a un type, un nom et une valeur.

**Exemple : Déclaration et initialisation de variables**  
```c
int age = 25;          // Entier
float poids = 72.5;    // Nombre flottant
char initiale = 'A';   // Caractère
```

### **3.2 Types de données en C**  
| Type          | Taille (en octets) | Exemple          |
|---------------|--------------------|------------------|
| `int`         | 4                  | `42`             |
| `float`       | 4                  | `3.14`           |
| `double`      | 8                  | `3.14159265359`  |
| `char`        | 1                  | `'A'`            |
| `long`        | 8                  | `1000000000L`    |

---

## 4. **Opérateurs en C**

| Catégorie      | Opérateurs | Description                        | Exemple               |
|----------------|------------|------------------------------------|-----------------------|
| Aritmétiques   | `+`, `-`, `*`, `/`, `%` | Calculs mathématiques de base | `a + b`              |
| Relationnels   | `==`, `!=`, `<`, `>`, `<=`, `>=` | Comparaison entre deux valeurs | `a > b`             |
| Logiques       | `&&`, `||`, `!`         | Opérations logiques sur des conditions | `a > 0 && b < 10` |
| Affectation    | `=`, `+=`, `-=`, `*=`, `/=`, `%=` | Assignation et mise à jour des variables | `a += 5`           |

---

## 5. **Structures de contrôle**

### **5.1 Conditions : `if`, `else`, `switch`**  

#### Condition `if...else` :  
**Exemple : Vérifier si un nombre est pair ou impair**  
```c
#include <stdio.h>

int main() {
    int nombre;
    printf("Entrez un nombre : ");
    scanf("%d", &nombre);  // Lecture d'un entier

    if (nombre % 2 == 0) {
        printf("Le nombre est pair.\n");
    } else {
        printf("Le nombre est impair.\n");
    }

    return 0;
}
```

#### Structure `switch` :  
**Exemple : Menu simple avec `switch`**  
```c
#include <stdio.h>

int main() {
    int choix;
    printf("1. Démarrer\n2. Arrêter\n3. Quitter\n");
    printf("Choisissez une option : ");
    scanf("%d", &choix);

    switch (choix) {
        case 1:
            printf("Démarrage...\n");
            break;
        case 2:
            printf("Arrêt...\n");
            break;
        case 3:
            printf("Au revoir !\n");
            break;
        default:
            printf("Option invalide.\n");
    }

    return 0;
}
```

---

### **5.2 Boucles : `for`, `while`, `do...while`**  

#### La boucle `for` :  
Utilisée pour des itérations définies.  
**Exemple :**  
```c
#include <stdio.h>

int main() {
    for (int i = 1; i <= 5; i++) {
        printf("Itération %d\n", i);
    }
    return 0;
}
```

#### La boucle `while` :  
Répète tant qu’une condition est vraie.  
**Exemple :**  
```c
#include <stdio.h>

int main() {
    int compteur = 0;
    while (compteur < 5) {
        printf("Compteur : %d\n", compteur);
        compteur++;
    }
    return 0;
}
```

#### La boucle `do...while` :  
Exécute au moins une fois, puis vérifie la condition.  
**Exemple :**  
```c
#include <stdio.h>

int main() {
    int nombre;
    do {
        printf("Entrez un nombre positif : ");
        scanf("%d", &nombre);
    } while (nombre <= 0);

    printf("Nombre valide : %d\n", nombre);
    return 0;
}
```

---

## 6. **Tableaux et chaînes de caractères**

### **6.1 Tableaux**  
Un tableau stocke une collection d’éléments du même type.  

**Exemple : Déclarer et parcourir un tableau**  
```c
#include <stdio.h>

int main() {
    int nombres[5] = {1, 2, 3, 4, 5};

    for (int i = 0; i < 5; i++) {
        printf("nombres[%d] = %d\n", i, nombres[i]);
    }
    return 0;
}
```

---

### **6.2 Chaînes de caractères**  
Les chaînes en C sont des tableaux de caractères terminés par `\0`.  

**Exemple : Lire et afficher une chaîne**  
```c
#include <stdio.h>

int main() {
    char nom[20];
    printf("Entrez votre nom : ");
    scanf("%s", nom);
    printf("Bonjour, %s !\n", nom);
    return 0;
}
```

---

## 7. **Les fonctions en C**

Les fonctions permettent de diviser le code en blocs réutilisables.  

**Exemple : Calculer le carré d’un nombre**  
```c
#include <stdio.h>

int carre(int nombre) {
    return nombre * nombre;
}

int main() {
    int resultat = carre(5);
    printf("Le carré de 5 est : %d\n", resultat);
    return 0;
}
```

---

## 8. **Pointeurs et gestion de la mémoire**

### **8.1 Introduction aux pointeurs**  
Un pointeur stocke l’adresse d’une variable.  

**Exemple :**  
```c
#include <stdio.h>

int main() {
    int nombre = 42;
    int *pointeur = &nombre;

    printf("Adresse : %p\n", pointeur);
    printf("Valeur : %d\n", *pointeur);
    return 0;
}
```

### **8.2 Allocation dynamique de mémoire**  
**Exemple : Utiliser `malloc` et `free`**  
```c
#include <stdlib.h>
#include <stdio.h>

int main() {
    int *ptr = (int *)malloc(sizeof(int));
    if (ptr == NULL) {
        printf("Allocation échouée\n");
        return 1;
    }

    *ptr = 42;
    printf("Valeur : %d\n", *ptr);
    free(ptr);  // Libère la mémoire
    return 0;
}
```

---

## 9. **Projet final : Mini-calculateur interactif**

**Objectif :**  
Créer un programme qui effectue des opérations mathématiques de base selon le choix de l’utilisateur.  

**Code complet :**  
```c
#include <stdio.h>

int main() {
    float a, b, resultat;
    char operateur;

    printf("Entrez le premier nombre : ");
    scanf("%f", &a);

    printf("Entrez un opérateur (+, -, *, /) : ");
    scanf(" %c", &operateur);

    printf("Entrez le second nombre : ");
    scanf("%f", &b);

    switch (operateur) {
        case '+':
            resultat = a + b;
            break;
        case '-':
            resultat = a - b;
            break;
        case '*':
            resultat = a * b;
            break;
        case '/':
            if (b != 0)
                resultat = a / b;
            else {
                printf("Erreur : Division par zéro\n");
                return 1;
            }
            break;
        default:
            printf("Opérateur invalide\n");
            return 1;
    }

    printf("Le résultat est : %.2f\n", resultat);
    return 0;
}
```

---

Avec cette progression, vous maîtriserez les bases du C et serez prêt à explorer des concepts plus avancés !