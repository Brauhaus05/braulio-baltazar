# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Dev server at http://localhost:4321
npm run build      # Static build → dist/
npm run preview    # Serve dist/ locally
```

No test suite. Build success is the correctness check.

To deploy: upload the contents of `dist/` (not the folder itself) to Hostinger `public_html/`.

## Architecture

Astro static site (`output: 'static'`, no SSR adapter). React is installed via `@astrojs/react` but has no components yet — it's reserved for future interactive islands on new pages.

**Page composition:** `src/pages/index.astro` imports all 9 section components and wraps them in `BaseLayout`. Adding a new page means creating `src/pages/<name>.astro` and composing the components you need.

**Layout:** `src/layouts/BaseLayout.astro` holds the full HTML shell — `<head>`, Google Fonts, CSS links, favicon, and the global `<script src="/js/main.js" defer>`. It accepts optional `title` and `description` props.

**Components:** Each section is a plain `.astro` file in `src/components/` — no props, no state, all content hardcoded. The Webflow class names (e.g. `w-layout-blockcontainer`, `w-background-video-atom`) must be preserved exactly; `public/css/braulio-baltazar.webflow.css` targets them.

**Static assets** live in `public/` and are served at root-relative paths. Always use `/images/`, `/videos/`, `/css/`, `/js/` — never relative paths — so links work on sub-pages.

**JavaScript:** `public/js/main.js` is a single vanilla IIFE with two IntersectionObservers:
1. Scroll-reveal — adds `.visible` to `.scroll-reveal` elements on entry
2. Lazy-load videos — reads `data-src-mp4` / `data-src-webm` from `<video>` elements inside `.w-background-video` containers and injects `<source>` tags on scroll. Videos have no `<source>` children in the HTML — the JS adds them.

**CSS:** `public/css/braulio-baltazar.webflow.css` is Webflow-generated and should not be edited. `public/css/modern-normalize.css` is the CSS reset.
