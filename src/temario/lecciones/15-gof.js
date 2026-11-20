/* Unidad V, clase 18: patrones GoF Adaptador, Factoría, Singleton, Fachada, Estrategia y Composite. Diapositivas 18, Larman 2ª ed. cap. 23, págs. 322-348. */
(() => {
  const { LESSONS, h } = window.GUIDE;
  const { note, table, fig, lab, uml: U, esc } = h;
  const code = (c) => `<pre class="code" data-lang="java">${esc(c.trim())}</pre>`;

  const adaptador = fig(U.svg(620, 250, `
    ${U.box(190, 10, 240, 'IAdaptadorCalculadorImpuestos', { stereo: 'interface', ops: ['getImpuestos(Venta): List<LineaImpuesto>'], cls: 'k-if' })}
    ${U.box(30, 120, 210, 'AdaptadorTaxMaster', { ops: ['getImpuestos(Venta)'] })}${U.box(380, 120, 210, 'AdaptadorGoodAsGoldTaxPro', { ops: ['getImpuestos(Venta)'] })}
    ${U.ln([[310, 82], [310, 98]], { end: 'tri' })}${U.ln([[135, 120], [135, 98], [485, 98], [485, 120]], { dash: true })}
    ${U.blk(40, 196, 190, 44, 'Sistema TaxMaster\n(API propia)', { cls: 'k-warn', bold: false })}${U.blk(390, 196, 190, 44, 'GoodAsGoldTaxPro\n(API propia)', { cls: 'k-warn', bold: false })}
    ${U.ln([[135, 170], [135, 196]], { end: 'ar', dash: true })}${U.ln([[485, 170], [485, 196]], { end: 'ar', dash: true })}
    <text x="320" y="226" class="u-c u-sm">los adaptadores traducen a cada API externa</text>`,
    'Patrón Adaptador: una interfaz común y dos adaptadores a calculadores de impuestos externos'),
    'Adaptador (Larman, figura 23.1). Cada adaptador convierte la interfaz original de un sistema externo en la interfaz consistente que usa la aplicación. Es Variaciones Protegidas con Indirección, interfaces y Polimorfismo.');

  const factoria = fig(U.svg(560, 170, `
    ${U.box(20, 20, 300, 'FactoriaDeServicios', { attrs: ['adaptadorCalculadorImpuestos', 'adaptadorSistemaInventario'], ops: ['getAdaptadorCalculadorImpuestos(): IAdaptadorCalc...', 'getAdaptadorSistemaInventario(): IAdaptadorInv...'], cls: 'k-x' })}
    <text x="340" y="50" class="u-sm">• Fabricación Pura que se encarga</text><text x="340" y="66" class="u-sm">  de la creación compleja</text><text x="340" y="90" class="u-sm">• lee el nombre de la clase de una</text><text x="340" y="106" class="u-sm">  propiedad externa (dirigido por datos)</text><text x="340" y="130" class="u-sm">• devuelve el tipo de la interfaz</text>`,
    'Clase FactoriaDeServicios con métodos que devuelven adaptadores'),
    'Factoría concreta (Larman, figura 23.4): separa la creación compleja en un objeto de apoyo cohesivo y oculta esa lógica.');

  const fachada = fig(U.svg(600, 220, `
    ${U.obj(10, 30, 90, ':Registro', { cls: 'k-a' })}${U.ln([[100, 43], [210, 43]])}<text x="155" y="34" class="u-msgt u-c">esInvalido(lv, v)</text>
    ${U.blk(210, 10, 380, 200, '', { lyr: true })}<text x="226" y="28" class="u-sans u-b">Subsistema motor de reglas</text>
    ${U.box(220, 32, 170, 'FachadaMotorDeReglas', { stereo: 'singleton', h: 42, cls: 'k-x' })}
    ${['Regla1', 'Regla2', 'EvaluadorDeReglas'].map((t, i) => U.box(250 + i * 110, 130, 100, t, { h: 30 })).join('')}
    ${[0, 1, 2].map((i) => U.ln([[305, 74], [300 + i * 110, 130]], { dash: true })).join('')}<text x="420" y="196" class="u-c u-sm">detalles ocultos detrás de la fachada</text>`,
    'Patrón Fachada: el Registro solo conoce la fachada singleton del motor de reglas'),
    'Fachada (Larman, figura 23.21): un único punto de entrada a un subsistema. El cliente solo ve <code>FachadaMotorDeReglas</code>; las reglas pueden cambiar sin afectarlo. Suele accederse con Singleton.');

  const estrategia = fig(U.svg(620, 230, `
    ${U.box(10, 20, 140, 'Venta', { attrs: ['fecha'], ops: ['getTotal()'], cls: 'k-a' })}
    ${U.box(250, 10, 240, 'IEstrategiaFijarPreciosVenta', { stereo: 'interface', ops: ['getTotal(Venta): Dinero'], cls: 'k-if' })}
    ${U.ln([[150, 50], [250, 50]], { end: 'op' })}<text x="200" y="42" class="u-c u-sm">estrategia</text>
    ${[['PorcentajeDescuento', 'porcentaje: float'], ['DescuentoAbsoluto\nSobreUmbral', 'descuento, umbral'], ['???', '...']].map(([t, a], i) => U.box(170 + i * 150, 140, 140, t.split('\n')[0], { attrs: [a], ops: ['getTotal(Venta)'] })).join('')}
    ${U.ln([[370, 82], [370, 120]], { end: 'tri' })}${U.ln([[240, 140], [240, 120], [540, 120], [540, 140]], { dash: true })}${U.ln([[390, 120], [390, 140]], { dash: true })}
    <text x="80" y="140" class="u-c u-sm">getTotal() {</text><text x="80" y="154" class="u-c u-sm">return estrategia</text><text x="80" y="168" class="u-c u-sm">.getTotal(this) }</text>`,
    'Patrón Estrategia: Venta delega el cálculo del total en una estrategia de fijación de precios intercambiable'),
    'Estrategia (Larman, figuras 23.8 y 23.10). Cada política de precios es una clase con la misma interfaz. Venta (el <strong>objeto de contexto</strong>) tiene visibilidad de atributo de su estrategia y le pasa <code>this</code>, para que la estrategia tenga visibilidad de parámetro de la venta.');

  const composite = fig(U.svg(620, 280, `
    ${U.box(200, 10, 230, 'IEstrategiaFijarPreciosVenta', { stereo: 'interface', ops: ['getTotal(Venta): Dinero'], cls: 'k-if' })}
    ${U.box(10, 130, 170, 'PorcentajeDescuento', { ops: ['getTotal(Venta)'] })}${U.box(200, 130, 170, 'DescuentoAbsoluto…', { ops: ['getTotal(Venta)'] })}
    ${U.box(400, 120, 210, 'EstrategiaCompuestaFijarPrecios', { attrs: ['estrategiasFijarPrecios'], ops: ['añadir(IEstrategia...)', 'getTotal(Venta)'], cls: 'k-x', italic: true })}
    ${U.ln([[315, 82], [315, 104]], { end: 'tri' })}${U.ln([[95, 130], [95, 104], [505, 104], [505, 120]], { dash: true })}${U.ln([[285, 104], [285, 130]], { dash: true })}
    ${U.ln([[610, 160], [612, 160], [612, 46], [430, 46]], { end: 'op', start: 'diao' })}<text x="560" y="40" class="u-sm">1..*</text>
    ${U.box(350, 230, 120, '…ParaElCliente', { h: 40 })}${U.box(480, 230, 130, '…ParaLaTienda', { h: 40 })}
    ${U.ln([[505, 204], [505, 216]], { end: 'tri' })}${U.ln([[410, 230], [410, 216], [545, 216], [545, 230]])}`,
    'Patrón Composite: estrategia compuesta que contiene una lista de estrategias e implementa la misma interfaz'),
    'Composite (Larman, figura 23.13). La estrategia compuesta <strong>implementa la misma interfaz</strong> que las atómicas y <strong>contiene una lista</strong> de ellas. Venta no sabe si su estrategia es atómica o compuesta. LoMejorParaElCliente devuelve el menor de los totales.');

  LESSONS.push(
    {
      id: 'adaptador-y-factoria',
      module: 'm15',
      title: 'Patrones GoF: Adaptador y Factoría',
      keywords: 'GoF Gang of Four pandilla de los cuatro 23 patrones Design Patterns adaptador adapter interfaces incompatibles interfaz estable LineaDeImpuesto descubrimiento incremental separación de intereses factoría factoría concreta creación compleja FactoriaDeServicios',
      tldr: 'Los patrones <mark>GoF</mark> son 23 patrones del libro <em>Design Patterns</em>, de cuatro autores. <strong>Adaptador</strong>: convertir la interfaz de un componente en otra mediante un objeto adaptador intermedio. <strong>Factoría</strong>: una Fabricación Pura que se encarga de la <strong>creación compleja</strong>, para no ensuciar a los objetos del dominio.',
      goals: ['Saber qué son los patrones GoF.', 'Enunciar Adaptador y relacionarlo con los GRASP.', 'Explicar por qué no conviene que un objeto del dominio cree los adaptadores.', 'Enunciar Factoría y sus ventajas.'],
      body: `
        <h2>Los patrones GoF</h2>
        <p>Los patrones de la <strong>“Pandilla de los Cuatro”</strong> (Gang of Four) son <strong>23 patrones</strong> útiles para el diseño de objetos, del libro <em>Design Patterns</em> de Gamma, Helm, Johnson y Vlissides. Larman los muestra como especializaciones de los principios GRASP.</p>

        <h2>Adaptador (Adapter)</h2>
        ${table(['Contexto / Problema', 'Solución'], [['¿Cómo resolver interfaces incompatibles, o proporcionar una interfaz estable para componentes parecidos con diferentes interfaces?', 'Convertir la interfaz original de un componente en otra interfaz, mediante un <strong>objeto adaptador intermedio</strong>.']])}
        <p>El PDV debe soportar servicios externos de terceros: calculadores de impuestos, autorización de pagos, inventario, contabilidad. Cada uno tiene una API distinta que no se puede cambiar. Solución: agregar un nivel de indirección con objetos que adapten las interfaces externas a una interfaz consistente.</p>
        ${adaptador}
        <ul>
          <li>Es una especialización de los GRASP: <strong>Variaciones Protegidas, con Indirección que aplica interfaces y Polimorfismo</strong>.</li>
          <li><code>getImpuestos</code> devuelve una lista de <strong>LineaDeImpuesto</strong> (nacional, provincial, municipal...). Además de clase de software es un concepto del dominio descubierto durante el diseño: <strong>descubrimiento incremental</strong>. Conviene reflejarlo en el modelo del dominio o el glosario.</li>
          <li>Relacionado: un adaptador que oculta un sistema externo también puede considerarse una <strong>Fachada</strong>.</li>
        </ul>

        <h2>¿Quién crea los adaptadores? Factoría</h2>
        <p>Principio fundamental de arquitectura: <strong>mantener la separación de intereses</strong> (separation of concerns), dividiendo en módulos con propósito cohesivo. La capa del dominio se ocupa de la lógica de la aplicación; otro grupo de objetos, de la conectividad con sistemas externos. Elegir un objeto del dominio (como el Registro) para crear adaptadores va <strong>en contra</strong> de esa separación y baja su cohesión.</p>
        ${table(['Contexto / Problema', 'Solución'], [['¿Quién debe ser el responsable de crear objetos cuando hay consideraciones especiales, como una lógica de creación compleja, o el deseo de separar las responsabilidades de creación para mejorar la cohesión?', 'Crear un objeto <strong>Fabricación Pura</strong> denominado <strong>Factoría</strong> que maneje la creación.']])}
        ${factoria}
        <p>Ventajas: <strong>separa</strong> la responsabilidad de la creación compleja en objetos de apoyo (helper) cohesivos y <strong>oculta</strong> la lógica de creación potencialmente compleja. Larman lee el nombre de la clase adaptadora de una <strong>propiedad del sistema</strong> y la instancia por reflexión: un diseño dirigido por los datos que cambia el adaptador sin tocar el código.</p>
        ${code(`
public IAdaptadorCalculadorImpuestos getAdaptadorCalculadorImpuestos() {
    if (adaptadorCalculadorImpuestos == null) {
        // diseño dirigido por los datos: la clase se lee de una propiedad externa
        String nombreClase = System.getProperty("calculadorimpuestos.class.name");
        adaptadorCalculadorImpuestos = (IAdaptadorCalculadorImpuestos) Class.forName(nombreClase).newInstance();
    }
    return adaptadorCalculadorImpuestos;
}`)}
        ${note('A las factorías se suele acceder con el patrón <strong>Singleton</strong> (próxima lección).', 'tip')}
      `,
      quiz: [
        { q: '¿De dónde provienen los patrones GoF?', o: ['Del libro Design Patterns, de cuatro autores', 'Del libro UML y Patrones de Craig Larman', 'De los principios del Manifiesto Ágil', 'De la especificación oficial de UML'], a: 0, e: 'Son 23 patrones de la “Pandilla de los Cuatro”.' },
        { q: '¿Qué problema resuelve el Adaptador?', o: ['Interfaces incompatibles o distintas para componentes parecidos', 'La creación compleja de objetos que no conviene dejar en el dominio', 'El acceso global a una única instancia de una clase del sistema', 'Tratar igual a los objetos compuestos y a los objetos atómicos'], a: 0, e: 'Convierte la interfaz de un componente en otra mediante un adaptador.' },
        { q: '¿De qué patrones GRASP es especialización el Adaptador?', o: ['VP con Indirección y Polimorfismo', 'Experto y Creador combinados', 'Controlador y Alta Cohesión', 'Solamente Bajo Acoplamiento'], a: 0, e: 'Lo dice Larman en el capítulo 23.' },
        { q: '¿Por qué no conviene que el Registro cree los adaptadores?', o: ['Viola la separación de intereses y baja su cohesión', 'Porque el Registro no conoce a los sistemas externos', 'Porque crear adaptadores viola el patrón Experto', 'Porque los adaptadores deben ser siempre singletons'], a: 0, e: 'La conectividad con sistemas externos es otro interés.' },
        { q: '¿Qué es una Factoría?', o: ['Una Fabricación Pura que maneja la creación compleja de objetos', 'Una clase del dominio que crea lo que contiene', 'Una interfaz de creación', 'Un controlador de casos de uso'], a: 0, e: 'Separa y oculta la lógica de creación.' },
        { q: 'LineaDeImpuesto se descubrió durante el diseño. ¿Qué conviene hacer?', o: ['Reflejarla en el modelo del dominio o el glosario', 'Ignorarla en el dominio porque es una clase de software', 'Eliminarla y calcular los impuestos en la Venta', 'Convertirla en el controlador del cálculo de impuestos'], a: 0, e: 'Es normal descubrir conceptos del dominio al diseñar o programar.' },
        { q: '¿Qué ventaja tiene leer el nombre de la clase del adaptador de una propiedad externa?', o: ['Cambiar de adaptador sin tocar el código', 'Que la creación del adaptador sea más rápida', 'Que ya no haga falta declarar la interfaz', 'Que se cree un adaptador nuevo en cada llamada'], a: 0, e: 'Es un mecanismo de Variaciones Protegidas.' },
      ],
      sources: [{ title: 'UML y Patrones, 2ª ed.', ref: 'Larman, cap. 23, págs. 322-328', points: ['Adaptador, descubrimiento incremental y Factoría.'] }],
    },

    {
      id: 'singleton-y-fachada',
      module: 'm15',
      title: 'Patrones GoF: Singleton y Fachada',
      keywords: 'singleton única instancia punto de acceso global método estático getInstancia visibilidad fachada facade punto de entrada único subsistema motor de reglas vale regalo reglas conectables variaciones protegidas',
      tldr: '<strong>Singleton</strong>: si una clase admite <mark>una sola instancia</mark> y los objetos necesitan un <strong>único punto de acceso global</strong>, definir un método estático que la devuelva. <strong>Fachada</strong>: dar <mark>un único punto de entrada</mark> a un subsistema con un objeto que lo envuelva. Se suelen combinar.',
      goals: ['Enunciar Singleton y el problema de visibilidad que resuelve.', 'Escribir un Singleton.', 'Enunciar Fachada con el ejemplo del motor de reglas.', 'Diferenciar Fachada y Adaptador.'],
      body: `
        <h2>Singleton</h2>
        <p>Si solo hace falta <strong>una instancia</strong> de la Factoría y sus métodos se invocan desde muchos lugares del código, aparece un <strong>problema de visibilidad</strong>: ¿cómo llegar a esa instancia única? Pasarla como parámetro a todos lados es posible pero no conviene.</p>
        ${table(['Contexto / Problema', 'Solución'], [['Se admite exactamente <strong>una instancia</strong> de una clase: es un “singleton”. Los objetos necesitan un <strong>único punto de acceso global</strong>.', 'Definir un <strong>método estático</strong> de la clase que devuelva el singleton.']])}
        <p>La idea clave es que la clase es pública: como la visibilidad de las clases públicas tiene alcance global, desde cualquier método de cualquier clase se obtiene visibilidad a la instancia única y se le envía un mensaje. En UML se marca con «singleton» o un 1 en la esquina, y el mensaje <code>getInstancia()</code> suele quedar implícito.</p>
        ${code(`
public class FactoriaDeServicios {
    private static FactoriaDeServicios instancia;   // la única instancia

    public static synchronized FactoriaDeServicios getInstancia() {
        if (instancia == null) instancia = new FactoriaDeServicios();   // inicialización perezosa
        return instancia;
    }
}

// desde cualquier lugar del código:
IAdaptadorCalculadorImpuestos calc = FactoriaDeServicios.getInstancia().getAdaptadorCalculadorImpuestos();`)}
        <p>Se suele usar con objetos <strong>Factoría</strong> y <strong>Fachada</strong>.</p>

        <h2>Fachada (Facade)</h2>
        <p>Problema de Larman: al crear una venta se sabe que se pagará con un <strong>vale-regalo</strong>, y la tienda tiene una regla: con vale-regalo solo se puede comprar <strong>un único artículo</strong> (se invalidan los introducirArticulo posteriores), y no se devuelve dinero en efectivo ni como crédito, solo otro vale. Queremos un diseño que afecte poco al software existente, que separe este interés y que permita experimentar con distintas formas de representar, cargar y evaluar las reglas.</p>
        ${table(['Contexto / Problema', 'Solución'], [['Se requiere una interfaz común y unificada para un conjunto de implementaciones o interfaces dispares, como dentro de un subsistema.', 'Definir un <strong>único punto de conexión</strong> con el subsistema: un objeto <strong>Fachada</strong> que lo envuelva y presente una única interfaz, responsable de colaborar con sus componentes.']])}
        ${fachada}
        <ul>
          <li>La fachada es un objeto <strong>front-end</strong>: el único punto de entrada a los servicios del subsistema. Los clientes solo ven ese punto de acceso público.</li>
          <li>Se logra separación de intereses: todo el manejo de reglas queda delegado en otro subsistema. La Fachada evalúa las reglas contra una operación e indica si alguna la invalida.</li>
          <li>Proporciona <strong>Variaciones Protegidas</strong> frente a cambios en la implementación del subsistema, añadiendo un objeto de <strong>Indirección</strong> que mantiene Bajo Acoplamiento: los objetos externos se acoplan a un solo punto.</li>
          <li>Se usa ampliamente y se suele acceder a ella con <strong>Singleton</strong>.</li>
        </ul>
        ${note('Fachada vs. Adaptador: un Adaptador que envuelve un sistema externo es una especie de Fachada, pero su énfasis está en <strong>adaptar interfaces diferentes</strong> a una común; por eso se llama Adaptador. La Fachada pone el énfasis en <strong>un único punto de entrada</strong> a un subsistema.', 'exam')}
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿Qué patrón GoF corresponde?',
        buckets: ['Adaptador', 'Factoría', 'Singleton', 'Fachada'],
        items: [
          { t: 'Hay una sola configuración del sistema y todos deben accederla desde cualquier lugar.', b: 2 },
          { t: 'Hay que usar la API de MercadoPago y la de un banco, que son distintas, con una interfaz común.', b: 0 },
          { t: 'Crear el objeto correcto depende de leer un archivo de configuración.', b: 1 },
          { t: 'El módulo de facturación tiene 15 clases, pero los clientes solo deberían ver un punto de entrada.', b: 3 },
          { t: 'Envolver una biblioteca de PDF heredada para que responda a nuestra interfaz IGeneradorDocumentos.', b: 0 },
          { t: 'Separar del dominio la lógica compleja de construcción de los adaptadores.', b: 1 },
        ],
      }],
      quiz: [
        { q: '¿Qué problema resuelve el Singleton?', o: ['Una única instancia con acceso global', 'La creación de objetos complejos', 'La adaptación de interfaces incompatibles', 'El ocultamiento de un subsistema'], a: 0, e: 'Se resuelve con un método estático que devuelve la instancia.' },
        { q: '¿Qué alternativa al Singleton menciona Larman y desaconseja?', o: ['Pasar la instancia como parámetro a todos lados', 'Guardar la instancia en una variable local del método', 'Crear una instancia nueva cada vez que se necesite', 'Usar herencia para compartir la misma instancia'], a: 0, e: 'Es posible pero no conviene.' },
        { q: '¿Con qué objetos se suele usar Singleton?', o: ['Factoría y Fachada', 'Composite y Estrategia', 'Venta y Pago', 'Controladores de caso de uso'], a: 0, e: 'Suelen necesitar una única instancia accesible globalmente.' },
        { q: '¿Qué hace una Fachada?', o: ['Define un único punto de conexión con un subsistema', 'Convierte una interfaz en otra', 'Crea objetos', 'Trata igual a compuestos y atómicos'], a: 0, e: 'Es un objeto front-end del subsistema.' },
        { q: 'En el ejemplo del vale-regalo, ¿qué subsistema oculta la Fachada?', o: ['El motor de reglas', 'El calculador de impuestos', 'La base de datos', 'La interfaz de usuario'], a: 0, e: 'La fachada evalúa las reglas e indica si invalidan la operación.' },
        { q: '¿Qué patrones GRASP proporciona la Fachada?', o: ['Variaciones Protegidas e Indirección', 'Experto y Creador', 'Controlador y Polimorfismo', 'Solamente Alta Cohesión'], a: 0, e: 'Los objetos externos se acoplan a un solo punto.' },
        { q: '¿En qué se diferencia un Adaptador de una Fachada?', o: ['Adaptador: adaptar interfaces. Fachada: un punto de entrada', 'Son exactamente el mismo patrón con nombres distintos según el autor', 'La Fachada adapta interfaces y el Adaptador oculta subsistemas enteros', 'El Adaptador es siempre un Singleton y la Fachada nunca lo es'], a: 0, e: 'Un adaptador que oculta un sistema externo puede verse como una fachada.' },
      ],
      sources: [{ title: 'UML y Patrones, 2ª ed.', ref: 'Larman, cap. 23, págs. 328-331 y 346-348', points: ['Singleton y Fachada con el motor de reglas.'] }],
    },

    {
      id: 'estrategia-y-composite',
      module: 'm15',
      title: 'Patrones GoF: Estrategia y Composite',
      keywords: 'estrategia strategy algoritmos políticas fijación de precios descuento objeto de contexto this visibilidad de atributo de parámetro factoría de estrategias composite compuesto atómico misma interfaz lista políticas contradictorias lo mejor para el cliente',
      tldr: '<strong>Estrategia</strong>: definir cada algoritmo o política en una <mark>clase independiente con una interfaz común</mark>, para que se puedan intercambiar. <strong>Composite</strong>: que los objetos <mark>compuestos y atómicos implementen la misma interfaz</mark>, para tratarlos igual. Juntos resuelven políticas de precios múltiples y contradictorias.',
      goals: ['Enunciar Estrategia con el ejemplo de fijación de precios.', 'Explicar el objeto de contexto y las visibilidades involucradas.', 'Enunciar Composite y aplicarlo a estrategias en conflicto.', 'Relacionar ambos con Polimorfismo, Factoría y Variaciones Protegidas.'],
      body: `
        <h2>Estrategia (Strategy)</h2>
        <p>Problema: la lógica de fijación de precios es compleja y cambia: un día 10% de descuento en todas las ventas, otro día 10 € de descuento si la venta supera los 200 €, descuentos a personas mayores, etc. ¿Cómo diseñar esos algoritmos?</p>
        ${table(['Contexto / Problema', 'Solución'], [['¿Cómo diseñar diversos algoritmos o políticas que están relacionadas? ¿Cómo diseñar que esos algoritmos o políticas puedan cambiar?', 'Definir cada algoritmo, política o estrategia en una <strong>clase independiente, con una interfaz común</strong>.']])}
        ${estrategia}
        <ul>
          <li>Se crean varias clases EstrategiaFijarPreciosVenta, cada una con un método <strong>polimórfico</strong> <code>getTotal(Venta)</code>.</li>
          <li>El objeto estrategia se conecta a un <strong>objeto de contexto</strong> (al que se aplica el algoritmo): la Venta. Cuando la Venta recibe <code>getTotal()</code>, <strong>delega</strong> parte del trabajo en su estrategia.</li>
          <li>Es normal que el contexto pase una referencia a sí mismo (<code>this</code>): así la estrategia tiene <strong>visibilidad de parámetro</strong> de la venta. A su vez, la Venta necesita <strong>visibilidad de atributo</strong> de su estrategia, declarada en términos de la <strong>interfaz</strong>, no de una clase concreta.</li>
          <li>¿Quién crea la estrategia? Una <strong>FactoriaDeEstrategiasFijarPrecios</strong> (distinta de la de servicios, por Alta Cohesión), singleton, que lee de una propiedad externa qué clase instanciar: se puede cambiar la política en plena ejecución. Como la política cambia seguido, la factoría crea una estrategia nueva cada vez, y puede leer los porcentajes de un almacén de datos externo.</li>
        </ul>
        ${code(`
public class EstrategiaFijarPreciosPorcentajeDescuento implements IEstrategiaFijarPreciosVenta {
    private float porcentaje;
    public Dinero getTotal(Venta v) {
        return v.getTotalAntesDto().times(porcentaje);
    }
}

public class Venta {
    private IEstrategiaFijarPreciosVenta estrategiaFijarPrecios;   // visibilidad de atributo
    public Dinero getTotal() {
        return estrategiaFijarPrecios.getTotal(this);   // la estrategia recibe visibilidad de parámetro
    }
}`)}
        ${note('Estrategia se fundamenta en el <strong>Polimorfismo</strong> y las interfaces, y proporciona <strong>Variaciones Protegidas</strong> respecto de los algoritmos que cambian. Las estrategias normalmente se crean con una <strong>Factoría</strong>.', 'exam')}

        <h2>Composite</h2>
        <p>Nuevo problema: varias políticas a la vez y <strong>contradictorias</strong>. Un lunes: 20% a personas mayores; 15% a clientes preferentes en compras de más de 400 €; los lunes, 50% en compras de más de 500 €; con una caja de té Darjeeling, 15% en todo. Una persona mayor y preferente compra el té y 600 € de hamburguesas vegetales: ¿qué política se aplica? Depende de la estrategia de resolución de conflictos de la tienda (normalmente “lo mejor para el cliente”, pero podría ser “lo mejor para la tienda”).</p>
        ${table(['Contexto / Problema', 'Solución'], [['¿Cómo tratar un grupo o una estructura compuesta del mismo modo (polimórficamente) que un objeto no compuesto (atómico)?', 'Definir las clases de los objetos compuestos y atómicos de manera que <strong>implementen la misma interfaz</strong>.']])}
        ${composite}
        <p>La característica distintiva: el objeto compuesto externo <strong>contiene una lista</strong> de objetos internos, y externos e internos <strong>implementan la misma interfaz</strong>. La Venta no sabe ni le importa si su estrategia es atómica o compuesta: es simplemente otro objeto que entiende <code>getTotal</code>.</p>
        ${code(`
// superclase abstracta: todas las subclases heredan la lista de estrategias
public abstract class EstrategiaCompuestaFijarPrecios implements IEstrategiaFijarPreciosVenta {
    protected List<IEstrategiaFijarPreciosVenta> estrategiasFijarPrecios = new ArrayList<>();
    public void añadir(IEstrategiaFijarPreciosVenta e) { estrategiasFijarPrecios.add(e); }
    public abstract Dinero getTotal(Venta v);
}

public class EstrategiaCompuestaFijarPreciosLoMejorParaElCliente extends EstrategiaCompuestaFijarPrecios {
    public Dinero getTotal(Venta venta) {
        Dinero menorTotal = new Dinero(Integer.MAX_VALUE);
        for (IEstrategiaFijarPreciosVenta estrategia : estrategiasFijarPrecios) {
            menorTotal = estrategia.getTotal(venta).min(menorTotal);   // el total más bajo
        }
        return menorTotal;
    }
}`)}
        <p>Las estrategias se agregan al compuesto en tres momentos del escenario: el <strong>descuento de la tienda</strong>, al crear la venta; el del <strong>tipo de cliente</strong>, cuando se informa el cliente; y el del <strong>tipo de producto</strong>, al introducir el producto. En UML, las clases y métodos abstractos van en <em>cursiva</em> y la herencia es una línea sólida con triángulo hueco hacia la superclase.</p>
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿Estrategia o Composite?',
        buckets: ['Estrategia', 'Composite'],
        items: [
          { t: 'Elegir entre envío por correo, por moto o retiro en sucursal, cada uno con su forma de calcular el costo.', b: 0 },
          { t: 'Un menú contiene ítems y submenús, y ambos se dibujan con dibujar().', b: 1 },
          { t: 'Aplicar a la vez varias promociones y quedarse con la mejor para el cliente.', b: 1 },
          { t: 'Cambiar el algoritmo de ordenamiento de una lista sin tocar la lista.', b: 0 },
          { t: 'Una carpeta contiene archivos y otras carpetas, y todos responden a getTamaño().', b: 1 },
          { t: 'Cambiar la política de impuestos según la provincia.', b: 0 },
        ],
      }],
      quiz: [
        { q: '¿Qué propone el patrón Estrategia?', o: ['Cada algoritmo en una clase con interfaz común', 'Un único algoritmo configurable con muchos if según el caso', 'Una sola instancia global para cada política de precios', 'Agrupar todas las políticas en una lista dentro de la Venta'], a: 0, e: 'Así los algoritmos se pueden intercambiar.' },
        { q: 'En el patrón Estrategia, ¿qué es el objeto de contexto?', o: ['El objeto al que se aplica el algoritmo', 'La interfaz común de todas las estrategias', 'La factoría que crea las estrategias', 'El controlador del caso de uso'], a: 0, e: 'Delega parte de su trabajo en la estrategia.' },
        { q: '¿Por qué la Venta pasa this a la estrategia?', o: ['Para darle visibilidad de parámetro de la venta', 'Para que la estrategia pase a ser un singleton', 'Para que la estrategia pueda crear la venta', 'Por convención: no tiene ningún efecto real'], a: 0, e: 'A su vez la Venta tiene visibilidad de atributo de la estrategia.' },
        { q: '¿Quién crea las estrategias en el diseño de Larman?', o: ['Una factoría de estrategias propia', 'La propia Venta, al crearse', 'El Registro, como controlador', 'La FactoriaDeServicios existente'], a: 0, e: 'Una factoría por familia de objetos relacionados, por Alta Cohesión.' },
        { q: '¿Qué problema resuelve Composite?', o: ['Tratar lo compuesto igual que lo atómico', 'Intercambiar algoritmos en tiempo de ejecución', 'Adaptar interfaces de sistemas externos', 'Asegurar una única instancia global'], a: 0, e: 'Compuestos y atómicos implementan la misma interfaz.' },
        { q: '¿Cuál es la característica distintiva de un objeto compuesto?', o: ['Contiene una lista de objetos con su misma interfaz', 'Hereda de todas las clases que agrupa', 'No tiene métodos propios, solo delega', 'Es siempre un singleton del sistema'], a: 0, e: 'Por eso el cliente no distingue si es atómico o compuesto.' },
        { q: '¿Qué devuelve EstrategiaCompuestaFijarPreciosLoMejorParaElCliente?', o: ['El menor de los totales', 'La suma de todos los descuentos', 'El mayor de los totales', 'El promedio de los totales'], a: 0, e: 'Resuelve el conflicto con lo mejor para el cliente.' },
        { q: '¿En qué patrón GRASP se fundamenta Estrategia?', o: ['Polimorfismo', 'Creador', 'Experto', 'Controlador'], a: 0, e: 'Algoritmos conectables mediante interfaces.' },
      ],
      sources: [{ title: 'UML y Patrones, 2ª ed.', ref: 'Larman, cap. 23, págs. 332-341', points: ['Estrategia y factoría de estrategias.', 'Composite y políticas de precios en conflicto, con código Java.'] }],
    },
  );
})();
