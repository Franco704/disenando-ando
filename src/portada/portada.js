/* Portada (#/): una lámina de dibujo técnico con su cajetín (el avance del estudiante), el recorrido de los 19 temas,
   lo necesario para rendir y el temario completo. */
(() => {
  const { $ } = DA.util;
  const { UNITS, MODULES, LESSONS, EXAMS, INTEGRAL, INT_QS, QUESTIONS, EXS, lessonsOf, modOf, clases } = DA.ctx;
  const P = DA.progreso;
  const main = $('#main');
  // Guías hermanas: [nombre, materia, slug, año de la carrera]
  const SIBLINGS = [
    ['Integrando Ando', 'Análisis Matemático II (límites, derivadas, integrales múltiples, en 3D)', 'integrando-ando', 2],
    ['Operando Ando', 'Sistemas Operativos (procesos, planificación, memoria, archivos)', 'operando-ando', 2],
    ['Backeando Ando', 'Desarrollo de software backend (C#, ASP.NET, EF Core)', 'backeando-ando', 3],
    ['Fronteando Ando', 'Desarrollo frontend (HTML, CSS, JavaScript, React)', 'fronteando-ando', 3],
    ['Iterando Ando', 'Matemática Superior (Laplace, métodos numéricos, Fourier)', 'iterando-ando', 3],
    ['Modulando Ando', 'Comunicación de Datos (señales, Shannon, errores, modulación)', 'modulando-ando', 3],
    ['Probando Ando', 'Probabilidad y Estadística (Bayes, distribuciones, intervalos, tests)', 'probando-ando', 3],
    ['Economizar', 'Economía (micro y macro con gráficas)', 'economizar', 3],
  ];

  // El dibujo de la lámina: un diagrama de colaboración vivo, el corazón del 2do parcial
  function lamina() {
    const U = window.GUIDE.h.uml;
    return U.svg(380, 250, `
      <circle cx="34" cy="128" r="9" class="u-box"/><path d="M34 137V160M20 146H48M34 160L22 178M34 160L46 178" class="u-ln"/><text x="34" y="196" class="u-c u-sm">Cajero</text>
      ${U.obj(104, 112, 100, ':Caja', { cls: 'k-a' })}
      ${U.obj(250, 112, 110, ':Alquiler')}
      ${U.obj(250, 206, 110, ':Pago', { cls: 'k-ok' })}
      ${U.ln([[52, 125], [104, 125]])}${U.ln([[204, 125], [250, 125]])}${U.ln([[305, 138], [305, 206]])}
      ${U.msg(50, 104, 98, 104, 'efectuarPago(m)', { anchor: 'start', lx: 12, ly: 94 })}
      ${U.msg(212, 104, 244, 104, '1: efectuarPago(m)', { lx: 236, ly: 70 })}
      ${U.msg(318, 150, 318, 196, '1.1: create(m)', { anchor: 'end', lx: 296, ly: 176 })}
      <text x="154" y="34" class="u-sm u-c">según Controlador</text><path d="M154 40V108" class="u-ln u-dash"/>
      <text x="200" y="230" class="u-sm u-e">según Creador y</text><text x="200" y="243" class="u-sm u-e">Bajo Acoplamiento</text>`,
      'Diagrama de colaboración: el cajero efectúa el pago, la Caja lo delega en el Alquiler y el Alquiler crea el Pago');
  }

  function render() {
    document.title = 'Diseñando Ando: Diseño de Sistemas de Información';
    document.body.dataset.view = 'home';
    const resume = P.nextLesson();
    const doneN = LESSONS.filter((l) => P.done.has(l.id)).length;
    const nLabs = LESSONS.reduce((a, l) => a + (l.labs?.length || 0), 0);
    const nPx = EXS.filter(({ ex }) => ex.exam).length;
    const pending = P.reviewIds().length;
    const nP = (u) => QUESTIONS.filter((q) => modOf(q.module).unit === u).length;
    // Punto débil: módulo con peor resultado en preguntas respondidas
    const weak = MODULES.map((m) => ({ m, s: P.moduleScore(m.id) })).filter((x) => x.s != null).sort((a, b) => a.s - b.s)[0];

    // Un recorrido por parcial; el paquete marca el tema actual
    const stopOf = (m, i) => {
      const total = lessonsOf(m.id).length, d = P.modDone(m);
      const state = d === total ? 'done' : m.id === resume.module ? 'current' : '';
      return `<li class="stop ${state}" style="--p:${d / total}"><a href="#/${lessonsOf(m.id)[0].id}"${state === 'current' ? ' aria-current="step"' : ''}><span class="stop-dot" aria-hidden="true"></span><span class="stop-name">${m.stop}</span><span class="sr-only">: ${m.title}, ${d} de ${total} lecciones</span></a></li>`;
    };
    const routes = UNITS.map((u) => {
      const mods = MODULES.filter((m) => m.unit === u.id);
      const k = mods.findIndex((m) => m.id === resume.module);
      return `<div class="route-row" data-u="${u.id}"><p class="estereotipo">«${u.title.toLowerCase()}»</p><div class="route-scroll"><ol class="route${k < 0 ? ' sin-paquete' : ''}" style="--cols:${mods.length};--stop:${Math.max(k, 0)}">${mods.map(stopOf).join('')}</ol></div></div>`;
    }).join('');

    const units = UNITS.map((u) => `
      <section class="home-unit" data-u="${u.id}">
        <h2><span class="estereotipo">«${u.title.toLowerCase()}»</span>${u.name}</h2>
        <ol class="mod-list">${MODULES.filter((m) => m.unit === u.id).map((m) => {
          const total = lessonsOf(m.id).length, d = P.modDone(m), s = P.moduleScore(m.id);
          return `<li><a href="#/${lessonsOf(m.id)[0].id}">
            <span class="mod-n">Unidad ${m.tema}<span>${clases(m).toLowerCase()}</span></span>
            <span class="mod-title">${m.title}</span>
            <span class="mod-blurb">${total} lecciones: ${m.blurb}</span>
            <span class="mod-meta"><span class="mod-meter" aria-hidden="true"><span style="width:${(d / total) * 100}%"></span></span>${d === total ? 'Completo' : d ? `${d} de ${total} hechas` : 'Sin empezar'}${s != null ? `, ${s}% de aciertos` : ''}</span>
          </a></li>`;
        }).join('')}</ol>
      </section>`).join('');

    main.innerHTML = `
      <article class="home">
        <header class="hero">
          <div class="hero-txt">
            <p class="hero-materia">Diseño de Sistemas de Información, UTN&#8209;FRT 2026</p>
            <h1>Diseñar sistemas con criterio, no de memoria.</h1>
            <p class="lede">La teoría de la cátedra con los diagramas en el centro, los parciales reales resueltos y práctica corregida al instante. En la parte práctica del parcial hay que dibujar: acá se aprende a hacerlo.</p>
            <div class="acciones">
              <a class="btn primary grande" href="#/${resume.id}"><span>${doneN ? 'Seguir con' : 'Empezar con'}</span> <b>${resume.title}</b></a>
              ${pending ? `<a class="btn grande" href="#/repaso">Repasar ${pending} ${pending === 1 ? 'pregunta fallada' : 'preguntas falladas'}</a>` : ''}
            </div>
            ${weak && weak.s < 70 ? `<p class="weak">Tu tema más flojo por ahora es <a href="#/quiz/${weak.m.id}">${weak.m.title}</a>, con ${weak.s}% de aciertos. Conviene repasarlo antes de seguir.</p>` : ''}
          </div>
          <figure class="lamina">
            <div class="lamina-dibujo">${lamina()}</div>
            <dl class="cajetin">
              <div class="cj-titulo"><dt>Guía</dt><dd>Diseñando Ando</dd></div>
              <div><dt>Cátedra</dt><dd>Ing. Juan Pablo Bustos Thames</dd></div>
              <div><dt>Contenido</dt><dd>${LESSONS.length} lecciones, ${nLabs} laboratorios, ${QUESTIONS.length + INT_QS.length} preguntas</dd></div>
              <div class="cj-avance"><dt>Tu avance</dt><dd><span class="cj-barra" aria-hidden="true"><span data-progreso-barra></span></span><span data-progreso-texto>${doneN} de ${LESSONS.length}</span> lecciones</dd></div>
              <div><dt>Lámina</dt><dd>Colaboración: efectuarPago</dd></div>
            </dl>
          </figure>
        </header>

        <section class="recorrido" aria-labelledby="recorrido-h">
          <h2 id="recorrido-h">Tu recorrido</h2>
          <p class="sec-lede">Del requisito al sistema probado: los ${MODULES.length} temas en el orden de la cursada. El cuadrado marca por dónde vas.</p>
          ${routes}
        </section>

        <section class="rendir" aria-labelledby="rendir-h">
          <h2 id="rendir-h">Para rendir</h2>
          <ul class="rendir-list">
            ${UNITS.map((u) => `<li data-u="${u.id}"><a href="#/simulacro/${u.id}"><span class="estereotipo">«simulacro»</span><b>${u.title}</b><span>${Math.min(20, nP(u.id))} preguntas de ${nP(u.id)} sobre ${u.name.toLowerCase()}, corregidas al final</span></a></li>`).join('')}
            <li data-u="px"><a href="#/parciales"><span class="estereotipo">«parciales reales»</span><b>Lo que toma la cátedra</b><span>${EXAMS.length} parciales y recuperatorios de 2018 a 2026, ${nPx} preguntas resueltas y lo que más se repite</span></a></li>
            <li data-u="int"><a href="#/integral"><span class="estereotipo">«integral»</span><b>Dificultad máxima</b><span>${Math.min(25, INT_QS.length)} preguntas de todo el año y ${INTEGRAL.cases.length} casos prácticos, con reloj de 90 minutos</span></a></li>
          </ul>
          <ul class="material">
            <li><a href="#/resumenes"><b>Resúmenes</b><span>de compañeros, con sus diagramas</span></a></li>
            <li><a href="#/videos"><b>Videos</b><span>uno corto por lección</span></a></li>
            <li><a href="#/diagramas"><b>Diagramas</b><span>todos, para explicarlos en voz alta</span></a></li>
            <li><a href="#/fichas"><b>Fichas</b><span>lo que se pide de memoria</span></a></li>
          </ul>
        </section>

        ${units}

        <section class="home-how">
          <h2>Cómo estudiar con esta guía</h2>
          <ol>
            <li>Leé la teoría de cada lección en orden: cada tema se apoya en el anterior.</li>
            <li>En los laboratorios paso a paso, anticipá qué mensaje u objeto viene antes de tocar «Siguiente». Así se entrena la parte práctica.</li>
            <li>Respondé las preguntas del final. Las que falles van a <a href="#/repaso">Repasar</a>.</li>
            <li>Resolvé los ejercicios de los TP sin mirar la solución, con lápiz y papel, y dibujá el diagrama.</li>
            <li>Al cerrar un tema, hacé su cuestionario. Antes de cada parcial, resolvé los <a href="#/parciales">parciales reales</a> (sobre todo las preguntas que se repiten), el simulacro y las <a href="#/fichas">fichas</a>. Para el final o el recuperatorio integral, el <a href="#/integral">integral</a>.</li>
          </ol>
          <p class="kbd-line">En la compu: <kbd>←</kbd> <kbd>→</kbd> para moverte entre lecciones y <kbd>/</kbd> para buscar.</p>
        </section>

        <section class="home-links">
          <h2>Otras guías de la UTN</h2>
          ${[[2, '2.º año'], [3, '3.er año']].map(([a, t]) => `<h3>${t}</h3><ul class="also">${SIBLINGS.filter((s) => s[3] === a).map(([n, d, slug]) => `<li><a class="also-main" href="https://franco704.github.io/${slug}/" target="_blank" rel="noopener"><b>${n}</b><span>${d}</span></a><a class="also-repo" href="https://github.com/Franco704/${slug}" target="_blank" rel="noopener" aria-label="Repositorio de ${n}">Repositorio</a></li>`).join('')}</ul>`).join('')}
        </section>
      </article>`;

    // El recorrido: en celular se desplaza solo hasta el tema actual (sin mover la página); el paquete avanza una vez
    const cur = $('.stop.current', main), scroller = cur?.closest('.route-scroll');
    if (cur) scroller.scrollLeft = cur.offsetLeft - scroller.clientWidth / 2 + cur.offsetWidth / 2;
    requestAnimationFrame(() => main.querySelectorAll('.route').forEach((r) => r.classList.add('go')));
    document.querySelectorAll('[data-progreso-barra]').forEach((el) => (el.style.width = `${(doneN / LESSONS.length) * 100}%`));
  }

  DA.vistas.push({ test: (id) => id === '', fallback: true, render });
})();
