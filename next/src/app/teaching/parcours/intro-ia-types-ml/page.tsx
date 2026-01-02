
export default function IntroIaTypesML() {
  return (
    <main className="prose mx-auto p-4">
      <h1>Types d'apprentissage automatique</h1>
      <p>L'apprentissage automatique (Machine Learning) se décline en plusieurs paradigmes selon la nature des données d'entrée et l'objectif visé.</p>
      <h2>Apprentissage supervisé</h2>
      <h3>Définition et formalisation</h3>
      <p>Dans l'apprentissage supervisé, on dispose d'un jeu de données d'entraînement <code>D = {'{(x₁,y₁), (x₂,y₂), ..., (xₙ,yₙ)'}</code> où :</p>
      <ul>
        <li><code>xᵢ ∈ X</code> : vecteur de features (variables explicatives)</li>
        <li><code>yᵢ ∈ Y</code> : label ou target (variable à prédire)</li>
      </ul>
      <p><strong>Objectif</strong> : Apprendre une fonction <code>f_θ : X → Y</code> qui minimise le risque empirique :</p>
      <pre><code>R_emp(θ) = (1/n) Σᵢ ℓ(yᵢ, f_θ(xᵢ))</code></pre>
      <p>où <code>ℓ</code> est une fonction de perte adaptée au problème.</p>
      <h3>Types de problèmes supervisés</h3>
      <h4>Régression</h4>
      <ul>
        <li><strong>Target</strong> : Variable continue <code>y ∈ ℝ</code></li>
        <li><strong>Pertes courantes</strong> : MSE, MAE, Huber</li>
        <li><strong>Exemples</strong> : Prédiction de prix, température, demande</li>
      </ul>
      <p><strong>Exemple concret</strong> : Prédiction du prix immobilier</p>
      <pre><code>Features (x) : [superficie, nb_chambres, quartier_encoded, année_construction]
Target (y) : prix en euros
Perte MSE : ℓ(y, ŷ) = (y - ŷ)²</code></pre>
      <h4>Classification binaire</h4>
      <ul>
        <li><strong>Target</strong> : Variable binaire <code>y ∈ {'{0,1}'}</code> ou <code>{'-1,+1'}</code></li>
        <li><strong>Pertes courantes</strong> : Cross-entropy, hinge loss</li>
        <li><strong>Métriques</strong> : Accuracy, Precision, Recall, F1, AUC-ROC</li>
      </ul>
      <p><strong>Exemple</strong> : Détection de spam</p>
    </main>
  );
}
