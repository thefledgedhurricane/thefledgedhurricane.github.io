# Academic Portfolio

A modern, responsive academic portfolio built with Next.js and Sanity CMS, optimized for GitHub Pages deployment.

## ✨ Features

- 🎓 **Academic-focused design** - Tailored for researchers and academics
- 📱 **Fully responsive** - Perfect on desktop, tablet, and mobile
- 🚀 **Fast and SEO-optimized** - Built with Next.js static export
- 📝 **Headless CMS** - Easy content management with Sanity
- 🎨 **Modern UI** - Clean design with Tailwind CSS
- 📊 **Analytics ready** - Google Analytics integration
- 📧 **Contact form** - Direct communication channel
- 🔒 **Security focused** - Best practices implemented
- 🌐 **GitHub Pages ready** - Automated deployment workflow

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity.io
- **Deployment**: GitHub Pages with GitHub Actions
- **Analytics**: Google Analytics (optional)
- **Email**: Contact form integration

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repository-url>
cd academic-portfolio

# Install dependencies for Next.js app
cd next
npm install

# Install dependencies for Sanity CMS
cd ../sanity
npm install
```

### 2. Configure Environment Variables

```bash
# Copy environment template
cp next/.env.example next/.env.local
```

Fill in your Sanity and site configuration:

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourusername.github.io/repository-name
NEXT_PUBLIC_SITE_NAME=Dr. Your Name - Academic Portfolio
NEXT_PUBLIC_SITE_DESCRIPTION=Academic portfolio showcasing research and achievements

# Optional: Contact Form
CONTACT_EMAIL=your@email.com
EMAIL_SERVICE_API_KEY=your_email_service_key

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 3. Set Up Sanity CMS

```bash
# Navigate to Sanity directory
cd sanity

# Login to Sanity (first time only)
npx sanity login

# Start Sanity Studio
npm run dev
```

Sanity Studio will be available at `http://localhost:3333`

### 4. Run Development Server

```bash
# Navigate to Next.js app
cd next

# Start development server
npm run dev
```

Your portfolio will be available at `http://localhost:3000`

## 🎯 Features

### Academic Content Management
- **Publications** - Research papers, articles, and academic publications
- **Teaching** - Courses, lectures, and educational content
- **Events** - Conferences, workshops, and academic events
- **Authors** - Academic profiles with expertise and social links
- **Posts** - Blog posts and academic articles
- **Projects** - Research projects and academic work

### Modern Tech Stack
- **Next.js 14** with App Router and TypeScript
- **Sanity CMS** for headless content management
- **Rich Text Editor** with code blocks and academic formatting
- **Content Relationships** between authors, publications, and events
- **Multi-language Support** for international academic content
- **SEO Optimized** for academic discoverability

## 📁 Project Structure

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

## 🔄 Migration Process

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

## 🛠️ Development

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

## 📚 Content Management Workflow

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

## 📖 Content Types

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

## 🚨 Important Notes

1. **API Token**: You must set up a Sanity API token for the migration to work
2. **Content Backup**: The original `content/` directory is preserved as backup
3. **Schema Changes**: Any schema modifications require redeployment of Sanity Studio
4. **Data Relationships**: The migration maintains author relationships across all content types

## 🆘 Troubleshooting

### Migration Issues
- Ensure Sanity API token has proper permissions
- Check that all content directories exist
- Verify frontmatter format in markdown files

### Studio Issues
- Clear browser cache if studio doesn't load
- Check network connectivity to Sanity servers
- Verify project ID and dataset configuration

## 📖 Next Steps

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

**Built with ❤️ using Next.js and Sanity CMS**

*Transform your Hugo Academic site into a modern, scalable academic portfolio!*