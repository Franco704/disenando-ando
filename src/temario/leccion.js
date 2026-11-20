/* Lección (#/<id-de-lección>): teoría, laboratorios, preguntas de control, ejercicios, bibliografía y paso a la siguiente. */
(() => {
  const { $ } = DA.util;
  const { LESSONS, lessonById, lessonsOf, modOf, unitOf, clases } = DA.ctx;
  const P = DA.progreso;
  const main = $('#main');

  function renderSources(l) {
    return (l.sources || []).map((s) => `
      <details class="source">
        <summary><span>${s.title}</span><span class="host">${s.url ? new URL(s.url).hostname.replace('www.', '') : s.ref || ''}</span></summary>
        <div class="source-body">
          <ul>${s.points.map((p) => `<li>${p}</li>`).join('')}</ul>
          ${s.url ? `<p><a href="${s.url}" target="_blank" rel="noopener">Abrir la fuente</a></p>` : ''}
        </div>
      </details>`).join('');
  }

  function render(id) {
    const idx = LESSONS.findIndex((l) => l.id === id);
    const l = LESSONS[idx];
    const mod = modOf(l.module);
    const mods = lessonsOf(mod.id);
    const prev = LESSONS[idx - 1], next = LESSONS[idx + 1];
    const labs = l.labs || [];
    document.body.dataset.unit = mod.unit;
    document.title = `${l.title}, Diseñando Ando`;

    // Laboratorios no ubicados en el cuerpo se agregan al final de la teoría
    const where = l.body + (l.exercises || []).map((e) => e.prompt).join('');
    const placed = new Set([...where.matchAll(/data-lab="(\d+)"/g)].map((m) => +m[1]));
    const rest = labs.map((_, i) => i).filter((i) => !placed.has(i)).map((i) => `<div class="lab-mount" data-lab="${i}"></div>`).join('');
    const exercises = DA.ejercicios.render(l);
    const sources = renderSources(l);
    const quiz = DA.cuestionario.deLeccion(l);
    const resumenes = (window.GUIDE.RESUMENES || []).filter((r) => r.unit === mod.unit);
    const nInMod = mods.indexOf(l) + 1;

    main.innerHTML = `
      <article class="page lesson">
        <header class="lesson-head">
          <div class="lesson-glyph" aria-hidden="true">${window.ANIM.glyph(mod.id)}</div>
          <p class="crumb"><span class="estereotipo">«${unitOf(mod.unit).title.toLowerCase()}»</span> <a href="#/${mods[0].id}">Unidad ${mod.tema}: ${mod.title}</a></p>
          <h1>${l.title}</h1>
          <p class="lesson-meta"><span>${clases(mod)}</span><span>Lección ${nInMod} de ${mods.length} del módulo</span>${quiz.length ? `<a href="#comprobar" data-salto>${quiz.length} preguntas</a>` : ''}${l.exercises?.length ? `<a href="#ejercicios" data-salto>${l.exercises.length} ejercicio${l.exercises.length > 1 ? 's' : ''}</a>` : ''}</p>
          <p class="tldr">${l.tldr}</p>
          <details class="lesson-video"><summary>Ver el video resumen de esta lección</summary>
            <video controls playsinline preload="none" src="videos/${l.id}.mp4"></video>
            <a href="#/videos/${l.id}">Ver todos los videos de corrido desde acá</a></details>
          ${l.goals ? `<div class="goals"><p>Al terminar vas a poder:</p><ul>${l.goals.map((g) => `<li>${g}</li>`).join('')}</ul></div>` : ''}
        </header>
        <div class="body">${l.body}${rest}</div>
        ${resumenes.length ? `<aside class="otros-resumenes"><p>Este tema también está en los resúmenes de compañeros:</p><ul>${resumenes.map((r) => `<li><a href="#/resumenes/${r.id}">${r.title} de ${r.author}</a></li>`).join('')}</ul></aside>` : ''}
        ${quiz.length ? `<section class="check-sec" id="comprobar"><h2>Comprobá lo que entendiste</h2><p class="sec-lede">Elegí una respuesta: la corrección es inmediata. Lo que falles queda guardado para repasar.</p><div class="quiz-mount"></div></section>` : ''}
        ${exercises ? `<section class="practice" id="ejercicios"><h2>Ejercicios</h2><p class="sec-lede">Resolvelos en papel, con el diagrama, antes de abrir la solución. Equivocarse acá es gratis.</p>${exercises}</section>` : ''}
        ${sources ? `<section class="sources" id="bibliografia"><h2>Bibliografía</h2><p class="sec-lede">Qué dice cada fuente sobre este tema.</p>${sources}</section>` : ''}
        <div class="done-row">
          <button class="btn done-btn" id="doneBtn" type="button" aria-pressed="${P.done.has(l.id)}">${P.done.has(l.id) ? 'Lección completada' : 'Marcar como completada'}</button>
        </div>
        <nav class="pager" aria-label="Lecciones">
          ${prev ? `<a class="prev" href="#/${prev.id}"><small>Anterior</small><strong>${prev.title}</strong></a>` : '<span></span>'}
          ${next ? `<a class="next" href="#/${next.id}"><small>Siguiente</small><strong>${next.title}</strong></a>` : `<a class="next" href="#/quiz/${mod.id}"><small>Para cerrar</small><strong>Cuestionario del módulo</strong></a>`}
        </nav>
      </article>`;

    main.querySelectorAll('.lab-mount').forEach((el) => { const cfg = labs[+el.dataset.lab]; if (cfg) DA.laboratorio.montar(el, cfg); });
    if (quiz.length) DA.cuestionario.render($('.quiz-mount', main), quiz, { mode: 'inline' });
    main.querySelectorAll('[data-salto]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); DA.util.scrollToEl($(a.getAttribute('href'), main)); }));
    $('#doneBtn').addEventListener('click', (e) => {
      const on = P.toggleDone(l.id);
      e.currentTarget.setAttribute('aria-pressed', on);
      e.currentTarget.textContent = on ? 'Lección completada' : 'Marcar como completada';
    });
    DA.nav.indicePagina([...main.querySelectorAll('.lesson > .body > h2, .lesson > section > h2')], { titulo: 'En esta lección', despues: $('.lesson-head', main), sub: () => false });
  }

  DA.vistas.push({ test: (id) => !!lessonById[id], render });
})();
