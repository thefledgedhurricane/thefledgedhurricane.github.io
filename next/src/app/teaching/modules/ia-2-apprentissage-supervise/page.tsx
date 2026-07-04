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
    title: "Régression Linéaire: Fondements Mathématiques", 
    duration: "75 min", 
    type: 'text' as const,
    exercises: [
      {
        id: 'ex1-1',
        title: 'Calculer les paramètres',
        description: 'Données: [(1,2), (2,4), (3,5), (4,4), (5,5)]. Calculez w et b pour y = wx + b par la méthode des moindres carrés.',
        solution: 'Formule: w = (n∑xy - ∑x∑y) / (n∑x² - (∑x)²)\nCalcul: w ≈ 0.8, b ≈ 1.6'
      }
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'Pourquoi utilise-t-on MSE (Mean Squared Error)?',
        options: [
          'C\'est plus facile à calculer',
          'Ça pénalise plus fortement les grandes erreurs',
          'C\'est différentiable partout',
          'Les réponses B et C'
        ],
        correctAnswer: 3,
        explanation: 'MSE = moyenne des carrés des erreurs. L\'élévation au carré (1) pénalise exponentiellement les grandes erreurs et (2) rend la fonction dérivable, essentiel pour la descente de gradient.'
      }
    ],
    cheatSheet: `📚 RÉGRESSION LINÉAIRE

Modèle: $y = wx + b$
Loss (MSE): $L = \\frac{1}{n}\\sum(y_i - \\hat{y}_i)^2$
Gradient: $\\frac{\\partial L}{\\partial w} = \\frac{-2}{n}\\sum x_i(y_i - \\hat{y}_i)$

Update: $w := w - \\alpha \\cdot \\nabla L$

💡 Hypothèses: Linéarité, Indépendance, Normalité des résidus`,
    content: {
      component: () => (
        <>
          <Section title="Régression Linéaire: Le Fondement de Tout">
            <Paragraph>
              La régression linéaire est l'algorithme le plus simple et le plus important du Machine Learning. 
              Comprendre ses mathématiques est essentiel pour tout le reste.
            </Paragraph>

            <SubSection title="Le Modèle Mathématique">
              <div className="my-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <h5 className="font-semibold text-xl mb-4">Forme Générale</h5>
                <div className="text-center text-3xl my-6">
                  <code>$\hat{`y`} = w_0 + w_1 x_1 + w_2 x_2 + ... + w_n x_n$</code>
                </div>
                <Paragraph>
                  Ou en notation vectorielle:
                </Paragraph>
                <div className="text-center text-3xl my-6">
                  <code>$\hat{`y`} = \mathbf{`w`}^T \mathbf{`x`} + b$</code>
                </div>
                <BulletList items={[
                  '$\\hat{y}$: Prédiction (valeur estimée)',
                  '$\\mathbf{x}$: Vecteur des features (variables d\'entrée)',
                  '$\\mathbf{w}$: Vecteur des poids (coefficients)',
                  '$b$: Biais (intercept)'
                ]} />
              </div>

              <ExampleBox title="Exemple: Prédire le Prix d'une Maison">
                <Paragraph>
                  Variables: surface (m²), nombre de chambres, âge (années)
                </Paragraph>
                <CodeBlock language="python" code={`import numpy as np

# Données d'une maison
x = np.array([120, 3, 5])  # [surface, chambres, âge]

# Poids appris (en euros)
w = np.array([2500, 15000, -5000])  # Impact de chaque variable
b = 50000  # Prix de base

# Prédiction
prix = np.dot(w, x) + b
# = 2500*120 + 15000*3 + (-5000)*5 + 50000
# = 300,000 + 45,000 - 25,000 + 50,000
# = 370,000 euros

print(f"Prix estimé: {prix:,.0f} €")`} />
              </ExampleBox>
            </SubSection>

            <SubSection title="Fonction de Coût: Mean Squared Error (MSE)">
              <Paragraph>
                Comment mesurer la qualité de notre modèle? On compare les prédictions aux vraies valeurs.
              </Paragraph>
              
              <div className="my-6 p-6 bg-white border-2 border-mckinsey-teal-500 rounded-xl">
                <h5 className="font-semibold text-lg mb-3">Formule MSE</h5>
                <div className="text-center text-2xl my-4">
                  <code>$L(\mathbf{`w`}, b) = \frac{`1`}{`n`} \sum_{`i=1`}^{`n`} (y_i - \hat{`y`}_i)^2$</code>
                </div>
                <div className="text-center text-2xl my-4">
                  <code>$= \frac{`1`}{`n`} \sum_{`i=1`}^{`n`} (y_i - (\mathbf{`w`}^T \mathbf{`x`}_i + b))^2$</code>
                </div>
                <Paragraph>
                  Objectif: <strong>Minimiser $L$</strong> en trouvant les meilleurs $\mathbf{`w`}$ et $b$.
                </Paragraph>
              </div>

              <Callout type="info">
                <Paragraph>
                  <strong>Pourquoi l'élévation au carré?</strong><br/>
                  1. Les erreurs négatives ne s'annulent pas avec les positives<br/>
                  2. Pénalise exponentiellement les grandes erreurs (erreur de 10 pèse 100x plus qu'erreur de 1)<br/>
                  3. Fonction dérivable partout (contrairement à |x|)
                </Paragraph>
              </Callout>

              <ExampleBox title="Calcul de MSE - Exemple Numérique">
                <CodeBlock language="python" code={`import numpy as np

# Données réelles
y_true = np.array([100, 150, 200, 250, 300])  # Prix réels (en k€)

# Prédictions de notre modèle
y_pred = np.array([110, 140, 210, 240, 310])  # Prix prédits

# Erreurs
erreurs = y_true - y_pred
# = [-10, 10, -10, 10, -10]

# Erreurs au carré
erreurs_carrees = erreurs ** 2
# = [100, 100, 100, 100, 100]

# MSE (moyenne)
mse = np.mean(erreurs_carrees)
# = 100 k€²

# RMSE (Root MSE - plus interprétable)
rmse = np.sqrt(mse)
# = 10 k€

print(f"MSE: {mse}")
print(f"RMSE: {rmse} k€ d'erreur moyenne")`} />
              </ExampleBox>
            </SubSection>

            <SubSection title="Descente de Gradient: Trouver l'Optimum">
              <Paragraph>
                Comment trouver les poids qui minimisent la loss? <strong>Descente de gradient</strong>!
              </Paragraph>

              <div className="my-6 p-8 bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 rounded-2xl">
                <h5 className="font-bold text-2xl mb-6 text-center">Algorithme de Descente de Gradient</h5>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="font-semibold text-lg mb-3">1. Calculer le Gradient</p>
                    <div className="text-center text-xl">
                      <code>$\frac{`\partial L`}{`\partial w_j`} = \frac{`-2`}{`n`} \sum_{`i=1`}^{`n`} x_{`ij`}(y_i - \hat{`y`}_i)$</code>
                    </div>
                    <div className="text-center text-xl mt-2">
                      <code>$\frac{`\partial L`}{`\partial b`} = \frac{`-2`}{`n`} \sum_{`i=1`}^{`n`} (y_i - \hat{`y`}_i)$</code>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="font-semibold text-lg mb-3">2. Mise à Jour des Paramètres</p>
                    <div className="text-center text-xl">
                      <code>$w_j := w_j - \alpha \cdot \frac{`\partial L`}{`\partial w_j`}$</code>
                    </div>
                    <div className="text-center text-xl mt-2">
                      <code>$b := b - \alpha \cdot \frac{`\partial L`}{`\partial b`}$</code>
                    </div>
                    <Paragraph>
                      $\alpha$ = learning rate (taille du pas, ex: 0.01)
                    </Paragraph>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="font-semibold text-lg mb-3">3. Répéter jusqu'à Convergence</p>
                    <Paragraph>
                      Critères d'arrêt:<br/>
                      - Nombre d'itérations max (epochs)<br/>
                      - Loss ne diminue plus (∆L {'<'} seuil)<br/>
                      - Gradients proches de 0
                    </Paragraph>
                  </div>
                </div>
              </div>

              <ExampleBox title="Implémentation Complète">
                <CodeBlock language="python" code={`import numpy as np
import matplotlib.pyplot as plt

# Génération de données synthétiques
np.random.seed(42)
X = 2 * np.random.rand(100, 1)
y = 4 + 3 * X + np.random.randn(100, 1)  # y = 4 + 3x + bruit

# Ajout d'une colonne de 1 pour le biais
X_b = np.c_[np.ones((100, 1)), X]  # [1, x]

# Initialisation des paramètres
theta = np.random.randn(2, 1)  # [b, w]
alpha = 0.1  # learning rate
n_iterations = 1000

# Descente de gradient
history_loss = []
for iteration in range(n_iterations):
    # Prédictions
    y_pred = X_b.dot(theta)
    
    # Erreurs
    errors = y_pred - y
    
    # Calcul de la loss (MSE)
    mse = (errors ** 2).mean()
    history_loss.append(mse)
    
    # Calcul du gradient
    gradients = 2/100 * X_b.T.dot(errors)
    
    # Mise à jour
    theta = theta - alpha * gradients
    
    if iteration % 100 == 0:
        print(f"Iteration {iteration}: MSE = {mse:.4f}")

print(f"\\nParamètres finaux:")
print(f"b = {theta[0][0]:.2f}")  # ≈ 4
print(f"w = {theta[1][0]:.2f}")  # ≈ 3

# Visualisation
plt.figure(figsize=(12, 4))

# Graphique 1: Données et modèle
plt.subplot(1, 2, 1)
plt.scatter(X, y, alpha=0.5)
plt.plot(X, X_b.dot(theta), 'r-', linewidth=2, label='Modèle appris')
plt.xlabel('x')
plt.ylabel('y')
plt.legend()
plt.title('Régression Linéaire')

# Graphique 2: Convergence
plt.subplot(1, 2, 2)
plt.plot(history_loss)
plt.xlabel('Itération')
plt.ylabel('MSE')
plt.title('Convergence de la Loss')
plt.yscale('log')
plt.grid(True)

plt.tight_layout()
plt.show()`} />
              </ExampleBox>
            </SubSection>

            <SubSection title="Solution Analytique: Normal Equation">
              <Paragraph>
                Il existe une formule fermée pour la régression linéaire (pas besoin de gradient!):
              </Paragraph>
              
              <div className="my-6 p-6 bg-amber-50 border-2 border-amber-500 rounded-xl">
                <h5 className="font-bold text-xl mb-4 text-center">Équation Normale</h5>
                <div className="text-center text-2xl my-6">
                  <code>$\mathbf{`w`} = (\mathbf{`X`}^T \mathbf{`X`})^{`-1`} \mathbf{`X`}^T \mathbf{`y`}$</code>
                </div>
                <Paragraph>
                  Solution optimale en une seule étape (pas d'itérations)!
                </Paragraph>
              </div>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
                  <h6 className="font-bold mb-3">✅ Avantages</h6>
                  <BulletList items={[
                    'Pas de learning rate à choisir',
                    'Pas d\'itérations',
                    'Solution exacte garantie'
                  ]} />
                </div>

                <div className="bg-red-50 border-2 border-red-500 rounded-xl p-6">
                  <h6 className="font-bold mb-3">❌ Inconvénients</h6>
                  <BulletList items={[
                    'Coûteux: O(n³) pour inverser la matrice',
                    'Impossible si X^T X non inversible',
                    'Pas adapté aux gros datasets (>10,000 features)'
                  ]} />
                </div>
              </div>

              <CodeBlock language="python" code={`import numpy as np

# Méthode 1: Descente de gradient (itérative)
def gradient_descent(X, y, alpha=0.01, n_iter=1000):
    theta = np.random.randn(X.shape[1], 1)
    for _ in range(n_iter):
        gradients = 2/len(X) * X.T.dot(X.dot(theta) - y)
        theta = theta - alpha * gradients
    return theta

# Méthode 2: Équation normale (directe)
def normal_equation(X, y):
    return np.linalg.inv(X.T.dot(X)).dot(X.T).dot(y)

# Comparaison
X_b = np.c_[np.ones((100, 1)), X]
theta_gd = gradient_descent(X_b, y)
theta_ne = normal_equation(X_b, y)

print("Gradient Descent:", theta_gd.T)
print("Normal Equation: ", theta_ne.T)
# Les deux donnent le même résultat!`} />
            </SubSection>

            <SubSection title="Régression Polynomiale: Non-Linéarité">
              <Paragraph>
                La régression "linéaire" peut modéliser des relations non-linéaires!
              </Paragraph>

              <ExampleBox title="Transformer les Features">
                <Paragraph>
                  Au lieu de $y = w_1 x + b$, on peut faire:
                </Paragraph>
                <div className="text-center text-xl my-4">
                  <code>$y = w_1 x + w_2 x^2 + w_3 x^3 + b$</code>
                </div>
                <Paragraph>
                  C'est toujours linéaire... <strong>en les paramètres $w$</strong>!
                </Paragraph>

                <CodeBlock language="python" code={`from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
import numpy as np

# Données non-linéaires (parabole)
X = np.linspace(-3, 3, 100).reshape(-1, 1)
y = 0.5 * X**2 + X + 2 + np.random.randn(100, 1) * 0.5

# Créer features polynomiales: [x, x², x³]
poly_features = PolynomialFeatures(degree=3, include_bias=False)
X_poly = poly_features.fit_transform(X)

# Régression linéaire sur features transformées
model = LinearRegression()
model.fit(X_poly, y)

# Prédiction
y_pred = model.predict(X_poly)

print(f"Coefficients: {model.coef_}")
print(f"Intercept: {model.intercept_}")`} />
              </ExampleBox>

              <Callout type="warning">
                <Paragraph>
                  <strong>Attention à l'overfitting!</strong> Un polynôme de degré élevé peut parfaitement 
                  fitter les données d'entraînement mais généraliser très mal. Solution: <Highlight>Régularisation</Highlight>.
                </Paragraph>
              </Callout>
            </SubSection>

            <SubSection title="Régularisation: Ridge et Lasso">
              <Paragraph>
                Pour éviter l'overfitting, on pénalise les poids trop grands.
              </Paragraph>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-blue-50 border-2 border-blue-500 rounded-xl p-6">
                  <h5 className="font-bold text-lg mb-3">Ridge (L2)</h5>
                  <div className="text-center text-lg my-4">
                    <code>$L = MSE + \lambda \sum w_j^2$</code>
                  </div>
                  <BulletList items={[
                    'Pénalise le carré des poids',
                    'Réduit l\'amplitude des poids',
                    'Tous les features conservés'
                  ]} />
                </div>

                <div className="bg-purple-50 border-2 border-purple-500 rounded-xl p-6">
                  <h5 className="font-bold text-lg mb-3">Lasso (L1)</h5>
                  <div className="text-center text-lg my-4">
                    <code>$L = MSE + \lambda \sum |w_j|$</code>
                  </div>
                  <BulletList items={[
                    'Pénalise la valeur absolue',
                    'Peut mettre certains poids à 0',
                    'Sélection automatique de features'
                  ]} />
                </div>
              </div>

              <CodeBlock language="python" code={`from sklearn.linear_model import Ridge, Lasso

# Ridge Regression
ridge = Ridge(alpha=1.0)  # λ = 1
ridge.fit(X_train, y_train)

# Lasso Regression
lasso = Lasso(alpha=0.1)  # λ = 0.1
lasso.fit(X_train, y_train)

# Comparer les coefficients
print("Ridge coefficients:", ridge.coef_)
print("Lasso coefficients:", lasso.coef_)
# Lasso aura des 0 (features éliminées)`} />
            </SubSection>
          </Section>
        </>
      )
    },
    details: "Mathématiques complètes de la régression linéaire: MSE, gradient descent, équation normale, régularisation."
  }
];

const objectives = [
  "Maîtriser les mathématiques de la régression linéaire",
  "Implémenter la descente de gradient from scratch",
  "Comprendre MSE, RMSE, R²",
  "Utiliser la régularisation (Ridge, Lasso)",
  "Appliquer à des problèmes réels"
];

const prerequisites = [
  "Algèbre linéaire (matrices, produit matriciel)",
  "Calcul différentiel (dérivées, gradient)",
  "Python et NumPy",
  "Module 'Introduction à l'IA' complété"
];

export default function IAApprentissageSupervise() {
  return (
    <CourseOverview
      courseId="ia-2-apprentissage-supervise"
      title="Apprentissage Supervisé: Régression"
      description="Mathématiques approfondies de la régression linéaire et non-linéaire"
      level="Intermédiaire"
      duration="12h"
      lessonCount={lessons.length}
      lessons={lessons}
      objectives={objectives}
      prerequisites={prerequisites}
    />
  );
}
