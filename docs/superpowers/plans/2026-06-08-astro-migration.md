# Astro Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the single-file Webflow-exported portfolio into an Astro + React project with section-based `.astro` components, preserving the layout exactly, and enabling future multi-page expansion.

**Architecture:** Astro static site (`output: 'static'`, no adapter). Nine HTML sections become individual `.astro` components composed in `src/pages/index.astro`. React is installed via `@astrojs/react` for future interactive islands but no React components exist yet. All assets live in `public/` served at root-relative paths (`/images/`, `/css/`, `/videos/`, `/js/`).

**Tech Stack:** Astro (latest), @astrojs/react, React 18, plain CSS (existing Webflow files unchanged), Vanilla JS (main.js unchanged)

---

## File map

| Action | Path |
|---|---|
| Create | `package.json` |
| Create | `astro.config.mjs` |
| Create | `tsconfig.json` |
| Modify | `.gitignore` |
| Move | `css/` → `public/css/` |
| Move | `images/` → `public/images/` |
| Move | `videos/` → `public/videos/` |
| Move | `js/main.js` → `public/js/main.js` |
| Create | `src/layouts/BaseLayout.astro` |
| Create | `src/components/Header.astro` |
| Create | `src/components/Hero.astro` |
| Create | `src/components/HeroImages.astro` |
| Create | `src/components/WhatIDo.astro` |
| Create | `src/components/WorkingOn.astro` |
| Create | `src/components/VideoGallery.astro` |
| Create | `src/components/Toolset.astro` |
| Create | `src/components/Quote.astro` |
| Create | `src/components/Footer.astro` |
| Create | `src/pages/index.astro` |
| Delete | `index.html` (after visual verification) |

---

### Task 1: Initialize Astro project with React

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Modify: `.gitignore`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "braulio-baltazar",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "@astrojs/react": "^3.6.0",
    "astro": "^5.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run from the project root:
```bash
npm install
```
Expected: `node_modules/` created, `package-lock.json` generated. No errors.

- [ ] **Step 3: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
});
```

- [ ] **Step 4: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/base"
}
```

- [ ] **Step 5: Update `.gitignore`**

Add these lines to the end of `.gitignore`:
```
node_modules/
dist/
.astro/
```

- [ ] **Step 6: Verify Astro CLI works**

Run:
```bash
npx astro --version
```
Expected: Prints an Astro version string (e.g., `5.x.x`). No errors.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json .gitignore
git commit -m "chore: initialize Astro project with React integration"
```

---

### Task 2: Move static assets to public/

**Files:**
- Move: `css/` → `public/css/`
- Move: `images/` → `public/images/`
- Move: `videos/` → `public/videos/`
- Move: `js/main.js` → `public/js/main.js`

- [ ] **Step 1: Create public/ directory and move assets**

```bash
mkdir -p public/js
mv css public/css
mv images public/images
mv videos public/videos
mv js/main.js public/js/main.js
rmdir js
```

- [ ] **Step 2: Verify directory structure**

```bash
ls public/
```
Expected output:
```
css/  images/  js/  videos/
```

```bash
ls public/css/
```
Expected:
```
braulio-baltazar.webflow.css  modern-normalize.css
```

```bash
ls public/js/
```
Expected:
```
main.js
```

- [ ] **Step 3: Commit**

```bash
git add public/ css images videos js
git commit -m "chore: move static assets to public/"
```

---

### Task 3: Create BaseLayout.astro

**Files:**
- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Create directory**

```bash
mkdir -p src/layouts
```

- [ ] **Step 2: Create `src/layouts/BaseLayout.astro`**

```astro
---
export interface Props {
  title?: string;
  description?: string;
}

const {
  title = 'Braulio Baltazar',
  description = 'Braulio Baltazar — designer, brand strategist, and creative problem solver working at the intersection of science, technology, art, and design.',
} = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta content="width=device-width, initial-scale=1" name="viewport" />

    <!-- Open Graph -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content="/images/webclip.png" />
    <meta property="og:type" content="website" />
    <link rel="canonical" href="https://braulio.ca" />

    <!-- Stylesheets -->
    <link href="/css/modern-normalize.css" rel="stylesheet" type="text/css" />
    <link href="/css/braulio-baltazar.webflow.css" rel="stylesheet" type="text/css" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:wght@500;600;700&display=swap"
    />

    <!-- Favicon -->
    <link href="/images/favicon.png" rel="shortcut icon" type="image/x-icon" />
    <link href="/images/webclip.png" rel="apple-touch-icon" />
  </head>
  <body>
    <slot />
    <script src="/js/main.js" defer></script>
  </body>
</html>
```

- [ ] **Step 3: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: add BaseLayout.astro with head, fonts, and global script"
```

---

### Task 4: Create Header, Hero, and HeroImages components

**Files:**
- Create: `src/components/Header.astro`
- Create: `src/components/Hero.astro`
- Create: `src/components/HeroImages.astro`

- [ ] **Step 1: Create `src/components/` directory**

```bash
mkdir -p src/components
```

- [ ] **Step 2: Create `src/components/Header.astro`**

```astro
<section>
  <div class="w-layout-blockcontainer main-container w-container">
    <div class="header-style">
      <img
        src="/images/Logo.svg"
        loading="lazy"
        width="115"
        height="115"
        alt="Braulio Baltazar logo"
        class="logo"
      />
    </div>
  </div>
</section>
```

- [ ] **Step 3: Create `src/components/Hero.astro`**

```astro
<section class="section">
  <div class="w-layout-blockcontainer main-container w-container">
    <div class="hero-2">
      <div class="container-3">
        <div class="text scroll-reveal">Hello.</div>
        <div class="main-body scroll-reveal">
          I'm Braulio, AKA Brauhaus, an eclectic creative professional
          working as a designer, brand strategist, and innovative problem
          solver. My work lies at the intersection of science, technology,
          strategy, art, and design, focusing on exploring the unknown and
          creating better, intentional futures for everyone. Welcome to my
          personal hub, where you can discover who I am, what I've
          done, what I'm working on, and what I think.
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Create `src/components/HeroImages.astro`**

```astro
<section>
  <div class="w-layout-blockcontainer main-container right-pos w-container">
    <div class="cover-images-2">
      <div class="image-carrousel">
        <div class="div-block-28">
          <div
            id="w-node-f5fef1b5-03a4-b866-a463-d12acc564826-fb70cb9c"
            class="image-intro"
          >
            <img
              src="/images/Candle.svg"
              loading="lazy"
              width="577"
              height="523"
              alt="AI-generated candle illustration"
              class="candle"
            />
          </div>
          <div
            id="w-node-cdcdda36-e499-883e-700c-0656cd31b207-fb70cb9c"
            class="image-intro"
          >
            <img
              src="/images/Woman.svg"
              loading="lazy"
              width="361"
              height="523"
              alt="AI-generated woman portrait illustration"
              class="woman woman-mobile"
            />
          </div>
        </div>
        <div
          id="w-node-_823f1f8d-816f-3410-7c4f-fa011e28165e-fb70cb9c"
          class="image-intro"
        >
          <picture>
            <source srcset="/images/Dragon.webp" type="image/webp" />
            <img
              src="/images/Dragon.png"
              loading="lazy"
              width="735"
              height="524"
              alt="AI-generated dragon illustration"
              sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 735px"
              class="hero-section-2"
            />
          </picture>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.astro src/components/Hero.astro src/components/HeroImages.astro
git commit -m "feat: add Header, Hero, and HeroImages components"
```

---

### Task 5: Create WhatIDo and WorkingOn components

**Files:**
- Create: `src/components/WhatIDo.astro`
- Create: `src/components/WorkingOn.astro`

- [ ] **Step 1: Create `src/components/WhatIDo.astro`**

```astro
<section>
  <div class="w-layout-blockcontainer main-container w-container">
    <div class="what-i-do">
      <div class="text-area">
        <div class="content-style">
          <div class="paragraph">
            Rather than limiting myself to a single label, I embrace diverse
            ways of thinking. My professional practice spans four key areas:
          </div>
          <div class="disciplines-2">
            <div class="_01">
              <div class="text-3 scroll-reveal">Business</div>
            </div>
            <div class="_01">
              <div class="text-3">Design</div>
            </div>
            <div class="_01">
              <div class="text-3">Art</div>
            </div>
            <div class="_01">
              <div class="text-3">ai</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Create `src/components/WorkingOn.astro`**

```astro
<section>
  <div class="w-layout-blockcontainer main-container w-container">
    <div class="what-im-working underline">
      <div class="section-title underline">
        <div class="title">What I'm working on</div>
        <div class="description">
          These days, I've been exploring vibe coding and its
          applications in product development. My most interesting current
          projects include Agla (working name), an online store enabling
          clients to have their own platform without relying on external
          providers; Copper Creek, a beer brand conceived during a design
          sprint; and Freestate, an application helping freelancers
          calculate their rates based on fixed and variable expenses.<br />
        </div>
      </div>
      <div class="projects-2">
        <div class="text-area-2">
          <div class="description">
            Click to access to any project<br />
          </div>
          <a
            href="https://www.doodzoostudio.com/"
            target="_blank"
            class="w-inline-block"
          >
            <div class="text-6">Doodzoo</div>
          </a>
          <a
            href="https://v0-agla-homepage-design.vercel.app/"
            target="_blank"
            class="w-inline-block"
          >
            <div class="text-6">Agla</div>
          </a>
          <a
            href="https://braulio.ca/bmc/"
            target="_blank"
            class="w-inline-block"
          >
            <div class="text-6">Business Model Canvas</div>
          </a>
          <a href="#" class="w-inline-block"></a>
          <a
            href="https://bonanzacafe.com/"
            target="_blank"
            class="w-inline-block"
          >
            <div class="text-6">Bonanza Cafe</div>
          </a>
          <a
            href="https://jumpafterus.com"
            target="_blank"
            class="w-inline-block"
          >
            <div class="text-6">Jump After Us</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/WhatIDo.astro src/components/WorkingOn.astro
git commit -m "feat: add WhatIDo and WorkingOn components"
```

---

### Task 6: Create VideoGallery component

**Files:**
- Create: `src/components/VideoGallery.astro`

- [ ] **Step 1: Create `src/components/VideoGallery.astro`**

```astro
<section>
  <div class="w-layout-blockcontainer main-container w-container">
    <div class="what-i-done">
      <div>
        <div class="section-title">
          <div class="title">What I've been done</div>
          <div class="paragraph">
            Since September 2022, I have been experimenting with different
            text-to-image generation models. It's remarkable how much
            technology has advanced in less than three years. We've
            gone from seeing images and videos with a very
            "AI-like" aesthetic to creations that are now
            impossible to distinguish whether they're real or
            artificial. There are many challenges, but there are even more
            opportunities. I declare myself optimistic about this
            technology. Certainly, there will be disruptions that affect
            many people, but knowing how to make responsible and ethical use
            of it can represent a watershed that will give rise to a new
            golden era for creativity. <br /><br />My work now is to spread
            awareness about the advantages of using AI tools as a factor in
            human development. I conduct consultations and talks at
            companies and schools. I constantly experiment and create
            projects that allow me to understand the scope that AI will have
            at an economic and social level, but above all, I'm
            passionate about knowing how content creation will evolve in the
            years to come. The future truly excites me. <br /><br />Here is
            a small selection of videos generated entirely with AI.
          </div>
        </div>
      </div>
    </div>
    <div class="video-gallery">
      <div
        id="w-node-_53626dc3-af9f-bcf6-1e3b-da8e36ed88cf-fb70cb9c"
        class="background-video-2 w-background-video w-background-video-atom"
      >
        <video
          loop
          muted
          playsinline
          data-object-fit="cover"
          style="background-image: url('/videos/Bici-poster-00001.jpg');"
          data-src-mp4="/videos/Bici-transcode.mp4"
          data-src-webm="/videos/Bici-transcode.webm"
        ></video>
      </div>
      <div
        id="w-node-ee21d1e3-8e66-8a03-332a-8415e7da8702-fb70cb9c"
        class="background-video-3 w-background-video w-background-video-atom"
      >
        <video
          loop
          muted
          playsinline
          data-object-fit="cover"
          style="background-image: url('/videos/Sisters-poster-00001.jpg');"
          data-src-mp4="/videos/Sisters-transcode.mp4"
          data-src-webm="/videos/Sisters-transcode.webm"
        ></video>
      </div>
      <div
        id="w-node-cb773d73-49f3-fd90-ab92-f15d2f89fa6f-fb70cb9c"
        class="background-video-4 w-background-video w-background-video-atom"
      >
        <video
          loop
          muted
          playsinline
          data-object-fit="cover"
          style="background-image: url('/videos/Tenis-poster-00001.jpg');"
          data-src-mp4="/videos/Tenis-transcode.mp4"
          data-src-webm="/videos/Tenis-transcode.webm"
        ></video>
      </div>
      <div
        id="w-node-_5fb8f2c7-8831-6841-3774-7043373ff060-fb70cb9c"
        class="background-video w-background-video w-background-video-atom"
      >
        <video
          loop
          muted
          playsinline
          data-object-fit="cover"
          style="background-image: url('/videos/Creek-Beer-poster-00001.jpg');"
          data-src-mp4="/videos/Creek-Beer-transcode.mp4"
          data-src-webm="/videos/Creek-Beer-transcode.webm"
        ></video>
      </div>
      <div
        id="w-node-f43e352f-7a2d-1cfa-fac1-eff56988117f-fb70cb9c"
        class="background-video-7 w-background-video w-background-video-atom"
      >
        <video
          loop
          muted
          playsinline
          data-object-fit="cover"
          style="background-image: url('/videos/Red-Kimono-poster-00001.jpg');"
          data-src-mp4="/videos/Red-Kimono-transcode.mp4"
          data-src-webm="/videos/Red-Kimono-transcode.webm"
        ></video>
      </div>
      <div
        id="w-node-d7f02ea8-720a-9501-9d2a-882e026f6537-fb70cb9c"
        class="background-video-8 w-background-video w-background-video-atom"
      >
        <video
          loop
          muted
          playsinline
          data-object-fit="cover"
          style="background-image: url('/videos/Japan-01-poster-00001.jpg');"
          data-src-mp4="/videos/Japan-01-transcode.mp4"
          data-src-webm="/videos/Japan-01-transcode.webm"
        ></video>
      </div>
      <div
        id="w-node-f2e8adca-fd6e-8679-99ba-5cbae72601d2-fb70cb9c"
        class="background-video-9 w-background-video w-background-video-atom"
      >
        <video
          loop
          muted
          playsinline
          data-object-fit="cover"
          style="background-image: url('/videos/Japan-02-poster-00001.jpg');"
          data-src-mp4="/videos/Japan-02-transcode.mp4"
          data-src-webm="/videos/Japan-02-transcode.webm"
        ></video>
      </div>
      <div
        id="w-node-_675331c6-9755-71a3-2b0d-388d2da23f17-fb70cb9c"
        class="background-video-10 w-background-video w-background-video-atom"
      >
        <video
          loop
          muted
          playsinline
          data-object-fit="cover"
          style="background-image: url('/videos/Lambo-poster-00001.jpg');"
          data-src-mp4="/videos/Lambo-transcode.mp4"
          data-src-webm="/videos/Lambo-transcode.webm"
        ></video>
      </div>
      <div
        id="w-node-_45dede1d-f18f-91cc-d5fc-190cc978ed52-fb70cb9c"
        class="background-video-5 w-background-video w-background-video-atom"
      >
        <video
          loop
          muted
          playsinline
          data-object-fit="cover"
          style="background-image: url('/videos/on-the-road-poster-00001.jpg');"
          data-src-mp4="/videos/on-the-road-transcode.mp4"
          data-src-webm="/videos/on-the-road-transcode.webm"
        ></video>
      </div>
      <div
        id="w-node-bf02dd56-0024-900d-ee5e-2d9a5311cb63-fb70cb9c"
        class="background-video-6 w-background-video w-background-video-atom"
      >
        <video
          loop
          muted
          playsinline
          data-object-fit="cover"
          style="background-image: url('/videos/Singer-poster-00001.jpg');"
          data-src-mp4="/videos/Singer-transcode.mp4"
          data-src-webm="/videos/Singer-transcode.webm"
        ></video>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/VideoGallery.astro
git commit -m "feat: add VideoGallery component with 10 lazy-loaded videos"
```

---

### Task 7: Create Toolset, Quote, and Footer components

**Files:**
- Create: `src/components/Toolset.astro`
- Create: `src/components/Quote.astro`
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create `src/components/Toolset.astro`**

```astro
<section>
  <div class="w-layout-blockcontainer main-container w-container">
    <div class="what-i-think">
      <div class="section-title toolset">
        <div class="frame-4">
          <div class="title">Toolset</div>
        </div>
      </div>
      <div class="frame-6">
        <div class="frame-3">
          <h2 class="heading-13">My Toolset these days</h2>
          <h3 class="heading-11">
            🧠 <strong>Project Management:</strong> Notion (actually Notion
            is my second brain) ✏️ <strong>Design (Digital)</strong>: Figma,
            Layermate, UX Pilot and Relume 💻 <strong>Vibe coding</strong>:
            Bolt, Windsurf, Lovable and Vercel V0
            <strong>🖌️ Graphic Design:</strong> Affinity (Design, Photo,
            Publisher)⚙️ <strong>Version control</strong>: GitHub (my
            lifesaver) 💻 <strong>Code editing</strong>: VS Code and
            Windsurf 🎥 <strong>Videos</strong>: Midjourney, Kling, Veo 3 🖼️
            <strong>AI</strong> <strong>Images</strong>: Midjourney, Flux 🤖
            <strong>LLMs:</strong> ChatGPT and Claude ✜
            <strong>AI Graphics:</strong> Lovart, Recraft<strong
              >🎙️Text to audio:</strong
            >
            ElevenLabs <strong>🧰 All in one AI:</strong> Freepik, Fal
            <strong>💻 Web design:</strong> Webflow 🗂️
            <strong>Databases</strong>: Supabase 🚚 <strong>Deploy</strong>:
            Netlify
          </h3>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Create `src/components/Quote.astro`**

```astro
<section>
  <div class="w-layout-blockcontainer main-container w-container">
    <div class="what-im-working quote">
      <div class="section-title underline">
        <div class="div-block-34">
          <div class="title small-title">
            "It's not how good you are, it's how good you want to be"
          </div>
          <h3 class="heading-12">Paul Arden.</h3>
        </div>
      </div>
      <div class="projects-2"></div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Create `src/components/Footer.astro`**

```astro
<section>
  <div class="w-layout-blockcontainer main-container w-container">
    <div class="footer-2">
      <div>
        <div class="text-12">Designing since 2005</div>
        <div class="div-block-33">
          <div
            id="w-node-_67fd142d-9e41-4db6-ae5f-9e3ee03cd205-fb70cb9c"
            class="icon-box"
          >
            <a
              href="https://www.linkedin.com/in/brauliobaltazar/"
              target="_blank"
              class="w-inline-block"
            >
              <svg
                class="icon"
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-label="LinkedIn"
              >
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
            </a>
          </div>
          <div
            id="w-node-_67190df5-af43-5089-c8b6-5e4a2fc4a981-fb70cb9c"
            class="icon-box"
          >
            <a
              href="https://x.com/brauliobaltazar"
              target="_blank"
              class="w-inline-block"
            >
              <svg
                class="icon"
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-label="X (Twitter)"
              >
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Toolset.astro src/components/Quote.astro src/components/Footer.astro
git commit -m "feat: add Toolset, Quote, and Footer components"
```

---

### Task 8: Assemble index.astro, verify, and clean up

**Files:**
- Create: `src/pages/index.astro`
- Delete: `index.html`

- [ ] **Step 1: Create `src/pages/` directory**

```bash
mkdir -p src/pages
```

- [ ] **Step 2: Create `src/pages/index.astro`**

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

- [ ] **Step 3: Start the dev server**

```bash
npm run dev
```
Expected: Server starts at `http://localhost:4321`. No build errors in the terminal.

- [ ] **Step 4: Visual verification checklist**

Open `http://localhost:4321` in a browser and verify each section against the original `index.html` (open it in a second tab via `file://`):

- [ ] Logo displays correctly in header
- [ ] Hero text "Hello." visible with correct font (Anton)
- [ ] Hero body text readable with correct font (Montserrat)
- [ ] Candle, Woman, Dragon images render
- [ ] "Business / Design / Art / ai" disciplines section visible
- [ ] "What I'm working on" project links clickable
- [ ] Video gallery grid layout matches original
- [ ] Videos lazy-load and autoplay on scroll into view
- [ ] Scroll-reveal animation fires on "Hello." and hero body text
- [ ] Toolset section renders emoji and text correctly
- [ ] Paul Arden quote displays
- [ ] Footer shows LinkedIn and X icons
- [ ] No console errors (open DevTools → Console)

- [ ] **Step 5: Remove original index.html**

Only do this after visual verification passes:
```bash
git rm index.html
```

- [ ] **Step 6: Final commit**

```bash
git add src/pages/index.astro
git commit -m "feat: assemble index.astro and remove original index.html"
```

- [ ] **Step 7: Test production build**

```bash
npm run build
```
Expected: `dist/` folder created. No build errors. Output shows `dist/index.html` generated.

```bash
npm run preview
```
Expected: Site serves at `http://localhost:4321`. Perform the same visual checklist from Step 4.

- [ ] **Step 8: Final commit for build verification**

```bash
git add -A
git commit -m "chore: verify production build passes"
```

---

## Deployment to Hostinger

After the production build passes:

1. Run `npm run build` to generate `dist/`
2. Log in to Hostinger File Manager (or use FTP)
3. Upload the **contents** of `dist/` (not the folder itself) to the public root (usually `public_html/`)
4. Verify at `https://braulio.ca` that the live site matches the local preview
