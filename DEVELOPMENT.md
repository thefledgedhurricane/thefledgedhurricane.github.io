# Development Setup Guide

This guide explains how to run the portfolio application locally without Node.js version conflicts or security vulnerabilities.

## Quick Start (Recommended)

The application now supports **mock data mode** for local development, eliminating the need for Strapi and avoiding Node.js version compatibility issues.

### 1. Start Next.js Frontend Only

```bash
cd next
npm install
npm run dev
```

The application will automatically use mock data when Strapi is not available. You'll see:

```
📡 API Configuration: Mock Data
💡 To use Strapi: Set NEXT_PUBLIC_STRAPI_API_URL and STRAPI_API_TOKEN in .env.local
🔧 Using mock data for development (Strapi not available)
```

### 2. Access the Application

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Mock Data Features

✅ **No Node.js version conflicts**  
✅ **No security vulnerabilities from outdated packages**  
✅ **Same interface as Strapi API**  
✅ **Realistic project data with images**  
✅ **Placeholder image generation**  
✅ **Full TypeScript support**  

### What's Included

The mock data provides:
- 3 sample projects with realistic content
- Featured/non-featured project filtering
- SEO metadata
- Responsive placeholder images
- All project fields (title, description, technologies, URLs, etc.)

## Full Stack Development (Optional)

If you need to work with the actual Strapi backend:

### Prerequisites

- Node.js v18 or v20 (not v24)
- Use nvm to manage Node.js versions:

```bash
# Install and use Node.js v20
nvm install 20
nvm use 20
```

### Setup Strapi

```bash
cd strapi
npm install
npm run develop
```

### Enable Strapi in Next.js

Uncomment the Strapi configuration in `next/.env.local`:

```env
# Strapi API Configuration
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your-strapi-api-token
```

## Architecture

### API Configuration System

The application uses a smart API configuration system (`src/lib/api-config.ts`) that:

1. **Detects availability**: Checks if Strapi is configured and accessible
2. **Automatic fallback**: Uses mock data when Strapi is unavailable
3. **Same interface**: Both APIs provide identical TypeScript interfaces
4. **Development-friendly**: Clear logging about which API is being used

### File Structure

```
next/src/lib/
├── strapi.ts          # Original Strapi API client
├── mock-data.ts       # Mock data and API implementation
└── api-config.ts      # Smart API switcher

next/src/app/api/
└── placeholder/       # Placeholder image generator
```

## Switching Between Modes

### Use Mock Data (Default)

Comment out or remove Strapi configuration:

```env
# next/.env.local
# NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
# STRAPI_API_TOKEN=
```

### Use Strapi

Set Strapi configuration:

```env
# next/.env.local
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your-token
```

## Benefits of Mock Data Approach

1. **No Version Conflicts**: Works with any Node.js version
2. **No Security Issues**: No outdated dependencies
3. **Faster Development**: No backend setup required
4. **Consistent Data**: Predictable data for frontend development
5. **Offline Development**: Works without internet connection
6. **Easy Testing**: Consistent data for testing UI components

## Production Deployment

For production, always use the real Strapi backend:

1. Deploy Strapi to your server
2. Set production environment variables
3. The application will automatically use Strapi in production

## Troubleshooting

### Mock Data Not Loading

Check the console logs. You should see:
```
📡 API Configuration: Mock Data
```

If you see Strapi errors, ensure the Strapi environment variables are commented out.

### Images Not Displaying

Mock data uses the `/api/placeholder/[width]/[height]` endpoint for images. Ensure the API route is working by visiting:
[http://localhost:3000/api/placeholder/400/300](http://localhost:3000/api/placeholder/400/300)

### TypeScript Errors

Both mock and Strapi APIs use the same TypeScript interfaces. If you see type errors, check that imports are using `@/lib/api-config` instead of `@/lib/strapi`.

## Contributing

When adding new features:

1. Update both `strapi.ts` and `mock-data.ts` if adding new API methods
2. Ensure TypeScript interfaces remain consistent
3. Test with both mock data and Strapi (if available)
4. Update this documentation for any new configuration options