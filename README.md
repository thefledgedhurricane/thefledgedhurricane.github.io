<p align="center">
   <img src="next/public/logo.png" alt="Portfolio Logo" width="120" />
</p>

# Academic Portfolio — Next.js + Sanity

<p align="center">
   <a href="https://github.com/thefledgedhurricane/thefledgedhurricane.github.io/actions/workflows/deploy.yml">
      <img alt="Deploy" src="https://github.com/thefledgedhurricane/thefledgedhurricane.github.io/actions/workflows/deploy.yml/badge.svg?branch=main" />
   </a>
   <img alt="Node.js" src="https://img.shields.io/badge/Node-20.x-339933?logo=node.js&logoColor=white" />
   <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white" />
   <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
   <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwindcss&logoColor=white" />
   <img alt="Sanity" src="https://img.shields.io/badge/Sanity-io-F03E2F?logo=sanity&logoColor=white" />
   <img alt="GitHub Pages" src="https://img.shields.io/badge/Hosted-GitHub%20Pages-222?logo=github&logoColor=white" />
   <img alt="License" src="https://img.shields.io/badge/License-MIT-blue.svg" />
   <img alt="Lint" src="https://img.shields.io/badge/Lint-ESLint-4B32C3?logo=eslint&logoColor=white" />
</p>

Un portfolio académique moderne, performant et pensé pour le long terme. L’architecture frontend est basée sur Next.js (App Router) et Tailwind CSS; le contenu est géré via Sanity CMS et exporté statiquement pour un hébergement simple (GitHub Pages).

Design, UX et direction artistique: Dr. Ihababdelbasset ANNAKI.

## ✨ Points forts

- 🎓 **Academic-focused design** - Tailored for researchers and academics
- 📱 **Fully responsive** - Perfect on desktop, tablet, and mobile
- 🚀 **Fast and SEO-optimized** - Built with Next.js static export
- 📝 **Headless CMS** - Easy content management with Sanity
- 🎨 **Modern UI** - Clean design with Tailwind CSS
- 📊 **Analytics ready** - Google Analytics integration
- 📧 **Contact form** - Direct communication channel
- 🔒 **Security focused** - Best practices implemented
- 🌐 **GitHub Pages ready** - Automated deployment workflow

## 🛠️ Stack technique

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity.io
- **Deployment**: GitHub Pages with GitHub Actions
- **Analytics**: Google Analytics (optional)
- **Email**: Contact form integration

## 🚀 Démarrage rapide

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repository-url>
cd <your-repo-name>

# Install dependencies for Next.js app
cd next
npm install

# Install dependencies for Sanity CMS
cd ../sanity
npm install
```

### 2. Variables d’environnement

```bash
# Copy environment template
cp next/.env.example next/.env.local
```

Fill in your Sanity and site configuration:

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SITE_NAME=Dr. Your Name - Academic Portfolio
NEXT_PUBLIC_SITE_DESCRIPTION=Academic portfolio showcasing research and achievements

# Contact Form Configuration (Frontend)
# Sign up at https://formspree.io and replace with your form endpoint
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id

NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```


# Login to Sanity (first time only)
### 4. Lancer le serveur de dev

cd next

```

Your portfolio will be available at `http://localhost:3000`

### 5. Formulaire de contact (Formspree)

Le formulaire de contact utilise Formspree (aucun backend à gérer) :

1. Créez un compte sur https://formspree.io
3. En local: mettez à jour `next/.env.local` avec:
   ```env
   NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/votre-id
   ```
4. En production (GitHub): ajoutez le secret de dépôt `NEXT_PUBLIC_FORMSPREE_ENDPOINT` avec la même valeur
5. Rendez-vous sur `/contact`, envoyez un message test et vérifiez la réception dans Formspree

Protection anti-spam: champ honeypot + validations Zod côté client. Gestion des états succès/erreur incluse.

## 🎯 Modules fonctionnels

### Academic Content Management
- **Publications** - Research papers, articles, and academic publications
- **Teaching** - Courses, lectures, and educational content
- **Events** - Conferences, workshops, and academic events
- **Authors** - Academic profiles with expertise and social links
- **Posts** - Blog posts and academic articles
- **Projects** - Research projects and academic work

### Modern Tech Stack
- **Next.js 15** with App Router and TypeScript
- **Sanity CMS** for headless content management
- **Rich Text Editor** with code blocks and academic formatting
- **Content Relationships** between authors, publications, and events
- **Multi-language Support** for international academic content
- **SEO Optimized** for academic discoverability

## 📁 Structure du projet

```
Portfolio/
├── content/                 # Original Hugo Academic content (to be migrated)
│   ├── authors/
│   ├── event/
│   ├── post/
│   ├── project/
│   ├── publication/
│   └── teaching/
├── sanity/                  # Sanity Studio configuration
│   ├── schemaTypes/         # Content schemas
│   │   ├── author.ts
│   │   ├── event.ts
│   │   ├── post.ts
│   │   ├── project.ts
│   │   ├── publication.ts
│   │   ├── teaching.ts
│   │   └── settings.ts
│   └── sanity.config.ts
├── src/
│   └── lib/
│       ├── sanity.ts        # Sanity client and queries
│       └── sanity-types.ts  # TypeScript types
├── migrate-content-to-sanity.js  # Migration script
├── package.json
├── .env                     # Environment variables
└── README.md
```

## 🔄 Migration (depuis Hugo Academic)

The migration script (`migrate-content-to-sanity.js`) automatically:

1. **Parses Hugo Academic markdown files** from the `content/` directory
2. **Extracts frontmatter and content** using gray-matter
3. **Converts markdown to Sanity blocks** for rich text content
4. **Creates Sanity documents** with proper relationships
5. **Handles all content types**: authors, publications, events, teaching, posts, and projects

### Migration Features
- ✅ Preserves all metadata and content
- ✅ Maintains relationships between content types
- ✅ Converts dates and URLs properly
- ✅ Handles tags and categories
- ✅ Sets up featured content flags
- ✅ Creates proper slugs for URLs

## 🌐 Sanity Studio

Access your Sanity Studio at: [https://iannaki-portfolio.sanity.studio/](https://iannaki-portfolio.sanity.studio/)

### Studio Features
- 📝 Rich text editor with code blocks and images
- 🔗 Reference management between content types
- 📅 Date and time pickers
- 🏷️ Tag and category management
- 🖼️ Image upload and management
- 🌍 Multi-language support
- 📊 Content preview and validation

## 🛠️ Développement

### Available Scripts
- `npm run migrate` - Migrate Hugo Academic content to Sanity
- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Sanity Studio Development
```bash
cd sanity
npm run dev  # Starts studio at http://localhost:3333
```

## 📚 Workflow de gestion de contenu

1. **Initial Setup**: Run the migration script to import existing Hugo content
2. **Content Creation**: Use Sanity Studio to create new content
3. **Content Updates**: Edit content directly in Sanity Studio
4. **Publishing**: Content is automatically available via Sanity's API
5. **Frontend**: Next.js app fetches content from Sanity

## 🔧 Configuration

### Sanity Configuration
- **Project ID**: `quz6kxvy`
- **Dataset**: `production`
- **API Version**: `2023-05-03`

### Environment Variables
```bash
SANITY_STUDIO_PROJECT_ID=quz6kxvy
SANITY_STUDIO_DATASET=production
SANITY_API_TOKEN=your_token_here
```

## 📖 Types de contenu

The new Sanity schema includes:

### 📝 Core Content Types
- **Authors**: Academic profiles with bio, expertise, and social links
- **Publications**: Research papers, articles, and academic publications
- **Events**: Conferences, workshops, and academic events
- **Teaching**: Courses, lectures, and educational content
- **Posts**: Blog posts and academic articles
- **Projects**: Research projects and academic work

### ⚙️ Configuration
- **Settings**: Site-wide configuration and navigation

## 🚨 Notes importantes

1. **API Token**: You must set up a Sanity API token for the migration to work
2. **Content Backup**: The original `content/` directory is preserved as backup
3. **Schema Changes**: Any schema modifications require redeployment of Sanity Studio
4. **Data Relationships**: The migration maintains author relationships across all content types

## 🆘 Dépannage

### Migration Issues
- Ensure Sanity API token has proper permissions
- Check that all content directories exist
- Verify frontmatter format in markdown files

### Studio Issues
- Clear browser cache if studio doesn't load
- Check network connectivity to Sanity servers
- Verify project ID and dataset configuration

## 📖 Et après ?

1. **Run the migration** to import your Hugo Academic content
2. **Review migrated content** in Sanity Studio
3. **Customize the schema** if needed for your specific requirements
4. **Build the frontend** Next.js application to display your content
5. **Deploy** both Sanity Studio and Next.js app to production

---

**Ready to migrate your academic content to the modern web!** 🎓✨

### 🌟 Benefits of This Migration

- ✅ **Modern CMS**: Sanity provides a superior content editing experience
- ✅ **Better Performance**: Next.js offers optimal loading speeds
- ✅ **Academic Focus**: Schema designed specifically for academic content
- ✅ **Scalability**: Easily add new content types and features
- ✅ **SEO Optimized**: Better search engine visibility
- ✅ **Mobile Responsive**: Works perfectly on all devices
- ✅ **Future Proof**: Built with modern, maintainable technologies

For questions or support with the migration, please refer to the troubleshooting section above or consult the Sanity documentation.

---

---

## 🖋️ Crédits & mentions

- Conception, design UI/UX, direction artistique: Dr. Ihababdelbasset ANNAKI
- Développement frontend: Next.js (App Router), React 18, TypeScript
- Styles: Tailwind CSS + plugins Typography/Forms
- CMS: Sanity.io (schémas personnalisés pour publications, enseignement, événements, posts, projets)

## ⚖️ Licence & Copyright

© 2025 Dr. Ihababdelbasset ANNAKI. Tous droits réservés.

Sauf indication contraire, le code source est fourni sous licence MIT. Le design, la marque, les contenus (textes, images et publications) restent la propriété de leurs auteurs respectifs et ne sont pas couverts par la licence du code. Toute réutilisation du thème doit conserver l’attribution du design.

---

**Construit avec ❤️ grâce à Next.js et Sanity CMS.**

Faites évoluer votre présence académique avec une plateforme moderne, accessible et durable.