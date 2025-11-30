package com.aulaplus.backend.repository;

import com.aulaplus.backend.model.Evento;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventoRepository extends MongoRepository<Evento, String> {
    List<Evento> findByFechaBetweenOrderByFechaAsc(LocalDate inicio, LocalDate fin);
    List<Evento> findByCursoOrderByFechaAsc(String curso);
    List<Evento> findByFechaOrderByHoraAsc(LocalDate fecha);
}
