// Progressive enhancement: nothing is hidden in CSS or while waiting to enter view.
// Different chapters share a small vocabulary, with their own pacing and targets.
export function initMotion(doc, view) {
  if (!view.IntersectionObserver || !view.Element?.prototype.animate) return () => {};
  const reduced = view.matchMedia('(prefers-reduced-motion: reduce)');
  const compact = view.matchMedia('(max-width: 650px)');
  const targets = new Map();
  const running = new Map();
  const seen = new WeakSet();
  const seenEntries = new Set();
  const selectors = [];
  let observer;

  const plan = (selector, kind = 'rise', stagger = 0) => selectors.push({ selector, kind, stagger });
  plan('.page-head h1, .detail-heading h1, .collection-heading h1, .poem-heading h1', 'title');
  plan('.page-head .page-intro, .detail-heading .detail-deck, .detail-heading .detail-intro, .collection-heading .page-intro, .poem-byline', 'fade');
  plan('.section-head, .poetry-tools, .detail-prose > section > h2, .reading-note > div:first-child', 'heading');
  plan('.detail-facts > div, .journey-list > li, .architecture-flow > li', 'rise', 65);
  plan('.detail-prose > section > p, .related-work, .project-end > p, .footer-top h2', 'fade');
  plan('.challenge-list > article', 'rise', 70);
  plan('.detail-screenshot, .demo-gallery, .lecture-preview, .closest-pair-figure, .evidence-result', 'frame');
  plan('.teaching-introduction, .unilic-intro > div', 'rise', 70);

  const profiles = {
    home() {
      plan('.hero-copy h1', 'title');
      plan('.hero-intro, .now-teaser > p', 'fade');
      plan('.project-grid > .project-card, .rooms-grid > .room-card', 'lift', 85);
      plan('.experience-teaser > div:first-child', 'heading');
      plan('.compact-experience > a', 'row', 65);
    },
    about() {
      plan('.identity-panel', 'frame');
      plan('.about-body > p', 'fade', 45);
      plan('.education-main', 'row');
      plan('.education-secondary > div, .course-grid > div', 'rise', 65);
      plan('.personal-space', 'fade');
    },
    experience() {
      plan('.timeline-meta', 'row');
      plan('.experience-content', 'rise');
      plan('.community-list > article', 'row', 55);
      plan('.skill-list > div', 'rise', 55);
    },
    projects() {
      plan('.project-story-top > div', 'heading');
      plan('.project-story-top > p', 'fade');
      plan('.project-stage', 'frame');
      plan('.project-under', 'rise');
    },
    library() {
      plan('.shelf-books > .book', 'book', 40);
      plan('.library-group-title', 'heading');
      plan('.influence-list > li', 'row', 40);
      plan('.own-margins .fragment-card', 'fade', 55);
    },
    'listening-room'() {
      plan('.record-sleeve', 'frame');
      plan('.artist-list-heading, .favourites-heading, .all-time-heading', 'heading');
      plan('.artist-row, .all-time-tracks > li', 'row', 45);
      plan('.listening-note > div', 'rise', 60);
    },
    marginalia() {
      plan('.writing-doors > a, .marginalia-paths > a', 'rise', 70);
      plan('.poetry-list > .poem-card', 'lift', 75);
      plan('.fragment-list > .fragment-card', 'fade', 45);
      plan('.marginalia-excerpt .featured-slot', 'verse');
      plan('.poem-stanza', 'verse');
      plan('.poem-colophon, .poem-navigation', 'fade');
    },
    now() {
      plan('.now-main > article', 'rise');
      plan('.now-sidebar > div', 'fade', 60);
    },
    contact() {
      plan('.contact-lead', 'heading');
      plan('.contact-caption, .contact-note', 'fade');
      plan('.contact-elsewhere > a', 'row', 60);
    },
  };
  for (const [page, profile] of Object.entries(profiles)) {
    if (doc.body.classList.contains(`page-${page}`)) profile();
  }

  function entryKey(element) {
    return element.dataset.entry ? `${element.tagName}:${element.dataset.entry}` : '';
  }
  function markSeen(element) {
    seen.add(element);
    const key = entryKey(element);
    if (key) seenEntries.add(key);
  }
  function revealNow(element) {
    markSeen(element);
    observer?.unobserve(element);
    targets.delete(element);
    running.get(element)?.cancel();
    running.delete(element);
    element.dataset.revealState = 'settled';
  }
  function hashTarget() {
    try { return doc.getElementById(decodeURIComponent(view.location.hash.slice(1))); }
    catch { return null; }
  }
  function related(a, b) { return b && (a === b || a.contains(b) || b.contains(a)); }
  function mustShow(element) {
    return element.contains(doc.activeElement) || related(element, hashTarget());
  }
  function play(element, settings, delay) {
    markSeen(element);
    observer.unobserve(element);
    targets.delete(element);
    if (reduced.matches || mustShow(element)) return revealNow(element);
    const small = compact.matches;
    const distance = small ? 12 : 22;
    const styles = view.getComputedStyle(element);
    const base = styles.transform === 'none' ? '' : styles.transform;
    const shifts = {
      title: `translateY(${small ? 12 : 20}px)`,
      heading: `translateY(${small ? 8 : 12}px)`,
      rise: `translateY(${distance}px)`,
      lift: `translateY(${distance}px)`,
      row: `translateX(${small ? -6 : -12}px)`,
      frame: `translateY(${small ? 8 : 14}px) scale(.985)`,
      book: `translateY(${small ? 14 : 24}px)`,
      fade: '', verse: '',
    };
    const duration = { title: 680, heading: 550, rise: 600, lift: 640, row: 480, frame: 700, book: 640, fade: 540, verse: 720 }[settings.kind];
    const opacity = Number(styles.opacity);
    element.dataset.revealState = 'running';
    try {
      const animation = element.animate([
        { opacity: settings.kind === 'verse' ? .12 : 0, transform: `${base} ${shifts[settings.kind]}`.trim() || 'none' },
        { opacity, transform: base || 'none' },
      ], {
        duration: small ? duration * .85 : duration,
        delay: small ? Math.min(delay, 70) : Math.min(delay, 160),
        easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards',
      });
      running.set(element, animation);
      const finished = () => {
        if (running.get(element) !== animation) return;
        running.delete(element);
        element.dataset.revealState = 'settled';
      };
      animation.onfinish = finished;
      animation.oncancel = finished;
    } catch { revealNow(element); }
  }
  function startObserver() {
    if (observer || reduced.matches) return;
    observer = new view.IntersectionObserver(entries => {
      const batch = new Map();
      for (const entry of entries) {
        const element = entry.target;
        if (!element.isConnected) { revealNow(element); continue; }
        if (!entry.isIntersecting) continue;
        const settings = targets.get(element);
        if (!settings) continue;
        // Preserve navigation targets and content already passed during a fast scroll.
        if (entry.boundingClientRect.bottom <= 0 || mustShow(element)) { revealNow(element); continue; }
        const index = batch.get(settings.selector) || 0;
        batch.set(settings.selector, index + 1);
        play(element, settings, index * settings.stagger);
      }
    }, { threshold: .06, rootMargin: '0px 0px -24px 0px' });
  }
  function register() {
    if (reduced.matches) return;
    startObserver();
    for (const element of [...targets.keys(), ...running.keys()]) {
      if (!element.isConnected) revealNow(element);
    }
    for (const settings of selectors) {
      for (const element of doc.querySelectorAll(settings.selector)) {
        if (targets.has(element) || seen.has(element)) continue;
        element.dataset.reveal = settings.kind;
        if (seenEntries.has(entryKey(element)) || mustShow(element) || element.getBoundingClientRect().bottom <= 0) {
          revealNow(element); continue;
        }
        targets.set(element, settings);
        element.dataset.revealState = 'ready';
        observer.observe(element);
      }
    }
  }
  function showRelated(target) {
    for (const element of [...targets.keys(), ...running.keys()]) {
      if (related(element, target)) revealNow(element);
    }
  }
  const focus = event => showRelated(event.target);
  const hash = () => showRelated(hashTarget());
  const print = () => {
    for (const element of [...targets.keys(), ...running.keys()]) revealNow(element);
  };
  const preference = () => {
    if (!reduced.matches) { register(); return; }
    observer?.disconnect();
    for (const element of [...targets.keys(), ...running.keys()]) revealNow(element);
    observer = null;
  };
  doc.addEventListener('focusin', focus);
  doc.addEventListener('portfolio:collection-rendered', register);
  view.addEventListener('hashchange', hash);
  view.addEventListener('beforeprint', print);
  reduced.addEventListener('change', preference);
  register();
  return () => {
    observer?.disconnect();
    for (const element of [...targets.keys(), ...running.keys()]) revealNow(element);
    doc.removeEventListener('focusin', focus);
    doc.removeEventListener('portfolio:collection-rendered', register);
    view.removeEventListener('hashchange', hash);
    view.removeEventListener('beforeprint', print);
    reduced.removeEventListener('change', preference);
  };
}

if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initMotion(document, window), { once: true });
  } else initMotion(document, window);
}
