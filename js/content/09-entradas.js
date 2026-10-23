/* Unidad III, clase 12: casos de uso reales, diseño de entrada efectiva, formularios web y de pantalla, GUI. Diapositivas Clase12, Larman 1ª ed. cap. 16 (2ª ed. cap. 6.11), Kendall y Kendall 11ª ed., págs. 371-383. */
(() => {
  const { LESSONS, h } = window.GUIDE;
  const { note, def, table, fig, lab, uml: U } = h;

  // Las 7 secciones de un formulario (recibo de gastos)
  const secciones = fig(U.svg(520, 320, `
    <rect x="20" y="8" width="480" height="304" rx="4" class="u-lyr"/>
    ${[['1. Encabezado', 'nombre y dirección de la organización', 14, 30, 'k-a'], ['2. Identificación y acceso', 'código / número para archivar', 48, 30, 'k-a'], ['3. Instrucciones', 'cómo llenarlo y a dónde enviarlo', 82, 30, 'k-a'], ['4. Cuerpo', 'datos explícitos y variables: casi la mitad del formulario', 118, 104, ''], ['5. Firma y verificación', '', 228, 26, 'k-ok'], ['6. Totales', '', 258, 22, 'k-ok'], ['7. Comentarios', '', 284, 22, 'k-ok']].map(([t, s, y, hh, c]) => `<rect x="30" y="${y}" width="460" height="${hh}" rx="3" class="u-blk ${c}"/><text x="42" y="${y + 19}" class="u-sans u-b">${t}</text><text x="478" y="${y + 19}" class="u-sm u-e">${s}</text>`).join('')}
    ${[0, 1, 2, 3].map((i) => `<path d="M60 ${150 + i * 18}H460" class="u-ln u-dash"/>`).join('')}
    <text x="10" y="64" class="u-sm" transform="rotate(-90 10 64)">tercio superior</text><text x="10" y="300" class="u-sm" transform="rotate(-90 10 300)">tercio inferior</text>`,
    'Las siete secciones de un formulario: encabezado, identificación, instrucciones, cuerpo, firma y verificación, totales y comentarios'),
    'Las 7 secciones de un formulario (recibo de gastos de Kendall y Kendall). El tercio superior tiene encabezado, identificación e instrucciones; el medio, el cuerpo; el inferior, firma, totales y comentarios, para que quien lo llena lo termine de forma lógica.');

  // Tipos de leyendas
  const leyendas = fig(U.svg(600, 230, `
    <text x="10" y="18" class="u-sans u-b">Leyenda de línea (a la izquierda)</text><text x="10" y="44">Nombre</text><path d="M70 46H280" class="u-ln"/>
    <text x="10" y="80" class="u-sans u-b">Leyenda de línea (debajo)</text><path d="M10 104H280" class="u-ln"/><text x="10" y="118" class="u-sm">Nombre completo [Apellido, Nombre(s)]</text>
    <text x="10" y="150" class="u-sans u-b">Leyenda enmarcada</text><rect x="10" y="160" width="270" height="40" rx="2" class="u-box"/><text x="16" y="172" class="u-sm">Fecha (DD/MM/AAAA)</text>
    <text x="320" y="18" class="u-sans u-b">Leyenda de verificación</text>${['Avión', 'Tren', 'Auto', 'Otro'].map((t, i) => `<rect x="320" y="${30 + i * 22}" width="13" height="13" class="u-box"/><text x="340" y="${41 + i * 22}">${t}</text>`).join('')}
    <text x="320" y="150" class="u-sans u-b">Leyenda de tabla</text>${['Fecha', 'Concepto', 'Importe'].map((t, i) => `<rect x="${320 + i * 90}" y="160" width="90" height="20" class="u-hd"/><text x="${365 + i * 90}" y="174" class="u-c u-sm">${t}</text><rect x="${320 + i * 90}" y="180" width="90" height="20" class="u-box"/><rect x="${320 + i * 90}" y="200" width="90" height="20" class="u-box"/>`).join('')}`,
    'Ejemplos de leyendas de línea, de verificación, enmarcada y de tabla'),
    'Tipos de leyendas. La leyenda debajo de la línea deja más espacio para el dato, pero puede no quedar claro a qué línea corresponde. Las enmarcadas ayudan a escribir en el lugar correcto y facilitan la lectura.');

  // Controles de una GUI
  const gui = fig(U.svg(600, 200, `
    <text x="10" y="18" class="u-sans u-b">Casillas de verificación</text>${['Correo', 'SMS', 'WhatsApp'].map((t, i) => `<rect x="10" y="${30 + i * 24}" width="14" height="14" rx="2" class="u-box"/>${i !== 1 ? `<path d="M13 ${37 + i * 24}l3 4l6-8" class="u-ln s-a" style="stroke-width:2"/>` : ''}<text x="32" y="${42 + i * 24}" class="u-sans">${t}</text>`).join('')}<text x="10" y="122" class="u-sm">varias opciones, no exclusivas</text>
    <text x="170" y="18" class="u-sans u-b">Botones de opción</text>${['Efectivo', 'Débito', 'Crédito'].map((t, i) => `<circle cx="177" cy="${37 + i * 24}" r="7" class="u-box"/>${i === 0 ? '<circle cx="177" cy="37" r="3.5" class="f-a"/>' : ''}<text x="192" y="${42 + i * 24}" class="u-sans">${t}</text>`).join('')}<text x="170" y="122" class="u-sm">una sola, excluyentes</text>
    <text x="320" y="18" class="u-sans u-b">Lista desplegable</text><rect x="320" y="28" width="130" height="24" rx="3" class="u-box"/><text x="328" y="44" class="u-sans">Tucumán</text><path d="M434 36l5 6l5-6" class="u-ln"/>
    <rect x="320" y="52" width="130" height="66" rx="0" class="u-box"/>${['Salta', 'Tucumán', 'Jujuy'].map((t, i) => `${i === 1 ? '<rect x="321" y="74" width="128" height="22" class="u-blk k-a"/>' : ''}<text x="328" y="${68 + i * 22}" class="u-sans">${t}</text>`).join('')}
    <text x="470" y="18" class="u-sans u-b">Deslizador y ±</text><path d="M470 44H560" class="u-ln" style="stroke-width:3"/><circle cx="520" cy="44" r="8" class="f-a"/><rect x="566" y="30" width="22" height="14" class="u-box"/><text x="577" y="41" class="u-c u-sm">+</text><rect x="566" y="44" width="22" height="14" class="u-box"/><text x="577" y="55" class="u-c u-sm">−</text><text x="470" y="80" class="u-sm">rango continuo</text>`,
    'Controles de interfaz gráfica: casillas de verificación, botones de opción, lista desplegable, deslizador y botones de aumentar y disminuir'),
    'Controles de una GUI. Casillas: una o más opciones no exclusivas, con el texto a la derecha. Botones de opción: opciones excluyentes, con la más frecuente como predeterminada. Lista desplegable: cuando hay poco espacio. Deslizador y botones ±: valores de un rango continuo.');

  LESSONS.push(
    {
      id: 'casos-de-uso-reales',
      module: 'm9',
      title: 'Casos de uso reales',
      keywords: 'caso de uso real concreto esencial abstracto análisis diseño interfaz de usuario intención del actor responsabilidad del sistema Constantine estilo esencial',
      tldr: 'El <mark>caso de uso esencial</mark> (del análisis) describe intenciones y responsabilidades, <strong>sin interfaz</strong>. El <mark>caso de uso real</mark> (del diseño) presenta un <strong>diseño concreto</strong>: pantallas, controles y navegación. Es una de las primeras actividades del diseño, y para hacerlo hay que tener antes los esenciales.',
      goals: ['Distinguir caso de uso esencial y real.', 'Transformar un caso esencial en uno real.', 'Saber en qué fase va cada uno.'],
      body: `
        <h2>Del caso esencial al caso real</h2>
        ${def('Caso de uso real', 'Presenta un diseño concreto del caso de uso, en función de la tecnología concreta de entrada y salida y de su implementación global. Es una de las primeras actividades del diseño; antes deben existir los casos esenciales de uso del análisis.', 'Larman, 1ª ed., cap. 16 (diapositivas de la clase 12).')}
        <p>Larman pide escribir los casos de uso del análisis en <strong>estilo esencial</strong> (Constantine): la narración se expresa al nivel de las <strong>intenciones del actor y las responsabilidades del sistema</strong>, independiente de la tecnología y, sobre todo, de la interfaz. “No considere la interfaz de usuario; céntrese en la intención.” El estilo <strong>concreto</strong> o real incluye las decisiones de interfaz: puede mostrar instantáneas de las ventanas, la navegación y la manipulación de los elementos de la GUI. Es útil para diseñar la GUI detallada, pero no es adecuado durante el análisis inicial.</p>
        ${table(['Caso de uso esencial (análisis)', 'Caso de uso real (diseño)'], [
          ['<strong>Intención del actor</strong> → <strong>Responsabilidad del sistema</strong>', 'Acciones concretas sobre la interfaz'],
          ['1. El Administrador se identifica.<br>2. El Sistema autentica la identidad.', '1. El Administrador introduce su ID y contraseña en el cuadro de diálogo (ver Dibujo 3).<br>2. El Sistema autentica al Administrador.<br>3. El Sistema muestra la ventana de “edición de usuarios” (ver Dibujo 4).'],
          ['1. El Cliente llega con los artículos.<br>2. El Cajero registra cada artículo.<br>3. El Sistema muestra la descripción y el precio.', '1. El Cajero escanea el código o lo escribe en el campo CUP y presiona Enter.<br>2. El Sistema muestra la descripción en el campo Descripción y el precio en Precio, y actualiza Total.'],
          ['La solución de diseño queda abierta (lectores biométricos, GUI, etc.).', 'La solución de diseño ya está tomada.'],
        ])}
        <p>Ventaja del estilo esencial: preguntar por el objetivo (“¿cuál es el objetivo del objetivo?”) abre soluciones nuevas. Si el cajero dice que quiere “iniciar sesión” piensa en un diálogo con usuario y contraseña; su objetivo real es “identificarse y conseguir la autenticación”, y quizás convenga un lector de huellas (si el perfil de los usuarios lo permite).</p>
        ${note('Si el enunciado del parcial menciona pantallas, botones o campos, es un caso de uso <strong>real</strong> (diseño). Si solo dice “el cliente se identifica” y “el sistema valida”, es <strong>esencial</strong> (análisis).', 'exam')}
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿Paso esencial o real?',
        buckets: ['Esencial (análisis)', 'Real (diseño)'],
        items: [
          { t: 'El Socio se identifica.', b: 0 },
          { t: 'El Empleado escanea el carnet del socio con el lector de código de barras.', b: 1 },
          { t: 'El Sistema registra el alquiler.', b: 0 },
          { t: 'El Sistema muestra la grilla de artículos alquilados y habilita el botón Pagar.', b: 1 },
          { t: 'El Cajero selecciona “Efectivo” en la lista desplegable Medio de pago.', b: 1 },
          { t: 'El Cliente paga.', b: 0 },
        ],
      }],
      quiz: [
        { q: '¿Qué presenta un caso de uso real?', o: ['Un diseño concreto del caso de uso, con la tecnología de entrada y salida', 'Las intenciones del actor sin detalles de interfaz', 'El modelo de dominio', 'Los contratos de las operaciones'], a: 0, e: 'El esencial es el que evita la interfaz.' },
        { q: '¿Qué hay que tener antes de elaborar los casos de uso reales?', o: ['Los casos de uso esenciales del análisis', 'El diagrama de clases de diseño', 'El SAD completo', 'Las pruebas de aceptación'], a: 0, e: 'Es una de las primeras actividades del diseño.' },
        { q: '“1. El Administrador se identifica. 2. El Sistema autentica la identidad.” es un caso en estilo...', o: ['Esencial', 'Real', 'Concreto', 'De prueba'], a: 0, e: 'Está al nivel de intenciones y responsabilidades.' },
        { q: '¿Por qué Larman pide no considerar la interfaz durante el análisis?', o: ['Para centrarse en la intención y no cerrar el diseño', 'Porque la interfaz no tiene importancia para el usuario', 'Porque la interfaz la diseña siempre el propio cliente', 'Porque UML no tiene forma de representar pantallas'], a: 0, e: 'Así pueden aparecer soluciones nuevas y mejores.' },
        { q: 'Un paso que dice “presiona el botón Aceptar del cuadro de diálogo” pertenece a...', o: ['Un caso de uso real, propio del diseño', 'Un caso de uso esencial', 'Un contrato de operación', 'Un escenario de calidad'], a: 0, e: 'Menciona elementos concretos de la GUI.' },
      ],
      sources: [{ title: 'UML y Patrones', ref: 'Larman, 1ª ed. cap. 16; 2ª ed. cap. 6.11, págs. 65-67', points: ['Casos de uso reales.', 'Escritura de casos de uso en estilo esencial y estilo concreto.'] }],
    },

    {
      id: 'entrada-y-formularios',
      module: 'm9',
      title: 'Diseño de entrada efectiva y formularios',
      keywords: 'entrada calidad efectividad precisión facilidad de uso consistencia simpleza atracción formularios documentos fuente lineamientos flujo 7 secciones leyendas línea verificación enmarcada tabla control de formularios',
      tldr: '<mark>La calidad de la entrada determina la calidad de la salida.</mark> Formularios y pantallas deben cumplir 6 objetivos (efectividad, precisión, facilidad de uso, consistencia, simpleza y atracción) y 4 lineamientos. Un formulario fluye de izquierda a derecha y de arriba abajo, en <strong>7 secciones</strong>, y usa <strong>leyendas</strong> para guiar el llenado.',
      goals: ['Enumerar los 6 objetivos del diseño de entrada.', 'Aplicar los 4 lineamientos de formularios.', 'Ubicar las 7 secciones de un formulario.', 'Elegir el tipo de leyenda adecuado.', 'Explicar el control de formularios en la organización.'],
      body: `
        <h2>Entrada efectiva</h2>
        <p>Los usuarios merecen una salida de calidad, y <strong>la calidad de la entrada determina la calidad de la salida</strong>. Por eso formularios, pantallas y documentos web interactivos se diseñan con esa relación en mente, con 6 objetivos:</p>
        ${table(['Objetivo', 'Significado'], [
          ['Efectividad', 'Sirven a propósitos específicos.'],
          ['Precisión', 'El diseño da certeza para llenarlos adecuadamente.'],
          ['Facilidad de uso', 'Son simples: el usuario tarda poco en descifrarlos.'],
          ['Consistencia', 'Todos los formularios agrupan los datos de manera similar.'],
          ['Simpleza', 'Diseños ordenados que enfocan la atención.'],
          ['Atracción', 'Los usuarios disfrutan usarlos por su diseño agradable.'],
        ])}
        <p>Los formularios innecesarios desperdician recursos. Un formulario es un documento impreso, que se llena de forma estandarizada, para solicitar y capturar información que luego se carga en la computadora: es un <strong>documento fuente</strong>, origen de los datos de las aplicaciones. Son instrumentos importantes para dirigir el curso del trabajo.</p>

        <h2>4 lineamientos para formularios útiles</h2>
        <ol>
          <li><strong>Que sean fáciles de llenar</strong>: reduce errores, agiliza el llenado y facilita la carga. El costo del formulario es mínimo frente al tiempo de llenarlo y cargarlo; con formularios web se elimina la carga, porque el usuario teclea sus datos.</li>
          <li><strong>Que cumplan con el propósito</strong> para el que se diseñaron: registrar, procesar, almacenar y recuperar información.</li>
          <li><strong>Que se completen con precisión</strong>: los errores bajan cuando es obvio cómo llenarlos.</li>
          <li><strong>Que sean atractivos</strong>: ordenados, con la información en el orden esperado, buena distribución, y categorías separadas con líneas gruesas y delgadas.</li>
        </ol>
        <h3>Flujo y secciones</h3>
        <p>Un formulario con flujo apropiado reduce tiempo y esfuerzo: debe fluir <strong>de izquierda a derecha y de arriba abajo</strong>; un flujo ilógico frustra. Sus 7 secciones agrupan lógicamente la información:</p>
        ${secciones}
        <ul>
          <li><strong>Encabezado</strong>: nombre y dirección de la organización.</li>
          <li><strong>Identificación y acceso</strong>: códigos o números para archivarlo y encontrarlo después.</li>
          <li><strong>Instrucciones</strong>: cómo llenarlo y a dónde enviarlo.</li>
          <li><strong>Cuerpo</strong>: casi la mitad del formulario, con el mayor detalle y los datos explícitos y variables.</li>
          <li><strong>Firma y verificación, totales y comentarios</strong>: en el tercio inferior, una forma lógica de terminarlo.</li>
        </ul>
        <h3>Leyendas</h3>
        <p>Las <strong>leyendas</strong> indican qué poner en una línea, espacio o cuadro.</p>
        ${leyendas}
        <ul>
          <li><strong>De línea</strong>: a la izquierda del espacio o debajo de la línea. Debajo deja más espacio para el dato, pero puede no quedar claro si corresponde a la línea de arriba o de abajo. Usar el estilo en forma <strong>consistente</strong>: no mezclar leyendas arriba y abajo.</li>
          <li><strong>Enmarcadas</strong>: el dato va en un cuadro, con la leyenda adentro, encima o debajo; ayudan a escribir en el lugar correcto.</li>
          <li><strong>De verificación</strong>: restringen las opciones de respuesta; son mejores que una línea en blanco, sobre todo si la información es rutinaria.</li>
          <li><strong>De tabla</strong>: encabezados de columnas para datos repetidos.</li>
          <li>La leyenda usa letra <strong>pequeña</strong> para no dominar el área de entrada y puede incluir notas aclaratorias: “Fecha (MM/DD/AAAA)”.</li>
        </ul>
        <h3>Control de formularios</h3>
        <p>Debe haber un <strong>especialista en formularios</strong> (o el analista de sistemas) que asegure que cada formulario cumpla su propósito, sirva a la organización y <strong>evite duplicar</strong> la información recopilada.</p>
        ${lab(0)}
      `,
      labs: [{
        type: 'order', title: 'Ordená las secciones de un formulario',
        items: ['Encabezado', 'Identificación y acceso', 'Instrucciones', 'Cuerpo', 'Firma y verificación', 'Totales', 'Comentarios'],
        explain: '<p>Encabezado, identificación e instrucciones en el tercio superior; el cuerpo en el medio; firma, totales y comentarios abajo.</p>',
      }],
      quiz: [
        { q: '¿Qué determina la calidad de la salida de un sistema?', o: ['La calidad de su entrada', 'La cantidad de informes', 'El hardware de impresión', 'La arquitectura'], a: 0, e: 'Por eso las entradas se diseñan con cuidado.' },
        { q: '“Todos los formularios de entrada agrupan los datos de manera similar” es el objetivo de...', o: ['Consistencia', 'Simpleza', 'Precisión', 'Efectividad'], a: 0, e: 'Simpleza es mantener diseños ordenados.' },
        { q: '¿En qué sentido debe fluir un formulario?', o: ['De izquierda a derecha y de arriba abajo', 'De derecha a izquierda y de arriba abajo', 'De abajo hacia arriba, con la firma primero', 'En columnas, primero los datos obligatorios'], a: 0, e: 'Un flujo ilógico requiere tiempo adicional y frustra.' },
        { q: '¿Qué sección representa casi la mitad del formulario?', o: ['El cuerpo', 'El encabezado', 'Las instrucciones', 'Los comentarios'], a: 0, e: 'Tiene los datos explícitos y variables.' },
        { q: '¿Qué ventaja y desventaja tiene poner la leyenda debajo de la línea?', o: ['Más espacio para el dato, pero ambigüedad sobre su línea', 'Es más legible, pero ocupa más espacio en el formulario', 'Evita errores de llenado, pero el formulario se ve peor', 'No tiene ventajas: siempre conviene la leyenda a la izquierda'], a: 0, e: 'Y no hay que mezclar leyendas arriba y abajo.' },
        { q: '¿Qué tipo de leyenda restringe las opciones de respuesta?', o: ['La de verificación', 'La de línea', 'La enmarcada', 'La de tabla'], a: 0, e: 'Es mejor que una línea en blanco.' },
        { q: '¿Para qué existe un especialista en formularios?', o: ['Que cumplan su propósito y no dupliquen datos', 'Para cargar los datos de los formularios', 'Para imprimir y distribuir los formularios', 'Para diseñar el logo y los colores corporativos'], a: 0, e: 'Puede ser el analista de sistemas.' },
        { q: '¿Qué aportan los formularios web frente a los de papel en cuanto a la carga?', o: ['Eliminan la carga: el usuario teclea sus datos', 'La hacen más lenta por la validación en línea', 'Exigen doble carga: en la web y en el sistema', 'No cambian nada respecto de la carga en papel'], a: 0, e: 'El costo del formulario es mínimo frente al de llenarlo y cargarlo.' },
      ],
      sources: [{ title: 'Análisis y Diseño de Sistemas, 11ª ed.', ref: 'Kendall y Kendall, págs. 371-376', points: ['Objetivos de la entrada; lineamientos, secciones y leyendas de formularios; control de formularios.'] }],
    },

    {
      id: 'pantallas-web-y-gui',
      module: 'm9',
      title: 'Formularios web, pantallas y GUI',
      keywords: 'formularios de pantalla web cursor ayuda sensible al contexto hipervínculos 4 lineamientos simple 50% tres secciones consistente tres clics atractiva Verdana Arial íconos 20 GUI casillas de verificación botones de opción listas desplegables deslizadores',
      tldr: 'En pantalla hay un <strong>cursor</strong> que guía y <strong>ayuda sensible al contexto</strong>. Los 4 lineamientos son: <mark>simple</mark> (solo lo necesario, ~50% del área, 3 secciones), <mark>consistente</mark>, <mark>fácil de recorrer</mark> (regla de los 3 clics) y <mark>atractiva</mark>. Una GUI usa casillas, botones de opción, listas y deslizadores, cada uno para un tipo de elección.',
      goals: ['Diferenciar formularios de pantalla y de papel.', 'Aplicar los 4 lineamientos de pantallas, incluidas las 3 secciones y la regla de los 3 clics.', 'Diseñar íconos.', 'Elegir el control de GUI correcto.'],
      body: `
        <h2>Formularios de pantalla y web</h2>
        <p>Siempre se diseña con <strong>el usuario primero</strong>. Diferencias con el papel:</p>
        <ul>
          <li>La presencia constante de un <strong>cursor</strong> orienta al usuario en la posición actual y avanza señalando el camino.</li>
          <li>Incluyen <strong>ayuda sensible al contexto</strong>: menos instrucciones por línea, menos desorden y menos llamadas a soporte.</li>
          <li>En la web, los <strong>hipervínculos</strong> pueden mostrar ejemplos de formularios llenados correctamente.</li>
        </ul>

        <h2>4 lineamientos para pantallas efectivas</h2>
        <h3>1. Mantener la pantalla simple</h3>
        <p>Mostrar solo lo necesario para la acción y ocupar <strong>alrededor del 50%</strong> del área. Dividirla en <strong>3 secciones</strong>:</p>
        ${fig(U.svg(520, 200, `<rect x="10" y="8" width="500" height="184" rx="6" class="u-lyr"/>
          ${U.blk(20, 16, 480, 36, 'Encabezado: título, archivos abiertos, menús desplegables e íconos', { cls: 'k-a', bold: false })}
          ${U.blk(20, 60, 480, 84, 'Cuerpo: ingreso de datos, de izquierda a derecha y de arriba abajo,\ncon leyendas, instrucciones y ayuda con el botón derecho', { bold: false })}
          ${U.blk(20, 152, 480, 32, 'Comentarios e instrucciones: cambiar de página, guardar, terminar', { cls: 'k-ok', bold: false })}`, 'Las tres secciones de una pantalla: encabezado, cuerpo y comentarios e instrucciones'), 'Las 3 secciones de una pantalla. Se complementan con ayuda sensible al contexto, botones y ventanas desplegables; el usuario puede minimizar o maximizar las ventanas.')}
        <h3>2. Mantener la pantalla consistente</h3>
        <p>Si los usuarios trabajan con formularios en papel, la pantalla sigue al papel y ubica la información en la misma área. Lo que va junto por lógica se agrupa siempre igual: <strong>nombre y dirección juntos, pero no nombre y código postal</strong>.</p>
        <h3>3. Facilitar el movimiento</h3>
        <p><strong>Regla de los tres clics</strong>: el usuario debe llegar a la página que necesita con <strong>3 clics como máximo</strong>. En la web, con hipervínculos a páginas relevantes.</p>
        <h3>4. Crear una pantalla atractiva y agradable</h3>
        <ul>
          <li>Los usuarios son más productivos y cometen menos errores; la pantalla debe atraer y mantener la atención, con apariencia ordenada.</li>
          <li>No atiborrar: mejor varias ventanas o hipervínculos que meter todo a la fuerza en una página. Usar flujos lógicos y organizar el material como la gente conceptualiza su trabajo.</li>
          <li>Color o cuadros sombreados pueden hacerla amigable. Si un estilo o tamaño de letra distrae o atrae demasiado la atención, se omite.</li>
          <li>Las páginas no se ven igual en todos los navegadores: probar los prototipos en varias combinaciones. Para fuentes web, <strong>Verdana o Arial</strong>.</li>
        </ul>
        <h3>Íconos</h3>
        <p>Son representaciones pictóricas de acciones que el usuario selecciona por interacción directa; cumplen funciones similares a las palabras y su significado se capta más rápido. Deben <strong>reconocerse de inmediato</strong> (conviene usar íconos estándar, que aprovechan un significado ya conocido), no superar los <strong>20 íconos por aplicación</strong> y usarse de forma <strong>consistente</strong>.</p>

        <h2>Interfaz gráfica de usuario (GUI)</h2>
        <p>La GUI es la forma en que los usuarios interactúan con los sistemas operativos: interfaz de <strong>apuntar y hacer clic</strong> (point-and-click), de interacción directa, en la que se hace clic en un objeto y se lo arrastra. Usa estos controles:</p>
        ${gui}
        ${table(['Control', 'Cuándo y cómo'], [
          ['Casillas de verificación', 'Marcar <strong>una o más</strong> opciones no exclusivas; contienen una X o un ✓. El texto va a la <strong>derecha</strong>. Si hay varias, las etiquetas tienen un orden (alfabético, cronológico, más frecuente primero).'],
          ['Botones de opción', 'Círculos para opciones <strong>excluyentes</strong>: se elige solo una, y queda claro que hay que decidir. Las elecciones van a la derecha; la más frecuente, como <strong>predeterminada</strong>.'],
          ['Cuadro de lista (menú) y lista desplegable', 'El cuadro de lista muestra las opciones. La desplegable se usa cuando <strong>hay poco espacio</strong>: un rectángulo con una flecha hacia abajo que despliega el menú.'],
          ['Controles deslizables y botones aumentar/disminuir', 'Cambian datos con un <strong>rango continuo</strong> de valores; los botones ± se muestran a la derecha del deslizador.'],
        ])}
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿Qué control de GUI corresponde?',
        buckets: ['Casillas de verificación', 'Botones de opción', 'Lista desplegable', 'Deslizador'],
        items: [
          { t: 'Elegir el sexo registral (una sola opción entre tres).', b: 1 },
          { t: 'Elegir los temas de interés para el boletín (varios).', b: 0 },
          { t: 'Elegir la provincia entre 24, en un formulario angosto.', b: 2 },
          { t: 'Fijar el volumen de las notificaciones.', b: 3 },
          { t: 'Elegir el medio de pago, con “Efectivo” como predeterminado.', b: 1 },
          { t: 'Aceptar recibir correo, SMS o ambos.', b: 0 },
          { t: 'Elegir un rango de precio de 0 a 100.000.', b: 3 },
        ],
      }],
      quiz: [
        { q: '¿Qué porcentaje del área de la pantalla se recomienda ocupar?', o: ['Alrededor del 50%', 'El 100%', 'Alrededor del 25%', 'Alrededor del 80%'], a: 0, e: 'La pantalla debe mostrar solo lo necesario.' },
        { q: '¿Cuáles son las 3 secciones de la pantalla?', o: ['Encabezado, cuerpo, comentarios e instrucciones', 'Título, datos del formulario y firma', 'Menú, contenido principal y pie legal', 'Entrada, proceso y salida de datos'], a: 0, e: 'El cuerpo se organiza de izquierda a derecha y de arriba abajo.' },
        { q: '¿Qué dice la regla de los tres clics?', o: ['Llegar a cualquier página en 3 clics como máximo', 'Que cada formulario debe tener tres botones', 'Que una acción destructiva se confirma con tres clics', 'Que la ayuda contextual aparece al tercer clic'], a: 0, e: 'Es el lineamiento de facilitar el movimiento.' },
        { q: '¿Qué datos deben agruparse según el lineamiento de consistencia?', o: ['Nombre y dirección, pero no nombre y código postal', 'Nombre y código postal', 'Todos los numéricos juntos', 'Los obligatorios arriba y los opcionales abajo'], a: 0, e: 'Se agrupa lo que va junto por lógica.' },
        { q: '¿Cuántos íconos recomiendan como máximo por aplicación?', o: ['20', '7', '50', '5'], a: 0, e: 'Más resulta abrumador.' },
        { q: 'Para opciones mutuamente excluyentes se usan...', o: ['Botones de opción', 'Casillas de verificación', 'Deslizadores', 'Íconos'], a: 0, e: 'Las casillas son para opciones no exclusivas.' },
        { q: '¿Cuándo conviene una lista desplegable en lugar de un cuadro de lista?', o: ['Cuando hay poco espacio en la página', 'Cuando hay pocas opciones', 'Cuando las opciones son excluyentes', 'Cuando el valor es continuo'], a: 0, e: 'Se muestra un rectángulo con una flecha hacia abajo.' },
        { q: '¿Qué fuentes recomiendan para la web?', o: ['Verdana o Arial', 'Times o Courier', 'Comic Sans', 'Cualquiera decorativa'], a: 0, e: 'Además hay que probar en varios navegadores.' },
        { q: '¿Qué diferencia clave tiene un formulario de pantalla frente al de papel?', o: ['Cursor que orienta y ayuda contextual', 'Tiene más secciones que el de papel', 'No necesita leyendas ni instrucciones', 'Siempre es más largo que el de papel'], a: 0, e: 'La ayuda reduce el desorden y las llamadas a soporte.' },
      ],
      sources: [{ title: 'Análisis y Diseño de Sistemas, 11ª ed.', ref: 'Kendall y Kendall, págs. 376-383', points: ['Diseño de formularios web y de pantalla; diseño de la interfaz gráfica de usuario.'] }],
    },
  );
})();
