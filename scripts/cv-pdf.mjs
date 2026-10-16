// Renders /cv/ and /cv/fr/ to public/cv-en.pdf and public/cv-fr.pdf with headless Chromium.
// Run after `npm run build` with `npx vite preview --port 4173` running: node scripts/cv-pdf.mjs
import { chromium } from 'playwright';
const base = process.env.BASE || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ channel: 'chromium' });
const page = await browser.newPage();
for (const [path, out] of [['/cv/', 'public/cv-en.pdf'], ['/cv/fr/', 'public/cv-fr.pdf']]) {
  await page.goto(base + path, { waitUntil: 'networkidle' });
  await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
  console.log('wrote', out);
}
await browser.close();
