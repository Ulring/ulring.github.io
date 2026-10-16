# ulring.github.io

Portfolio and CV of Anass Soulimani.

- `/` and `/fr/`: portfolio in English and French
- The CV has no public link: `public/d/cv-*.bin` are the PDFs scrambled with a key in `src/main.js`, assembled in the browser when someone clicks "Download CV". `robots.txt` disallows `/d/`. This stops crawlers, not a determined person.

## How it works

- **Content** lives in one file, `src/content.js`. `scripts/gen.mjs` turns it into both pages. Blog posts go in `posts`; the Writing section appears once there is one.
- **Sand** (`src/sand.js`) is a dependency-free WebGL2 particle simulation. Grain physics runs on the GPU with transform feedback; each figure is fitted into a box in the page layout. Without WebGL2 the page works the same, just without the sand.
- **Figures** are baked offline by `scripts/bake.mjs` into small gzipped point clouds (`public/fig/*.sand`). The models and their credits are in `scripts/models/`.
- **Fonts** (Clash Grotesk, Switzer) are self-hosted variable fonts from Fontshare (ITF Free Font License).

## Commands

```bash
npm install
npm run dev        # generate pages + dev server
npm run build      # generate pages + production build in dist/
npm run bake       # re-bake the sand figures after changing scripts/bake.mjs or a model
npm run cv         # compile the private LaTeX CVs (~/Documents/cv, never committed) and scramble them into public/d/
```

The contact form opens the visitor's mail app. To receive messages directly, set `WEB3FORMS_KEY` in `src/main.js` (free key from web3forms.com).

# GitHub profile README images (scripts/readme): build output goes to the Ulring/Ulring repo
