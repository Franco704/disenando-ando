/* Unidad VI, clase 23: pruebas de usuario, depuración, planificación de la prueba y seguridad en el diseño. Diapositivas 23, Sommerville 9ª ed. cap. 8 (págs. 227-231) y cap. 14 (págs. 375-386). */
(() => {
  const { LESSONS, h } = window.GUIDE;
  const { note, def, table, fig, lab, uml: U } = h;

  const capasSeg = fig(U.svg(560, 250, `
    ${U.blk(10, 10, 540, 230, '', { cls: 'k-warn' })}<text x="24" y="32" class="u-sans u-b">1. Protección a nivel de plataforma</text><text x="24" y="48" class="u-sm">ingreso del usuario a una computadora</text>
    ${U.blk(50, 60, 460, 170, '', { cls: 'k-if' })}<text x="64" y="82" class="u-sans u-b">2. Protección a nivel de aplicación</text><text x="64" y="98" class="u-sm">acceso del usuario a la aplicación</text>
    ${U.blk(90, 110, 380, 110, '', { cls: 'k-a' })}<text x="104" y="132" class="u-sans u-b">3. Protección a nivel de registro</text><text x="104" y="148" class="u-sm">¿está autorizado a este registro? · cifrado · sumas de verificación</text>
    ${U.blk(200, 160, 160, 48, 'Registros de\npacientes', { cls: 'k-err' })}`,
    'Arquitectura en capas para proteger los registros de pacientes: plataforma, aplicación y registro'),
    'Arquitectura de protección en capas del sistema de registros de pacientes (Sommerville, figura 14.4). Para llegar a un registro hay que atravesar 3 capas, cada una con <strong>credenciales distintas</strong>.');

  LESSONS.push(
    {
      id: 'pruebas-de-usuario',
      module: 'm19',
      title: 'Pruebas de usuario: alfa, beta y aceptación',
      keywords: 'pruebas de usuario cliente entorno de trabajo alfa beta aceptación 6 etapas criterios plan derivar correr negociar rechazo aceptación condicional XP usuario típico',
      tldr: 'En las <mark>pruebas de usuario</mark> los usuarios aportan su entrada y asesoría: son esenciales porque <strong>el entorno real no se puede replicar</strong>. Hay 3 tipos: <strong>alfa</strong> (con el equipo, en el sitio del desarrollador), <strong>beta</strong> (una versión temprana para usuarios) y <strong>aceptación</strong> (el cliente decide si acepta y paga), esta última en <mark>6 etapas</mark>.',
      goals: ['Explicar por qué son esenciales las pruebas de usuario.', 'Diferenciar alfa, beta y aceptación.', 'Ordenar las 6 etapas de las pruebas de aceptación.', 'Explicar la aceptación en XP y la aceptación condicional.'],
      body: `
        <h2>Por qué hacen falta</h2>
        <p>Las pruebas de usuario o del cliente son la etapa en la que los usuarios proporcionan entrada y asesoría sobre las pruebas: puede ser una prueba <strong>formal</strong> de un sistema de un proveedor externo o un proceso <strong>informal</strong> en el que los usuarios experimentan con un producto nuevo. Son <strong>esenciales aunque ya se hayan hecho las pruebas del sistema y de versión</strong>: el entorno de trabajo del usuario afecta mucho la fiabilidad, el rendimiento, el uso y la robustez, y <strong>es imposible replicarlo</strong> (en un hospital hay emergencias, conversaciones con familiares, etc.). Las pruebas en el entorno del desarrollador son artificiales.</p>

        <h2>Los 3 tipos</h2>
        ${table(['Tipo', 'Qué es', 'Para qué sirve'], [
          ['<strong>Alfa</strong>', 'Los usuarios trabajan <strong>con el equipo de diseño</strong> para probar el software <strong>en el sitio del desarrollador</strong>, a medida que se desarrolla.', 'Detectan problemas y conflictos que el equipo no ve: los desarrolladores trabajan desde los requerimientos, que no reflejan todos los factores del uso práctico. Dan a los usuarios información temprana sobre el sistema. XP incluye a los usuarios en el diseño de pruebas.'],
          ['<strong>Beta</strong>', 'Una versión temprana, a veces sin terminar, se pone a disposición de usuarios (un grupo selecto de <strong>adoptadores tempranos</strong>, o el público).', 'Descubren problemas de interacción entre el software y las características de <strong>entornos que no se pueden replicar</strong>. También son <strong>comercialización</strong>: los clientes aprenden qué puede hacer el sistema.'],
          ['<strong>Aceptación</strong>', 'Después de las pruebas de versión, el <strong>cliente</strong> prueba formalmente el sistema para decidir si lo acepta y despliega en su entorno.', 'La aceptación implica que se debe <strong>pagar</strong> el sistema.'],
        ])}

        <h2>Las 6 etapas de las pruebas de aceptación</h2>
        ${lab(0)}
        <ol>
          <li><strong>Definir los criterios de aceptación</strong>: antes de firmar el contrato; forman parte del contrato y se acuerdan entre cliente y desarrollador. En la práctica es difícil definirlos con tanta antelación.</li>
          <li><strong>Planear las pruebas</strong>: recursos, tiempo, presupuesto y calendario; cómo se cubren los requerimientos y en qué orden; riesgos (caídas, rendimiento inadecuado) y cómo mitigarlos.</li>
          <li><strong>Derivar las pruebas</strong>: diseñarlas para comprobar si el sistema es aceptable, cubriendo características funcionales y no funcionales; lo ideal es cubrir todos los requerimientos.</li>
          <li><strong>Correr las pruebas</strong>: idealmente en el entorno real de uso (aunque sea perturbador y poco práctico; si no, un entorno de pruebas de usuario). Puede requerir capacitar a los usuarios.</li>
          <li><strong>Negociar los resultados</strong>: es poco probable que se pasen todas; si hay problemas, cliente y desarrollador negocian si el sistema es suficientemente adecuado.</li>
          <li><strong>Rechazar o aceptar el sistema</strong>: en una reunión se decide; si no es bueno, requiere más desarrollo y luego se repite la fase de aceptación.</li>
        </ol>
        <h3>En los métodos ágiles</h3>
        <p>En XP sigue siendo el usuario quien acepta, pero <strong>forma parte del equipo</strong> (es un examinador alfa), aporta los requerimientos y define las pruebas; las pruebas son automatizadas y el desarrollo no avanza hasta pasar todas: <strong>no hay una actividad separada</strong> de aceptación. El problema es garantizar que ese usuario sea <strong>típico</strong>, con conocimiento general de cómo se usará el sistema.</p>
        <h3>La realidad: aceptación condicional</h3>
        <p>Parecería un conflicto contractual grave (si no pasa, se rechaza y no se paga), pero los clientes quieren usar el software cuanto antes: ya compraron hardware, capacitaron personal y modificaron procesos, y no usarlo cuesta más que convivir con los problemas. Se puede hacer una <strong>aceptación condicional</strong>: el cliente acepta el sistema tal cual para empezar a desplegarlo, y el desarrollador se compromete a reparar lo urgente y entregar una nueva versión lo antes posible.</p>
      `,
      labs: [{ type: 'order', title: 'Ordená las 6 etapas de las pruebas de aceptación', items: ['Definir criterios de aceptación', 'Planear las pruebas de aceptación', 'Derivar las pruebas de aceptación', 'Correr las pruebas de aceptación', 'Negociar los resultados de las pruebas', 'Rechazar o aceptar el sistema'], explain: '<p>Los criterios se definen incluso antes de firmar el contrato; la decisión final se toma en una reunión entre cliente y desarrolladores.</p>' }],
      quiz: [
        { q: '¿Por qué las pruebas de usuario son esenciales aunque ya se hicieron las de sistema y versión?', o: ['El entorno real del usuario no se puede replicar', 'Porque los usuarios programan mejor que el equipo', 'Porque reemplazan a las pruebas de unidad', 'Porque lo exige siempre el contrato del sistema'], a: 0, e: 'Las pruebas en el entorno del desarrollador son artificiales.' },
        { q: '¿Qué caracteriza a las pruebas alfa?', o: ['Los usuarios trabajan con el equipo de diseño en el sitio del desarrollador', 'Una versión temprana se publica para muchos usuarios', 'El cliente decide si paga', 'Las hace un equipo de prueba separado'], a: 0, e: 'Se hacen a medida que se desarrolla el sistema.' },
        { q: '¿Qué descubren especialmente las pruebas beta?', o: ['Problemas con entornos que no se pueden replicar', 'Errores de sintaxis que el compilador no vio', 'Problemas en el diseño de las clases del dominio', 'Defectos de unidad en los métodos más usados'], a: 0, e: 'Además sirven de comercialización.' },
        { q: '¿Qué implica aceptar el sistema en las pruebas de aceptación?', o: ['Que se debe pagar el sistema', 'Que el sistema no tiene errores', 'Que termina el mantenimiento', 'Que se publica en beta'], a: 0, e: 'Por eso los criterios forman parte del contrato.' },
        { q: '¿Cuál es la primera etapa de las pruebas de aceptación?', o: ['Definir los criterios de aceptación', 'Correr las pruebas', 'Negociar los resultados', 'Planear las pruebas'], a: 0, e: 'Se hace antes de firmar el contrato.' },
        { q: '¿Qué es una aceptación condicional?', o: ['Se despliega tal cual y se corrige lo urgente después', 'Aceptar solo la mitad del sistema y pagar esa parte', 'Rechazar el sistema y no pagarlo hasta que se arregle', 'Aceptar el sistema sin hacer ninguna prueba'], a: 0, e: 'Ocurre porque no usar el sistema cuesta más que convivir con los problemas.' },
        { q: '¿Cómo son las pruebas de aceptación en XP?', o: ['El usuario está en el equipo y no hay actividad separada', 'No existen: XP no hace pruebas de aceptación', 'Las hace un equipo externo al final del proyecto', 'Se hacen solo como pruebas beta públicas'], a: 0, e: 'El desarrollo no avanza hasta pasar todas las pruebas de aceptación.' },
      ],
      sources: [{ title: 'Ingeniería de Software, 9ª ed.', ref: 'Sommerville, cap. 8, págs. 227-231', points: ['Pruebas de usuario: alfa, beta y aceptación (figura 8.11).'] }],
    },

    {
      id: 'depuracion-y-planificacion',
      module: 'm19',
      title: 'Depuración y planificación de la prueba',
      keywords: 'depuración V&V existencia de defectos localizar corregir patrones traza depurador interactivo paso a paso regresión reparaciones incompletas planificación costo mitad del presupuesto estáticas dinámicas plan de pruebas contingencias incremental',
      tldr: '<mark>V&V establece la existencia de defectos; la depuración los localiza y corrige.</mark> Después de corregir hay que volver a validar con <strong>pruebas de regresión</strong>, porque muchas reparaciones son incompletas o introducen defectos. Y como V&V cuesta <strong>más de la mitad del presupuesto</strong>, se planifica temprano, en un plan de pruebas que evoluciona.',
      goals: ['Diferenciar V&V y depuración.', 'Describir técnicas y herramientas de depuración.', 'Explicar por qué hace falta regresión tras corregir.', 'Describir qué incluye y cómo evoluciona un plan de pruebas.'],
      body: `
        <h2>Depuración</h2>
        <p>Los procesos de V&V se intercalan con la depuración: a medida que se descubren defectos, se cambia el programa para corregirlos. Pero tienen objetivos distintos:</p>
        ${table(['V&V (pruebas)', 'Depuración'], [['Intentan establecer la <strong>existencia</strong> de defectos en el software.', 'Proceso que <strong>localiza y corrige</strong> esos defectos.']])}
        <ul>
          <li>No hay un método sencillo. Se buscan <strong>patrones en las salidas</strong> de las pruebas que revelen la falla (cada tipo de defecto tiene su patrón), errores comunes de programación (olvidar incrementar un contador) y errores típicos (direccionamiento de punteros).</li>
          <li>Localizar un defecto no siempre es sencillo: puede no estar cerca del punto donde el programa falló, y puede hacer falta una <strong>traza manual</strong>, línea por línea.</li>
          <li>Hay <strong>herramientas de depuración interactivas</strong> integradas al compilador: un entorno de ejecución especial que permite ver los valores de las variables y ejecutar <strong>paso a paso</strong>, sentencia por sentencia.</li>
        </ul>
        ${fig(U.svg(600, 110, `${['Localizar\nel error', 'Diseñar la\nreparación', 'Reparar\nel error', 'Volver a probar\nel programa'].map((t, i) => U.blk(6 + i * 150, 20, 134, 56, t, { cls: i === 3 ? 'k-ok' : 'k-a' })).join('')}${[0, 1, 2].map((i) => U.ln([[140 + i * 150, 48], [156 + i * 150, 48]], { end: 'ar' })).join('')}${U.ln([[523, 76], [523, 98], [73, 98], [73, 76]], { end: 'ar', dash: true })}<text x="300" y="94" class="u-c u-sm">pruebas de regresión: ¿la reparación introdujo nuevos defectos?</text>`, 'Proceso de depuración en cuatro pasos'), 'El proceso de depuración (Sommerville). Después de reparar, se vuelve a validar: reinspeccionar o correr <strong>pruebas de regresión</strong>.')}
        ${note('La experiencia muestra que una <strong>alta proporción de las “reparaciones”</strong> de defectos son incompletas o <strong>introducen nuevos defectos</strong>. Por eso, después de corregir, siempre hay regresión.', 'exam')}

        <h2>Planificación de la prueba</h2>
        <p>La V&V es cara: insume <strong>más de la mitad del presupuesto</strong> de desarrollo. Hace falta planificarla con cuidado para sacarle el máximo provecho a inspecciones y pruebas y controlar costos.</p>
        <ul>
          <li>Se planifica en <strong>etapas tempranas</strong> del desarrollo, buscando un <strong>equilibrio entre V&V estática y dinámica</strong>. El esfuerzo depende del tipo de sistema y de los expertos disponibles.</li>
          <li>Cuanto más <strong>crítico</strong> el sistema, más esfuerzo en técnicas de verificación <strong>estáticas</strong>.</li>
        </ul>
        ${table(['El plan de pruebas...', ''], [
          ['Para los gestores', 'Ayuda a asignar recursos y estimar el calendario de pruebas; define los recursos de hardware y software necesarios, para que estén disponibles.'],
          ['Para los ingenieros', 'Da una panorámica general de las pruebas, para ubicar su propio trabajo.'],
          ['Contingencias', 'Debe incluirlas, para solucionar desajustes y reasignar personal.'],
          ['Formalidad', 'En sistemas pequeños puede ser menos formal, pero sigue siendo necesario un documento.'],
          ['Evolución', 'La planificación es <strong>incremental</strong>: los planes no son documentos estáticos, evolucionan durante el desarrollo y cambian por retrasos.'],
        ])}
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿V&V o depuración?',
        buckets: ['V&V (establece que hay defectos)', 'Depuración (localiza y corrige)'],
        items: [
          { t: 'Correr la batería de pruebas y ver que 3 fallan.', b: 0 },
          { t: 'Ejecutar paso a paso con el depurador y mirar el valor de las variables.', b: 1 },
          { t: 'Una inspección que encuentra un algoritmo incorrecto.', b: 0 },
          { t: 'Hacer una traza manual línea por línea para encontrar dónde se rompe el cálculo.', b: 1 },
          { t: 'Una prueba de aceptación que el sistema no pasa.', b: 0 },
          { t: 'Cambiar el código para corregir el contador que no se incrementaba.', b: 1 },
        ],
      }],
      quiz: [
        { q: '¿Qué diferencia hay entre V&V y depuración?', o: ['V&V establece la existencia de defectos; la depuración los localiza y corrige', 'Son lo mismo', 'La depuración encuentra defectos y V&V los corrige', 'V&V solo se hace al final'], a: 0, e: 'Se intercalan, pero con objetivos distintos.' },
        { q: '¿Qué permiten las herramientas de depuración interactivas?', o: ['Ejecutar paso a paso y ver variables', 'Generar automáticamente casos de prueba', 'Escribir el código que falta', 'Medir el rendimiento bajo carga'], a: 0, e: 'Están integradas al compilador.' },
        { q: '¿Por qué hay que hacer regresión después de corregir un defecto?', o: ['Muchas reparaciones introducen nuevos defectos', 'Porque el cliente lo exige en cada corrección', 'Porque la depuración no corrige nada por sí sola', 'Para documentar el cambio en el plan de pruebas'], a: 0, e: 'Hay que volver a validar el sistema.' },
        { q: '¿Cuánto del presupuesto de desarrollo insume la V&V?', o: ['Más de la mitad', 'Alrededor del 10%', 'Alrededor del 25%', 'Casi nada'], a: 0, e: 'Por eso hay que planificarla con cuidado.' },
        { q: 'En un sistema muy crítico, ¿en qué conviene poner más esfuerzo?', o: ['En técnicas de verificación estáticas', 'Solo en pruebas beta', 'En pruebas manuales', 'En documentación de usuario'], a: 0, e: 'Cuanto más crítico, más verificación estática.' },
        { q: '¿Cómo es la planificación de las pruebas?', o: ['Incremental: el plan evoluciona', 'Se hace una vez y no cambia', 'Se hace al final del desarrollo', 'No hace falta en sistemas chicos'], a: 0, e: 'Incluso en sistemas chicos se necesita un documento.' },
        { q: '¿Por qué localizar un defecto puede ser difícil?', o: ['Puede estar lejos de donde falló el programa', 'Porque no existen herramientas de depuración', 'Porque los defectos nunca siguen patrones', 'Porque las pruebas no muestran los defectos'], a: 0, e: 'A veces hace falta una traza manual línea por línea.' },
      ],
      sources: [{ title: 'Ingeniería de Software', ref: 'Sommerville y apuntes de clase', points: ['Depuración y su relación con V&V; planificación de las pruebas.'] }],
    },

    {
      id: 'seguridad-en-el-diseno',
      module: 'm19',
      title: 'Seguridad en el diseño de sistemas de información',
      keywords: 'seguridad diseño riesgos propósito carácter crítico entorno confiabilidad redundancia rendimiento usabilidad contraseñas protección distribución activos capas plataforma aplicación registro cifrado sumas de verificación credenciales distintas cliente servidor negación de servicio objetos distribuidos',
      tldr: 'Es difícil agregar seguridad después: <mark>hay que considerarla durante el diseño</mark>. Hay que equilibrar <strong>seguridad, rendimiento y usabilidad</strong>, y la arquitectura resuelve dos temas: <strong>protección</strong> (capas alrededor de los activos críticos) y <strong>distribución</strong> (repartir los activos para limitar el daño de un ataque).',
      goals: ['Explicar por qué la seguridad se diseña desde el principio.', 'Describir las tensiones con rendimiento y usabilidad.', 'Comparar centralizar y distribuir activos.', 'Describir las 3 capas de protección del sistema de pacientes.', 'Elegir arquitectura según el riesgo (cliente-servidor vs. objetos distribuidos).'],
      body: `
        <h2>Diseñar con seguridad</h2>
        <ul>
          <li>Es difícil agregar seguridad a un sistema ya implementado: los riesgos se consideran <strong>durante el diseño</strong>.</li>
          <li>Cada aplicación es distinta: el diseño de seguridad considera el <strong>propósito</strong>, el <strong>carácter crítico</strong> y el <strong>entorno operacional</strong>.</li>
          <li>Hay una estrecha relación entre <strong>confiabilidad y seguridad</strong>: la <strong>redundancia</strong>, fundamental para la confiabilidad, ayuda a resistir y recuperarse de ataques. Con múltiples medidas, es menos probable que un ataque tenga éxito.</li>
        </ul>
        <h3>Tensiones</h3>
        ${table(['Seguridad vs. rendimiento', 'Seguridad vs. usabilidad'], [['Las medidas de seguridad requieren gran cómputo adicional y afectan el rendimiento global (por ejemplo, esperar a que se desencripte la información).', 'Pedir contraseñas múltiples: si el usuario olvida alguna, la seguridad adicional hace que no pueda usar el sistema.']])}
        <p>Hay que encontrar un <strong>equilibrio entre seguridad, rendimiento y usabilidad</strong>, según el tipo de sistema y dónde se usa: en un sistema <strong>militar</strong> los usuarios aceptan procesos con comprobaciones periódicas; en uno de <strong>comercio</strong>, interrumpir la operación para comprobaciones es inaceptable.</p>

        <h2>Protección y distribución</h2>
        <p>Al diseñar una arquitectura que conserve la seguridad se consideran 2 temas:</p>
        <ol><li><strong>Protección</strong>: ¿cómo organizar el sistema para proteger los activos críticos contra ataques externos?</li><li><strong>Distribución</strong>: ¿cómo distribuir los activos para minimizar los efectos de un ataque?</li></ol>
        ${table(['Activos centralizados', 'Activos distribuidos'], [
          ['Se construyen capas de protección a su alrededor; como es un solo sistema, se puede costear uno <strong>fuerte, con muchas capas</strong>.', 'Es más caro protegerlos (hay que proteger cada copia), no se pueden costear tantas capas y hay más posibilidades de que la protección se rompa.'],
          ['Si la protección falla, <strong>todos los activos</strong> quedan comprometidos. Más capas afectan usabilidad y rendimiento.', 'Si se rompe, <strong>no hay pérdida total</strong>. Duplicar datos permite usar otra copia si una se corrompe; pero si la información es confidencial, más copias aumentan el riesgo de acceso de un intruso.'],
        ])}

        <h2>Ejemplo: sistema de registros de pacientes</h2>
        <p>Se usa una base de datos <strong>centralizada</strong> y, para protegerla, una <strong>arquitectura en capas</strong> con los activos críticos en el nivel más bajo y varias capas a su alrededor (como se vio en la Unidad II: “si la seguridad es crítica, capas”).</p>
        ${capasSeg}
        <ul>
          <li>El registro se puede <strong>encriptar</strong> para que sea imposible consultarlo sin la clave.</li>
          <li>La <strong>comprobación de integridad con sumas de verificación criptográficas</strong> detecta cambios hechos fuera de los mecanismos normales de actualización.</li>
          <li>El número de capas depende del carácter crítico de los datos: no todas las aplicaciones necesitan protección a nivel de registro.</li>
        </ul>
        ${note('No debe usarse <strong>la misma credencial en cada nivel</strong>: la contraseña de la aplicación debe ser distinta de la del sistema y de la clave de nivel de registro. El costo: a los usuarios les cuesta recordar tantas y les molestan tantas autenticaciones.', 'exam')}
        <h3>Elegir la arquitectura según el riesgo</h3>
        ${table(['Si el requisito o riesgo principal es...', 'Arquitectura'], [['La <strong>protección de los datos</strong>', '<strong>Cliente-servidor</strong>, con los mecanismos de protección construidos en el servidor.'], ['Los <strong>ataques de negación de servicio</strong> (sobrecargan el servidor y hacen imposible acceder a la base)', '<strong>Objetos distribuidos</strong>: los activos se reparten en plataformas con protecciones separadas; si se ataca un nodo, otros servicios siguen disponibles, y duplicar datos entre nodos facilita la recuperación.']])}
        <p>A veces el estilo más adecuado para la seguridad no es el mejor para el <strong>rendimiento</strong>: muchas capas que se comunican entre sí hacen más lento el acceso a los datos. Ante eso, hay que <strong>discutir el conflicto con el cliente</strong> y acordar cómo resolverlo.</p>
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿Centralizar con capas o distribuir?',
        buckets: ['Centralizar con capas (cliente-servidor)', 'Distribuir (objetos distribuidos)'],
        items: [
          { t: 'El riesgo principal es que alguien lea historias clínicas confidenciales.', b: 0 },
          { t: 'El riesgo principal es un ataque de negación de servicio que deje sin servicio a todos.', b: 1 },
          { t: 'Se puede costear un único sistema de protección muy fuerte.', b: 0 },
          { t: 'Se prefiere que un ataque exitoso no provoque una pérdida total.', b: 1 },
          { t: 'Se quiere minimizar la cantidad de copias de datos confidenciales.', b: 0 },
        ],
      }],
      quiz: [
        { q: '¿Cuándo debe considerarse la seguridad?', o: ['Durante el diseño', 'Después de implementar', 'Solo en las pruebas', 'Solo si el cliente la pide'], a: 0, e: 'Cada aplicación requiere considerar propósito, criticidad y entorno.' },
        { q: '¿Qué relación tienen confiabilidad y seguridad?', o: ['Estrecha: la redundancia ayuda a resistir y recuperarse de ataques', 'Ninguna', 'Son opuestas', 'La seguridad elimina la necesidad de confiabilidad'], a: 0, e: 'Múltiples medidas reducen la probabilidad de éxito de un ataque.' },
        { q: '¿Qué tres aspectos hay que equilibrar?', o: ['Seguridad, rendimiento y usabilidad', 'Seguridad, costo y plazo', 'Protección, distribución y redundancia', 'Capas, servidores y clientes'], a: 0, e: 'Depende del tipo de sistema y de dónde se usa.' },
        { q: '¿Cuáles son los 2 temas al diseñar una arquitectura segura?', o: ['Protección y distribución', 'Cifrado y contraseñas', 'Cliente y servidor', 'Rendimiento y costo'], a: 0, e: 'Cómo proteger los activos y cómo repartirlos.' },
        { q: '¿Qué desventaja tiene centralizar todos los activos?', o: ['Si la protección falla, cae todo', 'Es más caro de proteger que distribuir', 'Hay más copias de los datos confidenciales', 'No permite usar capas de protección'], a: 0, e: 'A cambio, se puede costear una protección muy fuerte.' },
        { q: '¿Cuáles son las 3 capas de protección del sistema de pacientes?', o: ['Plataforma, aplicación y registro', 'Red, servidor y cliente', 'Usuario, rol y permiso', 'Física, lógica y de datos'], a: 0, e: 'Cada una con credenciales distintas.' },
        { q: '¿Qué arquitectura conviene si el riesgo mayor son los ataques de negación de servicio?', o: ['Objetos distribuidos', 'Cliente-servidor centralizado', 'Repositorio', 'Tubería y filtro'], a: 0, e: 'Si se ataca un nodo, otros servicios siguen disponibles.' },
        { q: '¿Qué detecta una suma de verificación criptográfica?', o: ['Cambios fuera de las actualizaciones normales', 'Contraseñas débiles de los usuarios', 'Ataques de negación de servicio en curso', 'Usuarios no autorizados en la plataforma'], a: 0, e: 'Es una comprobación de integridad.' },
        { q: '¿Qué hacer si la arquitectura más segura no es la de mejor rendimiento?', o: ['Discutirlo con el cliente y acordar', 'Elegir siempre la más segura', 'Elegir siempre la más rápida', 'Eliminar las capas de protección'], a: 0, e: 'Es una decisión de compromiso.' },
      ],
      sources: [{ title: 'Ingeniería de Software, 9ª ed.', ref: 'Sommerville, cap. 14, págs. 375-386', points: ['Diseño para la seguridad: arquitectura, protección y distribución (figura 14.4).'] }],
    },
  );
})();
