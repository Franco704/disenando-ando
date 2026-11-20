/* Galería de diagramas (#/diagramas): todas las figuras de las lecciones en un solo lugar, por parcial. */
(() => {
  const { $ } = DA.util;
  const { UNITS, LESSONS, modOf } = DA.ctx;
  const main = $('#main');

  function render() {
    document.title = 'Diagramas, Diseñando Ando';
    const all = LESSONS.flatMap((l) => [...l.body.matchAll(/<figure class="fig">[\s\S]*?<\/figure>/g)].map((m) => ({ html: m[0], l, m: modOf(l.module) })));
    main.innerHTML = `
      <article class="page graphs-page">
        <header class="page-head">
          <p class="crumb"><span class="estereotipo">«para el parcial»</span></p>
          <h1>Diagramas</h1>
          <p class="tldr">Los ${all.length} diagramas de la guía en un solo lugar. Para repasar: tapá el epígrafe, <mark>explicá el diagrama en voz alta</mark> y después leelo para comprobar. En la parte práctica del parcial vas a tener que dibujar varios de estos.</p>
        </header>
        ${UNITS.map((u) => `<section class="graph-unit" data-u="${u.id}"><h2><span class="estereotipo">«${u.title.toLowerCase()}»</span>${u.name}</h2>
          ${all.filter((x) => x.m.unit === u.id).map((x) => `<div class="graph-item"><p class="graph-from">Unidad ${x.m.tema}: <a href="#/${x.l.id}">${x.l.title}</a></p>${x.html}</div>`).join('')}
        </section>`).join('')}
      </article>`;
    DA.nav.indicePagina([...main.querySelectorAll('.graph-unit > h2')], { despues: $('.page-head', main) });
  }

  DA.vistas.push({ test: (id) => id === 'diagramas', render });
})();
