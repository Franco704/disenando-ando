/* Unidad IV, clase 14: diseño de procesos. Diapositivas 14, Manual de Diseño de Procesos (Universidad Miguel Hernández de Elche, 2010). */
(() => {
  const { LESSONS, h } = window.GUIDE;
  const { note, def, table, fig, lab, uml: U } = h;

  const metodo = U.svg(620, 150, `
    ${['Definir la\nmisión', 'Identificar clientes\ny necesidades', 'Identificar\nprocesos', 'Plan de análisis\nde datos', 'Análisis y\nmejora'].map((t, i) => U.blk(6 + i * 124, 20, 110, 60, t, { cls: i === 2 ? 'k-a' : '', s: i + 1 })).join('')}
    ${[0, 1, 2, 3].map((i) => U.ln([[116 + i * 124, 50], [130 + i * 124, 50]], { end: 'ar', s: i + 2 })).join('')}
    ${U.ln([[564, 80], [564, 120], [60, 120], [60, 80]], { end: 'ar', dash: true, s: 5 })}<text x="310" y="140" class="u-c u-sm" data-s="5">mejora continua: se vuelve a medir</text>`,
    'Metodología de diseño de procesos en cinco pasos con retroalimentación');

  const mapa = fig(U.svg(620, 300, `
    ${U.blk(10, 10, 600, 60, '', { cls: 'k-warn' })}<text x="20" y="30" class="u-sans u-b">Procesos estratégicos</text>${['Plan estratégico de calidad', 'Normativa externa (ISO/IRAM)', 'Dirección'].map((t, i) => U.blk(170 + i * 146, 22, 136, 36, t, { bold: false })).join('')}
    ${U.blk(10, 90, 600, 110, '', { cls: 'k-a' })}<text x="20" y="110" class="u-sans u-b">Procesos fundamentales o clave</text>
    ${['Compra', 'Gestión y control\nde inventario', 'Venta'].map((t, i) => `<path d="M${120 + i * 160} 130H${250 + i * 160}L${270 + i * 160} 157L${250 + i * 160} 184H${120 + i * 160}L${140 + i * 160} 157Z" class="u-blk"/><text x="${195 + i * 160}" y="${i === 1 ? 153 : 161}" class="u-c u-sans u-b">${t.split('\n').map((l, k) => `<tspan x="${195 + i * 160}" dy="${k ? 15 : 0}">${l}</tspan>`).join('')}</text>`).join('')}
    ${U.blk(10, 220, 600, 70, '', { cls: 'k-ok' })}<text x="20" y="240" class="u-sans u-b">Procesos de soporte</text>${['Contratación y\npromoción', 'Capacitación', 'Sistemas de\ninformación', 'Mantenimiento'].map((t, i) => U.blk(30 + i * 146, 248, 136, 36, t, { bold: false })).join('')}
    <text x="40" y="160" class="u-c u-sm">necesidades</text><text x="40" y="174" class="u-c u-sm">del cliente →</text><text x="586" y="160" class="u-c u-sm">→ cliente</text><text x="586" y="174" class="u-c u-sm">satisfecho</text>`,
    'Mapa de procesos de una organización comercial: estratégicos arriba, clave al centro y de soporte abajo'),
    'Mapa de procesos de una organización comercial. Los estratégicos dan directrices; los clave crean valor para el cliente (de su necesidad a su satisfacción); los de soporte ayudan a los clave.');

  LESSONS.push(
    {
      id: 'mision-clientes-procesos',
      module: 'm11',
      title: 'Misión, clientes y mapa de procesos',
      keywords: 'proceso Heras inputs outputs valor misión qué cómo para quién clientes internos externos necesidades procesos estratégicos fundamentales clave soporte mapa de procesos propietarios instrucciones de trabajo',
      tldr: 'Un <mark>proceso</mark> transforma inputs en outputs <strong>agregando valor</strong>. Para diseñar procesos: definir la <strong>misión</strong> (qué, cómo y para quién), identificar los <strong>clientes</strong> internos y externos con sus necesidades, y clasificar los procesos en <mark>estratégicos, clave y de soporte</mark> en un mapa de procesos con propietarios e instrucciones de trabajo.',
      goals: ['Definir proceso (Heras).', 'Seguir la metodología de diseño de procesos.', 'Redactar una misión con sus 3 aspectos.', 'Distinguir clientes internos y externos.', 'Clasificar procesos y armar un mapa de procesos.'],
      body: `
        <h2>Qué es un proceso</h2>
        <p>Un proceso es una sucesión de pasos y decisiones que se siguen para realizar una actividad o tarea.</p>
        ${def('Proceso', 'Conjunto de actividades secuenciales que realizan una transformación de una serie de inputs (material, mano de obra, capital, información, etc.) en los outputs deseados (bienes y/o servicios) añadiendo valor.', 'Heras, M. (1996), citado en el Manual de Diseño de Procesos de la UMH.')}
        <p>El propio método para diseñar procesos es un proceso:</p>
        ${lab(0)}

        <h2>1. Definir la misión del servicio</h2>
        <p>Si ya existe, se revisa. La misión identifica el <strong>objetivo fundamental</strong> del servicio, su razón de ser, y debe considerar tres aspectos:</p>
        <ol><li><strong>Qué</strong> hacemos (productos o servicios).</li><li><strong>Cómo</strong> lo hacemos (qué procesos seguimos).</li><li><strong>Para quién</strong> lo hacemos (a qué clientes nos dirigimos).</li></ol>
        <p>Ejemplo: “La cátedra de Diseño de Sistemas <em>forma ingenieros capaces de diseñar sistemas de información de calidad</em> (qué) <em>mediante clases teórico-prácticas, trabajos en equipo y evaluación continua</em> (cómo) <em>para los estudiantes de tercer año de Ingeniería en Sistemas</em> (para quién).”</p>

        <h2>2. Identificar los clientes y sus necesidades</h2>
        <p>El fin último de cualquier organización es satisfacer a sus clientes, y para eso hay que identificarlos. Basta preguntarse: <strong>¿quiénes reciben nuestros productos o servicios?</strong></p>
        ${table(['Clientes internos', 'Clientes externos'], [['Individuos o servicios <strong>dentro</strong> de la organización que reciben nuestros productos o servicios para usarlos en su trabajo. Muchos servicios son de “consumo interno”.', 'Los clientes <strong>finales</strong>, que disfrutan de los productos o servicios de la organización.']])}
        <p>Con la lista de clientes se establece qué esperan que les ofrezcamos:</p>
        ${table(['Cliente interno', 'Necesidades'], [['CEO de la organización', 'Información sobre todos los procesos y resultados.'], ['Gerencia financiera', 'Asesoramiento en temas de calidad; apoyo técnico para la autoevaluación; información.'], ['Jefatura de producción', 'Apoyo técnico para la creación de grupos de mejora.']])}

        <h2>3. Identificar los procesos</h2>
        <p>Los pasos son: <strong>a)</strong> identificar procesos estratégicos, fundamentales y de soporte; <strong>b)</strong> construir el mapa de procesos; <strong>c)</strong> asignar los procesos clave a sus responsables; <strong>d)</strong> desarrollar las instrucciones de trabajo.</p>
        ${table(['Tipo', 'Qué son', 'Ejemplos'], [
          ['Estratégicos', 'Dan <strong>directrices</strong> a todos los demás; los realiza la dirección u otras entidades. Se ajustan a leyes, normativas y reglas que el servicio no controla. Se vuelcan en el Plan Estratégico de Calidad y en la normativa externa o pautas de calidad (ISO, IRAM).', 'Planificación estratégica, política de calidad.'],
          ['Fundamentales o clave', 'Atañen a distintas áreas del servicio, tienen <strong>impacto en el cliente y crean valor</strong> para él. Son las actividades esenciales: la razón de ser del servicio.', 'Venta, compra, gestión y control de inventario.'],
          ['De soporte', 'Dan <strong>apoyo</strong> a los procesos fundamentales; suelen realizarlos otros servicios de la organización.', 'Contratación y promoción del personal, capacitación, sistemas de información e informática, mantenimiento.'],
        ])}
        ${mapa}
        <p>Definidos los procesos, se asignan sus <strong>propietarios o responsables</strong>, encargados de supervisarlos y controlarlos y responsables de su buen funcionamiento. Y cada proceso se desarrolla con <strong>instrucciones de trabajo</strong>: una explicación paso por paso de sus actividades, para que quede claro cómo realizarlo.</p>
        ${note('Ojo con el área de Sistemas: para una empresa comercial, “Sistemas de información e informática” es un proceso de <strong>soporte</strong>, no clave. Es clave lo que genera valor directo para el cliente final.', 'exam')}
      `,
      labs: [
        { type: 'steps', title: 'Metodología de diseño de procesos', intro: 'Los cinco pasos del manual, en orden. El último realimenta al primero.', fig: metodo, steps: [
          { k: 'Paso 1', t: '<strong>Definir la misión</strong> (o revisarla): qué hacemos, cómo y para quién.' },
          { k: 'Paso 2', t: '<strong>Identificar los clientes</strong> internos y externos y sus necesidades.' },
          { k: 'Paso 3', t: '<strong>Identificar los procesos</strong> estratégicos, clave y de soporte; mapa de procesos, propietarios e instrucciones de trabajo.' },
          { k: 'Paso 4', t: '<strong>Establecer el plan de análisis de datos</strong>: criterios, indicadores, calendario de recolección y codificación.' },
          { k: 'Paso 5', t: '<strong>Analizar y mejorar</strong> el proceso con tableros de control, y volver a medir.' },
        ] },
        { type: 'classify', title: 'Clasificá los procesos de una distribuidora', buckets: ['Estratégico', 'Clave', 'Soporte'], items: [
          { t: 'Proceso de venta a clientes.', b: 1 },
          { t: 'Definición del plan estratégico de calidad.', b: 0 },
          { t: 'Mantenimiento de los camiones de reparto.', b: 2 },
          { t: 'Gestión y control de inventario.', b: 1 },
          { t: 'Capacitación del personal.', b: 2 },
          { t: 'Adecuación a la norma ISO 9001.', b: 0 },
          { t: 'Soporte de sistemas e informática.', b: 2 },
          { t: 'Proceso de compra a proveedores.', b: 1 },
        ] },
      ],
      quiz: [
        { q: 'Según Heras, ¿qué hace un proceso?', o: ['Transforma inputs en outputs agregando valor', 'Almacena la información de la organización', 'Controla el trabajo de las personas', 'Define la misión y los objetivos del servicio'], a: 0, e: 'Inputs: material, mano de obra, capital, información.' },
        { q: '¿Qué tres aspectos debe considerar la misión?', o: ['Qué hacemos, cómo lo hacemos y para quién', 'Visión, valores y objetivos', 'Costo, tiempo y calidad', 'Procesos, clientes e indicadores'], a: 0, e: 'La misión es la razón de ser del servicio.' },
        { q: '¿Qué pregunta permite identificar a los clientes?', o: ['¿Quiénes reciben nuestros productos o servicios?', '¿Quién paga?', '¿Quién está en el organigrama?', '¿Quién nos audita?'], a: 0, e: 'Con esa lista se buscan sus necesidades.' },
        { q: 'La gerencia financiera que recibe asesoramiento sobre calidad es un cliente...', o: ['Interno', 'Externo', 'Final', 'Potencial'], a: 0, e: 'Está dentro de la organización y usa el servicio en su trabajo.' },
        { q: '¿Qué procesos crean valor para el cliente y son la razón de ser del servicio?', o: ['Los fundamentales o clave', 'Los estratégicos', 'Los de soporte', 'Los de mejora'], a: 0, e: 'Ejemplos: venta, compra, control de inventario.' },
        { q: 'La capacitación del personal en una empresa comercial es un proceso...', o: ['De soporte', 'Clave', 'Estratégico', 'Externo'], a: 0, e: 'Ayuda a realizar los procesos fundamentales.' },
        { q: '¿Qué procesos se ajustan a leyes y normas que el servicio no controla?', o: ['Los estratégicos', 'Los clave', 'Los de soporte', 'Ninguno'], a: 0, e: 'Se vuelcan en el plan estratégico y en normas como ISO o IRAM.' },
        { q: '¿Qué son los propietarios de un proceso?', o: ['Los responsables de supervisarlo y controlarlo', 'Los clientes internos que reciben su resultado', 'Los auditores externos que lo certifican', 'Los dueños o accionistas de la empresa'], a: 0, e: 'Se asignan a los procesos clave.' },
      ],
      sources: [{ title: 'Manual de Diseño de Procesos', url: 'https://calidad.umh.es/files/2010/09/procesos.pdf', points: ['Misión, clientes, tipos de procesos, mapa de procesos, propietarios e instrucciones de trabajo.'] }],
    },

    {
      id: 'medicion-y-mejora',
      module: 'm11',
      title: 'Plan de análisis de datos y mejora del proceso',
      keywords: 'medición no se puede mejorar lo que no se conoce criterio indicador plan de recolección de datos calendario responsable codificación monitorización tablero de control acciones de mejora',
      tldr: 'No se puede mejorar lo que no se conoce: primero se <mark>mide</mark>. Para cada proceso se definen <strong>criterios</strong> (aspectos no medibles que interesan) e <strong>indicadores</strong> (variables medibles ligadas al criterio), se arma un <strong>calendario de recolección</strong> con responsables y se monitorea con <mark>tableros de control</mark> para plantear mejoras.',
      goals: ['Diferenciar criterio e indicador.', 'Armar un plan de recolección de datos.', 'Explicar qué es un tablero de control y cómo lleva a la mejora.'],
      body: `
        <h2>Primero, medir</h2>
        <p>La cuestión fundamental previa a mejorar un proceso es la <strong>medición</strong>, porque <strong>no se puede mejorar aquello que no se conoce</strong>. Los pasos son: <strong>a)</strong> desarrollar criterios e indicadores; <strong>b)</strong> diseñar un calendario de recolección de datos; <strong>c)</strong> recopilar y codificar los datos.</p>

        <h2>Criterios e indicadores</h2>
        <p>Los procesos no se miden de forma general: se miden diferentes aspectos de cada uno.</p>
        ${table(['Criterio', 'Indicador'], [['Aspecto <strong>no medible</strong> del proceso que interesa evaluar.', 'Variable <strong>medible</strong> relacionada directamente con el criterio. Puede haber más de uno por criterio.']])}
        ${table(['Proceso', 'Criterio', 'Indicador'], [
          ['Servicio educativo “Diseño de Sistemas”', 'Ofrecer un buen servicio educativo', 'Calidad percibida por los <strong>alumnos</strong> mediante una encuesta del servicio.<br>Calidad percibida por los <strong>docentes</strong> mediante una encuesta del servicio.'],
          ['Buzón de sugerencias', 'Agilidad en la respuesta al usuario del buzón', 'Horas desde que se recibe la sugerencia hasta que se contesta al usuario.'],
        ])}

        <h2>Plan de recolección de datos</h2>
        <p>Definidos los indicadores, se explicitan las <strong>fechas</strong> de recolección de cada uno y la <strong>persona encargada</strong>:</p>
        ${table(['Indicador', 'Fecha de recolección', 'Responsable'], [
          ['Calidad percibida por los alumnos', '15 de diciembre de cada año', 'Director del Departamento de Sistemas'],
          ['Calidad percibida por los docentes', '15 de diciembre de cada año', 'Jefe de Cátedra de Diseño de Sistemas'],
          ['Horas de respuesta del buzón', '30 de julio y 30 de diciembre de cada año', 'Secretario del Departamento de Sistemas'],
        ])}
        <p>Por último se recopilan los datos y se <strong>codifican</strong> para analizarlos.</p>

        <h2>Análisis y mejora</h2>
        <p>Con los indicadores recogidos se los <strong>monitoriza</strong> mediante <strong>tableros de control</strong>: herramientas que muestran toda la información relevante de un indicador en un espacio reducido.</p>
        ${fig(U.svg(560, 220, `<rect x="6" y="6" width="548" height="208" rx="8" class="u-lyr"/><text x="20" y="28" class="u-sans u-b">Calidad percibida por los estudiantes — Diseño de Sistemas</text>
          ${U.ln([[40, 180], [330, 180]])}${U.ln([[40, 50], [40, 180]])}${[[2022, 3.4], [2023, 3.6], [2024, 3.5], [2025, 3.9], [2026, 4.1]].map(([y, v], i) => `<rect x="${55 + i * 55}" y="${180 - v * 28}" width="36" height="${v * 28}" rx="2" class="u-blk ${i === 4 ? 'k-a' : ''}"/><text x="${73 + i * 55}" y="${172 - v * 28}" class="u-c u-sm">${v}</text><text x="${73 + i * 55}" y="196" class="u-c u-sm">${y}</text>`).join('')}
          <path d="M40 68H330" class="u-ln u-dash s-ok"/><text x="334" y="72" class="u-sm t-ok">meta 4,0</text>
          ${[['Valor actual', '4,1 / 5'], ['Variación', '+0,2'], ['Encuestados', '187'], ['Estado', 'Meta cumplida']].map(([k, v], i) => `<text x="380" y="${62 + i * 36}" class="u-sm">${k}</text><text x="380" y="${80 + i * 36}" class="u-sans u-b${i === 3 ? ' t-ok' : ''}">${v}</text>`).join('')}`, 'Tablero de control del indicador de calidad percibida con evolución anual y valores clave'), 'Ejemplo de tablero de control del indicador “Calidad percibida por los estudiantes del servicio educativo de Diseño de Sistemas”: evolución, meta y estado en un vistazo.')}
        <p>A partir del análisis de los tableros se estudia cada proceso y se plantean <strong>acciones de mejora</strong>, y el ciclo vuelve a empezar.</p>
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿Criterio o indicador?',
        buckets: ['Criterio', 'Indicador'],
        items: [
          { t: 'Atender bien a los clientes del mostrador.', b: 0 },
          { t: 'Minutos promedio de espera en el mostrador.', b: 1 },
          { t: 'Porcentaje de pedidos entregados a tiempo.', b: 1 },
          { t: 'Cumplir con los plazos de entrega.', b: 0 },
          { t: 'Cantidad de reclamos por mes.', b: 1 },
          { t: 'Ofrecer un buen servicio educativo.', b: 0 },
        ],
      }],
      quiz: [
        { q: '¿Por qué la medición es previa a la mejora?', o: ['No se puede mejorar lo que no se conoce', 'Porque lo exige la norma ISO 9001', 'Porque los clientes lo piden en las encuestas', 'Porque medir es más barato que mejorar'], a: 0, e: 'Hay que establecer qué se quiere medir del proceso.' },
        { q: '¿Qué es un criterio?', o: ['Un aspecto no medible que interesa evaluar', 'Una variable medible ligada a un proceso', 'Una fecha del calendario de recolección', 'El responsable de recolectar los datos'], a: 0, e: 'El indicador es la variable medible ligada al criterio.' },
        { q: '“Horas desde que se recibe una sugerencia hasta que se contesta” es un...', o: ['Indicador', 'Criterio', 'Proceso clave', 'Cliente interno'], a: 0, e: 'Es medible y corresponde al criterio “agilidad en la respuesta”.' },
        { q: '¿Qué explicita el plan de recolección de datos?', o: ['Fechas de recolección y responsables', 'La misión del servicio y sus clientes', 'Los procesos clave y sus propietarios', 'Las acciones de mejora a implementar'], a: 0, e: 'Después se recopilan y codifican los datos.' },
        { q: '¿Qué es un tablero de control?', o: ['Toda la información de un indicador en poco espacio', 'Un tablero Kanban con las tareas del proceso', 'Una reunión periódica del directorio', 'El mapa de procesos de la organización'], a: 0, e: 'Sirve para monitorear y analizar.' },
        { q: '¿Puede haber más de un indicador para un criterio?', o: ['Sí', 'No, siempre uno', 'Solo en procesos estratégicos', 'Solo si el criterio es medible'], a: 0, e: 'Ejemplo: calidad percibida por alumnos y por docentes.' },
      ],
      sources: [{ title: 'Manual de Diseño de Procesos', url: 'https://calidad.umh.es/files/2010/09/procesos.pdf', points: ['Plan de análisis de datos, criterios e indicadores, tableros de control y mejora.'] }],
    },

    {
      id: 'procesos-en-el-dsi',
      module: 'm11',
      title: 'Diseño de procesos dentro del diseño de sistemas de información',
      keywords: 'lógica operativa flujo de trabajo transformación de datos validación aseguramiento objetivos eficiencia efectividad recursos plataformas fuentes de datos integración propósitos diseño de datos arquitectura estándares marcos ISO 9001 IRAM',
      tldr: 'Dentro del DSI, el diseño de procesos planifica <mark>cómo los datos y operaciones se transforman, fluyen y se validan</mark>: la <strong>lógica operativa</strong> (qué datos, cómo y cuándo se transforman, cómo se validan). Tiene 8 componentes clave y 4 propósitos. Y ojo: <mark>los estándares dicen qué hacer; los marcos, cómo hacerlo</mark>.',
      goals: ['Definir el diseño de procesos dentro del DSI y su lógica operativa.', 'Enumerar sus componentes clave y propósitos.', 'Relacionarlo con el diseño de datos y la arquitectura.', 'Diferenciar estándares de marcos de diseño de procesos.'],
      body: `
        <h2>Qué es en el DSI</h2>
        ${def('Diseño de procesos en el DSI', 'Fase que planifica e implementa cómo los datos y las operaciones se transforman, fluyen y se validan dentro del sistema para cumplir con los objetivos establecidos, creando flujos de trabajo eficientes que generan valor al sistema y a la organización.', 'Diapositivas de la clase 14.')}
        <p>Se enfoca en la <strong>lógica operativa</strong>: <strong>qué</strong> datos se manejan, <strong>cómo</strong> se transforman, <strong>cuándo</strong> se transforman y <strong>cómo se aseguran y validan</strong>, para obtener un sistema funcional que aporte beneficios a sus usuarios.</p>

        <h2>Componentes clave</h2>
        ${table(['Componente', 'Qué define'], [
          ['Flujo de trabajo', 'La secuencia de actividades, los recursos necesarios y cómo se mueve la información por el sistema.'],
          ['Transformación de datos', 'Cómo se modifican, procesan y transforman los datos al fluir.'],
          ['Validación y aseguramiento', 'Puntos y mecanismos donde se validan los datos, garantizando integridad y consistencia.'],
          ['Objetivos', 'Alinear el proceso con los objetivos de la organización (su <strong>misión</strong>) para entregar valor.'],
          ['Eficiencia y efectividad', 'Flujos eficientes, claros y confiables que mejoran la productividad y la calidad.'],
          ['Recursos y plataformas', 'Herramientas, tecnologías y recursos necesarios para ejecutar el proceso.'],
          ['Fuentes de datos', 'De dónde vienen los datos y cómo se recolectan y gestionan.'],
          ['Integración con otros procesos', 'Que el proceso nuevo funcione bien con los existentes.'],
        ])}
        <h3>Propósitos</h3>
        <ol>
          <li><strong>Mejorar la eficiencia</strong>: optimizar las tareas para reducir tiempos y costos.</li>
          <li><strong>Garantizar la calidad</strong>: que el sistema produzca información precisa y útil.</li>
          <li><strong>Cumplir con las expectativas</strong> de los usuarios y los objetivos estratégicos.</li>
          <li><strong>Innovación</strong>: crear procesos nuevos o mejorar los existentes.</li>
        </ol>
        <h3>Relación con otras áreas del diseño</h3>
        <ul>
          <li><strong>Diseño de datos</strong>: se ocupa de la representación y el almacenamiento; el de procesos, de cómo esos datos se manipulan y procesan.</li>
          <li><strong>Arquitectura del sistema</strong>: el diseño de procesos se integra en ella, junto con el diseño de componentes e interfaces, para un sistema coherente (Unidad II).</li>
        </ul>

        <h2>Estándares vs. marcos</h2>
        ${table(['', 'Estándares de diseño de procesos', 'Marcos de diseño de procesos'], [
          ['Qué son', 'Reglas, directrices y mejores prácticas que definen cómo diseñar, documentar e implementar procesos (ISO 9001, IRAM).', 'Modelos, métodos y herramientas para diseñar procesos de manera sistemática y lógica (por ejemplo, la metodología de 5 pasos de esta unidad).'],
          ['Objetivo', 'Dar lenguaje, estructura y formato comunes y requisitos mínimos de rendimiento y calidad; alinear con el cliente, las normas y la organización.', 'Ofrecer un enfoque paso a paso, técnicas y métricas que apoyan decisiones, resolución de problemas e innovación.'],
          ['Carácter', 'Más <strong>prescriptivos y rígidos</strong>: se centran en el <strong>cumplimiento y la conformidad</strong>.', 'Más <strong>flexibles y adaptables</strong>: permiten alcanzar niveles altos de eficiencia y efectividad.'],
          ['En una frase', 'Dicen <strong>qué</strong> hacer.', 'Dicen <strong>cómo</strong> hacerlo.'],
        ])}
        ${note('Frase de parcial: <strong>“Estándares dicen qué hacer. Marcos dicen cómo hacerlo.”</strong>', 'exam')}
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿Qué componente del diseño de procesos es?',
        buckets: ['Flujo de trabajo', 'Transformación de datos', 'Validación', 'Fuentes de datos', 'Integración'],
        items: [
          { t: 'El pedido pasa de Ventas a Depósito y luego a Facturación.', b: 0 },
          { t: 'El importe en dólares se convierte a pesos con la cotización del día.', b: 1 },
          { t: 'Se rechaza un CUIT con dígito verificador incorrecto.', b: 2 },
          { t: 'Los precios se toman del sistema del proveedor cada noche.', b: 3 },
          { t: 'El nuevo proceso de devoluciones debe actualizar el stock que usa el proceso de compras.', b: 4 },
        ],
      }],
      quiz: [
        { q: '¿En qué se enfoca el diseño de procesos dentro del DSI?', o: ['En la lógica operativa de los datos', 'En el diseño visual de las pantallas', 'En el hardware de los servidores', 'En el organigrama de la organización'], a: 0, e: 'Busca un sistema funcional que aporte beneficios.' },
        { q: '“Estándares dicen qué hacer; marcos dicen...”', o: ['cómo hacerlo', 'cuándo hacerlo', 'quién lo hace', 'por qué hacerlo'], a: 0, e: 'Los estándares son prescriptivos; los marcos, flexibles.' },
        { q: '¿Cuál es un ejemplo de estándar de diseño de procesos?', o: ['ISO 9001 o normas IRAM', 'La metodología de 5 pasos de la clase', 'Scrum', 'El patrón Experto'], a: 0, e: 'La metodología de la clase es un marco.' },
        { q: '¿Qué caracteriza a los estándares frente a los marcos?', o: ['Son prescriptivos y buscan la conformidad', 'Son más flexibles y se adaptan a cada caso', 'No establecen requisitos mínimos de calidad', 'Solo sirven para procesos de desarrollo de software'], a: 0, e: 'Los marcos permiten alcanzar altos niveles de eficiencia y efectividad.' },
        { q: '¿Qué componente establece puntos donde se garantiza la integridad y consistencia de los datos?', o: ['Validación y aseguramiento', 'Flujo de trabajo', 'Fuentes de datos', 'Recursos y plataformas'], a: 0, e: 'Es parte de la lógica operativa.' },
        { q: '¿En qué se diferencian el diseño de datos y el de procesos?', o: ['Datos: representación y almacenamiento; procesos: cómo se manipulan', 'Son lo mismo con dos nombres: ambos definen tablas y relaciones', 'El de procesos trata el almacenamiento y el de datos, las pantallas', 'El de datos define el flujo de trabajo y el de procesos, los índices'], a: 0, e: 'Ambos se integran en la arquitectura del sistema.' },
        { q: '¿Cuál NO es un propósito del diseño de procesos?', o: ['Aumentar la documentación', 'Mejorar la eficiencia', 'Garantizar la calidad', 'Innovar'], a: 0, e: 'El cuarto es cumplir con las expectativas.' },
      ],
      sources: [{ title: 'Diapositivas de la clase 14', ref: 'Cátedra DSI 2026', points: ['Diseño de procesos dentro del diseño de sistemas de información, estándares y marcos.'] }],
    },
  );
})();
