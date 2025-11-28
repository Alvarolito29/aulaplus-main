import { Container, Row, Col, Card, Button, Form, Accordion } from 'react-bootstrap';

export default function Admision() {
  return (
    <main>
      {/* Hero */}
      <section style={{ background:'linear-gradient(135deg, #0d6efd 0%, #6610f2 100%)', color:'#fff' }}>
        <Container>
          <div style={{ padding:'56px 0' }}>
            <h1 style={{ fontWeight:800 }}>Proceso de Admisión</h1>
            <p style={{ opacity:.95, maxWidth:820 }}>
              Conoce requisitos, etapas y postula en línea de forma simple.
            </p>
          </div>
        </Container>
      </section>

      {/* Etapas */}
      <section style={{ padding:'40px 0' }}>
        <Container>
          <Row className="g-4">
            {steps.map((s, i) => (
              <Col md={6} lg={3} key={i}>
                <Card className="h-100" style={{ border:'none', borderRadius:16, boxShadow:'0 4px 12px rgba(0,0,0,0.08)' }}>
                  <Card.Body className="p-4">
                    <div style={{ fontSize:28, marginBottom:8 }}>{s.icon}</div>
                    <h5 style={{ fontWeight:700 }}>{s.title}</h5>
                    <p style={{ color:'#666' }}>{s.text}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Requisitos + FAQ */}
      <section style={{ background:'#f8f9fa', padding:'48px 0' }}>
        <Container>
          <Row className="g-4">
            <Col lg={6}>
              <h2 style={{ fontWeight:800 }}>Requisitos</h2>
              <ul style={{ color:'#555' }}>
                <li>Cédula de identidad o pasaporte del estudiante</li>
                <li>Certificado de nacimiento</li>
                <li>Certificados de notas y conducta del año anterior</li>
                <li>Informe de desarrollo (si corresponde)</li>
                <li>Comprobante de domicilio</li>
              </ul>
            </Col>
            <Col lg={6}>
              <h2 style={{ fontWeight:800 }}>Preguntas frecuentes</h2>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>¿Cuándo son las postulaciones?</Accordion.Header>
                  <Accordion.Body>
                    Las postulaciones se abren en septiembre y cierran en noviembre.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>¿Hay entrevista?</Accordion.Header>
                  <Accordion.Body>
                    Sí, se realiza una entrevista familiar y una visita al establecimiento.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>¿Se ofrecen becas?</Accordion.Header>
                  <Accordion.Body>
                    Disponemos de becas y apoyos según evaluación socioeconómica.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mini postulación */}
      <section style={{ padding:'48px 0' }}>
        <Container>
          <Card style={{ border:'none', borderRadius:16, boxShadow:'0 4px 12px rgba(0,0,0,0.08)' }}>
            <Card.Body className="p-4">
              <Row className="g-3 align-items-end">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Nombre del estudiante</Form.Label>
                    <Form.Control placeholder="Ej: Ana Pérez" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Curso al que postula</Form.Label>
                    <Form.Select>
                      <option>PreKinder</option>
                      <option>Kinder</option>
                      <option>1º Básico</option>
                      <option>2º Básico</option>
                      <option>3º Básico</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4} className="text-end">
                  <Button variant="primary">Enviar interés</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </section>
    </main>
  );
}

const steps = [
  { icon:'📝', title:'Postulación', text:'Completa el formulario y adjunta documentos.' },
  { icon:'👨‍👩‍👧', title:'Entrevista', text:'Encuentro con la familia y estudiante.' },
  { icon:'🏫', title:'Visita', text:'Recorrido por el establecimiento y salas.' },
  { icon:'✅', title:'Resultado', text:'Confirmación y proceso de matrícula.' },
];
