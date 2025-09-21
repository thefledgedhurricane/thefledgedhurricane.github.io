# Programmation Fondamentale : Bases des Langages

## 🎯 Objectifs d'Apprentissage

À la fin de cette leçon, vous serez capable de :

- **Maîtriser** les concepts fondamentaux de variables, types de données et opérateurs
- **Implémenter** des structures de contrôle (conditions, boucles) efficacement
- **Appliquer** les bonnes pratiques de nomenclature et de style de code
- **Résoudre** des problèmes simples en utilisant les concepts de base
- **Déboguer** du code en identifiant les erreurs communes

---

## 📚 Table des Matières

1. [Variables et Types de Données](#variables-et-types-de-données)
2. [Opérateurs et Expressions](#opérateurs-et-expressions)
3. [Structures de Contrôle](#structures-de-contrôle)
4. [Fonctions de Base](#fonctions-de-base)
5. [Gestion des Erreurs](#gestion-des-erreurs)
6. [Bonnes Pratiques](#bonnes-pratiques)
7. [Projets Pratiques](#projets-pratiques)

---

## 🔢 Variables et Types de Données

### Introduction aux Variables

Une **variable** est un conteneur qui stocke une valeur en mémoire. Imaginez-la comme une boîte étiquetée où vous pouvez ranger des objets.

```python
# Déclaration et affectation
nom = "Alice"        # Chaîne de caractères
age = 25            # Entier
taille = 1.65       # Nombre à virgule flottante
etudiant = True     # Booléen
```

### Types de Données Primitifs

#### 1. **Entiers (int)**
```python
# Exemples d'entiers
population = 67000000
temperature = -5
score = 0

# Opérations sur les entiers
print(type(population))  # <class 'int'>
print(population + 1000000)  # Addition
print(bin(15))  # Représentation binaire : 0b1111
print(hex(255))  # Représentation hexadécimale : 0xff

# Entiers très grands (pas de limite en Python)
tres_grand_nombre = 123456789012345678901234567890
print(tres_grand_nombre * 2)
```

#### 2. **Nombres à Virgule Flottante (float)**
```python
# Déclarations
pi = 3.14159
e = 2.71828
vitesse_lumiere = 3e8  # Notation scientifique : 3 × 10^8

# Précision et limitations
print(0.1 + 0.2)  # 0.30000000000000004 (limitation des flottants)
print(round(0.1 + 0.2, 10))  # 0.3

# Module math pour plus de précision
import math
print(math.pi)  # 3.141592653589793
print(math.e)   # 2.718281828459045

# Fonctions utiles
print(math.sqrt(16))    # 4.0
print(math.pow(2, 3))   # 8.0
print(math.ceil(4.2))   # 5 (arrondi supérieur)
print(math.floor(4.8))  # 4 (arrondi inférieur)
```

#### 3. **Chaînes de Caractères (str)**
```python
# Différentes façons de créer des chaînes
simple = 'Hello'
double = "World"
triple = """Texte
sur plusieurs
lignes"""

# Opérations sur les chaînes
prenom = "Marie"
nom = "Dupont"
nom_complet = prenom + " " + nom  # Concaténation

# Méthodes importantes
print(nom_complet.upper())      # MARIE DUPONT
print(nom_complet.lower())      # marie dupont
print(nom_complet.title())      # Marie Dupont
print(nom_complet.replace("Marie", "Sophie"))  # Sophie Dupont

# Formatage moderne (f-strings)
age = 30
message = f"Je m'appelle {nom_complet} et j'ai {age} ans."
print(message)

# Accès aux caractères
mot = "Python"
print(mot[0])    # P (premier caractère)
print(mot[-1])   # n (dernier caractère)
print(mot[1:4])  # yth (slicing)
print(len(mot))  # 6 (longueur)

# Caractères spéciaux
texte_avec_guillemets = "Il a dit : \"Bonjour !\""
chemin = "C:\\Users\\nom\\Documents"  # Échappement
raw_string = r"C:\Users\nom\Documents"  # Raw string
```

#### 4. **Booléens (bool)**
```python
# Valeurs booléennes
actif = True
termine = False

# Opérations logiques
print(actif and termine)  # False (ET logique)
print(actif or termine)   # True (OU logique)
print(not actif)          # False (NON logique)

# Valeurs considérées comme False
print(bool(0))        # False
print(bool(""))       # False
print(bool([]))       # False
print(bool(None))     # False

# Valeurs considérées comme True
print(bool(1))        # True
print(bool("texte"))  # True
print(bool([1, 2]))   # True

# Comparaisons qui renvoient des booléens
print(5 > 3)          # True
print(10 == 10)       # True
print("abc" < "def")  # True (ordre alphabétique)
```

### Types de Données Composés

#### 1. **Listes (list)**
```python
# Création de listes
fruits = ["pomme", "banane", "orange"]
nombres = [1, 2, 3, 4, 5]
mixte = [1, "hello", 3.14, True]

# Opérations sur les listes
fruits.append("kiwi")           # Ajouter à la fin
fruits.insert(1, "mangue")      # Insérer à l'index 1
fruits.remove("banane")         # Supprimer par valeur
dernier = fruits.pop()          # Supprimer et retourner le dernier

# Accès et modification
print(fruits[0])                # Premier élément
fruits[0] = "poire"            # Modification
print(fruits[-1])               # Dernier élément

# Slicing avancé
nombres = list(range(1, 11))    # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print(nombres[::2])             # [1, 3, 5, 7, 9] (pas de 2)
print(nombres[::-1])            # [10, 9, 8, 7, 6, 5, 4, 3, 2, 1] (inversé)

# List comprehensions (compréhensions de liste)
carres = [x**2 for x in range(1, 6)]  # [1, 4, 9, 16, 25]
pairs = [x for x in range(1, 11) if x % 2 == 0]  # [2, 4, 6, 8, 10]
```

#### 2. **Dictionnaires (dict)**
```python
# Création de dictionnaires
personne = {
    "nom": "Dupont",
    "prenom": "Marie",
    "age": 30,
    "ville": "Paris"
}

# Accès et modification
print(personne["nom"])          # Dupont
personne["age"] = 31           # Modification
personne["email"] = "marie@email.com"  # Ajout

# Méthodes utiles
print(personne.keys())          # dict_keys(['nom', 'prenom', 'age', 'ville', 'email'])
print(personne.values())        # dict_values(['Dupont', 'Marie', 31, 'Paris', 'marie@email.com'])
print(personne.items())         # Paires clé-valeur

# Accès sécurisé
print(personne.get("telephone", "Non renseigné"))  # Valeur par défaut

# Dictionary comprehensions
nombres_carres = {x: x**2 for x in range(1, 6)}  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
```

---

## ⚡ Opérateurs et Expressions

### Opérateurs Arithmétiques

```python
a, b = 10, 3

print(a + b)    # 13 (addition)
print(a - b)    # 7 (soustraction)
print(a * b)    # 30 (multiplication)
print(a / b)    # 3.333... (division flottante)
print(a // b)   # 3 (division entière)
print(a % b)    # 1 (modulo - reste de la division)
print(a ** b)   # 1000 (puissance)

# Opérateurs d'affectation composés
a += 5    # Équivalent à : a = a + 5
a -= 2    # Équivalent à : a = a - 2
a *= 3    # Équivalent à : a = a * 3
a /= 2    # Équivalent à : a = a / 2
```

### Opérateurs de Comparaison

```python
x, y = 5, 8

print(x == y)   # False (égalité)
print(x != y)   # True (différence)
print(x < y)    # True (inférieur)
print(x <= y)   # True (inférieur ou égal)
print(x > y)    # False (supérieur)
print(x >= y)   # False (supérieur ou égal)

# Comparaisons chaînées
age = 25
print(18 <= age <= 65)  # True (adulte en âge de travailler)

# Comparaison d'identité
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a == b)   # True (même contenu)
print(a is b)   # False (objets différents)
print(a is c)   # True (même objet)
```

### Opérateurs Logiques

```python
# Priorité : not > and > or
age = 25
permis = True
assurance = True

# Peut conduire ?
peut_conduire = age >= 18 and permis and assurance
print(peut_conduire)  # True

# Exemples avec or
weekend = True
vacances = False
peut_se_reposer = weekend or vacances
print(peut_se_reposer)  # True

# Court-circuit (short-circuit evaluation)
def fonction_couteuse():
    print("Fonction appelée")
    return True

# La fonction ne sera pas appelée car False and ... est toujours False
resultat = False and fonction_couteuse()
print(resultat)  # False (et "Fonction appelée" n'est pas affiché)
```

---

## 🔀 Structures de Contrôle

### Instructions Conditionnelles

#### If-Elif-Else Basique
```python
age = int(input("Quel est votre âge ? "))

if age < 0:
    print("Âge invalide")
elif age < 13:
    print("Vous êtes un enfant")
elif age < 18:
    print("Vous êtes un adolescent")
elif age < 65:
    print("Vous êtes un adulte")
else:
    print("Vous êtes un senior")
```

#### Conditions Complexes
```python
def evaluer_candidat(age, experience, diplome, salaire_demande):
    """Évalue un candidat selon plusieurs critères"""
    
    # Critères de base
    age_ok = 22 <= age <= 60
    experience_ok = experience >= 2
    diplome_ok = diplome in ["Master", "Ingénieur", "Doctorat"]
    salaire_ok = salaire_demande <= 60000
    
    if age_ok and experience_ok and diplome_ok and salaire_ok:
        return "Candidat excellent"
    elif (age_ok and experience_ok) or (diplome_ok and salaire_ok):
        return "Candidat intéressant"
    else:
        return "Candidat à revoir"

# Test
print(evaluer_candidat(28, 3, "Master", 45000))  # Candidat excellent
```

#### Opérateur Ternaire
```python
# Syntaxe : valeur_si_vrai if condition else valeur_si_faux
age = 20
statut = "majeur" if age >= 18 else "mineur"
print(statut)  # majeur

# Exemple plus complexe
def abs_value(x):
    return x if x >= 0 else -x

print(abs_value(-5))   # 5
print(abs_value(3))    # 3
```

### Boucles

#### Boucle For

```python
# Itération sur une séquence
fruits = ["pomme", "banane", "orange"]
for fruit in fruits:
    print(f"J'aime les {fruit}s")

# Boucle avec range()
for i in range(5):          # 0, 1, 2, 3, 4
    print(f"Itération {i}")

for i in range(1, 11):      # 1, 2, 3, ..., 10
    print(f"Nombre : {i}")

for i in range(0, 10, 2):   # 0, 2, 4, 6, 8
    print(f"Nombre pair : {i}")

# Boucle avec enumerate() pour avoir l'index
fruits = ["pomme", "banane", "orange"]
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# Boucle sur un dictionnaire
personne = {"nom": "Dupont", "age": 30, "ville": "Paris"}

# Clés seulement
for cle in personne:
    print(cle)

# Clés et valeurs
for cle, valeur in personne.items():
    print(f"{cle}: {valeur}")

# Valeurs seulement
for valeur in personne.values():
    print(valeur)
```

#### Boucle While

```python
# Boucle simple
compteur = 0
while compteur < 5:
    print(f"Compteur : {compteur}")
    compteur += 1

# Boucle infinie contrôlée
while True:
    commande = input("Entrez une commande (q pour quitter) : ")
    if commande.lower() == 'q':
        break
    print(f"Vous avez tapé : {commande}")

# Boucle avec condition complexe
nombre_essais = 0
max_essais = 3
mot_de_passe_correct = "secret123"

while nombre_essais < max_essais:
    mot_de_passe = input("Mot de passe : ")
    if mot_de_passe == mot_de_passe_correct:
        print("Accès autorisé !")
        break
    else:
        nombre_essais += 1
        print(f"Mot de passe incorrect. {max_essais - nombre_essais} essais restants.")
else:
    print("Accès bloqué. Trop d'essais infructueux.")
```

#### Break et Continue

```python
# Break : sortir de la boucle
for i in range(10):
    if i == 5:
        break
    print(i)  # Affiche 0, 1, 2, 3, 4

# Continue : passer à l'itération suivante
for i in range(10):
    if i % 2 == 0:  # Si le nombre est pair
        continue
    print(i)  # Affiche seulement les nombres impairs : 1, 3, 5, 7, 9

# Exemple pratique : traitement de données
donnees = [1, 2, -1, 4, 0, 6, -3, 8]
somme_positifs = 0

for nombre in donnees:
    if nombre <= 0:
        continue  # Ignorer les nombres négatifs et zéro
    somme_positifs += nombre
    if somme_positifs > 20:
        break  # Arrêter si la somme dépasse 20

print(f"Somme des positifs : {somme_positifs}")
```

#### Boucles Imbriquées

```python
# Table de multiplication
print("Table de multiplication :")
for i in range(1, 6):
    for j in range(1, 6):
        produit = i * j
        print(f"{i} × {j} = {produit:2d}", end="  ")
    print()  # Nouvelle ligne après chaque ligne de la table

# Parcours d'une matrice
matrice = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print("\\nMatrice :")
for ligne in matrice:
    for element in ligne:
        print(f"{element:2d}", end=" ")
    print()

# Recherche dans une matrice
nombre_recherche = 5
trouve = False

for i, ligne in enumerate(matrice):
    for j, element in enumerate(ligne):
        if element == nombre_recherche:
            print(f"Nombre {nombre_recherche} trouvé à la position ({i}, {j})")
            trouve = True
            break
    if trouve:
        break
```

---

## 🛠️ Fonctions de Base

### Input et Output

```python
# Input avec conversion de type
nom = input("Votre nom : ")
age = int(input("Votre âge : "))
taille = float(input("Votre taille (en m) : "))

# Gestion des erreurs d'input
def saisir_entier(message):
    """Saisie sécurisée d'un entier"""
    while True:
        try:
            return int(input(message))
        except ValueError:
            print("Veuillez entrer un nombre entier valide.")

age = saisir_entier("Votre âge : ")

# Output formaté
print(f"Bonjour {nom}, vous avez {age} ans et mesurez {taille} m.")

# Formatage avancé
prix = 19.99
print(f"Prix : {prix:.2f} €")  # Prix : 19.99 €
print(f"Prix : {prix:>10.2f} €")  # Prix :      19.99 € (aligné à droite)

nombre = 1234567
print(f"Nombre : {nombre:,}")  # Nombre : 1,234,567 (séparateur de milliers)
```

### Fonctions de Conversion

```python
# Conversions de type
# Vers entier
print(int("123"))      # 123
print(int(45.67))      # 45 (troncature)
print(int(True))       # 1

# Vers flottant
print(float("3.14"))   # 3.14
print(float(5))        # 5.0

# Vers chaîne
print(str(123))        # "123"
print(str(3.14))       # "3.14"

# Vers liste
print(list("hello"))   # ['h', 'e', 'l', 'l', 'o']
print(list(range(5)))  # [0, 1, 2, 3, 4]

# Fonctions utiles
print(abs(-5))         # 5 (valeur absolue)
print(round(3.14159, 2))  # 3.14 (arrondi)
print(min([1, 5, 3]))  # 1 (minimum)
print(max([1, 5, 3]))  # 5 (maximum)
print(sum([1, 2, 3]))  # 6 (somme)
print(len("hello"))    # 5 (longueur)
```

---

## 🐛 Gestion des Erreurs

### Types d'Erreurs Communes

```python
# 1. SyntaxError (erreur de syntaxe)
# print("Hello World"  # Parenthèse manquante

# 2. NameError (variable non définie)
# print(variable_inexistante)

# 3. TypeError (type incorrect)
# print("5" + 5)  # Cannot add string and integer

# 4. ValueError (valeur incorrecte)
# int("abc")  # Cannot convert to integer

# 5. IndexError (index hors limites)
# liste = [1, 2, 3]
# print(liste[10])

# 6. KeyError (clé inexistante)
# dictionnaire = {"a": 1}
# print(dictionnaire["b"])

# 7. ZeroDivisionError (division par zéro)
# print(10 / 0)
```

### Gestion avec Try-Except

```python
def division_securisee(a, b):
    """Division avec gestion d'erreur"""
    try:
        resultat = a / b
        return resultat
    except ZeroDivisionError:
        print("Erreur : Division par zéro impossible")
        return None
    except TypeError:
        print("Erreur : Les arguments doivent être des nombres")
        return None

# Tests
print(division_securisee(10, 2))    # 5.0
print(division_securisee(10, 0))    # Erreur : Division par zéro impossible
print(division_securisee("a", 2))   # Erreur : Les arguments doivent être des nombres

# Try-except-else-finally
def lire_fichier(nom_fichier):
    try:
        fichier = open(nom_fichier, 'r')
        contenu = fichier.read()
    except FileNotFoundError:
        print(f"Fichier {nom_fichier} introuvable")
        return None
    except PermissionError:
        print(f"Permission refusée pour {nom_fichier}")
        return None
    else:
        print("Fichier lu avec succès")
        return contenu
    finally:
        try:
            fichier.close()
            print("Fichier fermé")
        except:
            pass
```

---

## ✨ Bonnes Pratiques

### Nomenclature et Style

```python
# ✅ Bonnes pratiques de nomenclature
nom_utilisateur = "Alice"          # snake_case pour les variables
CONSTANTE_PI = 3.14159             # MAJUSCULES pour les constantes
nombre_total_elements = 100         # Noms descriptifs

def calculer_moyenne(liste_nombres):  # snake_case pour les fonctions
    """Calcule la moyenne d'une liste de nombres"""
    if not liste_nombres:
        return 0
    return sum(liste_nombres) / len(liste_nombres)

class GestionnaireUtilisateur:      # PascalCase pour les classes
    def __init__(self, nom):
        self.nom = nom

# ❌ Mauvaises pratiques à éviter
x = "Alice"                         # Nom peu descriptif
n = 100                            # Abréviation obscure
def calc(l):                       # Noms cryptiques
    return sum(l) / len(l)
```

### Documentation et Commentaires

```python
def calculer_imc(poids, taille):
    """
    Calcule l'Indice de Masse Corporelle (IMC).
    
    Args:
        poids (float): Poids en kilogrammes
        taille (float): Taille en mètres
    
    Returns:
        float: IMC calculé
        
    Raises:
        ValueError: Si poids ou taille sont négatifs ou nuls
        
    Example:
        >>> calculer_imc(70, 1.75)
        22.86
    """
    if poids <= 0 or taille <= 0:
        raise ValueError("Le poids et la taille doivent être positifs")
    
    # Calcul de l'IMC selon la formule standard
    imc = poids / (taille ** 2)
    
    return round(imc, 2)

# Commentaires explicatifs pour la logique complexe
def est_nombre_premier(n):
    """Vérifie si un nombre est premier"""
    if n < 2:
        return False
    
    # On teste seulement jusqu'à la racine carrée
    # car un diviseur plus grand aurait un complémentaire plus petit
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    
    return True
```

### Optimisation et Performance

```python
import time

# ❌ Méthode lente : concaténation répétée
def concatener_lent(mots):
    resultat = ""
    for mot in mots:
        resultat += mot + " "
    return resultat.strip()

# ✅ Méthode rapide : join()
def concatener_rapide(mots):
    return " ".join(mots)

# Test de performance
mots = ["mot"] * 10000

start = time.time()
resultat1 = concatener_lent(mots)
temps1 = time.time() - start

start = time.time()
resultat2 = concatener_rapide(mots)
temps2 = time.time() - start

print(f"Méthode lente : {temps1:.4f} secondes")
print(f"Méthode rapide : {temps2:.4f} secondes")
print(f"Gain : {temps1/temps2:.1f}x plus rapide")

# List comprehensions vs boucles
# ✅ Plus efficace et plus lisible
carres_comp = [x**2 for x in range(1000)]

# ❌ Moins efficace
carres_boucle = []
for x in range(1000):
    carres_boucle.append(x**2)
```

---

## 🚀 Projets Pratiques

### Projet 1 : Calculatrice Avancée

```python
import math

class CalculatriceAvancee:
    """Calculatrice avec fonctions scientifiques et historique"""
    
    def __init__(self):
        self.historique = []
        self.memoire = 0
    
    def ajouter_historique(self, operation, resultat):
        """Ajoute une opération à l'historique"""
        self.historique.append(f"{operation} = {resultat}")
        if len(self.historique) > 10:  # Garde seulement les 10 dernières
            self.historique.pop(0)
    
    def addition(self, a, b):
        resultat = a + b
        self.ajouter_historique(f"{a} + {b}", resultat)
        return resultat
    
    def soustraction(self, a, b):
        resultat = a - b
        self.ajouter_historique(f"{a} - {b}", resultat)
        return resultat
    
    def multiplication(self, a, b):
        resultat = a * b
        self.ajouter_historique(f"{a} × {b}", resultat)
        return resultat
    
    def division(self, a, b):
        if b == 0:
            raise ValueError("Division par zéro impossible")
        resultat = a / b
        self.ajouter_historique(f"{a} ÷ {b}", resultat)
        return resultat
    
    def puissance(self, base, exposant):
        resultat = base ** exposant
        self.ajouter_historique(f"{base}^{exposant}", resultat)
        return resultat
    
    def racine_carree(self, x):
        if x < 0:
            raise ValueError("Racine carrée d'un nombre négatif impossible")
        resultat = math.sqrt(x)
        self.ajouter_historique(f"√{x}", resultat)
        return resultat
    
    def logarithme(self, x, base=math.e):
        if x <= 0:
            raise ValueError("Logarithme défini seulement pour x > 0")
        if base == math.e:
            resultat = math.log(x)
            self.ajouter_historique(f"ln({x})", resultat)
        else:
            resultat = math.log(x, base)
            self.ajouter_historique(f"log_{base}({x})", resultat)
        return resultat
    
    def sinus(self, angle_degres):
        angle_radians = math.radians(angle_degres)
        resultat = math.sin(angle_radians)
        self.ajouter_historique(f"sin({angle_degres}°)", resultat)
        return resultat
    
    def cosinus(self, angle_degres):
        angle_radians = math.radians(angle_degres)
        resultat = math.cos(angle_radians)
        self.ajouter_historique(f"cos({angle_degres}°)", resultat)
        return resultat
    
    def sauvegarder_memoire(self, valeur):
        """Sauvegarde une valeur en mémoire"""
        self.memoire = valeur
        print(f"Valeur {valeur} sauvegardée en mémoire")
    
    def rappeler_memoire(self):
        """Rappelle la valeur en mémoire"""
        return self.memoire
    
    def afficher_historique(self):
        """Affiche l'historique des opérations"""
        print("\\n=== Historique ===")
        if not self.historique:
            print("Aucune opération dans l'historique")
        else:
            for i, operation in enumerate(self.historique, 1):
                print(f"{i}. {operation}")
        print("==================")

# Interface utilisateur
def interface_calculatrice():
    calc = CalculatriceAvancee()
    
    while True:
        print("\\n=== Calculatrice Avancée ===")
        print("1. Addition")
        print("2. Soustraction") 
        print("3. Multiplication")
        print("4. Division")
        print("5. Puissance")
        print("6. Racine carrée")
        print("7. Logarithme")
        print("8. Sinus")
        print("9. Cosinus")
        print("10. Historique")
        print("11. Mémoire")
        print("0. Quitter")
        
        try:
            choix = int(input("Votre choix : "))
            
            if choix == 0:
                break
            elif choix == 1:
                a = float(input("Premier nombre : "))
                b = float(input("Deuxième nombre : "))
                print(f"Résultat : {calc.addition(a, b)}")
            elif choix == 2:
                a = float(input("Premier nombre : "))
                b = float(input("Deuxième nombre : "))
                print(f"Résultat : {calc.soustraction(a, b)}")
            elif choix == 3:
                a = float(input("Premier nombre : "))
                b = float(input("Deuxième nombre : "))
                print(f"Résultat : {calc.multiplication(a, b)}")
            elif choix == 4:
                a = float(input("Dividende : "))
                b = float(input("Diviseur : "))
                print(f"Résultat : {calc.division(a, b)}")
            elif choix == 5:
                base = float(input("Base : "))
                exp = float(input("Exposant : "))
                print(f"Résultat : {calc.puissance(base, exp)}")
            elif choix == 6:
                x = float(input("Nombre : "))
                print(f"Résultat : {calc.racine_carree(x)}")
            elif choix == 7:
                x = float(input("Nombre : "))
                base = input("Base (entrée vide pour ln) : ")
                if base:
                    print(f"Résultat : {calc.logarithme(x, float(base))}")
                else:
                    print(f"Résultat : {calc.logarithme(x)}")
            elif choix == 8:
                angle = float(input("Angle en degrés : "))
                print(f"Résultat : {calc.sinus(angle)}")
            elif choix == 9:
                angle = float(input("Angle en degrés : "))
                print(f"Résultat : {calc.cosinus(angle)}")
            elif choix == 10:
                calc.afficher_historique()
            elif choix == 11:
                print(f"Valeur en mémoire : {calc.rappeler_memoire()}")
                if input("Sauvegarder une nouvelle valeur ? (o/n) : ").lower() == 'o':
                    valeur = float(input("Valeur : "))
                    calc.sauvegarder_memoire(valeur)
            else:
                print("Choix invalide")
                
        except ValueError as e:
            print(f"Erreur : {e}")
        except Exception as e:
            print(f"Erreur inattendue : {e}")

# Lancement du programme
if __name__ == "__main__":
    interface_calculatrice()
```

### Projet 2 : Gestionnaire de Tâches

```python
from datetime import datetime, timedelta
import json

class Tache:
    """Représente une tâche individuelle"""
    
    def __init__(self, titre, description="", priorite=1, echeance=None):
        self.id = id(self)  # ID unique basé sur l'adresse mémoire
        self.titre = titre
        self.description = description
        self.priorite = priorite  # 1=basse, 2=moyenne, 3=haute
        self.echeance = echeance
        self.terminee = False
        self.date_creation = datetime.now()
        self.date_completion = None
    
    def marquer_terminee(self):
        """Marque la tâche comme terminée"""
        self.terminee = True
        self.date_completion = datetime.now()
    
    def est_en_retard(self):
        """Vérifie si la tâche est en retard"""
        if not self.echeance or self.terminee:
            return False
        return datetime.now() > self.echeance
    
    def jours_restants(self):
        """Calcule le nombre de jours restants"""
        if not self.echeance or self.terminee:
            return None
        delta = self.echeance - datetime.now()
        return delta.days
    
    def __str__(self):
        statut = "✓" if self.terminee else "○"
        priorite_str = ["", "🔵", "🟡", "🔴"][self.priorite]
        
        info = f"{statut} {priorite_str} {self.titre}"
        
        if self.echeance:
            jours = self.jours_restants()
            if jours is not None:
                if jours < 0:
                    info += f" (⚠️ En retard de {abs(jours)} jours)"
                elif jours == 0:
                    info += " (⏰ Aujourd'hui)"
                elif jours <= 3:
                    info += f" (🕒 Dans {jours} jours)"
        
        return info

class GestionnaireTaches:
    """Gestionnaire principal des tâches"""
    
    def __init__(self):
        self.taches = []
    
    def ajouter_tache(self, titre, description="", priorite=1, echeance=None):
        """Ajoute une nouvelle tâche"""
        tache = Tache(titre, description, priorite, echeance)
        self.taches.append(tache)
        return tache
    
    def supprimer_tache(self, id_tache):
        """Supprime une tâche par son ID"""
        self.taches = [t for t in self.taches if t.id != id_tache]
    
    def marquer_terminee(self, id_tache):
        """Marque une tâche comme terminée"""
        for tache in self.taches:
            if tache.id == id_tache:
                tache.marquer_terminee()
                return True
        return False
    
    def obtenir_taches_actives(self):
        """Retourne les tâches non terminées"""
        return [t for t in self.taches if not t.terminee]
    
    def obtenir_taches_terminees(self):
        """Retourne les tâches terminées"""
        return [t for t in self.taches if t.terminee]
    
    def obtenir_taches_urgentes(self):
        """Retourne les tâches urgentes (échéance dans 3 jours)"""
        urgentes = []
        for tache in self.obtenir_taches_actives():
            if tache.echeance:
                jours = tache.jours_restants()
                if jours is not None and jours <= 3:
                    urgentes.append(tache)
        return urgentes
    
    def obtenir_taches_en_retard(self):
        """Retourne les tâches en retard"""
        return [t for t in self.obtenir_taches_actives() if t.est_en_retard()]
    
    def trier_par_priorite(self, taches=None):
        """Trie les tâches par priorité (haute à basse)"""
        if taches is None:
            taches = self.obtenir_taches_actives()
        return sorted(taches, key=lambda t: t.priorite, reverse=True)
    
    def trier_par_echeance(self, taches=None):
        """Trie les tâches par échéance"""
        if taches is None:
            taches = self.obtenir_taches_actives()
        
        # Sépare les tâches avec et sans échéance
        avec_echeance = [t for t in taches if t.echeance]
        sans_echeance = [t for t in taches if not t.echeance]
        
        # Trie celles avec échéance par date
        avec_echeance.sort(key=lambda t: t.echeance)
        
        return avec_echeance + sans_echeance
    
    def rechercher_taches(self, terme):
        """Recherche des tâches par terme dans le titre ou description"""
        terme = terme.lower()
        resultats = []
        for tache in self.taches:
            if (terme in tache.titre.lower() or 
                terme in tache.description.lower()):
                resultats.append(tache)
        return resultats
    
    def statistiques(self):
        """Retourne des statistiques sur les tâches"""
        total = len(self.taches)
        terminees = len(self.obtenir_taches_terminees())
        actives = len(self.obtenir_taches_actives())
        urgentes = len(self.obtenir_taches_urgentes())
        en_retard = len(self.obtenir_taches_en_retard())
        
        if total > 0:
            pourcentage_completion = (terminees / total) * 100
        else:
            pourcentage_completion = 0
        
        return {
            'total': total,
            'terminees': terminees,
            'actives': actives,
            'urgentes': urgentes,
            'en_retard': en_retard,
            'pourcentage_completion': pourcentage_completion
        }
    
    def sauvegarder(self, fichier="taches.json"):
        """Sauvegarde les tâches dans un fichier JSON"""
        data = []
        for tache in self.taches:
            tache_dict = {
                'titre': tache.titre,
                'description': tache.description,
                'priorite': tache.priorite,
                'echeance': tache.echeance.isoformat() if tache.echeance else None,
                'terminee': tache.terminee,
                'date_creation': tache.date_creation.isoformat(),
                'date_completion': tache.date_completion.isoformat() if tache.date_completion else None
            }
            data.append(tache_dict)
        
        with open(fichier, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    
    def charger(self, fichier="taches.json"):
        """Charge les tâches depuis un fichier JSON"""
        try:
            with open(fichier, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            self.taches = []
            for tache_dict in data:
                tache = Tache(
                    titre=tache_dict['titre'],
                    description=tache_dict['description'],
                    priorite=tache_dict['priorite'],
                    echeance=datetime.fromisoformat(tache_dict['echeance']) if tache_dict['echeance'] else None
                )
                tache.terminee = tache_dict['terminee']
                tache.date_creation = datetime.fromisoformat(tache_dict['date_creation'])
                if tache_dict['date_completion']:
                    tache.date_completion = datetime.fromisoformat(tache_dict['date_completion'])
                
                self.taches.append(tache)
                
        except FileNotFoundError:
            print(f"Fichier {fichier} non trouvé. Nouveau gestionnaire créé.")
        except Exception as e:
            print(f"Erreur lors du chargement : {e}")

# Interface utilisateur
def interface_gestionnaire():
    gestionnaire = GestionnaireTaches()
    gestionnaire.charger()  # Charge les tâches existantes
    
    while True:
        print("\\n" + "="*50)
        print("🔧 GESTIONNAIRE DE TÂCHES")
        print("="*50)
        
        # Affichage des statistiques
        stats = gestionnaire.statistiques()
        print(f"📊 {stats['total']} tâches | ✓ {stats['terminees']} terminées | "
              f"🕒 {stats['urgentes']} urgentes | ⚠️ {stats['en_retard']} en retard")
        
        if stats['total'] > 0:
            print(f"📈 Progression : {stats['pourcentage_completion']:.1f}%")
        
        print("\\n1. 📝 Ajouter une tâche")
        print("2. 📋 Voir toutes les tâches")
        print("3. ✅ Marquer une tâche terminée")
        print("4. 🗑️ Supprimer une tâche")
        print("5. 🔍 Rechercher des tâches")
        print("6. ⚡ Voir les tâches urgentes")
        print("7. ⚠️ Voir les tâches en retard")
        print("8. 💾 Sauvegarder")
        print("0. 🚪 Quitter")
        
        try:
            choix = int(input("\\nVotre choix : "))
            
            if choix == 0:
                gestionnaire.sauvegarder()
                print("👋 Au revoir !")
                break
                
            elif choix == 1:
                titre = input("Titre de la tâche : ")
                description = input("Description (optionnel) : ")
                
                print("Priorité : 1=Basse, 2=Moyenne, 3=Haute")
                priorite = int(input("Priorité (1-3) : ") or "1")
                priorite = max(1, min(3, priorite))
                
                echeance_str = input("Échéance (YYYY-MM-DD, optionnel) : ")
                echeance = None
                if echeance_str:
                    try:
                        echeance = datetime.strptime(echeance_str, "%Y-%m-%d")
                    except ValueError:
                        print("Format de date invalide, échéance ignorée.")
                
                tache = gestionnaire.ajouter_tache(titre, description, priorite, echeance)
                print(f"✅ Tâche '{titre}' ajoutée avec succès !")
                
            elif choix == 2:
                taches = gestionnaire.obtenir_taches_actives()
                if not taches:
                    print("🎉 Aucune tâche active ! Vous êtes à jour.")
                else:
                    print("\\n📋 TÂCHES ACTIVES :")
                    taches_triees = gestionnaire.trier_par_echeance(
                        gestionnaire.trier_par_priorite(taches)
                    )
                    for i, tache in enumerate(taches_triees, 1):
                        print(f"{i}. {tache}")
                        if tache.description:
                            print(f"   📝 {tache.description}")
                
            elif choix == 3:
                taches = gestionnaire.obtenir_taches_actives()
                if not taches:
                    print("Aucune tâche à terminer.")
                else:
                    print("\\nTâches actives :")
                    for i, tache in enumerate(taches, 1):
                        print(f"{i}. {tache.titre}")
                    
                    try:
                        index = int(input("Numéro de la tâche à terminer : ")) - 1
                        if 0 <= index < len(taches):
                            gestionnaire.marquer_terminee(taches[index].id)
                            print(f"✅ Tâche '{taches[index].titre}' marquée comme terminée !")
                        else:
                            print("Numéro invalide.")
                    except ValueError:
                        print("Veuillez entrer un numéro valide.")
                        
            elif choix == 4:
                taches = gestionnaire.taches
                if not taches:
                    print("Aucune tâche à supprimer.")
                else:
                    print("\\nToutes les tâches :")
                    for i, tache in enumerate(taches, 1):
                        statut = "✓" if tache.terminee else "○"
                        print(f"{i}. {statut} {tache.titre}")
                    
                    try:
                        index = int(input("Numéro de la tâche à supprimer : ")) - 1
                        if 0 <= index < len(taches):
                            titre = taches[index].titre
                            gestionnaire.supprimer_tache(taches[index].id)
                            print(f"🗑️ Tâche '{titre}' supprimée !")
                        else:
                            print("Numéro invalide.")
                    except ValueError:
                        print("Veuillez entrer un numéro valide.")
                        
            elif choix == 5:
                terme = input("Terme de recherche : ")
                resultats = gestionnaire.rechercher_taches(terme)
                if not resultats:
                    print(f"Aucune tâche trouvée pour '{terme}'.")
                else:
                    print(f"\\n🔍 Résultats pour '{terme}' :")
                    for tache in resultats:
                        print(f"• {tache}")
                        
            elif choix == 6:
                urgentes = gestionnaire.obtenir_taches_urgentes()
                if not urgentes:
                    print("🎉 Aucune tâche urgente !")
                else:
                    print("\\n⚡ TÂCHES URGENTES :")
                    for tache in urgentes:
                        print(f"• {tache}")
                        
            elif choix == 7:
                en_retard = gestionnaire.obtenir_taches_en_retard()
                if not en_retard:
                    print("🎉 Aucune tâche en retard !")
                else:
                    print("\\n⚠️ TÂCHES EN RETARD :")
                    for tache in en_retard:
                        print(f"• {tache}")
                        
            elif choix == 8:
                gestionnaire.sauvegarder()
                print("💾 Tâches sauvegardées !")
                
            else:
                print("❌ Choix invalide.")
                
        except ValueError:
            print("❌ Veuillez entrer un nombre valide.")
        except KeyboardInterrupt:
            print("\\n\\n💾 Sauvegarde avant fermeture...")
            gestionnaire.sauvegarder()
            print("👋 Au revoir !")
            break
        except Exception as e:
            print(f"❌ Erreur inattendue : {e}")

# Lancement du programme
if __name__ == "__main__":
    interface_gestionnaire()
```

---

## 🎯 Exercices d'Application

### Exercice 1 : Analyseur de Texte
Créez un programme qui analyse un texte et fournit des statistiques détaillées.

**Fonctionnalités requises :**
- Compter les mots, phrases, paragraphes
- Calculer la longueur moyenne des mots
- Identifier les mots les plus fréquents
- Analyser la complexité (mots de plus de 6 lettres)
- Détecter la langue probable (basée sur les mots communs)

### Exercice 2 : Générateur de Mots de Passe
Développez un générateur de mots de passe sécurisés avec options personnalisables.

**Fonctionnalités requises :**
- Longueur configurable
- Inclusion/exclusion de types de caractères
- Vérification de la force du mot de passe
- Génération de phrases de passe mémorisables
- Sauvegarde chiffrée (bonus)

### Exercice 3 : Convertisseur d'Unités
Créez un convertisseur universel d'unités avec interface intuitive.

**Catégories à inclure :**
- Longueur (mètres, pieds, pouces, etc.)
- Poids (kilogrammes, livres, onces, etc.)
- Température (Celsius, Fahrenheit, Kelvin)
- Devises (avec API optionnelle)
- Données informatiques (octets, bits, etc.)

---

## 📚 Ressources Complémentaires

### Livres Recommandés
- **"Automate the Boring Stuff with Python"** par Al Sweigart
- **"Python Crash Course"** par Eric Matthes  
- **"Fluent Python"** par Luciano Ramalho

### Sites Web Utiles
- [Python.org](https://python.org) - Documentation officielle
- [PEP 8](https://pep8.org) - Guide de style Python
- [Real Python](https://realpython.com) - Tutoriels approfondis
- [Python Tutor](http://pythontutor.com) - Visualisation d'exécution

### Outils de Développement
- **IDE :** PyCharm, VS Code, Sublime Text
- **Linting :** flake8, pylint, black
- **Testing :** pytest, unittest
- **Documentation :** Sphinx

---

## 🎓 Évaluation et Certification

### Critères d'Évaluation
- **Syntaxe et logique** (30%)
- **Bonnes pratiques** (25%)
- **Résolution de problèmes** (25%)
- **Code documentation** (20%)

### Prochaines Étapes
Après avoir maîtrisé ces fondamentaux, vous serez prêts pour :
- **Programmation Orientée Objet** avancée
- **Structures de données** et algorithmes
- **Développement web** avec frameworks
- **Science des données** et analyse
- **Intelligence artificielle** et machine learning

---

*💡 **Conseil :** La programmation s'apprend par la pratique. Codez tous les jours, même 15 minutes !*