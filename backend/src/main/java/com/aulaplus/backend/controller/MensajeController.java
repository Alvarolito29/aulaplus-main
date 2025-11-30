package com.aulaplus.backend.controller;

import com.aulaplus.backend.model.Mensaje;
import com.aulaplus.backend.repository.MensajeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/mensajes")
@CrossOrigin(origins = "http://localhost:3000")
public class MensajeController {

    @Autowired
    private MensajeRepository mensajeRepository;

    @GetMapping("/recibidos/{usuarioId}")
    public ResponseEntity<List<Mensaje>> getMensajesRecibidos(@PathVariable String usuarioId) {
        List<Mensaje> mensajes = mensajeRepository.findByDestinatarioIdOrderByFechaDesc(usuarioId);
        return ResponseEntity.ok(mensajes);
    }

    @GetMapping("/enviados/{usuarioId}")
    public ResponseEntity<List<Mensaje>> getMensajesEnviados(@PathVariable String usuarioId) {
        List<Mensaje> mensajes = mensajeRepository.findByRemitenteIdOrderByFechaDesc(usuarioId);
        return ResponseEntity.ok(mensajes);
    }

    @GetMapping("/no-leidos/{usuarioId}")
    public ResponseEntity<List<Mensaje>> getMensajesNoLeidos(@PathVariable String usuarioId) {
        List<Mensaje> mensajes = mensajeRepository.findByDestinatarioIdAndLeidoFalse(usuarioId);
        return ResponseEntity.ok(mensajes);
    }

    @PostMapping("/enviar")
    public ResponseEntity<Mensaje> enviarMensaje(@RequestBody Mensaje mensaje) {
        Mensaje mensajeGuardado = mensajeRepository.save(mensaje);
        return ResponseEntity.ok(mensajeGuardado);
    }

    @PutMapping("/marcar-leido/{mensajeId}")
    public ResponseEntity<Mensaje> marcarComoLeido(@PathVariable String mensajeId) {
        return mensajeRepository.findById(mensajeId)
            .map(mensaje -> {
                Mensaje actualizado = mensajeRepository.save(mensaje);
                return ResponseEntity.ok(actualizado);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{mensajeId}")
    public ResponseEntity<Void> eliminarMensaje(@PathVariable String mensajeId) {
        mensajeRepository.deleteById(mensajeId);
        return ResponseEntity.ok().build();
    }
}
