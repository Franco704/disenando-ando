/* Unidad V, clases 19 y 20: elaboración de diagramas de colaboración, visibilidad y diagramas de clases de diseño. Diapositivas 19 y 20, Larman 2ª ed. caps. 17, 18 y 19 (ejemplo del centro de alquiler de esquí de la cátedra). */
(() => {
  const { LESSONS, h } = window.GUIDE;
  const { note, def, table, fig, lab, uml: U } = h;

  // Los 4 diagramas del caso de uso Alquilar Artículo, en un solo laboratorio paso a paso
  const esqui = U.svg(640, 420, `
    <text x="10" y="16" class="u-sans u-b" data-s="1">introducirSocio(codSocio)</text>
    <g data-s="1">${U.msg(10, 42, 62, 42, '', {})}${U.obj(70, 30, 80, ':Caja', { cls: 'k-a' })}${U.ln([[150, 43], [250, 43]])}${U.msg(160, 32, 240, 32, '1: s := buscar(cod)', { ly: 26 })}<rect x="258" y="24" width="90" height="26" rx="2" class="u-hd"/><rect x="250" y="30" width="90" height="26" rx="2" class="u-hd"/><text x="295" y="47" class="u-c u-tt u-un">:Socio</text></g>
    <g data-s="2">${U.ln([[110, 56], [110, 96]])}${U.msg(122, 60, 122, 92, '2: crearAlquiler()', { anchor: 'start', lx: 128, ly: 80 })}${U.obj(70, 96, 80, 's:Socio')}</g>
    <g data-s="3">${U.ln([[150, 109], [250, 109]])}${U.msg(160, 98, 240, 98, '2.1: create()', { ly: 92 })}${U.obj(250, 96, 90, ':Alquiler', { cls: 'k-ok' })}${U.ln([[340, 109], [420, 109]])}${U.msg(350, 98, 410, 98, '2.2: create()', { ly: 92 })}<rect x="428" y="90" width="160" height="26" rx="2" class="u-hd"/><rect x="420" y="96" width="160" height="26" rx="2" class="u-hd"/><text x="500" y="113" class="u-c u-tt u-un">:AlquilerLineaDeProducto</text></g>
    <text x="10" y="160" class="u-sans u-b" data-s="4">introducirProducto(cod)</text>
    <g data-s="4">${U.obj(70, 172, 80, ':Caja', { cls: 'k-a' })}${U.ln([[150, 185], [250, 185]])}${U.msg(160, 174, 240, 174, '1: p := buscarProd(cod)', { ly: 168 })}${U.obj(250, 172, 80, ':Tienda')}${U.ln([[330, 185], [420, 185]])}${U.msg(338, 174, 412, 174, '1.1: p := encontrar(cod)', { ly: 168 })}<rect x="428" y="166" width="90" height="26" rx="2" class="u-hd"/><rect x="420" y="172" width="90" height="26" rx="2" class="u-hd"/><text x="465" y="189" class="u-c u-tt u-un">:Producto</text></g>
    <g data-s="5">${U.ln([[290, 198], [290, 236]])}${U.msg(302, 202, 302, 232, '1.2: seAlquila()', { anchor: 'start', lx: 308, ly: 222 })}${U.obj(250, 236, 80, 'p:Producto')}</g>
    <g data-s="6">${U.ln([[110, 198], [110, 236]])}${U.msg(122, 202, 122, 232, '2: crearLinea(p)', { anchor: 'start', lx: 128, ly: 222 })}${U.obj(60, 236, 90, ':Alquiler')}${U.ln([[105, 262], [105, 290]])}<text x="112" y="282" class="u-msgt">2.1: l := create(p)</text>${U.obj(40, 290, 140, ':AlquilerLineaDeP…', { cls: 'k-ok' })}${U.ln([[150, 249], [200, 249], [200, 300], [420, 300]])}<text x="310" y="294" class="u-msgt u-c">2.2: agregar(l)</text><rect x="428" y="282" width="160" height="26" rx="2" class="u-hd"/><rect x="420" y="288" width="160" height="26" rx="2" class="u-hd"/><text x="500" y="305" class="u-c u-tt u-un">:AlquilerLineaDeProducto</text></g>
    <text x="10" y="346" class="u-sans u-b" data-s="7">terminarAlquiler()  ·  efectuarPago(efecOfrecido)</text>
    <g data-s="7">${U.obj(70, 360, 80, ':Caja', { cls: 'k-a' })}${U.ln([[150, 373], [250, 373]])}${U.msg(160, 362, 240, 362, '1: seTermina()', { ly: 356 })}${U.obj(250, 360, 90, ':Alquiler')}</g>
    <g data-s="8">${U.msg(160, 398, 240, 398, '1: efectuarPago(e)', { ly: 412 })}${U.ln([[340, 373], [440, 373]])}${U.msg(350, 362, 430, 362, '1.1: create(e)', { ly: 356 })}${U.obj(440, 360, 80, ':Pago', { cls: 'k-ok' })}</g>`,
    'Los cuatro diagramas de colaboración del caso de uso Alquilar Artículo');

  const visibilidades = fig(U.svg(620, 230, `
    ${[['Atributo', 'B es un atributo de A', 'permanente', 'la más común', '«association»'], ['Parámetro', 'B es parámetro de un método de A', 'temporal', '2ª más común', '«parameter»'], ['Local', 'B es un objeto local de un método de A', 'temporal', '3ª más común', '«local»'], ['Global', 'B es visible globalmente', 'permanente', 'la menos frecuente', '«global»']].map(([t, d, p, f, st], i) => `${U.blk(6 + i * 154, 10, 146, 210, '', { cls: i === 0 ? 'k-a' : '' })}<text x="${79 + i * 154}" y="34" class="u-c u-sans u-b">${t}</text><text x="${79 + i * 154}" y="60" class="u-c u-sm">${d.length > 24 ? d.slice(0, d.indexOf(' ', 18)) : d}</text><text x="${79 + i * 154}" y="74" class="u-c u-sm">${d.length > 24 ? d.slice(d.indexOf(' ', 18) + 1) : ''}</text><text x="${79 + i * 154}" y="110" class="u-c u-sans">${p}</text><text x="${79 + i * 154}" y="134" class="u-c u-sm">${f}</text><text x="${79 + i * 154}" y="180" class="u-c t-a">${st}</text><text x="${79 + i * 154}" y="200" class="u-c u-sm">${i === 0 ? 'asociación + navegabilidad' : 'dependencia punteada'}</text>`).join('')}`,
    'Comparación de las cuatro formas de visibilidad'),
    'Las 4 formas de visibilidad de A hacia B, con su duración, frecuencia, estereotipo en el diagrama de colaboración y cómo se dibujan en el DCD.');

  const dcd = fig(U.svg(700, 370, `
    ${U.box(10, 20, 160, 'Caja', { ops: ['introducirProducto()', 'terminarVenta()', 'efectuarPago()'], cls: 'k-a' })}
    ${U.box(250, 20, 220, 'Venta', { attrs: ['fecha : Fecha', 'estaTerminada : Booleano', 'hora : Hora'], ops: ['seTermina()', 'hacerLineaDeProducto(e, c)', 'efectuarPago(e)', 'total() : Cantidad'] })}
    ${U.box(550, 20, 140, 'Pago', { attrs: ['monto : Cantidad'] })}
    ${U.box(250, 250, 220, 'VentaLineaDeProducto', { attrs: ['cantidad : Entero'], ops: ['subtotal() : Cantidad'] })}
    ${U.box(530, 240, 160, 'EspecificacionDeProd', { attrs: ['descripcion', 'precio', 'CUP'] })}
    ${U.box(10, 250, 170, 'CatalogoDeProductos', { ops: ['especificacion()'] })}
    ${U.ln([[170, 50], [250, 50]], { end: 'op' })}<text x="210" y="42" class="u-c u-sm">captura</text><text x="176" y="64" class="u-sm">1</text><text x="244" y="64" class="u-sm u-e">1</text>
    ${U.ln([[470, 50], [550, 50]], { end: 'op' })}<text x="510" y="42" class="u-c u-sm">pagada-por</text>
    ${U.ln([[360, 174], [360, 250]], { end: 'op' })}<text x="367" y="244" class="u-sm">contiene 1..*</text>
    ${U.ln([[470, 280], [530, 280]], { end: 'op' })}<text x="500" y="272" class="u-c u-sm">describe</text>
    ${U.ln([[90, 102], [90, 250]], { end: 'op' })}<text x="97" y="170" class="u-sm">mira-en</text>
    ${U.ln([[95, 298], [95, 350], [610, 350], [610, 322]], { end: 'op' })}<text x="350" y="344" class="u-c u-sm">contiene *</text>
    ${U.ln([[170, 80], [210, 80], [210, 212], [610, 212], [610, 240]], { end: 'op', dash: true, cls: 's-x' })}<text x="500" y="206" class="u-c u-sm t-x">dependencia (visibilidad local)</text>`,
    'Diagrama de clases de diseño del punto de venta con atributos tipados, métodos, asociaciones navegables y una dependencia'),
    'DCD del punto de venta (adaptado de las diapositivas). Asociaciones con <strong>flecha de navegabilidad</strong> = visibilidad de atributo; la línea <strong>punteada</strong> de Caja a EspecificacionDeProd es una dependencia (visibilidad local, para la devolución de un ítem).');

  LESSONS.push(
    {
      id: 'elaborar-diagramas-de-colaboracion',
      module: 'm16',
      title: 'Elaboración de diagramas de colaboración: el alquiler de esquí',
      keywords: 'elaborar diagramas de colaboración operación del sistema contrato postcondiciones creación eliminación instancias modificación atributos asociaciones formadas modelo conceptual caso de estudio alquiler de esquí introducirSocio introducirProducto terminarAlquiler efectuarPago Caja controlador Socio Alquiler AlquilerLineadeProducto Tienda Producto multiobjeto',
      tldr: 'Asignar responsabilidades y hacer los diagramas de interacción es <mark>el paso más importante del diseño</mark>. Receta: <strong>un diagrama por operación del sistema</strong>, cuyo mensaje inicial es el evento; con los <strong>contratos</strong> (postcondiciones) y el <strong>modelo conceptual</strong> como punto de partida, aplicar GRASP a cada decisión. Se ve completo con el alquiler de esquí.',
      goals: ['Aplicar los 3 pasos para elaborar diagramas de interacción.', 'Relacionar casos de uso, DSS, contratos, modelo conceptual y diagramas.', 'Derivar responsabilidades de los 3 tipos de postcondiciones.', 'Resolver los 4 diagramas de Alquilar Artículo justificando cada mensaje con GRASP.'],
      body: `
        <h2>Cómo elaborar diagramas de interacción</h2>
        <ol>
          <li><strong>Prepare un diagrama individual para cada operación del sistema</strong>: por cada evento, un diagrama que lo tenga como mensaje inicial.</li>
          <li>Si el diagrama se vuelve complejo, <strong>divídalo</strong> en otros más pequeños.</li>
          <li>Con las <strong>responsabilidades y postcondiciones de los contratos</strong> y el <strong>modelo conceptual</strong> como punto de partida, diseñe un sistema de objetos que interactúan para realizar las tareas, <strong>aplicando GRASP</strong>.</li>
        </ol>
        <h3>Relación entre los artefactos</h3>
        <ul>
          <li>Los <strong>casos de uso</strong> indican los eventos del sistema, que se muestran en los <strong>diagramas de secuencia del sistema</strong>.</li>
          <li>Los efectos de los eventos se describen en los <strong>contratos</strong>.</li>
          <li>Los eventos pasan a ser los <strong>mensajes iniciadores</strong> de los diagramas de colaboración.</li>
          <li>Los objetos que interactúan pueden venir del <strong>modelo conceptual</strong> y del diagrama de clases (que tiene prioridad); también se descubren objetos nuevos durante el diseño.</li>
        </ul>
        <h3>Contratos y postcondiciones</h3>
        <p>Cada operación tiene su contrato, y el diagrama de colaboración debe cumplir sus postcondiciones. Al elaborarlas se consideran tres tipos: <strong>creación y eliminación de instancias</strong>, <strong>modificación de atributos</strong> y <strong>asociaciones formadas y canceladas</strong>. Las postcondiciones son una <strong>estimación</strong>: una excelente conjetura inicial, quizás no exacta; algunas sobrarán y aparecerán tareas no descubiertas. Si se omitieron los contratos, igual se hacen los diagramas, volviendo a los casos de uso y pensando qué cambia cada operación; los contratos ayudan porque organizan la información y llevan la investigación al análisis.</p>
        ${note('Regla para elegir el patrón ante cada postcondición: <strong>creación → Creador</strong>; <strong>buscar, consultar o modificar un atributo → Experto</strong>; <strong>recibir el evento → Controlador</strong>. Ante varios candidatos, desempatan <strong>Bajo Acoplamiento y Alta Cohesión</strong>. El Experto es el primero a considerar salvo en problemas de controlador o de creación.', 'exam')}

        <h2>Caso de estudio: centro de alquiler de esquí</h2>
        <p>Una tienda de un centro invernal alquila ropa y artículos de esquí a sus socios. Caso de uso <strong>Alquilar Artículo</strong>, con 4 eventos del sistema: <code>introducirSocio</code>, <code>introducirArtículo</code> (introducirProducto), <code>terminarAlquiler</code> y <code>efectuarPago</code>. Habrá <strong>4 diagramas</strong>. Por Controlador hay dos opciones: <strong>Caja</strong> (controlador de fachada: no es una terminal real sino una abstracción del “sistema de caja” en el territorio del software) o <strong>ManejadorDeAlquiler</strong> (controlador de caso de uso). Se elige Caja para todos.</p>
        ${lab(0)}
        ${table(['Evento', 'Postcondición', 'Decisión y patrón'], [
          ['introducirSocio', 'Se creó una instancia de Alquiler (creación).', 'Caja registra el alquiler y sería candidata (Creador), pero se perdería la asociación con el Socio: crea el <strong>Socio</strong> (Creador: lo usa estrechamente y queda asociado). Caja sigue como Controlador.'],
          ['', 'Se asoció el Alquiler con el Socio (asociación formada).', 'Queda formada al crearlo el Socio. Al crear el Alquiler se crea además la <strong>colección vacía</strong> (multiobjeto) de AlquilerLineadeProducto.'],
          ['introducirProducto', 'Se creó una AlquilerLineadeProducto.', 'El <strong>Alquiler</strong> la contiene: Creador. Al crearla queda asociada al Alquiler.'],
          ['', 'Se asoció la línea con el Producto según el código.', 'Hay que recuperar el Producto: no es creación ni controlador, entonces <strong>Experto</strong>: la <strong>Tienda</strong> contiene todos los Productos.'],
          ['', 'Se asignó Verdadero a Producto.estado.', '<strong>Experto</strong>: el propio Producto tiene el atributo; Tienda le envía <code>seAlquila</code>.'],
          ['terminarAlquiler', 'Alquiler.fecha := FechaActual y Alquiler.hora := HoraActual.', '<strong>Experto</strong>: el Alquiler tiene fecha y hora; Caja le envía <code>seTermina</code>.'],
          ['efectuarPago', 'Se creó un Pago.', 'Candidatos: Caja (registra el pago) y Alquiler (ligado a su pago). Desempatan <strong>Bajo Acoplamiento y Alta Cohesión</strong>: lo crea el <strong>Alquiler</strong>, Caja queda más liviana y no necesita conocer el Pago.'],
        ])}
        <h3>Mensajes a multiobjetos</h3>
        <p>Un mensaje a un multiobjeto se envía a la <strong>colección</strong>, no a cada elemento (salvo que se marque iteración). En introducirSocio, el <code>create</code> enviado al multiobjeto AlquilerLineadeProducto <strong>genera la estructura de datos colección</strong>; no crea una instancia de AlquilerLineadeProducto. En introducirProducto, <code>encontrar</code> (1.1) se envía al multiobjeto Producto y <code>agregar</code> (2.2) al multiobjeto AlquilerLineadeProducto, para incorporar un elemento.</p>
        <pre class="code" data-lang="java">seTermina() {
   fecha := FechaActual
   hora  := HoraActual
}</pre>
      `,
      labs: [{ type: 'steps', title: 'Los 4 diagramas de Alquilar Artículo', intro: 'Antes de cada paso, decidí qué patrón GRASP justifica el mensaje.', fig: esqui, steps: [
        { k: 'introducirSocio · Controlador', t: 'El evento llega a <strong>:Caja</strong> (Controlador de fachada). Caja busca el socio en la colección de socios: <code>1: s := buscar(cod)</code> (Experto: la colección conoce a los socios).' },
        { k: 'introducirSocio · Creador', t: 'Caja le pide al socio <code>2: crearAlquiler()</code>. ¿Por qué el Socio y no la Caja? Porque así el Alquiler queda <strong>asociado al Socio</strong> (Creador: lo usa estrechamente).' },
        { k: 'introducirSocio · colección vacía', t: 'El Socio crea el Alquiler (<code>2.1: create()</code>) y el Alquiler crea la <strong>colección vacía</strong> de líneas (<code>2.2: create()</code> al multiobjeto): crea la estructura, no una línea.' },
        { k: 'introducirProducto · Experto', t: 'Caja (Controlador) pide el producto a la <strong>Tienda</strong>, que contiene todos los productos (Experto): <code>1: p := buscarProd(cod)</code>, y la Tienda busca en su multiobjeto: <code>1.1: p := encontrar(cod)</code>.' },
        { k: 'introducirProducto · modificar atributo', t: 'La Tienda envía <code>1.2: seAlquila()</code> al Producto: el Producto tiene el atributo estado (Experto) y queda “alquilado”, no disponible para otro alquiler.' },
        { k: 'introducirProducto · Creador', t: 'Caja envía <code>2: crearLinea(p)</code> al Alquiler, que <strong>contiene</strong> las líneas (Creador): la crea (<code>2.1</code>) asociada al producto y la agrega a su colección (<code>2.2: agregar(l)</code>).' },
        { k: 'terminarAlquiler · Experto', t: 'Caja envía <code>1: seTermina()</code> al Alquiler, que tiene los atributos fecha y hora (Experto) y les asigna la fecha y hora actuales.' },
        { k: 'efectuarPago · Creador + Bajo Acoplamiento', t: 'Caja delega <code>1: efectuarPago(e)</code> en el Alquiler, que crea el Pago (<code>1.1: create(e)</code>). Caja también era candidata, pero así queda más cohesiva y desacoplada del Pago.' },
      ] }],
      exercises: [
        { title: 'Biblioteca: prestarLibro', level: 2, prompt: '<p>En una biblioteca, el caso de uso <strong>Prestar Libro</strong> tiene los eventos <code>introducirLector(nroCarnet)</code>, <code>introducirEjemplar(codigo)</code> y <code>terminarPrestamo()</code>. Postcondiciones de <code>introducirEjemplar</code>: se creó una LineaDePrestamo; se asoció al Préstamo en curso; se asoció con el Ejemplar según el código; se asignó <em>prestado</em> a Ejemplar.estado. Modelo conceptual: Biblioteca contiene Ejemplares y Lectores; Lector realiza Préstamos; Préstamo contiene LineasDePrestamo; cada LineaDePrestamo refiere a un Ejemplar. Diseñá el diagrama de colaboración de <code>introducirEjemplar</code> justificando cada mensaje con GRASP.</p>', hints: ['Elegí un controlador para todo el caso de uso.', 'Buscar el ejemplar no es creación: ¿quién conoce todos los ejemplares?', 'Cambiar el estado: ¿quién tiene el atributo?'], solution: { explain: `<p><strong>Controlador</strong>: <code>:Biblioteca</code> (controlador de fachada) o <code>PrestarLibroManejador</code> (de caso de uso). Con Biblioteca:</p>
          <ol><li><code>introducirEjemplar(codigo)</code> → <code>:Biblioteca</code> (Controlador).</li>
          <li><code>1: e := buscarEjemplar(codigo)</code> → al multiobjeto <code>:Ejemplar</code> de la Biblioteca (Experto: la Biblioteca contiene todos los ejemplares).</li>
          <li><code>2: marcarPrestado()</code> → <code>e:Ejemplar</code> (Experto: tiene el atributo estado).</li>
          <li><code>3: crearLinea(e)</code> → <code>:Prestamo</code> en curso (Creador: el Préstamo contiene las líneas). La Biblioteca tiene visibilidad de atributo del préstamo en curso, que guardó en introducirLector.</li>
          <li><code>3.1: l := create(e)</code> → <code>:LineaDePrestamo</code> (queda asociada al Ejemplar por el parámetro).</li>
          <li><code>3.2: agregar(l)</code> → multiobjeto <code>:LineaDePrestamo</code> del Préstamo (asociación formada).</li></ol>
          <p>Se cumplen las 4 postcondiciones: creación (3.1), dos asociaciones (3.1 y 3.2) y modificación de atributo (2). Variante válida: que la línea, al crearse, sea la que envía <code>marcarPrestado</code> al ejemplar.</p>` } },
        { title: '¿Quién crea el Pago? Justificá', level: 2, prompt: '<p>En el caso del esquí, un compañero propone que la <strong>Caja</strong> cree el Pago “porque la caja registra los pagos en el mundo real” y luego se lo pase al Alquiler. Evaluá la propuesta con GRASP y decidí.</p>', solution: { explain: '<p>La propuesta aplica <strong>Creador</strong> (la Caja registra pagos) y no es incorrecta en sí, pero hay otro candidato: el <strong>Alquiler</strong>, estrechamente ligado a su Pago. Con dos candidatos válidos se aplican los principios evaluativos: si crea la Caja, se agrega acoplamiento Caja–Pago (la Caja necesita conocer el Pago) y la Caja va perdiendo cohesión al hacer más trabajo. Si crea el Alquiler, la Caja solo delega <code>efectuarPago</code> y no necesita saber que existe el Pago. Por <strong>Bajo Acoplamiento y Alta Cohesión</strong> se elige el Alquiler. Es el mismo razonamiento que Registro/Venta/Pago en Larman.</p>' } },
      ],
      quiz: [
        { q: '¿Cuántos diagramas de colaboración se hacen por caso de uso?', o: ['Uno por cada operación (evento) del sistema', 'Uno por caso de uso', 'Uno por clase', 'Uno por contrato y otro por postcondición'], a: 0, e: 'El mensaje inicial de cada diagrama es su evento.' },
        { q: '¿Cuáles son los tres tipos de postcondiciones?', o: ['Instancias creadas o eliminadas, atributos modificados y asociaciones', 'Entrada de datos, proceso de los datos y salida de los resultados', 'Precondiciones, invariantes del sistema y excepciones posibles', 'Requisitos funcionales, no funcionales y restricciones legales'], a: 0, e: 'Cada una se traduce en responsabilidades.' },
        { q: '¿Por qué en introducirSocio el Alquiler lo crea el Socio y no la Caja?', o: ['Porque así el Alquiler queda asociado al Socio', 'Porque la Caja no puede crear objetos', 'Porque el Socio es el controlador', 'Porque lo dice el Experto'], a: 0, e: 'Caja sería candidata, pero se perdería la asociación con el Socio.' },
        { q: '¿Qué crea el mensaje create enviado al multiobjeto AlquilerLineadeProducto en introducirSocio?', o: ['La colección vacía, no una línea', 'Una línea de producto', 'Un alquiler', 'Un producto'], a: 0, e: 'Las líneas se crean después, en introducirProducto.' },
        { q: 'En introducirProducto, ¿quién busca el Producto según el código y por qué patrón?', o: ['La Tienda, por Experto', 'La Caja, por Controlador', 'El Alquiler, por Creador', 'El Socio, por Experto'], a: 0, e: 'No es creación ni controlador, entonces Experto.' },
        { q: '¿Quién asigna Verdadero a Producto.estado?', o: ['El Producto (Experto)', 'La Caja (Controlador)', 'El Alquiler (Creador)', 'La Tienda (Creador)'], a: 0, e: 'La Tienda le envía seAlquila.' },
        { q: '¿Por qué el Pago lo crea el Alquiler y no la Caja?', o: ['Bajo Acoplamiento y Alta Cohesión', 'Porque la Caja no registra los pagos', 'Porque lo exige el contrato de la operación', 'Por el patrón Controlador'], a: 0, e: 'Ambos eran candidatos según Creador.' },
        { q: '¿Las postcondiciones de los contratos son exactas?', o: ['No: son una buena estimación inicial', 'Sí, siempre: por eso se escriben antes', 'Sí, si las aprueba formalmente el cliente', 'Solo las de creación de instancias'], a: 0, e: 'Los contratos son un punto de partida.' },
        { q: '¿Qué patrón conviene considerar primero, salvo para problemas de controlador o de creación?', o: ['Experto', 'Creador', 'Polimorfismo', 'Fabricación Pura'], a: 0, e: 'Lo dicen las diapositivas al resolver terminarAlquiler.' },
      ],
      sources: [{ title: 'UML y Patrones, 2ª ed.', ref: 'Larman, cap. 17, págs. 231-260', points: ['Realización de casos de uso con diagramas de interacción.'] }, { title: 'Diapositivas de la clase 19', ref: 'Cátedra DSI', points: ['Caso de estudio del centro de alquiler de esquí: los cuatro diagramas.'] }],
    },

    {
      id: 'visibilidad',
      module: 'm16',
      title: 'Visibilidad',
      keywords: 'visibilidad referencia objeto emisor receptor atributo parámetro local global permanente temporal association parameter local global estereotipo frecuencia',
      tldr: '<mark>Visibilidad</mark> es la capacidad de un objeto de ver o tener una referencia a otro: <strong>para que A envíe un mensaje a B, B debe ser visible para A</strong>. Hay 4 formas: de <strong>atributo</strong> (permanente, la más común), de <strong>parámetro</strong> (temporal), <strong>local</strong> (temporal) y <strong>global</strong> (permanente, la menos frecuente).',
      goals: ['Definir visibilidad y por qué importa al diseñar interacciones.', 'Describir las 4 formas, su duración y frecuencia.', 'Marcar la visibilidad en un diagrama de colaboración.'],
      body: `
        <h2>Qué es la visibilidad</h2>
        ${def('Visibilidad', 'Capacidad de un objeto de “ver” o tener una referencia a otro objeto.', 'Larman, cap. 18, págs. 261-266.')}
        <p>Para que un objeto emisor envíe un mensaje a un receptor, el receptor debe ser <strong>visible</strong> al emisor: este debe tener algún tipo de referencia o apuntador a él. Al diseñar objetos que interactúan hay que asegurar la visibilidad necesaria para cada mensaje. Si Caja envía <code>Captura</code> a Venta, Venta es de alguna manera visible a Caja: la solución usual es que Caja tenga un atributo que referencie a la Venta.</p>
        ${visibilidades}
        ${table(['Visibilidad de A hacia B', 'Cuándo existe', 'Ejemplo'], [
          ['De <strong>atributo</strong>', 'B es un atributo de A. Relativamente <strong>permanente</strong>: dura mientras existan A y B. Es <strong>muy común</strong>.', 'Caja tiene un atributo que referencia a la Venta en curso.'],
          ['De <strong>parámetro</strong>', 'B se pasa como parámetro a un método de A. Relativamente <strong>temporal</strong>: solo dentro del método. Es la <strong>segunda</strong> más común.', 'TPDV envía <code>hacerLineaDeProducto(vlp)</code> a Venta: dentro de ese método, Venta ve la VentaLineaDeProducto.'],
          ['<strong>Local</strong> (declarada localmente)', 'B es un objeto local (no parámetro) de un método de A: se crea una instancia y se asigna a una variable local, o se asigna a una local el objeto devuelto por un mensaje. <strong>Temporal</strong>; la <strong>tercera</strong> más usada.', '<code>espec := catalogo.getEspecificacion(id)</code> dentro de un método de Caja.'],
          ['<strong>Global</strong>', 'B es de algún modo global para A. Relativamente <strong>permanente</strong>; es la <strong>menos frecuente</strong>.', 'Asignar una instancia a una variable global (la forma más obvia y menos conveniente) o, mejor, el patrón Singleton.'],
        ])}
        <h3>Notación</h3>
        <p>En el diagrama de colaboración se puede indicar el tipo de visibilidad con un estereotipo en el enlace: <code>«association»</code> (atributo), <code>«parameter»</code>, <code>«local»</code> y <code>«global»</code>.</p>
        ${note('Conexión directa con el DCD: la visibilidad de <strong>atributo</strong> se dibuja como una <strong>asociación con flecha de navegabilidad</strong>; las de parámetro, local y global, como <strong>dependencias</strong> (línea punteada con flecha).', 'exam')}
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿Qué tipo de visibilidad tiene A hacia B?',
        buckets: ['Atributo', 'Parámetro', 'Local', 'Global'],
        items: [
          { t: 'class Caja { private Venta venta; } — Caja hacia Venta.', b: 0 },
          { t: 'Venta.agregar(LineaDeVenta l) — Venta hacia l dentro de agregar.', b: 1 },
          { t: 'Dentro de un método de Caja: Producto p = tienda.buscar(cod); — Caja hacia p.', b: 2 },
          { t: 'FactoriaDeServicios.getInstancia() usado desde Registro.', b: 3 },
          { t: 'Dentro de un método: Pago p = new Pago(monto); — hacia p.', b: 2 },
          { t: 'Estrategia.getTotal(Venta v) — la estrategia hacia la venta.', b: 1 },
          { t: 'Venta guarda su estrategia en un campo — Venta hacia la estrategia.', b: 0 },
        ],
      }],
      quiz: [
        { q: '¿Qué condición debe cumplirse para que A envíe un mensaje a B?', o: ['B debe ser visible para A', 'A debe ser visible para B', 'A y B deben ser de la misma clase', 'B debe ser global'], a: 0, e: 'A necesita una referencia a B.' },
        { q: '¿Cuál es la forma de visibilidad más común?', o: ['De atributo', 'De parámetro', 'Local', 'Global'], a: 0, e: 'La de parámetro es la segunda y la local, la tercera.' },
        { q: '¿Cuál es la menos frecuente?', o: ['Global', 'Local', 'De parámetro', 'De atributo'], a: 0, e: 'Se recomienda lograrla con Singleton, no con variables globales.' },
        { q: '¿Qué visibilidades son relativamente temporales?', o: ['De parámetro y local', 'De atributo y global', 'Solo la global', 'Todas'], a: 0, e: 'Persisten solo dentro del ámbito del método.' },
        { q: 'Si dentro de un método se crea una instancia y se asigna a una variable local, la visibilidad es...', o: ['Local', 'De parámetro', 'De atributo', 'Global'], a: 0, e: 'También es local si se asigna a una variable el objeto devuelto por un mensaje.' },
        { q: '¿Qué estereotipo marca la visibilidad de atributo en un diagrama de colaboración?', o: ['«association»', '«attribute»', '«field»', '«global»'], a: 0, e: 'Los otros son «parameter», «local» y «global».' },
        { q: 'En el DCD, ¿cómo se dibuja una visibilidad de parámetro?', o: ['Como una dependencia: línea punteada con flecha', 'Como una asociación con navegabilidad', 'Como una generalización', 'No se dibuja'], a: 0, e: 'La de atributo es la que se dibuja con asociación navegable.' },
      ],
      sources: [{ title: 'UML y Patrones, 2ª ed.', ref: 'Larman, cap. 18, págs. 261-266', points: ['Visibilidad entre objetos: atributo, parámetro, local y global, y su notación.'] }],
    },

    {
      id: 'diagramas-de-clases-de-diseno',
      module: 'm16',
      title: 'Diagramas de clases de diseño (DCD)',
      keywords: 'DCD diagrama de clases de diseño clases de software métodos atributos tipos navegabilidad dependencia modelo de diseño modelo conceptual diferencia constructores métodos de acceso accesor mutador estrategias pasos',
      tldr: 'El <mark>DCD</mark> especifica las <strong>clases de software</strong>: clases, asociaciones, atributos con tipos, <strong>métodos</strong>, navegabilidad y dependencias. Sale de los <strong>diagramas de interacción</strong> (qué clases y métodos) y del <strong>modelo conceptual</strong> (atributos). No es el modelo de dominio: aquel tiene conceptos del mundo real; este, componentes de software.',
      goals: ['Saber qué contiene un DCD y de qué artefactos sale.', 'Diferenciar DCD y modelo conceptual.', 'Seguir los 8 pasos para elaborarlo.', 'Decidir qué no se muestra (constructores, accesores).', 'Ubicar asociaciones navegables y dependencias.'],
      body: `
        <h2>Qué es</h2>
        <p>Terminados (en parte) los diagramas de interacción, se identifican las clases de software que participan y se completan con sus métodos. Aunque se enseñan después, <strong>en la práctica se hacen en paralelo</strong>: algo de interacción, actualizar el DCD, extender la interacción, y así.</p>
        ${table(['Artefacto de entrada', 'Qué aporta al DCD'], [['Diagramas de interacción', 'Las clases de software que intervienen en la solución y sus <strong>métodos</strong>.'], ['Modelo de dominio o conceptual', 'Los detalles de las clases: sus <strong>atributos</strong>.']])}
        <p>El DCD describe gráficamente las especificaciones de las clases de software y contiene: <strong>clases, asociaciones y atributos; información de tipos; navegabilidad; dependencias</strong> (y los métodos). Larman no da una definición formal: llega al concepto con ejemplos. El <strong>modelo de diseño</strong> contiene los diagramas de interacción, de paquetes y de clases.</p>
        ${table(['Modelo conceptual (de dominio)', 'Diagrama de clases de diseño'], [['Conceptos del mundo real: una Venta es la <strong>abstracción de un concepto</strong> sobre el que queremos afirmar algo.', 'Definiciones de entidades de software: Venta define una <strong>clase, componente del software</strong>.'], ['Sin métodos, sin navegabilidad.', 'Con métodos, tipos y navegabilidad.']])}
        ${dcd}

        <h2>Cómo elaborarlo: 8 pasos</h2>
        <ol>
          <li>Identificar todas las clases que participan en la solución, <strong>analizando los diagramas de interacción</strong>.</li>
          <li>Dibujarlas en un diagrama de clases.</li>
          <li>Agregar los <strong>atributos</strong> provenientes del modelo conceptual.</li>
          <li>Agregar los <strong>nombres de los métodos</strong> analizando los diagramas de interacción: si el mensaje <code>hacerLineaDeProducto</code> se envía a una Venta, Venta define ese método.</li>
          <li>Incorporar la <strong>información de tipos</strong> de atributos y métodos.</li>
          <li>Agregar las <strong>asociaciones</strong> necesarias para la visibilidad de atributo.</li>
          <li>Agregar <strong>flechas de navegabilidad</strong> que indican la dirección de la visibilidad de atributo.</li>
          <li>Agregar líneas de <strong>dependencia</strong> para la visibilidad no relacionada con atributos.</li>
        </ol>
        ${lab(0)}
        <h3>Detalles de cada paso</h3>
        <ul>
          <li>Puede haber conceptos del modelo conceptual (Cajero, Gerente, Producto) que <strong>no aparecen</strong> en el diseño: quizá no haga falta representarlos ahora; se agregan en ciclos posteriores si se necesitan.</li>
          <li><strong>Constructores</strong>: indican instanciación e inicialización; como es una actividad común, se omiten en el DCD.</li>
          <li><strong>Métodos de acceso</strong>: accesor (recupera) y mutador (establece) el valor de un atributo. Normalmente no se incluyen por el <strong>ruido</strong>: para N atributos habría 2N métodos sin interés (no se muestra “obtener precio” de EspecificacionDeProducto: está implícito).</li>
          <li><strong>Tipos</strong>: mostrarlos es opcional. Si el DCD se hace en una herramienta CASE con generación de código, hacen falta completos; si es para que lo lean diseñadores, el exceso de detalle puede ser negativo. Ejemplos: <code>fecha : Fecha</code>, <code>hacerLineaDeProducto(especif : EspecificacionDeProd, cant : Entero)</code>, <code>total() : Cantidad</code>; un método sin tipo de retorno no devuelve valor.</li>
        </ul>
        <h3>Asociaciones y navegabilidad</h3>
        <p>La <strong>flecha de navegabilidad</strong> indica que se puede navegar <strong>unidireccionalmente</strong> desde la clase fuente a la destino: equivale a <strong>visibilidad de atributo</strong>, como si la fuente tuviera un atributo que referencia una instancia de la destino. En Caja → Venta (captura, 1 a 1), Caja tiene un atributo que apunta a Venta; la ausencia de flecha indica que no hay conexión de Venta a Caja.</p>
        ${note('3 situaciones comunes en las que hay que definir una asociación con navegabilidad de A hacia B: <strong>A envía un mensaje a B</strong>; <strong>A crea una instancia de B</strong>; <strong>A necesita mantener una conexión con B</strong>.', 'exam')}
        <h3>Dependencias</h3>
        <p>Una <strong>relación de dependencia</strong> indica que un elemento conoce la existencia de otro; se dibuja con <strong>línea punteada y flecha</strong>. Describe visibilidad de <strong>parámetro, global o local</strong> (la de atributo va con asociación y navegabilidad). Ejemplo: si se permite devolver un ítem que el cliente desiste de comprar, la Caja puede tener una visibilidad local, de corto plazo, de EspecificacionDeProducto: dependencia de Caja hacia ella.</p>
      `,
      labs: [{
        type: 'order', title: 'Ordená los 8 pasos para elaborar un DCD',
        items: ['Identificar las clases analizando los diagramas de interacción', 'Dibujarlas en un diagrama de clases', 'Agregar los atributos del modelo conceptual', 'Agregar los métodos analizando los diagramas de interacción', 'Incorporar los tipos de atributos y métodos', 'Agregar las asociaciones para la visibilidad de atributo', 'Agregar las flechas de navegabilidad', 'Agregar las dependencias para la visibilidad que no es de atributo'],
        explain: '<p>Primero las clases y su contenido (atributos, métodos, tipos), después las relaciones (asociaciones, navegabilidad, dependencias).</p>',
      }],
      exercises: [
        { title: 'DCD del alquiler de esquí', level: 3, prompt: '<p>A partir de los 4 diagramas de colaboración de <strong>Alquilar Artículo</strong> (lección anterior), elaborá el DCD: clases, atributos (Alquiler: fecha, hora; Producto: código, estado; Pago: monto; AlquilerLineadeProducto: cantidad), métodos, asociaciones con navegabilidad y multiplicidad.</p>', hints: ['Cada mensaje recibido es un método de la clase receptora.', 'Navegabilidad de A a B si A envía mensajes a B, lo crea o mantiene una conexión.'], solution: { explain: `${table(['Clase', 'Atributos', 'Métodos'], [
          ['Caja', '—', 'introducirSocio(cod), introducirProducto(cod), terminarAlquiler(), efectuarPago(e)'],
          ['Socio', 'codigo, nombre', 'crearAlquiler()'],
          ['Alquiler', 'fecha : Fecha, hora : Hora', 'crearLinea(p : Producto), seTermina(), efectuarPago(e : Cantidad)'],
          ['AlquilerLineadeProducto', 'cantidad : Entero', '(constructor, omitido)'],
          ['Tienda', 'nombre, direccion', 'buscarProd(cod) : Producto'],
          ['Producto', 'codigo, estado : Booleano', 'seAlquila()'],
          ['Pago', 'monto : Cantidad', '(constructor, omitido)'],
        ])}<p><strong>Asociaciones navegables</strong>: Caja → Tienda (le envía buscarProd), Caja → Alquiler (alquiler en curso, le envía crearLinea, seTermina, efectuarPago), Caja → Socio (colección de socios), Socio → Alquiler (lo crea; 1 a *), Alquiler → AlquilerLineadeProducto (contiene; 1 a 1..*), AlquilerLineadeProducto → Producto (refiere; * a 1), Tienda → Producto (contiene; 1 a *), Alquiler → Pago (lo crea; 1 a 1). La visibilidad que Caja obtiene del Producto devuelto (para pasárselo a crearLinea) es <strong>local</strong>: dependencia punteada Caja → Producto.</p>` } },
      ],
      quiz: [
        { q: '¿De qué artefactos se obtienen los métodos de las clases del DCD?', o: ['De los diagramas de interacción', 'Del modelo conceptual', 'De los casos de uso', 'De los contratos'], a: 0, e: 'Cada mensaje recibido se convierte en un método de la clase receptora.' },
        { q: '¿De dónde salen los atributos del DCD?', o: ['Del modelo conceptual o de dominio', 'De los diagramas de interacción', 'Del SAD', 'De la pila de producto'], a: 0, e: 'Los diagramas de interacción aportan clases y métodos.' },
        { q: '¿Qué diferencia hay entre la Venta del modelo conceptual y la del DCD?', o: ['Concepto del mundo real vs. clase de software', 'Ninguna: son la misma clase en dos diagramas', 'En el DCD la Venta no tiene atributos, solo métodos', 'En el modelo conceptual la Venta ya tiene sus métodos'], a: 0, e: 'El modelo conceptual no define software.' },
        { q: '¿Por qué normalmente no se muestran los accesores y mutadores?', o: ['Agregan ruido: 2N métodos sin interés', 'Porque esos métodos no existen en UML', 'Porque son privados y no se dibujan', 'Porque los genera solo el compilador'], a: 0, e: 'Están implícitos.' },
        { q: '¿Qué indica una flecha de navegabilidad de A hacia B?', o: ['Que A tiene un atributo que referencia a B', 'Que B hereda de A y redefine sus métodos', 'Que B es un parámetro de un método de A', 'Que A depende temporalmente de B en un método'], a: 0, e: 'La ausencia de flecha indica que no hay conexión en el otro sentido.' },
        { q: '¿Cuál NO es una situación en la que se define una asociación navegable de A hacia B?', o: ['B es un parámetro de un método de A', 'A envía un mensaje a B', 'A crea una instancia de B', 'A necesita mantener una conexión con B'], a: 0, e: 'La visibilidad de parámetro se dibuja como dependencia.' },
        { q: '¿Qué tipos de visibilidad describe una relación de dependencia?', o: ['Parámetro, global o local', 'Solo la de atributo', 'Solo la global', 'Ninguna visibilidad'], a: 0, e: 'Se dibuja con línea punteada y flecha.' },
        { q: '¿Cuándo conviene incluir los tipos completos en el DCD?', o: ['Si se genera código con una herramienta CASE', 'Siempre, para que el diagrama sea completo', 'Nunca, porque los tipos son detalle de código', 'Solo para los atributos, nunca en los métodos'], a: 0, e: 'Para lectores humanos, el exceso de detalle puede ser negativo.' },
        { q: '¿Cómo se relacionan en la práctica los diagramas de interacción y el DCD?', o: ['Se hacen en paralelo', 'Primero se termina el DCD', 'Son totalmente independientes', 'El DCD se genera del código'], a: 0, e: 'Se enseñan por separado solo por claridad.' },
      ],
      sources: [{ title: 'UML y Patrones, 2ª ed.', ref: 'Larman, cap. 19, págs. 267-280', points: ['Diagramas de clases de diseño: pasos, métodos, tipos, asociaciones, navegabilidad y dependencias.'] }],
    },
  );
})();
