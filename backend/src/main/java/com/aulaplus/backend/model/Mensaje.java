package com.aulaplus.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "mensajes")
public class Mensaje {
    @Id
    private String id;
    
    private String remitenteId;
    private String remitenteNombre;
    private String remitenteAsignatura;
    private String destinatarioId;
    private String destinatarioNombre;
    private String asunto;
    private String contenido;
    private LocalDateTime fecha;
    private boolean leido;
    private String mensajeOriginalId;

    public Mensaje() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getRemitenteId() { return remitenteId; }
    public void setRemitenteId(String remitenteId) { this.remitenteId = remitenteId; }
    
    public String getRemitenteNombre() { return remitenteNombre; }
    public void setRemitenteNombre(String remitenteNombre) { this.remitenteNombre = remitenteNombre; }
    
    public String getRemitenteAsignatura() { return remitenteAsignatura; }
    public void setRemitenteAsignatura(String remitenteAsignatura) { this.remitenteAsignatura = remitenteAsignatura; }
    
    public String getDestinatarioId() { return destinatarioId; }
    public void setDestinatarioId(String destinatarioId) { this.destinatarioId = destinatarioId; }
    
    public String getDestinatarioNombre() { return destinatarioNombre; }
    public void setDestinatarioNombre(String destinatarioNombre) { this.destinatarioNombre = destinatarioNombre; }
    
    public String getAsunto() { return asunto; }
    public void setAsunto(String asunto) { this.asunto = asunto; }
    
    public String getContenido() { return contenido; }
    public void setContenido(String contenido) { this.contenido = contenido; }
    
    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }
    
    public boolean isLeido() { return leido; }
    public void setLeido(boolean leido) { this.leido = leido; }
    
    public String getMensajeOriginalId() { return mensajeOriginalId; }
    public void setMensajeOriginalId(String mensajeOriginalId) { this.mensajeOriginalId = mensajeOriginalId; }
}
