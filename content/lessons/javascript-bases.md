---
title: JavaScript de base
description: DOM, événements, fetch API, JSON.
difficulty: débutant
estimatedTime: 40 min
keywords: [javascript, dom, fetch, json]
---

# Objectifs d'apprentissage
- Sélectionner et manipuler des éléments du DOM
- Gérer des événements utilisateurs
- Récupérer des données avec fetch et parser du JSON

# Contenu

## 1. DOM & événements
```html
<button id="btn">Cliquez</button>
<script>
  document.getElementById('btn').addEventListener('click', () => alert('Hi'))
</script>
```

## 2. Fetch API
```js
fetch('https://api.example.com/data')
  .then(r => r.json())
  .then(data => console.log(data))
```

# Exercices
1. Intercepter la soumission d’un formulaire et afficher les données.
2. Consommer une API publique et afficher une liste.
