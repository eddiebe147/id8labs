# ID8Labs Deployment Guide

## 🚀 GitHub Pages Deployment (id8labs.app)

The site is configured for **automatic deployment** to GitHub Pages when changes are pushed to the `main` branch.

---

## 📋 Setup Steps

### 1. Create & Merge Pull Request

**PR URL:** https://github.com/eddiebe147/id8labs/pull/new/claude/id8labs-website-build-011CUxk3c5ry2v3w81mh5L3M

1. Create the PR using the link above
2. Copy the PR description from earlier in the chat
3. Review and merge to `main`

---

### 2. Enable GitHub Pages

After merging to main, configure GitHub Pages:

1. Go to **Settings** → **Pages** in your GitHub repository
2. Under **Source**, select:
   - Source: `GitHub Actions`
3. The GitHub Actions workflow will automatically deploy

**GitHub Actions will:**
- Install dependencies
- Build the static site (`npm run build`)
- Deploy to GitHub Pages
- Site will be available at: `https://eddiebe147.github.io/id8labs`

---

### 3. Configure Custom Domain (id8labs.app)

The CNAME file is already configured for `id8labs.app`.

**DNS Configuration Required:**

Add these DNS records in your domain registrar (wherever id8labs.app is hosted):

#### Option A: Apex Domain (id8labs.app)
```
Type: A
Name: @
Value: 185.199.108.153
```
```
Type: A
Name: @
Value: 185.199.109.153
```
```
Type: A
Name: @
Value: 185.199.110.153
```
```
Type: A
Name: @
Value: 185.199.111.153
```

#### Option B: WWW Subdomain (www.id8labs.app)
```
Type: CNAME
Name: www
Value: eddiebe147.github.io
```

**After DNS propagates (can take up to 48 hours):**

1. Go to **Settings** → **Pages**
2. Under **Custom domain**, verify `id8labs.app` is set
3. Check **Enforce HTTPS**

---

## ✅ What's Configured

- ✅ **Next.js static export** enabled
- ✅ **GitHub Actions workflow** (`.github/workflows/deploy.yml`)
- ✅ **CNAME file** pointing to id8labs.app
- ✅ **Sitemap** updated to id8labs.app
- ✅ **robots.txt** updated to id8labs.app
- ✅ **Auto-deploy on push to main**

---

## 🔄 Deployment Process

Once merged to main:

1. **Automatic trigger**: Push to main → GitHub Actions runs
2. **Build**: Runs `npm run build` (creates `/out` folder)
3. **Deploy**: Uploads static files to GitHub Pages
4. **Live**: Site available at id8labs.app (after DNS setup)

**Deployment time:** ~2-3 minutes

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production (test static export)
npm run build

# Preview production build locally
npx serve out
```

**Dev server:** http://localhost:3000

---

## 📊 Build Output

The static export creates:
- `/out` folder with all HTML, CSS, JS
- Pre-rendered pages (SSG)
- Optimized assets
- Favicon and meta files

**No server required** - pure static hosting!

---

## 🌐 URLs After Deployment

- **Primary:** https://id8labs.app (custom domain)
- **GitHub Pages:** https://eddiebe147.github.io/id8labs (fallback)

---

## 🔧 Troubleshooting

### Build fails in GitHub Actions

Check:
- Node version (currently 20)
- Dependencies install successfully
- `npm run build` works locally

### Custom domain not working

Check:
- DNS records configured correctly
- DNS propagation (use https://dnschecker.org)
- CNAME file exists in `/public/CNAME`
- "Enforce HTTPS" enabled in GitHub Pages settings

### Pages not updating

- Check GitHub Actions tab for deployment status
- Clear browser cache
- Verify changes merged to `main` branch

---

## 📈 Performance

Expected metrics:
- **First Load:** < 1 second
- **Lighthouse Score:** 95+ (all categories)
- **Static files only:** No server latency
- **CDN delivery:** GitHub Pages uses global CDN

---

## 🎯 Next Steps

1. ✅ Create and merge PR to main
2. ✅ Wait for GitHub Actions to deploy (~2-3 min)
3. ✅ Configure DNS for id8labs.app
4. ✅ Enable HTTPS in GitHub Pages
5. ✅ Test site at id8labs.app
6. 🎉 **You're live!**

---

**Questions?** Check the GitHub Actions logs for deployment details.
