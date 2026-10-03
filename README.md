# Marcin Nowak Photography — React + Vite

Bilingual Polish/English photography portfolio.

## Features

- React + Vite, single-page layout with anchor navigation
- Polish / English language switch (remembered in the browser)
- Portfolio filtering
- Light / dark theme (follows the system setting, remembered in the browser)
- Responsive layout: phones, tablets, laptops and wide screens
- Responsive WebP images (`srcset`), lazy loading below the fold
- Scroll-based navbar, mobile menu

## Photos

Photos in `src/assets/photos` are placeholders from [Unsplash](https://unsplash.com) (Unsplash License, free for commercial use).
Each photo exists in several widths named `<name>-<width>.webp` (e.g. `wedding-640.webp`, `wedding-1200.webp`; the hero uses 1280/1920/2560).
To use your own photos, replace the files keeping the names, or add new ones and register them in `src/photos.js`.

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
