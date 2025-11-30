# 🔐 Sistema de Autenticación - AulaPlus

## ✅ Implementación Completada

El sistema ahora incluye **autenticación completa** con login para:
- 👨‍🎓 **Estudiantes**
- 👨‍🏫 **Profesores**  
- 👨‍👩‍👧 **Apoderados**

## 🚀 Acceso al Sistema

### 1. Inicia la Aplicación
```powershell
.\iniciar-servidores.ps1
```

### 2. Abre el Login
Navega a: **http://localhost:3000/login**

### 3. Usa las Credenciales de Prueba

| Rol | Email | Password |
|-----|-------|----------|
| 👨‍🎓 Estudiante | `estudiante@aulaplus.com` | `password` |
| 👨‍🏫 Profesor | `profesor@aulaplus.com` | `password` |
| 👨‍👩‍👧 Apoderado | `apoderado@aulaplus.com` | `password` |

## 🎯 Características

### Autenticación Segura
- ✅ Login con email y contraseña
- ✅ Validación en el backend (Spring Boot)
- ✅ Tokens de sesión generados
- ✅ Almacenamiento seguro en localStorage

### Rutas Protegidas
- `/estudiantes` - Requiere rol de estudiante
- `/profesores` - Requiere rol de profesor
- `/apoderados` - Requiere rol de apoderado

### Redirección Automática
- Si no estás logueado → Te redirige a `/login`
- Si no tienes permiso → Te redirige a `/login`
- Después del login → Te redirige según tu rol

### Barra de Navegación Dinámica
- 👤 Muestra tu nombre cuando estás logueado
- 🚪 Botón "Cerrar Sesión" para salir
- 🔐 Botón "Iniciar Sesión" cuando no estás autenticado

## 📱 Acceso Rápido

La página de login incluye **botones de acceso rápido** que prellenan las credenciales:

```
[👨‍🎓 Estudiante] [👨‍🏫 Profesor] [👨‍👩‍👧 Apoderado]
```

Solo haz clic en el botón del rol que quieres probar y luego "Iniciar Sesión".

## 🔧 Flujo de Autenticación

```
1. Usuario ingresa email y contraseña
   ↓
2. Frontend envía a POST /api/auth/login
   ↓
3. Backend valida credenciales en MongoDB
   ↓
4. Si es válido:
   - Genera token único
   - Retorna datos del usuario
   ↓
5. Frontend guarda en localStorage:
   - user (objeto completo)
   - token
   - userId
   - userRole
   - userName
   ↓
6. Redirige según el rol del usuario
   ↓
7. Usuario accede a su panel correspondiente
```

## 🛡️ Seguridad

### Implementado:
- ✅ Validación de credenciales en backend
- ✅ Tokens de sesión únicos (UUID)
- ✅ Protección de rutas por rol
- ✅ Redirección automática si no autorizado
- ✅ CORS habilitado solo para localhost:3000

### Pendiente (Producción):
- ⚠️ Encriptación de contraseñas (BCrypt)
- ⚠️ JWT tokens con expiración
- ⚠️ Refresh tokens
- ⚠️ HTTPS en producción

## 📊 Estructura de Archivos

### Backend (Java/Spring Boot)
```
backend/
├── controller/
│   └── AuthController.java          # Login endpoint
├── model/
│   └── Usuario.java                 # Modelo de usuario
├── repository/
│   └── UsuarioRepository.java       # MongoDB queries
└── service/
    └── AuthService.java             # Lógica de autenticación
```

### Frontend (React)
```
src/
├── pages/
│   ├── Login.jsx                    # Página de login
│   └── Login.css                    # Estilos del login
├── components/
│   ├── NavBar.jsx                   # Barra con login/logout
│   └── ProtectedRoute.jsx           # HOC para proteger rutas
├── services/
│   └── api.js                       # Servicios API (usa userId)
└── app/
    └── routes.js                    # Rutas con protección
```

## 🔄 Cerrar Sesión

Para cerrar sesión:
1. Haz clic en **🚪 Cerrar Sesión** en la barra de navegación
2. Serás redirigido automáticamente al login
3. Todos los datos de sesión se eliminan de localStorage

## 🧪 Pruebas

### Probar como Estudiante:
1. Login con `estudiante@aulaplus.com`
2. Verás el panel de alumno con:
   - Cursos inscritos
   - Calendario de eventos
   - Mensajes recibidos
   - Actividades

### Probar como Profesor:
1. Login con `profesor@aulaplus.com`
2. Accede al panel de profesor

### Probar como Apoderado:
1. Login con `apoderado@aulaplus.com`
2. Accede al panel de apoderado

## ❓ Solución de Problemas

### "Email o contraseña incorrectos"
- Verifica que estés usando las credenciales exactas
- Revisa que el backend esté corriendo en puerto 8080

### "Error de conexión"
- Asegúrate de que el backend esté iniciado
- Verifica que MongoDB esté corriendo
- Confirma que ambos servidores estén activos

### No puedo acceder a una página
- Verifica que hayas iniciado sesión
- Confirma que tu rol tenga permisos para esa página
- Revisa que el token no haya expirado (refresca o vuelve a loguearte)

## 📝 Notas Importantes

⚠️ **Desarrollo vs Producción**:
- Las contraseñas actualmente NO están encriptadas
- Los tokens son UUID simples (no JWT)
- Solo para desarrollo local

⚠️ **Antes de producción debes**:
- Implementar BCrypt para contraseñas
- Usar JWT con expiración
- Agregar HTTPS
- Implementar rate limiting
- Validar tokens en cada request

---

✅ **Sistema de Login Funcionando Completamente**
