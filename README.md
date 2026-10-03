# Marcin Nowak Photography — React + Vite

Bilingual Polish/English photography portfolio.

## Features

- React + Vite
- React Router
- Separate Home / About / Services / Portfolio / Contact pages
- Polish / English language switch
- Portfolio filtering
- Fullscreen image lightbox
- Responsive mobile navigation
- Scroll-based navbar
- Reveal animations
- Contact form demo
- Local gallery assets

## Start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy (Vercel)

1. Import the GitHub repository in Vercel (**Add New → Project**).
2. Framework Preset: **Vite** (detected automatically). Build command `npm run build`, output directory `dist`.
3. `vercel.json` rewrites all routes to `index.html`, so direct links such as `/portfolio` work with React Router.

Requires Node.js 20.19+.
