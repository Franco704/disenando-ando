/* Ejercicios resueltos (de lecciones, parciales reales e integral): consigna, pistas y solución plegables. Expone DA.ejercicios. */
(() => {
  const { esc } = DA.util;
  const { examById } = DA.ctx;
  const LEVEL = { 1: 'Básico', 2: 'Intermedio', 3: 'Desafío' };

  // Parciales en los que se tomó la consigna, sin repetir examen
  const examChips = (list) => list.map((k) => examById[k.split('#')[0]]).filter(Boolean)
    .filter((e, i, a) => a.indexOf(e) === i).map((e) => `<a class="chip warn" href="#/parciales">${e.short}</a>`).join('');

  function render(l) {
    let practice = 0;
    return (l.exercises || []).map((ex) => {
      const s = ex.solution;
      const files = (s.files || []).map((f) => `
        <div class="sol-file">
          ${f.name ? `<p class="file-name">${f.name}</p>` : ''}
          <pre class="code" data-lang="${f.lang}">${esc(f.code.trim())}</pre>
        </div>`).join('');
      const tag = ex.tag || (ex.official ? `TP ${ex.official.split('.')[0]}, ejercicio ${ex.official.split('.')[1]}` : ex.exam ? 'Pregunta de parcial' : `Práctica ${++practice}`);
      const px = !ex.official && ex.exam;
      return `
        <article class="exercise${ex.official ? ' official' : px ? ' parcial' : ''}">
          <header class="ex-head">
            <span class="ex-tag">${tag}</span>
            ${ex.level ? `<span class="ex-level" data-level="${ex.level}">${LEVEL[ex.level]}</span>` : ''}
          </header>
          ${ex.exam ? `<p class="ex-exams"><span class="ex-exams-l">${ex.official ? 'También tomado en' : 'Tomado en'}</span>${examChips(ex.exam)}</p>` : ''}
          <h3>${ex.title}</h3>
          <div class="ex-prompt">${ex.prompt}</div>
          ${ex.hints ? `<details class="hint"><summary>Ver pistas</summary><ul>${ex.hints.map((h) => `<li>${h}</li>`).join('')}</ul></details>` : ''}
          <details class="solution">
            <summary>Ver solución</summary>
            <div class="sol-body">
              ${s.explain ? `<div class="sol-explain">${s.explain}</div>` : ''}
              ${files}
            </div>
          </details>
        </article>`;
    }).join('');
  }

  DA.ejercicios = { render };
})();
