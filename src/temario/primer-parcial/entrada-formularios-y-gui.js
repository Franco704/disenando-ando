/* Unidad III, clase 12: casos de uso reales, diseño de entrada efectiva, formularios web y de pantalla, GUI. Diapositivas Clase12, Larman 1ª ed. cap. 16 (2ª ed. cap. 6.11), Kendall y Kendall 11ª ed., págs. 371-383. */
import * as redaccion from '../../temario/redaccion.js';
import { uml } from '../../diagramas/uml.js';
  // uml (los diagramas) se suma a los ayudantes, como hacía GUIDE.h.uml
  const h = { ...redaccion, uml };
  const LESSONS = [];
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

    {
      id: 'modelo-de-dominio',
      module: 'm9',
      title: 'Para la práctica: el modelo de dominio',
      keywords: 'modelo de dominio modelo conceptual clases conceptuales atributos asociaciones multiplicidad categorías frases nominales cartógrafo clase de descripción especificación error común atributo clave ajena generalización práctica parcial banco puntos canje Larman',
      tldr: 'El <mark>modelo de dominio</mark> es la representación visual de las <strong>clases conceptuales</strong> del mundo real, con sus <strong>atributos</strong>, <strong>asociaciones</strong> y <strong>multiplicidades</strong>. No tiene métodos ni flechas de navegación: no es software. Es el punto más pedido de la práctica del 1er parcial (en 9 de los 11 primeros parciales con práctica que tenemos, por 1,5 a 3,5 puntos).',
      goals: ['Definir modelo de dominio y diferenciarlo del diagrama de clases de diseño.', 'Encontrar clases conceptuales con la lista de categorías y las frases nominales.', 'Decidir cuándo algo es atributo y cuándo es clase.', 'Agregar asociaciones con nombre y multiplicidad.', 'Evitar los errores que más se corrigen en el parcial.'],
      body: `
        ${def('Modelo del dominio', 'Un modelo del dominio es una representación visual de las clases conceptuales u objetos del mundo real en un dominio de interés. Se representa con un conjunto de diagramas de clases en los que no se define ninguna operación.', 'Larman, 2ª ed., cap. 10.1')}
        <p>Puede mostrar: <strong>objetos del dominio</strong> o clases conceptuales, <strong>asociaciones</strong> entre ellas y <strong>atributos</strong>. Es un “diccionario visual” del negocio: sirve para entender el problema y es la fuente de inspiración de las clases de software (bajo salto en la representación).</p>
        ${table(['Modelo de dominio (análisis)', 'Diagrama de clases de diseño (DCD)'], [
          ['Conceptos del mundo real', 'Clases de software'],
          ['Atributos sin tipo, o con tipos simples', 'Atributos con tipos'],
          ['<strong>Sin métodos</strong>', 'Con métodos (salen de los diagramas de interacción)'],
          ['Asociaciones <strong>sin flechas</strong>, con nombre y multiplicidad', 'Asociaciones con navegabilidad y dependencias'],
          ['Se hace en el 1er parcial', 'Se hace en el 2do parcial'],
        ])}
        <h2>Paso 1: encontrar las clases conceptuales</h2>
        <p>Larman propone dos técnicas que se combinan:</p>
        <h3>La lista de categorías</h3>
        ${table(['Categoría', 'Ejemplos de los parciales'], [
          ['Objetos tangibles o físicos', 'Vehículo, Herramienta, CajeroAutomático, Báscula'],
          ['Especificaciones o descripciones de cosas', 'Producto del catálogo, Modelo, TipoDeVehículo'],
          ['Lugares', 'Sucursal, Estadio, Garaje, Establecimiento'],
          ['Transacciones', 'Venta, Canje, Préstamo, Reserva, Pago, Transacción'],
          ['Líneas de la transacción', 'DetalleDeVenta, LíneaDeCanje'],
          ['Roles de la gente', 'Cliente, Paciente, Médico, Administrativo, Árbitro'],
          ['Contenedores de otras cosas', 'Catálogo, Agenda, Padrón, Mesa'],
          ['Otros sistemas externos', 'SistemaDeAutorización, ServicioDeVideollamada'],
          ['Hechos', 'Partido, Consulta, Lectura (pesaje o alarma)'],
          ['Reglas y políticas', 'ReglaDePuntos, Penalización'],
          ['Registros de finanzas, trabajo o contratos', 'Comprobante, Log de lecturas'],
        ])}
        <h3>Las frases nominales</h3>
        <p>Subrayá los sustantivos de la consigna (los parciales vienen con varios ya subrayados). Cada sustantivo es un <strong>candidato</strong>: algunos son clases, otros atributos y otros sobran. La técnica es mecánica y el lenguaje es ambiguo: hay que pensar cada uno.</p>
        <h3>Las guías del cartógrafo</h3>
        <ul>
          <li>Usar los <strong>nombres del dominio</strong> (si la consigna dice “canje”, la clase es Canje, no “Intercambio”).</li>
          <li><strong>Excluir lo irrelevante</strong> y no agregar lo que no está. Varias consignas lo dicen explícito: “descartar cualquier otro conocimiento del contexto, limitarse a las especificaciones expuestas” (Mundial 2022).</li>
          <li>Es mejor <strong>especificar de más</strong> con clases pequeñas que de menos.</li>
        </ul>
        ${note('<strong>El error más común</strong> (Larman 10.3): representar como atributo algo que debería ser una clase. Regla: <em>si no pensamos en algo como un número o un texto en el mundo real, probablemente es una clase conceptual</em>. Destino de un vuelo: no es un texto, es un Aeropuerto. Sucursal de un canje: no es un texto, es una clase Sucursal con su ubicación.', 'warn')}
        <h3>Clases de descripción</h3>
        <p>Si se borra el último ejemplar de algo, ¿se pierde la información de qué es? Si el precio y la descripción viven en cada Articulo, al venderse todos se pierde el precio. Por eso se agrega una <strong>clase de descripción</strong> (EspecificaciónDelProducto) cuando: hace falta describir algo independientemente de que exista un ejemplar, se reduce información redundante o borrar los ejemplares perdería información. En los parciales: <strong>Producto del catálogo</strong> (código, descripción, puntos) frente a los productos canjeados; <strong>Herramienta</strong> (modelo) frente a cada ejemplar prestado.</p>

        <h2>Paso 2: asociaciones y multiplicidad</h2>
        <p>Una <strong>asociación</strong> es una relación entre clases que indica una conexión significativa. Incluí las que hay que <strong>recordar</strong> durante un tiempo (“necesito saber qué productos tuvo este canje”) y las de la lista de asociaciones comunes: A es parte de B, A está contenido en B, A es una descripción de B, A es una línea de una transacción B, A se registra en B, A es miembro de B, A usa o gestiona B.</p>
        ${table(['Notación', 'Significado'], [
          ['<code>1</code>', 'Exactamente uno'],
          ['<code>0..1</code>', 'Cero o uno'],
          ['<code>*</code> o <code>0..*</code>', 'Cero o más'],
          ['<code>1..*</code>', 'Uno o más'],
          ['<code>26</code>', 'Un número exacto (26 jugadores por equipo)'],
        ])}
        <ul>
          <li>Nombrá la asociación con un <strong>verbo</strong> (TipoNombre-FraseVerbal-TipoNombre: Cliente-realiza-Transacción) y, si hace falta, una flechita de lectura.</li>
          <li>La multiplicidad dice cuántas instancias de una clase pueden asociarse con <strong>una</strong> instancia de la otra en un momento dado. Leela en las dos direcciones.</li>
          <li>Puede haber <strong>varias asociaciones</strong> entre dos clases (Partido-local-Equipo y Partido-visitante-Equipo).</li>
          <li>Una asociación de una clase consigo misma es válida: “cada cliente puede ser avalado por otro cliente” (3K4 2024) es Cliente-avala-Cliente, 0..1 a *.</li>
        </ul>

        <h2>Paso 3: atributos</h2>
        <p>Un atributo es un valor de datos lógico de un objeto. Incluí los que los requisitos piden <strong>recordar</strong>. Deben ser de <strong>tipos simples</strong> (número, texto, fecha, booleano) o tipos de datos (Dirección, Moneda). <strong>Nada de claves ajenas</strong>: no pongas <code>dniCliente</code> en Canje; eso es una asociación Canje-Cliente.</p>
        ${fig(U.svg(770, 380, `
          ${U.box(20, 20, 140, 'Tarjeta', { attrs: ['numero', 'fechaVencimiento'] })}
          ${U.box(210, 20, 160, 'Cliente', { attrs: ['dni', 'nombreCompleto', 'domicilio', 'telefono', 'email'], cls: 'k-a' })}
          ${U.box(430, 20, 140, 'Transaccion', { attrs: ['fecha', 'tipo', 'puntos'] })}
          ${U.box(620, 20, 140, 'ReglaDePuntos', { attrs: ['descripcion', 'puntos'] })}
          ${U.box(20, 200, 140, 'LugarDeCanje', { attrs: ['nombre', 'ubicacion'] })}
          ${U.box(210, 200, 160, 'Canje', { attrs: ['fechaHora', 'totalPuntos'], cls: 'k-ok' })}
          ${U.box(430, 200, 140, 'LineaDeCanje', { attrs: ['cantidad'] })}
          ${U.box(620, 200, 140, 'Producto', { attrs: ['codigo', 'descripcion', 'puntosNecesarios', 'disponible'] })}
          ${U.box(620, 336, 140, 'Catalogo')}
          ${U.ln([[160, 50], [210, 50]])}<text x="185" y="44" class="u-sm u-c">identifica</text><text x="164" y="64" class="u-sm">1</text><text x="200" y="64" class="u-sm">1</text>
          ${U.ln([[370, 60], [430, 60]])}<text x="400" y="54" class="u-sm u-c">realiza</text><text x="374" y="74" class="u-sm">1</text><text x="420" y="74" class="u-sm">*</text>
          ${U.ln([[570, 50], [620, 50]])}<text x="595" y="44" class="u-sm u-c">valorada por</text><text x="574" y="64" class="u-sm">*</text><text x="610" y="64" class="u-sm">1</text>
          ${U.ln([[290, 134], [290, 200]])}<text x="296" y="170" class="u-sm">solicita</text><text x="278" y="150" class="u-sm">1</text><text x="278" y="196" class="u-sm">*</text>
          ${U.ln([[210, 232], [160, 232]])}<text x="185" y="226" class="u-sm u-c">se hace en</text><text x="198" y="246" class="u-sm">*</text><text x="164" y="246" class="u-sm">1</text>
          ${U.ln([[370, 226], [430, 226]])}<text x="400" y="220" class="u-sm u-c">contiene</text><text x="374" y="240" class="u-sm">1</text><text x="408" y="240" class="u-sm">1..*</text>
          ${U.ln([[570, 226], [620, 226]])}<text x="595" y="220" class="u-sm u-c">de</text><text x="574" y="240" class="u-sm">*</text><text x="610" y="240" class="u-sm">1</text>
          ${U.ln([[690, 298], [690, 336]])}<text x="696" y="322" class="u-sm">figura en</text><text x="678" y="312" class="u-sm">*</text><text x="678" y="332" class="u-sm">1</text>`, 'Modelo de dominio del canje de puntos: Cliente con Tarjeta, Transacciones valoradas por reglas de puntos, Canjes en un lugar con líneas de productos del catálogo'),
          'Modelo de dominio del banco que canjea puntos (rec. 1er parcial 2023 y 2025). Sin métodos ni flechas de navegación. El Producto es una clase de descripción: existe en el catálogo aunque nadie lo haya canjeado.')}
        <p>La cátedra mostró en el 2do parcial 2022 su propia versión de este dominio: Catálogo como generalización de Producto, Servicio y Visita, Sucursal asociada al Catálogo y Transacción asociada a ReglasDeNegocio. Hay más de un modelo correcto: lo que se evalúa es que cubra la consigna con clases, atributos, asociaciones y multiplicidades coherentes.</p>
        <h2>Generalización</h2>
        <p>Usala cuando los subtipos tienen <strong>atributos o asociaciones propias</strong> o se comportan distinto (regla del 100 %: todo lo de la superclase vale para la subclase; regla “es-un”). Ejemplos de los parciales: Movimiento en Acumulación y Canje; Lectura en Pesaje y Alarma; Consulta presencial y virtual. Si solo cambia un valor, alcanza con un atributo <code>tipo</code>.</p>
        ${note('<strong>Grilla de corrección que conviene autoaplicarse</strong>: ¿están todas las clases que nombra la consigna? ¿Cada asociación tiene nombre y multiplicidad en los dos extremos? ¿Hay atributos que en realidad son clases (sucursal, garaje, agencia)? ¿Hay claves ajenas, métodos, tipos de dato de programación o flechas? ¿Aparece una clase “Sistema” o “BaseDeDatos”? Esas dos sobran: el modelo describe el dominio, no el software.', 'exam')}`,
      quiz: [
        { q: '¿Qué NO se muestra en un modelo de dominio?', o: ['Las operaciones o métodos', 'Las asociaciones', 'Los atributos', 'Las multiplicidades'], a: 0, e: 'Larman: diagramas de clases en los que no se define ninguna operación.' },
        { q: 'En un sistema de vuelos, el destino de un vuelo debería modelarse como…', o: ['Una clase Aeropuerto asociada al vuelo', 'Un atributo destino de tipo texto', 'Un método getDestino()', 'Una clave ajena idAeropuerto'], a: 0, e: 'Si no lo pensamos como número o texto, es una clase conceptual.' },
        { q: '“Cada cliente puede ser avalado por otro cliente de la empresa.” ¿Cómo se modela?', o: ['Una asociación reflexiva Cliente-avala-Cliente', 'Un atributo avalista en Cliente', 'Una subclase ClienteAvalado', 'No se modela'], a: 0, e: 'Una asociación de una clase consigo misma, con multiplicidad 0..1 del lado del avalista.' },
        { q: '¿Por qué se agrega una clase de descripción como Producto del catálogo?', o: ['Para no perder la descripción y los puntos cuando no hay ejemplares canjeados', 'Para tener una clase por cada tabla de la base de datos', 'Porque el DCD lo exige', 'Para poder poner métodos'], a: 0, e: 'Describe algo independientemente de que exista un ejemplar.' },
        { q: 'En el modelo de dominio, Canje tiene un atributo dniCliente. ¿Qué está mal?', o: ['Es una clave ajena: debe ser una asociación Canje-Cliente', 'Nada', 'Falta el tipo de dato', 'Debería ser un método'], a: 0, e: 'Larman: ningún atributo como clave ajena.' },
        { q: '“Participaron 32 equipos y cada uno con 26 jugadores.” La multiplicidad de Equipo a Jugador es…', o: ['26', '*', '1', '0..1'], a: 0, e: 'Se puede usar un número exacto si la consigna lo fija.' },
      ],
      sources: [
        { title: 'UML y Patrones, 2ª ed.', ref: 'Larman, caps. 10, 11 y 12', points: ['Definición y contenido del modelo de dominio.', 'Lista de categorías de clases conceptuales y frases nominales; guías del cartógrafo; error común atributo vs. clase; clases de descripción.', 'Asociaciones: lista de asociaciones comunes, nombres, multiplicidad, múltiples asociaciones.', 'Atributos: tipos válidos, ningún atributo como clave ajena.'] },
        { title: 'UML y Patrones, 2ª ed.', ref: 'Larman, cap. 26', points: ['Generalización: regla del 100 % y regla es-un.'] },
      ],
    },

    {
      id: 'casos-de-uso-dss-y-contratos',
      module: 'm9',
      title: 'Para la práctica: narración de casos de uso, DSS y contratos',
      keywords: 'caso de uso narración formato completo actor principal precondiciones garantías de éxito escenario principal flujo básico flujos alternativos extensiones diagrama de casos de uso include extend DSS diagrama de secuencia del sistema eventos operaciones del sistema caja negra contrato operación referencias cruzadas precondiciones postcondiciones creación de instancias formación de asociaciones modificación de atributos práctica parcial',
      tldr: 'La práctica del 1er parcial pide casi siempre la misma cadena: <strong>narración del caso de uso</strong> → <mark>diagrama de secuencia del sistema (DSS)</mark> → <mark>contrato</mark> de una operación. El DSS trata al sistema como una <strong>caja negra</strong> y muestra los eventos que le mandan los actores. El contrato describe, para un evento, los <strong>cambios de estado</strong> que deja: instancias creadas, asociaciones formadas y atributos modificados.',
      goals: ['Narrar un caso de uso en formato completo con flujo básico y alternativos.', 'Dibujar un diagrama de casos de uso.', 'Dibujar un DSS a partir del escenario principal.', 'Escribir un contrato con sus 4 secciones y las postcondiciones bien redactadas.', 'Encadenar los artefactos con el modelo de dominio.'],
      body: `
        <h2>1. La narración del caso de uso</h2>
        ${def('Caso de uso', 'Un caso de uso es una colección de escenarios con éxito y fallo relacionados, que describe a los actores utilizando un sistema para satisfacer un objetivo.', 'Larman, 2ª ed., cap. 6')}
        <p>En el 1er parcial se pide en formato <strong>esencial</strong> (sin detalles de interfaz: “el cliente se identifica”) y en el 2do, el <strong>caso de uso real</strong> (“pasa la tarjeta por el lector”, “presiona Confirmar”). El formato completo de Larman:</p>
        ${table(['Sección', 'Qué va'], [
          ['Caso de uso', 'Nombre que empieza con un verbo: “Canjear Puntos”.'],
          ['Actor principal', 'Quien recurre al sistema para cumplir su objetivo.'],
          ['Personal involucrado e intereses', 'Quién más se interesa y qué quiere (el banco quiere registrar cada movimiento).'],
          ['Precondiciones', 'Lo que tiene que ser cierto antes de empezar: “el cliente está registrado y tiene tarjeta”.'],
          ['Garantías de éxito (postcondiciones)', 'Lo que es cierto al terminar bien: “se registró el canje y se descontaron los puntos”.'],
          ['<strong>Escenario principal de éxito (flujo básico)</strong>', 'Los pasos del camino feliz, numerados, alternando actor y sistema.'],
          ['<strong>Extensiones (flujos alternativos)</strong>', 'Lo que puede pasar distinto, numerado según el paso: “3a. El producto no está disponible: el sistema lo informa y vuelve al paso 3.”'],
          ['Requisitos especiales, frecuencia', 'Requisitos no funcionales relacionados y cada cuánto ocurre.'],
        ])}
        <h3>Ejemplo: Canjear Puntos (banco, 2023 y 2025)</h3>
        ${table(['Actor (Cliente)', 'Sistema'], [
          ['1. El cliente se presenta en un lugar de canje y se identifica con su tarjeta.', '2. Valida la tarjeta (vigente) y muestra los datos del cliente y sus puntos disponibles.'],
          ['3. Elige un producto del catálogo y la cantidad.', '4. Verifica que esté disponible y que los puntos alcancen; muestra la descripción y el subtotal de puntos.'],
          ['<em>El cliente repite 3 y 4 hasta terminar.</em>', ''],
          ['5. Confirma el canje.', '6. Registra el canje con fecha, hora, lugar y productos, descuenta los puntos, registra el movimiento y emite el comprobante.'],
        ])}
        <p><strong>Flujos alternativos</strong>: 2a. Tarjeta vencida o inexistente: el sistema lo informa y termina. 4a. Producto no disponible: lo informa y vuelve al paso 3. 4b. Puntos insuficientes: informa el faltante y permite quitar productos. 5a. El cliente cancela: no se registra nada.</p>
        <h3>El diagrama de casos de uso</h3>
        <p>Actores como monigotes fuera de un rectángulo (el <strong>límite del sistema</strong>) y casos de uso como elipses adentro, unidos por líneas. <code>«include»</code> marca un comportamiento que otro caso siempre incluye (Retirar Dinero incluye Identificar Cliente) y <code>«extend»</code>, uno opcional que se agrega en un punto de extensión. Es exactamente el diagrama del cajero que dio la cátedra en 2024.</p>

        <h2>2. El diagrama de secuencia del sistema (DSS)</h2>
        ${def('DSS', 'Un diagrama de secuencia del sistema es un dibujo que muestra, para un escenario específico de un caso de uso, los eventos que generan los actores externos, el orden y los eventos entre los sistemas. Todos los sistemas se tratan como cajas negras.', 'Larman, 2ª ed., cap. 9.2')}
        <ul>
          <li>Un DSS <strong>por escenario</strong>; normalmente el principal de éxito.</li>
          <li>Solo dos (o pocas) líneas de vida: el <strong>actor</strong> y <strong>:Sistema</strong>. Adentro del sistema no se ve nada: eso es el diagrama de colaboración del 2do parcial.</li>
          <li>Cada flecha del actor al sistema es un <strong>evento del sistema</strong>, que dispara una <strong>operación del sistema</strong> con parámetros.</li>
          <li>Los nombres expresan la <strong>intención</strong>, no el medio físico: <code>introducirArticulo(id)</code>, no <code>escanear(id)</code>. Empiezan con verbo.</li>
          <li>Las respuestas van con flecha punteada y son opcionales. Las repeticiones, en un marco <code>loop</code> o con <code>*[condición]</code>.</li>
        </ul>
        ${fig(U.svg(520, 300, `
          <circle cx="60" cy="24" r="9" class="u-box"/><path d="M60 33V50M48 40H72M60 50L50 64M60 50L70 64" class="u-ln"/><text x="60" y="78" class="u-c u-sm">:Cliente</text>
          ${U.obj(320, 26, 120, ':Sistema')}
          ${U.ln([[60, 84], [60, 292]], { dash: true })}${U.ln([[380, 52], [380, 292]], { dash: true })}
          ${U.ln([[60, 104], [378, 104]], { end: 'ar' })}<text x="220" y="98" class="u-c u-sm">identificarCliente(nroTarjeta)</text>
          ${U.ln([[380, 128], [62, 128]], { dash: true, end: 'op' })}<text x="220" y="122" class="u-c u-sm">datos y puntos disponibles</text>
          <rect x="34" y="144" width="380" height="74" rx="2" class="u-frame" fill="none" stroke="currentColor" stroke-opacity=".45"/><text x="40" y="158" class="u-sm u-b">loop [más productos]</text>
          ${U.ln([[60, 178], [378, 178]], { end: 'ar' })}<text x="220" y="172" class="u-c u-sm">ingresarProducto(codigo, cantidad)</text>
          ${U.ln([[380, 202], [62, 202]], { dash: true, end: 'op' })}<text x="220" y="196" class="u-c u-sm">descripción y subtotal de puntos</text>
          ${U.ln([[60, 246], [378, 246]], { end: 'ar' })}<text x="220" y="240" class="u-c u-sm">confirmarCanje(lugar)</text>
          ${U.ln([[380, 272], [62, 272]], { dash: true, end: 'op' })}<text x="220" y="266" class="u-c u-sm">comprobante del canje</text>`, 'DSS de Canjear Puntos: el cliente se identifica, ingresa productos en un loop y confirma el canje'),
          'DSS de “Canjear Puntos”. Tres operaciones del sistema: <code>identificarCliente</code>, <code>ingresarProducto</code> (repetida) y <code>confirmarCanje</code>. Cada una tendrá su contrato y, en el 2do parcial, su diagrama de colaboración.')}

        <h2>3. El contrato de una operación</h2>
        ${def('Contrato', 'Los contratos describen el comportamiento detallado de las operaciones del sistema en función de los cambios de estado de los objetos del Modelo del Dominio, después de la ejecución de una operación del sistema.', 'Larman, 2ª ed., cap. 13')}
        ${table(['Sección', 'Contenido'], [
          ['Operación', 'Nombre y parámetros: la firma del evento del DSS.'],
          ['Referencias cruzadas', 'Casos de uso en los que aparece.'],
          ['Precondiciones', 'Suposiciones sobre el estado del sistema o de los objetos antes de la operación.'],
          ['<strong>Postcondiciones</strong>', 'El estado de los objetos del modelo de dominio <strong>después</strong> de la operación.'],
        ])}
        <p>Las postcondiciones son de tres tipos y se redactan en <strong>pasado</strong> (describen el estado que quedó, no las acciones):</p>
        <ol>
          <li><strong>Creación o eliminación de instancias</strong>: “Se creó una instancia c de Canje.”</li>
          <li><strong>Formación o ruptura de asociaciones</strong>: “c se asoció con el Cliente.”</li>
          <li><strong>Modificación de atributos</strong>: “cliente.puntos pasó a ser cliente.puntos − c.totalPuntos.”</li>
        </ol>
        <h3>Ejemplo: contrato de confirmarCanje</h3>
        ${table(['Sección', 'Contenido'], [
          ['Operación', '<code>confirmarCanje(lugar: LugarDeCanje)</code>'],
          ['Referencias cruzadas', 'Caso de uso: Canjear Puntos'],
          ['Precondiciones', 'El cliente está registrado e identificado con una tarjeta vigente; hay un canje en curso con al menos una línea; los puntos del cliente alcanzan.'],
          ['Postcondiciones', '<ul><li>Se creó una instancia c de Canje (creación).</li><li>c.fechaHora pasó a ser la fecha y hora actuales; c.totalPuntos, la suma de las líneas (modificación).</li><li>c se asoció con el Cliente, con el LugarDeCanje y con sus LineaDeCanje (formación de asociaciones).</li><li>cliente.puntos disminuyó en c.totalPuntos (modificación).</li><li>Se creó un Movimiento m de tipo canje con fecha, detalle y cantidad de puntos, asociado al Cliente (creación y asociación).</li></ul>'],
        ])}
        ${note('Errores que restan puntos: escribir postcondiciones como pasos (“el sistema busca el producto…”): eso es el caso de uso; nombrar clases que no están en el modelo de dominio (escribir el contrato suele obligar a <strong>agregar</strong> lo que faltaba al modelo, y está bien hacerlo); olvidar las asociaciones, que son las que más se olvidan; y contratos sin precondiciones. Las postcondiciones no tienen que ser perfectas: son una buena estimación que el diseño va a refinar.', 'warn')}
        <h2>Cómo se encadenan</h2>
        ${h.flow('<strong>Caso de uso</strong>: la historia del actor y el sistema.', '<strong>DSS</strong>: de esa historia salen los eventos del sistema, en orden.', '<strong>Contratos</strong>: para cada evento, qué cambia en los objetos del <strong>modelo de dominio</strong>.', '<strong>Diagrama de colaboración</strong> (2do parcial): un diagrama por evento, que cumple las postcondiciones del contrato aplicando GRASP.')}
        <p>Si en el examen te piden los cuatro, hacelos <strong>coherentes</strong>: los nombres de los eventos del DSS son los nombres de las operaciones de los contratos, y las clases de las postcondiciones son las del modelo de dominio.</p>`,
      quiz: [
        { q: 'En un DSS, el sistema se representa como…', o: ['Una caja negra', 'Un conjunto de objetos que colaboran', 'Una base de datos', 'Un diagrama de clases'], a: 0, e: 'Lo de adentro se diseña recién con los diagramas de colaboración.' },
        { q: '¿Cuál es el mejor nombre para un evento del sistema?', o: ['introducirArticulo(id, cantidad)', 'escanearCodigoDeBarras()', 'presionarBotonAceptar()', 'guardarEnBaseDeDatos()'], a: 0, e: 'Expresa la intención, no el medio físico ni la implementación.' },
        { q: '¿Cuáles son las secciones de un contrato?', o: ['Operación, referencias cruzadas, precondiciones y postcondiciones', 'Actor, escenario principal y extensiones', 'Nombre, atributos y métodos', 'Estímulo, respuesta y medida'], a: 0, e: 'Las otras son de casos de uso, clases y escenarios de calidad.' },
        { q: '“c se asoció con el Cliente” es una postcondición de…', o: ['Formación de asociaciones', 'Creación de instancias', 'Modificación de atributos', 'Precondición'], a: 0, e: 'Es uno de los tres tipos de postcondiciones.' },
        { q: '¿En qué tiempo verbal se escriben las postcondiciones?', o: ['En pasado: describen el estado resultante', 'En futuro: describen lo que hará el sistema', 'En presente: describen las acciones', 'En imperativo'], a: 0, e: '“Se creó…”, “pasó a ser…”.' },
        { q: '“3a. El producto no está disponible” pertenece a…', o: ['Las extensiones o flujos alternativos del caso de uso', 'Las postcondiciones del contrato', 'El DSS', 'El modelo de dominio'], a: 0, e: 'Se numera según el paso del flujo básico donde ocurre.' },
        { q: '¿Cuántos DSS se hacen por caso de uso?', o: ['Uno por escenario; normalmente el principal de éxito', 'Uno por clase', 'Uno por actor del sistema', 'Uno por contrato'], a: 0, e: 'Si un flujo alternativo es complejo, puede tener su propio DSS.' },
      ],
      sources: [
        { title: 'UML y Patrones, 2ª ed.', ref: 'Larman, caps. 6 y 9', points: ['Casos de uso en formato completo: secciones, escenario principal, extensiones.', 'DSS: eventos del sistema, caja negra, nombres de eventos y operaciones.'] },
        { title: 'UML y Patrones, 2ª ed.', ref: 'Larman, cap. 13', points: ['Contratos: secciones, tres tipos de postcondiciones, redacción en pasado y actualización del modelo de dominio.'] },
      ],
    },
  );

  export default LESSONS;
