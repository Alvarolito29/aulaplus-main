package com.aulaplus.backend.service;

import com.aulaplus.backend.model.Usuario;
import com.aulaplus.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Optional<Usuario> login(String email, String password) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
        
        if (usuario.isPresent() && usuario.get().getPassword().equals(password)) {
            return usuario;
        }
        
        return Optional.empty();
    }

    public String generateToken() {
        return UUID.randomUUID().toString();
    }
}
