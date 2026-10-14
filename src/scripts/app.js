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
        const reflection = item.querySelector('.word-reflection');
        if (!show && reflection) reflection.open = false;
        if (show && query && reflection?.querySelector('.reflection-body').textContent.toLocaleLowerCase().includes(query)) reflection.open = true;
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

  // Choose once per visit, never on a timer while someone is reading.
  const featuredSlot = document.querySelector('[data-featured-slot]');
  const featuredTemplate = document.querySelector('[data-featured-lines]');
  if (featuredSlot && featuredTemplate) {
    const cards = [...featuredTemplate.content.children];
    let previous = '';
    try { previous = sessionStorage.getItem('marginalia-last-line') || ''; } catch {}
    const pickLine = (announce = false) => {
      const candidates = cards.filter(card => card.dataset.featuredLine !== previous);
      const choice = (candidates.length ? candidates : cards)[Math.floor(Math.random() * (candidates.length || cards.length))];
      if (!choice) return;
      previous = choice.dataset.featuredLine;
      featuredSlot.replaceChildren(choice.cloneNode(true));
      try { sessionStorage.setItem('marginalia-last-line', previous); } catch {}
      if (announce) document.querySelector('[data-featured-status]').textContent = choice.querySelector('blockquote').textContent;
    };
    pickLine();
    const next = document.querySelector('[data-next-line]');
    if (next) { next.hidden = false; next.addEventListener('click', () => pickLine(true)); }
  }

  document.querySelectorAll('[data-artist]').forEach(button => button.addEventListener('click', () => {
    const name = button.dataset.artistName;
    document.querySelectorAll('[data-artist]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    document.querySelector('#record-artist').textContent = name;
    document.querySelector('#artist-name').textContent = name;
    document.querySelector('#artist-link').href = button.dataset.spotify;
    document.querySelectorAll('[data-artist-notes]').forEach(panel => { panel.hidden = panel.dataset.artistNotes !== button.dataset.artist; });
    document.querySelector('#artist-status').textContent = `${name} selected. Favourite songs updated below. Open this artist’s profile on Spotify.`;
  }));

  // All frames remain available when JavaScript is disabled.
  document.querySelectorAll('[data-demo-gallery]').forEach(gallery => {
    const buttons = [...gallery.querySelectorAll('[data-demo-select]')];
    const frames = [...gallery.querySelectorAll('[data-demo-frame]')];
    const select = index => {
      frames.forEach((frame, i) => { frame.hidden = i !== index; });
      buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    };
    buttons.forEach((button, index) => button.addEventListener('click', () => {
      select(index);
      gallery.querySelector('[data-demo-status]').textContent = 'Screen ' + (index + 1) + ' of ' + frames.length + ': ' + frames[index].querySelector('h3').textContent;
    }));
    select(0);
    gallery.querySelector('.demo-controls').hidden = false;
  });

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
