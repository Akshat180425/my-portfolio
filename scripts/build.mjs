import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { origin, basePath, pages, route } from '../src/config/site.mjs';
import { shell } from '../src/components/layout.mjs';
import { pageRenderers } from '../src/pages/index.mjs';
import notFoundPage from '../src/pages/not-found.mjs';
import poemPage from '../src/pages/poem.mjs';
import { poems, poemPath } from '../src/data/poems.mjs';

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

fs.rmSync(dist, { recursive: true, force: true });
fs.cpSync(path.join(root, 'public'), dist, { recursive: true });
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

const routes = [...pages.map(([id]) => route(id)), ...poems.map(poemPath)];
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(url => `<url><loc>${origin}${url}</loc></url>`).join('')}</urlset>`);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
fs.writeFileSync(path.join(dist, '.nojekyll'), '');
console.log(`Built ${pages.length} main pages, ${poems.length} poem pages, a 404 page, sitemap, and all assets in dist/.`);
