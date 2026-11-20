/* Unidad III, clase 11: diseño de una salida efectiva, objetivos, tecnologías, factores, salidas impresas y por pantalla. Diapositivas Clase11, Kendall y Kendall 11ª ed., págs. 329-346. */
(() => {
  const { LESSONS, h } = window.GUIDE;
  const { note, def, table, fig, lab, uml: U } = h;

  // Pantalla de estado de envío: encabezado, cuerpo resumido e instrucciones abajo
  const pantalla = fig(U.svg(560, 240, `
    <rect x="10" y="10" width="540" height="220" rx="8" class="u-lyr"/><rect x="10" y="10" width="540" height="34" rx="8" class="u-blk k-a"/>
    <text x="24" y="32" class="u-sans u-b">Estado del pedido Nº 10458</text><text x="536" y="32" class="u-sans u-sm u-e">Cliente: Distribuidora Norte</text>
    ${['Pedido recibido', 'Preparado', 'Despachado', 'En camino', 'Entregado'].map((t, i) => `<circle cx="${60 + i * 110}" cy="90" r="11" class="${i < 3 ? 'f-ok' : 'u-blk'}"/><text x="${60 + i * 110}" y="120" class="u-c u-sm">${t}</text>`).join('')}
    ${U.ln([[71, 90], [159, 90]], { cls: 's-ok' })}${U.ln([[181, 90], [269, 90]], { cls: 's-ok' })}${U.ln([[291, 90], [379, 90]])}${U.ln([[401, 90], [489, 90]])}
    <text x="24" y="156" class="u-sans">Transporte: Andreani · Despachado el 12/06 · Entrega estimada: 15/06</text>
    <rect x="10" y="190" width="540" height="40" rx="0" class="u-blk"/>
    ${['F1 Ayuda', 'Enter Más detalle', 'F5 Continuar', 'Esc Salir'].map((t, i) => `<text x="${40 + i * 135}" y="215" class="u-sm">${t}</text>`).join('')}`,
    'Pantalla de salida con el estado de envío de un pedido: encabezado, resumen gráfico y barra de instrucciones'),
    'Una buena pantalla de salida (inspirada en Kendall y Kendall): no está atestada, resume el estado del envío, orienta con encabezados y ofrece abajo las opciones de continuar, salir, pedir ayuda o ver más detalle.');

  LESSONS.push(
    {
      id: 'objetivos-de-la-salida',
      module: 'm8',
      title: 'Diseño de una salida efectiva: los 6 objetivos',
      keywords: 'salida información al usuario objetivos propósito ajustar al usuario cantidad apropiada donde se necesite oportuna método correcto salidas internas externas documentos retornables',
      tldr: 'La <mark>salida</mark> es la información que el sistema entrega al usuario, y es por ella que <strong>el usuario juzga el mérito del sistema</strong>. Se diseña con <mark>6 objetivos</mark>: propósito, ajustada al usuario, cantidad apropiada, donde se necesite, a tiempo y con el método correcto. Puede ser interna o externa.',
      goals: ['Definir salida y explicar por qué es tan importante.', 'Enumerar y explicar los 6 objetivos del diseño de la salida.', 'Distinguir salidas internas y externas y los documentos retornables.'],
      body: `
        <h2>Qué es la salida</h2>
        ${def('Salida', 'Información que el sistema entrega al usuario: informes impresos, pantallas, video, audio, etcétera.', 'Kendall y Kendall, págs. 329-331.')}
        <p>Algunos datos requieren mucho procesamiento para convertirse en salida; otros, casi ninguno. Los usuarios usan la salida para hacer sus tareas y <strong>juzgan el mérito del sistema en base a sus salidas</strong>. Para crear una salida útil hay que trabajar con el usuario en un proceso <strong>interactivo</strong>, hasta que el resultado sea satisfactorio.</p>

        <h2>Los 6 objetivos</h2>
        ${table(['Objetivo', 'Qué significa'], [
          ['1. Servir al propósito previsto', 'Toda salida debe tener un propósito, averiguado en el análisis. <strong>Si no es funcional, no se crea</strong>: cuesta tiempo y recursos.'],
          ['2. Ajustarla al usuario', 'En sistemas grandes con muchos usuarios es difícil personalizar; con entrevistas, observación y prototipos se diseñan salidas para lo que la mayoría necesita y prefiere.'],
          ['3. Entregar la cantidad apropiada', 'Lo que cada persona necesita para su trabajo. Conviene mostrar un subconjunto y dar acceso fácil a lo adicional. No sirve dar información excesiva para alardear del sistema: la gerencia rara vez necesita grandes cantidades.'],
          ['4. Asegurar que esté donde se necesite', 'La salida se distribuye y debe llegar al <strong>usuario correcto</strong>; si no la ven los indicados, no tiene valor por bien diseñada que esté.'],
          ['5. Proveerla en forma oportuna', 'Una de las quejas más comunes es no recibir la información a tiempo. Hay informes diarios, mensuales, anuales: la sincronización es imprescindible.'],
          ['6. Elegir el método correcto', 'Muchas salidas aparecen en pantalla y se pueden imprimir; los costos varían. Se elige según los factores de la lección siguiente.'],
        ])}
        ${note('Para memorizar: <strong>propósito, usuario, cantidad, lugar, tiempo y método</strong> (¿para qué?, ¿para quién?, ¿cuánto?, ¿dónde?, ¿cuándo?, ¿cómo?).', 'exam')}
        ${lab(0)}

        <h2>Salidas internas y externas</h2>
        ${table(['', 'Salida externa', 'Salida interna'], [
          ['Qué es', 'Sale de la empresa (por ejemplo, un sitio web para el público).', 'Permanece dentro del negocio (por ejemplo, la intranet).'],
          ['Ejemplos', 'Facturas, anuncios, cheques, informes y comunicaciones con clientes, distribuidores, proveedores y competidores.', 'Informes para gerentes, cortos y sintéticos o largos y detallados.'],
          ['Apariencia', 'Formularios impresos o sitios con logo y colores corporativos; deben incluir <strong>instrucciones</strong> para que el receptor las use bien.', 'Pueden no tener la imagen institucional ni tantas formalidades.'],
        ])}
        <p>Difieren en distribución, diseño y apariencia. Algunas salidas externas, como las facturas, se diseñan como <strong>documentos retornables</strong>: el cliente devuelve una parte, se digitaliza y se usa como <strong>entrada</strong> de la siguiente fase (por ejemplo, el talón de pago).</p>
      `,
      labs: [{
        type: 'classify', title: '¿Qué objetivo de la salida falla?',
        buckets: ['Propósito', 'Ajuste al usuario', 'Cantidad', 'Lugar', 'Oportunidad', 'Método'],
        items: [
          { t: 'Se imprime cada día un informe que nadie lee.', b: 0 },
          { t: 'El gerente recibe un listado de 300 páginas cuando solo necesita totales por sucursal.', b: 2 },
          { t: 'El informe de stock crítico llega al gerente de ventas y no al de compras.', b: 3 },
          { t: 'El reporte de cobranzas del mes se entrega 20 días tarde.', b: 4 },
          { t: 'Un chofer recibe en el camión un informe pensado para un analista contable.', b: 1 },
          { t: 'Se imprimen y archivan cotizaciones que cambian cada minuto en lugar de mostrarlas en pantalla.', b: 5 },
        ],
      }],
      quiz: [
        { q: '¿En base a qué juzgan los usuarios el mérito de un sistema, según Kendall y Kendall?', o: ['Sus salidas', 'Su arquitectura', 'Su código', 'Su base de datos'], a: 0, e: 'Por eso la salida debe diseñarse con el usuario.' },
        { q: '¿Qué se hace con una salida que no es funcional?', o: ['No se crea', 'Se archiva por las dudas', 'Se envía solo a la gerencia', 'Se publica en la intranet'], a: 0, e: 'Es el primer objetivo: servir al propósito previsto.' },
        { q: '¿Cuál es una de las quejas más comunes de los usuarios sobre la salida?', o: ['No recibir la información a tiempo', 'Que tiene demasiados colores', 'Que es demasiado breve', 'Que está impresa'], a: 0, e: 'Es el objetivo de proveer la salida en forma oportuna.' },
        { q: '¿Qué recomiendan respecto de la cantidad de salida?', o: ['Un subconjunto, con acceso fácil al resto', 'Mostrar todo para lucir las capacidades del sistema', 'Mostrar lo mínimo y no dar acceso a más detalle', 'Imprimir todo por las dudas para tener respaldo'], a: 0, e: 'No sirve dar información excesiva para alardear.' },
        { q: '¿Qué es un documento retornable?', o: ['Una salida externa cuya parte devuelta se usa como entrada', 'Un informe interno que se reimprime cada vez que cambia', 'Un documento que vuelve al analista para su corrección', 'Un informe por excepción que se devuelve a la gerencia'], a: 0, e: 'Por ejemplo, el talón de una factura.' },
        { q: '¿Qué deben incluir los documentos externos que no necesitan los internos?', o: ['Instrucciones de uso e imagen institucional', 'Cortes de control y totales por grupo', 'Números de página y fecha de preparación', 'Gráficos de tendencia y anomalías'], a: 0, e: 'Además suelen llevar logo y colores corporativos.' },
      ],
      sources: [{ title: 'Análisis y Diseño de Sistemas, 11ª ed.', ref: 'Kendall y Kendall, págs. 329-336', points: ['Objetivos del diseño de la salida; salidas internas y externas.'] }],
    },

    {
      id: 'tecnologias-de-salida',
      module: 'm8',
      title: 'Tecnologías de salida y los 10 factores para elegir',
      keywords: 'impresoras pantallas video audio animación podcast salida electrónica email factores quién cuántas dónde propósito velocidad frecuencia almacenamiento leyes costos ambientales',
      tldr: 'Hay muchas tecnologías de salida: <strong>impresoras, pantallas, video, audio, animación y salida electrónica</strong>. Para elegir se responden <mark>10 preguntas</mark>: quién, cuántos, dónde, para qué, qué tan rápido, con qué frecuencia, cuánto tiempo se guarda, qué leyes aplican, qué cuesta y qué requisitos humanos y ambientales tiene.',
      goals: ['Describir cada tecnología de salida con sus ventajas.', 'Enumerar los 10 factores para elegir la tecnología.', 'Elegir la tecnología adecuada para un caso.'],
      body: `
        <h2>Tecnologías o métodos de salida</h2>
        ${table(['Tecnología', 'Características'], [
          ['Impresoras', 'Tipo común y flexible: se elige el sitio de impresión, la cantidad de caracteres por página, estilos, fuentes, gráficos y color; impresión silenciosa, menos formularios impresos y tareas de operador simplificadas.'],
          ['Pantallas', 'Al principio se usaban para ingresar datos; al bajar su precio crecieron como salida. Más silenciosas, permiten <strong>interactuar</strong>, son flexibles y la información cambia en tiempo real. Permiten revisar antes de imprimir y ahorran costos de impresión, archivo y almacenamiento; es fácil mantenerlas actualizadas. Pero a veces hay que archivar el impreso por razones fiscales.'],
          ['Video', 'Combina la solidez e impacto emocional del audio con un canal visual; para aplicaciones web. Sirve para complementar la salida estática, colaborar a distancia, mostrar cómo hacer algo (llenar un formulario, instalar software), capacitar brevemente, grabar un evento real y preservar ocasiones importantes.'],
          ['Audio', 'Opuesto a la impresa: es <strong>transitorio</strong> y para beneficio de <strong>un</strong> usuario, mientras la impresa es permanente y se distribuye a muchos. Se usa en atención telefónica 24/7 (encuestas, ventas, pagos), más barata que personal. Debe dar <strong>retroalimentación</strong> (“Ha indicado treinta y tres dólares. Presione uno si es correcto”), tener un guion claro e instrucciones breves. El <strong>podcasting</strong> publica archivos de voz descargables.'],
          ['Animación', 'Presentación de imágenes en serie, con transiciones graduales o abruptas y cambios de color, tamaño o textura (morphing). Para decidir, mejor con imágenes reales y transiciones <strong>graduales</strong>. No saturarla de elementos.'],
          ['Salida electrónica', 'Correos electrónicos y mensajes de tableros que van de una computadora a otra, por intranet o proveedores. El email es útil y flexible, y da soporte a grupos de trabajo.'],
        ])}

        <h2>Los 10 factores para elegir la tecnología</h2>
        ${table(['Pregunta', 'Orientación'], [
          ['1. ¿Quién usará (verá) la salida?', 'Gerentes que viajan: impresa. En el escritorio: pantalla o documentos web interactivos. Clientes y proveedores: extranets.'],
          ['2. ¿Cuántas personas la necesitan?', 'Muchas: documentos web con opción de imprimir o copias impresas. Una sola: pantalla o audio.'],
          ['3. ¿Dónde se necesita?', 'Distribución y logística.'],
          ['4. ¿Cuál es su propósito?', 'Atraer inversores con las finanzas: impresa bien diseñada o web. Cotizaciones que cambian: pantallas, páginas web o audio.'],
          ['5. ¿Con qué velocidad se necesita?', 'Jefes operativos (línea detenida, materia prima demorada): pantalla, ya. Gerentes estratégicos: en un período dado, para ver ciclos y tendencias.'],
          ['6. ¿Con qué frecuencia se accede?', 'Muy frecuente: pantalla o web. Poco frecuente y pocos usuarios: email.'],
          ['7. ¿Cuánto tiempo se almacenará?', 'El papel se deteriora; lo digital resiste ambiente, luz, humedad y manipulación. Puede haber obligación legal de conservar impresos.'],
          ['8. ¿Bajo qué leyes se produce, guarda y distribuye?', 'Facturas, recibos de sueldo, libros contables, resúmenes bancarios, declaraciones juradas: algunas deben imprimirse.'],
          ['9. ¿Qué costos iniciales y continuos tiene?', 'Compra o alquiler de hardware, impresoras, pantallas, internet, intranets, extranets y sitios.'],
          ['10. ¿Qué requisitos humanos y ambientales tiene?', 'Accesibilidad, ruido, temperatura, espacio, cableado, cercanía a Wi-Fi. Las impresoras necesitan un ambiente seco y fresco; las pantallas, espacio; el audio y el video, silencio y que solo escuchen quienes los usan.'],
        ])}
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: 'Elegí la tecnología de salida',
        buckets: ['Impresa', 'Pantalla', 'Audio', 'Video', 'Email'],
        items: [
          { t: 'Recibos de sueldo que la ley obliga a conservar firmados.', b: 0 },
          { t: 'El supervisor de planta necesita saber al instante si se detuvo la línea.', b: 1 },
          { t: 'Un banco atiende consultas de saldo las 24 horas por teléfono.', b: 2 },
          { t: 'Mostrar a los clientes cómo instalar el software paso a paso.', b: 3 },
          { t: 'Un informe trimestral que consultan dos personas ocasionalmente.', b: 4 },
          { t: 'Cotizaciones de bolsa que cambian cada segundo.', b: 1 },
        ],
      }],
      quiz: [
        { q: '¿En qué se opone la salida de audio a la impresa?', o: ['Es transitoria y para uno; la impresa, permanente y para muchos', 'Es más cara de producir y de distribuir que la impresa', 'No admite ningún tipo de retroalimentación con el usuario', 'Es una salida pensada exclusivamente para los gerentes'], a: 0, e: 'Por eso el audio sirve para atención telefónica.' },
        { q: '¿Qué debe hacer un sistema telefónico con audio para el ingreso de datos?', o: ['Repetir el valor y pedir confirmación', 'Usar instrucciones largas y completas', 'Evitar los guiones para sonar natural', 'Reproducir música de fondo constante'], a: 0, e: '“Ha indicado treinta y tres dólares. Presione uno si es correcto.”' },
        { q: 'Si la salida la necesita un solo usuario, conviene...', o: ['Pantalla o audio', 'Copias impresas', 'Documentos web con opción de imprimir', 'Extranet'], a: 0, e: 'Si muchos la necesitan, web con opción de imprimir o impresos.' },
        { q: 'Una salida a la que se accede con poca frecuencia y que pocos usuarios necesitan conviene enviarla por...', o: ['Email', 'Pantalla', 'Video', 'Impresora'], a: 0, e: 'Las de acceso frecuente van a pantalla o a sistemas web.' },
        { q: '¿Qué tipo de gerente necesita la salida con rapidez para ajustarse a eventos?', o: ['El de nivel bajo u operativo', 'El estratégico', 'El financiero', 'El de recursos humanos'], a: 0, e: 'Los estratégicos la necesitan en un período, para ver tendencias.' },
        { q: '¿Para qué conviene una animación cuando se apoya la toma de decisiones?', o: ['Con imágenes reales y transiciones graduales', 'Con transiciones abruptas', 'Con muchos elementos', 'Con objetos abstractos y sonido'], a: 0, e: 'Las mejores decisiones se toman con transiciones graduales.' },
        { q: '¿Qué requisito ambiental tienen las impresoras?', o: ['Un ambiente seco y fresco', 'Silencio absoluto', 'Cercanía a Wi-Fi', 'Poca luz'], a: 0, e: 'El audio y el video, en cambio, requieren silencio.' },
      ],
      sources: [{ title: 'Análisis y Diseño de Sistemas, 11ª ed.', ref: 'Kendall y Kendall, págs. 336-340', points: ['Tecnologías de salida y factores para elegirlas.'] }],
    },

    {
      id: 'salidas-impresas-y-pantalla',
      module: 'm8',
      title: 'Cómo diseñar salidas impresas y por pantalla',
      keywords: 'informes detallados por excepciones sintetizados constante variable papel formularios preimpresos atributos funcionales encabezado número de página fecha cortes de control pantalla efímera 4 lineamientos gráficos',
      tldr: 'Los informes son <mark>detallados, por excepciones o sintetizados</mark>, se organizan como fluye la vista y tienen atributos funcionales fijos. La salida por pantalla es <strong>efímera e interactiva</strong> y sigue <mark>4 lineamientos</mark>: simple, consistente, fácil de recorrer y atractiva.',
      goals: ['Distinguir los 3 tipos de informes.', 'Aplicar los lineamientos de informes impresos y sus atributos funcionales.', 'Diferenciar la salida por pantalla de la impresa y aplicar sus 4 lineamientos.', 'Decidir el uso de gráficos.'],
      body: `
        <h2>Salidas impresas</h2>
        ${table(['Tipo de informe', 'Qué imprime', 'Para qué sirve'], [
          ['Detallado', 'Una línea por cada registro del archivo maestro.', 'Ver todos los datos.'],
          ['Por excepciones', 'Una línea por cada registro que cumple un conjunto de condiciones (qué estudiantes promocionaron una materia).', '<strong>Ayudan a operar</strong> un negocio.'],
          ['Sintetizado', 'Una línea por <strong>grupo</strong> de registros.', '<strong>Tomar decisiones</strong>: qué artículos no se venden y cuáles se venden mucho.'],
        ])}
        <h3>Lineamientos</h3>
        <ul>
          <li>Indicar el <strong>tipo de dato</strong> (alfabético, especial o numérico) de cada posición.</li>
          <li>Distinguir la <strong>información constante</strong> (título del informe, encabezados de columna: igual en cada impresión) de la <strong>variable</strong> (cifras de ventas).</li>
          <li><strong>Papel, tipo y tamaño</strong>: la restricción principal es el costo; hay papel de seguridad para cheques y valores, o con sellos inalterables y hologramas (pasaportes, visas). Los <strong>formularios preimpresos</strong> transmiten imagen corporativa con colores, logos y diseño; las formas y distribuciones innovadoras llaman la atención.</li>
          <li>Trabajar con los usuarios para que el informe sea legible y agradable.</li>
        </ul>
        ${note('Atributos funcionales de un informe impreso: <strong>encabezado o título, número de página, fecha de preparación, encabezados de columnas, agrupamiento de datos relacionados y cortes de control</strong>. Y se organiza como fluye la vista: <strong>de arriba hacia abajo y de izquierda a derecha</strong>.', 'exam')}
        <p>Si la salida impresa es poco atractiva y difícil de leer, no se usará: habrá desinformación y desperdicio de recursos.</p>

        <h2>Salida por pantalla</h2>
        <p>Difiere de la impresa: es <strong>efímera</strong>, está disponible en un horario más flexible, no es portátil de la misma forma y a veces se puede modificar con interacción directa. Hay que <strong>instruir a los usuarios</strong> sobre qué teclas oprimir, en qué vínculos hacer clic, cómo desplazarse, cuándo termina la pantalla y cómo interactuar. Además, el acceso a la pantalla se puede controlar con <strong>contraseña</strong>.</p>
        <h3>4 lineamientos</h3>
        <ol>
          <li>Mantener la pantalla <strong>simplificada</strong>.</li>
          <li>Mantener la presentación <strong>consistente</strong> de una página a otra.</li>
          <li>Facilitar el <strong>movimiento</strong> del usuario entre las salidas.</li>
          <li>Crear una pantalla <strong>atractiva y agradable</strong>.</li>
        </ol>
        ${pantalla}
        <p>Como toda salida, las pantallas necesitan retroalimentación de los usuarios: se aprueban tras varios prototipos y refinaciones.</p>
        <h3>Gráficos en pantalla</h3>
        <p>Son poderosos: es más fácil ver una <strong>tendencia o un patrón</strong> con el gráfico apropiado, y las diferencias se identifican mejor en gráficos que en tablas. Deben ser precisos y fáciles de entender, y el estilo se elige con los usuarios. Hay que determinar: <strong>1)</strong> el propósito del gráfico, <strong>2)</strong> el tipo de datos, <strong>3)</strong> la audiencia y <strong>4)</strong> los efectos de distintos tipos de gráfico sobre la audiencia.</p>
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿Qué tipo de informe es?',
        buckets: ['Detallado', 'Por excepciones', 'Sintetizado'],
        items: [
          { t: 'Listado de todos los clientes con su dirección y saldo.', b: 0 },
          { t: 'Clientes con deuda de más de 90 días.', b: 1 },
          { t: 'Ventas totales por rubro en el trimestre.', b: 2 },
          { t: 'Productos con stock por debajo del mínimo.', b: 1 },
          { t: 'Cantidad de alumnos aprobados por materia.', b: 2 },
          { t: 'Todas las transacciones del día, una por línea.', b: 0 },
        ],
      }],
      quiz: [
        { q: '¿Qué informe imprime una línea por cada grupo de registros?', o: ['Sintetizado', 'Detallado', 'Por excepciones', 'Retornable'], a: 0, e: 'Sirve para tomar decisiones.' },
        { q: '¿Qué tipo de informe ayuda principalmente a operar un negocio?', o: ['Por excepciones', 'Sintetizado', 'Detallado', 'Ninguno'], a: 0, e: 'Imprime los registros que cumplen ciertas condiciones.' },
        { q: '¿Cuál es información constante en un informe?', o: ['El título y los encabezados de columna', 'Las cifras de ventas', 'Las fechas de cada operación', 'Los totales'], a: 0, e: 'La variable cambia en cada impresión.' },
        { q: '¿Cuál NO es un atributo funcional de un informe impreso?', o: ['El logo animado de la empresa', 'Número de página', 'Fecha de preparación', 'Cortes de control'], a: 0, e: 'También son atributos el encabezado, los encabezados de columna y el agrupamiento de datos.' },
        { q: '¿En qué difiere la salida por pantalla de la impresa?', o: ['Es efímera y a veces interactiva', 'Es permanente y más fácil de archivar', 'Es más portátil que la impresa', 'No permite controlar quién accede'], a: 0, e: 'Además el acceso se puede controlar con contraseña.' },
        { q: '¿Cuál NO es uno de los 4 lineamientos para pantallas?', o: ['Mostrar toda la información en una sola pantalla', 'Mantener la pantalla simplificada', 'Mantener la presentación consistente', 'Facilitar el movimiento del usuario'], a: 0, e: 'El cuarto es crearla atractiva y agradable.' },
        { q: '¿Cómo deben organizarse los informes impresos?', o: ['De arriba abajo y de izquierda a derecha', 'Por orden alfabético de los campos', 'De abajo hacia arriba, con los totales primero', 'Por tipo de dato: numéricos y luego alfabéticos'], a: 0, e: 'Así resultan legibles.' },
        { q: 'Al diseñar un gráfico, ¿qué cuatro cosas hay que determinar?', o: ['Propósito, datos, audiencia y efecto sobre ella', 'Color, tamaño, tipografía y leyenda', 'Ejes, escala, título y fecha', 'Costo, tiempo, alcance y calidad'], a: 0, e: 'Son los cuatro puntos de Kendall y Kendall.' },
      ],
      sources: [{ title: 'Análisis y Diseño de Sistemas, 11ª ed.', ref: 'Kendall y Kendall, págs. 341-346', points: ['Diseño de informes impresos y de salida para pantallas.'] }],
    },
  );
})();
