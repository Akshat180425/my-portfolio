(() => {
  const root = document.querySelector('[data-collection]');
  if (!root) return;
  const items = JSON.parse(root.querySelector('#collection-data').textContent);
  const templates = new Map([...root.querySelector('#collection-cards').content.children].map(card => [card.dataset.entry, card]));
  const size = Number(root.dataset.pageSize);
  const base = new URL(root.querySelector('[data-collection-home]').href);
  const results = root.querySelector('#collection-results');
  const search = root.querySelector('#collection-search');
  const buttons = [...root.querySelectorAll('[data-collection-filter]')];
  const pager = root.querySelector('.collection-pagination');
  const title = root.querySelector('#collection-title');
  const status = root.querySelector('#collection-status');
  const filters = new Set(buttons.map(b => b.dataset.collectionFilter));
  let state;

  function readState() {
    const params = new URLSearchParams(location.search);
    const pathPage = location.pathname.slice(base.pathname.length).match(/^page\/(\d+)\/?$/)?.[1];
    const requested = Number(params.get('page') || pathPage || 1);
    return { q: params.get('q') || '', filter: filters.has(params.get('filter')) ? params.get('filter') : 'All', page: Number.isSafeInteger(requested) && requested > 0 ? requested : 1 };
  }

  function pageUrl(page) {
    const url = new URL(base);
    if (state.q || state.filter !== 'All') {
      if (state.q) url.searchParams.set('q', state.q);
      if (state.filter !== 'All') url.searchParams.set('filter', state.filter);
      if (page > 1) url.searchParams.set('page', String(page));
    } else if (page > 1) url.pathname += `page/${page}/`;
    return url.pathname + url.search;
  }

  function pageLink(page, label, current = false, rel = '') {
    const a = document.createElement('a');
    a.href = pageUrl(page);
    a.dataset.page = page;
    a.textContent = label;
    a.setAttribute('aria-label', /^\d+$/.test(label) ? `Page ${page}` : label);
    if (current) a.setAttribute('aria-current', 'page');
    if (rel) a.rel = rel;
    return a;
  }

  function render({ focus = false, historyMode = '' } = {}) {
    const query = state.q.trim().toLocaleLowerCase();
    const matching = items.filter(item => (state.filter === 'All' || item.category === state.filter) && item.search.toLocaleLowerCase().includes(query));
    const totalPages = Math.max(1, Math.ceil(matching.length / size));
    state.page = Math.min(state.page, totalPages);
    const start = (state.page - 1) * size;
    results.replaceChildren(...matching.slice(start, start + size).map(item => templates.get(item.slug).cloneNode(true)));
    if (query) results.querySelectorAll('.word-reflection').forEach(reflection => {
      if (reflection.querySelector('.reflection-body').textContent.toLocaleLowerCase().includes(query)) reflection.open = true;
    });
    root.querySelector('.collection-empty').hidden = matching.length !== 0;
    search.value = state.q;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.collectionFilter === state.filter)));
    status.textContent = matching.length ? `${start + 1}–${Math.min(start + size, matching.length)} of ${matching.length}${root.dataset.collection === 'poems' ? ' · Alphabetical' : ''}` : '0 matching pieces';
    pager.replaceChildren();
    if (totalPages > 1) {
      if (state.page > 1) pager.append(pageLink(state.page - 1, '← Previous', false, 'prev'));
      const numbers = document.createElement('span');
      numbers.className = 'page-numbers';
      const visible = [...new Set([1, state.page - 1, state.page, state.page + 1, totalPages])].filter(p => p > 0 && p <= totalPages).sort((a, b) => a - b);
      visible.forEach((p, i) => {
        if (i && p - visible[i - 1] > 1) {
          const gap = document.createElement('span');
          gap.textContent = '…'; gap.className = 'pagination-gap'; numbers.append(gap);
        }
        numbers.append(pageLink(p, String(p), p === state.page));
      });
      pager.append(numbers);
      if (state.page < totalPages) pager.append(pageLink(state.page + 1, 'Next →', false, 'next'));
    }
    if (historyMode) history[historyMode]({}, '', pageUrl(state.page));
    if (focus) { title.focus({ preventScroll: true }); title.scrollIntoView({ block: 'start' }); }
    document.dispatchEvent(new CustomEvent('portfolio:collection-rendered'));
  }

  function restore() {
    state = readState();
    // Stable IDs still resolve after a future addition or reorder.
    const hash = location.hash.slice(1);
    const index = items.findIndex(item => item.slug === hash);
    if (index >= 0) { state.q = ''; state.filter = 'All'; state.page = Math.floor(index / size) + 1; }
    render();
    if (index >= 0) requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ block: 'start' }));
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    state.filter = button.dataset.collectionFilter; state.page = 1;
    render({ historyMode: 'pushState' });
  }));
  search.addEventListener('input', () => {
    state.q = search.value; state.page = 1;
    render({ historyMode: 'replaceState' });
  });
  pager.addEventListener('click', event => {
    const a = event.target.closest('[data-page]');
    if (!a || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault(); state.page = Number(a.dataset.page);
    render({ focus: true, historyMode: 'pushState' });
  });
  root.querySelector('[data-reset-collection]').addEventListener('click', () => {
    state = { q: '', filter: 'All', page: 1 }; render({ historyMode: 'pushState' }); search.focus();
  });
  window.addEventListener('popstate', restore);
  root.querySelector('.collection-tools').hidden = false;
  restore();
})();
