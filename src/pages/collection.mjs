import { poems } from '../data/poems.mjs';
import { fragments, collectionSize, collectionPath } from '../data/fragments.mjs';
import { esc } from '../components/ui.mjs';
import { poemCard, fragmentCard, pagination } from '../components/writing.mjs';
import { compareText } from '../utils/sort.mjs';

export const collections = {
  poems: { title: 'Poems', subtitle: 'A little of what<br><em>words can hold.</em>', description: 'Original poems in English and Hindi. Read them here, or keep their original PDFs.', entries: poems, render: poemCard, category: p => p.language, search: p => `${p.title} ${p.stanzas.map(s => s.lines.join(' ')).join(' ')}`, filterLabel: 'language' },
  fragments: { title: 'Lines that linger', subtitle: 'Some thoughts arrive<br><em>a few lines at a time.</em>', description: 'On love, becoming, and the quiet work of self-respect. Short pieces from my own margins.', entries: fragments, render: fragmentCard, category: f => f.category, search: f => `${f.title} ${f.text}`, filterLabel: 'theme' },
};

export default function collectionPage(kind, page = 1) {
  const c = collections[kind];
  const categories = [...new Set(c.entries.map(c.category))].sort(compareText);
  const items = c.entries.map(entry => ({ slug: entry.slug, category: c.category(entry), search: c.search(entry), html: c.render(entry) }));
  const start = (page - 1) * collectionSize;
  // Keep card URLs in template markup so the build prefixes deployment paths.
  const metadata = JSON.stringify(items.map(({ html, ...entry }) => entry)).replace(/</g, '\\u003c');
  return `<div class="collection-page wrap" data-collection="${kind}" data-page-size="${collectionSize}"><a class="text-link detail-back" href="/marginalia/">← Marginalia</a><header class="collection-heading"><p class="eyebrow">${esc(c.title)} / By Akshat Bawa</p><h1>${c.subtitle}</h1><p class="page-intro">${esc(c.description)}</p></header><a data-collection-home href="${collectionPath(kind)}" hidden>Collection home</a><div class="collection-tools" hidden><div class="filter-buttons" role="group" aria-label="Filter by ${c.filterLabel}">${['All', ...categories].map((category, i) => `<button type="button" data-collection-filter="${esc(category)}" aria-pressed="${i === 0}" aria-controls="collection-results">${esc(category)}</button>`).join('')}</div><label class="search-box"><span class="sr-only">Search all ${kind === 'poems' ? 'poems' : 'short pieces'}</span><input type="search" id="collection-search" placeholder="Search ${kind === 'poems' ? 'poems' : 'titles or lines'}…" autocomplete="off"></label></div><div class="collection-meta"><h2 id="collection-title" tabindex="-1">${esc(c.title)}</h2><p id="collection-status" role="status">${start + 1}–${Math.min(start + collectionSize, items.length)} of ${items.length} · Alphabetical</p></div><div id="collection-results" class="${kind === 'poems' ? 'poetry-list' : 'fragment-list'}">${items.slice(start, start + collectionSize).map(item => item.html).join('')}</div><div class="collection-empty" hidden><h3>No matching pieces.</h3><p>Try a different word or return to the full collection.</p><button class="button button-outline" type="button" data-reset-collection>Show all writing</button></div><nav class="collection-pagination" aria-label="Collection pages">${pagination(kind, page, Math.ceil(items.length / collectionSize))}</nav><template id="collection-cards">${items.map(item => item.html).join('')}</template><script id="collection-data" type="application/json">${metadata}</script><p class="collection-end">${kind === 'poems' ? 'A shorter thought, perhaps?' : 'Some things ask for more room.'} <a class="text-link" href="${collectionPath(kind === 'poems' ? 'fragments' : 'poems')}">${kind === 'poems' ? 'Lines that linger' : 'Read the poems'} ↗</a></p></div>`;
}
