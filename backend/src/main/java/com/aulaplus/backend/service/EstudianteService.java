package com.aulaplus.backend.service;

import com.aulaplus.backend.model.Estudiante;
import com.aulaplus.backend.repository.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@SuppressWarnings("null")
public class EstudianteService {
    
    @Autowired
    private EstudianteRepository estudianteRepository;
    
    public List<Estudiante> findAll() {
        return estudianteRepository.findAll();
    }
    
    public Optional<Estudiante> findById(Long id) {
        return estudianteRepository.findById(id);
    }
    
    public Estudiante save(Estudiante estudiante) {
        return estudianteRepository.save(estudiante);
    }
    
    public Estudiante update(Long id, Estudiante estudianteDetails) {
        estudianteDetails.setId(id);
        return estudianteRepository.save(estudianteDetails);
    }
    
    public void deleteById(Long id) {
        estudianteRepository.deleteById(id);
    }
}
