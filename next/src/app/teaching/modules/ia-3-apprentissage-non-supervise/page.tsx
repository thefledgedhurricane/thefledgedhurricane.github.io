'use client';

import React from 'react';
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

const lessons = [
  { 
    id: 1, 
    title: "K-Means et Clustering", 
    duration: "80 min", 
    type: 'text' as const,
    exercises: [
      {
        id: 'ex1-1',
        title: 'Calculer les centroïdes',
        description: 'Points: [(1,2), (2,3), (8,7), (9,8)]. K=2. Initiaux: (1,2) et (9,8). Faites 1 itération.',
        solution: 'Cluster 1: [(1,2), (2,3)] → centroïde (1.5, 2.5)\nCluster 2: [(8,7), (9,8)] → centroïde (8.5, 7.5)'
      }
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'Pourquoi K-Means peut converger vers un minimum local?',
        options: [
          'L\'algorithme est aléatoire',
          'L\'initialisation des centroïdes influence le résultat',
          'La distance euclidienne n\'est pas optimale',
          'K est mal choisi'
        ],
        correctAnswer: 1,
        explanation: 'K-Means est sensible à l\'initialisation. Deux runs avec différents centroïdes initiaux peuvent donner des résultats différents. Solution: K-Means++ (initialisation intelligente) ou multiple runs.'
      }
    ],
    cheatSheet: `📚 K-MEANS CLUSTERING

Objectif: Minimiser inertie
$J = \\sum_{i=1}^{n} \\sum_{k=1}^{K} r_{ik} ||x_i - \\mu_k||^2$

Algorithme:
1. Init K centroïdes aléatoires
2. Assigner chaque point au centroïde le plus proche
3. Recalculer centroïdes (moyenne du cluster)
4. Répéter 2-3 jusqu'à convergence

Complexité: O(nKdT) - n points, K clusters, d dimensions, T itérations

💡 Choisir K: Méthode du coude (elbow method)`,
    content: {
      component: () => (
        <>
          <Section title="K-Means: L'Algorithme de Clustering Fondamental">
            <Paragraph>
              <strong>Clustering</strong> = regrouper des données similaires sans labels. K-Means est l'algorithme 
              le plus utilisé pour cette tâche.
            </Paragraph>

            <SubSection title="Le Problème Mathématique">
              <div className="my-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <h5 className="font-semibold text-xl mb-4">Objectif: Minimiser l'Inertie</h5>
                <div className="text-center text-2xl my-6">
                  <code>$J = \sum_{'{'}{'{'}i=1{'}'}{'}'} ^{'{'}{'{'}n{'}'}{'}'} \sum_{'{'}{'{'}k=1{'}'}{'}'} ^{'{'}{'{'}K{'}'}{'}'} r_{'{'}{'{'}ik{'}'}{'}'} ||\mathbf{'{'}x{'}'}_i - \boldsymbol{'{'}\mu{'}'}_k||^2$</code>
                </div>
                <BulletList items={[
                  '$r_{ik}$ = 1 si point $i$ est dans cluster $k$, sinon 0',
                  '$\\mathbf{x}_i$ = point de données',
                  '$\\boldsymbol{\\mu}_k$ = centroïde du cluster $k$',
                  '$||.||^2$ = distance euclidienne au carré'
                ]} />
                <Paragraph>
                  <strong>Intuition:</strong> On veut que chaque point soit proche du centroïde de son cluster.
                </Paragraph>
              </div>

              <ExampleBox title="Visualisation Simple (2D)">
                <Paragraph>
                  Imaginons 6 points en 2D qu'on veut grouper en K=2 clusters:
                </Paragraph>
                <CodeBlock language="python" code={`import numpy as np
import matplotlib.pyplot as plt

# Points
points = np.array([
    [1, 2], [1.5, 1.8], [5, 8], [8, 8], [1, 0.6], [9, 11]
])

# Visualisation
plt.scatter(points[:, 0], points[:, 1], s=100)
for i, point in enumerate(points):
    plt.annotate(f'P{i}', point, fontsize=12)
plt.xlabel('x1')
plt.ylabel('x2')
plt.title('Données à Clusteriser')
plt.grid(True)
plt.show()

# Question: Quels points vont ensemble?
# Humain voit: {P0, P1, P4} et {P2, P3, P5}`} />
              </ExampleBox>
            </SubSection>

            <SubSection title="L'Algorithme K-Means: Étape par Étape">
              <div className="space-y-6 my-8">
                <div className="bg-white border-l-4 border-mckinsey-teal-500 p-6 rounded-r-xl shadow-md">
                  <h5 className="font-bold text-lg mb-3">Étape 0: Initialisation</h5>
                  <Paragraph>
                    Choisir K centroïdes initiaux (aléatoirement ou K-Means++)
                  </Paragraph>
                  <CodeBlock language="python" code={`# Initialisation aléatoire
K = 2
indices = np.random.choice(len(points), K, replace=False)
centroids = points[indices]
print("Centroïdes initiaux:", centroids)`} />
                </div>

                <div className="bg-white border-l-4 border-blue-500 p-6 rounded-r-xl shadow-md">
                  <h5 className="font-bold text-lg mb-3">Étape 1: Assignment</h5>
                  <Paragraph>
                    Assigner chaque point au centroïde le plus proche (distance euclidienne)
                  </Paragraph>
                  <div className="text-center text-xl my-4">
                    <code>$c_i = \arg\min_k ||\mathbf{'{'}x{'}'}_i - \boldsymbol{'{'}\mu{'}'}_k||^2$</code>
                  </div>
                  <CodeBlock language="python" code={`def assign_clusters(points, centroids):
    # Calculer distances de chaque point à chaque centroïde
    distances = np.sqrt(((points - centroids[:, np.newaxis])**2).sum(axis=2))
    # Shape: (K, n_points)
    
    # Assigner au plus proche
    labels = np.argmin(distances, axis=0)
    return labels

labels = assign_clusters(points, centroids)
print("Labels:", labels)  # [0, 0, 1, 1, 0, 1] par exemple`} />
                </div>

                <div className="bg-white border-l-4 border-purple-500 p-6 rounded-r-xl shadow-md">
                  <h5 className="font-bold text-lg mb-3">Étape 2: Update</h5>
                  <Paragraph>
                    Recalculer les centroïdes = moyenne des points de chaque cluster
                  </Paragraph>
                  <div className="text-center text-xl my-4">
                    <code>$\boldsymbol{'{'}\mu{'}'}_k = \frac{'{'}1{'}'}{'{'} |C_k| {'}'} \sum_{'{'}{'{'}i \in C_k{'}'}{'}'} \mathbf{'{'}x{'}'}_i$</code>
                  </div>
                  <CodeBlock language="python" code={`def update_centroids(points, labels, K):
    centroids = np.zeros((K, points.shape[1]))
    for k in range(K):
        # Points du cluster k
        cluster_points = points[labels == k]
        # Moyenne
        centroids[k] = cluster_points.mean(axis=0)
    return centroids

centroids = update_centroids(points, labels, K)
print("Nouveaux centroïdes:", centroids)`} />
                </div>

                <div className="bg-white border-l-4 border-green-500 p-6 rounded-r-xl shadow-md">
                  <h5 className="font-bold text-lg mb-3">Étape 3: Convergence</h5>
                  <Paragraph>
                    Répéter étapes 1-2 jusqu'à ce que les centroïdes ne bougent plus (ou max iterations)
                  </Paragraph>
                  <CodeBlock language="python" code={`def kmeans(points, K, max_iters=100, tol=1e-4):
    # Initialisation
    centroids = points[np.random.choice(len(points), K, replace=False)]
    
    for iteration in range(max_iters):
        # Assignment
        labels = assign_clusters(points, centroids)
        
        # Update
        new_centroids = update_centroids(points, labels, K)
        
        # Convergence?
        if np.allclose(centroids, new_centroids, atol=tol):
            print(f"Convergence à l'itération {iteration}")
            break
            
        centroids = new_centroids
    
    return centroids, labels

final_centroids, final_labels = kmeans(points, K=2)
print("Résultat final:")
print("Centroïdes:", final_centroids)
print("Labels:", final_labels)`} />
                </div>
              </div>

              <ExampleBox title="Implémentation Complète avec Visualisation">
                <CodeBlock language="python" code={`import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

class KMeansVisualizer:
    def __init__(self, points, K):
        self.points = points
        self.K = K
        self.centroids = points[np.random.choice(len(points), K, replace=False)]
        self.history = [self.centroids.copy()]
        
    def fit(self, max_iters=20):
        for _ in range(max_iters):
            # Assignment
            distances = np.sqrt(((self.points - self.centroids[:, np.newaxis])**2).sum(axis=2))
            self.labels = np.argmin(distances, axis=0)
            
            # Update
            new_centroids = np.array([
                self.points[self.labels == k].mean(axis=0) 
                for k in range(self.K)
            ])
            
            self.history.append(new_centroids.copy())
            
            # Convergence
            if np.allclose(self.centroids, new_centroids):
                break
                
            self.centroids = new_centroids
    
    def plot(self):
        colors = ['red', 'blue', 'green', 'orange']
        
        plt.figure(figsize=(10, 6))
        for k in range(self.K):
            cluster_points = self.points[self.labels == k]
            plt.scatter(cluster_points[:, 0], cluster_points[:, 1], 
                       c=colors[k], label=f'Cluster {k}', s=100, alpha=0.6)
        
        plt.scatter(self.centroids[:, 0], self.centroids[:, 1], 
                   c='black', marker='X', s=300, label='Centroïdes', 
                   edgecolors='white', linewidths=2)
        
        plt.xlabel('Feature 1')
        plt.ylabel('Feature 2')
        plt.title('K-Means Clustering')
        plt.legend()
        plt.grid(True, alpha=0.3)
        plt.show()

# Données
np.random.seed(42)
cluster1 = np.random.randn(30, 2) + [2, 2]
cluster2 = np.random.randn(30, 2) + [8, 8]
cluster3 = np.random.randn(30, 2) + [2, 8]
data = np.vstack([cluster1, cluster2, cluster3])

# Clustering
kmeans = KMeansVisualizer(data, K=3)
kmeans.fit()
kmeans.plot()`} />
              </ExampleBox>
            </SubSection>

            <SubSection title="Choisir K: La Méthode du Coude (Elbow Method)">
              <Paragraph>
                Comment déterminer le nombre optimal de clusters?
              </Paragraph>

              <div className="my-6 p-6 bg-yellow-50 border-2 border-yellow-500 rounded-xl">
                <h5 className="font-semibold text-lg mb-3">Inertie (Within-Cluster Sum of Squares)</h5>
                <div className="text-center text-xl my-4">
                  <code>$WCSS = \sum_{`k=1`}^{`K`} \sum_{`x_i \in C_k`} ||x_i - \mu_k||^2$</code>
                </div>
                <Paragraph>
                  Plus K augmente, plus l'inertie diminue. Mais au-delà d'un certain K, le gain devient marginal.
                </Paragraph>
              </div>

              <ExampleBox title="Trouver le Coude">
                <CodeBlock language="python" code={`from sklearn.cluster import KMeans

# Tester différentes valeurs de K
inertias = []
K_range = range(1, 11)

for k in K_range:
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    kmeans.fit(data)
    inertias.append(kmeans.inertia_)

# Visualiser
plt.figure(figsize=(10, 6))
plt.plot(K_range, inertias, 'bo-', linewidth=2, markersize=8)
plt.xlabel('Nombre de Clusters (K)', fontsize=12)
plt.ylabel('Inertie (WCSS)', fontsize=12)
plt.title('Méthode du Coude', fontsize=14)
plt.grid(True, alpha=0.3)
plt.axvline(x=3, color='red', linestyle='--', label='Coude optimal')
plt.legend()
plt.show()

# Le "coude" est autour de K=3
# Après K=3, la diminution d'inertie est faible`} />
              </ExampleBox>

              <Callout type="info">
                <Paragraph>
                  <strong>Méthode Silhouette</strong> (alternative):<br/>
                  Score entre -1 et 1. Plus proche de 1 = meilleur clustering.<br/>
                  Mesure: à quel point un point est similaire à son cluster vs autres clusters.
                </Paragraph>
              </Callout>
            </SubSection>

            <SubSection title="K-Means++: Initialisation Intelligente">
              <Paragraph>
                Problème: K-Means est sensible à l'initialisation. <strong>K-Means++</strong> améliore ça.
              </Paragraph>

              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-xl my-6">
                <h5 className="font-bold text-lg mb-4">Algorithme K-Means++</h5>
                <ol className="space-y-3 list-decimal list-inside">
                  <li>Choisir le 1er centroïde aléatoirement</li>
                  <li>Pour chaque point, calculer $D(x)$ = distance au centroïde le plus proche</li>
                  <li>Choisir le prochain centroïde avec probabilité proportionnelle à $D(x)^2$</li>
                  <li>Répéter 2-3 jusqu'à avoir K centroïdes</li>
                  <li>Lancer K-Means standard</li>
                </ol>
                <Paragraph>
                  <Highlight>Intuition:</Highlight> Étaler les centroïdes initiaux pour couvrir toutes les zones.
                </Paragraph>
              </div>

              <CodeBlock language="python" code={`def kmeans_plus_plus_init(points, K):
    n = len(points)
    centroids = []
    
    # 1. Premier centroïde aléatoire
    centroids.append(points[np.random.randint(n)])
    
    for _ in range(1, K):
        # 2. Distances au centroïde le plus proche
        distances = np.array([
            min(np.linalg.norm(point - c)**2 for c in centroids)
            for point in points
        ])
        
        # 3. Probabilités proportionnelles à D²
        probabilities = distances / distances.sum()
        
        # 4. Choisir prochain centroïde
        idx = np.random.choice(n, p=probabilities)
        centroids.append(points[idx])
    
    return np.array(centroids)

# Utilisation
init_centroids = kmeans_plus_plus_init(data, K=3)
print("Centroïdes K-Means++:", init_centroids)

# Avec scikit-learn (par défaut)
kmeans = KMeans(n_clusters=3, init='k-means++', random_state=42)
kmeans.fit(data)`} />
            </SubSection>

            <SubSection title="Limites de K-Means">
              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-red-50 border-2 border-red-500 rounded-xl p-6">
                  <h6 className="font-bold mb-3">❌ Cas où K-Means Échoue</h6>
                  <BulletList items={[
                    'Clusters de formes non-sphériques',
                    'Clusters de tailles très différentes',
                    'Clusters de densités variables',
                    'Données avec outliers'
                  ]} />
                </div>

                <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
                  <h6 className="font-bold mb-3">✅ Alternatives</h6>
                  <BulletList items={[
                    'DBSCAN: forme arbitraire, gère outliers',
                    'Hierarchical: dendrogramme, pas besoin de K',
                    'GMM: clusters elliptiques, probabiliste',
                    'Mean Shift: pas besoin de K'
                  ]} />
                </div>
              </div>

              <ExampleBox title="DBSCAN: Clustering Basé sur la Densité">
                <Paragraph>
                  <strong>DBSCAN</strong> (Density-Based Spatial Clustering) ne nécessite pas K!
                </Paragraph>
                <CodeBlock language="python" code={`from sklearn.cluster import DBSCAN

# Paramètres
# eps: rayon du voisinage
# min_samples: points minimum pour former un cluster
dbscan = DBSCAN(eps=0.5, min_samples=5)
labels = dbscan.fit_predict(data)

# Label -1 = outliers/bruit
n_clusters = len(set(labels)) - (1 if -1 in labels else 0)
n_noise = list(labels).count(-1)

print(f"Clusters trouvés: {n_clusters}")
print(f"Points de bruit: {n_noise}")`} />
              </ExampleBox>
            </SubSection>

            <SubSection title="Application Réelle: Segmentation Client">
              <ExampleBox title="E-Commerce: Grouper les Clients">
                <Paragraph>
                  Objectif: Identifier des profils de clients pour marketing ciblé
                </Paragraph>
                <CodeBlock language="python" code={`import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

# Données clients
data = pd.DataFrame({
    'age': [25, 35, 45, 23, 31, 52, 28, 41],
    'revenu_annuel': [35000, 60000, 80000, 30000, 55000, 90000, 38000, 70000],
    'score_achat': [20, 40, 90, 18, 35, 95, 25, 88]
})

# Normalisation (important pour K-Means!)
scaler = StandardScaler()
data_scaled = scaler.fit_transform(data)

# Clustering
kmeans = KMeans(n_clusters=3, random_state=42)
data['segment'] = kmeans.fit_predict(data_scaled)

# Analyse des segments
for segment in range(3):
    print(f"\\nSegment {segment}:")
    print(data[data['segment'] == segment].mean())

# Nommer les segments
# Segment 0: "Jeunes économes"
# Segment 1: "Famille aisée"
# Segment 2: "VIP dépensiers"`} />
              </ExampleBox>
            </SubSection>
          </Section>
        </>
      )
    },
    details: "Clustering K-Means: mathématiques, algorithme, K-Means++, méthode du coude, applications."
  },
  {
    id: 2, 
    title: "PCA et Réduction de Dimensionnalité", 
    duration: "85 min", 
    type: 'text' as const,
    exercises: [
      {
        id: 'ex2-1',
        title: 'Variance expliquée',
        description: 'Valeurs propres: [50, 30, 15, 5]. Variance expliquée par PC1? Par PC1+PC2?',
        solution: 'PC1: 50/(50+30+15+5) = 50% \nPC1+PC2: (50+30)/100 = 80%'
      }
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'Que garantit PCA?',
        options: [
          'Maximum de variance dans les composantes',
          'Composantes décorrélées',
          'Ordre décroissant de variance',
          'Toutes ces réponses'
        ],
        correctAnswer: 3,
        explanation: 'PCA projette les données sur les vecteurs propres de la matrice de covariance. Cela garantit: (1) variance maximale, (2) composantes orthogonales (décorrélées), (3) ordonnées par variance décroissante.'
      }
    ],
    cheatSheet: `📚 PCA (Principal Component Analysis)

Objectif: Réduire dimensionnalité en gardant max de variance

Étapes:
1. Centrer données: X_centered = X - mean(X)
2. Calculer matrice de covariance: C = (1/n)X^T X
3. Calculer vecteurs/valeurs propres de C
4. Trier par valeur propre décroissante
5. Garder k premiers vecteurs propres
6. Projeter: X_pca = X · V_k

Variance expliquée: λ_i / Σλ_j

💡 Appliquer avant clustering/classification`,
    content: {
      component: () => (
        <>
          <Section title="PCA: Réduction de Dimensionnalité">
            <Paragraph>
              Les données réelles ont souvent des centaines/milliers de features. <strong>PCA</strong> réduit 
              la dimensionnalité en gardant l'information essentielle.
            </Paragraph>

            <SubSection title="Le Problème: La Malédiction de la Dimensionnalité">
              <Callout type="warning">
                <Paragraph>
                  <strong>Curse of Dimensionality:</strong> Plus on a de dimensions, plus les données deviennent 
                  "creuses" (sparse) et plus il faut de données pour bien généraliser.
                </Paragraph>
              </Callout>

              <div className="my-6 p-6 bg-blue-50 rounded-xl">
                <h5 className="font-bold text-lg mb-3">Exemple: Images</h5>
                <BulletList items={[
                  'Image 28×28 pixels = 784 dimensions',
                  'Image 224×224 RGB = 150,528 dimensions!',
                  'Beaucoup de pixels sont corrélés (redondance)',
                  'Solution: Réduire à quelques composantes principales'
                ]} />
              </div>
            </SubSection>

            <SubSection title="PCA: Principe Mathématique">
              <div className="my-8 p-8 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-2xl">
                <h5 className="font-bold text-2xl mb-6 text-center">Objectif de PCA</h5>
                <Paragraph>
                  Trouver les <Highlight>axes de variance maximale</Highlight> dans les données.
                </Paragraph>
                <div className="text-center text-2xl my-6">
                  <code>$\max_{'{'}{'{'}\mathbf{'{'}w{'}'}{'}'}{'}'} \text{'{'}Var{'}'}(\mathbf{'{'}X{'}'}\mathbf{'{'}w{'}'}) \quad \text{'{'}sous contrainte{'}'} \quad ||\mathbf{'{'}w{'}'}|| = 1$</code>
                </div>
                <Paragraph>
                  Les axes trouvés sont les <strong>composantes principales</strong> (vecteurs propres de la matrice de covariance).
                </Paragraph>
              </div>

              <div className="my-6 space-y-6">
                <div className="bg-white border-l-4 border-mckinsey-teal-500 p-6 rounded-r-xl shadow">
                  <h6 className="font-semibold mb-2">Étape 1: Centrer les Données</h6>
                  <div className="text-xl my-3">
                    <code>$\mathbf{'{'}X{'}'}_{'{'}{'{'}centered{'}'}{'}'} = \mathbf{'{'}X{'}'} - \bar{'{'}\mathbf{'{'}X{'}'}{'}'} $</code>
                  </div>
                  <Paragraph>Soustraire la moyenne de chaque feature.</Paragraph>
                </div>

                <div className="bg-white border-l-4 border-blue-500 p-6 rounded-r-xl shadow">
                  <h6 className="font-semibold mb-2">Étape 2: Matrice de Covariance</h6>
                  <div className="text-xl my-3">
                    <code>$\mathbf{`C`} = \frac{`1`}{`n-1`} \mathbf{`X`}^T \mathbf{`X`}$</code>
                  </div>
                  <Paragraph>Matrice (d×d) qui mesure la covariance entre chaque paire de features.</Paragraph>
                </div>

                <div className="bg-white border-l-4 border-purple-500 p-6 rounded-r-xl shadow">
                  <h6 className="font-semibold mb-2">Étape 3: Décomposition Spectrale</h6>
                  <div className="text-xl my-3">
                    <code>$\mathbf{`C`} \mathbf{`v`}_i = \lambda_i \mathbf{`v`}_i$</code>
                  </div>
                  <Paragraph>
                    $\lambda_i$ = valeurs propres (variance expliquée)<br/>
                    $\mathbf{`v`}_i$ = vecteurs propres (directions principales)
                  </Paragraph>
                </div>

                <div className="bg-white border-l-4 border-green-500 p-6 rounded-r-xl shadow">
                  <h6 className="font-semibold mb-2">Étape 4: Projection</h6>
                  <div className="text-xl my-3">
                    <code>$\mathbf{`X`}_{`PCA`} = \mathbf{`X`} \mathbf{`V`}_k$</code>
                  </div>
                  <Paragraph>
                    $\mathbf{`V`}_k$ = matrice des k premiers vecteurs propres<br/>
                    Résultat: données en k dimensions au lieu de d
                  </Paragraph>
                </div>
              </div>
            </SubSection>

            <SubSection title="Implémentation from Scratch">
              <CodeBlock language="python" code={`import numpy as np
import matplotlib.pyplot as plt

class PCA:
    def __init__(self, n_components):
        self.n_components = n_components
        self.components = None
        self.mean = None
        self.explained_variance = None
    
    def fit(self, X):
        # 1. Centrer les données
        self.mean = np.mean(X, axis=0)
        X_centered = X - self.mean
        
        # 2. Matrice de covariance
        cov_matrix = np.cov(X_centered.T)
        
        # 3. Valeurs/vecteurs propres
        eigenvalues, eigenvectors = np.linalg.eig(cov_matrix)
        
        # 4. Trier par valeur propre décroissante
        idx = eigenvalues.argsort()[::-1]
        eigenvalues = eigenvalues[idx]
        eigenvectors = eigenvectors[:, idx]
        
        # 5. Garder k premiers
        self.components = eigenvectors[:, :self.n_components]
        self.explained_variance = eigenvalues[:self.n_components]
        
        return self
    
    def transform(self, X):
        # Centrer puis projeter
        X_centered = X - self.mean
        return X_centered @ self.components
    
    def fit_transform(self, X):
        self.fit(X)
        return self.transform(X)
    
    def inverse_transform(self, X_pca):
        # Reconstruction approximative
        return X_pca @ self.components.T + self.mean

# Test
np.random.seed(42)
X = np.random.randn(100, 5)  # 100 samples, 5 features

pca = PCA(n_components=2)
X_pca = pca.fit_transform(X)

print(f"Forme originale: {X.shape}")
print(f"Forme après PCA: {X_pca.shape}")
print(f"Variance expliquée: {pca.explained_variance}")
print(f"% variance totale: {pca.explained_variance.sum() / np.var(X) * 100:.1f}%")`} />
            </SubSection>

            <SubSection title="Variance Expliquée: Choisir le Nombre de Composantes">
              <Paragraph>
                Combien de composantes garder? On veut garder ~80-95% de la variance.
              </Paragraph>

              <ExampleBox title="Scree Plot">
                <CodeBlock language="python" code={`from sklearn.decomposition import PCA
import numpy as np
import matplotlib.pyplot as plt

# Données haute dimension
X = np.random.randn(200, 50)  # 50 features

# PCA complet
pca_full = PCA()
pca_full.fit(X)

# Variance expliquée
explained_var = pca_full.explained_variance_ratio_
cumulative_var = np.cumsum(explained_var)

# Visualisation
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Graphique 1: Variance par composante
axes[0].bar(range(1, len(explained_var)+1), explained_var)
axes[0].set_xlabel('Composante Principale')
axes[0].set_ylabel('Variance Expliquée')
axes[0].set_title('Scree Plot')
axes[0].axhline(y=0.05, color='r', linestyle='--', label='Seuil 5%')
axes[0].legend()

# Graphique 2: Variance cumulée
axes[1].plot(range(1, len(cumulative_var)+1), cumulative_var, 'bo-')
axes[1].axhline(y=0.95, color='r', linestyle='--', label='95% variance')
axes[1].set_xlabel('Nombre de Composantes')
axes[1].set_ylabel('Variance Cumulée')
axes[1].set_title('Variance Cumulée')
axes[1].legend()
axes[1].grid(True)

plt.tight_layout()
plt.show()

# Trouver nb de composantes pour 95%
n_comp_95 = np.argmax(cumulative_var >= 0.95) + 1
print(f"Composantes pour 95% variance: {n_comp_95}/{len(explained_var)}")`} />
              </ExampleBox>
            </SubSection>

            <SubSection title="Visualisation 2D de Données Haute Dimension">
              <ExampleBox title="Cas d'Usage: MNIST (784D → 2D)">
                <CodeBlock language="python" code={`from sklearn.datasets import load_digits
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

# Dataset: chiffres manuscrits 8×8 = 64 pixels
digits = load_digits()
X, y = digits.data, digits.target

# PCA à 2 composantes
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X)

# Visualisation
plt.figure(figsize=(10, 8))
scatter = plt.scatter(X_pca[:, 0], X_pca[:, 1], c=y, cmap='tab10', alpha=0.6)
plt.colorbar(scatter, label='Chiffre')
plt.xlabel(f'PC1 ({pca.explained_variance_ratio_[0]:.1%} variance)')
plt.ylabel(f'PC2 ({pca.explained_variance_ratio_[1]:.1%} variance)')
plt.title('MNIST Digits projeté en 2D avec PCA')
plt.grid(True, alpha=0.3)
plt.show()

print(f"Variance totale expliquée: {pca.explained_variance_ratio_.sum():.1%}")`} />
                <Paragraph>
                  On peut voir des clusters de chiffres similaires même en 2D!
                </Paragraph>
              </ExampleBox>
            </SubSection>

            <SubSection title="t-SNE: Alternative Non-Linéaire">
              <Paragraph>
                <strong>t-SNE</strong> (t-Distributed Stochastic Neighbor Embedding) préserve mieux 
                la structure locale que PCA.
              </Paragraph>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-blue-50 border-2 border-blue-500 rounded-xl p-6">
                  <h6 className="font-bold mb-3">PCA (Linéaire)</h6>
                  <BulletList items={[
                    'Rapide (O(d³))',
                    'Préserve structure globale',
                    'Déterministe',
                    'Bon pour preprocessing'
                  ]} />
                </div>

                <div className="bg-purple-50 border-2 border-purple-500 rounded-xl p-6">
                  <h6 className="font-bold mb-3">t-SNE (Non-linéaire)</h6>
                  <BulletList items={[
                    'Lent (O(n²))',
                    'Préserve structure locale',
                    'Stochastique',
                    'Bon pour visualisation'
                  ]} />
                </div>
              </div>

              <CodeBlock language="python" code={`from sklearn.manifold import TSNE

# t-SNE sur MNIST
tsne = TSNE(n_components=2, perplexity=30, random_state=42)
X_tsne = tsne.fit_transform(X)

plt.figure(figsize=(10, 8))
scatter = plt.scatter(X_tsne[:, 0], X_tsne[:, 1], c=y, cmap='tab10', alpha=0.6)
plt.colorbar(scatter)
plt.title('MNIST avec t-SNE (structure locale mieux préservée)')
plt.show()

# Les clusters sont généralement plus séparés qu'avec PCA`} />
            </SubSection>

            <SubSection title="Application: Compression d'Images">
              <ExampleBox title="Réduire la Taille d'une Image">
                <CodeBlock language="python" code={`from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
from PIL import Image

# Charger image (par ex. 512×512×3)
img = plt.imread('photo.jpg')  # Shape: (512, 512, 3)

# Traiter chaque canal RGB séparément
compressed = np.zeros_like(img)

for channel in range(3):
    # PCA sur ce canal (512×512)
    pca = PCA(n_components=50)  # Garder 50 composantes au lieu de 512
    img_channel = img[:, :, channel]
    
    # Transformer
    X_pca = pca.fit_transform(img_channel)
    
    # Reconstruire
    X_reconstructed = pca.inverse_transform(X_pca)
    compressed[:, :, channel] = X_reconstructed

# Afficher
fig, axes = plt.subplots(1, 2, figsize=(12, 6))
axes[0].imshow(img)
axes[0].set_title('Original')
axes[0].axis('off')

axes[1].imshow(compressed.clip(0, 255).astype(np.uint8))
axes[1].set_title('Compressée (50 composantes)')
axes[1].axis('off')

plt.show()

# Taux de compression
original_size = img.size
compressed_size = 50 * (512 + 512)  # 50 composantes × (width + height)
print(f"Compression: {compressed_size / original_size:.1%}")`} />
              </ExampleBox>
            </SubSection>
          </Section>
        </>
      )
    },
    details: "PCA mathématiques complètes, réduction de dimensionnalité, variance expliquée, t-SNE."
  }
];

const objectives = [
  "Maîtriser K-Means et l'algorithme de clustering",
  "Implémenter PCA from scratch",
  "Comprendre la malédiction de la dimensionnalité",
  "Utiliser t-SNE pour la visualisation",
  "Appliquer à la segmentation et compression"
];

const prerequisites = [
  "Algèbre linéaire (vecteurs propres, valeurs propres)",
  "Statistiques (variance, covariance)",
  "Python et NumPy",
  "Module 'Apprentissage Supervisé' recommandé"
];

export default function IAApprentissageNonSupervise() {
  return (
    <CourseOverview
      courseId="ia-3-apprentissage-non-supervise"
      title="Apprentissage Non-Supervisé"
      description="Clustering et réduction de dimensionnalité avec mathématiques approfondies"
      level="Intermédiaire"
      duration="14h"
      lessonCount={lessons.length}
      lessons={lessons}
      objectives={objectives}
      prerequisites={prerequisites}
    />
  );
}
