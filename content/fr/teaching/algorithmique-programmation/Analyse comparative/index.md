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

| **Notion**               | **Description**                                                                                      | **Algorithmique**                  | **C**                                                                                       | **Python**                                    |
|--------------------------|----------------------------------------------------------------------------------------------------|------------------------------------|-------------------------------------------------------------------------------------------|-----------------------------------------------|
| **Déclaration de variables** | Réserver un espace mémoire pour stocker une valeur.                                              | `a : entier`                       | ```c\n#include <stdio.h>\nint main() {\n    int a;\n    return 0;\n}\n```                  | ```python\na = 0```                           |
| **Affectation**           | Assigner une valeur à une variable.                                                                 | `a ← 10`                           | ```c\n#include <stdio.h>\nint main() {\n    int a;\n    a = 10;\n    return 0;\n}\n```     | ```python\na = 10```                          |
| **Constante**             | Valeur fixe qui ne peut pas être modifiée après déclaration.                                        | `PI ← 3.14`                        | ```c\n#include <stdio.h>\n#define PI 3.14\nint main() {\n    printf("%.2f", PI);\n    return 0;\n}\n``` | ```python\nPI = 3.14```                       |
| **Entrée utilisateur**    | Permet de lire une valeur fournie par l'utilisateur.                                               | `lire(a)`                          | ```c\n#include <stdio.h>\nint main() {\n    int a;\n    printf("Entrez un nombre : ");\n    scanf("%d", &a);\n    return 0;\n}\n``` | ```python\na = int(input("Entrez un nombre : "))``` |
| **Sortie**                | Afficher une valeur ou un message.                                                                 | `écrire(a)`                        | ```c\n#include <stdio.h>\nint main() {\n    int a = 10;\n    printf("Valeur de a : %d\\n", a);\n    return 0;\n}\n``` | ```python\nprint("Valeur de a :", a)```       |
| **Condition**             | Exécuter un bloc de code si une condition est vraie.                                               | `si a > 0 alors écrire("Positif")` | ```c\n#include <stdio.h>\nint main() {\n    int a = 10;\n    if (a > 0) {\n        printf("Positif\\n");\n    } else {\n        printf("Négatif\\n");\n    }\n    return 0;\n}\n``` | ```python\na = 10\nif a > 0:\n    print("Positif")\nelse:\n    print("Négatif")``` |
| **Boucle Tant Que**       | Répéter un bloc de code tant qu'une condition est vraie.                                           | `tant que a < 5 faire a ← a + 1`   | ```c\n#include <stdio.h>\nint main() {\n    int a = 0;\n    while (a < 5) {\n        a++;\n    }\n    return 0;\n}\n``` | ```python\na = 0\nwhile a < 5:\n    a += 1``` |
| **Boucle Pour**           | Répéter un bloc de code pour un nombre défini d'itérations.                                        | `pour i de 1 à 5 faire écrire(i)`  | ```c\n#include <stdio.h>\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        printf("%d\\n", i);\n    }\n    return 0;\n}\n``` | ```python\nfor i in range(1, 6):\n    print(i)``` |
| **Boucle avec Pas**       | Répéter un bloc de code en incrémentant par une valeur spécifique (pas).                           | `pour i de 1 à 10 par 2 faire`     | ```c\n#include <stdio.h>\nint main() {\n    for (int i = 1; i <= 10; i += 2) {\n        printf("%d\\n", i);\n    }\n    return 0;\n}\n``` | ```python\nfor i in range(1, 11, 2):\n    print(i)``` |
| **Fonction**              | Regrouper un bloc de code sous un nom pour le réutiliser.                                          | `fonction somme(a, b) retourner a+b` | ```c\n#include <stdio.h>\nint somme(int a, int b) {\n    return a + b;\n}\nint main() {\n    int resultat = somme(5, 3);\n    printf("Somme : %d\\n", resultat);\n    return 0;\n}\n``` | ```python\ndef somme(a, b):\n    return a + b\nresultat = somme(5, 3)\nprint("Somme :", resultat)``` |

---

## Explications

Ce tableau peut être utilisé pour :  
1. Aider les débutants à comprendre les concepts communs entre l’algorithmique et les langages de programmation.  
2. Faciliter la transition entre ces langages en visualisant les équivalences syntaxiques.  

Pour toute question ou clarification, n’hésitez pas à demander !
