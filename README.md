# qially.com — Business & Client Hub

**Official business website for Qi Ally**  
Fractional C-suite services, AI workflows, finance & operations consulting.

Built with **Vite + React + Tailwind CSS** using shared UI components from `2_modules/`.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Development server runs on `http://localhost:5174`

---

## 📁 Project Structure

```
qially-com/
├─ public/          # Static assets (served as-is)
│  ├─ images/      # Image assets
│  └─ files/       # PDFs and documents
├─ content/        # Content source (markdown/JSON)
│  ├─ pages/       # Legacy content files (not used by React)
│  ├─ blog/        # Blog posts
│  └─ data/        # Structured data & JSON-LD
├─ src/            # Application code
│  ├─ pages/       # React route pages
│  ├─ lib/         # Utilities (SEO, analytics)
│  └─ index.css    # Global styles
├─ _redirects      # Cloudflare Pages redirects
└─ vite.config.ts  # Vite configuration
```

---

## 🛠️ Development

### Tech Stack
- **Vite** - Build tool and dev server
- **React 18** - UI framework
- **React Router** - Client-side routing
- **MDX** - Markdown with JSX for blog posts and longform content
- **Tailwind CSS** - Styling (extends shared preset from `2_modules/theme/`)
- **TypeScript** - Type safety

### Content Strategy
- **TSX pages** - Core site pages (Home, Services, Pricing, About, Contact, etc.)
- **MDX content** - Blog posts and longform content in `content/blog/*.mdx`
- **Shared UI** - Components from `@qially/ui` work in both TSX and MDX

### Shared Modules
This app uses shared components from `2_modules/`:
- `@qially/ui` - UI components (Layout, Hero, CTA, etc.)
- `@qially/lib` - Utilities (SEO, analytics)
- `@qially/layouts` - Layout components
- `@qially/theme` - Tailwind theme preset

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Routes
- `/` - Homepage
- `/services` - Service offerings
- `/pricing` - Pricing tiers
- `/portfolio` - Portfolio highlights
- `/about` - About page
- `/contact` - Contact form
- `/support` - Support links
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/blog` - Blog listing (MDX posts)
- `/blog/:slug` - Individual blog post (MDX)
- `/portal` - Redirects to myhub.qially.com

---

## 🌐 Deployment (Cloudflare Pages)

### Pre-Deployment Checklist

#### Build Configuration
- ✅ **Framework:** Vite + React
- ✅ **Build Command:** `npm run build`
- ✅ **Output Directory:** `dist`
- ✅ **Node Version:** 18.x (or latest LTS)

#### Required Files
- ✅ `package.json` - Dependencies and scripts
- ✅ `vite.config.ts` - Vite configuration
- ✅ `_redirects` - Cloudflare redirects (in root)
- ✅ `public/robots.txt` - SEO robots file
- ✅ `tsconfig.json` - TypeScript configuration

### Cloudflare Pages Setup

#### Step 1: Connect Repository
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages
2. Click "Create a project"
3. Connect your Git provider (GitHub/GitLab)
4. Select repository: `qiallyme/QiOne` (or your repo)
5. **Set Root Directory:** `5_Apps/5.0_QiApps/1_apps/qially-com`

#### Step 2: Build Settings
- **Framework preset:** Vite (or None)
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `5_Apps/5.0_QiApps/1_apps/qially-com`

#### Step 3: Environment Variables
Add these in Cloudflare Pages settings:
```
NODE_ENV=production
```

#### Step 4: Custom Domain
1. In Pages dashboard → Custom domains
2. Add `qially.com`
3. Cloudflare will automatically configure DNS

### Build Process

The build process:
1. Installs dependencies (`npm install`)
2. Runs TypeScript check (`tsc`)
3. Runs Vite build (`vite build`)
4. Outputs to `dist/` directory
5. Deploys to Cloudflare Pages

### Verification

After deployment, check:
- [ ] Homepage loads: `https://qially.com`
- [ ] All pages accessible (About, Services, Contact, etc.)
- [ ] Robots.txt accessible: `https://qially.com/robots.txt`
- [ ] Redirects work (`/portal` → myhub.qially.com)
- [ ] Images and assets load correctly
- [ ] No console errors
- [ ] Mobile responsive
- [ ] SPA routing works (try direct URLs)

### Common Issues

#### Build Fails
- Check Node.js version (should be 18.x or latest LTS)
- Verify all dependencies in `package.json`
- Check for TypeScript errors: `npm run build`
- Review build logs in Cloudflare dashboard

#### 404 Errors
- Ensure `_redirects` file is in root directory with SPA fallback:
  ```
  /*    /index.html   200
  ```
- Verify all routes are defined in `src/App.tsx`
- Check that React Router is configured correctly

#### Assets Not Loading
- Check `public/` directory structure
- Verify asset paths in code (use relative paths)
- Ensure `public/` files are copied to `dist/` during build

---

## 📊 Performance

Cloudflare Pages automatically provides:
- ✅ Global CDN
- ✅ HTTP/3 support
- ✅ Brotli compression
- ✅ Image optimization
- ✅ Edge caching

---

## 🔒 Security

- ✅ HTTPS enforced (automatic)
- ✅ Security headers via `_headers` (if configured)
- ✅ DDoS protection (automatic)

---

## 📈 Analytics

Cloudflare Web Analytics is available in the dashboard. No additional setup needed.

---

## 🔄 Continuous Deployment

Once connected to Git:
- Every push to `main` branch triggers deployment
- Preview deployments for pull requests
- Automatic rollback on build failure

---

## 🔗 Key Pages

- `/` - Homepage with hero & services overview
- `/services` - Service offerings
- `/pricing` - Pricing tiers
- `/portfolio` - Portfolio highlights (links to portfolio.qially.com)
- `/about` - About page
- `/contact` - Contact form
- `/support` - Support links (redirects to support.qially.me)
- `/privacy` - Privacy policy
- `/terms` - Terms of service

### Subdomains
- **myhub.qially.com** → Client portal (separate app)
- **portfolio.qially.com** → Full portfolio showcase
- **support.qially.me** → Support portal
- **vault.qially.com** → Public knowledge base

---

## 📝 Notes

- The `_redirects` file must be in the root directory (not in `public/`)
- Vite automatically copies `public/` contents to `dist/`
- All static assets should be in `public/` directory
- PDFs go in `public/files/`, images in `public/images/`
- Legacy `content/pages/*.md` files are not used by React components (safe to archive)

---

**Status:** ✅ Ready for deployment  
**Maintained by:** Qi Ally Team  
**Last Updated:** January 2025
