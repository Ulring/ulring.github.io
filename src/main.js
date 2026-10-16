const mobile = matchMedia('(max-width: 860px)').matches;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const hover = matchMedia('(hover: hover)').matches;
const lowEnd = (navigator.deviceMemory && navigator.deviceMemory <= 2) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4 && mobile);
const saveData = navigator.connection && navigator.connection.saveData;
const body = document.body.dataset;

// ---------- entrance animations ----------
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll('.copy > *, .intro > *, .actions, .block-head, .engagement, .index > li, .timeline li, .tier, .cta > *').forEach(el => { el.classList.add('reveal'); io.observe(el); });

// ---------- kinetic headings: letter weight follows the cursor ----------
const kinetic = [...document.querySelectorAll('.kinetic')];
for (const h of kinetic) {
  h.setAttribute('aria-label', h.textContent);
  h.innerHTML = h.textContent.split(' ').map(w => `<span class="wd" aria-hidden="true">${[...w].map(ch => `<span class="ch">${ch}</span>`).join('')}</span>`).join(' ');
}
if (hover && !reduce) {
  let px = -1e4, py = -1e4, queued = false;
  const visible = new Set();
  const vio = new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
  kinetic.forEach(h => vio.observe(h));
  const update = () => {
    queued = false;
    for (const h of visible) for (const ch of h.querySelectorAll('.ch')) {
      const r = ch.getBoundingClientRect(), d = Math.hypot(r.left + r.width / 2 - px, r.top + r.height / 2 - py);
      ch.style.setProperty('--w', Math.round(600 - 380 * Math.max(0, 1 - d / 220)));
    }
  };
  addEventListener('pointermove', e => { px = e.clientX; py = e.clientY; if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
}

// ---------- skills: show which projects used a skill ----------
const targets = id => document.querySelectorAll(`[data-id="${id}"]`);
function light(btn, on) {
  for (const id of btn.dataset.projects.split(' ')) targets(id).forEach(el => el.classList.toggle('lit', on));
}
document.querySelectorAll('button.skill').forEach(b => {
  if (hover) { b.addEventListener('mouseenter', () => light(b, true)); b.addEventListener('mouseleave', () => { if (!b.classList.contains('on')) light(b, false); }); }
  b.addEventListener('click', () => {                       // touch and keyboard: toggle the highlight
    const on = !b.classList.contains('on');
    document.querySelectorAll('button.skill.on').forEach(o => { o.classList.remove('on'); light(o, false); });
    if (on) { b.classList.add('on'); light(b, true); }
  });
});

// ---------- contact ----------
const form = document.getElementById('form');
function prefill(type, message) {
  form.type.value = type; form.message.value = message;
  document.getElementById('contact').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  setTimeout(() => form.name.focus({ preventScroll: true }), 700);
}
document.querySelectorAll('[data-ask]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); prefill('question', body.askMsg + b.dataset.ask + '.\n\n'); }));

const WEB3FORMS_KEY = '';   // free key from web3forms.com; empty = open the visitor's mail app instead
form.addEventListener('submit', async e => {
  e.preventDefault();
  const f = Object.fromEntries(new FormData(form)), status = document.getElementById('form-status');
  if (!WEB3FORMS_KEY) {
    const text = `${f.message}\n\n— ${f.name} (${f.email})`;
    location.href = `mailto:anasssoulimani@gmail.com?subject=${encodeURIComponent(`[${f.type}] ${f.name}`)}&body=${encodeURIComponent(text)}`;
    return;
  }
  const r = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: `[${f.type}] ${f.name}`, ...f }) }).catch(() => null);
  if (r && r.ok) { form.reset(); status.textContent = body.sent; }
  else location.href = 'mailto:anasssoulimani@gmail.com';
});

document.querySelectorAll('[data-copy]').forEach(b => b.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(b.dataset.copy); const t = b.textContent; b.textContent = body.copied; setTimeout(() => { b.textContent = t; }, 1600); }
  catch { location.href = `mailto:${b.dataset.copy}`; }
}));

// live time in Morocco. Morocco has been on permanent GMT since 20 Sep 2026; many browsers still ship older
// time-zone data that says GMT+1, so the offset is fixed here instead of trusting Intl's 'Africa/Casablanca'.
const MOROCCO_UTC_OFFSET = 0;
const clock = document.getElementById('clock');
if (clock) {
  const fmt = new Intl.DateTimeFormat(body.lang === 'fr' ? 'fr-FR' : 'en-GB', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' });
  const tick = () => { clock.textContent = `${fmt.format(new Date(Date.now() + MOROCCO_UTC_OFFSET * 3600e3))} GMT${MOROCCO_UTC_OFFSET ? `+${MOROCCO_UTC_OFFSET}` : ''}`; };
  tick(); setInterval(tick, 20000);
}

// ---------- CV: no public link; the PDF is stored scrambled and only assembled when someone asks for it ----------
const CV_KEY = new TextEncoder().encode('sand-and-spring');
document.querySelectorAll('[data-cv]').forEach(b => b.addEventListener('click', async () => {
  const label = b.textContent; b.textContent = body.cvBusy; b.disabled = true;
  try {
    const res = await fetch(`/d/cv-${b.dataset.cv}.bin`);
    if (!res.ok) throw new Error(res.status);
    const bytes = new Uint8Array(await res.arrayBuffer());
    for (let i = 0; i < bytes.length; i++) bytes[i] ^= CV_KEY[i % CV_KEY.length];
    const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
    const a = Object.assign(document.createElement('a'), { href: url, download: `Anass-Soulimani-CV-${b.dataset.cv.toUpperCase()}.pdf` });
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  } catch {
    prefill('job', body.cvFallback + '\n\n');
  } finally { b.textContent = label; b.disabled = false; }
}));

// ---------- sand ----------
const canvas = document.getElementById('sand');
// per figure: fraction of the stage width it may use (rotation makes it look wider) and its turn
const FIT = { truck: { fit: .8, yaw: -.32 }, scooter: { fit: .8, yaw: -.32 }, laptop: { fit: .62, yaw: -.36 }, calendar: { fit: .74, yaw: -.22 } };
const slots = [
  { el: document.querySelector('.hero-stage') },
  ...[...document.querySelectorAll('.project .stage')].map(el => ({ el, figure: el.dataset.figure, ...FIT[el.dataset.figure] })),
  { dune: true },
];
const sections = [document.querySelector('.hero'), ...document.querySelectorAll('.project'), document.querySelector('[data-dune]')];

// the next figure starts assembling as soon as its section reaches the lower third of the screen,
// so it is already built when the reader gets there
function activeSlot() {
  const line = innerHeight * (mobile ? .75 : .68);
  let a = 0;
  sections.forEach((s, i) => { if (s.getBoundingClientRect().top < line) a = i; });
  return a;
}

async function start() {
  if (saveData || !('DecompressionStream' in window)) return;
  try { await document.fonts.load('600 100px "Clash Grotesk"'); } catch {}
  const { startSand } = await import('./sand.js');
  const sand = await startSand(canvas, { slots, mobile, lowEnd, reduce, figureUrl: f => `/fig/${f}.sand` }).catch(e => { console.warn('[sand]', e); return null; });
  if (!sand) { canvas.remove(); return; }
  let queued = false;
  const sync = () => { queued = false; sand.show(activeSlot()); };
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(sync); } }, { passive: true });
  sync();
}
(window.requestIdleCallback || (f => setTimeout(f, 200)))(start, { timeout: 1200 });
