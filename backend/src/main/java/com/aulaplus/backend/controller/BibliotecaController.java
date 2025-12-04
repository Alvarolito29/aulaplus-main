package com.aulaplus.backend.controller;

import com.aulaplus.backend.model.Libro;
import com.aulaplus.backend.model.Pedido;
import com.aulaplus.backend.repository.LibroRepository;
import com.aulaplus.backend.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/biblioteca")
@CrossOrigin(origins = "http://localhost:3000")
public class BibliotecaController {

    @Autowired
    private LibroRepository libroRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    // ========== LIBROS ==========
    
    @GetMapping("/libros")
    public ResponseEntity<List<Libro>> getAllLibros() {
        List<Libro> libros = libroRepository.findAll();
        return ResponseEntity.ok(libros);
    }

    @GetMapping("/libros/{id}")
    public ResponseEntity<Libro> getLibroById(@PathVariable String id) {
        return libroRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/libros/categoria/{categoria}")
    public ResponseEntity<List<Libro>> getLibrosByCategoria(@PathVariable String categoria) {
        List<Libro> libros = libroRepository.findByCategoria(categoria);
        return ResponseEntity.ok(libros);
    }

    @GetMapping("/libros/autor/{autor}")
    public ResponseEntity<List<Libro>> getLibrosByAutor(@PathVariable String autor) {
        List<Libro> libros = libroRepository.findByAutor(autor);
        return ResponseEntity.ok(libros);
    }

    @GetMapping("/libros/buscar")
    public ResponseEntity<List<Libro>> buscarLibros(@RequestParam String titulo) {
        List<Libro> libros = libroRepository.findByTituloContainingIgnoreCase(titulo);
        return ResponseEntity.ok(libros);
    }

    @GetMapping("/libros/disponibles")
    public ResponseEntity<List<Libro>> getLibrosDisponibles() {
        List<Libro> libros = libroRepository.findByDisponible(true);
        return ResponseEntity.ok(libros);
    }

    @PostMapping("/libros")
    public ResponseEntity<Libro> crearLibro(@RequestBody Libro libro) {
        Libro libroGuardado = libroRepository.save(libro);
        return ResponseEntity.ok(libroGuardado);
    }

    @PutMapping("/libros/{id}")
    public ResponseEntity<Libro> actualizarLibro(@PathVariable String id, @RequestBody Libro libro) {
        return libroRepository.findById(id)
            .map(libroExistente -> {
                libro.setId(id);
                Libro actualizado = libroRepository.save(libro);
                return ResponseEntity.ok(actualizado);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/libros/{id}")
    public ResponseEntity<Void> eliminarLibro(@PathVariable String id) {
        libroRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // ========== PEDIDOS ==========

    @PostMapping("/pedidos")
    public ResponseEntity<Pedido> crearPedido(@RequestBody Pedido pedido) {
        // Actualizar stock de libros
        for (Pedido.ItemPedido item : pedido.getItems()) {
            Optional<Libro> libroOpt = libroRepository.findById(item.getLibroId());
            if (libroOpt.isPresent()) {
                Libro libro = libroOpt.get();
                int nuevoStock = libro.getStock() - item.getCantidad();
                libro.setStock(nuevoStock);
                libro.setDisponible(nuevoStock > 0);
                libroRepository.save(libro);
            }
        }
        
        Pedido pedidoGuardado = pedidoRepository.save(pedido);
        return ResponseEntity.ok(pedidoGuardado);
    }

    @GetMapping("/pedidos")
    public ResponseEntity<List<Pedido>> getAllPedidos() {
        List<Pedido> pedidos = pedidoRepository.findAll();
        return ResponseEntity.ok(pedidos);
    }

    @GetMapping("/pedidos/{id}")
    public ResponseEntity<Pedido> getPedidoById(@PathVariable String id) {
        return pedidoRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/pedidos/usuario/{usuarioId}")
    public ResponseEntity<List<Pedido>> getPedidosByUsuario(@PathVariable String usuarioId) {
        List<Pedido> pedidos = pedidoRepository.findByUsuarioId(usuarioId);
        return ResponseEntity.ok(pedidos);
    }

    @GetMapping("/pedidos/estado/{estado}")
    public ResponseEntity<List<Pedido>> getPedidosByEstado(@PathVariable String estado) {
        List<Pedido> pedidos = pedidoRepository.findByEstado(estado);
        return ResponseEntity.ok(pedidos);
    }

    @PutMapping("/pedidos/{id}/estado")
    public ResponseEntity<Pedido> actualizarEstadoPedido(@PathVariable String id, @RequestParam String estado) {
        return pedidoRepository.findById(id)
            .map(pedido -> {
                pedido.setEstado(estado);
                Pedido actualizado = pedidoRepository.save(pedido);
                return ResponseEntity.ok(actualizado);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/pedidos/{id}")
    public ResponseEntity<Void> eliminarPedido(@PathVariable String id) {
        pedidoRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
