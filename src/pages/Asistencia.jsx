import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaClipboardList, FaFilePdf, FaUserCheck } from 'react-icons/fa';
import './Profesores.css';

export default function Asistencia() {
  return (
    <div className="prof-bg-gradient min-vh-100 py-5">
      <Container>
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold text-success display-5 mb-2" style={{letterSpacing:'-1px'}}>Asistencia</h2>
            <p className="lead" style={{color:'#333'}}>Controla la asistencia de tus estudiantes de manera eficiente, visualiza reportes y descarga informes en PDF.</p>
          </Col>
        </Row>
        <Row className="g-4">
          <Col md={6} lg={4}>
            <Card className="prof-card h-100 text-center">
              <Card.Body>
                <div className="prof-icon-circle bg-success mb-3 mx-auto"><FaUserCheck size={32} color="#fff" /></div>
                <Card.Title className="fw-bold">Registro Diario</Card.Title>
                <Card.Text>
                  Marca la asistencia de cada estudiante con un solo clic. Visualiza el historial y realiza correcciones fácilmente.
                </Card.Text>
                <Button variant="success" className="w-100 mb-2">Registrar Asistencia</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className="prof-card h-100 text-center">
              <Card.Body>
                <div className="prof-icon-circle bg-primary mb-3 mx-auto"><FaClipboardList size={32} color="#fff" /></div>
                <Card.Title className="fw-bold">Reportes de Inasistencia</Card.Title>
                <Card.Text>
                  Accede a reportes detallados de inasistencias por curso, fecha o estudiante. Identifica patrones y toma decisiones informadas.
                </Card.Text>
                <Button variant="primary" className="w-100 mb-2">Ver Reportes</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className="prof-card h-100 text-center">
              <Card.Body>
                <div className="prof-icon-circle bg-secondary mb-3 mx-auto"><FaFilePdf size={32} color="#fff" /></div>
                <Card.Title className="fw-bold">Descarga de Informes</Card.Title>
                <Card.Text>
                  Descarga informes de asistencia en PDF para respaldar tu gestión y compartir con apoderados o directivos.
                </Card.Text>
                <Button variant="secondary" className="w-100 mb-2">Descargar PDF</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="d-flex justify-content-center gap-3 flex-wrap">
            {window.location.pathname !== '/profesores/clases-horario' && (
              <Button as={Link} to="/profesores/clases-horario" variant="outline-success" className="prof-nav-btn">Ir a Clases y Horario</Button>
            )}
            {window.location.pathname !== '/profesores/notas-evaluaciones' && (
              <Button as={Link} to="/profesores/notas-evaluaciones" variant="outline-success" className="prof-nav-btn">Ir a Notas y Evaluaciones</Button>
            )}
            {window.location.pathname !== '/profesores/mensajeria' && (
              <Button as={Link} to="/profesores/mensajeria" variant="outline-success" className="prof-nav-btn">Ir a Mensajería</Button>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
