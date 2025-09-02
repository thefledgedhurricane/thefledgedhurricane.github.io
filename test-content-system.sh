#!/bin/bash

# Script de test pour le système de contenu Markdown

echo "=== Test du système de contenu LMS ==="
echo ""

# 1. Vérifier la structure des dossiers
echo "1. Structure des dossiers :"
echo "Content directory exists: $(test -d /workspaces/thefledgedhurricane.github.io/content/lessons && echo 'YES' || echo 'NO')"
echo "Lesson files count: $(ls /workspaces/thefledgedhurricane.github.io/content/lessons/*.md 2>/dev/null | wc -l)"
echo ""

# 2. Lister les fichiers de leçons
echo "2. Fichiers de leçons disponibles :"
ls -la /workspaces/thefledgedhurricane.github.io/content/lessons/
echo ""

# 3. Vérifier la compilation TypeScript
echo "3. Vérification de la compilation :"
cd /workspaces/thefledgedhurricane.github.io/next
npm run type-check 2>/dev/null && echo "TypeScript: OK" || echo "TypeScript: ERREURS"
echo ""

# 4. Tester le chargement d'un fichier
echo "4. Test de chargement de contenu :"
node -e "
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

try {
  const filePath = path.join(process.cwd(), '..', 'content', 'lessons', 'intro-ia-fondamentaux.md');
  const content = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(content);
  console.log('✓ Fichier chargé avec succès');
  console.log('  Titre:', data.title);
  console.log('  Durée estimée:', data.estimatedTime);
  console.log('  Difficulté:', data.difficulty);
} catch (error) {
  console.log('✗ Erreur:', error.message);
}
"

echo ""
echo "=== Fin du test ==="
