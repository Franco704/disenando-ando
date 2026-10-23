/* Unidad II, clases 8 y 9: FURPS+, análisis arquitectural y SAD, interfaces, paquetes, componentes, puertos y estructura interna.
   Diapositivas Clase8 y 09, Larman 2ª ed. caps. 5, 32 y 38, Booch 2ª ed. caps. 11, 12 y 15. */
(() => {
  const { LESSONS, h } = window.GUIDE;
  const { note, def, table, fig, lab, uml: U } = h;

  // Interfaz proporcionada y requerida: notación icónica y expandida
  const interfaces = fig(U.svg(600, 210, `
    <text x="150" y="16" class="u-c u-sans u-b">Notación icónica</text>
    ${U.box(20, 60, 110, 'Venta', { h: 40 })}${U.ln([[130, 80], [172, 80]])}${U.lol(180, 80)}<text x="180" y="66" class="u-c u-sm t-if">ICalculadorImpuestos</text>
    ${U.sock(196, 80, 'l', 11)}${U.ln([[196, 80], [196, 80]])}${U.ln([[207, 80], [240, 80]])}${U.box(240, 60, 90, 'Registro', { h: 40 })}
    <text x="80" y="122" class="u-c u-sm">proporcionada (●)</text><text x="285" y="122" class="u-c u-sm">requerida (◖)</text>
    <text x="470" y="16" class="u-c u-sans u-b">Notación expandida</text>
    ${U.box(400, 26, 150, 'ICalculadorImpuestos', { stereo: 'interface', ops: ['getImpuestos(v): Lista'], cls: 'k-if' })}
    ${U.box(370, 140, 90, 'Venta', { h: 40 })}${U.box(490, 140, 90, 'Registro', { h: 40 })}
    ${U.ln([[415, 140], [450, 92]], { end: 'tri', dash: true })}${U.ln([[535, 140], [505, 92]], { end: 'op', dash: true })}
    <text x="400" y="200" class="u-c u-sm">realización</text><text x="540" y="200" class="u-c u-sm">uso «use»</text>`,
    'Notación de interfaces en UML: icónica con círculo y semicírculo, y expandida con la interfaz estereotipada, una realización y una dependencia de uso'),
    'La misma situación en las dos notaciones. Venta <strong>proporciona</strong> (realiza) la interfaz; Registro la <strong>requiere</strong> (la usa). En la expandida, la realización es una línea punteada con triángulo hueco y el uso, una dependencia punteada.');

  // Componente Vendedor de Entradas con puertos (Booch fig. 15.4)
  const puertos = fig(U.svg(600, 260, `
    ${U.box(170, 40, 260, 'VendedorDeEntradas', { h: 180, flat: true })}${U.compIcon(430, 40)}
    ${U.port(170, 90)}${U.port(170, 170)}${U.port(430, 90)}${U.port(430, 170)}${U.port(300, 220)}
    <text x="182" y="94" class="u-sm">ventaNormal</text><text x="182" y="174" class="u-sm">ventaPrioritaria</text><text x="418" y="94" class="u-sm u-e">cargarEsp.</text><text x="418" y="174" class="u-sm u-e">reservas</text><text x="300" y="212" class="u-sm u-c">cobros</text>
    ${U.ln([[164, 90], [120, 90]])}${U.lol(112, 90)}<text x="100" y="76" class="u-sm u-e t-if">Venta de entradas</text>
    ${U.ln([[164, 170], [120, 170]])}${U.lol(112, 170)}<text x="100" y="156" class="u-sm u-e t-if">Venta de entradas</text>
    ${U.ln([[436, 90], [480, 90]])}${U.lol(488, 90)}<text x="500" y="76" class="u-sm t-if">Cargar espectáculos</text>
    ${U.ln([[436, 170], [474, 170]])}${U.sock(474, 170, 'r')}<text x="500" y="156" class="u-sm t-if">Reservar</text>
    ${U.ln([[300, 226], [300, 240]])}${U.sock(300, 240, 'd')}<text x="320" y="254" class="u-sm t-if">Tarjeta de crédito</text>`,
    'Componente Vendedor de Entradas con cinco puertos: dos de venta con la misma interfaz proporcionada, uno para cargar espectáculos, uno de reservas requerida y uno de cobros con tarjeta requerida'),
    'Componente con puertos (Booch, figura 15.4). Los cuadraditos del borde son puertos; cada uno tiene nombre y agrupa interfaces proporcionadas (●) o requeridas (◖). Hay dos puertos de venta con la misma interfaz: uno para clientes normales y otro para prioritarios.');

  // Estructura interna: delegación, junta circular y conector directo (Booch fig. 15.7)
  const interna = fig(U.svg(640, 270, `
    ${U.box(60, 20, 520, 'Pedidos', { h: 230, flat: true })}${U.compIcon(580, 20)}
    ${U.port(60, 120)}<text x="30" y="108" class="u-sm u-c">EntradaDe</text><text x="30" y="148" class="u-sm u-c">Pedidos</text>
    ${U.box(110, 90, 130, ':CapturaDePedidos', { h: 60, cls: 'k-a' })}${U.port(110, 120)}
    ${U.ln([[66, 120], [104, 120]], { end: 'ar' })}<text x="85" y="112" class="u-sm u-c">delega</text>
    ${U.ln([[240, 120], [290, 120]])}${U.lol(298, 120)}${U.sock(312, 120, 'l')}${U.ln([[323, 120], [370, 120]])}<text x="305" y="80" class="u-sm u-c t-if">TraspasoDePedidos</text>
    ${U.box(370, 90, 130, ':GestiónDePedidos', { h: 60, cls: 'k-a' })}
    ${U.box(370, 190, 130, ':Inventario', { h: 46, cls: 'k-a' })}${U.ln([[400, 150], [400, 190]])}<text x="394" y="174" class="u-sm u-e">conector directo</text>
    ${U.ln([[470, 150], [470, 190]], { end: 'ar' })}<text x="476" y="174" class="u-sm">EnviarArtículos</text>
    ${U.port(580, 110)}${U.ln([[500, 110], [574, 110]], { end: 'ar' })}<text x="610" y="98" class="u-sm u-c">cobros</text>${U.ln([[586, 110], [610, 110]])}${U.sock(620, 110, 'r')}<text x="612" y="136" class="u-sm u-c t-if">Crédito</text>
    ${U.port(580, 213)}${U.ln([[500, 213], [574, 213]], { end: 'ar' })}<text x="606" y="242" class="u-sm u-c t-if">Realización</text>`,
    'Estructura interna del componente Pedidos con partes, conector de delegación, junta circular y conector directo'),
    'Estructura interna (Booch, figura 15.7). La petición externa se <strong>delega</strong> del puerto EntradaDePedidos a CapturaDePedidos; esta pasa el pedido por una <strong>junta circular</strong> (interfaces compatibles, sin conocimiento mutuo) a GestiónDePedidos, que habla con Inventario por un <strong>conector directo</strong> (fuertemente acoplado) y usa los servicios externos Crédito y Realización.');

  LESSONS.push(
    {
      id: 'furps',
      module: 'm6',
      title: 'Modelo de calidad FURPS+ y requisitos no funcionales',
      keywords: 'requisitos requerimientos gestión FURPS+ funcional usabilidad confiabilidad rendimiento soporte supportability limitaciones de recursos interfaz legales no funcionales atributos de calidad checklist',
      tldr: '<mark>FURPS+</mark> es un mnemotécnico para no olvidar ningún tipo de requisito: <strong>F</strong>uncional, <strong>U</strong>sabilidad, <strong>R</strong>eliability (confiabilidad), <strong>P</strong>erformance (rendimiento) y <strong>S</strong>upportability (soporte), más el <strong>+</strong> (recursos, interfaz, legales). F es funcional; URPS son los <mark>atributos de calidad</mark>, que influyen fuertemente en la arquitectura.',
      goals: ['Definir requisito y gestión de requisitos.', 'Desarrollar FURPS+ con los factores de cada categoría.', 'Clasificar requisitos en funcionales y no funcionales.'],
      body: `
        <h2>Requisitos</h2>
        ${def('Requisitos (requerimientos)', 'Capacidades y condiciones a las cuales debe ajustarse el sistema.', 'Larman, cap. 5, págs. 39-42.')}
        <p>La <strong>gestión de requisitos</strong> es un enfoque sistemático para encontrar, documentar, organizar y seguir la pista de los requisitos cambiantes de un sistema, con destreza y sin descuidos.</p>

        <h2>FURPS+</h2>
        ${fig(U.svg(600, 120, `${[['F', 'Funcional', 'comportamiento'], ['U', 'Usabilidad', 'facilidad de uso'], ['R', 'Reliability', 'confiabilidad'], ['P', 'Performance', 'rendimiento'], ['S', 'Supportability', 'soporte'], ['+', 'Más', 'recursos · interfaz · legales']].map(([l, t, s], i) => `${U.blk(4 + i * 100, 10, 92, 96, '', { cls: i === 0 ? 'k-if' : i === 5 ? 'k-warn' : 'k-a' })}<text x="${50 + i * 100}" y="52" class="u-c u-sans u-b" style="font-size:28px">${l}</text><text x="${50 + i * 100}" y="74" class="u-c u-sans u-b">${t}</text><text x="${50 + i * 100}" y="92" class="u-c u-sm">${s}</text>`).join('')}`, 'Las seis categorías de FURPS+'), 'F son los requisitos funcionales; URPS, los no funcionales o atributos de calidad; el + agrupa restricciones adicionales.')}
        ${table(['Categoría', 'Factores'], [
          ['<strong>F</strong>uncional (Functional)', 'Características, capacidades y seguridad: lo que el sistema hace. Se estudian en los <strong>casos de uso</strong>.'],
          ['<strong>U</strong>sabilidad (Usability)', 'Intuitividad (factores humanos), ayuda y documentación / manuales de usuario.'],
          ['<strong>R</strong> Confiabilidad (Reliability)', 'Frecuencia de fallos, capacidad de recuperación de un fallo y grado de previsión.'],
          ['<strong>P</strong> Rendimiento (Performance)', 'Tiempos de respuesta, productividad, precisión y disponibilidad.'],
          ['<strong>S</strong> Soporte (Supportability)', 'Adaptabilidad y facilidad de mantenimiento (también internacionalización y configurabilidad).'],
          ['<strong>+</strong>', '<strong>Limitación de los recursos</strong> (lenguajes, herramientas, hardware); <strong>interfaz</strong> (restricciones para interactuar con otros sistemas); <strong>legales</strong> (licencias, etc.).'],
        ])}
        <p>Las categorías FURPS+ funcionan como <strong>checklist</strong> para no omitir ninguna faceta importante. Los requisitos se clasifican en <strong>funcionales</strong> (comportamiento, F) y <strong>no funcionales</strong> (URPS). Los no funcionales son atributos o requisitos de calidad, e influyen fuertemente en la arquitectura del sistema: es lo que se vio con Sommerville en la clase 6.</p>
        ${note('Fijate que la disponibilidad está dentro de <strong>Performance</strong> (rendimiento) en FURPS+, mientras que la recuperación de fallos es <strong>Reliability</strong> (confiabilidad). La mantenibilidad es <strong>Supportability</strong>.', 'warn')}
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: 'Clasificá en FURPS+',
        buckets: ['F', 'U', 'R', 'P', 'S', '+'],
        items: [
          { t: 'El sistema debe calcular el total de la venta con impuestos.', b: 0 },
          { t: 'Un cajero nuevo debe aprender a registrar una venta en menos de 30 minutos.', b: 1 },
          { t: 'Si se cae el servicio de autorización de pagos, el sistema sigue registrando ventas.', b: 2 },
          { t: 'La autorización de un pago debe responder en menos de 2 segundos el 90% de las veces.', b: 3 },
          { t: 'Debe poder agregarse una regla de precios nueva sin recompilar.', b: 4 },
          { t: 'El sistema debe programarse en Java por exigencia del cliente.', b: 5 },
          { t: 'Debe integrarse con el sistema contable existente mediante su API.', b: 5 },
          { t: 'Debe cumplir las normas fiscales de facturación electrónica.', b: 5 },
          { t: 'El texto en pantalla debe leerse a un metro de distancia.', b: 1 },
        ],
      }],
      quiz: [
        { q: '¿Qué significa la R de FURPS+?', o: ['Reliability', 'Rendimiento', 'Recursos', 'Requisitos'], a: 0, e: 'El rendimiento es la P (Performance); los recursos están en el +.' },
        { q: '¿Qué categoría de FURPS+ incluye tiempos de respuesta y disponibilidad?', o: ['Performance (rendimiento)', 'Reliability (confiabilidad)', 'Supportability (soporte)', 'Usability (usabilidad)'], a: 0, e: 'Rendimiento: tiempos de respuesta, productividad, precisión y disponibilidad.' },
        { q: '¿Qué agrupa el + de FURPS+?', o: ['Recursos, interfaz y requisitos legales', 'Requisitos funcionales adicionales del sistema', 'Seguridad y protección contra ataques externos', 'Usabilidad avanzada para usuarios expertos'], a: 0, e: 'Lenguajes, herramientas y hardware; restricciones de interfaz; licencias.' },
        { q: '¿Dónde se estudian los requisitos funcionales?', o: ['En los casos de uso', 'En la tabla de factores', 'En los memorándums técnicos', 'En el diagrama de despliegue'], a: 0, e: 'Los no funcionales se tratan en el análisis arquitectural.' },
        { q: 'La facilidad de mantenimiento y la adaptabilidad pertenecen a...', o: ['Supportability', 'Reliability', 'Usability', 'Performance'], a: 0, e: 'Es la S de FURPS+.' },
        { q: '¿Para qué sirven las categorías FURPS+?', o: ['Como checklist para no omitir tipos de requisitos', 'Para priorizar las historias de la pila de producto', 'Para estimar las historias en puntos de historia', 'Para diseñar el diagrama de clases del dominio'], a: 0, e: 'Es un mnemotécnico de tipos de requisitos.' },
        { q: '“Frecuencia de fallos, capacidad de recuperación y grado de previsión” son factores de...', o: ['Confiabilidad', 'Rendimiento', 'Usabilidad', 'Soporte'], a: 0, e: 'Son los factores de la R.' },
      ],
      sources: [{ title: 'UML y Patrones, 2ª ed.', ref: 'Larman, cap. 5, págs. 39-42', points: ['Tipos de requisitos y el modelo FURPS+.'] }],
    },

    {
      id: 'analisis-arquitectural-y-sad',
      module: 'm6',
      title: 'Análisis arquitectural y el SAD',
      keywords: 'análisis arquitectural investigación diseño arquitectural architectural drivers escenarios de calidad estímulo respuesta factores tabla de factores memorándum técnico prioridades SAD documento de la arquitectura vistas Larman lógica proceso despliegue datos casos de uso implementación',
      tldr: 'El <mark>análisis arquitectural</mark> identifica y resuelve los requisitos no funcionales que mandan en la arquitectura. Se expresa en <strong>escenarios de calidad</strong> medibles, <strong>tablas de factores</strong> y <strong>memorándums técnicos</strong>. Todo eso, junto con las vistas, forma el <mark>SAD</mark> (documento de la arquitectura del software).',
      goals: ['Definir análisis arquitectural y sus 2 pasos.', 'Escribir un escenario de calidad verificable.', 'Armar una tabla de factores y un memorándum técnico.', 'Ordenar las prioridades de las decisiones.', 'Describir el SAD y las 6 vistas de Larman.'],
      body: `
        <h2>Análisis arquitectural</h2>
        ${def('Análisis arquitectural', 'Identificación y resolución de los requisitos no funcionales del sistema. Comprende la investigación arquitectural (identificación) y el diseño arquitectural (resolución).', 'Larman, cap. 32, págs. 451-471.')}
        <ol>
          <li><strong>Identificar y analizar</strong> los requisitos no funcionales que influyen en la arquitectura: los <strong>controladores de la arquitectura</strong> (architectural drivers).</li>
          <li><strong>Investigar</strong> los que más influyen: analizar alternativas y crear soluciones que resuelvan su impacto. Son las <strong>decisiones sobre la arquitectura</strong>, que pueden ser “hacer una solución a medida”, “eliminar el requisito”, “detener el proyecto”, “contratar un experto”, etc.</li>
        </ol>

        <h2>Escenarios de calidad</h2>
        <p>Al definir requisitos de calidad se usan <strong>escenarios de calidad</strong>: sentencias cortas de la forma <strong>estímulo → respuesta cuantificable</strong> y verificable.</p>
        <ul>
          <li>“Cuando se envía un mensaje a un módulo, el resultado se devolverá en 2 segundos 4 de cada 5 veces.”</li>
          <li>“Cuando llega una queja de un cliente, llámelo el día hábil siguiente.”</li>
        </ul>
        <p>Hay que especificar las ambigüedades (“la mayoría”, “poca cantidad”). <strong>Un escenario que no se puede probar no sirve</strong>: hay que especificarlo entero.</p>
        ${note('“El sistema debe ser rápido” no es un escenario de calidad. “Al confirmar una venta, la autorización del pago responde en menos de 2 segundos en el 90% de los casos, con 50 cajas operando” sí lo es.', 'exam')}

        <h2>Factores y tabla de factores</h2>
        <p>Los <strong>factores</strong> son los aspectos clave que afectan o condicionan las decisiones arquitectónicas: una forma de representar los requisitos no funcionales (un requisito puede tener varios factores). Para entender su influencia, prioridad y variabilidad se arma la <strong>tabla de factores</strong>:</p>
        ${table(['Factor', 'Medidas y escenarios de calidad', 'Variabilidad (flexibilidad actual y evolución futura)', 'Impacto en los participantes, la arquitectura y otros factores', 'Prioridad', 'Dificultad o riesgo'], [
          ['<strong>Fiabilidad – Recuperación</strong><br>Recuperarse de fallos de servicios remotos', 'Cuando falla un servicio remoto (p. ej., el calculador de impuestos), se restablece la conexión en 1 minuto tras volver a estar disponible.', 'Actual: no es obligatorio un servicio local de reserva, pero es deseable. Futura: los clientes pueden querer más.', 'Alto: los negocios pierden ventas si no se puede vender. Afecta a toda la arquitectura.', 'Alta', 'Media'],
          ['<strong>Soporte – Adaptabilidad</strong><br>Soportar muchos calculadores de impuestos', 'Al agregar un calculador nuevo, se integra en menos de 10 días-persona.', 'Actual: 3 calculadores. Futura: más, según el mercado.', 'Alto: es requisito para vender el producto a distintos clientes.', 'Alta', 'Baja'],
        ])}

        <h2>Memorándums técnicos</h2>
        <p>Registran las decisiones <strong>con su motivación o fundamento</strong>. Cuando haya que modificar el sistema (o cuando el arquitecto ya olvidó por qué decidió algo) es útil saber por qué se eligió un enfoque y por qué se <strong>rechazaron las alternativas</strong>: en el futuro alguien podría reconsiderarlas. El formato no importa: hay que mantenerlo simple y con lo que ayude a decidir. Una decisión puede resolver varios factores.</p>
        <div class="note"><p><strong>Memorándum técnico — Cuestión: Fiabilidad, recuperación de fallos de servicios remotos.</strong></p><p><strong>Resumen de la solución</strong>: transparencia de la ubicación usando búsqueda de servicios; recuperación de fallos de remoto a local y replicación parcial de servicios locales.</p><p><strong>Factores</strong>: fiabilidad robusta ante fallos de servicios remotos (impuestos, inventario).</p><p><strong>Solución</strong>: un ServiceFactory devuelve un adaptador al servicio; si el remoto falla, se usa un servicio local con una caché de los datos más usados.</p><p><strong>Motivación</strong>: los negocios no quieren dejar de vender.</p><p><strong>Cuestiones no resueltas</strong>: ninguna. <strong>Alternativas consideradas</strong>: un acuerdo de calidad de servicio con el proveedor remoto (demasiado caro y poco fiable).</p></div>

        <h2>Prioridades</h2>
        <p>Jerarquía de objetivos que guían las decisiones de arquitectura:</p>
        <ol><li><strong>Restricciones inflexibles</strong>: normas legales y de seguridad.</li><li><strong>Objetivos del negocio</strong>.</li><li><strong>Todos los demás</strong> objetivos.</li></ol>

        <h2>El SAD</h2>
        ${def('SAD (Software Architecture Document)', 'Documento que describe las grandes ideas de la arquitectura y las decisiones del análisis arquitectural. Su esencia es el resumen de las decisiones (memorándums técnicos) y las vistas de la arquitectura.', 'Larman, cap. 32.')}
        <p>Ayuda a entender rápido las ideas esenciales del sistema: “¿qué necesito decir y representar para que se entiendan las ideas principales?”. Tener una arquitectura es una cosa; hay que <strong>describirla</strong>, y conviene hacerlo con múltiples vistas. Una <strong>vista de la arquitectura</strong> es una ventana sobre el sistema desde una perspectiva: destaca la información relevante e ignora el resto. Es una herramienta de comunicación, enseñanza o reflexión, con texto y UML, que explica <strong>por qué</strong> la arquitectura es como es.</p>
        ${table(['Vista (Larman)', 'Qué describe', 'Con qué'], [
          ['1. Lógica', 'Organización del software en subsistemas, paquetes, clases e interfaces más importantes; resume la funcionalidad de cada subsistema.', 'Diagramas de paquetes e interfaces'],
          ['2. De proceso', 'Procesos e hilos de ejecución, sus responsabilidades y colaboraciones.', 'Diagramas de clases e interacción'],
          ['3. De despliegue', 'Despliegue físico de procesos y componentes en nodos y la configuración de la red.', 'Diagramas de despliegue'],
          ['4. De datos', 'Correspondencia de objetos con datos persistentes.', 'Modelo de datos'],
          ['5. De casos de uso', 'Los casos de uso más significativos para la arquitectura y sus requisitos no funcionales.', 'Diagramas de casos de uso'],
          ['6. De implementación', 'Entregables y las cosas que los crean (código fuente).', 'Descripción resumida'],
        ])}
        <p>Larman <strong>recomienda documentar</strong> las vistas lógica, de proceso, de casos de uso y de despliegue.</p>
        ${lab(0)}
      `,
      labs: [{
        type: 'order', title: 'De requisito a decisión documentada',
        items: ['Identificar los requisitos no funcionales que influyen en la arquitectura (architectural drivers)', 'Expresarlos como escenarios de calidad medibles', 'Registrar factores, variabilidad, prioridad y riesgo en la tabla de factores', 'Analizar alternativas y decidir la solución', 'Escribir el memorándum técnico con la motivación y las alternativas rechazadas', 'Resumir decisiones y vistas en el SAD'],
        explain: '<p>Investigación arquitectural (identificar) y diseño arquitectural (resolver), y después documentar.</p>',
      }],
      quiz: [
        { q: '¿Qué comprende el análisis arquitectural?', o: ['Identificar y resolver los requisitos no funcionales', 'Diseñar las clases del dominio y escribir su código', 'Planificar los sprints y la entrega de incrementos', 'Ejecutar las pruebas de rendimiento del sistema'], a: 0, e: 'Es la identificación y resolución de los requisitos no funcionales.' },
        { q: '¿Cuál de estos es un escenario de calidad válido?', o: ['Ante un mensaje, responde en 2 s 4 de cada 5 veces', 'El sistema debe ser rápido y confiable en todo momento', 'La mayoría de las consultas deben resolverse con agilidad', 'El sistema debe tener buena usabilidad para los cajeros'], a: 0, e: 'Tiene estímulo y respuesta cuantificable: se puede probar.' },
        { q: '¿Para qué se registran en el memorándum técnico las alternativas rechazadas?', o: ['Para que un arquitecto futuro sepa por qué se descartaron', 'Para cumplir con la norma ISO de documentación de software', 'Para que el cliente pueda elegir otra si no le gusta la elegida', 'No se registran: el memorándum solo guarda la decisión tomada'], a: 0, e: 'Se documentan la motivación y las alternativas consideradas.' },
        { q: '¿Cuál es la prioridad más alta en la jerarquía de objetivos de la arquitectura?', o: ['Restricciones inflexibles: legales y de seguridad', 'Los objetivos del negocio del cliente', 'Los requisitos de rendimiento críticos', 'La usabilidad para los usuarios finales'], a: 0, e: 'Luego vienen los objetivos del negocio y después el resto.' },
        { q: '¿Cuál es la esencia del SAD?', o: ['Resumen de decisiones (memorándums) y vistas', 'El código fuente comentado de los módulos', 'La pila de producto con sus estimaciones', 'El plan de pruebas de integración y versión'], a: 0, e: 'Describe las grandes ideas y explica por qué la arquitectura es como es.' },
        { q: '¿Qué vistas recomienda documentar Larman?', o: ['Lógica, de proceso, de casos de uso y de despliegue', 'Solo la lógica', 'Lógica, de proceso, de desarrollo y física', 'Todas las seis siempre'], a: 0, e: 'Lógica, de proceso, de desarrollo y física son las 4 de Sommerville.' },
        { q: '¿Qué vista de Larman muestra la correspondencia de objetos con datos persistentes?', o: ['La vista de datos', 'La vista lógica', 'La vista de despliegue', 'La vista de implementación'], a: 0, e: 'Se representa con el modelo de datos.' },
        { q: '¿Qué son los factores en el análisis arquitectural?', o: ['Aspectos clave que condicionan las decisiones de arquitectura', 'Los casos de uso más importantes del sistema', 'Los componentes de software que forman la arquitectura', 'Los costos y plazos que condicionan el proyecto'], a: 0, e: 'Un requisito no funcional puede estar formado por varios factores.' },
      ],
      sources: [{ title: 'UML y Patrones, 2ª ed.', ref: 'Larman, cap. 32, págs. 451-471', points: ['Análisis arquitectural, escenarios de calidad, tabla de factores y memorándums técnicos (ejemplos en págs. 458-459).', 'SAD y vistas de la arquitectura.'] }],
    },

    {
      id: 'interfaces-y-paquetes',
      module: 'm6',
      title: 'Interfaces y paquetes en UML',
      keywords: 'interfaz UML línea de separación contrato operaciones proporcionada requerida círculo semicírculo nombre simple calificado estereotipo realización paquete carpeta visibilidad dos puntos dobles',
      tldr: 'Una <mark>interfaz</mark> es una colección de operaciones que especifica un servicio <strong>sin dictar su implementación</strong>: un contrato. Se dibuja como círculo (proporcionada) o semicírculo (requerida). Un <mark>paquete</mark> agrupa elementos de modelado en una carpeta con pestaña.',
      goals: ['Definir interfaz y explicar por qué es una línea de separación.', 'Dibujar interfaces proporcionadas y requeridas en notación icónica y expandida.', 'Aplicar las reglas de nombres de interfaces y paquetes.', 'Explicar para qué sirven los paquetes.'],
      body: `
        <h2>Interfaces</h2>
        <p>Las interfaces <strong>especifican y construyen las líneas de separación</strong> de un sistema. Hay que diseñar con clara separación de intereses, de modo que los cambios en una parte no se propaguen afectando a las demás.</p>
        ${def('Interfaz', 'Colección de operaciones que se usa para especificar un servicio de una clase o de un componente.', 'Booch, Rumbaugh y Jacobson, cap. 11, págs. 161-172.')}
        <p>Declarar una interfaz es enunciar el comportamiento deseado de una abstracción <strong>independientemente de su implementación</strong>: se puede construir o comprar cualquier implementación, siempre que cumpla sus responsabilidades y el contrato. Al contrario de las clases, las interfaces <strong>no llevan métodos</strong> (implementación de una operación). Una interfaz se declara como una <strong>clase estereotipada</strong> «interface» que lista sus operaciones en el tercer compartimento.</p>
        ${interfaces}
        ${table(['', 'Interfaz proporcionada', 'Interfaz requerida'], [['Qué es', 'Servicios que la clase o el componente <strong>se compromete a cumplir</strong>.', 'Servicios que una clase <strong>espera de otra</strong>.'], ['Notación', 'Pequeño <strong>círculo</strong> unido a la clase (“chupetín”).', 'Pequeño <strong>semicírculo</strong> unido a la clase.']])}
        <p>Una clase o componente puede realizar muchas interfaces: se compromete a cumplir todos esos contratos con métodos que implementen sus operaciones. Como la interfaz es un contrato, <strong>cliente y proveedor pueden cambiar</strong> mientras cada uno cumpla sus obligaciones.</p>
        <h3>Nombres</h3>
        <ul>
          <li>Cada interfaz tiene un nombre que la distingue: <strong>simple</strong> (solo el nombre) o <strong>calificado</strong> (precedido del paquete que la contiene, como <code>Sensores::IUnidadMedida</code>).</li>
          <li>Debe ser <strong>único dentro de su paquete</strong>; puede dibujarse mostrando solo el nombre.</li>
          <li>Se forma con letras, números y algunos signos de puntuación, <strong>excepto los dos puntos</strong>, que separan el nombre de la interfaz del de su paquete.</li>
          <li>En la práctica, sustantivos cortos o expresiones nominales del dominio.</li>
        </ul>
        <h3>Una interfaz bien estructurada</h3>
        <p>Es <strong>sencilla y completa</strong> (todas las operaciones necesarias y suficientes para especificar un servicio), <strong>comprensible</strong> (suficiente información sin tener que examinar sus antecedentes) y <strong>manejable</strong> (guía hacia sus propiedades clave sin sobrecarga de detalles).</p>

        <h2>Paquetes</h2>
        <p>Para visualizar, especificar, construir y documentar grandes sistemas hay que manejar muchísimas clases, interfaces, componentes, nodos y diagramas; a medida que el sistema crece, hay que organizarlos en bloques mayores.</p>
        ${def('Paquete', 'Mecanismo de propósito general para organizar elementos de modelado en grupos, que se pueden manipular como un todo.', 'Booch, cap. 12, págs. 173-185.')}
        ${fig(U.svg(520, 170, `
          <path d="M20 30H90L100 44H20Z" class="u-blk"/><rect x="20" y="44" width="150" height="70" rx="2" class="u-blk"/><text x="95" y="84" class="u-c u-sans u-b">Ventas</text>
          <path d="M240 18H330L340 34H240Z" class="u-blk k-a"/><text x="285" y="30" class="u-c u-sm">Dominio</text><rect x="240" y="34" width="260" height="120" rx="2" class="u-blk k-a"/>
          ${U.box(256, 54, 100, 'Venta', { h: 32 })}${U.box(380, 54, 100, 'Pago', { h: 32 })}${U.box(256, 106, 100, 'Producto', { h: 32 })}
          <text x="95" y="140" class="u-c u-sm">nombre en la carpeta</text><text x="370" y="168" class="u-c u-sm">nombre en la pestaña: Dominio::Venta</text>`, 'Dos paquetes: uno sin contenido con el nombre en la carpeta y otro con clases y el nombre en la pestaña'), 'Un paquete se dibuja como una carpeta con pestaña. Si no se muestra su contenido, el nombre va en la carpeta; si se muestra, en la pestaña. El nombre calificado usa dos puntos dobles: <code>Dominio::Venta</code>.')}
        <ul>
          <li>Se puede controlar la <strong>visibilidad</strong>: algunos elementos son visibles fuera del paquete y otros quedan ocultos.</li>
          <li>Los paquetes bien diseñados <strong>agrupan elementos semánticamente cercanos que suelen cambiar juntos</strong>.</li>
          <li>Cada paquete tiene un nombre simple o calificado (con <strong>::</strong> para separar los paquetes).</li>
          <li>Sirven para modelar las <strong>vistas de la arquitectura</strong>: se descompone el sistema en paquetes, cada uno con un conjunto de perspectivas significativas, y se colocan en ellos los diagramas de cada vista.</li>
        </ul>
        ${note('Separadores: el nombre calificado de un <strong>paquete</strong> usa dos puntos dobles (<code>::</code>); en el de una <strong>interfaz</strong> los dos puntos separan la interfaz del paquete, y por eso no pueden aparecer dentro del nombre.', 'warn')}
      `,
      quiz: [
        { q: '¿Qué diferencia a una interfaz de una clase?', o: ['La interfaz no especifica implementación: no lleva métodos', 'La interfaz siempre tiene atributos', 'La interfaz no puede tener operaciones', 'La interfaz no tiene nombre'], a: 0, e: 'Especifica operaciones (el contrato), no métodos.' },
        { q: '¿Cómo se dibuja una interfaz requerida en notación icónica?', o: ['Con un pequeño semicírculo unido a la clase', 'Con un pequeño círculo unido a la clase', 'Con una carpeta con pestaña', 'Con un rectángulo con dos pestañas'], a: 0, e: 'El círculo es la proporcionada; la carpeta es un paquete y el rectángulo con pestañas, un componente.' },
        { q: '¿Qué carácter NO puede aparecer en el nombre de una interfaz?', o: ['Los dos puntos', 'Los números', 'El guión bajo', 'Las mayúsculas'], a: 0, e: 'Los dos puntos separan el nombre de la interfaz y el del paquete que la contiene.' },
        { q: '¿Qué caracteriza a una interfaz bien estructurada?', o: ['Es sencilla y completa, comprensible y manejable', 'Tiene la mayor cantidad posible de operaciones', 'Incluye sus métodos de implementación', 'Depende de una sola clase'], a: 0, e: 'Debe tener las operaciones necesarias y suficientes, sin sobrecarga de detalles.' },
        { q: '¿Qué elementos deben agrupar los paquetes bien diseñados?', o: ['Elementos semánticamente cercanos que suelen cambiar juntos', 'Elementos elegidos al azar para equilibrar tamaños', 'Todas las clases del sistema', 'Solo interfaces'], a: 0, e: 'Así un cambio queda localizado en un paquete.' },
        { q: 'Si se muestra el contenido de un paquete, ¿dónde va su nombre?', o: ['En la pestaña', 'En la carpeta', 'Debajo del paquete', 'No se muestra'], a: 0, e: 'Si no se muestra el contenido, va en la carpeta.' },
        { q: 'En notación expandida, ¿cómo se une la clase que implementa una interfaz?', o: ['Con una realización', 'Con una asociación simple', 'Con una composición', 'Con una generalización continua'], a: 0, e: 'La clase que la usa se une con una dependencia de uso.' },
      ],
      sources: [{ title: 'El Lenguaje Unificado de Modelado, 2ª ed.', ref: 'Booch, Rumbaugh y Jacobson, caps. 11 y 12', points: ['Interfaces, tipos y roles: notación, nombres, operaciones, realización.', 'Paquetes: nombres, elementos, visibilidad y modelado de vistas.'] }],
    },

    {
      id: 'componentes-y-puertos',
      module: 'm6',
      title: 'Componentes, sustitución, puertos y estructura interna',
      keywords: 'componente reemplazable interfaces realización sustitución puerto parte multiplicidad conector delegación junta circular diagrama de componentes despliegue monolítico',
      tldr: 'Un <mark>componente</mark> es una parte lógica y <strong>reemplazable</strong> de un sistema que realiza un conjunto de interfaces. Las interfaces son el pegamento que los une, y por eso un componente se puede <strong>sustituir</strong> por otro compatible. Los <mark>puertos</mark> son ventanas con identidad por donde pasan todas sus interacciones, y su <strong>estructura interna</strong> está hecha de partes y conectores.',
      goals: ['Definir componente, interfaz y puerto.', 'Explicar la sustitución y cuándo un componente puede usarse en un contexto.', 'Dibujar un componente con puertos e interfaces.', 'Distinguir parte de clase y los tipos de conectores (directo, junta circular, delegación).'],
      body: `
        <h2>Componentes</h2>
        <p>Se puede construir una aplicación como una <strong>gran unidad monolítica</strong>, pero queda rígida, difícil de modificar y con partes no deseadas difíciles de eliminar. La solución es construir <strong>componentes bien definidos</strong>, que se enlacen con flexibilidad y se sustituyan cuando cambien los requisitos. Los buenos componentes definen abstracciones precisas con interfaces bien definidas.</p>
        ${table(['Término', 'Definición (Booch, cap. 15)'], [
          ['Interfaz', 'Colección de operaciones que especifican un servicio proporcionado o solicitado por una clase o componente.'],
          ['Componente', 'Parte reemplazable de un sistema que conforma y proporciona la implementación de un conjunto de interfaces.'],
          ['Puerto', 'Ventana específica en un componente encapsulado, que acepta mensajes hacia y desde el componente, conformes con las interfaces especificadas.'],
        ])}
        <p>Larman lo define como una parte <strong>modular, desplegable y reemplazable</strong> que encapsula la implementación y expone interfaces; en UML aparecen también en los <strong>diagramas de despliegue</strong>.</p>
        <p>La relación componente-interfaz es clave: <strong>las interfaces son el pegamento que une a los componentes</strong>. Se descompone el sistema especificando interfaces que representan sus líneas de separación; luego se proporcionan componentes que las realizan y otros que acceden a sus servicios. Así el sistema tiene servicios <strong>independientes de la localización y sustituibles</strong>.</p>
        <ul>
          <li>Se dibuja como un rectángulo con un pequeño ícono de <strong>dos pestañas</strong> en la esquina superior derecha; puede tener atributos y métodos, que suelen ocultarse.</li>
          <li>La relación con sus interfaces se muestra en <strong>formato icónico</strong> (círculo = proporcionada, semicírculo = requerida, con el nombre al lado) o <strong>expandido</strong> (con las operaciones: realización para quien la implementa y uso para quien la consume).</li>
          <li>Una interfaz puede ser proporcionada por un componente y requerida por otro. Un componente que usa una interfaz funciona bien <strong>sin importar qué componente la realice</strong>.</li>
          <li>Un componente puede usarse en un contexto <strong>solo si todas sus interfaces requeridas</strong> están proporcionadas por otros componentes.</li>
        </ul>

        <h2>Sustitución</h2>
        <p>El objetivo básico de un sistema basado en componentes es <strong>ensamblarlo con artefactos reemplazables</strong>: el sistema evoluciona agregando componentes y sustituyendo los viejos <strong>sin reconstruirse</strong>. Un componente es reemplazable si se lo puede cambiar por otro que conforme las mismas interfaces, de forma transparente para el usuario. También se extiende el sistema haciendo que los componentes ofrezcan nuevos servicios por nuevas interfaces. La definición es <strong>recursiva</strong>: un sistema puede ser un componente a un nivel de abstracción más alto.</p>

        <h2>Puertos</h2>
        <p>Las interfaces declaran el comportamiento global; la implementación asegura que todas las operaciones de las interfaces proporcionadas se implementen; los <strong>puertos</strong> permiten controlar esa implementación. Un puerto es una ventana explícita: <strong>todas las interacciones del componente pasan por puertos</strong>.</p>
        ${puertos}
        <ul>
          <li>Tiene <strong>identidad</strong> y un <strong>nombre</strong>; nombre del componente + nombre del puerto lo identifican de manera única.</li>
          <li>Puede soportar <strong>varias interfaces</strong> proporcionadas o requeridas. Se dibuja como un pequeño cuadrado en el borde (“agujero”).</li>
          <li>Se crean y destruyen junto con la instancia del componente, y pueden tener <strong>multiplicidad</strong> (cuántas instancias del puerto hay en una instancia del componente).</li>
        </ul>
        <p>En el Vendedor de Entradas, el puerto de tarjetas de crédito tiene una interfaz <strong>requerida</strong>: cualquier componente que provea esos servicios la satisface. Por Cargar espectáculos un teatro carga funciones; por Reservar, el componente consulta a los teatros la disponibilidad de plazas.</p>

        <h2>Estructura interna</h2>
        <p>Un componente puede ser una sola pieza de código, pero es mejor construirlo como una <strong>amalgama de componentes menores</strong>. Su estructura interna son las <strong>partes</strong> que componen su implementación y las conexiones entre ellas.</p>
        <ul>
          <li>Una <strong>parte</strong> es una unidad de implementación del componente, con nombre, tipo y multiplicidad. <strong>Una parte no es lo mismo que una clase</strong>: puede haber varias partes del mismo tipo, distinguidas por su nombre, que cumplen funciones distintas (en Venta de Billetes: ventas para pasajeros frecuentes y para clientes normales, del mismo tipo; AsignaciónDeAsiento y GestiónDeInventario no necesitan nombre porque hay una de cada tipo).</li>
          <li>Dos componentes pueden conectarse si uno proporciona una interfaz que el otro requiere: el puerto que requiere invoca al que proporciona. Si las interfaces son compatibles, <strong>no hace falta saber nada más</strong>, y el componente se puede reconectar con otro que ofrezca la misma interfaz.</li>
          <li>El enlace entre dos puertos es un <strong>conector</strong>.</li>
        </ul>
        ${interna}
        ${table(['Conector', 'Notación', 'Significado'], [
          ['Directo (explícito)', 'Línea entre los componentes o sus puertos.', 'Enlace explícito; si no muestra interfaz, la conexión está <strong>fuertemente acoplada</strong>.'],
          ['Por interfaces compatibles', '<strong>Junta circular</strong> (círculo encajado en semicírculo).', 'No hay relación inherente entre ambos: la salida podría ir a cualquier componente que cumpla la interfaz.'],
          ['De delegación', 'Flecha del puerto externo al interno.', 'Los mensajes que llegan al puerto externo se delegan al puerto interno de una parte.'],
        ])}
        ${note('El diagrama de componentes muestra la estructura y los caminos de los mensajes, pero <strong>no la secuencia</strong> en que ocurren: para eso están los diagramas de interacción o colaboración (Unidad V).', 'tip')}
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: 'Notación de componentes',
        buckets: ['Componente', 'Interfaz proporcionada', 'Interfaz requerida', 'Puerto', 'Paquete'],
        items: [
          { t: 'Rectángulo con un ícono de dos pestañas en la esquina.', b: 0 },
          { t: 'Pequeño círculo unido por una línea.', b: 1 },
          { t: 'Pequeño semicírculo unido por una línea.', b: 2 },
          { t: 'Pequeño cuadrado en el borde de un componente.', b: 3 },
          { t: 'Carpeta con pestaña.', b: 4 },
          { t: 'Servicio que el componente necesita obtener de otro.', b: 2 },
          { t: 'Ventana con identidad por la que pasan todas las interacciones.', b: 3 },
        ],
      }],
      quiz: [
        { q: '¿Qué es un componente según Booch?', o: ['Una parte reemplazable que realiza un conjunto de interfaces', 'Una clase grande con muchos métodos públicos y atributos', 'Un paquete que agrupa clases relacionadas del dominio', 'Un nodo físico de la red donde se despliega el software'], a: 0, e: 'Para Larman: modular, desplegable y reemplazable, que encapsula la implementación y expone interfaces.' },
        { q: '¿Cuándo puede usarse un componente en un contexto determinado?', o: ['Solo si todas sus interfaces requeridas están proporcionadas por otros componentes', 'Siempre que tenga al menos una interfaz proporcionada', 'Cuando tiene puertos', 'Cuando es monolítico'], a: 0, e: 'Si le falta algún servicio requerido, no puede funcionar.' },
        { q: '¿Qué permite sustituir un componente por otro sin reconstruir el sistema?', o: ['Que el nuevo conforme las mismas interfaces', 'Que tenga el mismo nombre', 'Que tenga la misma estructura interna', 'Que esté en el mismo paquete'], a: 0, e: 'Las interfaces son la clave de la sustitución.' },
        { q: '¿Qué afirmación sobre los puertos es correcta?', o: ['Todas las interacciones pasan por ellos y tienen identidad', 'Un puerto solo puede admitir una única interfaz proporcionada', 'Los puertos sobreviven a la destrucción de la instancia del componente', 'Los puertos no tienen nombre: se identifican por su posición en el borde'], a: 0, e: 'Pueden soportar varias interfaces y se crean y destruyen con el componente.' },
        { q: '¿Una parte es lo mismo que una clase?', o: ['No: puede haber varias del mismo tipo, con nombres y roles distintos', 'Sí: en UML parte y clase son sinónimos dentro de un componente', 'Sí, pero solo cuando el componente es compuesto y tiene puertos', 'No: una parte no tiene tipo, solo nombre y multiplicidad'], a: 0, e: 'Una parte tiene nombre, tipo y multiplicidad.' },
        { q: '¿Qué indica un conector de delegación?', o: ['Que los mensajes que llegan a un puerto externo se delegan a un puerto interno', 'Que dos componentes tienen interfaces compatibles', 'Que la conexión está fuertemente acoplada', 'Que un componente hereda de otro'], a: 0, e: 'Se dibuja con una flecha entre el puerto externo y el interno.' },
        { q: 'Un conector directo que no muestra interfaz indica que la conexión...', o: ['Está fuertemente acoplada', 'Es de delegación', 'Es reemplazable', 'Es opcional'], a: 0, e: 'Es el caso de GestiónDePedidos con Inventario.' },
        { q: '¿Qué NO muestra un diagrama de componentes?', o: ['La secuencia de los mensajes', 'La estructura del componente', 'Los caminos de los mensajes', 'Las interfaces y puertos'], a: 0, e: 'La secuencia se ve en los diagramas de interacción o colaboración.' },
      ],
      sources: [
        { title: 'El Lenguaje Unificado de Modelado, 2ª ed.', ref: 'Booch, Rumbaugh y Jacobson, cap. 15, págs. 207-218', points: ['Componentes, interfaces y realización; sustitución; puertos; estructura interna, partes y conectores.'] },
        { title: 'UML y Patrones, 2ª ed.', ref: 'Larman, cap. 38, págs. 565-569', points: ['Diagramas de despliegue y de componentes.'] },
      ],
    },
  );
})();
