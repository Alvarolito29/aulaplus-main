package com.aulaplus.backend.service;

import com.aulaplus.backend.model.Asistencia;
import com.aulaplus.backend.repository.AsistenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@SuppressWarnings("null")
public class AsistenciaService {
    
    @Autowired
    private AsistenciaRepository asistenciaRepository;
    
    public List<Asistencia> findAll() {
        return asistenciaRepository.findAll();
    }
    
    public Optional<Asistencia> findById(Long id) {
        return asistenciaRepository.findById(id);
    }
    
    public Asistencia save(Asistencia asistencia) {
        return asistenciaRepository.save(asistencia);
    }
    
    public Asistencia update(Long id, Asistencia asistenciaDetails) {
        asistenciaDetails.setId(id);
        return asistenciaRepository.save(asistenciaDetails);
    }
    
    public void deleteById(Long id) {
        asistenciaRepository.deleteById(id);
    }
}
