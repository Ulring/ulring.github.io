import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// every page scripts/gen.mjs writes
const pages = () => ['index.html', 'fr/index.html', 'links/index.html', ...['blog', 'work'].flatMap(dir => fs.existsSync(dir) ? fs.readdirSync(dir).map(d => `${dir}/${d}/index.html`) : [])];

export default defineConfig({
  base: '/',
  build: {
    target: 'es2022',
    rollupOptions: { input: Object.fromEntries(pages().map(f => [f.replace(/\/?index\.html$/, '') || 'main', resolve(import.meta.dirname, f)])) },
  },
  plugins: [{
    // dev only: /__delay?ms=N holds the page's load event, so headless screenshots wait for WebGL/WebGPU
    name: 'screenshot-delay',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url.startsWith('/__delay')) return next();
        const ms = +new URL(req.url, 'http://x').searchParams.get('ms') || 3000;
        setTimeout(() => { res.setHeader('Content-Type', 'image/gif'); res.end(Buffer.from('R0lGODlhAQABAAAAACw=', 'base64')); }, ms);
      });
    },
  }],
});
