package com.aulaplus.backend.service;

import com.aulaplus.backend.model.Pedido;
import com.aulaplus.backend.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@SuppressWarnings("null")
public class PedidoService {
    
    @Autowired
    private PedidoRepository pedidoRepository;
    
    public List<Pedido> findAll() {
        return pedidoRepository.findAll();
    }
    
    public Optional<Pedido> findById(Long id) {
        return pedidoRepository.findById(id);
    }
    
    public List<Pedido> findByUsuarioId(Long usuarioId) {
        return pedidoRepository.findByUsuarioId(usuarioId);
    }
    
    public Pedido save(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }
    
    public Pedido update(Long id, Pedido pedidoDetails) {
        pedidoDetails.setId(id);
        return pedidoRepository.save(pedidoDetails);
    }
    
    public void deleteById(Long id) {
        pedidoRepository.deleteById(id);
    }
}
