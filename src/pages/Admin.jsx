import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Admin = () => {
  const user = JSON.parse(localStorage.getItem('usuario') || '{}');

  return (
    <Container className="mt-5">
      <h1 className="mb-4">🔐 Panel de Administración</h1>
      
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Bienvenido, {user.nombre || 'Administrador'}</Card.Title>
          <Card.Text>
            Desde aquí puedes gestionar todo el sistema AulaPlus.
          </Card.Text>
        </Card.Body>
      </Card>

      <Row className="g-4">
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>👥 Gestión de Usuarios</Card.Title>
              <Card.Text>
                Crear, editar y eliminar usuarios del sistema (estudiantes, profesores, apoderados).
              </Card.Text>
              <Button variant="primary" size="sm">
                Gestionar Usuarios
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>📚 Gestión de Biblioteca</Card.Title>
              <Card.Text>
                Administrar libros, pedidos y stock de la biblioteca escolar.
              </Card.Text>
              <Link to="/biblioteca">
                <Button variant="primary" size="sm">
                  Ir a Biblioteca
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>📊 Reportes y Estadísticas</Card.Title>
              <Card.Text>
                Ver reportes de estudiantes, profesores, asistencia y notas.
              </Card.Text>
              <Button variant="primary" size="sm">
                Ver Reportes
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>🎓 Gestión de Cursos</Card.Title>
              <Card.Text>
                Crear y administrar cursos, materias y horarios.
              </Card.Text>
              <Link to="/cursos">
                <Button variant="primary" size="sm">
                  Ir a Cursos
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>👨‍🏫 Profesores</Card.Title>
              <Card.Text>
                Ver y administrar información de profesores.
              </Card.Text>
              <Link to="/profesores">
                <Button variant="primary" size="sm">
                  Ver Profesores
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>👨‍🎓 Estudiantes</Card.Title>
              <Card.Text>
                Ver y administrar información de estudiantes.
              </Card.Text>
              <Link to="/estudiantes">
                <Button variant="primary" size="sm">
                  Ver Estudiantes
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mt-4 bg-light">
        <Card.Body>
          <h5>📌 Acceso Rápido a API</h5>
          <div className="d-flex gap-2 flex-wrap mt-3">
            <a href="http://localhost:8080/swagger-ui.html" target="_blank" rel="noopener noreferrer">
              <Button variant="outline-primary" size="sm">
                📖 Swagger API Docs
              </Button>
            </a>
            <a href="http://localhost:8080/h2-console" target="_blank" rel="noopener noreferrer">
              <Button variant="outline-secondary" size="sm">
                🗄️ H2 Database Console
              </Button>
            </a>
          </div>
          <p className="text-muted mt-3 mb-0">
            <small>
              <strong>H2 Console:</strong> JDBC URL: <code>jdbc:h2:mem:aulaplustestdb</code> | User: <code>sa</code> | Password: (vacío)
            </small>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Admin;
