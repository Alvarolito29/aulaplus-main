package com.aulaplus.backend.repository;

import com.aulaplus.backend.model.Pedido;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PedidoRepository extends MongoRepository<Pedido, String> {
    List<Pedido> findByUsuarioId(String usuarioId);
    List<Pedido> findByEstado(String estado);
    List<Pedido> findByUsuarioIdAndEstado(String usuarioId, String estado);
}
