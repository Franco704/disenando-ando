/* Unidad VI, clase 22: prueba de componentes, pruebas del sistema e integración, TDD, pruebas de versión, basadas en requerimientos, de escenario y de rendimiento. Diapositivas Clase 22, Sommerville 9ª ed. cap. 8, págs. 216-227. */
(() => {
  const { LESSONS, h } = window.GUIDE;
  const { note, def, table, fig, lab, uml: U } = h;

  const tdd = U.svg(620, 190, `
    ${U.blk(10, 70, 130, 56, 'Identificar nueva\nfuncionalidad', { s: 1 })}
    ${U.blk(180, 70, 120, 56, 'Escribir\nla prueba', { cls: 'k-a', s: 2 })}
    ${U.blk(340, 70, 120, 56, 'Correr\nlas pruebas', { cls: 'k-if', s: 3 })}
    ${U.blk(500, 14, 110, 50, 'Implementar\nla funcionalidad', { cls: 'k-err', s: 4 })}
    ${U.blk(500, 132, 110, 50, 'Siguiente\nfuncionalidad', { cls: 'k-ok', s: 5 })}
    ${U.ln([[140, 98], [180, 98]], { end: 'ar', s: 2 })}${U.ln([[300, 98], [340, 98]], { end: 'ar', s: 3 })}
    <g data-s="4">${U.ln([[460, 86], [500, 44]], { end: 'ar', cls: 's-err' })}<text x="468" y="58" class="u-sm t-err u-e">falla</text>${U.ln([[555, 14], [555, 4], [400, 4], [400, 70]], { end: 'ar', dash: true })}<text x="470" y="0" class="u-sm"></text></g>
    <g data-s="5">${U.ln([[460, 112], [500, 156]], { end: 'ar', cls: 's-ok' })}<text x="468" y="148" class="u-sm t-ok u-e">pasa</text>${U.ln([[555, 182], [555, 188], [75, 188], [75, 126]], { end: 'ar', dash: true })}</g>`,
    'Ciclo del desarrollo dirigido por pruebas');

  LESSONS.push(
    {
      id: 'pruebas-de-componentes',
      module: 'm18',
      title: 'Prueba de componentes y errores de interfaz',
      keywords: 'prueba de componentes interfaz componente compuesto A B C tipos de interfaz parámetro memoria compartida procedimiento paso de mensajes errores uso incorrecto mala interpretación temporización lineamientos punteros nulos esfuerzo inspecciones Java',
      tldr: 'La <mark>prueba de componentes</mark> muestra que la <strong>interfaz</strong> de un componente compuesto se comporta según su especificación (se asume que la unidad de cada clase ya se probó). Hay <strong>4 tipos de interfaz</strong> y <strong>3 clases de errores de interfaz</strong>, que no aparecen probando objetos sueltos porque nacen de su interacción.',
      goals: ['Definir la prueba de componentes y su foco.', 'Enumerar los 4 tipos de interfaz entre componentes.', 'Distinguir las 3 clases de errores de interfaz.', 'Aplicar los 5 lineamientos para pruebas de interfaz.'],
      body: `
        <h2>Qué se prueba</h2>
        <p>Los componentes de software están formados por varios objetos en interacción, y se accede a su funcionalidad por su <strong>interfaz</strong>. La prueba de componentes muestra que esa interfaz se comporta según su especificación; se asume que dentro del componente ya se hicieron las pruebas de unidad de cada clase.</p>
        ${fig(U.svg(520, 170, `<rect x="120" y="10" width="280" height="150" rx="10" class="u-lyr"/>${[['A', 150, 30], ['B', 290, 30], ['C', 220, 100]].map(([t, x, y]) => U.blk(x, y, 80, 44, t, { cls: 'k-a' })).join('')}${U.ln([[230, 52], [290, 52]], { start: 'ar', end: 'ar' })}${U.ln([[190, 74], [240, 100]], { start: 'ar', end: 'ar' })}${U.ln([[330, 74], [280, 100]], { start: 'ar', end: 'ar' })}
          ${U.blk(4, 64, 90, 40, 'Casos de\nprueba', { cls: 'k-ok', bold: false })}${U.ln([[94, 84], [120, 84]], { end: 'ar' })}<circle cx="120" cy="84" r="6" class="f-if"/><text x="460" y="88" class="u-c u-sm">interfaz del</text><text x="460" y="102" class="u-c u-sm">componente</text>`, 'Componente compuesto de A, B y C probado a través de su interfaz'), 'Prueba de interfaz (Sommerville, figura 8.8): los casos no se aplican a A, B y C por separado sino a la interfaz del componente compuesto.')}
        <p>Los errores de interfaz del componente compuesto <strong>no se detectan probando los objetos individuales</strong>: resultan de las interacciones entre ellos.</p>

        <h2>4 tipos de interfaz</h2>
        ${table(['Tipo', 'Cómo funciona'], [
          ['1. De parámetro', 'Los datos pasan de un componente a otro por parámetros.'],
          ['2. De memoria compartida', 'Un bloque de memoria se reparte entre componentes: un subsistema coloca los datos y otros los recuperan de ahí.'],
          ['3. De procedimiento', 'Un componente encapsula un conjunto de procedimientos que otros llaman.'],
          ['4. De paso de mensajes', 'Un componente solicita un servicio a otro mediante un mensaje.'],
        ])}
        <h2>3 clases de errores de interfaz</h2>
        ${table(['Error', 'Descripción'], [
          ['Uso incorrecto', 'Típico de las interfaces de parámetro: parámetros de tipo equivocado, o en orden o número equivocados.'],
          ['Mala interpretación', 'El componente llamado no se comporta como se esperaba: tiene un comportamiento imprevisto para quien lo llama.'],
          ['Errores de temporización', 'En sistemas de tiempo real con memoria compartida o paso de mensajes, el productor y el consumidor operan a distinta velocidad y el consumidor accede a información obsoleta.'],
        ])}
        <p>Son difíciles de encontrar porque algunas fallas solo aparecen en condiciones inusuales, pueden surgir de interacciones entre fallas de distintos módulos, y la falla de un objeto solo se nota cuando otro se comporta de forma inesperada.</p>
        <h2>5 lineamientos para pruebas de interfaz</h2>
        <ol>
          <li>Examinar el código y <strong>listar cada llamada a un componente externo</strong>; diseñar pruebas con valores de parámetros en los <strong>extremos de sus rangos</strong>.</li>
          <li>Donde pasen <strong>punteros</strong> por una interfaz, probar con <strong>punteros nulos</strong>.</li>
          <li>Si se llama a un componente por una interfaz de procedimiento, diseñar pruebas que lo hagan <strong>fallar deliberadamente</strong>.</li>
          <li>En sistemas de paso de mensajes, usar <strong>pruebas de esfuerzo</strong>: muchos más mensajes de los que probablemente ocurran.</li>
          <li>Si interactúan por memoria compartida, <strong>variar el orden</strong> en que se producen y consumen los datos.</li>
        </ol>
        ${note('Las <strong>inspecciones</strong> son más baratas que las pruebas para descubrir errores de interfaz, y un lenguaje fuertemente tipado como <strong>Java</strong> permite que el compilador descubra muchos de ellos.', 'tip')}
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿Qué clase de error de interfaz es?',
        buckets: ['Uso incorrecto', 'Mala interpretación', 'Temporización'],
        items: [
          { t: 'Se llama a transferir(destino, origen, monto) con origen y destino invertidos.', b: 0 },
          { t: 'Se asume que buscar() devuelve null si no encuentra, pero lanza una excepción.', b: 1 },
          { t: 'El lector de un sensor lee el buffer antes de que el productor termine de escribirlo.', b: 2 },
          { t: 'Se pasa un String donde se esperaba un entero.', b: 0 },
          { t: 'Se espera que ordenar() devuelva una lista nueva, pero modifica la original.', b: 1 },
          { t: 'El consumidor procesa mensajes más lento que el productor y usa datos viejos.', b: 2 },
        ],
      }],
      quiz: [
        { q: '¿Qué muestra la prueba de componentes?', o: ['Que la interfaz del componente se comporta según su especificación', 'Que cada método de cada clase funciona', 'Que el sistema cumple los requerimientos del cliente', 'Que el sistema soporta la carga'], a: 0, e: 'Se asume que las pruebas de unidad ya se hicieron.' },
        { q: '¿Por qué los errores de interfaz no se detectan probando objetos individuales?', o: ['Porque resultan de las interacciones entre los objetos', 'Porque los objetos no tienen interfaz', 'Porque se ocultan en el compilador', 'Porque solo aparecen en producción'], a: 0, e: 'Por eso los casos se aplican a la interfaz del componente compuesto.' },
        { q: '¿Cuál NO es un tipo de interfaz entre componentes?', o: ['De herencia', 'De parámetro', 'De memoria compartida', 'De paso de mensajes'], a: 0, e: 'El cuarto es de procedimiento.' },
        { q: 'Pasar parámetros en el orden equivocado es un error de...', o: ['Uso incorrecto de interfaz', 'Mala interpretación', 'Temporización', 'Rendimiento'], a: 0, e: 'Típico de las interfaces de parámetro.' },
        { q: '¿Cuándo aparecen los errores de temporización?', o: ['Productor y consumidor a distinta velocidad', 'Cuando un método tarda demasiado en responder', 'Cuando se pasa un parámetro nulo a la interfaz', 'Cuando el compilador no detecta un error de tipos'], a: 0, e: 'En sistemas de tiempo real con memoria compartida o mensajes.' },
        { q: 'Si una interfaz pasa punteros, ¿qué conviene probar?', o: ['Con valores nulos para los punteros', 'Solo con punteros válidos', 'Con punteros duplicados', 'No se prueba'], a: 0, e: 'Es el segundo lineamiento.' },
        { q: '¿Qué tipo de prueba se recomienda para sistemas de paso de mensajes?', o: ['Pruebas de esfuerzo', 'Pruebas de unidad', 'Inspecciones de código', 'Pruebas alfa con usuarios'], a: 0, e: 'Es el cuarto lineamiento.' },
      ],
      sources: [{ title: 'Ingeniería de Software, 9ª ed.', ref: 'Sommerville, cap. 8, págs. 216-219', points: ['Prueba de componentes: interfaces, errores y lineamientos (figura 8.8).'] }],
    },

    {
      id: 'pruebas-del-sistema-y-tdd',
      module: 'm18',
      title: 'Pruebas del sistema, integración y TDD',
      keywords: 'pruebas del sistema integración incremental comportamiento emergente pruebas de interacción casos de uso diagramas de secuencia políticas de prueba exhaustivas automatizadas TDD desarrollo dirigido por pruebas cobertura regresión depuración simplificada documentación',
      tldr: 'Las <mark>pruebas del sistema</mark> integran componentes y prueban el todo, de forma <strong>incremental</strong>, buscando las interacciones y el <strong>comportamiento emergente</strong>. El <mark>TDD</mark> entrelaza código y pruebas: no se avanza al siguiente incremento hasta que el código pasa su prueba. Da cobertura, regresión, depuración simple y documentación.',
      goals: ['Explicar la integración y prueba incremental.', 'Definir comportamiento emergente y prueba de interacción.', 'Aplicar las 4 políticas de prueba.', 'Recorrer los 5 pasos del TDD y sus 4 beneficios.'],
      body: `
        <h2>Pruebas del sistema</h2>
        <p>Implican integrar los componentes y probar el sistema integrado, <strong>de forma incremental</strong>: incluir un componente, probar, integrar otro, probar de nuevo. Si aparece un problema, probablemente se deba a la interacción con el <strong>último componente integrado</strong> (lo mismo que se vio en la Unidad I). La integración y prueba incremental es fundamental en los métodos ágiles como XP: se hacen <strong>pruebas de regresión</strong> cada vez que se integra un incremento.</p>
        <p>Demuestran que los componentes son <strong>compatibles</strong>, interactúan bien y transfieren los datos correctos en el momento adecuado por sus interfaces. Al integrar componentes (propios, reutilizados o comerciales) aparece un <strong>comportamiento emergente</strong>: funcionalidad que solo se hace evidente al reunirlos.</p>
        ${note('El comportamiento emergente <strong>no está planeado ni se desea</strong>: hay que diseñar pruebas que demuestren que el sistema hace solo lo que debería hacer.', 'warn')}
        <p>La <strong>prueba de interacción</strong> descubre los bugs de un componente que solo se revelan cuando lo usan otros. Las <strong>pruebas basadas en casos de uso</strong> son efectivas para el sistema: cada caso de uso lo implementan varios componentes, y probarlo obliga a que ocurran esas interacciones (los diagramas de secuencia ayudan a diseñarlas).</p>
        <h3>¿Cuántas pruebas hacer? Políticas de prueba</h3>
        <p>Las pruebas exhaustivas son imposibles, así que se usan políticas:</p>
        <ol>
          <li>Que todas las líneas del programa se ejecuten al menos una vez.</li>
          <li>Probar todas las funciones que se ingresan por un menú.</li>
          <li>Probar combinaciones de funciones que se ingresan por el mismo menú.</li>
          <li>Si hay entradas del usuario, probar entradas correctas e incorrectas.</li>
        </ol>
        <p>Las pruebas automatizadas del sistema son más difíciles que las de unidad: estas se apoyan en predecir la salida y codificar la predicción; un sistema puede generar salidas grandes y difíciles de predecir, y es difícil demostrar que son creíbles sin haberlas creado antes.</p>

        <h2>Desarrollo dirigido por pruebas (TDD)</h2>
        ${def('TDD (Test-Driven Development)', 'Enfoque de diseño de programas en el que se entrelazan el desarrollo de código y las pruebas: el código se desarrolla incrementalmente, junto con una prueba para ese incremento, y no se avanza al siguiente incremento hasta que el código pasa la prueba.', 'Sommerville, cap. 8, págs. 221-224. Es parte de los métodos ágiles (XP).')}
        ${lab(0)}
        <p>Como los incrementos son pequeños, cada prueba corre rápido: en segundos se ejecutan cientos. TDD aclara qué debe hacer cada segmento de código: para escribir la prueba hay que entender qué se quiere, y eso facilita escribir el código.</p>
        ${table(['Beneficio', 'Por qué'], [
          ['1. Cobertura de código', 'Todo segmento de código tiene al menos una prueba asociada: todo el código se ejecuta, y los defectos se descubren durante el desarrollo.'],
          ['2. Pruebas de regresión', 'Las pruebas se acumulan mientras se desarrolla: siempre se pueden correr para demostrar que los cambios no introdujeron bugs.'],
          ['3. Depuración simplificada', 'Si falla una prueba, el problema está casi seguro en el código recién escrito: no hacen falta herramientas de depuración para localizarlo.'],
          ['4. Documentación del sistema', 'Las pruebas describen lo que debe hacer el código; leerlas ayuda a entenderlo.'],
        ])}
        <p>Además reduce los costos de las pruebas de regresión.</p>
      `,
      labs: [{ type: 'steps', title: 'El ciclo de TDD', intro: 'Los 5 pasos del desarrollo dirigido por pruebas, con su bucle.', fig: tdd, steps: [
        { k: 'Paso 1', t: '<strong>Identificar el incremento</strong> de funcionalidad requerido: pequeño, implementable en pocas líneas de código.' },
        { k: 'Paso 2', t: '<strong>Escribir una prueba</strong> para esa funcionalidad e implementarla como prueba automatizada. Todavía no hay código: la prueba falla.' },
        { k: 'Paso 3', t: '<strong>Correr la prueba</strong> junto con todas las demás pruebas ya implementadas.' },
        { k: 'Paso 4 · falla', t: 'Si falla, se <strong>implementa o corrige</strong> el código y se vuelve a correr la prueba.' },
        { k: 'Paso 5 · pasa', t: 'Si pasan todas las pruebas, se pasa a la <strong>siguiente funcionalidad</strong>.' },
      ] }],
      quiz: [
        { q: '¿Cómo deben hacerse las pruebas del sistema?', o: ['Integrando un componente por vez y probando cada vez', 'Integrando todo y probando al final', 'Probando cada clase por separado', 'Solo con usuarios'], a: 0, e: 'Si aparece un problema, probablemente se deba al último componente integrado.' },
        { q: '¿Qué es el comportamiento emergente?', o: ['Funcionalidad que aparece al reunir componentes', 'Un error de un componente probado en forma aislada', 'Una función planificada en los requerimientos', 'La respuesta del sistema ante la carga máxima'], a: 0, e: 'No está planeado ni se desea: hay que probar que el sistema hace solo lo que debe.' },
        { q: '¿Por qué las pruebas basadas en casos de uso son efectivas para el sistema?', o: ['Obligan a interactuar a los componentes que los implementan', 'Porque se pueden automatizar por completo sin esfuerzo', 'Porque las escribe el cliente y reflejan su necesidad', 'Porque reemplazan a las pruebas de unidad y de componentes'], a: 0, e: 'Fuerzan las interacciones entre componentes.' },
        { q: '¿Cuál es una política de prueba válida?', o: ['Que todas las líneas del programa se ejecuten al menos una vez', 'Probar solo las funciones nuevas', 'Probar solo con entradas correctas', 'Probar exhaustivamente todas las combinaciones'], a: 0, e: 'Las pruebas exhaustivas son imposibles.' },
        { q: 'En TDD, ¿cuándo se avanza al siguiente incremento?', o: ['Cuando el código pasa todas las pruebas', 'Cuando se termina el sprint en curso', 'Cuando lo decide el Dueño de Producto', 'Cuando se escribieron todas las pruebas'], a: 0, e: 'Código y pruebas se entrelazan.' },
        { q: '¿Qué se hace en TDD antes de escribir el código de una funcionalidad?', o: ['Escribir una prueba automatizada', 'Escribir la documentación de diseño', 'Hacer una inspección del código existente', 'Hacer una prueba beta con usuarios'], a: 0, e: 'Por eso la prueba primero falla.' },
        { q: '¿Por qué TDD simplifica la depuración?', o: ['El problema está en lo recién escrito', 'Porque elimina todos los errores del código', 'Porque usa depuradores automáticos integrados', 'Porque en TDD nunca hay código viejo que revisar'], a: 0, e: 'No hacen falta herramientas de depuración para localizarlo.' },
        { q: '¿Cuál NO es un beneficio del TDD según Sommerville?', o: ['Eliminar las pruebas de sistema', 'Cobertura de código', 'Pruebas de regresión', 'Documentación del sistema'], a: 0, e: 'El cuarto beneficio es la depuración simplificada.' },
      ],
      sources: [{ title: 'Ingeniería de Software, 9ª ed.', ref: 'Sommerville, cap. 8, págs. 219-224', points: ['Pruebas del sistema e integración incremental.', 'Desarrollo dirigido por pruebas (figura 8.9) y sus beneficios.'] }],
    },

    {
      id: 'version-escenario-rendimiento',
      module: 'm18',
      title: 'Pruebas de versión, de requerimientos, de escenario y de rendimiento',
      keywords: 'pruebas de versión equipo separado caja negra validación pruebas basadas en requerimientos comprobable escenario historia narrativa enfermera Ana Juan perfil operativo rendimiento carga pruebas de esfuerzo stress 300 transacciones falla poco degradación',
      tldr: 'Las <mark>pruebas de versión</mark> las hace un equipo <strong>ajeno al desarrollo</strong>, tratando el sistema como caja negra, para mostrar que es apto para usarse. Variantes: <strong>basadas en requerimientos</strong> (cada requerimiento genera pruebas), <strong>de escenario</strong> (historias realistas que combinan requerimientos) y <strong>de rendimiento</strong> (con un perfil operativo y pruebas de esfuerzo).',
      goals: ['Diferenciar pruebas de versión de pruebas del sistema.', 'Derivar pruebas de un requerimiento.', 'Recorrer un escenario de prueba e identificar las características que prueba.', 'Diseñar una prueba de rendimiento con perfil operativo y prueba de esfuerzo.'],
      body: `
        <h2>Pruebas de versión</h2>
        <p>Proceso de probar una <strong>versión</strong> del sistema destinada a clientes y usuarios, <strong>fuera del equipo de desarrollo</strong>: la hace un equipo que no intervino en el desarrollo. Objetivo: comprobar que el sistema cumple sus requerimientos y es suficientemente bueno para usarse; <strong>convencer al fabricante</strong> de que es apto y liberarlo como producto o entregarlo al cliente.</p>
        <p>Muestran que el sistema entrega la funcionalidad, el rendimiento y la confiabilidad especificados y que no falla en el uso normal: son <strong>pruebas de validación</strong>. El sistema se trata como una <strong>caja negra</strong>, estudiando sus entradas y salidas.</p>

        <h2>Pruebas basadas en requerimientos</h2>
        <p>Todo requerimiento relevado en el análisis debe ser <strong>comprobable</strong>. Se considera cada requerimiento y se deriva un conjunto de pruebas para él: probar un requerimiento puede implicar muchas pruebas. Son pruebas de validación: demuestran que el sistema implementó bien sus requerimientos.</p>
        <p>Ejemplo (Sommerville): “Si se sabe que un paciente es alérgico a un medicamento, la prescripción de ese medicamento debe generar una advertencia al usuario; si el médico la ignora, debe dar una razón”. Pruebas: un paciente sin alergias al que se le receta un medicamento (no debe haber advertencia); uno con una alergia conocida al que se le receta ese medicamento (debe haber advertencia); uno alérgico a dos medicamentos que recibe ambos (dos advertencias); uno con advertencia que el médico ignora (debe pedirse la razón).</p>

        <h2>Pruebas de escenario</h2>
        <p>Tipo de prueba de versión: se crean escenarios típicos de uso y con ellos se desarrollan casos de prueba. Un <strong>escenario</strong> es una historia que describe una forma de usar el sistema: debe ser <strong>realista</strong>, los usuarios reales deben poder relacionarse con él, ser una historia narrativa <strong>creíble y compleja</strong>, motivar a los participantes y ser fácil de evaluar.</p>
        <div class="note"><p><strong>Escenario “Sistema de visitas domiciliarias a pacientes”.</strong> Ana es enfermera de salud mental y visita a domicilio a sus pacientes para seguir el tratamiento y ver que no sufran efectos colaterales. Ingresa al sistema y obtiene la agenda del día con los datos de los pacientes; descarga sus registros en la tablet y los encripta con una clave. Visita a Juan, que toma antidepresivos: siente que lo ayudan, pero tiene insomnio. Ana descifra el registro de Juan, consulta los efectos colaterales del medicamento, anota el problema, sugiere que vea al médico y pone un recordatorio para llamarlo. Al terminar, el sistema vuelve a cifrar el registro. De vuelta en la clínica, el sistema le genera la lista de pacientes a contactar.</p></div>
        ${table(['Característica que prueba el escenario'], [['1. Autenticación al ingresar.'], ['2. Descarga y carga de registros desde y hacia la tablet.'], ['3. Agenda de visitas domiciliarias.'], ['4. Cifrado y descifrado de registros en la tablet.'], ['5. Recuperación y modificación de registros.'], ['6. Vinculación con la base de medicamentos y sus efectos colaterales.'], ['7. Sistema de recordatorio de llamadas.']])}
        <p>El examinador <strong>interpreta el papel de Ana</strong>, observa la respuesta del sistema y comete <strong>errores deliberados</strong> (la clave equivocada) para ver cómo responde. Anota todo problema, incluso de <strong>rendimiento</strong>: si cifrar tarda mucho, los usuarios saltearán ese paso, y si pierden la tablet, cualquiera podría ver los registros. Un escenario prueba <strong>varios requerimientos a la vez</strong> y demuestra que sus combinaciones no causan problemas.</p>
        ${lab(0)}

        <h2>Pruebas de rendimiento</h2>
        <p>Se hacen con el sistema completamente integrado para garantizar que procese su <strong>carga pretendida</strong>: se aumenta la carga hasta que el rendimiento se vuelve inaceptable. Demuestran que cumple sus requerimientos y descubren problemas.</p>
        ${def('Perfil operativo', 'Conjunto de pruebas que refleja la mezcla real de trabajo que manejará el sistema. Si el 90% de las transacciones son de tipo A, el 5% de tipo B y el resto de C, D y E, la gran mayoría de las pruebas deben ser de tipo A.', 'Sommerville, cap. 8, págs. 225-227.')}
        <p>Sin perfil operativo, no hay una prueba precisa del rendimiento real. Una forma efectiva de descubrir defectos es probar en los <strong>límites</strong> del sistema: estresarlo <strong>fuera de los límites de diseño</strong>, la <strong>prueba de esfuerzo</strong>. Ejemplo: un sistema de transacciones diseñado para 300 por segundo se prueba primero con menos de 300 y luego se sube gradualmente la carga muy por encima del máximo, hasta que falla.</p>
        ${fig(U.svg(560, 200, `${U.ln([[40, 170], [550, 170]], { end: 'ar' })}${U.ln([[40, 170], [40, 10]], { end: 'ar' })}<text x="548" y="188" class="u-e u-sm">transacciones por segundo</text><text x="46" y="18" class="u-sm">transacciones atendidas</text>
          <path d="M40 170L280 50" class="u-ln s-ok" style="stroke-width:3"/><path d="M280 50C340 34 380 40 420 70" class="u-ln s-a" style="stroke-width:3"/><path d="M420 70C450 110 480 140 520 150" class="u-ln s-x u-dash" style="stroke-width:3"/>
          <path d="M280 20V170" class="u-ln u-dash"/><text x="284" y="30" class="u-sm">300 (máximo de diseño)</text><text x="430" y="64" class="u-sm">degradación</text><text x="450" y="132" class="u-sm t-x">falla poco, sin corromper datos</text>`, 'Prueba de esfuerzo: la carga sube más allá del máximo de diseño hasta la degradación'), 'Una prueba de esfuerzo sube la carga más allá del límite de diseño. Lo deseable es que el sistema “falle poco” (rechace transacciones) en lugar de colapsar.')}
        ${table(['Las 2 funciones de la prueba de esfuerzo'], [['1. Prueba el <strong>comportamiento de falla</strong>: puede darse una combinación inesperada de eventos que supere la carga máxima; la falla no debe corromper datos ni perder servicios inesperadamente. Debe demostrar que el sistema <strong>“falla poco”</strong> en vez de colapsar.'], ['2. <strong>Fuerza al sistema</strong> y saca a la luz defectos que no aparecerían normalmente.']])}
        <p>En sistemas distribuidos en red, el exceso de carga degrada el sistema: la red se empantana coordinando datos y los procesos se vuelven lentos esperando a otros. Las pruebas de esfuerzo ayudan a descubrir <strong>cuándo empieza la degradación</strong>, para rechazar transacciones más allá de ese punto.</p>
      `,
      labs: [{
        type: 'classify', title: '¿Qué tipo de prueba de versión es?',
        buckets: ['Basada en requerimientos', 'De escenario', 'De rendimiento'],
        items: [
          { t: 'Para el requisito de advertir alergias, probar un paciente sin alergias y otro alérgico al medicamento.', b: 0 },
          { t: 'El examinador actúa como la enfermera Ana durante una jornada de visitas.', b: 1 },
          { t: 'Subir la carga de 100 a 1000 transacciones por segundo hasta que el sistema falle.', b: 2 },
          { t: 'Armar un perfil operativo con 90% de consultas y 10% de altas.', b: 2 },
          { t: 'Una historia realista que combina login, carga de datos y notificaciones.', b: 1 },
          { t: 'Derivar un conjunto de pruebas por cada requerimiento relevado.', b: 0 },
        ],
      }],
      quiz: [
        { q: '¿Quién hace las pruebas de versión?', o: ['Un equipo ajeno al desarrollo', 'Los programadores del sistema', 'Los usuarios finales en su entorno', 'El Dueño de Producto en la demo'], a: 0, e: 'Se prueba la versión fuera del equipo de desarrollo.' },
        { q: '¿Cómo se trata el sistema en las pruebas de versión?', o: ['Como una caja negra, estudiando entradas y salidas', 'Como una caja blanca, revisando el código', 'Clase por clase', 'Solo con inspecciones'], a: 0, e: 'Son pruebas de validación.' },
        { q: '¿Qué condición deben cumplir los requerimientos para las pruebas basadas en requerimientos?', o: ['Ser comprobables', 'Ser funcionales', 'Estar priorizados', 'Estar en un caso de uso real'], a: 0, e: 'De cada requerimiento se deriva un conjunto de pruebas.' },
        { q: '¿Qué ventaja tiene la prueba de escenario?', o: ['Prueba varios requerimientos y sus combinaciones', 'Prueba cada requerimiento de forma aislada', 'Mide el rendimiento exacto del sistema', 'No necesita un examinador que la ejecute'], a: 0, e: 'Por eso el escenario debe ser una historia realista y compleja.' },
        { q: 'En el escenario de Ana, ¿por qué el examinador comete errores deliberados?', o: ['Para ver cómo responde el sistema ante errores', 'Para medir la velocidad del cifrado de registros', 'Para ahorrar tiempo saltando pasos del escenario', 'Porque el escenario de Ana lo exige en cada paso'], a: 0, e: 'También anota problemas de rendimiento.' },
        { q: '¿Qué es un perfil operativo?', o: ['Pruebas con la mezcla real de trabajo', 'El perfil del usuario típico del sistema', 'La configuración del servidor de pruebas', 'El plan de pruebas aprobado por el cliente'], a: 0, e: 'Si el 90% es tipo A, la mayoría de las pruebas deben ser tipo A.' },
        { q: '¿Qué es una prueba de esfuerzo?', o: ['Estresar el sistema fuera de sus límites', 'Probar con la carga normal de trabajo', 'Probar el sistema sin usuarios conectados', 'Probar una sola transacción a la vez'], a: 0, e: 'Se sube gradualmente la carga hasta que falla.' },
        { q: '¿Qué debe demostrar una prueba de esfuerzo sobre la falla?', o: ['Que “falla poco”, sin corromper datos', 'Que el sistema nunca llega a fallar', 'Que falla rápido para liberar recursos', 'Que se reinicia solo y sin aviso'], a: 0, e: 'Además saca a la luz defectos ocultos.' },
      ],
      sources: [{ title: 'Ingeniería de Software, 9ª ed.', ref: 'Sommerville, cap. 8, págs. 224-227', points: ['Pruebas de versión, basadas en requerimientos, de escenario (figura 8.10) y de rendimiento.'] }],
    },
  );
})();
