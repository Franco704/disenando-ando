/* Unidad IV, clase 13: diseño de experiencia de usuario. Diapositivas 13, Travis "La fábula del diseñador centrado en el usuario". */
(() => {
  const { LESSONS, h } = window.GUIDE;
  const { note, def, table, fig, lab, uml: U } = h;

  // Los 3 secretos como ciclo de diseño iterativo
  const ciclo = fig(U.svg(600, 250, `
    ${U.blk(200, 10, 200, 56, '1. Foco temprano y continuo\nen usuarios y tareas', { cls: 'k-a' })}
    ${U.blk(400, 160, 190, 56, '2. Medición empírica\ndel comportamiento', { cls: 'k-if' })}
    ${U.blk(10, 160, 190, 56, '3. Diseño iterativo', { cls: 'k-ok' })}
    ${U.ln([[400, 50], [495, 160]], { end: 'ar' })}${U.ln([[400, 188], [200, 188]], { end: 'ar' })}${U.ln([[105, 160], [200, 50]], { end: 'ar' })}
    <text x="490" y="96" class="u-sm">pruebas de usabilidad</text><text x="490" y="110" class="u-sm">sobre las rutas rojas</text>
    <text x="300" y="206" class="u-c u-sm">efectividad · eficiencia · satisfacción</text>
    <text x="40" y="100" class="u-sm">prototipos en papel</text><text x="40" y="114" class="u-sm">→ electrónicos → código</text>
    <text x="300" y="120" class="u-c u-sans u-b t-a">personas y rutas rojas</text>`,
    'Ciclo de los tres secretos del diseño centrado en el usuario'),
    'Los 3 secretos del diseño centrado en el usuario forman un ciclo: investigar a los usuarios y sus tareas, medir lo que hacen con el diseño y rediseñar, una y otra vez.');

  LESSONS.push(
    {
      id: 'disenador-centrado-en-el-usuario',
      module: 'm10',
      title: 'El diseñador centrado en el usuario y las rutas rojas',
      keywords: 'diseñador efectivo centrado en el usuario estética tecnología de punta usuario promedio perfiles personas visitas a clientes metas cultura de la empresa rutas rojas tareas críticas decisiones renuncias',
      tldr: 'El <mark>diseñador efectivo</mark> crea tecnología compleja pero simple de usar, que beneficia a la organización, a los clientes y a la sociedad. No se enfoca en la estética ni en la última tecnología sino en <strong>la gente que usa el producto</strong>: crea <strong>personas</strong> y define <mark>rutas rojas</mark>, las tareas críticas que deben ser rápidas y sin obstáculos.',
      goals: ['Distinguir al diseñador centrado en el usuario del que se enfoca en estética o tecnología.', 'Explicar por qué no sirve diseñar para un usuario promedio.', 'Dar las 3 metas de las visitas periódicas a clientes.', 'Definir y aplicar las rutas rojas.'],
      body: `
        <h2>Tres tipos de diseñadores</h2>
        <p>La fábula de David Travis compara diseñadores. Algunos hacen productos y sitios <strong>atractivos</strong>, con interés en la estética: algunos clientes creen que son buenos diseñadores, pero los usuarios piensan otra cosa. Otros hacen productos de <strong>tecnología de punta</strong> (state of the art): de nuevo, los clientes los admiran y los usuarios no. El diseño visual es solo una parte de la experiencia, y la tecnología es solo una parte de la solución.</p>
        ${def('Diseñador efectivo', 'Diseña tecnologías complejas pero simples de usar; crea tecnología que beneficia a la organización, a sus clientes y a la sociedad como un todo.', 'Travis, La fábula del diseñador centrado en el usuario.')}
        <p>El <strong>diseñador centrado en el usuario</strong> se enfoca en <strong>la gente</strong> que usa productos y sitios, no en el diseño visual ni en la última tecnología.</p>

        <h2>No existe el usuario promedio</h2>
        <p>Las organizaciones no saben cómo usa la gente sus sistemas. Unas creen que el software se usará a menudo y diseñan para <strong>expertos</strong>; otras, que se usará de vez en cuando, y diseñan para <strong>novatos</strong>. Al intentar ambas cosas a la vez, el software falla en las dos y no se ajusta a nadie. La solución es identificar a los usuarios y lo que quieren hacer:</p>
        <ul>
          <li>observar a la gente en sus oficinas y entrevistarla;</li>
          <li>escuchar llamadas en el call center y los problemas de los clientes.</li>
        </ul>
        <p>Así se descubre que hay <strong>grupos muy diversos con necesidades muy diferentes</strong>: no sirve diseñar para un usuario “promedio” que no existe. Hay que crear <strong>perfiles de usuario</strong>, “retratos hablados” de cada tipo de cliente (<strong>personas</strong>), y asegurarse de que el equipo sepa para quién diseña: “desarrollar personas, no software”. Los hallazgos deben basarse en la investigación, no en suposiciones: <em>“suponer es bueno, pero averiguar es mejor”</em>.</p>

        <h2>Las 3 metas de las visitas a clientes</h2>
        <p>Un programa de <strong>visitas periódicas a los clientes</strong> logra tres metas:</p>
        <ol>
          <li>Entender <strong>qué motiva</strong> a los clientes, para empezar a crear personas.</li>
          <li>Entender el <strong>ambiente</strong> en el que usan el software: la “cultura de las empresas”.</li>
          <li>Desarrollar <strong>rutas rojas</strong>.</li>
        </ol>

        <h2>Rutas rojas</h2>
        <p>En algunas ciudades se pintan rayas rojas en ciertas rutas para mantenerlas <strong>libres de obstáculos</strong>: no se puede estacionar ni un minuto, y si alguien lo hace aparece la autoridad al instante. Los viajes por ellas son suaves y rápidos.</p>
        ${def('Rutas rojas del software', 'Las tareas críticas que la gente quiere hacer con el producto, que deben realizarse en forma suave y tan rápido como sea posible: los viajes críticos con un producto.', 'Travis.')}
        <p>Por ejemplo, <strong>crear una factura</strong> es una ruta roja de un software de facturación. No todo lo que se puede hacer es ruta roja: algunas tareas son mucho más importantes que otras.</p>
        <ul>
          <li>Enfocarse en las rutas rojas evita que las funciones menos importantes desordenen y obstaculicen la interfaz. Esas funciones siguen ahí, pero en un cuadro de diálogo o en otra parte.</li>
          <li>Hace más fáciles las tareas importantes, pero <strong>más complejas las otras</strong>: el buen diseño trata de <strong>decisiones y renuncias</strong>. Es imposible hacer todo más sencillo; hay que priorizar.</li>
          <li>Para elegir bien las rutas rojas hay que investigar con los clientes.</li>
        </ul>
        ${note('Las rutas rojas conectan con todo lo demás: son las tareas que se piden en las <strong>pruebas de usabilidad</strong> (próxima lección) y se parecen a las <strong>historias de mayor importancia</strong> de la pila de producto de Scrum.', 'tip')}
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿Ruta roja o función secundaria?',
        intro: 'Sistema de punto de venta de un supermercado, desde el cajero.',
        buckets: ['Ruta roja', 'Función secundaria'],
        items: [
          { t: 'Registrar los artículos de una compra.', b: 0 },
          { t: 'Cobrar con tarjeta de débito.', b: 0 },
          { t: 'Cambiar el color del tema de la pantalla.', b: 1 },
          { t: 'Exportar el informe anual de ventas por rubro.', b: 1 },
          { t: 'Anular un artículo mal escaneado.', b: 0 },
          { t: 'Configurar la impresora de tickets.', b: 1 },
        ],
      }],
      quiz: [
        { q: '¿En qué se enfoca el diseñador centrado en el usuario?', o: ['En la gente que usa los productos y sus tareas', 'En el diseño visual atractivo', 'En la última tecnología', 'En reducir costos'], a: 0, e: 'La estética y la tecnología son solo partes de la experiencia.' },
        { q: '¿Qué pasa si el software intenta servir a expertos y novatos a la vez sin conocerlos?', o: ['Falla en ambas cosas y no se ajusta a nadie', 'Funciona mejor para todos, porque cubre los dos perfiles', 'Solo falla para los expertos, que necesitan atajos', 'Se vuelve más barato, porque se diseña una sola vez'], a: 0, e: 'Por eso hay que identificar a los usuarios reales.' },
        { q: '¿Qué son las “personas” en el diseño centrado en el usuario?', o: ['Perfiles de cada tipo de usuario, basados en investigación', 'Los miembros del equipo de diseño que representan al cliente', 'Los usuarios voluntarios que participan de las pruebas', 'Los gerentes que aprueban el diseño antes de programarlo'], a: 0, e: '“Desarrollar personas, no software.”' },
        { q: '¿Cuál NO es una de las 3 metas de las visitas a los clientes?', o: ['Medir el rendimiento del servidor', 'Entender qué motiva a los clientes', 'Entender la cultura de las empresas', 'Desarrollar rutas rojas'], a: 0, e: 'Las tres son motivación, ambiente y rutas rojas.' },
        { q: '¿Qué es una ruta roja?', o: ['Una tarea crítica que debe ser suave y rápida', 'Un error grave que bloquea el uso del sistema', 'Un camino de navegación prohibido para el usuario', 'Una función secundaria que conviene eliminar'], a: 0, e: 'Ejemplo: crear una factura.' },
        { q: '¿Qué costo tiene enfocarse en las rutas rojas?', o: ['Lo secundario queda más difícil de alcanzar', 'Se eliminan las funciones que no son críticas', 'El sistema se vuelve más lento en general', 'Ninguno: todas las tareas se simplifican'], a: 0, e: 'El buen diseño trata de decisiones y renuncias.' },
        { q: '“Suponer es bueno, pero...”', o: ['averiguar es mejor', 'medir es caro', 'diseñar es más rápido', 'preguntar no sirve'], a: 0, e: 'Los hallazgos deben basarse en investigación, no en suposiciones.' },
      ],
      sources: [{ title: 'La fábula del diseñador centrado en el usuario', ref: 'Travis, UserFocus, 2009', points: ['El diseñador efectivo, el usuario promedio, las personas y las rutas rojas.'] }],
    },

    {
      id: 'secretos-del-dcu',
      module: 'm10',
      title: 'Los 3 secretos del DCU: usabilidad, métricas y diseño iterativo',
      keywords: 'secretos foco temprano continuo usuario tareas medición empírica pruebas de usabilidad pensar en voz alta efectividad eficiencia satisfacción prototipado en papel diseño iterativo tener correcto el diseño diseño correcto focus groups revisión por experto Henry Ford',
      tldr: 'Los 3 secretos del diseño centrado en el usuario: <mark>1) foco temprano y continuo en el usuario y sus tareas</mark>, <mark>2) medición empírica del comportamiento</mark> con pruebas de usabilidad (efectividad, eficiencia y satisfacción) y <mark>3) diseño iterativo</mark>, con prototipos en papel antes de programar. Parecen sensatos, pero pocas empresas los aplican.',
      goals: ['Enunciar los 3 secretos.', 'Describir una prueba de usabilidad y sus 3 métricas.', 'Explicar el prototipado en papel y “tener correcto el diseño / el diseño correcto”.', 'Explicar por qué las empresas no aplican los secretos y el rol de la revisión experta.'],
      body: `
        <h2>Primer secreto: foco temprano y continuo en el usuario y sus tareas</h2>
        <p>Las visitas a los clientes muestran para quién diseñamos, qué quiere hacer la gente y dónde. Los procesos ágiles ayudan a sacar rápido versiones mejoradas, pero <strong>solo funcionan si sabemos qué mejorar</strong>: al enfocarnos en los usuarios y sus tareas sabemos dónde poner el esfuerzo, y eso ahorra tiempo. ¿Cómo ser un diseñador efectivo sin saber para quién se diseña?</p>
        ${ciclo}

        <h2>Segundo secreto: la medición empírica del comportamiento del usuario</h2>
        <p>Hay que garantizar que los diseños funcionen como la gente espera, y <strong>desconfiar de las opiniones iniciales</strong>: para encontrar los problemas, hay que hacer que la gente use el software. Si un cliente reporta que el producto está dañado y no tiene nada malo, en realidad <strong>tiene problemas para usarlo</strong>: eso es un problema del diseñador. La gente no siempre sabe qué se puede hacer ni qué pedir. Henry Ford: <em>“Si le hubiera preguntado a mis clientes qué querían, hubieran pedido un caballo más rápido”</em>.</p>
        ${def('Prueba de usabilidad', 'Se pide a los clientes que usen el software para realizar ciertas tareas (las rutas rojas) y se los observa mientras lo usan.', 'Travis.')}
        <p>La gente <strong>piensa en voz alta</strong> mientras trabaja, y así sabemos qué partes confunden: son comentarios reales. La usabilidad se mide de tres maneras:</p>
        ${table(['Métrica', 'Qué mide', 'Si el diseño es fácil de usar...'], [
          ['1. Efectividad', 'Cuánta gente completa la ruta crítica con éxito.', 'Más gente logra la tarea.'],
          ['2. Eficiencia', 'Cuánto tiempo tarda en completarla.', 'La gente logra sus metas más rápido.'],
          ['3. Satisfacción', 'Cómo se siente la gente con el diseño.', 'No tiene sentido un diseño efectivo y eficiente si a la gente no le gusta.'],
        ])}
        ${note('Las 3 métricas (efectividad, eficiencia, satisfacción) son la base del RA4 y del TP de la Unidad IV: “validar la usabilidad con pruebas y métricas predefinidas”.', 'exam')}
        ${lab(0)}

        <h2>Tercer secreto: diseño iterativo</h2>
        <p>Después de probar siempre aparecen problemas; al arreglarlos hay que volver a probar. Como las pruebas consumen tiempo, conviene <strong>dilatar la codificación</strong> lo más posible. ¿Cómo probar algo que no está codificado? Con <strong>prototipado en papel</strong>: se muestra al usuario una interfaz de papel y se le piden tareas; “oprime” los botones y elige opciones como en el sistema real.</p>
        <ul>
          <li>El secreto del buen diseño es <strong>abocetar varios diseños y probarlos</strong>, tomar lo mejor de cada uno y crear un nuevo conjunto: “evolución por selección natural”.</li>
          <li><em>“No puedes tener correcto el diseño hasta que tienes el diseño correcto.”</em> Primero se generan muchas ideas distintas y se prueban los mejores elementos: eso es <strong>tener correcto el diseño</strong>. Después se refina: <strong>tener el diseño correcto</strong>.</li>
          <li>El papel asegura una <strong>arquitectura de información correcta</strong>: la gente navega y entiende la terminología. Luego se pasa a <strong>prototipos electrónicos</strong>, más realistas pero aún simulaciones, que ayudan con el diseño visual.</li>
        </ul>

        <h2>¿Por qué tan pocas empresas lo hacen?</h2>
        ${table(['Secreto', 'Por qué no se cumple'], [
          ['1. Foco en el usuario', 'Tiene 4 ingredientes: enfocarse en los usuarios, entender sus tareas, hacerlo <strong>temprano</strong> y hacerlo de forma <strong>continua</strong>. Muchas empresas se creen centradas en el usuario, pero sus clientes no opinan igual. Creen conocerlos porque alguien del equipo trabajó con clientes (un buen inicio, pero no es investigación: los datos quedan sesgados). Suponen que saben qué es mejor; cuando investigan, se enfocan en <strong>factores demográficos</strong> y no en metas y motivaciones, y lo hacen tarde, o solo al inicio o al final.'],
          ['2. Medición empírica', 'Preguntan opiniones en <strong>focus groups</strong>. No alcanza: en productos interactivos <strong>no importa lo que los usuarios dicen, importa lo que hacen</strong>. Pocas hacen pruebas de usabilidad y menos aún recolectan métricas para comparar con diseños previos o con la competencia.'],
          ['3. Diseño iterativo', 'Antes de programar, la mayoría crea solo dos o tres versiones de una interfaz. ¿Cómo ser efectivo con uno o dos diseños?'],
        ])}
        <h3>La revisión por un experto</h3>
        <p>Una persona con experiencia en usabilidad examina el diseño y lo compara con un conjunto de <strong>patrones conocidos</strong>, sin pedir a usuarios que lo usen: intenta meterse en la mente del usuario. Es valiosa y se usa junto con las pruebas de usabilidad, pero <strong>nunca las reemplaza</strong>.</p>
      `,
      labs: [{
        type: 'classify', title: '¿Qué métrica de usabilidad es?',
        buckets: ['Efectividad', 'Eficiencia', 'Satisfacción'],
        items: [
          { t: '8 de 10 usuarios lograron emitir la factura.', b: 0 },
          { t: 'Emitir la factura llevó en promedio 2 minutos y 10 segundos.', b: 1 },
          { t: 'En una escala de 1 a 5, los usuarios calificaron la pantalla con 4,2.', b: 2 },
          { t: 'El 30% abandonó la inscripción antes de terminar.', b: 0 },
          { t: 'Los usuarios expertos tardaron la mitad que los novatos.', b: 1 },
          { t: '“Me resultó frustrante buscar el botón de guardar.”', b: 2 },
        ],
      }],
      quiz: [
        { q: '¿Cuál es el primer secreto del diseño centrado en el usuario?', o: ['Foco temprano y continuo en el usuario y sus tareas', 'Medición empírica del comportamiento', 'Diseño iterativo', 'Revisión por un experto'], a: 0, e: 'El segundo es la medición empírica y el tercero el diseño iterativo.' },
        { q: '¿Cuáles son las 3 métricas de usabilidad?', o: ['Efectividad, eficiencia y satisfacción', 'Velocidad, memoria y costo', 'Precisión, cobertura y regresión', 'Alcance, tiempo y calidad'], a: 0, e: 'Cuántos completan, cuánto tardan y cómo se sienten.' },
        { q: '¿Por qué no alcanzan los focus groups?', o: ['Importa lo que los usuarios hacen, no lo que dicen', 'Porque son caros y llevan mucho tiempo de organizar', 'Porque los usuarios mienten a propósito para quedar bien', 'Porque no permiten hacer preguntas a los participantes'], a: 0, e: 'Hay que observar el uso real con pruebas de usabilidad.' },
        { q: '¿Para qué se pide a los usuarios que piensen en voz alta durante la prueba?', o: ['Para saber qué partes les resultan confusas', 'Para medir la eficiencia en completar la tarea', 'Para poder grabar la sesión con audio', 'Para que no se aburran durante la prueba'], a: 0, e: 'Da comentarios reales sobre la usabilidad.' },
        { q: '¿Por qué conviene dilatar la codificación?', o: ['Cada arreglo obliga a reprobar, y probar papel es más barato', 'Porque programar es siempre la última fase del modelo en cascada', 'Porque el cliente no quiere ver código hasta el final del proyecto', 'Porque así se puede evitar hacer pruebas de usabilidad'], a: 0, e: 'El DCU permite probar con prototipos en papel.' },
        { q: '“No puedes tener correcto el diseño hasta que tienes el diseño correcto.” ¿Qué es “tener correcto el diseño”?', o: ['Generar muchas ideas y probar sus mejores elementos', 'Refinar en detalle el único diseño elegido', 'Programar el diseño final con su aspecto visual', 'Aprobar el diseño definitivo con el cliente'], a: 0, e: 'Después se refina: “tener el diseño correcto”.' },
        { q: '¿Qué asegura el prototipado en papel?', o: ['La arquitectura de información correcta', 'El diseño visual definitivo de la interfaz', 'El rendimiento del sistema bajo carga', 'La seguridad del acceso a los datos'], a: 0, e: 'El diseño visual se trabaja luego con prototipos electrónicos.' },
        { q: '¿La revisión por un experto puede reemplazar a una prueba de usabilidad?', o: ['No: es valiosa, pero nunca la reemplaza', 'Sí, siempre', 'Sí, si el experto es senior', 'Solo en sistemas pequeños'], a: 0, e: 'El experto no observa a usuarios reales.' },
        { q: '¿Cuál de estos NO es uno de los 4 ingredientes del primer secreto?', o: ['Hacerlo con focus groups', 'Enfocarse en los usuarios', 'Entender sus tareas', 'Hacerlo temprano y en forma continua'], a: 0, e: 'Los 4 son: usuarios, tareas, temprano y continuo.' },
      ],
      sources: [{ title: 'La fábula del diseñador centrado en el usuario', ref: 'Travis, UserFocus, 2009', points: ['Los tres secretos, pruebas de usabilidad y métricas.', 'Prototipado en papel y diseño iterativo; revisión experta.'] }],
    },
  );
})();
