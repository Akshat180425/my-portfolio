import { poems, poemPath } from '../data/poems.mjs';
import { esc, arrow } from '../components/ui.mjs';

export default function poemPage(poem) {
  const next = poems[(poems.indexOf(poem) + 1) % poems.length];
  const verse = `<div class="poem-verses" lang="${poem.lang}">${poem.stanzas.map(stanza => `<p class="poem-stanza${stanza.coda ? ' poem-coda' : ''}"${stanza.lang ? ` lang="${stanza.lang}"` : ''}>${stanza.lines.map(line => `<span class="poem-line">${esc(line)}</span>`).join('\n')}</p>`).join('')}</div>`;

  return `<div class="poem-wrap wrap"><a class="poem-back text-link" href="/marginalia/poems/"><span aria-hidden="true">←</span> All poems</a><article class="poem-reading" aria-labelledby="poem-title"><header class="poem-heading"><p class="eyebrow">Marginalia <span aria-hidden="true">/</span> Poetry <span aria-hidden="true">/</span> ${esc(poem.language)}</p><h1 id="poem-title">${esc(poem.title)}</h1><p class="poem-byline">By Akshat Bawa</p></header>${verse}<footer class="poem-colophon"><span class="poem-endmark" aria-hidden="true">✦</span><a class="text-link" href="${esc(poem.pdf)}" download="${esc(poem.title)} — Akshat Bawa.pdf">Download original PDF <span aria-hidden="true">↓</span></a></footer></article><nav class="poem-navigation" aria-label="More writing"><a class="text-link" href="/marginalia/">Back to Marginalia ${arrow}</a>${next !== poem ? `<a class="next-poem" href="${poemPath(next)}"><span class="eyebrow">Another poem · ${esc(next.language)}</span><span class="next-poem-title">${esc(next.title)} ${arrow}</span></a>` : ''}</nav></div>`;
}
