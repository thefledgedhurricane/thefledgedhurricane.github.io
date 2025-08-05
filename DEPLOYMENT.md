# Deployment Guide

This guide covers deploying your academic portfolio to GitHub Pages using GitHub Actions.

## Prerequisites

- Node.js 18+ installed
- A Sanity CMS project set up
- GitHub repository with your portfolio code
- Environment variables configured

## 1. Local Development Setup

### Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio

# Install Strapi dependencies
cd strapi
npm install

# Install Next.js dependencies
cd ../next
npm install
```

### Environment Configuration

#### Strapi Environment (.env)

```bash
cd strapi
cp .env.example .env
```

Update the `.env` file with your values:

```env
# Generate secure keys
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret

# Database (SQLite for development)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# CORS (add your frontend URLs)
CORS_ORIGIN=http://localhost:3000,https://your-domain.netlify.app
```

#### Next.js Environment (.env.local)

```bash
cd ../next
cp .env.example .env.local
```

Update the `.env.local` file:

```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your-strapi-api-token
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Your Portfolio
NEXT_PUBLIC_SITE_DESCRIPTION=Your portfolio description
CONTACT_EMAIL=your-email@example.com
```

### Start Development Servers

```bash
# Terminal 1: Start Strapi
cd strapi
npm run develop

# Terminal 2: Start Next.js
cd next
npm run dev
```

## 2. Strapi Production Deployment

### Server Setup (Ubuntu/Debian)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install PostgreSQL (recommended for production)
sudo apt install postgresql postgresql-contrib
```

### Database Setup (PostgreSQL)

```bash
# Create database and user
sudo -u postgres psql

CREATE DATABASE portfolio_strapi;
CREATE USER strapi_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE portfolio_strapi TO strapi_user;
\q
```

### Deploy Strapi

```bash
# Clone repository on server
git clone <your-repo-url> /var/www/portfolio
cd /var/www/portfolio/strapi

# Install dependencies
npm ci --only=production

# Create production environment file
sudo nano .env
```

Production `.env` for Strapi:

```env
NODE_ENV=production
HOST=0.0.0.0
PORT=1337

# Generate new secure keys for production
APP_KEYS=prod-key1,prod-key2,prod-key3,prod-key4
API_TOKEN_SALT=prod-api-token-salt
ADMIN_JWT_SECRET=prod-admin-jwt-secret
TRANSFER_TOKEN_SALT=prod-transfer-token-salt
JWT_SECRET=prod-jwt-secret

# PostgreSQL Database
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=portfolio_strapi
DATABASE_USERNAME=strapi_user
DATABASE_PASSWORD=secure_password
DATABASE_SSL=false

# CORS for production
CORS_ORIGIN=https://your-domain.netlify.app,https://your-custom-domain.com

# Email configuration (example with SendGrid)
EMAIL_PROVIDER=sendgrid
EMAIL_PROVIDER_OPTIONS_API_KEY=your-sendgrid-api-key
EMAIL_DEFAULT_FROM=noreply@yourdomain.com
EMAIL_DEFAULT_REPLY_TO=contact@yourdomain.com
```

```bash
# Build Strapi
npm run build

# Start with PM2
pm2 start npm --name "strapi" -- start
pm2 save
pm2 startup
```

### Nginx Configuration

```bash
# Install Nginx
sudo apt install nginx

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/strapi
```

Nginx configuration:

```nginx
server {
    listen 80;
    server_name your-strapi-domain.com;
    
    location / {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/strapi /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Install SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-strapi-domain.com
```

## 3. Netlify Deployment Setup

### GitHub Repository Setup

1. Push your code to GitHub
2. Ensure the repository is public or you have Netlify access

### Netlify Configuration

1. **Connect Repository**
   - Go to Netlify Dashboard
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**
   - Base directory: `next`
   - Build command: `npm run build`
   - Publish directory: `next/out`

3. **Environment Variables**
   
   Add these in Netlify Dashboard → Site Settings → Environment Variables:
   
   ```
   NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi-domain.com
   STRAPI_API_TOKEN=your-production-strapi-token
   NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
   NEXT_PUBLIC_SITE_NAME=Your Portfolio
   NEXT_PUBLIC_SITE_DESCRIPTION=Your portfolio description
   CONTACT_EMAIL=your-email@example.com
   EMAIL_SERVICE_API_KEY=your-email-service-key
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=https://your-site.netlify.app
   ```

### GitHub Actions Secrets

Add these secrets in GitHub Repository → Settings → Secrets and Variables → Actions:

```
NETLIFY_AUTH_TOKEN=your-netlify-auth-token
NETLIFY_SITE_ID=your-netlify-site-id
NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi-domain.com
STRAPI_API_TOKEN=your-production-strapi-token
NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
NEXT_PUBLIC_SITE_NAME=Your Portfolio
NEXT_PUBLIC_SITE_DESCRIPTION=Your portfolio description
CONTACT_EMAIL=your-email@example.com
EMAIL_SERVICE_API_KEY=your-email-service-key
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://your-site.netlify.app
```

## 4. Domain Configuration

### Custom Domain on Netlify

1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS records:
   - A record: `@` → Netlify IP
   - CNAME record: `www` → your-site.netlify.app

### SSL Certificate

Netlify automatically provisions SSL certificates for custom domains.

## 5. Content Management

### Strapi Admin Setup

1. Visit `https://your-strapi-domain.com/admin`
2. Create admin account
3. Configure content types
4. Create API tokens for Next.js

### API Token Creation

1. Go to Settings → API Tokens
2. Create new token with:
   - Name: "Next.js Frontend"
   - Token type: "Read-only"
   - Duration: "Unlimited"
3. Copy token and add to Netlify environment variables

## 6. Performance Optimization

### Image Optimization

- Configure Strapi image formats
- Use Next.js Image component
- Set up CDN for Strapi uploads

### Caching Strategy

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 's-maxage=60, stale-while-revalidate' },
        ],
      },
    ];
  },
};
```

## 7. Monitoring and Maintenance

### Health Checks

```bash
# Check Strapi status
curl https://your-strapi-domain.com/_health

# Check Next.js build
npm run build
```

### Backup Strategy

```bash
# Database backup
pg_dump portfolio_strapi > backup_$(date +%Y%m%d).sql

# Strapi uploads backup
tar -czf uploads_backup_$(date +%Y%m%d).tar.gz strapi/public/uploads
```

### Log Monitoring

```bash
# PM2 logs
pm2 logs strapi

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## 8. Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check CORS_ORIGIN in Strapi .env
   - Verify domain spelling

2. **Build Failures**
   - Check environment variables
   - Verify API connectivity

3. **Performance Issues**
   - Enable caching
   - Optimize images
   - Use CDN

### Debug Commands

```bash
# Check Strapi health
curl -I https://your-strapi-domain.com

# Test API endpoint
curl https://your-strapi-domain.com/api/projects

# Check Next.js build
npm run build 2>&1 | tee build.log
```

## 9. Security Checklist

- [ ] Environment variables secured
- [ ] API tokens rotated
- [ ] HTTPS enabled everywhere
- [ ] Firewall configured
- [ ] Regular updates scheduled
- [ ] Backup strategy implemented
- [ ] Monitoring alerts set up

## 10. Maintenance Schedule

### Weekly
- Check application health
- Review error logs
- Monitor performance metrics

### Monthly
- Update dependencies
- Review security logs
- Test backup restoration

### Quarterly
- Security audit
- Performance optimization
- Dependency security scan

---

**Need Help?** Check the troubleshooting section or create an issue in the repository.