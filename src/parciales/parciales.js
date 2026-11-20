/* Parciales resueltos (#/parciales): cada consigna de los parciales reales con su resolución, lo que más se repite y qué temas pesan más. */
(() => {
  const { $ } = DA.util;
  const { UNITS, MODULES, EXAMS, EXS, examById, modOf, lessonsOf, clases } = DA.ctx;
  const main = $('#main');

  function render() {
    document.title = 'Parciales resueltos, Diseñando Ando';
    const withExam = EXS.filter(({ ex }) => ex.exam);
    const n = withExam.reduce((a, { ex }) => a + ex.exam.length, 0);
    // Ranking: preguntas que aparecen en más de un parcial (un caso práctico resuelve varias consignas del mismo examen)
    const times = (ex) => new Set(ex.exam.map((k) => k.split('#')[0])).size;
    const top = withExam.filter(({ ex }) => times(ex) > 1).sort((a, b) => times(b.ex) - times(a.ex));
    const byMod = MODULES.map((m) => ({ m, k: withExam.filter(({ l }) => l.module === m.id).reduce((a, { ex }) => a + ex.exam.length, 0) })).filter((x) => x.k).sort((a, b) => b.k - a.k);
    const maxK = byMod[0]?.k || 1;
    const item = (e, [num, text]) => {
      const hit = withExam.find(({ ex }) => ex.exam.includes(`${e.id}#${num}`));
      const m = hit && modOf(hit.l.module);
      return `<details class="exam-q"><summary><span class="exam-q-n">${num.replace(/^P/, 'Práctica ')}</span><span>${text}${m ? `<small>Unidad ${m.tema}, ${clases(m).toLowerCase()}</small>` : ''}</span></summary>
        ${hit ? `${DA.ejercicios.render({ exercises: [hit.ex] })}<p class="q-link"><a href="#/${hit.l.id}">Ver la teoría: “${hit.l.title}”</a></p>` : '<p class="muted-s">Sin resolución cargada.</p>'}</details>`;
    };
    const body = (e) => {
      const th = e.items.filter(([k]) => !k.startsWith('P')), pr = e.items.filter(([k]) => k.startsWith('P'));
      return `${e.note ? `<p class="muted-s">${e.note}</p>` : ''}${th.length ? `<h4>Parte teórica</h4>${th.map((it) => item(e, it)).join('')}` : ''}${pr.length ? `<h4>Parte práctica${e.caso ? `: ${e.caso}` : ''}</h4>${pr.map((it) => item(e, it)).join('')}` : ''}`;
    };
    const groups = [...UNITS, { id: 'int', title: 'Integral', name: 'Recuperatorio integral' }];
    main.innerHTML = `
      <article class="page exams-page">
        <header class="page-head">
          <p class="crumb"><span class="estereotipo">«para el parcial»</span></p>
          <h1>Parciales resueltos</h1>
          <p class="tldr">Los ${EXAMS.length} parciales y recuperatorios de la cátedra que tenemos (2018 a 2026), pregunta por pregunta y resueltos como se espera en el examen: 5 preguntas teóricas y una parte práctica con artefactos UML. La cátedra repite mucho: empezá por las que <mark>se repiten</mark>.</p>
        </header>
        <h2>Lo que más se repite</h2>
        <ol class="freq">${top.map(({ ex, l }) => { const m = modOf(l.module); return `<li><span class="n">×${times(ex)}</span><span><a href="#/${l.id}">${ex.title}</a><small>Unidad ${m.tema}, ${clases(m).toLowerCase()}. Tomada en ${[...new Set(ex.exam.map((k) => examById[k.split('#')[0]]?.short))].join(', ')}</small></span></li>`; }).join('')}</ol>
        <h2>Qué temas pesan más</h2>
        <ol class="peso">${byMod.map(({ m, k }) => `<li data-u="${m.unit}"><a href="#/${lessonsOf(m.id)[0].id}">Unidad ${m.tema}: ${m.title}</a><span class="peso-barra" aria-hidden="true"><span style="width:${(k / maxK) * 100}%"></span></span><span class="peso-n">${k} ${k === 1 ? 'pregunta' : 'preguntas'}</span></li>`).join('')}</ol>
        <p class="muted-s">Sobre ${n} consignas resueltas en total.</p>
        ${groups.map((u) => { const ex = EXAMS.filter((e) => e.unit === u.id); return ex.length ? `<section data-u="${u.id}"><h2><span class="estereotipo">«${u.title.toLowerCase()}»</span>${u.name}</h2>
          ${ex.map((e) => `<details class="exam-block"><summary><b>${e.title}</b><span>${e.sub}, ${e.items.length} consignas</span></summary>
            <div class="exam-body">${body(e)}</div></details>`).join('')}</section>` : ''; }).join('')}
      </article>`;
    DA.nav.indicePagina([...main.querySelectorAll('.exams-page > h2, .exams-page > section > h2')], { despues: $('.page-head', main), sub: () => false });
  }

  DA.vistas.push({ test: (id) => id === 'parciales', render });
})();
