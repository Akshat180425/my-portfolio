// Progressive enhancement: nothing is hidden in CSS or while waiting to enter view.
// Only text enters: imagery, cards, borders, and controls stay in place.
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
  plan('.section-head h2, .poetry-tools h2, .detail-prose > section > h2, .reading-note h2, .footer-top h2', 'heading');
  plan('.detail-facts > div > p, .journey-list h3, .architecture-flow h3', 'rise', 90);
  plan('.detail-prose > section > p:not(.eyebrow), .journey-list p, .architecture-flow p, .project-end > p, .section-description', 'rise', 65);
  plan('.challenge-list h3, .teaching-introduction h2, .unilic-intro h2, .evidence-result h3', 'heading');
  plan('.challenge-list p, .teaching-introduction > p:not(.eyebrow), .unilic-intro p:not(.eyebrow), .evidence-result > p:not(.eyebrow)', 'rise', 65);

  const profiles = {
    home() {
      plan('.hero-copy h1', 'title');
      plan('.hero-intro, .now-teaser > p', 'rise');
      plan('.project-card h3, .room-card h3', 'heading', 110);
      plan('.project-card > p, .room-card > p', 'rise', 110);
      plan('.experience-teaser h2', 'heading');
      plan('.compact-experience strong, .compact-experience small', 'row', 80);
    },
    about() {
      plan('.about-body > p', 'rise', 80);
      plan('.education-main h3, .education-secondary h3, .course-grid h3, .personal-space h2', 'heading', 90);
      plan('.education-main p, .education-secondary p, .course-grid li, .personal-space > p:not(.eyebrow)', 'rise', 65);
    },
    experience() {
      plan('.timeline-meta p', 'row');
      plan('.experience-content h2, .community-list h3, .skill-list h3', 'heading');
      plan('.experience-content > p:not(.eyebrow), .experience-points > li, .community-list p', 'rise', 80);
    },
    projects() {
      plan('.project-story-top h2, .project-details-grid h3', 'heading');
      plan('.project-story-top > p, .project-tagline, .project-details-grid p', 'rise', 80);
    },
    library() {
      plan('.library-group-title h2', 'heading');
      plan('.library-group-title > p, .library-shelf > p, .reading-note > div > p:not(.eyebrow)', 'rise');
      plan('.influence-details > summary > span:nth-child(2)', 'row', 90);
      plan('.own-margins .fragment-card > blockquote', 'verse', 100);
    },
    'listening-room'() {
      plan('.favourites-heading h2, .all-time-heading h2, .listening-note h2', 'heading');
      plan('.artist-row > span:nth-child(2), .all-time-tracks .song-artist', 'row', 90);
      plan('.all-time-heading > p:not(.eyebrow), .listening-note > div > p', 'rise');
    },
    marginalia() {
      plan('.writing-doors h2, .marginalia-paths h3', 'heading', 110);
      plan('.writing-doors > a > p:not(.eyebrow)', 'rise', 100);
      plan('.poetry-list .poem-card h3', 'heading', 110);
      plan('.poetry-list .poem-excerpt', 'rise', 110);
      plan('.fragment-list > .fragment-card > blockquote', 'verse', 100);
      plan('.marginalia-excerpt blockquote', 'verse');
      plan('.poem-stanza', 'verse');
    },
    now() {
      plan('.now-main h2, .now-sidebar h3', 'heading');
      plan('.now-main p:not(.eyebrow), .now-sidebar p', 'rise', 80);
    },
    contact() {
      plan('.contact-lead', 'heading');
      plan('.contact-caption, .contact-note > p:not(.eyebrow)', 'rise');
      plan('.contact-elsewhere strong, .contact-elsewhere small', 'row', 80);
    },
  };
  for (const [page, profile] of Object.entries(profiles)) {
    if (doc.body.classList.contains(`page-${page}`)) profile();
  }

  function entryKey(element) {
    const entry = element.closest('[data-entry]');
    return entry ? `${entry.dataset.entry}:${element.tagName}` : '';
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
    const focused = doc.activeElement;
    return (focused && focused !== doc.body && focused !== doc.documentElement && related(element, focused)) || related(element, hashTarget());
  }
  function play(element, settings, delay) {
    markSeen(element);
    observer.unobserve(element);
    targets.delete(element);
    if (reduced.matches || mustShow(element)) return revealNow(element);
    const small = compact.matches;
    const styles = view.getComputedStyle(element);
    const base = styles.transform === 'none' ? '' : styles.transform;
    const shifts = {
      title: `translateY(${small ? 24 : 38}px)`,
      heading: `translateY(${small ? 20 : 30}px)`,
      rise: `translateY(${small ? 14 : 22}px)`,
      row: `translateX(${small ? -10 : -18}px)`,
      fade: '', verse: '',
    };
    const duration = { title: 1050, heading: 950, rise: 850, row: 800, fade: 900, verse: 1100 }[settings.kind];
    const opacity = Number(styles.opacity);
    element.dataset.revealState = 'running';
    try {
      const animation = element.animate([
        { opacity: 0, transform: `${base} ${shifts[settings.kind]}`.trim() || 'none' },
        { opacity, transform: base || 'none' },
      ], {
        duration: small ? duration * .9 : duration,
        delay: small ? Math.min(delay, 120) : Math.min(delay, 220),
        easing: 'cubic-bezier(.22,.65,.3,1)', fill: 'backwards',
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
