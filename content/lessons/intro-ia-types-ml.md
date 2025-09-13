---
title: "Types d'apprentissage automatique"
description: "Exploration détaillée des paradigmes d'apprentissage : supervisé, non supervisé et par renforcement"
difficulty: "intermediate"  
estimatedTime: "30 minutes"
keywords: ["apprentissage automatique", "supervisé", "non supervisé", "renforcement", "classification", "régression", "clustering"]
---# Types d'apprentissage automatique

## Introduction aux paradigmes d'apprentissage

L'apprentissage automatique (Machine Learning) se divise en plusieurs paradigmes fondamentaux, chacun adapté à des types de problèmes spécifiques. Cette taxonomie guide le choix des algorithmes et des approches méthodologiques.

![Vue d'ensemble — supervisé vs non supervisé](/lms/supervised-unsupervised.svg)

## 1. Apprentissage supervisé

### Principe fondamental

L'apprentissage supervisé utilise des données étiquetées pour apprendre une fonction de mapping f : X → Y, où X représente l'espace des features et Y l'espace des labels.

**Objectif mathématique** : Minimiser le risque empirique
```
R_emp(f) = (1/n) ∑[i=1 to n] L(y_i, f(x_i))
```

où L est une fonction de perte et (x_i, y_i) les exemples d'entraînement.

### 1.1 Classification

**Objectif** : Prédire des labels discrets (classes).

#### Algorithmes classiques

**Régression logistique** :
```
P(Y=1|X) = 1 / (1 + exp(-w^T x - b))
```

**Support Vector Machines (SVM)** :
Optimisation du problème :
```
min (1/2)||w||² + C∑ξ_i
s.t. y_i(w^T x_i + b) ≥ 1 - ξ_i
```

**Arbres de décision** :
Critère de division basé sur l'entropie :
```
Entropie(S) = -∑[i=1 to c] p_i log₂(p_i)
```

#### Métriques d'évaluation

**Matrice de confusion** :
```
                Prédiction
              Pos    Neg
Réalité Pos   TP    FN
        Neg   FP    TN
```

**Métriques dérivées** :
- Précision = TP/(TP+FP)
- Rappel = TP/(TP+FN)  
- F1-score = 2×(Précision×Rappel)/(Précision+Rappel)
- Accuracy = (TP+TN)/(TP+TN+FP+FN)

#### Applications pratiques

**Reconnaissance d'images** :
- Classification d'objets (ImageNet, CIFAR)
- Diagnostic médical par imagerie
- Reconnaissance faciale

**Traitement du langage** :
- Analyse de sentiment
- Classification de documents
- Détection de spam

**Exemple concret : Diagnostic médical**

```python
# Dataset : Symptômes → Diagnostic
# Features : [température, tension, rythme_cardiaque, douleur_poitrine, essoufflement]
# Labels : [sain, hypertension, arythmie, infarctus]

import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix

# Chargement des données
data = pd.read_csv('medical_symptoms.csv')
X = data[['temperature', 'blood_pressure', 'heart_rate', 'chest_pain', 'shortness_breath']]
y = data['diagnosis']

# Division train/test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Entraînement du modèle
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Prédiction pour un nouveau patient
new_patient = [[38.5, 140, 95, 1, 0]]  # [temp, BP, HR, chest_pain, breathless]
prediction = model.predict(new_patient)
probabilities = model.predict_proba(new_patient)

print(f"Diagnostic prédit: {prediction[0]}")
print(f"Confiance: {max(probabilities[0]):.2%}")

# Évaluation sur le test set
y_pred = model.predict(X_test)
print("\nRapport de classification:")
print(classification_report(y_test, y_pred))
```

**Sortie attendue :**
```
Diagnostic prédit: hypertension
Confiance: 78%

Rapport de classification:
              precision    recall  f1-score   support
        sain       0.85      0.92      0.88        25
hypertension       0.78      0.84      0.81        19
    arythmie       0.90      0.75      0.82        20
    infarctus       0.93      0.87      0.90        23
```

### 1.2 Régression

**Objectif** : Prédire des valeurs continues.

#### Régression linéaire

**Modèle** : y = w₀ + w₁x₁ + ... + wₙxₙ + ε

**Solution analytique** : w = (X^T X)^(-1) X^T y

**Fonction de coût** (MSE) :
```
J(w) = (1/2m) ∑[i=1 to m] (h_w(x^(i)) - y^(i))²
```

#### Régularisation

**Ridge (L2)** : J(w) = MSE + λ∑wᵢ²
**Lasso (L1)** : J(w) = MSE + λ∑|wᵢ|
**Elastic Net** : Combinaison L1 + L2

#### Applications

**Finance** :
- Prédiction de prix d'actions
- Évaluation de risque de crédit
- Optimisation de portefeuille

**Immobilier** :
- Estimation de prix de biens
- Analyse de marché
- Valorisation d'actifs

## 2. Apprentissage non supervisé

### Principe

Découverte de structures cachées dans des données non étiquetées X sans labels correspondants Y.

### 2.1 Clustering (Regroupement)

**Objectif** : Partitionner les données en groupes homogènes.

#### K-Means

**Algorithme** :
1. Initialiser k centroides aléatoirement
2. Assigner chaque point au centroide le plus proche
3. Recalculer les centroides
4. Répéter jusqu'à convergence

**Fonction objectif** :
```
J = ∑[i=1 to k] ∑[x ∈ C_i] ||x - μ_i||²
```

**Complexité** : O(n×k×i×d) où n=points, k=clusters, i=itérations, d=dimensions

#### Clustering hiérarchique

**Approche ascendante** :
1. Chaque point = cluster initial
2. Fusionner les clusters les plus proches
3. Répéter jusqu'à un seul cluster

**Métriques de distance** :
- Single linkage : min(d(a,b))
- Complete linkage : max(d(a,b))
- Average linkage : moyenne(d(a,b))

#### DBSCAN (Density-Based)

**Paramètres** :
- ε (epsilon) : rayon de voisinage
- MinPts : nombre minimum de points

**Avantages** :
- Détection de clusters de forme arbitraire
- Identification automatique du bruit
- Pas besoin de spécifier k

#### Applications

**Segmentation client** :
```python
# Exemple e-commerce : Segmentation de clientèle
import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

# Données clients
data = {
    'age': [25, 34, 28, 52, 45, 31, 48, 29, 41, 35],
    'income': [30000, 55000, 42000, 80000, 72000, 48000, 65000, 38000, 60000, 45000],
    'purchase_frequency': [12, 8, 15, 4, 6, 10, 5, 14, 7, 9],
    'avg_basket': [45, 120, 35, 200, 150, 80, 180, 40, 140, 70]
}

df = pd.DataFrame(data)

# Normalisation des features
scaler = StandardScaler()
features_scaled = scaler.fit_transform(df)

# Application K-means
kmeans = KMeans(n_clusters=3, random_state=42)
clusters = kmeans.fit_predict(features_scaled)

# Ajout des clusters au DataFrame
df['cluster'] = clusters

# Analyse des segments
print("Analyse des segments clients :")
for i in range(3):
    cluster_data = df[df['cluster'] == i]
    print(f"\nSegment {i+1}:")
    print(f"  - Âge moyen: {cluster_data['age'].mean():.1f} ans")
    print(f"  - Revenu moyen: {cluster_data['income'].mean():.0f}€")
    print(f"  - Fréquence d'achat: {cluster_data['purchase_frequency'].mean():.1f}/mois")
    print(f"  - Panier moyen: {cluster_data['avg_basket'].mean():.0f}€")

# Interprétation métier
segment_names = {
    0: "Jeunes actifs (fréquents, petits paniers)",
    1: "Familles aisées (gros paniers, occasionnels)", 
    2: "Seniors (revenus élevés, achats sélectifs)"
}

df['segment_name'] = df['cluster'].map(segment_names)
print("\nSegments identifiés automatiquement :")
print(df[['age', 'income', 'segment_name']])
```

**Bioinformatique** :
- Classification de gènes
- Analyse de séquences ADN
- Regroupement de protéines

### 2.2 Réduction de dimensionnalité

**Problématique** : Malédiction de la dimensionnalité (curse of dimensionality)

#### Analyse en Composantes Principales (PCA)

**Principe** : Projection sur les directions de variance maximale.

**Algorithme** :
1. Centrer les données : X̃ = X - μ
2. Calculer la matrice de covariance : C = (1/n)X̃^T X̃
3. Décomposition en valeurs propres : C = QΛQ^T
4. Projection : Y = X̃Q_k (k premières composantes)

**Variance expliquée** : λᵢ/∑λⱼ

#### t-SNE (t-Distributed Stochastic Neighbor Embedding)

**Objectif** : Préservation des structures locales lors de la projection.

**Avantages** :
- Excellente visualisation de clusters
- Préservation des relations de voisinage

**Limitations** :
- Non déterministe
- Paramètres sensibles (perplexity)
- Coût computationnel élevé

#### Applications

**Visualisation de données** :
- Exploration de datasets haute dimension
- Validation de clustering
- Détection d'outliers

**Compression** :
- Réduction de stockage
- Accélération des calculs
- Débruitage d'images

### 2.3 Détection d'anomalies

**Objectif** : Identifier des observations atypiques.

#### Approches statistiques

**Z-score** : |z| > seuil où z = (x - μ)/σ

**Isolation Forest** :
- Construction d'arbres aléatoires
- Anomalies = points facilement isolables
- Score = longueur moyenne du chemin

#### Applications critiques

**Cybersécurité** :
- Détection d'intrusions
- Identification de malwares
- Analyse de logs suspects

**Finance** :
- Détection de fraudes
- Transactions suspectes
- Manipulation de marché

## 3. Apprentissage par renforcement

### Cadre théorique : Processus de Décision Markovien (MDP)

**Définition formelle** :
MDP = (S, A, P, R, γ) où :
- S : ensemble des états
- A : ensemble des actions
- P : probabilités de transition P(s'|s,a)
- R : fonction de récompense R(s,a,s')
- γ : facteur d'actualisation [0,1]

**Équation de Bellman** :
```
V*(s) = max_a ∑_{s'} P(s'|s,a)[R(s,a,s') + γV*(s')]
```

### Méthodes de résolution

#### Programmation dynamique

**Value Iteration** :
```
V_{k+1}(s) = max_a ∑_{s'} P(s'|s,a)[R(s,a,s') + γV_k(s')]
```

**Policy Iteration** :
1. Évaluation de politique
2. Amélioration de politique
3. Répéter jusqu'à convergence

#### Apprentissage temporel-différentiel

**Q-Learning** :
```
Q(s,a) ← Q(s,a) + α[r + γ max_{a'} Q(s',a') - Q(s,a)]
```

**SARSA** (on-policy) :
```
Q(s,a) ← Q(s,a) + α[r + γQ(s',a') - Q(s,a)]
```

#### Deep Reinforcement Learning

**DQN (Deep Q-Network)** :
- Approximation de Q(s,a) par réseau de neurones
- Experience replay pour stabilité
- Target network pour réduire la corrélation

**Policy Gradient** :
- Optimisation directe de la politique π(a|s)
- REINFORCE, Actor-Critic, PPO

### Applications révolutionnaires

#### Jeux

**AlphaGo/AlphaZero** :
- Monte Carlo Tree Search + réseaux de neurones
- Auto-apprentissage par self-play
- Maîtrise surhumaine (Go, échecs, shogi)

#### Robotique

**Contrôle moteur** :
- Apprentissage de la marche
- Manipulation d'objets
- Navigation autonome

#### Systèmes autonomes

**Véhicules autonomes** :
- **États** : perception de l'environnement (position, vitesse, obstacles, signalisation)
- **Actions** : accélération, freinage, direction, changement de voie
- **Récompenses** : sécurité (+100), efficacité (+10), confort (+5), collision (-1000)

```python
# Exemple simplifié : Q-Learning pour navigation autonome
import numpy as np

class AutonomousVehicle:
    def __init__(self):
        # États : [distance_obstacle, vitesse_courante, limite_vitesse]
        # Actions : [accélérer, maintenir, freiner]
        self.q_table = np.random.randn(10, 10, 3, 3)  # [dist, speed, limit, actions]
        self.alpha = 0.1    # taux d'apprentissage
        self.gamma = 0.95   # facteur d'actualisation
        self.epsilon = 0.1  # exploration
    
    def get_state(self, distance, speed, speed_limit):
        """Convertit la situation en indices d'état"""
        dist_idx = min(int(distance // 10), 9)
        speed_idx = min(int(speed // 10), 9) 
        limit_idx = min(int(speed_limit // 30), 2)
        return dist_idx, speed_idx, limit_idx
    
    def choose_action(self, state):
        """Choix d'action avec epsilon-greedy"""
        if np.random.random() < self.epsilon:
            return np.random.randint(3)  # exploration
        else:
            return np.argmax(self.q_table[state])  # exploitation
    
    def calculate_reward(self, distance, speed, speed_limit, action):
        """Calcul de la récompense"""
        reward = 0
        
        # Sécurité (distance obstacle)
        if distance < 5:
            reward -= 100  # danger immédiat
        elif distance < 15:
            reward -= 20   # risque
        else:
            reward += 10   # sécurité
        
        # Respect limitations
        if speed <= speed_limit:
            reward += 5
        else:
            reward -= 15 * (speed - speed_limit)
        
        # Efficacité (éviter freinage/accélération excessifs)
        if action == 1:  # maintenir vitesse
            reward += 3
        
        return reward
    
    def update_q_value(self, state, action, reward, next_state):
        """Mise à jour Q-learning"""
        best_next_action = np.argmax(self.q_table[next_state])
        td_target = reward + self.gamma * self.q_table[next_state][best_next_action]
        td_error = td_target - self.q_table[state][action]
        self.q_table[state][action] += self.alpha * td_error

# Simulation d'entraînement
vehicle = AutonomousVehicle()
for episode in range(1000):
    # Situation initiale
    distance, speed, speed_limit = 50, 60, 90
    state = vehicle.get_state(distance, speed, speed_limit)
    
    for step in range(100):
        action = vehicle.choose_action(state)
        
        # Simulation environnement
        if action == 0:    # accélérer
            speed = min(speed + 10, 120)
        elif action == 2:  # freiner
            speed = max(speed - 15, 0)
        
        # Nouvel état
        distance = max(distance - 5, 0)  # obstacle se rapproche
        next_state = vehicle.get_state(distance, speed, speed_limit)
        
        # Récompense et apprentissage
        reward = vehicle.calculate_reward(distance, speed, speed_limit, action)
        vehicle.update_q_value(state, action, reward, next_state)
        
        state = next_state
        if distance == 0:  # collision
            break

print("Entraînement terminé. Le véhicule a appris à naviguer de manière autonome!")
```

**Algorithmes de trading** :
- États : indicateurs de marché
- Actions : achat, vente, hold
- Récompenses : profit, gestion du risque

## Comparaison des paradigmes

| Aspect | Supervisé | Non supervisé | Par renforcement |
|--------|-----------|---------------|------------------|
| **Données** | Étiquetées | Non étiquetées | Séquentielles avec récompenses |
| **Objectif** | Prédiction | Découverte | Optimisation |
| **Feedback** | Immédiat | Aucun | Différé |
| **Applications** | Classification, régression | Clustering, visualisation | Contrôle, jeux |
| **Défis** | Overfitting, biais | Validation, interprétation | Exploration vs exploitation |

## Choix du paradigme

### Arbre de décision

1. **Avez-vous des labels ?**
   - Oui → Apprentissage supervisé
   - Non → Question 2

2. **Voulez-vous découvrir des structures ?**
   - Oui → Apprentissage non supervisé
   - Non → Question 3

3. **Avez-vous un environnement interactif avec récompenses ?**
   - Oui → Apprentissage par renforcement
   - Non → Reformuler le problème

### Critères de sélection

**Taille des données** :
- Petite : Modèles simples, validation croisée
- Moyenne : Ensemble methods, régularisation
- Grande : Deep learning, GPU acceleration

**Interprétabilité requise** :
- Élevée : Arbres, régression linéaire
- Moyenne : Random Forest, SVM
- Faible : Réseaux de neurones profonds

## Tendances actuelles

### Apprentissage multi-tâches

**Transfer Learning** :
- Pré-entraînement sur tâche générale
- Fine-tuning sur tâche spécifique
- Économie de données et de calcul

### Apprentissage fédéré

**Principe** : Entraînement distribué préservant la confidentialité
- Modèle global sans centralisation des données
- Applications : Santé, finance, mobile

### Meta-Learning

**"Learning to learn"** :
- Adaptation rapide à nouvelles tâches
- Few-shot learning
- Optimisation d'algorithmes d'apprentissage

## Conclusion

La compréhension des paradigmes d'apprentissage est fondamentale pour :
- **Choix méthodologique éclairé** selon le contexte
- **Optimisation des performances** par sélection appropriée
- **Innovation** par combinaison créative des approches

L'avenir de l'IA réside dans l'hybridation intelligente de ces paradigmes, créant des systèmes plus robustes et polyvalents.

## Notebooks d'exercices

Mettez en pratique les concepts vus dans ce module avec un petit carnet d'exercices prêt à l'emploi :

- Calculer précision, rappel et F1 à partir d'une matrice de confusion
- Régression linéaire univariée en forme fermée (w0, w1)
- Une itération de k-means (assignations puis mise à jour des centroïdes)

Accéder au notebook: /notebooks/02_types_ml_exercices.ipynb

---

*Cette leçon établit les bases théoriques et pratiques des différents types d'apprentissage. Les prochains modules approfondiront les algorithmes spécifiques et leurs implémentations.*
