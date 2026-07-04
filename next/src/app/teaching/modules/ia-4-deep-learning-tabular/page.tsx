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
    title: "Réseaux de Neurones: Architecture et Forward Pass", 
    duration: "90 min", 
    type: 'text' as const,
    exercises: [
      {
        id: 'ex1-1',
        title: 'Forward pass manuel',
        description: 'Réseau: 2 inputs → 3 neurones (ReLU) → 1 output (sigmoid). W1=[[0.5, 0.2], [0.3, -0.1], [0.4, 0.6]], b1=[0.1, 0, -0.2], W2=[[0.7], [0.5], [-0.3]], b2=0.1. Input: [1, 2]. Calculez output.',
        solution: 'h = ReLU([1*0.5+2*0.2+0.1, 1*0.3+2*(-0.1)+0, 1*0.4+2*0.6-0.2]) = ReLU([1.0, 0.1, 1.4]) = [1.0, 0.1, 1.4]\nz = 1.0*0.7 + 0.1*0.5 + 1.4*(-0.3) + 0.1 = 0.33\noutput = sigmoid(0.33) ≈ 0.58'
      }
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'Pourquoi les fonctions d\'activation non-linéaires sont essentielles?',
        options: [
          'Pour accélérer le calcul',
          'Sans elles, le réseau reste linéaire peu importe le nombre de couches',
          'Pour éviter l\'overfitting',
          'Pour normaliser les sorties'
        ],
        correctAnswer: 1,
        explanation: 'Sans non-linéarité, empiler des couches linéaires reste équivalent à une seule couche linéaire. L=W3(W2(W1x)) = (W3·W2·W1)x = Wx. Les non-linéarités permettent d\'apprendre des fonctions complexes.'
      }
    ],
    cheatSheet: `📚 RÉSEAUX DE NEURONES (MLP)

Architecture: Input → Hidden Layers → Output

Neurone: $z = \\sum w_i x_i + b$
Activation: $a = \\sigma(z)$

Fonctions d'activation:
- ReLU: $f(x) = \\max(0, x)$
- Sigmoid: $\\sigma(x) = \\frac{1}{1+e^{-x}}$
- Tanh: $\\tanh(x) = \\frac{e^x - e^{-x}}{e^x + e^{-x}}$

Forward pass: calculer sortie couche par couche
Backward pass: propager gradient pour update poids

💡 Universal Approximation Theorem: MLP 1 couche cachée peut approximer n'importe quelle fonction`,
    content: {
      component: () => (
        <>
          <Section title="Réseaux de Neurones: Du Perceptron au Deep Learning">
            <Paragraph>
              Les <strong>Multi-Layer Perceptrons (MLP)</strong> sont la base du Deep Learning. 
              Comprendre leur fonctionnement mathématique est crucial.
            </Paragraph>

            <SubSection title="Le Neurone Artificiel: Inspiration Biologique">
              <div className="my-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                <h5 className="font-semibold text-xl mb-4">Anatomie d'un Neurone</h5>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg">
                    <h6 className="font-bold mb-2">🧠 Neurone Biologique</h6>
                    <BulletList items={[
                      'Dendrites: reçoivent signaux',
                      'Soma: intègre signaux',
                      'Axone: transmet signal si seuil dépassé',
                      'Synapses: connexions pondérées'
                    ]} />
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h6 className="font-bold mb-2">🤖 Neurone Artificiel</h6>
                    <BulletList items={[
                      'Inputs $x_i$: signaux entrants',
                      'Poids $w_i$: force des connexions',
                      'Somme pondérée: $\\sum w_i x_i + b$',
                      'Fonction d\'activation: $\\sigma(z)$'
                    ]} />
                  </div>
                </div>
              </div>

              <div className="my-8 p-8 bg-white border-2 border-mckinsey-teal-500 rounded-2xl">
                <h5 className="font-bold text-2xl mb-6 text-center">Formule du Neurone</h5>
                <div className="text-center text-3xl my-6">
                  <code>$y = \sigma\left(\sum_{`i=1`}^{`n`} w_i x_i + b\right)$</code>
                </div>
                <div className="text-center text-2xl my-6">
                  <code>$= \sigma(\mathbf{`w`}^T \mathbf{`x`} + b)$</code>
                </div>
                <BulletList items={[
                  '$\\mathbf{x} = [x_1, x_2, ..., x_n]$: vecteur d\'entrée',
                  '$\\mathbf{w} = [w_1, w_2, ..., w_n]$: vecteur de poids',
                  '$b$: biais (seuil d\'activation)',
                  '$\\sigma$: fonction d\'activation (non-linéaire)'
                ]} />
              </div>

              <ExampleBox title="Neurone Simple: AND Logique">
                <Paragraph>
                  Peut-on apprendre la fonction AND avec un seul neurone?
                </Paragraph>
                <CodeBlock language="python" code={`import numpy as np

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

# Données: AND logique
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y = np.array([0, 0, 0, 1])

# Poids appris (après entraînement)
w = np.array([0.6, 0.6])
b = -0.9

# Prédictions
for i, x_i in enumerate(X):
    z = np.dot(w, x_i) + b
    prediction = sigmoid(z)
    print(f"Input: {x_i}, z: {z:.2f}, Prob: {prediction:.3f}, Classe: {int(prediction > 0.5)}, Vrai: {y[i]}")

# Output:
# Input: [0 0], z: -0.90, Prob: 0.289, Classe: 0, Vrai: 0
# Input: [0 1], z: -0.30, Prob: 0.426, Classe: 0, Vrai: 0
# Input: [1 0], z: -0.30, Prob: 0.426, Classe: 0, Vrai: 0
# Input: [1 1], z: 0.30, Prob: 0.574, Classe: 1, Vrai: 1`} />
              </ExampleBox>
            </SubSection>

            <SubSection title="Fonctions d'Activation: La Clé de la Non-Linéarité">
              <Callout type="warning">
                <Paragraph>
                  <strong>Pourquoi des non-linéarités?</strong><br/>
                  Sans fonction d'activation, un réseau profond est équivalent à une régression linéaire! 
                  Empiler des couches linéaires reste linéaire (produit de matrices = matrice).
                </Paragraph>
              </Callout>

              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="bg-blue-50 border-2 border-blue-500 rounded-xl p-6">
                  <h6 className="font-bold text-lg mb-3">ReLU</h6>
                  <div className="text-center text-xl my-4">
                    <code>$f(x) = \max(0, x)$</code>
                  </div>
                  <BulletList items={[
                    '✅ Simple et rapide',
                    '✅ Pas de vanishing gradient',
                    '❌ Dying ReLU (neurones "morts")'
                  ]} />
                  <div className="mt-4 text-sm">
                    <strong>Usage:</strong> Couches cachées (défaut)
                  </div>
                </div>

                <div className="bg-purple-50 border-2 border-purple-500 rounded-xl p-6">
                  <h6 className="font-bold text-lg mb-3">Sigmoid</h6>
                  <div className="text-center text-xl my-4">
                    <code>$\sigma(x) = \frac{`1`}{`1+e^{-x}`}$</code>
                  </div>
                  <BulletList items={[
                    '✅ Output [0, 1] (probabilité)',
                    '❌ Vanishing gradient',
                    '❌ Non centré en 0'
                  ]} />
                  <div className="mt-4 text-sm">
                    <strong>Usage:</strong> Classification binaire (sortie)
                  </div>
                </div>

                <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
                  <h6 className="font-bold text-lg mb-3">Tanh</h6>
                  <div className="text-center text-lg my-4">
                    <code>$\tanh(x) = \frac{`e^x - e^{-x}`}{`e^x + e^{-x}`}$</code>
                  </div>
                  <BulletList items={[
                    '✅ Output [-1, 1] (centré)',
                    '✅ Meilleur que sigmoid',
                    '❌ Vanishing gradient'
                  ]} />
                  <div className="mt-4 text-sm">
                    <strong>Usage:</strong> RNN, LSTM
                  </div>
                </div>
              </div>

              <ExampleBox title="Comparaison des Activations">
                <CodeBlock language="python" code={`import numpy as np
import matplotlib.pyplot as plt

def relu(x):
    return np.maximum(0, x)

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def tanh(x):
    return np.tanh(x)

# Valeurs
x = np.linspace(-5, 5, 100)

# Visualisation
fig, axes = plt.subplots(1, 3, figsize=(15, 4))

# ReLU
axes[0].plot(x, relu(x), 'b-', linewidth=2)
axes[0].set_title('ReLU', fontsize=14)
axes[0].grid(True, alpha=0.3)
axes[0].axhline(0, color='k', linewidth=0.5)
axes[0].axvline(0, color='k', linewidth=0.5)

# Sigmoid
axes[1].plot(x, sigmoid(x), 'r-', linewidth=2)
axes[1].set_title('Sigmoid', fontsize=14)
axes[1].grid(True, alpha=0.3)
axes[1].axhline(0, color='k', linewidth=0.5)
axes[1].axvline(0, color='k', linewidth=0.5)

# Tanh
axes[2].plot(x, tanh(x), 'g-', linewidth=2)
axes[2].set_title('Tanh', fontsize=14)
axes[2].grid(True, alpha=0.3)
axes[2].axhline(0, color='k', linewidth=0.5)
axes[2].axvline(0, color='k', linewidth=0.5)

plt.tight_layout()
plt.show()`} />
              </ExampleBox>

              <div className="my-6 p-6 bg-amber-50 border-2 border-amber-500 rounded-xl">
                <h6 className="font-bold text-lg mb-3">Autres Activations Modernes</h6>
                <BulletList items={[
                  '<strong>Leaky ReLU:</strong> $f(x) = \\max(0.01x, x)$ → résout dying ReLU',
                  '<strong>ELU:</strong> $f(x) = x$ si $x > 0$ sinon $\\alpha(e^x - 1)$ → outputs moyens proches de 0',
                  '<strong>GELU:</strong> $f(x) = x \\cdot \\Phi(x)$ → utilisé dans Transformers (BERT, GPT)',
                  '<strong>Swish/SiLU:</strong> $f(x) = x \\cdot \\sigma(x)$ → smooth, meilleur que ReLU pour Deep NNs'
                ]} />
              </div>
            </SubSection>

            <SubSection title="Architecture Multi-Couches (MLP)">
              <Paragraph>
                Un MLP = empilement de couches fully-connected (dense).
              </Paragraph>

              <div className="my-8 p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl">
                <h5 className="font-bold text-2xl mb-6 text-center">Forward Pass</h5>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold">Couche 1 (Input → Hidden 1):</p>
                    <div className="text-xl my-2">
                      <code>$\mathbf{`z`}^{`[1]`} = \mathbf{`W`}^{`[1]`} \mathbf{`x`} + \mathbf{`b`}^{`[1]`}$</code>
                    </div>
                    <div className="text-xl my-2">
                      <code>$\mathbf{`a`}^{`[1]`} = \sigma(\mathbf{`z`}^{`[1]`})$</code>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold">Couche 2 (Hidden 1 → Hidden 2):</p>
                    <div className="text-xl my-2">
                      <code>$\mathbf{`z`}^{`[2]`} = \mathbf{`W`}^{`[2]`} \mathbf{`a`}^{`[1]`} + \mathbf{`b`}^{`[2]`}$</code>
                    </div>
                    <div className="text-xl my-2">
                      <code>$\mathbf{`a`}^{`[2]`} = \sigma(\mathbf{`z`}^{`[2]`})$</code>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold">Couche Output:</p>
                    <div className="text-xl my-2">
                      <code>$\mathbf{`z`}^{`[L]`} = \mathbf{`W`}^{`[L]`} \mathbf{`a`}^{`[L-1]`} + \mathbf{`b`}^{`[L]`}$</code>
                    </div>
                    <div className="text-xl my-2">
                      <code>$\hat{`\mathbf{y}`} = \text{`softmax`}(\mathbf{`z`}^{`[L]`})$</code>
                    </div>
                  </div>
                </div>
              </div>

              <ExampleBox title="Implémentation Forward Pass">
                <CodeBlock language="python" code={`import numpy as np

class MLP:
    def __init__(self, layers):
        """
        layers: liste des tailles [input, hidden1, hidden2, ..., output]
        Ex: [4, 16, 8, 3] = 4 inputs, 2 couches cachées (16, 8), 3 outputs
        """
        self.layers = layers
        self.weights = []
        self.biases = []
        
        # Initialisation Xavier (pour activation tanh/sigmoid)
        for i in range(len(layers) - 1):
            w = np.random.randn(layers[i+1], layers[i]) * np.sqrt(1/layers[i])
            b = np.zeros((layers[i+1], 1))
            self.weights.append(w)
            self.biases.append(b)
    
    def relu(self, z):
        return np.maximum(0, z)
    
    def softmax(self, z):
        exp_z = np.exp(z - np.max(z, axis=0, keepdims=True))  # stabilité numérique
        return exp_z / np.sum(exp_z, axis=0, keepdims=True)
    
    def forward(self, X):
        """
        X: (n_features, n_samples)
        """
        self.activations = [X]  # Sauvegarder pour backprop
        self.z_values = []
        
        a = X
        for i in range(len(self.weights)):
            # Linear transformation
            z = self.weights[i] @ a + self.biases[i]
            self.z_values.append(z)
            
            # Activation
            if i < len(self.weights) - 1:
                # Couches cachées: ReLU
                a = self.relu(z)
            else:
                # Couche output: Softmax
                a = self.softmax(z)
            
            self.activations.append(a)
        
        return a

# Test
mlp = MLP([4, 16, 8, 3])

# Batch de 5 exemples
X = np.random.randn(4, 5)
output = mlp.forward(X)

print(f"Input shape: {X.shape}")
print(f"Output shape: {output.shape}")
print(f"Prédictions (somme = 1):\\n{output.T}")
print(f"Classes prédites: {np.argmax(output, axis=0)}")`} />
              </ExampleBox>
            </SubSection>

            <SubSection title="Universal Approximation Theorem">
              <div className="my-6 p-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-4 border-yellow-500 rounded-2xl">
                <h5 className="font-bold text-2xl mb-4 text-center">Théorème Fondamental</h5>
                <Paragraph>
                  <strong>Un MLP avec une seule couche cachée (assez large) peut approximer n'importe quelle 
                  fonction continue sur un compact.</strong>
                </Paragraph>
                <div className="text-center text-xl my-6">
                  <code>$\forall f: \mathbb{`R`}^n \to \mathbb{`R`}^m, \exists \text{` MLP`} : |f(x) - MLP(x)| {'<'} \epsilon$</code>
                </div>
                <Paragraph>
                  <Highlight>En pratique:</Highlight> Les réseaux profonds (plusieurs couches) apprennent plus 
                  efficacement que les réseaux larges (beaucoup de neurones dans 1 couche).
                </Paragraph>
              </div>

              <Callout type="info">
                <Paragraph>
                  <strong>Profondeur vs Largeur:</strong><br/>
                  - <strong>Large & Shallow:</strong> Peut tout représenter mais nécessite énormément de neurones<br/>
                  - <strong>Deep & Narrow:</strong> Apprend hiérarchiquement (features bas niveau → haut niveau) 
                  avec moins de paramètres
                </Paragraph>
              </Callout>
            </SubSection>

            <SubSection title="Loss Functions pour Tâches Différentes">
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-blue-50 border-2 border-blue-500 rounded-xl p-6">
                  <h6 className="font-bold text-lg mb-3">Classification Binaire</h6>
                  <p className="font-semibold mb-2">Binary Cross-Entropy</p>
                  <div className="text-lg my-3">
                    <code>$L = -\frac{`1`}{`n`}\sum [y\log(\hat{`y`}) + (1-y)\log(1-\hat{`y`})]$</code>
                  </div>
                  <div className="text-sm">
                    Output: 1 neurone + sigmoid<br/>
                    Mesure: divergence entre distribution prédite et vraie
                  </div>
                </div>

                <div className="bg-purple-50 border-2 border-purple-500 rounded-xl p-6">
                  <h6 className="font-bold text-lg mb-3">Classification Multi-Classe</h6>
                  <p className="font-semibold mb-2">Categorical Cross-Entropy</p>
                  <div className="text-lg my-3">
                    <code>$L = -\frac{`1`}{`n`}\sum_{`i`}\sum_{`k`} y_{`ik`} \log(\hat{`y`}_{`ik`})$</code>
                  </div>
                  <div className="text-sm">
                    Output: C neurones + softmax<br/>
                    $y$ = one-hot encoded labels
                  </div>
                </div>

                <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
                  <h6 className="font-bold text-lg mb-3">Régression</h6>
                  <p className="font-semibold mb-2">Mean Squared Error</p>
                  <div className="text-lg my-3">
                    <code>$L = \frac{`1`}{`n`}\sum (y - \hat{`y`})^2$</code>
                  </div>
                  <div className="text-sm">
                    Output: k neurones (sans activation)<br/>
                    Mesure: distance euclidienne au carré
                  </div>
                </div>

                <div className="bg-amber-50 border-2 border-amber-500 rounded-xl p-6">
                  <h6 className="font-bold text-lg mb-3">Régression Robuste</h6>
                  <p className="font-semibold mb-2">Mean Absolute Error (MAE)</p>
                  <div className="text-lg my-3">
                    <code>$L = \frac{`1`}{`n`}\sum |y - \hat{`y`}|$</code>
                  </div>
                  <div className="text-sm">
                    Moins sensible aux outliers que MSE<br/>
                    Gradient constant (pas quadratique)
                  </div>
                </div>
              </div>
            </SubSection>
          </Section>
        </>
      )
    },
    details: "Architecture MLP, fonctions d'activation, forward pass, universal approximation theorem, loss functions."
  }
];

const objectives = [
  "Comprendre l'architecture des réseaux de neurones",
  "Maîtriser les fonctions d'activation (ReLU, sigmoid, tanh)",
  "Implémenter le forward pass from scratch",
  "Choisir la bonne loss function selon la tâche",
  "Appliquer aux données tabulaires"
];

const prerequisites = [
  "Algèbre linéaire (produit matriciel)",
  "Calcul différentiel (dérivées, chain rule)",
  "Python, NumPy",
  "Modules précédents (régression, classification)"
];

export default function IADeepLearningTabular() {
  return (
    <CourseOverview
      courseId="ia-4-deep-learning-tabular"
      title="Deep Learning: Données Tabulaires"
      description="Réseaux de neurones (MLP) avec mathématiques approfondies et implémentations from scratch"
      level="Avancé"
      duration="16h"
      lessonCount={lessons.length}
      lessons={lessons}
      objectives={objectives}
      prerequisites={prerequisites}
    />
  );
}
