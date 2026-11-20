/* Unidad II, clase 6 (primera parte): introducción al diseño arquitectónico, decisiones y vistas. Diapositivas Clase6, Sommerville 9ª ed. cap. 6, págs. 148-155. */
(() => {
  const { LESSONS, h } = window.GUIDE;
  const { note, def, table, fig, lab, uml: U } = h;

  // Diagrama de bloques de un robot empaquetador (Sommerville fig. 6.1), simplificado
  const bloques = fig(U.svg(600, 260, `
    ${U.blk(10, 20, 130, 46, 'Sistema\nde visión')}${U.blk(235, 20, 130, 46, 'Sistema de\nidentificación')}${U.blk(460, 20, 130, 46, 'Controlador\ndel brazo', { cls: 'k-a' })}
    ${U.blk(235, 106, 130, 46, 'Sistema de\nselección')}${U.blk(460, 106, 130, 46, 'Controlador\nde la pinza', { cls: 'k-a' })}
    ${U.blk(110, 196, 160, 46, 'Sistema de\nempaquetado')}${U.blk(330, 196, 160, 46, 'Controlador\nde la banda')}
    ${U.ln([[140, 43], [235, 43]], { end: 'ar' })}${U.ln([[300, 66], [300, 106]], { end: 'ar' })}${U.ln([[365, 43], [460, 43]], { end: 'ar' })}
    ${U.ln([[365, 129], [460, 129]], { end: 'ar' })}${U.ln([[280, 152], [200, 196]], { end: 'ar' })}${U.ln([[320, 152], [400, 196]], { end: 'ar' })}`,
    'Diagrama de bloques con siete componentes de un sistema robótico de empaquetado unidos por flechas de datos y control'),
    'Diagrama de bloques (inspirado en Sommerville, figura 6.1). Cada recuadro es un componente; recuadros dentro de recuadros serían subcomponentes; las flechas indican que pasan datos o señales de control en ese sentido. Su crítica: no muestran el tipo de relación ni las propiedades de los componentes.');

  // Las 4 vistas de Sommerville (4+1 de Krutchen)
  const vistas = fig(U.svg(560, 250, `
    ${[['Vista lógica', 'objetos y clases', 10, 10], ['Vista de proceso', 'procesos en interacción', 290, 10], ['Vista de desarrollo', 'componentes a implementar', 10, 170], ['Vista física', 'hardware y distribución', 290, 170]].map(([t, s, x, y]) => U.blk(x, y, 260, 64, t, { sub: s })).join('')}
    ${U.blk(180, 100, 200, 50, 'Casos de uso\n(escenarios)', { cls: 'k-a' })}
    ${U.ln([[230, 100], [180, 74]], { dash: true })}${U.ln([[330, 100], [380, 74]], { dash: true })}${U.ln([[230, 150], [180, 170]], { dash: true })}${U.ln([[330, 150], [380, 170]], { dash: true })}`,
    'Las cuatro vistas arquitectónicas de Sommerville alrededor de los casos de uso'),
    'Las 4 vistas fundamentales de Sommerville, relacionadas por los casos de uso (el “+1” del modelo 4+1). No siempre conviene desarrollar las cuatro; en sistemas críticos sí, porque hay que convencer a reguladores.');

  LESSONS.push(
    {
      id: 'introduccion-arquitectura',
      module: 'm4',
      title: 'Introducción al diseño arquitectónico',
      keywords: 'diseño arquitectónico subsistemas marco estructural componentes comunicación modelo arquitectónico requerimientos no funcionales ventajas diagramas de bloques documentar',
      tldr: 'El <mark>diseño arquitectónico</mark> identifica los subsistemas de un sistema y establece el marco de control y comunicación entre ellos. Es el enlace entre los requerimientos y el diseño, y lo más importante: <strong>los requerimientos no funcionales dependen sobre todo de la arquitectura</strong>.',
      goals: ['Definir el diseño arquitectónico y su salida.', 'Explicar por qué no se desarrolla en forma incremental.', 'Relacionar arquitectura y requerimientos no funcionales.', 'Dar las 3 ventajas de documentar la arquitectura y los 2 usos de un modelo.'],
      body: `
        <h2>Qué es</h2>
        <p>Los grandes sistemas se descomponen en subsistemas que ofrecen conjuntos de servicios relacionados. El proceso de diseño que (1) identifica esos subsistemas y (2) establece un marco para el control y la comunicación entre ellos es el <strong>diseño arquitectónico</strong>.</p>
        ${def('Diseño arquitectónico', 'Proceso que consiste en establecer un marco estructural básico para identificar los principales componentes de un sistema y las comunicaciones entre estos componentes. Explica cómo debe organizarse un sistema y cómo tiene que diseñarse su estructura global.', 'Sommerville, cap. 6, págs. 148-150.')}
        <p>Es el <strong>enlace crucial entre el diseño y la ingeniería de requerimientos</strong> (análisis). Su salida es un <strong>modelo arquitectónico</strong>: describe cómo se organiza el sistema como un conjunto de componentes en comunicación.</p>
        ${note('Aun en los procesos ágiles, una de las primeras etapas es establecer la arquitectura global: <strong>no es exitoso el desarrollo incremental de arquitecturas</strong>. Refactorizar componentes es relativamente fácil; refactorizar una arquitectura, no.', 'exam')}

        <h2>Ventajas e importancia</h2>
        <ul>
          <li>Obliga a considerar aspectos de diseño clave <strong>en etapas tempranas</strong>.</li>
          <li>Sirve como <strong>plan de diseño</strong> para negociar los requerimientos con clientes, desarrolladores y gestores.</li>
          <li>Es esencial para <strong>gestionar la complejidad</strong>: oculta detalles y permite centrarse en abstracciones clave.</li>
        </ul>
        <p>Los componentes individuales implementan los <strong>requerimientos funcionales</strong>. Los <strong>no funcionales</strong> (rendimiento, protección, disponibilidad...) dependen de la arquitectura, es decir, de la forma en que esos componentes se organizan y comunican. Los componentes también influyen, pero <strong>la arquitectura es la influencia dominante</strong>.</p>
        <h3>3 ventajas de diseñar y documentar la arquitectura</h3>
        <ol>
          <li><strong>Comunicación con los participantes</strong>: es una presentación de alto nivel que sirve como foco de discusión.</li>
          <li><strong>Análisis del sistema</strong>: aclarar la arquitectura exige análisis, y sus decisiones afectan requerimientos críticos como rendimiento, fiabilidad y mantenibilidad.</li>
          <li><strong>Reutilización a gran escala</strong>: sistemas con requerimientos similares suelen tener la misma arquitectura.</li>
        </ol>

        <h2>Diagramas de bloques</h2>
        ${bloques}
        <p>Las arquitecturas se modelan casi siempre con diagramas de bloques simples: dan una imagen de alto nivel de la estructura, fácil de entender. A veces son la <strong>única documentación arquitectónica</strong> que hay. Hay dos formas de usar un modelo arquitectónico:</p>
        ${table(['Uso', 'Para qué'], [
          ['1. Facilitar la discusión sobre el diseño', 'Una visión de alto nivel, sin detalles, para comunicarse con los participantes y planear el proyecto: se analiza el sistema como un todo e identifica los componentes clave para que los administradores asignen recursos.'],
          ['2. Documentar la arquitectura diseñada', 'Un modelo detallado que muestra componentes, interfaces y conexiones, para facilitar la comprensión y la evolución del sistema.'],
        ])}
      `,
      quiz: [
        { q: '¿Qué dos cosas hace el diseño arquitectónico?', o: ['Identifica subsistemas y su marco de control y comunicación', 'Diseña las clases del dominio y escribe el código de cada una', 'Releva los requerimientos del cliente y los prioriza por valor', 'Planifica los sprints y estima las historias del producto'], a: 0, e: 'Es el marco estructural básico: componentes principales y sus comunicaciones.' },
        { q: '¿De qué dependen principalmente los requerimientos no funcionales?', o: ['De la arquitectura del sistema', 'De cada componente individual', 'Del lenguaje de programación', 'De la interfaz de usuario'], a: 0, e: 'Los funcionales los implementan los componentes; los no funcionales dependen de cómo se organizan y comunican.' },
        { q: '¿Por qué en un proceso ágil la arquitectura se define al principio?', o: ['Porque refactorizar una arquitectura es difícil', 'Porque lo exige uno de los principios del Manifiesto', 'Porque el Dueño de Producto la usa para priorizar', 'Porque los componentes no se pueden refactorizar'], a: 0, e: 'Los componentes sí se refactorizan con facilidad; la arquitectura, no.' },
        { q: '¿Cuál es la principal crítica a los diagramas de bloques?', o: ['No muestran el tipo de relación ni las propiedades', 'Son demasiado detallados para hablar con clientes', 'Solo sirven para modelar sistemas embebidos', 'No se pueden usar para planear el proyecto'], a: 0, e: 'Igual son útiles para comunicar una visión de alto nivel.' },
        { q: '¿Cuál NO es una de las 3 ventajas de documentar la arquitectura?', o: ['Generar el código automáticamente', 'Comunicación con los participantes', 'Análisis del sistema', 'Reutilización a gran escala'], a: 0, e: 'Las tres son comunicación, análisis y reutilización a gran escala.' },
        { q: '¿Cuál es la salida del proceso de diseño arquitectónico?', o: ['Un modelo arquitectónico de componentes en comunicación', 'El diagrama de clases de diseño con todos sus métodos', 'La pila de producto priorizada por el cliente', 'El plan de pruebas de integración del sistema'], a: 0, e: 'El modelo arquitectónico es el enlace entre requerimientos y diseño.' },
      ],
      sources: [{ title: 'Ingeniería de Software, 9ª ed.', ref: 'Sommerville, cap. 6, págs. 148-150', points: ['Diseño arquitectónico, ventajas y diagramas de bloques.'] }],
    },

    {
      id: 'decisiones-arquitectonicas',
      module: 'm4',
      title: 'Decisiones en el diseño arquitectónico',
      keywords: '9 preguntas decisiones arquitectura genérica distribución patrones estilos rendimiento seguridad protección disponibilidad mantenibilidad conflictos evaluación',
      tldr: 'El diseño arquitectónico es un proceso creativo guiado por <mark>9 preguntas</mark>. La más decisiva: qué organización entrega mejor los requerimientos no funcionales. Cada uno empuja a una arquitectura distinta (<strong>rendimiento, seguridad, protección, disponibilidad, mantenibilidad</strong>), y a veces chocan.',
      goals: ['Enumerar las 9 preguntas del diseño arquitectónico.', 'Asociar cada requerimiento no funcional crítico con su decisión arquitectónica.', 'Explicar el conflicto rendimiento vs. mantenibilidad.', 'Saber cómo se evalúa una arquitectura.'],
      body: `
        <h2>Las 9 preguntas fundamentales</h2>
        <ol>
          <li>¿Hay alguna <strong>arquitectura genérica</strong> que sirva de plantilla?</li>
          <li>¿Cómo se <strong>distribuirá</strong> el sistema entre núcleos o procesadores?</li>
          <li>¿Qué <strong>patrones o estilos</strong> arquitectónicos pueden usarse?</li>
          <li>¿Cuál será el enfoque fundamental para <strong>estructurar</strong> el sistema?</li>
          <li>¿Cómo se separarán los componentes en <strong>subcomponentes</strong>?</li>
          <li>¿Qué estrategia se usará para <strong>controlar</strong> la operación de los componentes?</li>
          <li>¿Qué organización es mejor para entregar los <strong>requerimientos no funcionales</strong>?</li>
          <li>¿Cómo se <strong>evaluará</strong> el diseño?</li>
          <li>¿Cómo se <strong>documentará</strong> la arquitectura?</li>
        </ol>
        <p>Sistemas del mismo dominio suelen tener arquitecturas similares: al diseñar, se evalúa cuánto conocimiento se puede reutilizar de esas <strong>arquitecturas de aplicación</strong>. Los sistemas embebidos y de PC con un solo procesador no tienen arquitectura distribuida; los grandes son <strong>sistemas distribuidos</strong>. Y la arquitectura puede basarse en un patrón: hay que conocer sus fortalezas y debilidades.</p>

        <h2>El estilo depende de los requerimientos no funcionales</h2>
        ${table(['Si es crítico...', 'La arquitectura debe...'], [
          ['<strong>Rendimiento</strong>', 'Localizar las operaciones críticas en un número pequeño de componentes, desplegados en la misma computadora y <strong>no distribuidos por la red</strong>. Usar componentes relativamente <strong>grandes</strong> para reducir las comunicaciones entre ellos.'],
          ['<strong>Seguridad</strong>', 'Usar una estructura <strong>en capas</strong>, con los activos más críticos protegidos en las capas más internas y alto nivel de validación de seguridad en ellas.'],
          ['<strong>Protección</strong> (safety)', 'Ubicar las operaciones relacionadas con la protección en un componente individual o en pocos componentes. Permite, ante fallas, <strong>desactivar fácilmente</strong> el sistema.'],
          ['<strong>Disponibilidad</strong>', 'Incluir <strong>componentes redundantes</strong>, que permitan sustituir y actualizar componentes sin detener el sistema.'],
          ['<strong>Mantenibilidad</strong>', 'Usar componentes <strong>modulares, pequeños</strong> y fáciles de cambiar. Separar productores de datos de consumidores y evitar compartir estructuras de datos.'],
        ])}
        ${note('Seguridad (security) protege contra <strong>ataques externos</strong>: capas. Protección (safety) evita que el sistema <strong>cause daño</strong> cuando falla: concentrar y poder apagar. No las mezcles.', 'warn')}
        <h3>Conflictos</h3>
        <p>Usar componentes grandes mejora el rendimiento; usar pequeños mejora la mantenibilidad. Si ambos son críticos, hay que buscar una <strong>solución de compromiso</strong>: por ejemplo, usar diferentes patrones o estilos para distintas partes del sistema.</p>
        ${lab(0)}

        <h2>Evaluar la arquitectura</h2>
        <p>Es difícil: la verdadera prueba es saber si el sistema cubre los requerimientos funcionales y no funcionales <strong>cuando está en uso</strong>. Antes, se puede comparar el diseño con <strong>arquitecturas de referencia o patrones genéricos</strong>.</p>
      `,
      labs: [{
        type: 'classify', title: '¿Qué requerimiento no funcional guía esta decisión?',
        buckets: ['Rendimiento', 'Seguridad', 'Protección', 'Disponibilidad', 'Mantenibilidad'],
        items: [
          { t: 'Duplicar el servidor de base de datos para poder actualizar uno sin detener el servicio.', b: 3 },
          { t: 'Poner los datos de tarjetas de crédito en la capa más interna, con validación en cada capa.', b: 1 },
          { t: 'Agrupar el cálculo crítico en un único componente grande, en la misma máquina.', b: 0 },
          { t: 'Reunir en un solo componente todas las operaciones que pueden dañar al paciente, para poder apagarlas rápido.', b: 2 },
          { t: 'Dividir el sistema en módulos chicos que no comparten estructuras de datos.', b: 4 },
          { t: 'Evitar distribuir por la red las operaciones de cálculo en tiempo real.', b: 0 },
        ],
      }],
      quiz: [
        { q: 'Si el rendimiento es crítico, ¿qué arquitectura conviene?', o: ['Pocos componentes grandes, desplegados en la misma computadora', 'Muchos componentes pequeños distribuidos en la red', 'Una estructura en capas con validación en cada capa', 'Componentes redundantes'], a: 0, e: 'Así se reducen las comunicaciones entre componentes.' },
        { q: 'Si la disponibilidad es crítica, ¿qué conviene?', o: ['Componentes redundantes', 'Concentrar todo en un componente', 'Usar componentes muy grandes', 'Evitar comunicarse por la red'], a: 0, e: 'La redundancia permite reemplazar sin parar el servicio.' },
        { q: '¿Qué decisión corresponde a un requerimiento crítico de protección (safety)?', o: ['Concentrar las operaciones de protección en pocos componentes', 'Proteger los activos en las capas más internas, con validación', 'Duplicar todos los componentes para poder reemplazarlos', 'Distribuir los datos entre varios nodos de la red'], a: 0, e: 'Las capas internas corresponden a seguridad (security).' },
        { q: '¿Qué conflicto típico señalan las diapositivas?', o: ['Componentes grandes: rendimiento; pequeños: mantenibilidad', 'Seguridad y disponibilidad son siempre incompatibles', 'Capas y cliente-servidor no se pueden combinar nunca', 'Rendimiento y protección exigen exactamente lo mismo'], a: 0, e: 'Se resuelve con soluciones de compromiso o distintos estilos por parte.' },
        { q: 'Para mantenibilidad, ¿qué se recomienda respecto de los datos?', o: ['Separar productores y consumidores, sin compartir estructuras', 'Compartir una estructura de datos global entre los módulos', 'Concentrar todos los datos en un único componente grande', 'Replicar los datos en todos los nodos para evitar esperas'], a: 0, e: 'Componentes modulares que se cambian fácilmente.' },
        { q: '¿Cuál es la verdadera prueba de una arquitectura?', o: ['Que el sistema cumpla los requerimientos cuando está en uso', 'Que el diagrama de bloques sea claro para todos los participantes', 'Que use un patrón arquitectónico conocido y bien documentado', 'Que el cliente la apruebe formalmente antes de programar'], a: 0, e: 'Antes de eso, solo se puede comparar con arquitecturas de referencia o patrones.' },
      ],
      sources: [{ title: 'Ingeniería de Software, 9ª ed.', ref: 'Sommerville, cap. 6, págs. 151-153', points: ['Decisiones en el diseño arquitectónico y características no funcionales.'] }],
    },

    {
      id: 'vistas-arquitectonicas',
      module: 'm4',
      title: 'Vistas arquitectónicas',
      keywords: 'vistas lógica proceso desarrollo física 4+1 perspectiva sistemas críticos reguladores',
      tldr: 'Ningún modelo muestra toda la arquitectura: cada uno es una <mark>vista</mark>. Sommerville propone <strong>4 vistas</strong>: <strong>lógica</strong> (clases), <strong>de proceso</strong> (procesos en interacción), <strong>de desarrollo</strong> (componentes a implementar) y <strong>física</strong> (hardware y distribución).',
      goals: ['Explicar por qué hacen falta múltiples vistas.', 'Describir las 4 vistas de Sommerville y para quién sirve cada una.', 'Saber cuándo hay que documentar todas.'],
      body: `
        <h2>Por qué varias vistas</h2>
        <p>Es imposible representar toda la información relevante de una arquitectura en un solo modelo: cada uno muestra una <strong>vista o perspectiva</strong>. Una vista puede mostrar cómo el sistema se descompone en módulos, cómo interactúan los procesos o cómo se distribuyen los componentes en una red. Todas son útiles en distintos momentos del diseño, así que se presentan <strong>múltiples vistas</strong>.</p>
        ${vistas}
        ${table(['Vista', 'Qué muestra', 'Útil para'], [
          ['1. Lógica', 'Las abstracciones clave del sistema como <strong>objetos o clases</strong>; relaciona los requerimientos con entidades.', 'Relacionar requerimientos y diseño.'],
          ['2. De proceso', 'Cómo el sistema, en tiempo de ejecución, está compuesto por <strong>procesos en interacción</strong>.', 'Juzgar características no funcionales como rendimiento y disponibilidad.'],
          ['3. De desarrollo', 'Cómo se descompone el software para su desarrollo: los <strong>componentes que implementan</strong> los desarrolladores o equipos.', 'Administradores y programadores.'],
          ['4. Física', 'El <strong>hardware</strong> y cómo los componentes de software se distribuyen entre los procesadores.', 'Planear la implementación (ingenieros de sistemas).'],
        ])}
        <p>No siempre vale la pena desarrollar las cuatro: hay que hacer las <strong>útiles para la comunicación</strong>. En <strong>sistemas críticos</strong>, en cambio, hay que hacer un análisis de confiabilidad detallado y convencer a reguladores externos de que el sistema cumple sus normas: se necesita la documentación arquitectónica completa.</p>
        ${note('En la clase 8 vas a ver las <strong>6 vistas de Larman</strong> para el SAD: lógica, de proceso, de despliegue, de datos, de casos de uso y de implementación. No las confundas con las 4 de Sommerville: la “física” de Sommerville se parece a la “de despliegue” de Larman, y la “de desarrollo” a la “de implementación”.', 'exam')}
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿Qué vista de Sommerville es?',
        buckets: ['Lógica', 'De proceso', 'De desarrollo', 'Física'],
        items: [
          { t: 'Un diagrama que muestra que el servidor web y el de base de datos están en máquinas distintas.', b: 3 },
          { t: 'Las clases Venta, Pago y Producto y cómo se relacionan.', b: 0 },
          { t: 'Qué equipo programa cada módulo y en qué paquetes se divide el código.', b: 2 },
          { t: 'Los procesos que se ejecutan en paralelo y cómo se comunican en tiempo de ejecución.', b: 1 },
          { t: 'La asignación de los componentes de software a los procesadores de la red.', b: 3 },
        ],
      }],
      quiz: [
        { q: '¿Qué muestra la vista lógica?', o: ['Las abstracciones clave como objetos o clases', 'El hardware y la distribución', 'Los procesos en tiempo de ejecución', 'Los componentes que programa cada equipo'], a: 0, e: 'Relaciona los requerimientos con entidades del sistema.' },
        { q: '¿Qué vista es más útil para administradores y programadores?', o: ['La de desarrollo', 'La física', 'La lógica', 'La de proceso'], a: 0, e: 'Muestra la descomposición en componentes que se implementan.' },
        { q: '¿Qué vista sirve para planear la implementación del sistema en el hardware?', o: ['La física', 'La lógica', 'La de desarrollo', 'La de casos de uso'], a: 0, e: 'Expone el hardware y cómo se distribuyen los componentes.' },
        { q: '¿Cuándo es necesaria la documentación arquitectónica completa?', o: ['En sistemas críticos, para convencer a reguladores externos', 'Siempre, en cualquier sistema', 'Nunca: alcanza con un diagrama de bloques', 'Solo en métodos ágiles'], a: 0, e: 'En los demás casos se desarrollan solo las vistas útiles para comunicar.' },
        { q: '¿Por qué se necesitan múltiples vistas?', o: ['Ningún modelo único muestra toda la arquitectura', 'Porque UML exige al menos cuatro diagramas', 'Para que cada equipo tenga su propio diagrama', 'Porque cada vista corresponde a un sprint'], a: 0, e: 'Cada modelo presenta solo una perspectiva.' },
      ],
      sources: [{ title: 'Ingeniería de Software, 9ª ed.', ref: 'Sommerville, cap. 6, págs. 153-155', points: ['Vistas arquitectónicas: lógica, de proceso, de desarrollo y física.'] }],
    },
  );
})();
