/* Diagramas UML y de bloques en SVG (GUIDE.h.uml).
   Las puntas de flecha son marcadores globales definidos en index.html: ar (llena), op (abierta),
   tri (triángulo hueco: generalización y realización), dia / diao (rombo lleno / hueco), msg (mensaje).
   Todo elemento acepta s (número de paso) para el laboratorio 'steps'. */
(() => {
  const { esc } = window.GUIDE.h;
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
  window.GUIDE.h.uml = { svg, box, obj, blk, ln, tx, msg, lol, sock, compIcon, port };
})();
