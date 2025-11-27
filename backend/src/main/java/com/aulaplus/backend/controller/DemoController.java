package com.aulaplus.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/demo")
@CrossOrigin(origins = "http://localhost:3000")
public class DemoController {

    @GetMapping("/mensaje")
    public Map<String, Object> obtenerMensaje() {
        return Map.of(
                "mensaje", "Hola desde el backend Spring Boot 👋",
                "fechaHora", LocalDateTime.now().toString(),
                "detalle", "Este texto viene desde la API REST /api/demo/mensaje"
        );
    }
}
