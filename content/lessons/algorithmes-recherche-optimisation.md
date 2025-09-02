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
```
fonction BFS(problème):
    frontière = File([nœud_initial])
    exploré = Ensemble()
    
    tant que frontière non vide:
        nœud = frontière.défiler()
        
        si nœud.état est but:
            retourner solution(nœud)
            
        exploré.ajouter(nœud.état)
        
        pour chaque action dans actions(nœud.état):
            enfant = nœud_enfant(nœud, action)
            si enfant.état non dans exploré et non dans frontière:
                frontière.enfiler(enfant)
    
    retourner échec
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

*Cette leçon présente les concepts fondamentaux de la recherche en IA. La maîtrise de ces algorithmes est essentielle pour comprendre de nombreux domaines de l'intelligence artificielle moderne.*
