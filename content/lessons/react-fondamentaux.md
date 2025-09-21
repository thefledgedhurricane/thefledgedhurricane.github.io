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

# Exercices
1. Un champ de recherche contrôlé avec filtrage de liste.
2. Un mini-compteur avec persistance dans `localStorage`.
