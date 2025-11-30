package com.aulaplus.backend.controller;

import com.aulaplus.backend.model.Usuario;
import com.aulaplus.backend.repository.UsuarioRepository;
import com.aulaplus.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(request.getEmail());
        
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            
            // Verificar password (simple - sin encriptación por ahora)
            if (usuario.getPassword().equals(request.getPassword())) {
                // Generar token JWT con información del usuario y su rol
                String token = jwtUtil.generateToken(
                    usuario.getId(),
                    usuario.getEmail(),
                    usuario.getNombre(),
                    usuario.getRol()
                );
                
                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
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
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        // Verificar si el email ya existe
        Optional<Usuario> existente = usuarioRepository.findByEmail(request.getEmail());
        if (existente.isPresent()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "El email ya está registrado");
            return ResponseEntity.status(400).body(error);
        }
        
        // Crear nuevo usuario
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setEmail(request.getEmail());
        nuevoUsuario.setPassword(request.getPassword());
        nuevoUsuario.setNombre(request.getNombre());
        nuevoUsuario.setRol(request.getRol().toLowerCase());
        
        usuarioRepository.save(nuevoUsuario);
        
        // Generar token JWT
        String token = jwtUtil.generateToken(
            nuevoUsuario.getId(),
            nuevoUsuario.getEmail(),
            nuevoUsuario.getNombre(),
            nuevoUsuario.getRol()
        );
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("id", nuevoUsuario.getId());
        response.put("email", nuevoUsuario.getEmail());
        response.put("nombre", nuevoUsuario.getNombre());
        response.put("rol", nuevoUsuario.getRol());
        
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

class RegisterRequest {
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
