package com.aulaplus.backend.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/demo")
public class DemoController {

    @GetMapping("/mensaje")
    public Map<String, String> getMensaje() {
        Map<String, String> response = new HashMap<>();
        response.put("mensaje", "¡Hola desde el backend con H2!");
        response.put("estado", "Activo");
        return response;
    }
}
