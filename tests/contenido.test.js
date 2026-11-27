// Autocomprobación del contenido: carga el temario con los parciales, el integral, las fichas y los resúmenes. Uso: node tests/contenido.test.js
import assert from 'node:assert';
import { LECCIONES, MODULOS, PREGUNTAS, PREGUNTAS_INTEGRAL, INTEGRAL, EXAMENES, FICHAS, RESUMENES, leccion } from '../src/temario/indice.js';
import { MODULOS as TODOS } from '../src/temario/catalogo.js';
import { LABORATORIOS } from '../src/laboratorios/indice.js';

const ids = new Set();
for (const l of LECCIONES) {
  assert(!ids.has(l.id), `id repetido ${l.id}`); ids.add(l.id);
  assert(TODOS.some((m) => m.id === l.module), `módulo inexistente en ${l.id}`);
  assert(l.title && l.tldr && l.body, `lección incompleta ${l.id}`);
  for (const c of l.labs || []) assert(LABORATORIOS[c.type], `laboratorio ${c.type} sin registrar en ${l.id}`);
  [...l.body.matchAll(/data-lab="(\d+)"/g)].forEach((m) => assert(l.labs?.[+m[1]], `lab(${m[1]}) sin definir en ${l.id}`));
  for (const q of l.quiz || []) assert(q.a >= 0 && q.a < q.o.length && q.e, `respuesta fuera de rango o sin explicación en ${l.id}: ${q.q}`);
  assert(!/NaN|undefined|\[object Object\]/.test(l.body + JSON.stringify(l.exercises || [])), `NaN/undefined en ${l.id}`);
}
assert.strictEqual(MODULOS.length, TODOS.length, 'hay módulos sin lecciones');
// Integral: cada pregunta apunta a una lección que existe
INTEGRAL.questions.forEach((q) => { assert(leccion(q.l), `el integral apunta a una lección inexistente: ${q.l}`); assert(q.a >= 0 && q.a < q.o.length, `respuesta fuera de rango en el integral: ${q.q}`); });
// Parciales: cada etiqueta apunta a una consigna existente y cada consigna tiene su resolución
const items = new Set(EXAMENES.flatMap((e) => e.items.map(([k]) => `${e.id}#${k}`)));
const resueltas = LECCIONES.flatMap((l) => (l.exercises || []).flatMap((x) => x.exam || []));
resueltas.forEach((k) => assert(items.has(k), `etiqueta de parcial inexistente: ${k}`));
items.forEach((k) => assert(resueltas.includes(k), `consigna de parcial sin resolver: ${k}`));
FICHAS.forEach((f) => assert(TODOS.some((m) => m.id === f.m), `ficha con módulo inexistente: ${f.n}`));
// Un resumen se muestra como HTML convertido o, si no lo tiene, como el PDF original
RESUMENES.forEach((r) => assert(r.id && r.author && (r.html || r.file?.endsWith(".pdf")), `resumen incompleto: ${r.id}`));
console.log(`contenido OK: ${LECCIONES.length} lecciones, ${PREGUNTAS.length} preguntas, ${PREGUNTAS_INTEGRAL.length} del integral, ${EXAMENES.length} parciales (${items.size} consignas), ${FICHAS.length} fichas, ${RESUMENES.length} resúmenes`);
