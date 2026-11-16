# Deploy guide

Build locally first (to test):
    npm install
    npm run build      # creates the `out/` folder
    npx serve out      # optional preview

## Cloudflare Pages
- Framework preset: Next.js (Static HTML Export)
- Build command: npm run build
- Build output directory: out
- Environment variable: NODE_VERSION = 20   (or 22)

## Vercel
- Framework: Next.js (auto-detected). Just import the repo, no settings needed.

## GitHub Pages / Netlify
- Upload/serve the `out/` folder after `npm run build`.
