package com.aulaplus.backend.service;

import com.aulaplus.backend.model.Libro;
import com.aulaplus.backend.repository.LibroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@SuppressWarnings("null")
public class LibroService {
    
    @Autowired
    private LibroRepository libroRepository;
    
    public List<Libro> findAll() {
        return libroRepository.findAll();
    }
    
    public Optional<Libro> findById(Long id) {
        return libroRepository.findById(id);
    }
    
    public Libro save(Libro libro) {
        return libroRepository.save(libro);
    }
    
    public Libro update(Long id, Libro libroDetails) {
        libroDetails.setId(id);
        return libroRepository.save(libroDetails);
    }
    
    public void deleteById(Long id) {
        libroRepository.deleteById(id);
    }
}
