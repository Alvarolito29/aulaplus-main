package com.aulaplus.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "pedidos")
public class Pedido {
    
    @Id
    private String id;
    private String usuarioId;
    private String usuarioNombre;
    private String usuarioEmail;
    private String usuarioRut;
    private List<ItemPedido> items;
    private Double total;
    private String estado; // pendiente, procesando, completado, cancelado
    private LocalDateTime fechaPedido;
    private LocalDateTime fechaEntrega;
    private String notasAdicionales;

    public Pedido() {
        this.fechaPedido = LocalDateTime.now();
        this.estado = "pendiente";
    }

    public static class ItemPedido {
        private String libroId;
        private String titulo;
        private String autor;
        private Integer cantidad;
        private Double precioUnitario;
        private Double subtotal;

        public ItemPedido() {}

        public ItemPedido(String libroId, String titulo, String autor, Integer cantidad, Double precioUnitario) {
            this.libroId = libroId;
            this.titulo = titulo;
            this.autor = autor;
            this.cantidad = cantidad;
            this.precioUnitario = precioUnitario;
            this.subtotal = cantidad * precioUnitario;
        }

        // Getters y Setters
        public String getLibroId() {
            return libroId;
        }

        public void setLibroId(String libroId) {
            this.libroId = libroId;
        }

        public String getTitulo() {
            return titulo;
        }

        public void setTitulo(String titulo) {
            this.titulo = titulo;
        }

        public String getAutor() {
            return autor;
        }

        public void setAutor(String autor) {
            this.autor = autor;
        }

        public Integer getCantidad() {
            return cantidad;
        }

        public void setCantidad(Integer cantidad) {
            this.cantidad = cantidad;
            if (this.precioUnitario != null) {
                this.subtotal = cantidad * this.precioUnitario;
            }
        }

        public Double getPrecioUnitario() {
            return precioUnitario;
        }

        public void setPrecioUnitario(Double precioUnitario) {
            this.precioUnitario = precioUnitario;
            if (this.cantidad != null) {
                this.subtotal = this.cantidad * precioUnitario;
            }
        }

        public Double getSubtotal() {
            return subtotal;
        }

        public void setSubtotal(Double subtotal) {
            this.subtotal = subtotal;
        }
    }

    // Getters y Setters principales
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(String usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getUsuarioNombre() {
        return usuarioNombre;
    }

    public void setUsuarioNombre(String usuarioNombre) {
        this.usuarioNombre = usuarioNombre;
    }

    public String getUsuarioEmail() {
        return usuarioEmail;
    }

    public void setUsuarioEmail(String usuarioEmail) {
        this.usuarioEmail = usuarioEmail;
    }

    public List<ItemPedido> getItems() {
        return items;
    }

    public void setItems(List<ItemPedido> items) {
        this.items = items;
        calcularTotal();
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public LocalDateTime getFechaPedido() {
        return fechaPedido;
    }

    public void setFechaPedido(LocalDateTime fechaPedido) {
        this.fechaPedido = fechaPedido;
    }

    public LocalDateTime getFechaEntrega() {
        return fechaEntrega;
    }

    public void setFechaEntrega(LocalDateTime fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
    }

    public String getNotasAdicionales() {
        return notasAdicionales;
    }

    public void setNotasAdicionales(String notasAdicionales) {
        this.notasAdicionales = notasAdicionales;
    }

    private void calcularTotal() {
        if (items != null) {
            this.total = items.stream()
                .mapToDouble(ItemPedido::getSubtotal)
                .sum();
        }
    }
}
