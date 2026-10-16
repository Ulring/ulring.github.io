// One-time export of the old link collection (SQLite on the `database` branch) to content/links.json.
// Re-run only if the database changes: node scripts/links-export.mjs
import { DatabaseSync } from 'node:sqlite';
import fs from 'fs';
import os from 'os';
import path from 'path';

const url = 'https://raw.githubusercontent.com/Ulring/ulring.github.io/database/links.db';
const tmp = path.join(os.tmpdir(), `links-${process.pid}.db`);
fs.writeFileSync(tmp, Buffer.from(await (await fetch(url)).arrayBuffer()));
const db = new DatabaseSync(tmp, { readOnly: true });
const tags = db.prepare('SELECT tag FROM tags JOIN taggings ON taggings.tagID = tags.id WHERE taggings.linkID = ?');
const langs = db.prepare('SELECT lang FROM langs WHERE linkID = ?');
const links = db.prepare('SELECT links.id, title, url, description AS desc, types.type AS type FROM links LEFT JOIN types ON types.id = links.typeID').all()
  .map(l => ({ title: l.title.trim(), url: l.url, desc: (l.desc || '').trim(), type: l.type || '', tags: tags.all(l.id).map(t => t.tag), langs: [...new Set(langs.all(l.id).map(x => x.lang))] }))
  .sort((a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' }));
db.close(); fs.rmSync(tmp);
fs.writeFileSync('content/links.json', JSON.stringify(links, null, 1) + '\n');
console.log(`exported ${links.length} links, ${new Set(links.map(l => l.type)).size} types, ${new Set(links.flatMap(l => l.tags)).size} tags`);
