package com.aulaplus.backend.dto;

public class LoginResponse {
    private String id;
    private String email;
    private String nombre;
    private String rol;
    private String token;
    private String message;

    public LoginResponse() {}

    public LoginResponse(String id, String email, String nombre, String rol, String token) {
        this.id = id;
        this.email = email;
        this.nombre = nombre;
        this.rol = rol;
        this.token = token;
    }

    public LoginResponse(String message) {
        this.message = message;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
