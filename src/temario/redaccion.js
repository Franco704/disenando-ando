/* Ayudantes para escribir lecciones (el h de cada tema, junto con uml). Cada lección en temario/lecciones/:
   { id, module, title, keywords, tldr, goals?, body, labs?, exercises?, quiz?, sources? }
   - body puede incluir lab(i) para ubicar el laboratorio i dentro de la teoría.
   - labs: [{ type, title, ...config }] (los tipos se registran en src/laboratorios/)
   - exercises: { title, official? ('3.10' = TP 3, ejercicio 10), exam? (['2p-2023-3k1#3'] = parcial y consigna; P1 = punto 1 de la práctica), level (1-3), prompt, hints?, solution: { explain } }
   - quiz: [{ q, o: [opciones], a: índice correcto, e: explicación }]
   - sources: [{ title, ref?, url?, points: [] }] (ref = cita de libro, url = fuente web) */
export { esc } from '../nucleo/dom.js';
  export const table = (head, rows) => `<div class="table-wrap"><table><thead><tr>${head.map((c) => `<th>${c}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  // kind: '' (nota), 'tip', 'warn', 'exam' (lo que suele tomarse)
  export const note = (html, kind = '') => `<div class="note ${kind}">${html.trim().startsWith('<') ? html : `<p>${html}</p>`}</div>`;
  export const lab = (i) => `<div class="lab-mount" data-lab="${i}"></div>`;
  export const flow = (...steps) => `<ol class="flow">${steps.map((s) => `<li>${s}</li>`).join('')}</ol>`;
  // Definición textual de la bibliografía
  export const def = (term, text, source) => `<figure class="def"><figcaption>${term}</figcaption><blockquote><p>${text}</p></blockquote>${source ? `<p class="def-src">${source}</p>` : ''}</figure>`;
  // Diagrama SVG o HTML con epígrafe
  export const fig = (inner, caption) => `<figure class="fig">${inner}${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
