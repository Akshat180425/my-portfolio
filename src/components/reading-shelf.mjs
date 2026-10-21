import { readingShelf } from '../data/reading-shelf.mjs';
import { esc, link } from './ui.mjs';

export function authorShelf(name) {
  const shelf = readingShelf[name];
  if (!shelf) return '';
  const group = (key, title) => shelf[key]?.length
    ? `<div class="shelf-status shelf-${key}"><h3>${title}</h3>${key === 'read' && shelf.collection ? `<p class="shelf-collection">${esc(shelf.collection)}</p>` : ''}<ul>${shelf[key].map(book => `<li>${esc(book)}</li>`).join('')}</ul>${key === 'current' ? link('/now/', 'The present chapter') : ''}</div>`
    : '';
  return `<section class="author-books" aria-label="My reading shelf · ${esc(name)}">${group('current', 'Currently reading')}${group('read', 'Read')}${group('horizon', 'On the horizon')}</section>`;
}
