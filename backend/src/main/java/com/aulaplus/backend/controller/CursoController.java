package com.aulaplus.backend.controller;

import com.aulaplus.backend.model.Curso;
import com.aulaplus.backend.service.CursoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cursos")
@CrossOrigin(origins = "*")
@Tag(name = "Cursos", description = "API para gestión de cursos")
public class CursoController {

    @Autowired
    private CursoService cursoService;

    @GetMapping
    @Operation(summary = "Obtener todos los cursos")
    public ResponseEntity<List<Curso>> getAllCursos() {
        return ResponseEntity.ok(cursoService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener curso por ID")
    public ResponseEntity<Curso> getCursoById(@PathVariable Long id) {
        Optional<Curso> curso = cursoService.findById(id);
        return curso.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Crear nuevo curso")
    public ResponseEntity<Curso> createCurso(@RequestBody Curso curso) {
        Curso saved = cursoService.save(curso);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar curso existente")
    public ResponseEntity<Curso> updateCurso(@PathVariable Long id, @RequestBody Curso cursoDetails) {
        Optional<Curso> curso = cursoService.findById(id);
        if (curso.isPresent()) {
            Curso updated = cursoService.update(id, cursoDetails);
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar curso")
    public ResponseEntity<Void> deleteCurso(@PathVariable Long id) {
        Optional<Curso> curso = cursoService.findById(id);
        if (curso.isPresent()) {
            cursoService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
