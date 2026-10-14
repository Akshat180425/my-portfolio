import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { origin, basePath, pages, route } from '../src/config/site.mjs';
import { shell } from '../src/components/layout.mjs';
import { pageRenderers } from '../src/pages/index.mjs';
import notFoundPage from '../src/pages/not-found.mjs';
import poemPage from '../src/pages/poem.mjs';
import { poems, poemPath } from '../src/data/poems.mjs';
import { projects } from '../src/data/content.mjs';
import { caseStudies } from '../src/data/case-studies.mjs';
import { collectionSize, collectionPath } from '../src/data/fragments.mjs';
import projectPage from '../src/pages/project.mjs';
import teachingPage from '../src/pages/teaching.mjs';
import internshipPage from '../src/pages/internship.mjs';
import collectionPage, { collections } from '../src/pages/collection.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.resolve(root, 'dist');

// Only the generated dist folder can be removed by this build.
if (path.relative(root, dist) !== 'dist' || fs.lstatSync(dist, { throwIfNoEntry: false })?.isSymbolicLink()) {
  throw new Error('Refusing to replace an output folder outside this project.');
}

// Render before cleaning so a template error leaves the previous build intact.
const documents = Object.entries(pageRenderers).map(([id, render]) => [
  id === 'home' ? 'index.html' : `${id}/index.html`,
  shell(id, render()),
]);
const extraRoutes = [];
function detailDocument(parent, url, body, title, description) {
  documents.push([`${url.slice(1)}index.html`, shell(parent, body, { path: url, title: `${title} — Akshat Bawa`, description })]);
  extraRoutes.push(url);
}
for (const project of projects) {
  const story = caseStudies[project.id];
  detailDocument('projects', `/projects/${project.id}/`, projectPage(project, story), `${project.name} — Project study`, story.standfirst);
}
detailDocument('experience', '/experience/awadh/', teachingPage(), 'Teaching at AWaDH', 'My first lecture at AWaDH: original notes, a corrected closest-pair companion, and Python code with reproducible tests.');
detailDocument('experience', '/experience/evizen-ai/', internshipPage(), 'Evizen AI & Unilic', 'My contribution to Unilic at Evizen AI: mobile quality assurance, regression testing, and release readiness.');
for (const [kind, collection] of Object.entries(collections)) {
  const slugs = collection.entries.map(entry => entry.slug);
  if (new Set(slugs).size !== slugs.length || slugs.some(slug => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))) {
    throw new Error(`Invalid or repeated slug in ${kind}.`);
  }
  for (let page = 1; page <= Math.ceil(collection.entries.length / collectionSize); page++) {
    detailDocument('marginalia', collectionPath(kind, page), collectionPage(kind, page), `${collection.title}${page > 1 ? ` — Page ${page}` : ''}`, collection.description + ` Page ${page} of ${Math.ceil(collection.entries.length / collectionSize)}.`);
  }
}
for (const poem of poems) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(poem.slug) || poems.filter(p => p.slug === poem.slug).length !== 1) {
    throw new Error(`Poem slugs must be unique and use lowercase words joined with hyphens: ${poem.slug}`);
  }
  documents.push([`marginalia/${poem.slug}/index.html`, shell('marginalia', poemPage(poem), {
    title: `${poem.title} — A poem by Akshat Bawa`,
    description: `${poem.title}, an original poem in ${poem.language} by Akshat Bawa. Read it in Marginalia.`,
    path: poemPath(poem),
  })]);
}
documents.push(['404.html', shell('home', notFoundPage())]);

// Preserve links shared before collections changed from four to six per page.
// The browser carries a piece's fragment ID to the collection, which locates it.
for (const [oldPath, target] of [
  ['/marginalia/poems/page/3/', '/marginalia/poems/page/2/'],
  ['/marginalia/fragments/page/5/', '/marginalia/fragments/'],
  ['/marginalia/fragments/page/6/', '/marginalia/fragments/'],
]) {
  if (documents.some(([file]) => file === `${oldPath.slice(1)}index.html`)) continue;
  const destination = `${basePath}${target}`;
  documents.push([`${oldPath.slice(1)}index.html`, `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Continue reading — Akshat Bawa</title><link rel="canonical" href="${origin}${target}"><script>location.replace(${JSON.stringify(destination)} + location.search + location.hash);</script><noscript><meta http-equiv="refresh" content="0;url=${destination}"></noscript></head><body><p>This collection has a new page layout. <a href="${target}">Continue reading</a>.</p></body></html>`]);
}

fs.rmSync(dist, { recursive: true, force: true });
fs.cpSync(path.join(root, 'public'), dist, {
  recursive: true,
  filter: source => path.basename(source) !== '__pycache__' && !source.endsWith('.pyc'),
});
fs.cpSync(path.join(root, 'src/styles'), path.join(dist, 'assets/css'), { recursive: true });
fs.cpSync(path.join(root, 'src/scripts'), path.join(dist, 'assets/js'), { recursive: true });

for (const [file, html] of documents) {
  const destination = path.join(dist, file);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  // Templates use root-relative URLs. Prefix only local HTML destinations;
  // external URLs and in-page anchors retain their original meaning.
  const output = basePath ? html.replace(/\b(href|src|action)="\/(?!\/)/g, `$1="${basePath}/`) : html;
  fs.writeFileSync(destination, output);
}

const routes = [...pages.map(([id]) => route(id)), ...poems.map(poemPath), ...extraRoutes];
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(url => `<url><loc>${origin}${url}</loc></url>`).join('')}</urlset>`);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
fs.writeFileSync(path.join(dist, '.nojekyll'), '');
console.log(`Built ${routes.length} pages, a 404 page, sitemap, and all assets in dist/.`);
