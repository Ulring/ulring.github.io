// Sand: a WebGL2 particle simulation with no dependencies.
//
// Physics runs on the GPU with transform feedback: each grain's position and velocity live in a buffer that a
// vertex shader updates every frame (ping-pong between two buffers). Targets for every figure sit in one float
// texture. Per frame:
//   - building: a near-critically-damped spring pulls each grain to its target, so it arrives without overshoot;
//     grains start bottom-up with a small random delay, and travel along a divergence-free (curl) flow, which
//     swirls them without pushing them outward;
//   - loose (between figures, and the final dune): gravity, light drag, and a sand bed to land on;
//   - the cursor brushes grains along its direction of travel; springs bring them back.
// Grains live in screen (world) space; only the targets are placed into each figure's DOM box ("stage"), read every
// frame. So between figures every grain flies straight to its new place, and nothing slides across the screen as a block.

const SIM_VS = `#version 300 es
precision highp float; precision highp int;
layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aVel;
layout(location = 2) in float aRand;
uniform highp sampler2D uT;
uniform int uBase, uTexW;
uniform float uDt, uTime, uSince, uDrop, uHmax, uRoadL, uFloor;
uniform mat4 uModel;          // places this figure's targets into its stage
uniform vec4 uBrush;          // xy position, z radius, w strength (world units)
uniform vec2 uBrushVel;
out vec3 oPos; out vec3 oVel;

vec3 A(vec3 p) {              // vector potential; its curl is a divergence-free flow
  float t = uTime * .25;
  return vec3(sin(p.y * 1.3 + t) * cos(p.z * .9 - t), sin(p.z * 1.1 - t) * cos(p.x * 1.4 + t), sin(p.x * 1.2 + t * .7) * cos(p.y));
}
vec3 curl(vec3 p) {
  const float e = .1;
  vec3 x0 = A(p - vec3(e, 0, 0)), x1 = A(p + vec3(e, 0, 0)), y0 = A(p - vec3(0, e, 0)), y1 = A(p + vec3(0, e, 0)), z0 = A(p - vec3(0, 0, e)), z1 = A(p + vec3(0, 0, e));
  return vec3((y1.z - y0.z) - (z1.y - z0.y), (z1.x - z0.x) - (x1.z - x0.z), (x1.y - x0.y) - (y1.x - y0.x)) / (2. * e);
}
void main() {
  int idx = uBase + gl_VertexID;
  vec4 T = texelFetch(uT, ivec2(idx % uTexW, idx / uTexW), 0);
  vec3 tgt = T.xyz; float kind = T.w;
  vec3 p = aPos, v = aVel, acc = vec3(0);
  bool road = kind > .5 && kind < 1.5;
  if (road) tgt.x = mod(tgt.x - uTime * 2.2 + uRoadL * .5, uRoadL) - uRoadL * .5;

  float start = uDrop + .05 + clamp(tgt.y / uHmax, 0., 1.) * .5 + aRand * .12;   // a wave that rises bottom-up
  tgt = (uModel * vec4(tgt, 1.)).xyz;
  if (kind < 254.5 && uSince > start) {
    vec3 d = tgt - p;
    bool formed = uSince > start + 1.6;
    float k = formed ? 20. : 34.;                   // building is brisk; once formed, disturbed grains drift back slowly
    acc = d * k - v * (2. * sqrt(k) * .95);
    if (formed) acc.y -= 7. * smoothstep(.25, 1., length(d));   // grains knocked well off sag like sand before returning
    acc += curl(p * .5 + aRand) * 1.3 * smoothstep(.04, 1.5, length(d));
    if (road) acc = d * 90. - v * 19.;              // road lines track their targets tightly; wrap-arounds happen where the road fades out
  } else {
    acc = vec3(0, -12., 0) + curl(p * .6) * .5 - v * .35;
  }

  vec2 dm = p.xy - uBrush.xy; float r = length(dm);
  float f = uBrush.w * (1. - smoothstep(0., uBrush.z, r));
  acc.xy += uBrushVel * f * 50. + (r > 1e-4 ? dm / r : vec2(0)) * f * 9.;
  acc.z += (aRand - .5) * f * 6.;

  v += acc * uDt; p += v * uDt;
  float bed = uFloor + aRand * .04;
  if (p.y < bed && v.y < 0.) { p.y = bed; v.y = abs(v.y) * .08; v.xz *= .8; }
  oPos = p; oVel = v;
}`;

const SIM_FS = `#version 300 es
precision mediump float; out vec4 o; void main() { o = vec4(0); }`;

const DRAW_VS = `#version 300 es
precision highp float; precision highp int;
layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aVel;
layout(location = 2) in float aRand;
uniform highp sampler2D uT;
uniform int uBase, uTexW;
uniform mat4 uMVP;
uniform float uPx, uSize, uTime, uRoadL;
out vec4 vCol;
void main() {
  int idx = uBase + gl_VertexID;
  vec4 T = texelFetch(uT, ivec2(idx % uTexW, idx / uTexW), 0); float kind = T.w;
  vec4 c = uMVP * vec4(aPos, 1.);
  gl_Position = c;
  gl_PointSize = uSize * uPx * (.55 + aRand * .9) * (14. / c.w);
  float b = 1.;
  if (kind > 49.5 && kind < 254.5) b = (kind - 50.) / 200. < fract(uTime * .07) * 1.4 ? 1.8 : .45;   // code lines, calendar days
  else if (kind > .5 && kind < 1.5) b = (1. - smoothstep(uRoadL * .22, uRoadL * .5, abs(mod(T.x - uTime * 2.2 + uRoadL * .5, uRoadL) - uRoadL * .5))) * .8;
  else if (kind > 1.5 && kind < 2.5) b = .32;                                                         // dune: dim
  b += min(length(aVel) * .08, .7);
  vec3 col = mix(vec3(.95, .97, 1.), vec3(.62, .9, 1.), aRand);
  vCol = vec4(col * min(b, 2.), (.45 + .35 * aRand) * min(b, 2.5));
}`;

const DRAW_FS = `#version 300 es
precision mediump float;
in vec4 vCol; out vec4 o;
void main() { float d = length(gl_PointCoord - .5); o = vec4(vCol.rgb, vCol.a * (1. - smoothstep(.12, .5, d))); }`;

// ---------- small matrix helpers (column-major) ----------
const mul = (a, b) => { const o = new Float32Array(16); for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) { let s = 0; for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k]; o[c * 4 + r] = s; } return o; };
const perspective = (fov, aspect, near, far) => { const f = 1 / Math.tan(fov / 2), nf = 1 / (near - far); return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]); };
function model(x, y, s, yaw, pitch) {           // translate · rotY · rotX · scale
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cx = Math.cos(pitch), sx = Math.sin(pitch);
  return new Float32Array([cy * s, 0, -sy * s, 0, sy * sx * s, cx * s, cy * sx * s, 0, sy * cx * s, -sx * s, cy * cx * s, 0, x, y, 0, 1]);
}

// ---------- figure data ----------
async function loadFigure(url, n) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: ${res.status}`);
  const raw = await new Response(res.body.pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
  const dv = new DataView(raw), total = dv.getUint32(4, true), m = [0, 1, 2, 3, 4, 5].map(i => dv.getFloat32(8 + i * 4, true));
  const q = new Uint8Array(raw, 32, total * 3), k = new Uint8Array(raw, 32 + total * 3, total);
  const out = new Float32Array(n * 4);
  for (let i = 0; i < n; i++) {                   // points are pre-shuffled, so the first n are a fair sample
    for (let a = 0; a < 3; a++) out[i * 4 + a] = m[a] + (q[i * 3 + a] + Math.random() - .5) / 255 * m[3 + a];
    out[i * 4 + 3] = k[i];
  }
  return out;
}
function nameFigure(n, narrow) {
  const c = document.createElement('canvas'), W = 1400, H = 540; c.width = W; c.height = H;
  const x = c.getContext('2d', { willReadFrequently: true });
  x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.font = `600 ${narrow ? 205 : 180}px "Clash Grotesk", "Helvetica Neue", Arial, sans-serif`;
  x.fillText('ANASS', W / 2, 165); x.fillText('SOULIMANI', W / 2, 375);
  const d = x.getImageData(0, 0, W, H).data, pts = [];
  for (let y = 0; y < H; y += 2) for (let xx = 0; xx < W; xx += 2) if (d[(y * W + xx) * 4 + 3] > 128) pts.push(xx, y);
  const out = new Float32Array(n * 4), s = 10 / W;
  for (let i = 0; i < n; i++) {
    const k = (Math.random() * pts.length / 2) | 0;
    out[i * 4] = (pts[k * 2] - W / 2) * s; out[i * 4 + 1] = (H - pts[k * 2 + 1]) * s + .25; out[i * 4 + 2] = (Math.random() - .5) * .12;
  }
  return out;
}
function duneFigure(n) {
  const out = new Float32Array(n * 4);
  for (let i = 0; i < n; i++) {
    const x = (Math.random() - .5) * 12, h = .35 * Math.exp(-x * x / 18) + .12 * Math.exp(-((x - 3.2) ** 2) / 2) + .08;
    out[i * 4] = x; out[i * 4 + 1] = h * Math.random() ** 2.2; out[i * 4 + 2] = (Math.random() - .5) * 2.4; out[i * 4 + 3] = 2;
  }
  return out;
}
function bounds(data, n) {                        // body extents (roads excluded), for fitting into a stage
  let x0 = Infinity, x1 = -Infinity, y1 = 0;
  for (let i = 0; i < n; i++) { if (data[i * 4 + 3] === 1) continue; x0 = Math.min(x0, data[i * 4]); x1 = Math.max(x1, data[i * 4]); y1 = Math.max(y1, data[i * 4 + 1]); }
  return { w: x1 - x0, cx: (x0 + x1) / 2, h: y1 };
}

// ---------- engine ----------
export async function startSand(canvas, { slots, figureUrl, mobile, lowEnd, reduce }) {
  const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: 'high-performance' });
  if (!gl) return null;

  const N = lowEnd ? 12000 : mobile ? 18000 : 40000;   // multiple of TEXW
  const TEXW = 1000, ROWS = N / TEXW, SLOTS = slots.length;
  const dune = slots.findIndex(s => s.dune);

  const compile = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
  const program = (vs, fs, varyings) => {
    const p = gl.createProgram(); gl.attachShader(p, compile(gl.VERTEX_SHADER, vs)); gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs));
    if (varyings) gl.transformFeedbackVaryings(p, varyings, gl.INTERLEAVED_ATTRIBS);
    gl.linkProgram(p); if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
    const u = {}; for (let i = 0, n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS); i < n; i++) { const name = gl.getActiveUniform(p, i).name; u[name] = gl.getUniformLocation(p, name); }
    return { p, u };
  };
  const sim = program(SIM_VS, SIM_FS, ['oPos', 'oVel']);
  const draw = program(DRAW_VS, DRAW_FS);

  // targets texture: SLOTS × N texels of (x, y, z, kind); kind 255 = not loaded yet (grains stay loose)
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  const empty = new Float32Array(N * SLOTS * 4); for (let i = 3; i < empty.length; i += 4) empty[i] = 255;
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, TEXW, ROWS * SLOTS, 0, gl.RGBA, gl.FLOAT, empty);
  const info = slots.map(() => ({ ready: false, b: { w: 1, cx: 0, h: 1 }, hmax: 1 }));
  function setFigure(slot, data) {
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, slot * ROWS, TEXW, ROWS, gl.RGBA, gl.FLOAT, data);
    const b = bounds(data, N); info[slot] = { ready: true, b, hmax: Math.max(b.h, .5) };
  }

  // state: two interleaved (pos, vel) buffers + a static random per grain
  const state0 = new Float32Array(N * 6), rand = new Float32Array(N);
  for (let i = 0; i < N; i++) { rand[i] = Math.random(); state0[i * 6] = (Math.random() - .5) * 16; state0[i * 6 + 1] = -4.6 + Math.random() * .1; state0[i * 6 + 2] = (Math.random() - .5) * 1.5; }
  const bufs = [gl.createBuffer(), gl.createBuffer()];
  for (const b of bufs) { gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, state0, gl.DYNAMIC_COPY); }
  const randBuf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, randBuf); gl.bufferData(gl.ARRAY_BUFFER, rand, gl.STATIC_DRAW);
  const vaos = bufs.map(b => {
    const vao = gl.createVertexArray(); gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 24, 0);
    gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 24, 12);
    gl.bindBuffer(gl.ARRAY_BUFFER, randBuf); gl.enableVertexAttribArray(2); gl.vertexAttribPointer(2, 1, gl.FLOAT, false, 0, 0);
    return vao;
  });
  gl.bindVertexArray(null);
  const tfs = bufs.map((_, i) => { const tf = gl.createTransformFeedback(); gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, tf); gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, bufs[1 - i]); return tf; });
  gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
  let cur = 0;

  // ---------- figures ----------
  setFigure(0, nameFigure(N, mobile));
  if (dune >= 0) setFigure(dune, duneFigure(N));
  (async () => {                                   // one at a time, in page order: on a slow line the first figure arrives first
    for (const [i, s] of slots.entries()) if (s.figure) {
      try { setFigure(i, await loadFigure(figureUrl(s.figure), N)); } catch (e) { console.warn('[sand]', e.message); }
    }
  })();

  // ---------- placement: fit a slot's figure into its stage box ----------
  const FOV = 35 * Math.PI / 180, CAMZ = 14;
  let W = 1, H = 1, k = 1, proj;
  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, mobile ? 1.5 : 1.75);
    W = innerWidth; H = innerHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    k = 2 * CAMZ * Math.tan(FOV / 2) / H;           // world units per CSS pixel on the z = 0 plane
    proj = mul(perspective(FOV, W / H, .1, 100), new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -CAMZ, 1]));
    gl.useProgram(draw.p); gl.uniform1f(draw.u.uPx, dpr);
  }
  function place(i) {
    const s = slots[i], r = s.dune ? { left: 0, top: H * .9, width: W, height: H * .1 } : s.el.getBoundingClientRect();
    const b = info[i].b, fit = (s.fit || .94) * (mobile ? .9 : 1), sc = Math.min(r.width * k * fit / b.w, r.height * k * .9 / b.h);
    return { x: (r.left + r.width / 2 - W / 2) * k - b.cx * sc, y: -(r.top + r.height - H / 2) * k + r.height * k * .04, s: sc, yaw: s.yaw || 0 };
  }

  // ---------- interaction ----------
  let everBuilt = false, slot = 0, prev = 0, since = 0, drop = 0, mx = W / 2, my = H / 2, nx = 0, ny = 0;
  let bvx = 0, bvy = 0, bstr = 0, lastPx = null;
  function show(i) {
    if (i === slot || i < 0) return;
    prev = slot; slot = i; since = reduce ? 10 : 0;
    drop = prev === 0 && !everBuilt ? 0 : .22;                  // leaving a formed figure: let it slump first
  }
  if (!mobile) addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; nx = mx / W * 2 - 1; ny = my / H * 2 - 1; }, { passive: true });

  addEventListener('resize', resize); resize();
  gl.clearColor(.016, .024, .04, 1);
  gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

  let last = performance.now(), t = 0, yaw = 0, pitch = 0, running = true;
  function frame(now) {
    if (!running) return;
    requestAnimationFrame(frame);
    if (document.hidden) { last = now; return; }
    const dt = Math.min((now - last) / 1000, 1 / 30); last = now; t += dt; since += dt;
    if (since > 2.5) everBuilt = true;

    // the current figure's targets follow its stage; grains follow their targets
    const P = place(slot), onFigure = !!slots[slot].figure;
    yaw += ((P.yaw + (onFigure ? nx * .12 : nx * .03)) - yaw) * .05;
    pitch += ((onFigure ? .1 - ny * .05 : 0) - pitch) * .05;
    const Mod = model(P.x, P.y, P.s, yaw, pitch);
    // while the old figure slumps, its grains land on the lower of the two floors (never pushed up)
    const floor = since < drop + .6 ? Math.min(P.y, place(prev).y) : P.y;

    // brush: cursor position and speed on the z = 0 plane, in world units
    const lx = (mx - W / 2) * k, ly = -(my - H / 2) * k;
    if (lastPx) { const vx = (lx - lastPx[0]) / dt, vy = (ly - lastPx[1]) / dt; bvx += (vx - bvx) * .3; bvy += (vy - bvy) * .3; }
    lastPx = [lx, ly];
    const speed = Math.hypot(bvx, bvy);
    bstr += (Math.min(speed / 6, 1) - bstr) * .2;
    const bscale = Math.min(1, 6 / Math.max(Math.hypot(bvx, bvy), 1e-3));

    // simulate
    const inf = info[slot];
    gl.useProgram(sim.p);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.uniform1i(sim.u.uT, 0); gl.uniform1i(sim.u.uTexW, TEXW); gl.uniform1i(sim.u.uBase, slot * N);
    gl.uniform1f(sim.u.uDt, dt); gl.uniform1f(sim.u.uTime, t); gl.uniform1f(sim.u.uSince, inf.ready ? since : 0);
    gl.uniform1f(sim.u.uDrop, drop); gl.uniform1f(sim.u.uHmax, inf.hmax); gl.uniform1f(sim.u.uRoadL, 14); gl.uniform1f(sim.u.uFloor, floor);
    gl.uniformMatrix4fv(sim.u.uModel, false, Mod);
    gl.uniform4f(sim.u.uBrush, lx, ly, 1.25, mobile ? 0 : bstr);
    gl.uniform2f(sim.u.uBrushVel, bvx * bscale * .1, bvy * bscale * .1);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);           // a state buffer must not stay bound elsewhere while feedback writes it
    gl.bindVertexArray(vaos[cur]);
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, tfs[cur]);
    gl.enable(gl.RASTERIZER_DISCARD);
    gl.beginTransformFeedback(gl.POINTS); gl.drawArrays(gl.POINTS, 0, N); gl.endTransformFeedback();
    gl.disable(gl.RASTERIZER_DISCARD);
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
    cur = 1 - cur;

    // draw
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(draw.p);
    gl.uniform1i(draw.u.uT, 0); gl.uniform1i(draw.u.uTexW, TEXW); gl.uniform1i(draw.u.uBase, slot * N);
    gl.uniformMatrix4fv(draw.u.uMVP, false, proj);
    gl.uniform1f(draw.u.uSize, mobile ? 2.4 : 2.1); gl.uniform1f(draw.u.uTime, t); gl.uniform1f(draw.u.uRoadL, 14);
    gl.bindVertexArray(vaos[cur]);
    gl.drawArrays(gl.POINTS, 0, N);
    gl.bindVertexArray(null);
  }
  requestAnimationFrame(frame);

  return { show, N, stop() { running = false; } };
}
