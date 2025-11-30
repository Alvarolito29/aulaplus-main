package com.aulaplus.backend.controller;

import com.aulaplus.backend.model.Usuario;
import com.aulaplus.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(request.getEmail());
        
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            
            // Verificar password (simple - sin encriptación por ahora)
            if (usuario.getPassword().equals(request.getPassword())) {
                Map<String, Object> response = new HashMap<>();
                response.put("token", UUID.randomUUID().toString());
                response.put("id", usuario.getId());
                response.put("email", usuario.getEmail());
                response.put("nombre", usuario.getNombre());
                response.put("rol", usuario.getRol());
                
                return ResponseEntity.ok(response);
            }
        }
        
        Map<String, String> error = new HashMap<>();
        error.put("message", "Email o contraseña incorrectos");
        return ResponseEntity.status(401).body(error);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Sesión cerrada exitosamente");
        return ResponseEntity.ok(response);
    }
}

class LoginRequest {
    private String email;
    private String password;

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}