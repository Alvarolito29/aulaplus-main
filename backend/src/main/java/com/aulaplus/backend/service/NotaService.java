package com.aulaplus.backend.service;

import com.aulaplus.backend.model.Nota;
import com.aulaplus.backend.repository.NotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@SuppressWarnings("null")
public class NotaService {
    
    @Autowired
    private NotaRepository notaRepository;
    
    public List<Nota> findAll() {
        return notaRepository.findAll();
    }
    
    public Optional<Nota> findById(Long id) {
        return notaRepository.findById(id);
    }
    
    public Nota save(Nota nota) {
        return notaRepository.save(nota);
    }
    
    public Nota update(Long id, Nota notaDetails) {
        notaDetails.setId(id);
        return notaRepository.save(notaDetails);
    }
    
    public void deleteById(Long id) {
        notaRepository.deleteById(id);
    }
}
