/* Unidad I, clases 3 y 4: metodologías tradicionales, integración de sistemas, iteración e incremento, plan vs. ágil, Manifiesto Ágil y XP.
   Diapositivas 03 y Clase4, Sommerville 9ª ed. caps. 2 y 3. */
(() => {
  const { LESSONS, h } = window.GUIDE;
  const { note, def, table, fig, lab, uml: U } = h;

  // Modelo en cascada: cada fase baja a la siguiente y hay retroalimentación hacia atrás
  const fases = ['Definición de\nrequerimientos', 'Diseño del sistema\ny del software', 'Implementación y\nprueba de unidad', 'Integración y\nprueba del sistema', 'Operación y\nmantenimiento'];
  const cascada = fig(U.svg(620, 300, `
    ${fases.map((t, i) => U.blk(10 + i * 112, 12 + i * 54, 150, 46, t, { cls: i === 1 ? 'k-a' : '' })).join('')}
    ${[0, 1, 2, 3].map((i) => U.ln([[160 + i * 112, 35 + i * 54], [178 + i * 112, 35 + i * 54], [178 + i * 112, 66 + i * 54]], { end: 'ar' })).join('')}
    ${[0, 1, 2, 3].map((i) => U.ln([[60 + (i + 1) * 112, 66 + i * 54], [60 + (i + 1) * 112, 50 + i * 54], [140 + i * 112, 50 + i * 54]], { end: 'ar', dash: true, cls: 's-x' })).join('')}
    <text x="20" y="290" class="u-sm">→ cada fase produce documentos “firmados” · ⇠ retroalimentación: las iteraciones son caras</text>`,
    'Modelo en cascada de cinco fases escalonadas con flechas hacia abajo y flechas punteadas de retroalimentación hacia la fase anterior'),
    'Modelo en cascada (ciclo de vida del software). Es dirigido por un plan: la fase siguiente no debería empezar hasta que termina la anterior, pero en la práctica las etapas se solapan y se retroalimentan.');

  // Desarrollo incremental: actividades concurrentes y versiones
  const incremental = fig(U.svg(600, 230, `
    ${U.blk(10, 80, 130, 60, 'Bosquejo de\nla descripción', { cls: 'k-ghost' })}
    ${['Especificación', 'Desarrollo', 'Validación'].map((t, i) => U.blk(200, 20 + i * 70, 150, 46, t, { cls: 'k-a' })).join('')}
    ${['Versión inicial', 'Versiones intermedias', 'Versión final'].map((t, i) => U.blk(420, 20 + i * 70, 170, 46, t, { bold: i === 2 })).join('')}
    ${[0, 1, 2].map((i) => U.ln([[140, 110], [200, 43 + i * 70]], { end: 'ar' })).join('')}
    ${[0, 1, 2].map((i) => U.ln([[350, 43 + i * 70], [420, 43 + i * 70]], { end: 'ar' })).join('')}
    ${U.ln([[275, 66], [275, 90]], { start: 'ar', end: 'ar' })}${U.ln([[275, 136], [275, 160]], { start: 'ar', end: 'ar' })}
    <text x="200" y="222" class="u-sm">actividades concurrentes, con rápida retroalimentación</text>`,
    'Desarrollo incremental: un bosquejo alimenta tres actividades concurrentes que producen versiones inicial, intermedias y final'),
    'Desarrollo incremental: especificación, desarrollo y validación entrelazadas. Cada versión agrega funcionalidad y se expone al comentario del usuario.');

  // Ingeniería orientada a la reutilización: etapas intermedias distintas
  const reuso = fig(U.svg(640, 130, `
    ${['Especificación de\nrequerimientos', 'Análisis de\ncomponentes', 'Modificación de\nrequerimientos', 'Diseño con\nreutilización', 'Desarrollo e\nintegración', 'Validación'].map((t, i) => U.blk(4 + i * 106, 20, 96, 56, t, { cls: i > 0 && i < 5 ? 'k-a' : '', bold: false })).join('')}
    ${[0, 1, 2, 3, 4].map((i) => U.ln([[100 + i * 106, 48], [110 + i * 106, 48]], { end: 'ar' })).join('')}
    ${U.ln([[264, 76], [264, 100], [158, 100], [158, 76]], { end: 'ar', dash: true, cls: 's-x' })}
    <text x="211" y="118" class="u-c u-sm">si no se puede modificar: buscar otros componentes</text>`,
    'Proceso orientado a la reutilización con seis etapas; las cuatro intermedias son distintas de otros procesos'),
    'Ingeniería de software orientada a la reutilización. La especificación y la validación son como en otros procesos; las cuatro etapas intermedias (resaltadas) son propias del modelo.');

  // Entrega incremental (Sommerville fig. 2.10)
  const entrega = fig(U.svg(620, 250, `
    ${['Definir bosquejo\nde requerimientos', 'Asignar requerimientos\na incrementos', 'Diseñar arquitectura\ndel sistema'].map((t, i) => U.blk(6 + i * 206, 10, 190, 50, t)).join('')}
    ${U.ln([[196, 35], [212, 35]], { end: 'ar' })}${U.ln([[402, 35], [418, 35]], { end: 'ar' })}
    ${['Desarrollar\nincremento', 'Validar\nincremento', 'Integrar\nincremento', 'Validar\nsistema'].map((t, i) => U.blk(6 + i * 154, 110, 140, 50, t, { cls: 'k-a' })).join('')}
    ${U.ln([[512, 60], [512, 85], [76, 85], [76, 110]], { end: 'ar' })}
    ${[0, 1, 2].map((i) => U.ln([[146 + i * 154, 135], [160 + i * 154, 135]], { end: 'ar' })).join('')}
    ${U.blk(470, 196, 140, 44, 'Sistema final', { cls: 'k-ok' })}
    ${U.ln([[540, 160], [540, 196]], { end: 'ar' })}
    ${U.ln([[464, 160], [464, 180], [76, 180], [76, 160]], { end: 'ar', dash: true, cls: 's-x' })}
    <text x="270" y="196" class="u-c u-sm">¿sistema incompleto? → siguiente incremento</text>`,
    'Entrega incremental: definir requerimientos, asignarlos a incrementos y diseñar la arquitectura; luego un ciclo de desarrollar, validar e integrar cada incremento hasta el sistema final'),
    'Entrega incremental. La arquitectura se diseña <em>una vez, al principio</em>; después se repite el ciclo por incremento, que se entrega y se usa en un entorno operacional real.');

  LESSONS.push(
    {
      id: 'modelos-de-proceso',
      module: 'm2',
      title: 'Modelos de proceso: cascada, incremental y reutilización',
      keywords: 'proceso de software plan driven dirigido por un plan ágil modelo en cascada waterfall ciclo de vida desarrollo incremental reutilización componentes COTS',
      tldr: 'Los procesos se dividen en <mark>dirigidos por un plan</mark> (todo se planifica antes y el avance se mide contra el plan) y <mark>ágiles</mark> (planeación incremental). Sommerville enseña tres modelos: <strong>cascada</strong>, <strong>desarrollo incremental</strong> e <strong>ingeniería orientada a la reutilización</strong>. En sistemas grandes se combinan.',
      goals: ['Definir proceso de software y modelo de proceso.', 'Describir el modelo en cascada y sus límites.', 'Comparar desarrollo incremental y cascada (3 ventajas, 2 problemas).', 'Explicar las 4 etapas intermedias de la ingeniería orientada a la reutilización.'],
      body: `
        <h2>Proceso de software</h2>
        <p>Un proceso de software es una serie de actividades relacionadas que llevan a elaborar un producto de software. Puede ser desarrollar desde cero, extender y modificar sistemas existentes o configurar e integrar software comercial y componentes. Los procesos son complejos, <strong>no hay un proceso ideal</strong> y cada organización diseña el suyo: siempre se lo puede mejorar.</p>
        ${table(['Dirigidos por un plan (plan-driven)', 'Procesos ágiles'], [['Todas las actividades se planean por anticipado y el avance se mide contra el plan.', 'La planeación es incremental: es más fácil modificar el proceso para reflejar los requerimientos cambiantes del cliente.']])}
        <p>Cada enfoque es adecuado para distintos tipos de software; en la práctica hay que encontrar un <strong>equilibrio</strong>.</p>
        ${def('Modelo de proceso de software', 'Representación simplificada del proceso de desarrollo de software.', 'Sommerville, cap. 2.')}

        <h2>1. El modelo en cascada</h2>
        <p>Fue el primer modelo. Toma las actividades fundamentales y las representa como <strong>fases separadas</strong>; por el paso de una fase “en cascada” a otra se lo llama modelo en cascada o <strong>ciclo de vida del software</strong>.</p>
        ${cascada}
        <ul>
          <li>Es <strong>dirigido por un plan</strong>: se planean y programan todas las actividades antes de empezar.</li>
          <li>El resultado de cada fase son <strong>documentos autorizados (“firmados”)</strong>, y la fase siguiente no debe comenzar hasta que termine la previa.</li>
          <li>En la práctica las etapas se <strong>solapan</strong> y se nutren: en el diseño aparecen problemas del análisis, en la codificación problemas de diseño. No es lineal: hay retroalimentación, pero las iteraciones son <strong>caras</strong> e implican rediseño.</li>
          <li>En operación y mantenimiento aparecen errores, omisiones y necesidades nuevas; el sistema debe evolucionar, y eso implica <strong>repetir etapas anteriores</strong>.</li>
        </ul>

        <h2>2. Desarrollo incremental</h2>
        <p>Se diseña una implementación inicial, se expone al comentario del usuario y se desarrolla en versiones hasta producir el sistema. Especificación, desarrollo y validación están <strong>entrelazadas</strong>, con rápida retroalimentación.</p>
        ${incremental}
        <p>Refleja cómo resolvemos problemas: no hacemos de entrada una solución completa, avanzamos en pasos y retrocedemos al detectar errores. Cada incremento incorpora alguna función que necesita el cliente; <strong>los primeros, la más importante o la más urgente</strong>. Es el enfoque más común y puede ser basado en un plan (incrementos identificados por adelantado), ágil (los siguientes dependen del avance y las prioridades del cliente) o una mezcla. Es fundamental en los enfoques ágiles y mejor que la cascada para sistemas empresariales, de comercio electrónico y personales.</p>
        ${table(['Ventajas del incremental sobre la cascada', 'Problemas del enfoque incremental'], [
          ['1. Es <strong>menor el costo de adaptar</strong> los requerimientos cambiantes: hay menos análisis y documentación que rehacer.', '1. <strong>El proceso no es visible</strong>: los administradores necesitan entregas regulares para medir el avance, y no conviene documentar cada versión si se desarrolla rápido.'],
          ['2. Es más sencillo obtener <strong>retroalimentación del cliente</strong>, que comenta demostraciones en lugar de juzgar documentos de diseño.', '2. <strong>La estructura tiende a degradarse</strong> con cada incremento: incorporar cambios se vuelve cada vez más difícil y caro, sobre todo en sistemas grandes, de larga vida y con varios equipos.'],
          ['3. Es más rápida la <strong>entrega de software útil</strong>, aunque no tenga toda la funcionalidad.', ''],
        ])}

        <h2>3. Ingeniería de software orientada a la reutilización</h2>
        <p>En muchos proyectos hay reutilización informal: los desarrolladores conocen diseños o código similar, los buscan, los modifican y los incorporan. Hoy se apoya en una gran base de <strong>componentes reutilizables</strong>.</p>
        ${reuso}
        <ol>
          <li><strong>Análisis de componentes</strong>: con la especificación, se buscan componentes que la implementen. Normalmente no hay coincidencia exacta y cubren solo parte de lo requerido.</li>
          <li><strong>Modificación de requerimientos</strong>: se reanalizan los requerimientos con la información de los componentes hallados. Si no se pueden modificar, se vuelve a buscar alternativas.</li>
          <li><strong>Diseño del sistema con reutilización</strong>: se diseña el marco del sistema con los componentes reutilizados.</li>
          <li><strong>Desarrollo e integración</strong>: se desarrolla lo que no se puede conseguir afuera y se integran componentes y sistemas comprados. En este modelo la integración es parte del desarrollo.</li>
        </ol>
        ${table(['Ventajas', 'Desventajas'], [['Reduce el software a desarrollar, disminuye costos y riesgos, y consigue entregas más rápidas.', 'Lo reutilizado puede no cubrir las necesidades reales; se pierde control sobre la evolución, porque las nuevas versiones de los componentes no dependen de nosotros.']])}

        <h2>Los modelos se combinan</h2>
        <p>En grandes sistemas se usan en conjunto. La <strong>arquitectura</strong> necesita información sobre los requerimientos esenciales, así que <strong>no se puede hacer en forma incremental</strong>. Las partes bien comprendidas se especifican y desarrollan con un proceso en cascada; las difíciles de especificar, como la <strong>interfaz de usuario</strong>, con un enfoque incremental.</p>
        ${note('Cascada no es sinónimo de “sin retroalimentación”: la tiene, pero cara. Y el incremental no es sinónimo de “ágil”: puede ser basado en un plan.', 'exam')}
      `,
      quiz: [
        { q: '¿Qué caracteriza a un proceso dirigido por un plan?', o: ['Todo se planea antes y el avance se mide contra el plan', 'La planeación es incremental y se ajusta en cada iteración', 'No produce documentación formal entre una etapa y otra', 'Solo se usa en sistemas pequeños con un único equipo'], a: 0, e: 'En los procesos ágiles, en cambio, la planeación es incremental.' },
        { q: 'En el modelo en cascada, ¿qué produce cada fase?', o: ['Uno o más documentos autorizados (“firmados”)', 'Un incremento ejecutable para el cliente', 'Un prototipo desechable', 'Una historia de usuario'], a: 0, e: 'La fase siguiente no debe comenzar hasta que la anterior termina y sus documentos se aprueban.' },
        { q: '¿Cuál es una ventaja del desarrollo incremental frente a la cascada?', o: ['Es menor el costo de adaptar los requerimientos cambiantes', 'El proceso es más visible para los administradores', 'La estructura del sistema mejora con cada incremento', 'Requiere especificar todo antes de empezar'], a: 0, e: 'Las otras dos son retroalimentación más fácil y entrega temprana. La visibilidad y la degradación de la estructura son justamente sus problemas.' },
        { q: '¿Cuáles son los dos problemas del enfoque incremental?', o: ['El proceso no es visible y la estructura tiende a degradarse', 'Es caro y lento', 'No permite retroalimentación y exige documentos firmados', 'Pierde el control de la evolución de los componentes'], a: 0, e: 'Perder el control sobre la evolución es una desventaja de la reutilización, no del incremental.' },
        { q: '¿Qué etapa NO es propia (intermedia) de la ingeniería orientada a la reutilización?', o: ['Validación', 'Análisis de componentes', 'Modificación de requerimientos', 'Diseño del sistema con reutilización'], a: 0, e: 'La especificación y la validación son como en otros procesos; las intermedias son análisis de componentes, modificación de requerimientos, diseño con reutilización y desarrollo e integración.' },
        { q: '¿Qué parte de un sistema grande NO puede desarrollarse en forma incremental, según las diapositivas?', o: ['La arquitectura del sistema', 'La interfaz de usuario', 'Los módulos de reportes', 'Las pruebas de unidad'], a: 0, e: 'Para diseñar la arquitectura se necesitan los requerimientos esenciales; la interfaz, en cambio, conviene desarrollarla incrementalmente.' },
        { q: 'Una desventaja de la reutilización es...', o: ['Perder el control sobre la evolución de los componentes', 'Que aumenta la cantidad de software que hay que desarrollar', 'Que retrasa las entregas por el tiempo de integración', 'Que aumenta los riesgos y los costos del proyecto'], a: 0, e: 'La reutilización reduce software, costos, riesgos y tiempos; sus desventajas son no cubrir necesidades reales y perder control de la evolución.' },
        { q: 'En el desarrollo incremental, ¿qué funciones incluyen los primeros incrementos?', o: ['Las más importantes o las más urgentes para el cliente', 'Las más fáciles de programar', 'Las de infraestructura y seguridad', 'Las que el equipo elija libremente'], a: 0, e: 'Así el cliente evalúa temprano si se le entrega lo que necesita.' },
      ],
      sources: [{ title: 'Ingeniería de Software, 9ª ed.', ref: 'Sommerville, cap. 2, págs. 27-36', points: ['Modelos de proceso: cascada, incremental y orientado a la reutilización.', 'Ventajas y problemas de cada uno.'] }],
    },

    {
      id: 'integracion-de-sistemas',
      module: 'm2',
      title: 'Integración de sistemas',
      keywords: 'integración big bang incremental subsistemas proveedores contratista subcontratistas propiedades emergentes interfaces',
      tldr: 'Integrar es <mark>reunir los subsistemas desarrollados por separado</mark> para formar el sistema completo; recién ahí aparecen sus <strong>propiedades emergentes</strong>. Se puede hacer de golpe (<em>big bang</em>), pero la mejor opción es la <mark>integración incremental</mark>: un subsistema por vez.',
      goals: ['Definir integración del sistema y propiedades emergentes.', 'Comparar integración big bang e incremental.', 'Dar las dos razones a favor de la integración incremental.'],
      body: `
        <h2>Qué es integrar</h2>
        <p>El desarrollo de sistemas incluye especificación de requerimientos, diseño, construcción, integración y pruebas. Los sistemas grandes suelen ser una mezcla de <strong>componentes comerciales y construidos especialmente</strong>, y el proveedor principal (contratista) suele subcontratar el desarrollo de distintos subsistemas.</p>
        ${def('Integración del sistema', 'Proceso en el que los componentes se reúnen para crear un nuevo sistema. Sólo entonces se vuelven evidentes las propiedades emergentes del sistema.', 'Diapositivas, a partir de Sommerville, págs. 270-350.')}
        <p>La integración es especialmente crítica cuando los subsistemas vienen de <strong>más de un proveedor</strong> y deben trabajar juntos.</p>

        <h2>Big bang o incremental</h2>
        ${fig(U.svg(580, 200, `
          <text x="130" y="18" class="u-c u-sans u-b">Big bang</text>
          ${['A', 'B', 'C', 'D'].map((t, i) => U.blk(10 + i * 62, 34, 50, 34, t, { cls: 'k-err' })).join('')}
          ${[0, 1, 2, 3].map((i) => U.ln([[35 + i * 62, 68], [130, 120]], { end: 'ar' })).join('')}
          ${U.blk(70, 120, 120, 40, '¿Dónde está\nel error?', { cls: 'k-err' })}
          <text x="430" y="18" class="u-c u-sans u-b">Incremental</text>
          ${U.blk(320, 34, 70, 30, 'A', { cls: 'k-ok' })}${U.blk(320, 74, 120, 30, 'A + B', { cls: 'k-ok' })}${U.blk(320, 114, 170, 30, 'A + B + C', { cls: 'k-ok' })}${U.blk(320, 154, 220, 30, 'A + B + C + D', { cls: 'k-a' })}
          <text x="550" y="173" class="u-sm">el error está en D</text><text x="550" y="186" class="u-sm">o en su interacción</text>`,
          'Comparación: en big bang cuatro subsistemas se integran juntos y no se sabe dónde está el error; en incremental se agrega uno por vez'),
          'Con big bang un error puede estar en cualquier subsistema. Integrando uno por vez, el error casi seguro está en el último que entró o en su interacción con los que ya andaban.')}
        <p>La integración puede seguir un enfoque <strong>big bang</strong>: todos los subsistemas al mismo tiempo. Sin embargo, por razones técnicas y administrativas, la mejor opción es la <strong>integración incremental</strong>, un subsistema a la vez:</p>
        <ol>
          <li>Es casi imposible programar que todos los subsistemas <strong>terminen al mismo tiempo</strong>.</li>
          <li>Reduce el <strong>costo de localizar errores</strong>: si un solo subsistema se integra con un sistema ya en operación, los errores probablemente estarán en él o en sus interacciones con los existentes.</li>
        </ol>
        <p>La integración incremental es la <strong>antítesis</strong> del big bang: el programa se construye y prueba en pequeños incrementos, donde los errores son más fáciles de aislar y corregir, las interfaces tienen más posibilidades de probarse por completo y se puede aplicar un enfoque de prueba sistemático.</p>
        <p>Durante y después de la integración se prueban las <strong>interfaces entre componentes</strong> y el comportamiento del sistema como un todo; eso revela problemas de los subsistemas individuales que deben repararse. La etapa final del proceso es la <strong>entrega e implementación</strong>: el software se instala en el hardware y queda listo para operar.</p>
        ${note('El tema vuelve dos veces: en la Unidad II, con el diseño de componentes, y en la Unidad VI, con las pruebas del sistema e integración incremental (que en XP se hace con pruebas de regresión en cada incremento).', 'tip')}
      `,
      quiz: [
        { q: '¿Cuándo se vuelven evidentes las propiedades emergentes de un sistema?', o: ['Cuando los componentes se reúnen en la integración', 'Durante el análisis de requerimientos', 'En las pruebas de unidad', 'Al escribir el SAD'], a: 0, e: 'Las propiedades emergentes solo aparecen cuando las partes funcionan juntas.' },
        { q: '¿Por qué la integración incremental reduce el costo de localizar errores?', o: ['El error suele estar en lo recién integrado o en su interacción', 'Porque evita tener que probar las interfaces entre subsistemas', 'Porque todos los subsistemas se prueban a la vez en un único paso', 'Porque elimina la necesidad de depurar los subsistemas integrados'], a: 0, e: 'Con big bang el error podría estar en cualquier subsistema.' },
        { q: '¿Cuál es la otra razón (además de localizar errores) para preferir la integración incremental?', o: ['Es casi imposible que todos terminen al mismo tiempo', 'Es más barata en hardware porque usa menos servidores', 'No requiere coordinar con los proveedores externos', 'Permite no documentar las interfaces entre subsistemas'], a: 0, e: 'Es una razón administrativa: los subsistemas llegan en momentos distintos.' },
        { q: '¿Qué enfoque de integración integra todos los subsistemas al mismo tiempo?', o: ['Big bang', 'Incremental', 'Ascendente', 'Por regresión'], a: 0, e: 'Big bang es la antítesis de la integración incremental.' },
        { q: '¿Cuál es la etapa final del proceso de desarrollo del sistema?', o: ['La entrega e implementación en el hardware', 'La integración de componentes de varios proveedores', 'Las pruebas de unidad de cada clase del sistema', 'La firma del contrato de mantenimiento con el cliente'], a: 0, e: 'Después de integrar y probar, se entrega e implementa.' },
      ],
      sources: [{ title: 'Ingeniería de Software, 9ª ed.', ref: 'Sommerville, págs. 270-350', points: ['Integración del sistema, enfoque big bang e incremental.', 'Propiedades emergentes.'] }],
    },

    {
      id: 'entrega-incremental',
      module: 'm2',
      title: 'Iteración e incremento: la entrega incremental',
      keywords: 'entrega incremental incrementos prioridad servicios entorno operacional prototipo sistema de reemplazo contratos Estado embebidos críticos',
      tldr: 'En la <mark>entrega incremental</mark> los incrementos no solo se desarrollan: <strong>se entregan y se usan en el entorno real</strong>. Los servicios de mayor prioridad van primero y, por eso, reciben más pruebas. Tiene 4 ventajas, 3 problemas y no se aconseja en sistemas muy grandes y distribuidos, embebidos o críticos.',
      goals: ['Describir el proceso de entrega incremental.', 'Enumerar sus 4 ventajas y sus 3 problemas.', 'Saber cuándo no conviene el desarrollo incremental.'],
      body: `
        <h2>El proceso</h2>
        <p>La entrega incremental es un enfoque donde los incrementos diseñados <strong>se entregan al cliente y se implementan para usarse en un entorno operacional</strong>. Los clientes identifican los servicios que proporcionará el sistema y los clasifican en más y menos importantes; luego se define un número de incrementos, cada uno con un subconjunto de la funcionalidad.</p>
        ${entrega}
        <ul>
          <li>Los servicios de <strong>más alta prioridad</strong> se implementan y entregan primero.</li>
          <li>Se detallan los requerimientos del primer incremento y se lo desarrolla; mientras tanto, se analizan los requerimientos de los posteriores.</li>
          <li>Entregado el incremento, los clientes lo ponen en servicio y <strong>aprovechan la funcionalidad parcial</strong>; pueden experimentar y clarificar requerimientos, lo que agiliza los próximos incrementos.</li>
          <li>Cada nuevo incremento se <strong>integra</strong> con los existentes y mejora la funcionalidad del sistema.</li>
        </ul>

        <h2>Ventajas y problemas</h2>
        ${table(['4 ventajas', '3 problemas'], [
          ['1. Los primeros incrementos sirven como <strong>prototipos</strong> para clarificar requerimientos posteriores, pero, a diferencia de los prototipos, <strong>son parte del sistema real</strong>.', '1. Como el sistema usa <strong>recursos comunes</strong> en varias partes y los requerimientos no están detallados, es difícil identificar qué recursos necesitan todos los incrementos.'],
          ['2. Los clientes <strong>no esperan</strong> la entrega completa: el primer incremento cubre los requerimientos más críticos y se usa de inmediato.', '2. Es complicado para un <strong>sistema de reemplazo</strong>: los usuarios quieren toda la funcionalidad del sistema viejo y no les gusta probar uno nuevo incompleto.'],
          ['3. Mantiene los beneficios del desarrollo incremental: es <strong>sencillo incorporar cambios</strong>.', '3. Como la especificación se desarrolla junto con el software, no sirve para contratar con organizaciones (como el <strong>Estado</strong>) que exigen una especificación completa previa.'],
          ['4. Los servicios <strong>más importantes reciben más pruebas</strong>, porque se entregan primero y se integran con cada incremento: hay menos fallas en las partes más significativas.', ''],
        ])}

        <h2>Cuándo no se aconseja el desarrollo incremental</h2>
        <ul>
          <li><strong>Sistemas muy grandes</strong> con equipos que trabajan en diferentes ubicaciones.</li>
          <li><strong>Sistemas embebidos</strong>, donde el software depende del desarrollo del hardware.</li>
          <li><strong>Sistemas críticos</strong>, donde hay que analizar todos los requerimientos para comprobar interacciones que comprometan la seguridad o la protección.</li>
        </ul>
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿Ventaja o problema de la entrega incremental?',
        buckets: ['Ventaja', 'Problema'],
        items: [
          { t: 'El cliente usa el primer incremento sin esperar el sistema completo.', b: 0 },
          { t: 'Cuesta identificar los recursos comunes que necesitan todos los incrementos.', b: 1 },
          { t: 'Los servicios más importantes son los más probados.', b: 0 },
          { t: 'Los usuarios de un sistema viejo no quieren uno nuevo incompleto.', b: 1 },
          { t: 'Los primeros incrementos funcionan como prototipos que son parte del sistema real.', b: 0 },
          { t: 'Un organismo del Estado exige la especificación completa antes de contratar.', b: 1 },
          { t: 'Es sencillo incorporar cambios.', b: 0 },
        ],
      }],
      quiz: [
        { q: '¿Qué diferencia a los primeros incrementos de un prototipo?', o: ['Son parte del sistema real y se usan en producción', 'Se descartan al final, una vez aclarados los requerimientos', 'No tienen funcionalidad: solo muestran la interfaz al cliente', 'Los desarrolla el propio cliente para validar sus requerimientos'], a: 0, e: 'Sirven para clarificar requerimientos como un prototipo, pero se conservan y se usan.' },
        { q: '¿Por qué los servicios más importantes tienen menos probabilidad de fallar en la entrega incremental?', o: ['Se entregan primero y se vuelven a probar en cada integración', 'Porque los programan siempre los desarrolladores más experimentados', 'Porque son los únicos que se especifican formalmente antes de programar', 'Porque una vez entregados no vuelven a cambiar en el resto del proyecto'], a: 0, e: 'Al integrarse con cada incremento, reciben más pruebas.' },
        { q: 'Una municipalidad exige una especificación completa antes de firmar el contrato. ¿Qué problema de la entrega incremental aparece?', o: ['La especificación se hace junto con el software', 'Los recursos comunes son difíciles de identificar', 'Es un sistema de reemplazo de uno anterior', 'La estructura del sistema se degrada'], a: 0, e: 'Es el tercer problema de la entrega incremental.' },
        { q: '¿En cuál de estos casos NO se aconseja el desarrollo incremental?', o: ['Un sistema embebido cuyo software depende del hardware en desarrollo', 'Un comercio electrónico', 'Un sistema empresarial con requisitos cambiantes', 'Una aplicación personal'], a: 0, e: 'Tampoco se aconseja en sistemas muy grandes y distribuidos ni en sistemas críticos.' },
        { q: '¿Qué se hace una sola vez, al principio, en la entrega incremental?', o: ['Diseñar la arquitectura', 'Validar el sistema completo', 'Desarrollar cada incremento', 'Integrar cada incremento'], a: 0, e: 'Desarrollar, validar e integrar se repiten por incremento; la arquitectura se diseña al comienzo.' },
        { q: '¿Qué problema aparece al construir un sistema de reemplazo con entrega incremental?', o: ['Los usuarios no aceptan un sistema nuevo incompleto', 'El sistema viejo no se puede integrar con los incrementos', 'No hay requerimientos porque el sistema viejo ya los cubre', 'Las pruebas de regresión se vuelven imposibles de automatizar'], a: 0, e: 'Es el segundo problema de la entrega incremental.' },
      ],
      sources: [{ title: 'Ingeniería de Software, 9ª ed.', ref: 'Sommerville, cap. 2, págs. 33-34 y 47-48', points: ['Entrega incremental: proceso, ventajas y problemas.'] }],
    },

    {
      id: 'plan-vs-agil',
      module: 'm2',
      title: 'Desarrollo dirigido por un plan y desarrollo ágil',
      keywords: 'desarrollo rápido software ágil plan documentación equipo distribuido regulación FAA vida larga diseñadores programadores herramientas 10 preguntas',
      tldr: 'Las empresas cambian rápido y es <mark>imposible fijar de entrada todos los requerimientos</mark>: por eso nace el desarrollo rápido, con especificación, diseño e implementación entrelazados. Elegir entre plan y ágil depende de 10 preguntas sobre el sistema, el equipo y la organización.',
      goals: ['Explicar por qué los negocios necesitan desarrollo rápido.', 'Dar las 3 características del desarrollo de software rápido.', 'Contrastar cómo se comunican las etapas en cada enfoque.', 'Aplicar las 10 preguntas para elegir un enfoque.'],
      body: `
        <h2>Por qué hace falta desarrollar rápido</h2>
        <p>Las empresas operan en entornos que cambian rápidamente: nuevas oportunidades y mercados, condiciones económicas y productos competitivos. El software debe desarrollarse rápido para aprovecharlas, y muchas empresas incluso sacrifican calidad por celeridad. Como el entorno cambia, es <strong>imposible derivar rápido un conjunto completo de requerimientos</strong>: los clientes no pueden prever cómo el sistema afectará sus prácticas, los requerimientos reales recién se aclaran con el uso y, por factores externos, pueden cambiar tanto que el software quede obsoleto al entregarse.</p>
        <p>Los procesos que especifican todo y luego diseñan, construyen y prueban <strong>no están orientados al desarrollo rápido</strong>. En sistemas críticos el análisis completo es esencial (enfoque basado en un plan); en un ambiente empresarial de rápido movimiento, no: el software se desarrolla como una <strong>serie de incrementos</strong>.</p>

        <h2>Características del desarrollo rápido</h2>
        <ol>
          <li><strong>Especificación, diseño e implementación se entrelazan</strong>. No hay especificación detallada; la documentación del diseño se minimiza o se genera automáticamente, y el análisis define solo las características más importantes.</li>
          <li><strong>El sistema se desarrolla en versiones</strong>: los usuarios intervienen en la especificación y evaluación de cada una, y proponen cambios para las siguientes.</li>
          <li><strong>Las interfaces se crean rápidamente</strong>, dibujando y colocando íconos.</li>
        </ol>
        <p>Los métodos ágiles son desarrollo incremental con incrementos mínimos, disponibles <strong>cada 2 o 3 semanas</strong>; involucran al cliente para obtener retroalimentación rápida y minimizan la documentación con comunicaciones informales en lugar de reuniones formales con documentos.</p>
        ${fig(U.svg(580, 170, `
          <text x="140" y="16" class="u-c u-sans u-b">Basado en un plan</text>
          ${U.blk(10, 30, 110, 40, 'Ingeniería de\nrequerimientos')}${U.blk(160, 30, 110, 40, 'Diseño e\nimplementación')}
          ${U.blk(85, 110, 110, 36, 'Especificación\nde requerimientos', { cls: 'k-ghost', bold: false })}
          ${U.ln([[65, 70], [110, 110]], { end: 'ar' })}${U.ln([[170, 110], [215, 70]], { end: 'ar' })}
          <text x="440" y="16" class="u-c u-sans u-b">Ágil</text>
          ${U.blk(330, 50, 110, 40, 'Ingeniería de\nrequerimientos', { cls: 'k-a' })}${U.blk(460, 50, 110, 40, 'Diseño e\nimplementación', { cls: 'k-a' })}
          ${U.ln([[440, 62], [460, 62]], { end: 'ar' })}${U.ln([[460, 80], [440, 80]], { end: 'ar' })}
          <text x="450" y="126" class="u-c u-sm">solicitud de cambio de requerimientos</text>`,
          'Comparación: en el enfoque basado en plan las etapas se comunican mediante un documento de especificación; en el ágil requerimientos y diseño se retroalimentan directamente'),
          'En un plan, la salida formal de una etapa es la base de la siguiente. En ágil, diseño e implementación son las actividades centrales y el análisis se desarrolla junto con ellas.')}

        <h2>Las 10 preguntas para elegir</h2>
        ${table(['Pregunta', 'Si la respuesta es sí...'], [
          ['1. ¿Es importante tener análisis y diseño muy detallados antes de implementar?', 'Plan'],
          ['2. ¿Es práctico dar el software a los clientes y obtener retroalimentación rápida?', 'Ágil'],
          ['3. ¿El sistema es pequeño? (lo hace un equipo chico que se comunica informalmente)', 'Ágil. Los sistemas grandes necesitan equipos numerosos: plan.'],
          ['4. ¿Requiere mucho análisis?', 'Plan'],
          ['5. ¿Tendrá una vida larga?', 'Plan: requerirá más documentación de diseño. En ágil la documentación no se mantiene actualizada.'],
          ['6. ¿Faltan herramientas para seguir la pista del diseño?', 'Hará falta más documentación (plan).'],
          ['7. ¿El equipo está distribuido o se subcontrata una parte?', 'Plan: documentos de diseño para comunicarse.'],
          ['8. ¿La organización es tradicional?', 'Plan: suelen exigir amplia documentación.'],
          ['9. ¿Se cuenta con diseñadores y programadores muy capaces?', 'Ágil: exige más habilidad. En un plan los programadores “solo traducen” un diseño detallado a código.'],
          ['10. ¿El sistema está sujeto a regulación externa? (p. ej., la FAA aprueba software crítico de aviones)', 'Plan: el regulador requiere documentación detallada.'],
        ])}
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿Plan o ágil?',
        intro: 'Según las 10 preguntas, ¿qué enfoque conviene en cada situación?',
        buckets: ['Basado en un plan', 'Ágil'],
        items: [
          { t: 'Software de control de vuelo que debe aprobar una agencia reguladora.', b: 0, why: 'La regulación externa exige documentación detallada.' },
          { t: 'Una startup de 5 personas en la misma oficina, con un cliente disponible todas las semanas.', b: 1, why: 'Equipo chico, comunicación informal y retroalimentación rápida.' },
          { t: 'Un sistema que va a mantenerse durante 20 años por equipos distintos.', b: 0, why: 'La vida larga requiere documentación de diseño.' },
          { t: 'Parte del desarrollo se subcontrata a una empresa de otro país.', b: 0, why: 'Equipo distribuido: documentos para comunicarse.' },
          { t: 'Una app comercial cuyo mercado cambia cada mes.', b: 1, why: 'Requerimientos cambiantes y entrega rápida.' },
          { t: 'Un sistema crítico que requiere analizar todas las interacciones de seguridad.', b: 0, why: 'Requiere mucho análisis previo.' },
        ],
      }],
      quiz: [
        { q: '¿Cuál NO es una característica del desarrollo de software rápido?', o: ['Especificación completa y detallada antes de programar', 'Especificación, diseño e implementación entrelazados', 'Desarrollo en versiones evaluadas por los usuarios', 'Interfaces creadas rápidamente'], a: 0, e: 'En el desarrollo rápido no hay especificación detallada: el análisis define solo lo más importante.' },
        { q: '¿Cada cuánto ponen a disposición del cliente los incrementos los métodos ágiles?', o: ['Cada 2 o 3 semanas', 'Cada 6 meses', 'Una vez al año', 'Solo al final del proyecto'], a: 0, e: 'Los incrementos son mínimos y frecuentes.' },
        { q: 'Si el equipo está distribuido geográficamente, ¿qué conviene?', o: ['Documentos de diseño para comunicarse', 'Eliminar toda documentación y usar chat', 'Usar solo reuniones cara a cara semanales', 'Integrar con big bang al final del proyecto'], a: 0, e: 'La pregunta 7: si el equipo está distribuido o se subcontrata, hacen falta documentos.' },
        { q: 'En un enfoque basado en un plan, ¿cómo se comunican las etapas?', o: ['Con documentos formales que son base de la etapa siguiente', 'Con conversaciones informales entre analistas y programadores', 'Con el código fuente, que cada etapa revisa y corrige', 'No se comunican: cada etapa trabaja de forma independiente'], a: 0, e: 'En ágil, en cambio, análisis y diseño se desarrollan en conjunto.' },
        { q: '¿Por qué los métodos ágiles requieren mejores diseñadores y programadores?', o: ['En ágil diseñan ellos; en un plan solo traducen el diseño', 'Porque los métodos ágiles usan lenguajes de programación más difíciles', 'Porque en ágil no se prueba el software y no hay red de seguridad', 'Porque los equipos ágiles son más grandes y difíciles de coordinar'], a: 0, e: 'Es la pregunta 9.' },
        { q: '¿Por qué es imposible derivar rápido un conjunto completo de requerimientos en un negocio cambiante?', o: ['Los clientes no prevén el impacto; los requerimientos reales surgen con el uso', 'Porque los analistas no tienen técnicas para relevar en entornos que cambian', 'Porque documentar todos los requerimientos es demasiado caro para la empresa', 'Porque en esos negocios los requerimientos no funcionales directamente no existen'], a: 0, e: 'Además, factores externos pueden cambiar los requerimientos rápida e impredeciblemente.' },
      ],
      sources: [{ title: 'Ingeniería de Software, 9ª ed.', ref: 'Sommerville, cap. 3, págs. 57-72', points: ['Desarrollo rápido de software y métodos ágiles.', 'Desarrollo dirigido por un plan y ágil: cuestiones para elegir.'] }],
    },

    {
      id: 'manifiesto-y-xp',
      module: 'm2',
      title: 'Manifiesto Ágil y Extreme Programming',
      keywords: 'manifiesto ágil 4 valores 12 principios XP extreme programming Kent Beck 5 valores comunicación simplicidad retroalimentación coraje respeto principios core prácticas TDD integración continua pair programming refactorización historias de usuario',
      tldr: 'El <mark>Manifiesto Ágil</mark> (febrero de 2001, 17 firmantes) tiene <strong>4 valores y 12 principios</strong>. <mark>XP</mark> (Kent Beck, 1999) baja esos valores a la práctica: <strong>5 valores, 15 principios (5 “core”) y 24 prácticas</strong>, entre ellas TDD, integración continua y programación en parejas.',
      goals: ['Recitar los 4 valores del Manifiesto Ágil y su corolario.', 'Reconocer los 12 principios.', 'Explicar los 5 valores y los 5 principios core de XP.', 'Describir las prácticas ágiles, en especial TDD, integración continua y pair programming.'],
      body: `
        <h2>El Manifiesto Ágil</h2>
        <p>Documento firmado en <strong>febrero de 2001 por 17 pensadores</strong> del desarrollo de software, que buscaban “mejores formas de desarrollar software” a partir de su experiencia. Lo componen <strong>4 valores y 12 principios</strong>, pilares del <em>mindset</em> ágil (agilemanifesto.org).</p>
        ${table(['Valoramos más...', '...que'], [
          ['1. Individuos e interacciones', 'procesos y herramientas'],
          ['2. Software funcionando', 'documentación extensiva'],
          ['3. Colaboración con el cliente', 'negociación contractual'],
          ['4. Respuesta ante el cambio', 'seguir un plan'],
        ])}
        ${def('Corolario', 'Aunque valoramos los elementos de la derecha, valoramos más los de la izquierda.', 'Manifiesto Ágil.')}
        ${note('Trampa clásica: el manifiesto <strong>no</strong> dice que la documentación, los procesos, los contratos o los planes no sirvan. Dice que se valoran <em>menos</em> que lo de la izquierda.', 'warn')}
        <h3>Los 12 principios</h3>
        <ol>
          <li>La mayor prioridad es satisfacer al cliente mediante la <strong>entrega temprana y continua</strong> de software con valor.</li>
          <li>Aceptamos que los requisitos cambien, incluso en etapas tardías: da ventaja competitiva al cliente.</li>
          <li>Entregamos software funcional frecuentemente, <strong>entre dos semanas y dos meses</strong>, lo más corto posible.</li>
          <li>Usuarios y desarrolladores trabajan juntos en forma cotidiana durante todo el proyecto.</li>
          <li>Los proyectos se desarrollan en torno a <strong>individuos motivados</strong>: darles el entorno y el apoyo que necesitan y confiarles el trabajo.</li>
          <li>El método más eficiente de comunicación es la <strong>conversación cara a cara</strong>.</li>
          <li>El <strong>software funcionando es la medida principal de progreso</strong>.</li>
          <li>Los procesos ágiles promueven el <strong>desarrollo sostenible</strong>: un ritmo constante de forma indefinida.</li>
          <li>La atención continua a la excelencia técnica y al buen diseño mejora la agilidad.</li>
          <li>La <strong>simplicidad</strong> es esencial.</li>
          <li>Las mejores arquitecturas, requisitos y diseños emergen de <strong>equipos auto-organizados</strong>.</li>
          <li>A intervalos regulares el equipo <strong>reflexiona</strong> sobre cómo ser más efectivo y ajusta su comportamiento.</li>
        </ol>

        <h2>Extreme Programming (XP)</h2>
        <p>En 1999 <strong>Kent Beck</strong> publicó <em>Extreme Programming Explained</em> (“el libro blanco”). XP es una metodología ágil creada para promover <strong>prácticas de ingeniería</strong>: su objetivo es que un equipo produzca software de mejor calidad de forma constante y con buena calidad de vida. A principios de los 2000 era la metodología ágil dominante, antes de la popularidad de Scrum. “No soy un gran programador; solo soy un buen programador con buenos hábitos” (Beck).</p>
        <p>XP promueve <strong>valores, principios y prácticas</strong>. Los valores sin prácticas son difíciles de interiorizar (no se sabe por dónde empezar); las prácticas sin valores son actividades de memoria sin propósito. En el medio están los <strong>principios</strong>, que reflejan los valores de forma concreta y ayudan a decidir entre alternativas.</p>
        ${fig(U.svg(520, 120, `${[['5', 'Valores', 'por qué'], ['15', 'Principios', 'puente'], ['24', 'Prácticas', 'qué se hace']].map(([n, t, s], i) => `${U.blk(10 + i * 175, 14, 150, 80, '', { cls: i === 1 ? 'k-a' : '' })}<text x="${85 + i * 175}" y="50" class="u-c u-sans u-b" style="font-size:26px">${n}</text><text x="${85 + i * 175}" y="72" class="u-c u-sans u-b">${t}</text><text x="${85 + i * 175}" y="88" class="u-c u-sm">${s}</text>`).join('')}${U.ln([[160, 54], [185, 54]], { end: 'ar' })}${U.ln([[335, 54], [360, 54]], { end: 'ar' })}`, 'XP: 5 valores, 15 principios y 24 prácticas'), 'Estructura de XP. Los principios conectan los valores con las prácticas.')}
        <h3>Los 5 valores</h3>
        ${table(['Valor', 'Qué significa'], [
          ['Comunicación', 'Discusión cara a cara, con pizarra u otro mecanismo de dibujo.'],
          ['Simplicidad', '“¿Qué es lo más simple que funcionará?”: evitar el desperdicio y hacer solo lo absolutamente necesario, para que sea fácil de mantener, respaldar y revisar.'],
          ['Retroalimentación', 'Continua: construir algo, recopilar comentarios y ajustar. Permite un diseño simple.'],
          ['Coraje', '“Acción efectiva frente al miedo”: plantear problemas, dejar de hacer lo que no funciona, probar otra cosa.'],
          ['Respeto', 'Entre los miembros del equipo: comunicarse, dar y aceptar comentarios, buscar juntos soluciones simples.'],
        ])}
        <h3>Los 5 principios “core”</h3>
        <ol>
          <li><strong>Realimentación rápida</strong>: el equipo pide retroalimentación, la entiende y reacciona de inmediato.</li>
          <li><strong>Asumir simplicidad</strong>: concentrarse en el trabajo importante, planificado y comprometido.</li>
          <li><strong>Cambio incremental</strong>: pequeños cambios son mejores que grandes cambios de una vez.</li>
          <li><strong>Abrazar el cambio</strong>: si el cliente cree que el producto debe cambiar, apoyar la decisión y planificar cómo implementarlo.</li>
          <li><strong>Trabajo de calidad</strong>: un equipo que trabaja bien hace un producto valioso y se siente orgulloso.</li>
        </ol>
        <p>Los otros 10: enseñar a aprender, pequeña inversión inicial, jugar a ganar, trabajar con los instintos de las personas, responsabilidad aceptada, experimentos concretos, comunicación abierta y honesta, adaptación local, viajar con poco equipaje y medición honesta.</p>

        <h2>Prácticas ágiles</h2>
        ${table(['Práctica', 'Qué es'], [
          ['El juego de la planificación', 'Se comparte la planificación entre equipo y cliente: el cliente sabe el valor, el equipo sabe el costo.'],
          ['Pequeños releases', 'Liberar versiones iterativas con frecuencia.'],
          ['Metáforas', 'Explicar el diseño a personas nuevas con metáforas en vez de muchos documentos.'],
          ['Diseño simple', 'Mantener las cosas simples.'],
          ['<strong>TDD</strong> (Test Driven Development)', 'Escribir <strong>primero la prueba</strong> y luego el código, y mejorarlo con refactorización. Se profundiza en la Unidad VI.'],
          ['Refactorización', 'Mejorar el diseño del código sin cambiar su comportamiento.'],
          ['<strong>Programación en parejas</strong>', 'Dos programadores en una sola máquina resolviendo el mismo problema.'],
          ['Propiedad colectiva del código', 'Nadie es dueño de ninguna parte: el código es de todos.'],
          ['<strong>Integración continua</strong>', 'Integraciones automáticas lo más frecuentes posible, para detectar fallas cuanto antes: integrar unidades, identificar errores y eliminarlos.'],
          ['Historias de usuario', 'Breve texto del cliente que dice en palabras simples lo que necesita que haga el software.'],
          ['Estándares de codificación', 'Programar con un estilo consistente, sin importar el autor, para que sea fácil de entender y mantener.'],
        ])}
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: 'Valor del Manifiesto, valor de XP o práctica',
        buckets: ['Valor del Manifiesto Ágil', 'Valor de XP', 'Práctica ágil'],
        items: [
          { t: 'Software funcionando sobre documentación extensiva.', b: 0 },
          { t: 'Coraje.', b: 1 },
          { t: 'Integración continua.', b: 2 },
          { t: 'Respuesta ante el cambio sobre seguir un plan.', b: 0 },
          { t: 'Simplicidad.', b: 1, why: 'Ojo: la simplicidad también aparece como principio del Manifiesto, pero entre los valores de XP es uno de los cinco.' },
          { t: 'Programación en parejas.', b: 2 },
          { t: 'Colaboración con el cliente sobre negociación contractual.', b: 0 },
          { t: 'Respeto.', b: 1 },
          { t: 'Propiedad colectiva del código.', b: 2 },
        ],
      }],
      quiz: [
        { q: '¿Cuál es uno de los 4 valores del Manifiesto Ágil?', o: ['Individuos e interacciones sobre procesos y herramientas', 'Documentación completa sobre software funcionando', 'Seguir un plan sobre responder al cambio', 'Negociación contractual sobre colaboración con el cliente'], a: 0, e: 'Los otros tres están invertidos: el manifiesto valora más lo de la izquierda.' },
        { q: '¿Qué dice el corolario del manifiesto?', o: ['Valoramos lo de la derecha, pero más lo de la izquierda', 'Lo de la derecha no tiene ningún valor en un equipo ágil', 'Los procesos y herramientas deben eliminarse del proyecto', 'Los contratos son innecesarios si el cliente colabora'], a: 0, e: 'No descarta lo de la derecha: solo lo pone en segundo lugar.' },
        { q: 'Según los principios ágiles, ¿cuál es la medida principal de progreso?', o: ['El software funcionando', 'La cantidad de documentación', 'El porcentaje del plan cumplido', 'Las horas trabajadas'], a: 0, e: 'Es el séptimo principio.' },
        { q: '¿Cuántos valores, principios y prácticas tiene XP?', o: ['5 valores, 15 principios y 24 prácticas', '4 valores, 12 principios y 24 prácticas', '5 valores, 12 principios y 15 prácticas', '3 valores, 5 principios y 10 prácticas'], a: 0, e: '4 valores y 12 principios corresponden al Manifiesto Ágil.' },
        { q: '¿Cuál de estos NO es un valor de XP?', o: ['Planificación', 'Comunicación', 'Coraje', 'Respeto'], a: 0, e: 'Los 5 valores son comunicación, simplicidad, retroalimentación, coraje y respeto.' },
        { q: '“Hacer pequeños cambios al software es mejor que aplicar grandes cambios de una vez.” ¿Qué principio core de XP es?', o: ['Cambio incremental', 'Abrazar el cambio', 'Asumir simplicidad', 'Realimentación rápida'], a: 0, e: 'Abrazar el cambio es apoyar los cambios que pide el cliente.' },
        { q: '¿Qué es la integración continua?', o: ['Integrar automáticamente y seguido para detectar fallas pronto', 'Integrar todos los módulos al final del proyecto, en una sola vez', 'Que el cliente se integre al equipo durante todo el proyecto', 'Que dos programadores trabajen juntos en una misma máquina'], a: 0, e: 'Programar dos en una máquina es pair programming.' },
        { q: 'En TDD, ¿qué se escribe primero?', o: ['La prueba', 'El código', 'La documentación', 'La historia de usuario'], a: 0, e: 'Se escribe la prueba, luego el código que la pasa, y se mejora con refactorización.' },
        { q: '¿Quién publicó Extreme Programming Explained y cuándo?', o: ['Kent Beck, en 1999', 'Los 17 firmantes del manifiesto, en 2001', 'Henrik Kniberg, en 2007', 'Ian Sommerville, en 2011'], a: 0, e: 'El “libro blanco” de XP es de 1999, anterior al Manifiesto (2001).' },
      ],
      sources: [
        { title: 'Ingeniería de Software, 9ª ed.', ref: 'Sommerville, cap. 3', points: ['Métodos ágiles y programación extrema.'] },
        { title: 'Extreme Programming: qué es y cómo aplicarlo', url: 'https://openwebinars.net/blog/extreme-programming-que-es-y-como-aplicarlo/', points: ['Valores, principios y prácticas de XP (Marvin López Mendoza).'] },
        { title: 'Manifiesto Ágil', url: 'https://agilemanifesto.org/', points: ['4 valores y 12 principios.'] },
      ],
    },
  );
})();
