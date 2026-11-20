/* Contexto derivado del contenido ya cargado (DA.ctx) y progreso del estudiante (DA.progreso).
   Se carga después de todos los datos y antes de las vistas. */
(() => {
  const { UNITS, LESSONS, INTEGRAL, EXAMS } = window.GUIDE;
  const { store } = DA;
  // Solo los módulos que ya tienen lecciones cargadas
  const MODULES = window.GUIDE.MODULES.filter((m) => LESSONS.some((l) => l.module === m.id));
  const lessonsOf = (modId) => LESSONS.filter((l) => l.module === modId);
  const modOf = (id) => MODULES.find((m) => m.id === id);
  const unitOf = (id) => UNITS.find((u) => u.id === id);
  const lessonById = Object.fromEntries(LESSONS.map((l) => [l.id, l]));
  const clases = (m) => `Clase${m.clases.length > 2 ? 's' : ''} ${m.clases}`;

  // Todas las preguntas con su id (leccion:indice), módulo y lección
  const QUESTIONS = LESSONS.flatMap((l) => (l.quiz || []).map((q, i) => ({ ...q, id: `${l.id}:${i}`, lesson: l, module: l.module })));
  // Preguntas del integral: cada una apunta (l) a la lección que conviene releer si se falla
  const INT_QS = INTEGRAL.questions.map((q, i) => ({ ...q, id: `int:${i}`, lesson: lessonById[q.l] || LESSONS[0], module: (lessonById[q.l] || LESSONS[0]).module }));
  const qById = Object.fromEntries([...QUESTIONS, ...INT_QS].map((q) => [q.id, q]));
  // Parciales reales: cada ejercicio con exam: ['1p-2023-3k1#2'] queda enlazado a la consigna 2 de ese parcial (P1 = punto 1 de la práctica)
  const examById = Object.fromEntries(EXAMS.map((e) => [e.id, e]));
  const EXS = LESSONS.flatMap((l) => (l.exercises || []).map((ex) => ({ ex, l })));

  DA.ctx = { UNITS, MODULES, LESSONS, INTEGRAL, EXAMS, lessonsOf, modOf, unitOf, lessonById, clases, QUESTIONS, INT_QS, qById, examById, EXS };

  // ---------- Progreso: lecciones hechas, respuestas por pregunta ({ ok, tries }) y mejor nota por módulo ----------
  const done = new Set(store.get('dsi-done', []));
  const answers = store.get('dsi-answers', {});
  const best = store.get('dsi-best', {});
  const listeners = [];
  const emit = () => listeners.forEach((fn) => fn());

  DA.progreso = {
    done, answers, best,
    onChange: (fn) => listeners.push(fn),
    toggleDone(id) {
      done.has(id) ? done.delete(id) : done.add(id);
      store.set('dsi-done', [...done]);
      emit();
      return done.has(id);
    },
    record(q, ok) {
      answers[q.id] = { ok, tries: (answers[q.id]?.tries || 0) + 1 };
      store.set('dsi-answers', answers);
      emit();
    },
    setBest(modId, pct) {
      best[modId] = Math.max(best[modId] ?? 0, pct);
      store.set('dsi-best', best);
      emit();
    },
    // Preguntas cuya última respuesta fue incorrecta
    reviewIds: () => Object.keys(answers).filter((id) => qById[id] && !answers[id].ok),
    modDone: (m) => lessonsOf(m.id).filter((l) => done.has(l.id)).length,
    // % de aciertos del módulo, solo con 3 o más preguntas respondidas
    moduleScore(modId) {
      const qs = QUESTIONS.filter((q) => q.module === modId && answers[q.id]);
      return qs.length < 3 ? null : Math.round((qs.filter((q) => answers[q.id].ok).length / qs.length) * 100);
    },
    nextLesson: () => LESSONS.find((l) => !done.has(l.id)) || LESSONS[0],
  };
})();
