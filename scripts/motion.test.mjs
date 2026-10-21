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
  tagName = 'H3';
  bottom = 900;
  transform = 'none';
  animations = [];
  children = [];
  closest() { return this.entry || (this.dataset.entry ? this : null); }
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
const homeText = '.project-card h3, .room-card h3';
const writingText = '.fragment-list > .fragment-card > blockquote';

test('text is not hidden while waiting; its entrance runs only once', () => {
  const f = fixture();
  const cards = [new Element(), new Element(), new Element()];
  f.groups.set(homeText, cards);
  const dispose = initMotion(f.doc, f.view);
  assert.ok(cards.every(card => card.animations.length === 0 && card.dataset.revealState === 'ready'));
  f.observers[0].enter(cards);
  assert.deepEqual(cards.map(card => card.animations[0].options.delay), [0, 110, 220]);
  cards.forEach(card => card.animations[0].finish());
  f.observers[0].enter(cards);
  assert.ok(cards.every(card => card.animations.length === 1 && card.dataset.revealState === 'settled'));
  dispose();
});

test('reduced motion creates no observer or animations', () => {
  const f = fixture('home', true);
  const card = new Element();
  f.groups.set(homeText, [card]);
  initMotion(f.doc, f.view);
  assert.equal(f.observers.length, 0);
  assert.equal(card.animations.length, 0);
  assert.equal(card.dataset.revealState, undefined);
});

test('changing the preference cancels active effects and releases waiting content', () => {
  const f = fixture();
  const cards = [new Element(), new Element()];
  f.groups.set(homeText, cards);
  initMotion(f.doc, f.view);
  f.observers[0].enter([cards[0]]);
  f.reduced.matches = true;
  f.reduced.emit('change');
  assert.equal(cards[0].animations[0].cancelled, true);
  assert.equal(cards[1].animations.length, 0);
  assert.ok(cards.every(card => card.dataset.revealState === 'settled'));
  assert.equal(f.observers[0].observed.size, 0);
});

test('keyboard focus immediately reveals active text', () => {
  const f = fixture();
  const card = new Element(), link = new Element();
  card.children.push(link);
  f.groups.set(homeText, [card]);
  initMotion(f.doc, f.view);
  f.observers[0].enter([card]);
  f.doc.emit('focusin', { target: link });
  assert.equal(card.animations[0].cancelled, true);
  assert.equal(card.dataset.revealState, 'settled');
});

test('deep links bypass the entrance for their destination', () => {
  const f = fixture();
  const card = new Element();
  f.groups.set(homeText, [card]);
  f.ids.set('convo', card);
  f.view.location.hash = '#convo';
  initMotion(f.doc, f.view);
  assert.equal(card.dataset.revealState, 'settled');
  assert.equal(card.animations.length, 0);
});

test('collection replacements keep seen pieces still and register new pieces', () => {
  const f = fixture('marginalia');
  const oldCard = new Element(); oldCard.entry = { dataset: { entry: 'one' } };
  f.groups.set(writingText, [oldCard]);
  initMotion(f.doc, f.view);
  f.observers[0].enter([oldCard]);
  oldCard.isConnected = false;
  const clone = new Element(); clone.entry = { dataset: { entry: 'one' } };
  const newCard = new Element(); newCard.entry = { dataset: { entry: 'two' } };
  f.groups.set(writingText, [clone, newCard]);
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
  assert.equal(stanza.animations[0].options.duration, 1100);
});

test('mobile text entrances remain bounded', () => {
  const f = fixture('home', false, true);
  const headings = Array.from({ length: 7 }, () => new Element());
  f.groups.set(homeText, headings);
  initMotion(f.doc, f.view);
  f.observers[0].enter(headings);
  assert.ok(headings.every(heading => heading.animations[0].options.delay <= 120));
  assert.equal(headings[0].animations[0].frames[0].transform, 'translateY(20px)');
});

test('printing releases active and offscreen content', () => {
  const f = fixture();
  const cards = [new Element(), new Element()];
  f.groups.set(homeText, cards);
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

test('a focused parent link keeps its text immediately visible', () => {
  const f = fixture();
  const link = new Element(), heading = new Element();
  link.children.push(heading);
  f.doc.activeElement = link;
  f.groups.set(homeText, [heading]);
  initMotion(f.doc, f.view);
  assert.equal(heading.dataset.revealState, 'settled');
  assert.equal(heading.animations.length, 0);
});

test('text within a collection entry is remembered separately by text role', () => {
  const f = fixture('marginalia');
  const entry = { dataset: { entry: 'lost' } };
  const heading = new Element(); heading.entry = entry;
  const excerpt = new Element(); excerpt.entry = entry; excerpt.tagName = 'P';
  f.groups.set('.poetry-list .poem-card h3', [heading]);
  f.groups.set('.poetry-list .poem-excerpt', [excerpt]);
  initMotion(f.doc, f.view);
  f.observers[0].enter([heading]);
  heading.isConnected = false;
  const clone = new Element(); clone.entry = entry;
  f.groups.set('.poetry-list .poem-card h3', [clone]);
  f.doc.emit('portfolio:collection-rendered');
  assert.equal(clone.dataset.revealState, 'settled');
  assert.equal(excerpt.dataset.revealState, 'ready');
});
