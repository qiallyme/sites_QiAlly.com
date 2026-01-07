# qially.com — Business & Client Hub

**Official business website for Qi Ally**  
Fractional C-suite services, AI workflows, finance & operations consulting.

**Static HTML5 Site** (No build step required)

---

## 📁 Project Structure

```
qially-com/
├── assets/             # Static assets (images, css, js, files)
│   ├── imgs/
│   ├── files/
│   ├── css/
│   ├── js/
│   └── vids/
├── modules/            # Functional areas / offerings
│   ├── taxes/
│   ├── hr-ops/
│   ├── it-ai/
│   └── qisuite/
├── pages/              # Content pages
│   ├── services/
│   ├── portfolio/
│   ├── privacy/
│   ├── msa/
│   └── showcases/
├── index.html          # Homepage
├── sitemap.xml
├── robots.txt
└── _redirects          # Cloudflare Pages redirects
```

## 🚀 Quick Start

Since this is a static site, you can serve it with any static file server.

For local development (using Python):
```bash
python -m http.server 8000
```
Open `http://localhost:8000`

## 🛠️ Deployment

This site is deployed on Cloudflare Pages.
- **Build command:** (Leave empty / None)
- **Output directory:** (Leave empty / Root) - *Note: Cloudflare might require a directory if you don't treat root as output. If using plain static, root is fine, or ensure all files are in publish dir.*

**Redirects:**
Ensure `_redirects` file is present in the root.

---

**Status:** ✅ Static HTML5  
**Maintained by:** Qi Ally Team  
**Last Updated:** Jan 2026
