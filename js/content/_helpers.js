/* Base del contenido: unidades (parciales), módulos (temas), array de lecciones y ayudantes para escribir lecciones.
   Cada lección: { id, module, title, keywords, tldr, goals?, body, labs?, exercises?, quiz?, sources? }
   - body puede incluir lab(i) para ubicar el laboratorio i dentro de la teoría.
   - labs: [{ type, title, ...config }] (los tipos se registran en js/labs/*.js)
   - exercises: { title, official? ('3.10' = TP 3, ejercicio 10), level (1-3), prompt, hints?, solution: { explain } }
   - quiz: [{ q, o: [opciones], a: índice correcto, e: explicación }]
   - sources: [{ title, ref?, url?, points: [] }] (ref = cita de libro, url = fuente web) */
(() => {
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const table = (head, rows) => `<div class="table-wrap"><table><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  // kind: '' (nota), 'tip', 'warn', 'exam' (lo que suele tomarse)
  const note = (html, kind = '') => `<div class="note ${kind}">${html.trim().startsWith('<') ? html : `<p>${html}</p>`}</div>`;
  const lab = (i) => `<div class="lab-mount" data-lab="${i}"></div>`;
  const flow = (...steps) => `<ol class="flow">${steps.map((s) => `<li>${s}</li>`).join('')}</ol>`;
  // Definición textual de la bibliografía
  const def = (term, text, source) => `<figure class="def"><figcaption>${term}</figcaption><blockquote><p>${text}</p></blockquote>${source ? `<p class="def-src">${source}</p>` : ''}</figure>`;
  // Diagrama SVG o HTML con epígrafe
  const fig = (inner, caption) => `<figure class="fig">${inner}${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;

  /* ---------- Diagramas UML y de bloques en SVG ----------
     Las puntas de flecha son marcadores globales definidos en index.html: ar (llena), op (abierta),
     tri (triángulo hueco: generalización y realización), dia / diao (rombo lleno / hueco), msg (mensaje).
     Todo elemento acepta s (número de paso) para el laboratorio 'steps'. */
  const S = (s) => (s != null ? ` data-s="${s}"` : '');
  const svg = (w, h, inner, alt) => `<svg class="uml" viewBox="0 0 ${w} ${h}" width="${w}" role="img" aria-label="${esc(alt || 'Diagrama')}">${inner}</svg>`;
  // Caja UML: título (subrayado si es instancia), estereotipo opcional y compartimentos de atributos y operaciones
  function box(x, y, w, title, o = {}) {
    const st = o.stereo ? 14 : 0, hd = 26 + st, lh = 16;
    const secs = [o.attrs, o.ops].filter((a) => a);
    const hgt = o.h || hd + secs.reduce((n, a) => n + Math.max(a.length, 1) * lh + 8, 0);
    let g = `<rect x="${x}" y="${y}" width="${w}" height="${hgt}" rx="${o.round ? 10 : 2}" class="${secs.length ? 'u-box' : o.flat ? 'u-box' : 'u-hd'}"/>`;
    if (secs.length) g += `<rect x="${x}" y="${y}" width="${w}" height="${hd}" rx="2" class="u-hd"/>`;
    if (o.stereo) g += `<text x="${x + w / 2}" y="${y + 14}" class="u-st">«${o.stereo}»</text>`;
    g += `<text x="${x + w / 2}" y="${y + st + 17}" class="u-tt${o.under ? ' u-un' : ''}${o.italic ? '" font-style="italic' : ''}">${title}</text>`;
    let cy = y + hd;
    for (const a of secs) {
      g += `<line x1="${x}" y1="${cy}" x2="${x + w}" y2="${cy}" class="u-sep"/>`;
      a.forEach((t, i) => (g += `<text x="${x + 8}" y="${cy + 15 + i * lh}">${t}</text>`));
      cy += Math.max(a.length, 1) * lh + 8;
    }
    return `<g class="${o.cls || ''}"${S(o.s)}>${g}</g>`;
  }
  const obj = (x, y, w, title, o = {}) => box(x, y, w, title, { ...o, under: true });
  // Bloque de arquitectura: rectángulo redondeado con texto centrado (\n para varias líneas)
  function blk(x, y, w, h, text, o = {}) {
    const lines = String(text).split('\n');
    const t = lines.map((l, i) => `<tspan x="${x + w / 2}" dy="${i ? 15 : 0}">${l}</tspan>`).join('');
    return `<g${S(o.s)}><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 8}" class="${o.lyr ? 'u-lyr' : 'u-blk'} ${o.cls || ''}"/><text x="${x + w / 2}" y="${y + h / 2 + 4 - (lines.length - 1) * 7.5}" class="u-c u-sans${o.bold === false ? '' : ' u-b'}">${t}</text>${o.sub ? `<text x="${x + w / 2}" y="${y + h - 8}" class="u-c u-sm">${o.sub}</text>` : ''}</g>`;
  }
  // Línea por puntos [[x,y],...] con marcador final (end) y opcionalmente inicial (start)
  const ln = (pts, o = {}) => `<path d="M${pts.map((p) => p.join(' ')).join('L')}" class="u-ln ${o.dash ? 'u-dash ' : ''}${o.cls || ''}"${o.end ? ` marker-end="url(#m-${o.end})"` : ''}${o.start ? ` marker-start="url(#m-${o.start})"` : ''}${S(o.s)}/>`;
  const tx = (x, y, t, o = {}) => `<text x="${x}" y="${y}" class="${o.cls || ''}${o.anchor === 'middle' ? ' u-c' : o.anchor === 'end' ? ' u-e' : ''}"${S(o.s)}>${t}</text>`;
  // Mensaje de un diagrama de colaboración: flecha corta animada y su etiqueta
  const msg = (x1, y1, x2, y2, label, o = {}) => `<g${S(o.s)}><path d="M${x1} ${y1}L${x2} ${y2}" class="u-msg u-flow" marker-end="url(#m-msg)"/><text x="${o.lx ?? (x1 + x2) / 2}" y="${o.ly ?? (y1 + y2) / 2 - 7}" class="u-msgt${o.anchor === 'start' ? '' : o.anchor === 'end' ? ' u-e' : ' u-c'}">${label}</text></g>`;
  // Interfaz proporcionada (círculo, chupetín) o requerida (semicírculo, enchufe) al final de una línea
  const lol = (x, y, r = 8, o = {}) => `<circle cx="${x}" cy="${y}" r="${r}" class="f-if"${S(o.s)}/>`;
  const sock = (x, y, dir = 'r', r = 11, o = {}) => {
    const d = { r: `M${x} ${y - r}A${r} ${r} 0 0 1 ${x} ${y + r}`, l: `M${x} ${y - r}A${r} ${r} 0 0 0 ${x} ${y + r}`, u: `M${x - r} ${y}A${r} ${r} 0 0 1 ${x + r} ${y}`, d: `M${x - r} ${y}A${r} ${r} 0 0 0 ${x + r} ${y}` }[dir];
    return `<path d="${d}" class="u-ln s-if"${S(o.s)}/>`;
  };
  // Ícono de componente UML (rectángulo con dos pestañas) en la esquina superior derecha de (x, y)
  const compIcon = (x, y) => `<g><rect x="${x - 16}" y="${y + 6}" width="12" height="14" class="u-box"/><rect x="${x - 20}" y="${y + 9}" width="8" height="3" class="u-box"/><rect x="${x - 20}" y="${y + 14}" width="8" height="3" class="u-box"/></g>`;
  const port = (x, y, o = {}) => `<rect x="${x - 6}" y="${y - 6}" width="12" height="12" class="u-box ${o.cls || 'k-if'}" style="fill:var(--surface);stroke:var(--c-if);stroke-width:1.8"${S(o.s)}/>`;
  const uml = { svg, box, obj, blk, ln, tx, msg, lol, sock, compIcon, port };

  const UNITS = [
    { id: 'p1', title: 'Primer parcial', name: 'Metodologías, arquitectura e interfaces' },
    { id: 'p2', title: 'Segundo parcial', name: 'UX, procesos, patrones y pruebas' },
  ];

  // tema = unidad del programa; clases = clases teóricas del cronograma 2026; stop = nombre corto para el recorrido de la portada
  const MODULES = [
    { id: 'm1', unit: 'p1', tema: 'I', clases: '1 y 2', title: 'Diseño de sistemas y de software', stop: 'Diseño', blurb: 'la materia, software profesional, 4 actividades, 3 problemas, prototipado y fundamentos' },
    { id: 'm2', unit: 'p1', tema: 'I', clases: '3 y 4', title: 'Procesos y metodologías', stop: 'Procesos', blurb: 'cascada, incremental, reutilización, integración, plan vs. ágil, Manifiesto y XP' },
    { id: 'm3', unit: 'p1', tema: 'I', clases: '5', title: 'Scrum', stop: 'Scrum', blurb: 'pila de producto, sprint, planning poker, velocidad, scrum diario, demo y retrospectiva' },
    { id: 'm4', unit: 'p1', tema: 'II', clases: '6', title: 'Diseño arquitectónico', stop: 'Arquitectura', blurb: 'qué es, decisiones según los requisitos no funcionales y vistas' },
    { id: 'm5', unit: 'p1', tema: 'II', clases: '6 y 7', title: 'Patrones arquitectónicos', stop: 'Estilos', blurb: 'capas, repositorio, cliente-servidor, tubería y filtro, transacciones y lenguaje' },
    { id: 'm6', unit: 'p1', tema: 'II', clases: '8 y 9', title: 'FURPS+, SAD y componentes', stop: 'SAD', blurb: 'requisitos de calidad, análisis arquitectural, interfaces, paquetes, componentes y puertos' },
    { id: 'm7', unit: 'p1', tema: 'III', clases: '10', title: 'Interfaces de usuario', stop: 'IU', blurb: 'factores humanos, principios, estilos de interacción, presentación, color y errores' },
    { id: 'm8', unit: 'p1', tema: 'III', clases: '11', title: 'Diseño de la salida', stop: 'Salidas', blurb: 'objetivos, tecnologías, factores, informes impresos y salida por pantalla' },
    { id: 'm9', unit: 'p1', tema: 'III', clases: '12', title: 'Entrada, formularios y GUI', stop: 'GUI', blurb: 'casos de uso reales, entrada efectiva, formularios, pantallas web y controles' },
    { id: 'm10', unit: 'p2', tema: 'IV', clases: '13', title: 'Experiencia de usuario', stop: 'UX', blurb: 'diseñador centrado en el usuario, rutas rojas, los 3 secretos y métricas' },
    { id: 'm11', unit: 'p2', tema: 'IV', clases: '14', title: 'Diseño de procesos', stop: 'Mapa', blurb: 'misión, clientes, mapa de procesos, indicadores, mejora y procesos en el DSI' },
    { id: 'm12', unit: 'p2', tema: 'V', clases: '15', title: 'Diagramas de interacción', stop: 'Interacción', blurb: 'del análisis al diseño, notación, responsabilidades y patrones GRASP' },
    { id: 'm13', unit: 'p2', tema: 'V', clases: '16', title: 'GRASP: Experto, Creador, Acoplamiento y Cohesión', stop: 'GRASP I', blurb: 'notación de clases y los cuatro patrones evaluativos básicos' },
    { id: 'm14', unit: 'p2', tema: 'V', clases: '17', title: 'GRASP: Controlador y patrones avanzados', stop: 'GRASP II', blurb: 'controlador, polimorfismo, fabricación pura, indirección y variaciones protegidas' },
    { id: 'm15', unit: 'p2', tema: 'V', clases: '18', title: 'Patrones GoF', stop: 'GoF', blurb: 'adaptador, factoría, singleton, fachada, estrategia y composite' },
    { id: 'm16', unit: 'p2', tema: 'V', clases: '19 y 20', title: 'Colaboración, visibilidad y DCD', stop: 'DCD', blurb: 'elaborar diagramas de colaboración, 4 visibilidades y diagramas de clases de diseño' },
    { id: 'm17', unit: 'p2', tema: 'VI', clases: '21', title: 'V&V y pruebas de unidad', stop: 'V&V', blurb: 'verificación vs. validación, estáticas y dinámicas, calidad y particiones' },
    { id: 'm18', unit: 'p2', tema: 'VI', clases: '22', title: 'Pruebas de componentes, sistema y versión', stop: 'Pruebas', blurb: 'interfaces, integración, TDD, requisitos, escenarios y rendimiento' },
    { id: 'm19', unit: 'p2', tema: 'VI', clases: '23', title: 'Pruebas de usuario, depuración y seguridad', stop: 'Seguridad', blurb: 'alfa, beta, aceptación, depuración, plan de pruebas y diseño seguro' },
  ];

  window.GUIDE = { UNITS, MODULES, LESSONS: [], LABS: {}, INTEGRAL: { questions: [], cases: [] }, FICHAS: [], h: { esc, table, note, lab, flow, def, fig, uml } };
})();
