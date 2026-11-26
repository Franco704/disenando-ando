/* Temario: los dos parciales (unidades) y sus 19 módulos (temas).
   tema = unidad del programa; clases = clases teóricas del cronograma 2026; stop = nombre corto para el recorrido de la portada. */
  export const PARCIALES = [
    { id: 'p1', title: 'Primer parcial', name: 'Metodologías, arquitectura e interfaces' },
    { id: 'p2', title: 'Segundo parcial', name: 'UX, procesos, patrones y pruebas' },
  ];

  export const MODULOS = [
    { id: 'm1', unit: 'p1', tema: 'I', clases: '1 y 2', title: 'Diseño de sistemas y de software', stop: 'Diseño', blurb: 'la materia, software profesional, 4 actividades, 3 problemas, prototipado y fundamentos' },
    { id: 'm2', unit: 'p1', tema: 'I', clases: '3 y 4', title: 'Procesos y metodologías', stop: 'Procesos', blurb: 'cascada, incremental, reutilización, integración, plan vs. ágil, Manifiesto y XP' },
    { id: 'm3', unit: 'p1', tema: 'I', clases: '5', title: 'Scrum', stop: 'Scrum', blurb: 'pila de producto, sprint, planning poker, velocidad, scrum diario, demo y retrospectiva' },
    { id: 'm4', unit: 'p1', tema: 'II', clases: '6', title: 'Diseño arquitectónico', stop: 'Arquitectura', blurb: 'qué es, decisiones según los requisitos no funcionales y vistas' },
    { id: 'm5', unit: 'p1', tema: 'II', clases: '6 y 7', title: 'Patrones arquitectónicos', stop: 'Estilos', blurb: 'capas, repositorio, cliente-servidor, tubería y filtro, transacciones y lenguaje' },
    { id: 'm6', unit: 'p1', tema: 'II', clases: '8 y 9', title: 'FURPS+, SAD y componentes', stop: 'SAD', blurb: 'requisitos de calidad, análisis arquitectural, interfaces, paquetes, componentes y puertos' },
    { id: 'm7', unit: 'p1', tema: 'III', clases: '10', title: 'Interfaces de usuario', stop: 'IU', blurb: 'factores humanos, principios, estilos de interacción, presentación, color y errores' },
    { id: 'm8', unit: 'p1', tema: 'III', clases: '11', title: 'Diseño de la salida', stop: 'Salidas', blurb: 'objetivos, tecnologías, factores, informes impresos y salida por pantalla' },
    { id: 'm9', unit: 'p1', tema: 'III', clases: '12', title: 'Entrada, formularios y GUI', stop: 'GUI', blurb: 'casos de uso reales, entrada efectiva, formularios, pantallas web y controles' },
    { id: 'm10', unit: 'p2', tema: 'IV', clases: '13', title: 'Experiencia de usuario', stop: 'UX', blurb: 'diseñador centrado en el usuario, rutas rojas, los 3 secretos y métricas' },
    { id: 'm11', unit: 'p2', tema: 'IV', clases: '14', title: 'Diseño de procesos', stop: 'Mapa', blurb: 'misión, clientes, mapa de procesos, indicadores, mejora y procesos en el DSI' },
    { id: 'm12', unit: 'p2', tema: 'V', clases: '15', title: 'Diagramas de interacción', stop: 'Interacción', blurb: 'del análisis al diseño, notación, responsabilidades y patrones GRASP' },
    { id: 'm13', unit: 'p2', tema: 'V', clases: '16', title: 'GRASP: Experto, Creador, Acoplamiento y Cohesión', stop: 'GRASP I', blurb: 'notación de clases y los cuatro patrones evaluativos básicos' },
    { id: 'm14', unit: 'p2', tema: 'V', clases: '17', title: 'GRASP: Controlador y patrones avanzados', stop: 'GRASP II', blurb: 'controlador, polimorfismo, fabricación pura, indirección y variaciones protegidas' },
    { id: 'm15', unit: 'p2', tema: 'V', clases: '18', title: 'Patrones GoF', stop: 'GoF', blurb: 'adaptador, factoría, singleton, fachada, estrategia y composite' },
    { id: 'm16', unit: 'p2', tema: 'V', clases: '19 y 20', title: 'Colaboración, visibilidad y DCD', stop: 'DCD', blurb: 'elaborar diagramas de colaboración, 4 visibilidades y diagramas de clases de diseño' },
    { id: 'm17', unit: 'p2', tema: 'VI', clases: '21', title: 'V&V y pruebas de unidad', stop: 'V&V', blurb: 'verificación vs. validación, estáticas y dinámicas, calidad y particiones' },
    { id: 'm18', unit: 'p2', tema: 'VI', clases: '22', title: 'Pruebas de componentes, sistema y versión', stop: 'Pruebas', blurb: 'interfaces, integración, TDD, requisitos, escenarios y rendimiento' },
    { id: 'm19', unit: 'p2', tema: 'VI', clases: '23', title: 'Pruebas de usuario, depuración y seguridad', stop: 'Seguridad', blurb: 'alfa, beta, aceptación, depuración, plan de pruebas y diseño seguro' },
  ];
