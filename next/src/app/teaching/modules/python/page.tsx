'use client';

import React, { ReactNode } from 'react';
import CourseOverview from '@/components/lms/CourseOverview';
import { 
  Section, 
  Paragraph, 
  BulletList, 
  CodeBlock, 
  Callout, 
  SubSection, 
  ExampleBox,
  Highlight,
  InlineCode 
} from '@/components/lesson/LessonContent';
import { useState } from 'react';
import Link from 'next/link';

const lessons = [
  { 
    id: 1, 
    title: "Introduction à Python", 
    duration: "30 min",
    content: {
      component: () => (
        <>
          <Section title="Introduction à Python">
            <Paragraph>
              Python est un langage de programmation interprété, multiparadigme et multiplateformes. 
              Il favorise la programmation impérative structurée, fonctionnelle et orientée objet.
            </Paragraph>

            <SubSection title="Pourquoi Python ?">
              <BulletList items={[
                'Simplicité : Syntaxe claire et lisible, proche de l\'anglais.',
                'Polyvalence : Web (Django, Flask), Data Science (Pandas, NumPy), IA (PyTorch, TensorFlow), Scripting.',
                'Communauté : Immense écosystème de bibliothèques.'
              ]} />
            </SubSection>

            <SubSection title="Installation">
              <Paragraph>
                Téléchargez la dernière version sur python.org.
                Vérifiez l'installation dans votre terminal :
              </Paragraph>
              <CodeBlock language="bash" code="python --version" />
            </SubSection>

            <SubSection title="Le REPL (Read-Eval-Print Loop)">
              <Paragraph>
                C'est la console interactive de Python. Tapez <InlineCode>python</InlineCode> dans votre terminal pour y accéder.
              </Paragraph>
              <CodeBlock language="python" code={`>>> print("Hello World")
Hello World
>>> 2 + 2
4`} />
            </SubSection>
          </Section>
        </>
      )
    },
    details: `Python est un langage interprété, simple et puissant, idéal pour débuter en programmation et pour des projets avancés.`
  },
  { 
    id: 2, 
    title: "Variables et types de données", 
    duration: "45 min",
    content: {
      component: () => (
        <>
          <Section title="Variables et Types de Données">
            <Paragraph>
              En Python, le typage est dynamique (pas besoin de déclarer le type) et fort.
            </Paragraph>

            <SubSection title="Les types de base">
              <BulletList items={[
                'int (Entiers) : x = 42',
                'float (Flottants) : pi = 3.14',
                'str (Chaînes de caractères) : nom = "Alice" ou nom = \'Alice\'',
                'bool (Booléens) : vrai = True, faux = False',
                'NoneType : rien = None (absence de valeur)'
              ]} />
              <ExampleBox title="Exemples de variables">
                <CodeBlock language="python" code={`age = 25
prix = 19.99
nom = "Alice"
est_etudiant = True
valeur_nulle = None`} />
              </ExampleBox>
            </SubSection>

            <SubSection title="Conventions de nommage (PEP 8)">
              <BulletList items={[
                'Utilisez snake_case pour les variables et fonctions (ex: mon_age).',
                'Utilisez PascalCase pour les classes (ex: MaClasse).',
                'Utilisez MAJUSCULES pour les constantes (ex: PI = 3.14159).'
              ]} />
            </SubSection>
          </Section>
        </>
      )
    },
    details: `Apprenez les types de base en Python et les conventions de nommage PEP 8.`
  },
  { 
    id: 3, 
    title: "Opérateurs et expressions", 
    duration: "30 min",
    content: {
      component: () => (
        <>
          <Section title="Opérateurs et Expressions">
            <Paragraph>
              Python supporte tous les opérateurs mathématiques standards et plus encore.
            </Paragraph>

            <SubSection title="Opérateurs arithmétiques">
              <BulletList items={[
                '+ (addition), - (soustraction), * (multiplication), / (division décimale)',
                '// (division entière) : 5 // 2 donne 2',
                '% (modulo/reste) : 5 % 2 donne 1',
                '** (puissance) : 2 ** 3 donne 8'
              ]} />
            </SubSection>

            <SubSection title="Opérateurs de comparaison">
              <BulletList items={[
                '== (égal), != (différent)',
                '<, >, <=, >='
              ]} />
            </SubSection>

            <SubSection title="Opérateurs logiques">
              <Paragraph>
                Les opérateurs logiques permettent de combiner des conditions.
              </Paragraph>
              <BulletList items={[
                'and : ET logique',
                'or : OU logique',
                'not : NON logique'
              ]} />
              <ExampleBox title="Exemple avec opérateurs logiques">
                <CodeBlock language="python" code={`if age >= 18 and a_permis:
    print("Peut conduire")`} />
              </ExampleBox>
            </SubSection>

            <SubSection title="Opérateur d'appartenance">
              <Paragraph>
                L'opérateur <InlineCode>in</InlineCode> vérifie si une valeur est dans une séquence.
              </Paragraph>
              <ExampleBox title="Exemple d'appartenance">
                <CodeBlock language="python" code={`"a" in "chat"  # True`} />
              </ExampleBox>
            </SubSection>
          </Section>
        </>
      )
    },
    details: `Python supporte tous les opérateurs mathématiques standards et plus encore.`
  },
  { 
    id: 4, 
    title: "Structures de contrôle", 
    duration: "50 min",
    content: {
      component: () => (
        <>
          <Section title="Structures de Contrôle">
            <Paragraph>
              Les structures de contrôle dirigent le flux d'exécution du programme. 
              <Highlight>L'indentation est OBLIGATOIRE en Python</Highlight>.
            </Paragraph>

            <SubSection title="Conditions (if/elif/else)">
              <Paragraph>
                Les structures conditionnelles permettent d'exécuter du code en fonction de conditions.
              </Paragraph>
              <ExampleBox title="Exemple de conditions">
                <CodeBlock language="python" code={`note = 15
if note >= 16:
    print("Très bien")
elif note >= 10:
    print("Moyenne")
else:
    print("Échec")`} />
              </ExampleBox>
            </SubSection>

            <SubSection title="Boucle For">
              <Paragraph>
                Idéale pour parcourir des séquences (listes, chaînes, range).
              </Paragraph>
              <ExampleBox title="Parcours avec for">
                <CodeBlock language="python" code={`for i in range(5):  # De 0 à 4
    print(i)`} />
              </ExampleBox>
            </SubSection>

            <SubSection title="Boucle While">
              <Paragraph>
                Répète tant qu'une condition est vraie.
              </Paragraph>
              <ExampleBox title="Exemple de boucle while">
                <CodeBlock language="python" code={`compteur = 0
while compteur < 5:
    print(compteur)
    compteur += 1`} />
              </ExampleBox>
            </SubSection>

            <Callout type="warning">
              Attention à ne pas créer de boucles infinies avec while. Assurez-vous toujours que la condition finira par devenir fausse.
            </Callout>
          </Section>
        </>
      )
    },
    details: `Les structures de contrôle dirigent le flux d'exécution du programme. L'indentation est OBLIGATOIRE en Python.`
  },
  { 
    id: 5, 
    title: "Listes et tuples", 
    duration: "60 min",
    content: {
      component: () => (
        <>
          <Section title="Listes et Tuples">
            <Paragraph>
              Les listes et tuples sont des collections ordonnées d'éléments.
            </Paragraph>

            <SubSection title="Listes (mutables)">
              <Paragraph>
                On peut modifier les listes après leur création.
              </Paragraph>
              <ExampleBox title="Manipulation de listes">
                <CodeBlock language="python" code={`fruits = ["pomme", "banane"]
fruits.append("orange")      # Ajoute à la fin
fruits[0] = "poire"          # Modifie le premier élément
del fruits[1]                # Supprime l'élément à l'index 1
len(fruits)                  # Taille de la liste`} />
              </ExampleBox>
            </SubSection>

            <SubSection title="Tuples (immuables)">
              <Paragraph>
                On ne peut PAS modifier les tuples. Plus rapides et sûrs pour les constantes.
              </Paragraph>
              <ExampleBox title="Utilisation des tuples">
                <CodeBlock language="python" code={`point = (10, 20)
x, y = point  # Dépacking`} />
              </ExampleBox>
            </SubSection>

            <SubSection title="Slicing (Découpage)">
              <Paragraph>
                Le slicing permet d'extraire des portions de séquences.
              </Paragraph>
              <ExampleBox title="Exemples de slicing">
                <CodeBlock language="python" code={`liste = [0, 1, 2, 3, 4, 5]
print(liste[1:4])  # [1, 2, 3] (index 1 inclus, 4 exclu)
print(liste[::-1]) # Inverse la liste`} />
              </ExampleBox>
            </SubSection>

            <Callout type="info">
              Les listes sont mutables (modifiables) tandis que les tuples sont immuables (non modifiables). Utilisez des tuples pour garantir l'intégrité des données.
            </Callout>
          </Section>
        </>
      )
    },
    details: `Les listes et tuples sont des collections ordonnées d'éléments.`
  },
  { 
    id: 6, 
    title: "Dictionnaires et ensembles", 
    duration: "50 min",
    content: {
      component: () => (
        <>
          <Section title="Dictionnaires et Ensembles">
            <Paragraph>
              Les dictionnaires et ensembles sont des structures de données avancées pour stocker des collections d'éléments.
            </Paragraph>

            <SubSection title="Dictionnaires (dict)">
              <Paragraph>
                Les dictionnaires stockent des paires clé-valeur. Ils sont mutables et non ordonnés (avant Python 3.7).
              </Paragraph>
              <ExampleBox title="Création et manipulation de dictionnaires">
                <CodeBlock language="python" code={`# Création
personne = {
    "nom": "Alice",
    "age": 25,
    "ville": "Paris"
}

# Accès
print(personne["nom"])  # Alice
print(personne.get("age"))  # 25

# Modification
personne["age"] = 26

# Ajout
personne["email"] = "alice@example.com"

# Suppression
del personne["ville"]`} />
              </ExampleBox>
              <BulletList items={[
                'keys() : Retourne toutes les clés',
                'values() : Retourne toutes les valeurs',
                'items() : Retourne les paires clé-valeur'
              ]} />
            </SubSection>

            <SubSection title="Ensembles (set)">
              <Paragraph>
                Les ensembles sont des collections non ordonnées d'éléments uniques. Ils sont mutables.
              </Paragraph>
              <ExampleBox title="Opérations sur les ensembles">
                <CodeBlock language="python" code={`# Création
nombres = {1, 2, 3, 4, 5}
nombres2 = {4, 5, 6, 7}

# Ajout
nombres.add(6)

# Suppression
nombres.remove(1)

# Opérations ensemblistes
union = nombres | nombres2        # Union
intersection = nombres & nombres2  # Intersection
difference = nombres - nombres2    # Différence`} />
              </ExampleBox>
            </SubSection>

            <Callout type="tip">
              Les dictionnaires sont parfaits pour associer des données (comme un annuaire), tandis que les ensembles sont idéaux pour éliminer les doublons et effectuer des opérations mathématiques.
            </Callout>
          </Section>
        </>
      )
    },
    details: `Les dictionnaires (dict) et ensembles (set) pour stocker des collections avec des opérations avancées.`
  },
  { 
    id: 7, 
    title: "Fonctions", 
    duration: "60 min",
    content: {
      component: () => (
        <>
          <Section title="Fonctions">
            <Paragraph>
              Les fonctions permettent d'organiser le code en blocs réutilisables. Elles améliorent 
              la lisibilité et facilitent la maintenance.
            </Paragraph>

            <SubSection title="Définir une fonction">
              <Paragraph>
                On utilise le mot-clé <InlineCode>def</InlineCode> suivi du nom de la fonction 
                et de ses paramètres entre parenthèses.
              </Paragraph>
              <ExampleBox title="Fonction simple">
                <CodeBlock language="python" code={`def saluer(nom):
    """Affiche un message de salutation."""
    print(f"Bonjour {nom}!")

saluer("Alice")  # Bonjour Alice!`} />
              </ExampleBox>
            </SubSection>

            <SubSection title="Return : Retourner une valeur">
              <Paragraph>
                Une fonction peut renvoyer un résultat avec <InlineCode>return</InlineCode>.
              </Paragraph>
              <ExampleBox title="Fonction avec return">
                <CodeBlock language="python" code={`def calculer_moyenne(notes):
    """Calcule la moyenne d'une liste de notes."""
    if not notes:
        return 0
    return sum(notes) / len(notes)

mes_notes = [15, 12, 18, 14, 16]
moyenne = calculer_moyenne(mes_notes)
print(f"Moyenne: {moyenne:.2f}")  # Moyenne: 15.00`} />
              </ExampleBox>
            </SubSection>

            <SubSection title="Arguments">
              <BulletList items={[
                'Arguments positionnels : passés dans l\'ordre',
                'Arguments par défaut : valeur si non fournie',
                'Arguments nommés : ordre flexible',
                '*args : nombre variable d\'arguments positionnels',
                '**kwargs : nombre variable d\'arguments nommés'
              ]} />
              <ExampleBox title="Types d'arguments">
                <CodeBlock language="python" code={`def presenter(nom, age=18, ville="Paris"):
    return f"{nom}, {age} ans, habite à {ville}"

print(presenter("Alice"))  # Utilise les valeurs par défaut
print(presenter("Bob", 25, "Lyon"))  # Arguments positionnels
print(presenter(ville="Marseille", nom="Claire"))  # Arguments nommés

def somme(*nombres):
    return sum(nombres)

print(somme(1, 2, 3, 4, 5))  # 15`} />
              </ExampleBox>
            </SubSection>

            <SubSection title="Scope (Portée)">
              <Paragraph>
                Les variables ont une portée (scope) qui détermine où elles sont accessibles.
              </Paragraph>
              <BulletList items={[
                'Variables locales : définies dans une fonction, accessibles uniquement dedans',
                'Variables globales : définies hors des fonctions, accessibles partout',
                'Mot-clé global : pour modifier une variable globale depuis une fonction'
              ]} />
              <Callout type="warning">
                <Paragraph>
                  Évitez d'utiliser <InlineCode>global</InlineCode> autant que possible. 
                  Préférez passer des arguments et retourner des valeurs.
                </Paragraph>
              </Callout>
              <ExampleBox title="Exemple de scope">
                <CodeBlock language="python" code={`x = 10  # Variable globale

def ma_fonction():
    x = 5  # Variable locale, ne modifie pas la globale
    print(f"Local x: {x}")

ma_fonction()  # Local x: 5
print(f"Global x: {x}")  # Global x: 10`} />
              </ExampleBox>
            </SubSection>

            <SubSection title="Docstrings">
              <Paragraph>
                Les <Highlight>docstrings</Highlight> documentent vos fonctions. 
                Utilisez des triples guillemets juste après la définition.
              </Paragraph>
              <ExampleBox title="Docstring">
                <CodeBlock language="python" code={`def calculer_aire_cercle(rayon):
    """
    Calcule l'aire d'un cercle.
    
    Args:
        rayon (float): Le rayon du cercle
        
    Returns:
        float: L'aire du cercle
    """
    import math
    return math.pi * rayon ** 2`} />
              </ExampleBox>
            </SubSection>
          </Section>
        </>
      )
    },
    details: `Définition, arguments, return, scope`
  },
  { id: 8, title: "Modules et packages", duration: "45 min", content: "import, pip, création de modules" },
  { id: 9, title: "Gestion des fichiers", duration: "40 min", content: "Lecture, écriture, context managers" },
  { 
    id: 10, 
    title: "Programmation Orientée Objet", 
    duration: "75 min",
    content: {
      component: () => (
        <>
          <Section title="Programmation Orientée Objet (POO)">
            <Paragraph>
              La POO permet d'organiser le code en <Highlight>classes</Highlight> et 
              <Highlight>objets</Highlight>, regroupant données (attributs) et comportements (méthodes).
            </Paragraph>

            <SubSection title="Qu'est-ce qu'une classe ?">
              <Paragraph>
                Une <InlineCode>classe</InlineCode> est un modèle (template) pour créer des objets. 
                Un <InlineCode>objet</InlineCode> est une instance d'une classe.
              </Paragraph>
              <ExampleBox title="Première classe">
                <CodeBlock language="python" code={`class Etudiant:
    def __init__(self, nom, age):
        """Constructeur : initialise l'objet."""
        self.nom = nom
        self.age = age
        self.notes = []
    
    def ajouter_note(self, note):
        """Ajoute une note à l'étudiant."""
        self.notes.append(note)
    
    def moyenne(self):
        """Calcule la moyenne des notes."""
        if not self.notes:
            return 0
        return sum(self.notes) / len(self.notes)

# Créer des objets
alice = Etudiant("Alice", 20)
bob = Etudiant("Bob", 22)

# Utiliser les méthodes
alice.ajouter_note(15)
alice.ajouter_note(18)
print(f"Moyenne de {alice.nom}: {alice.moyenne()}")  # Moyenne de Alice: 16.5`} />
              </ExampleBox>
            </SubSection>

            <SubSection title="Concepts clés">
              <BulletList items={[
                '__init__ : Le constructeur, appelé automatiquement lors de la création',
                'self : Référence à l\'objet lui-même (comme "this" en Java)',
                'Attributs : Variables attachées à l\'objet (self.nom, self.age)',
                'Méthodes : Fonctions définies dans la classe'
              ]} />
            </SubSection>

            <SubSection title="Attributs de classe vs d'instance">
              <ExampleBox title="Différence entre attributs">
                <CodeBlock language="python" code={`class Voiture:
    # Attribut de classe (partagé par toutes les instances)
    nombre_roues = 4
    
    def __init__(self, marque, modele):
        # Attributs d'instance (propres à chaque objet)
        self.marque = marque
        self.modele = modele

voiture1 = Voiture("Renault", "Clio")
voiture2 = Voiture("Peugeot", "208")

print(voiture1.nombre_roues)  # 4
print(voiture2.nombre_roues)  # 4
print(Voiture.nombre_roues)   # 4

# Les attributs d'instance sont différents
print(voiture1.marque)  # Renault
print(voiture2.marque)  # Peugeot`} />
              </ExampleBox>
            </SubSection>

            <SubSection title="Héritage">
              <Paragraph>
                L'<Highlight>héritage</Highlight> permet de créer une nouvelle classe à partir 
                d'une classe existante, héritant de ses attributs et méthodes.
              </Paragraph>
              <ExampleBox title="Exemple d'héritage">
                <CodeBlock language="python" code={`class Personne:
    def __init__(self, nom, age):
        self.nom = nom
        self.age = age
    
    def se_presenter(self):
        return f"Je m'appelle {self.nom} et j'ai {self.age} ans"

class Etudiant(Personne):
    def __init__(self, nom, age, ecole):
        super().__init__(nom, age)  # Appelle le constructeur parent
        self.ecole = ecole
    
    def se_presenter(self):
        # Surcharge (override) de la méthode parente
        return f"{super().se_presenter()} et j'étudie à {self.ecole}"

alice = Etudiant("Alice", 20, "Polytechnique")
print(alice.se_presenter())
# Je m'appelle Alice et j'ai 20 ans et j'étudie à Polytechnique`} />
              </ExampleBox>
            </SubSection>

            <SubSection title="Encapsulation">
              <Paragraph>
                L'encapsulation cache les détails internes. En Python, on utilise la convention 
                du underscore pour les attributs "privés".
              </Paragraph>
              <BulletList items={[
                'attribut : public (accessible partout)',
                '_attribut : protégé (convention, ne pas utiliser hors de la classe)',
                '__attribut : privé (name mangling)'
              ]} />
              <ExampleBox title="Encapsulation">
                <CodeBlock language="python" code={`class CompteBancaire:
    def __init__(self, titulaire, solde_initial):
        self.titulaire = titulaire
        self.__solde = solde_initial  # Attribut privé
    
    def deposer(self, montant):
        if montant > 0:
            self.__solde += montant
    
    def retirer(self, montant):
        if 0 < montant <= self.__solde:
            self.__solde -= montant
        else:
            print("Solde insuffisant")
    
    def get_solde(self):
        return self.__solde

compte = CompteBancaire("Alice", 1000)
compte.deposer(500)
print(compte.get_solde())  # 1500
# print(compte.__solde)  # Erreur ! Attribut privé`} />
              </ExampleBox>
            </SubSection>

            <SubSection title="Méthodes spéciales">
              <Paragraph>
                Les <Highlight>méthodes magiques</Highlight> (dunder methods) permettent 
                de personnaliser le comportement des objets.
              </Paragraph>
              <BulletList items={[
                '__str__ : représentation en chaîne pour l\'utilisateur',
                '__repr__ : représentation officielle pour les développeurs',
                '__len__ : définit la longueur avec len()',
                '__add__ : définit l\'addition avec +',
                '__eq__ : définit l\'égalité avec =='
              ]} />
              <ExampleBox title="Méthodes spéciales">
                <CodeBlock language="python" code={`class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        return f"Point({self.x}, {self.y})"
    
    def __add__(self, autre):
        return Point(self.x + autre.x, self.y + autre.y)
    
    def __eq__(self, autre):
        return self.x == autre.x and self.y == autre.y

p1 = Point(1, 2)
p2 = Point(3, 4)
p3 = p1 + p2  # Utilise __add__
print(p3)     # Utilise __str__ : Point(4, 6)
print(p1 == Point(1, 2))  # Utilise __eq__ : True`} />
              </ExampleBox>
            </SubSection>

            <Callout type="info">
              <Paragraph>
                La POO est idéale pour modéliser des entités du monde réel avec des données 
                et des comportements liés. Elle facilite la réutilisation du code et la maintenance 
                des grands projets.
              </Paragraph>
            </Callout>
          </Section>
        </>
      )
    },
    details: `Classes, objets, héritage`
  },
  { id: 11, title: "Gestion des exceptions", duration: "35 min", content: "try/except, raise, exceptions personnalisées" },
  { id: 12, title: "Compréhensions et générateurs", duration: "45 min", content: "List comprehensions, generators" },
  { id: 13, title: "Introduction à NumPy & Pandas", duration: "60 min", content: "Arrays, DataFrames, analyse" },
  { id: 14, title: "Projet final", duration: "90 min", content: "Application complète Python" },
];

const codeExamples = [
  {
    title: "Variables et types",
    code: `# Variables en Python
nom = "Alice"
age = 25
taille = 1.75
est_etudiant = True

# Affichage formaté
print(f"{nom} a {age} ans")

# Vérification du type
print(type(age))  # <class 'int'>`
  },
  {
    title: "Listes et boucles",
    code: `# Création d'une liste
fruits = ["pomme", "banane", "orange"]

# Parcours avec for
for fruit in fruits:
    print(f"J'aime les {fruit}s")

# List comprehension
carres = [x**2 for x in range(10)]
print(carres)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]`
  },
  {
    title: "Fonctions",
    code: `# Définition d'une fonction
def calculer_moyenne(notes):
    """Calcule la moyenne d'une liste de notes."""
    if not notes:
        return 0
    return sum(notes) / len(notes)

# Utilisation
mes_notes = [15, 12, 18, 14, 16]
moyenne = calculer_moyenne(mes_notes)
print(f"Moyenne: {moyenne:.2f}")  # Moyenne: 15.00`
  },
  {
    title: "Classes et POO",
    code: `class Etudiant:
    def __init__(self, nom, age):
        self.nom = nom
        self.age = age
        self.notes = []
    
    def ajouter_note(self, note):
        self.notes.append(note)
    
    def moyenne(self):
        if not self.notes:
            return 0
        return sum(self.notes) / len(self.notes)

# Utilisation
alice = Etudiant("Alice", 20)
alice.ajouter_note(15)
alice.ajouter_note(18)
print(f"Moyenne de {alice.nom}: {alice.moyenne()}")`
  }
];

const objectives = [
  "Maîtriser la syntaxe et les concepts de Python",
  "Utiliser les structures de données avancées",
  "Comprendre la programmation orientée objet",
  "Manipuler des fichiers et des modules",
  "S'initier à l'analyse de données avec NumPy et Pandas"
];

const prerequisites = [
  "Connaissances de base en programmation (recommandé)",
  "Installation de Python 3.x",
  "Un éditeur de code (VS Code, PyCharm)"
];

export default function PythonPage() {
  return (
    <CourseOverview
      title="Python pour la Data Science & l'IA"
      description="Le langage de référence pour l'intelligence artificielle"
      level="Intermédiaire"
      duration="20h"
      lessonCount={14}
      lessons={lessons}
      objectives={objectives}
      prerequisites={prerequisites}
    />
  );
}

