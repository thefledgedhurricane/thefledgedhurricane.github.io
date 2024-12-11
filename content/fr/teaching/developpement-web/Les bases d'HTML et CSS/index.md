---
title: Introduction à HTML et CSS
summary: les bases de HTML et CSS pour débutants.
date: 2024-12-11
type: docs
tags:
  - HTML
  - CSS
  - Développement Web
image:
  caption: 'Introduction au développement web avec HTML et CSS.'
---

## 1. Qu'est-ce que HTML et CSS ?

HTML (*HyperText Markup Language*) est un langage de balisage utilisé pour structurer le contenu d'une page web.  
CSS (*Cascading Style Sheets*) est un langage de style qui permet de mettre en forme et de styliser les éléments HTML.

### Exemple d'une page web simple :

html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ma première page web</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
        }
        h1 {
            color: #333;
        }
    </style>
</head>
<body>
    <h1>Bienvenue sur ma première page web !</h1>
    <p>Ceci est un paragraphe stylé avec CSS.</p>
</body>
</html>

---

## 2. Concepts Clés de HTML

### a. **Structure d'une page HTML**
Une page HTML est structurée avec des **éléments** qui commencent et se terminent par des balises. Exemple :
html
<p>Ceci est un paragraphe.</p>


### b. **Éléments HTML de Base**
- `<!DOCTYPE html>` : Indique au navigateur qu'il s'agit d'une page HTML5.
- `<html>` : Racine du document HTML.
- `<head>` : Contient des informations sur le document (métadonnées, styles).
- `<body>` : Contient le contenu visible de la page.

### c. **Balises Importantes**
- **Titres** : `<h1>` à `<h6>` pour les titres, `<h1>` étant le plus important.
- **Paragraphe** : `<p>` pour le texte en bloc.
- **Liens** : `<a href="url">Texte du lien</a>`.
- **Images** : `<img src="url" alt="Description">`.
- **Listes** : `<ul>` pour les listes non ordonnées, `<ol>` pour les listes ordonnées.

### Exemple :
html
<h1>Bonjour !</h1>
<p>Ceci est un exemple de paragraphe.</p>
<a href="https://example.com">Visitez notre site</a>
<img src="image.jpg" alt="Description de l'image">


---

## 3. Concepts Clés de CSS

### a. **Ajout de CSS**
CSS peut être ajouté de trois manières :
1. **Dans une balise `<style>`** (CSS interne) :
   html
   <style>
       p {
           color: blue;
       }
   </style>
   
2. **Dans une feuille de style externe** :
   Créez un fichier `style.css` :
   css
   body {
       font-family: Arial, sans-serif;
   }
   
   Puis liez-le à votre page HTML :
   html
   <link rel="stylesheet" href="style.css">
   
3. **Directement dans une balise HTML** (CSS en ligne) :
   html
   <p style="color: blue;">Texte en bleu</p>
   

### b. **Sélecteurs CSS**
Les sélecteurs indiquent les éléments à styliser :
- `*` : Sélecteur universel (tous les éléments).
- `tag` : Sélectionne tous les éléments avec cette balise (`p`, `h1`, etc.).
- `.classe` : Sélectionne tous les éléments ayant une classe.
- `#id` : Sélectionne l'élément avec cet identifiant unique.

### Exemple :
css
h1 {
    color: red;
}
.paragraphe-important {
    font-weight: bold;
}
#titre-principal {
    text-align: center;
}


### c. **Propriétés CSS Fréquentes**
- **Couleurs** : `color`, `background-color`.
- **Texte** : `font-size`, `font-weight`, `text-align`.
- **Marges et Espacements** : `margin`, `padding`.
- **Bordures** : `border`.

---

## 4. Exemple Complet : Une Page HTML avec CSS

### HTML
html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mon Site Web</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1 id="titre-principal">Bienvenue sur mon site</h1>
        <nav>
            <ul>
                <li><a href="#section1">Section 1</a></li>
                <li><a href="#section2">Section 2</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section id="section1">
            <h2>Section 1</h2>
            <p class="paragraphe-important">Ceci est un paragraphe important.</p>
        </section>
        <section id="section2">
            <h2>Section 2</h2>
            <p>Un autre paragraphe pour illustrer.</p>
        </section>
    </main>
    <footer>
        <p>&copy; 2024 Mon Site Web</p>
    </footer>
</body>
</html>


### CSS (style.css)
css
body {
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    margin: 0;
    padding: 0;
}

header {
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
}

h1 {
    text-align: center;
}

nav ul {
    list-style: none;
    padding: 0;
    text-align: center;
}

nav ul li {
    display: inline;
    margin: 0 10px;
}

nav ul li a {
    color: #fff;
    text-decoration: none;
}

section {
    padding: 20px;
}

footer {
    text-align: center;
    padding: 10px;
    background-color: #333;
    color: #fff;
}


---

## 5. Conclusion

Avec HTML, vous structurez votre contenu, et avec CSS, vous le rendez visuellement attrayant. Pratiquez en créant vos propres pages, et testez différentes propriétés CSS pour explorer tout le potentiel du développement web.
