export function projectCard(p,i) {
 return `<article class="project-card"><a href="/projects/#${p.id}" class="project-image-link" aria-label="Explore ${p.name}"><div class="project-preview preview-${p.id}"><img src="/assets/images/${p.image}" width="1200" height="750" alt="${p.name} application interface" loading="lazy"></div><span class="image-arrow" aria-hidden="true">↗</span></a><div class="project-card-meta"><span>0${i+1} / ${p.stack[0]} & ${p.stack[1]}</span><span>${p.date}</span></div><h3><a href="/projects/#${p.id}">${p.name}</a></h3><p>${p.category}</p></article>`;
}
