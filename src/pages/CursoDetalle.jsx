// src/pages/CursoDetalle.jsx
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge, ListGroup, Nav } from "react-bootstrap";

// Catálogo local (para que no dependa de ../data/courses)
const COURSES = [
  { id: "historia",    title: "Historia",            teacher: "Por asignar", category: "Asignatura", color: "secondary" },
  { id: "lenguaje",    title: "Lenguaje",            teacher: "Por asignar", category: "Asignatura", color: "secondary" },
  { id: "matematicas", title: "Matemáticas",         teacher: "Por asignar", category: "Asignatura", color: "secondary" },
  { id: "ingles",      title: "Inglés",              teacher: "Por asignar", category: "Asignatura", color: "secondary" },
  { id: "religion",    title: "Religión",            teacher: "Por asignar", category: "Asignatura", color: "secondary" },
  { id: "fisica",      title: "Física",              teacher: "Por asignar", category: "Asignatura", color: "secondary" },
  { id: "biologia",    title: "Biología",            teacher: "Por asignar", category: "Asignatura", color: "secondary" },
  { id: "ed-fisica",   title: "Educación Física",    teacher: "Por asignar", category: "Asignatura", color: "secondary" },
  { id: "futbol",      title: "Taller de Fútbol",    teacher: "Por asignar", category: "Taller",     color: "success"   },
];

export default function CursoDetalle() {
  const { id } = useParams();
  const curso = useMemo(() => COURSES.find(c => c.id === id), [id]);
  const [tab, setTab] = useState("inicio");

  const contenidos = [
    { t: "Unidad 1 — Fundamentos", r: "PDF Guía 1" },
    { t: "Unidad 2 — Práctica guiada", r: "PDF Guía 2" },
    { t: "Unidad 3 — Proyecto aplicado", r: "Guía del proyecto" },
  ];
  const evaluaciones = [
    { t: "Control 1", estado: "Entregado", nota: 5.8 },
    { t: "Proyecto U1", estado: "Pendiente", nota: null },
  ];
  const foros = [
    { t: "Debate: Tecnología en educación", tu: "Participaste (✅)" },
    { t: "Consultas generales", tu: "3 mensajes nuevos" },
  ];
  const calificaciones = [
    { t: "Evaluación 1", nota: 5.8 },
    { t: "Participación", nota: 6.5 },
    { t: "Proyecto U1", nota: "-" },
  ];

  if (!curso) {
    return (
      <main style={{ minHeight: "60vh", background: "#fff" }}>
        <Container className="py-4">
          <h1>Curso no encontrado</h1>
          <Button as="a" href="/estudiantes" variant="primary">Volver a Mis cursos</Button>
        </Container>
      </main>
    );
  }

  return (
    <main style={{ background: "#f6f7fb", minHeight: "100vh", padding: "20px 0" }}>
      <Container>
        {/* Header */}
        <Row className="mb-3 align-items-center">
          <Col>
            <div className="d-flex align-items-center gap-2">
              <Badge bg={curso.color}>{curso.category}</Badge>
              <h2 style={{ fontWeight: 800, margin: 0 }}>{curso.title}</h2>
            </div>
            <div style={{ opacity:.8 }}>Docente: {curso.teacher}</div>
          </Col>
          <Col md="auto">
            <Button as="a" href="/estudiantes" variant="outline-secondary" size="sm">← Volver a Mis cursos</Button>
          </Col>
        </Row>

        {/* Tabs */}
        <Nav variant="tabs" activeKey={tab} onSelect={(k)=>setTab(k)} className="mb-3">
          <Nav.Item><Nav.Link eventKey="inicio">🏠 Inicio</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="contenidos">📚 Contenidos</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="evaluaciones">📝 Evaluaciones</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="participacion">💬 Participación</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="notas">📊 Calificaciones</Nav.Link></Nav.Item>
        </Nav>

        {/* Contenido por pestaña */}
        {tab === "inicio" && (
          <Row>
            <Col lg={8}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Bienvenido/a 👋</Card.Title>
                  <p>Revisa la sección <strong>Contenidos</strong> para comenzar.</p>
                </Card.Body>
              </Card>

              <Card>
                <Card.Body>
                  <Card.Title>Anuncios</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Nueva Unidad disponible: Unidad 2 — hoy 09:10</ListGroup.Item>
                    <ListGroup.Item>Sesión en vivo mañana 10:00 — ayer 18:20</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              <Card>
                <Card.Body>
                  <Card.Title>📅 Próximos</Card.Title>
                  <ListGroup>
                    <ListGroup.Item>Control U1 — Viernes</ListGroup.Item>
                    <ListGroup.Item>Foro Debate — Domingo</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {tab === "contenidos" && (
          <Card>
            <Card.Body>
              <Card.Title>Unidades 📘</Card.Title>
              <ListGroup variant="flush">
                {contenidos.map((u,i)=>(
                  <ListGroup.Item key={i}>
                    {u.t} <Button size="sm" variant="link">📎 {u.r}</Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        )}

        {tab === "evaluaciones" && (
          <Card>
            <Card.Body>
              <Card.Title>Evaluaciones 📝</Card.Title>
              <ListGroup variant="flush">
                {evaluaciones.map((e,i)=>(
                  <ListGroup.Item key={i}>
                    {e.t} — {e.estado} {e.nota!=null ? `• Nota: ${e.nota}` : ""}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="mt-3 d-flex gap-2">
                <Button size="sm" variant="primary">Nueva entrega</Button>
                <Button size="sm" variant="outline-secondary">Rúbricas</Button>
              </div>
            </Card.Body>
          </Card>
        )}

        {tab === "participacion" && (
          <Card>
            <Card.Body>
              <Card.Title>Foros 💬</Card.Title>
              <ListGroup variant="flush">
                {foros.map((f,i)=>(
                  <ListGroup.Item key={i}>
                    {f.t} <br/><small className="text-muted">{f.tu}</small>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="mt-3 d-flex gap-2">
                <Button size="sm" variant="outline-primary">Ver todos</Button>
                <Button size="sm" variant="primary">Nuevo hilo</Button>
              </div>
            </Card.Body>
          </Card>
        )}

        {tab === "notas" && (
          <Card>
            <Card.Body>
              <Card.Title>Calificaciones 📊</Card.Title>
              <ListGroup variant="flush">
                {calificaciones.map((n,i)=>(
                  <ListGroup.Item key={i}>{n.t} — {n.nota}</ListGroup.Item>
                ))}
              </ListGroup>
              <div className="mt-3 d-flex gap-2">
                <Button size="sm" variant="outline-secondary">Descargar boletín</Button>
              </div>
            </Card.Body>
          </Card>
        )}
      </Container>
    </main>
  );
}


