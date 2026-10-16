import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/',
  build: {
    target: 'es2022',
    rollupOptions: { input: Object.fromEntries(['index.html', 'fr/index.html', 'cv/index.html', 'cv/fr/index.html'].map(f => [f.replace(/\/?index\.html$/, '') || 'main', resolve(import.meta.dirname, f)])) },
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
