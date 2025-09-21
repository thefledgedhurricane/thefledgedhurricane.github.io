---
title: Variables, types et contrôle de flux
description: Comprendre les bases des langages de programmation — variables, types, conditions et boucles.
difficulty: débutant
estimatedTime: 35 min
keywords: [programmation, variables, types, conditions, boucles]
---

# Objectifs d'apprentissage
- Déclarer et initialiser des variables de types simples
- Écrire des conditions (`if/else`) et des boucles (`for`, `while`)
- Comprendre les erreurs courantes (off-by-one, conditions toujours vraies/fausses)

# Contenu

## 1. Variables et types
- Entiers, flottants, booléens, chaînes de caractères
- Typage dynamique vs statique (aperçu)

```pseudo
let x = 10
let y = 3.14
let actif = true
let nom = "Ada"
```

## 2. Opérateurs et expressions
- Aritmétiques: `+ - * / %`
- Logiques: `&& || !`
- Comparaisons: `== != < <= > >=`

Astuce: la priorité des opérateurs peut surprendre. Utilisez des parenthèses pour lever l’ambiguïté.

## 3. Contrôle de flux

```pseudo
if (x > 5) {
  print("grand")
} else {
  print("petit")
}

for (i = 0; i < 5; i = i + 1) {
  print(i)
}
```

Pièges fréquents:
- Boucles infinies (incrément manquant ou condition toujours vraie)
- Tests de flottants avec `==` (précision limitée) → préférer une tolérance `|a-b| < epsilon`

## 4. Lecture/écriture et fonctions utilitaires
- Lire une entrée utilisateur et la convertir en nombre
- Afficher des résultats formatés (arrondi, padding)

## 5. Mini-projet: calculateur de statistiques simples
Écrire un programme qui:
1) Lit une liste de nombres
2) Calcule moyenne, min, max
3) Affiche un histogramme textuel (barres `#`)

# Exercices
1. Écrire un programme qui affiche les nombres pairs de 1 à 20.
2. Demander un âge et afficher majeur/mineur.
3. Bonus: générer un tableau de multiplication NxN.

# Références
- “Structure and Interpretation of Computer Programs” (SICP)
- “Automate the Boring Stuff with Python” (chapitres 1–3)
 - “Think Python” (chapitres 1–5)
