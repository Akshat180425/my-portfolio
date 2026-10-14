import { esc, arrow } from './ui.mjs';
import { poemPath } from '../data/poems.mjs';
import { collectionPath, fragmentPath } from '../data/fragments.mjs';

export function poemCard(poem) {
  return `<article class="poem-card" data-entry="${esc(poem.slug)}"><a class="poem-card-link" href="${poemPath(poem)}" aria-labelledby="title-${poem.slug} read-${poem.slug}"><p class="eyebrow">Poetry · ${esc(poem.language)}</p><h3 id="title-${poem.slug}">${esc(poem.title)}</h3><p class="poem-excerpt" lang="${poem.excerptLang || poem.lang}">${poem.excerpt.map(esc).join('<br>')}</p><span class="poem-card-bottom"><span id="read-${poem.slug}">Read poem</span>${arrow}</span></a></article>`;
}

export function fragmentCard(fragment, { preview = false } = {}) {
  return `<article class="fragment-card" id="${esc(fragment.slug)}" data-entry="${esc(fragment.slug)}"><blockquote id="${esc(fragment.slug)}-text">${esc(fragment.text)}</blockquote>${preview ? `<footer><span>Akshat Bawa</span><a class="text-link" href="${fragmentPath(fragment)}">In the margins ${arrow}</a></footer>` : `<a class="fragment-permalink" href="${fragmentPath(fragment)}" aria-label="Link to this piece" aria-describedby="${esc(fragment.slug)}-text">§</a>`}</article>`;
}

export function pagination(kind, page, count) {
  if (count < 2) return '';
  const visible = [...new Set([1, page - 1, page, page + 1, count])].filter(p => p > 0 && p <= count).sort((a, b) => a - b);
  return `${page > 1 ? `<a href="${collectionPath(kind, page - 1)}" data-page="${page - 1}" rel="prev">← <span>Previous</span></a>` : ''}<span class="page-numbers">${visible.map((p, i) => `${i && p - visible[i - 1] > 1 ? '<span class="pagination-gap">…</span>' : ''}<a href="${collectionPath(kind, p)}" data-page="${p}" aria-label="Page ${p}" ${p === page ? 'aria-current="page"' : ''}>${p}</a>`).join('')}</span>${page < count ? `<a href="${collectionPath(kind, page + 1)}" data-page="${page + 1}" rel="next"><span>Next</span> →</a>` : ''}`;
}
