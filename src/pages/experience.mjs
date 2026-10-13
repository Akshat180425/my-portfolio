import { experience, community, skills } from '../data/content.mjs';
import { pageHead, tags, sectionHead, esc } from '../components/ui.mjs';

export default function experiencePage() {
 return `${pageHead('03','Experience','Learning in practice.<br><em>Work, with people.</em>','From testing real applications to helping others learn.<br>Places where theory has met practice.')}<section class="timeline wrap" aria-label="Professional experience">${experience.map((e,i)=>`<article class="experience-entry" id="${esc(e.id)}"><div class="timeline-meta"><span class="small-caps">0${i+1} / ${e.place}</span><p>${e.date}</p></div><div class="experience-content"><p class="eyebrow">${e.role}</p><h2>${e.fullName}</h2><p class="experience-label">${e.label}</p><p>${e.summary}</p><ul class="experience-points">${e.points.map(p=>`<li>${p}</li>`).join('')}</ul>${tags(e.tags)}</div></article>`).join('')}</section>
 <section class="paper-section"><div class="wrap">${sectionHead('Beyond a job title','Part of a community.')}<p class="section-description">Positions of responsibility at IIT Ropar.</p><div class="community-list">${community.map((c,i)=>`<article${c.id?` id="${esc(c.id)}"`:""}><span class="community-number">0${i+1}</span><div><h3>${c.organisation}</h3><p>${c.role}</p></div><span class="mini-date">${c.date}</span></article>`).join('')}</div></div></section>
 <section class="section wrap">${sectionHead('Tools for the work','What I work with.')}<div class="skill-list">${skills.map(([name,...list])=>`<div><h3>${name}</h3>${tags(list)}</div>`).join('')}</div></section>`;
}
