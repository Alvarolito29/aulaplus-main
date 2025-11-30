package com.aulaplus.backend.controller;

import com.aulaplus.backend.model.Contacto;
import com.aulaplus.backend.repository.ContactoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contacto")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactoController {

    @Autowired
    private ContactoRepository contactoRepository;

    @PostMapping
    public ResponseEntity<?> crearContacto(@RequestBody ContactoRequest request) {
        Contacto contacto = new Contacto();
        contacto.setNombre(request.getNombre());
        contacto.setEmail(request.getEmail());
        contacto.setTelefono(request.getTelefono());
        contacto.setAsunto(request.getAsunto());
        contacto.setMensaje(request.getMensaje());
        
        contactoRepository.save(contacto);
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Mensaje enviado exitosamente");
        response.put("id", contacto.getId());
        
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<Contacto>> obtenerTodos() {
        return ResponseEntity.ok(contactoRepository.findAll());
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Contacto>> obtenerPorEstado(@PathVariable String estado) {
        return ResponseEntity.ok(contactoRepository.findByEstado(estado));
    }
}

class ContactoRequest {
    private String nombre;
    private String email;
    private String telefono;
    private String asunto;
    private String mensaje;

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getAsunto() { return asunto; }
    public void setAsunto(String asunto) { this.asunto = asunto; }

    public String getMensaje() { return mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }
}
