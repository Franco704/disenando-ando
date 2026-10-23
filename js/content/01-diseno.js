/* Unidad I, clases 1 y 2: la materia, Diseño de Sistemas vs. Diseño de Software. Diapositivas 01 y 02, Sommerville 9ª ed. caps. 1 y 2. TP 1 y TP 2. */
(() => {
  const { LESSONS, h } = window.GUIDE;
  const { note, def, table, fig, flow, lab, uml: U } = h;

  // Ingeniería de sistemas contiene a la ingeniería de software, que se apoya en las ciencias de la computación
  const disciplinas = fig(U.svg(560, 250, `
    ${U.blk(10, 10, 540, 230, '', { lyr: true })}
    <text x="28" y="34" class="u-sans u-b">Ingeniería de Sistemas</text>
    <text x="28" y="52" class="u-sm">hardware · políticas y procesos · implementación · arquitectura global · integración</text>
    ${U.blk(190, 72, 340, 150, '', { cls: 'k-a' })}
    <text x="206" y="96" class="u-sans u-b t-a">Ingeniería de Software</text>
    <text x="206" y="114" class="u-sm">asuntos prácticos de la producción de software</text>
    ${U.blk(330, 132, 180, 70, 'Ciencias de la\nComputación', { cls: 'k-if' })}
    <text x="206" y="150" class="u-sm">teorías y métodos</text><text x="206" y="164" class="u-sm">que se aplican →</text>
    ${['Hardware', 'Políticas', 'Personas'].map((t, i) => U.blk(28, 76 + i * 50, 140, 38, t, { bold: false })).join('')}`,
    'Diagrama de contención: la Ingeniería de Sistemas abarca hardware, políticas, personas y la Ingeniería de Software; esta aplica las teorías de las Ciencias de la Computación'),
    'Relación jerárquica que pregunta el TP 1: la Ingeniería de Sistemas es la más amplia; la Ingeniería de Software es una de sus partes y aplica a problemas grandes las teorías de las Ciencias de la Computación.');

  // Las cuatro actividades fundamentales, con su nombre "clásico" entre paréntesis
  const actividades = fig(U.svg(600, 150, `
    ${['Especificación', 'Desarrollo', 'Validación', 'Evolución'].map((t, i) => U.blk(10 + i * 150, 30, 130, 56, t, { cls: i === 1 ? 'k-a' : '', sub: ['(Análisis)', '(Diseño + programación)', '(Prueba)', '(Mantenimiento)'][i] })).join('')}
    ${[0, 1, 2].map((i) => U.ln([[140 + i * 150, 58], [160 + i * 150, 58]], { end: 'ar' })).join('')}
    ${U.ln([[530, 86], [530, 120], [75, 120], [75, 86]], { end: 'ar', dash: true })}
    <text x="300" y="138" class="u-c u-sm">los requerimientos cambian: el software evoluciona y se vuelve a especificar</text>`,
    'Las cuatro actividades comunes a todo proceso de software: especificación, desarrollo, validación y evolución, con retorno desde la evolución a la especificación'),
    'Las 4 actividades comunes a todos los procesos de software (Sommerville). Cada tipo de sistema las organiza distinto: un sistema crítico especifica todo antes de desarrollar; un comercio electrónico especifica y programa en conjunto.');

  // Proceso de desarrollo de prototipos (Sommerville, figura 2.9)
  const protoProc = fig(U.svg(620, 150, `
    ${['Establecer objetivos\ndel prototipo', 'Definir la\nfuncionalidad', 'Desarrollar\nel prototipo', 'Evaluar\nel prototipo'].map((t, i) => U.blk(8 + i * 154, 16, 136, 58, t, { cls: i === 3 ? 'k-a' : '' })).join('')}
    ${[0, 1, 2].map((i) => U.ln([[144 + i * 154, 45], [162 + i * 154, 45]], { end: 'ar' })).join('')}
    ${['Plan de creación\nde prototipos', 'Definición\ngeneral', 'Prototipo\nejecutable', 'Reporte de\nevaluación'].map((t, i) => U.blk(22 + i * 154, 96, 108, 44, t, { bold: false, cls: 'k-ghost' })).join('')}
    ${[0, 1, 2, 3].map((i) => U.ln([[76 + i * 154, 74], [76 + i * 154, 96]], { end: 'op', dash: true })).join('')}`,
    'Proceso de desarrollo de prototipos en cuatro etapas, cada una con su producto'),
    'Modelo del proceso para desarrollo de prototipos. Arriba, las actividades; abajo, lo que produce cada una. Los objetivos tienen que ser explícitos desde el principio: un mismo prototipo no puede cumplirlos todos.');

  LESSONS.push(
    {
      id: 'la-materia',
      module: 'm1',
      title: 'La materia dentro de la carrera',
      keywords: 'integradora tercer nivel resultados de aprendizaje RA competencias correlativas regularidad parciales cuestionarios TFI final promoción',
      tldr: 'Diseño de Sistemas de Información es la <mark>materia integradora del tercer nivel</mark>: toma lo aprendido en Análisis de Sistemas y en Sistemas y Procesos de Negocio y lo lleva a modelos de solución con UML, patrones y criterios de calidad. Tiene seis unidades, un resultado de aprendizaje por unidad y dos parciales teórico-prácticos.',
      goals: ['Ubicar la materia en el plan de estudios y en el área de Sistemas de Información.', 'Enumerar los seis resultados de aprendizaje y a qué unidad corresponde cada uno.', 'Conocer las condiciones de regularidad, promoción y final.'],
      body: `
        <h2>Dónde está la materia</h2>
        <p>El Ministerio de Educación fija los <strong>contenidos curriculares básicos</strong> que toda carrera debe cubrir para que su título tenga validez nacional (Resoluciones 1557/2021 y 1575/2022, ratificadas por la Ordenanza 1877/2022). De ellos derivan los planes de estudio, organizados en cuatro <strong>bloques de conocimiento</strong>:</p>
        ${table(['Bloque', 'Carga mínima'], [['Ciencias Básicas de la Ingeniería', '710 horas'], ['Tecnologías Básicas', '545 horas'], ['Tecnologías Aplicadas (acá está DSI)', '545 horas'], ['Ciencias y Tecnologías Complementarias', '365 horas']])}
        <p>La carrera dura 5 años, con una carga mínima de 3600 horas (3992 en modalidad presencial) y al menos 750 horas de formación práctica, que incluyen un Proyecto Integrador.</p>
        <p>DSI pertenece al <strong>área de Sistemas de Información</strong>, junto con Sistemas y Procesos de Negocio, Análisis de Sistemas de Información, Administración de Sistemas de Información y Proyecto Final. Esas materias forman el <strong>espacio interdisciplinario e integrador</strong> de la carrera: su finalidad es fortalecer los conceptos fundamentales de la profesión y mostrar las características del trabajo ingenieril. DSI es la troncal del 3er nivel: anual, 6 horas semanales, 144 horas en total.</p>
        ${table(['Antes (correlativas anteriores)', 'Después (correlativas posteriores)'], [['Análisis de Sistemas de Información<br>Sistemas y Procesos de Negocio', 'Ingeniería y Calidad de Software<br>Administración de Sistemas de Información<br>Sistemas de Gestión<br>Proyecto Final (para cursar)']])}

        <h2>Para qué sirve: alcances y competencias</h2>
        <p>Entre las actividades reservadas al título (Resolución 1254/2018) está <strong>AR1</strong>: especificar, proyectar y desarrollar sistemas de información, de comunicación de datos y software cuya utilización pueda afectar la seguridad, salud, bienes o derechos. Los alcances no reservados ligados a DSI son:</p>
        <ul>
          <li><strong>AL1</strong>: definir políticas vinculadas a sistemas de información, sistemas de comunicación de datos y software.</li>
          <li><strong>AL4</strong>: diseñar, desarrollar e implementar programas y actividades de innovación en procesos y productos relacionados con los sistemas de información.</li>
        </ul>
        <p>Aporta a competencias genéricas tecnológicas (CG1 identificar, formular y resolver problemas de ingeniería; CG2 concebir, diseñar y desarrollar proyectos; CG4 usar técnicas y herramientas), sociales (CG6 trabajo en equipo, CG7 comunicación, CG8 ética y compromiso social, CG9 aprendizaje continuo) y específicas (CE1.1 y CE1.3 desarrollar sistemas y software, CE3.1 métricas y normas de calidad, CE4.1 certificar funcionamiento, CE5.1 dirigir la implementación y el mantenimiento).</p>

        <h2>Objetivos y resultados de aprendizaje</h2>
        <p>Los cinco objetivos de la materia son: distinguir metodologías, modelos, técnicas y lenguajes del proceso de diseño; elaborar modelos de diseño aplicando diseño de arquitectura; aplicar patrones orientados a un diseño de calidad; emplear conceptos de experiencia de usuario; y aplicar herramientas de verificación y validación con criterios de calidad y seguridad.</p>
        <p>La cátedra define <strong>un resultado de aprendizaje por unidad</strong>. Conviene saberlos porque cada trabajo práctico se arma alrededor de uno:</p>
        ${table(['RA', 'Unidad', 'Qué tenés que poder hacer'], [
          ['RA1', 'I. Metodologías', 'Utilizar metodologías de desarrollo para diseñar sistemas adaptados a contextos organizacionales, bajo criterios ágiles y en equipos colaborativos.'],
          ['RA2', 'II. Arquitectura', 'Producir documentación técnica de diseño arquitectónico (SAD) para asegurar la calidad.'],
          ['RA3', 'III. Interfaces', 'Diseñar interfaces de usuario efectivas, intuitivas y accesibles en diversas plataformas.'],
          ['RA4', 'IV. UX y procesos', 'Usar los “secretos” de la experiencia de usuario para validar usabilidad y funcionalidad con pruebas y métricas predefinidas.'],
          ['RA5', 'V. Patrones', 'Aplicar patrones para diseñar diagramas de colaboración que sirvan de base a los diagramas de clases de diseño.'],
          ['RA6', 'VI. V&V y seguridad', 'Evaluar el diseño mediante pruebas dinámicas y de escenario para garantizar funcionalidad, rendimiento y seguridad.'],
        ])}
        <p>Los <strong>contenidos mínimos</strong> que exige el plan son: diseño de arquitecturas, patrones de diseño, verificación y validación del diseño, experiencia de usuario, diseño de procesos, estrategias de prototipado y de diseño de componentes, integración de sistemas, y calidad y seguridad en el diseño.</p>

        <h2>Cómo se aprueba</h2>
        ${table(['Requisito para regularizar', 'Detalle'], [
          ['Asistencia', '75% de las clases teóricas y prácticas.'],
          ['Cuestionarios de autoevaluación', 'Uno por clase teórica, de 20 preguntas en Teams. Se aprueba con 6 (12 correctas). Si se desaprueban o no se responden, en febrero hay 24 horas para recuperarlos todos.'],
          ['Trabajos prácticos', 'Todos aprobados, en equipo, en los plazos del auxiliar docente.'],
          ['TFI', 'Trabajo Final Integrador aprobado.'],
          ['Parciales', 'Los dos aprobados con al menos 6, en teoría y en práctica por separado. Cada uno tiene recuperación inmediata; si se desaprueba la recuperación, hay un integral en febrero.'],
        ])}
        <p>Cada parcial es escrito, individual y dura una hora y media: <strong>5 preguntas teóricas</strong> y una parte práctica con ejercicios. La nota que vale es la del último parcial o recuperación rendida, sin aumentos (salvo las aulas invertidas, que suman solo en la teoría). Con <strong>7 o más</strong> en cada parcial (teoría y práctica) se <strong>promociona</strong>; el mismo criterio vale para el integral.</p>
        <p>El <strong>final</strong> tiene preguntas teóricas (hay que sumar al menos 3 puntos para que se corrija la práctica) y <strong>un ejercicio práctico sobre UML y la metodología de Craig Larman</strong> de diseño orientado a objetos, que también debe sumar al menos 3. Se aprueba con 6 y se puede rendir hasta cuatro veces.</p>
        ${note('El ejercicio del final es siempre de diseño orientado a objetos al estilo Larman: diagramas de colaboración con patrones GRASP y diagrama de clases de diseño. Es la Unidad V, y por eso el <a href="#/integral">integral</a> de esta guía tiene casos de ese tipo.', 'exam')}
      `,
      quiz: [
        { q: '¿En qué bloque curricular está Diseño de Sistemas de Información?', o: ['Tecnologías Aplicadas', 'Tecnologías Básicas', 'Ciencias Básicas de la Ingeniería', 'Ciencias y Tecnologías Complementarias'], a: 0, e: 'DSI pertenece al bloque de Tecnologías Aplicadas (mínimo 545 horas) y al área de Sistemas de Información.' },
        { q: '¿Qué resultado de aprendizaje corresponde a la Unidad II?', o: ['Producir documentación técnica de diseño arquitectónico (SAD)', 'Diseñar interfaces de usuario efectivas', 'Aplicar patrones para diseñar diagramas de colaboración', 'Evaluar el diseño con pruebas dinámicas y de escenario'], a: 0, e: 'RA2 es el SAD. RA3 son las interfaces (Unidad III), RA5 los patrones (Unidad V) y RA6 las pruebas (Unidad VI).' },
        { q: '¿Cuántas respuestas correctas hacen falta para aprobar un cuestionario de autoevaluación de 20 preguntas?', o: ['12', '10', '14', '6'], a: 0, e: 'Se aprueba con 6 puntos sobre 10, es decir, 12 correctas de 20.' },
        { q: '¿Qué condición da la promoción directa?', o: ['7 o más en cada parcial, en teoría y en práctica', '6 o más en ambos parciales, en teoría y en práctica', '7 de promedio entre los dos parciales y el TFI aprobado', 'Aprobar el TFI con 7 y todos los cuestionarios con 6'], a: 0, e: 'Promociona quien saca 7 o más en cada parcial y sus recuperaciones, en la teoría y en la práctica. Con 6 se regulariza.' },
        { q: '¿Qué tiene siempre el ejercicio práctico del examen final?', o: ['UML y la metodología de Larman', 'Un sprint de Scrum completo con su pila y tablero', 'Un SAD con tabla de factores y memorándums', 'Casos de prueba por particiones y fronteras'], a: 0, e: 'El final tiene preguntas teóricas y 1 ejercicio práctico sobre UML y la metodología de Larman; cada parte debe sumar al menos 3 puntos.' },
        { q: '¿Cuál de estas NO es correlativa posterior de DSI?', o: ['Análisis de Sistemas de Información', 'Ingeniería y Calidad de Software', 'Sistemas de Gestión', 'Administración de Sistemas de Información'], a: 0, e: 'Análisis de Sistemas es anterior: DSI toma como base lo aprendido allí y en Sistemas y Procesos de Negocio.' },
      ],
      sources: [
        { title: 'Presentación de la materia (clase 1)', ref: 'Diapositivas de la cátedra, 2026', points: ['Bloques de conocimiento, actividades reservadas y alcances del título.', 'Objetivos, resultados de aprendizaje RA1 a RA6 y contenidos mínimos.', 'Pautas de regularidad, cuestionarios, trabajos prácticos, parciales y final.'] },
        { title: 'Planificación de la cátedra 2026', ref: 'Programa de Diseño de Sistemas v3', points: ['Programa analítico de las seis unidades con su carga horaria.', 'Cronograma por comisión: el primer parcial llega hasta la clase 23 (Casos de uso reales, formularios y GUI).'] },
      ],
    },

    {
      id: 'software-profesional',
      module: 'm1',
      title: 'Ingeniería de software y software profesional',
      keywords: 'ingeniería de software definición disciplina software profesional programa documentación genérico personalizado a medida especificación costos 60 40 retos',
      tldr: 'El software profesional lo hacen <mark>equipos, para que lo use otro y lo cambien otros</mark>; por eso es mucho más que un programa: incluye configuración, documentación y datos. La ingeniería de software es la disciplina que se ocupa de <em>todos</em> los aspectos de su producción, desde la especificación hasta el mantenimiento.',
      goals: ['Explicar por qué el software es esencial y por qué falla.', 'Diferenciar software profesional de programación personal.', 'Distinguir productos genéricos de personalizados según quién controla la especificación.', 'Dar la definición de ingeniería de software y sus dos frases clave.'],
      body: `
        <h2>Un mundo que no funciona sin software</h2>
        <p>Es imposible operar el mundo moderno sin software: las infraestructuras de servicios públicos se controlan con sistemas computarizados, muchos productos eléctricos incluyen una computadora con software de control, la fabricación, la distribución y el sistema financiero están computarizados, y el entretenimiento (música, juegos, cine, televisión) lo usa de manera intensiva. Por eso la ingeniería de software es esencial para el funcionamiento actual.</p>
        <p>Los sistemas de software son <strong>abstractos e intangibles</strong>: no los rigen leyes físicas ni procesos de fabricación. Esa libertad tiene un costo: pueden volverse rápidamente muy complejos, difíciles de entender y caros de cambiar. Además hay muchos tipos (desde sistemas embebidos simples hasta sistemas de información mundiales) y cada uno requiere un enfoque distinto: <em>todas las aplicaciones necesitan ingeniería de software, pero no todas las mismas técnicas</em>.</p>
        <p>Muchas “fallas del software” se explican por dos factores:</p>
        <ol>
          <li><strong>Demandas crecientes</strong>: hay que construir y distribuir sistemas más rápido, más grandes y más complejos, con capacidades que antes se consideraban imposibles.</li>
          <li><strong>Expectativas bajas</strong>: es sencillo programar sin métodos de ingeniería. Muchas empresas recién los adoptan cuando sus productos evolucionan; mientras tanto, su software es más caro y menos confiable. La solución es más educación y capacitación en ingeniería de software.</li>
        </ol>

        <h2>Software profesional y software de aficionado</h2>
        <p>Muchos programan: empleados que automatizan una planilla, científicos que procesan datos, aficionados. Pero el <strong>desarrollo de software es una actividad profesional</strong>: se hace para propósitos de negocio, para incluirse en dispositivos o como producto. El software profesional:</p>
        <ul>
          <li>está destinado a que lo use <strong>alguien distinto de su desarrollador</strong>;</li>
          <li>lo hacen <strong>equipos</strong>, no individuos;</li>
          <li>se <strong>mantiene y cambia</strong> a lo largo de su vida.</li>
        </ul>
        <p>Si diseñás un programa para vos, nadie más lo usará: no hace falta escribir guías ni documentar el diseño. Si otros lo van a usar y otros ingenieros lo van a cambiar, tenés que entregar información adicional además del código.</p>
        ${def('Sistema de software profesional', 'Más que un programa: consta de programas separados y archivos de configuración con los que se instalan; documentación del sistema que describe su estructura; documentación del usuario que explica cómo usarlo, y sitios web para que los usuarios descarguen información del producto.', 'Sommerville, cap. 1. Responde la pregunta 4 del TP 1.')}

        <h2>Preguntas que plantea la ingeniería de software</h2>
        ${table(['Pregunta', 'Respuesta'], [
          ['¿Cuáles son sus principales retos?', 'Diversidad creciente, tiempos de producción y distribución limitados y desarrollo de software confiable.'],
          ['¿Cuáles son sus costos?', 'Aproximadamente 60% desarrollo y 40% prueba. En el software a medida, los costos de evolución suelen superar a los de desarrollo.'],
          ['¿Cuáles son los mejores métodos?', 'Ninguno es mejor que otro: hay técnicas adecuadas para cada tipo de sistema. Los juegos se diseñan con prototipos; los sistemas críticos requieren una especificación completa y analizable.'],
        ])}

        <h2>Productos genéricos y personalizados</h2>
        <p>Los ingenieros de software se interesan por desarrollar <strong>productos de software</strong>, que pueden venderse a clientes. Hay dos tipos:</p>
        ${table(['', 'Producto genérico', 'Producto personalizado (a medida)'], [
          ['Qué es', 'Sistema independiente que se produce y vende en el mercado a cualquier cliente.', 'Sistema para un cliente en particular, que lo encarga a un contratista.'],
          ['Quién controla la especificación', '<strong>La organización que desarrolla</strong> el software.', '<strong>La organización que compra</strong>: desarrolla y controla la especificación, y los desarrolladores la siguen.'],
          ['Ejemplos', 'Procesadores de texto, herramientas de diseño, sistemas para un nicho (gestión de turnos para consultorios).', 'Sistema de control de tráfico aéreo, sistema de una empresa puntual.'],
        ])}
        <p>La distinción es cada vez <strong>más difusa</strong>: muchos sistemas se construyen sobre un producto genérico que luego se adapta a los requerimientos de un cliente (por ejemplo, un ERP configurado para una empresa).</p>

        <h2>Qué es la ingeniería de software</h2>
        ${def('Ingeniería de software', 'Disciplina de la ingeniería que se interesa por todos los aspectos de la producción de software, desde las primeras etapas de la especificación del sistema hasta el mantenimiento del sistema después de que se pone en operación.', 'Sommerville, cap. 1.')}
        <p>Hay dos frases clave:</p>
        <ol>
          <li><strong>Disciplina de ingeniería</strong>: los ingenieros hacen que las cosas funcionen. Aplican teorías, métodos y herramientas de manera selectiva, y buscan soluciones aun cuando no hay teoría aplicable, siempre dentro de <strong>restricciones organizacionales y financieras</strong>.</li>
          <li><strong>Todos los aspectos de la producción</strong>: no solo los procesos técnicos, también la administración del proyecto y el desarrollo de herramientas, métodos y teorías que apoyan la producción.</li>
        </ol>
        <p>La ingeniería busca resultados de la <strong>calidad requerida, dentro de la fecha y del presupuesto</strong>. Quien programa para sí puede tomarse todo el tiempo que quiera; el ingeniero adopta un enfoque sistemático y organizado, y elige el método más adecuado para cada caso.</p>
        <p>Es importante por dos razones: cada vez se usa más software avanzado, que hay que producir económica y rápidamente con confiabilidad; y a largo plazo es <strong>más barato</strong> usar métodos de ingeniería que programar como proyecto personal, porque lo caro es cambiar el software después de ponerlo en operación.</p>
        ${note('“Ingeniería de software” no abarca solo los programas: también la documentación asociada y los datos de configuración necesarios para que operen correctamente. Si te preguntan qué produce la disciplina, no respondas “código”.', 'warn')}
      `,
      quiz: [
        { q: 'En un producto de software personalizado, ¿quién controla la especificación?', o: ['La organización que compra el software', 'La organización que desarrolla el software', 'El equipo de pruebas', 'Nadie: se acuerda en cada iteración'], a: 0, e: 'En los productos a medida el cliente desarrolla y controla la especificación; en los genéricos la controla quien desarrolla.' },
        { q: 'Según Sommerville, ¿cómo se reparten aproximadamente los costos de la ingeniería de software?', o: ['60% desarrollo y 40% prueba', '40% desarrollo y 60% prueba', '80% codificación y 20% documentación', '50% análisis y 50% diseño'], a: 0, e: 'Alrededor de 60% de desarrollo y 40% de prueba; en software a medida, la evolución suele costar más que el desarrollo.' },
        { q: '¿Qué incluye un sistema de software desarrollado profesionalmente?', o: ['Programas, configuración, documentación del sistema y del usuario', 'Solo el código fuente, el ejecutable y los scripts de instalación', 'El código, las pruebas automatizadas y el plan de proyecto', 'El código, el contrato con el cliente y el manual de usuario'], a: 0, e: 'Un sistema profesional es más que un programa: suma configuración, documentación del sistema, del usuario y sitios web de información.' },
        { q: '¿Cuál de estas NO es una característica del software profesional?', o: ['Lo desarrolla y lo usa la misma persona', 'Lo usa alguien distinto de su desarrollador', 'Lo hacen equipos', 'Se mantiene y cambia durante su vida'], a: 0, e: 'Si lo usa solo quien lo hizo es programación personal, donde no hace falta documentar ni seguir métodos de especificación.' },
        { q: '¿Cuáles son los dos factores que explican muchas “fallas del software”?', o: ['Demandas crecientes y expectativas bajas', 'Lenguajes antiguos y hardware lento', 'Falta de pruebas y exceso de documentación', 'Clientes indecisos y equipos grandes'], a: 0, e: 'Se exigen sistemas más grandes y rápido (demandas crecientes), y es fácil programar sin ingeniería (expectativas bajas).' },
        { q: '¿Qué significa la frase “disciplina de ingeniería” en la definición de ingeniería de software?', o: ['Aplicar teorías y métodos en forma selectiva, dentro de restricciones', 'Que el software se rige por leyes físicas, igual que las demás ingenierías', 'Que solo se ocupa de los procesos técnicos de programación y prueba', 'Que exige seguir un método único y obligatorio para todo tipo de sistema'], a: 0, e: 'Los ingenieros hacen que las cosas funcionen y buscan soluciones dentro de limitaciones; la otra frase clave, “todos los aspectos”, suma la gestión del proyecto y las herramientas.' },
        { q: '¿Por qué es más barato, a largo plazo, usar métodos de ingeniería de software?', o: ['Porque lo más caro es cambiar el software ya en operación', 'Porque los métodos permiten eliminar la etapa de prueba del proceso', 'Porque se programa más rápido al no tener que documentar el diseño', 'Porque el hardware es cada vez más barato y compensa los errores'], a: 0, e: 'Los métodos encarecen un poco el desarrollo, pero abaratan mucho la evolución, que es donde está el mayor costo.' },
      ],
      sources: [
        { title: 'Ingeniería de Software, 9ª ed.', ref: 'Sommerville, cap. 1, págs. 3-17', points: ['Desarrollo de software profesional, preguntas frecuentes y tipos de producto.', 'Definición de ingeniería de software y por qué es importante.'] },
      ],
    },

    {
      id: 'actividades-y-disciplinas',
      module: 'm1',
      title: 'Cuatro actividades, tres disciplinas y tres problemas',
      keywords: 'proceso de software especificación desarrollo validación evolución ciencias de la computación ingeniería de sistemas heterogeneidad cambio empresarial seguridad confianza diseño de sistemas vs diseño de software atributos eficiencia mantenibilidad',
      tldr: 'Todo proceso de software tiene <mark>4 actividades</mark>: especificación, desarrollo, validación y evolución. La ingeniería de software se distingue de las <strong>ciencias de la computación</strong> (teoría) y queda <em>dentro</em> de la <strong>ingeniería de sistemas</strong>, que diseña el sistema completo: hardware, políticas, procesos y software. Y todo software enfrenta <mark>3 problemas</mark>: heterogeneidad, cambio y seguridad.',
      goals: ['Nombrar y explicar las 4 actividades comunes a los procesos de software.', 'Comparar ingeniería de software, ciencias de la computación e ingeniería de sistemas.', 'Diferenciar una decisión de diseño de sistemas de una de diseño de software.', 'Explicar los 3 problemas que afectan a todo tipo de software.'],
      body: `
        <h2>El proceso de software y sus 4 actividades</h2>
        ${def('Proceso de software', 'Secuencia de actividades que conducen a la elaboración de un producto de software.', 'Sommerville, cap. 1.')}
        <p>Aunque cada organización arma su propio proceso, <strong>todos</strong> comparten cuatro actividades fundamentales:</p>
        ${actividades}
        ${table(['Actividad', 'Qué se hace', 'Nombre habitual'], [
          ['1. Especificación', 'Se define el software que se producirá y las restricciones en su operación.', 'Análisis'],
          ['2. Desarrollo', 'Se diseña y programa el software.', 'Diseño y programación'],
          ['3. Validación', 'Se verifica el software para asegurar que sea lo que el cliente requiere.', 'Prueba'],
          ['4. Evolución', 'Se modifica para reflejar los requerimientos cambiantes del cliente y del mercado.', 'Mantenimiento'],
        ])}
        <p>Distintos tipos de sistema necesitan procesos distintos: los <strong>sistemas críticos</strong> deben especificarse por completo antes de comenzar el desarrollo; en un <strong>comercio electrónico</strong>, especificación y programa se desarrollan en conjunto.</p>

        <h2>Ingeniería de software, ciencias de la computación e ingeniería de sistemas</h2>
        ${table(['Disciplina', 'De qué se ocupa'], [
          ['Ciencias de la Computación', 'Estudia las <strong>teorías y métodos</strong> de las computadoras y los sistemas de software. Son más aplicables a programas pequeños: no alcanzan para grandes problemas complejos.'],
          ['Ingeniería de Software', 'Vela por los <strong>asuntos prácticos</strong> de la producción de software. Necesita cierto conocimiento de computación, como un ingeniero electricista necesita física.'],
          ['Ingeniería de Sistemas', 'Estudia el desarrollo y la evolución de <strong>sistemas complejos donde el software tiene un papel principal</strong>: desarrollo de hardware, diseño de políticas y procesos, implementación del sistema y también ingeniería de software.'],
        ])}
        ${disciplinas}
        <p>Los <strong>ingenieros de sistemas</strong> intervienen en la especificación del sistema, <strong>definen su arquitectura global</strong> e integran las diferentes partes para crear el sistema terminado. Están menos interesados en la ingeniería de los componentes (hardware, software) y más en cómo encajan.</p>

        <h2>Diseño de sistemas vs. diseño de software</h2>
        <p>De lo anterior sale la diferencia que da nombre a la unidad. El caso del TP 2 (telemedicina para zonas rurales) la muestra con claridad:</p>
        ${table(['', 'Diseño de sistemas (visión macro)', 'Diseño de software (visión detallada)'], [
          ['Foco', 'Cómo interactúan todos los componentes: humanos, hardware, redes, procesos y software.', 'La lógica interna: objetos, algoritmos y cómo fluyen los datos dentro de la aplicación.'],
          ['Ejemplos del TP 2', 'Servidor espejo en cada hospital regional para seguir operando si se cae la conexión; tablets con cámara de 5 MP y 4G/5G; protocolo legal de firma digital antes de emitir la receta.', 'Módulo que ajusta la calidad del video según el ancho de banda (eficiencia); patrón Observer para notificar a la enfermera; modo offline que guarda notas y las sube después (mantenibilidad).'],
          ['Qué produce', 'La arquitectura global y las reglas del juego para que el software tenga dónde correr.', 'El diseño de módulos, clases e interfaces que se van a programar.'],
          ['Quién decide', 'Ingeniero de sistemas', 'Ingeniero de software'],
        ])}
        <p>Los límites son cada vez más <strong>difusos</strong> porque el software está en todo: hoy muchas decisiones de sistema (redundancia, distribución, seguridad) se implementan en software, y el software configura el hardware sobre el que corre.</p>
        ${note('Para clasificar una decisión, preguntá: ¿se resuelve escribiendo o reorganizando código? Diseño de software. ¿Se resuelve con hardware, red, personas, normas o procedimientos? Diseño de sistemas. Ejemplo clásico de parcial: si el servidor regional no tiene RAM suficiente para procesar los videos, el error es de <strong>diseño de sistemas</strong> (dimensionamiento de la infraestructura).', 'exam')}

        <h2>Atributos esenciales del buen software</h2>
        <p>Sommerville resume la calidad del producto en cuatro atributos (los pide el TP 1):</p>
        ${table(['Atributo', 'Significado'], [
          ['Mantenibilidad', 'El software debe poder <strong>evolucionar</strong> para satisfacer necesidades cambiantes. Es crítico porque el cambio es inevitable en un entorno empresarial variable.'],
          ['Confiabilidad y seguridad', 'Incluye fiabilidad, seguridad y protección: una falla no debe causar daño físico ni económico, y nadie malintencionado debe poder acceder o dañarlo.'],
          ['Eficiencia', 'No desperdiciar recursos del sistema (memoria, ciclos de procesador): capacidad de respuesta, tiempo de procesamiento, uso de memoria.'],
          ['Aceptabilidad', 'Ser aceptable para sus usuarios: comprensible, utilizable y compatible con los otros sistemas que usan.'],
        ])}

        <h2>Los 3 problemas que afectan a todo tipo de software</h2>
        <ol>
          <li><strong>Heterogeneidad</strong>: los sistemas operan en redes con distintos tipos de computadoras y dispositivos, y hay que integrar software nuevo con sistemas viejos escritos en otros lenguajes. Hay que construir software confiable y flexible frente a esa diversidad.</li>
          <li><strong>Cambio empresarial y social</strong>: negocios y sociedad cambian rápido con la economía y las nuevas tecnologías. Las técnicas tradicionales consumen tiempo y la entrega tarda más de lo planeado: hay que reducir el tiempo para dar valor al cliente.</li>
          <li><strong>Seguridad y confianza</strong>: como el software está en todos los aspectos de la vida, hay que poder confiar en él, sobre todo en los sistemas accesibles por la Web. Nadie debe poder atacarlo y debe conservarse la seguridad de la información.</li>
        </ol>
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿Diseño de sistemas o diseño de software?',
        intro: 'Clasificá cada decisión del caso de telemedicina y de otros sistemas. Recordá la pregunta: ¿se resuelve en el código o fuera de él?',
        buckets: ['Diseño de sistemas', 'Diseño de software'],
        items: [
          { t: 'Instalar un servidor espejo en cada hospital regional.', b: 0, why: 'Es infraestructura y distribución física: arquitectura global.' },
          { t: 'Exigir tablets con cámara de 5 MP y soporte 4G/5G.', b: 0, why: 'Es una especificación de hardware.' },
          { t: 'Usar el patrón Observer para avisar a la enfermera cuando cambia la historia clínica.', b: 1, why: 'Es la estructura interna de objetos de la aplicación.' },
          { t: 'Protocolo legal: el médico firma digitalmente antes de emitir la receta.', b: 0, why: 'Es una política o proceso de la organización.' },
          { t: 'Algoritmo que baja la calidad del video si la conexión es lenta.', b: 1, why: 'Es lógica interna de la aplicación (eficiencia).' },
          { t: 'Modo offline que guarda notas y las sincroniza al volver la red.', b: 1, why: 'Es un mecanismo del software (mantenibilidad y evolución).' },
          { t: 'Definir cuántos operadores atienden el call center y en qué turnos.', b: 0, why: 'Personas y procedimientos: parte del sistema, no del software.' },
          { t: 'Separar la lógica de negocio de las clases que acceden a la base de datos.', b: 1, why: 'Es la organización del código.' },
        ],
      }],
      exercises: [
        { title: 'Relación jerárquica entre disciplinas', official: '1.1', level: 1, prompt: '<p>¿Cómo se define la relación jerárquica entre la Ingeniería de Sistemas y la Ingeniería de Software?</p>', solution: { explain: '<p>La Ingeniería de Sistemas es la más amplia: se ocupa del desarrollo y la evolución de sistemas complejos en los que el software tiene un papel principal, e incluye el hardware, las políticas, los procesos, la implementación <strong>y</strong> la ingeniería de software. La Ingeniería de Software es por lo tanto <strong>una parte</strong> de la Ingeniería de Sistemas, centrada en la producción del software.</p>' } },
        { title: 'Foco de cada ingeniero', official: '1.2', level: 1, prompt: '<p>¿Cuál es el foco principal del Ingeniero de Sistemas frente al de Software?</p>', solution: { explain: '<p>El ingeniero de sistemas se enfoca en el <strong>sistema como un todo</strong>: interviene en la especificación, define la arquitectura global e integra las partes (hardware, software, personas, procesos). El ingeniero de software se enfoca en los <strong>asuntos prácticos de producir el software</strong>: especificarlo, diseñarlo, construirlo, validarlo y hacerlo evolucionar con calidad, dentro de fecha y presupuesto.</p>' } },
        { title: 'Qué integra el diseño de sistemas', official: '1.3', level: 1, prompt: '<p>¿Qué elementos integran el Diseño de Sistemas más allá del software?</p>', solution: { explain: '<p>El hardware (equipos, redes, dispositivos), el diseño de <strong>políticas y procesos</strong> de la organización (normas, protocolos, procedimientos legales), las <strong>personas</strong> que operan el sistema y la <strong>implementación e integración</strong> de todas las partes en un sistema terminado. El software es uno de los componentes.</p>' } },
        { title: 'Componentes de un sistema de software profesional', official: '1.4', level: 1, prompt: '<p>¿Qué componentes integran un “sistema de software” profesional?</p>', solution: { explain: '<p>Programas separados; archivos de configuración con los que se instalan; documentación del sistema (describe su estructura); documentación del usuario (explica cómo usarlo) y sitios web para descargar información del producto. Es mucho más que un programa.</p>' } },
        { title: 'Ciencias de la Computación vs. Ingeniería de Software', official: '1.5', level: 1, prompt: '<p>¿Cuál es la diferencia fundamental entre las Ciencias de la Computación y la Ingeniería de Software?</p>', solution: { explain: '<p>Las Ciencias de la Computación estudian las <strong>teorías y métodos</strong> de las computadoras y los sistemas de software; la Ingeniería de Software se ocupa de los <strong>asuntos prácticos</strong> de producir software. Las teorías de computación sirven sobre todo para programas pequeños; los problemas grandes y complejos requieren ingeniería. El ingeniero de software necesita conocer computación como el ingeniero electricista necesita física.</p>' } },
        { title: 'Rol del ingeniero de sistemas en la arquitectura', official: '1.6', level: 1, prompt: '<p>¿Qué rol cumple el Ingeniero de Sistemas en la arquitectura global?</p>', solution: { explain: '<p>Interviene en la especificación del sistema, <strong>define su arquitectura global</strong> (qué partes hay, dónde corren, cómo se comunican y con qué hardware) e <strong>integra</strong> las diferentes partes, propias o de proveedores, para crear el sistema terminado.</p>' } },
        { title: 'Control de la especificación', official: '1.7', level: 1, prompt: '<p>¿Cómo varía el control de la especificación entre un Producto Genérico y uno Personalizado?</p>', solution: { explain: '<p>En el <strong>producto genérico</strong> la organización que desarrolla controla la especificación (decide qué hace el producto para el mercado). En el <strong>personalizado</strong>, la organización que compra desarrolla y controla la especificación, y los desarrolladores la siguen. La frontera es difusa: muchos sistemas parten de un genérico que se adapta al cliente.</p>' } },
        { title: 'El atributo de eficiencia', official: '1.8', level: 2, prompt: '<p>¿Qué implica el atributo de “Eficiencia” en el diseño de software profesional?</p>', solution: { explain: '<p>Que el software no desperdicie los recursos del sistema, como la memoria y los ciclos del procesador. Incluye capacidad de respuesta, tiempo de procesamiento y utilización de memoria. En el TP 2, el módulo que ajusta la calidad del video al ancho de banda es una decisión de eficiencia. Se relaciona con el “Rendimiento” (Performance) del modelo FURPS+ de la Unidad II.</p>' } },
        { title: 'Evolución del software', official: '1.9', level: 2, prompt: '<p>¿En qué consiste la “Evolución del Software” y por qué es vital?</p>', solution: { explain: '<p>Es la cuarta actividad del proceso: modificar el software para reflejar los requerimientos cambiantes del cliente y del mercado (mantenimiento). Es vital porque el cambio empresarial y social es inevitable (uno de los 3 problemas de todo software), porque en el software a medida la evolución suele costar más que el desarrollo, y porque un software que no puede evolucionar queda obsoleto. Por eso la <strong>mantenibilidad</strong> es un atributo esencial.</p>' } },
        { title: 'Límites cada vez más difusos', official: '1.10', level: 2, prompt: '<p>¿Por qué se afirma que los límites entre el diseño de software y de sistemas son cada vez más “difusos”?</p>', solution: { explain: '<p>Porque el software se volvió el componente central de casi todo sistema: funciones que antes se resolvían con hardware o procedimientos (redundancia, sincronización, seguridad, controles) hoy se implementan en software, y el software configura el hardware sobre el que corre. Además, muchos productos se construyen sobre software genérico adaptado, y los sistemas operan en redes heterogéneas que obligan a decidir sistema y software juntos.</p>' } },
        { title: 'Telemedicina: ¿error de sistemas o de software?', official: '2.1', level: 2, prompt: '<p>Caso “Sistema de Telemedicina de Alta Disponibilidad”. Si el sistema falla porque el servidor regional no tiene suficiente memoria RAM para procesar los videos, ¿fue un error de Diseño de Sistemas o de Diseño de Software? Justificá.</p>', hints: ['¿Quién especificó el servidor espejo y su hardware?'], solution: { explain: '<p>Es un error de <strong>Diseño de Sistemas</strong>. La decisión de instalar servidores espejo y su dimensionamiento de hardware forman parte de la infraestructura y la arquitectura global, que define el ingeniero de sistemas. El software puede ser eficiente, pero si la plataforma no tiene los recursos que exige la carga de video prevista, falló la especificación del sistema. (Si el software desperdiciara memoria sin necesidad, también habría un problema de eficiencia del software, pero la causa planteada es de capacidad de hardware.)</p>' } },
        { title: 'Telemedicina: agregar un tipo de receta tarda meses', official: '2.2', level: 2, prompt: '<p>Si el sistema funciona bien, pero el código es tan desordenado que agregar un nuevo tipo de receta médica tarda meses, ¿qué atributo de calidad del software falló?</p>', solution: { explain: '<p>La <strong>mantenibilidad</strong> (capacidad de evolucionar). El sistema cumple su función pero no puede cambiar a un costo razonable, que es justamente lo que mide ese atributo. En FURPS+ corresponde a <strong>Soporte</strong> (supportability: adaptabilidad y facilidad de mantenimiento). Es una falla de diseño de software: la estructura interna del código.</p>' } },
        { title: 'Telemedicina: algo puramente de sistemas', official: '2.3', level: 1, prompt: '<p>Identificá un elemento del caso que sea puramente de Ingeniería de Sistemas y no de software.</p>', solution: { explain: '<p>Cualquiera de estos: el <strong>protocolo legal de firma digital</strong> antes de emitir la receta (política/proceso), la <strong>especificación de las tablets</strong> (cámara de 5 MP, 4G/5G: hardware) o la decisión de instalar un <strong>servidor espejo</strong> en cada hospital regional (infraestructura). El más “puro” es el protocolo legal: es una regla del juego que existiría aunque no hubiera software.</p>' } },
      ],
      quiz: [
        { q: '¿Cuál es el orden de las 4 actividades comunes a los procesos de software?', o: ['Especificación, desarrollo, validación y evolución', 'Análisis, diseño, codificación y prueba', 'Planificación, ejecución, control y cierre', 'Requerimientos, arquitectura, pruebas y despliegue'], a: 0, e: 'Sommerville las llama especificación (análisis), desarrollo (diseño y programación), validación (prueba) y evolución (mantenimiento).' },
        { q: '¿Qué disciplina se ocupa del hardware, las políticas, los procesos y además del software?', o: ['Ingeniería de Sistemas', 'Ingeniería de Software', 'Ciencias de la Computación', 'Análisis de Sistemas'], a: 0, e: 'La ingeniería de sistemas abarca el sistema completo; la de software es una parte de ella.' },
        { q: '¿Para qué tipo de problemas alcanzan las ciencias de la computación, según las diapositivas?', o: ['Para programas pequeños; los problemas grandes y complejos necesitan ingeniería de software', 'Para cualquier sistema, sin importar el tamaño', 'Solo para sistemas embebidos', 'Para sistemas críticos que requieren especificación formal'], a: 0, e: 'Las teorías de la computación son más aplicables a programas pequeños; los grandes problemas requieren ingeniería.' },
        { q: '“Hay que integrar software nuevo con sistemas viejos escritos en otros lenguajes y operar en redes con distintos dispositivos.” ¿Qué problema describe?', o: ['Heterogeneidad', 'Cambio empresarial y social', 'Seguridad y confianza', 'Expectativas bajas'], a: 0, e: 'La heterogeneidad es la diversidad de plataformas, dispositivos y lenguajes que el software debe integrar.' },
        { q: 'En el caso de telemedicina, el modo offline que guarda notas localmente y las sube al volver la conexión es una decisión de...', o: ['Diseño de software, ligada a la mantenibilidad y la evolución', 'Diseño de sistemas, porque involucra la red', 'Diseño de procesos de la organización', 'Diseño de hardware'], a: 0, e: 'Se resuelve en la lógica de la aplicación; el caso lo justifica como evolución y mantenibilidad.' },
        { q: '¿Qué atributo esencial del software falla si agregar una función nueva tarda meses porque el código es desordenado?', o: ['Mantenibilidad', 'Eficiencia', 'Aceptabilidad', 'Confiabilidad'], a: 0, e: 'La mantenibilidad es la capacidad de evolucionar a un costo razonable.' },
        { q: '¿Qué tipo de sistema debe especificarse por completo antes de comenzar a desarrollarse?', o: ['Un sistema crítico', 'Un comercio electrónico', 'Un juego', 'Un sistema personal'], a: 0, e: 'En los sistemas críticos la especificación completa y analizable es esencial; en el comercio electrónico se especifica y programa en conjunto.' },
        { q: 'El atributo “eficiencia” del buen software significa...', o: ['No desperdiciar recursos del sistema como memoria y ciclos de procesador', 'Que el software se entregue rápido', 'Que tenga pocas líneas de código', 'Que el usuario aprenda a usarlo en poco tiempo'], a: 0, e: 'Eficiencia es capacidad de respuesta, tiempo de procesamiento y uso de memoria. Aprender rápido es aceptabilidad o usabilidad.' },
      ],
      sources: [
        { title: 'Ingeniería de Software, 9ª ed.', ref: 'Sommerville, cap. 1, págs. 3-17', points: ['Actividades del proceso, diferencias con ciencias de la computación e ingeniería de sistemas.', 'Figura 1.2: atributos esenciales del buen software.', 'Heterogeneidad, cambio empresarial y social, seguridad y confianza.'] },
        { title: 'TP 1 y TP 2 de la cátedra', ref: 'Clase práctica, Unidad I', points: ['Cuestionario de desarrollo: diseño de sistemas vs. diseño de software.', 'Caso “Sistema de Telemedicina de Alta Disponibilidad”.'] },
      ],
    },

    {
      id: 'prototipado-y-fundamentos',
      module: 'm1',
      title: 'Estrategias de prototipado y fundamentos de la ingeniería de software',
      keywords: 'prototipo prototipado desechable papel evaluación objetivos requerimientos interfaz factibilidad fundamentos proceso administrado confiabilidad desempeño reutilizar',
      tldr: 'Un <mark>prototipo</mark> es una versión inicial del sistema, construida rápido para <strong>comprobar requerimientos y la factibilidad de decisiones de diseño</strong>. Sirve en el análisis y en el diseño, sobre todo de interfaces. Lo que no conviene es entregar el prototipo como si fuera el sistema. Y hay <mark>4 fundamentos</mark> que valen para cualquier sistema.',
      goals: ['Definir prototipo y prototipo de sistema.', 'Explicar para qué se usa en el análisis y en el diseño.', 'Recorrer las 4 etapas del proceso de prototipado.', 'Justificar por qué no se entregan prototipos desechables.', 'Enumerar los 4 fundamentos de la ingeniería de software.'],
      body: `
        <h2>Qué es un prototipo</h2>
        ${def('Prototipo de sistema', 'Estrategia en la que se desarrolla rápidamente una versión del sistema o de una parte de él, para comprobar los requerimientos del cliente y la factibilidad de algunas decisiones de diseño.', 'Sommerville, cap. 2, págs. 43-46.')}
        <p>Permite que los usuarios <strong>experimenten con el sistema antes de que se entregue</strong> y así refinen sus requerimientos. Se usa para demostrar conceptos, probar opciones de diseño y entender mejor el problema y sus soluciones.</p>
        ${table(['Se usa en...', 'Para...'], [
          ['El análisis (ingeniería de requerimientos)', 'Seleccionar y validar los requerimientos. El cliente ve cómo el sistema apoya su trabajo, obtiene ideas nuevas, descubre fortalezas y debilidades y propone requerimientos. Al construirlo aparecen errores y omisiones, y se corrige la especificación.'],
          ['El diseño', 'Buscar soluciones específicas de software y apoyar el diseño de interfaces. Sirve para comprobar la factibilidad de un diseño: por ejemplo, un prototipo de base de datos para ver si soporta eficientemente las consultas más comunes.'],
        ])}
        <p>En el diseño de <strong>interfaces de usuario</strong> los prototipos son esenciales: la creación rápida con participación del usuario es la única forma sensata de diseñar una interfaz gráfica, porque las descripciones textuales y los diagramas no alcanzan para expresar su dinámica. Esto vuelve en la Unidad IV, con el prototipado en papel.</p>

        <h2>El proceso de desarrollo de prototipos</h2>
        ${protoProc}
        <ol>
          <li><strong>Establecer los objetivos</strong>, explícitos desde el principio: prototipar la interfaz, validar requerimientos funcionales, demostrar factibilidad a los administradores. Un mismo prototipo no cumple todos; si no se especifican, los usuarios pueden malinterpretar su función y no obtener lo esperado.</li>
          <li><strong>Definir la funcionalidad</strong>: qué poner y, sobre todo, <strong>qué dejar afuera</strong>. Para bajar costos y acelerar, se omite funcionalidad y se relajan requerimientos no funcionales (tiempo de respuesta, memoria), estándares de fiabilidad y calidad, y el manejo de errores (salvo que se prototipe la interfaz).</li>
          <li><strong>Desarrollar</strong> el prototipo ejecutable.</li>
          <li><strong>Evaluar</strong>: capacitar al usuario y usar los objetivos para armar un plan de evaluación. Los usuarios necesitan tiempo para sentirse cómodos; cuando lo usan normalmente, descubren errores y omisiones en los requerimientos.</li>
        </ol>
        <p>Problemas de la evaluación: el prototipo puede no usarse como se usará el sistema final; el revisor quizá no sea un usuario típico; y si el prototipo es lento, los evaluadores evitan esas características y no las evalúan.</p>
        ${lab(0)}

        <h2>¿Entregar el prototipo? No</h2>
        <p>A veces el cliente, apurado, presiona para que le entreguen el prototipo desechable como versión del sistema. No es aconsejable, por tres razones:</p>
        <ol>
          <li>Es difícil o imposible ajustar después los <strong>requerimientos no funcionales</strong> (rendimiento, seguridad, robustez, fiabilidad) que se ignoraron al hacerlo.</li>
          <li>El prototipo <strong>no está documentado</strong>: su única especificación es el código, lo que complica el mantenimiento.</li>
          <li>Los cambios durante el prototipado <strong>degradan la estructura</strong> del sistema: será difícil y caro de mantener.</li>
        </ol>
        <p>Los <strong>prototipos no ejecutables</strong> también sirven: los modelos en papel de la interfaz son efectivos para que los usuarios refinen el diseño mediante escenarios de uso, son baratos y se construyen en pocos días.</p>
        ${note('No confundas el prototipo desechable con los <strong>incrementos</strong> de la entrega incremental (lección de la Unidad I siguiente): los incrementos son parte del sistema real y se entregan; el prototipo se descarta.', 'warn')}

        <h2>Los 4 fundamentos aplicables a todo tipo de sistema</h2>
        <ol>
          <li><strong>Usar un proceso de desarrollo administrado y comprendido</strong>: planear el proceso, tener ideas claras de qué se producirá y cuándo, y usar procesos distintos para distintos tipos de software.</li>
          <li><strong>Priorizar confiabilidad y desempeño</strong>: el software debe comportarse como se espera, sin fallas, estar disponible cuando se lo necesita, ser seguro en su operación y contra ataques, y no desperdiciar recursos.</li>
          <li><strong>Comprender y gestionar la especificación y los requerimientos</strong>: saber qué esperan los usuarios y gestionar sus expectativas, para entregar algo útil dentro de fecha y presupuesto.</li>
          <li><strong>Usar de forma efectiva los recursos</strong>: siempre que se pueda, reutilizar el software ya desarrollado en lugar de diseñar uno nuevo.</li>
        </ol>
      `,
      labs: [{
        type: 'order', title: 'Ordená el proceso de prototipado',
        intro: 'Poné las etapas en el orden de la figura de Sommerville.',
        items: ['Establecer los objetivos del prototipo', 'Definir la funcionalidad del prototipo (qué dejar afuera)', 'Desarrollar el prototipo', 'Evaluar el prototipo'],
        explain: '<p>Primero los objetivos (producen el plan de creación de prototipos), después la definición general de qué se incluye, el prototipo ejecutable y por último el reporte de evaluación.</p>',
      }],
      quiz: [
        { q: '¿Cuál es el propósito de un prototipo de sistema?', o: ['Comprobar los requerimientos del cliente y la factibilidad de decisiones de diseño', 'Entregar una primera versión que el cliente use en producción', 'Reemplazar la documentación del diseño', 'Medir el rendimiento final del sistema'], a: 0, e: 'Se construye rápido para que los usuarios experimenten y se validen requisitos y decisiones; no es para producción.' },
        { q: '¿Qué conviene dejar afuera de un prototipo para reducir costos?', o: ['Funcionalidad y exigencias no funcionales', 'La interfaz de usuario y los formularios de carga', 'Los objetivos del prototipo y su plan de evaluación', 'La evaluación con usuarios, que se hace en el sistema final'], a: 0, e: 'Se puede omitir funcionalidad y relajar requerimientos no funcionales y estándares de calidad.' },
        { q: '¿Cuál NO es una razón para rechazar la entrega de un prototipo desechable?', o: ['Los prototipos se construyen con lenguajes que no se pueden compilar', 'Es difícil ajustar después los requerimientos no funcionales ignorados', 'No está documentado: su única especificación es el código', 'Los cambios durante el prototipado degradan la estructura del sistema'], a: 0, e: 'Las tres razones de Sommerville son: requerimientos no funcionales, falta de documentación y degradación de la estructura.' },
        { q: '¿Por qué el revisor de un prototipo puede dar una evaluación engañosa?', o: ['Porque quizá no es un usuario típico y el prototipo puede no usarse como el sistema final', 'Porque los prototipos siempre funcionan mejor que el sistema real', 'Porque no se le dan objetivos', 'Porque el prototipo ya está en producción'], a: 0, e: 'Además, si el prototipo es lento, el evaluador evita esas características y no las evalúa.' },
        { q: '¿Qué ventaja tienen los prototipos en papel de la interfaz?', o: ['Son baratos, rápidos y refinan el diseño con escenarios', 'Permiten medir el rendimiento real de la interfaz con usuarios', 'Sustituyen a las pruebas de aceptación del sistema terminado', 'Generan automáticamente el código de las pantallas diseñadas'], a: 0, e: 'Son prototipos no ejecutables, efectivos para que los usuarios refinen la interfaz.' },
        { q: '“Siempre que podamos, reutilizar el software desarrollado en vez de diseñar uno nuevo.” ¿A qué fundamento corresponde?', o: ['Usar de forma efectiva los recursos', 'Usar un proceso administrado y comprendido', 'Priorizar confiabilidad y desempeño', 'Gestionar la especificación y los requerimientos'], a: 0, e: 'Es el cuarto fundamento: uso efectivo de los recursos.' },
        { q: '¿En qué parte del diseño son esenciales los prototipos según Sommerville?', o: ['En el diseño de la interfaz de usuario', 'En el diseño de la base de datos', 'En el diseño de la arquitectura de red', 'En la planificación de las pruebas'], a: 0, e: 'Las descripciones y diagramas no alcanzan para expresar la dinámica de una interfaz; se prototipa con el usuario.' },
      ],
      sources: [
        { title: 'Ingeniería de Software, 9ª ed.', ref: 'Sommerville, cap. 2, págs. 43-46, y cap. 1, pág. 17', points: ['Creación de prototipos, figura 2.9 y problemas de la evaluación.', 'Fundamentos aplicables a todo tipo de sistema.'] },
      ],
    },
  );
})();
