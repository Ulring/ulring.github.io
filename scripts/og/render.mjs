// Renders public/og.png (1200×630 link-preview image) from scripts/og/card.html.
// Needs Playwright's Chromium (any local install): node scripts/og/render.mjs
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
const b = await chromium.launch({ channel: 'chromium' });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.goto('file://' + fileURLToPath(new URL('./card.html', import.meta.url)));
await p.waitForTimeout(500);
await p.screenshot({ path: 'public/og.png' });
await b.close();
