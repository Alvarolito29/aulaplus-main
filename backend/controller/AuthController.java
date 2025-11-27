package com.aulaplus.backend.controller;

import com.aulaplus.backend.model.Usuario;
import com.aulaplus.backend.repository.UsuarioRepository;
import com.aulaplus.backend.security.JwtService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // Permite conexión desde React
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    // Endpoint para LOGIN
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        var user = usuarioRepository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return ResponseEntity.ok(new AuthResponse(jwtToken, user.getRol().name()));
    }

    // Endpoint para REGISTRO (Para poder crear usuarios)
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        var user = Usuario.builder()
                .nombre(request.getNombre())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .rol(request.getRol() != null ? Usuario.Rol.valueOf(request.getRol()) : Usuario.Rol.USER)
                .build();

        usuarioRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return ResponseEntity.ok(new AuthResponse(jwtToken, user.getRol().name()));
    }
}

// Clases auxiliares para recibir datos (DTOs)
@Data
@NoArgsConstructor
@AllArgsConstructor
class LoginRequest {
    private String email;
    private String password;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class RegisterRequest {
    private String nombre;
    private String email;
    private String password;
    private String rol;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class AuthResponse {
    private String token;
    private String rol;
}