package com.aulaplus.backend.repository;

import com.aulaplus.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Busca usuario por email para el login
    Optional<Usuario> findByEmail(String email);
}