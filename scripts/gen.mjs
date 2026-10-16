// Writes /index.html and /fr/index.html from src/content.js.
import fs from 'fs';
import { content, person, skillTiers } from '../src/content.js';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const write = (path, html) => { const dir = path.replace(/[^/]+$/, ''); if (dir) fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(path, html); };

// which projects (chapters and index rows) used a skill: stack match by prefix, plus explicit extras
function projectsFor(skill, c) {
  const key = (skill.match || skill.name).toLowerCase(), ids = new Set(skill.extra || []);
  for (const p of [...c.projects, ...c.more]) if (p.stack.some(s => s.toLowerCase().startsWith(key))) ids.add(p.id);
  return [...ids];
}

function page(c) {
  const hasPosts = c.posts.length > 0;
  const chapter = (p, i) => `
  <section class="project" id="${p.id}" data-id="${p.id}">
    <div class="stage" data-figure="${p.figure}" aria-hidden="true"></div>
    <div class="copy">
      <p class="meta"><span class="num">0${i + 1}</span>${esc(p.org)} · ${esc(p.years)}</p>
      <h2 class="kinetic">${esc(p.title)}</h2>
      <p class="lede">${esc(p.lede)}</p>
      <ul class="points">${p.points.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      <ul class="stack" aria-label="Stack">${p.stack.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      <a class="btn" href="#contact" data-ask="${esc(p.title)}">${esc(c.ask)}</a>
    </div>
  </section>`;

  const service = s => `
        <li class="engagement">
          <span class="n">${s.n}</span>
          <div class="eng-head"><h3>${esc(s.title)}</h3><span class="eng-meta">${esc(s.meta)}</span></div>
          <ul class="quotes">${s.quotes.map(q => `<li>“${esc(q)}”</li>`).join('')}</ul>
          <p>${esc(s.text)}</p>
        </li>`;

  const row = m => `
        <li data-id="${m.id}">
          <details>
            <summary><span class="t">${esc(m.title)}</span><span class="w">${esc(m.what)}</span><span class="y">${esc(m.year)}</span><span class="plus" aria-hidden="true"></span></summary>
            <dl class="case">
              <div><dt>${c.labels.problem}</dt><dd>${esc(m.problem)}</dd></div>
              <div><dt>${c.labels.did}</dt><dd>${esc(m.did)}</dd></div>
              <div><dt>${c.labels.result}</dt><dd>${esc(m.result)}</dd></div>
            </dl>
            <ul class="stack small">${m.stack.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
          </details>
        </li>`;

  const tier = t => `
          <div class="tier"><h3>${c.tierNames[t.key]}</h3><p>${t.skills.map(s => { const ids = projectsFor(s, c); return ids.length ? `<button type="button" class="skill" data-projects="${ids.join(' ')}">${esc(s.name)}</button>` : `<span class="skill">${esc(s.name)}</span>`; }).join('')}</p></div>`;

  return `<!doctype html>
<html lang="${c.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(c.title)}</title>
<meta name="description" content="${esc(c.description)}">
<meta name="theme-color" content="#04060a">
<meta property="og:title" content="${esc(c.title)}">
<meta property="og:description" content="${esc(c.description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${person.site}${c.home}">
<link rel="canonical" href="${person.site}${c.home}">
<link rel="alternate" hreflang="${c.lang}" href="${person.site}${c.home}">
<link rel="alternate" hreflang="${c.other}" href="${person.site}${c.otherHome}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Ccircle cx='8' cy='8' r='5' fill='%23a8ecff'/%3E%3C/svg%3E">
<link rel="preload" href="/fonts/ClashGrotesk-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/Switzer-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/src/style.css">
<script type="module" src="/src/main.js"></script>
</head>
<body data-lang="${c.lang}" data-ask-msg="${esc(c.askMsg)}" data-sent="${esc(c.contact.sent)}" data-cv-busy="${esc(c.cta.cvBusy)}" data-cv-fallback="${esc(c.cta.cvFallback)}" data-copied="${esc(c.contact.copied)}">
<canvas id="sand" aria-hidden="true"></canvas>
<header class="top">
  <a class="brand" href="${c.home}">${esc(person.name)}</a>
  <nav aria-label="Main">
    <a href="#work">${c.nav.work}</a>
    <a href="#services">${c.nav.services}</a>${hasPosts ? `\n    <a href="#writing">${c.nav.writing}</a>` : ''}
  </nav>
  <a class="lang" href="${c.otherHome}" hreflang="${c.other}" lang="${c.other}">${c.other.toUpperCase()}</a>
  <a class="btn small solid" href="#contact">${c.nav.contact}</a>
</header>

<main>
  <section class="hero" id="top">
    <h1 class="sr">${esc(person.name)}, full-stack engineer</h1>
    <div class="stage hero-stage" aria-hidden="true"></div>
    <div class="intro">
      <p class="lede">${c.lede}</p>
      <dl class="facts">${c.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
    </div>
    <div class="actions">
      <a class="btn solid" href="#contact">${c.cta.talk}</a>
      <button type="button" class="btn" data-cv="${c.lang}">${c.cta.cv}</button>
    </div>
  </section>

  <div id="work">${c.projects.map(chapter).join('')}
  </div>

  <div class="rest" data-dune>
    <section class="block" id="services">
      <header class="block-head"><h2 class="kinetic">${esc(c.services.title)}</h2><p>${esc(c.services.lede)}</p></header>
      <ol class="engagements">${c.services.items.map(service).join('')}
      </ol>
    </section>

    <section class="block" id="more">
      <header class="block-head"><h2 class="kinetic">${esc(c.moreTitle)}</h2></header>
      <ol class="index">${c.more.map(row).join('')}
      </ol>
    </section>

    <section class="block two-col" id="about">
      <div>
        <h2 class="kinetic">${esc(c.expTitle)}</h2>
        <ol class="timeline">${c.experience.map(x => `
          <li data-id="${x.id}"><span class="yr">${esc(x.years)}</span><div><h3>${esc(x.role)}</h3><p class="org">${esc(x.org)}</p><p>${esc(x.text)}</p></div></li>`).join('')}
        </ol>
      </div>
      <div>
        <h2 class="kinetic">${esc(c.skillsTitle)}</h2>
        <p class="hint">${esc(c.skillsHint)}</p>
        <div class="tiers">${skillTiers.map(tier).join('')}
        </div>
      </div>
    </section>
${hasPosts ? `
    <section class="block" id="writing">
      <header class="block-head"><h2 class="kinetic">${esc(c.writingTitle)}</h2></header>
      <ol class="posts">${c.posts.map(p => `<li><a href="${esc(p.url)}"><span class="t">${esc(p.title)}</span><span class="y">${esc(p.date)} · ${p.minutes} min</span></a></li>`).join('')}</ol>
    </section>
` : ''}
    <section class="cta" id="contact">
      <h2 class="kinetic big">${esc(c.contact.title)}</h2>
      <div class="cta-line">
        <a class="mail" href="mailto:${person.email}">${person.email}</a>
        <button type="button" class="btn small" data-copy="${person.email}">${c.contact.copy}</button>
      </div>
      <p class="status"><span class="dot"></span>${c.contact.available} · <time id="clock">--:--</time> ${c.contact.local} · ${c.contact.reply}</p>
      <form id="form">
        <label><span>${c.contact.name}</span><input name="name" autocomplete="name" required></label>
        <label><span>${c.contact.email}</span><input name="email" type="email" autocomplete="email" required></label>
        <label><span>${c.contact.about}</span><select name="type">${c.contact.options.map(([v, t]) => `<option value="${v}">${esc(t)}</option>`).join('')}</select></label>
        <label class="full"><span>${c.contact.message}</span><textarea name="message" rows="4" required></textarea></label>
        <div class="form-foot"><small id="form-status"></small><button class="btn solid" type="submit">${c.contact.send}</button></div>
      </form>
      <p class="links"><a href="${person.linkedin}">LinkedIn</a><a href="${person.github}">GitHub</a></p>
    </section>
  </div>
</main>

<footer>
  <span>© 2026 ${esc(person.name)}</span>
  <span class="credits">${esc(c.credits)}</span>
</footer>
</body>
</html>
`;
}

write('index.html', page(content.en));
write('fr/index.html', page(content.fr));
console.log('generated / and /fr/');
