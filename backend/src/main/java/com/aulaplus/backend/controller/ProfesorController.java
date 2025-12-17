package com.aulaplus.backend.controller;

import com.aulaplus.backend.model.Profesor;
import com.aulaplus.backend.service.ProfesorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/profesores")
@CrossOrigin(origins = "*")
@Tag(name = "Profesores", description = "API para gestión de profesores")
public class ProfesorController {

    @Autowired
    private ProfesorService profesorService;

    @GetMapping
    @Operation(summary = "Obtener todos los profesores")
    public ResponseEntity<List<Profesor>> getAllProfesores() {
        return ResponseEntity.ok(profesorService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener profesor por ID")
    public ResponseEntity<Profesor> getProfesorById(@PathVariable Long id) {
        Optional<Profesor> profesor = profesorService.findById(id);
        return profesor.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Crear nuevo profesor")
    public ResponseEntity<Profesor> createProfesor(@RequestBody Profesor profesor) {
        Profesor saved = profesorService.save(profesor);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar profesor existente")
    public ResponseEntity<Profesor> updateProfesor(@PathVariable Long id, @RequestBody Profesor profesorDetails) {
        Optional<Profesor> profesor = profesorService.findById(id);
        if (profesor.isPresent()) {
            Profesor updated = profesorService.update(id, profesorDetails);
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar profesor")
    public ResponseEntity<Void> deleteProfesor(@PathVariable Long id) {
        Optional<Profesor> profesor = profesorService.findById(id);
        if (profesor.isPresent()) {
            profesorService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
