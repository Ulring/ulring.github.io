// Writes /index.html, /fr/index.html, /cv/index.html and /cv/fr/index.html from src/content.js.
import fs from 'fs';
import { content, person } from '../src/content.js';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const write = (path, html) => { const dir = path.replace(/[^/]+$/, ''); if (dir) fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(path, html); };

const head = (c, { title, description, path, alt }) => `<!doctype html>
<html lang="${c.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#04060a">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${person.site}${path}">
<link rel="canonical" href="${person.site}${path}">
<link rel="alternate" hreflang="${c.lang}" href="${person.site}${path}">
<link rel="alternate" hreflang="${c.other}" href="${person.site}${alt}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Ccircle cx='8' cy='8' r='5' fill='%23a8ecff'/%3E%3C/svg%3E">
<link rel="preload" href="/fonts/ClashGrotesk-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/Switzer-Variable.woff2" as="font" type="font/woff2" crossorigin>`;

function home(c) {
  const project = (p, i) => `
  <section class="project" id="${p.id}">
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

  return `${head(c, { title: c.title, description: c.description, path: c.home, alt: c.otherHome })}
<link rel="stylesheet" href="/src/style.css">
<script type="module" src="/src/main.js"></script>
</head>
<body data-ask-msg="${esc(c.askMsg)}" data-sent="${esc(c.contact.sent)}">
<canvas id="sand" aria-hidden="true"></canvas>
<header class="top">
  <a class="brand" href="${c.home}">${esc(person.name)}</a>
  <nav aria-label="Main">
    <a href="#work">${c.nav.work}</a>
    <a href="#services">${c.nav.services}</a>
    <a href="${c.cv}">${c.nav.cv}</a>
  </nav>
  <a class="lang" href="${c.otherHome}" hreflang="${c.other}" lang="${c.other}">${c.other.toUpperCase()}</a>
  <a class="btn small solid" href="#contact">${c.nav.contact}</a>
</header>

<main>
  <section class="hero" id="top">
    <h1 class="sr">${esc(person.name)}, ${esc(c.cvPage.role)}</h1>
    <div class="stage hero-stage" aria-hidden="true"></div>
    <div class="intro">
      <p class="lede">${c.lede}</p>
      <dl class="facts">${c.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
    </div>
    <div class="actions">
      <a class="btn solid" href="#contact">${c.cta.talk}</a>
      <a class="btn" href="${c.cv}">${c.cta.cv}</a>
    </div>
  </section>

  <div id="work">${c.projects.map(project).join('')}
  </div>

  <div class="rest" data-dune>
    <section class="panel" id="services">
      <h2 class="kinetic">${esc(c.services.title)}</h2>
      <p class="lede">${esc(c.services.lede)}</p>
      <div class="services">${c.services.items.map(([t, d]) => `<div><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div>
    </section>

    <section class="panel">
      <h2 class="kinetic">${esc(c.moreTitle)}</h2>
      <div class="more">${c.more.map(m => `
        <article><h3>${esc(m.title)}${m.tag ? ` <span class="tag">${esc(m.tag)}</span>` : ''}</h3><span class="when">${esc(m.when)}</span><p>${esc(m.text)}</p></article>`).join('')}
      </div>
    </section>

    <div class="two">
      <section class="panel">
        <h2 class="kinetic">${esc(c.expTitle)}</h2>
        <div class="timeline">${c.experience.map(x => `
          <div class="role"><h3>${esc(x.role)}</h3><span>${esc(x.org)} · ${esc(x.when)}</span><ul>${x.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul></div>`).join('')}
        </div>
      </section>
      <section class="panel">
        <h2 class="kinetic">${esc(c.skillsTitle)}</h2>
        <dl class="skills">${c.skills.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
      </section>
    </div>

    <section class="panel" id="contact">
      <h2 class="kinetic">${esc(c.contact.title)}</h2>
      <p class="lede">${esc(c.contact.lede)}</p>
      <form id="form">
        <label><span>${c.contact.name}</span><input name="name" autocomplete="name" required></label>
        <label><span>${c.contact.email}</span><input name="email" type="email" autocomplete="email" required></label>
        <label><span>${c.contact.company}</span><input name="company" autocomplete="organization"></label>
        <label><span>${c.contact.about}</span><select name="type">${c.contact.options.map(([v, t]) => `<option value="${v}">${esc(t)}</option>`).join('')}</select></label>
        <label class="full"><span>${c.contact.message}</span><textarea name="message" required></textarea></label>
        <div class="form-foot"><small id="form-status">${c.contact.note}</small><button class="btn solid" type="submit">${c.contact.send}</button></div>
      </form>
      <p class="direct"><a href="mailto:${person.email}">${person.email}</a><a href="${person.linkedin}">LinkedIn</a><a href="${person.github}">GitHub</a><a href="${c.cv}">${c.nav.cv}</a></p>
    </section>
  </div>
</main>

<footer>
  <span>© 2026 ${esc(person.name)}</span>
  <span class="hint">${esc(c.hint)}</span>
  <span class="credits">${esc(c.credits)}</span>
</footer>
</body>
</html>
`;
}

function cv(c) {
  const p = c.cvPage;
  return `${head(c, { title: p.title, description: c.description, path: c.cv, alt: c.lang === 'en' ? '/cv/fr/' : '/cv/' })}
<link rel="stylesheet" href="/src/cv.css">
</head>
<body>
<nav class="cv-bar" aria-label="CV">
  <a class="brand" href="${c.home}">${esc(person.name)}</a>
  <span>
    <a href="${c.lang === 'en' ? '/cv/fr/' : '/cv/'}" hreflang="${c.other}">${p.other}</a>
    <a class="pdf" href="/cv-${c.lang}.pdf" download>${p.pdf}</a>
  </span>
</nav>
<main class="cv">
  <header>
    <h1>${esc(person.name)}</h1>
    <p class="role">${esc(p.role)}</p>
    <p class="contact"><a href="mailto:${person.email}">${person.email}</a> · <a href="${person.linkedin}">linkedin.com/in/anasssoulimani</a> · <a href="${person.github}">github.com/Ulring</a> · <a href="${person.site}">ulring.github.io</a></p>
  </header>
  <p class="profile">${esc(p.profile)}</p>

  <h2>${esc(c.expTitle)}</h2>
  ${c.experience.map(x => `<section class="item"><div class="row"><h3>${esc(x.role)}, ${esc(x.org)}</h3><span>${esc(x.when)}</span></div><p class="where">${esc(x.where)}</p><ul>${x.points.map(q => `<li>${esc(q)}</li>`).join('')}</ul></section>`).join('\n  ')}

  <h2>${esc(p.projectsTitle)}</h2>
  ${c.projects.map(x => `<section class="item"><div class="row"><h3>${esc(x.title)}</h3><span>${esc(x.org)} · ${esc(x.years)}</span></div><p>${esc(x.lede)}</p><p class="stack">${x.stack.map(esc).join(' · ')}</p></section>`).join('\n  ')}

  <h2>${esc(c.skillsTitle)}</h2>
  <dl class="skills">${[...c.skills, [c.languagesTitle, c.languages]].map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>

  <h2>${esc(c.eduTitle)}</h2>
  ${c.education.map(([d, s, w]) => `<div class="row edu"><span><strong>${esc(d)}</strong>, ${esc(s)}</span><span>${esc(w)}</span></div>`).join('\n  ')}

</main>
</body>
</html>
`;
}

write('index.html', home(content.en));
write('fr/index.html', home(content.fr));
write('cv/index.html', cv(content.en));
write('cv/fr/index.html', cv(content.fr));
console.log('generated /, /fr/, /cv/, /cv/fr/');
