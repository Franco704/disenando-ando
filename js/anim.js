/* Animaciones: pantalla de entrada al cambiar de módulo y glifo animado en la cabecera de cada lección.
   Adaptadas del "Laboratorio Frontend DSW" de Mateo Rusconi. Expone window.ANIM; app.js lo usa en route() y renderLesson(). */
(() => {
  const { LESSONS, MODULES, UNITS } = window.GUIDE;
  const RM = matchMedia('(prefers-reduced-motion: reduce)');

  // Cadena que se enciende etapa por etapa en la pantalla de entrada
  const PIPES = {
    m1: ['Problema', 'Sistema', 'Software', 'Especificar', 'Desarrollar', 'Validar', 'Evolucionar'],
    m2: ['Plan', 'Cascada', 'Incrementos', 'Integración', 'Ágil'],
    m3: ['Pila de producto', 'Planificación', 'Sprint', 'Scrum diario', 'Demo', 'Retrospectiva'],
    m4: ['Requisitos no funcionales', 'Decisiones', 'Vistas', 'Modelo arquitectónico'],
    m5: ['Capas', 'Repositorio', 'Cliente-servidor', 'Tubería y filtro'],
    m6: ['FURPS+', 'Factores', 'Memorándums', 'SAD', 'Componentes'],
    m7: ['Usuario', 'Principios', 'Interacción', 'Presentación', 'Mensajes'],
    m8: ['Propósito', 'Usuario', 'Cantidad', 'Lugar', 'Oportunidad', 'Método'],
    m9: ['Caso de uso real', 'Formulario', 'Pantalla', 'GUI'],
    m10: ['Usuarios', 'Personas', 'Rutas rojas', 'Medir', 'Iterar'],
    m11: ['Misión', 'Clientes', 'Mapa de procesos', 'Indicadores', 'Mejora'],
    m12: ['Contrato', 'Evento', 'Mensajes', 'Responsabilidades', 'GRASP'],
    m13: ['Experto', 'Creador', 'Bajo acoplamiento', 'Alta cohesión'],
    m14: ['Controlador', 'Polimorfismo', 'Fabricación pura', 'Indirección', 'Variaciones protegidas'],
    m15: ['Adaptador', 'Factoría', 'Singleton', 'Fachada', 'Estrategia', 'Composite'],
    m16: ['Eventos del sistema', 'Colaboración', 'Visibilidad', 'DCD'],
    m17: ['Verificar', 'Validar', 'Inspeccionar', 'Probar', 'Particionar'],
    m18: ['Unidad', 'Componente', 'Sistema', 'Versión', 'Rendimiento'],
    m19: ['Alfa', 'Beta', 'Aceptación', 'Depurar', 'Proteger'],
  };

  // La confusión típica del tema, tomada de las notas de cada módulo
  const TRAPS = {
    m1: 'El ingeniero de sistemas define la <b>arquitectura global</b>: hardware, políticas, procesos y software. El de software diseña la lógica interna. Un servidor sin RAM suficiente es un error de diseño de <b>sistemas</b>.',
    m2: 'La arquitectura <b>no</b> se desarrolla en forma incremental: en un proceso ágil también se define al principio. Lo que se refactoriza fácil son los componentes, no la arquitectura.',
    m3: 'La <b>calidad interna</b> no se negocia. Si el Dueño de Producto quiere bajar la estimación, se reduce el <b>alcance</b>, nunca la calidad.',
    m4: 'Los requisitos <b>funcionales</b> los implementan los componentes; los <b>no funcionales</b> dependen sobre todo de la arquitectura, es decir, de cómo se organizan y comunican esos componentes.',
    m5: 'En cliente-servidor, el cliente conoce a los servidores; los servidores <b>no</b> necesitan conocer la identidad de los clientes ni cuántos hay.',
    m6: 'Interfaz <b>proporcionada</b> = círculo (chupetín); interfaz <b>requerida</b> = semicírculo (enchufe). Un componente sirve en un contexto solo si todas sus interfaces requeridas están satisfechas.',
    m7: 'Muchos “errores de usuario” son en realidad errores de <b>diseño de la interfaz</b>: no consideraron las habilidades reales del usuario ni su entorno de trabajo.',
    m8: 'Si la salida no tiene un propósito, <b>no se crea</b>. Dar información de más “para lucir el sistema” es un error, no un servicio.',
    m9: 'El caso de uso <b>esencial</b> (análisis) no habla de pantallas; el caso de uso <b>real</b> (diseño) sí: describe la interfaz concreta.',
    m10: 'En software interactivo no importa lo que los usuarios <b>dicen</b> (focus groups), importa lo que <b>hacen</b> (pruebas de usabilidad).',
    m11: 'Criterio = aspecto <b>no medible</b> que interesa evaluar. Indicador = variable <b>medible</b> ligada al criterio. Estándares dicen <b>qué</b> hacer; marcos, <b>cómo</b>.',
    m12: 'Responsabilidad no es lo mismo que método: los métodos se implementan <b>para cumplir</b> responsabilidades, solos o colaborando.',
    m13: 'Ante varios candidatos del Creador, deciden <b>Bajo Acoplamiento y Alta Cohesión</b>: por eso es Venta (no Registro) quien crea el Pago.',
    m14: 'El controlador <b>no</b> pertenece a la capa de interfaz y <b>delega</b>: si hace el trabajo él mismo, está saturado.',
    m15: 'Adaptador y Fachada agregan indirección, pero el Adaptador <b>adapta interfaces distintas</b> a una común; la Fachada da <b>un único punto de entrada</b> a un subsistema.',
    m16: 'Asociación con flecha de navegabilidad = visibilidad de <b>atributo</b>. Visibilidad de parámetro, local o global se dibujan como <b>dependencia</b> (línea punteada).',
    m17: 'Validación: ¿construimos el producto <b>correcto</b>? Verificación: ¿construimos <b>bien</b> el producto? Y las pruebas solo muestran la presencia de errores, no su ausencia.',
    m18: 'Los errores de interfaz <b>no</b> aparecen al probar objetos por separado: surgen de la interacción entre ellos, por eso se prueba la interfaz del componente compuesto.',
    m19: 'V&V establece la <b>existencia</b> de defectos; la depuración los <b>localiza y corrige</b>. Son procesos distintos que se intercalan.',
  };

  // Un SVG de 150×120 por módulo. Sin animación (reduced-motion) cada uno queda en un estado final legible.
  const d = (s) => `style="animation-delay:${s}s"`;
  const GLYPHS = {
    m1: `<rect x="6" y="8" width="138" height="104" rx="14" class="gx-box"/><text x="20" y="24" class="gx-t gx-start">Sistema</text>
      ${['HW', 'Procesos', 'Personas'].map((t, i) => `<g class="gx-pop" ${d(i * 0.3)}><rect x="${14 + i * 44}" y="32" width="${i === 1 ? 46 : 38}" height="20" rx="10" class="gx-soft"/><text x="${33 + i * 44 + (i === 1 ? 4 : 0)}" y="46" class="gx-t gx-ink">${t}</text></g>`).join('')}
      <rect x="30" y="64" width="90" height="38" rx="8" class="gx-node gx-pop" ${d(1.1)}/><text x="75" y="87" class="gx-t gx-tc gx-pop" ${d(1.2)}>Software</text>`,
    m2: [0, 1, 2, 3].map((i) => `<g class="gx-stack" ${d(i * 0.3)}><rect x="${8 + i * 30}" y="${10 + i * 24}" width="50" height="18" rx="4" class="${i === 3 ? 'gx-soft' : 'gx-box'}"/><path d="M${58 + i * 30} ${19 + i * 24}H${66 + i * 30}V${34 + i * 24}" class="gx-line"/></g>`).join('')
      + '<path d="M120 112C70 114 20 100 18 30" class="gx-acc-s gx-draw gx-dash" pathLength="1" style="animation-delay:1.3s"/>',
    m3: `<circle cx="70" cy="62" r="40" class="gx-acc-s gx-draw" pathLength="1"/><path d="M106 44L112 60L96 56" class="gx-acc-s gx-pop" ${d(1)}/>
      <circle cx="70" cy="62" r="14" class="gx-msg-s gx-draw" pathLength="1" ${d(0.6)}/><text x="70" y="66" class="gx-t gx-tc">24 h</text>
      ${[0, 1, 2, 3].map((i) => `<rect x="124" y="${16 + i * 14}" width="${22 - i * 4}" height="10" rx="2" class="gx-acc gx-bar" ${d(i * 0.2)}/>`).join('')}`,
    m4: `${[[10, 14], [92, 14], [51, 80]].map(([x, y], i) => `<rect x="${x}" y="${y}" width="48" height="28" rx="6" class="${i === 2 ? 'gx-soft' : 'gx-box'} gx-pop" ${d(i * 0.3)}/>`).join('')}
      <path d="M58 28H92" class="gx-strong gx-draw" pathLength="1" ${d(1)}/><path d="M34 42L60 80" class="gx-strong gx-draw" pathLength="1" ${d(1.2)}/><path d="M116 42L90 80" class="gx-strong gx-draw" pathLength="1" ${d(1.4)}/>`,
    m5: ['Presentación', 'Interfaz de usuario', 'Aplicación', 'Soporte (SO, BD)'].map((t, i) => `<g class="gx-stack" ${d((3 - i) * 0.35)}><rect x="8" y="${8 + i * 27}" width="134" height="22" rx="4" class="${i === 3 ? 'gx-soft' : 'gx-box'}"/><text x="75" y="${23 + i * 27}" class="gx-t gx-ink">${t}</text></g>`).join(''),
    m6: `<rect x="10" y="38" width="56" height="44" rx="4" class="gx-node"/><rect x="88" y="38" width="56" height="44" rx="4" class="gx-node"/>
      <path d="M66 60H78" class="gx-if-s"/><circle cx="84" cy="60" r="6" class="gx-if-f gx-pop" ${d(0.8)}/>
      <path d="M88 60H96" class="gx-if-s"/><path d="M80 50A10 10 0 0 0 80 70" class="gx-if-s gx-move-s"/>
      <text x="38" y="64" class="gx-t gx-ink">A</text><text x="116" y="64" class="gx-t gx-ink">B</text><text x="75" y="100" class="gx-t gx-tc">interfaz</text>`,
    m7: `<rect x="8" y="10" width="134" height="100" rx="8" class="gx-box"/><path d="M8 26H142" class="gx-line"/>${[0, 1, 2].map((i) => `<circle cx="${18 + i * 9}" cy="18" r="3" class="gx-acc"/>`).join('')}
      <rect x="22" y="40" width="80" height="12" rx="3" class="gx-soft"/><rect x="22" y="60" width="80" height="12" rx="3" class="gx-soft"/>
      <rect x="84" y="84" width="44" height="16" rx="5" class="gx-acc gx-pop" ${d(1.4)}/><path d="M70 50l0 18l5-5l5 9l4-2l-5-9h7z" class="gx-cursor gx-move"/>`,
    m8: `<rect x="20" y="8" width="110" height="104" rx="4" class="gx-box"/><rect x="30" y="16" width="70" height="8" rx="2" class="gx-acc"/>
      ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="30" y="${34 + i * 12}" width="${[90, 70, 84, 40, 76, 58][i]}" height="6" rx="2" class="${i === 3 ? 'gx-errf' : 'gx-line-f'} gx-bar" ${d(i * 0.18)}/>`).join('')}`,
    m9: `<rect x="12" y="14" width="16" height="16" rx="3" class="gx-node"/><path d="M15 22l4 4l7-8" class="gx-ok-s gx-draw" pathLength="1"/><text x="36" y="26" class="gx-t gx-start gx-ink">casilla</text>
      <circle cx="20" cy="54" r="8" class="gx-node"/><circle cx="20" cy="54" r="4" class="gx-acc gx-pop" ${d(0.6)}/><text x="36" y="58" class="gx-t gx-start gx-ink">opción</text>
      <rect x="12" y="78" width="80" height="18" rx="3" class="gx-node"/><path d="M80 84l5 5l5-5" class="gx-strong"/><text x="40" y="91" class="gx-t gx-ink">lista ▾</text>
      <path d="M104 30V100" class="gx-line"/><circle cx="104" cy="70" r="7" class="gx-acc gx-slide"/><text x="128" y="62" class="gx-t gx-ink">+</text><text x="128" y="82" class="gx-t gx-ink">−</text>`,
    m10: `${[[40, 30], [96, 62], [52, 92]].map(([x, y]) => `<rect x="${x - 8}" y="${y - 8}" width="16" height="16" rx="3" class="gx-box"/>`).join('')}
      <path d="M8 104C30 70 70 60 80 44S120 20 142 14" class="gx-red gx-draw" pathLength="1"/><circle cx="20" cy="88" r="6" class="gx-acc gx-walk"/><text x="118" y="34" class="gx-t gx-tc">ruta roja</text>`,
    m11: `${['Estratégicos', 'Clave', 'Soporte'].map((t, i) => `<g class="gx-pop" ${d(i * 0.35)}><rect x="18" y="${8 + i * 38}" width="114" height="28" rx="6" class="${i === 1 ? 'gx-soft' : 'gx-box'}"/><text x="75" y="${26 + i * 38}" class="gx-t gx-ink">${t}</text></g>`).join('')}
      <path d="M2 60H16" class="gx-msg-s gx-draw" pathLength="1" ${d(1.2)}/><path d="M134 60H148" class="gx-msg-s gx-draw" pathLength="1" ${d(1.4)}/>`,
    m12: `<rect x="6" y="18" width="56" height="24" rx="2" class="gx-node"/><text x="34" y="34" class="gx-t gx-ink gx-u">:Caja</text>
      <rect x="88" y="18" width="56" height="24" rx="2" class="gx-node"/><text x="116" y="34" class="gx-t gx-ink gx-u">:Venta</text>
      <rect x="88" y="86" width="56" height="24" rx="2" class="gx-soft gx-pop" ${d(1.2)}/><text x="116" y="102" class="gx-t gx-ink gx-u gx-pop" ${d(1.2)}>:Pago</text>
      <path d="M62 30H88M116 42V86" class="gx-line"/><path d="M66 12H84" class="gx-msg-s gx-flow"/><path d="M128 50V78" class="gx-msg-s gx-flow"/>
      <text x="40" y="70" class="gx-t gx-tc gx-kw">1: pagar()</text><text x="40" y="70" class="gx-t gx-tc gx-kw" ${d(1.2)}>1.1: create()</text><text x="40" y="70" class="gx-t gx-tc gx-kw" ${d(2.4)}>¿quién?</text>`,
    m13: ['Venta', 'LineaDeVenta', 'Especificación'].map((t, i) => `<g class="gx-pop" ${d(i * 0.45)}><rect x="${10 + i * 14}" y="${8 + i * 38}" width="${96}" height="24" rx="2" class="${i ? 'gx-node' : 'gx-soft'}"/><text x="${58 + i * 14}" y="${24 + i * 38}" class="gx-t gx-ink gx-u">:${t}</text></g>`).join('')
      + ['getTotal', 'getSubtotal', 'getPrecio'].map((t, i) => `<text x="132" y="${24 + i * 38}" class="gx-t gx-tc gx-pop" ${d(0.3 + i * 0.45)}>${t.replace('get', '')}</text>`).join(''),
    m14: `<rect x="8" y="10" width="134" height="22" rx="4" class="gx-box"/><text x="75" y="25" class="gx-t gx-ink">Capa de UI</text>
      <rect x="38" y="50" width="74" height="22" rx="4" class="gx-soft gx-pop" ${d(0.5)}/><text x="75" y="65" class="gx-t gx-tc">Controlador</text>
      ${[0, 1, 2].map((i) => `<rect x="${12 + i * 46}" y="92" width="38" height="20" rx="3" class="gx-node gx-pop" ${d(1 + i * 0.2)}/>`).join('')}
      <path d="M75 32V50" class="gx-msg-s gx-flow"/><path d="M75 72L31 92M75 72V92M75 72L119 92" class="gx-line gx-draw" pathLength="1" ${d(1)}/>`,
    m15: `<rect x="38" y="8" width="74" height="30" rx="2" class="gx-soft"/><text x="75" y="20" class="gx-t gx-tc">«interface»</text><text x="75" y="32" class="gx-t gx-ink">Estrategia</text>
      <path d="M75 38L69 48H81Z" class="gx-tri"/><path d="M75 48V62M25 62H125" class="gx-line"/>
      ${[0, 1, 2].map((i) => `<g class="gx-stack" ${d(0.4 + i * 0.3)}><path d="M${25 + i * 50} 62V80" class="gx-line gx-dash"/><rect x="${5 + i * 50}" y="80" width="40" height="28" rx="2" class="gx-node"/><text x="${25 + i * 50}" y="98" class="gx-t gx-ink">${['A', 'B', 'C'][i]}</text></g>`).join('')}`,
    m16: `<rect x="10" y="10" width="72" height="100" rx="2" class="gx-node"/><path d="M10 32H82M10 66H82" class="gx-line"/><text x="46" y="25" class="gx-t gx-ink">Venta</text>
      ${['fecha', 'hora'].map((t, i) => `<text x="16" y="${46 + i * 13}" class="gx-t gx-start gx-ink gx-pop" ${d(0.4 + i * 0.2)}>${t}</text>`).join('')}
      ${['total()', 'pagar()'].map((t, i) => `<text x="16" y="${82 + i * 14}" class="gx-t gx-start gx-ink gx-pop" ${d(0.9 + i * 0.2)}>${t}</text>`).join('')}
      <path d="M82 40H112" class="gx-strong gx-draw" pathLength="1" ${d(1.4)}/><path d="M106 34L114 40L106 46" class="gx-strong gx-pop" ${d(1.8)}/><rect x="114" y="28" width="32" height="24" rx="2" class="gx-soft gx-pop" ${d(1.8)}/>`,
    m17: `<ellipse cx="75" cy="60" rx="66" ry="52" class="gx-box"/><ellipse cx="50" cy="44" rx="26" ry="18" class="gx-soft"/><ellipse cx="100" cy="46" rx="22" ry="16" class="gx-soft"/><ellipse cx="74" cy="86" rx="32" ry="16" class="gx-soft"/>
      ${[[50, 44], [26, 44], [100, 46], [74, 86], [44, 86], [104, 86]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="4" class="${i % 3 ? 'gx-errf' : 'gx-acc'} gx-pop" ${d(i * 0.25)}/>`).join('')}`,
    m18: `<circle cx="75" cy="60" r="42" class="gx-line"/>${[['rojo', 'gx-errf', 75, 18], ['verde', 'gx-okf', 112, 82], ['refactor', 'gx-acc', 38, 82]].map(([t, c, x, y], i) => `<g class="gx-pop" ${d(i * 0.6)}><circle cx="${x}" cy="${y}" r="14" class="${c}"/><text x="${x}" y="${y + 28 > 118 ? y - 20 : y + 28}" class="gx-t gx-ink">${t}</text></g>`).join('')}
      <text x="75" y="64" class="gx-t gx-tc">TDD</text>`,
    m19: `${[0, 1, 2].map((i) => `<rect x="${10 + i * 18}" y="${8 + i * 16}" width="${130 - i * 36}" height="${104 - i * 32}" rx="${12 - i * 3}" class="${i === 2 ? 'gx-soft' : 'gx-box'} gx-pop" ${d((2 - i) * 0.35)}/>`).join('')}
      <rect x="66" y="58" width="18" height="14" rx="2" class="gx-acc"/><path d="M70 58V52A5 5 0 0 1 80 52V58" class="gx-acc-s"/><circle cx="140" cy="20" r="5" class="gx-errf gx-coin"/>`,
  };
  const glyph = (modId) => (GLYPHS[modId] ? `<svg viewBox="0 0 150 120" focusable="false">${GLYPHS[modId]}</svg>` : '');

  // Pantalla de entrada: se cierra sola, con un clic o con cualquier tecla
  function interstitial(n, title, mod) {
    return new Promise((res) => {
      const unit = UNITS.find((u) => u.id === mod.unit);
      const tag = `Unidad ${mod.tema} · Clase${mod.clases.length > 2 ? 's' : ''} ${mod.clases} · ${unit.title}`;
      const stages = PIPES[mod.id];
      const el = document.createElement('div');
      el.className = 'inter';
      el.dataset.u = mod.unit;
      el.tabIndex = -1;
      el.setAttribute('role', 'dialog');
      el.setAttribute('aria-modal', 'true');
      el.setAttribute('aria-label', `Lección ${n}: ${title.replace(/<[^>]*>/g, '')}`);
      el.innerHTML = `<div class="inter-box">
        <p class="inter-typed" style="--steps:${tag.length}" aria-hidden="true">${tag}</p>
        <h2>${mod.title}</h2>
        <p class="inter-pipe" aria-hidden="true">${stages.map((s, i) => `${i ? '<span class="ar">→</span>' : ''}<span class="s" ${d((0.35 + i * 0.16).toFixed(2))}>${s}</span>`).join('')}</p>
        <p class="inter-trap"><span class="lbl">Trampa típica del parcial</span>${TRAPS[mod.id]}</p>
        <p class="inter-hint">Tocá o presioná una tecla para entrar</p>
      </div>`;
      let closed = false;
      const end = (e) => {
        if (closed) return;
        closed = true;
        // La tecla que cierra no llega a los atajos de la guía (flechas, /, Escape)
        if (e?.type === 'keydown') { e.preventDefault(); e.stopPropagation(); }
        window.removeEventListener('keydown', end, true);
        el.classList.add('out');
        setTimeout(() => el.remove(), 330);
        res();
      };
      el.addEventListener('click', end);
      window.addEventListener('keydown', end, true);
      document.body.append(el);
      el.focus();
      setTimeout(end, 3600);
    });
  }

  // Al entrar a una lección de otro módulo. skip = true solo registra el módulo (primera carga).
  let lastModule = null;
  function intro(lessonId, skip) {
    const i = LESSONS.findIndex((l) => l.id === lessonId);
    const mod = MODULES.find((m) => m.id === LESSONS[i]?.module);
    if (!mod || mod.id === lastModule) return Promise.resolve();
    lastModule = mod.id;
    if (skip || RM.matches || !PIPES[mod.id]) return Promise.resolve();
    return interstitial(i + 1, LESSONS[i].title, mod);
  }

  window.ANIM = { intro, glyph };
})();
