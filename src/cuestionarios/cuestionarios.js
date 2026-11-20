/* Cuestionarios: el componente de preguntas (DA.cuestionario.render) y las vistas que lo usan:
   cuestionario de módulo (#/quiz/<módulo>), repaso de falladas (#/repaso) y simulacro por parcial (#/simulacro/<parcial>). */
(() => {
  const { $, shuffle } = DA.util;
  const { UNITS, MODULES, QUESTIONS, qById, modOf, lessonsOf } = DA.ctx;
  const P = DA.progreso;
  const main = $('#main');
  const letters = 'ABCDEF';

  // mode 'inline': corrige cada pregunta al responder. 'exam': corrige todo al final. 'review': como inline, con la lección de origen.
  function render(el, qs, { mode, onFinish, from = true } = {}) {
    // Las opciones se muestran en orden aleatorio para que la posición no delate la respuesta
    const order = Object.fromEntries(qs.map((q) => [q.id, shuffle(q.o.map((_, i) => i))]));
    el.innerHTML = `<ol class="quiz ${mode}">${qs.map((q, n) => `
      <li class="q" data-id="${q.id}">
        <fieldset>
          <legend><span class="q-n">${n + 1}.</span> ${q.q}${(mode === 'exam' || mode === 'review') && from ? `<span class="q-from">${q.lesson.title}</span>` : ''}</legend>
          <div class="q-opts">${order[q.id].map((i, k) => `
            <label class="opt"><input type="radio" name="q-${q.id}" value="${i}"><span class="opt-l" aria-hidden="true">${letters[k]}</span><span class="opt-t">${q.o[i]}</span></label>`).join('')}
          </div>
          <div class="q-feedback" aria-live="polite"></div>
        </fieldset>
      </li>`).join('')}</ol>
      ${mode === 'exam' ? '<div class="exam-actions"><button class="btn primary" type="button" data-act="grade">Corregir</button><p class="exam-left"></p></div><div class="exam-result" aria-live="polite"></div>' : ''}`;

    const showFeedback = (li, q, chosen) => {
      const ok = chosen === q.a;
      li.classList.add(ok ? 'is-ok' : 'is-bad');
      li.querySelectorAll('.opt').forEach((lab) => {
        const input = lab.querySelector('input');
        const i = +input.value;
        if (i === q.a) lab.classList.add('right');
        else if (i === chosen) lab.classList.add('wrong');
        input.disabled = true;
      });
      const correct = letters[order[q.id].indexOf(q.a)];
      li.querySelector('.q-feedback').innerHTML = `<p><strong>${ok ? 'Correcto.' : chosen < 0 ? `Sin responder: la respuesta es la ${correct}.` : `Incorrecto: la respuesta es la ${correct}.`}</strong> ${q.e || ''}</p>
        ${!ok ? `<p class="q-link"><a href="#/${q.lesson.id}">Releer “${q.lesson.title}”</a></p>` : ''}`;
      return ok;
    };

    if (mode !== 'exam') {
      el.querySelectorAll('.q').forEach((li) => {
        const q = qById[li.dataset.id];
        li.addEventListener('change', (e) => P.record(q, showFeedback(li, q, +e.target.value)));
      });
      return;
    }

    const left = $('.exam-left', el);
    const updateLeft = () => {
      const n = el.querySelectorAll('.q input:checked').length;
      left.textContent = n < qs.length ? `Respondiste ${n} de ${qs.length}.` : 'Respondiste todas.';
    };
    el.addEventListener('change', updateLeft);
    updateLeft();
    $('[data-act="grade"]', el).addEventListener('click', (e) => {
      let ok = 0;
      const byMod = {};
      el.querySelectorAll('.q').forEach((li) => {
        const q = qById[li.dataset.id];
        const chosen = li.querySelector('input:checked');
        const good = showFeedback(li, q, chosen ? +chosen.value : -1);
        P.record(q, good);
        ok += good;
        (byMod[q.module] ||= { ok: 0, n: 0 }).n++;
        if (good) byMod[q.module].ok++;
      });
      const pct = Math.round((ok / qs.length) * 100);
      e.currentTarget.remove();
      left.remove();
      const C = 2 * Math.PI * 52;   // circunferencia del anillo
      const rows = Object.entries(byMod).map(([m, r]) => `<li><span>${modOf(m).title}</span><span>${r.ok} de ${r.n}</span></li>`).join('');
      $('.exam-result', el).innerHTML = `
        <div class="score ${pct >= 60 ? 'pass' : 'fail'}">
          <svg class="ring" viewBox="0 0 120 120" role="img" aria-label="${pct}% de respuestas correctas"><circle class="bg" cx="60" cy="60" r="52"/><circle class="fg" cx="60" cy="60" r="52" style="--c:${C};stroke-dasharray:${C};stroke-dashoffset:${C * (1 - pct / 100)}"/><text x="60" y="69">${pct}%</text></svg>
          <p>${ok} de ${qs.length} correctas. ${pct >= 80 ? 'Muy bien: este tema está firme.' : pct >= 60 ? 'Aprobado, pero repasá las que fallaste.' : 'Todavía no: volvé a las lecciones marcadas y repetí.'}</p>
          ${Object.keys(byMod).length > 1 ? `<ul class="score-mods">${rows}</ul>` : ''}
          <p><a class="btn" href="#/${DA.currentId()}" data-act="again">Hacer otro intento</a></p>
        </div>`;
      $('[data-act="again"]', el).addEventListener('click', (ev) => { ev.preventDefault(); DA.route(); });
      onFinish?.(pct);
      $('.exam-result', el).scrollIntoView({ block: 'center' });
    });
  }
  DA.cuestionario = { render };

  // ---------- Cuestionario de módulo: 15 preguntas, primero las falladas y las nunca respondidas ----------
  DA.vistas.push({
    test: (id) => id.startsWith('quiz/') && !!modOf(id.slice(5)),
    render(id) {
      const mod = modOf(id.slice(5));
      document.title = `Cuestionario: ${mod.title}`;
      document.body.dataset.unit = mod.unit;
      const pool = QUESTIONS.filter((q) => q.module === mod.id);
      const weight = (q) => (P.answers[q.id]?.ok === false ? 0 : P.answers[q.id] ? 2 : 1);
      const qs = shuffle(pool).sort((a, b) => weight(a) - weight(b)).slice(0, 15);
      main.innerHTML = `
        <article class="page quiz-page">
          <p class="crumb"><span class="estereotipo">«cuestionario»</span> <a href="#/${lessonsOf(mod.id)[0].id}">Unidad ${mod.tema}: ${mod.title}</a></p>
          <h1>Cuestionario: ${mod.title}</h1>
          <p class="tldr">${qs.length} preguntas de las ${pool.length} del módulo. Aparecen primero las que fallaste y las que nunca respondiste.${P.best[mod.id] != null ? ` Tu mejor resultado: ${P.best[mod.id]}%.` : ''}</p>
          <div class="quiz-mount"></div>
        </article>`;
      render($('.quiz-mount', main), qs, { mode: 'exam', onFinish: (pct) => P.setBest(mod.id, pct) });
    },
  });

  // ---------- Repasar: las que respondiste mal la última vez ----------
  DA.vistas.push({
    test: (id) => id === 'repaso',
    render() {
      document.title = 'Repasar, Diseñando Ando';
      const qs = P.reviewIds().map((id) => qById[id]);
      main.innerHTML = `
        <article class="page quiz-page">
          <p class="crumb"><span class="estereotipo">«práctica personalizada»</span></p>
          <h1>Repasar</h1>
          ${qs.length ? `<p class="tldr">Estas son las ${qs.length} preguntas que respondiste mal la última vez. Cuando aciertes una, sale de la lista.</p><div class="quiz-mount"></div>`
            : `<p class="tldr">No tenés preguntas para repasar. Cada vez que falles una, en una lección o en un cuestionario, aparece acá para que la vuelvas a intentar.</p>
               <div class="acciones"><a class="btn primary" href="#/simulacro/p1">Hacer el simulacro del 1er parcial</a><a class="btn" href="#/simulacro/p2">Hacer el simulacro del 2do parcial</a></div>`}
        </article>`;
      if (qs.length) render($('.quiz-mount', main), qs, { mode: 'review' });
    },
  });

  // ---------- Simulacro: 20 preguntas repartidas entre los temas del parcial, corregidas al final ----------
  DA.vistas.push({
    test: (id) => id === 'simulacro' || id.startsWith('simulacro/'),
    render(id) {
      const unit = UNITS.find((u) => u.id === id.slice(10));
      if (!unit) { location.replace(`#/simulacro/${modOf(P.nextLesson().module).unit}`); return; }
      document.title = `Simulacro del ${unit.title.toLowerCase()}, Diseñando Ando`;
      document.body.dataset.unit = unit.id;
      const mods = MODULES.filter((m) => m.unit === unit.id);
      const byMod = mods.map((m) => shuffle(QUESTIONS.filter((q) => q.module === m.id))).filter((a) => a.length);
      const qs = [];
      for (let i = 0; qs.length < 20 && byMod.some((a) => a[i]); i++) byMod.forEach((a) => a[i] && qs.length < 20 && qs.push(a[i]));
      const other = UNITS.find((u) => u !== unit);
      main.innerHTML = `
        <article class="page quiz-page">
          <p class="crumb"><span class="estereotipo">«simulacro»</span> <a href="#/simulacro/${other.id}">Ir al simulacro del ${other.title.toLowerCase()}</a></p>
          <h1>Simulacro del ${unit.title.toLowerCase()}</h1>
          <p class="tldr">${qs.length} preguntas mezcladas de las unidades ${[...new Set(mods.map((m) => m.tema))].join(', ')} (${unit.name.toLowerCase()}). Respondé todas y corregí al final, como en el parcial. El parcial real tiene 5 preguntas teóricas y una parte práctica: practicá los ejercicios de cada lección y repasá los <a href="#/diagramas">diagramas</a>.</p>
          <div class="quiz-mount"></div>
        </article>`;
      render($('.quiz-mount', main), shuffle(qs), { mode: 'exam' });
    },
  });

  // Atajo usado por la lección: preguntas de una lección corregidas al instante
  DA.cuestionario.deLeccion = (l) => QUESTIONS.filter((q) => q.lesson === l);
})();
