import test from 'node:test';
import assert from 'node:assert/strict';
import { initMotion } from '../src/scripts/motion.mjs';

// A small DOM/animation boundary lets us test navigation and accessibility
// without timers or a browser dependency. Layout is checked in the browser.
class Events {
  listeners = new Map();
  addEventListener(name, callback) { this.listeners.set(name, callback); }
  removeEventListener(name) { this.listeners.delete(name); }
  emit(name, payload = {}) { this.listeners.get(name)?.(payload); }
}
class Element {
  dataset = {};
  isConnected = true;
  tagName = 'ARTICLE';
  bottom = 900;
  transform = 'none';
  animations = [];
  children = [];
  contains(other) { return other === this || this.children.some(child => child.contains(other)); }
  getBoundingClientRect() { return { bottom: this.bottom }; }
  animate(frames, options) {
    const animation = {
      frames, options, cancelled: false,
      cancel() { this.cancelled = true; this.oncancel?.(); },
      finish() { this.onfinish?.(); },
    };
    this.animations.push(animation);
    return animation;
  }
}
function fixture(page = 'home', reducedAtStart = false, small = false) {
  const doc = new Events();
  const view = new Events();
  const reduced = Object.assign(new Events(), { matches: reducedAtStart });
  const groups = new Map();
  const ids = new Map();
  const observers = [];
  doc.body = { classList: { contains: name => name === `page-${page}` } };
  doc.querySelectorAll = selector => groups.get(selector) || [];
  doc.getElementById = id => ids.get(id) || null;
  view.location = { hash: '' };
  view.Element = Element;
  view.matchMedia = query => query.includes('reduced-motion') ? reduced : { matches: small };
  view.getComputedStyle = element => ({ transform: element.transform, opacity: '1' });
  view.IntersectionObserver = class {
    observed = new Set();
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe(element) { this.observed.add(element); }
    unobserve(element) { this.observed.delete(element); }
    disconnect() { this.observed.clear(); }
    enter(elements) {
      this.callback(elements.map(target => ({ target, isIntersecting: true, boundingClientRect: target.getBoundingClientRect() })));
    }
  };
  return { doc, view, reduced, groups, ids, observers };
}
const homeCards = '.project-grid > .project-card, .rooms-grid > .room-card';
const writingCards = '.fragment-list > .fragment-card';

test('cards are not hidden while waiting; their entrance runs only once', () => {
  const f = fixture();
  const cards = [new Element(), new Element(), new Element()];
  f.groups.set(homeCards, cards);
  const dispose = initMotion(f.doc, f.view);
  assert.ok(cards.every(card => card.animations.length === 0 && card.dataset.revealState === 'ready'));
  f.observers[0].enter(cards);
  assert.deepEqual(cards.map(card => card.animations[0].options.delay), [0, 85, 160]);
  cards.forEach(card => card.animations[0].finish());
  f.observers[0].enter(cards);
  assert.ok(cards.every(card => card.animations.length === 1 && card.dataset.revealState === 'settled'));
  dispose();
});

test('reduced motion creates no observer or animations', () => {
  const f = fixture('home', true);
  const card = new Element();
  f.groups.set(homeCards, [card]);
  initMotion(f.doc, f.view);
  assert.equal(f.observers.length, 0);
  assert.equal(card.animations.length, 0);
  assert.equal(card.dataset.revealState, undefined);
});

test('changing the preference cancels active effects and releases waiting content', () => {
  const f = fixture();
  const cards = [new Element(), new Element()];
  f.groups.set(homeCards, cards);
  initMotion(f.doc, f.view);
  f.observers[0].enter([cards[0]]);
  f.reduced.matches = true;
  f.reduced.emit('change');
  assert.equal(cards[0].animations[0].cancelled, true);
  assert.equal(cards[1].animations.length, 0);
  assert.ok(cards.every(card => card.dataset.revealState === 'settled'));
  assert.equal(f.observers[0].observed.size, 0);
});

test('keyboard focus immediately reveals an active card', () => {
  const f = fixture();
  const card = new Element(), link = new Element();
  card.children.push(link);
  f.groups.set(homeCards, [card]);
  initMotion(f.doc, f.view);
  f.observers[0].enter([card]);
  f.doc.emit('focusin', { target: link });
  assert.equal(card.animations[0].cancelled, true);
  assert.equal(card.dataset.revealState, 'settled');
});

test('deep links bypass the entrance for their destination', () => {
  const f = fixture();
  const card = new Element();
  f.groups.set(homeCards, [card]);
  f.ids.set('convo', card);
  f.view.location.hash = '#convo';
  initMotion(f.doc, f.view);
  assert.equal(card.dataset.revealState, 'settled');
  assert.equal(card.animations.length, 0);
});

test('collection replacements keep seen pieces still and register new pieces', () => {
  const f = fixture('marginalia');
  const oldCard = new Element(); oldCard.dataset.entry = 'one';
  f.groups.set(writingCards, [oldCard]);
  initMotion(f.doc, f.view);
  f.observers[0].enter([oldCard]);
  oldCard.isConnected = false;
  const clone = new Element(); clone.dataset.entry = 'one';
  const newCard = new Element(); newCard.dataset.entry = 'two';
  f.groups.set(writingCards, [clone, newCard]);
  f.doc.emit('portfolio:collection-rendered');
  assert.equal(oldCard.animations[0].cancelled, true);
  assert.equal(clone.dataset.revealState, 'settled');
  assert.equal(clone.animations.length, 0);
  assert.ok(f.observers[0].observed.has(newCard));
});

test('poem stanzas fade without moving the verses', () => {
  const f = fixture('marginalia');
  const stanza = new Element();
  f.groups.set('.poem-stanza', [stanza]);
  initMotion(f.doc, f.view);
  f.observers[0].enter([stanza]);
  assert.equal(stanza.animations[0].frames[0].transform, 'none');
  assert.equal(stanza.animations[0].frames[1].transform, 'none');
  assert.equal(stanza.animations[0].options.duration, 720);
});

test('the tilted book retains its rotation and mobile staggering stays short', () => {
  const f = fixture('library', false, true);
  const books = Array.from({ length: 7 }, () => new Element());
  books[6].transform = 'matrix(0.99, 0.1, -0.1, 0.99, 0, 0)';
  f.groups.set('.shelf-books > .book', books);
  initMotion(f.doc, f.view);
  f.observers[0].enter(books);
  assert.ok(books.every(book => book.animations[0].options.delay <= 70));
  assert.equal(books[6].animations[0].frames[1].transform, books[6].transform);
});

test('printing releases active and offscreen content', () => {
  const f = fixture();
  const cards = [new Element(), new Element()];
  f.groups.set(homeCards, cards);
  initMotion(f.doc, f.view);
  f.observers[0].enter([cards[0]]);
  f.view.emit('beforeprint');
  assert.ok(cards.every(card => card.dataset.revealState === 'settled'));
  assert.equal(cards[0].animations[0].cancelled, true);
});

test('unsupported browsers leave the page alone', () => {
  const f = fixture();
  delete f.view.IntersectionObserver;
  assert.equal(typeof initMotion(f.doc, f.view), 'function');
  assert.equal(f.observers.length, 0);
});
