import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Table, Alert } from 'react-bootstrap';
import { FaBox, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const MisPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/biblioteca/pedidos/usuario/${user.id}`);
      const data = await response.json();
      // Ordenar por fecha más reciente
      const pedidosOrdenados = data.sort((a, b) => 
        new Date(b.fechaPedido) - new Date(a.fechaPedido)
      );
      setPedidos(pedidosOrdenados);
    } catch (error) {
      console.error('Error al cargar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEstadoBadge = (estado) => {
    const estados = {
      pendiente: { variant: 'warning', icon: <FaClock />, texto: 'Pendiente' },
      procesando: { variant: 'info', icon: <FaBox />, texto: 'Procesando' },
      completado: { variant: 'success', icon: <FaCheckCircle />, texto: 'Completado' },
      cancelado: { variant: 'danger', icon: <FaTimesCircle />, texto: 'Cancelado' }
    };
    
    const estadoInfo = estados[estado] || estados.pendiente;
    
    return (
      <Badge bg={estadoInfo.variant}>
        {estadoInfo.icon} {estadoInfo.texto}
      </Badge>
    );
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <h3>Cargando pedidos...</h3>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <h1><FaBox /> Mis Pedidos de Biblioteca</h1>
          <p className="text-muted">Historial de tus solicitudes de libros</p>
        </Col>
      </Row>

      {pedidos.length === 0 ? (
        <Alert variant="info">
          No tienes pedidos registrados. ¡Visita la biblioteca para solicitar tus primeros libros!
        </Alert>
      ) : (
        <Row>
          {pedidos.map(pedido => (
            <Col key={pedido.id} lg={12} className="mb-4">
              <Card>
                <Card.Header className="bg-light">
                  <Row className="align-items-center">
                    <Col md={4}>
                      <strong>Pedido #{pedido.id.substring(0, 8)}</strong>
                    </Col>
                    <Col md={4} className="text-center">
                      {getEstadoBadge(pedido.estado)}
                    </Col>
                    <Col md={4} className="text-end">
                      <small className="text-muted">{formatearFecha(pedido.fechaPedido)}</small>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <Table hover responsive>
                    <thead>
                      <tr>
                        <th>Libro</th>
                        <th>Autor</th>
                        <th className="text-center">Cantidad</th>
                        <th className="text-end">Precio Unit.</th>
                        <th className="text-end">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pedido.items.map((item, index) => (
                        <tr key={index}>
                          <td><strong>{item.titulo}</strong></td>
                          <td>{item.autor}</td>
                          <td className="text-center">{item.cantidad}</td>
                          <td className="text-end">${item.precioUnitario.toLocaleString()}</td>
                          <td className="text-end"><strong>${item.subtotal.toLocaleString()}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="4" className="text-end"><strong>Total:</strong></td>
                        <td className="text-end">
                          <h5 className="text-primary mb-0">${pedido.total.toLocaleString()}</h5>
                        </td>
                      </tr>
                    </tfoot>
                  </Table>
                  {pedido.notasAdicionales && (
                    <div className="mt-3">
                      <strong>Notas:</strong> {pedido.notasAdicionales}
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MisPedidos;
