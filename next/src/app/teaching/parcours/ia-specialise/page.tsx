import Link from 'next/link';
import { Brain, CheckCircle2, Clock3, type LucideIcon } from 'lucide-react';

const modules = [
  {
    id: 1,
    title: "Introduction à l'Intelligence Artificielle",
    slug: "ia-1-introduction",
    description: "Fondements de l'IA, ML vs DL, mathématiques essentielles (algèbre, gradients, probabilités)",
    duration: "8h",
    lessons: 2,
    status: 'available' as const,
    topics: ["Histoire de l'IA", "ANI/AGI/ASI", "Test de Turing", "Algèbre linéaire", "Gradient descent", "Théorème de Bayes"],
    prerequisites: []
  },
  {
    id: 2,
    title: "Apprentissage Supervisé",
    slug: "ia-2-apprentissage-supervise",
    description: "Régression linéaire, MSE, gradient descent, équation normale, régularisation Ridge/Lasso",
    duration: "12h",
    lessons: 1,
    status: 'available' as const,
    topics: ["Régression linéaire", "MSE/RMSE", "Gradient descent", "Équation normale", "Ridge & Lasso", "Régression polynomiale"],
    prerequisites: ["Module 1"]
  },
  {
    id: 3,
    title: "Apprentissage Non-Supervisé",
    slug: "ia-3-apprentissage-non-supervise",
    description: "Clustering K-Means, PCA, réduction de dimensionnalité, t-SNE",
    duration: "14h",
    lessons: 2,
    status: 'available' as const,
    topics: ["K-Means", "K-Means++", "PCA", "Décomposition spectrale", "t-SNE", "DBSCAN"],
    prerequisites: ["Module 1"]
  },
  {
    id: 4,
    title: "Deep Learning — Données Tabulaires",
    slug: "ia-4-deep-learning-tabular",
    description: "MLP, fonctions d'activation, forward pass, backpropagation, loss functions",
    duration: "16h",
    lessons: 1,
    status: 'available' as const,
    topics: ["Neurone artificiel", "ReLU/Sigmoid/Tanh", "MLP architecture", "Forward pass", "Universal Approximation", "Loss functions"],
    prerequisites: ["Modules 1-2"]
  },
  {
    id: 5,
    title: "Deep Learning — Computer Vision",
    slug: "ia-5-computer-vision",
    description: "CNN, convolutions, pooling, architectures célèbres (AlexNet, ResNet), transfer learning",
    duration: "18h",
    lessons: 3,
    status: 'planned' as const,
    topics: ["Convolutions", "Pooling", "CNN architecture", "AlexNet", "VGG", "ResNet", "Transfer learning"],
    prerequisites: ["Module 4"]
  },
  {
    id: 6,
    title: "Deep Learning — NLP",
    slug: "ia-6-nlp",
    description: "Word embeddings, RNN, LSTM, attention mechanism, Transformers, BERT",
    duration: "20h",
    lessons: 3,
    status: 'planned' as const,
    topics: ["Word2Vec", "GloVe", "RNN/LSTM/GRU", "Attention", "Self-attention", "Transformers", "BERT"],
    prerequisites: ["Module 4"]
  },
  {
    id: 7,
    title: "Deep Learning — IA Générative",
    slug: "ia-7-generative-ai",
    description: "GANs, VAE, Diffusion Models, Stable Diffusion, génération d'images",
    duration: "18h",
    lessons: 3,
    status: 'planned' as const,
    topics: ["GANs", "Generator/Discriminator", "VAE", "DDPM", "Stable Diffusion", "ControlNet"],
    prerequisites: ["Modules 4-5"]
  },
  {
    id: 8,
    title: "Deep Learning — Large Language Models",
    slug: "ia-8-llm",
    description: "Architecture GPT, tokenization, fine-tuning, LoRA, RLHF, prompt engineering",
    duration: "20h",
    lessons: 3,
    status: 'planned' as const,
    topics: ["Tokenization", "GPT architecture", "LoRA/QLoRA", "RLHF", "Prompt engineering", "RAG"],
    prerequisites: ["Module 6"]
  }
];

const statusConfig = {
  available: {
    icon: CheckCircle2,
    color: 'text-green-600 bg-green-50 border-green-200',
    label: 'Disponible',
    textColor: 'text-green-700'
  },
  planned: {
    icon: Clock3,
    color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    label: 'En préparation',
    textColor: 'text-yellow-700'
  },
};

export default function IASpecialisePage() {
  const totalDuration = modules.reduce((sum, m) => sum + parseInt(m.duration), 0);
  const availableModules = modules.filter(m => m.status === 'available').length;
  const availabilityPercentage = (availableModules / modules.length) * 100;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-4 mb-6">
            <Brain className="w-16 h-16" />
            <div>
              <h1 className="text-5xl font-bold mb-2">Parcours Complet en Intelligence Artificielle</h1>
              <p className="text-xl text-blue-100">8 Modules Spécialisés • Mathématiques Approfondies • Code From Scratch</p>
            </div>
          </div>
          
          {/* Publication roadmap */}
          <div className="mt-8">
            <div className="flex justify-between text-sm mb-2">
              <span>Modules publiés</span>
              <span className="font-semibold">{availableModules}/{modules.length} modules disponibles</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-green-400 h-full transition-[width] duration-500 rounded-full"
                style={{ width: `${availabilityPercentage}%` }}
              />
            </div>
            <p className="text-sm text-blue-100 mt-2">
              🎯 Durée totale: {totalDuration}h • 📚 {modules.reduce((sum, m) => sum + m.lessons, 0)} leçons
            </p>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-6">
          {modules.map((module, index) => {
            const StatusIcon = statusConfig[module.status].icon;
            const isAccessible = module.status === 'available';

            return (
              <div
                key={module.id}
                className={`bg-white rounded-2xl shadow-lg border-2 transition-all hover:shadow-xl ${
                  isAccessible ? 'hover:scale-[1.02] cursor-pointer' : 'opacity-60'
                }`}
              >
                {isAccessible ? (
                  <Link href={`/teaching/modules/${module.slug}`} className="block p-8">
                    <ModuleContent module={module} StatusIcon={StatusIcon} />
                  </Link>
                ) : (
                  <div className="p-8">
                    <ModuleContent module={module} StatusIcon={StatusIcon} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-md">
          <h3 className="font-bold text-lg mb-4">Légende</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(statusConfig).map(([status, config]) => {
              const Icon = config.icon;
              return (
                <div key={status} className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${config.textColor}`} />
                  <span className="font-medium">{config.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Brain className="w-8 h-8 text-purple-600" />
            À Propos de ce Parcours
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-2">✨ Ce que vous apprendrez:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Mathématiques complètes (algèbre, calcul, probabilités)</li>
                <li>• Implémentations from scratch (NumPy)</li>
                <li>• Architectures modernes (CNN, RNN, Transformers)</li>
                <li>• Applications réelles et projets</li>
                <li>• État de l'art (GPT, Stable Diffusion)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">🎯 Format pédagogique:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Formules mathématiques avec LaTeX</li>
                <li>• Code Python commenté ligne par ligne</li>
                <li>• Visualisations interactives</li>
                <li>• Quiz et exercices corrigés</li>
                <li>• Cheatsheets téléchargeables</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ModuleContent({ module, StatusIcon }: { module: typeof modules[number], StatusIcon: LucideIcon }) {
  const config = statusConfig[module.status];
  
  return (
    <>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${config.color} border-2`}>
            <StatusIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-bold text-gray-500">MODULE {module.id}</span>
              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${config.color}`}>
                {config.label}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{module.title}</h3>
            <p className="text-gray-600 leading-relaxed">{module.description}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          ⏱️ <strong>{module.duration}</strong>
        </span>
        <span className="flex items-center gap-1">
          📚 <strong>{module.lessons} leçons</strong>
        </span>
        {module.prerequisites.length > 0 && (
          <span className="flex items-center gap-1">
            🎓 Prérequis: <strong>{module.prerequisites.join(', ')}</strong>
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {module.topics.map((topic, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
          >
            {topic}
          </span>
        ))}
      </div>
    </>
  );
}
