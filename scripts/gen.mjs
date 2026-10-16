// Writes /index.html and /fr/index.html from src/content.js.
import fs from 'fs';
import { content, person, skillTiers, caseStudies } from '../src/content.js';

// a case study marked draft: true is only built with DRAFTS=1 (local preview)
const DRAFTS = process.env.DRAFTS === '1';
// GoatCounter: cookie-free visit counts (dashboard at ulring.goatcounter.com)
const ANALYTICS = '<script data-goatcounter="https://ulring.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>';
const cases = caseStudies.filter(k => DRAFTS || !k.draft);
const OG = `${person.site}/og.jpg`;
const ogTags = `<meta property="og:image" content="${OG}">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n<meta property="og:image:type" content="image/jpeg">\n<meta property="og:image:alt" content="Anass Soulimani, full-stack engineer">\n<meta property="og:site_name" content="Anass Soulimani">\n<meta name="twitter:card" content="summary_large_image">`;

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
      <p class="chapter-actions">${cases.some(k => k.id === p.id) ? `<a class="btn solid" href="/work/${p.id}/">${esc(c.caseLabel)}</a>` : ''}<a class="btn" href="#contact" data-ask="${esc(p.title)}">${esc(c.ask)}</a></p>
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
${ogTags}
<link rel="alternate" hreflang="${c.lang}" href="${person.site}${c.home}">
<link rel="alternate" hreflang="${c.other}" href="${person.site}${c.otherHome}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Ccircle cx='8' cy='8' r='5' fill='%23a8ecff'/%3E%3C/svg%3E">
<link rel="preload" href="/fonts/ClashGrotesk-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/Switzer-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/src/style.css">
<script type="module" src="/src/main.js"></script>
${ANALYTICS}
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
      <div class="how">
        <h3 class="how-title">${esc(c.howIWork.title)}</h3>
        <ol class="steps">${c.howIWork.steps.map(([t, m, d], i) => `<li><span class="n">${i + 1}</span><h4>${esc(t)}</h4><span class="eng-meta">${esc(m)}</span><p>${esc(d)}</p></li>`).join('')}</ol>
        <p class="needs">${esc(c.howIWork.needs)}</p>
      </div>
    </section>
${c.testimonials.length ? `
    <section class="block" id="testimonials">
      <header class="block-head"><h2 class="kinetic">${esc(c.testimonialsTitle)}</h2></header>
      <ul class="quotes-big">${c.testimonials.map(t => `<li><p class="said">${esc(t.text)}</p><p class="who">${esc(t.who)}</p></li>`).join('')}</ul>
    </section>
` : ''}

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
      <ol class="posts">${c.posts.map(p => `
        <li><a href="/blog/${p.slug}/"><span class="t">${esc(p.title)}</span><span class="s">${esc(p.summary)}</span><span class="y">${fmtDate(p.date, c.lang)} · ${minutes(p.slug)} ${c.readLabel}${p.note ? ` · ${p.note}` : ''}</span></a></li>`).join('')}
      </ol>
      <p class="more-links"><a href="/links/">${esc(c.linksLabel)} →</a></p>
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
  <a href="/links/">${esc(c.linksLabel)}</a>
  <span class="credits">${esc(c.credits)}</span>
</footer>
</body>
</html>
`;
}

// ---------- shared bits for the sub-pages (blog posts, links); English only ----------
const postBody = slug => fs.readFileSync(`content/posts/${slug}.html`, 'utf8');
function minutes(slug) { return Math.max(1, Math.round(postBody(slug).replace(/<[^>]+>/g, ' ').split(/\s+/).length / 220)); }
function fmtDate(d, lang) { return new Date(d + 'T12:00:00Z').toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }); }

function subPage(c, { title, description, path, type = 'website', css, js, main }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#04060a">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="${type}">
<meta property="og:url" content="${person.site}${path}">
<link rel="canonical" href="${person.site}${path}">
${ogTags}
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Ccircle cx='8' cy='8' r='5' fill='%23a8ecff'/%3E%3C/svg%3E">
<link rel="preload" href="/fonts/ClashGrotesk-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/Switzer-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/src/style.css">
<link rel="stylesheet" href="/src/${css}">${js ? `\n<script type="module" src="/src/${js}"></script>` : ''}
${ANALYTICS}
</head>
<body class="sub">
<header class="top">
  <a class="brand" href="/">${esc(person.name)}</a>
  <nav aria-label="Main">
    <a href="/#work">${c.nav.work}</a>
    <a href="/#services">${c.nav.services}</a>
    <a href="/#writing">${c.nav.writing}</a>
  </nav>
  <a class="btn small solid" href="/#contact">${c.nav.contact}</a>
</header>
<main class="sub-main">
${main}
</main>
<footer>
  <span>© 2026 ${esc(person.name)}</span>
  <a href="/links/">${esc(c.linksLabel)}</a>
</footer>
</body>
</html>
`;
}

function postPage(c, p) {
  // the old "kicker" line (an uppercase eyebrow label) becomes a plain meta line
  const body = postBody(p.slug).replace(/<div class="kicker">[\s\S]*?<\/div>\s*/, '');
  return subPage(c, {
    title: `${p.title} · ${person.name}`, description: p.summary, path: `/blog/${p.slug}/`, type: 'article', css: 'post.css',
    main: `  <a class="back" href="/#writing">← ${esc(c.allWriting)}</a>
  <article class="post">
    <p class="post-meta">${fmtDate(p.date, 'en')} · ${esc(p.topics)} · ${minutes(p.slug)} ${c.readLabel}</p>
    ${body}
  </article>`,
  });
}

function casePage(c, k) {
  return subPage(c, {
    title: `${k.title}: case study · ${person.name}`, description: k.summary, path: `/work/${k.id}/`, type: 'article', css: 'post.css',
    main: `  <a class="back" href="/#${k.id}">← ${esc(k.title)}</a>
  <article class="post case-study">
    <p class="post-meta">Case study</p>
    <h1>${esc(k.title)}</h1>
    <p class="lede">${esc(k.summary)}</p>
    <dl class="case-facts">${k.facts.map(([a, b]) => `<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join('')}</dl>
    ${k.sections.map(([h, parts]) => `<h2>${esc(h)}</h2>\n    ${parts.map(x => x.startsWith('<') ? x : `<p>${x}</p>`).join('\n    ')}`).join('\n    ')}
    <p class="closing"><a href="/#contact">Questions about this project? Get in touch →</a></p>
  </article>`,
  });
}

function linksPage(c) {
  const L = c.linksPage, links = JSON.parse(fs.readFileSync('content/links.json', 'utf8'));
  const count = (key, val) => links.filter(l => key === 'tags' ? l.tags.includes(val) : l.type === val).length;
  const types = [...new Set(links.map(l => l.type).filter(Boolean))].sort((a, b) => count('type', b) - count('type', a));
  const tags = [...new Set(links.flatMap(l => l.tags))].sort((a, b) => count('tags', b) - count('tags', a));
  return subPage(c, {
    title: `${L.title} · ${person.name}`, description: L.lede, path: '/links/', css: 'links.css', js: 'links.js',
    main: `  <header class="links-head">
    <h1>${esc(L.title)}</h1>
    <p>${esc(L.lede)}</p>
  </header>
  <div class="filters" hidden>
    <input type="search" id="q" placeholder="${esc(L.search)}" aria-label="${esc(L.search)}">
    <div class="chips" data-group="type" aria-label="${esc(L.types)}"><span class="chips-label">${esc(L.types)}</span>${types.map(t => `<button type="button" data-v="${esc(t)}">${esc(t)} <i>${count('type', t)}</i></button>`).join('')}</div>
    <div class="chips" data-group="tag" aria-label="${esc(L.tags)}"><span class="chips-label">${esc(L.tags)}</span>${tags.map(t => `<button type="button" data-v="${esc(t)}">${esc(t)} <i>${count('tags', t)}</i></button>`).join('')}</div>
    <p class="count"><span id="n">${links.length}</span> / ${links.length} ${esc(L.shown)} <button type="button" id="clear" class="link-btn">${esc(L.clear)}</button></p>
  </div>
  <ol class="linklist">${links.map(l => `
    <li data-type="${esc(l.type)}" data-tags="${esc(l.tags.join('|'))}" data-text="${esc(`${l.title} ${l.desc} ${l.tags.join(' ')} ${l.type}`.toLowerCase())}"><a href="${esc(l.url)}" rel="noopener" target="_blank">${esc(l.title)}</a><p>${esc(l.desc)}</p><span>${esc([l.type, ...l.tags].filter(Boolean).join(' · '))}</span></li>`).join('')}
  </ol>`,
  });
}

write('index.html', page(content.en));
write('fr/index.html', page(content.fr));
for (const p of content.en.posts) write(`blog/${p.slug}/index.html`, postPage(content.en, p));
write('links/index.html', linksPage(content.en));
fs.rmSync('work', { recursive: true, force: true });
for (const k of cases) write(`work/${k.id}/index.html`, casePage(content.en, k));
console.log(`generated /, /fr/, /links/, ${content.en.posts.length} posts, ${cases.length} case studies`);
