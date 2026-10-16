// Bakes each sand figure into a small gzipped point cloud: public/fig/<name>.sand
//
// Format (little endian, then gzipped):
//   "SND1"  u32 N  f32 minX minY minZ  f32 sizeX sizeY sizeZ
//   N × (u8 x, u8 y, u8 z)   positions quantised inside the bounding box
//   N × u8 kind              0 body · 1 road (streams) · 50..250 sequenced (lights up in order)
// Points are shuffled, so a phone can load the first half and still get the whole figure.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';
import fs from 'fs';
import zlib from 'zlib';

globalThis.self = globalThis;                    // GLTFLoader expects a browser global; textures are not needed
const N = 40000;
const OUT = process.argv[2] || 'public/fig';
const MODELS = new URL('./models/', import.meta.url);
const V = (x, y, z) => new THREE.Vector3(x, y, z);
const R = Math.random, g = () => (R() + R() + R() - 1.5) / 1.5;

// ---------- sampling ----------
async function loadGlb(name) {
  const b = fs.readFileSync(new URL(name, MODELS));
  const gltf = await new Promise((res, rej) => new GLTFLoader().parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.length), '', res, rej));
  return gltf.scene;
}
function nonIndexed(geo, matrix) {
  const g2 = geo.clone(); if (matrix) g2.applyMatrix4(matrix);
  return g2.index ? g2.toNonIndexed() : g2;
}
function meshesOf(root) {
  root.updateMatrixWorld(true); const out = [];
  root.traverse(o => { if (o.isMesh) out.push({ name: o.name, geo: nonIndexed(o.geometry, o.matrixWorld) }); });
  return out;
}
function placed(geo, pos, rot = [0, 0, 0], scale = [1, 1, 1]) {
  const m = new THREE.Mesh(geo); m.position.set(...pos); m.rotation.set(...rot); m.scale.set(...scale); m.updateMatrixWorld(true);
  return nonIndexed(geo, m.matrixWorld);
}
function area(geo) {
  const p = geo.attributes.position, a = V(0, 0, 0), b = V(0, 0, 0), c = V(0, 0, 0); let s = 0;
  for (let i = 0; i < p.count; i += 3) { a.fromBufferAttribute(p, i); b.fromBufferAttribute(p, i + 1); c.fromBufferAttribute(p, i + 2); s += b.sub(a).cross(c.sub(a)).length() / 2; }
  return s;
}
// parts: [{ geo, w, k }] sampled by area × weight, or [{ fn, area, w, k }] for analytic shapes
function sample(parts, n) {
  for (const p of parts) if (p.geo) { p.area = area(p.geo); p.sampler = new MeshSurfaceSampler(new THREE.Mesh(p.geo)).build(); }
  const tot = parts.reduce((s, p) => s + p.area * (p.w ?? 1), 0);
  const pos = [], kind = [], v = V(0, 0, 0);
  parts.forEach((p, i) => {
    const cnt = i === parts.length - 1 ? n - pos.length : Math.round(n * p.area * (p.w ?? 1) / tot);
    for (let c = 0; c < cnt; c++) { if (p.sampler) p.sampler.sample(v); else v.copy(p.fn()); pos.push(v.clone()); kind.push(p.k ?? 0); }
  });
  return { pos, kind };
}
function concat(...sets) { return { pos: sets.flatMap(s => s.pos), kind: sets.flatMap(s => s.kind) }; }
// centre on x/z, scale to a given length (longest horizontal side), stand on y = 0
function normalize(set, length) {
  const box = new THREE.Box3().setFromPoints(set.pos), size = box.getSize(V(0, 0, 0)), c = box.getCenter(V(0, 0, 0));
  const s = length / Math.max(size.x, size.z);
  for (const p of set.pos) { p.x = (p.x - c.x) * s; p.z = (p.z - c.z) * s; p.y = (p.y - box.min.y) * s; }
  return set;
}
function road(len, share) {                       // two lane lines and a dashed centre line under a vehicle
  const pos = [], kind = [];
  while (pos.length < share) {
    const x = (R() - .5) * len, r = R();
    if (r < .3) { if (Math.floor((x + len) / .7) % 2) { pos.push(V(x, 0, (R() - .5) * .05)); kind.push(1); } continue; }
    pos.push(V(x, g() * .006, (r < .65 ? 1 : -1) * 1.05 + g() * .03)); kind.push(1);
  }
  return { pos, kind };
}
function tubeBetween(a, b, r) { return new THREE.TubeGeometry(new THREE.LineCurve3(V(...a), V(...b)), 8, r, 10, false); }
function roundedBox(w, h, d, r) {                 // box with rounded vertical edges (extruded rounded rectangle)
  const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  const geo = new THREE.ExtrudeGeometry(s, { depth: d, bevelEnabled: true, bevelSize: r * .5, bevelThickness: r * .5, bevelSegments: 3, curveSegments: 6 });
  geo.translate(0, 0, -d / 2); return geo;
}

// ---------- figures ----------
async function truck() {                          // Fleet ERP: Kenney "delivery" truck (CC0) driving on a road
  const scene = await loadGlb('truck.glb');
  scene.rotation.y = Math.PI / 2;                 // model faces +z; turn it to face +x
  scene.traverse(o => { if (o.isMesh && o.name.startsWith('wheel')) o.scale.multiplyScalar(.8); }); // toy wheels → realistic
  const body = normalize(sample(meshesOf(scene).map(m => ({ geo: m.geo, w: m.name.startsWith('wheel') ? 1.3 : 1 })), Math.round(N * .86)), 6.4);
  return concat(body, road(14, N - body.pos.length));
}
async function scooter() {                        // Food delivery: "Vespa" by Jasmine Roberts (CC BY 3.0) with a delivery box
  const scene = await loadGlb('vespa.glb');
  scene.rotation.y = Math.PI / 2;
  const parts = meshesOf(scene).map(m => ({ geo: m.geo }));
  const box = new THREE.Box3(); parts.forEach(p => box.union(new THREE.Box3().setFromBufferAttribute(p.geo.attributes.position)));
  const size = box.getSize(V(0, 0, 0));
  // delivery box sits on the rear rack: back third of the scooter, above the seat
  const bw = size.x * .3, bh = size.y * .3, bd = size.z * .62;
  parts.push({ geo: placed(roundedBox(bw, bh, bd, bw * .08), [box.min.x + size.x * .2, box.min.y + size.y * .66, (box.min.z + box.max.z) / 2]), w: .8 });
  const body = normalize(sample(parts, Math.round(N * .86)), 5.4);
  return concat(body, road(14, N - body.pos.length));
}
function laptop() {                               // GalaxyTest: a laptop whose screen fills with code line by line
  const S = THREE, parts = [], W = 3.4, D = 2.3, T = .1, H = 2.2;
  parts.push({ geo: placed(roundedBox(W, D, T, .05), [0, 0, 0], [Math.PI / 2, 0, 0]), w: .28 });
  for (let r = 0; r < 5; r++) for (let c = 0; c < 14; c++) parts.push({ geo: placed(new S.BoxGeometry(.17, .03, .15), [-1.42 + c * .218, .07, -.6 + r * .2]), w: .18 });
  parts.push({ geo: placed(new S.BoxGeometry(1.1, .01, .6), [0, .055, .78]), w: .7 });
  const lid = new THREE.Group(); lid.position.set(0, 0, -D / 2); lid.rotation.x = -.32; lid.updateMatrixWorld(true);
  const screen = new THREE.Mesh(roundedBox(W, H, .08, .08)); screen.position.set(0, H / 2, 0); lid.add(screen); lid.updateMatrixWorld(true);
  parts.push({ geo: nonIndexed(screen.geometry, screen.matrixWorld), w: .3 });
  const body = sample(parts, Math.round(N * .68));
  const code = { pos: [], kind: [] }, lines = [0, 1, 2, 2, 3, 3, 2, 1, 1, 2, 3, 2, 1, 0, 0, 1, 2, 1, 0];
  lines.forEach((ind, li) => {
    const y = H - .25 - li * .1; if (y < .2) return;
    let x = -W / 2 + .3 + ind * .22;
    for (let w = 0, words = 1 + (li * 7) % 4; w < words; w++) {
      const len = .18 + ((li * 13 + w * 7) % 9) * .07, order = (li + (x + W / 2) / W * .9) / lines.length;
      for (let i = 0; i < len * 900; i++) { code.pos.push(V(x + R() * len, y + g() * .012, .06).applyMatrix4(lid.matrixWorld)); code.kind.push(50 + Math.round(order * 200)); }
      x += len + .1;
    }
  });
  const pick = shuffle(code.pos.map((p, i) => i)).slice(0, N - body.pos.length);
  return normalize(concat(body, { pos: pick.map(i => code.pos[i]), kind: pick.map(i => code.kind[i]) }), 3.4);
}
function calendar() {                             // Timesheet: a month whose working days fill in one by one, like a CRA
  const S = THREE, parts = [], seq = { pos: [], kind: [] };
  const cw = .62, ch = .5, gap = .07, cols = 7, rows = 5, W = cols * (cw + gap) + .2, Hh = rows * (ch + gap) + 1.0, x0 = -W / 2 + .1 + cw / 2;
  parts.push({ geo: placed(roundedBox(W, Hh, .06, .1), [0, Hh / 2, 0]), w: .1 });
  parts.push({ geo: placed(new S.BoxGeometry(W - .2, .4, .02), [0, Hh - .38, .05]), w: 1.2 });
  [-1.2, 1.2].forEach(x => parts.push({ geo: placed(new S.TorusGeometry(.13, .03, 10, 32), [x, Hh + .02, 0], [0, Math.PI / 2, 0]), w: 3 }));
  let day = 0;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const x = x0 + c * (cw + gap), y = Hh - .9 - r * (ch + gap) - ch / 2;
    [[-1, -1, 1, -1], [1, -1, 1, 1], [1, 1, -1, 1], [-1, 1, -1, -1]].forEach(([a, b, c2, d]) =>
      parts.push({ geo: tubeBetween([x + a * cw / 2, y + b * ch / 2, .05], [x + c2 * cw / 2, y + d * ch / 2, .05], .008), w: 60 }));
    if (c < 5) { const order = day++ / 24; for (let i = 0; i < 380; i++) { seq.pos.push(V(x + (R() - .5) * (cw - .1), y + (R() - .5) * (ch - .1), .07)); seq.kind.push(50 + Math.round(order * 200)); } }
  }
  return normalize(concat(sample(parts, N - seq.pos.length), seq), 5.1);
}

// ---------- output ----------
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = (R() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; }
function write(name, set) {
  const order = shuffle(set.pos.map((p, i) => i)).slice(0, N);
  const box = new THREE.Box3().setFromPoints(set.pos), size = box.getSize(V(0, 0, 0));
  const buf = Buffer.alloc(4 + 4 + 24 + N * 4);
  buf.write('SND1', 0); buf.writeUInt32LE(N, 4);
  [box.min.x, box.min.y, box.min.z, size.x, size.y, size.z].forEach((v, i) => buf.writeFloatLE(v, 8 + i * 4));
  order.forEach((src, i) => {
    const p = set.pos[src];
    buf[32 + i * 3] = Math.round((p.x - box.min.x) / size.x * 255);
    buf[32 + i * 3 + 1] = Math.round((p.y - box.min.y) / size.y * 255);
    buf[32 + i * 3 + 2] = Math.round((p.z - box.min.z) / (size.z || 1) * 255);
    buf[32 + N * 3 + i] = set.kind[src];
  });
  const gz = zlib.gzipSync(buf, { level: 9 });
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(`${OUT}/${name}.sand`, gz);
  console.log(name.padEnd(9), `${(gz.length / 1024).toFixed(0)} KB`, 'size', size.toArray().map(v => v.toFixed(2)).join(' × '));
}

write('truck', await truck());
write('scooter', await scooter());
write('laptop', laptop());
write('calendar', calendar());
