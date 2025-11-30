# 🎓 AulaPlus - Sistema de Gestión Escolar

## 📋 Requisitos Previos

Antes de ejecutar la aplicación, asegúrate de tener instalado:

- ✅ **Node.js** (v14 o superior)
- ✅ **Java 17** o superior
- ✅ **MongoDB** (v8.0 o superior)
- ✅ **Maven** (incluido con mvnw)

## 🚀 Inicio Rápido

### Opción 1: Script Automático (Recomendado)

1. Abre PowerShell en esta carpeta
2. Ejecuta el script:
   ```powershell
   .\iniciar-servidores.ps1
   ```
3. Espera 20-30 segundos
4. Abre tu navegador en: **http://localhost:3000**

### Opción 2: Inicio Manual

#### Terminal 1 - Backend:
```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

#### Terminal 2 - Frontend:
```powershell
npm start
```

## 🔧 Estructura de la Aplicación

```
aulaplus-main-main/
├── backend/               # Spring Boot + MongoDB
│   ├── src/
│   ├── pom.xml
│   └── mvnw.cmd
├── src/                   # React Frontend
│   ├── components/
│   ├── pages/
│   └── services/
├── package.json
└── iniciar-servidores.ps1 # Script de inicio automático
```

## 🌐 URLs de la Aplicación

- **Frontend (React)**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
  - Cursos: http://localhost:8080/api/cursos
  - Eventos: http://localhost:8080/api/eventos
  - Mensajes: http://localhost:8080/api/mensajes

## 📊 Base de Datos MongoDB

La aplicación usa MongoDB en `localhost:27017` con la base de datos `aulaplus_db`.

### Datos Iniciales

Al iniciar el backend por primera vez, se cargan automáticamente:
- ✅ 9 Cursos/Materias (Historia, Matemáticas, Lenguaje, etc.)
- ✅ 54 Eventos del Calendario Escolar
- ✅ 3 Usuarios (estudiante, profesor, apoderado)
- ✅ Mensajes de ejemplo

## 🛠️ Comandos Útiles

### Frontend
```powershell
npm install          # Instalar dependencias
npm start            # Iniciar servidor de desarrollo
npm run build        # Compilar para producción
npm test             # Ejecutar tests
```

### Backend
```powershell
.\mvnw.cmd clean compile        # Compilar
.\mvnw.cmd spring-boot:run      # Ejecutar aplicación
.\mvnw.cmd test                 # Ejecutar tests
.\mvnw.cmd clean package        # Crear JAR
```

## ⚠️ Solución de Problemas

### El navegador no carga la aplicación

**Causa**: Los servidores no están corriendo.

**Solución**: 
1. Verifica que MongoDB esté corriendo:
   ```powershell
   Get-Service MongoDB
   ```
2. Ejecuta `.\iniciar-servidores.ps1` o inicia manualmente ambos servidores

### Error "Puerto 8080 ya está en uso"

**Solución**: Detén el proceso Java anterior:
```powershell
Get-Process java | Stop-Process -Force
```

### Error "Puerto 3000 ya está en uso"

**Solución**: Detén el proceso Node anterior:
```powershell
Get-Process node | Where-Object {$_.WorkingSet -gt 100MB} | Stop-Process -Force
```

### MongoDB no conecta

**Solución**: Inicia el servicio de MongoDB:
```powershell
Start-Service MongoDB
```

## 📱 Funcionalidades

### Panel de Alumno
- 📚 **Cursos**: Ver todas las materias inscritas
- 📅 **Calendario**: Visualizar eventos y fechas importantes
- 💬 **Mensajería**: Comunicación con profesores
- 📋 **Actividades**: Seguimiento de tareas y evaluaciones

### Base de Datos
- ✅ Backend completo con Spring Boot
- ✅ MongoDB como base de datos
- ✅ API REST con CORS habilitado
- ✅ Datos de ejemplo precargados

## 🔐 Usuarios de Prueba

El sistema ahora requiere **login para acceder** a las secciones de Estudiantes, Profesores y Apoderados.

### Credenciales de Acceso:

**👨‍🎓 Estudiante:**
```
Email: estudiante@aulaplus.com
Password: password
```

**👨‍🏫 Profesor:**
```
Email: profesor@aulaplus.com
Password: password
```

**👨‍👩‍👧 Apoderado:**
```
Email: apoderado@aulaplus.com
Password: password
```

### Cómo Usar el Login:

1. Abre http://localhost:3000/login
2. Ingresa las credenciales según el rol que quieras probar
3. O haz clic en los botones de acceso rápido:
   - **👨‍🎓 Estudiante** - Accede al panel de alumno
   - **👨‍🏫 Profesor** - Accede al panel de profesor  
   - **👨‍👩‍👧 Apoderado** - Accede al panel de apoderado
4. Una vez dentro, verás tu nombre en la barra de navegación
5. Usa el botón **🚪 Cerrar Sesión** para salir

### Rutas Protegidas:

- `/estudiantes` - Solo para rol "estudiante" o "alumno"
- `/profesores` - Solo para rol "profesor"
- `/apoderados` - Solo para rol "apoderado"

Si intentas acceder sin login, serás redirigido automáticamente a la página de login.

## 📝 Notas Importantes

⚠️ **IMPORTANTE**: Para que la aplicación funcione correctamente, **SIEMPRE** debes tener:
1. MongoDB corriendo (servicio de Windows)
2. Backend corriendo (puerto 8080)
3. Frontend corriendo (puerto 3000)

Los tres componentes deben estar activos simultáneamente.

## 🆘 Soporte

Si tienes problemas:
1. Verifica que MongoDB esté corriendo
2. Verifica que no haya errores en la consola del backend
3. Verifica que no haya errores en la consola del frontend
4. Revisa esta sección de solución de problemas

---

**Versión**: 1.0.0  
**Última actualización**: Noviembre 2025
