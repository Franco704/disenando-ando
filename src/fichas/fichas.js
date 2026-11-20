/* Fichas (#/fichas): listas, clasificaciones y definiciones que el parcial pide de memoria, tema por tema (GUIDE.FICHAS). */
(() => {
  const { $ } = DA.util;
  const { UNITS, MODULES, lessonsOf } = DA.ctx;
  const main = $('#main');

  function render() {
    document.title = 'Fichas, Diseñando Ando';
    const F = window.GUIDE.FICHAS || [];
    main.innerHTML = `
      <article class="page formulas-page">
        <header class="page-head">
          <p class="crumb"><span class="estereotipo">«para el parcial»</span></p>
          <h1>Fichas</h1>
          <p class="tldr">Las listas, clasificaciones y definiciones que el parcial pide de memoria (“nombre las 4…”, “¿cuáles son los 3…?”), tema por tema. Tocá el nombre del tema para ir a su lección.</p>
        </header>
        ${UNITS.map((u) => `<section data-u="${u.id}"><h2><span class="estereotipo">«${u.title.toLowerCase()}»</span>${u.name}</h2>
          ${MODULES.filter((m) => m.unit === u.id && F.some((f) => f.m === m.id)).map((m) => `<h3><a href="#/${lessonsOf(m.id)[0].id}">Unidad ${m.tema}: ${m.title}</a></h3>
            <div class="cards">${F.filter((f) => f.m === m.id).map((f) => `<div class="card"><b>${f.n}</b><div class="f">${f.f}</div>${f.d ? `<p class="muted-s">${f.d}</p>` : ''}</div>`).join('')}</div>`).join('')}
        </section>`).join('')}
      </article>`;
    DA.nav.indicePagina([...main.querySelectorAll('.formulas-page h3')], { despues: $('.page-head', main), sub: () => false });
  }

  DA.vistas.push({ test: (id) => id === 'fichas', render });
})();
