---
title: Introduction à la Programmation avec Python
summary: Un cours progressif et pratique pour apprendre les bases de la programmation en Python, écrire des scripts simples et résoudre des problèmes avec des concepts fondamentaux.
date: 2024-12-18
type: docs
tags:
  - Python
  - Débutant
  - Programmation
  - Logique
image:
  caption: "Illustration des bases de la programmation Python pour les débutants."
---

### Objectifs  
À la fin de ce cours, les étudiants seront capables de :  
1. **Comprendre les concepts fondamentaux de la programmation** : variables, types de données, et structures de contrôle.  
2. **Écrire des scripts simples en Python** pour résoudre des problèmes basiques.  
3. **Manipuler les structures de données essentielles** comme les listes, tuples, et dictionnaires.  
4. **Appliquer les principes de la programmation modulaire** en utilisant des fonctions.  
5. **Déboguer et tester** des programmes Python pour garantir leur bon fonctionnement.  

---

## Table des matières  

1. **Introduction à Python**  
   - Qu'est-ce que Python ?  
   - Pourquoi apprendre Python ?  

2. **Les bases de Python : Syntaxe et variables**  
   - Syntaxe de base : indentation, commentaires.  
   - Déclaration et affectation de variables.  
   - Types de données : nombres, chaînes, booléens.  

3. **Structures de contrôle**  
   - Conditions : `if`, `elif`, `else`.  
   - Boucles : `for`, `while`.  

4. **Manipulation des données**  
   - Les listes et tuples.  
   - Les dictionnaires.  
   - Opérations sur les chaînes de caractères.  

5. **Les fonctions en Python**  
   - Définir et appeler une fonction.  
   - Arguments, retour de valeurs.  
   - Utilisation de modules intégrés.  

6. **Introduction aux fichiers et exceptions**  
   - Lire et écrire dans un fichier.  
   - Gestion des erreurs avec `try` et `except`.  

7. **Projet final : Un mini-programme en Python**  
   - Créer un programme interactif en utilisant les concepts appris.  

---

---

# 1. **Introduction à Python**

### Qu’est-ce que Python ?
Python est un langage de programmation de haut niveau, connu pour sa **syntaxe simple**, sa **lisibilité** et sa **polyvalence**. Il est largement utilisé dans le développement web, l’analyse de données, l’intelligence artificielle, et bien plus.

### Pourquoi apprendre Python ?
- **Simplicité** : Il est adapté aux débutants grâce à sa syntaxe proche du langage naturel.
- **Polyvalence** : Utilisé dans des domaines variés comme le développement web, la science des données, ou la création de jeux.
- **Large communauté** : Accès à de nombreuses bibliothèques, tutoriels, et forums pour résoudre vos problèmes.

### Premier programme en Python
Voici un script Python classique pour afficher un message dans le terminal :
```python
print("Bonjour le monde !")
```

---

# 2. **Les bases de Python : Syntaxe et Variables**

### **2.1 Syntaxe de base**
#### Les règles essentielles :
- **Indentation** : Les blocs de code sont définis par des espaces (par défaut 4 espaces).
- **Commentaires** : Utilisez `#` pour ajouter des notes dans votre code.

**Exemple :**
```python
# Ceci est un commentaire
print("Ceci est une ligne de code")
```

---

### **2.2 Déclaration et affectation de variables**
Une variable est un conteneur pour stocker une donnée. Python déduit automatiquement le type de la donnée affectée.

**Exemple :**
```python
age = 30              # Entier
nom = "Alice"         # Chaîne de caractères
temperature = 25.5    # Nombre à virgule flottante
actif = True          # Booléen
```

**Types de base :**
| Type          | Exemple         |
|---------------|-----------------|
| Entier        | `10`            |
| Flottant      | `19.99`         |
| Chaîne        | `"Bonjour"`     |
| Booléen       | `True`, `False` |

---

# 3. **Structures de contrôle**

### **3.1 Conditions (if, elif, else)**

Les conditions permettent de prendre des décisions dans un programme.

**Exemple : Trouver si un nombre est positif ou négatif**
```python
nombre = int(input("Entrez un nombre : "))

if nombre > 0:
    print("Positif")
elif nombre < 0:
    print("Négatif")
else:
    print("Nul")
```

---

### **3.2 Boucles**

#### La boucle `for`
Idéale pour parcourir des séquences (listes, plages de nombres).

**Exemple :**
```python
for i in range(5):  # Parcourt les nombres de 0 à 4
    print("Itération :", i)
```

#### La boucle `while`
Répète des instructions tant qu’une condition est vraie.

**Exemple :**
```python
compteur = 0
while compteur < 3:
    print("Compteur :", compteur)
    compteur += 1  # Incrémente de 1
```

---

# 4. **Manipulation des données**

### **4.1 Listes**
Les listes sont des collections d’éléments modifiables.

**Exemple :**
```python
fruits = ["pomme", "banane", "cerise"]
print(fruits[0])  # Affiche "pomme"
fruits.append("orange")  # Ajoute "orange"
```

---

### **4.2 Dictionnaires**
Les dictionnaires stockent des paires clé-valeur.

**Exemple :**
```python
personne = {"nom": "Alice", "age": 25}
print(personne["nom"])  # Affiche "Alice"
```

---

# 5. **Les fonctions en Python**

Les fonctions permettent de regrouper du code réutilisable.

### Définir et appeler une fonction
**Exemple :**
```python
def saluer(nom):
    print(f"Bonjour, {nom} !")

saluer("Alice")  # Appelle la fonction
```

---

### Utiliser des modules intégrés
Python propose des modules pour des tâches spécifiques.

**Exemple : Importation du module math**
```python
import math
resultat = math.sqrt(16)  # Calcule la racine carrée de 16
print(resultat)  # Affiche 4.0
```

---

# 6. **Introduction aux fichiers et exceptions**

### Lire et écrire dans un fichier
#### Écriture :
```python
with open("example.txt", "w") as fichier:
    fichier.write("Bonjour le monde !")
```

#### Lecture :
```python
with open("example.txt", "r") as fichier:
    contenu = fichier.read()
    print(contenu)
```

---

### Gestion des erreurs
Les exceptions permettent de gérer les erreurs dans le code.

**Exemple :**
```python
try:
    nombre = int(input("Entrez un nombre : "))
    print(f"Vous avez entré : {nombre}")
except ValueError:
    print("Ce n'est pas un nombre valide.")
```

---

# 7. **Projet final : Créer un mini-programme**

### Objectif
Créer un programme interactif qui :  
- Demande à l’utilisateur son **nom** et son **âge**.  
- Calcule l’année où il aura **100 ans**.  
- Affiche un message personnalisé.

### Solution :
**Code complet :**
```python
# Demander les informations à l'utilisateur
nom = input("Entrez votre nom : ")
age = int(input("Entrez votre âge : "))

# Calculer l'année où l'utilisateur aura 100 ans
annee_actuelle = 2024
annee_centenaire = annee_actuelle + (100 - age)

# Afficher le résultat
print(f"Bonjour, {nom} ! Vous aurez 100 ans en l'année {annee_centenaire}.")
```

### Étapes du projet :
1. **Entrées utilisateur** : Collecter le nom et l’âge.  
2. **Traitement** : Calculer l’année où l’utilisateur aura 100 ans.  
3. **Sortie** : Afficher un message contenant le résultat.  

---

Avec cette progression, vous maîtriserez les bases de Python et serez prêt(e) à aborder des concepts avancés, comme la programmation orientée objet et les bibliothèques spécialisées.