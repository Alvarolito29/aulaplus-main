# 📝 Sistema de Registro - AulaPlus

## ✅ Características Implementadas

### 1. **Endpoint de Registro** (`/api/auth/register`)
- ✅ Registra nuevos usuarios en MongoDB
- ✅ Valida que el email no esté duplicado
- ✅ Genera token automáticamente
- ✅ Login automático después del registro

### 2. **Página de Registro** (`/register`)
- ✅ Formulario completo con validaciones
- ✅ Campos: Nombre, Email, Contraseña, Confirmar Contraseña, Tipo de Usuario
- ✅ Selección de rol: Estudiante, Profesor o Apoderado
- ✅ Validación de contraseñas coincidentes
- ✅ Redirección automática según el rol

### 3. **Navegación Mejorada**
- ✅ Link "Regístrate aquí" en página de Login
- ✅ Link "Inicia sesión aquí" en página de Registro
- ✅ Botón de cerrar sesión en NavBar (ya existente)

## 🚀 Cómo Usar

### Registrar Nuevo Usuario:

1. Ve a `http://localhost:3000/register`
2. Completa el formulario:
   - **Nombre Completo**: Ej. "Pedro Martínez"
   - **Email**: Ej. "pedro@gmail.com"
   - **Tipo de Usuario**: Estudiante, Profesor o Apoderado
   - **Contraseña**: Mínimo 4 caracteres
   - **Confirmar Contraseña**: Debe coincidir
3. Haz clic en "Crear Cuenta"
4. Serás redirigido automáticamente a tu panel

### Cerrar Sesión:

1. Haz clic en el botón **"🚪 Cerrar Sesión"** en la barra de navegación
2. Serás redirigido a `/login`
3. Tu sesión será eliminada completamente

## 📊 Datos Ficticios

Los usuarios registrados verán **datos de ejemplo** en sus paneles:

### 👨‍🎓 Estudiantes Registrados
- Cursos de ejemplo (Matemáticas, Historia, Lenguaje, etc.)
- Calendario con eventos escolares ficticios
- Mensajes de ejemplo

### 👨‍🏫 Profesores Registrados
- Herramientas docentes (Clases, Asistencia, Notas, Mensajería)
- Datos de ejemplo de alumnos
- Estadísticas ficticias

### 👨‍👩‍👧 Apoderados Registrados
- Información de hijos ficticios (Matías Pérez, Sofía Pérez)
- Notas de ejemplo por asignatura
- Asistencia simulada (96%, 92%, 98%)
- Información de reuniones y pagos

## 🔐 Usuarios de Prueba (Pre-creados en MongoDB)

Estos usuarios tienen datos completos:

1. **Estudiante**: estudiante@aulaplus.com / password
2. **Profesor**: profesor@aulaplus.com / password
3. **Apoderado**: apoderado@aulaplus.com / password

## 🛠️ API Endpoints

### POST `/api/auth/register`
```json
{
  "nombre": "Pedro Martínez",
  "email": "pedro@gmail.com",
  "password": "mipassword",
  "rol": "estudiante"
}
```

**Respuesta exitosa:**
```json
{
  "id": "673d8f9e60a1b2c3d4e5f678",
  "nombre": "Pedro Martínez",
  "email": "pedro@gmail.com",
  "rol": "estudiante",
  "token": "abc123-def456-ghi789"
}
```

### POST `/api/auth/logout`
```json
{
  "message": "Sesión cerrada exitosamente"
}
```

## ✨ Ventajas del Sistema

1. **Sin duplicados**: El sistema valida que no existan emails duplicados
2. **Login automático**: Después del registro, el usuario ya está logueado
3. **Redirección inteligente**: Cada rol va a su panel correspondiente
4. **Datos persistentes**: Los usuarios se guardan en MongoDB
5. **Datos ficticios**: Los nuevos usuarios ven información de ejemplo sin necesidad de cargar datos reales

## 📝 Notas

- ⚠️ Las contraseñas se guardan **sin encriptar** (solo para desarrollo)
- 📌 Los usuarios registrados comparten los mismos datos ficticios
- 🔄 Para producción, se debe implementar:
  - Encriptación de contraseñas (BCrypt)
  - Validación de email
  - Recuperación de contraseña
  - Asignación de datos personalizados

---

**Última actualización**: Noviembre 30, 2025
