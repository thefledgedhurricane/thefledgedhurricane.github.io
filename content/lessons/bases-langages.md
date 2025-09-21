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

# Exercices
1. Écrire un programme qui affiche les nombres pairs de 1 à 20.
2. Demander un âge et afficher majeur/mineur.

# Références
- “Structure and Interpretation of Computer Programs” (SICP)
- “Automate the Boring Stuff with Python” (chapitres 1–3)
