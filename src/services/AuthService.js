// AuthService.js - Servicio de autenticación con JWT
const API_URL = 'http://localhost:8080/api';

class AuthService {
  // Login de usuario
  async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al iniciar sesión');
      }

      const data = await response.json();
      
      // Guardar token y usuario en localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
      }

      return data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  // Registro de usuario
  async register(email, password, nombre, rol = 'ESTUDIANTE') {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, nombre, rol }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al registrar usuario');
      }

      const data = await response.json();
      
      // Guardar token y usuario en localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
      }

      return data;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = '/login';
  }

  // Obtener token actual
  getToken() {
    return localStorage.getItem('token');
  }

  // Obtener usuario actual
  getCurrentUser() {
    const userStr = localStorage.getItem('usuario');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Verificar si está autenticado
  isAuthenticated() {
    return !!this.getToken();
  }

  // Verificar rol del usuario
  hasRole(role) {
    const user = this.getCurrentUser();
    return user && user.rol === role;
  }

  // Verificar si tiene alguno de los roles
  hasAnyRole(roles) {
    const user = this.getCurrentUser();
    return user && roles.includes(user.rol);
  }

  // Obtener headers con autorización
  getAuthHeaders() {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }
}

export default new AuthService();
