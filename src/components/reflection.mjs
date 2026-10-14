import { esc, link, external } from './ui.mjs';
import { poems, poemPath } from '../data/poems.mjs';

export function reflectionPanel(reflection) {
  if (!reflection) return '';
  const context = reflection.context;
  const contextHtml = context ? `<div class="reflection-context"><h3 class="reflection-label">Within the work</h3><p class="reflection-work">${esc(context.work)}</p>${context.paragraphs.map(p => `<p>${esc(p)}</p>`).join('')}<div class="reflection-sources">${context.sources.map(source => external(source.url, esc(source.label), 'reflection-source')).join('')}</div></div><h3 class="reflection-label reflection-reading-label">My reading</h3>` : '';
  let excerpt = '';
  if (reflection.excerpt) {
    const selection = reflection.excerpt;
    const poem = poems.find(p => p.slug === selection.poem);
    const stanza = poem?.stanzas[selection.stanza];
    const lines = selection.lines.map(i => stanza?.lines[i]);
    if (!poem || lines.some(line => typeof line !== 'string')) throw new Error('Invalid poem excerpt in reflection.');
    excerpt = `<figure class="reflection-excerpt"><figcaption>A nearby passage · from my poem ${esc(poem.title)}</figcaption><blockquote lang="${stanza.lang || poem.lang}">${lines.map(esc).join('<br>')}</blockquote>${link(poemPath(poem), 'Read the poem')}</figure>`;
  }
  return `<details class="word-reflection"><summary><span>In conversation with the words</span><span class="reflection-plus" aria-hidden="true">+</span></summary><div class="reflection-body">${contextHtml}${reflection.paragraphs.map(p => `<p>${esc(p)}</p>`).join('')}${excerpt}</div></details>`;
}
