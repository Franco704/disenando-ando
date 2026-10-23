/* Unidad VI, clase 21: verificación y validación, pruebas estáticas y dinámicas, calidad del diseño, pruebas de unidad y diseño de casos de prueba. Diapositivas Clase21, Sommerville 9ª ed. cap. 8, págs. 205-216; Pressman cap. 14. */
(() => {
  const { LESSONS, h } = window.GUIDE;
  const { note, def, table, fig, lab, uml: U } = h;

  const cajaNegra = fig(U.svg(600, 220, `
    <ellipse cx="110" cy="110" rx="96" ry="96" class="u-blk"/><text x="110" y="34" class="u-c u-sans u-b">Entradas I</text>
    <ellipse cx="130" cy="140" rx="46" ry="34" class="u-blk k-err"/><text x="130" y="144" class="u-c u-sans u-b t-err">Ie</text><text x="70" y="100" class="u-c u-sm">válidas</text>
    ${U.blk(240, 70, 120, 80, 'Sistema', { cls: 'k-a' })}
    <ellipse cx="490" cy="110" rx="96" ry="96" class="u-blk"/><text x="490" y="34" class="u-c u-sans u-b">Salidas O</text>
    <ellipse cx="470" cy="140" rx="46" ry="34" class="u-blk k-err"/><text x="470" y="144" class="u-c u-sans u-b t-err">Oe</text>
    ${U.ln([[206, 100], [240, 100]], { end: 'ar' })}${U.ln([[360, 100], [394, 100]], { end: 'ar' })}${U.ln([[176, 140], [240, 136]], { end: 'ar', cls: 's-err' })}${U.ln([[360, 136], [424, 140]], { end: 'ar', cls: 's-err' })}`,
    'Modelo de entrada y salida: las entradas Ie producen salidas erróneas Oe'),
    'El sistema como caja negra (Sommerville, figura 8.2). Las <strong>pruebas de defectos</strong> buscan las entradas <strong>Ie</strong> que provocan salidas erróneas <strong>Oe</strong>; las <strong>de validación</strong> usan entradas correctas (fuera de Ie) para mostrar las salidas previstas.');

  const inspecciones = fig(U.svg(620, 200, `
    ${['Especificación de\nrequerimientos', 'Arquitectura\nde software', 'Modelos de diseño\nUML', 'Esquemas de\nbase de datos', 'Programa'].map((t, i) => U.blk(6 + i * 123, 60, 112, 50, t, { bold: false, cls: i === 4 ? 'k-a' : '' })).join('')}
    ${U.blk(250, 4, 120, 30, 'Inspecciones', { cls: 'k-if' })}${[0, 1, 2, 3, 4].map((i) => U.ln([[310, 34], [62 + i * 123, 60]], { end: 'ar', dash: true })).join('')}
    ${U.blk(250, 150, 120, 30, 'Pruebas', { cls: 'k-ok' })}${U.blk(450, 150, 160, 30, 'Prototipo del sistema', { bold: false })}
    ${U.ln([[370, 165], [494, 110]], { end: 'ar' })}${U.ln([[370, 165], [450, 165]], { end: 'ar' })}`,
    'Inspecciones aplicables a todas las representaciones del software y pruebas aplicables al programa y al prototipo'),
    'Inspecciones y pruebas (Sommerville, figura 8.5). Las inspecciones (estáticas) se aplican a <strong>cualquier representación legible</strong>; las pruebas (dinámicas), solo a lo que se puede <strong>ejecutar</strong>: el programa o un prototipo.');

  const particiones = fig(U.svg(620, 230, `
    <ellipse cx="160" cy="115" rx="150" ry="105" class="u-blk"/><text x="160" y="24" class="u-c u-sans u-b">Entradas posibles</text>
    ${[[100, 80, 60, 38], [210, 80, 60, 38], [160, 165, 90, 36]].map(([x, y, rx, ry]) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" class="u-blk k-a"/>`).join('')}
    ${[[100, 80], [62, 80], [210, 80], [258, 80], [160, 165], [90, 165], [230, 165]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="4" class="${[1, 3, 5, 6].includes(i) ? 'f-err' : 'f-a'}"/>`).join('')}
    ${U.blk(330, 90, 90, 50, 'Sistema', { cls: 'k-a' })}${U.ln([[310, 115], [330, 115]], { end: 'ar' })}${U.ln([[420, 115], [440, 115]], { end: 'ar' })}
    <ellipse cx="530" cy="115" rx="84" ry="80" class="u-blk"/><ellipse cx="530" cy="100" rx="50" ry="34" class="u-blk k-ok"/><text x="530" y="104" class="u-c u-sm">partición</text><text x="530" y="118" class="u-c u-sm">de salida</text><text x="530" y="28" class="u-c u-sans u-b">Salidas</text>
    <text x="160" y="228" class="u-c u-sm">● medio de la partición   ● frontera</text>`,
    'Particiones de equivalencia de entrada y salida, con casos de prueba en el medio y en las fronteras'),
    'Particiones de equivalencia (Sommerville, figura 8.6). El programa debe tratar igual a todos los miembros de una partición; los casos se eligen <strong>cerca del medio</strong> y <strong>en las fronteras</strong>, porque los valores atípicos se suelen pasar por alto.');

  LESSONS.push(
    {
      id: 'verificacion-y-validacion',
      module: 'm17',
      title: 'Verificación y validación del diseño',
      keywords: 'pruebas metas validación defectos datos artificiales requerimientos software personalizado genérico caja negra Ie Oe Dijkstra presencia ausencia errores Boehm producto correcto construimos bien V&V confianza adecuado',
      tldr: 'Las pruebas tienen 2 metas: <strong>validación</strong> (mostrar que el programa hace lo que debe) y <strong>defectos</strong> (encontrar dónde falla). Boehm: <mark>Validación: ¿construimos el producto correcto? Verificación: ¿construimos bien el producto?</mark> Y Dijkstra: las pruebas muestran la presencia de errores, nunca su ausencia.',
      goals: ['Explicar las 2 metas de las pruebas.', 'Diferenciar verificación y validación (Boehm).', 'Interpretar el modelo de caja negra Ie/Oe.', 'Citar a Dijkstra y explicar el objetivo final de V&V.'],
      body: `
        <h2>Las 2 metas de las pruebas</h2>
        ${table(['Pruebas de validación', 'Pruebas de defectos'], [
          ['Intentan demostrar que el programa <strong>hace lo que se intenta</strong> que haga: se ejecuta con datos artificiales y se demuestra al desarrollador y al cliente que cumple los requerimientos.', 'Buscan <strong>descubrir defectos</strong> antes de usar el software: situaciones donde el comportamiento es incorrecto, indeseable o no cumple la especificación.'],
          ['En software <strong>personalizado</strong>: al menos una prueba por requerimiento. En software <strong>genérico</strong>: probar todas las características y sus combinaciones.', 'Finalidad: erradicar comportamientos indeseables: caídas, interacciones no deseadas con otros sistemas, cálculos incorrectos, corrupción de datos.'],
          ['Los casos de prueba reflejan el <strong>uso previsto</strong>; se espera que el sistema funcione bien.', 'Los casos se <strong>diseñan para encontrar defectos</strong>.'],
        ])}
        <p>No hay una frontera definida: durante la validación aparecen defectos, y las pruebas de defectos pueden demostrar que el programa cumple sus requerimientos.</p>
        ${cajaNegra}
        ${def('Dijkstra (1972)', 'Las pruebas pueden mostrar sólo la presencia de errores, mas no su ausencia.', 'Citado por Sommerville, cap. 8.')}
        <p>Las pruebas no pueden demostrar que el software no tenga defectos ni que se comportará bien en cualquier circunstancia: siempre puede haber una prueba que pasamos por alto y que descubriría más problemas.</p>

        <h2>Verificación y validación (V&V)</h2>
        <p>Las pruebas son parte de un proceso más amplio de <strong>V&V</strong>. Verificación y validación no son lo mismo, aunque se confunden seguido. Boehm (1979) lo resumió así:</p>
        ${fig(U.svg(560, 120, `${U.blk(10, 10, 260, 100, '', { cls: 'k-a' })}<text x="140" y="40" class="u-c u-sans u-b t-a">Validación</text><text x="140" y="64" class="u-c u-sans">¿construimos el</text><text x="140" y="82" class="u-c u-sans u-b">producto correcto?</text>
          ${U.blk(290, 10, 260, 100, '', { cls: 'k-if' })}<text x="420" y="40" class="u-c u-sans u-b t-if">Verificación</text><text x="420" y="64" class="u-c u-sans">¿construimos</text><text x="420" y="82" class="u-c u-sans u-b">bien el producto?</text>`, 'Diferencia de Boehm entre validación y verificación'), 'Validación mira las <strong>expectativas del cliente</strong>; verificación mira la <strong>especificación</strong>.')}
        ${table(['', 'Verificación', 'Validación'], [
          ['Pregunta', '¿Construimos bien el producto?', '¿Construimos el producto correcto?'],
          ['Compara contra', 'La especificación: requerimientos funcionales y no funcionales establecidos.', 'Lo que el cliente realmente espera.'],
          ['Alcance', 'Conformidad con la especificación.', 'Proceso más general: las especificaciones no siempre reflejan los deseos o necesidades reales del cliente.'],
        ])}
        <p>V&V empieza <strong>apenas están los requerimientos</strong> y sigue durante todo el desarrollo. Su objetivo final es <strong>establecer confianza</strong> de que el software es “adecuado”: suficientemente bueno para su uso esperado.</p>
        ${note('Si el sistema cumple todos los requisitos firmados pero el cliente no puede usarlo para su trabajo real, la <strong>verificación pasó</strong> y la <strong>validación falló</strong>.', 'exam')}
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿Verificación o validación?',
        buckets: ['Verificación', 'Validación'],
        items: [
          { t: 'Comprobar que el cálculo de impuestos coincide con la fórmula especificada.', b: 0 },
          { t: 'Una enfermera usa el sistema en la guardia y no le sirve para su rutina.', b: 1 },
          { t: 'Revisar que el diseño cumpla el requisito de responder en menos de 2 segundos.', b: 0 },
          { t: 'Preguntarse si el producto resuelve el problema real del cliente.', b: 1 },
          { t: 'Una inspección del código contra los estándares y el diseño.', b: 0 },
          { t: 'Pruebas de aceptación con usuarios reales en su entorno.', b: 1 },
        ],
      }],
      quiz: [
        { q: 'Según Boehm, ¿qué pregunta responde la validación?', o: ['¿Construimos el producto correcto?', '¿Construimos bien el producto?', '¿Probamos todo el código?', '¿Cumplimos el plazo?'], a: 0, e: 'Verificación: ¿construimos bien el producto?' },
        { q: '¿Qué dijo Dijkstra sobre las pruebas?', o: ['Que muestran solo la presencia de errores, no su ausencia', 'Que garantizan la ausencia de errores', 'Que son innecesarias con buenos programadores', 'Que deben automatizarse por completo'], a: 0, e: 'Siempre puede quedar una prueba no hecha que descubriría más problemas.' },
        { q: 'En software personalizado, ¿cuántas pruebas de validación debe haber como mínimo?', o: ['Al menos una por cada requerimiento', 'Una por módulo', 'Una por caso de uso real', 'Una por sprint'], a: 0, e: 'En software genérico, todas las características y sus combinaciones.' },
        { q: '¿Qué buscan las pruebas de defectos en el modelo de caja negra?', o: ['Las entradas Ie que dan salidas Oe', 'Las salidas correctas del sistema', 'El código fuente defectuoso', 'Los requerimientos faltantes'], a: 0, e: 'Las de validación usan entradas fuera de Ie.' },
        { q: '¿Cuándo comienza la V&V?', o: ['Apenas están los requerimientos', 'Al terminar la codificación', 'En la entrega al cliente', 'Solo en el mantenimiento'], a: 0, e: 'No es una etapa final.' },
        { q: '¿Cuál es el objetivo final de V&V?', o: ['Confianza en que el software es adecuado', 'Demostrar que el software no tiene errores', 'Cumplir con las cláusulas del contrato', 'Reducir el costo total del proyecto'], a: 0, e: 'Adecuado significa suficientemente bueno para su propósito.' },
        { q: '¿Por qué la validación es más general que la verificación?', o: ['La especificación puede no reflejar lo que el cliente necesita', 'Porque la validación incluye una mayor cantidad de pruebas', 'Porque la validación la hace el propio equipo de desarrollo', 'Porque la validación no usa los requerimientos como base'], a: 0, e: 'Verificar es cumplir la especificación; validar, cumplir las expectativas.' },
      ],
      sources: [{ title: 'Ingeniería de Software, 9ª ed.', ref: 'Sommerville, cap. 8, págs. 205-208', points: ['Metas de las pruebas, figura 8.2, Dijkstra y Boehm.'] }],
    },

    {
      id: 'estaticas-y-dinamicas',
      module: 'm17',
      title: 'Pruebas estáticas y dinámicas',
      keywords: 'inspecciones revisiones estáticas dinámicas ventajas interacción de errores versiones incompletas estándares portabilidad mantenibilidad Fagan 60% casos de prueba datos de prueba 3 etapas desarrollo versión usuario aceptación manuales automatizadas regresión',
      tldr: 'Las <mark>inspecciones</mark> son V&V <strong>estática</strong>: no ejecutan el software y se aplican a cualquier representación. Tienen 3 ventajas y encuentran más del 60% de los errores (Fagan), pero <strong>no reemplazan</strong> las pruebas <mark>dinámicas</mark>. Todo sistema pasa por 3 etapas de pruebas: <strong>desarrollo, versión y usuario</strong>.',
      goals: ['Diferenciar V&V estática y dinámica.', 'Dar las 3 ventajas de las inspecciones y su límite.', 'Distinguir caso de prueba y dato de prueba.', 'Enumerar las 3 etapas de pruebas.', 'Comparar pruebas manuales y automatizadas.'],
      body: `
        <h2>Inspecciones y revisiones: V&V estática</h2>
        <p>Son técnicas “estáticas”: <strong>no hace falta ejecutar el software</strong>. Se enfocan sobre todo en el código fuente, pero se puede inspeccionar <strong>cualquier representación legible</strong>: requerimientos, modelo de diseño, esquemas de base de datos.</p>
        ${inspecciones}
        <h3>3 ventajas de las inspecciones sobre las pruebas</h3>
        <ol>
          <li><strong>Los errores no se ocultan entre sí</strong>: en las pruebas, un error puede producir salidas inesperadas y nunca sabemos si las anomalías siguientes son errores nuevos o efectos del primero. La inspección es estática: no hay interacción entre errores y una sesión puede descubrir muchos.</li>
          <li>Se pueden inspeccionar <strong>versiones incompletas</strong> del sistema.</li>
          <li>Además de defectos, encuentran incumplimiento de <strong>estándares</strong>, problemas de <strong>portabilidad</strong> y <strong>mantenibilidad</strong>, ineficiencias, algoritmos inadecuados y estilos difíciles de mantener.</li>
        </ol>
        <p>Son <strong>más efectivas</strong> que las pruebas para descubrir defectos: según <strong>Fagan (1986)</strong>, más del <strong>60%</strong> de los errores de un programa se detectan con inspecciones.</p>
        ${note('Pero <strong>no sustituyen a las pruebas dinámicas</strong>: no sirven para descubrir defectos por <strong>interacciones</strong> entre partes del programa, problemas de <strong>temporización</strong> ni de <strong>rendimiento</strong>. En equipos chicos es difícil y caro armar un equipo de inspección separado.', 'exam')}

        <h2>Pruebas del software: V&V dinámica</h2>
        ${table(['Caso de prueba', 'Dato de prueba'], [['Especificación de las <strong>entradas</strong>, la <strong>salida esperada</strong> y lo que se pone a prueba.', 'Las <strong>entradas</strong> diseñadas para probar el sistema.'], ['<strong>No</strong> se puede generar automáticamente: hay que saber qué debe hacer el sistema para especificar los resultados previstos.', '<strong>Sí</strong> se puede generar automáticamente.']])}
        <p>Lo que sí se automatiza es la <strong>ejecución</strong>: los resultados previstos se comparan automáticamente con los obtenidos.</p>
        <h3>Las 3 etapas de pruebas</h3>
        ${fig(U.svg(600, 110, `${[['Pruebas de desarrollo', 'diseñadores y programadores buscan bugs'], ['Pruebas de versión', 'un equipo separado prueba la versión completa'], ['Pruebas de usuario', 'usuarios reales en su entorno']].map(([t, s], i) => U.blk(6 + i * 200, 20, 186, 70, t, { cls: ['k-a', 'k-if', 'k-ok'][i], sub: s })).join('')}${U.ln([[192, 55], [206, 55]], { end: 'ar' })}${U.ln([[392, 55], [406, 55]], { end: 'ar' })}`, 'Tres etapas de pruebas'), 'Las 3 etapas por las que pasa un sistema. Se desarrollan en las dos lecciones siguientes y en el módulo próximo.')}
        <ol>
          <li><strong>Pruebas de desarrollo</strong>: se descubren errores (bugs) y defectos; intervienen diseñadores y programadores.</li>
          <li><strong>Pruebas de versión</strong>: un equipo de prueba separado prueba una versión completa antes de presentarla a los usuarios, para comprobar que cumple los requerimientos.</li>
          <li><strong>Pruebas de usuario</strong>: usuarios reales o potenciales prueban el sistema en su entorno. En empresas de software masivo, el “usuario” es un grupo interno que decide si el producto está listo para vender. Las <strong>pruebas de aceptación</strong> son las del cliente para decidir si acepta el sistema.</li>
        </ol>
        <h3>Manuales y automatizadas</h3>
        ${table(['Pruebas manuales', 'Pruebas automatizadas'], [['Un examinador opera el programa con datos de prueba, compara los resultados con sus expectativas y anota las discrepancias.', 'Un programa ejecuta las pruebas sobre el sistema en desarrollo. Mucho más rápidas, sobre todo en las <strong>pruebas de regresión</strong>: volver a correr las pruebas anteriores para comprobar que los cambios no introdujeron bugs.']])}
        <p>Las pruebas <strong>nunca se automatizan por completo</strong>: es imposible usarlas para probar <strong>interfaces de usuario</strong> o para probar que un programa no tiene <strong>efectos colaterales</strong> indeseados.</p>
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿Lo detecta mejor una inspección o una prueba dinámica?',
        buckets: ['Inspección (estática)', 'Prueba dinámica'],
        items: [
          { t: 'El código no respeta el estándar de nombres del equipo.', b: 0 },
          { t: 'Dos procesos acceden a la vez a un dato y se produce una condición de carrera.', b: 1 },
          { t: 'Un error en el modelo de diseño UML antes de programar.', b: 0 },
          { t: 'El sistema tarda 9 segundos con 500 usuarios simultáneos.', b: 1 },
          { t: 'Un algoritmo de ordenamiento ineficiente en un módulo sin terminar.', b: 0 },
          { t: 'Un fallo que solo aparece cuando el módulo A llama a B con un valor nulo.', b: 1 },
        ],
      }],
      quiz: [
        { q: '¿Por qué las inspecciones son técnicas “estáticas”?', o: ['Porque no requieren ejecutar el software', 'Porque se hacen una sola vez', 'Porque no cambian el código', 'Porque solo revisan la documentación'], a: 0, e: 'Se aplican a cualquier representación legible.' },
        { q: '¿Cuál es una ventaja de las inspecciones sobre las pruebas?', o: ['Los errores no se ocultan entre sí', 'Detectan problemas de rendimiento', 'Detectan problemas de temporización', 'Se pueden automatizar por completo'], a: 0, e: 'Además sirven con versiones incompletas y revisan estándares y mantenibilidad.' },
        { q: 'Según Fagan, ¿qué porcentaje de errores se detecta con inspecciones?', o: ['Más del 60%', 'Alrededor del 10%', 'El 100%', 'Menos del 30%'], a: 0, e: 'Son más efectivas que las pruebas para descubrir defectos.' },
        { q: '¿Qué NO pueden detectar las inspecciones?', o: ['Interacción, temporización y rendimiento', 'Incumplimiento de estándares de código', 'Algoritmos inadecuados o ineficientes', 'Problemas de mantenibilidad del código'], a: 0, e: 'Por eso no reemplazan a las pruebas dinámicas.' },
        { q: '¿Qué se puede generar automáticamente?', o: ['Los datos de prueba', 'Los casos de prueba', 'Los resultados esperados', 'Los requerimientos'], a: 0, e: 'Los casos necesitan saber qué debe hacer el sistema.' },
        { q: '¿Cuáles son las 3 etapas de pruebas de un sistema?', o: ['Desarrollo, versión y usuario', 'Unidad, integración y sistema', 'Alfa, beta y aceptación', 'Estática, dinámica y regresión'], a: 0, e: 'Unidad, componente y sistema son niveles dentro de las pruebas de desarrollo.' },
        { q: '¿Qué son las pruebas de regresión?', o: ['Volver a correr pruebas viejas tras un cambio', 'Probar versiones anteriores del sistema', 'Las pruebas que hacen los usuarios finales', 'Pruebas de rendimiento con carga decreciente'], a: 0, e: 'Por eso conviene automatizarlas.' },
        { q: '¿Qué no se puede probar con pruebas automatizadas?', o: ['Interfaces de usuario y efectos colaterales', 'Los métodos de una clase individual', 'Los cálculos con resultados esperados', 'Las regresiones después de un cambio'], a: 0, e: 'Las pruebas nunca se automatizan por completo.' },
      ],
      sources: [{ title: 'Ingeniería de Software, 9ª ed.', ref: 'Sommerville, cap. 8, págs. 208-210', points: ['Inspecciones y pruebas (figura 8.5), etapas de pruebas, pruebas manuales y automatizadas.'] }],
    },

    {
      id: 'calidad-y-pruebas-de-unidad',
      module: 'm17',
      title: 'Calidad del diseño y pruebas de unidad',
      keywords: 'calidad costo del software defectuoso 45% 100 mil millones 3 a 4 defectos por mil líneas 1 error cada 10 líneas Howard Newton DeMarco calidad del diseño calidad de la conformidad definición calidad del software pruebas de desarrollo depuración unidad componentes sistema clases métodos atributos estados configuración llamada declaración',
      tldr: 'El mal software es una plaga y la culpa es de clientes y desarrolladores a la vez. La <mark>calidad del software</mark> es “un proceso eficaz que crea un producto útil, con valor medible para quien lo produce y quien lo usa”. Las <strong>pruebas de desarrollo</strong> tienen 3 niveles: <strong>unidad, componente y sistema</strong>. En las de <mark>unidad</mark> se prueban todos los métodos, atributos y estados de cada clase, idealmente en forma automatizada.',
      goals: ['Dar cifras del costo del software defectuoso.', 'Diferenciar calidad del diseño y de la conformidad.', 'Definir calidad del software (Pressman).', 'Describir los 3 niveles de las pruebas de desarrollo.', 'Explicar cómo se prueba una clase y las 3 partes de una prueba automatizada.'],
      body: `
        <h2>Calidad del diseño</h2>
        <ul>
          <li>El código defectuoso es responsable de hasta el <strong>45%</strong> del tiempo fuera de servicio de los sistemas.</li>
          <li>Cuesta más de <strong>100 mil millones de dólares por año</strong> en pérdidas y reparaciones en EE. UU., más el costo de perder clientes disgustados.</li>
          <li>Bastan <strong>3 o 4 defectos por cada 1000 líneas</strong> para que un programa funcione mal, y la mayoría de los programadores comete <strong>1 error cada 10 líneas</strong>: corregir errores cuesta <strong>la mitad del presupuesto</strong> de desarrollo.</li>
        </ul>
        <p>El mal software causa horas perdidas, máquinas fuera de uso, datos perdidos o corruptos, ventas perdidas, costos altos de soporte y poca satisfacción. ¿De quién es la culpa? Los clientes culpan a los desarrolladores por sus prácticas descuidadas; los desarrolladores, a los clientes por fechas irracionales y cambios continuos. <strong>Ambos tienen razón.</strong> “La gente olvida cuán rápido hiciste un trabajo, pero siempre recuerda cuán bien lo realizaste” (Howard Newton).</p>
        ${table(['Calidad del diseño', 'Calidad de la conformidad'], [['Las características que los diseñadores especifican para un producto. Aumenta si se fabrica de acuerdo con las especificaciones.', 'Que el producto satisfaga al usuario: la calidad importa, pero si el usuario no está satisfecho, no sirve.']])}
        <p>“La calidad de un producto está en función de cuánto cambia al mundo para bien” (DeMarco): si un software beneficia mucho a los usuarios, tolerarán problemas ocasionales de confiabilidad o desempeño.</p>
        ${def('Calidad del software', 'Proceso eficaz de software que crea un producto útil, que proporciona valor medible a quienes lo producen y a quienes lo utilizan.', 'Pressman, cap. 14, págs. 338-352.')}

        <h2>Pruebas de desarrollo</h2>
        <p>Las realiza el equipo que elabora el sistema; el examinador suele ser el mismo programador (algunos procesos usan parejas programador/examinador). Vienen entrelazadas con la <strong>depuración</strong> (debugging): localizar los problemas del código y cambiar el programa para corregirlos, con herramientas de depuración interactivas y de IA.</p>
        ${fig(U.svg(600, 150, `<rect x="10" y="10" width="580" height="130" rx="10" class="u-lyr"/><text x="24" y="30" class="u-sans u-b">3. Pruebas del sistema: interacción de componentes</text>
          <rect x="40" y="42" width="300" height="88" rx="8" class="u-blk k-if"/><text x="54" y="62" class="u-sans u-b">2. Pruebas de componentes: interfaces</text>
          ${[0, 1, 2].map((i) => `<rect x="${60 + i * 92}" y="76" width="80" height="40" rx="5" class="u-blk k-a"/><text x="${100 + i * 92}" y="100" class="u-c u-sm">clase</text>`).join('')}
          <text x="360" y="90" class="u-sans u-b">1. Pruebas de unidad:</text><text x="360" y="108" class="u-sans">métodos de clases individuales</text>`, 'Los tres niveles de las pruebas de desarrollo anidados'), 'Los 3 niveles de granularidad de las pruebas de desarrollo.')}
        ${table(['Nivel', 'Qué se prueba', 'Foco'], [['1. Unidad', 'Unidades de programa: clases individuales.', 'La funcionalidad de sus métodos.'], ['2. Componentes', 'Varias unidades integradas en componentes compuestos.', 'Las interfaces del componente.'], ['3. Sistema', 'Los componentes integrados en un sistema, probado como un todo.', 'Las interacciones entre componentes.']])}

        <h2>Pruebas de unidad</h2>
        <p>Prueban los componentes del programa: las clases y principalmente sus métodos. Una clase se prueba así:</p>
        <ul>
          <li>probar <strong>todos sus métodos</strong>;</li>
          <li>establecer y verificar el valor de <strong>todos sus atributos</strong>;</li>
          <li>poner el objeto en <strong>todos los estados posibles</strong>, simulando los eventos que causan cada cambio de estado.</li>
        </ul>
        <p>Siempre que se pueda, se <strong>automatizan</strong>: se completan en segundos y se ejecutan cada vez que cambia el programa. Un conjunto automatizado tiene 3 partes:</p>
        <ol>
          <li><strong>Configuración</strong>: inicializa la prueba con el caso de prueba (entradas y salidas esperadas).</li>
          <li><strong>Llamada</strong> (call): invoca el método a probar.</li>
          <li><strong>Declaración</strong> (aserción): compara el resultado con el esperado. Si es verdadera, la prueba tuvo éxito; si no, fracasó.</li>
        </ol>
        <pre class="code" data-lang="java">@Test
void totalConDosLineas() {
    // 1. configuración
    Venta v = new Venta();
    v.crearLineaDeVenta(new Especificacion("Té", 100), 2);
    v.crearLineaDeVenta(new Especificacion("Pan", 50), 1);
    // 2. llamada
    Dinero total = v.getTotal();
    // 3. declaración
    assertEquals(new Dinero(250), total);
}</pre>
        ${lab(0)}
      `,
      labs: [{ type: 'order', title: 'Partes de una prueba automatizada', items: ['Configuración: inicializar con entradas y salidas esperadas', 'Llamada al método que se va a probar', 'Declaración: comparar el resultado con el esperado'], explain: '<p>Es el patrón conocido como “arrange, act, assert”.</p>' }],
      quiz: [
        { q: '¿Cuántos defectos cada 1000 líneas bastan para que un programa funcione mal?', o: ['3 a 4', '30 a 40', '1', '100'], a: 0, e: 'Y la mayoría de los programadores comete 1 error cada 10 líneas.' },
        { q: '¿Quién tiene la culpa del mal software según las diapositivas?', o: ['Clientes y desarrolladores, ambos', 'Solo los desarrolladores', 'Solo los clientes', 'Los gerentes'], a: 0, e: 'Prácticas descuidadas por un lado y fechas irracionales y cambios por otro.' },
        { q: '¿Cómo define Pressman la calidad del software?', o: ['Proceso eficaz que crea un producto útil con valor medible', 'Software que no tiene ningún error conocido al entregarse', 'Software que se entrega dentro del plazo y del presupuesto', 'Software completamente documentado y fácil de mantener'], a: 0, e: 'Es la definición de las diapositivas.' },
        { q: '¿Cuáles son los 3 niveles de las pruebas de desarrollo?', o: ['Unidad, componentes y sistema', 'Alfa, beta y aceptación', 'Desarrollo, versión y usuario', 'Estáticas, dinámicas y de regresión'], a: 0, e: 'Cada nivel se enfoca en métodos, interfaces e interacciones.' },
        { q: 'En las pruebas de unidad, ¿qué se hace con una clase?', o: ['Probar métodos, atributos y todos sus estados', 'Probar solo los métodos públicos más usados', 'Probar solo la interfaz que expone a otros', 'Inspeccionar su código sin ejecutarlo'], a: 0, e: 'Hay que simular los eventos que cambian de estado.' },
        { q: '¿Cuáles son las 3 partes de una prueba automatizada?', o: ['Configuración, llamada y declaración', 'Diseño, código y prueba', 'Entrada, proceso y salida', 'Planificación, ejecución y cierre'], a: 0, e: 'La declaración compara con el resultado esperado.' },
        { q: '¿Qué es la depuración?', o: ['Localizar y corregir los defectos', 'Encontrar si hay defectos en el código', 'Una prueba de aceptación con el cliente', 'La inspección estática del código'], a: 0, e: 'Viene entrelazada con las pruebas de desarrollo.' },
        { q: '¿Cuánto del presupuesto de desarrollo puede costar corregir errores?', o: ['La mitad', 'Un 5%', 'Un 90%', 'Nada si se usa TDD'], a: 0, e: 'Es una de las cifras de la clase.' },
      ],
      sources: [{ title: 'Ingeniería de Software, 9ª ed.', ref: 'Sommerville, cap. 8, págs. 210-213', points: ['Pruebas de desarrollo y pruebas de unidad.'] }, { title: 'Ingeniería del Software, 7ª ed.', ref: 'Pressman, cap. 14, págs. 338-352', points: ['Calidad del software, del diseño y de la conformidad; costo del mal software.'] }],
    },

    {
      id: 'casos-de-prueba-de-unidad',
      module: 'm17',
      title: 'Diseño de casos de pruebas de unidad',
      keywords: 'casos de prueba efectivos pruebas de partición particiones de equivalencia entrada salida frontera valores límite medio pruebas basadas en lineamientos Whittaker mensajes de error buffers desbordar repetir entradas salidas inválidas resultados demasiado grandes pequeños',
      tldr: 'Probar es caro: hay que elegir <strong>casos efectivos</strong>. Dos estrategias: <mark>pruebas de partición</mark> (agrupar entradas que se procesan igual en <strong>particiones de equivalencia</strong> y elegir casos en el medio y en las <strong>fronteras</strong>) y <mark>pruebas basadas en lineamientos</mark> (la experiencia de qué errores se cometen; los 5 de Whittaker).',
      goals: ['Explicar las 2 estrategias para elegir casos de prueba.', 'Identificar particiones de entrada y salida.', 'Elegir casos en el medio y en las fronteras.', 'Aplicar los lineamientos de Whittaker.'],
      body: `
        <h2>Particiones de equivalencia</h2>
        <p>Las pruebas son costosas y consumen tiempo: hay que elegir casos de unidad <strong>efectivos</strong>. Hay 2 estrategias:</p>
        <ol>
          <li><strong>Pruebas de partición</strong>: identificar grupos de entradas con características comunes que se procesan de la misma forma, y elegir las pruebas dentro de cada grupo.</li>
          <li><strong>Pruebas basadas en lineamientos</strong>: usar la experiencia previa sobre los tipos de errores que suelen cometerse.</li>
        </ol>
        <p>Los datos de entrada y los resultados de salida caen en clases con características comunes (por ejemplo, enteros positivos y negativos). El programa se comporta de forma comparable con todos los miembros de una clase: por ese comportamiento equivalente se llaman <strong>particiones de equivalencia</strong>. Hay particiones de <strong>entrada</strong> y de <strong>salida</strong> (salidas que tienen algo en común).</p>
        ${particiones}
        ${note('Regla para diseñar los casos: identificar todas las particiones de entrada y salida y elegir casos <strong>en las fronteras</strong> de cada partición y <strong>cerca del medio</strong>. Los valores frontera son atípicos y los desarrolladores suelen pasarlos por alto: ahí aparecen fallas.', 'exam')}
        <p><strong>Ejemplo</strong>: un programa acepta de 4 a 10 entradas, cada una un entero de 5 dígitos (10000 a 99999). Particiones de cantidad: <strong>menos de 4, entre 4 y 10, más de 10</strong>; casos: 3, 4, 7 (medio), 10 y 11. Particiones de valor: <strong>menor que 10000, de 10000 a 99999, mayor que 99999</strong>; casos: 9999, 10000, 50000, 99999 y 100000.</p>
        ${lab(0)}

        <h2>Pruebas basadas en lineamientos (Whittaker, 2002)</h2>
        <ul>
          <li>Elegir entradas que fuercen al sistema a generar <strong>todos los mensajes de error</strong>.</li>
          <li>Diseñar entradas que hagan <strong>desbordar los buffers</strong> de entrada.</li>
          <li><strong>Repetir</strong> varias veces la misma entrada o serie de entradas.</li>
          <li>Forzar la generación de <strong>salidas inválidas</strong>.</li>
          <li>Forzar resultados de cálculo <strong>demasiado grandes o demasiado pequeños</strong>.</li>
        </ul>
        <p>Con la experiencia, cada uno desarrolla sus propios lineamientos para elegir casos efectivos.</p>
      `,
      labs: [{
        type: 'calc', title: 'Generador de casos por particiones y fronteras',
        intro: 'Cargá el rango válido de una entrada entera. La calculadora arma las 3 particiones y propone los casos: fronteras de cada lado y un valor del medio.',
        fields: [{ id: 'min', label: 'Mínimo válido', value: 10000 }, { id: 'max', label: 'Máximo válido', value: 99999 }],
        run: (v) => {
          if (!Number.isFinite(v.min) || !Number.isFinite(v.max)) return 'Ingresá dos números.';
          if (v.min > v.max) return 'El mínimo no puede ser mayor que el máximo.';
          const mid = Math.round((v.min + v.max) / 2);
          return `Particiones:\n  P1 inválida  x < ${v.min}\n  P2 válida    ${v.min} ≤ x ≤ ${v.max}\n  P3 inválida  x > ${v.max}\n\nCasos de prueba:\n  ${v.min - 1}  frontera de P1 (debe rechazarse)\n  ${v.min}  frontera inferior de P2\n  ${mid}  medio de P2\n  ${v.max}  frontera superior de P2\n  ${v.max + 1}  frontera de P3 (debe rechazarse)`;
        },
      }],
      quiz: [
        { q: '¿Cuáles son las 2 estrategias efectivas para elegir casos de prueba?', o: ['Pruebas de partición y pruebas basadas en lineamientos', 'Pruebas de caja blanca y de caja negra', 'Pruebas manuales y automatizadas', 'Pruebas de unidad y de sistema'], a: 0, e: 'Son las que presenta Sommerville.' },
        { q: '¿Por qué se llaman particiones de equivalencia?', o: ['El programa trata igual a todos sus miembros', 'Porque todas tienen el mismo tamaño', 'Porque equivalen a los requerimientos', 'Porque se prueban todas en paralelo'], a: 0, e: 'Basta probar algunos miembros representativos.' },
        { q: '¿Dónde conviene elegir los casos de prueba de una partición?', o: ['En las fronteras y cerca del medio', 'Solo en el valor medio de cada partición', 'Al azar, para evitar sesgos del examinador', 'Solo fuera del rango válido de la entrada'], a: 0, e: 'Los valores frontera son atípicos y suelen pasarse por alto.' },
        { q: 'Una entrada válida va de 1 a 100. ¿Qué conjunto de casos es el mejor?', o: ['0, 1, 50, 100, 101', '1, 2, 3, 4, 5', '50, 51, 52, 53, 54', '-1000, -1, 1000, 2000'], a: 0, e: 'Fronteras de cada lado y un valor del medio.' },
        { q: '¿Cuál es un lineamiento de Whittaker?', o: ['Forzar todos los mensajes de error', 'Probar solo con entradas válidas', 'Evitar repetir las mismas entradas', 'No probar los valores extremos'], a: 0, e: 'También: desbordar buffers, repetir entradas, salidas inválidas y resultados extremos.' },
        { q: '¿Existen particiones de salida?', o: ['Sí: salidas con algo en común', 'No, solo particiones de entrada', 'Solo en los sistemas críticos', 'Solo en las pruebas de sistema'], a: 0, e: 'Hay que identificar las particiones de entrada y de salida.' },
      ],
      sources: [{ title: 'Ingeniería de Software, 9ª ed.', ref: 'Sommerville, cap. 8, págs. 213-216', points: ['Elección de casos de prueba de unidad: particiones (figuras 8.6 y 8.7) y lineamientos de Whittaker.'] }],
    },
  );
})();
