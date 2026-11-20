/* Resúmenes de compañeros (#/resumenes/<id>), publicados con crédito a cada autor/a (GUIDE.RESUMENES en resumenes/datos.js).
   Se muestra uno por vez: son largos y así el índice de la página corresponde solo al que estás leyendo. */
(() => {
  const { $ } = DA.util;
  const { unitOf } = DA.ctx;
  const main = $('#main');

  function render(id) {
    const R = window.GUIDE.RESUMENES || [];
    const r = R.find((x) => x.id === id.slice('resumenes/'.length)) || R[0];
    document.title = `${r ? `${r.title} de ${r.author}` : 'Resúmenes'}, Diseñando Ando`;
    if (r) document.body.dataset.unit = r.unit;
    main.innerHTML = `
      <article class="page resumen-page">
        <header class="page-head">
          <p class="crumb"><span class="estereotipo">«para el parcial»</span></p>
          <h1>Resúmenes de compañeros</h1>
          <p class="tldr">Resúmenes escritos por estudiantes de la materia, tal como los armaron sus autores. Sirven para repasar de corrido; para cada tema en detalle, con ejercicios, andá a su lección.</p>
          <nav class="selector" aria-label="Elegí un resumen">${R.map((x) => `<a href="#/resumenes/${x.id}" data-u="${x.unit}"${x === r ? ' aria-current="page"' : ''}><span class="estereotipo">«${unitOf(x.unit).title.toLowerCase()}»</span><b>${x.author}</b></a>`).join('')}</nav>
        </header>
        ${r ? `<section data-u="${r.unit}">
          <div class="resumen-ficha"><h2>${r.title}</h2><p>por <strong>${r.author}</strong>. ${r.sub}.</p>${r.file ? `<a class="btn sm" href="${r.file}" download>Descargar el original (.${r.file.split('.').pop()})</a>` : ''}</div>
          <div class="body">${r.html}</div></section>` : '<p>Todavía no hay resúmenes cargados.</p>'}
      </article>`;
    DA.nav.indicePagina([...main.querySelectorAll('.body > h2, .body > h3')], { titulo: 'En este resumen', despues: $('.page-head', main) });
  }

  DA.vistas.push({ test: (id) => id === 'resumenes' || id.startsWith('resumenes/'), render });
})();
