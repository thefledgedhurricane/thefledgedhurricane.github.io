---
title: Tableau de traduction Algorithmique → C → Python
summary: Comparaison des concepts fondamentaux entre l'algorithmique, le langage C et Python, avec des exemples pratiques.
date: 2024-12-18
type: docs
tags:
  - Algorithmique
  - C
  - Python
  - Programmation
image:
  caption: "Illustration de la transition des concepts d'algorithmique vers C et Python."
---

## Introduction

Lors de la transition entre l'algorithmique et les langages de programmation tels que le C ou Python, il est essentiel de comprendre les similarités et différences syntaxiques. Ce tableau offre une correspondance pratique entre ces trois langages pour les concepts fondamentaux.  
{{< audio src="Learning Algorithms for Beginners.mp3" >}}

---

### Notes importantes :  

#### 1. **Langage C : Code de départ**  
En C, tout programme commence par inclure les bibliothèques nécessaires (comme `<stdio.h>` pour les entrées/sorties) et doit inclure une fonction `main()` comme point d'entrée.  

**Exemple minimal pour le C :**
```c
#include <stdio.h>

int main() {
    // Code ici
    return 0;
}
```

#### 2. **Langage Python : Indentation stricte**  
En Python, **l'indentation est obligatoire** pour délimiter les blocs de code (par exemple, les conditions, boucles, ou fonctions). Il est recommandé d'utiliser **4 espaces par niveau** pour une bonne lisibilité et éviter les erreurs.  

**Exemple :**
```python
if True:
    print("Indentation correcte")
# Pas d'accolades comme en C, mais des espaces !
```

---

## Tableau de traduction Algorithmique → C → Python  

| **Notion**               | **Description**                                                                                      | **Algorithmique**                  | **C**                                           | **Python**                                    |
|--------------------------|----------------------------------------------------------------------------------------------------|------------------------------------|-----------------------------------------------|-----------------------------------------------|
| **Déclaration de variables** | Réserver un espace mémoire pour stocker une valeur.                                              | `a : entier`                       | `int a;`                                       | `a = 0`                                       |
| **Affectation**           | Assigner une valeur à une variable.                                                                 | `a ← 10`                           | `a = 10;`                                     | `a = 10`                                      |
| **Constante**             | Valeur fixe qui ne peut pas être modifiée après déclaration.                                        | `PI ← 3.14`                        | `#define PI 3.14`                             | `PI = 3.14`                                   |
| **Entrée utilisateur**    | Permet de lire une valeur fournie par l'utilisateur.                                               | `lire(a)`                          | `scanf("%d", &a);`                            | `a = int(input())`                            |
| **Sortie**                | Afficher une valeur ou un message.                                                                 | `écrire(a)`                        | `printf("%d", a);`                            | `print(a)`                                    |
| **Condition**             | Exécuter un bloc de code si une condition est vraie.                                               | `si a > 0 alors ...`               | `if (a > 0) { ... }`                          | `if a > 0: ...`                               |
| **Boucle Tant Que**       | Répéter un bloc de code tant qu'une condition est vraie.                                           | `tant que a < 5 faire ...`         | `while (a < 5) { ... }`                       | `while a < 5: ...`                            |
| **Boucle Faire Tant Que** | Répéter un bloc de code **au moins une fois**, puis vérifier la condition.                         | `faire ... tant que condition`     | `do { ... } while (condition);`              | *Pas directement disponible, utilisez `while True` et `break`* |
| **Boucle Pour**           | Répéter un bloc de code pour un nombre défini d'itérations.                                        | `pour i de 1 à 5 faire ...`        | `for (int i = 1; i <= 5; i++) { ... }`        | `for i in range(1, 6): ...`                   |
| **Boucle avec Pas**       | Répéter un bloc de code en incrémentant par une valeur spécifique (pas).                           | `pour i de 1 à 10 par 2 faire ...` | `for (int i = 1; i <= 10; i += 2) { ... }`    | `for i in range(1, 11, 2): ...`               |
| **Switch/Case**           | Permet de tester plusieurs cas pour une même variable.                                             | `selon valeur faire ...`           | `switch (variable) { case x: ... break; }`    | *Non disponible en Python, utilisez `if...elif...else`* |
| **Fonction**              | Regrouper un bloc de code sous un nom pour le réutiliser.                                          | `fonction somme(a, b)`             | `int somme(int a, int b) { return a + b; }`   | `def somme(a, b): return a + b`              |

---

## Explications des ajouts  

### **Boucle Faire Tant Que (do...while)**  
- **Algorithmique** :  
  La boucle **faire...tant que** garantit que le bloc de code s'exécute au moins une fois avant de vérifier la condition.  
- **C** :  
  Cette boucle est disponible via `do { ... } while (condition);`.  
- **Python** :  
  Python n'a pas de boucle `do...while`. Vous pouvez simuler ce comportement avec une boucle infinie (`while True`) et un `break` pour sortir une fois la condition remplie.  

### **Switch/Case**  
- **Algorithmique** :  
  La structure `selon` teste plusieurs cas possibles pour une variable donnée.  
- **C** :  
  Le `switch` permet de tester des cas multiples et d'exécuter des blocs spécifiques avec un `break` pour sortir après chaque cas.  
- **Python** :  
  Python n'a pas de structure équivalente. Utilisez une chaîne de `if`, `elif`, et `else` pour reproduire ce comportement.  

---

## Utilisation pratique  

Ce tableau est conçu pour :  
1. Comprendre comment les concepts d'algorithmique se traduisent dans des langages concrets comme C et Python.  
2. Accélérer l'apprentissage en identifiant les similitudes syntaxiques et leurs nuances spécifiques.  


Voici une méthode détaillée pour résoudre un problème algorithmique en utilisant le **tableau de correspondance** comme outil principal pour passer d'un algorithme à une implémentation en Python ou en C :  

---

## Méthode pour passer de l’algorithmique à Python ou C avec le tableau  

### **Étape 1 : Comprendre le problème**  
- **Analysez l’énoncé** :  
  - Déterminez les **données d’entrée** et leur type (entiers, chaînes, etc.).  
  - Identifiez les **résultats attendus**.  
  - Écrivez en langage naturel les **étapes nécessaires** pour arriver au résultat.  

**Exemple de problème :**  
Écrire un programme qui calcule la somme des entiers de 1 à `n`, où `n` est une entrée utilisateur.  

---

### **Étape 2 : Écrire l’algorithme en pseudo-code**  
- Rédigez un algorithme clair et compréhensible en vous concentrant sur les étapes logiques.  
- Utilisez le vocabulaire algorithmique du tableau (ex. : `lire`, `tant que`, `pour`).  

**Algorithme :**  
``` 
lire n  
somme ← 0  
pour i de 1 à n faire  
    somme ← somme + i  
fin pour  
écrire somme  
```  

---

### **Étape 3 : Identifier les correspondances dans le tableau**  
Utilisez le tableau pour traduire chaque ligne de l’algorithme dans le langage cible (Python ou C).  

#### Exemple de correspondance pour Python :  

| **Concept Algorithmique**     | **Python**                                  |  
|--------------------------------|---------------------------------------------|  
| `lire n`                       | `n = int(input())`                         |  
| `somme ← 0`                    | `somme = 0`                                |  
| `pour i de 1 à n faire`        | `for i in range(1, n + 1):`                |  
| `somme ← somme + i`            | `somme += i`                               |  
| `écrire somme`                 | `print(somme)`                             |  

#### Exemple de correspondance pour C :  

| **Concept Algorithmique**     | **C**                                       |  
|--------------------------------|---------------------------------------------|  
| `lire n`                       | `scanf("%d", &n);`                         |  
| `somme ← 0`                    | `int somme = 0;`                           |  
| `pour i de 1 à n faire`        | `for (int i = 1; i <= n; i++) {`           |  
| `somme ← somme + i`            | `somme += i;`                              |  
| `écrire somme`                 | `printf("%d\n", somme);`                   |  


### Étape 4 : Traduire et implémenter en Python ou C
- Une fois les correspondances identifiées, écrivez le code complet dans le langage choisi.  

#### Implémentation en Python :  
```python
n = int(input("Entrez un nombre : "))  # lire n
somme = 0  # somme ← 0

for i in range(1, n + 1):  # pour i de 1 à n faire
    somme += i  # somme ← somme + i

print("La somme est :", somme)  # écrire somme
```

#### Implémentation en C :  
```c
#include <stdio.h>

int main() {
    int n, somme = 0;  // lire n et somme ← 0

    printf("Entrez un nombre : ");
    scanf("%d", &n);

    for (int i = 1; i <= n; i++) {  // pour i de 1 à n faire
        somme += i;  // somme ← somme + i
    }

    printf("La somme est : %d\n", somme);  // écrire somme
    return 0;
}
```

---

### **Étape 5 : Tester et Déboguer**  
- Exécutez le code dans le langage choisi.  
- Si le résultat est incorrect, retournez à l’algorithme pour vérifier la logique.  
- Utilisez des tests simples (ex. : `n = 1`, `n = 5`) pour vérifier que le programme fonctionne.  

---

### **Exemple pas à pas avec un autre problème : Factoriel de n**  

#### **Algorithme :**  
``` 
lire n  
fact ← 1  
pour i de 1 à n faire  
    fact ← fact * i  
fin pour  
écrire fact  
```

#### **Correspondance Python :**  
- `lire n` → `n = int(input())`  
- `fact ← 1` → `fact = 1`  
- `pour i de 1 à n faire` → `for i in range(1, n + 1):`  
- `fact ← fact * i` → `fact *= i`  
- `écrire fact` → `print(fact)`  

#### **Correspondance C :**  
- `lire n` → `scanf("%d", &n);`  
- `fact ← 1` → `int fact = 1;`  
- `pour i de 1 à n faire` → `for (int i = 1; i <= n; i++) {`  
- `fact ← fact * i` → `fact *= i;`  
- `écrire fact` → `printf("%d\n", fact);`  

---

### **Conseils pour l'étudiant :**  

1. **Utilisez le tableau comme guide de traduction directe**  
   - Pour chaque ligne de l'algorithme, cherchez son équivalent dans la colonne Python ou C.  
   - Si une structure n’a pas d’équivalent direct (ex. : `faire...tant que` en Python), utilisez l’explication du tableau pour adapter.  

2. **Travaillez sur de petits exemples**  
   - Commencez par des problèmes simples comme les boucles ou les calculs arithmétiques avant d’aborder des structures plus complexes (fonctions, tableaux, etc.).  

3. **Comparez les implémentations**  
   - Une fois que le code fonctionne, comparez vos versions Python et C pour identifier les similitudes et différences.  

4. **Vérifiez les erreurs fréquentes**  
   - En C : N’oubliez pas les déclarations de type et les `;` .  
   - En Python : Vérifiez l’indentation et la syntaxe des blocs (`:`).  

---

Cette méthode, associée au tableau, est un outil puissant pour structurer l'apprentissage et maîtriser la transition entre l'algorithmique et la programmation pratique.



