// API Service - Integración con backend H2 + JWT
import AuthService from './AuthService';

const API_BASE_URL = 'http://localhost:8080/api';

// Helper para obtener headers con autorización
const getHeaders = () => {
  return AuthService.getAuthHeaders();
};

// ============ ESTUDIANTES ============
export const estudiantesService = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/estudiantes`, {
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al obtener estudiantes');
    return response.json();
  },

  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/estudiantes/${id}`, {
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al obtener estudiante');
    return response.json();
  },

  async create(estudiante) {
    const response = await fetch(`${API_BASE_URL}/estudiantes`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(estudiante)
    });
    if (!response.ok) throw new Error('Error al crear estudiante');
    return response.json();
  },

  async update(id, estudiante) {
    const response = await fetch(`${API_BASE_URL}/estudiantes/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(estudiante)
    });
    if (!response.ok) throw new Error('Error al actualizar estudiante');
    return response.json();
  },

  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/estudiantes/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al eliminar estudiante');
    return response.status === 204;
  }
};

// ============ PROFESORES ============
export const profesoresService = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/profesores`, {
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al obtener profesores');
    return response.json();
  },

  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/profesores/${id}`, {
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al obtener profesor');
    return response.json();
  },

  async create(profesor) {
    const response = await fetch(`${API_BASE_URL}/profesores`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(profesor)
    });
    if (!response.ok) throw new Error('Error al crear profesor');
    return response.json();
  },

  async update(id, profesor) {
    const response = await fetch(`${API_BASE_URL}/profesores/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(profesor)
    });
    if (!response.ok) throw new Error('Error al actualizar profesor');
    return response.json();
  },

  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/profesores/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al eliminar profesor');
    return response.status === 204;
  }
};

// ============ CURSOS ============
export const cursosService = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/cursos`, {
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al obtener cursos');
    return response.json();
  },
  
  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/cursos/${id}`, {
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al obtener curso');
    return response.json();
  },

  async create(curso) {
    const response = await fetch(`${API_BASE_URL}/cursos`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(curso)
    });
    if (!response.ok) throw new Error('Error al crear curso');
    return response.json();
  },

  async update(id, curso) {
    const response = await fetch(`${API_BASE_URL}/cursos/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(curso)
    });
    if (!response.ok) throw new Error('Error al actualizar curso');
    return response.json();
  },

  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/cursos/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al eliminar curso');
    return response.status === 204;
  }
};

// ============ ASISTENCIAS ============
export const asistenciasService = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/asistencias`, {
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al obtener asistencias');
    return response.json();
  },

  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/asistencias/${id}`, {
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al obtener asistencia');
    return response.json();
  },

  async create(asistencia) {
    const response = await fetch(`${API_BASE_URL}/asistencias`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(asistencia)
    });
    if (!response.ok) throw new Error('Error al registrar asistencia');
    return response.json();
  },

  async update(id, asistencia) {
    const response = await fetch(`${API_BASE_URL}/asistencias/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(asistencia)
    });
    if (!response.ok) throw new Error('Error al actualizar asistencia');
    return response.json();
  },

  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/asistencias/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al eliminar asistencia');
    return response.status === 204;
  }
};

// ============ NOTAS ============
export const notasService = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/notas`, {
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al obtener notas');
    return response.json();
  },

  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/notas/${id}`, {
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al obtener nota');
    return response.json();
  },

  async create(nota) {
    const response = await fetch(`${API_BASE_URL}/notas`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(nota)
    });
    if (!response.ok) throw new Error('Error al crear nota');
    return response.json();
  },

  async update(id, nota) {
    const response = await fetch(`${API_BASE_URL}/notas/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(nota)
    });
    if (!response.ok) throw new Error('Error al actualizar nota');
    return response.json();
  },

  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/notas/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al eliminar nota');
    return response.status === 204;
  }
};

// ============ BIBLIOTECA (Libros y Pedidos) ============
export const bibliotecaService = {
  // Libros
  async getLibros() {
    const response = await fetch(`${API_BASE_URL}/biblioteca/libros`, {
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al obtener libros');
    return response.json();
  },

  async getLibroById(id) {
    const response = await fetch(`${API_BASE_URL}/biblioteca/libros/${id}`, {
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al obtener libro');
    return response.json();
  },

  async createLibro(libro) {
    const response = await fetch(`${API_BASE_URL}/biblioteca/libros`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(libro)
    });
    if (!response.ok) throw new Error('Error al crear libro');
    return response.json();
  },

  async updateLibro(id, libro) {
    const response = await fetch(`${API_BASE_URL}/biblioteca/libros/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(libro)
    });
    if (!response.ok) throw new Error('Error al actualizar libro');
    return response.json();
  },

  async deleteLibro(id) {
    const response = await fetch(`${API_BASE_URL}/biblioteca/libros/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al eliminar libro');
    return response.status === 200;
  },

  // Pedidos
  async getPedidos() {
    const response = await fetch(`${API_BASE_URL}/biblioteca/pedidos`, {
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al obtener pedidos');
    return response.json();
  },

  async getPedidoById(id) {
    const response = await fetch(`${API_BASE_URL}/biblioteca/pedidos/${id}`, {
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al obtener pedido');
    return response.json();
  },

  async getPedidosByUsuario(usuarioId) {
    const response = await fetch(`${API_BASE_URL}/biblioteca/pedidos/usuario/${usuarioId}`, {
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al obtener pedidos del usuario');
    return response.json();
  },

  async createPedido(pedido) {
    const response = await fetch(`${API_BASE_URL}/biblioteca/pedidos`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(pedido)
    });
    if (!response.ok) throw new Error('Error al crear pedido');
    return response.json();
  },

  async updatePedido(id, pedido) {
    const response = await fetch(`${API_BASE_URL}/biblioteca/pedidos/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(pedido)
    });
    if (!response.ok) throw new Error('Error al actualizar pedido');
    return response.json();
  },

  async deletePedido(id) {
    const response = await fetch(`${API_BASE_URL}/biblioteca/pedidos/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al eliminar pedido');
    return response.status === 200;
  }
};

// ============ USUARIOS (solo ADMIN) ============
export const usuariosService = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/usuarios`, {
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al obtener usuarios');
    return response.json();
  },

  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al obtener usuario');
    return response.json();
  },

  async create(usuario) {
    const response = await fetch(`${API_BASE_URL}/usuarios`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(usuario)
    });
    if (!response.ok) throw new Error('Error al crear usuario');
    return response.json();
  },

  async update(id, usuario) {
    const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(usuario)
    });
    if (!response.ok) throw new Error('Error al actualizar usuario');
    return response.json();
  },

  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al eliminar usuario');
    return response.status === 204;
  }
};

// ============ DEMO ============
export const demoService = {
  async getMensaje() {
    const response = await fetch(`${API_BASE_URL}/demo/mensaje`);
    if (!response.ok) throw new Error('Error al obtener mensaje demo');
    return response.json();
  }
};

const api = {
  estudiantes: estudiantesService,
  profesores: profesoresService,
  cursos: cursosService,
  asistencias: asistenciasService,
  notas: notasService,
  biblioteca: bibliotecaService,
  usuarios: usuariosService,
  demo: demoService
};

export default api;
