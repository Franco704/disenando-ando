# Diseñando Ando

Guía de estudio de **Diseño de Sistemas de Información 2026 (UTN-FRT)**, cátedra Ing. Juan Pablo Bustos Thames, con los diagramas en el centro: en la parte práctica de los parciales y del final hay que dibujarlos.

- **Primer parcial** (Unidades I a III, clases 1 a 12): diseño de sistemas vs. diseño de software, modelos de proceso, integración, plan vs. ágil, Manifiesto y XP, Scrum, diseño arquitectónico, patrones arquitectónicos, FURPS+, SAD, interfaces, paquetes y componentes, interfaces de usuario, diseño de la salida, casos de uso reales, formularios y GUI.
- **Segundo parcial** (Unidades IV a VI, clases 13 a 23): experiencia de usuario, diseño de procesos, diagramas de interacción, GRASP, patrones GoF, diagramas de colaboración, visibilidad, DCD, verificación y validación, pruebas y seguridad.
- **Integral** de dificultad máxima: 70 preguntas que cruzan unidades (se toman 25 al azar, con 90 minutos de reloj) y 4 casos prácticos tipo final resueltos, con grilla de corrección.
- **Videos de resumen** (`#/videos`): un video corto por lección (`videos/<id>.mp4`), separados por parcial y de corrido, con enlace a cada lección; cada lección tiene también el suyo arriba.
- **Parciales resueltos** (`#/parciales`): 21 parciales, recuperatorios e integrales reales de la cátedra (2018 a 2026), consigna por consigna. Las 160 consignas (teoría y práctica) tienen su resolución modelo, cargada como ejercicio en la lección que corresponde, con un ranking de lo que más se repite y qué unidades pesan más.
- **Prácticas de parcial resueltas**: báscula, banco con canje de puntos, cajero automático, Mundial 2022, venta de ropa, MedSys, ferretería, series de TV, clínica, AutoGo, padrón electoral y más, con modelo de dominio, DSS, contratos, casos de uso, despliegue, componentes, colaboración y DCD.
- 72 lecciones armadas a partir de las diapositivas de la cátedra y la bibliografía (Sommerville, Larman, Booch, Kendall y Kendall, Kniberg, Travis, Pressman), 10 de ellas nuevas para reforzar lo que piden los parciales: requisitos, prototipos y desarrollo evolutivo; sistemas distribuidos, middleware y ataques; diagramas de despliegue y de componentes; las reglas doradas de Mandel; modelo de dominio; casos de uso, DSS y contratos; secuencia, colaboración y diagramas de estados; la práctica del 2do parcial de punta a punta; nivel de confianza y metas de la prueba; y tensiones entre seguridad y usabilidad.
- 53 laboratorios interactivos: diagramas paso a paso (colaboraciones del alquiler de esquí, el total de la venta según Experto, ciclo de Scrum, TDD), clasificadores, ordenadores y calculadoras (velocidad del sprint, particiones y valores frontera).
- **Resúmenes de compañeros** (`#/resumenes`): el resumen del 2do parcial de **Malena Musumeci** (con el .docx original) y el resumen integral de **Juana Vicente**, teoría y práctica del 1er y 2do parcial, cada uno con sus diagramas y enlazado desde las lecciones de su parcial.
- Los TP 1, 2 y 3 resueltos, más ejercicios de diseño orientado a objetos con solución.
- 576 preguntas de repaso, cuestionario por módulo, simulacro por parcial, repaso de las falladas, galería de diagramas y fichas para memorizar.

Sitio en GitHub Pages: [franco704.github.io/disenando-ando](https://franco704.github.io/disenando-ando/)

No necesita instalación ni compilación: es HTML, CSS y JavaScript con módulos ES. Como los navegadores no cargan módulos desde `file://`, para usarlo sin internet descargá el repositorio, levantá un servidor estático en la carpeta (por ejemplo `python3 -m http.server`) y abrí `http://localhost:8000`. El progreso se guarda en el navegador de cada persona (claves `dsi-*`, las mismas de siempre).

Pruebas: `npm test` (carga el temario con los parciales, el integral, las fichas y los resúmenes; valida lecciones, preguntas y laboratorios, y que cada consigna de parcial tenga su resolución).

## Cómo está organizado

La estructura cuenta de qué trata la materia (arquitectura *screaming*):

```
index.html              armazón: barra, índice, dock inferior en móvil y las puntas de flecha de los diagramas UML
src/main.js             raíz de composición: rutas por hash (#/<lección>, #/quiz/<módulo>, #/simulacro/<parcial>, #/integral, #/parciales, #/fichas, #/resumenes, #/videos, #/diagramas) y vistas
src/temario/            lecciones por parcial (primer-parcial/ y segundo-parcial/, un archivo por tema), catálogo, ayudantes de redacción e índice
src/diagramas/          los diagramas UML y de bloques en SVG (uml.js), que usan las lecciones, los parciales y la portada
src/examenes/           parciales reales resueltos (suman ejercicios a las lecciones) e integral de dificultad máxima
src/resumenes/          resúmenes de compañeros (datos.js se genera desde el original; no editar a mano)
src/laboratorios/       laboratorios genéricos (clasificar, ordenar, calculadora y diagrama paso a paso) e índice que los monta
src/estudio/            progreso, preguntas, fichas de memoria y otras guías
src/vistas/             inicio, lección, cuestionarios (módulo, simulacro, repaso, integral) y recursos (parciales, fichas, resúmenes, videos, diagramas)
src/animaciones/        pantalla de entrada a cada módulo y glifo de cada lección
src/ui/ src/nucleo/     armazón e íconos; DOM, almacenamiento, formato y rutas
styles/                 tokens, base, armazón, contenido, estudio, laboratorios, vistas y animaciones
```

El diseño es *mobile-first*: en el celular todo se alcanza desde el dock inferior (Inicio, Índice, Parciales, Simulacro, Repasar) y el cajón, con el buscador, todas las herramientas y el índice completo; desde 1024 px el índice queda fijo y las herramientas pasan a la barra superior, y desde 1280 px aparece el riel con las secciones de la lección. La portada abre con el diagrama de colaboración del pago, dibujado con `src/diagramas/uml.js` y armado paso a paso con el patrón GRASP que justifica cada mensaje. Tipografía: Commissioner para el texto y Fragment Mono para los diagramas y los «estereotipos».

Si el generador de resúmenes vuelve a escribir `src/resumenes/datos.js`, tiene que dejar `export const RESUMENES = [ … ]` en lugar de asignar a `window.GUIDE`.

## También probá

### 2.º año

- [Integrando Ando](https://franco704.github.io/integrando-ando/): Análisis Matemático II ([repositorio](https://github.com/Franco704/integrando-ando))
- [Operando Ando](https://franco704.github.io/operando-ando/): Sistemas Operativos ([repositorio](https://github.com/Franco704/operando-ando))
- [Induciendo Ando](https://franco704.github.io/induciendo-ando/): Física II ([repositorio](https://github.com/Franco704/induciendo-ando))

### 3.er año

- [Consultando Ando](https://franco704.github.io/consultando-ando/): Gestión de Datos ([repositorio](https://github.com/Franco704/consultando-ando))
- [Backeando Ando](https://franco704.github.io/backeando-ando/): Desarrollo de Software, backend ([repositorio](https://github.com/Franco704/backeando-ando))
- [Fronteando Ando](https://franco704.github.io/fronteando-ando/): Desarrollo de Software, frontend ([repositorio](https://github.com/Franco704/fronteando-ando))
- [Iterando Ando](https://franco704.github.io/iterando-ando/): Matemática Superior ([repositorio](https://github.com/Franco704/iterando-ando))
- [Modulando Ando](https://franco704.github.io/modulando-ando/): Comunicación de Datos ([repositorio](https://github.com/Franco704/modulando-ando))
- [Probando Ando](https://franco704.github.io/probando-ando/): Probabilidad y Estadística ([repositorio](https://github.com/Franco704/probando-ando))
- [Economizando Ando](https://franco704.github.io/economizando-ando/): Economía ([repositorio](https://github.com/Franco704/economizando-ando))

## Agradecimientos

A **Mateo Rusconi**, autor original de las animaciones que esta guía hereda de Backeando Ando y Economizando Ando: la pantalla de entrada a cada tema, los glifos animados de las lecciones y los microefectos de los cuestionarios vienen de su "Laboratorio Frontend DSW".

A **Malena Musumeci**, autora del resumen del segundo parcial publicado en la sección Resúmenes.

A **Juana Vicente**, autora del resumen de teoría y práctica del primer y segundo parcial publicado en la sección Resúmenes.

A quien armó la recopilación **DISEÑO-COMPLETO** (autor anónimo): sus preguntas de parciales 2024-2025 agrupadas por clase sirvieron para revisar qué faltaba en la guía y de qué clase sale cada pregunta.
