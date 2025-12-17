package com.aulaplus.backend.service;

import com.aulaplus.backend.model.Curso;
import com.aulaplus.backend.repository.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@SuppressWarnings("null")
public class CursoService {
    
    @Autowired
    private CursoRepository cursoRepository;
    
    public List<Curso> findAll() {
        return cursoRepository.findAll();
    }
    
    public Optional<Curso> findById(Long id) {
        return cursoRepository.findById(id);
    }
    
    public Curso save(Curso curso) {
        return cursoRepository.save(curso);
    }
    
    public Curso update(Long id, Curso cursoDetails) {
        cursoDetails.setId(id);
        return cursoRepository.save(cursoDetails);
    }
    
    public void deleteById(Long id) {
        cursoRepository.deleteById(id);
    }
}
