// src/data/eventosEscolares.js

const eventosEscolares = [
  // ⭐ MARZO ⭐
  { id: 1,  date: "2025-03-03", title: "Inicio del Año Escolar", course: "Todos" },
  { id: 2,  date: "2025-03-07", title: "Bienvenida de curso", course: "Todos" },
  { id: 3,  date: "2025-03-10", title: "Entrega Materiales JUNAEB", course: "Todos" },
  { id: 4,  date: "2025-03-14", title: "Prueba Diagnóstica Lenguaje", course: "6°B" },
  { id: 5,  date: "2025-03-17", title: "Convivencia curso", course: "6°B" },
  { id: 6,  date: "2025-03-21", title: "Prueba Diagnóstica Matemáticas", course: "6°B" },
  { id: 7,  date: "2025-03-24", title: "Visita Inspectora General", course: "" },
  { id: 8,  date: "2025-03-26", title: "Simulacro de Emergencia", course: "Todos" },
  { id: 9,  date: "2025-03-28", title: "Viernes Santo (Feriado)", course: "" },

  // ⭐ ABRIL ⭐
  { id: 10, date: "2025-04-02", title: "Control de Historia", course: "6°B" },
  { id: 11, date: "2025-04-05", title: "Ensayo Convivencia Escolar", course: "Todos" },
  { id: 12, date: "2025-04-10", title: "Acto Convivencia Escolar", course: "Todos" },
  { id: 13, date: "2025-04-12", title: "Charlas de Seguridad Escolar", course: "" },
  { id: 14, date: "2025-04-18", title: "Prueba de Ciencias", course: "6°B" },
  { id: 15, date: "2025-04-22", title: "Simce Práctico Interno", course: "6°B" },
  { id: 16, date: "2025-04-29", title: "Reunión de Apoderados", course: "6°B" },

  // ⭐ MAYO ⭐
  { id: 17, date: "2025-05-01", title: "Día del Trabajador (Feriado)", course: "" },
  { id: 18, date: "2025-05-06", title: "Charla Bullying", course: "Todos" },
  { id: 19, date: "2025-05-09", title: "Acto Día de la Madre", course: "Todos" },
  { id: 20, date: "2025-05-13", title: "Control Ciencias Naturales", course: "6°B" },
  { id: 21, date: "2025-05-16", title: "Prueba de Matemáticas", course: "6°B" },
  { id: 22, date: "2025-05-20", title: "Actividad Educativa: Convivencia", course: "" },
  { id: 23, date: "2025-05-27", title: "Salida Pedagógica Museo", course: "6°B" },

  // ⭐ JUNIO ⭐
  { id: 24, date: "2025-06-04", title: "Evaluación Intermedia", course: "6°B" },
  { id: 25, date: "2025-06-07", title: "Prueba de Lenguaje", course: "6°B" },
  { id: 26, date: "2025-06-14", title: "Taller Matemáticas", course: "6°B" },
  { id: 27, date: "2025-06-20", title: "Día de los Pueblos Originarios", course: "" },
  { id: 28, date: "2025-06-24", title: "We Tripantu (Feriado)", course: "" },
  { id: 29, date: "2025-06-30", title: "Fin Primer Semestre", course: "" },

  // ⭐ JULIO ⭐
  { id: 30, date: "2025-07-01", title: "Vacaciones de Invierno", course: "" },
  { id: 31, date: "2025-07-14", title: "Inicio Segundo Semestre", course: "" },

  // ⭐ AGOSTO ⭐
  { id: 32, date: "2025-08-02", title: "Taller Ciencias", course: "6°B" },
  { id: 33, date: "2025-08-08", title: "Prueba de Historia", course: "6°B" },
  { id: 34, date: "2025-08-14", title: "Asunción de la Virgen (Feriado)", course: "" },
  { id: 35, date: "2025-08-22", title: "Día del Niño Actividades", course: "" },
  { id: 36, date: "2025-08-29", title: "Control de Matemáticas", course: "6°B" },

  // ⭐ SEPTIEMBRE ⭐
  { id: 37, date: "2025-09-05", title: "Ensayo Acto 18", course: "Todos" },
  { id: 38, date: "2025-09-10", title: "Juegos Típicos", course: "" },
  { id: 39, date: "2025-09-12", title: "Acto Fiestas Patrias", course: "Todos" },
  { id: 40, date: "2025-09-18", title: "Fiestas Patrias (Feriado)", course: "" },
  { id: 41, date: "2025-09-19", title: "Glorias del Ejército (Feriado)", course: "" },

  // ⭐ OCTUBRE ⭐
  { id: 42, date: "2025-10-03", title: "Prueba de Ciencias", course: "6°B" },
  { id: 43, date: "2025-10-08", title: "Salida Parque Museo", course: "6°B" },
  { id: 44, date: "2025-10-12", title: "Encuentro de Dos Mundos (Feriado)", course: "" },
  { id: 45, date: "2025-10-24", title: "Salida Zoológico", course: "6°B" },

  // ⭐ NOVIEMBRE ⭐
  { id: 46, date: "2025-11-01", title: "Día de Todos los Santos (Feriado)", course: "" },
  { id: 47, date: "2025-11-08", title: "Prueba de Lenguaje", course: "6°B" },
  { id: 48, date: "2025-11-12", title: "Deportes Intercurso", course: "Todos" },
  { id: 49, date: "2025-11-15", title: "Kermesse", course: "Todos" },
  { id: 50, date: "2025-11-28", title: "Inicio Evaluaciones Finales", course: "6°B" },

  // ⭐ DICIEMBRE ⭐
  { id: 51, date: "2025-12-02", title: "Presentación Artística", course: "Todos" },
  { id: 52, date: "2025-12-05", title: "Gala de Fin de Año", course: "Todos" },
  { id: 53, date: "2025-12-10", title: "Entrega de Informes", course: "" },
  { id: 54, date: "2025-12-12", title: "Término del Año Escolar", course: "" },
];

export default eventosEscolares;