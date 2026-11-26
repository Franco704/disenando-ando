// Portada: un diagrama de colaboración dibujado con src/diagramas/uml.js, paso a paso, con el patrón GRASP que justifica cada mensaje;
// después, los dos parciales con sus temas y su avance, los parciales reales, el integral y las otras guías.
import { $ } from '../nucleo/dom.js';
import { uml } from '../diagramas/uml.js';
import { PARCIALES, MODULOS, LECCIONES, PREGUNTAS, PREGUNTAS_INTEGRAL, EXAMENES, EJERCICIOS, leccionesDe, modulosDe, etiqueta } from '../temario/indice.js';
import { hechas, hechasDe, aciertos, paraRepasar, siguienteLeccion } from '../estudio/progreso.js';
import { OTRAS_GUIAS } from '../estudio/otras-guias.js';
import { icono } from '../ui/iconos.js';

const REPO = 'https://github.com/Franco704/disenando-ando';

// Cada paso del diagrama de colaboración con el patrón GRASP que lo justifica (como se defiende en el parcial)
const PASOS = [
  ['El cajero dispara <code>efectuarPago(m)</code> y lo recibe <b>:Caja</b>.', 'Controlador: el primer objeto más allá de la interfaz que recibe el evento del sistema y lo coordina.'],
  ['<b>:Caja</b> no paga sola: le envía <code>1: efectuarPago(m)</code> a <b>:Alquiler</b>.', 'Experto y Bajo acoplamiento: el Alquiler conoce el importe y su estado, y la Caja no necesita conocer al Pago.'],
  ['<b>:Alquiler</b> crea el pago con <code>1.1: create(m)</code>.', 'Creador: el Alquiler registra el Pago y tiene los datos para inicializarlo, así que es quien lo crea.'],
];

// El diagrama, dibujado con las mismas funciones que los de las lecciones; data-s marca en qué paso aparece cada parte
function colaboracion() {
  return uml.svg(380, 250, `
    <g data-s="1"><circle cx="34" cy="128" r="9" class="u-box"/><path d="M34 137V160M20 146H48M34 160L22 178M34 160L46 178" class="u-ln"/><text x="34" y="196" class="u-c u-sm">Cajero</text></g>
    ${uml.obj(104, 112, 100, ':Caja', { cls: 'k-a', s: 1 })}
    ${uml.obj(250, 112, 110, ':Alquiler', { s: 2 })}
    ${uml.obj(250, 206, 110, ':Pago', { cls: 'k-ok', s: 3 })}
    <g data-s="1">${uml.ln([[52, 125], [104, 125]])}</g><g data-s="2">${uml.ln([[204, 125], [250, 125]])}</g><g data-s="3">${uml.ln([[305, 138], [305, 206]])}</g>
    ${uml.msg(50, 104, 98, 104, 'efectuarPago(m)', { anchor: 'start', lx: 12, ly: 94, s: 1 })}
    ${uml.msg(212, 104, 244, 104, '1: efectuarPago(m)', { lx: 236, ly: 70, s: 2 })}
    ${uml.msg(318, 150, 318, 196, '1.1: create(m)', { anchor: 'end', lx: 296, ly: 176, s: 3 })}`,
    'Diagrama de colaboración: el cajero efectúa el pago, la Caja lo delega en el Alquiler y el Alquiler crea el Pago');
}

function lamina(fig) {
  let paso = 1;
  const dibujar = () => {
    fig.querySelectorAll('svg [data-s]').forEach((g) => g.classList.toggle('futuro', +g.dataset.s > paso));
    fig.querySelectorAll('.colab-pasos li').forEach((li, i) => li.toggleAttribute('aria-current', i + 1 === paso));
    fig.querySelector('[data-mover="-1"]').disabled = paso === 1;
    fig.querySelector('[data-mover="1"]').disabled = paso === PASOS.length;
  };
  fig.addEventListener('click', (e) => {
    const b = e.target.closest('[data-mover], [data-paso]');
    if (!b) return;
    paso = b.dataset.paso ? +b.dataset.paso : Math.min(PASOS.length, Math.max(1, paso + +b.dataset.mover));
    dibujar();
  });
  dibujar();
}

function filaModulo(m) {
  const total = leccionesDe(m.id).length, h = hechasDe(m.id), a = aciertos(m.id);
  return `<li><a class="mod" href="#/${leccionesDe(m.id)[0].id}">
    <span class="mod-tag">${etiqueta(m)}</span>
    <span class="mod-tit">${m.title}</span>
    <span class="mod-blurb">${m.blurb[0].toUpperCase()}${m.blurb.slice(1)}.</span>
    <span class="mod-estado"><span class="mod-medidor" aria-hidden="true"><span style="width:${(h / total) * 100}%"></span></span><small>${h === total ? 'Completa' : h ? `${h} de ${total} lecciones` : `${total} lecciones`}${a != null ? `, ${a} % de aciertos` : ''}</small></span>
  </a></li>`;
}

export function vistaInicio(main) {
  document.title = 'Diseñando Ando, guía de Diseño de Sistemas de Información';
  const sigue = siguienteLeccion();
  const nLabs = LECCIONES.reduce((n, l) => n + (l.labs?.length || 0), 0);
  const nTP = EJERCICIOS.filter(({ ex }) => ex.official).length, nPx = EJERCICIOS.filter(({ ex }) => ex.exam).length;
  const repasar = paraRepasar().length;
  const flojo = MODULOS.map((m) => ({ m, s: aciertos(m.id) })).filter((x) => x.s != null && x.s < 70).sort((a, b) => a.s - b.s)[0];
  const cuantas = (u) => Math.min(20, modulosDe(u.id).reduce((n, m) => n + PREGUNTAS.filter((q) => q.module === m.id).length, 0));
  const unidades = (u) => [...new Set(modulosDe(u.id).map((m) => m.tema))].join(', ').replace(/, ([IVX]+)$/, ' y $1');

  main.innerHTML = `
    <article class="inicio">
      <section class="hero">
        <div class="hero-texto">
          <p class="hero-materia">Diseño de Sistemas de Información 2026, UTN-FRT</p>
          <h1>Quién hace qué, y por qué</h1>
          <p class="lede">Diseñar es repartir responsabilidades entre objetos y poder justificarlo con un patrón. La guía sigue a la cátedra (Sommerville, Larman, Booch, Kendall y Kendall): ${LECCIONES.length} lecciones con sus diagramas UML, ${nLabs} laboratorios, ${PREGUNTAS.length} preguntas, un integral de ${PREGUNTAS_INTEGRAL.length} preguntas y ${EJERCICIOS.length} ejercicios, ${nPx} de ellos de ${EXAMENES.length} parciales reales.</p>
          <div class="hero-acciones">
            <a class="btn primary" href="#/${sigue.id}">${hechas.size ? 'Seguir con' : 'Empezar con'} “${sigue.title}”</a>
            ${repasar ? `<a class="btn" href="#/repaso">Repasar ${repasar} ${repasar === 1 ? 'pregunta fallada' : 'preguntas falladas'}</a>` : '<a class="btn" href="#/parciales">Ver los parciales resueltos</a>'}
          </div>
          ${flojo ? `<p class="flojo">Tu punto más flojo por ahora es <a href="#/quiz/${flojo.m.id}">${flojo.m.title}</a>, con ${flojo.s} % de aciertos.</p>` : ''}
        </div>
        <figure class="colab">
          <div class="colab-dibujo">${colaboracion()}</div>
          <ol class="colab-pasos">${PASOS.map(([que, patron], i) => `<li><button type="button" data-paso="${i + 1}"><span>${que}</span><small>${patron}</small></button></li>`).join('')}</ol>
          <div class="colab-mover"><button class="btn sm" type="button" data-mover="-1">Paso anterior</button><button class="btn sm" type="button" data-mover="1">Paso siguiente</button></div>
          <figcaption>El diagrama de colaboración del pago, el corazón del segundo parcial, dibujado con las mismas funciones que los diagramas de las lecciones. <a href="#/diagramas">Ver todos los diagramas</a></figcaption>
        </figure>
      </section>

      <a class="reales" href="#/parciales">
        <span class="reales-n">${EXAMENES.length}</span>
        <span class="reales-t"><b>Parciales reales, resueltos</b>${EXAMENES.reduce((a, e) => a + e.items.length, 0)} consignas de 2018 a 2026, teóricas y prácticas con UML, y lo que más se repite.</span>
      </a>

      ${PARCIALES.map((u) => `
        <section class="parcial" data-u="${u.id}" aria-labelledby="t-${u.id}">
          <header class="parcial-cabeza">
            <h2 id="t-${u.id}">${u.title}<span>${u.name}</span></h2>
            <p>Unidades ${unidades(u)}.</p>
            <a class="btn sm" href="#/simulacro/${u.id}">Simulacro: ${cuantas(u)} preguntas</a>
          </header>
          <ul class="mods">${modulosDe(u.id).map(filaModulo).join('')}</ul>
        </section>`).join('')}

      <section class="practica" aria-labelledby="t-practica">
        <h2 id="t-practica">Para practicar</h2>
        <ul>
          ${[
            ['#/integral', 'integral', 'Integral', `${PREGUNTAS_INTEGRAL.length} preguntas que cruzan unidades y casos prácticos, con reloj de 90 minutos.`],
            ['#/resumenes', 'resumenes', 'Resúmenes', 'Escritos por compañeros, con crédito a cada autor.'],
            ['#/diagramas', 'diagramas', 'Diagramas', 'Todos los de la guía juntos, para explicarlos en voz alta.'],
            ['#/fichas', 'fichas', 'Fichas', 'Lo que el parcial pide de memoria, tema por tema.'],
            ['#/videos', 'video', 'Videos', 'Uno por lección, de corrido y separados por parcial.'],
            ['#/repaso', 'repasar', 'Repasar', 'Las preguntas que fallaste, hasta que las aciertes.'],
          ].map(([h, i, t, d]) => `<li><a href="${h}">${icono(i, 22)}<span><b>${t}</b>${d}</span></a></li>`).join('')}
        </ul>
      </section>

      <section class="como" aria-labelledby="t-como">
        <h2 id="t-como">Cómo estudiar con esta guía</h2>
        <ol>
          <li>Leé la teoría de cada lección en orden: cada tema se apoya en el anterior.</li>
          <li>Dibujá los diagramas en papel antes de mirar los de la guía: en la parte práctica del parcial hay que hacerlos.</li>
          <li>Respondé las preguntas del final. Las que falles van a la sección <a href="#/repaso">Repasar</a>.</li>
          <li>Resolvé los ejercicios de los TP y de los parciales antes de abrir la solución, y justificá cada decisión con su patrón.</li>
          <li>Al cerrar un tema, hacé su cuestionario. Antes de cada parcial, resolvé los <a href="#/parciales">parciales reales</a>, repasá las <a href="#/fichas">fichas</a> y hacé el simulacro; antes del final, el <a href="#/integral">integral</a>.</li>
        </ol>
        <p class="atajos">Atajos de teclado: <kbd>←</kbd> y <kbd>→</kbd> para moverte entre lecciones, <kbd>/</kbd> para buscar.</p>
      </section>

      <section class="otras" aria-labelledby="t-otras">
        <div class="repo">
          <div><h2>El código está abierto</h2><p>Si encontrás un error o querés proponer una pregunta, abrí un issue en el repositorio.</p></div>
          <a class="btn" href="${REPO}" target="_blank" rel="noopener">Ver el repositorio en GitHub</a>
        </div>
        <h2 id="t-otras">Otras guías de la UTN</h2>
        ${OTRAS_GUIAS.map((g) => `<h3>${g.anio}</h3><ul class="guias">${g.guias.map(([n, d, slug]) => `<li><a href="https://franco704.github.io/${slug}/" target="_blank" rel="noopener"><b>${n}</b><span>${d}</span></a><a class="guia-repo" href="https://github.com/Franco704/${slug}" target="_blank" rel="noopener" aria-label="Repositorio de ${n}">Repositorio</a></li>`).join('')}</ul>`).join('')}
      </section>
    </article>`;
  lamina($('.colab', main));
  return null;
}
