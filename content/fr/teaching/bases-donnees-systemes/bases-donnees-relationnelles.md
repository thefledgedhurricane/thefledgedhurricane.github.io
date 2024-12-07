# Introduction aux Bases de Données Relationnelles

## 1. Qu'est-ce qu'une Base de Données Relationnelle ?
Une base de données relationnelle est un type de base de données qui stocke et organise les données sous forme de **tables**. Chaque table est composée de lignes (ou enregistrements) et de colonnes (ou champs).

### Exemple :
| ID | Nom   | Prénom | Email              |
|----|-------|--------|--------------------|
| 1  | Dupont| Jean   | jean.dupont@mail.com |
| 2  | Martin| Claire | claire.martin@mail.com |

Les bases de données relationnelles sont basées sur le modèle relationnel proposé par **Edgar F. Codd**.

---

## 2. Concepts Clés

### a. **Table** (ou Relation)
Une table est une collection d'entités ayant des attributs similaires. Chaque table a un **nom unique**.

### b. **Schéma**
Le schéma décrit la structure d'une table : nom des colonnes, types de données, contraintes, etc.

### c. **Clé Primaire** (Primary Key)
Une clé primaire est un ou plusieurs champs qui identifient de manière unique chaque ligne dans une table.

Exemple : Dans la table ci-dessus, la colonne `ID` est la clé primaire.

### d. **Clé Étrangère** (Foreign Key)
Une clé étrangère est un champ dans une table qui fait référence à la clé primaire d'une autre table. Cela permet de lier des tables entre elles.

### e. **Contraintes**
Les contraintes assurent l'intégrité des données. Exemples :
- `NOT NULL` : Une colonne ne peut pas avoir de valeur vide.
- `UNIQUE` : Les valeurs d'une colonne doivent être uniques.
- `CHECK` : Restreint les valeurs possibles dans une colonne.
- `FOREIGN KEY` : Définit une clé étrangère.
- `PRIMARY KEY` : Définit une clé primaire.

---

## 3. Langage SQL

SQL (*Structured Query Language*) est le langage utilisé pour manipuler les bases de données relationnelles. Voici les principales catégories de commandes :

### a. **DDL** (Data Definition Language)
Utilisé pour définir la structure des bases de données et des tables :
- `CREATE TABLE` : Créer une table.
- `ALTER TABLE` : Modifier une table.
- `DROP TABLE` : Supprimer une table.

Exemple :
```sql
CREATE TABLE utilisateurs (
    id INT PRIMARY KEY,
    nom VARCHAR(50),
    prenom VARCHAR(50),
    email VARCHAR(100) UNIQUE
);
