"use client";

export default function SolutionsDemo() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
      <h4 className="font-semibold mb-4">Approches de résolution</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <strong className="text-blue-700 dark:text-blue-300">Techniques :</strong>
          <ul className="mt-2 space-y-2 text-sm list-disc pl-5">
            <li><strong>Explicabilité:</strong> LIME, SHAP, GradCAM</li>
            <li><strong>Robustesse:</strong> Adversarial training, tests de stress</li>
            <li><strong>Débiaisage:</strong> Fair ML, audit des algorithmes</li>
            <li><strong>Confidentialité:</strong> Federated learning, Differential Privacy</li>
          </ul>
        </div>
        <div>
          <strong className="text-purple-700 dark:text-purple-300">Gouvernance :</strong>
          <ul className="mt-2 space-y-2 text-sm list-disc pl-5">
            <li><strong>Réglementation:</strong> EU AI Act</li>
            <li><strong>Comités éthiques:</strong> Review boards</li>
            <li><strong>Formation:</strong> AI literacy, sensibilisation</li>
            <li><strong>Collaboration:</strong> Initiatives multi-acteurs</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
