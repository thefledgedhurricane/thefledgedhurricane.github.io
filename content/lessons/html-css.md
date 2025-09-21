---
title: HTML & CSS essentiels
description: Balises sémantiques, layout, responsive et accessibilité.
difficulty: débutant
estimatedTime: 35 min
keywords: [html, css, responsive, accessibilité]
---

# Objectifs d'apprentissage
- Structurer une page avec HTML sémantique
- Styliser avec CSS (flexbox, grid)
- Comprendre les bonnes pratiques d’accessibilité

# Contenu

## 1. Structure sémantique
```html
<header>Titre</header>
<main>Contenu</main>
<footer>Pied</footer>
```

## 2. Layout avec Flexbox
```css
.container { display: flex; gap: 1rem; }
.col { flex: 1; }
```

## 3. Grid & Responsive
```css
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
}
```

Accessibilité:
- Utiliser balises sémantiques (`nav`, `main`, `footer`)
- Labels associés aux champs de formulaire (`label for`)
- Contrastes suffisants, focus visible
```css
@media (max-width: 640px) {
  .col { flex-basis: 100%; }
}
```

# Exercices
1. Créer une page avec header/nav/main/footer.
2. Disposer 3 colonnes en desktop, 1 en mobile.
3. Bonus: page de formulaire accessible (labels, aria, focus).
