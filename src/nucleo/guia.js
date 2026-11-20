/* Núcleo: crea los dos espacios globales y las utilidades que comparten todas las funcionalidades.
   - window.GUIDE: el contenido (lo llenan temario/, parciales/datos.js, integral/datos.js, fichas/datos.js, resumenes/datos.js).
   - window.DA: el motor de la guía (vistas, navegación, progreso). Sin módulos ES a propósito: index.html se abre también desde file://. */
(() => {
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const $ = (s, el = document) => el.querySelector(s);
  const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollToEl = (el) => el?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' });

  // Almacenamiento local: puede fallar en modo privado, así que todo pasa por acá
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };

  window.GUIDE = { UNITS: [], MODULES: [], LESSONS: [], LABS: {}, INTEGRAL: { questions: [], cases: [] }, EXAMS: [], FICHAS: [], RESUMENES: [], h: { esc }, util: { shuffle } };
  // vistas: [{ test(id), render(id) }] en orden; la primera que acepta la ruta la dibuja (rutas.js)
  window.DA = { util: { esc, norm, shuffle, $, reducedMotion, scrollToEl }, store, vistas: [] };
})();
