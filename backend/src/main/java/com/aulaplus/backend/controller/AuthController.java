package com.aulaplus.backend.controller;

import com.aulaplus.backend.model.Usuario;
import com.aulaplus.backend.security.JwtUtil;
import com.aulaplus.backend.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@Tag(name = "Autenticación", description = "Endpoints de autenticación con JWT y roles")
public class AuthController {
    
    @Autowired
    private UsuarioService usuarioService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @PostMapping("/login")
    @Operation(summary = "Login de usuario", description = "Autentica usuario y retorna JWT token con rol")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Usuario usuario = usuarioService.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            
            if (!usuarioService.validatePassword(request.getPassword(), usuario.getPassword())) {
                return ResponseEntity.status(401).body(Map.of("error", "Credenciales inválidas"));
            }
            
            String token = jwtUtil.generateToken(usuario.getEmail(), usuario.getRol());
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("usuario", Map.of(
                    "id", usuario.getId(),
                    "email", usuario.getEmail(),
                    "nombre", usuario.getNombre(),
                    "rol", usuario.getRol()
            ));
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping("/register")
    @Operation(summary = "Registro de usuario", description = "Crea nuevo usuario con rol ESTUDIANTE por defecto")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            if (usuarioService.findByEmail(request.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("error", "El email ya está registrado"));
            }
            
            Usuario usuario = new Usuario();
            usuario.setEmail(request.getEmail());
            usuario.setPassword(request.getPassword());
            usuario.setNombre(request.getNombre());
            usuario.setRol(request.getRol() != null ? request.getRol() : "ESTUDIANTE");
            
            Usuario savedUsuario = usuarioService.save(usuario);
            
            String token = jwtUtil.generateToken(savedUsuario.getEmail(), savedUsuario.getRol());
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("usuario", Map.of(
                    "id", savedUsuario.getId(),
                    "email", savedUsuario.getEmail(),
                    "nombre", savedUsuario.getNombre(),
                    "rol", savedUsuario.getRol()
            ));
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    // DTOs internos
    static class LoginRequest {
        private String email;
        private String password;
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
    
    static class RegisterRequest {
        private String email;
        private String password;
        private String nombre;
        private String rol;
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = nombre; }
        public String getRol() { return rol; }
        public void setRol(String rol) { this.rol = rol; }
    }
}
