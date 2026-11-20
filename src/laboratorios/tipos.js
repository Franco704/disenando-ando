/* Laboratorios genéricos: clasificar, ordenar, calculadora guiada y diagrama paso a paso. */
(() => {
  const L = window.GUIDE.LABS;
  const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  window.GUIDE.util = { shuffle };

  // Clasificar elementos en categorías con un selector por elemento
  // cfg: { buckets: [nombres], items: [{ t, b, why }] }
  L.classify = (el, cfg) => {
    const items = cfg.keepOrder ? cfg.items : shuffle(cfg.items);
    el.innerHTML = `
      <ol class="cls-list">${items.map((it, i) => `
        <li data-i="${i}">
          <span class="cls-t">${it.t}</span>
          <select aria-label="Categoría"><option value="">Elegí…</option>${cfg.buckets.map((b, j) => `<option value="${j}">${b}</option>`).join('')}</select>
          <p class="cls-why" hidden></p>
        </li>`).join('')}</ol>
      <div class="lab-row"><button class="btn sm primary" type="button" data-act="check">Comprobar</button><span class="lab-score" aria-live="polite"></span></div>`;
    el.querySelector('[data-act="check"]').addEventListener('click', () => {
      let ok = 0;
      el.querySelectorAll('.cls-list li').forEach((li) => {
        const it = items[+li.dataset.i];
        const v = li.querySelector('select').value;
        const good = v !== '' && +v === it.b;
        ok += good;
        li.className = v === '' ? '' : good ? 'is-ok' : 'is-bad';
        const why = li.querySelector('.cls-why');
        why.hidden = v === '';
        why.innerHTML = v === '' ? '' : `${good ? 'Bien.' : `Es <strong>${cfg.buckets[it.b]}</strong>.`} ${it.why || ''}`;
      });
      el.querySelector('.lab-score').innerHTML = `<span class="chip ${ok === items.length ? 'ok' : 'warn'}">${ok} de ${items.length} correctas</span>`;
    });
  };

  // Ordenar pasos con botones subir/bajar (accesible sin arrastrar)
  // cfg: { items: [en orden correcto], explain }
  L.order = (el, cfg) => {
    let cur = shuffle(cfg.items.map((t, i) => ({ t, i })));
    if (cur.every((x, k) => x.i === k)) cur.reverse();
    const draw = (checked) => {
      el.querySelector('.ord-list').innerHTML = cur.map((x, k) => `
        <li class="${checked ? (x.i === k ? 'is-ok' : 'is-bad') : ''}">
          <span class="ord-n">${k + 1}</span><span class="ord-t">${x.t}</span>
          <span class="ord-btns"><button type="button" class="icon-btn sm" data-up="${k}" aria-label="Subir" ${k === 0 ? 'disabled' : ''}>↑</button><button type="button" class="icon-btn sm" data-down="${k}" aria-label="Bajar" ${k === cur.length - 1 ? 'disabled' : ''}>↓</button></span>
        </li>`).join('');
    };
    el.innerHTML = `<ol class="ord-list"></ol>
      <div class="lab-row"><button class="btn sm primary" type="button" data-act="check">Comprobar el orden</button><span class="lab-score" aria-live="polite"></span></div>
      <div class="lab-explain" hidden>${cfg.explain || ''}</div>`;
    draw(false);
    el.querySelector('.ord-list').addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      const k = +(b.dataset.up ?? b.dataset.down);
      const j = b.dataset.up !== undefined ? k - 1 : k + 1;
      [cur[k], cur[j]] = [cur[j], cur[k]];
      draw(false);
      el.querySelector(`[data-${b.dataset.up !== undefined ? 'up' : 'down'}="${j}"]`)?.focus();
    });
    el.querySelector('[data-act="check"]').addEventListener('click', () => {
      draw(true);
      const ok = cur.filter((x, k) => x.i === k).length;
      el.querySelector('.lab-score').innerHTML = `<span class="chip ${ok === cur.length ? 'ok' : 'warn'}">${ok === cur.length ? 'Orden correcto' : `${ok} de ${cur.length} en su lugar`}</span>`;
      if (ok === cur.length) el.querySelector('.lab-explain').hidden = false;
    });
  };

  // Calculadora guiada: campos de entrada y una función que devuelve HTML (para fórmulas del dominio)
  // cfg: { fields: [{ id, label, type, value, options? }], run: (valores) => html }
  L.calc = (el, cfg) => {
    el.innerHTML = `<div class="calc-grid">${cfg.fields.map((f) => `
      <label>${f.label}${f.options ? `<select data-id="${f.id}">${f.options.map((o) => `<option ${o === f.value ? 'selected' : ''}>${o}</option>`).join('')}</select>`
        : `<input type="${f.type || 'number'}" data-id="${f.id}" value="${f.value}" step="any">`}</label>`).join('')}</div>
      <div class="lab-out calc-out" aria-live="polite"></div>`;
    const run = () => {
      const v = {};
      el.querySelectorAll('[data-id]').forEach((i) => (v[i.dataset.id] = i.type === 'number' ? parseFloat(i.value) : i.value));
      try { el.querySelector('.calc-out').innerHTML = cfg.run(v); } catch (e) { el.querySelector('.calc-out').textContent = e.message; }
    };
    el.addEventListener('input', run);
    run();
  };
  // Diagrama paso a paso: los elementos con data-s="k" aparecen en el paso k (data-s="0" siempre visible)
  // cfg: { fig: svg, steps: [{ k?: rótulo, t: explicación }] }
  L.steps = (el, cfg) => {
    let i = 0;
    const n = cfg.steps.length;
    el.innerHTML = `<div class="steps-fig">${cfg.fig}</div>
      <p class="steps-txt" aria-live="polite"></p>
      <div class="steps-bar">
        <button class="btn sm" type="button" data-act="prev">← Anterior</button>
        <button class="btn sm primary" type="button" data-act="next">Siguiente →</button>
        <button class="btn sm" type="button" data-act="all">Ver todo</button>
        <span class="steps-dots" aria-hidden="true">${cfg.steps.map(() => '<i></i>').join('')}</span>
      </div>`;
    const draw = () => {
      el.querySelectorAll('[data-s]').forEach((g) => {
        const s = +g.dataset.s;
        g.classList.toggle('is-hid', s > i + 1 && i < n);
        g.classList.toggle('cur', s === i + 1 && i < n);
      });
      const st = cfg.steps[Math.min(i, n - 1)];
      el.querySelector('.steps-txt').innerHTML = i >= n ? '<b class="k">Completo</b>Recorriste todos los pasos. Volvé a empezar y tratá de anticipar cada uno antes de tocar «Siguiente».' : `<b class="k">Paso ${i + 1} de ${n}${st.k ? ` · ${st.k}` : ''}</b>${st.t}`;
      el.querySelectorAll('.steps-dots i').forEach((d, k) => d.classList.toggle('on', k <= i));
      el.querySelector('[data-act="prev"]').disabled = i === 0;
      el.querySelector('[data-act="next"]').textContent = i >= n - 1 ? (i >= n ? 'Reiniciar' : 'Terminar') : 'Siguiente →';
    };
    el.addEventListener('click', (e) => {
      const a = e.target.closest('[data-act]')?.dataset.act;
      if (a === 'prev') i = Math.max(0, i - 1);
      if (a === 'next') i = i >= n ? 0 : i + 1;
      if (a === 'all') i = n;
      if (a) draw();
    });
    draw();
  };
})();
