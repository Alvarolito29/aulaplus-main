package com.aulaplus.backend.controller;

import com.aulaplus.backend.model.Curso;
import com.aulaplus.backend.repository.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cursos")
@CrossOrigin(origins = "http://localhost:3000")
public class CursoController {

    @Autowired
    private CursoRepository cursoRepository;

    @GetMapping
    public ResponseEntity<List<Curso>> getAllCursos() {
        List<Curso> cursos = cursoRepository.findAll();
        return ResponseEntity.ok(cursos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Curso> getCursoById(@PathVariable String id) {
        return cursoRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/estudiante/{estudianteId}")
    public ResponseEntity<List<Curso>> getCursosByEstudiante(@PathVariable String estudianteId) {
        List<Curso> cursos = cursoRepository.findByEstudiantesIdsContaining(estudianteId);
        return ResponseEntity.ok(cursos);
    }

    @GetMapping("/profesor/{profesorId}")
    public ResponseEntity<List<Curso>> getCursosByProfesor(@PathVariable String profesorId) {
        List<Curso> cursos = cursoRepository.findByProfesorId(profesorId);
        return ResponseEntity.ok(cursos);
    }

    @PostMapping
    public ResponseEntity<Curso> crearCurso(@RequestBody Curso curso) {
        Curso cursoGuardado = cursoRepository.save(curso);
        return ResponseEntity.ok(cursoGuardado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Curso> actualizarCurso(@PathVariable String id, @RequestBody Curso curso) {
        return cursoRepository.findById(id)
            .map(cursoExistente -> {
                Curso actualizado = cursoRepository.save(curso);
                return ResponseEntity.ok(actualizado);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCurso(@PathVariable String id) {
        cursoRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
