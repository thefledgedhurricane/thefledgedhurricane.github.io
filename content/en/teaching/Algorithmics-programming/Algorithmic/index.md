---
title: Introduction à l'Algorithmique pour Débutants
summary: Un cours progressif et pratique pour apprendre les bases de l'algorithmique, structurer des solutions logiques et résoudre des problèmes étape par étape.
date: 2024-12-18
type: docs
tags:
  - Algorithmique
  - Débutant
  - Logique
  - Programmation
image:
  caption: "Illustration des bases de l'algorithmique pour résoudre des problèmes logiques."
---

### Objectifs  
À la fin de ce cours, les étudiants seront capables de :  
1. **Comprendre les concepts fondamentaux de l’algorithmique** : séquence, conditions, et boucles.  
2. **Écrire des algorithmes simples** en utilisant des opérations unitaires comme lecture, écriture, calcul, et affectation.  
3. **Concevoir et représenter des algorithmes** avec des pseudocodes et des diagrammes de flux.  
4. **Appliquer des structures de contrôle logiques** pour résoudre des problèmes simples.  
5. **Découvrir les bases de la complexité algorithmique** à travers des exemples pratiques.  

---

## Table des matières  

1. **Introduction à l'algorithmique**  
   - Qu'est-ce qu'un algorithme ?  
   - Importance de l’algorithmique en programmation.  

2. **Les opérations unitaires de base**  
   - Lecture (entrée).  
   - Écriture (sortie).  
   - Calculs simples (addition, multiplication, etc.).  
   - Affectation (Mémorisation)
3. **Structuration logique d’un algorithme**  
   - Séquences : exécution d’instructions dans un ordre logique.  
   - Conditions : prise de décisions avec "Si...Alors...Sinon".  
   - Boucles : répétition avec "Pour" et "Tant que".  

4. **Conception d’un algorithme**  
   - Écriture en pseudocode : une méthode simple et universelle.  
   - Représentation graphique avec des diagrammes de flux.  

5. **Exemples d’algorithmes courants**  
   - Recherche linéaire : trouver un élément dans une liste.  
   - Calcul de la factorielle d’un nombre.  
   - Série de Fibonacci : résoudre des problèmes récurrents.  

6. **Introduction à la complexité algorithmique**  
   - Comprendre la notion de Big-O.  
   - Comparer l’efficacité de différents algorithmes simples.  

7. **Projet final : Résoudre un problème réel**  
   - Écrire un algorithme pour calculer le PGCD (plus grand commun diviseur).  
   - Utiliser les concepts appris pour structurer une solution complète.

---

Compris ! Reprenons les bases de manière progressive et **dans un ordre logique**, adapté à quelqu’un qui n’a jamais fait d’algorithmique. Voici un plan qui suit un raisonnement simple et clair, étape par étape.

---

# Introduction à l’Algorithmique : Bases pour Débutants Absolus  

## Objectifs :  
- Comprendre ce qu’est un algorithme.  
- Manipuler les opérations unitaires simples.  
- Structurer une suite d’instructions logiques.  
- Résoudre des problèmes simples avec des algorithmes.

---

## 1. Qu’est-ce qu’un algorithme ?  

Un **algorithme** est une suite d’**instructions claires et précises** permettant de résoudre un problème ou de réaliser une tâche.  

> Imaginez une recette de cuisine :  
> - Chaque étape (prendre un ingrédient, le mélanger, le cuire) est une instruction.  
> - La recette entière est un algorithme, qui décrit comment obtenir un plat à partir d’ingrédients.  

---

### Caractéristiques d’un algorithme :  
1. **Clarté** : Les instructions doivent être faciles à comprendre.  
2. **Finitude** : L’algorithme doit se terminer après un certain nombre d’étapes.  
3. **Précision** : Chaque étape doit être réalisable sans ambiguïté.  

---

## 2. Les opérations de base (opérations unitaires)  

Un algorithme est composé d’**opérations simples**. Ces opérations peuvent être classées en trois catégories principales :  

### **2.1 Lecture (entrée)**  
L’algorithme demande une information à l’utilisateur ou au système.  

**Exemple :**  
- Demander un nombre à l’utilisateur : "Entrez un nombre".  
- L’algorithme attend que l’utilisateur saisisse une valeur.

---

### **2.2 Écriture (sortie)**  
L’algorithme donne un résultat ou une information à l’utilisateur.  

**Exemple :**  
- Afficher : "Le résultat est 10".  

---

### **2.3 Calcul (traitement)**  
L’algorithme effectue un calcul ou une opération sur des données.  

**Exemples :**  
- Additionner deux nombres : `A + B`.  
- Multiplier deux nombres : `A * B`.  

---

### **2.4 Affectation (mémorisation)**  
Attribuer une valeur à une variable (une "boîte" où l’on stocke une donnée).  

**Exemple :**  
- Dire que `C = A + B`, où `C` contient le résultat de l’addition.  

---

## 3. Exemple simple : Addition de deux nombres  

Voici un algorithme qui demande deux nombres, les additionne et affiche le résultat.

### En langage courant :  
1. Demander un premier nombre (`A`).  
2. Demander un second nombre (`B`).  
3. Calculer la somme de `A` et `B`, et la stocker dans `S`.  
4. Afficher le résultat `S`.  

---

### Représentation en pseudocode :  
```text
Début  
   Lire A  
   Lire B  
   S ← A + B  
   Écrire "La somme est :", S  
Fin  
```

---

### Exemple avec des valeurs :  
1. L’utilisateur entre `A = 3`.  
2. L’utilisateur entre `B = 5`.  
3. L’algorithme calcule `S = 3 + 5 = 8`.  
4. L’algorithme affiche : "La somme est : 8".  

---

## 4. Structuration logique : Ordre d’exécution  

Les algorithmes doivent suivre une **logique claire et séquentielle**. Les opérations sont exécutées dans un ordre précis :  

1. **Initialisation** : Déclarer et affecter les valeurs initiales si nécessaire.  
2. **Lecture des données** : Récupérer les informations nécessaires.  
3. **Traitement** : Effectuer les calculs ou la logique.  
4. **Écriture des résultats** : Afficher ou enregistrer les résultats.  

---

## 5. Exercice guidé : Calculer l’aire d’un rectangle  

### Problème :  
Écrire un algorithme pour calculer l’aire d’un rectangle. L’utilisateur fournit la longueur et la largeur.  

---

### Étapes logiques :  
1. Demander la longueur.  
2. Demander la largeur.  
3. Calculer l’aire : `Aire = Longueur * Largeur`.  
4. Afficher l’aire.

---

### Pseudocode :  
```text
Début  
   Lire Longueur  
   Lire Largeur  
   Aire ← Longueur * Largeur  
   Écrire "L'aire du rectangle est :", Aire  
Fin  
```

---

### Test avec des valeurs :  
1. Longueur = 5, Largeur = 3.  
2. Aire = 5 × 3 = 15.  
3. Résultat affiché : "L'aire du rectangle est : 15".

---

## 6. Les blocs logiques (séquentiel, conditionnel, répétitif)  

Pour aller plus loin, introduisons les trois blocs logiques fondamentaux en algorithmique :  

### **6.1 Séquentiel**  
Les instructions sont exécutées l’une après l’autre, comme dans les exemples précédents.

---

### **6.2 Conditionnel (Si...Alors...Sinon)**  
L’algorithme prend une décision en fonction d’une condition.

**Exemple : Trouver si un nombre est pair ou impair.**

#### Pseudocode :  
```text
Début  
   Lire Nombre  
   Si Nombre mod 2 = 0 Alors  
      Écrire "Le nombre est pair"  
   Sinon  
      Écrire "Le nombre est impair"  
Fin  
```

---

### **6.3 Répétitif (Tant que, Pour)**  
L’algorithme répète une suite d’instructions jusqu’à ce qu’une condition soit remplie.

**Exemple : Afficher les nombres de 1 à 5.**

#### Pseudocode :  
```text
Début  
   Pour i allant de 1 à 5  
      Écrire i  
   Fin pour  
Fin  
```

---

## 7. Exercices pour s’entraîner  

1. Écrire un algorithme qui calcule la moyenne de trois nombres donnés.  
2. Écrire un algorithme qui affiche les 10 premiers nombres pairs.  
3. Écrire un algorithme qui convertit une température de Celsius en Fahrenheit.  

---

