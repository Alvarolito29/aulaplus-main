package com.aulaplus.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "libros")
public class Libro {
    
    @Id
    private String id;
    private String titulo;
    private String autor;
    private String categoria;
    private String isbn;
    private String editorial;
    private Integer anioPublicacion;
    private String descripcion;
    private String portadaUrl;
    private Integer stock;
    private Double precio;
    private Boolean disponible;

    public Libro() {
        this.disponible = true;
        this.stock = 0;
    }

    public Libro(String titulo, String autor, String categoria, String isbn, String editorial, 
                 Integer anioPublicacion, String descripcion, String portadaUrl, Integer stock, Double precio) {
        this.titulo = titulo;
        this.autor = autor;
        this.categoria = categoria;
        this.isbn = isbn;
        this.editorial = editorial;
        this.anioPublicacion = anioPublicacion;
        this.descripcion = descripcion;
        this.portadaUrl = portadaUrl;
        this.stock = stock;
        this.precio = precio;
        this.disponible = stock > 0;
    }

    // Getters y Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getEditorial() {
        return editorial;
    }

    public void setEditorial(String editorial) {
        this.editorial = editorial;
    }

    public Integer getAnioPublicacion() {
        return anioPublicacion;
    }

    public void setAnioPublicacion(Integer anioPublicacion) {
        this.anioPublicacion = anioPublicacion;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getPortadaUrl() {
        return portadaUrl;
    }

    public void setPortadaUrl(String portadaUrl) {
        this.portadaUrl = portadaUrl;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
        this.disponible = stock > 0;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public Boolean getDisponible() {
        return disponible;
    }

    public void setDisponible(Boolean disponible) {
        this.disponible = disponible;
    }
}
