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

Bonnes pratiques:
- Une fonction = une intention claire (nom explicite)
- Paramètres avec valeurs par défaut si pertinent
- Éviter les effets de bord (préférer retourner une nouvelle valeur)

## 2. Listes, dictionnaires, ensembles
- Liste: ordonnée, indexée
- Dictionnaire: `clé -> valeur`
- Ensemble: éléments uniques

```pseudo
let notes = [12, 15, 9]
let etudiant = { "nom": "Sara", "age": 20 }
let tags = {"ml", "web", "ai"}
```

Complexité (notions):
- Liste: accès O(1), insertion/suppression milieu O(n)
- Dictionnaire: accès/insertion amorti O(1)
- Ensemble: test d’appartenance O(1)

Immutabilité vs mutabilité: comprendre quand copier pour éviter des effets de bord.

## 3. Mini-projet: agrégateur de notes
Écrire un module avec:
- `ajouterNote(etudiant, note)`
- `moyenne(etudiant)`
- `topN(etudiants, n)`

# Exercices
1. Écrire une fonction `maxListe`.
2. Compter les occurrences de mots dans une phrase.
3. Implémenter un `dict` inversé: de `mot -> [indices]` dans un texte.
