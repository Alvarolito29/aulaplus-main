package com.aulaplus.backend.controller;

import com.aulaplus.backend.model.Asistencia;
import com.aulaplus.backend.service.AsistenciaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/asistencias")
@CrossOrigin(origins = "*")
@Tag(name = "Asistencias", description = "API para gestión de asistencias")
public class AsistenciaController {

    @Autowired
    private AsistenciaService asistenciaService;

    @GetMapping
    @Operation(summary = "Obtener todas las asistencias")
    public ResponseEntity<List<Asistencia>> getAllAsistencias() {
        return ResponseEntity.ok(asistenciaService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener asistencia por ID")
    public ResponseEntity<Asistencia> getAsistenciaById(@PathVariable Long id) {
        Optional<Asistencia> asistencia = asistenciaService.findById(id);
        return asistencia.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Crear nueva asistencia")
    public ResponseEntity<Asistencia> createAsistencia(@RequestBody Asistencia asistencia) {
        Asistencia saved = asistenciaService.save(asistencia);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar asistencia existente")
    public ResponseEntity<Asistencia> updateAsistencia(@PathVariable Long id, @RequestBody Asistencia asistenciaDetails) {
        Optional<Asistencia> asistencia = asistenciaService.findById(id);
        if (asistencia.isPresent()) {
            Asistencia updated = asistenciaService.update(id, asistenciaDetails);
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar asistencia")
    public ResponseEntity<Void> deleteAsistencia(@PathVariable Long id) {
        Optional<Asistencia> asistencia = asistenciaService.findById(id);
        if (asistencia.isPresent()) {
            asistenciaService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
