/* Unidad II, clases 6 y 7: patrones arquitectónicos (capas, repositorio, cliente-servidor, tubería y filtro) y arquitecturas de aplicación.
   Diapositivas Clase6 y Clase7, Sommerville 9ª ed. cap. 6, págs. 155-172. */
(() => {
  const { LESSONS, h } = window.GUIDE;
  const { note, def, table, fig, lab, uml: U } = h;

  const capas = fig(U.svg(520, 230, `
    ${['Interfaz de usuario (presentación)', 'Gestión de la interfaz de usuario · autenticación y autorización', 'Lógica de negocio · funcionalidad de la aplicación · utilidades del sistema', 'Soporte del sistema (SO, base de datos, etc.)'].map((t, i) => U.blk(20, 10 + i * 54, 480, 44, t, { cls: i === 3 ? 'k-a' : '', bold: i === 0 })).join('')}
    ${[0, 1, 2].map((i) => U.ln([[470, 54 + i * 54], [470, 64 + i * 54]], { end: 'ar' })).join('')}
    <text x="10" y="226" class="u-sm">cada capa usa solo los servicios de la capa inferior</text>`,
    'Arquitectura genérica en cuatro capas: presentación, gestión de la interfaz, lógica de negocio y soporte'),
    'Arquitectura genérica en 4 capas (Sommerville, figura 6.6). El número de capas es arbitrario: cualquiera se puede subdividir.');

  const repo = fig(U.svg(560, 230, `
    ${U.blk(190, 80, 180, 70, 'Repositorio\ndel proyecto', { cls: 'k-a' })}
    ${[['Editor UML', 20, 10], ['Generador\nde código', 380, 10], ['Editor de\ndiseño', 20, 160], ['Traductor\nde diseño', 380, 160], ['Analizador\nde diseño', 200, 175]].map(([t, x, y]) => U.blk(x, y, 160, 50, t, { bold: false })).join('')}
    ${U.ln([[180, 35], [230, 80]], { start: 'ar', end: 'ar' })}${U.ln([[380, 35], [330, 80]], { start: 'ar', end: 'ar' })}${U.ln([[180, 185], [210, 150]], { start: 'ar', end: 'ar' })}${U.ln([[380, 185], [350, 150]], { start: 'ar', end: 'ar' })}${U.ln([[280, 175], [280, 150]], { start: 'ar', end: 'ar' })}`,
    'Arquitectura de repositorio: herramientas de un entorno de desarrollo alrededor de un repositorio central'),
    'Repositorio de un entorno de desarrollo (IDE). Las herramientas no se pasan datos entre sí: todas leen y escriben el repositorio compartido.');

  const cs = fig(U.svg(580, 230, `
    ${[1, 2, 3, 4].map((i) => U.blk(10 + (i - 1) * 145, 10, 120, 40, `Cliente ${i}`, { bold: false })).join('')}
    ${U.blk(10, 92, 560, 36, 'Internet', { cls: 'k-ghost' })}
    ${[0, 1, 2, 3].map((i) => U.ln([[70 + i * 145, 50], [70 + i * 145, 92]], { start: 'ar', end: 'ar' })).join('')}
    ${[['Servidor de\ncatálogo', 'Catálogo de\nla biblioteca'], ['Servidor\nde video', 'Archivos\nde película'], ['Servidor\nde imágenes', 'Fotografías\ndigitalizadas'], ['Servidor\nweb', 'Info. películas\ny fotos']].map(([s, d], i) => U.blk(10 + i * 145, 148, 120, 40, s, { cls: 'k-a' }) + `<text x="${70 + i * 145}" y="206" class="u-c u-sm">${d.replace('\n', ' ')}</text>`).join('')}
    ${[0, 1, 2, 3].map((i) => U.ln([[70 + i * 145, 128], [70 + i * 145, 148]], { start: 'ar', end: 'ar' })).join('')}`,
    'Arquitectura cliente-servidor de una biblioteca de películas y fotografías: cuatro clientes, internet y cuatro servidores'),
    'Cliente-servidor: sistema multiusuario web para un repertorio de películas y fotografías (Sommerville, figura 6.13). Video e imágenes van en servidores separados porque tienen necesidades distintas.');

  const tuberia = fig(U.svg(640, 200, `
    ${U.blk(4, 20, 90, 40, 'Facturas', { cls: 'k-ghost' })}${U.blk(4, 100, 90, 40, 'Pagos', { cls: 'k-ghost' })}
    ${U.blk(120, 60, 110, 44, 'Leer facturas\nemitidas', { cls: 'k-a' })}${U.blk(260, 60, 110, 44, 'Identificar\npagos', { cls: 'k-a' })}
    ${U.blk(400, 10, 110, 44, 'Emitir\nrecibos', { cls: 'k-a' })}${U.blk(400, 112, 110, 44, 'Encontrar\npagos vencidos', { cls: 'k-a' })}${U.blk(530, 112, 106, 44, 'Emitir\nrecordatorio', { cls: 'k-a' })}
    ${U.blk(530, 10, 106, 44, 'Recibos', { cls: 'k-ghost' })}${U.blk(530, 168, 106, 28, 'Recordatorios', { cls: 'k-ghost' })}
    ${U.ln([[94, 40], [120, 75]], { end: 'ar' })}${U.ln([[94, 120], [260, 95]], { end: 'ar' })}${U.ln([[230, 82], [260, 82]], { end: 'ar' })}
    ${U.ln([[370, 72], [400, 40]], { end: 'ar' })}${U.ln([[370, 92], [400, 130]], { end: 'ar' })}${U.ln([[510, 32], [530, 32]], { end: 'ar' })}${U.ln([[510, 134], [530, 134]], { end: 'ar' })}${U.ln([[583, 156], [583, 168]], { end: 'ar' })}`,
    'Arquitectura de tubería y filtro de un sistema de facturación por lotes'),
    'Tubería y filtro en lote (Sommerville, figura 6.15): una vez por semana se incorporan los pagos; a las facturas pagadas se les emite recibo y a las vencidas, un recordatorio. Cada recuadro sólido es un filtro (transformador).');

  const tp = fig(U.svg(600, 150, `
    ${U.blk(10, 40, 120, 56, 'Procesamiento\nde E/S')}${U.blk(170, 40, 120, 56, 'Lógica de la\naplicación', { cls: 'k-a' })}${U.blk(330, 40, 120, 56, 'Gestor de\ntransacciones', { cls: 'k-a' })}${U.blk(490, 40, 100, 56, 'Base de\ndatos', { cls: 'k-if' })}
    ${U.ln([[130, 68], [170, 68]], { start: 'ar', end: 'ar' })}${U.ln([[290, 68], [330, 68]], { start: 'ar', end: 'ar' })}${U.ln([[450, 68], [490, 68]], { start: 'ar', end: 'ar' })}
    <text x="70" y="120" class="u-c u-sm">petición del usuario</text><text x="390" y="120" class="u-c u-sm">embebido en el SGBD</text>`,
    'Estructura de una aplicación de procesamiento de transacciones'),
    'Aplicación de procesamiento de transacciones (Sommerville, figura 6.16). El gestor de transacciones avisa a la aplicación cuando la transacción se completó.');

  const atm = fig(U.svg(600, 180, `
    ${U.blk(10, 20, 170, 140, '', { lyr: true })}<text x="95" y="38" class="u-c u-sans u-b">Entrada (cajero)</text>${U.blk(25, 50, 140, 40, 'Obtener ID de\nla cuenta', { bold: false })}${U.blk(25, 104, 140, 40, 'Validar tarjeta', { bold: false })}
    ${U.blk(215, 20, 170, 140, '', { lyr: true })}<text x="300" y="38" class="u-c u-sans u-b">Proceso (servidor)</text>${U.blk(230, 50, 140, 40, 'Consultar cuenta', { cls: 'k-a', bold: false })}${U.blk(230, 104, 140, 40, 'Actualizar cuenta', { cls: 'k-a', bold: false })}
    ${U.blk(420, 20, 170, 140, '', { lyr: true })}<text x="505" y="38" class="u-c u-sans u-b">Salida (cajero)</text>${U.blk(435, 50, 140, 40, 'Imprimir detalles', { bold: false })}${U.blk(435, 104, 140, 40, 'Entregar efectivo', { bold: false })}
    ${U.ln([[180, 90], [215, 90]], { end: 'ar' })}${U.ln([[385, 90], [420, 90]], { end: 'ar' })}`,
    'Sistema bancario de cajero automático en entrada, proceso y salida'),
    'Cajero automático: la entrada y la salida son software del cajero; el procesamiento de cuentas está en el servidor de la base de datos del banco.');

  LESSONS.push(
    {
      id: 'capas-y-repositorio',
      module: 'm5',
      title: 'Patrones arquitectónicos: capas y repositorio',
      keywords: 'patrón arquitectónico estilo arquitectónico capas separación independencia interfaz sustituir repositorio datos compartidos CAD IDE modelo de datos',
      tldr: 'Un <mark>patrón arquitectónico</mark> (en los 90, “estilo”) describe una organización que funcionó antes, con cuándo usarla y sus fortalezas y debilidades. La <strong>arquitectura en capas</strong> logra separación e independencia; el <strong>repositorio</strong> hace que los componentes compartan datos sin transmitírselos.',
      goals: ['Definir patrón arquitectónico.', 'Explicar el patrón en capas, sus 4 capas genéricas y su ventaja.', 'Explicar el repositorio, cuándo usarlo y sus problemas.'],
      body: `
        <h2>Patrones arquitectónicos</h2>
        ${def('Patrón arquitectónico', 'Descripción de una organización de sistema que ha tenido éxito en sistemas previos. Indica cuándo es o no adecuado usar el patrón e informa sus fortalezas y debilidades.', 'Sommerville, cap. 6, págs. 155-157. En los años 90 se llamaban “estilos arquitectónicos”.')}
        <p>Las nociones de <strong>separación e independencia</strong> son fundamentales en el diseño arquitectónico, porque permiten <strong>localizar los cambios</strong>.</p>

        <h2>Arquitectura en capas</h2>
        <p>La funcionalidad se organiza en capas separadas; cada una se apoya en los servicios de la capa inferior.</p>
        ${capas}
        <ul>
          <li>Mientras su <strong>interfaz no varíe</strong>, una capa puede sustituirse por otra equivalente.</li>
          <li>Si cambian las interfaces de una capa o se le agregan facilidades, <strong>solo se afecta la capa adyacente</strong>.</li>
          <li>Capa inferior: software de soporte (base de datos, sistema operativo). Capa de aplicación: funcionalidad y utilidades. Capa de gestión de la interfaz: <strong>autentica y autoriza</strong>. Capa superior: presentación.</li>
        </ul>
        ${table(['Cuándo usarlo', 'Ventajas', 'Desventajas'], [['Al construir sobre sistemas existentes; con varios equipos, cada uno a cargo de una capa; cuando hay requerimientos de seguridad multinivel.', 'Permite sustituir capas completas mientras se conserve la interfaz; facilidades redundantes (como la autenticación) en cada capa aumentan la confiabilidad.', 'Es difícil una separación limpia: una capa superior a veces necesita interactuar con capas mucho más bajas. El rendimiento puede sufrir por los niveles de interpretación de cada capa.']])}

        <h2>Arquitectura de repositorio</h2>
        <p>Los componentes <strong>comparten datos</strong> en un repositorio central. Es adecuada para sistemas que usan <strong>grandes cantidades de datos</strong>, cuando un componente genera datos y otro los usa: CAD, entornos de desarrollo interactivo (IDE).</p>
        ${repo}
        ${table(['Ventajas', 'Problemas'], [['Forma eficiente de compartir grandes cantidades de datos: <strong>no hay que transmitirlos</strong> de un componente a otro. Los componentes pueden ser independientes: no necesitan conocerse.', 'Los componentes deben operar sobre un <strong>modelo de datos acordado</strong>: es difícil integrar uno nuevo si su modelo no se ajusta al esquema. Es complicado distribuirlo en varias máquinas; un repositorio lógicamente centralizado pero distribuido trae <strong>redundancia e inconsistencia</strong>. El repositorio es un único punto de falla.']])}
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿Capas o repositorio?',
        buckets: ['Arquitectura en capas', 'Arquitectura de repositorio'],
        items: [
          { t: 'Una capa puede reemplazarse por otra equivalente si se conserva la interfaz.', b: 0 },
          { t: 'Los componentes no se transmiten datos entre sí.', b: 1 },
          { t: 'Es difícil integrar un componente cuyo modelo de datos no coincide con el acordado.', b: 1 },
          { t: 'Un cambio de interfaz afecta solo a la capa adyacente.', b: 0 },
          { t: 'Se usa en sistemas CAD y entornos de desarrollo.', b: 1 },
          { t: 'Útil para seguridad: los activos críticos en las capas internas.', b: 0 },
        ],
      }],
      quiz: [
        { q: '¿Qué nociones logra la arquitectura en capas?', o: ['Separación e independencia', 'Redundancia y disponibilidad', 'Distribución y paralelismo', 'Rendimiento y bajo consumo'], a: 0, e: 'Permiten localizar los cambios.' },
        { q: 'En la arquitectura en capas, si cambia la interfaz de una capa, ¿qué se afecta?', o: ['Solo la capa adyacente', 'Todas las capas', 'Solo la capa de presentación', 'La base de datos'], a: 0, e: 'Y mientras la interfaz no cambie, la capa se puede sustituir por otra equivalente.' },
        { q: 'En la arquitectura genérica de 4 capas, ¿qué capa autentica y autoriza al usuario?', o: ['Gestión de la interfaz de usuario', 'Presentación, porque es la que ve el usuario', 'Soporte, porque contiene el sistema operativo', 'Aplicación, porque contiene la lógica de negocio'], a: 0, e: 'Está entre la presentación y la lógica de negocio.' },
        { q: '¿Cuándo conviene la arquitectura de repositorio?', o: ['Cuando se manejan grandes cantidades de datos que un componente genera y otro usa', 'Cuando el sistema es interactivo y orientado a eventos', 'Cuando hay que distribuir los datos en muchas máquinas', 'Cuando cada componente tiene su propio modelo de datos'], a: 0, e: 'Ejemplos: CAD e IDE.' },
        { q: '¿Qué problema aparece al distribuir un repositorio lógicamente centralizado?', o: ['Redundancia e inconsistencia de datos', 'Pérdida de la interfaz entre las capas', 'Acoplamiento entre las capas del sistema', 'Bloqueo de los filtros en la tubería'], a: 0, e: 'Por eso en la práctica es complicado distribuir el repositorio.' },
        { q: '¿Qué indica la descripción de un patrón arquitectónico, además de la organización?', o: ['Cuándo usarlo y sus fortalezas y debilidades', 'El código fuente de referencia para implementarlo', 'El costo de implementación y el plazo estimado', 'El lenguaje de programación más adecuado para él'], a: 0, e: 'Es la definición de Sommerville.' },
      ],
      sources: [{ title: 'Ingeniería de Software, 9ª ed.', ref: 'Sommerville, cap. 6, págs. 155-160', points: ['Patrones arquitectónicos, arquitectura en capas y de repositorio.'] }],
    },

    {
      id: 'cliente-servidor-y-tuberia',
      module: 'm5',
      title: 'Cliente-servidor y tubería y filtro',
      keywords: 'cliente servidor servicios red protocolo solicitud respuesta http distribuida tubería filtro transformación lote batch facturación sistemas interactivos',
      tldr: '<mark>Cliente-servidor</mark>: servidores que ofrecen servicios, clientes que los usan y una red; su gran ventaja es ser <strong>distribuida</strong>. <mark>Tubería y filtro</mark>: los datos fluyen por transformaciones sucesivas; sirve para procesamiento automático de datos (en lote), <strong>no para sistemas interactivos</strong>.',
      goals: ['Describir los 3 componentes del patrón cliente-servidor.', 'Explicar quién conoce a quién en cliente-servidor.', 'Describir tubería y filtro y el modelo secuencial en lote.', 'Explicar por qué no sirve para sistemas interactivos.'],
      body: `
        <h2>Arquitectura cliente-servidor</h2>
        <p>El sistema se organiza como un conjunto de <strong>servicios y servidores</strong> asociados, y de <strong>clientes</strong> que acceden a ellos. Sus componentes son:</p>
        <ol>
          <li>Un conjunto de <strong>servidores</strong> que ofrecen servicios (de impresión, de archivos, de compilación...).</li>
          <li>Un conjunto de <strong>clientes</strong> que solicitan esos servicios.</li>
          <li>Una <strong>red</strong> que permite a los clientes acceder: se implementan como sistemas distribuidos conectados con protocolos de Internet.</li>
        </ol>
        ${cs}
        <ul>
          <li>Los <strong>clientes deben conocer</strong> los nombres de los servidores y los servicios que ofrecen.</li>
          <li>Los <strong>servidores no necesitan conocer</strong> la identidad de los clientes ni cuántos acceden.</li>
          <li>Usan un protocolo <strong>solicitud-respuesta</strong> (como HTTP): el cliente pide y espera la respuesta.</li>
        </ul>
        <p>En el ejemplo de la biblioteca, los cuadros de video se transmiten rápido y sincronizados a resolución baja, comprimidos, y el servidor de video maneja los formatos; las imágenes fijas se conservan en alta resolución, mejor en un servidor aparte; el catálogo resuelve consultas e incluye el comercio electrónico; el cliente es un navegador.</p>
        ${table(['Beneficio', 'Ventaja más importante', 'Desventajas (Sommerville)'], [['<strong>Separación e independencia</strong>: servicios y servidores cambian sin afectar otras partes.', 'Es una <strong>arquitectura distribuida</strong>: es fácil agregar un servidor nuevo o actualizar uno sin afectar al resto.', 'Cada servicio es un punto de falla; el rendimiento depende de la red y es impredecible; si los servidores pertenecen a distintas organizaciones, hay problemas de administración.']])}

        <h2>Arquitectura de tubería y filtro</h2>
        <p>Las <strong>transformaciones funcionales</strong> procesan sus entradas y producen salidas. Los datos fluyen de una a otra y se transforman al desplazarse por la secuencia. Cada paso es un <strong>transformador</strong> (filtro, porque “filtra” los datos que procesa), y las transformaciones se ejecutan en secuencia o en paralelo, ítem por ítem.</p>
        ${tuberia}
        <p>Se usa para el <strong>procesamiento automático de datos</strong>. Si las transformaciones son secuenciales con datos en lotes, se llama <strong>modelo secuencial en lote</strong>: es la arquitectura común de sistemas de procesamiento de datos como la facturación.</p>
        ${note('Los <strong>sistemas interactivos no son de tubería y filtro</strong>: necesitan procesar una secuencia de eventos (clics, selecciones de menú) que es difícil traducir al modelo de entubamiento (pipelining).', 'exam')}
        ${table(['Ventajas', 'Desventajas'], [['Fácil de entender; permite reutilizar transformaciones; refleja la estructura de muchos procesos de negocio; agregar transformaciones es directo; se puede implementar en secuencia o en paralelo.', 'El formato de transferencia de datos debe acordarse entre transformaciones; cada una debe analizar su entrada y generar su salida en ese formato, lo que agrega sobrecarga; no sirve para sistemas interactivos.']])}
      `,
      quiz: [
        { q: 'En cliente-servidor, ¿quién necesita conocer a quién?', o: ['Los clientes a los servidores, no al revés', 'Los servidores deben conocer a todos sus clientes', 'Ambos deben conocerse para poder comunicarse', 'Ninguno: la red resuelve quién es quién'], a: 0, e: 'El cliente debe saber el nombre del servidor y sus servicios.' },
        { q: '¿Cuál es la ventaja más importante del modelo cliente-servidor?', o: ['Ser distribuida: se agregan servidores sin afectar al resto', 'Ser la más rápida, porque cada servidor atiende un solo cliente', 'Evitar el uso de redes, porque todo corre en la misma máquina', 'Eliminar los puntos de falla, porque los servicios están repartidos'], a: 0, e: 'Su beneficio general es la separación e independencia.' },
        { q: '¿Qué protocolo usan los clientes para acceder a los servicios?', o: ['Solicitud-respuesta, como HTTP', 'Memoria compartida', 'Tuberías del sistema operativo', 'Difusión (broadcast)'], a: 0, e: 'El cliente realiza una petición y espera la respuesta.' },
        { q: '¿Por qué los sistemas interactivos no usan tubería y filtro?', o: ['Los eventos del usuario no encajan en un flujo de transformaciones', 'Porque las transformaciones en serie son demasiado lentas para el usuario', 'Porque los sistemas interactivos no manejan datos que se puedan transformar', 'Porque necesitan un repositorio central que la tubería no puede ofrecer'], a: 0, e: 'Clics y selecciones de menú no encajan en un flujo de transformaciones.' },
        { q: 'Un sistema de facturación que una vez por semana procesa pagos y emite recibos y recordatorios es un ejemplo de...', o: ['Tubería y filtro en lote', 'Cliente-servidor con un servidor de pagos', 'Repositorio con datos de facturación compartidos', 'Arquitectura en capas con lógica de negocio'], a: 0, e: 'Es el ejemplo de Sommerville.' },
        { q: '¿Por qué se usa el término “filtro”?', o: ['Cada transformación “filtra” los datos que procesa', 'Porque elimina los datos inválidos de la entrada', 'Porque bloquea los accesos no autorizados a los datos', 'Porque ordena los datos antes de pasarlos al siguiente'], a: 0, e: 'Cada paso de procesamiento es un transformador.' },
        { q: 'En la biblioteca de películas y fotos, ¿por qué las imágenes fijas van en un servidor aparte?', o: ['Las fotos necesitan alta resolución y el video, velocidad', 'Porque las fotos son más importantes para el negocio', 'Porque el servidor de catálogo no soporta imágenes', 'Por seguridad, porque las fotos son confidenciales'], a: 0, e: 'Distintos tipos de servicio tienen necesidades distintas.' },
      ],
      sources: [{ title: 'Ingeniería de Software, 9ª ed.', ref: 'Sommerville, cap. 6, págs. 160-164', points: ['Arquitectura cliente-servidor y de tubería y filtro, con sus ejemplos.'] }],
    },

    {
      id: 'arquitecturas-de-aplicacion',
      module: 'm5',
      title: 'Arquitecturas de aplicación: transacciones y lenguaje',
      keywords: 'arquitecturas de aplicación sistema genérico 5 usos procesamiento de transacciones transacción atómica cajero automático gestor de transacciones procesamiento de lenguaje compilador traductor',
      tldr: 'Las <mark>arquitecturas de aplicación</mark> encapsulan lo común de una clase de sistemas y se usan de 5 maneras. Se estudian dos: <strong>procesamiento de transacciones</strong> (centradas en bases de datos; las acciones de un usuario no pueden interferir con las de otro) y <strong>procesamiento de lenguaje</strong> (traducen un lenguaje a otra representación, como un compilador).',
      goals: ['Explicar qué es una arquitectura de aplicación.', 'Enumerar sus 5 usos.', 'Definir transacción y describir la arquitectura de procesamiento de transacciones.', 'Describir los sistemas de procesamiento de lenguaje.'],
      body: `
        <h2>Arquitecturas de aplicación</h2>
        <p>Los sistemas de aplicación cubren necesidades de una empresa. Todas las empresas tienen mucho en común (contratar personal, facturar, llevar contabilidad) y las de un mismo sector usan aplicaciones comunes: todas las telefónicas necesitan conectar llamadas, administrar redes y facturar. Eso llevó a arquitecturas que describen la estructura de <strong>tipos particulares de sistemas</strong>: encapsulan las características principales de una clase de sistemas, y un <strong>sistema genérico se configura y adapta</strong> para crear una aplicación específica.</p>
        <h3>5 usos de una arquitectura de aplicación</h3>
        <ol>
          <li><strong>Punto de partida</strong> del diseño arquitectónico, si no conocés el tipo de aplicación.</li>
          <li><strong>Lista de verificación</strong> del diseño: comparar el tuyo con la arquitectura genérica para ver si es consistente.</li>
          <li>Para <strong>organizar el trabajo del equipo</strong>: identifica características estructurales estables que se desarrollan en paralelo.</li>
          <li>Para <strong>valorar componentes a reutilizar</strong>, comparándolos con las estructuras genéricas.</li>
          <li>Como <strong>vocabulario</strong> para hablar de tipos de aplicaciones y compararlas.</li>
        </ol>
        ${lab(0)}

        <h2>Sistemas de procesamiento de transacciones (TP)</h2>
        <p>Procesan peticiones para obtener información de una base de datos o para actualizarla. Son el tipo más común de sistema empresarial interactivo: bancos, comercio electrónico, reservas, inscripciones. Gran parte de los sistemas web empresariales son de este tipo. Las acciones de un usuario <strong>no pueden interferir</strong> con las de otro, para mantener la integridad de la base.</p>
        ${def('Transacción de base de datos', 'Secuencia de operaciones que se trata como una sola unidad (unidad atómica). Todas las operaciones tienen que completarse antes de que los cambios en la base de datos sean permanentes.', 'Sommerville, cap. 6, págs. 166-167.')}
        <p>Así, una falla dentro de la transacción no deja la base inconsistente. Desde el usuario, una transacción es una secuencia coherente de operaciones que satisface un objetivo, como “hallar los horarios de un vuelo”. Ejemplo: retirar dinero de un cajero implica obtener los datos de la cuenta, verificar y modificar el saldo y ordenar al cajero que entregue el dinero; hasta completar todo, la base no cambia.</p>
        ${tp}
        <p>El usuario hace una petición mediante un componente de E/S; la lógica de la aplicación la procesa; se crea una transacción que pasa al <strong>gestor de transacciones</strong>, embebido en el sistema de gestión de la base de datos, que avisa cuando terminó.</p>
        ${atm}

        <h2>Sistemas de procesamiento de lenguaje</h2>
        <p>Convierten un lenguaje natural o artificial en otra representación. En los lenguajes de programación permiten <strong>ejecutar el código</strong> resultante: los <strong>compiladores</strong> traducen un lenguaje de alto nivel a código de máquina. Los de lenguaje natural traducen, por ejemplo, de español a francés. Las instrucciones del lenguaje fuente definen el programa a ejecutar y un <strong>traductor</strong> las convierte en instrucciones de máquina. Todo el desarrollo de software se apoya en ellos.</p>
        ${fig(U.svg(560, 110, `${U.blk(10, 30, 110, 46, 'Instrucciones\nen lenguaje fuente', { cls: 'k-ghost', bold: false })}${U.blk(160, 30, 110, 46, 'Traductor', { cls: 'k-a' })}${U.blk(310, 30, 110, 46, 'Instrucciones\nabstractas', { cls: 'k-ghost', bold: false })}${U.blk(450, 30, 100, 46, 'Intérprete', { cls: 'k-a' })}${U.ln([[120, 53], [160, 53]], { end: 'ar' })}${U.ln([[270, 53], [310, 53]], { end: 'ar' })}${U.ln([[420, 53], [450, 53]], { end: 'ar' })}<text x="215" y="96" class="u-c u-sm">verifica sintaxis y semántica</text><text x="500" y="96" class="u-c u-sm">obtiene y ejecuta</text>`, 'Arquitectura de un sistema de procesamiento de lenguaje: traductor e intérprete'), 'Arquitectura de un procesador de lenguaje (Sommerville, figura 6.18): el traductor genera instrucciones abstractas que un intérprete ejecuta. Un compilador tiene componentes como analizador léxico, tabla de símbolos, analizador sintáctico, árbol sintáctico, analizador semántico y generador de código.')}
      `,
      labs: [{
        type: 'classify', title: '¿Para cuál de los 5 usos se aplica la arquitectura genérica?',
        buckets: ['Punto de partida', 'Lista de verificación', 'Organizar el equipo', 'Valorar componentes', 'Vocabulario'],
        items: [
          { t: 'Nunca diseñé un sistema bancario y empiezo con la arquitectura TP genérica.', b: 0 },
          { t: 'Comparo mi diseño con la arquitectura genérica para ver que no me falte nada.', b: 1 },
          { t: 'Asigno un equipo a la E/S y otro al gestor de transacciones, en paralelo.', b: 2 },
          { t: 'Evalúo si un gestor de transacciones comercial encaja en la estructura genérica.', b: 3 },
          { t: 'Uso los términos de la arquitectura genérica para comparar dos sistemas de reservas.', b: 4 },
        ],
      }],
      quiz: [
        { q: '¿Qué es una transacción de base de datos?', o: ['Una secuencia de operaciones tratada como unidad atómica', 'Una consulta de solo lectura sobre una o más tablas', 'Un mensaje de solicitud y respuesta entre cliente y servidor', 'Un registro de la base de datos con su clave primaria'], a: 0, e: 'Todas las operaciones deben completarse antes de que los cambios sean permanentes.' },
        { q: '¿Qué garantiza tratar la transacción como unidad atómica?', o: ['Que una falla no deje la base inconsistente', 'Que la transacción se ejecute más rápido', 'Que todos los usuarios vean los cambios parciales', 'Que no haga falta un gestor de transacciones'], a: 0, e: 'O se completa todo o no cambia nada.' },
        { q: '¿Dónde está embebido el gestor de transacciones?', o: ['En el sistema de gestión de la base de datos', 'En el componente de E/S', 'En el cliente', 'En la lógica de la aplicación'], a: 0, e: 'Avisa a la aplicación cuando la transacción se completa.' },
        { q: 'En el sistema del cajero automático, ¿dónde está el componente de procesamiento?', o: ['En el servidor de la base de datos del banco', 'En el software del propio cajero automático', 'En el chip de la tarjeta del cliente', 'En los equipos de la red de comunicaciones'], a: 0, e: 'La entrada y la salida son software del cajero.' },
        { q: '¿Cuál de estos es un sistema de procesamiento de lenguaje?', o: ['Un compilador', 'Un sistema de reservas', 'Un cajero automático', 'Un sistema de facturación por lotes'], a: 0, e: 'Traduce un lenguaje de alto nivel a código de máquina.' },
        { q: '“Comparar mi diseño con la arquitectura genérica para verificar que sea consistente.” ¿Qué uso es?', o: ['Lista de verificación del diseño', 'Punto de partida', 'Vocabulario', 'Organizar el trabajo del equipo'], a: 0, e: 'Es el segundo de los 5 usos.' },
        { q: '¿Por qué las acciones de un usuario no pueden interferir con las de otro en un sistema TP?', o: ['Para mantener la integridad de la base de datos', 'Para que el sistema sea más rápido', 'Porque cada usuario tiene su base', 'Por la arquitectura en capas'], a: 0, e: 'Es la característica de los sistemas de procesamiento de transacciones.' },
      ],
      sources: [{ title: 'Ingeniería de Software, 9ª ed.', ref: 'Sommerville, cap. 6, págs. 164-172', points: ['Arquitecturas de aplicación y sus usos.', 'Sistemas de procesamiento de transacciones y de lenguaje.'] }],
    },
  );
})();
