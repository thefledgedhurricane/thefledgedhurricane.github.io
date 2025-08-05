# Guide de Mise à Jour du Profil Professionnel

## Informations Mises à Jour

Votre profil a été préparé avec les informations suivantes :
- **Titre professionnel** : Maître de Conférences en Intelligence Artificielle et développement avancé
- **Expérience en recherche** : 6 ans (incluant la thèse)
- **Expérience en consulting** : 2 ans
- **Publications** : 10 publications académiques

## Fichiers Créés/Modifiés

### 1. `profile-data.json`
Contient toutes les données structurées pour votre profil professionnel :
- Paramètres du site (settings)
- Profil auteur principal
- Expériences professionnelles
- Note sur les publications

### 2. `update-profile.js`
Script automatisé pour importer les données (nécessite un token API Sanity)

## Instructions de Mise à Jour

### Option 1 : Via Sanity Studio (Recommandé)

1. **Ouvrir Sanity Studio**
   ```bash
   cd sanity
   npm run dev
   ```

2. **Mettre à jour les paramètres du site**
   - Aller dans "Site Settings"
   - Mettre à jour le titre, la description et les informations d'auteur
   - Remplacer `[Votre Nom]` par votre nom réel
   - Remplacer `[votre.email@universite.fr]` par votre email

3. **Créer/Mettre à jour votre profil auteur**
   - Aller dans "Authors"
   - Créer un nouvel auteur ou modifier l'existant
   - Utiliser les données du fichier `profile-data.json`
   - Ajouter votre photo de profil

4. **Ajouter vos expériences**
   - Aller dans "Experience"
   - Créer 3 nouvelles entrées basées sur les données JSON :
     - Poste actuel de Maître de Conférences
     - Expérience de recherche doctorale
     - Expérience de consulting

5. **Ajouter vos publications**
   - Aller dans "Publications"
   - Créer 10 nouvelles publications
   - Pour chaque publication, inclure :
     - Titre
     - Auteurs
     - Journal/Conférence
     - Date de publication
     - Résumé
     - Liens (PDF, DOI, etc.)

### Option 2 : Via Script Automatisé

1. **Configurer le token API Sanity**
   - Aller sur https://sanity.io/manage
   - Créer un token API avec permissions d'écriture
   - Mettre à jour le fichier `.env.local` :
     ```
     SANITY_API_TOKEN=votre_token_ici
     ```

2. **Exécuter le script**
   ```bash
   cd sanity
   node update-profile.js
   ```

## Personnalisations Nécessaires

### Informations à Remplacer
- `[Votre Nom]` → Votre nom complet
- `[votre.email@universite.fr]` → Votre adresse email
- `[Nom de l'Université]` → Nom de votre université
- `[Nom du Laboratoire de Recherche]` → Nom de votre laboratoire

### Domaines d'Expertise Configurés
- Intelligence Artificielle
- Développement Avancé
- Machine Learning
- Deep Learning
- Recherche Académique
- Consulting Technologique

### Dates d'Expérience (à ajuster selon votre parcours)
- **Recherche doctorale** : 2018-2022 (6 ans)
- **Poste actuel** : 2022-présent
- **Consulting** : 2022-présent (2 ans)

## Prochaines Étapes

1. **Personnaliser les informations** avec vos données réelles
2. **Ajouter vos 10 publications** académiques
3. **Télécharger votre photo de profil**
4. **Ajouter vos liens sociaux** (LinkedIn, GitHub, etc.)
5. **Tester le site** pour vérifier que tout s'affiche correctement

## Support

Si vous rencontrez des difficultés :
1. Consultez la documentation Sanity : https://www.sanity.io/docs
2. Vérifiez les schémas dans `sanity/schemaTypes/`
3. Utilisez les données d'exemple dans `profile-data.json` comme référence

---

**Note** : Ce guide a été créé pour mettre à jour votre profil professionnel selon vos nouvelles informations de Maître de Conférences en Intelligence Artificielle et développement avancé.