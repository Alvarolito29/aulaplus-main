import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEnvelopeOpenText, FaUserFriends, FaBell } from 'react-icons/fa';
import './Profesores.css';

export default function Mensajeria() {
  return (
    <div className="prof-bg-gradient min-vh-100 py-5">
      <Container>
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold text-warning display-5 mb-2" style={{letterSpacing:'-1px'}}>Mensajería</h2>
            <p className="lead" style={{color:'#333'}}>Comunícate de forma efectiva con estudiantes y apoderados, envía mensajes, recibe notificaciones y mantente informado.</p>
          </Col>
        </Row>
        <Row className="g-4">
          <Col md={6} lg={4}>
            <Card className="prof-card h-100 text-center">
              <Card.Body>
                <div className="prof-icon-circle bg-primary mb-3 mx-auto"><FaEnvelopeOpenText size={32} color="#fff" /></div>
                <Card.Title className="fw-bold">Mensajes a Estudiantes</Card.Title>
                <Card.Text>
                  Envía mensajes individuales o grupales a tus estudiantes, comparte recordatorios y material importante de manera rápida.
                </Card.Text>
                <Button variant="primary" className="w-100 mb-2">Enviar Mensaje</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className="prof-card h-100 text-center">
              <Card.Body>
                <div className="prof-icon-circle bg-success mb-3 mx-auto"><FaUserFriends size={32} color="#fff" /></div>
                <Card.Title className="fw-bold">Contactar Apoderados</Card.Title>
                <Card.Text>
                  Comunícate fácilmente con los apoderados, informa sobre el desempeño y asistencia de sus hijos, y resuelve dudas rápidamente.
                </Card.Text>
                <Button variant="success" className="w-100 mb-2">Contactar Apoderado</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className="prof-card h-100 text-center">
              <Card.Body>
                <div className="prof-icon-circle bg-warning mb-3 mx-auto"><FaBell size={32} color="#fff" /></div>
                <Card.Title className="fw-bold">Notificaciones Importantes</Card.Title>
                <Card.Text>
                  Recibe y revisa notificaciones relevantes sobre eventos, reuniones y comunicados institucionales.
                </Card.Text>
                <Button variant="warning" className="w-100 mb-2">Ver Notificaciones</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="d-flex justify-content-center gap-3 flex-wrap">
            {window.location.pathname !== '/profesores/clases-horario' && (
              <Button as={Link} to="/profesores/clases-horario" variant="outline-warning" className="prof-nav-btn">Ir a Clases y Horario</Button>
            )}
            {window.location.pathname !== '/profesores/asistencia' && (
              <Button as={Link} to="/profesores/asistencia" variant="outline-warning" className="prof-nav-btn">Ir a Asistencia</Button>
            )}
            {window.location.pathname !== '/profesores/notas-evaluaciones' && (
              <Button as={Link} to="/profesores/notas-evaluaciones" variant="outline-warning" className="prof-nav-btn">Ir a Notas y Evaluaciones</Button>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
