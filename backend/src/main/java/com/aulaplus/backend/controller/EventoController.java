package com.aulaplus.backend.controller;

import com.aulaplus.backend.model.Evento;
import com.aulaplus.backend.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "http://localhost:3000")
public class EventoController {

    @Autowired
    private EventoRepository eventoRepository;

    @GetMapping
    public ResponseEntity<List<Evento>> getAllEventos() {
        List<Evento> eventos = eventoRepository.findAll();
        return ResponseEntity.ok(eventos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Evento> getEventoById(@PathVariable String id) {
        return eventoRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/mes")
    public ResponseEntity<List<Evento>> getEventosByMes(
        @RequestParam int mes,
        @RequestParam int anio
    ) {
        LocalDate inicio = LocalDate.of(anio, mes, 1);
        LocalDate fin = inicio.plusMonths(1).minusDays(1);
        List<Evento> eventos = eventoRepository.findByFechaBetweenOrderByFechaAsc(inicio, fin);
        return ResponseEntity.ok(eventos);
    }

    @GetMapping("/fecha/{fecha}")
    public ResponseEntity<List<Evento>> getEventosByFecha(@PathVariable String fecha) {
        LocalDate localDate = LocalDate.parse(fecha);
        List<Evento> eventos = eventoRepository.findByFechaOrderByHoraAsc(localDate);
        return ResponseEntity.ok(eventos);
    }

    @GetMapping("/curso/{curso}")
    public ResponseEntity<List<Evento>> getEventosByCurso(@PathVariable String curso) {
        List<Evento> eventos = eventoRepository.findByCursoOrderByFechaAsc(curso);
        return ResponseEntity.ok(eventos);
    }

    @PostMapping
    public ResponseEntity<Evento> crearEvento(@RequestBody Evento evento) {
        Evento eventoGuardado = eventoRepository.save(evento);
        return ResponseEntity.ok(eventoGuardado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Evento> actualizarEvento(@PathVariable String id, @RequestBody Evento evento) {
        return eventoRepository.findById(id)
            .map(eventoExistente -> {
                Evento actualizado = eventoRepository.save(evento);
                return ResponseEntity.ok(actualizado);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEvento(@PathVariable String id) {
        eventoRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
