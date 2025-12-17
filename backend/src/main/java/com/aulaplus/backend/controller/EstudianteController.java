package com.aulaplus.backend.controller;

import com.aulaplus.backend.model.Estudiante;
import com.aulaplus.backend.service.EstudianteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/estudiantes")
@CrossOrigin(origins = "*")
@Tag(name = "Estudiantes", description = "API para gestión de estudiantes")
public class EstudianteController {

    @Autowired
    private EstudianteService estudianteService;

    @GetMapping
    @Operation(summary = "Obtener todos los estudiantes")
    public ResponseEntity<List<Estudiante>> getAllEstudiantes() {
        return ResponseEntity.ok(estudianteService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener estudiante por ID")
    public ResponseEntity<Estudiante> getEstudianteById(@PathVariable Long id) {
        Optional<Estudiante> estudiante = estudianteService.findById(id);
        return estudiante.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Crear nuevo estudiante")
    public ResponseEntity<Estudiante> createEstudiante(@RequestBody Estudiante estudiante) {
        Estudiante saved = estudianteService.save(estudiante);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar estudiante existente")
    public ResponseEntity<Estudiante> updateEstudiante(@PathVariable Long id, @RequestBody Estudiante estudianteDetails) {
        Optional<Estudiante> estudiante = estudianteService.findById(id);
        if (estudiante.isPresent()) {
            Estudiante updated = estudianteService.update(id, estudianteDetails);
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar estudiante")
    public ResponseEntity<Void> deleteEstudiante(@PathVariable Long id) {
        Optional<Estudiante> estudiante = estudianteService.findById(id);
        if (estudiante.isPresent()) {
            estudianteService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
