package com.aulaplus.backend.controller;

import com.aulaplus.backend.model.Nota;
import com.aulaplus.backend.service.NotaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notas")
@CrossOrigin(origins = "*")
@Tag(name = "Notas", description = "API para gestión de notas y evaluaciones")
public class NotaController {

    @Autowired
    private NotaService notaService;

    @GetMapping
    @Operation(summary = "Obtener todas las notas")
    public ResponseEntity<List<Nota>> getAllNotas() {
        return ResponseEntity.ok(notaService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener nota por ID")
    public ResponseEntity<Nota> getNotaById(@PathVariable Long id) {
        Optional<Nota> nota = notaService.findById(id);
        return nota.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('PROFESOR', 'ADMIN')")
    @Operation(summary = "Crear nueva nota")
    public ResponseEntity<Nota> createNota(@RequestBody Nota nota) {
        Nota saved = notaService.save(nota);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('PROFESOR', 'ADMIN')")
    @Operation(summary = "Actualizar nota existente")
    public ResponseEntity<Nota> updateNota(@PathVariable Long id, @RequestBody Nota notaDetails) {
        Optional<Nota> nota = notaService.findById(id);
        if (nota.isPresent()) {
            Nota updated = notaService.update(id, notaDetails);
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Eliminar nota")
    public ResponseEntity<Void> deleteNota(@PathVariable Long id) {
        Optional<Nota> nota = notaService.findById(id);
        if (nota.isPresent()) {
            notaService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
