#!/bin/bash

echo "🔧 Test du nouveau système statique..."
echo "====================================="
echo ""

cd /workspaces/thefledgedhurricane.github.io/next

echo "1. Test de compilation TypeScript..."
npx tsc --noEmit && echo "✅ TypeScript: OK" || echo "❌ TypeScript: Erreurs"
echo ""

echo "2. Test de build Next.js..."
npm run build && echo "✅ Build: OK" || echo "❌ Build: Erreurs"
echo ""

echo "Test terminé !"
