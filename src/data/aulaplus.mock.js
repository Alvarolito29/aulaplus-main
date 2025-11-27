// src/data/gaming.mock.js
export const CATEGORIES = ['Consolas', 'Periféricos', 'Componentes', 'Accesorios'];

export const cursos = [
  {
    id: 1,
    nombre: "Matemáticas 1° Medio",
    profesor: "María González",
    colegio: "Colegio San Alberto",
    estudiantes: 32,
    evaluaciones: [
      { id: 1, titulo: "Prueba Unidad 1", fecha: "2025-04-20", promedio: 5.4 },
      { id: 2, titulo: "Trabajo Integrador", fecha: "2025-05-05", promedio: 6.1 }
    ]
  },
  {
    id: 2,
    nombre: "Lenguaje 2° Medio",
    profesor: "Carlos Muñoz",
    colegio: "Colegio Futuro Chile",
    estudiantes: 28,
    evaluaciones: [
      { id: 1, titulo: "Lectura Comprensiva", fecha: "2025-03-12", promedio: 5.7 }
    ]
  }
];
