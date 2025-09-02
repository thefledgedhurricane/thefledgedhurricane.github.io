# Types d'apprentissage automatique

L'apprentissage automatique (Machine Learning) se décline en plusieurs paradigmes selon la nature des données d'entrée et l'objectif visé.

## Apprentissage supervisé

### Définition et formalisation

Dans l'apprentissage supervisé, on dispose d'un jeu de données d'entraînement `D = {(x₁,y₁), (x₂,y₂), ..., (xₙ,yₙ)}` où :
- `xᵢ ∈ X` : vecteur de features (variables explicatives)  
- `yᵢ ∈ Y` : label ou target (variable à prédire)

**Objectif** : Apprendre une fonction `f_θ : X → Y` qui minimise le risque empirique :

```
R_emp(θ) = (1/n) Σᵢ ℓ(yᵢ, f_θ(xᵢ))
```

où `ℓ` est une fonction de perte adaptée au problème.

### Types de problèmes supervisés

#### Régression
- **Target** : Variable continue `y ∈ ℝ`
- **Pertes courantes** : MSE, MAE, Huber
- **Exemples** : Prédiction de prix, température, demande

**Exemple concret** : Prédiction du prix immobilier
```
Features (x) : [superficie, nb_chambres, quartier_encoded, année_construction]
Target (y) : prix en euros
Perte MSE : ℓ(y, ŷ) = (y - ŷ)²
```

#### Classification binaire
- **Target** : Variable binaire `y ∈ {0,1}` ou `{-1,+1}`  
- **Pertes courantes** : Cross-entropy, hinge loss
- **Métriques** : Accuracy, Precision, Recall, F1, AUC-ROC

**Exemple** : Détection de spam
```
Features (x) : [tf-idf_features, sender_reputation, has_attachments]
Target (y) : {0: ham, 1: spam}
Perte : ℓ(y, p) = -y log(p) - (1-y) log(1-p)
```

#### Classification multiclasse
- **Target** : Variable catégorielle `y ∈ {1,2,...,K}`
- **Extension** : One-hot encoding + softmax + cross-entropy
- **Exemples** : Reconnaissance d'images, classification de documents

### Méthodes classiques

1. **Régression linéaire/logistique**
   - Hypothèse : relation linéaire entre features et target
   - Avantages : simplicité, interprétabilité
   - Inconvénients : limitations sur relations non-linéaires

2. **Machines à vecteurs de support (SVM)**
   - Principe : maximisation de la marge
   - Kernel trick : projection dans des espaces de dimension supérieure
   - Robustesse aux outliers

3. **Arbres de décision et forêts aléatoires**
   - Non-paramétrique, gère naturellement les interactions
   - Random Forest : bagging pour réduire la variance
   - Gradient Boosting : boosting pour réduire le biais

4. **Réseaux de neurones**
   - Approximateurs universels
   - Deep Learning pour données complexes (images, texte, audio)

## Apprentissage non supervisé

### Définition
On ne dispose que des features `X = {x₁, x₂, ..., xₙ}` sans labels associés.

**Objectif** : Découvrir des structures latentes dans les données (clusters, facteurs, manifolds).

### Types de problèmes non supervisés

#### Clustering (partitionnement)
**But** : Regrouper les observations similaires

**K-means** :
```
Objectif : min Σₖ Σₓ∈Cₖ ||x - μₖ||²
Algorithme : 
1. Initialiser K centres μₖ
2. Assigner chaque point au centre le plus proche  
3. Recalculer les centres comme moyennes des clusters
4. Répéter 2-3 jusqu'à convergence
```

**DBSCAN** : Clustering basé sur la densité, détecte automatiquement le nombre de clusters et les outliers.

#### Réduction de dimensionnalité

**PCA (Analyse en Composantes Principales)** :
- Projection linéaire maximisant la variance
- Composantes = vecteurs propres de la matrice de covariance
- Usage : visualisation, compression, débruitage

**t-SNE, UMAP** : Méthodes non-linéaires préservant les voisinages locaux, idéales pour la visualisation.

#### Détection d'anomalies
- **Isolation Forest** : isole les points atypiques plus rapidement
- **One-Class SVM** : apprend la frontière des données "normales"
- **Autoencoders** : reconstruction, les anomalies ont une forte erreur

### Applications
- **Segmentation client** : groupes homogènes pour le marketing
- **Exploration de données** : compréhension de la structure
- **Préprocessing** : réduction de dimension avant apprentissage supervisé
- **Détection de fraudes** : identification de comportements anormaux

## Apprentissage par renforcement

### Formalisme MDP
Un processus de décision markovien est défini par :
- **S** : ensemble des états
- **A** : ensemble des actions  
- **P(s'|s,a)** : probabilités de transition
- **R(s,a,s')** : fonction de récompense
- **γ ∈ [0,1]** : facteur d'actualisation

### Objectif
Trouver une politique optimale `π* : S → A` maximisant l'espérance de récompense cumulée :

```
V^π(s) = E[Σₜ γᵗ Rₜ | s₀ = s, π]
```

### Méthodes principales

#### Programmation dynamique
- **Value Iteration** : `V_{k+1}(s) = max_a Σ_{s'} P(s'|s,a)[R(s,a,s') + γV_k(s')]`
- **Policy Iteration** : alternance évaluation/amélioration de politique
- Nécessite la connaissance du modèle (P, R)

#### Apprentissage temporel (model-free)

**Q-Learning** :
```
Q(s,a) ← Q(s,a) + α[r + γ max_{a'} Q(s',a') - Q(s,a)]
```
- Exploration vs exploitation : ε-greedy, UCB, Thompson Sampling
- Converge vers Q* sous conditions (visite infinie de tous (s,a))

**SARSA** : mise à jour on-policy
```  
Q(s,a) ← Q(s,a) + α[r + γ Q(s',a') - Q(s,a)]
```

#### Deep Reinforcement Learning
- **DQN** : Q-Learning avec réseaux de neurones
- **Policy Gradient** : optimisation directe de la politique
- **Actor-Critic** : combinaison value-function et policy

### Applications typiques
- **Jeux** : Go, échecs, poker, jeux vidéo
- **Robotique** : contrôle, manipulation, navigation  
- **Finance** : trading algorithmique, gestion de portefeuille
- **Recommandation** : systèmes adaptatifs
- **Ressources** : allocation dynamique, cloud computing

## Apprentissage semi-supervisé et autres paradigmes

### Semi-supervisé
- Petite quantité de données labellisées + grande quantité non labellisées
- **Méthodes** : co-training, self-training, consistency regularization
- **Usage** : étiquetage coûteux (médical, juridique)

### Apprentissage par transfert
- Réutiliser un modèle pré-entraîné sur une tâche source pour une tâche cible
- **Fine-tuning** : ajustement des dernières couches
- **Feature extraction** : utilisation des représentations apprises

### Few-shot learning
- Apprentissage avec très peu d'exemples par classe
- **Meta-learning** : "apprendre à apprendre"
- **Applications** : nouveaux produits, langues rares

### Apprentissage fédéré
- Entraînement distribué sans centraliser les données
- **Enjeux** : confidentialité, communication, hétérogénéité

## Choix du paradigme

### Critères de décision

| Aspect | Supervisé | Non supervisé | Renforcement |
|--------|-----------|---------------|--------------|
| **Données** | (x,y) pairs | x seulement | séquences (s,a,r) |
| **Objectif** | Prédiction | Découverte structure | Optimisation séquentielle |
| **Évaluation** | Métriques test | Cohérence interne | Récompense cumulative |
| **Domaines** | Classification, régression | EDA, clustering | Contrôle, jeux |

### Considérations pratiques
- **Volume de données** : Deep Learning nécessite beaucoup de données
- **Coût du labelling** : Semi-supervisé si étiquetage cher
- **Temps réel** : Contraintes de latence et throughput  
- **Explicabilité** : Modèles linéaires vs boîtes noires
- **Dérive** : Fréquence de mise à jour du modèle

---

> **Astuce pratique** : Commencer simple (régression linéaire, k-means) avant d'explorer des modèles complexes. La compréhension du problème métier guide le choix technique.
