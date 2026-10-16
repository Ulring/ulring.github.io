// Builds the SVGs for the GitHub profile README (github.com/Ulring/Ulring):
//   banner.svg   your name assembling from sand (CSS animation, plays once), tagline, status
//   card-*.svg   one card per project, with its sand figure
//   stack.svg    the main stack as pills
// Usage: node scripts/readme/build.mjs <out-dir>
// Inputs: name-points.json (from sample-name.mjs), public/fig/*.sand, fonts/*.b64 (subset fonts, from subset.sh)
import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

const here = path.dirname(new URL(import.meta.url).pathname);
const out = process.argv[2] || 'out';
fs.mkdirSync(out, { recursive: true });
const font = name => fs.readFileSync(path.join(here, 'fonts', `${name}.b64`), 'utf8').trim();
const FONTS = `@font-face{font-family:C;src:url(data:font/woff2;base64,${font('clash')}) format('woff2')}
@font-face{font-family:S;src:url(data:font/woff2;base64,${font('switzer')}) format('woff2')}`;
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;   // deterministic, so diffs stay small
const r1 = v => Math.round(v * 10) / 10, esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const ICE = '#a8ecff', INK = '#eef3f7', SOFT = '#c2cbd3', DIM = '#85919e', BG = '#04060a', LINE = 'rgba(238,243,247,.12)';
const grain = () => (rnd() < .55 ? ICE : INK);

// ---------- banner ----------
{
  const all = JSON.parse(fs.readFileSync(path.join(here, 'name-points.json'), 'utf8'));
  const pts = all.filter(() => rnd() < 2500 / all.length);
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const W = 1200, H = 320, s = 1040 / (maxX - minX), ox = 80 - minX * s, oy = 70 - minY * s;
  const circles = pts.map(([x, y]) => {
    const t = (maxY - y) / (maxY - minY);                         // bottom rows first, like sand building up
    const d = (t * .9 + rnd() * .45).toFixed(2), dx = r1((rnd() - .5) * 80), dy = r1(60 + rnd() * 140);
    const cls = `d${Math.min(23, Math.round(+d / 1.35 * 23))} ${rnd() < .55 ? 'i' : 'w'}${rnd() < .5 ? ' o' : ''}`;
    return `<circle cx="${r1(x * s + ox)}" cy="${r1(y * s + oy)}" r="${r1(.8 + rnd() * .9)}" class="${cls}" style="--x:${dx}px;--y:${dy}px"/>`;
  }).join('');
  const delays = Array.from({ length: 24 }, (_, i) => `.d${i}{animation-delay:${(i * 1.35 / 23).toFixed(2)}s}`).join('');
  const floor = `<path d="${Array.from({ length: 220 }, () => `M${r1(40 + rnd() * 1120)} ${r1(296 + rnd() * 8)}h0`).join('')}" stroke="${ICE}" stroke-width="1.8" stroke-opacity=".3" stroke-linecap="round"/>`;
  const nameBottom = r1(maxY * s + oy);
  fs.writeFileSync(path.join(out, 'banner.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Anass Soulimani, full-stack engineer">
<style>${FONTS}
.n circle{animation:rise 1.5s cubic-bezier(.2,.7,.2,1) both}.i{fill:${ICE}}.w{fill:${INK}}.o{fill-opacity:.6}${delays}
@keyframes rise{from{transform:translate(var(--x),var(--y));opacity:0}to{transform:none;opacity:1}}
.fade{animation:fade 1s 1.4s both}@keyframes fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.dot{animation:pulse 2.4s 2.4s ease-in-out infinite}@keyframes pulse{50%{opacity:.35}}
@media (prefers-reduced-motion:reduce){.n circle,.fade{animation:none}.dot{animation:none}}
</style>
<rect width="${W}" height="${H}" rx="22" fill="${BG}"/><rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="21.5" fill="none" stroke="${LINE}"/>
<g class="n">${circles}</g>
<g class="fade">
<text x="80" y="${nameBottom + 62}" font-family="S" font-size="27" fill="${SOFT}">Full-stack engineer · <tspan fill="${ICE}">Java, Spring Boot, Angular</tspan> · DevOps</text>
<circle class="dot" cx="88" cy="${nameBottom + 103}" r="6" fill="#7dffc4"/>
<text x="106" y="${nameBottom + 110}" font-family="S" font-size="20" fill="${DIM}">Available now · remote or relocation · English &amp; French</text>
</g>
${floor}
</svg>`);
  console.log('banner.svg', pts.length, 'grains');
}

// ---------- project cards ----------
function figure(file, n, ry = -.45, rx = .12) {
  const b = zlib.gunzipSync(fs.readFileSync(file)), total = b.readUInt32LE(4), m = [0, 1, 2, 3, 4, 5].map(i => b.readFloatLE(8 + i * 4));
  const pts = [];
  for (let i = 0; i < total && pts.length < n; i++) {
    const k = b[32 + total * 3 + i];
    let x = m[0] + b[32 + i * 3] / 255 * m[3], y = m[1] + b[33 + i * 3] / 255 * m[4], z = m[2] + b[34 + i * 3] / 255 * m[5];
    if (k === 1 && Math.abs(x) > 5) continue;                       // trim the road
    [x, z] = [x * Math.cos(ry) + z * Math.sin(ry), -x * Math.sin(ry) + z * Math.cos(ry)];
    [y, z] = [y * Math.cos(rx) - z * Math.sin(rx), y * Math.sin(rx) + z * Math.cos(rx)];
    const d = 13 - z; pts.push([x / d, -y / d, k]);
  }
  return pts;
}
const cards = [
  { id: 'fleet', fig: 'truck', org: 'SplinEdge · 2025–26', title: 'Fleet management ERP', lines: ['Runs a large transport operation:', 'catches fuel theft, predicts maintenance.'], stack: 'Java 25 · Spring Boot 4 · PostgreSQL · Redis' },
  { id: 'delivery', fig: 'scooter', org: 'SplinEdge · 2025', title: 'Food delivery platform', lines: ['Five apps on one backend, live orders,', 'and a lower Google Maps bill.'], stack: 'JHipster · WebSockets · Flutter · Next.js' },
  { id: 'galaxytest', fig: 'laptop', org: 'CBX Conseil · 2023–25', title: 'GalaxyTest', lines: ['Hiring flow for developers: apply,', 'coding-game test, job offer.'], stack: 'Spring Boot · Angular · PostgreSQL · Redis' },
  { id: 'timesheet', fig: 'calendar', org: 'CBX Conseil · 2023–25', title: 'Timesheet', lines: ['Activity reports and invoicing, built', 'for how French consulting firms work.'], stack: 'Spring Boot · Angular · Keycloak' },
];
// titles over 16 characters break onto two lines so they never run into the figure
const titleLines = t => { if (t.length <= 16) return [t]; const w = t.split(' '); let a = '', i = 0; while (i < w.length && (a + ' ' + w[i]).trim().length <= 16) a = (a + ' ' + w[i++]).trim(); return [a, w.slice(i).join(' ')]; };
for (const c of cards) {
  const W = 600, H = 300, pts = figure(path.join(here, `../../public/fig/${c.fig}.sand`), 1500, c.fig === 'calendar' ? -.3 : -.45);
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const bw = Math.max(...xs) - Math.min(...xs), bh = Math.max(...ys) - Math.min(...ys), s = Math.min(190 / bw, 140 / bh);
  const cx = 488 - (Math.min(...xs) + bw / 2) * s, cy = 132 - (Math.min(...ys) + bh / 2) * s;
  const buckets = new Map();
  for (const [x, y, k] of pts) {
    const col = k >= 50 ? '#7dffc4' : grain(), w = k >= 50 ? 2.4 : 1.8, op = k === 1 ? .35 : rnd() < .5 ? .55 : .9;
    const key = `${col}|${w}|${op}`; if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(`M${r1(x * s + cx)} ${r1(y * s + cy)}h0`);
  }
  const grains = [...buckets].map(([key, d]) => { const [col, w, op] = key.split('|'); return `<path d="${d.join('')}" stroke="${col}" stroke-width="${w}" stroke-opacity="${op}" stroke-linecap="round"/>`; }).join('');
  fs.writeFileSync(path.join(out, `card-${c.id}.svg`), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(c.title)}">
<style>${FONTS}
.f{animation:in 1.2s .2s both}@keyframes in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.f{animation:none}}</style>
<rect width="${W}" height="${H}" rx="18" fill="${BG}"/><rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="17.5" fill="none" stroke="${LINE}"/>
<g class="f">${grains}</g>
<text x="32" y="52" font-family="S" font-size="15" fill="${ICE}">${esc(c.org)}</text>
${titleLines(c.title).map((t, i, a) => `<text x="32" y="${(a.length > 1 ? 92 : 104) + i * 36}" font-family="C" font-size="34" letter-spacing="-1" fill="${INK}">${esc(t)}</text>`).join('\n')}
${c.lines.map((l, i) => `<text x="32" y="${(titleLines(c.title).length > 1 ? 168 : 146) + i * 23}" font-family="S" font-size="16" fill="${SOFT}">${esc(l)}</text>`).join('\n')}
<text x="32" y="250" font-family="S" font-size="13.5" fill="${DIM}">${esc(c.stack)}</text>
<text x="32" y="276" font-family="S" font-size="13.5" font-weight="500" fill="${ICE}">Read the case study →</text>
</svg>`);
  console.log(`card-${c.id}.svg`, pts.length, 'grains');
}

// ---------- stack pills ----------
{
  const items = ['Java', 'Spring Boot', 'SQL', 'PostgreSQL', 'Redis', 'Angular', 'Next.js', 'TypeScript', 'Docker', 'GitHub Actions', 'Jenkins', 'Linux'];
  let x = 0; const pills = items.map(t => { const w = Math.round(t.length * 8.6 + 30); const g = `<rect x="${x}" y="0" width="${w}" height="34" rx="17" fill="rgba(168,236,255,.08)" stroke="rgba(168,236,255,.22)"/><text x="${x + w / 2}" y="22.5" text-anchor="middle" font-family="S" font-size="15" fill="${INK}">${esc(t)}</text>`; x += w + 8; return g; });
  fs.writeFileSync(path.join(out, 'stack.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${x - 8} 34" width="${x - 8}" height="34" role="img" aria-label="${items.join(', ')}"><style>${FONTS}</style>${pills.join('')}</svg>`);
  console.log('stack.svg');
}
