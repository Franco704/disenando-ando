/* Navegación: barra superior, barra inferior (celular), temario lateral con búsqueda, hoja "Más", índice de la página,
   barra de lectura, tema claro/oscuro y atajos de teclado. Expone DA.nav. */
(() => {
  const { $, esc, norm, scrollToEl } = DA.util;
  const { UNITS, MODULES, LESSONS, lessonsOf, clases } = DA.ctx;
  const P = DA.progreso;
  const toc = $('#toc'), rail = $('#rail'), sidebar = $('#sidebar'), scrim = $('#scrim');
  const temBtn = $('[data-abrir="temario"]'), masBtn = $('#masBtn'), mas = $('#masSheet'), search = $('#search');
  const desktop = matchMedia('(min-width: 1100px)');

  // ---------- Temario lateral ----------
  function renderToc() {
    const q = norm(search.value.trim());
    const cur = DA.currentId?.() ?? '';
    let html = '', n = 0;
    for (const u of UNITS) {
      let mods = '';
      for (const mod of MODULES.filter((m) => m.unit === u.id)) {
        const items = LESSONS.map((l, i) => ({ l, i })).filter(({ l }) => l.module === mod.id);
        const visible = items.filter(({ l }) => !q || norm(`${l.title} ${l.keywords || ''} ${mod.title}`).includes(q));
        n += visible.length;
        if (!visible.length) continue;
        const open = q || visible.some(({ l }) => l.id === cur) || cur === `quiz/${mod.id}`;
        mods += `<details class="toc-mod" ${open ? 'open' : ''}>
          <summary><span class="toc-mod-t"><small>Unidad ${mod.tema}, ${clases(mod).toLowerCase()}</small>${mod.title}</span><span class="toc-count">${P.modDone(mod)}/${items.length}</span></summary>
          <ol>${visible.map(({ l, i }) => `<li><a class="toc-link${P.done.has(l.id) ? ' is-done' : ''}" href="#/${l.id}" data-id="${l.id}"><span class="n">${i + 1}</span><span class="t">${l.title}</span><span class="check" aria-hidden="true"></span>${P.done.has(l.id) ? '<span class="sr-only"> (completada)</span>' : ''}</a></li>`).join('')}
            ${q ? '' : `<li><a class="toc-link toc-quiz" href="#/quiz/${mod.id}" data-id="quiz/${mod.id}"><span class="n" aria-hidden="true">?</span><span class="t">Cuestionario del módulo</span>${P.best[mod.id] != null ? `<span class="toc-score">${P.best[mod.id]}%</span>` : ''}</a></li>`}
          </ol></details>`;
      }
      if (mods) html += `<section class="toc-unit" data-u="${u.id}"><h2><span class="estereotipo">«${u.title.toLowerCase()}»</span>${u.name}</h2>${mods}</section>`;
    }
    toc.innerHTML = n ? html : `<p class="toc-empty">No hay temas con “${esc(search.value)}”. Probá con otra palabra, por ejemplo “Experto” o “sprint”.</p>`;
    toc.querySelectorAll('.toc-link').forEach((a) => (a.dataset.id === cur ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current')));
  }

  function updateProgress() {
    const count = LESSONS.filter((l) => P.done.has(l.id)).length;
    const pct = `${(count / LESSONS.length) * 100}%`;
    document.querySelectorAll('[data-progreso-barra]').forEach((el) => (el.style.width = pct));
    document.querySelectorAll('[data-progreso-texto]').forEach((el) => (el.textContent = `${count} de ${LESSONS.length}`));
    const pending = P.reviewIds().length;
    document.querySelectorAll('[data-pendientes]').forEach((b) => { b.hidden = !pending; b.textContent = pending; });
  }

  // ---------- Paneles: temario (cajón) y "Más" (hoja inferior) ----------
  let returnFocus = null;
  function openPanel(panel, btn) {
    closePanels();
    returnFocus = document.activeElement;
    panel.classList.add('open');
    if (panel === mas) panel.hidden = false;
    scrim.hidden = false;
    btn?.setAttribute('aria-expanded', 'true');
    document.body.classList.add('con-panel');
  }
  function closePanels(restore) {
    const wasOpen = sidebar.classList.contains('open') || !mas.hidden;
    sidebar.classList.remove('open');
    mas.hidden = true;
    mas.classList.remove('open');
    scrim.hidden = true;
    document.querySelectorAll('[aria-controls="sidebar"], #masBtn').forEach((b) => b.setAttribute('aria-expanded', 'false'));
    document.body.classList.remove('con-panel');
    if (restore && wasOpen) returnFocus?.focus();
  }
  const openToc = (focusSearch) => {
    if (desktop.matches) { search.focus(); return; }
    openPanel(sidebar, temBtn);
    (focusSearch ? search : sidebar.querySelector('[aria-current], .toc-link'))?.focus({ preventScroll: !focusSearch });
    sidebar.querySelector('[aria-current]')?.scrollIntoView({ block: 'center' });
  };

  // Marca la sección actual en la barra superior, la inferior y la hoja "Más"
  function markSections(id) {
    const sec = id.split('/')[0];
    const isLesson = !!DA.ctx.lessonById[id] || sec === 'quiz';
    document.querySelectorAll('[data-sec]').forEach((a) => {
      const on = a.dataset.sec === sec || (a.dataset.sec === 'temario' && isLesson) || (a.dataset.sec === '' && id === '');
      on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current');
    });
    const masOn = [...mas.querySelectorAll('[data-sec]')].some((a) => a.hasAttribute('aria-current'));
    masBtn.toggleAttribute('data-activo', masOn);
  }

  // ---------- Índice de la página: columna derecha en escritorio, desplegable al principio en celular ----------
  function indicePagina(hs, { titulo = 'En esta página', despues, sub = (h) => h.tagName === 'H3' } = {}) {
    if (hs.length < 3) return;
    // El texto del título sin su «estereotipo»
    const label = (h) => { const c = h.cloneNode(true); c.querySelectorAll('.estereotipo').forEach((e) => e.remove()); return c.textContent.trim(); };
    hs.forEach((h, i) => { if (!h.id) h.id = `s-${i}-${norm(label(h)).replace(/[^a-z0-9]+/g, '-').slice(0, 40)}`; });
    const list = `<ol>${hs.map((h) => `<li${sub(h) ? ' class="sub"' : ''}><a href="#${h.id}" data-target="${h.id}">${label(h)}</a></li>`).join('')}</ol>`;
    rail.innerHTML = `<p>${titulo}</p>${list}`;
    if (despues) despues.insertAdjacentHTML('afterend', `<details class="en-pagina"><summary>${titulo} <span>${hs.length} secciones</span></summary>${list}</details>`);
    document.querySelectorAll('#rail a, .en-pagina a').forEach((a) => a.addEventListener('click', (e) => {
      e.preventDefault();
      a.closest('details')?.removeAttribute('open');
      scrollToEl(document.getElementById(a.dataset.target));
    }));
    const links = new Map([...rail.querySelectorAll('a')].map((a) => [a.dataset.target, a]));
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.removeAttribute('aria-current'));
      const a = links.get(en.target.id);
      a?.setAttribute('aria-current', 'true');
      a?.scrollIntoView({ block: 'nearest' });
    }), { rootMargin: '0px 0px -70% 0px' });
    hs.forEach((h) => io.observe(h));
    DA.alSalir(() => io.disconnect());
  }

  // ---------- Barra de lectura: cuánto de la página llevás leído ----------
  const readBar = $('#readBar');
  let ticking = false;
  const updateRead = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    readBar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(updateRead); } }, { passive: true });

  function iniciar() {
    temBtn.addEventListener('click', () => (sidebar.classList.contains('open') ? closePanels(true) : openToc()));
    $('#searchBtn').addEventListener('click', () => openToc(true));
    masBtn.addEventListener('click', () => (mas.hidden ? (openPanel(mas, masBtn), mas.querySelector('a')?.focus()) : closePanels(true)));
    scrim.addEventListener('click', () => closePanels(true));
    mas.addEventListener('click', (e) => { if (e.target.closest('a')) closePanels(); });
    desktop.addEventListener('change', () => closePanels());
    search.addEventListener('input', renderToc);

    document.querySelectorAll('[data-act="tema"]').forEach((b) => b.addEventListener('click', () => {
      const root = document.documentElement;
      const isDark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      root.dataset.theme = isDark ? 'light' : 'dark';
      try { localStorage.setItem('dsi-theme', root.dataset.theme); } catch {}   // texto plano: lo lee el script del <head> antes de pintar
    }));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { closePanels(true); return; }
      if (e.target.closest('input, textarea, select, [contenteditable]') || e.altKey || e.ctrlKey || e.metaKey) return;
      const idx = LESSONS.findIndex((l) => l.id === DA.currentId());
      if (e.key === 'ArrowRight' && idx > -1 && idx < LESSONS.length - 1) location.hash = `#/${LESSONS[idx + 1].id}`;
      if (e.key === 'ArrowLeft' && idx > 0) location.hash = `#/${LESSONS[idx - 1].id}`;
      if (e.key === '/') { e.preventDefault(); openToc(true); }
    });

    P.onChange(() => { updateProgress(); renderToc(); });
    updateProgress();
  }

  DA.nav = {
    iniciar,
    indicePagina,
    antesDeDibujar() { rail.innerHTML = ''; closePanels(); },
    despuesDeDibujar(id) { renderToc(); markSections(id); updateRead(); },
  };
})();
