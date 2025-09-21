---
title: React — composants et état
description: JSX, props, state, effets, hooks de base.
difficulty: intermédiaire
estimatedTime: 45 min
keywords: [react, composants, hooks]
---

# Objectifs d'apprentissage
- Créer des composants fonctionnels avec JSX
- Passer des props et gérer l’état local
- Utiliser `useEffect` pour des effets secondaires simples

# Contenu

## 1. Composants & props
```jsx
function Hello({ name }) {
  return <h1>Bonjour {name}</h1>
}
```

## 2. État & effets
```jsx
import { useState, useEffect } from 'react'

function Compteur() {
  const [n, setN] = useState(0)
  useEffect(() => { document.title = `n=${n}` }, [n])
  return <button onClick={() => setN(n+1)}>+1 ({n})</button>
}
```

Concepts:
- Lifting state up (remonter l’état au parent)
- Props drilling et alternatives (contexte)
- Hooks utiles: `useMemo`, `useCallback`

Mini-projet:
- Construire une liste filtrable (barre de recherche + tags), mémoriser les calculs coûteux avec `useMemo`.

# Exercices
1. Un champ de recherche contrôlé avec filtrage de liste.
2. Un mini-compteur avec persistance dans `localStorage`.
3. Bonus: composant `Tabs` avec état contrôlé.
