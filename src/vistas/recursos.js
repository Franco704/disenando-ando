// Recursos para el parcial: parciales reales resueltos, fichas de memoria, resúmenes de compañeros, videos y la galería de diagramas.
import { $, irA } from '../nucleo/dom.js';
import { PARCIALES, MODULOS, LECCIONES, EXAMENES, EJERCICIOS, FICHAS, RESUMENES, examenPorId, modulo, parcial, leccionesDe, etiqueta } from '../temario/indice.js';
import { ejercicios } from './leccion.js';
import { pintarRiel } from '../ui/armazon.js';

const titulo = (u) => `<h2><span class="estereotipo">«${u.title.toLowerCase()}»</span>${u.name}</h2>`;
const saltos = (prefijo, lista) => `<nav class="filtro" aria-label="Ir a una sección">${lista.map((u) => `<a class="btn sm" href="#${prefijo}-${u.id}" data-salto data-u="${u.id}">${u.title}</a>`).join('')}</nav>`;
// Los saltos dentro de la página no cambian la ruta
const activarSaltos = (main) => main.querySelectorAll('[data-salto]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); irA($(a.getAttribute('href'), main)); }));

export function vistaParciales(main) {
  document.title = 'Parciales resueltos, Diseñando Ando';
  const conExamen = EJERCICIOS.filter(({ ex }) => ex.exam);
  const n = conExamen.reduce((a, { ex }) => a + ex.exam.length, 0);
  // Ranking: preguntas que aparecen en más de un parcial (un caso práctico resuelve varias consignas del mismo examen)
  const veces = (ex) => new Set(ex.exam.map((k) => k.split('#')[0])).size;
  const top = conExamen.filter(({ ex }) => veces(ex) > 1).sort((a, b) => veces(b.ex) - veces(a.ex));
  const porMod = MODULOS.map((m) => ({ m, k: conExamen.filter(({ l }) => l.module === m.id).reduce((a, { ex }) => a + ex.exam.length, 0) })).filter((x) => x.k).sort((a, b) => b.k - a.k);
  const max = porMod[0]?.k || 1;
  const item = (e, [num, texto]) => {
    const hit = conExamen.find(({ ex }) => ex.exam.includes(`${e.id}#${num}`));
    const m = hit && modulo(hit.l.module);
    return `<details class="exam-q"><summary><span class="exam-q-n">${num.replace(/^P/, 'Práctica ')}</span> ${texto}${m ? ` <small>${etiqueta(m)}</small>` : ''}</summary>
      ${hit ? `${ejercicios({ exercises: [hit.ex] })}<p class="q-link"><a href="#/${hit.l.id}">Ver la teoría: “${hit.l.title}”</a></p>` : '<p class="muted-s">Sin resolución cargada.</p>'}</details>`;
  };
  const cuerpo = (e) => {
    const teo = e.items.filter(([k]) => !k.startsWith('P')), pra = e.items.filter(([k]) => k.startsWith('P'));
    return `${e.note ? `<p class="muted-s">${e.note}</p>` : ''}${teo.length ? `<h4>Parte teórica</h4>${teo.map((it) => item(e, it)).join('')}` : ''}${pra.length ? `<h4>Parte práctica${e.caso ? `: ${e.caso}` : ''}</h4>${pra.map((it) => item(e, it)).join('')}` : ''}`;
  };
  const grupos = [...PARCIALES, { id: 'int', title: 'Integral', name: 'Recuperatorio integral' }].filter((u) => EXAMENES.some((e) => e.unit === u.id));
  main.innerHTML = `
    <article class="lesson exams-page">
      <h1>Parciales resueltos</h1>
      <p class="tldr">Los ${EXAMENES.length} parciales y recuperatorios de la cátedra que tenemos (2018 a 2026), pregunta por pregunta y resueltos como se espera en el examen: 5 preguntas teóricas y una parte práctica con artefactos UML. La cátedra repite mucho: empezá por las que <mark>se repiten</mark>.</p>
      ${saltos('px', grupos)}
      <h2>Lo que más se repite</h2>
      <ol class="freq">${top.map(({ ex, l }) => `<li><span class="n">×${veces(ex)}</span><span><a href="#/${l.id}">${ex.title}</a><small>${etiqueta(modulo(l.module))}. Tomada en ${[...new Set(ex.exam.map((k) => examenPorId[k.split('#')[0]]?.short))].join(', ')}</small></span></li>`).join('')}</ol>
      <h2>Qué temas pesan más</h2>
      <ol class="peso">${porMod.map(({ m, k }) => `<li data-u="${m.unit}"><a href="#/${leccionesDe(m.id)[0].id}">Unidad ${m.tema}: ${m.title}</a><span class="peso-barra" style="--p:${k / max}" aria-hidden="true"></span><small>${k} ${k === 1 ? 'pregunta' : 'preguntas'} de ${n}</small></li>`).join('')}</ol>
      ${grupos.map((u) => `<section data-u="${u.id}" id="px-${u.id}">${titulo(u)}
        ${EXAMENES.filter((e) => e.unit === u.id).map((e) => `<details class="exam-block"><summary><b>${e.title}</b><span>${e.sub}, ${e.items.length} consignas</span></summary>
          <div class="exam-body">${cuerpo(e)}</div></details>`).join('')}</section>`).join('')}
    </article>`;
  activarSaltos(main);
}

export function vistaFichas(main) {
  document.title = 'Fichas, Diseñando Ando';
  const conFichas = (u) => MODULOS.filter((m) => m.unit === u.id && FICHAS.some((f) => f.m === m.id));
  const lista = PARCIALES.filter((u) => conFichas(u).length);
  main.innerHTML = `
    <article class="lesson formulas-page">
      <h1>Fichas</h1>
      <p class="tldr">Las listas, clasificaciones y definiciones que el parcial pide de memoria (“nombre las 4…”, “¿cuáles son los 3…?”), tema por tema. Tocá el nombre del tema para ir a su lección.</p>
      ${saltos('f', lista)}
      ${lista.map((u) => `<section data-u="${u.id}" id="f-${u.id}">${titulo(u)}
        ${conFichas(u).map((m) => `<h3><a href="#/${leccionesDe(m.id)[0].id}">Unidad ${m.tema}: ${m.title}</a></h3>
          <dl class="fichas">${FICHAS.filter((f) => f.m === m.id).map((f) => `<div class="ficha"><dt>${f.n}</dt><dd><div class="f">${f.f}</div>${f.d ? `<small>${f.d}</small>` : ''}</dd></div>`).join('')}</dl>`).join('')}
      </section>`).join('')}
    </article>`;
  activarSaltos(main);
}

// #/resumenes/<id>: uno por vez, porque son largos y así el riel corresponde solo al que estás leyendo
export function vistaResumenes(main, id) {
  const r = RESUMENES.find((x) => x.id === id) || RESUMENES[0];
  document.title = `${r ? `${r.title} de ${r.author}` : 'Resúmenes'}, Diseñando Ando`;
  if (r) document.body.dataset.unit = r.unit;
  main.innerHTML = `
    <article class="lesson resumen-page">
      <h1>Resúmenes de compañeros</h1>
      <p class="tldr">Resúmenes escritos por estudiantes de la materia, tal como los armaron sus autores. Sirven para repasar de corrido; para cada tema en detalle, con ejercicios, andá a su lección.</p>
      <nav class="filtro" aria-label="Elegí un resumen">${RESUMENES.map((x) => `<a class="btn sm" href="#/resumenes/${x.id}" data-u="${x.unit}"${x === r ? ' aria-current="page"' : ''}>${x.author}, ${x.title.replace('Resumen del ', '')}</a>`).join('')}</nav>
      ${r ? `<section data-u="${r.unit}">
        <div class="resumen-ficha"><h2>${r.title}</h2><p>por <strong>${r.author}</strong>. ${r.sub}.</p>${r.file ? `<a class="btn sm" href="${r.file}" download>Descargar el original (.${r.file.split('.').pop()})</a>` : ''}</div>
        ${r.html ? `<div class="body">${r.html}</div>` : `<object class="resumen-pdf" data="${r.file}" type="application/pdf" aria-label="${r.title} de ${r.author}"><p>Tu navegador no muestra PDF acá. <a href="${r.file}" target="_blank" rel="noopener">Abrí el resumen en otra pestaña</a>.</p></object>`}</section>` : '<p>Todavía no hay resúmenes cargados.</p>'}
    </article>`;
  pintarRiel(main, [...main.querySelectorAll('.resumen-page .body > h2')], 'En este resumen');
}

// #/videos o #/videos/<lección>: todos de corrido, agrupados por parcial
export function vistaVideos(main, desde) {
  let cur = Math.max(LECCIONES.findIndex((l) => l.id === desde), 0);
  document.title = 'Videos de resumen, Diseñando Ando';
  const lista = PARCIALES.filter((u) => MODULOS.some((m) => m.unit === u.id));
  main.innerHTML = `
    <article class="lesson videos">
      <h1>Videos de resumen</h1>
      <p class="tldr">Un video corto por lección, separados por parcial. Se reproducen de corrido: cuando termina uno arranca el siguiente. Si algo no te cierra, abrí la lección de la que habla.</p>
      <div class="vid-player">
        <video controls playsinline preload="metadata"></video>
        <p class="vid-now"><span></span><a href="#/">Ir a la lección</a></p>
        <label class="vid-auto"><input type="checkbox" checked /> Reproducir el siguiente automáticamente</label>
      </div>
      ${lista.map((u) => `<section data-u="${u.id}">${titulo(u)}
        <ol class="vid-list">${LECCIONES.map((l, i) => ({ l, i })).filter(({ l }) => modulo(l.module).unit === u.id).map(({ l, i }) => `<li><button type="button" data-i="${i}"><span class="n">${i + 1}</span>${l.title}</button><a href="#/${l.id}" aria-label="Abrir la lección ${l.title}">Lección</a></li>`).join('')}</ol></section>`).join('')}
    </article>`;
  const video = $('video', main);
  const botones = [...main.querySelectorAll('.vid-list button')];
  const reproducir = (i, auto) => {
    cur = i;
    const l = LECCIONES[i];
    video.src = `videos/${l.id}.mp4`;
    if (auto) video.play().catch(() => {});
    document.body.dataset.unit = modulo(l.module).unit;
    $('.vid-now span', main).textContent = `${i + 1}. ${l.title}`;
    $('.vid-now a', main).href = `#/${l.id}`;
    botones.forEach((b) => b.toggleAttribute('aria-current', +b.dataset.i === i));
  };
  botones.forEach((b) => b.addEventListener('click', () => { reproducir(+b.dataset.i, true); video.scrollIntoView({ block: 'nearest' }); }));
  video.addEventListener('ended', () => { if ($('.vid-auto input', main).checked && cur < LECCIONES.length - 1) reproducir(cur + 1, true); });
  reproducir(cur, false);
}

// Galería: todas las figuras de las lecciones en un solo lugar, por parcial
export function vistaDiagramas(main) {
  document.title = 'Diagramas, Diseñando Ando';
  const todos = LECCIONES.flatMap((l) => [...l.body.matchAll(/<figure class="fig">[\s\S]*?<\/figure>/g)].map((m) => ({ html: m[0], l, m: modulo(l.module) })));
  const lista = PARCIALES.filter((u) => todos.some((x) => x.m.unit === u.id));
  main.innerHTML = `
    <article class="lesson labs-page">
      <h1>Diagramas</h1>
      <p class="tldr">Los ${todos.length} diagramas de la guía en un solo lugar. Para repasar: tapá el epígrafe, <mark>explicá el diagrama en voz alta</mark> y después leelo para comprobar. En la parte práctica del parcial vas a tener que dibujar varios de estos.</p>
      ${saltos('d', lista)}
      ${lista.map((u) => `<section class="labs-parcial" data-u="${u.id}" id="d-${u.id}">${titulo(u)}
        ${todos.filter((x) => x.m.unit === u.id).map((x) => `<div class="labs-item"><p class="labs-de">Unidad ${x.m.tema}: <a href="#/${x.l.id}">${x.l.title}</a></p>${x.html}</div>`).join('')}
      </section>`).join('')}
    </article>`;
  activarSaltos(main);
}
