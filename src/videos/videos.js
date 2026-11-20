/* Videos de resumen (#/videos o #/videos/<lección>): uno por lección, agrupados por parcial, de corrido y con salto a cada lección. */
(() => {
  const { $ } = DA.util;
  const { UNITS, MODULES, LESSONS, modOf } = DA.ctx;
  const main = $('#main');

  function render(id) {
    let cur = Math.max(LESSONS.findIndex((l) => l.id === id.slice(7)), 0);
    document.title = 'Videos de resumen, Diseñando Ando';
    const units = UNITS.filter((u) => MODULES.some((m) => m.unit === u.id));
    main.innerHTML = `
      <article class="page videos">
        <p class="crumb"><span class="estereotipo">«para repasar»</span></p>
        <h1>Videos de resumen</h1>
        <p class="tldr">Un video corto por lección, separados por parcial. Se reproducen de corrido: cuando termina uno arranca el siguiente. Si algo no te cierra, abrí la lección de la que habla.</p>
        <div class="vid-player">
          <video controls playsinline preload="metadata"></video>
          <p class="vid-now"><span></span><a href="#/">Ir a la lección</a></p>
          <label class="vid-auto"><input type="checkbox" checked /> Reproducir el siguiente automáticamente</label>
        </div>
        ${units.map((u) => `<section data-u="${u.id}"><h2><span class="estereotipo">«${u.title.toLowerCase()}»</span>${u.name}</h2>
          <ol class="vid-list">${LESSONS.map((l, i) => ({ l, i })).filter(({ l }) => modOf(l.module).unit === u.id).map(({ l, i }) => `<li><button type="button" data-i="${i}"><span class="n">${i + 1}</span>${l.title}</button><a href="#/${l.id}" aria-label="Abrir la lección ${l.title}">Lección</a></li>`).join('')}</ol></section>`).join('')}
      </article>`;
    const video = $('video', main);
    const btns = [...main.querySelectorAll('.vid-list button')];
    const play = (i, auto) => {
      cur = i;
      video.src = `videos/${LESSONS[i].id}.mp4`;
      if (auto) video.play().catch(() => {});
      document.body.dataset.unit = modOf(LESSONS[i].module).unit;   // el reproductor toma el color del parcial
      $('.vid-now span', main).textContent = `${i + 1}. ${LESSONS[i].title}`;
      $('.vid-now a', main).href = `#/${LESSONS[i].id}`;
      btns.forEach((b) => b.toggleAttribute('aria-current', +b.dataset.i === i));
    };
    btns.forEach((b) => b.addEventListener('click', () => { play(+b.dataset.i, true); video.scrollIntoView({ block: 'nearest' }); }));
    video.addEventListener('ended', () => { if ($('.vid-auto input', main).checked && cur < LESSONS.length - 1) play(cur + 1, true); });
    play(cur, false);
  }

  DA.vistas.push({ test: (id) => id === 'videos' || id.startsWith('videos/'), render });
})();
