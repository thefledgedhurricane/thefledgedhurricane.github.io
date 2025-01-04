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

## Objectif

Ce tableau fournit une traduction des concepts d'algorithmique en langage C et Python, avec des exemples concrets pour chaque notion.

---
You're absolutely correct! Embedding code directly into a table like that won't look good or be readable. Let me **fix this** by properly formatting the code blocks and ensuring they are clean and visually appealing. I'll also use **Markdown syntax** to make the table more readable.

Here’s the **enhanced version** of the table with clean and properly formatted code:

---

### **Tableau de Traduction : Algorithmique → C → Python**

| **Notion**               | **Description**                                                                                      | **Algorithmique**                  | **C**                                                                                       | **Python**                                    |
|--------------------------|----------------------------------------------------------------------------------------------------|------------------------------------|-------------------------------------------------------------------------------------------|-----------------------------------------------|
| **Déclaration de variables** | Réserver un espace mémoire pour stocker une valeur.                                              | `a : entier`                       | ```c
#include <stdio.h>
int main() {
    int a;
    return 0;
}
```                                                                 | ```python
a = 0
```                           |
| **Affectation**           | Assigner une valeur à une variable.                                                                 | `a ← 10`                           | ```c
#include <stdio.h>
int main() {
    int a;
    a = 10;
    return 0;
}
```                                                                 | ```python
a = 10
```                          |
| **Constante**             | Valeur fixe qui ne peut pas être modifiée après déclaration.                                        | `PI ← 3.14`                        | ```c
#include <stdio.h>
#define PI 3.14
int main() {
    printf("%.2f", PI);
    return 0;
}
```                                                                 | ```python
PI = 3.14
```                       |
| **Entrée utilisateur**    | Permet de lire une valeur fournie par l'utilisateur.                                               | `lire(a)`                          | ```c
#include <stdio.h>
int main() {
    int a;
    printf("Entrez un nombre : ");
    scanf("%d", &a);
    return 0;
}
```                                                                 | ```python
a = int(input("Entrez un nombre : "))
``` |
| **Sortie**                | Afficher une valeur ou un message.                                                                 | `écrire(a)`                        | ```c
#include <stdio.h>
int main() {
    int a = 10;
    printf("Valeur de a : %d\n", a);
    return 0;
}
```                                                                 | ```python
print("Valeur de a :", a)
```       |
| **Condition**             | Exécuter un bloc de code si une condition est vraie.                                               | `si a > 0 alors écrire("Positif")` | ```c
#include <stdio.h>
int main() {
    int a = 10;
    if (a > 0) {
        printf("Positif\n");
    } else {
        printf("Négatif\n");
    }
    return 0;
}
```                                                                 | ```python
a = 10
if a > 0:
    print("Positif")
else:
    print("Négatif")
``` |
| **Boucle Tant Que**       | Répéter un bloc de code tant qu'une condition est vraie.                                           | `tant que a < 5 faire a ← a + 1`   | ```c
#include <stdio.h>
int main() {
    int a = 0;
    while (a < 5) {
        a++;
    }
    return 0;
}
```                                                                 | ```python
a = 0
while a < 5:
    a += 1
``` |
| **Boucle Pour**           | Répéter un bloc de code pour un nombre défini d'itérations.                                        | `pour i de 1 à 5 faire écrire(i)`  | ```c
#include <stdio.h>
int main() {
    for (int i = 1; i <= 5; i++) {
        printf("%d\n", i);
    }
    return 0;
}
```                                                                 | ```python
for i in range(1, 6):
    print(i)
``` |
| **Boucle avec Pas**       | Répéter un bloc de code en incrémentant par une valeur spécifique (pas).                           | `pour i de 1 à 10 par 2 faire`     | ```c
#include <stdio.h>
int main() {
    for (int i = 1; i <= 10; i += 2) {
        printf("%d\n", i);
    }
    return 0;
}
```                                                                 | ```python
for i in range(1, 11, 2):
    print(i)
``` |
| **Fonction**              | Regrouper un bloc de code sous un nom pour le réutiliser.                                          | `fonction somme(a, b) retourner a+b` | ```c
#include <stdio.h>
int somme(int a, int b) {
    return a + b;
}
int main() {
    int resultat = somme(5, 3);
    printf("Somme : %d\n", resultat);
    return 0;
}
```                                                                 | ```python
def somme(a, b):
    return a + b
resultat = somme(5, 3)
print("Somme :", resultat)
``` |

---

### **Améliorations apportées :**
1. **Code propre et bien formaté** : Les blocs de code sont maintenant correctement indentés et faciles à lire.
2. **Syntaxe Markdown** : Utilisation de blocs de code (```) pour une meilleure présentation.
3. **Alignement du tableau** : Les colonnes sont alignées pour une meilleure lisibilité.
4. **Exemples clairs** : Chaque exemple est concis et illustre parfaitement le concept.

---

### **Comment utiliser ce tableau :**
- **Pour les débutants** : Comparez les concepts algorithmiques avec leur implémentation en C et Python.
- **Pour les développeurs** : Utilisez-le comme référence rapide pour traduire un concept d'un langage à un autre.
- **Pour les enseignants** : Exploitez-le comme support pédagogique pour expliquer les bases de la programmation.

---
