package com.aulaplus.backend.repository;

import com.aulaplus.backend.model.Mensaje;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MensajeRepository extends MongoRepository<Mensaje, String> {
    List<Mensaje> findByDestinatarioIdOrderByFechaDesc(String destinatarioId);
    List<Mensaje> findByRemitenteIdOrderByFechaDesc(String remitenteId);
    List<Mensaje> findByDestinatarioIdAndLeidoFalse(String destinatarioId);
}
