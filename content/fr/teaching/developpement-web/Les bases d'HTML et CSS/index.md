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

Voici la partie en Markdown avec des explications très détaillées :  

## Les balises HTML essentielles  

Les balises HTML essentielles permettent de structurer et d'enrichir le contenu d'une page web. Voici une explication détaillée de ces balises :  

---

## Titres et paragraphes  

### **Titres (`<h1>` à `<h6>`)**  
Les balises de titre sont utilisées pour créer des en-têtes sur une page.  
- `<h1>` est le titre principal (le plus important).  
- `<h6>` est le titre le moins important.  

**Exemple :**  
```html
<h1>Titre principal</h1>
<h2>Sous-titre niveau 2</h2>
<h3>Sous-titre niveau 3</h3>
```

Rendu :  
- Titre principal (gros et gras).  
- Sous-titre niveau 2 (moins grand).  
- Sous-titre niveau 3 (encore plus petit).  

### **Paragraphe (`<p>`)**  
La balise `<p>` est utilisée pour écrire des paragraphes.  

**Exemple :**  
```html
<p>Ceci est un paragraphe simple en HTML.</p>
<p>Un autre paragraphe pour expliquer le contenu.</p>
```

Rendu :  
Le contenu est affiché sous forme de texte dans des blocs distincts.  

---

## Liens et images  

### **Liens (`<a>`)**  
La balise `<a>` permet de créer des liens cliquables.  
- L'attribut `href` (hypertext reference) spécifie la destination du lien.  

**Exemple :**  
```html
<a href="https://www.google.com">Visitez Google</a>
```

Rendu :  
Un texte cliquable "Visitez Google" renvoie à https://www.google.com.  

### **Images (`<img>`)**  
La balise `<img>` insère des images dans une page.  
- L'attribut `src` (source) indique l'emplacement de l'image.  
- L'attribut `alt` fournit une description en cas de problème d'affichage.  

**Exemple :**  
```html
<img src="photo.jpg" alt="Une photo descriptive">
```

Rendu :  
Une image est affichée avec "Une photo descriptive" en texte alternatif.  

---

## Listes  

### **Listes non ordonnées (`<ul>` et `<li>`)**  
Les balises `<ul>` (unordered list) et `<li>` (list item) créent une liste à puces.  

**Exemple :**  
```html
<ul>
    <li>Élément 1</li>
    <li>Élément 2</li>
    <li>Élément 3</li>
</ul>
```

Rendu :  
- Élément 1  
- Élément 2  
- Élément 3  

### **Listes ordonnées (`<ol>` et `<li>`)**  
Les balises `<ol>` (ordered list) et `<li>` créent une liste numérotée.  

**Exemple :**  
```html
<ol>
    <li>Premier élément</li>
    <li>Deuxième élément</li>
    <li>Troisième élément</li>
</ol>
```

Rendu :  
1. Premier élément  
2. Deuxième élément  
3. Troisième élément  

---

## Tables  

Les balises de table structurent les données sous forme de tableau.  
- `<table>` : Crée une table.  
- `<tr>` (table row) : Définit une rangée.  
- `<td>` (table data) : Définit une cellule.  
- `<th>` (table header) : Définit un en-tête de colonne ou de ligne.  

**Exemple :**  
```html
<table border="1">
    <tr>
        <th>Nom</th>
        <th>Âge</th>
    </tr>
    <tr>
        <td>Ali</td>
        <td>25</td>
    </tr>
    <tr>
        <td>Sara</td>
        <td>22</td>
    </tr>
</table>
```

Rendu :  

| Nom   | Âge |  
|-------|-----|  
| Ali   | 25  |  
| Sara  | 22  |  

---

## Formulaires  

Les balises de formulaire permettent de collecter des informations auprès des utilisateurs.  

### **Formulaire (`<form>`)**  
La balise `<form>` contient les champs de saisie et les boutons.  
- L'attribut `action` définit la destination des données saisies.  
- L'attribut `method` définit comment les données sont envoyées (`GET` ou `POST`).  

### **Champs de saisie (`<input>`)**  
La balise `<input>` permet de saisir des données.  
- L'attribut `type` définit le type de champ (texte, email, mot de passe, etc.).  

**Exemple :**  
```html
<form action="/submit" method="POST">
    <label for="nom">Nom :</label>
    <input type="text" id="nom" name="nom">
    <br>
    <label for="email">Email :</label>
    <input type="email" id="email" name="email">
    <br>
    <button type="submit">Envoyer</button>
</form>
```

Rendu :  
Un formulaire avec deux champs (nom et email) et un bouton pour envoyer les données.  

---

Ces balises essentielles permettent de créer des pages web structurées et interactives. Avec leur maîtrise, vous pouvez concevoir des sites simples mais fonctionnels.
Voici une version détaillée en Markdown pour l’introduction à CSS :  

# Introduction à CSS : La mise en forme du web  

CSS (Cascading Style Sheets) est un langage utilisé pour mettre en forme les pages HTML. Il permet de contrôler l'apparence visuelle d'une page web, comme les couleurs, les polices, les espacements et la disposition des éléments.

---

## Qu'est-ce que CSS et pourquoi l'utiliser ?  

### **Définition de CSS**  
CSS est un langage de style qui s'associe au HTML pour définir la présentation des éléments sur une page web.  
- HTML structure le contenu (exemple : un titre, un paragraphe, une image).  
- CSS applique des styles (exemple : couleur du texte, alignement, marges).  

### **Pourquoi utiliser CSS ?**  
1. **Séparation de la structure et de la présentation**  
   - Le HTML s'occupe du contenu et de la structure.  
   - Le CSS gère l'apparence visuelle.  

2. **Consistance et réutilisation**  
   - Les styles CSS peuvent être appliqués à plusieurs pages d'un site pour une apparence cohérente.  

3. **Maintenance facilitée**  
   - En modifiant un fichier CSS, on peut mettre à jour l'apparence de plusieurs pages web en même temps.  

4. **Création de designs modernes et professionnels**  
   - CSS offre des outils pour créer des designs complexes : grilles, animations, transitions, etc.  

**Exemple sans CSS :**  
```html
<h1>Bienvenue</h1>
<p>Ceci est un paragraphe simple.</p>
```

Rendu : Texte brut sans mise en forme.

**Exemple avec CSS :**  
```html
<style>
    h1 {
        color: blue;
        text-align: center;
    }
    p {
        font-size: 18px;
        line-height: 1.5;
    }
</style>
<h1>Bienvenue</h1>
<p>Ceci est un paragraphe simple.</p>
```

Rendu :  
- Le titre est centré et en bleu.  
- Le paragraphe est plus lisible grâce à une taille et un espacement ajustés.

---

## Les sélecteurs CSS : Types, classes, IDs  

### **1. Sélecteur par élément**  
Le sélecteur le plus simple cible les balises HTML directement.  

**Exemple :**  
```css
h1 {
    color: red;
}
p {
    font-size: 16px;
}
```
- Applique du rouge à tous les `<h1>`.  
- Définit une taille de 16 pixels pour tous les `<p>`.

---

### **2. Sélecteur par classe**  
Les classes sont définies avec un point (`.`) et peuvent être appliquées à plusieurs éléments.  

**Exemple dans le CSS :**  
```css
.important {
    color: green;
    font-weight: bold;
}
```

**Exemple dans le HTML :**  
```html
<p class="important">Ce texte est important.</p>
<p>Ceci est un texte standard.</p>
```

Rendu :  
- Le premier paragraphe est en vert et gras.  
- Le second paragraphe reste normal.  

---

### **3. Sélecteur par ID**  
Les IDs, définis avec un dièse (`#`), ciblent un seul élément unique.  

**Exemple dans le CSS :**  
```css
#header {
    background-color: lightblue;
    padding: 20px;
}
```

**Exemple dans le HTML :**  
```html
<div id="header">Ceci est un en-tête unique.</div>
```

Rendu :  
- L’arrière-plan de l’en-tête est bleu clair avec un espacement de 20 pixels autour du texte.  

---

### **Résumé : Quand utiliser quoi ?**  
- **Élément** : Quand le style doit s’appliquer à toutes les balises d’un même type.  
- **Classe** : Quand un style doit être partagé par plusieurs éléments spécifiques.  
- **ID** : Quand un style doit être unique à un seul élément.  

---

## Ajout de styles avec CSS : Propriétés de base  

CSS offre une grande variété de propriétés pour modifier l'apparence des éléments HTML. Voici les plus courantes :  

### **1. Couleurs**  
- **`color`** : Définit la couleur du texte.  
- **`background-color`** : Définit la couleur de fond.  

**Exemple :**  
```css
h1 {
    color: blue;
    background-color: yellow;
}
```

Rendu :  
- Le texte des titres `<h1>` est bleu avec un arrière-plan jaune.  

---

### **2. Polices de caractère**  
- **`font-family`** : Définit la police.  
- **`font-size`** : Définit la taille du texte.  
- **`font-weight`** : Définit l'épaisseur du texte (normal, bold, etc.).  

**Exemple :**  
```css
p {
    font-family: Arial, sans-serif;
    font-size: 18px;
    font-weight: bold;
}
```

Rendu :  
- Les paragraphes utilisent la police Arial, une taille de 18 pixels, et un texte en gras.  

---

### **3. Marges et espacements**  
- **`margin`** : Définit l'espace autour d'un élément.  
- **`padding`** : Définit l'espace à l'intérieur d'un élément, entre le contenu et sa bordure.  

**Exemple :**  
```css
div {
    margin: 20px;
    padding: 10px;
    background-color: lightgrey;
}
```

Rendu :  
- Le bloc `<div>` a un espace de 20 pixels autour de lui et 10 pixels entre son contenu et sa bordure.  

---

### **4. Alignement et texte**  
- **`text-align`** : Définit l'alignement du texte (gauche, droite, centré).  
- **`line-height`** : Définit l'espacement vertical entre les lignes de texte.  

**Exemple :**  
```css
h1 {
    text-align: center;
}
p {
    line-height: 1.8;
}
```

Rendu :  
- Le titre `<h1>` est centré.  
- Les paragraphes ont un espacement vertical augmenté, facilitant la lecture.  

---

Avec CSS, il est possible de transformer une page HTML basique en un site professionnel, esthétique et fonctionnel. Ces propriétés de base constituent les fondations essentielles de tout design web.
