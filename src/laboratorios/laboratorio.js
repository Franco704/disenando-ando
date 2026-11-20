/* Monta un laboratorio interactivo (tipos en laboratorios/tipos.js) dentro de una lección. Expone DA.laboratorio. */
(() => {
  const { esc, $ } = DA.util;
  const { LABS } = window.GUIDE;

  function montar(el, cfg) {
    const fn = LABS[cfg.type];
    if (!fn) { el.innerHTML = `<p class="note warn">Laboratorio desconocido: ${esc(cfg.type)}</p>`; return; }
    el.innerHTML = `<section class="lab" aria-label="Laboratorio: ${esc(cfg.title)}">
      <header class="lab-head"><span class="estereotipo">«laboratorio»</span><h3 class="lab-title">${cfg.title}</h3></header>
      ${cfg.intro ? `<p class="lab-intro">${cfg.intro}</p>` : ''}
      <div class="lab-body"></div></section>`;
    try { fn($('.lab-body', el), cfg, { esc }); }
    catch (err) { $('.lab-body', el).innerHTML = `<p class="note warn">No se pudo iniciar el laboratorio: ${esc(err.message)}</p>`; console.error(err); }
  }

  DA.laboratorio = { montar };
})();
