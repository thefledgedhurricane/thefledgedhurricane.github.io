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
    title: "Fondements de l'Intelligence Artificielle", 
    duration: "60 min", 
    type: 'text' as const,
    exercises: [
      {
        id: 'ex1-1',
        title: 'Définir l\'IA',
        description: 'Expliquez avec vos propres mots la différence entre IA, ML et DL. Donnez 3 exemples concrets pour chaque niveau.',
        solution: 'IA: Tout système automatisé intelligent (ex: thermostat, chatbot à règles, GPS)\nML: Apprend des données (ex: filtre spam, recommandation Netflix)\nDL: Réseaux de neurones profonds (ex: reconnaissance faciale, ChatGPT, voitures autonomes)'
      }
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'Quelle affirmation sur l\'AGI est correcte?',
        options: [
          'L\'AGI existe déjà (ex: ChatGPT)',
          'L\'AGI serait capable de résoudre n\'importe quel problème intellectuel',
          'L\'AGI est moins performante que l\'ANI',
          'L\'AGI ne nécessite pas d\'apprentissage'
        ],
        correctAnswer: 1,
        explanation: 'L\'AGI (Artificial General Intelligence) est une IA hypothétique qui aurait une intelligence générale comparable à l\'humain, capable de s\'adapter à tout domaine. Elle n\'existe pas encore - ChatGPT est une ANI très performante mais limitée au langage.'
      },
      {
        id: 'q1-2',
        question: 'Le test de Turing mesure:',
        options: [
          'La vitesse de calcul d\'un ordinateur',
          'La capacité d\'une IA à imiter une conversation humaine',
          'La précision d\'un algorithme',
          'La consommation électrique d\'un réseau de neurones'
        ],
        correctAnswer: 1,
        explanation: 'Le test de Turing (1950) propose: si un juge humain ne peut distinguer une machine d\'un humain lors d\'une conversation textuelle, la machine "passe" le test. Aujourd\'hui, des modèles comme GPT-4 passent souvent ce test.'
      }
    ],
    cheatSheet: `📚 FONDEMENTS DE L'IA

🔹 DÉFINITIONS
• IA: Machines capables de tâches intelligentes
• ML: Apprentissage à partir de données
• DL: Réseaux de neurones multicouches

🔹 TYPES D'IA
ANI (Narrow): Spécialisée (existe)
AGI (General): Intelligence humaine (n'existe pas)
ASI (Super): Au-delà de l'humain (théorique)

🔹 TEST DE TURING (1950)
Une machine peut-elle imiter l'humain en conversation?

🔹 APPLICATIONS
Santé, Transport, Finance, Communication, Créativité

⚠️ ENJEUX
Biais, Vie privée, Emploi, Éthique`,
    content: {
      component: () => (
        <>
          <Section title="Qu'est-ce que l'Intelligence Artificielle?">
            <Paragraph>
              L'Intelligence Artificielle (IA) est la science et l'ingénierie visant à créer des machines capables 
              d'effectuer des tâches qui nécessiteraient normalement l'intelligence humaine.
            </Paragraph>

            <SubSection title="La Hiérarchie: IA ⊃ ML ⊃ DL">
              <div className="my-8 p-6 bg-gradient-to-r from-mckinsey-teal-50 to-blue-50 rounded-xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-full h-20 bg-mckinsey-teal-100 rounded-lg flex items-center justify-center font-semibold text-lg">
                      Intelligence Artificielle (IA)
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pl-8">
                    <div className="w-5/6 h-20 bg-mckinsey-teal-200 rounded-lg flex items-center justify-center font-semibold">
                      Machine Learning (ML)
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pl-16">
                    <div className="w-4/6 h-20 bg-mckinsey-teal-300 rounded-lg flex items-center justify-center font-semibold">
                      Deep Learning (DL)
                    </div>
                  </div>
                </div>
              </div>

              <BulletList items={[
                'IA (1950s): Tout système automatisé "intelligent" - règles codées en dur, systèmes experts',
                'Machine Learning (1980s): Les machines apprennent des patterns à partir de données',
                'Deep Learning (2010s): Réseaux de neurones artificiels profonds inspirés du cerveau'
              ]} />
            </SubSection>

            <SubSection title="ANI vs AGI vs ASI">
              <div className="grid md:grid-cols-3 gap-6 my-6">
                <div className="bg-white border-2 border-mckinsey-teal-500 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-mckinsey-navy-900 mb-3">ANI</h4>
                  <p className="text-sm font-semibold text-mckinsey-teal-600 mb-2">Artificial Narrow Intelligence</p>
                  <Paragraph>
                    ✅ Existe aujourd'hui<br/>
                    Spécialisée dans UNE tâche<br/>
                    Ex: AlphaGo, Siri, ChatGPT
                  </Paragraph>
                </div>

                <div className="bg-white border-2 border-yellow-500 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-mckinsey-navy-900 mb-3">AGI</h4>
                  <p className="text-sm font-semibold text-yellow-600 mb-2">Artificial General Intelligence</p>
                  <Paragraph>
                    ⏳ En recherche<br/>
                    Intelligence générale humaine<br/>
                    S'adapte à tout domaine
                  </Paragraph>
                </div>

                <div className="bg-white border-2 border-red-500 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-mckinsey-navy-900 mb-3">ASI</h4>
                  <p className="text-sm font-semibold text-red-600 mb-2">Artificial Super Intelligence</p>
                  <Paragraph>
                    🔮 Théorique<br/>
                    Dépasse l'intelligence humaine<br/>
                    Préoccupation existentielle
                  </Paragraph>
                </div>
              </div>
            </SubSection>

            <SubSection title="Le Test de Turing (1950)">
              <Paragraph>
                Alan Turing a proposé un test opérationnel de l'intelligence machine:
              </Paragraph>
              <ExampleBox title="Le Test">
                <Paragraph>
                  Un juge humain engage des conversations textuelles avec:
                </Paragraph>
                <BulletList items={[
                  'Un autre humain',
                  'Une machine'
                ]} />
                <Paragraph>
                  Si le juge ne peut pas déterminer de manière fiable qui est qui, la machine "passe" le test.
                </Paragraph>
              </ExampleBox>

              <Callout type="info">
                <Paragraph>
                  <strong>Débat moderne:</strong> Des modèles comme GPT-4 passent souvent le test de Turing, 
                  mais sont-ils vraiment "intelligents" ou juste d'excellents imitateurs statistiques?
                </Paragraph>
              </Callout>
            </SubSection>

            <SubSection title="Les Trois Facteurs de la Renaissance IA (2012-)">
              <div className="grid md:grid-cols-3 gap-6 my-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h5 className="font-bold text-lg mb-3">📊 Big Data</h5>
                  <Paragraph>
                    Internet génère des <strong>pétaoctets</strong> de données quotidiennement. 
                    Plus de données = meilleurs modèles.
                  </Paragraph>
                  <p className="text-sm mt-2 text-gray-600">
                    ImageNet (2009): 14M images<br/>
                    Common Crawl: 250 milliards de pages web
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h5 className="font-bold text-lg mb-3">⚡ GPU / TPU</h5>
                  <Paragraph>
                    Les cartes graphiques (initialement pour jeux vidéo) sont parfaites pour les 
                    <strong> multiplications matricielles</strong> du Deep Learning.
                  </Paragraph>
                  <p className="text-sm mt-2 text-gray-600">
                    CPU: ~10 TFLOPS<br/>
                    GPU (NVIDIA A100): ~312 TFLOPS<br/>
                    TPU v4: ~275 TFLOPS
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h5 className="font-bold text-lg mb-3">🧮 Algorithmes</h5>
                  <Paragraph>
                    Percées majeures:<br/>
                    - <strong>2012:</strong> AlexNet (CNN)<br/>
                    - <strong>2014:</strong> GAN<br/>
                    - <strong>2017:</strong> Transformers<br/>
                    - <strong>2020:</strong> GPT-3
                  </Paragraph>
                </div>
              </div>
            </SubSection>

            <SubSection title="Applications Concrètes Aujourd'hui">
              <div className="space-y-4 my-6">
                <div className="border-l-4 border-mckinsey-teal-500 pl-6 py-2">
                  <h5 className="font-semibold text-mckinsey-navy-900">🏥 Santé</h5>
                  <Paragraph>
                    - Détection de cancers (sensibilité &gt;95%)<br/>
                    - AlphaFold: Structure 3D de 200M+ protéines<br/>
                    - Diagnostic médical assisté par IA
                  </Paragraph>
                </div>

                <div className="border-l-4 border-blue-500 pl-6 py-2">
                  <h5 className="font-semibold text-mckinsey-navy-900">🚗 Transport</h5>
                  <Paragraph>
                    - Waymo: +20M miles autonomes<br/>
                    - Tesla FSD (Full Self-Driving)<br/>
                    - Optimisation de routes (Google Maps)
                  </Paragraph>
                </div>

                <div className="border-l-4 border-purple-500 pl-6 py-2">
                  <h5 className="font-semibold text-mckinsey-navy-900">💬 Langage</h5>
                  <Paragraph>
                    - ChatGPT: 100M utilisateurs en 2 mois<br/>
                    - Traduction instantanée (DeepL, Google)<br/>
                    - Synthèse vocale indistinguable de l'humain
                  </Paragraph>
                </div>

                <div className="border-l-4 border-pink-500 pl-6 py-2">
                  <h5 className="font-semibold text-mckinsey-navy-900">🎨 Création</h5>
                  <Paragraph>
                    - DALL-E 3, Midjourney: Images photoréalistes<br/>
                    - Suno, Udio: Génération musicale<br/>
                    - GitHub Copilot: 46% du code écrit par IA
                  </Paragraph>
                </div>
              </div>
            </SubSection>

            <SubSection title="Défis Éthiques et Sociétaux">
              <Callout type="warning">
                <Paragraph>
                  <strong>Biais Algorithmiques:</strong> En 2018, Amazon a dû abandonner un outil de recrutement 
                  IA qui discriminait les femmes (entraîné sur 10 ans de CVs majoritairement masculins).
                </Paragraph>
              </Callout>

              <div className="mt-6">
                <BulletList items={[
                  '🔒 Vie privée: Reconnaissance faciale massive en Chine (600M+ caméras)',
                  '💼 Emploi: McKinsey estime 400M-800M emplois automatisables d\'ici 2030',
                  '⚖️ Responsabilité: Qui est responsable si une voiture autonome tue un piéton?',
                  '🌍 Environnement: Entraîner GPT-3 ≈ 552 tonnes CO₂ (≈ 5 voitures sur leur durée de vie)',
                  '🤖 Alignement: Comment garantir qu\'une AGI reste alignée avec les valeurs humaines?'
                ]} />
              </div>
            </SubSection>
          </Section>
        </>
      )
    },
    details: "Fondements théoriques, histoire, types d'IA, test de Turing, applications et enjeux éthiques."
  },

  { 
    id: 2, 
    title: "Mathématiques pour l'IA", 
    duration: "90 min", 
    type: 'text' as const,
    exercises: [
      {
        id: 'ex2-1',
        title: 'Multiplication matricielle',
        description: 'Calculez le produit A×B où A = [[1,2],[3,4]] et B = [[5,6],[7,8]]',
        solution: 'A×B = [[1×5+2×7, 1×6+2×8], [3×5+4×7, 3×6+4×8]] = [[19,22],[43,50]]'
      },
      {
        id: 'ex2-2',
        title: 'Dérivée et descente de gradient',
        description: 'Pour f(x) = x² + 3x + 2, calculez f\'(x). Si x=2, dans quelle direction aller pour minimiser f?',
        solution: 'f\'(x) = 2x + 3\nf\'(2) = 7 > 0 → la fonction croît\nPour minimiser: aller vers la gauche (x diminue)\nMinimum en x = -3/2 (où f\'(x) = 0)'
      }
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'Pourquoi les matrices sont cruciales en Deep Learning?',
        options: [
          'Elles prennent moins de mémoire',
          'Les GPU sont optimisés pour les multiplications matricielles',
          'C\'est une mode passagère',
          'Elles rendent le code plus lisible'
        ],
        correctAnswer: 1,
        explanation: 'Les réseaux de neurones sont essentiellement des chaînes de multiplications matricielles. Les GPU modernes (conçus pour la 3D) excellent dans ces opérations parallèles, rendant le Deep Learning praticable.'
      },
      {
        id: 'q2-2',
        question: 'La descente de gradient utilise:',
        options: [
          'La dérivée pour trouver la pente',
          'Des nombres aléatoires',
          'La force brute',
          'L\'intuition humaine'
        ],
        correctAnswer: 0,
        explanation: 'La descente de gradient calcule la dérivée (ou gradient) de la fonction de perte pour savoir dans quelle direction ajuster les poids. C\'est l\'algorithme d\'optimisation fondamental du ML.'
      }
    ],
    cheatSheet: `📚 MATHS POUR L'IA

🔹 ALGÈBRE LINÉAIRE
Vecteurs, Matrices, Produit matriciel
→ Essentiel pour réseaux de neurones

🔹 CALCUL DIFFÉRENTIEL
Dérivées, Gradient, Chain Rule
→ Backpropagation

🔹 PROBABILITÉS
P(A|B), Bayes, Distributions
→ Classification probabiliste

🔹 OPTIMISATION
Gradient Descent, Learning Rate
→ Entraînement des modèles

💡 Un réseau de neurones = algèbre linéaire + calcul diff.`,
    content: {
      component: () => (
        <>
          <Section title="Mathématiques Fondamentales pour l'IA">
            <Paragraph>
              Le Deep Learning repose sur trois piliers mathématiques: l'<Highlight>algèbre linéaire</Highlight>, 
              le <Highlight>calcul différentiel</Highlight> et les <Highlight>probabilités</Highlight>.
            </Paragraph>

            <SubSection title="1. Algèbre Linéaire: Le Langage des Réseaux de Neurones">
              <Paragraph>
                Un réseau de neurones est essentiellement une série de transformations matricielles.
              </Paragraph>

              <div className="my-6 p-6 bg-gray-50 rounded-xl">
                <h5 className="font-semibold text-lg mb-3">Vecteurs et Matrices</h5>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">Vecteur (1D):</p>
                    <div className="bg-white p-4 rounded border">
                      <code>$\vec{`v`} = \begin{`bmatrix`} v_1 \\ v_2 \\ v_3 \end{`bmatrix`} = \begin{`bmatrix`} 0.5 \\ -0.3 \\ 0.8 \end{`bmatrix`}$</code>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium mb-2">Matrice (2D):</p>
                    <div className="bg-white p-4 rounded border">
                      <code>$A = \begin{`bmatrix`} 1 & 2 & 3 \\ 4 & 5 & 6 \end{`bmatrix`}$ (2×3)</code>
                    </div>
                  </div>
                </div>
              </div>

              <ExampleBox title="Multiplication Matricielle (Cœur des Réseaux de Neurones)">
                <Paragraph>
                  Soit un neurone simple: <code>$y = Wx + b$</code>
                </Paragraph>
                <CodeBlock language="python" code={`import numpy as np

# Poids (matrice)
W = np.array([[0.5, -0.3, 0.2],  # 2 neurones de sortie
              [0.1,  0.4, -0.1]]) # 3 entrées

# Entrées (vecteur)
x = np.array([1.0, 0.5, -0.5])

# Biais
b = np.array([0.1, -0.2])

# Calcul: y = Wx + b
y = W @ x + b  # @ = produit matriciel
print(y)  # [0.55, 0.15]

# Mathématiquement:
# y[0] = 0.5*1.0 + (-0.3)*0.5 + 0.2*(-0.5) + 0.1 = 0.55
# y[1] = 0.1*1.0 + 0.4*0.5 + (-0.1)*(-0.5) + (-0.2) = 0.15`} />
              </ExampleBox>

              <Callout type="success">
                <Paragraph>
                  <strong>Pourquoi les GPU?</strong> Une multiplication matricielle 1000×1000 nécessite 1 milliard 
                  de multiplications. Les GPU modernes font ça en quelques microsecondes grâce au parallélisme massif!
                </Paragraph>
              </Callout>
            </SubSection>

            <SubSection title="2. Calcul Différentiel: Comment les Réseaux Apprennent">
              <div className="my-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <h5 className="font-semibold text-xl mb-4">La Descente de Gradient</h5>
                <Paragraph>
                  Imaginez que vous êtes dans le brouillard au sommet d'une montagne et voulez descendre. 
                  La stratégie: <strong>sentir la pente sous vos pieds et aller dans la direction qui descend le plus</strong>.
                </Paragraph>
                
                <div className="mt-6 bg-white p-6 rounded-lg">
                  <p className="font-medium mb-3">Formule de mise à jour:</p>
                  <div className="text-center text-2xl my-4">
                    <code>$w_{`new`} = w_{`old`} - \alpha \cdot \frac{`\partial L`}{`\partial w`}$</code>
                  </div>
                  <BulletList items={[
                    '$w$: poids du réseau',
                    '$\\alpha$: learning rate (taille du pas)',
                    '$\\frac{\\partial L}{\\partial w}$: gradient (direction de la pente)',
                    '$L$: fonction de perte (loss)'
                  ]} />
                </div>
              </div>

              <ExampleBox title="Exemple Concret: Régression Linéaire">
                <Paragraph>
                  Objectif: Prédire le prix d'une maison à partir de sa surface.
                </Paragraph>
                <CodeBlock language="python" code={`# Modèle: prix = w * surface + b
# Données: (surface, prix)
data = [(50, 150000), (80, 240000), (100, 300000), (120, 360000)]

# Initialisation aléatoire
w = 2000.0  # poids
b = 10000.0 # biais
alpha = 0.0001  # learning rate

for epoch in range(100):
    total_loss = 0
    dw = 0  # gradient par rapport à w
    db = 0  # gradient par rapport à b
    
    for surface, prix_réel in data:
        # Forward: prédiction
        prix_pred = w * surface + b
        
        # Erreur (loss)
        erreur = prix_pred - prix_réel
        total_loss += erreur ** 2
        
        # Backward: calcul des gradients
        # ∂L/∂w = 2 * erreur * surface
        # ∂L/∂b = 2 * erreur
        dw += 2 * erreur * surface
        db += 2 * erreur
    
    # Moyenne des gradients
    dw /= len(data)
    db /= len(data)
    
    # Mise à jour (descente de gradient)
    w -= alpha * dw
    b -= alpha * db
    
    if epoch % 20 == 0:
        print(f"Epoch {epoch}: Loss = {total_loss/len(data):.0f}")

print(f"\\nModèle final: prix = {w:.0f} * surface + {b:.0f}")
# Résultat: prix ≈ 3000 * surface + 0`} />
              </ExampleBox>

              <div className="my-6">
                <h5 className="font-semibold text-lg mb-3">La Chain Rule (Règle de la Chaîne)</h5>
                <Paragraph>
                  Pour les réseaux profonds, on compose les dérivées:
                </Paragraph>
                <div className="bg-gray-50 p-6 rounded-lg my-4">
                  <p className="text-center text-xl mb-2">
                    <code>$\frac{`\partial L`}{`\partial w_1`} = \frac{`\partial L`}{`\partial y`} \cdot \frac{`\partial y`}{`\partial z`} \cdot \frac{`\partial z`}{`\partial w_1`}$</code>
                  </p>
                  <p className="text-sm text-gray-600 text-center">
                    (C'est la backpropagation!)
                  </p>
                </div>
              </div>
            </SubSection>

            <SubSection title="3. Probabilités et Statistiques">
              <Paragraph>
                Le Machine Learning est fondamentalement probabiliste: on prédit des <strong>distributions de probabilité</strong>, 
                pas des certitudes absolues.
              </Paragraph>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-white border-2 border-mckinsey-teal-500 rounded-xl p-6">
                  <h5 className="font-bold text-lg mb-3">Probabilité Conditionnelle</h5>
                  <div className="text-center my-4">
                    <code>$P(A|B) = \frac{`P(A \cap B)`}{`P(B)`}$</code>
                  </div>
                  <Paragraph>
                    "Quelle est la probabilité de A <strong>sachant que</strong> B s'est produit?"
                  </Paragraph>
                  <p className="text-sm mt-2 text-gray-600">
                    Ex: P(cancer | test positif) = ?
                  </p>
                </div>

                <div className="bg-white border-2 border-blue-500 rounded-xl p-6">
                  <h5 className="font-bold text-lg mb-3">Théorème de Bayes</h5>
                  <div className="text-center my-4">
                    <code>$P(A|B) = \frac{`P(B|A) \cdot P(A)`}{`P(B)`}$</code>
                  </div>
                  <Paragraph>
                    Fondamental pour la classification probabiliste (Naive Bayes).
                  </Paragraph>
                </div>
              </div>

              <ExampleBox title="Application: Spam Filter">
                <Paragraph>
                  Quelle est la probabilité qu'un email soit un spam sachant qu'il contient "gratuit"?
                </Paragraph>
                <div className="bg-gray-50 p-4 rounded my-4">
                  <BulletList items={[
                    'P(Spam) = 0.3 (30% des emails sont spam)',
                    'P("gratuit" | Spam) = 0.8 (80% des spams contiennent "gratuit")',
                    'P("gratuit" | Ham) = 0.1 (10% des emails légitimes contiennent "gratuit")',
                    'P("gratuit") = P("gratuit"|Spam)×P(Spam) + P("gratuit"|Ham)×P(Ham) = 0.8×0.3 + 0.1×0.7 = 0.31'
                  ]} />
                  <div className="mt-4 p-4 bg-white rounded">
                    <code>$P(Spam | "gratuit") = \frac{`0.8 \times 0.3`}{`0.31`} = 0.77$</code>
                  </div>
                  <Paragraph>
                    → 77% de chances que ce soit un spam!
                  </Paragraph>
                </div>
              </ExampleBox>
            </SubSection>

            <SubSection title="4. Optimisation: Trouver le Meilleur Modèle">
              <Paragraph>
                L'entraînement d'un réseau de neurones = résoudre un problème d'optimisation:
              </Paragraph>
              <div className="text-center text-2xl my-6">
                <code>$\min_w L(w) = \min_w \frac{`1`}{`N`} \sum_{`i=1`}^{`N`} (y_i - \hat{`y`}_i)^2$</code>
              </div>
              <Paragraph>
                "Trouver les poids $w$ qui minimisent l'erreur moyenne."
              </Paragraph>

              <div className="my-6">
                <h5 className="font-semibold text-lg mb-3">Variants de la Descente de Gradient</h5>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="font-semibold">Batch Gradient Descent</p>
                    <p className="text-sm text-gray-600">Utilise TOUTES les données à chaque itération. Précis mais lent.</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="font-semibold">Stochastic Gradient Descent (SGD)</p>
                    <p className="text-sm text-gray-600">Utilise UN exemple à la fois. Rapide mais bruité.</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <p className="font-semibold">Mini-Batch GD (le plus utilisé)</p>
                    <p className="text-sm text-gray-600">Utilise un petit batch (ex: 32 exemples). Bon compromis vitesse/précision.</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <p className="font-semibold">Adam (Adaptive Moment)</p>
                    <p className="text-sm text-gray-600">Ajuste automatiquement le learning rate. Algorithme par défaut en 2024.</p>
                  </div>
                </div>
              </div>
            </SubSection>
          </Section>
        </>
      )
    },
    details: "Algèbre linéaire, calcul différentiel, probabilités et optimisation - les fondations mathématiques du Deep Learning."
  }
];

const objectives = [
  "Comprendre les fondements théoriques de l'IA",
  "Maîtriser les mathématiques essentielles (algèbre, calcul, probas)",
  "Distinguer ANI, AGI et ASI",
  "Analyser les enjeux éthiques et sociétaux",
  "Connaître l'histoire et l'évolution de l'IA"
];

const prerequisites = [
  "Mathématiques niveau lycée (fonctions, dérivées)",
  "Bases de programmation Python (recommandé)",
  "Curiosité et esprit critique"
];

export default function IAIntroductionPage() {
  return (
    <CourseOverview
      title="Introduction à l'Intelligence Artificielle"
      description="Fondements théoriques, mathématiques et enjeux de l'IA moderne"
      level="Débutant"
      duration="8h"
      lessonCount={2}
      lessons={lessons}
      objectives={objectives}
      prerequisites={prerequisites}
    />
  );
}
