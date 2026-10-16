// preview.mjs <fig.sand> <out.png> [rotY] [rotX] — software render of a baked figure, for checking shapes without a browser
import fs from 'fs'; import zlib from 'zlib';
const [file, out, ryA = '-0.45', rxA = '0.12'] = process.argv.slice(2);
const b = zlib.gunzipSync(fs.readFileSync(file)), n = b.readUInt32LE(4), m = [0, 1, 2, 3, 4, 5].map(i => b.readFloatLE(8 + i * 4));
const W = 1200, H = 700, acc = new Float32Array(W * H), ry = +ryA, rx = +rxA, f = H / 2 / Math.tan(20 * Math.PI / 180);
for (let i = 0; i < n; i++) {
  let x = m[0] + b[32 + i * 3] / 255 * m[3], y = m[1] + b[33 + i * 3] / 255 * m[4] - 1.2, z = m[2] + b[34 + i * 3] / 255 * m[5]; const k = b[32 + n * 3 + i];
  if (k === 1 && Math.abs(x) > 6) continue;
  [x, z] = [x * Math.cos(ry) + z * Math.sin(ry), -x * Math.sin(ry) + z * Math.cos(ry)]; [y, z] = [y * Math.cos(rx) - z * Math.sin(rx), y * Math.sin(rx) + z * Math.cos(rx)];
  const d = 13 - z, px = Math.round(W / 2 + x * f / d), py = Math.round(H / 2 - y * f / d);
  if (px >= 0 && py >= 0 && px < W && py < H) acc[py * W + px] += k >= 50 ? .6 : k === 1 ? .2 : .35;
}
const raw = Buffer.alloc((W + 1) * H); for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) raw[y * (W + 1) + 1 + x] = Math.min(255, 12 + acc[y * W + x] * 255);
const crcT = [...Array(256)].map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc = d => { let r = 0xffffffff; for (const x of d) r = crcT[(r ^ x) & 255] ^ (r >>> 8); return (r ^ 0xffffffff) >>> 0; };
const chunk = (t, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(t), d]), c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([l, td, c]); };
const ih = Buffer.alloc(13); ih.writeUInt32BE(W, 0); ih.writeUInt32BE(H, 4); ih[8] = 8; ih[9] = 0;
fs.writeFileSync(out, Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ih), chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]));
