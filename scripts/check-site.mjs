import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { basePath, origin } from '../src/config/site.mjs';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const files = [];
function walk(folder) {
  for (const item of fs.readdirSync(folder, { withFileTypes: true })) {
    const filename = path.join(folder, item.name);
    if (item.isDirectory()) walk(filename);
    else if (filename.endsWith('.html')) files.push(filename);
  }
}
walk(root);
let links = 0, socialPages = 0;
const metadata = (html, key) => html.match(new RegExp(`<meta (?:property|name)="${key}" content="([^"]*)"`))?.[1];
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  for (const [, attribute, value] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    if (!value.startsWith('/') || value.startsWith('//')) continue;
    assert.ok(!basePath || value.startsWith(`${basePath}/`), `${file}: unprefixed ${value}`);
    const route = decodeURIComponent(value.slice(basePath.length).split(/[?#]/)[0]);
    let target = path.resolve(root, '.' + route);
    assert.ok(target === path.resolve(root) || target.startsWith(path.resolve(root) + path.sep));
    if (fs.statSync(target, { throwIfNoEntry: false })?.isDirectory()) target = path.join(target, 'index.html');
    assert.ok(fs.existsSync(target), `${file}: broken ${attribute} ${value}`);
    links++;
  }
  if (!html.includes('og:title')) continue; // Legacy pagination redirects.
  const relative = path.relative(root, file).replaceAll('\\', '/');
  assert.ok(metadata(html, 'description'), `Missing description: ${relative}`);
  assert.equal(metadata(html, 'og:image'), `${origin}/assets/images/social-preview.png`);
  assert.equal(metadata(html, 'twitter:card'), 'summary_large_image');
  assert.equal(metadata(html, 'twitter:image'), metadata(html, 'og:image'));
  assert.equal(metadata(html, 'og:image:width'), '1200');
  assert.equal(metadata(html, 'og:image:height'), '630');
  assert.ok(metadata(html, 'og:image:alt'));
  if (relative !== '404.html') {
    const route = '/' + relative.replace(/index\.html$/, '');
    assert.equal(metadata(html, 'og:url'), origin + route);
    assert.ok(html.includes(`<link rel="canonical" href="${origin + route}">`));
    socialPages++;
  }
  assert.ok(!html.includes('${esc(revision)}'), 'Unexpanded teaching code template');
}
for (const id of ['convo', 'ledgerly', 'tradescope']) {
  const html = fs.readFileSync(path.join(root, 'projects', id, 'index.html'), 'utf8');
  assert.ok(html.includes('data-demo-gallery'));
  assert.ok((html.match(/data-demo-frame/g) || []).length >= 3);
  assert.ok(!html.includes('data-demo-frame hidden'), 'No-JavaScript frames must remain readable');
}
console.log(`Checked ${files.length} HTML files, ${links} local references, and sharing metadata for ${socialPages} content pages.`);
