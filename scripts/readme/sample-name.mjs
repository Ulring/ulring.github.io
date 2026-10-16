// Samples points from "ANASS SOULIMANI" set in Clash Grotesk, for the animated README banner.
// Needs Playwright's Chromium. Writes name-points.json (x, y in pixels of a 1200-wide canvas).
import { chromium } from 'playwright';
import fs from 'fs';
const dir = process.argv[2];
fs.writeFileSync(dir + '/.sample.html', '<style>@font-face{font-family:C;src:url("../../public/fonts/ClashGrotesk-Variable.woff2")}</style><canvas id=c width=1200 height=200></canvas>');
const b = await chromium.launch({ channel: 'chromium' });
const p = await b.newPage();
await p.goto('file://' + dir + '/.sample.html');
const pts = await p.evaluate(async () => {
  await document.fonts.load('600 100px C');
  const c = document.getElementById('c'), x = c.getContext('2d');
  x.fillStyle = '#fff'; x.font = '600 132px C'; x.textBaseline = 'alphabetic'; x.fillText('ANASS SOULIMANI', 0, 150);
  const d = x.getImageData(0, 0, 1200, 200).data, out = [];
  for (let y = 0; y < 200; y += 3) for (let xx = 0; xx < 1200; xx += 3) if (d[(y * 1200 + xx) * 4 + 3] > 140) out.push([xx, y]);
  return out;
});
fs.writeFileSync(dir + '/name-points.json', JSON.stringify(pts));
fs.rmSync(dir + '/.sample.html');
console.log('name points', pts.length);
await b.close();
