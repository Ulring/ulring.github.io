// Compiles the private LaTeX CVs and publishes them scrambled, so there is no crawlable PDF on the site.
//   sources: $CV_DIR (default ~/Documents/cv)/main.tex and main-fr.tex  — never commit these to this repo
//   output:  public/d/cv-en.bin and public/d/cv-fr.bin  (XOR with the key in src/main.js; decoded only on click)
// Needs tectonic (https://tectonic-typesetting.github.io).
import { execFileSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

const dir = process.env.CV_DIR || path.join(os.homedir(), 'Documents/cv');
const KEY = new TextEncoder().encode('sand-and-spring');   // must match CV_KEY in src/main.js
fs.mkdirSync('public/d', { recursive: true });

for (const [src, lang] of [['main.tex', 'en'], ['main-fr.tex', 'fr']]) {
  execFileSync('tectonic', ['-X', 'compile', '--keep-logs', src], { cwd: dir, stdio: ['ignore', 'ignore', 'inherit'] });
  const pdf = fs.readFileSync(path.join(dir, src.replace(/\.tex$/, '.pdf')));
  const pages = execFileSync('pdfinfo', [path.join(dir, src.replace(/\.tex$/, '.pdf'))]).toString().match(/Pages:\s+(\d+)/)[1];
  const out = Buffer.from(pdf.map((b, i) => b ^ KEY[i % KEY.length]));
  fs.writeFileSync(`public/d/cv-${lang}.bin`, out);
  console.log(`cv-${lang}: ${pages} page(s), ${(out.length / 1024).toFixed(0)} KB`);
}
