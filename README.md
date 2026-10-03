# Marcin Nowak Photography — React + Vite

Bilingual Polish/English photography portfolio.

## Features

- React + Vite, single-page layout with anchor navigation
- Polish / English language switch (remembered in the browser)
- Portfolio filtering
- Responsive mobile navigation
- Scroll-based navbar
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
3. `vercel.json` rewrites unknown paths to `index.html`, so mistyped links open the site instead of a 404.

Requires Node.js 20.19+.
