package com.aulaplus.backend.service;

import com.aulaplus.backend.model.Profesor;
import com.aulaplus.backend.repository.ProfesorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@SuppressWarnings("null")
public class ProfesorService {
    
    @Autowired
    private ProfesorRepository profesorRepository;
    
    public List<Profesor> findAll() {
        return profesorRepository.findAll();
    }
    
    public Optional<Profesor> findById(Long id) {
        return profesorRepository.findById(id);
    }
    
    public Profesor save(Profesor profesor) {
        return profesorRepository.save(profesor);
    }
    
    public Profesor update(Long id, Profesor profesorDetails) {
        profesorDetails.setId(id);
        return profesorRepository.save(profesorDetails);
    }
    
    public void deleteById(Long id) {
        profesorRepository.deleteById(id);
    }
}
