import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaChartBar, FaFileAlt, FaChartLine } from 'react-icons/fa';
import './Profesores.css';

export default function NotasEvaluaciones() {
  return (
    <div className="prof-bg-gradient min-vh-100 py-5">
      <Container>
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold text-info display-5 mb-2" style={{letterSpacing:'-1px'}}>Notas y Evaluaciones</h2>
            <p className="lead" style={{color:'#333'}}>Gestiona el rendimiento académico de tus estudiantes, ingresa calificaciones, genera reportes y analiza tendencias fácilmente.</p>
          </Col>
        </Row>
        <Row className="g-4">
          <Col md={6} lg={4}>
            <Card className="prof-card h-100 text-center">
              <Card.Body>
                <div className="prof-icon-circle bg-info mb-3 mx-auto"><FaChartBar size={32} color="#fff" /></div>
                <Card.Title className="fw-bold">Ingreso de Calificaciones</Card.Title>
                <Card.Text>
                  Registra y edita las notas de tus estudiantes de forma rápida y segura. Visualiza el historial de evaluaciones por curso o asignatura.
                </Card.Text>
                <Button variant="info" className="w-100 mb-2">Ingresar Notas</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className="prof-card h-100 text-center">
              <Card.Body>
                <div className="prof-icon-circle bg-success mb-3 mx-auto"><FaFileAlt size={32} color="#fff" /></div>
                <Card.Title className="fw-bold">Reportes de Curso</Card.Title>
                <Card.Text>
                  Genera reportes personalizados de rendimiento académico, identifica estudiantes destacados o en riesgo y exporta los resultados.
                </Card.Text>
                <Button variant="success" className="w-100 mb-2">Generar Reporte</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className="prof-card h-100 text-center">
              <Card.Body>
                <div className="prof-icon-circle bg-secondary mb-3 mx-auto"><FaChartLine size={32} color="#fff" /></div>
                <Card.Title className="fw-bold">Análisis de Tendencias</Card.Title>
                <Card.Text>
                  Analiza promedios, tendencias y evolución de notas a lo largo del tiempo para tomar mejores decisiones pedagógicas.
                </Card.Text>
                <Button variant="secondary" className="w-100 mb-2">Ver Análisis</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="d-flex justify-content-center gap-3 flex-wrap">
            {window.location.pathname !== '/profesores/clases-horario' && (
              <Button as={Link} to="/profesores/clases-horario" variant="outline-info" className="prof-nav-btn">Ir a Clases y Horario</Button>
            )}
            {window.location.pathname !== '/profesores/asistencia' && (
              <Button as={Link} to="/profesores/asistencia" variant="outline-info" className="prof-nav-btn">Ir a Asistencia</Button>
            )}
            {window.location.pathname !== '/profesores/mensajeria' && (
              <Button as={Link} to="/profesores/mensajeria" variant="outline-info" className="prof-nav-btn">Ir a Mensajería</Button>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
