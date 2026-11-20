/* Unidad V, clase 16: notación del diagrama de clases, Experto, Creador, Bajo Acoplamiento y Alta Cohesión. Diapositivas 16, Larman 2ª ed. cap. 16, págs. 206-221. */
(() => {
  const { LESSONS, h } = window.GUIDE;
  const { note, def, table, fig, lab, uml: U } = h;

  // Experto: getTotal de la venta
  const total = U.svg(620, 270, `
    ${U.msg(4, 40, 62, 40, 't := getTotal()', { anchor: 'start', lx: 4, ly: 30, s: 1 })}${U.obj(70, 28, 90, ':Venta', { cls: 'k-a', s: 1 })}
    <g data-s="2">${U.ln([[160, 41], [330, 41]])}<text x="325" y="36" class="u-sm">*</text><rect x="338" y="22" width="120" height="26" rx="2" class="u-hd"/><rect x="330" y="28" width="120" height="26" rx="2" class="u-hd"/><text x="390" y="45" class="u-c u-tt u-un">:LineaDeVenta</text>${U.msg(176, 28, 316, 28, '1*: st := getSubtotal()', { ly: 20 })}</g>
    <g data-s="3">${U.ln([[390, 54], [390, 150]])}${U.msg(404, 66, 404, 140, '1.1: p := getPrecio()', { anchor: 'start', lx: 410, ly: 106 })}${U.obj(310, 150, 170, ':EspecificacionDelProducto', { cls: 'k-ok' })}</g>
    <g data-s="4">${U.box(10, 110, 140, 'Venta', { attrs: ['fecha', 'hora'], ops: ['getTotal()'], cls: 'k-a' })}${U.box(160, 150, 130, 'LineaDeVenta', { attrs: ['cantidad'], ops: ['getSubtotal()'] })}${U.box(490, 150, 120, 'Especificación…', { attrs: ['descripcion', 'precio', 'id'], ops: ['getPrecio()'] })}</g>`,
    'Experto en Información: Venta calcula el total pidiendo subtotales a sus líneas, que piden el precio a la especificación del producto');

  // Bajo acoplamiento: dos diseños para crear el Pago
  const disenos = fig(U.svg(620, 270, `
    <text x="150" y="16" class="u-c u-sans u-b t-err">Diseño 1: Registro crea el Pago</text>
    ${U.msg(4, 46, 30, 46, '', {})}<text x="4" y="36" class="u-msgt u-sm">realizarPago()</text>${U.obj(36, 34, 90, ':Registro', { cls: 'k-a' })}
    ${U.ln([[126, 47], [210, 47]])}${U.msg(134, 36, 202, 36, '1: create()', { ly: 30 })}${U.obj(210, 34, 70, 'p:Pago', { cls: 'k-err' })}
    ${U.ln([[81, 60], [81, 140]])}${U.msg(94, 70, 94, 132, '2: añadirPago(p)', { anchor: 'start', lx: 100, ly: 106 })}${U.obj(36, 140, 90, ':Venta')}
    <text x="150" y="200" class="u-c u-sm">Registro queda acoplado a Pago y a Venta;</text><text x="150" y="214" class="u-c u-sm">Venta también conoce a Pago.</text>
    <path d="M310 10V260" class="u-ln u-dash"/>
    <text x="470" y="16" class="u-c u-sans u-b t-ok">Diseño 2: Venta crea el Pago</text>
    ${U.msg(324, 46, 350, 46, '', {})}<text x="324" y="36" class="u-msgt u-sm">realizarPago()</text>${U.obj(356, 34, 90, ':Registro', { cls: 'k-a' })}
    ${U.ln([[401, 60], [401, 140]])}${U.msg(414, 70, 414, 132, '1: realizarPago()', { anchor: 'start', lx: 420, ly: 106 })}${U.obj(356, 140, 90, ':Venta')}
    ${U.ln([[446, 153], [530, 153]])}${U.msg(454, 142, 522, 142, '1.1: create()', { ly: 136 })}${U.obj(530, 140, 70, ':Pago', { cls: 'k-ok' })}
    <text x="470" y="200" class="u-c u-sm">Registro no conoce a Pago: no aumenta el acoplamiento.</text><text x="470" y="214" class="u-c u-sm">Además, Registro queda más cohesivo.</text>`,
    'Comparación de dos diseños para crear el Pago: en el primero lo crea Registro, en el segundo lo crea Venta'),
    'Los dos diseños de Larman (figuras 16.9 y 16.10). En ambos Venta termina conociendo el Pago, pero el Diseño 1 agrega acoplamiento entre Registro y Pago. El Diseño 2 soporta <strong>Bajo Acoplamiento y Alta Cohesión</strong>, aunque Creador sugería al Registro.');

  const notacion = fig(U.svg(600, 200, `
    ${U.box(20, 10, 190, 'Venta', { attrs: ['fecha : Fecha', 'estaTerminada : Booleano', 'hora : Hora'], ops: ['getTotal() : Dinero', 'crearLineaDeVenta(e, c)'], cls: 'k-a' })}
    <text x="220" y="27" class="u-sm">← nombre</text><text x="220" y="56" class="u-sm">← atributos</text><text x="220" y="112" class="u-sm">← métodos (3er compartimento)</text>
    ${U.box(400, 40, 150, 'LineaDeVenta', { attrs: ['cantidad : Entero'], ops: ['getSubtotal()'] })}
    ${U.ln([[210, 70], [400, 70]], { end: 'op' })}<text x="300" y="62" class="u-c u-sm">contiene</text><text x="216" y="84" class="u-sm">1</text><text x="388" y="84" class="u-sm">1..*</text>`,
    'Rectángulo de clase UML con tres compartimentos y una asociación navegable'),
    'Notación del diagrama de clases de diseño: tres compartimentos (nombre, atributos y <strong>métodos</strong>), tipos opcionales y asociaciones con multiplicidad y flecha de navegabilidad.');

  LESSONS.push(
    {
      id: 'notacion-clases-y-experto',
      module: 'm13',
      title: 'Notación de clases y patrón Experto en Información',
      keywords: 'diagrama de clases tres compartimentos métodos Experto en Información información necesaria getTotal getSubtotal getPrecio modelo de dominio modelo de diseño expertos parciales principio de animación contraindicación base de datos separación de intereses',
      tldr: '<mark>Experto en Información</mark>: <strong>asignar la responsabilidad a la clase que tiene la información necesaria para cumplirla</strong>. Es el principio básico que se usa continuamente. Para el total de una venta colaboran tres expertos parciales: Venta, LineaDeVenta y EspecificacionDelProducto. Contraindicación: no lleva a que cada clase se guarde a sí misma en la base de datos.',
      goals: ['Leer la notación del diagrama de clases con métodos.', 'Enunciar problema y solución del Experto.', 'Aplicarlo al cálculo del total de la venta.', 'Explicar el principio de animación y la contraindicación del Experto.'],
      body: `
        <h2>Notación de los diagramas de clases</h2>
        <p>El rectángulo de clase de UML que representa clases de software tiene <strong>tres compartimentos</strong>: el tercero son los <strong>métodos</strong>.</p>
        ${notacion}

        <h2>Experto en Información (o Experto)</h2>
        ${table(['Problema', 'Solución'], [['¿Cuál es un principio general para asignar responsabilidades a los objetos?', 'Asignar una responsabilidad al <strong>experto en información</strong>: la clase que tiene la información necesaria para realizar la responsabilidad.']])}
        <p>Cuando se definen las interacciones se decide qué clase hace qué. Si se hace bien, los sistemas son más fáciles de entender, mantener y ampliar, y hay más oportunidades de reutilizar.</p>
        <h3>Ejemplo: ¿quién conoce el total de una venta?</h3>
        <p>Hay que buscar las clases con la información necesaria. ¿Dónde? <strong>Primero en el modelo de diseño</strong> (diagrama de clases), si ya existe; si no, en el <strong>modelo del dominio</strong>, que inspira la creación de las clases de diseño. En el dominio está la Venta del mundo real: agregamos una clase de software Venta y le damos la responsabilidad de conocer su total con <code>getTotal</code>.</p>
        ${lab(0)}
        ${table(['Clase de diseño', 'Responsabilidad'], [['Venta', 'Conocer el total de la venta'], ['LineaDeVenta', 'Conocer el subtotal de la línea'], ['EspecificacionDelProducto', 'Conocer el precio del producto']])}

        <h2>Discusión</h2>
        <ul>
          <li>Es un principio de guía básico que se usa <strong>continuamente</strong>: expresa la intuición de que <strong>los objetos hacen cosas relacionadas con la información que tienen</strong>.</li>
          <li>La información puede estar dispersa en varias clases: hay <strong>expertos parciales</strong> que colaboran.</li>
          <li><strong>Principio de animación</strong>: en el mundo real una venta no calcula su total (es un objeto inanimado; alguien lo calcula). En el software los objetos están “vivos”, como en los dibujos animados, y pueden tener responsabilidades relacionadas con lo que conocen.</li>
          <li>Analogía del mundo real: le damos la tarea a <strong>quien sabe</strong>.</li>
        </ul>
        <h3>Contraindicación</h3>
        <p>¿Quién debería guardar una Venta en una base de datos? Como Venta tiene casi toda la información, el Experto diría que Venta. Pero eso trae problemas de <strong>cohesión, acoplamiento y duplicación</strong>: Venta ya no se centra solo en “ser una venta”, y la lógica de base de datos se duplica en muchas clases. Viola un principio arquitectural básico: <strong>separar los principales aspectos del sistema</strong>.</p>
        ${note('Mantener la lógica de la aplicación en un sitio (objetos del dominio) y la lógica de la base de datos en otro (un subsistema de servicios separado). La solución formal llega con <strong>Fabricación Pura</strong> en la clase 17.', 'exam')}
      `,
      labs: [{ type: 'steps', title: 'El total de la venta según Experto', intro: 'Seguí cómo se reparten las responsabilidades entre los tres expertos parciales.', fig: total, steps: [
        { k: 'Venta', t: '¿Quién conoce el total? La <strong>Venta</strong>, que contiene todas sus líneas: es el experto. Recibe <code>t := getTotal()</code>.' },
        { k: 'LineaDeVenta', t: 'Para el total hay que sumar los subtotales. ¿Quién conoce el subtotal? La <strong>LineaDeVenta</strong>, que conoce su cantidad y su especificación. Venta envía <code>1*: st := getSubtotal()</code> a cada línea (iteración sobre el multiobjeto).' },
        { k: 'EspecificacionDelProducto', t: 'Para el subtotal (cantidad × precio) falta el precio. Lo conoce la <strong>EspecificacionDelProducto</strong>: la línea le envía <code>1.1: p := getPrecio()</code>.' },
        { k: 'Diagrama de clases', t: 'Cada mensaje recibido se convierte en un método de la clase receptora: <code>getTotal()</code> en Venta, <code>getSubtotal()</code> en LineaDeVenta y <code>getPrecio()</code> en EspecificacionDelProducto.' },
      ] }],
      quiz: [
        { q: '¿Qué dice el patrón Experto en Información?', o: ['Asignar la responsabilidad a la clase que tiene la información necesaria para cumplirla', 'Asignar la responsabilidad a la clase que crea el objeto', 'Asignar la responsabilidad a un controlador', 'Asignar la responsabilidad a una clase inventada'], a: 0, e: 'Es el principio básico de asignación de responsabilidades.' },
        { q: '¿Dónde se buscan primero los expertos en información?', o: ['En el modelo de diseño y, si no, en el de dominio', 'En los casos de uso, porque describen las tareas', 'En el código existente, porque ya tiene las clases', 'En el SAD, porque resume las decisiones tomadas'], a: 0, e: 'El modelo del dominio inspira las clases de diseño cuando recién se arranca.' },
        { q: '¿Quién es experto para conocer el subtotal de una línea de venta?', o: ['LineaDeVenta', 'Venta', 'EspecificacionDelProducto', 'Registro'], a: 0, e: 'Conoce su cantidad y su especificación asociada.' },
        { q: '¿Quién proporciona el precio del producto?', o: ['EspecificacionDelProducto', 'LineaDeVenta', 'Venta', 'CatalogoDeProductos'], a: 0, e: 'Es el experto en información sobre el precio.' },
        { q: '¿Qué es el “principio de animación”?', o: ['Los objetos de software “viven” y hacen lo que su información permite', 'Que los diagramas de interacción deben animarse para explicarse', 'Que los objetos se crean solos cuando el sistema los necesita', 'Que las interfaces deben tener animaciones para guiar al usuario'], a: 0, e: 'Una venta real no calcula su total; la Venta del software sí.' },
        { q: '¿Cuál es la contraindicación típica del Experto?', o: ['Que cada clase se guarde sola en la base', 'Que la Venta calcule su propio total', 'Que la Venta cree sus líneas de venta', 'Que haya expertos parciales que colaboran'], a: 0, e: 'Genera baja cohesión, alto acoplamiento y duplicación.' },
        { q: '¿Qué principio arquitectural viola guardar la Venta desde la propia Venta?', o: ['Separar los principales aspectos del sistema', 'No hables con extraños', 'Abierto-cerrado', 'Mínima sorpresa'], a: 0, e: 'La lógica de aplicación y la de datos deben estar en sitios distintos.' },
        { q: '¿Qué contiene el tercer compartimento de una clase en un diagrama de clases de diseño?', o: ['Los métodos', 'Los atributos', 'El nombre', 'Las asociaciones'], a: 0, e: 'El primero es el nombre y el segundo, los atributos.' },
      ],
      sources: [{ title: 'UML y Patrones, 2ª ed.', ref: 'Larman, cap. 16, págs. 206-211', points: ['Notación de diagramas de clases; Experto en Información con el ejemplo del PDV.'] }],
    },

    {
      id: 'creador',
      module: 'm13',
      title: 'Patrón Creador',
      keywords: 'creador crear instancia agrega contiene registra utiliza estrechamente datos de inicialización crearLineaDeVenta preferencia agregación contenedor bajo acoplamiento visibilidad',
      tldr: '<mark>Creador</mark>: asignar a B la responsabilidad de crear instancias de A si <strong>B agrega, contiene, registra o usa estrechamente a A, o tiene sus datos de inicialización</strong>. Si se cumplen varias, se prefiere la que <strong>agrega o contiene</strong>. Por eso Venta crea las LineaDeVenta.',
      goals: ['Enunciar las 5 condiciones del Creador y la preferencia.', 'Aplicarlo a la creación de LineaDeVenta.', 'Explicar sus beneficios.'],
      body: `
        <h2>El patrón</h2>
        ${table(['Problema', 'Solución'], [['¿Quién debería ser responsable de crear una nueva instancia de alguna clase?', 'Asignar a la clase B la responsabilidad de crear una instancia de la clase A si:<br>• B <strong>agrega</strong> objetos de A;<br>• B <strong>contiene</strong> objetos de A;<br>• B <strong>registra</strong> instancias de A;<br>• B <strong>utiliza más estrechamente</strong> objetos de A;<br>• B tiene los <strong>datos de inicialización</strong> que se pasarán a A al crearlo (B es un Experto respecto de la creación de A).<br>B es un <em>creador</em> de los objetos A.']])}
        ${note('Si se aplica más de una opción, se prefiere la clase B que <strong>agregue o contenga</strong> a la clase A.', 'exam')}

        <h2>Ejemplo: ¿quién crea una LineaDeVenta?</h2>
        <p>Buscamos clases que agreguen, contengan, etc., instancias de LineaDeVenta. En el modelo de dominio, una <strong>Venta contiene muchas LineaDeVenta</strong>: Venta es buena candidata. Eso requiere definir en Venta un método <code>crearLineaDeVenta</code>.</p>
        ${fig(U.svg(600, 190, `
          ${U.msg(4, 40, 62, 40, 'crearLineaDeVenta(cantidad)', { anchor: 'start', lx: 4, ly: 26 })}${U.obj(70, 34, 100, ':Registro', { cls: 'k-a' })}
          ${U.ln([[170, 47], [300, 47]])}${U.msg(180, 36, 290, 36, '1: crearLineaDeVenta(c)', { ly: 28 })}${U.obj(300, 34, 90, ':Venta', { cls: 'k-ok' })}
          ${U.ln([[345, 60], [345, 140]])}${U.msg(360, 70, 360, 132, '1.1: create(c)', { anchor: 'start', lx: 366, ly: 100 })}${U.obj(290, 140, 120, ':LineaDeVenta')}
          ${U.ln([[390, 47], [460, 47]])}${U.msg(398, 36, 452, 36, '1.2: añadir(li)', { ly: 28 })}<rect x="468" y="28" width="120" height="26" rx="2" class="u-hd"/><rect x="460" y="34" width="120" height="26" rx="2" class="u-hd"/><text x="520" y="51" class="u-c u-tt u-un">:LineaDeVenta</text>`,
          'Venta crea la LineaDeVenta y la agrega a su colección'), 'Venta crea la línea (1.1) y la agrega a su colección (1.2). Como la contiene, Venta queda conectada a la línea que creó.')}
        <p>Conviene buscar un creador que de todos modos <strong>necesite conectarse</strong> al objeto creado: por eso la clase contenedora o registro es buena candidata para crear lo que contiene o registra.</p>

        <h2>Beneficios</h2>
        <ul>
          <li>Soporta <strong>Bajo Acoplamiento</strong>: menos dependencias y más oportunidades de reutilizar.</li>
          <li>Es probable que la clase creada ya sea <strong>visible</strong> para la creadora, por las asociaciones que motivaron su elección.</li>
        </ul>
        <p>Cuando la creación es compleja (por ejemplo, depende de una propiedad externa o hay que reciclar instancias), conviene delegarla en una <strong>Factoría</strong> (patrón GoF de la clase 18).</p>
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿Qué condición del Creador se cumple?',
        buckets: ['Agrega o contiene', 'Registra', 'Usa estrechamente', 'Tiene los datos de inicialización'],
        items: [
          { t: 'Un Pedido crea sus LineaDePedido.', b: 0 },
          { t: 'El Libro de actas crea cada Acta que asienta.', b: 1 },
          { t: 'Un Socio crea el Alquiler que él mismo realiza, y lo usará después.', b: 2 },
          { t: 'Un Formulario de alta conoce todos los datos y crea el Cliente.', b: 3 },
          { t: 'Un Carrito crea los Ítems que contiene.', b: 0 },
        ],
      }],
      quiz: [
        { q: 'Según Creador, ¿cuándo B es buen candidato para crear A?', o: ['Si agrega, contiene, registra o usa a A, o tiene sus datos', 'Si B hereda de A o A hereda de B', 'Si B es el controlador del caso de uso', 'Si B está en la capa de interfaz de usuario'], a: 0, e: 'Son las cinco condiciones del patrón.' },
        { q: 'Si varias clases cumplen las condiciones, ¿cuál se prefiere?', o: ['La que agrega o contiene a A', 'La que registra a A', 'La que tiene los datos de inicialización', 'La más grande'], a: 0, e: 'Es la preferencia explícita del patrón.' },
        { q: '¿Quién crea una LineaDeVenta en el PDV?', o: ['Venta, porque la contiene', 'Registro', 'EspecificacionDelProducto', 'Tienda'], a: 0, e: 'Requiere un método crearLineaDeVenta en Venta.' },
        { q: '¿Qué patrón soporta Creador?', o: ['Bajo Acoplamiento', 'Alta Cohesión', 'Controlador', 'Polimorfismo'], a: 0, e: 'El creador probablemente ya conoce a la clase creada.' },
        { q: '“B tiene los datos de inicialización de A” convierte a B en...', o: ['Un experto respecto de la creación de A', 'El controlador de los eventos de A', 'Una fabricación pura que crea a A', 'Una fachada del subsistema de A'], a: 0, e: 'Es la quinta condición del Creador.' },
        { q: '¿Qué conviene cuando la lógica de creación es compleja?', o: ['Usar una Factoría', 'Usar un Singleton', 'Que la cree el controlador', 'Que la cree la interfaz'], a: 0, e: 'La Factoría es una Fabricación Pura para crear objetos.' },
      ],
      sources: [{ title: 'UML y Patrones, 2ª ed.', ref: 'Larman, cap. 16, págs. 211-214', points: ['Patrón Creador con el ejemplo de LineaDeVenta.'] }],
    },

    {
      id: 'bajo-acoplamiento-y-alta-cohesion',
      module: 'm13',
      title: 'Bajo Acoplamiento y Alta Cohesión',
      keywords: 'acoplamiento medida fuerza conectado dependencias reutilización alto acoplamiento problemas cohesión responsabilidades relacionadas saturado baja cohesión principio evaluativo Registro Pago Venta diseño 1 diseño 2',
      tldr: '<mark>Bajo Acoplamiento</mark>: asignar responsabilidades para que el acoplamiento (cuánto un elemento depende de otros) permanezca bajo. <mark>Alta Cohesión</mark>: que cada elemento tenga responsabilidades muy relacionadas y no haga demasiado. Son <strong>principios evaluativos</strong>: con ellos se elige que Venta (y no Registro) cree el Pago.',
      goals: ['Definir acoplamiento y cohesión.', 'Explicar los problemas del alto acoplamiento y de la baja cohesión.', 'Comparar los dos diseños de creación del Pago.', 'Saber por qué tampoco conviene llevar el bajo acoplamiento al extremo.'],
      body: `
        <h2>Bajo Acoplamiento</h2>
        ${table(['Problema', 'Solución'], [['¿Cómo soportar bajas dependencias, un bajo impacto del cambio y una mayor reutilización?', 'Asignar una responsabilidad de manera que el acoplamiento permanezca bajo.']])}
        ${def('Acoplamiento', 'Medida de la fuerza con que un elemento está conectado a, tiene conocimiento de, o confía en otros elementos. Un elemento con bajo acoplamiento no depende de “demasiados” otros elementos (según el contexto).', 'Larman, cap. 16, págs. 214-217.')}
        <p>Una clase con <strong>alto acoplamiento</strong> confía en muchas otras, y tiene estos problemas:</p>
        <ul><li>los cambios en las clases relacionadas fuerzan cambios locales;</li><li>son difíciles de entender de manera aislada;</li><li>son difíciles de reutilizar, porque su uso requiere la presencia de las clases de las que depende.</li></ul>
        <h3>Ejemplo: ¿quién crea el Pago y lo asocia a la Venta?</h3>
        <p>Como un Registro “registra” un Pago en el mundo real, <strong>Creador</strong> sugiere al Registro: crea el Pago y luego envía <code>añadirPago(p)</code> a la Venta. La alternativa: que la Venta cree el Pago.</p>
        ${disenos}
        <ul>
          <li>En ambos casos Venta termina acoplada al Pago.</li>
          <li>El <strong>Diseño 1</strong> agrega acoplamiento entre Registro y Pago.</li>
          <li>El <strong>Diseño 2</strong> no incrementa el acoplamiento: es <strong>preferible</strong>.</li>
        </ul>
        ${note('Es el ejemplo clásico de <strong>dos patrones que sugieren soluciones distintas</strong>: Creador apunta a Registro, Bajo Acoplamiento apunta a Venta. Cuando hay varios candidatos, deciden Bajo Acoplamiento y Alta Cohesión.', 'exam')}
        <p>No hay una medida absoluta de cuándo el acoplamiento es demasiado alto: hay que medir el actual y evaluar si aumentarlo traerá problemas. Las clases con alta probabilidad de reutilización deben tener acoplamiento bajo. Pero el caso extremo —<strong>ningún acoplamiento</strong>— no es deseable: da un diseño pobre, con pocos objetos inconexos, saturados y complejos que hacen todo el trabajo, y muchos objetos pasivos que son simples repositorios de datos. Hace falta un <strong>grado moderado</strong> de acoplamiento para que los objetos colaboren.</p>

        <h2>Alta Cohesión</h2>
        ${table(['Problema', 'Solución'], [['¿Cómo mantener la complejidad manejable?', 'Asignar una responsabilidad de manera que la cohesión permanezca alta.']])}
        <p>Un elemento con responsabilidades <strong>altamente relacionadas</strong>, que no hace una gran cantidad de trabajo, tiene alta cohesión. Una clase con <strong>baja cohesión</strong> hace muchas cosas no relacionadas o demasiado trabajo, y es:</p>
        <ul><li>difícil de entender;</li><li>difícil de reutilizar;</li><li>difícil de mantener;</li><li>delicada: constantemente afectada por los cambios.</li></ul>
        <p>Tiene responsabilidades que deberían haberse delegado. En el ejemplo del Pago, que el Registro lo cree es aceptable como caso aislado, pero si seguimos haciendo al Registro responsable de casi todo, se <strong>satura</strong> y pierde cohesión. El Diseño 2 delega la creación en Venta y deja al Registro más cohesivo: soporta <strong>Alta Cohesión y Bajo Acoplamiento</strong>.</p>
        <ul>
          <li>Es un <strong>principio evaluativo</strong> que el diseñador aplica al evaluar todas sus decisiones.</li>
          <li>Hay alta cohesión cuando los elementos de un componente “trabajan todos juntos para proporcionar algún comportamiento bien delimitado”.</li>
          <li>Analogía: una persona con demasiadas responsabilidades no relacionadas, sobre todo de las que debería delegar, no es efectiva.</li>
          <li>Beneficios: mejora la claridad, simplifica el mantenimiento, suele soportar Bajo Acoplamiento e incrementa la reutilización.</li>
        </ul>
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿Problema de acoplamiento o de cohesión?',
        buckets: ['Alto acoplamiento', 'Baja cohesión'],
        items: [
          { t: 'Cambiar la clase Impuesto obliga a modificar Registro, Venta, Factura y Reporte.', b: 0 },
          { t: 'La clase Venta calcula totales, imprime tickets, envía emails y guarda en la base.', b: 1 },
          { t: 'Para reutilizar Cliente en otro sistema hay que llevarse 12 clases más.', b: 0 },
          { t: 'El Registro maneja todos los eventos del sistema y hace todo el trabajo sin delegar.', b: 1 },
          { t: 'Pedido no se puede entender sin leer el código de cinco clases que usa.', b: 0 },
          { t: 'Una clase Utilidades con métodos de fechas, de red y de PDF.', b: 1 },
        ],
      }],
      quiz: [
        { q: '¿Qué es el acoplamiento?', o: ['Cuánto un elemento depende de otros o los conoce', 'La cantidad de métodos públicos de una clase', 'Qué tan relacionadas están las responsabilidades de una clase', 'La cantidad de instancias que tiene una clase en ejecución'], a: 0, e: 'La relación entre responsabilidades es la cohesión.' },
        { q: '¿Cuál NO es un problema de una clase con alto acoplamiento?', o: ['Hace muchas cosas no relacionadas', 'Los cambios en las clases relacionadas fuerzan cambios locales', 'Es difícil de entender aislada', 'Es difícil de reutilizar'], a: 0, e: 'Hacer cosas no relacionadas es baja cohesión.' },
        { q: 'En el ejemplo del Pago, ¿qué diseño soporta Bajo Acoplamiento?', o: ['Que Venta cree el Pago (Diseño 2)', 'Que Registro cree el Pago (Diseño 1)', 'Ambos por igual', 'Ninguno'], a: 0, e: 'El Diseño 1 agrega acoplamiento entre Registro y Pago.' },
        { q: 'En ese ejemplo, ¿qué patrón sugería al Registro como creador del Pago?', o: ['Creador', 'Bajo Acoplamiento', 'Alta Cohesión', 'Experto'], a: 0, e: 'Porque el Registro registra el Pago en el mundo real. Es un caso de patrones en conflicto.' },
        { q: '¿Por qué no es deseable llevar el bajo acoplamiento al extremo?', o: ['Quedan pocos objetos saturados y muchos pasivos', 'Porque los sistemas se vuelven más lentos', 'Porque viola el patrón Creador', 'Porque ya no se pueden crear objetos'], a: 0, e: 'Hace falta un grado moderado de acoplamiento.' },
        { q: '¿Cuándo un elemento tiene alta cohesión?', o: ['Responsabilidades muy relacionadas y no demasiado trabajo', 'Cuando depende de muchas clases que lo ayudan', 'Cuando tiene muchos atributos bien encapsulados', 'Cuando es una clase abstracta con subclases'], a: 0, e: 'Sus elementos trabajan juntos para un comportamiento bien delimitado.' },
        { q: '¿Por qué Alta Cohesión y Bajo Acoplamiento se llaman principios evaluativos?', o: ['Se usan para evaluar todas las decisiones de diseño', 'Porque se aplican solo en la etapa de pruebas', 'Porque los evalúa el cliente en cada entrega', 'Porque solo se evalúan y nunca se aplican'], a: 0, e: 'Sirven para elegir entre candidatos.' },
        { q: '¿Qué le pasa a una clase a la que se le asignan responsabilidades que debería delegar?', o: ['Pierde cohesión y se vuelve un objeto saturado', 'Gana cohesión', 'Reduce su acoplamiento', 'Se convierte en una fabricación pura'], a: 0, e: 'Es lo que le pasaría al Registro si hiciera todo.' },
      ],
      sources: [{ title: 'UML y Patrones, 2ª ed.', ref: 'Larman, cap. 16, págs. 214-221', points: ['Bajo Acoplamiento (figuras 16.9 y 16.10) y Alta Cohesión.'] }],
    },
  );
})();
