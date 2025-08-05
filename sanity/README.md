# Portfolio Sanity CMS

This is the Sanity Studio configuration for your portfolio website. Sanity provides a powerful headless CMS that allows you to manage your portfolio content with a beautiful, customizable interface.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (currently using Node.js 20.19.4)
- npm or yarn
- Sanity account (free tier available)

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   The Studio will be available at `http://localhost:3333`

3. **Build for production:**
   ```bash
   npm run build
   ```

### Deployment Options

#### Option 1: Deploy to Sanity's Hosting (Recommended)
```bash
npm run deploy
```
This will deploy your Studio to `https://your-project-id.sanity.studio`

#### Option 2: Deploy to Netlify/Vercel
1. Build the Studio: `npm run build`
2. Deploy the `dist` folder to your hosting provider
3. Set up environment variables if needed

## 📊 Content Schemas

Your portfolio includes the following content types:

### 🎯 Projects
- **Title & Slug**: SEO-friendly URLs
- **Description & Content**: Rich text with images
- **Featured Image**: Main project image
- **Technologies**: Tags for tech stack
- **Category**: Web, Mobile, Research, Design, Data, Other
- **Status**: Completed, In Progress, On Hold
- **Links**: Live URL and GitHub repository
- **Dates**: Start and end dates
- **Featured**: Highlight important projects

### 📝 Blog Posts
- **Title & Slug**: SEO-friendly URLs
- **Excerpt**: Short description for listings
- **Content**: Rich text with code blocks and images
- **Featured Image**: Main post image
- **Tags & Category**: Organization and filtering
- **Reading Time**: Estimated reading duration
- **Featured**: Highlight important posts

### 💼 Experience
- **Job Title/Degree**: Position or qualification
- **Company/Institution**: Organization name
- **Type**: Work, Education, Volunteer, Internship
- **Description**: Rich text description
- **Achievements**: Key accomplishments
- **Skills**: Technologies and skills used
- **Dates**: Start and end dates
- **Current**: Mark ongoing positions
- **Logo**: Company/institution logo

### 🛠️ Skills
- **Name**: Skill or technology name
- **Category**: Programming, Frontend, Backend, etc.
- **Proficiency**: Beginner to Expert levels
- **Score**: Numeric rating (1-100)
- **Description**: Experience details
- **Years of Experience**: Duration
- **Icon**: Skill logo/icon
- **Color**: Brand color for styling
- **Featured**: Show on homepage

### ⚙️ Site Settings
- **Site Information**: Title, description, keywords
- **Author Details**: Name, bio, avatar, resume
- **Contact Info**: Email, phone, location
- **Social Links**: GitHub, LinkedIn, Twitter, etc.
- **SEO Settings**: Open Graph image, analytics
- **Theme**: Colors and dark mode
- **Navigation**: Control menu visibility

## 🔗 Integration with Next.js

### Install Sanity Client
```bash
cd ../next
npm install @sanity/client @sanity/image-url
```

### Environment Variables
Add to your Next.js `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=quz6kxvy
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### Usage Example
```typescript
import { getProjects, getFeaturedSkills } from '../sanity/lib/client'

// In your Next.js page or component
export async function getStaticProps() {
  const projects = await getProjects()
  const skills = await getFeaturedSkills()
  
  return {
    props: {
      projects,
      skills,
    },
    revalidate: 60, // Revalidate every minute
  }
}
```

## 🎨 Customization

### Adding New Content Types
1. Create a new schema file in `schemaTypes/`
2. Import and add it to `schemaTypes/index.ts`
3. Update the client queries in `lib/client.ts`
4. Add TypeScript types in `lib/types.ts`

### Modifying Existing Schemas
- Edit the schema files in `schemaTypes/`
- Update corresponding TypeScript types
- Restart the Studio to see changes

## 🔒 Security & Best Practices

### API Tokens
- Use read-only tokens for public websites
- Store tokens in environment variables
- Never commit tokens to version control

### Content Validation
- Required fields are marked with validation rules
- Slug fields auto-generate from titles
- Image fields include alt text for accessibility

### Performance
- Use CDN for images (`useCdn: true`)
- Implement proper caching strategies
- Consider ISR (Incremental Static Regeneration) for Next.js

## 📚 Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity + Next.js Guide](https://www.sanity.io/guides/nextjs)
- [Schema Types Reference](https://www.sanity.io/docs/schema-types)

## 🆘 Troubleshooting

### Common Issues

1. **Studio won't start locally**
   - Check Node.js version (18+ required)
   - Clear node_modules and reinstall
   - Try deploying to Sanity hosting instead

2. **Schema changes not appearing**
   - Restart the Studio
   - Check for TypeScript errors
   - Verify schema imports in `index.ts`

3. **Images not loading**
   - Check image URL builder configuration
   - Verify project ID and dataset
   - Ensure images have proper alt text

### Getting Help
- Check the [Sanity Community](https://www.sanity.io/community)
- Review the [GitHub Issues](https://github.com/sanity-io/sanity/issues)
- Join the [Sanity Slack](https://slack.sanity.io/)

## 🎯 Next Steps

1. **Deploy the Studio**: Use `npm run deploy` to make it accessible online
2. **Add Content**: Start creating your projects, posts, and profile information
3. **Integrate with Next.js**: Use the provided client and types in your frontend
4. **Customize**: Modify schemas and add new content types as needed
5. **Go Live**: Deploy your Next.js site to Netlify with Sanity as the CMS

Your Sanity Studio is now ready to power your portfolio! 🚀
