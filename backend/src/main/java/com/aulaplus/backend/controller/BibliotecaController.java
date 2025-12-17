package com.aulaplus.backend.controller;

import com.aulaplus.backend.model.Libro;
import com.aulaplus.backend.model.Pedido;
import com.aulaplus.backend.service.LibroService;
import com.aulaplus.backend.service.PedidoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/biblioteca")
@CrossOrigin(origins = "*")
@Tag(name = "Biblioteca", description = "CRUD completo de libros y pedidos")
public class BibliotecaController {

    @Autowired
    private LibroService libroService;
    
    @Autowired
    private PedidoService pedidoService;

    // ============ LIBROS - CRUD COMPLETO ============
    
    @GetMapping("/libros")
    @Operation(summary = "Listar todos los libros")
    public ResponseEntity<List<Libro>> getLibros() {
        return ResponseEntity.ok(libroService.findAll());
    }
    
    @GetMapping("/libros/{id}")
    @Operation(summary = "Obtener libro por ID")
    public ResponseEntity<?> getLibroById(@PathVariable Long id) {
        return libroService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/libros")
    @PreAuthorize("hasAnyRole('ADMIN', 'PROFESOR')")
    @Operation(summary = "Crear nuevo libro")
    public ResponseEntity<Libro> createLibro(@RequestBody Libro libro) {
        return ResponseEntity.ok(libroService.save(libro));
    }
    
    @PutMapping("/libros/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'PROFESOR')")
    @Operation(summary = "Actualizar libro")
    public ResponseEntity<Libro> updateLibro(@PathVariable Long id, @RequestBody Libro libro) {
        return ResponseEntity.ok(libroService.update(id, libro));
    }
    
    @DeleteMapping("/libros/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Eliminar libro")
    public ResponseEntity<?> deleteLibro(@PathVariable Long id) {
        libroService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // ============ PEDIDOS - CRUD COMPLETO ============
    
    @GetMapping("/pedidos")
    @Operation(summary = "Listar todos los pedidos")
    public ResponseEntity<List<Pedido>> getAllPedidos() {
        return ResponseEntity.ok(pedidoService.findAll());
    }
    
    @GetMapping("/pedidos/{id}")
    @Operation(summary = "Obtener pedido por ID")
    public ResponseEntity<?> getPedidoById(@PathVariable Long id) {
        return pedidoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/pedidos")
    @PreAuthorize("hasAnyRole('ESTUDIANTE', 'PROFESOR', 'ADMIN')")
    @Operation(summary = "Crear nuevo pedido")
    public ResponseEntity<Pedido> createPedido(@RequestBody Pedido pedido) {
        return ResponseEntity.ok(pedidoService.save(pedido));
    }

    @GetMapping("/pedidos/usuario/{usuarioId}")
    @Operation(summary = "Listar pedidos por usuario")
    public ResponseEntity<List<Pedido>> getPedidosByUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(pedidoService.findByUsuarioId(usuarioId));
    }
    
    @PutMapping("/pedidos/{id}")
    @Operation(summary = "Actualizar pedido")
    public ResponseEntity<Pedido> updatePedido(@PathVariable Long id, @RequestBody Pedido pedido) {
        return ResponseEntity.ok(pedidoService.update(id, pedido));
    }
    
    @DeleteMapping("/pedidos/{id}")
    @Operation(summary = "Eliminar pedido")
    public ResponseEntity<?> deletePedido(@PathVariable Long id) {
        pedidoService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
