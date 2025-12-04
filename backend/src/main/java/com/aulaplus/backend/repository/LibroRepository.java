package com.aulaplus.backend.repository;

import com.aulaplus.backend.model.Libro;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LibroRepository extends MongoRepository<Libro, String> {
    List<Libro> findByCategoria(String categoria);
    List<Libro> findByAutor(String autor);
    List<Libro> findByTituloContainingIgnoreCase(String titulo);
    List<Libro> findByDisponible(Boolean disponible);
    List<Libro> findByCategoriaAndDisponible(String categoria, Boolean disponible);
}
