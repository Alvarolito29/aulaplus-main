import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function Profesores() {
  return (
    <main>
      {/* Hero */}
      <section style={{ background:'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', color:'#fff' }}>
        <Container>
          <div style={{ padding:'56px 0' }}>
            <h1 style={{ fontWeight:800 }}>Portal Docente</h1>
            <p style={{ opacity:.95, maxWidth:760 }}>
              Herramientas para planificar, evaluar y acompañar el aprendizaje.
            </p>
          </div>
        </Container>
      </section>

      {/* Herramientas */}
      <section style={{ padding:'48px 0' }}>
        <Container>
          <Row className="g-4">
            {tools.map((t, i) => (
              <Col md={6} lg={3} key={i}>
                <Card style={styles.card} className="h-100">
                  <Card.Body className="p-4 text-center">
                    <div style={styles.icon}>{t.icon}</div>
                    <h5 style={styles.title}>{t.title}</h5>
                    <p style={styles.text}>{t.text}</p>
                    <Button variant="primary" size="sm">Abrir</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Desarrollo profesional */}
      <section style={{ background:'#f8f9fa', padding:'56px 0' }}>
        <Container>
          <Row className="g-4 align-items-center">
            <Col lg={6}>
              <h2 style={{ fontWeight:800 }}>Desarrollo profesional</h2>
              <p style={{ color:'#555' }}>
                Programas de capacitación continua y comunidades de aprendizaje docente.
              </p>
              <ul style={{ color:'#555' }}>
                <li>Planificación por competencias</li>
                <li>Evaluación formativa y retroalimentación</li>
                <li>Integración de tecnología en el aula</li>
                <li>Bienestar y gestión del curso</li>
              </ul>
            </Col>
            <Col lg={6}>
              <Row className="g-3">
                {['📚', '🧪', '💻', '🧭'].map((ic, i) => (
                  <Col xs={6} key={i}>
                    <div style={styles.tile}>
                      <span style={{ fontSize:32 }}>{ic}</span>
                      <div style={{ fontWeight:700 }}>Workshop</div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}

const tools = [
  { icon:'🗓️', title:'Planificaciones', text:'Organiza unidades y clases.' },
  { icon:'📝', title:'Evaluaciones', text:'Crea y corrige evaluaciones.' },
  { icon:'📈', title:'Reportes', text:'Analiza desempeño del curso.' },
  { icon:'💬', title:'Comunicación', text:'Mensajería con estudiantes/apoderados.' },
];

const styles = {
  card: { border:'none', borderRadius:16, boxShadow:'0 4px 12px rgba(0,0,0,0.08)' },
  icon: { fontSize:40, marginBottom:12 },
  title: { fontWeight:700 },
  text: { color:'#666', minHeight:48 },
  tile: { background:'#fff', borderRadius:12, boxShadow:'0 4px 12px rgba(0,0,0,0.08)', padding:16, textAlign:'center' },
};
