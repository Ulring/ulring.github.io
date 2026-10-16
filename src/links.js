// Search and filters for /links/. Without JS the full list still shows (the filters stay hidden).
const rows = [...document.querySelectorAll('.linklist li')];
const q = document.getElementById('q'), n = document.getElementById('n');
const picked = { type: new Set(), tag: new Set() };
document.querySelector('.filters').hidden = false;

function apply() {
  const words = q.value.toLowerCase().split(/\s+/).filter(Boolean);
  let shown = 0;
  for (const r of rows) {
    const tags = r.dataset.tags.split('|');
    const ok = words.every(w => r.dataset.text.includes(w))
      && (!picked.type.size || picked.type.has(r.dataset.type))        // types: any of the picked ones
      && [...picked.tag].every(t => tags.includes(t));                 // tags: all of the picked ones
    r.hidden = !ok; if (ok) shown++;
  }
  n.textContent = shown;
}
q.addEventListener('input', apply);
document.querySelectorAll('.chips').forEach(group => group.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  const set = picked[group.dataset.group], on = b.getAttribute('aria-pressed') !== 'true';
  b.setAttribute('aria-pressed', on); on ? set.add(b.dataset.v) : set.delete(b.dataset.v);
  apply();
}));
document.querySelectorAll('.chips button').forEach(b => b.setAttribute('aria-pressed', 'false'));
document.getElementById('clear').addEventListener('click', () => {
  q.value = ''; picked.type.clear(); picked.tag.clear();
  document.querySelectorAll('.chips button').forEach(b => b.setAttribute('aria-pressed', 'false'));
  apply();
});
