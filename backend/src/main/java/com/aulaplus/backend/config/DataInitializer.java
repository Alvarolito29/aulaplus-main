package com.aulaplus.backend.config;

import com.aulaplus.backend.model.*;
import com.aulaplus.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private LibroRepository libroRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Crear usuarios de prueba con passwords encriptadas
        Usuario estudiante = new Usuario();
        estudiante.setEmail("estudiante@test.com");
        estudiante.setPassword(passwordEncoder.encode("123"));
        estudiante.setNombre("Juan Pérez");
        estudiante.setRol("ESTUDIANTE");
        usuarioRepository.save(estudiante);

        Usuario profesor = new Usuario();
        profesor.setEmail("profesor@test.com");
        profesor.setPassword(passwordEncoder.encode("123"));
        profesor.setNombre("María González");
        profesor.setRol("PROFESOR");
        usuarioRepository.save(profesor);
        
        Usuario admin = new Usuario();
        admin.setEmail("admin@test.com");
        admin.setPassword(passwordEncoder.encode("admin"));
        admin.setNombre("Administrador");
        admin.setRol("ADMIN");
        usuarioRepository.save(admin);
        
        Usuario apoderado = new Usuario();
        apoderado.setEmail("apoderado@test.com");
        apoderado.setPassword(passwordEncoder.encode("123"));
        apoderado.setNombre("Carlos Rodríguez");
        apoderado.setRol("APODERADO");
        usuarioRepository.save(apoderado);

        // Crear libros
        for (int i = 1; i <= 30; i++) {
            Libro libro = new Libro();
            libro.setTitulo("Libro " + i);
            libro.setAutor("Autor " + i);
            libro.setCategoria(i % 2 == 0 ? "Literatura" : "Ciencia");
            libro.setIsbn("978-000000000" + i);
            libro.setEditorial("Editorial " + (i % 5 + 1));
            libro.setAnioPublicacion(2000 + i);
            libro.setDescripcion("Descripción del libro " + i);
            libro.setPortadaUrl(null);
            libro.setStock(1);
            libro.setPrecio(0.0);
            libro.setDisponible(true);
            libroRepository.save(libro);
        }

        System.out.println("✓ Datos iniciales cargados correctamente");
    }
}
