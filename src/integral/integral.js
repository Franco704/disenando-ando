/* Integral (#/integral): 25 preguntas difíciles de todo el año elegidas al azar, casos prácticos y reloj de 90 minutos. */
(() => {
  const { $, shuffle } = DA.util;
  const { INTEGRAL, INT_QS } = DA.ctx;
  const main = $('#main');

  function render() {
    document.title = 'Integral, Diseñando Ando';
    document.body.dataset.unit = 'int';
    const qs = shuffle(INT_QS).slice(0, 25);
    const cases = DA.ejercicios.render({ exercises: INTEGRAL.cases.map((c, i) => ({ ...c, tag: `Caso ${i + 1}`, level: 3 })) });
    main.innerHTML = `
      <article class="page quiz-page">
        <p class="crumb"><span class="estereotipo">«integral»</span> <a href="#/simulacro/p1">Simulacro del 1er parcial</a>, <a href="#/simulacro/p2">del 2do parcial</a></p>
        <h1>Integral</h1>
        <p class="tldr">La instancia más exigente: <mark>${qs.length} preguntas de las seis unidades</mark>, elegidas al azar entre ${INT_QS.length}, que cruzan temas y castigan las confusiones típicas. Después, ${INTEGRAL.cases.length} casos prácticos como los del final (UML y metodología de Larman).</p>
        <div class="note warn"><p><strong>Reglas.</strong> Tenés 90 minutos, como en el parcial. Para aprobar necesitás 60% y para promocionar, 70%, en la teoría y en la práctica por separado. Varias opciones son “casi correctas”: buscá la que es correcta <em>siempre</em>, no la que suena mejor.</p></div>
        <div class="int-head"><button class="btn primary" type="button" id="intStart">Empezar el reloj</button><span class="timer" id="intTimer" role="timer" hidden>90:00</span></div>
        <section class="int-part"><h2>Parte teórica</h2><div class="quiz-mount"></div></section>
        <section class="int-part practice"><h2>Parte práctica</h2><p class="sec-lede">Resolvé cada caso en papel, completo, antes de abrir la solución. Corregite con la grilla de la solución: cada ítem es un punto.</p>${cases}</section>
      </article>`;
    let timerId = null;
    const stop = () => { clearInterval(timerId); timerId = null; };
    DA.alSalir(stop);
    const mount = $('.quiz-mount', main);
    DA.cuestionario.render(mount, qs, { mode: 'exam', from: false, onFinish: stop });
    $('#intStart').addEventListener('click', (e) => {
      e.currentTarget.remove();
      const t = $('#intTimer');
      t.hidden = false;
      const end = Date.now() + 90 * 60 * 1000;
      stop();
      timerId = setInterval(() => {
        const left = Math.max(0, end - Date.now());
        t.textContent = `${String(Math.floor(left / 60000)).padStart(2, '0')}:${String(Math.floor((left % 60000) / 1000)).padStart(2, '0')}`;
        t.classList.toggle('low', left < 10 * 60 * 1000);
        if (!left) { stop(); t.textContent = 'Tiempo cumplido'; $('[data-act="grade"]', mount)?.click(); }
      }, 1000);
    });
  }

  DA.vistas.push({ test: (id) => id === 'integral', render });
})();
