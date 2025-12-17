import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, InputGroup, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBook, FaSearch, FaFilter } from 'react-icons/fa';
import './Biblioteca.css';

const Biblioteca = () => {
  const [libros, setLibros] = useState([]);
  const [librosFiltrados, setLibrosFiltrados] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [mostrarModal, setMostrarModal] = useState(false);
  const [datosAlumno, setDatosAlumno] = useState({ rut: '', nombre: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      mostrarMensaje('warning', 'Debes iniciar sesión para acceder a la biblioteca');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    const cargarLibros = async () => {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData) {
        return;
      }
      try {
        const response = await fetch('https://aulaplus-main-1.onrender.com/api/biblioteca/libros');
        if (!response.ok) {
          throw new Error('Error al cargar libros');
        }
        const data = await response.json();
        setLibros(data);
        setLibrosFiltrados(data);
      } catch (error) {
        console.error('Error al cargar libros:', error);
        mostrarMensaje('danger', 'Error al cargar la biblioteca. Verifica que el servidor esté funcionando.');
      }
    };

    cargarLibros();
    // Cargar carrito del localStorage
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, [navigate]);

  useEffect(() => {
    let resultado = [...libros];

    if (busqueda) {
      resultado = resultado.filter(libro =>
        libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        libro.autor.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    if (categoriaFiltro !== 'Todas') {
      resultado = resultado.filter(libro => libro.categoria === categoriaFiltro);
    }

    setLibrosFiltrados(resultado);
  }, [libros, busqueda, categoriaFiltro]);

  useEffect(() => {
    // Guardar carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (libro) => {
    const libroEnCarrito = carrito.find(item => item.id === libro.id);
    
    if (libroEnCarrito) {
      if (libroEnCarrito.cantidad < libro.stock) {
        setCarrito(carrito.map(item =>
          item.id === libro.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        ));
        mostrarMensaje('success', `Se agregó otra unidad de "${libro.titulo}"`);
      } else {
        mostrarMensaje('warning', 'No hay más stock disponible');
      }
    } else {
      setCarrito([...carrito, { ...libro, cantidad: 1 }]);
      mostrarMensaje('success', `"${libro.titulo}" agregado al carrito`);
    }
  };

  const eliminarDelCarrito = (libroId) => {
    setCarrito(carrito.filter(item => item.id !== libroId));
    mostrarMensaje('info', 'Libro eliminado del carrito');
  };

  const actualizarCantidad = (libroId, nuevaCantidad) => {
    if (nuevaCantidad === 0) {
      eliminarDelCarrito(libroId);
      return;
    }

    const libro = libros.find(l => l.id === libroId);
    if (nuevaCantidad > libro.stock) {
      mostrarMensaje('warning', 'Cantidad excede el stock disponible');
      return;
    }

    setCarrito(carrito.map(item =>
      item.id === libroId
        ? { ...item, cantidad: nuevaCantidad }
        : item
    ));
  };

  const finalizarPedido = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!datosAlumno.rut || !datosAlumno.nombre) {
      mostrarMensaje('warning', 'Debes completar tu RUT y nombre');
      return;
    }

    const pedido = {
      usuarioId: user.id,
      usuarioNombre: datosAlumno.nombre,
      usuarioEmail: user.email,
      usuarioRut: datosAlumno.rut,
      items: carrito.map(item => ({
        libroId: item.id,
        titulo: item.titulo,
        autor: item.autor,
        cantidad: item.cantidad,
        precioUnitario: 0,
        subtotal: 0
      })),
      total: 0,
      estado: 'pendiente',
      notasAdicionales: ''
    };

    try {
      const response = await fetch('https://aulaplus-main-1.onrender.com/api/biblioteca/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido)
      });

      if (response.ok) {
        mostrarMensaje('success', '¡Pedido realizado con éxito! Tu solicitud ha sido registrada.');
        setCarrito([]);
        localStorage.removeItem('carrito');
        setMostrarModal(false);
      } else {
        mostrarMensaje('danger', 'Error al procesar el pedido');
      }
    } catch (error) {
      console.error('Error:', error);
      mostrarMensaje('danger', 'Error de conexión al procesar el pedido');
    }
  };

  const mostrarMensaje = (tipo, texto) => {
    setMensaje({ tipo, texto });
    setTimeout(() => setMensaje({ tipo: '', texto: '' }), 3000);
  };

  const categorias = ['Todas', ...new Set(libros.map(libro => libro.categoria))];

  return (
    <Container fluid className="biblioteca-page">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1><FaBook /> Biblioteca Escolar</h1>
              <p className="text-muted">Explora nuestra colección y solicita tus libros</p>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={() => setMostrarModal(true)}
              className="position-relative"
            >
              <FaShoppingCart /> Ver Carrito
              {carrito.length > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {carrito.length}
                </Badge>
              )}
            </Button>
          </div>
        </Col>
      </Row>

      {mensaje.texto && (
        <Alert variant={mensaje.tipo} dismissible onClose={() => setMensaje({ tipo: '', texto: '' })}>
          {mensaje.texto}
        </Alert>
      )}

      {/* Filtros y búsqueda */}
      <Row className="mb-4">
        <Col md={8}>
          <InputGroup>
            <InputGroup.Text><FaSearch /></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Buscar por título o autor..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <InputGroup>
            <InputGroup.Text><FaFilter /></InputGroup.Text>
            <Form.Select
              value={categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value)}
            >
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Form.Select>
          </InputGroup>
        </Col>
      </Row>

      <Row>
        {/* Catálogo de libros */}
        <Col lg={12}>
          <Row>
            {librosFiltrados.length === 0 ? (
              <Col>
                <Alert variant="info">No se encontraron libros con los filtros seleccionados</Alert>
              </Col>
            ) : (
              librosFiltrados.map(libro => (
                <Col key={libro.id} md={4} lg={3} className="mb-4">
                  <Card className="h-100 libro-card">
                    <Card.Img
                      variant="top"
                      src={libro.portadaUrl || 'https://placehold.co/300x400/e0e0e0/666666?text=Sin+Portada'}
                      alt={libro.titulo}
                      style={{ height: '300px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/300x400/e0e0e0/666666?text=Sin+Portada';
                      }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="libro-titulo">{libro.titulo}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{libro.autor}</Card.Subtitle>
                      <Badge bg="secondary" className="mb-2">{libro.categoria}</Badge>
                      <Card.Text className="small text-muted flex-grow-1">
                        {libro.descripcion?.substring(0, 100)}...
                      </Card.Text>
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <strong className="text-success">¡GRATIS!</strong>
                          <Badge bg={libro.disponible ? 'success' : 'danger'}>
                            {libro.disponible ? `Stock: ${libro.stock}` : 'Agotado'}
                          </Badge>
                        </div>
                        <Button
                          variant="primary"
                          className="w-100"
                          onClick={() => agregarAlCarrito(libro)}
                          disabled={!libro.disponible}
                        >
                          {libro.disponible ? 'Solicitar libro' : 'No disponible'}
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>

      {/* Modal del Carrito */}
      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title><FaShoppingCart /> Mi Carrito de Solicitudes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {carrito.length === 0 ? (
            <Alert variant="info">El carrito está vacío</Alert>
          ) : (
            <>
              <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px' }}>
                {carrito.map(item => (
                  <div key={item.id} className="carrito-item mb-3 pb-3 border-bottom">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="flex-grow-1">
                        <strong className="d-block">{item.titulo}</strong>
                        <small className="text-muted">{item.autor}</small>
                      </div>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => eliminarDelCarrito(item.id)}
                      >
                        ×
                      </Button>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <InputGroup size="sm" style={{ width: '120px' }}>
                        <Button
                          variant="outline-secondary"
                          onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                        >
                          -
                        </Button>
                        <Form.Control
                          type="number"
                          value={item.cantidad}
                          onChange={(e) => actualizarCantidad(item.id, parseInt(e.target.value) || 0)}
                          min="0"
                          max={item.stock}
                          className="text-center"
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                        >
                          +
                        </Button>
                      </InputGroup>
                      <span className="text-muted">Cantidad: {item.cantidad}</span>
                    </div>
                  </div>
                ))}
              </div>

              <hr />
              
              <h5 className="mb-3">Datos del Alumno</h5>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>RUT *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: 12345678-9"
                    value={datosAlumno.rut}
                    onChange={(e) => setDatosAlumno({ ...datosAlumno, rut: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre Completo *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa tu nombre completo"
                    value={datosAlumno.nombre}
                    onChange={(e) => setDatosAlumno({ ...datosAlumno, nombre: e.target.value })}
                    required
                  />
                </Form.Group>
              </Form>

              <Alert variant="info" className="mt-3">
                <strong>Total de libros solicitados:</strong> {carrito.reduce((total, item) => total + item.cantidad, 0)} libro(s)
                <br />
                <small>Todos los libros son completamente gratuitos para los alumnos.</small>
              </Alert>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>
            Cerrar
          </Button>
          {carrito.length > 0 && (
            <Button variant="success" onClick={finalizarPedido}>
              Confirmar Solicitud
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Biblioteca;
