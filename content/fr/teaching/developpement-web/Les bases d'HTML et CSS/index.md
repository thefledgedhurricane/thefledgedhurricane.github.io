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

Voici une version détaillée en Markdown pour créer une page web complète :  

# Créer une page web complète  

Dans cette section, nous allons développer une **page de présentation personnelle** avec une structure HTML simple et un style CSS basique. La page inclura du texte, des images et des liens.

---

## Développement d’une page de présentation personnelle  

### Étape 1 : La structure HTML  

Commençons par créer la structure HTML de base de notre page :  
- Un titre principal.  
- Une description personnelle.  
- Une image.  
- Un lien vers un réseau social ou un autre site.  

**Code HTML :**  
```html
<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ma Présentation</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <header>
            <h1>Bienvenue sur ma page personnelle</h1>
        </header>
        <main>
            <section>
                <h2>À propos de moi</h2>
                <p>Bonjour ! Je m'appelle [Votre Nom] et je suis passionné(e) par le développement web. J'aime créer des sites modernes et apprendre de nouvelles technologies.</p>
                <img src="profil.jpg" alt="Photo de profil" width="200">
            </section>
            <section>
                <h2>Me suivre</h2>
                <p>Retrouvez-moi sur mes réseaux sociaux :</p>
                <a href="https://www.linkedin.com" target="_blank">LinkedIn</a> | 
                <a href="https://www.twitter.com" target="_blank">Twitter</a>
            </section>
        </main>
        <footer>
            <p>&copy; 2024 [Votre Nom]. Tous droits réservés.</p>
        </footer>
    </body>
</html>
```

---

### Étape 2 : Mise en page avec CSS  

Ajoutons du style avec un fichier CSS pour améliorer l'apparence de la page :  
- Centrer les textes et les images.  
- Ajouter des couleurs pour rendre la page plus attrayante.  
- Styliser les liens pour qu'ils soient plus visibles.  

**Code CSS (styles.css) :**  
```css
/* Styles globaux */
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    background-color: #f4f4f9;
    color: #333;
    text-align: center;
}

/* En-tête */
header {
    background-color: #333;
    color: #fff;
    padding: 20px 0;
}

header h1 {
    margin: 0;
}

/* Section principale */
main {
    padding: 20px;
}

section {
    margin: 20px 0;
}

section img {
    border-radius: 50%;
    margin-top: 10px;
}

/* Liens */
a {
    color: #0066cc;
    text-decoration: none;
    font-weight: bold;
}

a:hover {
    color: #003399;
}

/* Pied de page */
footer {
    background-color: #333;
    color: #fff;
    padding: 10px 0;
    margin-top: 20px;
}
```

---

## Rendu final  

### **1. Structure visible de la page :**  
- **En-tête** : Un message de bienvenue.  
- **Corps** : Une section "À propos de moi" avec une image et une description. Une autre section avec des liens vers vos réseaux sociaux.  
- **Pied de page** : Une mention de copyright.  

### **2. Exemple visuel :**  

La page aura l'apparence suivante :  

```
-------------------------------------------------
|      Bienvenue sur ma page personnelle        |
-------------------------------------------------
| À propos de moi                               |
| Bonjour ! Je m'appelle [Votre Nom].           |
| (Photo de profil)                             |
-------------------------------------------------
| Me suivre                                    |
| Retrouvez-moi sur : LinkedIn | Twitter        |
-------------------------------------------------
|        © 2024 [Votre Nom].                   |
-------------------------------------------------
```

---

## Résumé  

En combinant HTML et CSS, vous pouvez créer une page web personnelle simple mais professionnelle. Cette page peut être étendue avec des fonctionnalités supplémentaires, comme des formulaires ou des animations, au fur et à mesure de votre progression en développement web.
Voici une version détaillée en Markdown pour les bonnes pratiques en programmation web :  

# Bonnes pratiques en programmation web  

Suivre des bonnes pratiques en programmation web garantit que votre code est clair, maintenable et conforme aux normes actuelles. Voici les principaux aspects à considérer :  

---

## Organisation et lisibilité du code  

### **1. Indentez votre code**  
L’indentation rend le code plus lisible pour vous et vos collègues. Chaque niveau de hiérarchie doit être correctement décalé.  

**Exemple (mauvais) :**  
```html
<html>
<head><title>Page web</title></head>
<body><h1>Titre</h1><p>Paragraphe</p></body>
</html>
```

**Exemple (correct) :**  
```html
<!DOCTYPE html>
<html>
    <head>
        <title>Page web</title>
    </head>
    <body>
        <h1>Titre</h1>
        <p>Paragraphe</p>
    </body>
</html>
```

### **2. Utilisez des commentaires**  
Ajoutez des commentaires pour expliquer les parties importantes ou complexes de votre code.  
- En HTML :  
  ```html
  <!-- Ceci est un commentaire -->
  ```
- En CSS :  
  ```css
  /* Style pour le bouton principal */
  ```

**Exemple :**  
```html
<!-- Section de présentation -->
<section>
    <h1>Bienvenue</h1>
    <p>Ceci est une section importante.</p>
</section>
```

### **3. Utilisez des noms significatifs pour vos classes et IDs**  
Choisissez des noms clairs et explicites pour identifier les éléments de votre page.  

**Exemple (mauvais) :**  
```html
<div class="div1"></div>
```

**Exemple (correct) :**  
```html
<div class="contenu-principal"></div>
```

---

## Introduction au responsive design (bases)  

Le responsive design garantit que votre site s'adapte à tous les écrans : ordinateurs, tablettes, et smartphones. Voici les bases :  

### **1. Utilisez la balise meta viewport**  
Ajoutez la balise suivante dans la section `<head>` pour indiquer que votre site doit s'adapter aux différentes tailles d'écran.  

**Exemple :**  
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### **2. Utilisez des unités relatives**  
Privilégiez les unités comme les pourcentages (`%`) ou `em` au lieu des pixels (`px`).  

**Exemple :**  
```css
/* Mauvais : largeur fixe */
.container {
    width: 960px;
}

/* Correct : largeur flexible */
.container {
    width: 80%;
}
```

### **3. Apprenez à utiliser les Media Queries**  
Les Media Queries permettent de définir des styles spécifiques pour certaines tailles d'écran.  

**Exemple :**  
```css
/* Styles par défaut */
body {
    font-size: 16px;
}

/* Styles pour les écrans de moins de 768 pixels */
@media (max-width: 768px) {
    body {
        font-size: 14px;
    }
}
```

### **4. Testez votre site sur différents appareils**  
Utilisez des outils comme l’inspecteur de votre navigateur pour simuler différents appareils et résolutions.  

---

## Respect des standards web et accessibilité  

### **1. Utilisez un code HTML valide**  
Validez votre code avec des outils comme le [W3C Validator](https://validator.w3.org/). Cela garantit que votre site respecte les standards du web.  

### **2. Ajoutez des descriptions aux images**  
Utilisez l’attribut `alt` pour fournir une description textuelle des images. Cela aide les personnes utilisant des lecteurs d'écran.  

**Exemple :**  
```html
<img src="chat.jpg" alt="Photo d'un chat noir assis sur un tapis.">
```

### **3. Rendez votre site navigable au clavier**  
Assurez-vous que tous les éléments interactifs (boutons, liens) sont accessibles via la touche **Tabulation** du clavier.  

**Exemple :**  
```html
<a href="page.html" tabindex="0">Lien accessible</a>
```

### **4. Utilisez des contrastes suffisants**  
Les couleurs de texte et d’arrière-plan doivent avoir un contraste élevé pour être lisibles par tous.  

**Exemple (mauvais contraste) :**  
```css
color: #aaa;
background-color: #ddd;
```

**Exemple (bon contraste) :**  
```css
color: #000;
background-color: #fff;
```

### **5. Ajoutez des balises sémantiques**  
Utilisez des balises HTML comme `<header>`, `<footer>`, et `<main>` pour améliorer la structure et l'accessibilité de votre site.  

**Exemple :**  
```html
<header>
    <h1>Titre du site</h1>
</header>
<main>
    <p>Contenu principal.</p>
</main>
<footer>
    <p>© 2024 Mon Site</p>
</footer>
```

---

## Résumé  

En suivant ces bonnes pratiques :  
1. Votre code sera clair, facile à maintenir et collaboratif.  
2. Votre site sera adapté à tous les écrans grâce au responsive design.  
3. Vous offrirez une meilleure expérience utilisateur, notamment pour les personnes ayant des besoins spécifiques en accessibilité.
Voici un fichier en Markdown très détaillé, conçu comme un projet guidé pour créer une première page web complète :  

# Projet final : Votre première page web !  

Dans ce projet guidé, vous allez créer une page web complète en appliquant tout ce que vous avez appris sur HTML et CSS. Cette page sera une **page de profil personnel** avec un design simple et responsive.

---

## Objectifs du projet  

1. Construire une page web en utilisant une structure HTML bien organisée.  
2. Appliquer des styles CSS pour améliorer l'apparence de la page.  
3. Rendre la page responsive pour qu'elle s'affiche correctement sur différents écrans.  

---

## Étape 1 : Structure de la page HTML  

Nous allons créer un fichier HTML qui contient :  
- Un **en-tête** avec un titre et un menu de navigation.  
- Une **section principale** avec une image de profil et une présentation personnelle.  
- Une **section de contact** avec des liens vers les réseaux sociaux.  
- Un **pied de page** avec des informations sur les droits d'auteur.  

**Code HTML :**  
```html
<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Page de Profil</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <!-- En-tête -->
        <header>
            <h1>Mon Profil</h1>
            <nav>
                <ul>
                    <li><a href="#about">À propos</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>

        <!-- Section principale -->
        <main>
            <section id="about">
                <h2>À propos de moi</h2>
                <img src="profil.jpg" alt="Photo de profil" class="profile-pic">
                <p>
                    Bonjour ! Je m'appelle [Votre Nom]. Je suis passionné(e) par le développement web 
                    et j'aime apprendre de nouvelles technologies. Cette page est ma première création
                    pour mettre en pratique mes connaissances en HTML et CSS.
                </p>
            </section>

            <!-- Section de contact -->
            <section id="contact">
                <h2>Me contacter</h2>
                <p>Vous pouvez me retrouver sur :</p>
                <ul>
                    <li><a href="https://www.linkedin.com" target="_blank">LinkedIn</a></li>
                    <li><a href="https://www.twitter.com" target="_blank">Twitter</a></li>
                    <li><a href="mailto:votreemail@example.com">Email</a></li>
                </ul>
            </section>
        </main>

        <!-- Pied de page -->
        <footer>
            <p>&copy; 2024 [Votre Nom]. Tous droits réservés.</p>
        </footer>
    </body>
</html>
```

---

## Étape 2 : Ajouter du style avec CSS  

Ajoutons maintenant un fichier CSS nommé **`styles.css`** pour styliser la page. Voici ce que nous allons faire :  
1. Appliquer une police agréable et des couleurs modernes.  
2. Centrer les éléments pour un design harmonieux.  
3. Ajouter des marges et des espacements pour une meilleure lisibilité.  

**Code CSS :**  
```css
/* Styles globaux */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f9f9f9;
    color: #333;
    line-height: 1.6;
}

/* En-tête */
header {
    background-color: #333;
    color: white;
    padding: 20px 0;
    text-align: center;
}

header h1 {
    margin: 0;
}

nav ul {
    list-style: none;
    padding: 0;
    margin: 10px 0;
    display: flex;
    justify-content: center;
    gap: 20px;
}

nav ul li {
    display: inline;
}

nav ul li a {
    color: white;
    text-decoration: none;
    font-weight: bold;
}

nav ul li a:hover {
    text-decoration: underline;
}

/* Section principale */
main {
    padding: 20px;
    text-align: center;
}

#about img.profile-pic {
    border-radius: 50%;
    width: 150px;
    margin: 20px 0;
}

/* Section de contact */
#contact ul {
    list-style: none;
    padding: 0;
}

#contact ul li {
    margin: 10px 0;
}

#contact ul li a {
    color: #0066cc;
    text-decoration: none;
}

#contact ul li a:hover {
    color: #003399;
}

/* Pied de page */
footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 10px 0;
    margin-top: 20px;
}
```

---

## Étape 3 : Rendre la page responsive  

Pour rendre la page responsive, nous allons utiliser les **Media Queries** en CSS. Cela permettra d’ajuster les styles en fonction de la taille de l’écran.  

**Ajout dans `styles.css` :**  
```css
/* Styles pour les petits écrans (moins de 768px) */
@media (max-width: 768px) {
    nav ul {
        flex-direction: column;
        gap: 10px;
    }

    #about img.profile-pic {
        width: 100px;
    }

    main {
        padding: 10px;
    }
}
```

---

## Étape 4 : Tester et améliorer  

### **1. Tester la page**  
- Ouvrez le fichier HTML dans un navigateur.  
- Vérifiez si tout s'affiche correctement : le titre, l'image, les sections et les liens.  
- Redimensionnez la fenêtre du navigateur pour voir si la page reste lisible sur différents écrans.  

### **2. Ajouter des améliorations**  
Voici quelques idées pour personnaliser davantage votre page :  
- **Ajouter un formulaire** pour permettre aux visiteurs de vous envoyer un message.  
- **Utiliser Google Fonts** pour ajouter une police personnalisée.  
- **Ajouter des icônes** à côté des liens (par exemple, des icônes LinkedIn et Twitter avec FontAwesome).  

---

## Résultat attendu  

Votre première page web devrait contenir :  
1. Un en-tête accueillant avec un menu de navigation.  
2. Une section "À propos" contenant une image et une description.  
3. Une section "Contact" avec des liens vers vos réseaux sociaux.  
4. Un pied de page avec des informations de copyright.  

Cette page est fonctionnelle, esthétique et s’adapte à différents écrans. Félicitations 🎉, vous avez créé votre première page web !  

<button id="exportPdf">Exporter en PDF</button>

<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
<script>
    document.getElementById('exportPdf').addEventListener('click', () => {
        const element = document.body; // Cible l'intégralité du corps du document
        const options = {
            margin: 1,
            filename: 'projet_final.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };
        html2pdf().set(options).from(element).save();
    });
</script>