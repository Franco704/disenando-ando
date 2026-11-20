/* Unidad V, clase 17: Controlador, Polimorfismo, Fabricación Pura, Indirección y Variaciones Protegidas. Diapositivas 17, Larman 2ª ed. cap. 16 (págs. 221-229) y cap. 22 (págs. 306-320). */
(() => {
  const { LESSONS, h } = window.GUIDE;
  const { note, def, table, fig, lab, uml: U } = h;

  const capas = fig(U.svg(600, 250, `
    ${U.blk(10, 10, 580, 70, '', { lyr: true })}<text x="22" y="28" class="u-sans u-b">Capa de interfaz (UI)</text>
    ${U.box(200, 36, 160, 'ProcesarVentaFrame', { h: 30 })}<text x="380" y="56" class="u-sm">el cajero presiona “Introducir artículo”</text>
    ${U.ln([[280, 66], [280, 120]])}${U.msg(294, 74, 294, 114, 'introducirArticulo(id, cant)', { anchor: 'start', lx: 300, ly: 100 })}
    ${U.blk(10, 100, 580, 140, '', { lyr: true })}<text x="22" y="118" class="u-sans u-b">Capa del dominio</text>
    ${U.obj(220, 120, 120, ':Registro', { cls: 'k-a' })}<text x="350" y="138" class="u-sm t-a">← controlador: recibe el evento del sistema</text>
    ${U.ln([[280, 146], [280, 190]])}${U.msg(294, 154, 294, 186, '1: crearLineaDeVenta(...)', { anchor: 'start', lx: 300, ly: 176 })}${U.obj(230, 190, 100, ':Venta')}`,
    'El objeto de interfaz recibe el clic y delega la operación del sistema en el controlador Registro de la capa del dominio'),
    'Corolario del Controlador: la capa de interfaz <strong>no</strong> maneja los eventos del sistema. El objeto de UI captura la acción y pasa la operación al controlador de la capa del dominio, que coordina y delega.');

  const polimorfismo = fig(U.svg(620, 230, `
    ${U.box(200, 10, 220, 'IAdaptadorCalculadorImpuestos', { stereo: 'interface', ops: ['getImpuestos(Venta): List<LineaImpuesto>'], cls: 'k-if' })}
    ${['AdaptadorTaxMaster', 'AdaptadorGoodAsGoldTaxPro', 'AdaptadorAFIP'].map((t, i) => U.box(10 + i * 205, 150, 190, t, { ops: ['getImpuestos(Venta)'] })).join('')}
    ${U.ln([[310, 128], [310, 136]], { end: 'tri' })}${U.ln([[105, 150], [105, 136], [515, 136], [515, 150]], { dash: true })}${U.ln([[310, 136], [310, 150]], { dash: true })}
    <text x="310" y="226" class="u-c u-sm">cada adaptador traduce la llamada a la API de un calculador externo distinto</text>`,
    'Interfaz IAdaptadorCalculadorImpuestos con tres implementaciones polimórficas de getImpuestos'),
    'Polimorfismo (y a la vez Indirección, Variaciones Protegidas y el patrón GoF Adaptador): una operación polimórfica <code>getImpuestos</code> con una implementación por calculador externo. La aplicación habla con una interfaz estable.');

  const fp = fig(U.svg(600, 160, `
    ${U.box(20, 20, 140, 'Venta', { attrs: ['fecha', 'hora'], ops: ['getTotal()'], cls: 'k-a' })}<text x="90" y="140" class="u-c u-sm">dominio: alta cohesión</text>
    ${U.box(230, 20, 180, 'AlmacenamientoPersistente', { ops: ['insertar(Object)', 'actualizar(Object)', '...'], cls: 'k-x' })}<text x="320" y="140" class="u-c u-sm">fabricación pura</text>
    ${U.blk(470, 40, 110, 60, 'Base de\ndatos', { cls: 'k-if' })}
    ${U.ln([[230, 60], [160, 60]], { end: 'op', dash: true })}${U.ln([[410, 70], [470, 70]], { end: 'ar' })}`,
    'Venta queda en el dominio y AlmacenamientoPersistente se ocupa de la base de datos'),
    'AlmacenamientoPersistente no existe en el modelo del dominio: es un invento del diseñador. Venta sigue cohesiva y desacoplada de la base de datos.');

  LESSONS.push(
    {
      id: 'controlador',
      module: 'm14',
      title: 'Patrón Controlador',
      keywords: 'controlador evento del sistema operación del sistema actor fachada caso de uso manejador sesión Registro SistemaPDV ProcesarVentaManejador delegar capa de interfaz saturado remedios reutilizar Command',
      tldr: '<mark>Controlador</mark>: asignar la responsabilidad de recibir un <strong>evento del sistema</strong> a una clase que represente el <strong>sistema global</strong> (controlador de fachada) o un <strong>escenario de caso de uso</strong> (controlador de caso de uso). El controlador <strong>no es parte de la interfaz</strong> y <mark>delega</mark>: coordina, no hace el trabajo.',
      goals: ['Definir evento del sistema.', 'Enunciar el Controlador y sus dos opciones.', 'Elegir entre controlador de fachada y de caso de uso.', 'Reconocer un controlador saturado y sus remedios.', 'Explicar el corolario sobre la capa de interfaz.'],
      body: `
        <h2>El patrón</h2>
        ${table(['Problema', 'Solución'], [['¿Quién debe ser el responsable de gestionar un evento del sistema?', 'Asignar la responsabilidad de recibir o manejar un mensaje de evento del sistema a una clase que:<br>• represente el <strong>sistema global, dispositivo o subsistema</strong> (<em>controlador de fachada</em>), o<br>• represente un <strong>escenario de caso de uso</strong> en el que ocurre el evento: &lt;NombreCasoDeUso&gt;Manejador, &lt;NombreCasoDeUso&gt;Controlador o &lt;NombreCasoDeUso&gt;Sesión (<em>controlador de caso de uso</em>).<br>Usar la <strong>misma clase controlador</strong> para todos los eventos de un mismo caso de uso.']])}
        <p>Un <strong>evento del sistema</strong> es una acción de entrada generada por un actor externo; se asocia a una <strong>operación del sistema</strong> que responde a él. Si el cajero presiona “Finalizar venta”, genera el evento “la venta terminó”.</p>
        ${table(['Opción', 'Ejemplos en el PDV'], [['Representa el sistema global, dispositivo o subsistema', 'Registro, SistemaPDV'], ['Representa un receptor de todos los eventos de un escenario de caso de uso', 'ProcesarVentaManejador, ProcesarVentaSesion']])}
        <p>En el diseño se asignan las operaciones del sistema (<code>introducirArticulo</code>, <code>finalizarVenta</code>, <code>realizarPago</code>) a la clase controlador.</p>

        <h2>Discusión</h2>
        <ul>
          <li>Se pueden usar distintos controladores para distintos casos de uso.</li>
          <li>El error típico es darle <strong>demasiada responsabilidad</strong>: el controlador debe <strong>delegar</strong> en otros objetos; controla y no hace nada más.</li>
          <li><strong>Controlador de fachada</strong>: una clase que sugiere una cubierta o fachada con los servicios principales: una abstracción física (Registro, Caja), una clase que representa el sistema (SistemaPDV) u otro concepto elegido por el diseñador. Conviene cuando <strong>no hay demasiados eventos</strong>.</li>
          <li><strong>Controlador de caso de uso</strong>: hay uno distinto por caso de uso. <strong>No es un objeto del dominio</strong>: es una construcción artificial (una Fabricación Pura). Conviene cuando el de fachada se está <strong>inflando</strong> (baja cohesión o alto acoplamiento) y cuando hay <strong>muchos eventos</strong> repartidos en diferentes procesos.</li>
        </ul>
        ${capas}
        ${note('Corolario: los objetos de interfaz (ventanas, botones) y la capa de presentación <strong>no deben ser responsables de controlar los eventos del sistema</strong>. Las operaciones se manejan en la capa de la lógica o del dominio: el controlador recibe la solicitud desde la UI y coordina su realización.', 'exam')}
        <h3>Beneficios</h3>
        <ul><li>Aumenta el potencial de <strong>reutilización</strong>: la lógica no queda atada a una interfaz particular, que raramente se puede usar en otra aplicación.</li><li>Permite razonar sobre el estado del caso de uso (por ejemplo, asegurar que las operaciones ocurran en orden).</li></ul>

        <h2>Controladores saturados</h2>
        ${table(['Signos', 'Remedios'], [['• Hay un único controlador que recibe todos los eventos (controlador de fachada) y son muchos.<br>• El controlador hace muchas tareas sin delegar: viola Experto y Alta Cohesión.<br>• Tiene muchos atributos y mantiene información significativa que debería estar distribuida o duplica la de otros lugares.', '1. Añadir más controladores: usar <strong>controladores de caso de uso</strong>.<br>2. Diseñar el controlador para que <strong>delegue</strong> cada responsabilidad en otros objetos.']])}
        <p>Patrones relacionados: <strong>Command</strong>, <strong>Fachada</strong> y <strong>Capas</strong>.</p>
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿Controlador de fachada, de caso de uso, o no es controlador?',
        buckets: ['Controlador de fachada', 'Controlador de caso de uso', 'No debe ser controlador'],
        items: [
          { t: 'Registro', b: 0 },
          { t: 'ProcesarVentaManejador', b: 1 },
          { t: 'VentanaDeVentas (un formulario de la UI)', b: 2, why: 'Los objetos de interfaz no manejan eventos del sistema.' },
          { t: 'SistemaPDV', b: 0 },
          { t: 'GestionarDevolucionesSesion', b: 1 },
          { t: 'BotonFinalizarVenta', b: 2 },
          { t: 'Caja (abstracción del sistema de caja)', b: 0 },
        ],
      }],
      quiz: [
        { q: '¿Qué problema resuelve el patrón Controlador?', o: ['Quién debe gestionar un evento del sistema', 'Quién crea las instancias', 'Quién conoce el total', 'Cómo adaptar interfaces incompatibles'], a: 0, e: 'Los eventos del sistema son acciones de entrada de un actor.' },
        { q: '¿Qué es un controlador de fachada?', o: ['Una clase que representa el sistema global', 'Una clase distinta por cada caso de uso', 'Un objeto de la capa de interfaz de usuario', 'Un patrón GoF de creación de objetos'], a: 0, e: 'Ejemplos: Registro, Caja, SistemaPDV.' },
        { q: '¿Cuándo conviene un controlador de caso de uso?', o: ['Cuando el de fachada se satura de eventos', 'Siempre, en cualquier sistema', 'Cuando hay pocos eventos del sistema', 'Cuando no hay casos de uso definidos'], a: 0, e: 'Hay uno distinto por caso de uso.' },
        { q: '¿El controlador de caso de uso es un objeto del dominio?', o: ['No: es una Fabricación Pura', 'Sí, siempre lo es', 'Sí, si tiene atributos propios', 'Solo si figura en el modelo conceptual'], a: 0, e: 'El de fachada puede representar algo físico como Registro.' },
        { q: '¿Cuál es el error más común al diseñar controladores?', o: ['Darles demasiada responsabilidad', 'Ponerlos en la capa del dominio', 'Usar uno por cada caso de uso', 'Nombrarlos como los casos de uso'], a: 0, e: 'El controlador controla y delega.' },
        { q: '¿Cuál es un signo de controlador saturado?', o: ['Mucha información que debería estar repartida', 'Delega todo su trabajo en otros objetos', 'Recibe pocos eventos del sistema', 'Pertenece a la capa del dominio'], a: 0, e: 'También: único controlador para muchos eventos y que hace todo sin delegar.' },
        { q: 'Según el corolario del Controlador, ¿quién NO debe controlar los eventos del sistema?', o: ['Los objetos de interfaz y la capa de presentación', 'Los objetos del dominio', 'Las fabricaciones puras', 'Los controladores de caso de uso'], a: 0, e: 'Así la lógica se puede reutilizar con otra interfaz.' },
        { q: '¿Qué remedio NO corresponde a un controlador saturado?', o: ['Hacer que la ventana de la UI maneje algunos eventos', 'Agregar controladores de caso de uso', 'Diseñarlo para que delegue en otros objetos', 'Distribuir la información en otros objetos'], a: 0, e: 'Eso violaría el corolario del patrón.' },
      ],
      sources: [{ title: 'UML y Patrones, 2ª ed.', ref: 'Larman, cap. 16, págs. 221-229', points: ['Controlador: fachada y caso de uso, saturación, capa de interfaz.'] }],
    },

    {
      id: 'polimorfismo-y-fabricacion-pura',
      module: 'm14',
      title: 'Polimorfismo y Fabricación Pura',
      keywords: 'polimorfismo alternativas según el tipo componentes conectables pluggable getImpuestos calculadores externos contraindicaciones futuras necesidades fabricación pura clase artificial AlmacenamientoPersistente descomposición de representación comportamiento',
      tldr: '<mark>Polimorfismo</mark>: cuando el comportamiento varía según el tipo, asignarlo con <strong>operaciones polimórficas</strong> a las clases para las que varía (no preguntes “¿qué clase?”). <mark>Fabricación Pura</mark>: cuando el Experto lleva a mala cohesión o acoplamiento, asignar la responsabilidad a una <strong>clase inventada</strong> que no está en el dominio, como AlmacenamientoPersistente.',
      goals: ['Enunciar y aplicar Polimorfismo.', 'Conocer su contraindicación.', 'Enunciar Fabricación Pura y aplicarla a la persistencia.', 'Distinguir descomposición de la representación y del comportamiento.'],
      body: `
        <h2>Polimorfismo</h2>
        ${table(['Problema', 'Solución'], [['¿Cómo manejar las alternativas basadas en el tipo? ¿Cómo crear componentes de software conectables (pluggable)?', 'Cuando los comportamientos relacionados varían según el tipo (clase), asignar la responsabilidad del comportamiento —con <strong>operaciones polimórficas</strong>— a los tipos para los que varía.']])}
        <p>Polimorfismo es dar el <strong>mismo nombre</strong> a servicios de distintos objetos cuando son parecidos o están relacionados. <strong>Ejemplo</strong>: el PDV debe integrarse con distintos sistemas externos de cálculo de impuestos, cada uno con una interfaz distinta pero comportamiento parecido. ¿Quién maneja esas interfaces? Como el comportamiento varía según el tipo de calculador, se implementa una operación polimórfica <code>getImpuestos</code> en distintos adaptadores.</p>
        ${polimorfismo}
        <ul>
          <li>Es el principio para organizar el sistema frente a <strong>variaciones similares</strong>: un diseño así se extiende fácilmente a nuevas variaciones.</li>
          <li><strong>Beneficios</strong>: se añaden fácilmente las extensiones necesarias; se introducen nuevas implementaciones sin afectar a los clientes.</li>
          <li><strong>Contraindicación</strong>: diseñar interfaces y polimorfismo para “futuras necesidades” que quizás no lleguen: esfuerzo innecesario. Hay que ser realista sobre la probabilidad de la variación.</li>
          <li>También conocido como: <em>Elección del mensaje</em>, <em>No preguntes “¿qué clase?”</em> (en vez de un <code>if (tipo == ...)</code>, se envía el mismo mensaje y cada clase responde a su manera).</li>
          <li>Relacionados: Variaciones Protegidas; GoF Adaptador, Command, Composite, Proxy, Estado y Estrategia.</li>
        </ul>

        <h2>Fabricación Pura</h2>
        ${table(['Problema', 'Solución'], [['¿Qué objeto debería tener la responsabilidad cuando las soluciones del Experto no son adecuadas, sin violar Alta Cohesión y Bajo Acoplamiento?', 'Asignar un conjunto de responsabilidades altamente cohesivo a una <strong>clase artificial o de conveniencia</strong> que no representa un concepto del dominio: algo inventado para soportar alta cohesión, bajo acoplamiento y reutilización.']])}
        <p>Es una “fabricación de la imaginación”, y como sus responsabilidades son cohesivas y desacopladas, su diseño es muy limpio: <strong>pura</strong>. Larman bromea que se construye “cuando estamos desesperados”.</p>
        <h3>Ejemplo: guardar la Venta en una base de datos</h3>
        <p>El Experto diría que Venta, porque tiene los datos. Pero:</p>
        <ul>
          <li>la tarea requiere muchas operaciones de base de datos ajenas al concepto de Venta: <strong>baja la cohesión</strong>;</li>
          <li>Venta se acopla a la interfaz de la base de datos (no a otro objeto del dominio): <strong>sube el acoplamiento</strong>;</li>
          <li>guardar objetos es una tarea general que muchas clases necesitan: <strong>poca reutilización y mucha duplicación</strong>.</li>
        </ul>
        <p>Solución: crear <strong>AlmacenamientoPersistente</strong>. No figura en el modelo del dominio: si le preguntás a alguien del negocio “¿trabaja con objetos en almacenamiento persistente?”, no te entendería. Fue creado para facilitarle las cosas al desarrollador.</p>
        ${fp}
        <p>Resultado: Venta sigue con alta cohesión y bajo acoplamiento; AlmacenamientoPersistente es cohesiva (su único objetivo es guardar objetos) y es <strong>genérica y reutilizable</strong>.</p>
        <h3>Representación vs. comportamiento</h3>
        <p>El diseño de objetos se divide en dos grupos: los elegidos por <strong>descomposición de la representación</strong> (la clase representa una cosa del dominio, como Venta: la estrategia común) y los elegidos por <strong>descomposición del comportamiento</strong> (agrupan comportamiento o algoritmos sin un concepto del dominio detrás). Las Fabricaciones Puras suelen ser de este segundo tipo: objetos centrados en una función. No está mal identificarlas así.</p>
        ${note('<strong>Contraindicación</strong> de Fabricación Pura: abusar de la descomposición del comportamiento y terminar convirtiendo cada función en un objeto. Y recordá: <strong>todos los patrones GoF</strong> (Adaptador, Command, Estrategia, etc.) <strong>son Fabricaciones Puras</strong>; el controlador de caso de uso también.', 'exam')}
        <p>Beneficios: soporta Alta Cohesión y aumenta la reutilización. Relacionados: Bajo Acoplamiento, Alta Cohesión; una Fabricación Pura suele asumir responsabilidades que el Experto le habría dado a una clase del dominio.</p>
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿Clase del dominio o Fabricación Pura?',
        buckets: ['Clase del dominio (representación)', 'Fabricación Pura (comportamiento)'],
        items: [
          { t: 'Venta', b: 0 },
          { t: 'AlmacenamientoPersistente', b: 1 },
          { t: 'EspecificacionDelProducto', b: 0 },
          { t: 'ProcesarVentaManejador', b: 1, why: 'El controlador de caso de uso es una construcción artificial.' },
          { t: 'FactoriaDeServicios', b: 1 },
          { t: 'Socio', b: 0 },
          { t: 'AdaptadorTaxMaster', b: 1 },
        ],
      }],
      quiz: [
        { q: '¿Qué problema resuelve Polimorfismo?', o: ['Alternativas según el tipo y componentes conectables', 'Quién debe crear las instancias de una clase', 'Cómo guardar los objetos en una base de datos', 'Quién debe manejar los eventos del sistema'], a: 0, e: 'Se usan operaciones polimórficas en los tipos para los que varía el comportamiento.' },
        { q: '¿Qué otro nombre tiene el Polimorfismo según Larman?', o: ['No preguntes “¿qué clase?”', 'No hables con extraños', 'Hacerlo yo mismo', 'Abierto-cerrado'], a: 0, e: 'También “Elección del mensaje”.' },
        { q: '¿Cuál es la contraindicación del Polimorfismo?', o: ['Preparar variaciones futuras improbables', 'Que siempre aumenta el acoplamiento', 'Que siempre baja la cohesión', 'Que impide agregar implementaciones'], a: 0, e: 'Hay que ser realista sobre la probabilidad de la variación.' },
        { q: '¿Cuándo se aplica Fabricación Pura?', o: ['Cuando el Experto daña cohesión o acoplamiento', 'Siempre que se crea un objeto nuevo', 'Cuando la clase existe en el dominio', 'Solo para diseñar controladores'], a: 0, e: 'Se inventa una clase que no está en el dominio.' },
        { q: '¿Por qué Venta no debería guardarse a sí misma en la base de datos?', o: ['Perdería cohesión, se acoplaría a la base y se duplicaría lógica', 'Porque Venta no tiene los datos que hay que guardar', 'Porque guardar objetos viola el patrón Creador', 'Porque Venta es una interfaz y no puede tener métodos'], a: 0, e: 'Por eso se crea AlmacenamientoPersistente.' },
        { q: '¿AlmacenamientoPersistente figura en el modelo del dominio?', o: ['No: es un invento del diseñador', 'Sí, como concepto del negocio', 'Sí, como actor', 'Solo en el SAD'], a: 0, e: 'Alguien del negocio no entendería qué es.' },
        { q: 'Las fabricaciones puras suelen surgir de una descomposición...', o: ['Del comportamiento', 'De la representación', 'Del dominio', 'De los datos'], a: 0, e: 'Agrupan funcionalidad relacionada, no conceptos del mundo real.' },
        { q: '¿Qué afirmación es correcta?', o: ['Todos los patrones GoF son Fabricaciones Puras', 'Ningún patrón GoF es una Fabricación Pura', 'Solo el Singleton es una Fabricación Pura', 'Las Fabricaciones Puras son clases del dominio'], a: 0, e: 'Adaptador, Command, Estrategia, Factoría... son inventos del diseñador.' },
      ],
      sources: [{ title: 'UML y Patrones, 2ª ed.', ref: 'Larman, cap. 22, págs. 306-311', points: ['Polimorfismo con el ejemplo de los calculadores de impuestos.', 'Fabricación Pura con AlmacenamientoPersistente.'] }],
    },

    {
      id: 'indireccion-y-variaciones-protegidas',
      module: 'm14',
      title: 'Indirección y Variaciones Protegidas',
      keywords: 'indirección objeto intermedio desacoplar intermediario variaciones protegidas puntos de variación inestabilidad interfaz estable no hables con extraños Ley de Demeter diseños dirigidos por los datos búsqueda de servicios ocultación de información abierto cerrado puntos calientes',
      tldr: '<mark>Indirección</mark>: poner un <strong>objeto intermedio</strong> que medie entre otros para que no se acoplen directamente. <mark>Variaciones Protegidas</mark>: identificar los <strong>puntos de variación o inestabilidad</strong> y crear una <strong>interfaz estable</strong> a su alrededor. VP es el principio detrás de casi todos los patrones; “No hables con extraños” es un caso particular.',
      goals: ['Enunciar Indirección y dar ejemplos.', 'Enunciar Variaciones Protegidas.', 'Explicar “No hables con extraños”.', 'Juzgar cuándo vale la pena proteger contra variaciones.'],
      body: `
        <h2>Indirección</h2>
        ${table(['Problema', 'Solución'], [['¿Dónde asignar una responsabilidad para evitar el acoplamiento directo entre dos o más cosas? ¿Cómo desacoplar objetos para soportar bajo acoplamiento y mantener alto el potencial de reutilización?', 'Asignar la responsabilidad a un <strong>objeto intermedio</strong> que medie entre otros componentes o servicios, de manera que no se acoplen directamente. El intermediario crea una indirección.']])}
        <ul>
          <li><strong>Ejemplos</strong>: AlmacenamientoPersistente es intermediario entre Venta y la base de datos; los adaptadores de impuestos, entre el PDV y los sistemas externos.</li>
          <li>Así como muchos patrones son especializaciones de Fabricación Pura, muchos son especializaciones de Indirección: <strong>Adaptador, Fachada, Observador</strong>, Puente, Mediador. Y muchas Fabricaciones Puras se generan por Indirección.</li>
          <li>Motivo: <strong>Bajo Acoplamiento</strong>. Beneficio: disminuir el acoplamiento entre componentes.</li>
        </ul>
        ${note('“La mayoría de los problemas en informática se pueden resolver mediante otro nivel de indirección” es un viejo dicho que Larman cita. Él mismo recuerda el dicho contrario: “¡la mayoría de los problemas en ejecución se pueden resolver eliminando alguna capa de indirección!”.', 'tip')}

        <h2>Variaciones Protegidas</h2>
        ${table(['Problema', 'Solución'], [['¿Cómo diseñar objetos, subsistemas y sistemas para que las variaciones o inestabilidades en ellos no tengan un impacto no deseable en otros elementos?', 'Identificar los puntos de <strong>variación prevista o de inestabilidad</strong> y asignar responsabilidades para crear una <strong>interfaz estable</strong> alrededor de ellos.']])}
        <p><strong>Ejemplo</strong>: el problema del calculador de impuestos. El punto de variación son las distintas APIs de los calculadores externos, existentes y futuros. Agregando un nivel de <strong>indirección</strong>, una <strong>interfaz</strong> y <strong>polimorfismo</strong> con varias implementaciones de IAdaptadorCalculadorDeImpuestos, el sistema queda protegido: los objetos internos colaboran con una interfaz estable y los adaptadores ocultan las variaciones externas.</p>
        ${fig(U.svg(600, 170, `${U.obj(10, 60, 90, ':Venta', { cls: 'k-a' })}${U.ln([[100, 73], [200, 73]])}<text x="150" y="64" class="u-msgt u-c">getImpuestos()</text>
          ${U.blk(200, 30, 170, 86, '', { cls: 'k-if' })}<text x="285" y="58" class="u-c u-sans u-b t-if">interfaz estable</text><text x="285" y="78" class="u-c u-sm">IAdaptadorCalculador</text><text x="285" y="92" class="u-c u-sm">Impuestos</text>
          ${['TaxMaster API', 'TaxPro API', 'AFIP WS'].map((t, i) => U.blk(450, 10 + i * 52, 140, 40, t, { cls: 'k-warn', bold: false })).join('')}
          ${[0, 1, 2].map((i) => U.ln([[370, 73], [450, 30 + i * 52]], { end: 'ar', dash: true })).join('')}<text x="520" y="166" class="u-c u-sm">puntos de variación</text>`, 'Venta usa una interfaz estable que oculta tres APIs externas variables'), 'Variaciones Protegidas: Venta solo conoce la interfaz estable; si cambia una API externa o aparece otra, cambia un adaptador y nada más.')}
        <h3>Mecanismos de VP</h3>
        <ul>
          <li>Es el principio fundamental que motiva la mayoría de los mecanismos y patrones: <strong>Polimorfismo, Indirección, encapsulación de datos, interfaces, la mayoría de los GoF</strong>.</li>
          <li><strong>Diseños dirigidos por los datos</strong>: leer códigos, valores o nombres de clases desde una fuente externa para cambiar el comportamiento en tiempo de ejecución; la variante se registra afuera, se lee y se razona sobre ella.</li>
          <li><strong>Búsqueda de servicios</strong>: proteger a los clientes de variaciones en la ubicación de los servicios con una interfaz estable de búsqueda.</li>
          <li>Es lo mismo que los principios más antiguos de <strong>ocultación de la información</strong> y <strong>abierto-cerrado</strong>, y los “puntos calientes”.</li>
        </ul>
        <h3>“No hables con extraños”</h3>
        <p>No crear diseños que envían mensajes a objetos <strong>distantes o indirectos</strong> (extraños): esos diseños son frágiles frente a los cambios en la estructura de los objetos, que es un punto de inestabilidad frecuente. Un cliente debe hablar con sus <strong>conocidos</strong> (objetos directos) y evitar hablar con extraños. Por ejemplo, el Registro no debería hacer <code>venta.getPago().getCambio()</code>, sino pedirle a la Venta lo que necesita: <code>venta.getCambio()</code>. Pero no siempre hace falta: depende de qué tan inestable sea la estructura.</p>
        ${table(['Nivel del diseñador', 'Tendencia'], [['Sin experiencia', 'Diseños frágiles.'], ['Intermedio', 'Diseños excesivamente flexibles y generalizados, de formas que nunca se usan.'], ['Experto', 'Elige con perspicacia: a veces un diseño simple y frágil, buscando el equilibrio entre el <strong>costo del cambio y su probabilidad</strong>.']])}
        <p><strong>Beneficios</strong>: se añaden fácilmente nuevas variaciones; se introducen implementaciones sin afectar a los clientes; se reduce el acoplamiento; baja el impacto y el costo de los cambios. Si la necesidad de flexibilidad es realista, se aplica VP; si la reutilización futura es muy improbable, no.</p>
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿Qué patrón GRASP explica mejor cada decisión?',
        buckets: ['Controlador', 'Polimorfismo', 'Fabricación Pura', 'Indirección', 'Variaciones Protegidas'],
        items: [
          { t: 'Crear una clase GeneradorDePDF que no existe en el dominio para no ensuciar a Factura.', b: 2 },
          { t: 'Cada tipo de envío implementa su propio calcularCosto() en vez de un switch por tipo.', b: 1 },
          { t: 'Poner un intermediario entre la aplicación y el servicio de mensajería para no acoplarlos.', b: 3 },
          { t: 'Envolver con una interfaz estable las APIs de pago que cambian seguido.', b: 4 },
          { t: 'GestionarTurnosSesion recibe todos los eventos del caso de uso Gestionar turnos.', b: 0 },
          { t: 'El Registro pide venta.getCambio() en vez de venta.getPago().getCambio().', b: 4, why: '“No hables con extraños” es un caso de Variaciones Protegidas.' },
        ],
      }],
      quiz: [
        { q: '¿Qué propone el patrón Indirección?', o: ['Un objeto intermedio para que otros no se acoplen directo', 'Asignar la responsabilidad al experto en información', 'Crear una interfaz para cada clase del sistema', 'Eliminar intermediarios para ganar rendimiento'], a: 0, e: 'Su motivo es el bajo acoplamiento.' },
        { q: '¿Qué patrones GoF son especializaciones de Indirección?', o: ['Adaptador, Fachada y Observador', 'Singleton y Factoría', 'Composite y Estrategia', 'Ninguno'], a: 0, e: 'También Puente y Mediador.' },
        { q: '¿Qué dice Variaciones Protegidas?', o: ['Interfaz estable alrededor de lo que varía', 'Evitar todo cambio en el sistema', 'Usar herencia en lugar de interfaces', 'Duplicar los componentes inestables'], a: 0, e: 'Así las variaciones no afectan a otros elementos.' },
        { q: '¿Qué principios más antiguos equivalen a Variaciones Protegidas?', o: ['Ocultación de la información y abierto-cerrado', 'Alta cohesión y bajo acoplamiento', 'Experto y Creador', 'DRY y KISS'], a: 0, e: 'También se habla de “puntos calientes”.' },
        { q: '¿Qué significa “No hables con extraños”?', o: ['Enviar mensajes solo a objetos directos, no a indirectos', 'No comunicarse nunca con sistemas externos al propio', 'Que las clases no deben tener métodos públicos', 'Que los usuarios no deben ver el código fuente'], a: 0, e: 'Los diseños que hablan con extraños son frágiles ante cambios de estructura.' },
        { q: 'Según Larman, ¿qué tienden a hacer los desarrolladores de nivel intermedio?', o: ['Diseños sobregeneralizados', 'Diseños frágiles', 'Diseños equilibrados', 'No usar patrones'], a: 0, e: 'Los expertos equilibran costo del cambio y probabilidad.' },
        { q: 'Leer de un archivo de configuración qué clase de estrategia instanciar es un ejemplo de...', o: ['Diseño dirigido por datos (VP)', 'Fabricación Pura', 'Controlador de caso de uso', 'Bajo acoplamiento extremo'], a: 0, e: 'La variante se registra afuera y se lee en tiempo de ejecución.' },
        { q: 'En el problema de los calculadores de impuestos, ¿qué combinación protege al sistema?', o: ['Indirección, interfaz y polimorfismo', 'Un único if por cada calculador', 'Herencia múltiple entre calculadores', 'Un Singleton por cada calculador'], a: 0, e: 'Es VP aplicado con Polimorfismo e Indirección.' },
      ],
      sources: [{ title: 'UML y Patrones, 2ª ed.', ref: 'Larman, cap. 22, págs. 312-320', points: ['Indirección y Variaciones Protegidas; No hables con extraños; mecanismos de VP.'] }],
    },
  );
})();
