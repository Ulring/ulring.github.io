# ulring.github.io

Portfolio and CV of Anass Soulimani.

- `/` and `/fr/`: portfolio in English and French
- `/cv/` and `/cv/fr/`: HTML CV, plus `cv-en.pdf` and `cv-fr.pdf`

## How it works

- **Content** lives in one file, `src/content.js`. `scripts/gen.mjs` turns it into the four HTML pages.
- **Sand** (`src/sand.js`) is a dependency-free WebGL2 particle simulation. Grain physics runs on the GPU with transform feedback; each figure is fitted into a box in the page layout. Without WebGL2 the page works the same, just without the sand.
- **Figures** are baked offline by `scripts/bake.mjs` into small gzipped point clouds (`public/fig/*.sand`). The models and their credits are in `scripts/models/`.
- **Fonts** (Clash Grotesk, Switzer) are self-hosted variable fonts from Fontshare (ITF Free Font License).

## Commands

```bash
npm install
npm run dev        # generate pages + dev server
npm run build      # generate pages + production build in dist/
npm run bake       # re-bake the sand figures after changing scripts/bake.mjs or a model
npm run cv-pdf     # with `npx vite preview --port 4173` running: re-render public/cv-*.pdf
```

The contact form opens the visitor's mail app. To receive messages directly, set `WEB3FORMS_KEY` in `src/main.js` (free key from web3forms.com).
