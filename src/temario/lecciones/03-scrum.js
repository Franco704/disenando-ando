/* Unidad I, clase 5: Scrum. Diapositivas 05, Kniberg "Scrum y XP desde las trincheras", págs. 17-90. TP 3. */
(() => {
  const { LESSONS, h } = window.GUIDE;
  const { note, def, table, fig, lab, uml: U } = h;

  // Ciclo de Scrum, paso a paso
  const ciclo = U.svg(620, 280, `
    <g data-s="1">${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="14" y="${30 + i * 34}" width="${120 - i * 10}" height="26" rx="4" class="u-blk ${i < 3 ? 'k-a' : ''}"/>`).join('')}<text x="74" y="20" class="u-c u-sans u-b">Pila de producto</text></g>
    <g data-s="2">${U.blk(170, 40, 130, 54, 'Planificación\ndel sprint', { cls: 'k-a' })}${U.ln([[134, 60], [170, 67]], { end: 'ar' })}</g>
    <g data-s="3">${[0, 1, 2].map((i) => `<rect x="190" y="${130 + i * 30}" width="90" height="22" rx="4" class="u-blk"/>`).join('')}<text x="235" y="230" class="u-c u-sans u-b">Pila de sprint</text>${U.ln([[235, 94], [235, 130]], { end: 'ar' })}</g>
    <g data-s="4"><path d="M330 150A90 70 0 1 1 510 150A90 70 0 1 1 330 150" class="u-ln s-a" style="stroke-width:3"/><text x="420" y="74" class="u-c u-sans u-b t-a">Sprint (2 a 4 semanas)</text>${U.ln([[280, 150], [330, 150]], { end: 'ar' })}</g>
    <g data-s="5"><circle cx="420" cy="150" r="30" class="u-ln s-x" style="stroke-width:2.6"/><text x="420" y="148" class="u-c u-sm">Scrum</text><text x="420" y="161" class="u-c u-sm">diario 24 h</text></g>
    <g data-s="6">${U.blk(530, 90, 84, 46, 'Demo', { cls: 'k-ok' })}${U.ln([[510, 140], [530, 118]], { end: 'ar' })}</g>
    <g data-s="7">${U.blk(530, 170, 84, 46, 'Retro', { cls: 'k-warn' })}${U.ln([[572, 136], [572, 170]], { end: 'ar' })}${U.ln([[572, 216], [572, 262], [74, 262], [74, 236]], { end: 'ar', dash: true })}<text x="320" y="256" class="u-c u-sm">mejoras para el próximo sprint</text></g>`,
    'Ciclo de Scrum: pila de producto, planificación, pila de sprint, sprint con scrum diario, demo y retrospectiva');

  LESSONS.push(
    {
      id: 'pila-de-producto',
      module: 'm3',
      title: 'La pila de producto y las historias',
      keywords: 'scrum pila de producto product backlog historias ID nombre importancia estimación inicial puntos de historia días-persona ideales cómo probarlo notas dueño de producto product owner scrum master equipo roles',
      tldr: 'La <mark>pila de producto</mark> es el corazón de Scrum: una lista <strong>priorizada</strong> de lo que el cliente quiere, escrita en sus términos. Cada historia tiene ID, nombre, importancia, estimación inicial en <strong>puntos de historia</strong>, cómo probarla y notas. La prioridad la pone el Dueño de Producto; la estimación, solo el equipo.',
      goals: ['Describir los tres roles de Scrum.', 'Explicar cada campo de una historia de la pila de producto.', 'Entender qué es un punto de historia y por qué importa la estimación relativa.', 'Redactar historias de usuario.'],
      body: `
        <h2>Los tres roles</h2>
        ${table(['Rol', 'Responsabilidad'], [
          ['Dueño de Producto (Product Owner)', 'Representa al cliente. Es dueño de la pila de producto: escribe y entiende las historias, fija su <strong>importancia</strong> y su <strong>alcance</strong>. Debe participar de la planificación de sprint.'],
          ['Scrum Master', 'Facilita el proceso: organiza las reuniones, protege al equipo de interrupciones y <strong>elimina impedimentos</strong>. No es un jefe que asigna tareas.'],
          ['Equipo (Development Team)', 'Equipo auto-organizado y multidisciplinario (diseño, programación, pruebas). Es el <strong>único que estima</strong> y decide cuántas historias entran en el sprint.'],
        ])}

        <h2>La pila de producto</h2>
        ${def('Pila de producto (product backlog)', 'Lista priorizada de requisitos, historias o funcionalidades: cosas que el cliente quiere, descriptas en la terminología del cliente. Es el corazón de Scrum: donde empieza todo.', 'Kniberg, Scrum y XP desde las trincheras.')}
        <p>Sus elementos se llaman “historias” o “elementos de la pila”. Cada uno tiene estos campos:</p>
        ${table(['Campo', 'Para qué sirve'], [
          ['ID', 'Identificador único auto-incremental: permite no perder la pista de la historia aunque cambie su nombre.'],
          ['Nombre', 'Descripción corta (2 a 10 palabras), clara para que el cliente entienda de qué se trata y la distinga de otras.'],
          ['Importancia', 'Nivel que le da el Dueño de Producto. <strong>Más alto = más importante.</strong> Solo sirve para ordenar.'],
          ['Estimación inicial', 'Valoración del equipo de cuánto trabajo lleva, <strong>comparada con otras</strong>. Se mide en <strong>puntos de historia</strong> ≈ días-persona ideales.'],
          ['Cómo probarlo', 'Descripción de alto nivel de cómo se demostrará al final: “hacé esto, luego lo otro y debería ocurrir aquello”. En TDD sirve de pseudocódigo para el test de aceptación.'],
          ['Notas', 'Cualquier aclaración o referencia, muy breve.'],
        ])}
        ${table(['ID', 'Nombre', 'Imp.', 'Est.', 'Cómo probarlo', 'Notas'], [
          ['1', 'Depósito', '30', '5', 'Entrar, abrir la página de depósito, depositar 10 €, ir a mi saldo y comprobar que aumentó 10 €.', 'Necesita un diagrama UML de secuencia.'],
          ['2', 'Ver tu propio historial de transacciones', '10', '8', 'Entrar, ir a transacciones, hacer un depósito, volver a transacciones y comprobar que aparece.', 'Usar paginación para no hacer consultas grandes.'],
        ])}
        <h3>Los puntos de historia</h3>
        <p>Un punto de historia corresponde aproximadamente a un <strong>día-persona ideal</strong>. Si a 3 personas les lleva 4 días terminar una historia, su estimación inicial es <strong>12 puntos</strong>. No importa que la estimación <em>absoluta</em> sea correcta (que una historia de 2 puntos dure 2 días) sino que las <strong>relativas</strong> lo sean: que una de 2 puntos lleve la mitad que una de 4.</p>
        ${note('Si te preguntan quién prioriza y quién estima: <strong>prioriza el Dueño de Producto, estima solo el equipo</strong>. El Dueño de Producto no puede imponer estimaciones.', 'exam')}

        <h2>Historias de usuario</h2>
        <p>Una historia de usuario (práctica de XP) es un breve texto que dice en palabras simples lo que el cliente necesita. El formato más usado es: <strong>Como</strong> &lt;rol&gt; <strong>quiero</strong> &lt;funcionalidad&gt; <strong>para</strong> &lt;beneficio&gt;. Ejemplo del TP 3: “Como estudiante quiero inscribirme online para no hacer filas”. El “para” obliga a explicitar el valor de negocio, que es lo que el Dueño de Producto usa para priorizar. Si el Dueño de Producto tiene formación técnica y escribe “agregar índices a la tabla Eventos”, conviene preguntarle “¿por qué?” hasta llegar al objetivo real (“acelerar la búsqueda de eventos en el back office”).</p>
      `,
      quiz: [
        { q: '¿Quién fija la importancia de las historias de la pila de producto?', o: ['El Dueño de Producto', 'El Scrum Master', 'El equipo', 'El cliente final, por votación'], a: 0, e: 'El Dueño de Producto fija importancia y alcance; el equipo, la estimación.' },
        { q: 'A 3 personas les lleva 4 días terminar una historia. ¿Cuál es su estimación inicial?', o: ['12 puntos de historia', '4 puntos de historia', '7 puntos de historia', '3 puntos de historia'], a: 0, e: '3 personas × 4 días = 12 días-persona ideales = 12 puntos.' },
        { q: '¿Qué es lo importante de las estimaciones en puntos de historia?', o: ['Que las estimaciones relativas sean correctas', 'Que las estimaciones absolutas coincidan con los días reales', 'Que las haga el Dueño de Producto', 'Que sean siempre números pares'], a: 0, e: 'Una historia de 2 puntos debe llevar la mitad que una de 4, aunque ninguna dure exactamente eso.' },
        { q: '¿Para qué sirve el campo ID de una historia?', o: ['No perderle la pista aunque cambie su nombre', 'Indicar su prioridad frente a las demás historias', 'Saber qué miembro del equipo la implementa', 'Calcular la velocidad del equipo en el sprint'], a: 0, e: 'Es un número auto-incremental único.' },
        { q: 'En el campo “Cómo probarlo” se escribe...', o: ['Cómo se demostrará la historia al final', 'El código del test unitario de la historia', 'El nombre del responsable de las pruebas', 'La fecha en que se hará la demo del sprint'], a: 0, e: 'Es un test del tipo “hacé esto, luego aquello y debería pasar tal cosa”; en TDD sirve de pseudocódigo del test de aceptación.' },
        { q: '¿Cuál es el rol que elimina impedimentos y facilita el proceso?', o: ['Scrum Master', 'Dueño de Producto', 'Cliente', 'Encargado de pruebas'], a: 0, e: 'El Scrum Master facilita; no asigna tareas ni prioriza.' },
      ],
      sources: [{ title: 'Scrum y XP desde las trincheras', ref: 'Kniberg, págs. 17-25', points: ['Cómo hacemos pilas de producto: campos de cada historia y ejemplo.'] }],
    },

    {
      id: 'planificacion-de-sprint',
      module: 'm3',
      title: 'Planificación del sprint',
      keywords: 'sprint objetivo del sprint meta planificación de sprint reunión alcance importancia estimación calidad interna externa cuarta variable duración tres semanas time-boxed tarjetas definición de terminado',
      tldr: 'La <mark>planificación de sprint</mark> es la reunión más importante de Scrum. En ella se ajustan tres variables que dependen entre sí: <strong>alcance e importancia</strong> (del Dueño de Producto) y <strong>estimación</strong> (del equipo). La cuarta variable, la <mark>calidad interna</mark>, no se negocia nunca.',
      goals: ['Definir sprint y objetivo del sprint.', 'Listar qué produce la planificación de sprint.', 'Explicar el triángulo alcance-importancia-estimación y por qué la calidad interna es innegociable.', 'Argumentar la duración del sprint.'],
      body: `
        <h2>Sprint y objetivo</h2>
        ${def('Sprint', 'Período breve de tiempo fijo en el que un equipo de Scrum trabaja para completar una cantidad de trabajo establecida.', 'Diapositivas de la clase 5.')}
        <p>Los sprints son el corazón de Scrum y de las metodologías ágiles. El <strong>objetivo del sprint</strong> es una breve explicación de lo que el equipo planea lograr: metas tangibles redactadas por el equipo y el cliente, sujetas a la duración del sprint.</p>
        ${lab(0)}

        <h2>Antes de planificar</h2>
        <ul>
          <li>La pila de producto debe estar <strong>lista</strong> antes de la reunión; debe haber una pila y un Dueño de Producto <strong>por producto</strong>.</li>
          <li>Los elementos importantes deben tener niveles de importancia <strong>diferentes</strong> (los menos importantes pueden repetirse, porque no se discutirán). Conviene dejar espacio entre números por si aparece una C más importante que A pero menos que B.</li>
          <li>El Dueño de Producto debe comprender cada historia, aunque no las haya escrito todas.</li>
        </ul>

        <h2>La reunión</h2>
        <p>Su propósito es dar al equipo información suficiente para trabajar <strong>sin interrupciones durante unas semanas</strong>, y al cliente, confianza suficiente. Una planificación mal hecha puede arruinar todo el sprint. Produce:</p>
        <ul>
          <li>la <strong>meta de sprint</strong>;</li>
          <li>la <strong>lista de miembros</strong> y su nivel de dedicación;</li>
          <li>la <strong>pila de sprint</strong> (historias incluidas);</li>
          <li>la <strong>fecha concreta de la demo</strong>;</li>
          <li>el <strong>lugar y momento del scrum diario</strong>.</li>
        </ul>
        <h3>Tres variables muy dependientes</h3>
        ${fig(U.svg(420, 230, `<path d="M210 20L390 200H30Z" class="u-ln" style="stroke-width:2"/>
          ${U.blk(150, 8, 120, 34, 'Alcance', { cls: 'k-a' })}${U.blk(10, 186, 130, 34, 'Importancia', { cls: 'k-a' })}${U.blk(290, 186, 120, 34, 'Estimación', { cls: 'k-if' })}
          <text x="210" y="140" class="u-c u-sans u-b t-x">Calidad interna</text><text x="210" y="156" class="u-c u-sm">no negociable</text>
          <text x="60" y="110" class="u-sm">Dueño de Producto</text><text x="300" y="110" class="u-sm">Equipo</text>`, 'Triángulo de alcance, importancia y estimación con la calidad interna en el centro'), 'El alcance y la importancia los fija el Dueño de Producto; la estimación, el equipo. Se ajustan en diálogo cara a cara. La calidad interna queda afuera del ajuste.')}
        <p>El cliente resume su meta y las historias más importantes; el equipo las estima, empezando por la más importante. Aparecen dudas de alcance: a veces la respuesta obliga a re-estimar, y a veces la estimación no es la esperada y el Dueño de Producto cambia la importancia o el alcance, lo que obliga a estimar de nuevo. Por eso <strong>el Dueño de Producto tiene que estar</strong>. Si no puede, que nombre un delegado con poder pleno de decisión; si eso no funciona, se pide al cliente otro Dueño de Producto, o se posterga el sprint.</p>

        <h2>La calidad, cuarta variable</h2>
        ${table(['Calidad externa', 'Calidad interna'], [['Lo que perciben los usuarios. Una interfaz lenta y poco intuitiva es baja calidad externa. <strong>Es parte del alcance</strong>: la decide el Dueño de Producto.', 'Aspectos no visibles al usuario con profundo efecto en la mantenibilidad: consistencia del diseño, cobertura de pruebas, legibilidad, refactorización. <strong>No se discute</strong>: es responsabilidad del equipo.']])}
        <p>Un sistema con alta calidad interna puede tener baja calidad externa, pero uno con baja calidad interna rara vez tendrá buena calidad externa: es difícil construir sobre cimientos podridos. Cuando el Dueño de Producto pide bajar la estimación <strong>manteniendo el alcance</strong>, está intentando usar la calidad interna como variable de ajuste. Sacrificarla es siempre una idea terrible: el tiempo que se ahorra es mucho menor que el costo de recuperar la calidad después. La respuesta correcta es: “ya que es importante entregarla pronto, <strong>reduzcamos su alcance</strong>”.</p>

        <h2>Todo tiene su tiempo: la duración del sprint</h2>
        <p>En Scrum todo es <strong>time-boxed</strong>: tener una agenda evita reuniones eternas.</p>
        ${table(['Sprints cortos', 'Sprints largos'], [['Ciclo de feedback corto: más entregas, más feedback del cliente, menos tiempo en la dirección equivocada, se aprende más rápido. Los prefieren los <strong>clientes</strong>.', 'El equipo tiene más tiempo para recuperarse de los problemas y cumplir la meta. Los prefieren los <strong>desarrolladores</strong>.']])}
        <p>La duración es un <strong>compromiso</strong>; Kniberg propone <strong>3 semanas</strong> como ideal (corto para la agilidad, largo para recuperarse). Hay que probar y, una vez fijada, mantenerla: “cada 3 semanas hay una entrega. Punto”.</p>

        <h2>Qué historias entran</h2>
        <p>Las historias se ordenan por importancia y se toman desde arriba hasta llenar la <strong>velocidad estimada</strong> del equipo (cuánto puede completar en el sprint). <strong>El equipo decide cuántas historias incluye, no el cliente.</strong> En la práctica se usan <strong>tarjetas</strong> en una pared: la gente se para y se mantiene alerta, todos participan, se editan varias historias a la vez y repriorizar es mover tarjetas; las más importantes van a la izquierda. Las historias se dividen en <strong>tareas</strong> (post-its bajo cada tarjeta), lo que hace la estimación más exacta. Después se actualiza la pila en la planilla.</p>
        <h3>¿Cuándo termina una historia?</h3>
        <p>Dueño de Producto y equipo deben acordar la <strong>definición de “terminado”</strong>: ¿cuando el código está en el repositorio? ¿cuando se instaló en pre-producción y lo verificó un equipo de pruebas? Kniberg acordó: “una historia está terminada cuando el encargado de pruebas del equipo lo dice”, y es su labor asegurar que se entendió la intención del Dueño de Producto.</p>
      `,
      labs: [{ type: 'steps', title: 'El ciclo de Scrum', intro: 'Recorré el ciclo completo de un sprint. Antes de avanzar, decí qué artefacto o reunión viene.', fig: ciclo, steps: [
        { k: 'Artefacto', t: 'La <strong>pila de producto</strong>, priorizada por el Dueño de Producto. Las historias de arriba (más importantes) tienen importancia única.' },
        { k: 'Reunión', t: 'La <strong>planificación del sprint</strong>: Dueño de Producto y equipo ajustan alcance, importancia y estimación; el equipo decide cuánto entra según su velocidad.' },
        { k: 'Artefacto', t: 'La <strong>pila de sprint</strong>: las historias a las que el equipo se compromete, divididas en tareas.' },
        { k: 'Iteración', t: 'El <strong>sprint</strong>: período fijo (Kniberg recomienda 3 semanas) en el que el equipo trabaja sin interrupciones.' },
        { k: 'Reunión', t: 'El <strong>scrum diario</strong>: cada día, a la misma hora y de pie, frente al tablero; máximo 15 minutos.' },
        { k: 'Reunión', t: 'La <strong>demo</strong> (revisión): se muestra lo realmente terminado y se obtiene feedback de los interesados.' },
        { k: 'Reunión', t: 'La <strong>retrospectiva</strong>: qué salió bien, qué mejorar y qué cambiar. Las mejoras alimentan el próximo sprint.' },
      ] }],
      quiz: [
        { q: '¿Cuál es la reunión más importante de Scrum según Kniberg?', o: ['La planificación de sprint', 'La retrospectiva, porque permite mejorar', 'El scrum diario, porque sincroniza', 'La demo, porque obliga a terminar'], a: 0, e: 'Una planificación mal hecha puede arruinar el sprint. La retrospectiva es la segunda más importante.' },
        { q: '¿Cuál NO es un producto de la reunión de planificación de sprint?', o: ['El SAD del sistema', 'La meta de sprint', 'La fecha de la demo', 'El lugar y momento del scrum diario'], a: 0, e: 'También produce la lista de miembros y la pila de sprint.' },
        { q: 'El Dueño de Producto pide bajar la estimación de una historia sin reducir su alcance. ¿Qué corresponde responder?', o: ['Reducir el alcance de la historia: la calidad interna no se negocia', 'Bajar la cobertura de pruebas para terminar antes', 'Aceptar y trabajar horas extra', 'Cambiar de Dueño de Producto'], a: 0, e: 'Pedir menos estimación con el mismo alcance es usar la calidad interna como ajuste, y eso es siempre una idea terrible.' },
        { q: 'La lentitud de una interfaz es un problema de calidad...', o: ['Externa: es alcance y la decide el Dueño de Producto', 'Interna: la decide el equipo porque es técnica', 'Interna: por eso no se negocia con el cliente', 'De proceso: la resuelve el Scrum Master'], a: 0, e: 'La calidad externa es lo que percibe el usuario.' },
        { q: '¿Quién decide cuántas historias se incluyen en el sprint?', o: ['El equipo', 'El Dueño de Producto', 'El Scrum Master', 'El cliente'], a: 0, e: 'El equipo se compromete según su velocidad estimada.' },
        { q: '¿Qué duración de sprint propone Kniberg como ideal?', o: ['3 semanas', '1 semana', '2 meses', '6 semanas'], a: 0, e: 'Es un compromiso entre agilidad y tiempo para recuperarse de problemas.' },
        { q: 'Si el Dueño de Producto no puede asistir a la planificación, ¿qué se recomienda?', o: ['Un delegado con poder pleno de decisión', 'Planificar igual y avisarle después por correo', 'Que el Scrum Master decida las prioridades', 'Saltear la planificación y arrancar el sprint'], a: 0, e: 'Si no funciona, se pide otro Dueño de Producto o se posterga el sprint.' },
        { q: '¿Por qué los sprints cortos favorecen la agilidad?', o: ['El feedback es más frecuente', 'El equipo trabaja menos horas', 'Se evita hacer la retrospectiva', 'No hace falta estimar las historias'], a: 0, e: 'Los largos, en cambio, dan más margen para recuperarse de problemas.' },
      ],
      sources: [{ title: 'Scrum y XP desde las trincheras', ref: 'Kniberg, págs. 26-40', points: ['Cómo preparamos y hacemos la planificación de sprint.', 'La calidad como cuarta variable, duración del sprint y definición de terminado.'] }],
    },

    {
      id: 'estimacion-y-velocidad',
      module: 'm3',
      title: 'Estimación: planning poker y velocidad',
      keywords: 'planning poker cartas estimación en equipo velocidad estimada velocidad real factor de dedicación días-hombre disponibles tiempo que hizo ayer',
      tldr: 'Estimar es <mark>trabajo de todo el equipo</mark>. El <strong>planning poker</strong> evita que la primera opinión arrastre a las demás. La <strong>velocidad</strong> (puntos completados por sprint) se estima como <mark>días-hombre disponibles × factor de dedicación</mark>.',
      goals: ['Explicar por qué estima todo el equipo.', 'Describir el planning poker y sus cartas especiales.', 'Calcular el factor de dedicación y la velocidad estimada.'],
      body: `
        <h2>Estimar en equipo</h2>
        <p>Todos deben estimar cada historia: en ese momento no se sabe quién implementará cada parte, y las historias involucran a varias áreas (interfaces, programación, pruebas). Para estimar hay que entender de qué trata la historia, así que pedir a todos que estimen asegura que todos la comprendan. Eso mejora la cooperación durante el sprint y hace aparecer pronto las preguntas importantes. Las discrepancias grandes conviene descubrirlas al principio.</p>
        <p>Problema: si se pide una estimación en voz alta, responde primero quien mejor entiende la historia, y eso influye en los demás.</p>

        <h2>Planning poker</h2>
        <ol>
          <li>Cada miembro tiene una baraja de <strong>13 cartas</strong>.</li>
          <li>Para estimar una historia, cada uno elige una carta (puntos de historia) y la pone <strong>boca abajo</strong>.</li>
          <li>Todos las dan vuelta <strong>al mismo tiempo</strong>: cada uno piensa por sí mismo.</li>
          <li>Si hay mucha discrepancia, el equipo discute las diferencias y construye una imagen común del trabajo.</li>
          <li>Se estima de nuevo, hasta que las estimaciones <strong>convergen</strong>.</li>
        </ol>
        ${fig(U.svg(600, 90, ['0', '½', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?', '☕'].map((c, i) => `<rect x="${6 + i * 45}" y="10" width="38" height="58" rx="5" class="u-blk ${c === '?' || c === '☕' || c === '0' ? 'k-warn' : 'k-a'}"/><text x="${25 + i * 45}" y="45" class="u-c u-sans u-b" style="font-size:15px">${c}</text>`).join(''), 'Las 13 cartas del planning poker'), 'Las 13 cartas (baraja típica de Kniberg). La secuencia <strong>no es lineal</strong>: no hay nada entre 40 y 100, para evitar una falsa sensación de exactitud en las estimaciones grandes.')}
        <p>Cada uno debe estimar el <strong>total</strong> de la historia, no solo “su” parte. Si una historia ronda los 20 puntos, no tiene sentido discutir si son 18 o 21: lo que sabemos es que es grande y difícil de estimar. Cartas especiales: <strong>0</strong> = prácticamente nada, unos minutos; <strong>?</strong> = ni idea; <strong>taza de café</strong> = estoy demasiado cansado, tomemos un descanso.</p>

        <h2>Velocidad</h2>
        <p>La <strong>velocidad</strong> mide la cantidad de trabajo realizado: la suma de las <strong>estimaciones iniciales</strong> de las historias completadas en un sprint. Las historias casi terminadas no suman nada, porque Scrum gira en torno a dejar las cosas <strong>completamente hechas</strong>, “potencialmente entregables”: el valor de lo medio hecho es cero.</p>
        <p>Para estimar la del próximo sprint hay dos formas: el <strong>“tiempo que hizo ayer”</strong> (suponer que será como la de los últimos sprints, si el equipo y las condiciones no cambian) o un cálculo de recursos:</p>
        <div class="eq"><span class="eq-l">Velocidad estimada</span><span class="eq-m">días-hombre disponibles × factor de dedicación</span></div>
        <div class="eq"><span class="eq-l">Factor de dedicación</span><span class="eq-m">velocidad real del último sprint ÷ días-hombre disponibles del último sprint</span></div>
        <p>Un punto de historia es un día-hombre <em>ideal</em> (sin distracciones), lo cual es raro: hay trabajo no planificado, gente enferma. Por eso la velocidad estimada es siempre menor que los días disponibles. El <strong>factor de dedicación</strong> estima qué tan centrado estará el equipo; uno bajo indica muchas distracciones o estimaciones optimistas.</p>
        <p><strong>Ejemplo de Kniberg</strong>: el último sprint, Tom, Lisa y Sam trabajaron 3 semanas (45 días-hombre) y completaron 18 puntos → factor = 18 / 45 = 40%. El próximo sprint de 3 semanas suma 50 días-hombre disponibles (Lisa se toma 2 días, Dave está al 50% y se toma uno) → velocidad estimada = 50 × 0,4 = <strong>20 puntos</strong>.</p>
        ${lab(0)}
      `,
      labs: [{
        type: 'calc', title: 'Calculadora de velocidad',
        intro: 'Cargá los datos del sprint anterior y los días disponibles del próximo. Los valores iniciales son los del ejemplo de Kniberg.',
        fields: [
          { id: 'vr', label: 'Velocidad real del último sprint (puntos)', value: 18 },
          { id: 'dp', label: 'Días-hombre del último sprint', value: 45 },
          { id: 'dn', label: 'Días-hombre disponibles ahora', value: 50 },
        ],
        run: (v) => {
          if (!(v.dp > 0)) return 'Los días-hombre del último sprint tienen que ser mayores que cero.';
          const f = v.vr / v.dp, e = v.dn * f;
          return `Factor de dedicación = ${v.vr} ÷ ${v.dp} = ${(f * 100).toFixed(1)}%\nVelocidad estimada = ${v.dn} × ${f.toFixed(3)} = ${e.toFixed(1)} puntos\n→ Tomá historias desde la más importante hasta sumar ≈ ${Math.floor(e)} puntos.${f > 1 ? '\n⚠ Factor mayor a 100%: las estimaciones iniciales fueron pesimistas o hubo horas extra.' : ''}`;
        },
      }],
      quiz: [
        { q: '¿Por qué en el planning poker las cartas se dan vuelta todas a la vez?', o: ['Para que nadie siga la estimación del que más sabe', 'Para ahorrar tiempo en la reunión de planificación', 'Para que el Scrum Master elija la estimación final', 'Para calcular automáticamente el promedio del equipo'], a: 0, e: 'Si se estima en voz alta, el que mejor entiende la historia influye en los demás.' },
        { q: '¿Por qué no hay cartas entre 40 y 100?', o: ['Para evitar una falsa exactitud en lo grande', 'Porque nunca hay historias de ese tamaño', 'Porque el mazo tiene solo trece cartas', 'Porque 100 significa que no se hace'], a: 0, e: 'En historias grandes la precisión no tiene sentido.' },
        { q: '¿Qué significa la carta de la taza de café?', o: ['Estoy cansado: tomemos un descanso', 'La historia es trivial: unos minutos', 'No tengo idea de cuánto lleva', 'La historia es demasiado grande'], a: 0, e: '0 es trivial y ? es ni idea.' },
        { q: 'El último sprint se completaron 18 puntos con 45 días-hombre. Este sprint hay 50 días-hombre. ¿Velocidad estimada?', o: ['20 puntos', '18 puntos', '50 puntos', '22,5 puntos'], a: 0, e: 'Factor = 18/45 = 0,4; velocidad = 50 × 0,4 = 20.' },
        { q: '¿Cómo se calcula la velocidad real de un sprint?', o: ['Sumando las estimaciones iniciales de las historias completadas', 'Sumando las horas trabajadas', 'Sumando las estimaciones actualizadas de todas las historias, terminadas o no', 'Contando las tareas cerradas'], a: 0, e: 'Se ignoran las re-estimaciones y las historias casi terminadas no suman.' },
        { q: 'Al estimar una historia, cada miembro debe estimar...', o: ['El tiempo total de la historia, no solo su parte', 'Solo la parte que le tocará', 'Lo que estime el Dueño de Producto', 'La cantidad de líneas de código'], a: 0, e: 'Por eso estima todo el equipo.' },
      ],
      sources: [{ title: 'Scrum y XP desde las trincheras', ref: 'Kniberg, págs. 31-35 y 41-45', points: ['Estimando con cálculos de velocidad y factor de dedicación.', 'Planning poker.'] }],
    },

    {
      id: 'ciclo-del-sprint',
      module: 'm3',
      title: 'Durante el sprint: tablero, scrum diario, demo y retrospectiva',
      keywords: 'tablero de tareas kanban burn-down scrum diario 15 minutos de pie demo revisión de sprint retrospectiva bien mejorable mejoras votación pila de sprint',
      tldr: 'Durante el sprint, la pila de sprint vive en un <mark>tablero de tareas</mark> con un gráfico <strong>burn-down</strong>. Cada día hay un <strong>scrum diario</strong> de pie. Al final, una <mark>demo</mark> de lo realmente terminado y una <mark>retrospectiva</mark>, la mejor oportunidad para mejorar.',
      goals: ['Describir un tablero de tareas y un burn-down.', 'Explicar cómo se hace el scrum diario.', 'Dar los beneficios de la demo.', 'Organizar una retrospectiva.', 'Resolver el TP 3.'],
      body: `
        <h2>El tablero de tareas</h2>
        <p>Kniberg prefiere un tablero físico en la pared del equipo, con columnas <strong>No iniciado · En curso · Terminado</strong>, una fila por historia y los post-its de sus tareas. Se pueden agregar columnas (“esperando test de integración”), pero hay que pensarlo bien: la simplicidad vale mucho. Los <strong>elementos no planificados</strong> se anotan aparte, para la retrospectiva. Es la base del tablero Kanban que pide el TP 3.</p>
        ${fig(U.svg(600, 190, `${['Historia', 'No iniciado', 'En curso', 'Terminado'].map((t, i) => `<rect x="${6 + i * 148}" y="6" width="142" height="178" rx="6" class="u-lyr"/><text x="${77 + i * 148}" y="24" class="u-c u-sans u-b">${t}</text>`).join('')}
          ${['Depósito', 'Migración', 'Login backoffice'].map((t, r) => `<rect x="16" y="${38 + r * 48}" width="122" height="38" rx="3" class="u-blk k-a"/><text x="77" y="${61 + r * 48}" class="u-c u-sans">${t}</text>`).join('')}
          ${[[3, 0], [3, 0, 1], [2, 1], [3, 1], [1, 2], [2, 2], [1, 2, 1]].map(([c, r, o = 0]) => `<rect x="${18 + c * 148 + o * 62}" y="${40 + r * 48}" width="54" height="32" rx="2" class="u-blk ${c === 3 ? 'k-ok' : c === 2 ? 'k-warn' : ''}"/>`).join('')}`,
          'Tablero de tareas con columnas Historia, No iniciado, En curso y Terminado y post-its por historia'), 'Tablero de tareas a mitad del sprint: “Depósito” ya está terminada, “Migración” está en curso y “Login backoffice” recién empieza.')}
        <p>El <strong>gráfico burn-down</strong> muestra los puntos que faltan día por día. En el ejemplo de Kniberg el equipo arrancó el 1 de agosto con unos 70 puntos (la velocidad estimada) y el 16 de agosto quedaban 15; la línea de tendencia indica si se llega a la fecha de la demo.</p>
        ${fig(U.svg(420, 200, `${U.ln([[40, 10], [40, 170], [410, 170]], { end: 'ar' })}<text x="44" y="16" class="u-sm">puntos restantes</text><text x="408" y="188" class="u-sm u-e">días del sprint</text>
          <path d="M40 30L400 170" class="u-ln u-dash"/><path d="M40 30L80 40L120 38L160 62L200 80L240 96L280 120" class="u-msg" style="stroke-width:2.6"/><path d="M280 120L360 156" class="u-msg u-dash"/>
          <text x="44" y="44" class="u-sm">70</text><text x="284" y="114" class="u-sm">15 (día 16)</text><text x="300" y="70" class="u-sm">ideal</text>`, 'Gráfico burn-down con línea ideal y real'), 'Burn-down: en naranja, lo que realmente quedaba cada día; punteada, la línea ideal hasta cero el último día.')}

        <h2>Scrum diario</h2>
        <ul>
          <li>Empieza <strong>exactamente a su hora</strong>, cada día en el mismo sitio, frente al tablero.</li>
          <li>Se hace <strong>de pie</strong>, lo que reduce el riesgo de pasarse de <strong>15 minutos</strong>.</li>
          <li>Cada persona cuenta qué hizo ayer y qué hará hoy, y mueve sus post-its; agrega los no planificados y actualiza estimaciones.</li>
          <li>Conviene que todo el equipo mantenga actualizada la pila de sprint. Si lo hace solo el Scrum Master, administra en vez de eliminar impedimentos, y el equipo pierde el feedback del estado del sprint.</li>
          <li>Inmediatamente después, alguien suma las estimaciones pendientes y actualiza el burn-down.</li>
        </ul>

        <h2>La demo de sprint</h2>
        <p>La demo (o revisión de sprint) suele subestimarse, pero una bien hecha tiene un efecto profundo:</p>
        <ul>
          <li>el equipo obtiene <strong>reconocimiento</strong> y se siente bien;</li>
          <li>otras personas se enteran de lo que hace el equipo;</li>
          <li>se obtiene <strong>feedback vital</strong> de los interesados;</li>
          <li>es un evento social donde equipos distintos interactúan;</li>
          <li><strong>obliga a terminar realmente las cosas</strong>: sin demos hay montones de cosas “al 99%”. Si la demo sale embarazosa, duele como una medicina amarga, y en el próximo sprint el equipo hace lo imposible por tener algo funcionando.</li>
        </ul>
        <p>Lista de comprobación: presentar claramente el objetivo del sprint (y el producto, si hay gente que no lo conoce), mostrar código funcionando más que diapositivas, mantener un nivel de negocio y dejar que el público pruebe.</p>

        <h2>La retrospectiva</h2>
        <p>Lo más importante de las retrospectivas es <strong>que se hagan</strong>: es el <strong>segundo evento más importante</strong> de Scrum (después de la planificación) y la mejor oportunidad de mejorar. Una idea tiene muchas más chances de que el equipo la acepte si surge de él. Sin retrospectivas, el equipo repite los mismos errores.</p>
        <ul>
          <li>Se reservan 1 a 3 horas; participan el Dueño de Producto, el equipo y el Scrum Master, en un lugar cerrado sin interrupciones; alguien es secretario.</li>
          <li>El Scrum Master muestra la pila de sprint y, con el equipo, resume el sprint.</li>
          <li><strong>La ronda</strong>: cada uno dice, sin ser interrumpido, qué salió bien, qué podría haber ido mejor y qué haría distinto.</li>
          <li>Se compara la <strong>velocidad estimada con la real</strong> y, si difieren mucho, se analiza por qué.</li>
          <li>Pizarra en tres columnas: <strong>Bien</strong> (lo repetiríamos), <strong>Mejorable</strong> (lo haríamos distinto) y <strong>Mejoras</strong> (ideas concretas). Las dos primeras miran al pasado; la tercera, al futuro.</li>
          <li><strong>Votación por puntos</strong>: cada miembro tiene tres imanes; se eligen unas pocas mejoras (no ser ambicioso) y se evalúan en la siguiente retrospectiva.</li>
        </ul>
      `,
      exercises: [
        { title: 'Tradicional vs. ágil', official: '3.1', level: 1, prompt: '<p>Elaborá un resumen comparativo entre metodologías tradicionales (cascada) y ágiles.</p>', solution: { explain: `${table(['', 'Tradicional (cascada)', 'Ágil'], [
          ['Planificación', 'Todo por anticipado; el avance se mide contra el plan.', 'Incremental; se replanifica en cada iteración.'],
          ['Requerimientos', 'Se especifican completos antes de diseñar.', 'Se descubren y cambian; solo se definen los más importantes.'],
          ['Etapas', 'Fases separadas con documentos firmados.', 'Especificación, diseño e implementación entrelazados.'],
          ['Entregas', 'Una entrega final.', 'Incrementos cada 2 a 4 semanas.'],
          ['Documentación', 'Extensa y formal.', 'Mínima; comunicación cara a cara.'],
          ['Cliente', 'Participa al inicio y al final.', 'Colabora todo el proyecto (Dueño de Producto).'],
          ['Conviene en', 'Sistemas críticos, regulados, grandes, distribuidos o de vida larga.', 'Sistemas de negocio cambiantes, equipos chicos y cliente disponible.'],
        ])}` } },
        { title: 'Valores y principios del Manifiesto', official: '3.2', level: 1, prompt: '<p>Explicá los valores y principios del Manifiesto Ágil.</p>', solution: { explain: '<p>Los 4 valores: individuos e interacciones sobre procesos y herramientas; software funcionando sobre documentación extensiva; colaboración con el cliente sobre negociación contractual; respuesta ante el cambio sobre seguir un plan (valorando también lo de la derecha). Los 12 principios están en la lección <a href="#/manifiesto-y-xp">Manifiesto Ágil y XP</a>: entrega temprana y continua, aceptar cambios, entregas frecuentes de 2 semanas a 2 meses, trabajo diario con usuarios, individuos motivados, cara a cara, software funcionando como medida, ritmo sostenible, excelencia técnica, simplicidad, equipos auto-organizados y reflexión periódica.</p>' } },
        { title: 'Roles de Scrum', official: '3.3', level: 1, prompt: '<p>Describí los roles de Scrum: Product Owner, Scrum Master y Development Team.</p>', solution: { explain: '<p><strong>Product Owner</strong>: representa al cliente, es dueño de la pila de producto, fija importancia y alcance de las historias y participa de la planificación. <strong>Scrum Master</strong>: facilita el proceso, organiza las reuniones, protege al equipo y elimina impedimentos. <strong>Development Team</strong>: equipo auto-organizado y multidisciplinario, el único que estima, decide cuánto entra en el sprint y es responsable de la calidad interna.</p>' } },
        { title: 'Pila de producto de un sistema de gestión académica', official: '3.4', level: 2, prompt: '<p>Definí el Product Backlog del Sistema de Gestión Académica con al menos 5 historias de usuario (ejemplo: “Como estudiante quiero inscribirme online para no hacer filas”) y priorizalas según valor de negocio y complejidad (peso y prioridad).</p>', hints: ['Usá el formato Como / quiero / para.', 'Importancia: más alto = más importante, con espacios entre números.', 'Estimá en puntos relativos (1, 2, 3, 5, 8, 13...).'], solution: { explain: `<p>Una solución posible (la importancia la fija el Dueño de Producto; la estimación, el equipo):</p>${table(['ID', 'Historia', 'Importancia', 'Estimación', 'Cómo probarlo'], [
          ['1', 'Como estudiante quiero inscribirme online a materias para no hacer filas.', '100', '8', 'Entrar, elegir materia con cupo, confirmar y verla en “mis inscripciones”.'],
          ['2', 'Como docente quiero cargar notas de parciales para que los alumnos las vean.', '90', '5', 'Cargar nota, entrar como alumno y verla publicada.'],
          ['3', 'Como estudiante quiero consultar mi historia académica para saber qué me falta.', '80', '3', 'Entrar y ver materias aprobadas, regulares y pendientes.'],
          ['4', 'Como administrativo quiero definir cupos por comisión para no superar la capacidad del aula.', '70', '3', 'Fijar cupo 2, inscribir 3 alumnos: el tercero debe ser rechazado.'],
          ['5', 'Como estudiante quiero recibir un aviso cuando se publica una nota para enterarme a tiempo.', '40', '5', 'Publicar nota y verificar que llega la notificación.'],
          ['6', 'Como docente quiero exportar el listado de la comisión para registrar asistencia.', '30', '2', 'Exportar y abrir el archivo con todos los inscriptos.'],
        ])}<p>Las de mayor valor de negocio (inscripción y notas) van arriba aunque sean más complejas. La 1 depende de la 4 (cupos), lo que puede llevar a subir la importancia de la 4 o a incluirlas juntas.</p>` } },
        { title: 'Sprint 1, pila de sprint y tablero', official: '3.5', level: 2, prompt: '<p>Seleccioná las historias del Sprint 1 (2 semanas), elaborá el Sprint Backlog con tareas concretas y diseñá un tablero Kanban. El equipo tiene 4 integrantes a tiempo completo y su factor de dedicación histórico es del 40%.</p>', hints: ['2 semanas = 10 días laborables.', 'Velocidad = días-hombre × factor de dedicación.'], solution: { explain: `<p>Días-hombre = 4 × 10 = 40; velocidad estimada = 40 × 0,4 = <strong>16 puntos</strong>. Tomando de arriba: historia 1 (8) + historia 2 (5) + historia 3 (3) = 16 puntos. La 4 (cupos) no entra; como la 1 la necesita, conviene acordar con el Dueño de Producto reducir el alcance de la 1 (inscripción sin control de cupo en este sprint) o cambiar la 3 por la 4.</p>
          <p><strong>Pila de sprint</strong> (tareas): Historia 1: diseñar pantalla de inscripción; modelo y tabla de inscripciones; servicio de inscripción; validar correlativas; pruebas de aceptación. Historia 2: pantalla de carga de notas; servicio y persistencia; vista del alumno; pruebas. Historia 3: consulta de historia académica; pantalla; pruebas.</p>
          <p><strong>Tablero</strong>: columnas Historia · No iniciado · En curso · Terminado (opcional “En prueba”), una fila por historia con sus post-its, más un espacio para tareas no planificadas y el burn-down de 16 puntos a 0 en 10 días.</p>` } },
        { title: 'Reflexión: Scrum en diseño de sistemas', official: '3.6', level: 2, prompt: '<p>Reflexión grupal: ventajas y desafíos de aplicar Scrum en el diseño de sistemas.</p>', solution: { explain: '<p><strong>Ventajas</strong>: feedback temprano del cliente sobre el diseño; las decisiones de interfaz se validan con incrementos reales; priorización por valor; adaptación al cambio; la demo obliga a terminar y la retrospectiva mejora el proceso.</p><p><strong>Desafíos</strong>: la arquitectura no se puede hacer en forma incremental y hay que definirla al principio; la documentación de diseño tiende a quedar desactualizada (problema en sistemas de vida larga o con equipos distribuidos); requiere un Dueño de Producto disponible; requiere diseñadores y programadores capaces; y en sistemas regulados o críticos se necesita más análisis y documentación de lo que Scrum suele producir.</p>' } },
      ],
      quiz: [
        { q: '¿Por qué conviene hacer el scrum diario de pie?', o: ['Reduce el riesgo de pasarse de 15 minutos', 'Porque así lo exige el Manifiesto', 'Para que el Dueño de Producto controle', 'Para que no haya que actualizar el tablero'], a: 0, e: 'Además se hace a la misma hora, en el mismo lugar, frente al tablero.' },
        { q: '¿Qué desventaja tiene que solo el Scrum Master actualice la pila de sprint?', o: ['Administra en vez de quitar impedimentos y el equipo pierde feedback', 'Ninguna: mantener la pila de sprint es responsabilidad exclusiva suya', 'El Dueño de Producto pierde acceso a la pila y no puede repriorizar', 'El burn-down se calcula mal porque se ignoran las tareas no planificadas'], a: 0, e: 'Conviene involucrar a todo el equipo.' },
        { q: '¿Cuál es el efecto más profundo de hacer siempre una demo?', o: ['Obliga al equipo a terminar realmente las cosas', 'Permite saltear la retrospectiva', 'Reemplaza las pruebas de aceptación', 'Sirve para estimar la próxima velocidad'], a: 0, e: 'Sin demos se acumulan cosas terminadas al 99%.' },
        { q: '¿Qué columnas tiene la pizarra de retrospectiva de Kniberg?', o: ['Bien, Mejorable y Mejoras', 'No iniciado, En curso y Terminado', 'Ayer, Hoy e Impedimentos', 'Valor, Costo y Riesgo'], a: 0, e: 'Las dos primeras miran al pasado y la tercera al futuro.' },
        { q: '¿Qué es lo más importante de las retrospectivas?', o: ['Que se hagan', 'Que duren menos de 15 minutos', 'Que las dirija el cliente', 'Que produzcan un informe escrito'], a: 0, e: 'Sin ellas el equipo repite los mismos errores.' },
        { q: '¿Qué muestra el gráfico burn-down?', o: ['Los puntos de historia que faltan, día por día', 'La velocidad de todos los sprints', 'Las horas extra del equipo', 'La importancia de cada historia'], a: 0, e: 'Permite ver si se llega a la fecha de la demo.' },
      ],
      sources: [{ title: 'Scrum y XP desde las trincheras', ref: 'Kniberg, págs. 46-75', points: ['Cómo hacemos pilas de sprint, el tablero y el burn-down.', 'Scrum diarios, demos y retrospectivas.'] }],
    },
  );
})();
