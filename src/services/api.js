const API_BASE_URL = 'https://aulaplus-main-1.onrender.com/api';

// Obtener ID del usuario logueado
const getUserId = () => {
  return localStorage.getItem('userId') || '673bb9e4a1b2c3d4e5f6g7h9';
};

export const cursosService = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/cursos`);
    return response.json();
  },
  
  async getByEstudiante(estudianteId = getUserId()) {
    const response = await fetch(`${API_BASE_URL}/cursos/estudiante/${estudianteId}`);
    return response.json();
  }
};

export const eventosService = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/eventos`);
    return response.json();
  },
  
  async getByMes(mes, anio) {
    const response = await fetch(`${API_BASE_URL}/eventos/mes?mes=${mes}&anio=${anio}`);
    return response.json();
  }
};

export const mensajesService = {
  async getRecibidos(usuarioId = getUserId()) {
    const response = await fetch(`${API_BASE_URL}/mensajes/recibidos/${usuarioId}`);
    return response.json();
  },
  
  async getEnviados(usuarioId = getUserId()) {
    const response = await fetch(`${API_BASE_URL}/mensajes/enviados/${usuarioId}`);
    return response.json();
  },
  
  async marcarLeido(mensajeId) {
    const response = await fetch(`${API_BASE_URL}/mensajes/marcar-leido/${mensajeId}`, {
      method: 'PUT'
    });
    return response.json();
  },
  
  async enviar(mensaje) {
    const response = await fetch(`${API_BASE_URL}/mensajes/enviar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...mensaje,
        fecha: new Date().toISOString(),
        leido: false
      })
    });
    return response.json();
  }
};
