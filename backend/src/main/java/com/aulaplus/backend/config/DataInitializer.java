package com.aulaplus.backend.config;

import com.aulaplus.backend.model.Curso;
import com.aulaplus.backend.model.Evento;
import com.aulaplus.backend.model.Usuario;
import com.aulaplus.backend.repository.CursoRepository;
import com.aulaplus.backend.repository.EventoRepository;
import com.aulaplus.backend.repository.UsuarioRepository;
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
    CommandLineRunner initDatabase(CursoRepository cursoRepository, EventoRepository eventoRepository, UsuarioRepository usuarioRepository) {
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
