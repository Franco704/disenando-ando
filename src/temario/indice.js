// Todo el temario listo para las vistas. Los parciales reales suman ejercicios al final de cada lección (después de los del TP).
import { PARCIALES, MODULOS as TODOS_LOS_MODULOS } from './catalogo.js';
import { LESSONS } from './lecciones.js';
import { EXAMS } from '../examenes/parciales-reales.js';
import { INTEGRAL } from '../examenes/integral.js';
import { FICHAS } from '../estudio/fichas.js';
import { RESUMENES } from '../resumenes/datos.js';

export { PARCIALES, FICHAS, RESUMENES, INTEGRAL, EXAMS as EXAMENES };
export const LECCIONES = LESSONS;
// Solo los módulos que ya tienen lecciones cargadas
export const MODULOS = TODOS_LOS_MODULOS.filter((m) => LECCIONES.some((l) => l.module === m.id));
const porId = Object.fromEntries(LECCIONES.map((l) => [l.id, l]));
export const leccion = (id) => porId[id];

// Todas las preguntas con id estable (lección:índice): el progreso guardado depende de estos ids.
export const PREGUNTAS = LECCIONES.flatMap((l) => (l.quiz || []).map((q, i) => ({ ...q, id: `${l.id}:${i}`, lesson: l, module: l.module })));
// Integral: cada pregunta apunta (l) a la lección que conviene releer si se falla
export const PREGUNTAS_INTEGRAL = INTEGRAL.questions.map((q, i) => { const l = porId[q.l] || LECCIONES[0]; return { ...q, id: `int:${i}`, lesson: l, module: l.module }; });
export const preguntaPorId = Object.fromEntries([...PREGUNTAS, ...PREGUNTAS_INTEGRAL].map((q) => [q.id, q]));
// Parciales reales: cada ejercicio con exam: ['1p-2023-3k1#2'] queda enlazado a la consigna 2 de ese parcial (P1 = punto 1 de la práctica)
export const examenPorId = Object.fromEntries(EXAMS.map((e) => [e.id, e]));
export const EJERCICIOS = LECCIONES.flatMap((l) => (l.exercises || []).map((ex) => ({ ex, l })));

export const parcial = (id) => PARCIALES.find((u) => u.id === id);
export const modulo = (id) => MODULOS.find((m) => m.id === id);
export const leccionesDe = (modId) => LECCIONES.filter((l) => l.module === modId);
export const modulosDe = (u) => MODULOS.filter((m) => m.unit === u);
export const clases = (m) => `Clase${m.clases.length > 2 ? 's' : ''} ${m.clases}`;
export const etiqueta = (m) => `Unidad ${m.tema}, ${clases(m).toLowerCase()}`;
