package com.aulaplus.backend.repository;

import com.aulaplus.backend.model.Contacto;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactoRepository extends MongoRepository<Contacto, String> {
    List<Contacto> findByEstado(String estado);
    List<Contacto> findByEmail(String email);
}
