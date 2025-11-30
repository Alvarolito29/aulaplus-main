# Documentación Técnica - Sistema AulaPlus

## 6) IE3.1.2 – Descripción del desarrollo del backend conectado a base de datos
**Ponderación: 12%**

### Conexión a la Base de Datos

El backend está desarrollado con **Spring Boot 3.2.3** y utiliza **MongoDB 8.2.2** como base de datos NoSQL.

#### Configuración de Conexión
**Archivo:** `backend/src/main/resources/application.properties`
```properties
spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
spring.data.mongodb.database=aulaplus_db
```

#### Modelos de Datos

##### 1. Usuario (`Usuario.java`)
```java
@Document(collection = "usuarios")
public class Usuario {
    @Id
    private String id;
    
    @Indexed(unique = true)
    private String email;
    
    private String password;
    private String nombre;
    private String rol; // estudiante, profesor, apoderado
    private List<String> cursosIds;
}
```

##### 2. Curso (`Curso.java`)
```java
@Document(collection = "cursos")
public class Curso {
    @Id
    private String id;
    private String nombre;
    private String tipo;
    private String descripcion;
    private String estudianteId;
    private String profesorId;
    private String profesorNombre;
    private String horario;
}
```

##### 3. Evento (`Evento.java`)
```java
@Document(collection = "eventos")
public class Evento {
    @Id
    private String id;
    private String titulo;
    private LocalDate fecha;
    private LocalTime hora;
    private String descripcion;
    private String tipo; // Clase, Evaluación, Evento Especial
    private String cursoId;
}
```

##### 4. Contacto (`Contacto.java`)
```java
@Document(collection = "contactos")
public class Contacto {
    @Id
    private String id;
    private String nombre;
    private String email;
    private String telefono;
    private String asunto;
    private String mensaje;
    private LocalDateTime fechaCreacion;
    private String estado; // pendiente, leido, respondido
}
```

#### Repositorios (Acceso a Datos)

Todos los repositorios extienden `MongoRepository` para operaciones CRUD automáticas:

```java
// UsuarioRepository.java
public interface UsuarioRepository extends MongoRepository<Usuario, String> {
    Optional<Usuario> findByEmail(String email);
}

// CursoRepository.java
public interface CursoRepository extends MongoRepository<Curso, String> {
    List<Curso> findByEstudianteId(String estudianteId);
}

// EventoRepository.java
public interface EventoRepository extends MongoRepository<Evento, String> {
    List<Evento> findByFechaBetween(LocalDate inicio, LocalDate fin);
}

// ContactoRepository.java
public interface ContactoRepository extends MongoRepository<Contacto, String> {
    List<Contacto> findByEstado(String estado);
    List<Contacto> findByEmail(String email);
}
```

### Lógica de Negocio

#### Inicialización de Datos (`DataInitializer.java`)
Al iniciar la aplicación, se ejecuta automáticamente la inicialización de datos:

1. **Usuarios**: Crea 3 usuarios predefinidos (estudiante, profesor, apoderado)
2. **Cursos**: Crea 9 materias (Historia, Lenguaje, Matemáticas, Inglés, Religión, Física, Biología, Ed. Física, Taller Fútbol)
3. **Eventos**: Crea 54 eventos en el calendario escolar

#### Autenticación JWT (`JwtUtil.java`)
- Genera tokens JWT firmados con clave secreta
- Token válido por 24 horas
- Incluye: userId, email, nombre, rol
- Algoritmo: HS256

### Decisiones Técnicas

1. **MongoDB vs SQL**: Se eligió MongoDB por su flexibilidad en el esquema de datos y facilidad de integración con Spring Boot
2. **Sin Encriptación de Contraseñas**: En desarrollo se usa texto plano. En producción se debe implementar BCrypt
3. **Repositorios**: Uso de interfaces que extienden MongoRepository para aprovechar métodos CRUD automáticos
4. **Índices**: Email único en usuarios para evitar duplicados
5. **Inicialización Automática**: CommandLineRunner para poblar la BD en cada inicio durante desarrollo

---

## 7) IE3.2.3 – Explicación de la implementación de los servicios API REST con CRUD + Swagger
**Ponderación: 12%**

### Endpoints REST Implementados

#### 1. API de Autenticación (`AuthController.java`)

**Base URL:** `/api/auth`

##### POST /api/auth/login
Autentica un usuario y genera token JWT.

**Request Body:**
```json
{
  "email": "estudiante@aulaplus.com",
  "password": "password"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "id": "673bb9e4a1b2c3d4e5f6g7h9",
  "email": "estudiante@aulaplus.com",
  "nombre": "Juan Pérez",
  "rol": "estudiante"
}
```

**Response (401 Unauthorized):**
```json
{
  "message": "Email o contraseña incorrectos"
}
```

##### POST /api/auth/register
Registra un nuevo usuario en el sistema.

**Request Body:**
```json
{
  "email": "nuevo@aulaplus.com",
  "password": "mipassword",
  "nombre": "Nuevo Usuario",
  "rol": "estudiante"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "id": "692c975e927a78581dc6aeb9",
  "email": "nuevo@aulaplus.com",
  "nombre": "Nuevo Usuario",
  "rol": "estudiante"
}
```

**Response (400 Bad Request):**
```json
{
  "message": "El email ya está registrado"
}
```

##### POST /api/auth/logout
Cierra la sesión del usuario.

**Response (200 OK):**
```json
{
  "message": "Sesión cerrada exitosamente"
}
```

#### 2. API de Cursos (`CursoController.java`)

**Base URL:** `/api/cursos`

##### GET /api/cursos
Obtiene todos los cursos disponibles.

**Response (200 OK):**
```json
[
  {
    "id": "673bb9e4a1b2c3d4e5f6g7h1",
    "nombre": "Matemáticas",
    "tipo": "Asignatura",
    "descripcion": "Matemáticas y Álgebra",
    "estudianteId": "673bb9e4a1b2c3d4e5f6g7h9",
    "profesorId": "673bb9e4a1b2c3d4e5f6g7h8",
    "profesorNombre": "Patricia Rojas",
    "horario": "Lunes 10:00-11:30, Miércoles 14:00-15:30, Viernes 08:00-09:30"
  }
]
```

##### GET /api/cursos/{id}
Obtiene un curso específico por ID.

**Response (200 OK):**
```json
{
  "id": "673bb9e4a1b2c3d4e5f6g7h1",
  "nombre": "Matemáticas",
  "tipo": "Asignatura",
  "descripcion": "Matemáticas y Álgebra",
  "estudianteId": "673bb9e4a1b2c3d4e5f6g7h9",
  "profesorId": "673bb9e4a1b2c3d4e5f6g7h8",
  "profesorNombre": "Patricia Rojas",
  "horario": "Lunes 10:00-11:30, Miércoles 14:00-15:30, Viernes 08:00-09:30"
}
```

#### 3. API de Eventos (`EventoController.java`)

**Base URL:** `/api/eventos`

##### GET /api/eventos
Obtiene todos los eventos del calendario.

**Response (200 OK):**
```json
[
  {
    "id": "673bb9e4a1b2c3d4e5f6g7h2",
    "titulo": "Matemáticas - Clase Regular",
    "fecha": "2025-12-02",
    "hora": "10:00:00",
    "descripcion": "Álgebra: Ecuaciones de segundo grado",
    "tipo": "Clase",
    "cursoId": "673bb9e4a1b2c3d4e5f6g7h1"
  }
]
```

##### GET /api/eventos/fecha
Obtiene eventos en un rango de fechas.

**Query Parameters:**
- `inicio`: Fecha inicio (formato: YYYY-MM-DD)
- `fin`: Fecha fin (formato: YYYY-MM-DD)

**Ejemplo:** `/api/eventos/fecha?inicio=2025-12-01&fin=2025-12-31`

**Response (200 OK):**
```json
[
  {
    "id": "673bb9e4a1b2c3d4e5f6g7h2",
    "titulo": "Matemáticas - Clase Regular",
    "fecha": "2025-12-02",
    "hora": "10:00:00",
    "descripcion": "Álgebra: Ecuaciones de segundo grado",
    "tipo": "Clase",
    "cursoId": "673bb9e4a1b2c3d4e5f6g7h1"
  }
]
```

#### 4. API de Contacto (`ContactoController.java`)

**Base URL:** `/api/contacto`

##### POST /api/contacto
Envía un mensaje de contacto.

**Request Body:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "telefono": "+569 1234 5678",
  "asunto": "Consulta General",
  "mensaje": "Quisiera información sobre el proceso de admisión"
}
```

**Response (200 OK):**
```json
{
  "message": "Mensaje enviado exitosamente",
  "id": "692c975e927a78581dc6aeb9"
}
```

##### GET /api/contacto
Obtiene todos los mensajes de contacto.

**Response (200 OK):**
```json
[
  {
    "id": "692c975e927a78581dc6aeb9",
    "nombre": "Juan Pérez",
    "email": "juan@email.com",
    "telefono": "+569 1234 5678",
    "asunto": "Consulta General",
    "mensaje": "Quisiera información sobre el proceso de admisión",
    "fechaCreacion": "2025-11-30T16:10:21.756",
    "estado": "pendiente"
  }
]
```

##### GET /api/contacto/estado/{estado}
Filtra mensajes por estado (pendiente, leido, respondido).

**Ejemplo:** `/api/contacto/estado/pendiente`

### Documentación con Swagger

#### Acceso a Swagger UI
URL: `http://localhost:8080/swagger-ui/index.html`

#### Configuración de Swagger
**Dependencia en pom.xml:**
```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.2.0</version>
</dependency>
```

Swagger genera automáticamente:
- Documentación interactiva de todos los endpoints
- Modelos de datos (schemas)
- Posibilidad de probar los endpoints directamente desde el navegador
- Especificación OpenAPI 3.0

#### Uso de Swagger
1. Acceder a `http://localhost:8080/swagger-ui/index.html`
2. Explorar los controladores disponibles
3. Expandir un endpoint para ver detalles
4. Hacer clic en "Try it out"
5. Ingresar parámetros/body
6. Ejecutar y ver la respuesta

### Anotaciones REST Utilizadas

```java
@RestController          // Define un controlador REST
@RequestMapping("/api")  // URL base del controlador
@CrossOrigin            // Permite peticiones desde otros dominios (React en localhost:3000)

@GetMapping             // Petición HTTP GET
@PostMapping            // Petición HTTP POST
@PutMapping             // Petición HTTP PUT
@DeleteMapping          // Petición HTTP DELETE

@RequestBody            // Lee datos del cuerpo de la petición
@PathVariable           // Lee parámetros de la URL
@RequestParam           // Lee query parameters
```

---

## 8) IE3.2.4 – Justificación de la integración backend–frontend (flujo de datos)
**Ponderación: 10%**

### Arquitectura de Integración

```
┌─────────────────┐         HTTP/REST API        ┌─────────────────┐
│                 │         JSON over HTTP       │                 │
│   React App     │ ←────────────────────────→  │  Spring Boot    │
│   (Port 3000)   │                              │   (Port 8080)   │
│                 │                              │                 │
└─────────────────┘                              └─────────────────┘
                                                          │
                                                          │ MongoDB Driver
                                                          ↓
                                                  ┌─────────────────┐
                                                  │    MongoDB      │
                                                  │  (Port 27017)   │
                                                  └─────────────────┘
```

### Flujo de Datos Completo

#### Ejemplo 1: Login de Usuario

**1. Frontend (Login.jsx) → Backend**
```javascript
const response = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        email: 'estudiante@aulaplus.com',
        password: 'password'
    })
});
```

**2. Backend (AuthController.java) → MongoDB**
```java
@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(request.getEmail());
    // MongoDB query: db.usuarios.findOne({email: "estudiante@aulaplus.com"})
    
    if (usuarioOpt.isPresent() && validarPassword()) {
        String token = jwtUtil.generateToken(...);
        return ResponseEntity.ok(response);
    }
}
```

**3. MongoDB → Backend → Frontend**
```javascript
// Response recibido en frontend
const data = await response.json();
// data = {token: "eyJ...", id: "673b...", email: "...", nombre: "...", rol: "estudiante"}

// Guardar en localStorage
localStorage.setItem('token', data.token);
localStorage.setItem('user', JSON.stringify(data));

// Redirigir según rol
if (data.rol === 'estudiante') navigate('/estudiantes');
```

#### Ejemplo 2: Obtener Lista de Cursos

**1. Frontend (Cursos.jsx)**
```javascript
useEffect(() => {
    fetch('http://localhost:8080/api/cursos')
        .then(res => res.json())
        .then(data => setCursos(data));
}, []);
```

**2. Backend (CursoController.java)**
```java
@GetMapping
public ResponseEntity<List<Curso>> obtenerTodos() {
    List<Curso> cursos = cursoRepository.findAll();
    // MongoDB: db.cursos.find()
    return ResponseEntity.ok(cursos);
}
```

**3. Frontend Renderiza**
```jsx
cursos.map(curso => (
    <Card key={curso.id}>
        <Card.Title>{curso.nombre}</Card.Title>
        <Card.Text>{curso.descripcion}</Card.Text>
    </Card>
))
```

#### Ejemplo 3: Enviar Formulario de Contacto

**1. Frontend (Contact.jsx)**
```javascript
const formData = {
    nombre: 'Juan Pérez',
    email: 'juan@email.com',
    telefono: '+569 1234 5678',
    asunto: 'Consulta General',
    mensaje: 'Quisiera información...'
};

const response = await fetch('http://localhost:8080/api/contacto', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
});
```

**2. Backend (ContactoController.java)**
```java
@PostMapping
public ResponseEntity<?> crearContacto(@RequestBody ContactoRequest request) {
    Contacto contacto = new Contacto();
    contacto.setNombre(request.getNombre());
    // ... set otros campos
    
    contactoRepository.save(contacto);
    // MongoDB: db.contactos.insertOne({...})
    
    return ResponseEntity.ok(response);
}
```

**3. Frontend Muestra Confirmación**
```javascript
if (response.ok) {
    setMsg('¡Mensaje enviado exitosamente!');
    form.reset();
}
```

### Configuración CORS

Para permitir que el frontend (localhost:3000) acceda al backend (localhost:8080):

**Backend (`WebConfig.java`):**
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

**Frontend (fetch calls):**
```javascript
fetch('http://localhost:8080/api/...', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // No requiere configuración especial gracias a CORS
})
```

### Justificación de Diseño

#### ¿Por qué Separar Frontend y Backend?

1. **Escalabilidad**: Frontend y backend pueden escalar independientemente
2. **Mantenibilidad**: Equipos diferentes pueden trabajar en paralelo
3. **Reutilización**: El backend puede servir múltiples frontends (web, móvil, desktop)
4. **Tecnología**: React para UI dinámica, Spring Boot para lógica robusta

#### ¿Por qué REST API?

1. **Estándar**: HTTP es universal, fácil de consumir desde cualquier cliente
2. **Stateless**: No mantiene estado entre peticiones (escalable)
3. **JSON**: Formato ligero y fácil de parsear en JavaScript
4. **Caché**: Se pueden cachear respuestas GET para mejorar rendimiento

#### ¿Por qué MongoDB?

1. **Flexibilidad**: Esquema dinámico, fácil de modificar modelos
2. **JSON Nativo**: Almacena documentos JSON, perfecto para APIs REST
3. **Performance**: Rápido para consultas de lectura
4. **Integración**: Spring Data MongoDB simplifica el acceso a datos

### Eficiencia del Flujo

- **Latencia**: ~10-50ms por petición HTTP en localhost
- **Payload**: JSON compacto (usuarios ~200 bytes, cursos ~400 bytes)
- **Conexiones**: Pool de conexiones MongoDB (100 conexiones máx)
- **Caché**: React usa estado local para evitar re-fetching innecesario

---

## 9) IE3.3.4 – Descripción de la autenticación con roles y JWT
**Ponderación: 10%**

### Arquitectura de Autenticación JWT

```
┌──────────────┐     1. Login      ┌──────────────┐
│   Frontend   │ ────────────────→ │   Backend    │
│   (React)    │                   │ (Spring Boot)│
└──────────────┘                   └──────────────┘
                                           │
                                           │ 2. Validar usuario
                                           ↓
                                   ┌──────────────┐
                                   │   MongoDB    │
                                   └──────────────┘
                                           │
                                           │ 3. Generar JWT
                                           ↓
┌──────────────┐   4. Token JWT    ┌──────────────┐
│   Frontend   │ ←──────────────── │   Backend    │
│ (localStorage)│                  │  (JwtUtil)   │
└──────────────┘                   └──────────────┘
        │
        │ 5. Peticiones con token
        │    Authorization: Bearer <token>
        ↓
┌──────────────┐                   ┌──────────────┐
│   Frontend   │ ────────────────→ │   Backend    │
│              │   GET /api/...    │   (Filter)   │
└──────────────┘                   └──────────────┘
                                           │
                                           │ 6. Validar JWT
                                           │    y extraer rol
                                           ↓
                                   ┌──────────────┐
                                   │  Autorizar   │
                                   │  por rol     │
                                   └──────────────┘
```

### Implementación de Roles

#### 1. Modelo de Usuario con Rol
```java
@Document(collection = "usuarios")
public class Usuario {
    @Id
    private String id;
    private String email;
    private String password;
    private String nombre;
    private String rol; // "estudiante", "profesor", "apoderado"
}
```

#### 2. Generación de Token JWT (`JwtUtil.java`)

```java
@Component
public class JwtUtil {
    private static final String SECRET = "aulaplus_secret_key_2025_muy_segura_y_larga_para_jwt_tokens";
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 24 horas

    public String generateToken(String userId, String email, String nombre, String rol) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("email", email);
        claims.put("nombre", nombre);
        claims.put("rol", rol); // ← ROL DEL USUARIO
        
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(KEY, SignatureAlgorithm.HS256)
                .compact();
    }
    
    public String extractRol(String token) {
        return (String) extractClaims(token).get("rol");
    }
    
    public boolean validateToken(String token, String email) {
        try {
            String tokenEmail = extractEmail(token);
            return (tokenEmail.equals(email) && !isTokenExpired(token));
        } catch (Exception e) {
            return false;
        }
    }
}
```

#### 3. Filtro de Autenticación (`JwtAuthenticationFilter.java`)

```java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {
        
        String authHeader = request.getHeader("Authorization");
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            
            try {
                String email = jwtUtil.extractEmail(token);
                String rol = jwtUtil.extractRol(token); // ← EXTRAER ROL
                
                if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    if (jwtUtil.validateToken(token, email)) {
                        // Crear autenticación con el rol del usuario
                        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + rol.toUpperCase());
                        UsernamePasswordAuthenticationToken authentication = 
                            new UsernamePasswordAuthenticationToken(email, null, Collections.singletonList(authority));
                        
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
            } catch (Exception e) {
                logger.error("Error al procesar JWT: " + e.getMessage());
            }
        }
        
        filterChain.doFilter(request, response);
    }
}
```

#### 4. Configuración de Seguridad (`SecurityConfig.java`)

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Endpoints públicos (no requieren autenticación)
                .requestMatchers("/api/auth/**", "/api/contacto").permitAll()
                .requestMatchers("/api/cursos", "/api/eventos").permitAll()
                
                // Endpoints protegidos por rol
                .requestMatchers("/api/estudiantes/**").hasRole("ESTUDIANTE")
                .requestMatchers("/api/profesores/**").hasRole("PROFESOR")
                .requestMatchers("/api/apoderados/**").hasRole("APODERADO")
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                
                // Cualquier otra petición requiere autenticación
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
}
```

### Frontend: Protección de Rutas por Rol

#### 1. Componente de Protección (`ProtectedRoute.jsx`)

```javascript
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const token = localStorage.getItem('token');

  // Si no hay usuario o token, redirigir al login
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay roles permitidos, verificar que el usuario tenga uno de esos roles
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user.rol?.toLowerCase();
    const hasPermission = allowedRoles.some(role => 
      userRole === role.toLowerCase()
    );

    if (!hasPermission) {
      // Usuario no tiene el rol requerido
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
```

#### 2. Configuración de Rutas (`routes.js`)

```javascript
const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/contact", element: <Contact /> },
  
  // Rutas protegidas por rol ESTUDIANTE
  { 
    path: "/estudiantes", 
    element: (
      <ProtectedRoute allowedRoles={['estudiante']}>
        <Estudiantes />
      </ProtectedRoute>
    )
  },
  
  // Rutas protegidas por rol APODERADO
  { 
    path: "/apoderados", 
    element: (
      <ProtectedRoute allowedRoles={['apoderado']}>
        <Apoderados />
      </ProtectedRoute>
    )
  },
  
  // Rutas protegidas por rol PROFESOR
  { 
    path: "/profesores", 
    element: (
      <ProtectedRoute allowedRoles={['profesor']}>
        <Profesores />
      </ProtectedRoute>
    )
  }
];
```

### Flujo Completo de Autenticación

#### 1. Login del Usuario
```
Usuario ingresa credenciales
  → Frontend: POST /api/auth/login
  → Backend valida email/password en MongoDB
  → Backend genera JWT con userId, email, nombre, ROL
  → Frontend recibe token y lo guarda en localStorage
  → Frontend redirige según rol del usuario
```

#### 2. Acceso a Recurso Protegido
```
Usuario intenta acceder a /profesores
  → Frontend: ProtectedRoute verifica localStorage
  → Si no hay token → Redirige a /login
  → Si hay token pero rol no es "profesor" → Redirige a /login
  → Si tiene el rol correcto → Muestra la página
```

#### 3. Petición al Backend con Token
```
Frontend hace petición a API protegida
  → Incluye header: Authorization: Bearer <token>
  → Backend: JwtAuthenticationFilter intercepta
  → Extrae y valida el token JWT
  → Extrae el rol del token
  → Crea autenticación con ROLE_<ROL>
  → SecurityConfig verifica si el rol tiene permiso
  → Si tiene permiso → Procesa petición
  → Si no tiene permiso → Retorna 403 Forbidden
```

### Seguridad del Sistema

#### Validación de Tokens
1. **Firma Digital**: Token firmado con clave secreta (HS256)
2. **Expiración**: Tokens válidos por 24 horas
3. **Claims**: Información del usuario incluida en el token
4. **Stateless**: No se almacenan tokens en el servidor

#### Manejo de Roles
1. **Backend Authoritative**: El rol está en MongoDB y en el JWT
2. **Frontend Defensive**: Oculta UI pero el backend siempre valida
3. **Granularidad**: Cada endpoint puede requerir roles específicos
4. **Extensible**: Fácil agregar nuevos roles (admin, coordinador, etc.)

### Usuarios de Prueba

```
Estudiante:
- Email: estudiante@aulaplus.com
- Password: password
- Rol: estudiante
- Acceso: /estudiantes

Profesor:
- Email: profesor@aulaplus.com
- Password: password
- Rol: profesor
- Acceso: /profesores, /profesores/clases-horario, /profesores/asistencia, etc.

Apoderado:
- Email: apoderado@aulaplus.com
- Password: password
- Rol: apoderado
- Acceso: /apoderados
```

### Ventajas del Sistema JWT con Roles

1. **Escalabilidad**: Stateless, no requiere sesiones en servidor
2. **Seguridad**: Tokens firmados, no modificables sin la clave secreta
3. **Flexibilidad**: Roles fácilmente extensibles
4. **Performance**: Una validación de token es más rápida que consultar BD
5. **Microservicios**: Token puede ser validado por múltiples servicios
6. **Mobile-Friendly**: Fácil de usar en apps móviles (solo guardar token)

---

## Resumen de Tecnologías Utilizadas

### Backend
- **Framework**: Spring Boot 3.2.3
- **Lenguaje**: Java 17
- **Base de Datos**: MongoDB 8.2.2
- **Seguridad**: Spring Security + JWT (jjwt 0.11.5)
- **Documentación**: Swagger/OpenAPI 3.0
- **Servidor**: Tomcat Embebido (puerto 8080)

### Frontend
- **Framework**: React 18
- **Routing**: React Router DOM v6
- **UI**: Bootstrap 5 + React Bootstrap
- **HTTP Client**: Fetch API nativo
- **Servidor**: Node.js (puerto 3000)

### Base de Datos
- **Motor**: MongoDB 8.2.2
- **Colecciones**: usuarios, cursos, eventos, contactos, mensajes
- **Índices**: Email único en usuarios
- **Driver**: Spring Data MongoDB

---

## Instrucciones de Ejecución

### Iniciar MongoDB
```bash
# Windows
mongod --dbpath C:\data\db

# Verificar conexión
mongosh
> show dbs
```

### Iniciar Backend
```bash
cd backend
mvnw.cmd spring-boot:run

# Backend corriendo en: http://localhost:8080
# Swagger UI en: http://localhost:8080/swagger-ui/index.html
```

### Iniciar Frontend
```bash
cd ..
npm start

# Frontend corriendo en: http://localhost:3000
```

### Probar el Sistema
1. Acceder a http://localhost:3000
2. Login con: `estudiante@aulaplus.com` / `password`
3. Explorar las funcionalidades según el rol
4. Probar las restricciones de acceso

---

## 10) IE3.3.5 – Sistema de gestión de sesiones en el frontend
**Ponderación: 8%**

### Gestión de Sesiones en React

El frontend implementa un sistema completo de gestión de sesiones utilizando **localStorage** para persistir la información del usuario y el token JWT.

#### 1. Almacenamiento de Sesión

Cuando un usuario inicia sesión exitosamente, se guarda la información en localStorage:

**Login.jsx:**
```javascript
const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            
            // Guardar token JWT en localStorage
            localStorage.setItem('token', data.token);
            
            // Guardar información del usuario en localStorage
            localStorage.setItem('user', JSON.stringify({
                id: data.id,
                email: data.email,
                nombre: data.nombre,
                rol: data.rol
            }));
            
            // Emitir evento para actualizar UI en tiempo real
            window.dispatchEvent(new Event('userChanged'));
            
            // Redirigir según el rol del usuario
            navigate('/');
        }
    } catch (error) {
        console.error('Error en login:', error);
    }
};
```

#### 2. Persistencia de Sesión

La sesión persiste incluso si el usuario refresca la página o cierra el navegador:

```javascript
// Al cargar cualquier componente protegido
const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');

if (!user || !token) {
    // No hay sesión activa, redirigir al login
    navigate('/login');
}
```

#### 3. Protección de Información

**ProtectedRoute.jsx:**
```javascript
const ProtectedRoute = ({ children, allowedRoles }) => {
  // Recuperar información de sesión
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const token = localStorage.getItem('token');

  // Validar existencia de sesión
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // Validar rol del usuario
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user.rol?.toLowerCase();
    const hasPermission = allowedRoles.some(role => 
      userRole === role.toLowerCase()
    );

    if (!hasPermission) {
      // Usuario no tiene permiso para esta sección
      alert(`Acceso denegado. Esta sección es solo para: ${allowedRoles.join(', ')}`);
      return <Navigate to="/" replace />;
    }
  }

  return children;
};
```

#### 4. Actualización Dinámica de UI

El sistema actualiza la interfaz en tiempo real cuando cambia el estado de la sesión:

**NavBar.jsx:**
```javascript
const NavBar = () => {
    const [user, setUser] = useState(null);

    // Función para verificar sesión actual
    const checkUser = () => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        // Verificar sesión al cargar
        checkUser();

        // Escuchar cambios en localStorage (otras pestañas)
        window.addEventListener('storage', checkUser);
        
        // Escuchar evento personalizado (misma pestaña)
        window.addEventListener('userChanged', checkUser);

        return () => {
            window.removeEventListener('storage', checkUser);
            window.removeEventListener('userChanged', checkUser);
        };
    }, []);

    return (
        <Navbar>
            {user ? (
                <>
                    <Navbar.Text>👤 {user.nombre}</Navbar.Text>
                    <Button onClick={handleLogout}>🚪 Cerrar Sesión</Button>
                </>
            ) : (
                <Button as={Link} to="/login">🔐 Iniciar Sesión</Button>
            )}
        </Navbar>
    );
};
```

#### 5. Cierre de Sesión

El sistema permite cerrar sesión correctamente limpiando toda la información almacenada:

**NavBar.jsx:**
```javascript
const handleLogout = async () => {
    try {
        // Llamar al endpoint de logout (opcional)
        await fetch('http://localhost:8080/api/auth/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    } finally {
        // Limpiar localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Emitir evento para actualizar UI
        window.dispatchEvent(new Event('userChanged'));
        
        // Redirigir al inicio
        navigate('/');
    }
};
```

#### 6. Manejo de Expiración de Token

Aunque el token JWT tiene una validez de 24 horas, el sistema puede detectar tokens expirados:

```javascript
const checkTokenExpiration = () => {
    const token = localStorage.getItem('token');
    
    if (token) {
        try {
            // Decodificar JWT (sin librerías externas)
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiration = payload.exp * 1000; // Convertir a milisegundos
            
            if (Date.now() >= expiration) {
                // Token expirado, cerrar sesión
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.dispatchEvent(new Event('userChanged'));
                return false;
            }
            return true;
        } catch (error) {
            // Token inválido
            return false;
        }
    }
    return false;
};
```

#### 7. Seguridad de la Sesión

**Medidas implementadas:**

1. **Token en localStorage**: Accesible solo desde el mismo dominio
2. **Información mínima**: Solo se guarda lo necesario (id, email, nombre, rol)
3. **No guardar contraseñas**: Nunca se almacena la contraseña en el frontend
4. **HTTPS en producción**: En producción se debe usar HTTPS para proteger el token
5. **Validación en backend**: El frontend solo controla la UI, el backend siempre valida

**Limitaciones conocidas (desarrollo):**
- localStorage es vulnerable a XSS (Cross-Site Scripting)
- En producción se recomienda usar httpOnly cookies
- No hay refresh tokens implementados

#### 8. Flujo Completo de Gestión de Sesión

```
1. INICIO DE SESIÓN
   Usuario ingresa credenciales
   → POST /api/auth/login
   → Backend valida y genera JWT
   → Frontend guarda token + user en localStorage
   → UI se actualiza mostrando usuario logueado
   → Redirige a página principal

2. NAVEGACIÓN (SESIÓN ACTIVA)
   Usuario navega por la aplicación
   → ProtectedRoute verifica localStorage
   → Si hay token válido → Permite acceso
   → Si no hay token → Redirige a login

3. REFRESH DE PÁGINA
   Usuario refresca el navegador (F5)
   → React se reinicia
   → Componentes leen localStorage
   → Si hay sesión válida → Restaura estado
   → UI muestra usuario logueado

4. CIERRE DE SESIÓN
   Usuario hace clic en "Cerrar Sesión"
   → handleLogout limpia localStorage
   → Emite evento 'userChanged'
   → UI se actualiza (oculta nombre, muestra "Iniciar Sesión")
   → Redirige a página principal

5. EXPIRACIÓN DE TOKEN (24 horas)
   Token expira automáticamente
   → Próxima petición al backend retorna 401
   → Frontend detecta error y limpia sesión
   → Usuario debe volver a iniciar sesión
```

#### 9. Ventajas del Sistema Implementado

1. **Persistencia**: La sesión persiste entre recargas de página
2. **Sincronización**: Múltiples pestañas se sincronizan automáticamente
3. **Simplicidad**: No requiere librerías externas de gestión de estado
4. **Performance**: localStorage es muy rápido (acceso síncrono)
5. **Compatibilidad**: Funciona en todos los navegadores modernos
6. **Debugging**: Fácil de inspeccionar en DevTools del navegador

---

## 11) IE3.3.6 – Explicación de las restricciones de acceso en el frontend
**Ponderación: 8%**

### Sistema de Restricciones por Rol en React

El frontend implementa múltiples capas de restricción de acceso para asegurar que solo usuarios autorizados puedan ver y acceder a ciertas funcionalidades.

#### 1. Componente de Protección por Rol

**ProtectedRoute.jsx** - Componente principal para proteger rutas:

```javascript
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  // Obtener información de sesión
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const token = localStorage.getItem('token');

  // CAPA 1: Verificar autenticación
  if (!user || !token) {
    // Usuario no autenticado → Redirigir a login
    return <Navigate to="/login" replace />;
  }

  // CAPA 2: Verificar autorización por rol
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user.rol?.toLowerCase();
    const hasPermission = allowedRoles.some(role => 
      userRole === role.toLowerCase()
    );

    if (!hasPermission) {
      // Usuario no tiene el rol requerido
      alert(`Acceso denegado. Esta sección es solo para: ${allowedRoles.join(', ')}`);
      return <Navigate to="/" replace />;
    }
  }

  // Usuario autorizado → Mostrar contenido
  return children;
};

export default ProtectedRoute;
```

#### 2. Configuración de Rutas Protegidas

**routes.js** - Definición de qué roles pueden acceder a qué rutas:

```javascript
import ProtectedRoute from "../components/ProtectedRoute";

const routes = [
  // Rutas públicas (sin restricción)
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/contact", element: <Contact /> },
  { path: "/cursos", element: <Cursos /> },
  
  // RESTRICCIÓN: Solo ESTUDIANTES
  { 
    path: "/estudiantes", 
    element: (
      <ProtectedRoute allowedRoles={['estudiante']}>
        <Estudiantes />
      </ProtectedRoute>
    )
  },
  
  // RESTRICCIÓN: Solo APODERADOS
  { 
    path: "/apoderados", 
    element: (
      <ProtectedRoute allowedRoles={['apoderado']}>
        <Apoderados />
      </ProtectedRoute>
    )
  },
  
  // RESTRICCIÓN: Solo PROFESORES
  { 
    path: "/profesores", 
    element: (
      <ProtectedRoute allowedRoles={['profesor']}>
        <Profesores />
      </ProtectedRoute>
    )
  },
  
  // RESTRICCIÓN: Solo PROFESORES - Herramientas específicas
  { 
    path: "/profesores/clases-horario", 
    element: (
      <ProtectedRoute allowedRoles={['profesor']}>
        <ClasesHorario />
      </ProtectedRoute>
    )
  },
  { 
    path: "/profesores/asistencia", 
    element: (
      <ProtectedRoute allowedRoles={['profesor']}>
        <Asistencia />
      </ProtectedRoute>
    )
  },
  { 
    path: "/profesores/notas-evaluaciones", 
    element: (
      <ProtectedRoute allowedRoles={['profesor']}>
        <NotasEvaluaciones />
      </ProtectedRoute>
    )
  },
  { 
    path: "/profesores/mensajeria", 
    element: (
      <ProtectedRoute allowedRoles={['profesor']}>
        <Mensajeria />
      </ProtectedRoute>
    )
  }
];

export default routes;
```

#### 3. Restricción de Elementos de UI

Además de proteger rutas, el sistema oculta botones y funciones según el rol:

**NavBar.jsx** - Menú condicional:
```javascript
const NavBar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) setUser(JSON.parse(userData));
    }, []);

    return (
        <Navbar>
            <Nav>
                {/* Siempre visible */}
                <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                <Nav.Link as={Link} to="/cursos">Cursos</Nav.Link>
                
                {/* Solo visible para ESTUDIANTES */}
                {user?.rol === 'estudiante' && (
                    <Nav.Link as={Link} to="/estudiantes">
                        Mi Panel Estudiantil
                    </Nav.Link>
                )}
                
                {/* Solo visible para PROFESORES */}
                {user?.rol === 'profesor' && (
                    <>
                        <Nav.Link as={Link} to="/profesores">
                            Panel Docente
                        </Nav.Link>
                        <NavDropdown title="Herramientas">
                            <NavDropdown.Item as={Link} to="/profesores/clases-horario">
                                Clases y Horario
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/profesores/asistencia">
                                Asistencia
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/profesores/notas-evaluaciones">
                                Notas y Evaluaciones
                            </NavDropdown.Item>
                        </NavDropdown>
                    </>
                )}
                
                {/* Solo visible para APODERADOS */}
                {user?.rol === 'apoderado' && (
                    <Nav.Link as={Link} to="/apoderados">
                        Panel de Apoderado
                    </Nav.Link>
                )}
            </Nav>
        </Navbar>
    );
};
```

#### 4. Restricción de Funcionalidades

**Profesores.jsx** - Botones condicionales:
```javascript
const Profesores = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    return (
        <Container>
            <h1>Panel del Profesor</h1>
            
            {/* Herramientas solo para profesores */}
            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Clases y Horario</Card.Title>
                            <Card.Text>
                                Gestiona tus clases y horarios
                            </Card.Text>
                            <Button 
                                as={Link} 
                                to="/profesores/clases-horario"
                                disabled={user?.rol !== 'profesor'}
                            >
                                Acceder
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Asistencia</Card.Title>
                            <Card.Text>
                                Registra la asistencia de tus alumnos
                            </Card.Text>
                            <Button 
                                as={Link} 
                                to="/profesores/asistencia"
                                disabled={user?.rol !== 'profesor'}
                            >
                                Acceder
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
```

#### 5. Tabla de Restricciones por Rol

| Ruta/Funcionalidad | Público | Estudiante | Profesor | Apoderado |
|-------------------|---------|------------|----------|-----------|
| `/` (Home) | ✅ | ✅ | ✅ | ✅ |
| `/login` | ✅ | ✅ | ✅ | ✅ |
| `/register` | ✅ | ✅ | ✅ | ✅ |
| `/contact` | ✅ | ✅ | ✅ | ✅ |
| `/cursos` | ✅ | ✅ | ✅ | ✅ |
| `/estudiantes` | ❌ | ✅ | ❌ | ❌ |
| `/apoderados` | ❌ | ❌ | ❌ | ✅ |
| `/profesores` | ❌ | ❌ | ✅ | ❌ |
| `/profesores/clases-horario` | ❌ | ❌ | ✅ | ❌ |
| `/profesores/asistencia` | ❌ | ❌ | ✅ | ❌ |
| `/profesores/notas-evaluaciones` | ❌ | ❌ | ✅ | ❌ |
| `/profesores/mensajeria` | ❌ | ❌ | ✅ | ❌ |

#### 6. Mecanismos de Restricción Implementados

##### A. Protección a Nivel de Ruta (Route-Level)
```javascript
// Envuelve componentes con ProtectedRoute
<ProtectedRoute allowedRoles={['profesor']}>
    <Profesores />
</ProtectedRoute>
```

##### B. Protección a Nivel de Componente (Component-Level)
```javascript
// Verifica rol dentro del componente
const Component = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user?.rol !== 'profesor') {
        return <Navigate to="/" />;
    }
    
    return <div>Contenido para profesores</div>;
};
```

##### C. Protección a Nivel de UI (UI-Level)
```javascript
// Renderizado condicional de elementos
{user?.rol === 'profesor' && (
    <Button>Solo visible para profesores</Button>
)}
```

##### D. Protección a Nivel de Navegación (Navigation-Level)
```javascript
// Prevenir navegación no autorizada
const navigate = useNavigate();

const handleAccess = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user?.rol !== 'profesor') {
        alert('Acceso denegado');
        navigate('/');
        return;
    }
    
    navigate('/profesores');
};
```

#### 7. Flujo de Verificación de Acceso

```
Usuario intenta acceder a /profesores
   ↓
1. React Router intercepta la navegación
   ↓
2. ProtectedRoute verifica localStorage
   ↓
3. ¿Hay usuario y token?
   NO → Redirige a /login
   SÍ → Continúa
   ↓
4. ¿allowedRoles está definido?
   NO → Permite acceso (solo requiere autenticación)
   SÍ → Continúa
   ↓
5. ¿user.rol está en allowedRoles?
   NO → Muestra alerta + Redirige a /
   SÍ → Renderiza componente protegido
```

#### 8. Seguridad de las Restricciones

**Importante:** Las restricciones del frontend son solo para **mejorar la experiencia de usuario**. La seguridad real está en el backend.

**Frontend (UX):**
- Oculta opciones que el usuario no puede usar
- Previene navegación no autorizada
- Muestra mensajes de error apropiados

**Backend (Seguridad Real):**
```java
// SecurityConfig.java
.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/estudiantes/**").hasRole("ESTUDIANTE")
    .requestMatchers("/api/profesores/**").hasRole("PROFESOR")
    .requestMatchers("/api/apoderados/**").hasRole("APODERADO")
)
```

Incluso si un usuario manipula el frontend y accede a una ruta protegida, **el backend rechazará cualquier petición no autorizada**.

#### 9. Mensajes de Error y Feedback

```javascript
// Mensaje claro cuando se deniega acceso
if (!hasPermission) {
    alert(`Acceso denegado. Esta sección es solo para: ${allowedRoles.join(', ')}`);
    return <Navigate to="/" replace />;
}

// Alternativamente, página de error personalizada
if (!hasPermission) {
    return (
        <Container className="text-center mt-5">
            <h2>🚫 Acceso Denegado</h2>
            <p>No tienes permisos para acceder a esta sección.</p>
            <p>Esta página es solo para: <strong>{allowedRoles.join(', ')}</strong></p>
            <Button as={Link} to="/">Volver al inicio</Button>
        </Container>
    );
}
```

#### 10. Ventajas del Sistema de Restricciones

1. **Seguridad por Capas**: Frontend + Backend
2. **UX Mejorada**: Usuario solo ve lo que puede usar
3. **Mantenibilidad**: Fácil agregar nuevos roles y restricciones
4. **Claridad**: Código declarativo y fácil de entender
5. **Escalabilidad**: Sistema extensible para múltiples roles
6. **Feedback Claro**: Mensajes descriptivos al usuario

---

**Fecha de Documentación:** 30 de Noviembre de 2025  
**Versión:** 1.0  
**Autor:** Sistema AulaPlus
