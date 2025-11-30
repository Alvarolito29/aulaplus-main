package com.aulaplus.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "cursos")
public class Curso {
    @Id
    private String id;
    
    private String nombre;
    private String categoria;
    private String descripcion;
    private List<String> objetivos;
    private List<String> programa;
    private List<String> tareas;
    private String profesorId;
    private String profesorNombre;
    private List<String> estudiantesIds;
    private String horario;

    public Curso() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    
    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }
    
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    
    public List<String> getObjetivos() { return objetivos; }
    public void setObjetivos(List<String> objetivos) { this.objetivos = objetivos; }
    
    public List<String> getPrograma() { return programa; }
    public void setPrograma(List<String> programa) { this.programa = programa; }
    
    public List<String> getTareas() { return tareas; }
    public void setTareas(List<String> tareas) { this.tareas = tareas; }
    
    public String getProfesorId() { return profesorId; }
    public void setProfesorId(String profesorId) { this.profesorId = profesorId; }
    
    public String getProfesorNombre() { return profesorNombre; }
    public void setProfesorNombre(String profesorNombre) { this.profesorNombre = profesorNombre; }
    
    public List<String> getEstudiantesIds() { return estudiantesIds; }
    public void setEstudiantesIds(List<String> estudiantesIds) { this.estudiantesIds = estudiantesIds; }
    
    public String getHorario() { return horario; }
    public void setHorario(String horario) { this.horario = horario; }
}
