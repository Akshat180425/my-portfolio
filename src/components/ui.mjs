// Small HTML helpers and elements shared across pages.
export const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const arrow = '<span aria-hidden="true">↗</span>';
export const right = '<span aria-hidden="true">↗</span>';
export const external = (url, text, cls='text-link') => `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${text} ${arrow}<span class="sr-only"> (opens in a new tab)</span></a>`;
export const link = (url, text, cls='text-link') => `<a class="${cls}" href="${url}">${text} ${right}</a>`;
export const tags = list => `<ul class="tags">${list.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`;
export const eyebrow = text => `<p class="eyebrow">${text}</p>`;
export const pageHead = (no, label, title, desc) => `<header class="page-head wrap">${eyebrow(`${no} / ${label}`)}<h1>${title}</h1><p class="page-intro">${desc}</p></header>`;
export const sectionHead = (kicker,title,href,label) => `<div class="section-head"><div>${eyebrow(kicker)}<h2>${title}</h2></div>${href?link(href,label):''}</div>`;
export const availability = `<span class="availability"><span class="status-dot" aria-hidden="true"></span> Open to full-time opportunities</span>`;
export const quote = `<figure class="literary-quote"><span class="quote-mark" aria-hidden="true">“</span><blockquote>We know what we are but<br>know not what we may be.</blockquote><figcaption>William Shakespeare · <a href="https://www.folger.edu/explore/shakespeares-works/hamlet/read/4/5/" target="_blank" rel="noopener noreferrer">Hamlet, Act IV, Scene V <span class="sr-only">(opens in a new tab)</span></a></figcaption></figure>`;
