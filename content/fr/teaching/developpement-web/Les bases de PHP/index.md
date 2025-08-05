---
title: Introduction au PHP
summary: Cours sur les bases de la programmation en PHP pour débutants.
date: 2024-12-07
type: docs
tags:
  - PHP
  - Programmation
  - Informatique
image:
  caption: 'Programmation en PHP.'
---

## 1. Introduction au PHP

### Qu'est-ce que PHP ?
PHP (**Hypertext Preprocessor**) est un langage de programmation côté serveur conçu pour le développement web. Il est utilisé pour créer des pages web dynamiques et interactives.

### Pourquoi apprendre PHP ?
1. **Facile à apprendre** pour les débutants.
2. **Large adoption** dans le monde du web.
3. Compatible avec une multitude de bases de données comme MySQL.
4. Utilisé dans des projets célèbres comme WordPress, Facebook ou Wikipedia.

### Premier Exemple en PHP
Voici un exemple simple d'un script PHP :
```php
<?php
    echo "Bonjour, monde !";
?>
```
Ce code affiche "Bonjour, monde !" sur la page web.

---

## 2. Syntaxe de Base

### Balises PHP
Le code PHP est inclus dans des balises spéciales :
```php
<?php
    // Votre code ici
?>
```

### Variables
Les variables en PHP commencent par le symbole `$` :
```php
<?php
    $nom = "Fatima";
    $age = 25;
    echo "Nom : $nom, Age : $age";
?>
```

### Types de Données
PHP prend en charge plusieurs types de données :
- **Entiers** : `$nombre = 5;`
- **Flottants** : `$prix = 10.5;`
- **Chaînes de caractères** : `$texte = "Bonjour";`
- **Booléens** : `$estVrai = true;`

### Constantes
Les constantes définissent des valeurs qui ne changent pas pendant l'exécution :
```php
<?php
    define("SITE_NAME", "Mon Site Web");
    echo SITE_NAME;
?>
```

### Conditions
Les structures conditionnelles permettent de contrôler le flux du programme :
#### Structure `if`-`else`
```php
<?php
    $age = 18;
    if ($age >= 18) {
        echo "Vous êtes majeur.";
    } else {
        echo "Vous êtes mineur.";
    }
?>
```

#### Structure `switch`
```php
<?php
    $jour = "lundi";
    switch ($jour) {
        case "lundi":
            echo "C'est le début de la semaine.";
            break;
        case "vendredi":
            echo "C'est presque le week-end.";
            break;
        default:
            echo "Jour classique.";
    }
?>
```

### Boucles

#### Boucle `for`
```php
<?php
    for ($i = 0; $i < 5; $i++) {
        echo "Nombre : $i<br>";
    }
?>
```

#### Boucle `while`
```php
<?php
    $i = 0;
    while ($i < 5) {
        echo "Nombre : $i<br>";
        $i++;
    }
?>
```

#### Boucle `do-while`
```php
<?php
    $i = 0;
    do {
        echo "Nombre : $i<br>";
        $i++;
    } while ($i < 5);
?>
```

#### Boucle `foreach`
Cette boucle est spécialement conçue pour parcourir les tableaux :
```php
<?php
    $fruits = ["Pomme", "Banane", "Orange"];
    foreach ($fruits as $fruit) {
        echo "Fruit : $fruit<br>";
    }
?>
```

---

## 3. Interactions avec les Formulaires
PHP permet de traiter les données envoyées par un formulaire HTML.

### Exemple de Formulaire HTML
```html
<form method="POST" action="traitement.php">
    <label for="nom">Nom :</label>
    <input type="text" id="nom" name="nom">

    <label for="age">Age :</label>
    <input type="number" id="age" name="age">

    <button type="submit">Envoyer</button>
</form>
```

### Traitement des Données en PHP
Dans le fichier `traitement.php` :
```php
<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $nom = $_POST['nom'];
        $age = $_POST['age'];
        echo "Nom : $nom, Age : $age";
    }
?>
```

---

## 4. Gestion des Fichiers
PHP permet de lire et d'écrire dans des fichiers.

### Lire un Fichier
```php
<?php
    $contenu = file_get_contents("monfichier.txt");
    echo $contenu;
?>
```

### Écrire dans un Fichier
```php
<?php
    $fichier = fopen("nouveau.txt", "w");
    fwrite($fichier, "Ceci est un nouveau fichier.");
    fclose($fichier);
?>
```

---

## 5. Connexion à une Base de Données
PHP peut se connecter à une base de données comme MySQL pour manipuler des données.

### Créer une Connexion
```php
<?php
    $serveur = "localhost";
    $utilisateur = "root";
    $motDePasse = "";
    $baseDeDonnees = "universite";

    $connexion = new mysqli($serveur, $utilisateur, $motDePasse, $baseDeDonnees);

    if ($connexion->connect_error) {
        die("Connexion échouée : " . $connexion->connect_error);
    }
    echo "Connexion réussie !";
?>
```

### Exécuter une Requête
```php
<?php
    $resultat = $connexion->query("SELECT * FROM Etudiants");

    while ($ligne = $resultat->fetch_assoc()) {
        echo "Nom : " . $ligne['Nom'] . ", Prenom : " . $ligne['Prenom'] . "<br>";
    }
?>
```

---

### Conclusion
Ce cours fournit une introduction pratique au PHP, couvrant les bases, les interactions avec les utilisateurs et la connexion aux bases de données. Avec ces notions, vous pouvez commencer à créer des applications web dynamiques.

