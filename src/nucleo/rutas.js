/* Rutas por hash (#/<id>) y arranque. Último script de index.html: para entonces todas las vistas ya se registraron en DA.vistas.
   Cada vista: { test(id) → bool, render(id) }; la portada se registra con fallback: true. */
(() => {
  const { $ } = DA.util;
  const main = $('#main');
  const currentId = () => decodeURIComponent(location.hash.replace(/^#\/?/, ''));
  // Tareas a deshacer al salir de una página (relojes, observadores)
  const cleanups = [];
  DA.currentId = currentId;
  DA.alSalir = (fn) => cleanups.push(fn);

  let firstLoad = true;
  async function route() {
    const id = currentId();
    // Pantalla de entrada al cambiar de módulo; si mientras tanto cambió el hash, gana la ruta nueva
    if (DA.ctx.lessonById[id]) { await window.ANIM.intro(id, firstLoad); if (currentId() !== id) return; }
    firstLoad = false;
    cleanups.splice(0).forEach((fn) => fn());
    document.body.dataset.view = 'page';
    delete document.body.dataset.unit;
    DA.nav.antesDeDibujar();
    const vista = DA.vistas.find((v) => v.test(id)) || DA.vistas.find((v) => v.fallback);
    vista.render(id);
    DA.nav.despuesDeDibujar(id);
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }
  DA.route = route;

  window.addEventListener('hashchange', route);
  DA.nav.iniciar();
  route();
})();
