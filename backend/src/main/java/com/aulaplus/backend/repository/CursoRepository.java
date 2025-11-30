package com.aulaplus.backend.repository;

import com.aulaplus.backend.model.Curso;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CursoRepository extends MongoRepository<Curso, String> {
    List<Curso> findByProfesorId(String profesorId);
    List<Curso> findByEstudiantesIdsContaining(String estudianteId);
}
