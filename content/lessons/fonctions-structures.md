---
title: Fonctions et structures de données
description: Concevoir des fonctions réutilisables et manipuler listes, dictionnaires, ensembles.
difficulty: débutant
estimatedTime: 40 min
keywords: [programmation, fonctions, listes, dictionnaires, ensembles]
---

# Objectifs d'apprentissage
- Définir et appeler des fonctions avec paramètres et valeur de retour
- Manipuler listes, dictionnaires et ensembles
- Comprendre portée des variables et modularité

# Contenu

## 1. Fonctions
```pseudo
function somme(liste) {
  let s = 0
  for (v in liste) {
    s = s + v
  }
  return s
}
```

## 2. Listes, dictionnaires, ensembles
- Liste: ordonnée, indexée
- Dictionnaire: `clé -> valeur`
- Ensemble: éléments uniques

```pseudo
let notes = [12, 15, 9]
let etudiant = { "nom": "Sara", "age": 20 }
let tags = {"ml", "web", "ai"}
```

# Exercices
1. Écrire une fonction `maxListe`.
2. Compter les occurrences de mots dans une phrase.
