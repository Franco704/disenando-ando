/* Unidad III, clase 10: diseño de interfaces de usuario, principios, interacción, presentación, color y mensajes de error. Diapositivas Clase10, Sommerville 8ª ed. cap. 16. */
(() => {
  const { LESSONS, h } = window.GUIDE;
  const { note, def, table, fig, lab, uml: U } = h;

  // Ventas mensuales como texto y como histograma (Sommerville fig. 16.8)
  const ventas = [['Ene', 2842], ['Feb', 2851], ['Mar', 3164], ['Abr', 2789], ['May', 1273], ['Jun', 2835]];
  const textoVsGrafico = fig(U.svg(600, 220, `
    <text x="110" y="18" class="u-c u-sans u-b">Texto</text>
    ${ventas.map(([m, v], i) => `<text x="40" y="${48 + i * 26}">${m}</text><text x="180" y="${48 + i * 26}" class="u-e">${v.toLocaleString('es-AR')}</text>`).join('')}
    <text x="420" y="18" class="u-c u-sans u-b">Gráfico</text>
    ${U.ln([[270, 200], [590, 200]])}${ventas.map(([m, v], i) => `<rect x="${285 + i * 50}" y="${200 - v / 22}" width="34" height="${v / 22}" rx="2" class="u-blk ${i === 2 || i === 4 ? 'k-x' : 'k-a'}"/><text x="${302 + i * 50}" y="214" class="u-c u-sm">${m}</text>`).join('')}`,
    'Las mismas ventas mensuales presentadas como lista de números y como histograma donde destacan marzo y mayo'),
    'La misma información como texto y como gráfico (Sommerville, figura 16.8). En el histograma saltan a la vista las cifras anómalas de marzo y mayo; el texto ocupa menos espacio pero no se lee de un vistazo.');

  // Vistas analógicas de información dinámica (fig. 16.9) y valor relativo (fig. 16.10)
  const analog = fig(U.svg(600, 180, `
    <circle cx="70" cy="80" r="50" class="u-blk"/><path d="M70 80L104 52" class="u-msg" style="stroke-width:3"/><circle cx="70" cy="80" r="4" class="f-msg"/><text x="70" y="160" class="u-c u-sm">esfera con agujas</text>
    <circle cx="210" cy="80" r="50" class="u-blk"/><path d="M210 80V30A50 50 0 0 1 257 96Z" class="u-blk k-a"/><text x="210" y="160" class="u-c u-sm">gráfico de torta</text>
    <rect x="320" y="30" width="20" height="100" rx="10" class="u-blk"/><rect x="320" y="62" width="20" height="68" rx="6" class="u-blk k-err"/><circle cx="330" cy="134" r="14" class="u-blk k-err"/><text x="330" y="168" class="u-c u-sm">termómetro</text>
    <rect x="400" y="66" width="190" height="24" rx="4" class="u-blk"/><rect x="400" y="66" width="130" height="24" rx="4" class="u-blk k-a"/><text x="495" y="120" class="u-c u-sm">barra horizontal</text>`,
    'Cuatro formas analógicas de mostrar un valor numérico que cambia: esfera, torta, termómetro y barra'),
    'Formas de presentar información numérica dinámica (Sommerville, figura 16.9). Las vistas analógicas continuas dan sensación de <strong>valor relativo</strong>; pueden complementarse con un valor digital preciso.');

  const relativo = fig(U.svg(600, 130, `
    <text x="20" y="26" class="u-sans u-b">Presión</text><rect x="100" y="12" width="400" height="22" rx="4" class="u-blk"/><rect x="100" y="12" width="90" height="22" rx="4" class="u-blk k-ok"/><text x="520" y="28">10</text><text x="100" y="50" class="u-sm">0</text><text x="500" y="50" class="u-sm u-e">40</text>
    <text x="20" y="90" class="u-sans u-b">Temperatura</text><rect x="100" y="76" width="400" height="22" rx="4" class="u-blk"/><rect x="100" y="76" width="370" height="22" rx="4" class="u-blk k-err"/><text x="520" y="92">13</text><text x="100" y="114" class="u-sm">0</text><text x="500" y="114" class="u-sm u-e">14</text>`,
    'Dos barras: la presión en 10 de 40 y la temperatura en 13 de 14'),
    'Valores digitales casi iguales (10 y 13), estados muy distintos: la temperatura está cerca del máximo y la presión no llega al 25%. Con solo el número, el usuario tendría que recordar los máximos y calcular, y bajo estrés eso lleva a errores.');

  // Mensaje de error mal y bien diseñado (fig. 16.13)
  const mensajes = fig(U.svg(620, 210, `
    ${U.box(10, 10, 280, 'Error #27', { h: 140, cls: 'k-err' })}<text x="24" y="70" class="u-sans">Identificador de paciente no válido</text>
    <rect x="200" y="112" width="74" height="24" rx="4" class="u-blk"/><text x="237" y="128" class="u-c u-sans">Aceptar</text>
    ${U.box(320, 10, 290, 'Paciente «MacDonald» no registrado', { h: 140, cls: 'k-ok' })}<text x="334" y="60" class="u-sans">Haga clic en un paciente de la lista</text><text x="334" y="78" class="u-sans">y presione Aceptar, o en Reintentar</text><text x="334" y="96" class="u-sans">para volver a escribir el nombre.</text>
    ${['Pacientes', 'Ayuda', 'Reintentar', 'Aceptar'].map((t, i) => `<rect x="${334 + i * 68}" y="112" width="62" height="24" rx="4" class="u-blk"/><text x="${365 + i * 68}" y="128" class="u-c u-sm">${t}</text>`).join('')}
    <text x="150" y="176" class="u-c u-sm t-err">orientado al sistema · negativo · sin salida</text><text x="465" y="176" class="u-c u-sm t-ok">orientado al usuario · positivo · constructivo</text>`,
    'Comparación de un mensaje de error mal diseñado y otro bien diseñado para una enfermera'),
    'La enfermera escribió “MacDonald” en vez de “McDonald” (Sommerville, figura 16.13). A la izquierda, un mensaje en términos del sistema que no ayuda; a la derecha, uno en el lenguaje de la usuaria, que ofrece cómo corregir con un botón y da acceso a la ayuda.');

  LESSONS.push(
    {
      id: 'factores-y-principios',
      module: 'm7',
      title: 'Diseño de interfaces: factores humanos y principios',
      keywords: 'interfaz de usuario errores de usuario memoria a corto plazo 7 elementos estrés capacidades físicas daltonismo preferencias principios familiaridad uniformidad mínima sorpresa recuperabilidad deshacer confirmación puntos de control asistencia diversidad',
      tldr: 'Una interfaz mal diseñada hace que el usuario no acceda a funciones, se equivoque y sienta que el sistema lo traba: <mark>muchos “errores de usuario” son errores de diseño</mark>. Hay <strong>4 factores humanos</strong> a considerar y <strong>6 principios</strong>: familiaridad, uniformidad, mínima sorpresa, recuperabilidad, asistencia y diversidad de usuarios.',
      goals: ['Explicar por qué la interfaz es crítica para la confiabilidad.', 'Enumerar los 4 factores humanos.', 'Explicar los 6 principios de diseño de interfaces y los 3 recursos de recuperabilidad.'],
      body: `
        <h2>Por qué importa</h2>
        <p>El diseño de sistemas abarca también el de la interfaz de usuario. Solo las grandes organizaciones tienen diseñadores especialistas: casi siempre la diseñan los ingenieros de software, que son competentes pero suelen producir interfaces poco atractivas e inapropiadas para los usuarios. Un diseño cuidadoso es <strong>fundamental</strong> y es <strong>crítico para la confiabilidad</strong>: muchos “errores de usuario” se deben a interfaces que no consideran las habilidades de los usuarios reales ni su entorno. Con una interfaz mal diseñada, los usuarios no podrán acceder a algunas funciones, cometerán errores y sentirán que el sistema les dificulta el trabajo.</p>

        <h2>Los 4 factores humanos</h2>
        <ol>
          <li><strong>Memoria limitada a corto plazo</strong>: recordamos instantáneamente unos <strong>7 elementos</strong>; con demasiada información a la vez, no se asimila.</li>
          <li><strong>Todos cometemos errores</strong>, sobre todo con mucha información o bajo estrés. Las alarmas y avisos del sistema aumentan el estrés y, con él, la probabilidad de error.</li>
          <li><strong>Amplio rango de capacidades físicas</strong>: unos ven y escuchan mejor que otros, algunos son daltónicos. No hay que diseñar para las capacidades propias suponiendo que todos se adaptarán.</li>
          <li><strong>Diferentes preferencias de interacción</strong>: imágenes o texto; manipulación directa o comandos.</li>
        </ol>

        <h2>Los 6 principios</h2>
        ${table(['Principio', 'Descripción'], [
          ['Familiaridad del usuario', 'Usar términos y conceptos de la experiencia de los usuarios; los objetos del sistema se relacionan con su entorno de trabajo. La implementación (archivos, estructuras de datos) se oculta.'],
          ['Uniformidad', 'Comandos y menús con el mismo formato, parámetros pasados igual, puntuación similar. Reduce el tiempo de aprendizaje: lo aprendido en una parte vale en otras y en aplicaciones relacionadas.'],
          ['Mínima sorpresa', 'El usuario arma un modelo mental del sistema y se irrita si se comporta de forma inesperada: <strong>acciones comparables deben tener efectos comparables</strong>.'],
          ['Recuperabilidad', 'Minimizar errores (por ejemplo, con menús se evitan errores de tipeo) y, como nunca se eliminan, permitir recuperarse.'],
          ['Asistencia al usuario', 'Ayuda integrada, con niveles desde lo básico para iniciarse hasta la descripción completa, estructurada para no saturar.'],
          ['Diversidad de usuarios', 'Hay usuarios casuales (necesitan que la interfaz los guíe) y habituales (necesitan métodos abreviados). Puede chocar con otros principios: buscar compromisos.'],
        ])}
        <h3>Los 3 recursos de la recuperabilidad</h3>
        <ol>
          <li><strong>Confirmación de acciones destructivas</strong>: pedir confirmación antes de destruir información.</li>
          <li><strong>Deshacer</strong>: restablece el estado previo. Conviene tener <strong>varios niveles</strong>, porque el usuario no siempre advierte el error enseguida.</li>
          <li><strong>Puntos de control</strong>: grabar el estado a intervalos periódicos y poder restaurar desde el último.</li>
        </ol>
        ${note('El principio de diversidad puede entrar en <strong>pugna</strong> con el de uniformidad: algunos usuarios prefieren una interacción muy rápida antes que una interfaz uniforme, y no es posible desarrollar ayudas adecuadas para todos.', 'exam')}
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿Qué principio se aplica o se viola?',
        buckets: ['Familiaridad', 'Uniformidad', 'Mínima sorpresa', 'Recuperabilidad', 'Asistencia', 'Diversidad'],
        items: [
          { t: 'El sistema de una biblioteca habla de “préstamos” y “socios” y no de “registros” y “tablas”.', b: 0 },
          { t: 'Ctrl+Z deshace los últimos 20 cambios.', b: 3 },
          { t: 'En una pantalla Guardar está arriba a la derecha y en otra abajo a la izquierda, con otro nombre.', b: 1 },
          { t: 'Hacer doble clic en un archivo lo abre, pero en otra carpeta lo borra.', b: 2 },
          { t: 'Atajos de teclado para expertos y un asistente paso a paso para novatos.', b: 5 },
          { t: 'Ayuda sensible al contexto con un nivel básico y un enlace a la descripción completa.', b: 4 },
          { t: '“¿Seguro que desea eliminar los 300 registros?”', b: 3 },
        ],
      }],
      quiz: [
        { q: '¿Cuántos elementos de información recordamos instantáneamente, según Sommerville?', o: ['Unos 7', 'Unos 3', 'Unos 20', 'Ilimitados'], a: 0, e: 'Por la memoria a corto plazo limitada no hay que presentar demasiada información a la vez.' },
        { q: '“Acciones comparables deben tener efectos comparables.” ¿Qué principio es?', o: ['Mínima sorpresa', 'Uniformidad', 'Familiaridad', 'Recuperabilidad'], a: 0, e: 'El usuario arma un modelo mental y se confunde si el sistema actúa distinto ante acciones similares.' },
        { q: '¿Cuáles son los 3 recursos del principio de recuperabilidad?', o: ['Confirmación, deshacer y puntos de control', 'Ayuda en línea, tutoriales y manuales de usuario', 'Menús, íconos y atajos de teclado', 'Colores de alerta, sonidos y alarmas'], a: 0, e: 'Los errores no se pueden eliminar del todo: hay que permitir recuperarse.' },
        { q: '¿Por qué conviene tener varios niveles de deshacer?', o: ['Porque el error no siempre se advierte enseguida', 'Porque varios niveles consumen menos memoria', 'Porque lo exige el principio de uniformidad', 'Porque así se puede eliminar la confirmación'], a: 0, e: 'Pueden darse cuenta varios pasos después.' },
        { q: '¿Qué tipo de usuario necesita métodos abreviados?', o: ['El habitual', 'El casual', 'El novato', 'El administrador'], a: 0, e: 'Los casuales necesitan interfaces que los guíen.' },
        { q: '¿Con qué principio puede entrar en pugna el de diversidad de usuarios?', o: ['Con el de uniformidad', 'Con el de recuperabilidad', 'Con el de mínima sorpresa', 'Con ninguno'], a: 0, e: 'Algunos usuarios prefieren rapidez antes que uniformidad.' },
        { q: 'Según el principio de familiaridad, ¿qué se debe ocultar al usuario?', o: ['La implementación: archivos y estructuras', 'Los mensajes de error del sistema', 'La ayuda sensible al contexto', 'Los menús de opciones avanzadas'], a: 0, e: 'Los términos y objetos deben ser los de su entorno de trabajo.' },
        { q: '¿Por qué un buen diseño de interfaz es crítico para la confiabilidad?', o: ['Muchos “errores de usuario” son errores de diseño de la interfaz', 'Porque la interfaz es la que contiene y protege la base de datos', 'Porque una buena interfaz reduce el costo del hardware necesario', 'No lo es: la confiabilidad depende solo de la arquitectura'], a: 0, e: 'Una mala interfaz induce errores.' },
      ],
      sources: [{ title: 'Ingeniería de Software, 8ª ed.', ref: 'Sommerville, cap. 16', points: ['Aspectos de diseño, factores humanos y principios de diseño de interfaces (figura 16.2).'] }],
    },

    {
      id: 'interaccion-y-presentacion',
      module: 'm7',
      title: 'Interacción del usuario y presentación de la información',
      keywords: 'entradas salidas estilos de interacción manipulación directa selección de menús rellenado de formularios lenguaje de comandos lenguaje natural presentación texto gráfico información dinámica estática analógica digital valor relativo MVC',
      tldr: 'La interfaz resuelve dos cuestiones: cómo interactúa el usuario (<strong>entradas</strong>) y cómo presenta el sistema su información (<strong>salidas</strong>). Hay <mark>5 estilos de interacción</mark>. Para presentar: <strong>texto</strong> para información precisa que cambia lento; <strong>gráfico</strong> para tendencias o datos que cambian rápido.',
      goals: ['Describir los 5 estilos de interacción con su ejemplo de borrar un archivo.', 'Separar la presentación de los datos.', 'Responder las 5 preguntas sobre la información a presentar.', 'Elegir entre texto, gráfico y vista analógica.'],
      body: `
        <h2>Entradas y salidas</h2>
        <p>Diseñar la interfaz implica dos cuestiones: <strong>¿cómo debe interactuar el usuario con el sistema?</strong> (entradas) y <strong>¿cómo debe presentar su información el sistema?</strong> (salidas). Una interfaz coherente integra ambas.</p>

        <h2>Los 5 estilos de interacción</h2>
        ${table(['Estilo', 'Cómo funciona', 'Para borrar un archivo...'], [
          ['1. Manipulación directa', 'El usuario interactúa directamente con los objetos de la pantalla, con un puntero (ratón, lápiz, trackball, dedo) y una acción.', 'Arrastra el ícono del archivo hasta el tacho de basura.'],
          ['2. Selección de menús', 'Elige un comando de una lista; puede seleccionar antes el objeto por manipulación directa.', 'Selecciona el ícono y luego el comando Borrar.'],
          ['3. Rellenado de formularios', 'Completa campos; algunos con menús asociados y botones que inician acciones.', 'Completa el nombre en un formulario de borrado y presiona el botón.'],
          ['4. Lenguaje de comandos', 'Escribe un comando con parámetros.', 'Teclea un comando de borrado con el nombre del archivo como parámetro.'],
          ['5. Lenguaje natural', 'Emite el comando en lenguaje natural, que se analiza y traduce a comandos del sistema (es un front-end).', 'Escribe “borrar archivo xxx”.'],
        ])}
        ${lab(0)}

        <h2>Presentación de la información</h2>
        <p>Una buena pauta es <strong>separar el software de presentación de la información misma</strong>: así se puede cambiar la representación en pantalla sin cambiar el sistema de cálculo subyacente (es la idea del patrón Modelo-Vista-Controlador). Para elegir cómo presentar, hay que conocer a los usuarios y preguntarse:</p>
        <ol>
          <li>¿El usuario quiere información <strong>precisa</strong> o las <strong>relaciones</strong> entre los valores?</li>
          <li>¿Con qué <strong>frecuencia cambian</strong> los valores? ¿Se indicarán los cambios de inmediato?</li>
          <li>¿El usuario debe <strong>hacer algo</strong> en respuesta a los cambios?</li>
          <li>¿Necesita <strong>interactuar</strong> con la información por manipulación directa?</li>
          <li>¿La información es <strong>textual o numérica</strong>? ¿Importan los valores relativos?</li>
        </ol>
        <ul>
          <li>Los gráficos no siempre hacen las vistas más interesantes: <strong>ocupan espacio</strong> (sobre todo en móviles) y tardan en descargarse.</li>
          <li>La información que no cambia en la sesión puede ir en texto o gráfico; el texto ocupa menos pero no se lee de un vistazo.</li>
          <li>Hay que <strong>distinguir la información estática de la dinámica</strong> con estilos diferentes (otra letra o color, o un ícono de “información estática”).</li>
          <li><strong>Texto</strong> para información <strong>precisa</strong> que cambia relativamente lento. <strong>Gráfico</strong> si los datos cambian rápido o importan más las relaciones que los valores exactos.</li>
        </ul>
        ${textoVsGrafico}
        <p>Los gerentes suelen interesarse más por <strong>tendencias o anomalías</strong> que por valores exactos. Cuando la información cambia continuamente (la altitud de un avión), las vistas digitales confunden porque no se alcanzan a leer: la información numérica dinámica se representa mejor en forma <strong>analógica</strong>, complementada si hace falta con un valor digital.</p>
        ${analog}
        ${relativo}
      `,
      labs: [{
        type: 'classify', title: 'Estilos de interacción',
        buckets: ['Manipulación directa', 'Selección de menús', 'Formularios', 'Lenguaje de comandos', 'Lenguaje natural'],
        items: [
          { t: 'rm informe.txt', b: 3 },
          { t: 'Arrastrar una tarjeta de “En curso” a “Terminado” en un tablero.', b: 0 },
          { t: '“Mostrame las ventas de marzo” en un asistente.', b: 4 },
          { t: 'Archivo → Exportar → PDF.', b: 1 },
          { t: 'Completar nombre, DNI y fecha, y presionar Inscribir.', b: 2 },
          { t: 'Pellizcar un mapa en el celular para acercarlo.', b: 0 },
        ],
      }],
      quiz: [
        { q: '¿Qué dos cuestiones clave implica el diseño de interfaces?', o: ['Cómo interactúa el usuario y cómo se le presenta la información', 'Qué colores y qué tipografías usar en todas las pantallas', 'Qué lenguaje de programación y qué base de datos usar', 'Cuántas pantallas y cuántos menús tendrá el sistema'], a: 0, e: 'Una interfaz coherente integra interacción y presentación.' },
        { q: 'Arrastrar el ícono de un archivo al tacho de basura es...', o: ['Manipulación directa', 'Selección de menús', 'Lenguaje de comandos', 'Rellenado de formularios'], a: 0, e: 'Se interactúa directamente con los objetos de la pantalla.' },
        { q: '¿Qué ventaja tiene separar el software de presentación de la información?', o: ['Cambiar la vista sin cambiar el cálculo', 'Que la información se cargue más rápido', 'Que no haga falta una base de datos', 'Que el usuario no pueda cometer errores'], a: 0, e: 'Es una buena pauta de diseño.' },
        { q: '¿Cuándo conviene presentar la información como texto?', o: ['Cuando es precisa y cambia relativamente lento', 'Cuando cambia continuamente', 'Cuando importan más las tendencias que los valores', 'Cuando hay que detectar anomalías'], a: 0, e: 'Para datos que cambian rápido o relaciones, gráficos.' },
        { q: '¿Cómo se presenta mejor un valor numérico que cambia continuamente, como la altitud de un avión?', o: ['En forma analógica, quizás con el valor digital', 'Solo con un número digital grande y destacado', 'En una tabla con los últimos valores registrados', 'Con un mensaje de texto ante cada cambio'], a: 0, e: 'Las vistas digitales que cambian continuamente no se alcanzan a leer.' },
        { q: '¿Qué aporta una vista analógica frente a un número en el caso de presión y temperatura?', o: ['El valor relativo respecto del máximo', 'Más precisión que el valor digital', 'Menos espacio ocupado en la pantalla', 'Menos colores en la interfaz'], a: 0, e: 'Con solo el número, el usuario debe recordar el máximo y calcular, y bajo estrés eso causa errores.' },
        { q: '¿Qué desventaja tienen los gráficos según las diapositivas?', o: ['Ocupan espacio y demoran en descargarse', 'No se pueden imprimir en informes', 'No sirven para mostrar tendencias', 'Siempre confunden al usuario novato'], a: 0, e: 'Por eso no siempre hacen las vistas más interesantes.' },
        { q: '¿Qué estilo funciona como front-end que se traduce a comandos del sistema?', o: ['Lenguaje natural', 'Manipulación directa', 'Selección de menús', 'Formularios'], a: 0, e: 'El lenguaje natural se analiza y traduce a comandos.' },
      ],
      sources: [{ title: 'Ingeniería de Software, 8ª ed.', ref: 'Sommerville, cap. 16.1', points: ['Interacción del usuario: estilos (figura 16.3).', 'Presentación de la información: figuras 16.8 a 16.10.'] }],
    },

    {
      id: 'color-y-mensajes',
      module: 'm7',
      title: 'Uso de colores y mensajes de error',
      keywords: 'color limitar 4 5 7 cambio de estado código de colores uniforme pares rojo azul contraste combinaciones legibles negro sobre amarillo normas culturales mensajes de error formales concisos constructivos contexto ayuda enfermera MacDonald',
      tldr: 'El color ayuda a manejar la complejidad, pero es fácil usarlo mal. Hay <mark>5 claves</mark>: limitar los colores, usar el cambio de color para cambios de estado, apoyar la tarea, ser uniforme y cuidar los pares. Los <mark>mensajes de error</mark> deben ser formales, concisos, uniformes y constructivos, en el lenguaje del usuario.',
      goals: ['Aplicar las 5 claves del uso del color y los límites de cantidad.', 'Elegir combinaciones legibles de primer plano y fondo.', 'Diseñar un mensaje de error correcto y criticar uno malo.'],
      body: `
        <h2>Uso del color</h2>
        <p>El color mejora las interfaces y ayuda a comprender y manejar la complejidad, pero es fácil usarlo de forma errónea y crear interfaces poco atractivas y propensas a errores.</p>
        <ol>
          <li><strong>Limitar el número de colores</strong> y ser conservador: no más de <strong>4 o 5 por ventana</strong> y no más de <strong>7 en toda la interfaz</strong>. Muchos colores molestan y fatigan la vista.</li>
          <li><strong>Usar un cambio de color para mostrar un cambio de estado</strong>: si una vista cambia de color, ocurrió algo importante (un indicador de combustible cambia de color al bajar). Es clave en vistas con cientos de entidades.</li>
          <li><strong>Usar el código de colores para apoyar la tarea</strong>: resaltar las instancias anómalas si hay que identificarlas, o destacar similitudes con un color distinto.</li>
          <li><strong>Usar los colores de forma uniforme</strong>: si una parte muestra los errores en rojo, todas deben hacerlo; si no, el usuario puede interpretar como error algo que no lo es.</li>
          <li><strong>Cuidar los pares de colores</strong>: el ojo no puede enfocar <strong>rojo y azul</strong> a la vez; tampoco conviene <strong>rojo sobre verde</strong>.</li>
        </ol>
        <p>Además (Kendall y Kendall): usar <strong>alto contraste</strong> entre primer plano y fondo; el fondo afecta cómo se percibe el color de adelante; los colores <strong>brillantes al frente</strong> y los menos brillantes de fondo; resaltar campos importantes con color; respetar <strong>normas culturales</strong> (rojo = peligro, “números rojos” = pérdidas; verde = avanzar y es seguro en Occidente) y las convenciones de cada profesión (para un conductor el rojo es peligro; para un químico, caliente). No más de 4 colores para usuarios nuevos y 7 para experimentados. Los colores irrelevantes distraen; bien usado, el color facilita el trabajo.</p>
        ${fig(U.svg(600, 96, [['#000', '#ffe600', 'Negro sobre amarillo'], ['#1a7f37', '#fff', 'Verde sobre blanco'], ['#1f4fd1', '#fff', 'Azul sobre blanco'], ['#fff', '#1f4fd1', 'Blanco sobre azul'], ['#ffe600', '#000', 'Amarillo sobre negro']].map(([fg, bg, t], i) => `<rect x="${4 + i * 120}" y="8" width="112" height="54" rx="6" style="fill:${bg};stroke:#888"/><text x="${60 + i * 120}" y="41" class="u-c u-sans u-b" style="fill:${fg};font-size:15px">Texto</text><text x="${60 + i * 120}" y="82" class="u-c u-sm">${i + 1}. ${t}</text>`).join(''), 'Las cinco combinaciones más legibles de texto y fondo'), 'Las 5 combinaciones más legibles de letra sobre fondo, en orden. Estos colores son fijos a propósito: no cambian con el tema oscuro de la guía.')}
        ${fig(U.svg(600, 70, `<rect x="4" y="8" width="180" height="50" rx="6" style="fill:#d91e1e"/><text x="94" y="39" class="u-c u-sans u-b" style="fill:#1a3fd9;font-size:15px">Rojo con azul</text><rect x="210" y="8" width="180" height="50" rx="6" style="fill:#1f9d3a"/><text x="300" y="39" class="u-c u-sans u-b" style="fill:#d91e1e;font-size:15px">Rojo sobre verde</text><rect x="416" y="8" width="180" height="50" rx="6" style="fill:#f2f2f2"/><text x="506" y="39" class="u-c u-sans u-b" style="fill:#e8e83a;font-size:15px">Amarillo sobre blanco</text>`, 'Tres combinaciones de colores difíciles de leer'), 'Pares a evitar: rojo y azul (el ojo no los enfoca a la vez), rojo sobre verde (además, problemático para daltónicos) y colores de poco contraste.')}

        <h2>Mensajes de error</h2>
        <p>El sistema se comunica con mensajes sobre errores y estado, y la <strong>primera experiencia</strong> de un usuario con un sistema puede ser un mensaje de error: un usuario inexperto comete un error inicial y tiene que entenderlo. Hay que prever la formación y experiencia de los usuarios. Los factores a tener en cuenta son: <strong>contexto</strong> (el sistema debe saber qué hace el usuario y adaptar el mensaje), <strong>experiencia</strong> (mensajes cortos para expertos, más explicativos para novatos), <strong>nivel de habilidad</strong> (terminología adecuada), <strong>estilo</strong> (positivo, activo, nunca insultante ni chistoso) y <strong>cultura</strong>.</p>
        ${note('Los mensajes de error deben ser <strong>formales, concisos, uniformes y constructivos</strong>; no deben ser ofensivos ni tener sonidos que desconcierten; deben <strong>sugerir cómo corregir</strong> el error y vincularse a una <strong>ayuda en línea sensible al contexto</strong>.', 'exam')}
        ${mensajes}
        ${table(['El mensaje de la izquierda (malo)', 'El mensaje de la derecha (bueno)'], [['Es <strong>negativo</strong>: acusa al usuario. No se adapta a sus habilidades ni a su experiencia, ignora el contexto, <strong>no sugiere cómo rectificar</strong> y usa términos técnicos del sistema (“identificador de paciente”).', 'Es <strong>positivo</strong>: da a entender que el problema es del sistema. Identifica el problema en términos de la enfermera, ofrece una forma fácil de corregir con un botón y tiene la ayuda disponible.']])}
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿Buena o mala práctica?',
        buckets: ['Buena práctica', 'Mala práctica'],
        items: [
          { t: 'Usar 12 colores distintos en una pantalla de carga de pedidos.', b: 1, why: 'Máximo 4 o 5 por ventana.' },
          { t: 'Poner en rojo los pedidos vencidos de una lista de 500.', b: 0, why: 'Resaltar instancias anómalas apoya la tarea.' },
          { t: 'Errores en rojo en un módulo y en violeta en otro.', b: 1, why: 'Viola la uniformidad.' },
          { t: 'Texto rojo sobre fondo azul.', b: 1, why: 'El ojo no enfoca rojo y azul a la vez.' },
          { t: '“Error 0x80004005: operación inválida.”', b: 1, why: 'Términos del sistema, sin forma de corregir.' },
          { t: '“No encontramos el CUIT 20-1234567-8. Revisá los dígitos o buscalo por razón social.”', b: 0, why: 'Constructivo y en el lenguaje del usuario.' },
          { t: 'Un pitido fuerte y la palabra “¡INCORRECTO!” al equivocarse.', b: 1, why: 'Sonidos que desconciertan y tono ofensivo.' },
          { t: 'El indicador de batería pasa de verde a naranja al bajar del 20%.', b: 0, why: 'Cambio de color para un cambio de estado.' },
        ],
      }],
      quiz: [
        { q: '¿Cuántos colores como máximo recomienda Sommerville por ventana y en toda la interfaz?', o: ['4 o 5 por ventana y no más de 7 en la interfaz', '2 por ventana y 4 en total', '7 por ventana y 12 en total', 'Sin límite si hay buen contraste'], a: 0, e: 'Muchos colores molestan y fatigan la vista.' },
        { q: '¿Qué par de colores no puede enfocar el ojo simultáneamente?', o: ['Rojo y azul', 'Negro y amarillo', 'Azul y blanco', 'Verde y blanco'], a: 0, e: 'También conviene evitar rojo sobre verde.' },
        { q: '¿Cuál es la combinación más legible de la lista de Kendall y Kendall?', o: ['Negro sobre amarillo', 'Rojo sobre verde', 'Azul sobre negro', 'Amarillo sobre blanco'], a: 0, e: 'Le siguen verde sobre blanco, azul sobre blanco, blanco sobre azul y amarillo sobre negro.' },
        { q: 'Si un sistema muestra los errores en rojo en un módulo y en otro color en otro, viola...', o: ['El uso uniforme del color', 'El límite de colores', 'El cambio de color por cambio de estado', 'La norma cultural'], a: 0, e: 'El usuario puede interpretar mal los mensajes.' },
        { q: '¿Cómo deben ser los mensajes de error?', o: ['Formales, concisos, uniformes y constructivos', 'Chistosos para bajar la tensión', 'Técnicos para ser precisos', 'Largos y detallados siempre'], a: 0, e: 'Además deben sugerir cómo corregir y vincularse a la ayuda.' },
        { q: '¿Qué defecto tiene el mensaje “Identificador de paciente no válido”?', o: ['Términos del sistema, tono negativo y sin corrección', 'Es demasiado largo para leerlo con apuro', 'Usa demasiados colores para un mensaje', 'No incluye el número de error del sistema'], a: 0, e: 'El bueno identifica el problema en términos de la enfermera y ofrece una corrección.' },
        { q: 'Para un químico el rojo significa caliente y para un conductor, peligro. ¿Qué indica eso?', o: ['Hay convenciones distintas según la profesión', 'Que el rojo no debe usarse en interfaces', 'Que conviene usar solo verde para alertas', 'Que el significado del color es irrelevante'], a: 0, e: 'Hay que tener en cuenta normas culturales y profesionales.' },
        { q: '¿Para qué sirve usar un cambio de color?', o: ['Para mostrar un cambio en el estado del sistema', 'Para decorar la pantalla', 'Para reemplazar los mensajes de error', 'Para diferenciar usuarios'], a: 0, e: 'Si una vista cambia de color, ocurrió un evento importante.' },
      ],
      sources: [
        { title: 'Ingeniería de Software, 8ª ed.', ref: 'Sommerville, cap. 16.1', points: ['Uso del color (figura 16.11) y mensajes de error (figuras 16.12 y 16.13).'] },
        { title: 'Análisis y Diseño de Sistemas', ref: 'Kendall y Kendall', points: ['Combinaciones de colores más legibles y uso del color en pantallas.'] },
      ],
    },
  );
})();
