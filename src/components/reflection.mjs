import { esc, link } from './ui.mjs';
import { poems, poemPath } from '../data/poems.mjs';

export function reflectionPanel(reflection) {
  if (!reflection) return '';
  let excerpt = '';
  if (reflection.excerpt) {
    const selection = reflection.excerpt;
    const poem = poems.find(p => p.slug === selection.poem);
    const stanza = poem?.stanzas[selection.stanza];
    const lines = selection.lines.map(i => stanza?.lines[i]);
    if (!poem || lines.some(line => typeof line !== 'string')) throw new Error('Invalid poem excerpt in reflection.');
    excerpt = `<figure class="reflection-excerpt"><figcaption>A nearby passage · from my poem ${esc(poem.title)}</figcaption><blockquote lang="${stanza.lang || poem.lang}">${lines.map(esc).join('<br>')}</blockquote>${link(poemPath(poem), 'Read the poem')}</figure>`;
  }
  return `<details class="word-reflection"><summary><span>In conversation with the words</span><span class="reflection-plus" aria-hidden="true">+</span></summary><div class="reflection-body">${reflection.status === 'draft' ? '<p class="reflection-draft">Draft interpretation · for Akshat’s review</p>' : ''}${reflection.paragraphs.map(p => `<p>${esc(p)}</p>`).join('')}${excerpt}</div></details>`;
}
