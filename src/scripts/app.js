(() => {
  const dialog = document.querySelector('#site-index');
  const openIndex = document.querySelector('.index-button');
  openIndex?.addEventListener('click', () => {
    dialog.showModal();
    document.documentElement.classList.add('index-open');
  });
  dialog?.querySelector('.close-index')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog?.addEventListener('close', () => document.documentElement.classList.remove('index-open'));

  const filters = [...document.querySelectorAll('[data-filter]')];
  const search = document.querySelector('#library-search');
  let currentFilter = 'All';
  const updateLibrary = () => {
    const query = (search?.value || '').trim().toLocaleLowerCase();
    let total = 0;
    document.querySelectorAll('.library-group').forEach(group => {
      const matchesCategory = currentFilter === 'All' || group.dataset.category === currentFilter;
      let visible = 0;
      group.querySelectorAll('[data-name]').forEach(item => {
        const show = matchesCategory && (item.dataset.search || item.dataset.name).includes(query);
        item.hidden = !show;
        const details = item.querySelector('details');
        if (!show && details) details.open = false;
        if (show && query && !item.dataset.name.includes(query) && details) details.open = true;
        if (show) visible++;
      });
      group.hidden = visible === 0;
      total += visible;
    });
    document.querySelector('#library-empty').hidden = total !== 0;
    document.querySelector('#library-status').textContent = `${total} ${total === 1 ? 'entry' : 'entries'} shown`;
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === currentFilter)));
  };
  filters.forEach(button => button.addEventListener('click', () => { currentFilter = button.dataset.filter; updateLibrary(); }));
  search?.addEventListener('input', updateLibrary);
  document.querySelector('#reset-library')?.addEventListener('click', () => { currentFilter = 'All'; search.value = ''; updateLibrary(); search.focus(); });

  document.querySelectorAll('[data-artist]').forEach(button => button.addEventListener('click', () => {
    const name = button.dataset.artistName;
    document.querySelectorAll('[data-artist]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    document.querySelector('#record-artist').textContent = name;
    document.querySelector('#artist-name').textContent = name;
    document.querySelector('#artist-link').href = button.dataset.spotify;
    document.querySelectorAll('[data-artist-notes]').forEach(panel => { panel.hidden = panel.dataset.artistNotes !== button.dataset.artist; });
    document.querySelector('#artist-status').textContent = `${name} selected. Favourite songs updated below. Open this artist’s profile on Spotify.`;
  }));

  const poetryFilters = [...document.querySelectorAll('[data-poetry-filter]')];
  document.querySelector('.poetry-filters')?.removeAttribute('hidden');
  poetryFilters.forEach(button => button.addEventListener('click', () => {
    const language = button.dataset.poetryFilter;
    let count = 0;
    document.querySelectorAll('[data-poem-language]').forEach(poem => {
      poem.hidden = language !== 'All' && poem.dataset.poemLanguage !== language;
      if (!poem.hidden) count++;
    });
    poetryFilters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    document.querySelector('#poetry-status').textContent = `${count} ${count === 1 ? 'poem' : 'poems'} shown${language === 'All' ? '' : ` in ${language}`}.`;
  }));

  const copyButton = document.querySelector('#copy-email');
  copyButton?.addEventListener('click', async () => {
    const status = document.querySelector('#global-status');
    try {
      await navigator.clipboard.writeText(copyButton.dataset.email);
      status.textContent = 'Email address copied.';
      copyButton.textContent = 'Copied ✓';
    } catch {
      status.textContent = `Copy this address: ${copyButton.dataset.email}`;
    }
    status.classList.add('visible');
    setTimeout(() => {status.classList.remove('visible'); copyButton.innerHTML = 'Copy email <span aria-hidden="true">⧉</span>';}, 4500);
  });
})();
