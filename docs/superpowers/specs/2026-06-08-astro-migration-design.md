# Astro Migration Design

**Date:** 2026-06-08
**Status:** Approved

## Goal

Migrate the braulio-baltazar personal portfolio site from a single static `index.html` (Webflow export) to an Astro project with React integration — without changing the visual layout — to enable future multi-page expansion.

---

## Context

**Current state:**
- Single `index.html` with 9 sections: Header, Hero, Hero Images, What I Do, Working On, Video Gallery, Toolset, Quote, Footer
- CSS: `modern-normalize.css` + `braulio-baltazar.webflow.css` (Webflow-generated, untouched)
- JS: vanilla `main.js` — scroll-reveal via IntersectionObserver + lazy-loading background videos
- Assets: SVG/PNG/WebP images + 10 MP4/WebM video pairs with poster JPGs
- No build tool, no framework, no routing

**Constraints:**
- Layout must remain visually identical
- Deploy target: Hostinger (static file upload)
- Future: additional pages (case studies, blog, etc.)

---

## Architecture

### Chosen approach: Section components

Each of the 9 sections becomes its own `.astro` component. The page composes them. React is installed but reserved for future interactive islands.

### Folder structure

```
braulio-baltazar/
├── public/
│   ├── css/                        ← moved from css/
│   ├── images/                     ← moved from images/
│   ├── videos/                     ← moved from videos/
│   └── js/
│       └── main.js                 ← moved from js/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro        ← <head>, fonts, meta, CSS, script
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── HeroImages.astro
│   │   ├── WhatIDo.astro
│   │   ├── WorkingOn.astro
│   │   ├── VideoGallery.astro
│   │   ├── Toolset.astro
│   │   ├── Quote.astro
│   │   └── Footer.astro
│   └── pages/
│       └── index.astro             ← composes all section components
├── astro.config.mjs
└── package.json
```

### index.astro structure

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import HeroImages from '../components/HeroImages.astro';
import WhatIDo from '../components/WhatIDo.astro';
import WorkingOn from '../components/WorkingOn.astro';
import VideoGallery from '../components/VideoGallery.astro';
import Toolset from '../components/Toolset.astro';
import Quote from '../components/Quote.astro';
import Footer from '../components/Footer.astro';
---
<BaseLayout>
  <Header />
  <Hero />
  <HeroImages />
  <WhatIDo />
  <WorkingOn />
  <VideoGallery />
  <Toolset />
  <Quote />
  <Footer />
</BaseLayout>
```

---

## Components

### BaseLayout.astro

Holds everything currently in `<head>`:
- charset, title, meta description
- Open Graph tags (title, description, image, type)
- Canonical URL (`https://braulio.ca`)
- Google Fonts preconnects + stylesheet (Anton + Montserrat)
- CSS links: `modern-normalize.css`, `braulio-baltazar.webflow.css`
- Favicon and apple-touch-icon links
- `<script src="/js/main.js" defer>` — applies to all future pages automatically

### Section components

Each `.astro` component contains the exact HTML from its corresponding section in `index.html`. No props, no state — all content is static and hardcoded at this stage.

| Component | Current section |
|---|---|
| `Header.astro` | Logo section |
| `Hero.astro` | Hero text block |
| `HeroImages.astro` | Candle / Woman / Dragon images |
| `WhatIDo.astro` | Business / Design / Art / AI disciplines |
| `WorkingOn.astro` | Project links section |
| `VideoGallery.astro` | 10 background video grid |
| `Toolset.astro` | Tool list section |
| `Quote.astro` | Paul Arden quote |
| `Footer.astro` | Social links + "Designing since 2005" |

### React

Installed via `@astrojs/react`. No React components exist at migration time. React is available for future interactive islands (e.g., filterable project gallery, contact form) on new pages.

---

## Build & Deployment

- **Output mode:** `static` (Astro default) — no adapter required
- **Build command:** `npm run build` → outputs to `dist/`
- **Deploy:** Upload contents of `dist/` to Hostinger public root
- **Dev server:** `npm run dev` at `localhost:4321`

---

## Asset paths

All assets move from their current locations to `public/`:

| Current path | New path in public/ | URL (unchanged) |
|---|---|---|
| `css/*.css` | `public/css/*.css` | `/css/*.css` |
| `images/*` | `public/images/*` | `/images/*` |
| `videos/*` | `public/videos/*` | `/videos/*` |
| `js/main.js` | `public/js/main.js` | `/js/main.js` |

No HTML changes needed — all paths were already root-relative.

---

## Testing & Verification

No automated test suite. Correctness is verified visually:

1. Run `npm run dev`
2. Compare each section against the original `index.html` in a browser side-by-side
3. Confirm scroll-reveal animations fire
4. Confirm lazy-loaded videos play on scroll
5. Confirm no console errors

---

## Future pages

Adding a new page:
1. Create `src/pages/<name>.astro`
2. Wrap content in `<BaseLayout>`
3. Import any reusable section components needed
4. Add React island components where interactivity is required
