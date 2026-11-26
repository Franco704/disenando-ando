// Práctica con preguntas: cuestionario de un módulo, simulacro de cada parcial, repaso de lo fallado e integral con reloj.
import { $, shuffle } from '../nucleo/dom.js';
import { PARCIALES, PREGUNTAS, PREGUNTAS_INTEGRAL, INTEGRAL, preguntaPorId, parcial, leccionesDe, modulosDe, modulo } from '../temario/indice.js';
import { ejercicios } from './leccion.js';
import { montarCuestionario } from '../estudio/opcion-multiple.js';
import { respuestas, mejores, guardarMejor, paraRepasar, siguienteLeccion } from '../estudio/progreso.js';

// Primero las que fallaste, después las que nunca respondiste, al final las que acertaste
const peso = (q) => (respuestas[q.id]?.ok === false ? 0 : respuestas[q.id] ? 2 : 1);

export function vistaCuestionarioModulo(main, m) {
  document.title = `Cuestionario: ${m.title}`;
  document.body.dataset.unit = m.unit;
  const pool = PREGUNTAS.filter((q) => q.module === m.id);
  const qs = shuffle(pool).sort((a, b) => peso(a) - peso(b)).slice(0, 15);
  main.innerHTML = `
    <article class="lesson quiz-page">
      <p class="crumb"><a href="#/${leccionesDe(m.id)[0].id}">Unidad ${m.tema}: ${m.title}</a></p>
      <h1>Cuestionario del módulo</h1>
      <p class="tldr">${qs.length} preguntas de las ${pool.length} del módulo. Aparecen primero las que fallaste y las que nunca respondiste.${mejores[m.id] != null ? ` Tu mejor resultado: ${mejores[m.id]} %.` : ''}</p>
      <div class="quiz-mount"></div>
    </article>`;
  montarCuestionario($('.quiz-mount', main), qs, { mode: 'exam', onFinish: (pct) => guardarMejor(m.id, pct) });
}

export function vistaSimulacro(main, uid) {
  const u = parcial(uid);
  if (!u) { location.replace(`#/simulacro/${modulo(siguienteLeccion().module).unit}`); return; }
  document.title = `Simulacro ${u.title.toLowerCase()}, Diseñando Ando`;
  document.body.dataset.unit = u.id;
  const mods = modulosDe(u.id);
  // Reparte las preguntas entre las unidades para que ninguna domine
  const repartir = (pool, max) => {
    const porMod = mods.map((m) => shuffle(pool.filter((q) => q.module === m.id))).filter((a) => a.length);
    const out = [];
    for (let i = 0; out.length < max && porMod.some((a) => a[i]); i++) shuffle(porMod).forEach((a) => a[i] && out.length < max && out.push(a[i]));
    return out;
  };
  const qs = repartir(PREGUNTAS, 20);
  main.innerHTML = `
    <article class="lesson quiz-page">
      <nav class="filtro" aria-label="Elegir el simulacro">${PARCIALES.map((x) => `<a class="btn sm" data-u="${x.id}" href="#/simulacro/${x.id}"${x === u ? ' aria-current="page"' : ''}>${x.title}</a>`).join('')}<a class="btn sm" data-u="int" href="#/integral">Integral</a></nav>
      <h1>Simulacro del ${u.title.toLowerCase()}</h1>
      <p class="tldr">${qs.length} preguntas mezcladas de las unidades ${[...new Set(mods.map((m) => m.tema))].join(', ')} (${u.name.toLowerCase()}). Respondé todas y corregí al final, como en el parcial. El parcial real tiene 5 preguntas teóricas y una parte práctica con artefactos UML: practicala con los <a href="#/parciales">parciales resueltos</a>.</p>
      <div class="quiz-mount"></div>
    </article>`;
  montarCuestionario($('.quiz-mount', main), shuffle(qs), { mode: 'exam' });
}

export function vistaRepaso(main) {
  document.title = 'Repasar, Diseñando Ando';
  const ids = paraRepasar();
  const qs = ids.map((id) => preguntaPorId[id]);
  main.innerHTML = `
    <article class="lesson quiz-page">
      <h1>Repasar</h1>
      ${ids.length ? `<p class="tldr">${ids.length === 1 ? 'Esta es la pregunta que respondiste mal' : `Estas son las ${ids.length} preguntas que respondiste mal`} la última vez. Cuando aciertes una, sale de la lista.</p><div class="quiz-mount"></div>`
        : `<p class="tldr">No tenés preguntas pendientes. Cada vez que falles una, en una lección, un cuestionario o un simulacro, aparece acá para que la vuelvas a intentar.</p>
           <p class="acciones">${PARCIALES.map((u, i) => `<a class="btn${i ? '' : ' primary'}" href="#/simulacro/${u.id}">Simulacro del ${u.title.toLowerCase()}</a>`).join('')}<a class="btn" href="#/integral">Integral</a></p>`}
    </article>`;
  if (qs.length) montarCuestionario($('.quiz-mount', main), qs, { mode: 'review' });
}

// Integral: 25 preguntas difíciles de todo el año, casos prácticos y 90 minutos. Devuelve la limpieza del reloj.
export function vistaIntegral(main) {
  document.title = 'Integral, Diseñando Ando';
  document.body.dataset.unit = 'int';
  const qs = shuffle(PREGUNTAS_INTEGRAL).slice(0, 25);
  let reloj = null;
  const parar = () => { clearInterval(reloj); reloj = null; };
  main.innerHTML = `
    <article class="lesson quiz-page">
      <nav class="filtro" aria-label="Elegir el simulacro">${PARCIALES.map((x) => `<a class="btn sm" data-u="${x.id}" href="#/simulacro/${x.id}">${x.title}</a>`).join('')}<a class="btn sm" data-u="int" href="#/integral" aria-current="page">Integral</a></nav>
      <h1>Integral</h1>
      <p class="tldr">La instancia más exigente: <mark>${qs.length} preguntas de las seis unidades</mark>, elegidas al azar entre ${PREGUNTAS_INTEGRAL.length}, que cruzan temas y castigan las confusiones típicas. Después, ${INTEGRAL.cases.length} casos prácticos como los del final (UML y metodología de Larman).</p>
      <div class="note warn"><p><strong>Reglas.</strong> Tenés 90 minutos, como en el parcial. Para aprobar necesitás 60% y para promocionar, 70%, en la teoría y en la práctica por separado. Varias opciones son “casi correctas”: buscá la que es correcta <em>siempre</em>, no la que suena mejor.</p></div>
      <div class="reloj-fila"><button class="btn primary" type="button" data-act="reloj">Empezar el reloj</button><span class="reloj" role="timer" aria-label="Tiempo restante" hidden>90:00</span></div>
      <section class="check-sec"><h2>Parte teórica</h2><div class="quiz-mount"></div></section>
      <section class="practice"><h2>Parte práctica</h2><p class="sec-lede">Resolvé cada caso en papel, completo, antes de abrir la solución. Corregite con la grilla de la solución: cada ítem es un punto.</p>${ejercicios({ exercises: INTEGRAL.cases.map((c, i) => ({ ...c, tag: `Caso ${i + 1}`, level: 3 })) })}</section>
    </article>`;
  const mount = $('.quiz-mount', main);
  montarCuestionario(mount, qs, { mode: 'exam', from: false, onFinish: parar });
  $('[data-act="reloj"]', main).addEventListener('click', (e) => {
    e.currentTarget.remove();
    const t = $('.reloj', main);
    t.hidden = false;
    const fin = Date.now() + 90 * 60 * 1000;
    reloj = setInterval(() => {
      const queda = Math.max(0, fin - Date.now());
      t.textContent = `${String(Math.floor(queda / 60000)).padStart(2, '0')}:${String(Math.floor((queda % 60000) / 1000)).padStart(2, '0')}`;
      t.classList.toggle('poco', queda < 10 * 60 * 1000);
      if (!queda) { parar(); t.textContent = 'Tiempo cumplido'; $('[data-act="grade"]', mount)?.click(); }
    }, 1000);
  });
  return parar;
}
