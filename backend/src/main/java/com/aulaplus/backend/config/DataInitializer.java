package com.aulaplus.backend.config;

import com.aulaplus.backend.model.Curso;
import com.aulaplus.backend.model.Evento;
import com.aulaplus.backend.model.Usuario;
import com.aulaplus.backend.model.Libro;
import com.aulaplus.backend.repository.CursoRepository;
import com.aulaplus.backend.repository.EventoRepository;
import com.aulaplus.backend.repository.UsuarioRepository;
import com.aulaplus.backend.repository.LibroRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(CursoRepository cursoRepository, EventoRepository eventoRepository, UsuarioRepository usuarioRepository, LibroRepository libroRepository) {
        return args -> {
            // Inicializar usuarios primero
            System.out.println("Inicializando usuarios en MongoDB...");
            initUsuarios(usuarioRepository);

            // Limpiar y reinicializar cursos siempre para asegurar las 9 materias
            System.out.println("Inicializando cursos en MongoDB...");
            if (cursoRepository.count() < 9) {
                cursoRepository.deleteAll();
                initCursos(cursoRepository);
            }

            if (eventoRepository.count() < 10) {
                System.out.println("Inicializando eventos en MongoDB...");
                initEventos(eventoRepository);
            }

            if (libroRepository.count() < 10) {
                System.out.println("Inicializando biblioteca en MongoDB...");
                initLibros(libroRepository);
            }
        };
    }

    private void initUsuarios(UsuarioRepository usuarioRepository) {
        // Crear o actualizar usuario estudiante
        Optional<Usuario> estudianteOpt = usuarioRepository.findByEmail("estudiante@aulaplus.com");
        if (!estudianteOpt.isPresent()) {
            Usuario estudiante = new Usuario();
            estudiante.setEmail("estudiante@aulaplus.com");
            estudiante.setPassword("password");
            estudiante.setNombre("Juan Pérez");
            estudiante.setRol("estudiante");
            usuarioRepository.save(estudiante);
            System.out.println("✓ Usuario estudiante creado");
        } else {
            Usuario estudiante = estudianteOpt.get();
            estudiante.setPassword("password"); // Asegurar contraseña correcta
            usuarioRepository.save(estudiante);
            System.out.println("✓ Usuario estudiante actualizado");
        }

        // Crear o actualizar usuario profesor
        Optional<Usuario> profesorOpt = usuarioRepository.findByEmail("profesor@aulaplus.com");
        if (!profesorOpt.isPresent()) {
            Usuario profesor = new Usuario();
            profesor.setEmail("profesor@aulaplus.com");
            profesor.setPassword("password");
            profesor.setNombre("María González");
            profesor.setRol("profesor");
            usuarioRepository.save(profesor);
            System.out.println("✓ Usuario profesor creado");
        } else {
            Usuario profesor = profesorOpt.get();
            profesor.setPassword("password"); // Asegurar contraseña correcta
            usuarioRepository.save(profesor);
            System.out.println("✓ Usuario profesor actualizado");
        }

        // Crear o actualizar usuario apoderado
        Optional<Usuario> apoderadoOpt = usuarioRepository.findByEmail("apoderado@aulaplus.com");
        if (!apoderadoOpt.isPresent()) {
            Usuario apoderado = new Usuario();
            apoderado.setEmail("apoderado@aulaplus.com");
            apoderado.setPassword("password");
            apoderado.setNombre("Carlos Muñoz");
            apoderado.setRol("apoderado");
            usuarioRepository.save(apoderado);
            System.out.println("✓ Usuario apoderado creado");
        } else {
            Usuario apoderado = apoderadoOpt.get();
            apoderado.setPassword("password"); // Asegurar contraseña correcta
            usuarioRepository.save(apoderado);
            System.out.println("✓ Usuario apoderado actualizado");
        }
    }

    private void initCursos(CursoRepository cursoRepository) {
        String estudianteId = "673bb9e4a1b2c3d4e5f6g7h9";
        String profesorId = "673bb9e4a1b2c3d4e5f6g7h8";

        List<Curso> cursos = Arrays.asList(
            createCurso("Historia", "Asignatura", "Historia Universal y de Chile", 
                estudianteId, profesorId, "María González", "Lunes 08:00-09:30, Miércoles 10:00-11:30"),
            
            createCurso("Lenguaje", "Asignatura", "Lenguaje y Comunicación", 
                estudianteId, profesorId, "Carlos Muñoz", "Martes 08:00-09:30, Jueves 10:00-11:30"),
            
            createCurso("Matemáticas", "Asignatura", "Matemáticas y Álgebra", 
                estudianteId, profesorId, "Patricia Rojas", "Lunes 10:00-11:30, Miércoles 14:00-15:30, Viernes 08:00-09:30"),
            
            createCurso("Inglés", "Asignatura", "English Language and Culture", 
                estudianteId, profesorId, "John Smith", "Martes 10:00-11:30, Jueves 14:00-15:30"),
            
            createCurso("Religión", "Asignatura", "Educación Religiosa", 
                estudianteId, profesorId, "Ana Martínez", "Viernes 10:00-11:30"),
            
            createCurso("Física", "Asignatura", "Física General", 
                estudianteId, profesorId, "Roberto Silva", "Lunes 14:00-15:30, Jueves 08:00-09:30"),
            
            createCurso("Biología", "Asignatura", "Ciencias Naturales y Biología", 
                estudianteId, profesorId, "Luis Vargas", "Martes 14:00-15:30, Viernes 14:00-15:30"),
            
            createCurso("Educación Física", "Asignatura", "Deportes y Actividad Física", 
                estudianteId, profesorId, "Diego Torres", "Miércoles 08:00-09:30, Viernes 10:00-11:30"),
            
            createCurso("Taller de Fútbol", "Taller", "Entrenamiento y técnicas de fútbol", 
                estudianteId, profesorId, "Marco Pérez", "Martes 16:00-17:30")
        );

        cursoRepository.saveAll(cursos);
        System.out.println("✓ " + cursos.size() + " cursos guardados");
    }

    private Curso createCurso(String nombre, String categoria, String descripcion, 
                              String estudianteId, String profesorId, String profesorNombre, String horario) {
        Curso curso = new Curso();
        curso.setNombre(nombre);
        curso.setCategoria(categoria);
        curso.setDescripcion(descripcion);
        curso.setEstudiantesIds(Arrays.asList(estudianteId));
        curso.setProfesorId(profesorId);
        curso.setProfesorNombre(profesorNombre);
        curso.setHorario(horario);
        return curso;
    }

    private void initEventos(EventoRepository eventoRepository) {
        List<Evento> eventos = Arrays.asList(
            // MARZO
            createEvento("2025-03-03", "Inicio del Año Escolar", "Todos", "importante", "Patio Principal", "08:00"),
            createEvento("2025-03-07", "Bienvenida de curso", "Todos", "evento", "Sala de clases", "09:00"),
            createEvento("2025-03-10", "Entrega Materiales JUNAEB", "Todos", "evento", "Oficina JUNAEB", "10:00"),
            createEvento("2025-03-14", "Prueba Diagnóstica Lenguaje", "6°B", "prueba", "Sala 6°B", "08:00"),
            createEvento("2025-03-17", "Convivencia curso", "6°B", "evento", "Patio", "14:00"),
            createEvento("2025-03-21", "Prueba Diagnóstica Matemáticas", "6°B", "prueba", "Sala 6°B", "08:00"),
            createEvento("2025-03-24", "Visita Inspectora General", "", "evento", "Oficina Dirección", "10:00"),
            createEvento("2025-03-26", "Simulacro de Emergencia", "Todos", "importante", "Todo el colegio", "11:00"),
            createEvento("2025-03-28", "Viernes Santo (Feriado)", "", "feriado", "", ""),

            // ABRIL
            createEvento("2025-04-02", "Control de Historia", "6°B", "control", "Sala 6°B", "08:00"),
            createEvento("2025-04-05", "Ensayo Convivencia Escolar", "Todos", "evento", "Patio Principal", "09:00"),
            createEvento("2025-04-10", "Acto Convivencia Escolar", "Todos", "importante", "Gimnasio", "10:00"),
            createEvento("2025-04-12", "Charlas de Seguridad Escolar", "", "evento", "Auditorio", "14:00"),
            createEvento("2025-04-18", "Prueba de Ciencias", "6°B", "prueba", "Sala 6°B", "08:00"),
            createEvento("2025-04-22", "Simce Práctico Interno", "6°B", "examen", "Sala 6°B", "08:00"),
            createEvento("2025-04-29", "Reunión de Apoderados", "6°B", "reunion", "Sala 6°B", "18:00"),

            // MAYO
            createEvento("2025-05-01", "Día del Trabajador (Feriado)", "", "feriado", "", ""),
            createEvento("2025-05-06", "Charla Bullying", "Todos", "evento", "Auditorio", "10:00"),
            createEvento("2025-05-09", "Acto Día de la Madre", "Todos", "importante", "Gimnasio", "11:00"),
            createEvento("2025-05-13", "Control Ciencias Naturales", "6°B", "control", "Sala 6°B", "08:00"),
            createEvento("2025-05-16", "Prueba de Matemáticas", "6°B", "prueba", "Sala 6°B", "08:00"),
            createEvento("2025-05-20", "Actividad Educativa: Convivencia", "", "evento", "Patio", "14:00"),
            createEvento("2025-05-27", "Salida Pedagógica Museo", "6°B", "salida", "Museo Nacional", "08:30"),

            // JUNIO
            createEvento("2025-06-04", "Evaluación Intermedia", "6°B", "examen", "Sala 6°B", "08:00"),
            createEvento("2025-06-07", "Prueba de Lenguaje", "6°B", "prueba", "Sala 6°B", "08:00"),
            createEvento("2025-06-14", "Taller Matemáticas", "6°B", "taller", "Sala 6°B", "15:00"),
            createEvento("2025-06-20", "Día de los Pueblos Originarios", "", "importante", "Patio", "10:00"),
            createEvento("2025-06-24", "We Tripantu (Feriado)", "", "feriado", "", ""),
            createEvento("2025-06-30", "Fin Primer Semestre", "", "importante", "", ""),

            // JULIO
            createEvento("2025-07-01", "Vacaciones de Invierno", "", "feriado", "", ""),
            createEvento("2025-07-14", "Inicio Segundo Semestre", "", "importante", "Patio Principal", "08:00"),

            // AGOSTO
            createEvento("2025-08-02", "Taller Ciencias", "6°B", "taller", "Laboratorio", "15:00"),
            createEvento("2025-08-08", "Prueba de Historia", "6°B", "prueba", "Sala 6°B", "08:00"),
            createEvento("2025-08-14", "Asunción de la Virgen (Feriado)", "", "feriado", "", ""),
            createEvento("2025-08-22", "Día del Niño Actividades", "", "evento", "Patio", "10:00"),
            createEvento("2025-08-29", "Control de Matemáticas", "6°B", "control", "Sala 6°B", "08:00"),

            // SEPTIEMBRE
            createEvento("2025-09-05", "Ensayo Acto 18", "Todos", "evento", "Patio", "09:00"),
            createEvento("2025-09-10", "Juegos Típicos", "", "evento", "Patio", "10:00"),
            createEvento("2025-09-12", "Acto Fiestas Patrias", "Todos", "importante", "Gimnasio", "10:00"),
            createEvento("2025-09-18", "Fiestas Patrias (Feriado)", "", "feriado", "", ""),
            createEvento("2025-09-19", "Glorias del Ejército (Feriado)", "", "feriado", "", ""),

            // OCTUBRE
            createEvento("2025-10-03", "Prueba de Ciencias", "6°B", "prueba", "Sala 6°B", "08:00"),
            createEvento("2025-10-08", "Salida Parque Museo", "6°B", "salida", "Parque Quinta Normal", "08:30"),
            createEvento("2025-10-12", "Encuentro de Dos Mundos (Feriado)", "", "feriado", "", ""),
            createEvento("2025-10-24", "Salida Zoológico", "6°B", "salida", "Zoológico Metropolitano", "08:30"),

            // NOVIEMBRE
            createEvento("2025-11-01", "Día de Todos los Santos (Feriado)", "", "feriado", "", ""),
            createEvento("2025-11-08", "Prueba de Lenguaje", "6°B", "prueba", "Sala 6°B", "08:00"),
            createEvento("2025-11-12", "Deportes Intercurso", "Todos", "evento", "Cancha", "14:00"),
            createEvento("2025-11-15", "Kermesse", "Todos", "importante", "Todo el colegio", "10:00"),
            createEvento("2025-11-28", "Inicio Evaluaciones Finales", "6°B", "examen", "Sala 6°B", "08:00"),

            // DICIEMBRE
            createEvento("2025-12-02", "Presentación Artística", "Todos", "evento", "Gimnasio", "18:00"),
            createEvento("2025-12-05", "Gala de Fin de Año", "Todos", "importante", "Gimnasio", "19:00"),
            createEvento("2025-12-10", "Entrega de Informes", "", "importante", "Oficina", "09:00"),
            createEvento("2025-12-12", "Término del Año Escolar", "", "importante", "Patio", "12:00")
        );

        eventoRepository.saveAll(eventos);
        System.out.println("✓ " + eventos.size() + " eventos guardados");
    }

    private void initLibros(LibroRepository libroRepository) {
        List<Libro> libros = Arrays.asList(
            new Libro("Cien años de soledad", "Gabriel García Márquez", "Literatura", "978-0307474728", 
                     "Editorial Sudamericana", 1967, "Una obra maestra de la literatura latinoamericana que narra la historia de la familia Buendía.", 
                     null, 15, 0.0),
            
            new Libro("1984", "George Orwell", "Ficción Distópica", "978-0451524935", 
                     "Secker & Warburg", 1949, "Una novela distópica sobre un futuro totalitario.", 
                     null, 20, 0.0),
            
            new Libro("El Principito", "Antoine de Saint-Exupéry", "Literatura Infantil", "978-0156012195", 
                     "Reynal & Hitchcock", 1943, "Un clásico de la literatura infantil sobre un pequeño príncipe que viaja por el universo.", 
                     null, 30, 0.0),
            
            new Libro("Don Quijote de la Mancha", "Miguel de Cervantes", "Clásicos", "978-8491050421", 
                     "Francisco de Robles", 1605, "La novela más influyente de la literatura española.", 
                     null, 12, 0.0),
            
            new Libro("Harry Potter y la piedra filosofal", "J.K. Rowling", "Fantasía", "978-0439708180", 
                     "Bloomsbury", 1997, "El inicio de la saga del joven mago Harry Potter.", 
                     null, 25, 0.0),
            
            new Libro("Sapiens: De animales a dioses", "Yuval Noah Harari", "Historia", "978-0062316097", 
                     "Debate", 2011, "Una breve historia de la humanidad desde la Edad de Piedra hasta la actualidad.", 
                     null, 18, 0.0),
            
            new Libro("El Alquimista", "Paulo Coelho", "Autoayuda", "978-0062315007", 
                     "HarperOne", 1988, "Una fábula sobre seguir tus sueños y escuchar tu corazón.", 
                     null, 22, 0.0),
            
            new Libro("Breve historia del tiempo", "Stephen Hawking", "Ciencia", "978-0553380163", 
                     "Bantam Books", 1988, "Una explicación accesible sobre el universo y sus misterios.", 
                     null, 10, 0.0),
            
            new Libro("La sombra del viento", "Carlos Ruiz Zafón", "Misterio", "978-0143034902", 
                     "Planeta", 2001, "Un joven descubre un libro que cambiará su vida en la Barcelona de posguerra.", 
                     null, 16, 0.0),
            
            new Libro("El código Da Vinci", "Dan Brown", "Thriller", "978-0307474278", 
                     "Doubleday", 2003, "Un thriller que mezcla arte, historia y conspiración religiosa.", 
                     null, 14, 0.0),
            
            new Libro("Cálculo: Una variable", "James Stewart", "Matemáticas", "978-1285740621", 
                     "Cengage Learning", 2015, "Libro de texto universitario de cálculo diferencial e integral.", 
                     null, 8, 0.0),
            
            new Libro("Física para ciencias e ingeniería", "Raymond Serway", "Física", "978-1305952300", 
                     "Cengage Learning", 2018, "Libro completo de física universitaria.", 
                     null, 6, 0.0),
            
            new Libro("El nombre del viento", "Patrick Rothfuss", "Fantasía", "978-0756404741", 
                     "DAW Books", 2007, "La historia de Kvothe, un héroe legendario.", 
                     null, 20, 0.0),
            
            new Libro("Crimen y Castigo", "Fiódor Dostoyevski", "Clásicos", "978-0486415871", 
                     "The Russian Messenger", 1866, "Una obra maestra sobre la moral y el arrepentimiento.", 
                     null, 11, 0.0),
            
            new Libro("Padre rico, padre pobre", "Robert Kiyosaki", "Finanzas", "978-1612680194", 
                     "Plata Publishing", 1997, "Lecciones sobre educación financiera y libertad económica.", 
                     null, 25, 0.0),
            
            new Libro("El hobbit", "J.R.R. Tolkien", "Fantasía", "978-0547928227", 
                     "George Allen & Unwin", 1937, "La aventura de Bilbo Bolsón en la Tierra Media.", 
                     null, 18, 0.0),
            
            new Libro("To Kill a Mockingbird", "Harper Lee", "Clásicos", "978-0061120084", 
                     "J.B. Lippincott & Co.", 1960, "Una historia sobre justicia racial en el sur de Estados Unidos.", 
                     null, 14, 0.0),
            
            new Libro("El señor de los anillos", "J.R.R. Tolkien", "Fantasía", "978-0544003415", 
                     "George Allen & Unwin", 1954, "La épica aventura para destruir el Anillo Único.", 
                     null, 12, 0.0),
            
            new Libro("Orgullo y Prejuicio", "Jane Austen", "Romance", "978-0141439518", 
                     "T. Egerton", 1813, "La historia de Elizabeth Bennet y el señor Darcy.", 
                     null, 20, 0.0),
            
            new Libro("El arte de la guerra", "Sun Tzu", "Filosofía", "978-1599869773", 
                     "Shambhala", -500, "Antiguo tratado militar chino sobre estrategia.", 
                     null, 30, 0.0),
            
            new Libro("Piensa y crece", "Napoleon Hill", "Autoayuda", "978-1585424337", 
                     "The Ralston Society", 1937, "Principios del éxito personal y financiero.", 
                     null, 22, 0.0),
            
            new Libro("El diario de Ana Frank", "Ana Frank", "Biografía", "978-0553296983", 
                     "Contact Publishing", 1947, "El diario de una niña judía durante el Holocausto.", 
                     null, 15, 0.0),
            
            new Libro("Los juegos del hambre", "Suzanne Collins", "Distopía", "978-0439023481", 
                     "Scholastic Press", 2008, "Una adolescente lucha por sobrevivir en un futuro distópico.", 
                     null, 25, 0.0),
            
            new Libro("Crónica de una muerte anunciada", "Gabriel García Márquez", "Literatura", "978-0307387455", 
                     "Editorial La Oveja Negra", 1981, "Una investigación sobre un crimen anunciado en un pueblo.", 
                     null, 17, 0.0),
            
            new Libro("La metamorfosis", "Franz Kafka", "Clásicos", "978-0486290300", 
                     "Kurt Wolff Verlag", 1915, "Un hombre despierta convertido en un insecto gigante.", 
                     null, 28, 0.0),
            
            new Libro("El retrato de Dorian Gray", "Oscar Wilde", "Clásicos", "978-0141439570", 
                     "Lippincott's Monthly Magazine", 1890, "Un hombre vende su alma para mantenerse joven.", 
                     null, 19, 0.0),
            
            new Libro("Fahrenheit 451", "Ray Bradbury", "Ciencia Ficción", "978-1451673319", 
                     "Ballantine Books", 1953, "En un futuro donde los libros están prohibidos.", 
                     null, 16, 0.0),
            
            new Libro("El gran Gatsby", "F. Scott Fitzgerald", "Clásicos", "978-0743273565", 
                     "Charles Scribner's Sons", 1925, "La historia del misterioso millonario Jay Gatsby.", 
                     null, 21, 0.0),
            
            new Libro("Drácula", "Bram Stoker", "Terror", "978-0486411095", 
                     "Archibald Constable", 1897, "La historia clásica del vampiro más famoso.", 
                     null, 13, 0.0),
            
            new Libro("Frankenstein", "Mary Shelley", "Terror", "978-0486282114", 
                     "Lackington, Hughes", 1818, "Un científico crea una criatura que cobra vida.", 
                     null, 15, 0.0)
        );

        libroRepository.saveAll(libros);
        System.out.println("✓ " + libros.size() + " libros guardados en la biblioteca");
    }

    private Evento createEvento(String fecha, String titulo, String curso, String tipo, String lugar, String hora) {
        Evento evento = new Evento();
        evento.setFecha(LocalDate.parse(fecha));
        evento.setTitulo(titulo);
        evento.setCurso(curso);
        evento.setTipo(tipo);
        evento.setLugar(lugar);
        if (hora != null && !hora.isEmpty()) {
            evento.setHora(LocalTime.parse(hora));
        }
        return evento;
    }
}
