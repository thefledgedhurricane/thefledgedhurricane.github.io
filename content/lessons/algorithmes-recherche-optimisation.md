---
title: "Algorithmes de recherche et optimisation"
description: "Exploration approfondie des algorithmes de recherche, heuristiques et techniques d'optimisation en intelligence artificielle"
difficulty: "intermediate"
estimatedTime: "45 minutes"
keywords: ["algorithmes", "recherche", "optimisation", "heuristiques", "A*", "minimax", "méta-heuristiques"]
---

# Algorithmes de recherche et optimisation

## Introduction aux problèmes de recherche

La recherche est l'un des piliers fondamentaux de l'intelligence artificielle. Dans de nombreux domaines, nous cherchons à trouver une solution optimale ou satisfaisante parmi un ensemble de possibilités, souvent très vaste.

### Types de problèmes de recherche

#### 1. Recherche d'état
- **Espace d'états** : Ensemble de toutes les configurations possibles
- **État initial** : Point de départ de la recherche
- **États finaux** : Solutions acceptables
- **Opérateurs** : Actions possibles pour passer d'un état à un autre

**Exemple concret** : Navigation GPS
```
État initial : Position actuelle (lat, lon)
États finaux : Destination souhaitée
Opérateurs : {tourner_gauche, tourner_droite, avancer}
Coût : Distance, temps, carburant
```

#### 2. Recherche combinatoire
Optimisation sur des structures discrètes comme les graphes, les permutations, etc.

**Exemples classiques** :
- Problème du voyageur de commerce (TSP)
- Coloration de graphes
- Ordonnancement de tâches

## Algorithmes de recherche non informée

### 1. Recherche en largeur (BFS)

**Principe** : Explorer systématiquement niveau par niveau.

**Propriétés** :
- **Complétude** : Trouve toujours une solution si elle existe
- **Optimalité** : Trouve la solution la plus courte (en nombre d'étapes)
- **Complexité temporelle** : O(b^d) où b = facteur de branchement, d = profondeur
- **Complexité spatiale** : O(b^d)

**Pseudocode** :
```python
from collections import deque

def bfs(probleme):
    """
    Recherche en largeur d'abord
    
    Args:
        probleme: Objet problème avec méthodes:
            - etat_initial: état de départ
            - est_but(etat): test si état est solution
            - actions(etat): actions possibles depuis l'état
            - resultat(etat, action): nouvel état après action
    
    Returns:
        Chemin vers la solution ou None si pas de solution
    """
    noeud_initial = Noeud(probleme.etat_initial)
    
    if probleme.est_but(noeud_initial.etat):
        return noeud_initial.chemin()
    
    frontiere = deque([noeud_initial])  # File FIFO
    explore = set()
    
    while frontiere:
        noeud = frontiere.popleft()
        explore.add(noeud.etat)
        
        for action in probleme.actions(noeud.etat):
            enfant = noeud.enfant(probleme, action)
            
            if enfant.etat not in explore and enfant not in frontiere:
                if probleme.est_but(enfant.etat):
                    return enfant.chemin()
                frontiere.append(enfant)
    
    return None  # Pas de solution trouvée

class Noeud:
    """Nœud dans l'arbre de recherche"""
    def __init__(self, etat, parent=None, action=None, cout_chemin=0):
        self.etat = etat
        self.parent = parent
        self.action = action
        self.cout_chemin = cout_chemin
        self.profondeur = 0 if parent is None else parent.profondeur + 1
    
    def enfant(self, probleme, action):
        """Crée un nœud enfant en appliquant une action"""
        nouvel_etat = probleme.resultat(self.etat, action)
        cout = self.cout_chemin + probleme.cout_action(self.etat, action)
        return Noeud(nouvel_etat, self, action, cout)
    
    def chemin(self):
        """Retourne le chemin depuis la racine"""
        noeud, chemin = self, []
        while noeud:
            chemin.append(noeud.action)
            noeud = noeud.parent
        return list(reversed(chemin))[1:]  # Exclut None initial

# Exemple d'utilisation : Puzzle 8
class Puzzle8:
    def __init__(self, etat_initial, etat_but):
        self.etat_initial = tuple(etat_initial)
        self.etat_but = tuple(etat_but)
    
    def est_but(self, etat):
        return etat == self.etat_but
    
    def actions(self, etat):
        """Actions possibles : déplacer la case vide"""
        actions = []
        pos_vide = etat.index(0)
        ligne, col = pos_vide // 3, pos_vide % 3
        
        if ligne > 0: actions.append('HAUT')
        if ligne < 2: actions.append('BAS')
        if col > 0: actions.append('GAUCHE')
        if col < 2: actions.append('DROITE')
        
        return actions
    
    def resultat(self, etat, action):
        """Applique l'action et retourne le nouvel état"""
        etat = list(etat)
        pos_vide = etat.index(0)
        ligne, col = pos_vide // 3, pos_vide % 3
        
        if action == 'HAUT':
            nouvelle_pos = (ligne - 1) * 3 + col
        elif action == 'BAS':
            nouvelle_pos = (ligne + 1) * 3 + col
        elif action == 'GAUCHE':
            nouvelle_pos = ligne * 3 + (col - 1)
        elif action == 'DROITE':
            nouvelle_pos = ligne * 3 + (col + 1)
        
        # Échange case vide avec case adjacente
        etat[pos_vide], etat[nouvelle_pos] = etat[nouvelle_pos], etat[pos_vide]
        return tuple(etat)
    
    def cout_action(self, etat, action):
        return 1  # Coût uniforme

# Test sur un puzzle simple
puzzle = Puzzle8(
    etat_initial=[1, 2, 3, 4, 0, 5, 6, 7, 8],
    etat_but=[1, 2, 3, 4, 5, 0, 6, 7, 8]
)

solution = bfs(puzzle)
print("Solution trouvée:", solution)
# Sortie: ['DROITE', 'BAS']
```

### 2. Recherche en profondeur (DFS)

**Principe** : Explorer une branche complètement avant de revenir en arrière.

**Avantages** :
- Mémoire linéaire O(bm) où m = profondeur maximale
- Peut trouver des solutions rapidement si elles sont profondes

**Inconvénients** :
- Non optimale
- Peut boucler infiniment
- Mauvaise performance si la solution est proche de la racine

### 3. Recherche en profondeur limitée

Variante de DFS avec une limite de profondeur pour éviter les boucles infinies.

## Algorithmes de recherche informée (heuristique)

### 1. Recherche gourmande (Greedy)

Utilise une fonction heuristique h(n) qui estime le coût du nœud n vers le but.

**Avantages** :
- Rapide et économe en mémoire
- Efficace quand l'heuristique est bonne

**Inconvénients** :
- Non optimale
- Incomplète (peut se coincer dans des impasses)

### 2. Algorithme A*

**Fonction d'évaluation** : f(n) = g(n) + h(n)
- g(n) : coût réel du chemin depuis le début
- h(n) : heuristique (estimation du coût vers le but)

**Conditions pour l'optimalité** :
- **Heuristique admissible** : h(n) ≤ h*(n) où h*(n) est le coût réel optimal
- **Heuristique consistante** : h(n) ≤ c(n,a,n') + h(n') pour toute action a

**Exemple d'heuristique** : Distance euclidienne pour la navigation
```
h(n) = √[(x_but - x_n)² + (y_but - y_n)²]
```

**Implémentation complète d'A*** :

```python
import heapq
import math

class AStar:
    def __init__(self, grille, debut, fin):
        self.grille = grille
        self.debut = debut
        self.fin = fin
        self.lignes = len(grille)
        self.cols = len(grille[0])
    
    def heuristique(self, noeud):
        """Distance euclidienne vers le but"""
        x1, y1 = noeud
        x2, y2 = self.fin
        return math.sqrt((x2 - x1)**2 + (y2 - y1)**2)
    
    def voisins(self, noeud):
        """Retourne les voisins valides d'un nœud"""
        x, y = noeud
        voisins = []
        
        # 8 directions possibles (incluant diagonales)
        directions = [(-1,-1), (-1,0), (-1,1), (0,-1), (0,1), (1,-1), (1,0), (1,1)]
        
        for dx, dy in directions:
            nx, ny = x + dx, y + dy
            
            # Vérifier les limites
            if 0 <= nx < self.lignes and 0 <= ny < self.cols:
                # Vérifier si la case n'est pas un obstacle
                if self.grille[nx][ny] != 1:  # 0 = libre, 1 = obstacle
                    voisins.append((nx, ny))
        
        return voisins
    
    def cout_mouvement(self, actuel, voisin):
        """Coût de déplacement entre deux cases adjacentes"""
        x1, y1 = actuel
        x2, y2 = voisin
        
        # Coût diagonal = √2, coût orthogonal = 1
        if abs(x2 - x1) == 1 and abs(y2 - y1) == 1:
            return math.sqrt(2)
        else:
            return 1
    
    def rechercher(self):
        """Algorithme A* principal"""
        # File de priorité : (f_score, noeud)
        frontiere = [(0, self.debut)]
        heapq.heapify(frontiere)
        
        # Dictionnaires pour stocker les scores et chemins
        g_score = {self.debut: 0}  # Coût réel depuis le début
        f_score = {self.debut: self.heuristique(self.debut)}  # f = g + h
        vient_de = {}  # Pour reconstruire le chemin
        explore = set()
        
        while frontiere:
            # Prendre le nœud avec le plus petit f_score
            _, actuel = heapq.heappop(frontiere)
            
            if actuel in explore:
                continue
            
            explore.add(actuel)
            
            # But atteint ?
            if actuel == self.fin:
                return self.reconstruire_chemin(vient_de, actuel)
            
            # Explorer les voisins
            for voisin in self.voisins(actuel):
                if voisin in explore:
                    continue
                
                # Calcul du nouveau g_score
                cout_tentative = g_score[actuel] + self.cout_mouvement(actuel, voisin)
                
                # Si on a trouvé un meilleur chemin vers ce voisin
                if voisin not in g_score or cout_tentative < g_score[voisin]:
                    vient_de[voisin] = actuel
                    g_score[voisin] = cout_tentative
                    f_score[voisin] = cout_tentative + self.heuristique(voisin)
                    
                    # Ajouter à la frontière
                    heapq.heappush(frontiere, (f_score[voisin], voisin))
        
        return None  # Pas de chemin trouvé
    
    def reconstruire_chemin(self, vient_de, actuel):
        """Reconstruit le chemin depuis le début"""
        chemin = [actuel]
        while actuel in vient_de:
            actuel = vient_de[actuel]
            chemin.append(actuel)
        return list(reversed(chemin))

# Exemple d'utilisation
grille = [
    [0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0]
]

astar = AStar(grille, debut=(0, 0), fin=(4, 4))
chemin = astar.rechercher()

if chemin:
    print("Chemin optimal trouvé:")
    for i, (x, y) in enumerate(chemin):
        print(f"Étape {i}: ({x}, {y})")
    print(f"Longueur totale: {len(chemin) - 1} étapes")
else:
    print("Aucun chemin trouvé")

# Sortie exemple:
# Chemin optimal trouvé:
# Étape 0: (0, 0)
# Étape 1: (1, 0)
# Étape 2: (2, 0)
# Étape 3: (3, 0)
# Étape 4: (3, 1)
# Étape 5: (4, 2)
# Étape 6: (4, 3)
# Étape 7: (4, 4)
```

![Chemin A* sur grille](/lms/astar-grid.svg)

### 3. Optimisations de A*

#### A* bidirectionnel
- Recherche simultanée depuis le début et la fin
- Rencontre au milieu
- Complexité réduite de O(b^d) à O(b^(d/2))

#### IDA* (Iterative Deepening A*)
- Combine les avantages de la recherche en profondeur et A*
- Mémoire linéaire, optimalité préservée

## Recherche locale et méta-heuristiques

### 1. Recherche par montée de gradient (Hill Climbing)

**Principe** : À chaque étape, choisir le voisin qui améliore le plus la fonction objectif.

**Problèmes** :
- **Maxima locaux** : Solutions sous-optimales dont tous les voisins sont pires
- **Plateaux** : Zones plates sans gradient clair
- **Crêtes** : Optimum accessible seulement par une séquence d'actions

**Variantes** :
- **Montée stochastique** : Choix aléatoire parmi les améliorations
- **Premier choix** : Prendre la première amélioration trouvée
- **Redémarrage aléatoire** : Plusieurs exécutions depuis des points différents

### 2. Recuit simulé (Simulated Annealing)

Inspiré du processus physique de refroidissement des métaux.

**Principe** : Accepter parfois des solutions dégradantes avec une probabilité décroissante.

**Fonction de probabilité** :
```
P(accepter) = exp(ΔE / T)
```
où ΔE = différence d'énergie, T = température

**Programme de refroidissement** :
```
T(t) = T₀ × α^t   (refroidissement géométrique)
ou
T(t) = T₀ / (1 + αt)   (refroidissement logarithmique)
```

### 3. Algorithmes génétiques

**Population** : Ensemble de solutions candidates
**Sélection** : Choisir les meilleurs individus pour reproduction
**Croisement** : Combiner deux parents pour créer des descendants
**Mutation** : Modifications aléatoires pour maintenir la diversité

**Algorithme principal** :
```
population = initialiser_population()
répéter:
    évaluer_fitness(population)
    parents = sélectionner(population)
    descendants = croiser_et_muter(parents)
    population = sélectionner_survivants(parents + descendants)
jusqu'à critère_arrêt
```

## Jeux et recherche adversariale

### 1. Algorithme Minimax

Pour les jeux à somme nulle avec information complète.

**Principe** : 
- Joueur MAX cherche à maximiser l'utilité
- Joueur MIN cherche à minimiser l'utilité
- Exploration de l'arbre de jeu jusqu'à la profondeur limite

**Pseudocode** :
```
fonction minimax(état, profondeur, joueur_max):
    si profondeur = 0 ou état_terminal(état):
        retourner évaluer(état)
    
    si joueur_max:
        valeur = -∞
        pour chaque action dans actions(état):
            valeur = max(valeur, minimax(résultat(état, action), profondeur-1, faux))
        retourner valeur
    sinon:
        valeur = +∞
        pour chaque action dans actions(état):
            valeur = min(valeur, minimax(résultat(état, action), profondeur-1, vrai))
        retourner valeur
```

### 2. Élagage Alpha-Bêta

**Optimisation** de minimax qui évite l'exploration de branches inutiles.

**Principe** :
- α : Meilleure valeur pour MAX trouvée jusqu'ici
- β : Meilleure valeur pour MIN trouvée jusqu'ici
- Élagage quand α ≥ β

**Efficacité** : Réduction de O(b^d) à O(b^(d/2)) dans le meilleur cas.

## Applications pratiques

### 1. Navigation et robotique
- Planification de chemin pour robots autonomes
- Navigation GPS avec contraintes de trafic
- Évitement d'obstacles dynamiques

### 2. Jeux vidéo
- IA des NPCs (comportements, pathfinding)
- Génération procédurale de contenu
- Équilibrage automatique de difficulté

### 3. Optimisation industrielle
- Ordonnancement de production
- Allocation de ressources
- Optimisation de chaînes logistiques

### 4. Intelligence artificielle générale
- Planification automatique
- Raisonnement symbolique
- Résolution de problèmes complexes

## Défis et perspectives

### Limitations actuelles
- **Malédiction de la dimensionnalité** : Explosion combinatoire
- **Heuristiques domain-specific** : Difficiles à généraliser
- **Équilibre exploration/exploitation** : Compromis fondamental

### Directions futures
- **Apprentissage d'heuristiques** : Réseaux de neurones pour guider la recherche
- **Recherche hybride** : Combinaison avec l'apprentissage par renforcement
- **Parallélisation** : Exploitation des architectures multi-cœurs

## Exercices pratiques

1. **Implémentation A*** : Programmer A* pour résoudre le puzzle 8-puzzle
2. **Comparaison empirique** : Mesurer les performances de BFS vs DFS vs A* sur différents problèmes
3. **Conception d'heuristique** : Créer une heuristique admissible pour un domaine spécifique
4. **Recuit simulé** : Résoudre le problème du voyageur de commerce avec différents programmes de refroidissement

## Ressources complémentaires

- **Livres** : "Artificial Intelligence: A Modern Approach" (Russell & Norvig)
- **Cours en ligne** : CS188 UC Berkeley, MIT 6.034
- **Implémentations** : Bibliothèques Python (NetworkX, DEAP)
- **Compétitions** : ICAPS (International Conference on Automated Planning and Scheduling)

---

---

*Cette leçon présente les concepts fondamentaux de la recherche en IA. La maîtrise de ces algorithmes est essentielle pour comprendre de nombreux domaines de l'intelligence artificielle moderne.*

## Notebooks d'exercices

Entraînez-vous avec un carnet d'exercices contenant des gabarits "add your code here" :

- Implémenter BFS sur un graphe simple
- Implémenter A* sur une grille avec heuristique Manhattan
- Comparer empiriquement BFS/DFS/A* sur de petits graphes

Accéder au notebook: /notebooks/03_recherche_optimisation_exercices.ipynb
