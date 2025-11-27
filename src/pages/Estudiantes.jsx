import { useState, useMemo, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge, ListGroup, Form } from "react-bootstrap";
import CalendarioPruebas from "../components/CalendarioPruebas";
import eventosEscolares from "../data/eventosEscolares"; // ✔ Import definitivo correcto

// Cursos base
const COURSES_BASE = [
  { id: "historia", title: "Historia", category: "Asignatura", color: "secondary" },
  { id: "lenguaje", title: "Lenguaje", category: "Asignatura", color: "secondary" },
  { id: "matematicas", title: "Matemáticas", category: "Asignatura", color: "secondary" },
  { id: "ingles", title: "Inglés", category: "Asignatura", color: "secondary" },
  { id: "religion", title: "Religión", category: "Asignatura", color: "secondary" },
  { id: "fisica", title: "Física", category: "Asignatura", color: "secondary" },
  { id: "biologia", title: "Biología", category: "Asignatura", color: "secondary" },
  { id: "ed-fisica", title: "Educación Física", category: "Asignatura", color: "secondary" },
  { id: "futbol", title: "Taller de Fútbol", category: "Taller", color: "success" },
];

// ✔ Seguridad: siempre será un array
const EXAM_EVENTS = Array.isArray(eventosEscolares) ? eventosEscolares : [];

export default function Estudiantes() {

  // LocalStorage
  const [studentName, setStudentName] = useState(() => localStorage.getItem("studentName") || "");
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes") || "{}"));
  const [favCourses, setFavCourses] = useState(() => JSON.parse(localStorage.getItem("favCourses") || "[]"));

  const [q, setQ] = useState("");

  useEffect(() => localStorage.setItem("studentName", studentName), [studentName]);
  useEffect(() => localStorage.setItem("notes", JSON.stringify(notes)), [notes]);
  useEffect(() => localStorage.setItem("favCourses", JSON.stringify(favCourses)), [favCourses]);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return COURSES_BASE;

    return COURSES_BASE.filter(c =>
      c.title.toLowerCase().includes(term) ||
      c.category.toLowerCase().includes(term)
    );
  }, [q]);


  function toggleFav(courseId) {
    setFavCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  }

  function updateNote(courseId, text) {
    setNotes(prev => ({ ...prev, [courseId]: text }));
  }


  return (
    <main style={{ background: "#f6f7fb", minHeight: "100vh", padding: "24px 0" }}>
      <Container fluid="xl">

        {/* ENCABEZADO */}
        <Row className="mb-4">
          <Col md={8}>
            <h1 style={{ fontWeight: 800 }}>¡Hola {studentName || "Alumno"}!</h1>
            <p className="text-muted">Tu panel académico y tus actividades del día.</p>
            <Form className="d-flex" style={{ maxWidth: 300 }}>
              <Form.Control
                placeholder="Escribe tu nombre…"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </Form>
          </Col>

          <Col md={4} className="d-flex align-items-end">
            <Form className="w-100" onSubmit={(e) => e.preventDefault()}>
              <Form.Control
                placeholder="Buscar cursos…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </Form>
          </Col>
        </Row>

        <Row className="g-4">

          {/* MENÚ LATERAL */}
          <Col lg={2}>
            <ListGroup style={{ position: "sticky", top: 20 }}>
              <ListGroup.Item active>📰 Actividad</ListGroup.Item>

              <ListGroup.Item action onClick={() =>
                document.getElementById("cursos")?.scrollIntoView({ behavior: "smooth" })
              }>
                📚 Mis cursos
              </ListGroup.Item>

              <ListGroup.Item action onClick={() =>
                document.getElementById("calendario")?.scrollIntoView({ behavior: "smooth" })
              }>
                🗓️ Calendario
              </ListGroup.Item>

              <ListGroup.Item action>📬 Mensajes</ListGroup.Item>
            </ListGroup>
          </Col>

          {/* CONTENIDO PRINCIPAL */}
          <Col lg={7}>

            {/* IMPORTANTE */}
            <section>
              <h5 className="fw-bold mb-3">Importante</h5>

              <Card className="mb-3">
                <Card.Body>
                  <Badge bg="danger" className="mb-2">Anuncio</Badge>
                  <Card.Title>Mantenimiento del Campus</Card.Title>
                  <Card.Text>Domingo 02:00–04:00. Servicios inestables.</Card.Text>
                </Card.Body>
              </Card>
            </section>

            {/* CURSOS */}
            <section id="cursos" className="mt-4">
              <h5 className="fw-bold mb-3">Mis cursos</h5>

              <Row className="g-3">
                {list.map(c => (
                  <Col md={6} key={c.id}>
                    <Card className="shadow-sm" style={{ borderRadius: 14 }}>
                      <Card.Body>

                        <div className="d-flex justify-content-between">
                          <Badge bg={c.color}>{c.category}</Badge>

                          <Button
                            size="sm"
                            variant={favCourses.includes(c.id) ? "warning" : "outline-warning"}
                            onClick={() => toggleFav(c.id)}
                          >
                            ★
                          </Button>
                        </div>

                        <Card.Title className="mt-2">{c.title}</Card.Title>

                        <Form.Group className="mt-2">
                          <Form.Label><small>Notas personales</small></Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder="Escribe algo…"
                            value={notes[c.id] || ""}
                            onChange={(e) => updateNote(c.id, e.target.value)}
                          />
                        </Form.Group>

                        <div className="d-flex gap-2 mt-3">
                          <Button size="sm">Entrar</Button>
                          <Button size="sm" variant="outline-secondary">Contenido</Button>
                        </div>

                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </section>
          </Col>

          {/* CALENDARIO */}
          <Col lg={3}>
            <div id="calendario">
              <CalendarioPruebas events={EXAM_EVENTS} /> {/* ✔ Nunca falla */}
            </div>
          </Col>

        </Row>

      </Container>
    </main>
  );
}
