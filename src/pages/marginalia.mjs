import { poems } from '../data/poems.mjs';
import { fragments, fragmentPath } from '../data/fragments.mjs';
import { pageHead, esc, link, arrow } from '../components/ui.mjs';
import { poemCard } from '../components/writing.mjs';

export default function marginaliaPage() {
  const selected = poems.filter(p => ['hijr', 'lost'].includes(p.slug));
  const fragment = fragments.find(f => f.slug === 'the-measure-of-integrity');
  return `${pageHead('07', 'Marginalia', 'Notes from<br><em>the margins.</em>', 'Poems, passing thoughts, and words I wanted to keep.<br>Original writing by Akshat Bawa.')}<section class="writing-doors wrap" aria-label="Writing collections"><a href="/marginalia/fragments/"><p class="eyebrow">Short pieces · ${fragments.length} entries</p><h2>Lines that linger ${arrow}</h2><p>Love, becoming, and the quiet work of self-respect.</p></a><a href="/marginalia/poems/"><p class="eyebrow">Poetry · English & Hindi</p><h2>Room for a poem ${arrow}</h2><p>Longer thoughts, in their own rhythm.</p></a></section><section class="poetry-collection featured-poetry wrap"><div class="poetry-tools"><div><p class="eyebrow">Two from the notebook</p><h2>A place to begin.</h2></div>${link('/marginalia/poems/', `All ${poems.length} poems`)}</div><div class="poetry-list">${selected.map(poemCard).join('')}</div></section><section class="paper-section marginalia-excerpt"><div class="wrap"><p class="eyebrow">A line from my margins</p><h2>${esc(fragment.title)}</h2><blockquote>${esc(fragment.text)}</blockquote><div><span>Akshat Bawa</span>${link(fragmentPath(fragment), 'More lines that linger')}</div></div></section><section class="marginalia-paths wrap"><a href="/library/"><span class="eyebrow">Where a thought might begin</span><h3>Visit the Library ${arrow}</h3></a><a href="/listening-room/"><span class="eyebrow">Or follow a different rhythm</span><h3>The Listening Room ${arrow}</h3></a></section>`;
}
