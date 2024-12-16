---
title: Introduction à la Programmation Web avec HTML et CSS
summary: Un cours pratique et simplifié pour apprendre à créer des pages web avec HTML et CSS.
date: 2024-12-16
type: docs
tags:
  - HTML
  - CSS
  - Programmation Web
  - Débutant
image:
  caption: 'Illustration des bases de la programmation web avec HTML et CSS.'
---

### Objectifs 
À la fin de ce cours, les étudiants seront capables de :  
1. **Comprendre les concepts fondamentaux du web** : Structure, front-end, et back-end.  
2. **Créer une page web simple** en utilisant HTML pour structurer le contenu et CSS pour le styliser.  
3. **Utiliser des balises HTML** et des propriétés CSS de base pour concevoir des sites fonctionnels.  
4. **Appliquer les bonnes pratiques** dans l'organisation du code et respecter les normes du développement web.  
5. **Explorer l'impact de HTML et CSS** dans des projets web réels à travers des exemples pratiques.

---

## Table des matières

1. **Introduction générale au développement web**  
   - Qu'est-ce que le développement web ?  
   - Différence entre front-end et back-end.  

2. **Les bases de HTML : Structure du contenu web**  
   - Introduction au HTML.  
   - Comprendre les balises et attributs.  
   - Création d’une structure de base : `<html>`, `<head>`, `<body>`.  

3. **Les balises HTML essentielles**  
   - Titres et paragraphes : `<h1>` à `<h6>`, `<p>`.  
   - Liens et images : `<a>`, `<img>`.  
   - Listes : `<ul>`, `<ol>`, `<li>`.  
   - Tables : `<table>`, `<tr>`, `<td>`.  
   - Formulaires : `<form>`, `<input>`, `<button>`.  

4. **Introduction à CSS : La mise en forme du web**  
   - Qu'est-ce que CSS et pourquoi l'utiliser ?  
   - Les sélecteurs CSS : Types, classes, IDs.  
   - Ajout de styles avec CSS : Propriétés de base (couleurs, polices, marges, etc.).  

5. **Créer une page web complète**  
   - Développement d’une page de présentation personnelle.  
   - Mise en page simple : Structure, texte, images et liens.  

6. **Bonnes pratiques en programmation web**  
   - Organisation et lisibilité du code.  
   - Introduction au responsive design (bases).  
   - Respect des standards web et accessibilité.  

7. **Projet final : Votre première page web !**  
   - Mise en pratique des concepts appris pour développer une page web complète.
# 1. Introduction générale au développement web

## Qu'est-ce que le développement web ?  
Le développement web désigne le processus de création et de maintenance des sites ou applications web.  
Cela inclut plusieurs étapes, comme :  
- La **conception** : Penser à l'apparence et à la structure du site.  
- Le **codage** : Utiliser des langages comme HTML, CSS, et JavaScript pour construire le site.  
- La **maintenance** : Corriger les erreurs et mettre à jour le contenu.  

Un site web est composé de plusieurs éléments :  
1. **Structure** : Organisée avec HTML (HyperText Markup Language).  
2. **Style** : Apporté par CSS (Cascading Style Sheets).  
3. **Interactivité** : Ajoutée grâce à JavaScript.  

En résumé, un développeur web transforme des idées en des sites accessibles via un navigateur comme Google Chrome ou Firefox.  

---

## Différence entre front-end et back-end  

### **Front-end (Développement côté client)**  
Le front-end concerne tout ce que l'utilisateur voit et avec quoi il interagit directement :  
- Les **couleurs**, **polices**, **boutons**, et **images** visibles sur la page.  
- Créé avec :  
  - **HTML** : Pour la structure.  
  - **CSS** : Pour la mise en forme.  
  - **JavaScript** : Pour l'interactivité (menus déroulants, sliders, etc.).  

> **Exemple** : Lorsque vous cliquez sur un bouton "Ajouter au panier" dans un site e-commerce, c'est une partie front-end qui répond.  

### **Back-end (Développement côté serveur)**  
Le back-end gère tout ce qui se passe en coulisses :  
- Le stockage des données dans des **bases de données**.  
- La gestion des demandes utilisateur (comme vérifier si un utilisateur est bien connecté).  
- Créé avec des langages comme **PHP**, **Python**, ou **Node.js**.  

> **Exemple** : Quand vous vous connectez à un site, le back-end vérifie votre identifiant et mot de passe dans une base de données.  

---

# 2. Les bases de HTML : Structure du contenu web

## Introduction au HTML  
HTML (HyperText Markup Language) est le langage de base utilisé pour structurer une page web.  
Il agit comme le **squelette** d'un site web, indiquant au navigateur ce qui doit apparaître et dans quel ordre.  

- Un fichier HTML contient des **balises** (tags) qui définissent chaque élément, comme les titres, paragraphes, images, ou liens.  
- Les fichiers HTML ont une extension **`.html`**, comme : `index.html`.  

> **Exemple simple** :  
Un fichier HTML affiche le texte suivant :  
"Bienvenue sur mon site !" dans un navigateur.  

Voici comment cela est écrit en HTML :  
```html
<!DOCTYPE html>
<html>
    <head>
        <title>Mon Site</title>
    </head>
    <body>
        <h1>Bienvenue sur mon site !</h1>
    </body>
</html>
```

## Comprendre les balises et attributs

### Balises HTML  
Les balises HTML sont des mots-clés entourés de crochets `< >` qui définissent les éléments du contenu.

- Chaque balise commence par une **balise ouvrante** `<balise>` et finit par une **balise fermante** `</balise>`.  
- **Exemple** : `<p>` pour commencer un paragraphe, et `</p>` pour le terminer.

---

### Attributs HTML  
Les attributs ajoutent des informations ou des propriétés aux balises. Ils sont placés à l'intérieur de la balise ouvrante.

- **Exemple** : Ajouter une image avec une balise `<img>` et des attributs `src` (source) et `alt` (texte alternatif).  
  ```html
  <img src="image.jpg" alt="Description de l'image">
  ```

---

## Création d'une structure de base : `<html>`, `<head>`, `<body>`  

Un fichier HTML suit une structure standard. Voici les **éléments principaux** :  

1. **`<!DOCTYPE html>`** : Indique que le document est écrit en HTML5 (la version moderne de HTML).  
2. **`<html>`** : Enveloppe principale de tout le contenu.  
3. **`<head>`** : Contient des informations invisibles pour l'utilisateur mais importantes pour le navigateur (comme le titre et les liens vers des fichiers CSS).  
4. **`<body>`** : Contient tout ce qui sera visible sur la page.  

---

### Exemple d'une structure HTML complète  

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Exemple de page HTML</title>
    </head>
    <body>
        <h1>Bienvenue</h1>
        <p>Ceci est un paragraphe simple dans une page HTML.</p>
    </body>
</html>
```

Dans cet exemple :  
- La page a un **titre** "Exemple de page HTML" visible dans l'onglet du navigateur.  
- La section `<body>` contient un **titre** (`<h1>`) et un **paragraphe** (`<p>`).
