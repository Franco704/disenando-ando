/* Unidad V, clase 15: diagramas de interacción, notación, responsabilidades y patrones GRASP. Diapositivas 15, Larman 2ª ed. caps. 14, 15 y 16. */
(() => {
  const { LESSONS, h } = window.GUIDE;
  const { note, def, table, fig, lab, uml: U } = h;

  // realizarPago: colaboración y secuencia
  const colab = U.svg(560, 180, `
    ${U.msg(10, 40, 92, 40, 'realizarPago(efectivo)', { anchor: 'start', lx: 6, ly: 30, s: 1 })}
    ${U.obj(100, 26, 110, ':Registro', { cls: 'k-a', s: 1 })}
    ${U.ln([[210, 39], [350, 39]], { s: 2 })}${U.msg(226, 26, 330, 26, '1: realizarPago(efectivo)', { s: 2 })}
    ${U.obj(350, 26, 110, ':Venta', { s: 2 })}
    ${U.ln([[405, 52], [405, 130]], { s: 3 })}${U.msg(420, 66, 420, 122, '1.1: create(efectivo)', { anchor: 'start', lx: 428, ly: 98, s: 3 })}
    ${U.obj(350, 130, 110, ':Pago', { cls: 'k-ok', s: 3 })}`,
    'Diagrama de colaboración realizarPago: Registro envía realizarPago a Venta y Venta crea un Pago');
  const secuencia = fig(U.svg(560, 250, `
    ${U.obj(60, 10, 110, ':Registro', { cls: 'k-a' })}${U.obj(260, 10, 110, ':Venta' )}
    ${U.ln([[115, 36], [115, 240]], { dash: true })}${U.ln([[315, 36], [315, 240]], { dash: true })}
    <rect x="109" y="60" width="12" height="150" class="u-box"/><rect x="309" y="90" width="12" height="100" class="u-box"/>
    ${U.ln([[10, 64], [108, 64]], { end: 'ar' })}<text x="12" y="56" class="u-sm">realizarPago(efectivo)</text>
    ${U.ln([[121, 94], [308, 94]], { end: 'ar' })}<text x="130" y="86">realizarPago(efectivo)</text>
    ${U.ln([[321, 140], [440, 140]], { end: 'ar' })}<text x="330" y="132">create(efectivo)</text>${U.obj(440, 128, 100, ':Pago', { cls: 'k-ok' })}
    ${U.ln([[490, 154], [490, 240]], { dash: true })}`,
    'Diagrama de secuencia equivalente: líneas de vida verticales de Registro, Venta y Pago'),
    'El mismo escenario como diagrama de <strong>secuencia</strong>: forma de valla, cada objeto nuevo se agrega a la derecha y el tiempo corre hacia abajo. En el de <strong>colaboración</strong> los objetos se ubican en cualquier lugar, en forma de grafo, y el orden lo dan los números.');

  const numeracion = fig(U.svg(600, 200, `
    ${U.msg(4, 30, 52, 30, 'msj1()', { anchor: 'start', lx: 4, ly: 20 })}${U.obj(60, 18, 70, ':A', { cls: 'k-a' })}
    ${U.ln([[130, 31], [250, 31]])}${U.msg(146, 20, 236, 20, '1: msj2()', { ly: 14 })}${U.obj(250, 18, 70, ':B')}
    ${U.ln([[95, 44], [95, 150]])}${U.msg(108, 60, 108, 140, '2: msj4()', { anchor: 'start', lx: 114, ly: 104 })}${U.obj(60, 150, 70, ':C')}
    ${U.ln([[320, 31], [450, 31]])}${U.msg(336, 20, 436, 20, '1.1: msj3()', { ly: 14 })}${U.obj(450, 18, 70, ':D')}
    ${U.ln([[130, 163], [250, 163]])}${U.msg(146, 152, 236, 152, '2.1: msj5()', { ly: 146 })}${U.obj(250, 150, 70, ':E')}
    ${U.ln([[320, 163], [450, 163]])}${U.msg(336, 152, 436, 152, '2.2: msj6()', { ly: 146 })}${U.obj(450, 150, 70, ':F')}`,
    'Numeración legal anidada de mensajes en un diagrama de colaboración'),
    'Esquema “legal” de numeración (Larman, figura 15.12). El primer mensaje <strong>no se numera</strong>; los que envía A son 1 y 2; los que se envían para atender el 1 son 1.1, 1.2...; para atender el 2, 2.1 y 2.2.');

  const condicional = fig(U.svg(620, 190, `
    <text x="150" y="16" class="u-c u-sans u-b">Mensaje condicional</text>
    ${U.msg(4, 50, 52, 50, 'msj1()', { anchor: 'start', lx: 4, ly: 40 })}${U.obj(60, 38, 70, ':A', { cls: 'k-a' })}${U.ln([[130, 51], [230, 51]])}${U.msg(140, 40, 220, 40, '1 [color = rojo]: calcular()', { lx: 180, ly: 32 })}${U.obj(230, 38, 70, ':B')}
    <text x="460" y="16" class="u-c u-sans u-b">Caminos mutuamente excluyentes</text>
    ${U.msg(318, 90, 334, 90, '', {})}<text x="318" y="80" class="u-msgt">msj1()</text>${U.obj(340, 78, 50, ':E', { cls: 'k-a' })}
    ${U.ln([[390, 91], [545, 50]])}${U.obj(545, 36, 60, ':A')}<text x="455" y="52" class="u-msgt u-c">1a [test]: msj2()</text>
    ${U.ln([[390, 91], [545, 140]])}${U.obj(545, 130, 60, ':B')}<text x="455" y="142" class="u-msgt u-c">1b [no test]: msj4()</text>
    ${U.ln([[575, 156], [575, 176]])}<text x="568" y="186" class="u-msgt u-sm u-e">1b.1: msj5()</text>`,
    'Mensaje condicional y caminos mutuamente excluyentes con números de secuencia 1a y 1b'),
    'Izquierda: el mensaje se envía solo si la cláusula entre corchetes es verdadera. Derecha: 1a y 1b son excluyentes; ambos llevan el número 1 porque cualquiera puede ser el primero, y 1b.1 es el anidado de 1b.');

  const iteracion = fig(U.svg(620, 170, `
    <text x="140" y="16" class="u-c u-sans u-b">Iteración</text>
    ${U.msg(4, 50, 52, 50, 'msj1()', { anchor: 'start', lx: 4, ly: 40 })}${U.obj(60, 38, 70, ':A', { cls: 'k-a' })}${U.ln([[130, 51], [230, 51]])}${U.msg(140, 40, 220, 40, '1*: li := siguienteLinea()', { lx: 180, ly: 32 })}${U.obj(230, 38, 80, ':Venta')}
    <text x="460" y="16" class="u-c u-sans u-b">Multiobjeto</text>
    ${U.obj(340, 70, 70, ':Venta', { cls: 'k-a' })}${U.ln([[410, 83], [500, 83]])}<text x="494" y="78" class="u-sm">*</text>
    <rect x="508" y="64" width="96" height="26" rx="2" class="u-hd"/><rect x="500" y="70" width="96" height="26" rx="2" class="u-hd"/><text x="548" y="87" class="u-c u-tt u-un">li:LineaDeVenta</text>
    ${U.msg(420, 70, 490, 70, '1*: st := getSubtotal()', { lx: 455, ly: 60 })}
    <text x="140" y="120" class="u-c u-sm">* = se repite; admite cláusula *[i := 1..N]</text><text x="470" y="130" class="u-c u-sm">* al final del enlace: se envía a cada elemento</text>`,
    'Notación de iteración con asterisco y de multiobjeto como pila de rectángulos'),
    'Iteración con <code>*</code> y mensaje a un <strong>multiobjeto</strong> (colección, dibujada como una pila): el marcador <code>*</code> al final del enlace indica que se envía a cada elemento.');

  const otros = fig(U.svg(620, 150, `
    <text x="100" y="16" class="u-c u-sans u-b">Mensaje a self</text>${U.obj(40, 50, 110, ':Registro', { cls: 'k-a' })}<path d="M150 58C200 40 200 90 150 72" class="u-ln"/>${U.msg(170, 44, 186, 54, '')}<text x="200" y="62" class="u-msgt">1: limpiar()</text>
    <text x="400" y="16" class="u-c u-sans u-b">Creación y mensaje a una clase</text>${U.obj(300, 50, 90, ':Venta', { cls: 'k-a' })}${U.ln([[390, 63], [480, 63]])}<text x="435" y="38" class="u-msgt u-c">1: create(c) {new}</text>${U.obj(480, 50, 120, ':LineaDeVenta')}
    ${U.box(480, 110, 120, 'Venta', { h: 26 })}<text x="460" y="128" class="u-msgt u-e">2: d := getFecha()</text><text x="540" y="146" class="u-c u-sm">clase: nombre sin subrayar</text>`,
    'Mensaje a uno mismo, creación de instancias con create y mensaje a una clase'),
    'Mensajes a <strong>self</strong> (o this); <strong>creación</strong> con el mensaje create, que puede llevar parámetros iniciales y la propiedad <code>{new}</code>; y mensaje a una <strong>clase</strong> (nombre sin subrayar ni dos puntos) para invocar un método de clase.');

  LESSONS.push(
    {
      id: 'diagramas-de-interaccion',
      module: 'm12',
      title: 'Del análisis al diseño: diagramas de interacción',
      keywords: 'análisis diseño artefactos UML casos de uso modelo conceptual diagramas de secuencia del sistema contratos diagramas de interacción colaboración secuencia postcondiciones parejas',
      tldr: 'En el análisis se investiga el <strong>qué</strong>; el diseño empieza con los <mark>diagramas de interacción</mark>, que muestran cómo los objetos se comunican para cumplir los requisitos. Su punto de partida son las <strong>postcondiciones de los contratos</strong>. Hay dos: <strong>colaboración</strong> (grafo) y <strong>secuencia</strong> (valla). Son los que más esfuerzo creativo requieren.',
      goals: ['Ubicar los diagramas de interacción en el paso del análisis al diseño.', 'Diferenciar diagramas de colaboración y de secuencia.', 'Leer un diagrama de colaboración simple.', 'Explicar por qué vale la pena diseñar con diagramas.'],
      body: `
        <h2>Del análisis al diseño</h2>
        <p>En el <strong>análisis</strong> se prioriza conocer los requerimientos, conceptos y operaciones: el <strong>qué</strong>. Sus artefactos UML son los <strong>casos de uso</strong>, el <strong>modelo conceptual</strong> (de dominio), los <strong>diagramas de secuencia del sistema</strong> (eventos del sistema) y los <strong>contratos</strong> de las operaciones (con sus postcondiciones).</p>
        <p>Terminado el análisis empieza el <strong>diseño</strong>, cuya esencia son los <strong>diagramas de interacción</strong>: muestran gráficamente cómo los objetos se comunican entre sí para cumplir los requerimientos. Luego permiten elaborar los <strong>diagramas de clases de diseño</strong>, que definen clases implementables.</p>
        ${fig(U.svg(620, 120, `${['Casos de uso', 'Modelo\nconceptual', 'DSS: eventos\ndel sistema', 'Contratos\n(postcondiciones)', 'Diagramas de\ninteracción', 'Diagrama de\nclases de diseño'].map((t, i) => U.blk(4 + i * 103, 30, 94, 54, t, { cls: i === 4 ? 'k-a' : i === 5 ? 'k-ok' : '', bold: false })).join('')}${[0, 1, 2, 3, 4].map((i) => U.ln([[98 + i * 103, 57], [107 + i * 103, 57]], { end: 'ar' })).join('')}<text x="200" y="20" class="u-c u-sm">ANÁLISIS (qué)</text><text x="520" y="20" class="u-c u-sm">DISEÑO (cómo)</text><path d="M412 8V110" class="u-ln u-dash"/>`, 'Artefactos del análisis que alimentan los diagramas de interacción y el diagrama de clases de diseño'), 'Los diagramas de interacción son el inicio del diseño. En la práctica se hacen <strong>en paralelo y con sinergia</strong> con los diagramas de clases; se estudian por separado por claridad.')}
        ${def('Diagrama de interacción', 'Explica gráficamente las interacciones existentes entre las instancias. Su punto de partida es el cumplimiento de las postcondiciones de los contratos de una operación.', 'Larman, cap. 14, págs. 181-183.')}
        <p>Son los diagramas <strong>más importantes</strong> y los que requieren <strong>mayor esfuerzo creativo</strong>, porque en ellos se aplican técnicas de diseño: patrones, estilos y principios.</p>

        <h2>Colaboración y secuencia</h2>
        ${table(['Diagrama de colaboración', 'Diagrama de secuencia'], [['Interacciones en formato de <strong>grafo o red</strong>: los objetos se pueden colocar en cualquier lugar. El orden lo dan los <strong>números de secuencia</strong>.', 'Interacciones en formato de <strong>valla, cerca o muro</strong>: cada objeto nuevo se agrega a la derecha y el tiempo corre hacia abajo.']])}
        ${lab(0)}
        ${secuencia}

        <h2>¿Vale la pena?</h2>
        <p>Muchos no aprecian el valor de diseñar con diagramas: lleva tiempo y esfuerzo antes de programar. Aunque el diseño sea imperfecto y se modifique al programar, da un <strong>punto de partida consistente</strong> que inspira la programación. Larman recomienda crear los diagramas <strong>en parejas, no solo</strong>: diseñar colaborando es mejor y los compañeros aprenden rápido unos de otros.</p>
      `,
      labs: [{ type: 'steps', title: 'Leé el diagrama de colaboración realizarPago', intro: 'Recorrelo mensaje por mensaje, como lo leen las diapositivas.', fig: colab, steps: [
        { k: 'Mensaje inicial', t: 'Se envía el mensaje <code>realizarPago</code> a una instancia de <strong>Registro</strong>. No se identifica al emisor (es el evento del sistema que llega desde la interfaz). El primer mensaje <strong>no se numera</strong>.' },
        { k: 'Mensaje 1', t: 'La instancia de Registro envía <code>1: realizarPago(efectivo)</code> a una instancia de <strong>Venta</strong>, a través del enlace que las une.' },
        { k: 'Mensaje 1.1', t: 'La instancia de Venta <strong>crea</strong> una instancia de <strong>Pago</strong> con <code>1.1: create(efectivo)</code>. Es 1.1 porque se envía para atender el mensaje 1.' },
      ] }],
      quiz: [
        { q: '¿Cuál es el punto de partida de un diagrama de interacción?', o: ['Las postcondiciones de los contratos', 'El diagrama de clases de diseño terminado', 'El código fuente de las clases', 'Los casos de uso reales con sus pantallas'], a: 0, e: 'Los contratos dicen qué debe lograr cada operación.' },
        { q: '¿Qué diagrama muestra las interacciones en formato de grafo o red?', o: ['El de colaboración', 'El de secuencia', 'El de clases', 'El de despliegue'], a: 0, e: 'En el de secuencia, con forma de valla, cada objeto nuevo se agrega a la derecha.' },
        { q: '¿Qué artefactos permiten elaborar luego los diagramas de interacción?', o: ['Los diagramas de clases de diseño', 'Los casos de uso esenciales', 'Los contratos', 'Las pruebas de unidad'], a: 0, e: 'Primero interacción, luego (en paralelo) el DCD.' },
        { q: '¿Por qué los diagramas de interacción son los más importantes del diseño?', o: ['Allí se asignan responsabilidades aplicando patrones', 'Porque son los más fáciles y rápidos de dibujar', 'Porque las herramientas generan el código a partir de ellos', 'Porque son los que pide el cliente en cada entrega'], a: 0, e: 'Allí se asignan las responsabilidades.' },
        { q: '¿Qué recomienda Larman sobre quién crea los diagramas de interacción?', o: ['Crearlos en parejas, no solo', 'Que los haga el arquitecto solo', 'Que los haga el cliente', 'Que los genere una herramienta'], a: 0, e: 'Diseñar colaborando es mejor y se aprende más rápido.' },
        { q: 'En el diagrama realizarPago, ¿quién crea el Pago?', o: ['La Venta', 'El Registro', 'El Cajero', 'El Pago se crea solo'], a: 0, e: 'Es el mensaje 1.1: create(efectivo), enviado por Venta.' },
      ],
      sources: [{ title: 'UML y Patrones, 2ª ed.', ref: 'Larman, cap. 14, págs. 181-183', points: ['Del análisis al diseño; diagramas de interacción y su importancia.'] }],
    },

    {
      id: 'notacion-de-interaccion',
      module: 'm12',
      title: 'Notación de los diagramas de colaboración',
      keywords: 'instancias clases subrayado dos puntos expresión de mensaje return tipo enlace mensajes número de secuencia self this create new numeración legal condicional mutuamente excluyentes iteración asterisco multiobjeto mensaje a clase',
      tldr: 'Instancias <strong>subrayadas con “:”</strong>, clases sin subrayar. Cada mensaje tiene una expresión <code>retorno := mensaje(param: Tipo): TipoRetorno</code>, una flecha y un <mark>número de secuencia</mark> “legal” (1, 1.1, 1.2, 2...). Hay notación para self, creación, condiciones <code>[...]</code>, caminos excluyentes (1a, 1b), iteración <code>*</code>, multiobjetos y mensajes a clases.',
      goals: ['Representar clases e instancias.', 'Escribir expresiones de mensaje con tipos.', 'Numerar mensajes con el esquema legal.', 'Usar la notación de condición, exclusión, iteración, multiobjeto, self, creación y mensaje a clase.'],
      body: `
        <h2>Clases e instancias</h2>
        <p>Usan el mismo símbolo, un rectángulo. Las <strong>instancias</strong> llevan el nombre <strong>subrayado</strong> y precedido de <strong>“:”</strong> (<code>:Venta</code>), y pueden llevar un nombre adelante (<code>s1:Venta</code>). Las <strong>clases</strong> van sin subrayado ni “:”.</p>
        <h2>Expresión de mensaje</h2>
        <div class="eq"><span class="eq-l">Sintaxis</span><span class="eq-m"><code>return := mensaje(parametro : tipoParametro) : tipoRetorno</code></span></div>
        <p>La información de tipo se puede excluir si es obvia o no importa: <code>espec := getEspecProducto(id)</code>, <code>espec := getEspecProducto(id:ArticuloID)</code> o <code>espec := getEspecProducto(id:ArticuloID):EspecificacionDelProducto</code>.</p>
        <h2>Enlaces y mensajes</h2>
        <ul>
          <li>Un <strong>enlace</strong> es una conexión entre dos objetos que indica que es posible alguna forma de <strong>navegación y visibilidad</strong> entre ellos; es una instancia de una asociación. Por un mismo enlace pueden fluir muchos mensajes, en ambas direcciones.</li>
          <li>Cada <strong>mensaje</strong> se representa con su expresión, una pequeña flecha que indica la dirección y un <strong>número de secuencia</strong> que muestra el orden.</li>
        </ul>
        <h2>Numeración</h2>
        ${numeracion}
        <h2>Condiciones, exclusión e iteración</h2>
        ${condicional}
        ${iteracion}
        <h2>Self, creación y mensajes a clases</h2>
        ${otros}
        ${note('En el parcial se corrige la notación: instancias subrayadas con “:”, primer mensaje sin número, numeración anidada, <code>create</code> para crear, <code>*</code> para iterar y multiobjeto para colecciones. Un error común: numerar el primer mensaje como “1”.', 'exam')}
        ${lab(0)}
      `,
      labs: [{
        type: 'order', title: 'Ordená los mensajes según su número de secuencia',
        items: ['msj1() (mensaje inicial, sin número)', '1: msj2()', '1.1: msj3()', '1.2: msj4()', '2: msj5()', '2.1: msj6()'],
        explain: '<p>Se ejecuta en profundidad: para atender el 1 se envían el 1.1 y el 1.2; recién después se envía el 2, y para atenderlo el 2.1.</p>',
      }],
      quiz: [
        { q: '¿Cómo se representa una instancia de Venta en un diagrama de colaboración?', o: [':Venta subrayado', 'Venta sin subrayar', '«Venta»', 'Venta()'], a: 0, e: 'Sin subrayado ni dos puntos sería la clase.' },
        { q: '¿Qué número lleva el primer mensaje de un diagrama de colaboración?', o: ['Ninguno', '1', '0', '1.1'], a: 0, e: 'Los siguientes se numeran con el esquema legal.' },
        { q: '¿Qué indica un enlace entre dos objetos?', o: ['Que hay navegación y visibilidad posible entre ellos', 'Que uno de los objetos hereda del otro', 'Que ambos objetos son instancias de la misma clase', 'Que entre ellos se envía exactamente un mensaje'], a: 0, e: 'Es una instancia de una asociación y por él fluyen mensajes en ambas direcciones.' },
        { q: '¿Cómo se indica un mensaje que solo se envía si se cumple una condición?', o: ['Con [condición] tras el número de secuencia', 'Con un asterisco después del número', 'Con la propiedad {new} junto al mensaje', 'Con una flecha punteada en lugar de continua'], a: 0, e: 'Ejemplo: 1 [color = rojo]: calcular().' },
        { q: '¿Qué significan los números 1a y 1b?', o: ['Caminos condicionales mutuamente excluyentes', 'Mensajes que se envían en paralelo', 'Iteraciones', 'Creaciones'], a: 0, e: 'Llevan el mismo número porque cualquiera puede ser el primero.' },
        { q: '¿Qué símbolo indica iteración?', o: ['*', '#', '+', '!'], a: 0, e: 'Al final de un enlace a un multiobjeto, indica que se envía a cada elemento.' },
        { q: '¿Qué es un multiobjeto?', o: ['Un conjunto de instancias o colección', 'Un objeto con muchos atributos', 'Una clase abstracta', 'Un objeto que hereda de varias clases'], a: 0, e: 'Se dibuja como una pila de rectángulos.' },
        { q: '¿Cómo se envía un mensaje para invocar un método de clase?', o: ['Al rectángulo de la clase, sin subrayar', 'A una instancia subrayada de la clase', 'Con la propiedad {new} en el mensaje', 'Con un asterisco antes del nombre'], a: 0, e: 'Es un mensaje a una clase, no a una instancia.' },
        { q: 'En la expresión espec := getEspecProducto(id:ArticuloID):EspecificacionDelProducto, ¿qué es EspecificacionDelProducto?', o: ['El tipo de retorno', 'El tipo del parámetro', 'El nombre del mensaje', 'La variable de retorno'], a: 0, e: 'espec es la variable de retorno y ArticuloID el tipo del parámetro.' },
      ],
      sources: [{ title: 'UML y Patrones, 2ª ed.', ref: 'Larman, cap. 15, págs. 185-194', points: ['Notación de los diagramas de colaboración y de secuencia.'] }],
    },

    {
      id: 'responsabilidades-y-patrones',
      module: 'm12',
      title: 'Responsabilidades, patrones y GRASP',
      keywords: 'responsabilidad conocer hacer atributos objetos conexos derivar calcular iniciar acción controlar coordinar método patrón nombre problema solución GRASP general responsibility assignment software patterns Experto Creador Alta Cohesión Bajo Acoplamiento Controlador',
      tldr: 'Una <mark>responsabilidad</mark> es una obligación de un objeto, de <strong>conocer</strong> o de <strong>hacer</strong>; los métodos se implementan para cumplirlas. Asignarlas bien es el corazón del diseño, y los <mark>patrones GRASP</mark> codifican cómo hacerlo. Hay 5 básicos: <strong>Experto, Creador, Alta Cohesión, Bajo Acoplamiento y Controlador</strong>.',
      goals: ['Definir responsabilidad y sus dos categorías con sus 3 tipos cada una.', 'Diferenciar responsabilidad y método.', 'Definir patrón y sus ventajas.', 'Enumerar los 5 patrones GRASP básicos.'],
      body: `
        <h2>Responsabilidades</h2>
        <p>Un sistema orientado a objetos se compone de objetos que se envían mensajes para llevar a cabo operaciones. Los <strong>contratos</strong> dan una conjetura inicial de responsabilidades y postcondiciones; los <strong>diagramas de interacción</strong> describen la solución con objetos en interacción. Hay que dedicarles tiempo: las decisiones poco acertadas dan sistemas frágiles, difíciles de mantener, entender, reutilizar o extender.</p>
        ${def('Responsabilidad', 'Contrato u obligación de un tipo o clase: trabajo u obligación que debe cumplir un objeto.', 'Larman, cap. 16, págs. 201-207.')}
        ${table(['Responsabilidades de CONOCER', 'Responsabilidades de HACER'], [
          ['1. Sus datos privados encapsulados (atributos).', '1. Algo en sí mismo (modificar sus atributos, crear un objeto, hacer un cálculo).'],
          ['2. La existencia de objetos conexos.', '2. Iniciar una acción en otros objetos.'],
          ['3. Cosas que puede derivar o calcular.', '3. Controlar y coordinar actividades en otros objetos.'],
        ])}
        <p>“Una Venta es responsable de imprimirse” es un <strong>hacer</strong>; “una Venta debe conocer su fecha” es un <strong>conocer</strong> (por sus atributos).</p>
        ${note('<strong>Responsabilidad no es lo mismo que método.</strong> Los métodos se implementan para llevar a cabo responsabilidades, solos o en colaboración con otros métodos y objetos. Una responsabilidad puede necesitar varios métodos y varias clases.', 'warn')}
        <p>En UML, las responsabilidades se asignan al crear los diagramas de interacción, y se reflejan en los <strong>mensajes</strong> que reciben los objetos. Si :Venta debe imprimirse, recibe el mensaje <code>imprimir()</code>, que cumple con el método imprimir; para hacerlo colabora con las VentasLineaDeProducto pidiéndoles que se impriman. <strong>Los diagramas de interacción muestran las decisiones de asignación de responsabilidades.</strong></p>
        ${fig(U.svg(560, 130, `${U.msg(4, 40, 62, 40, 'imprimir()', { anchor: 'start', lx: 4, ly: 30 })}${U.obj(70, 28, 100, ':Venta', { cls: 'k-a' })}${U.ln([[170, 41], [330, 41]])}${U.msg(186, 30, 316, 30, '1*: [i := 1..N]: vlp := getVLP(i)', { ly: 22 })}
          <rect x="338" y="22" width="180" height="26" rx="2" class="u-hd"/><rect x="330" y="28" width="180" height="26" rx="2" class="u-hd"/><text x="420" y="45" class="u-c u-tt u-un">:VentasLineaDeProducto</text>
          ${U.ln([[120, 54], [120, 100], [330, 100]])}${U.msg(186, 90, 316, 90, '2*: [i := 1..N]: vlp.imprimir()', { ly: 84 })}${U.obj(330, 88, 140, 'vlp:VentasLineaDeProducto')}`, 'Venta cumple la responsabilidad de imprimirse colaborando con sus líneas'), 'La responsabilidad “imprimirse” se cumple con el método imprimir de Venta, que colabora con cada VentasLineaDeProducto.')}

        <h2>Patrones</h2>
        ${def('Patrón', 'Descripción de un problema y su solución que recibe un nombre y puede emplearse en otros contextos, con una sugerencia sobre la manera de usarlo en situaciones nuevas.', 'Larman, cap. 16.')}
        <p>Los patrones <strong>no contienen ideas nuevas</strong>: codifican conocimiento, expresiones y principios ya existentes y probados (cuanto más trillados y extendidos, mejor). Tienen un <strong>nombre sugestivo</strong> (mnemotécnico), con dos ventajas: <strong>1)</strong> facilita incorporar el concepto a nuestra memoria y <strong>2)</strong> facilita la <strong>comunicación</strong>: se discute una idea compleja con un nombre sencillo (poder de la abstracción).</p>
        ${table(['Nombre', 'Problema que resuelve', 'Solución'], [['Experto en Información', '¿Cuál es el principio básico para asignar responsabilidades a los objetos?', 'Asignar una responsabilidad a la clase que tiene la información necesaria para cumplirla.']])}

        <h2>GRASP</h2>
        <p><strong>GRASP</strong> = <em>General Responsibility Assignment Software Patterns</em>: patrones generales de software para asignar responsabilidades. Son un enfoque sistemático para aprender diseño de objetos, un apoyo para enseñarlo y una forma de razonar el diseño en forma <strong>sistemática, racional y explicable</strong>.</p>
        ${fig(U.svg(600, 110, `${['Experto', 'Creador', 'Alta\nCohesión', 'Bajo\nAcoplamiento', 'Controlador'].map((t, i) => U.blk(6 + i * 119, 20, 108, 64, t, { cls: i === 4 ? 'k-if' : 'k-a' })).join('')}<text x="300" y="104" class="u-c u-sm">los 5 patrones GRASP básicos · los avanzados: Polimorfismo, Fabricación Pura, Indirección y Variaciones Protegidas</text>`, 'Los cinco patrones GRASP básicos'), 'Los 5 GRASP básicos. Alta Cohesión y Bajo Acoplamiento son además <strong>principios evaluativos</strong>: se usan para comparar alternativas.')}
        ${lab(0)}
      `,
      labs: [{
        type: 'classify', title: '¿Responsabilidad de conocer o de hacer?',
        buckets: ['Conocer', 'Hacer'],
        items: [
          { t: 'Una Venta conoce su fecha.', b: 0 },
          { t: 'Una Venta crea sus líneas de venta.', b: 1 },
          { t: 'Una Venta conoce las líneas que la componen.', b: 0 },
          { t: 'Una Venta calcula y conoce su total.', b: 0, why: 'Es algo que puede derivar o calcular: una responsabilidad de conocer.' },
          { t: 'El Registro coordina el proceso de la venta.', b: 1 },
          { t: 'Una Venta pide a cada línea que se imprima.', b: 1, why: 'Iniciar una acción en otros objetos.' },
        ],
      }],
      quiz: [
        { q: '¿Cuáles son las dos categorías de responsabilidades?', o: ['Conocer y hacer', 'Crear y destruir', 'Públicas y privadas', 'Funcionales y no funcionales'], a: 0, e: 'Larman las llama de saber o conocer y de hacer.' },
        { q: '“Conocer cosas que puede derivar o calcular” es una responsabilidad de...', o: ['Conocer', 'Hacer', 'Crear', 'Controlar'], a: 0, e: 'Las de conocer son: datos encapsulados, objetos conexos y cosas derivables.' },
        { q: '“Controlar y coordinar actividades en otros objetos” es una responsabilidad de...', o: ['Hacer', 'Conocer', 'Crear', 'Visibilidad'], a: 0, e: 'Las de hacer son: algo en sí mismo, iniciar acciones en otros y controlar y coordinar.' },
        { q: '¿Qué relación hay entre responsabilidad y método?', o: ['Los métodos se implementan para cumplir responsabilidades', 'Son sinónimos: cada responsabilidad es un método', 'Cada responsabilidad corresponde a exactamente un atributo', 'Los métodos son los que asignan las responsabilidades'], a: 0, e: 'Una responsabilidad puede requerir varios métodos y objetos.' },
        { q: '¿Qué afirmación sobre los patrones es correcta?', o: ['Codifican conocimiento ya probado, sin ideas nuevas', 'Siempre proponen soluciones originales y novedosas', 'Son algoritmos específicos de un lenguaje concreto', 'Solo sirven para decisiones de arquitectura'], a: 0, e: 'Cuanto más trillados y extendidos, mejor.' },
        { q: '¿Qué significa GRASP?', o: ['General Responsibility Assignment Software Patterns', 'Graphical Representation of Architecture and Software Patterns', 'Gang of Reusable Abstract Software Patterns', 'General Requirements Analysis Software Process'], a: 0, e: 'Patrones generales de software para asignar responsabilidades.' },
        { q: '¿Cuál NO es uno de los 5 patrones GRASP básicos?', o: ['Fachada', 'Experto', 'Creador', 'Controlador'], a: 0, e: 'Fachada es un patrón GoF. Los básicos son Experto, Creador, Alta Cohesión, Bajo Acoplamiento y Controlador.' },
        { q: '¿Dónde se ven reflejadas las decisiones de asignación de responsabilidades?', o: ['En los mensajes de los diagramas de interacción', 'En los pasos de los casos de uso esenciales', 'En las historias de la pila de producto', 'En los nodos del diagrama de despliegue'], a: 0, e: 'Cada mensaje que recibe un objeto refleja una responsabilidad asignada.' },
      ],
      sources: [{ title: 'UML y Patrones, 2ª ed.', ref: 'Larman, cap. 16, págs. 201-207', points: ['Responsabilidades y métodos; patrones; GRASP.'] }],
    },
  );
})();
