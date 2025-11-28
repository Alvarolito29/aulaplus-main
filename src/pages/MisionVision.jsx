import { Container, Row, Col, Card } from 'react-bootstrap';

function MisionVision() {
  return (
    <main>
      {/* Hero Banner */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay}>
          <Container>
            <div style={{ padding: '80px 0' }}>
              <h1 style={styles.heroTitle}>Misión y Visión</h1>
              <p style={styles.heroSubtitle}>
                Nuestro propósito y hacia dónde nos dirigimos como institución educativa
              </p>
            </div>
          </Container>
        </div>
      </section>

      {/* Misión Section */}
      <section style={styles.section}>
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <div style={styles.iconBox}>
                <span style={{ fontSize: 100 }}>🎯</span>
              </div>
            </Col>
            <Col lg={6}>
              <div style={styles.badge}>Nuestra Misión</div>
              <h2 style={styles.sectionTitle}>Lo que nos mueve cada día</h2>
              <p style={styles.text}>
                <strong>Formar personas íntegras</strong>, capaces de enfrentar los desafíos del siglo XXI 
                con pensamiento crítico, creatividad y valores sólidos, a través de una educación de 
                excelencia que integra tecnología, innovación pedagógica y desarrollo socioemocional.
              </p>
              <p style={styles.text}>
                Nos comprometemos a ofrecer un ambiente educativo inclusivo, seguro y estimulante, 
                donde cada estudiante pueda desarrollar su máximo potencial académico, personal y social, 
                preparándolos para ser ciudadanos responsables y agentes de cambio positivo en la sociedad.
              </p>
              <div style={styles.checkList}>
                {misionPuntos.map((punto, idx) => (
                  <div key={idx} style={styles.checkItem}>
                    <span style={styles.checkIcon}>✓</span>
                    <span style={styles.checkText}>{punto}</span>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Visión Section */}
      <section style={styles.visionSection}>
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6} className="order-lg-2">
              <div style={styles.iconBox}>
                <span style={{ fontSize: 100 }}>🔭</span>
              </div>
            </Col>
            <Col lg={6} className="order-lg-1">
              <div style={styles.badge}>Nuestra Visión</div>
              <h2 style={styles.sectionTitle}>Hacia dónde vamos</h2>
              <p style={styles.text}>
                <strong>Ser reconocidos como la institución educativa líder</strong> en Chile para el año 2030, 
                destacando por nuestra excelencia académica, innovación pedagógica y formación integral de 
                estudiantes que transforman positivamente su entorno.
              </p>
              <p style={styles.text}>
                Aspiramos a ser un referente en la implementación de metodologías educativas del futuro, 
                integrando tecnología de vanguardia, sostenibilidad y desarrollo de habilidades del siglo XXI, 
                manteniendo siempre el foco en la felicidad y el bienestar de nuestra comunidad educativa.
              </p>
              <div style={styles.checkList}>
                {visionPuntos.map((punto, idx) => (
                  <div key={idx} style={styles.checkItem}>
                    <span style={styles.checkIcon}>✓</span>
                    <span style={styles.checkText}>{punto}</span>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Objetivos Estratégicos */}
      <section style={styles.section}>
        <Container>
          <div className="text-center mb-5">
            <div style={styles.badge}>🎖️ Objetivos Estratégicos</div>
            <h2 style={styles.sectionTitle}>Nuestros compromisos institucionales</h2>
            <p style={styles.sectionSubtitle}>
              Metas concretas que guían nuestro desarrollo institucional
            </p>
          </div>
          <Row className="g-4">
            {objetivos.map((objetivo, idx) => (
              <Col md={6} lg={4} key={idx}>
                <Card style={styles.objetivoCard} className="h-100">
                  <Card.Body className="p-4">
                    <div style={styles.objetivoIcon}>{objetivo.icon}</div>
                    <h4 style={styles.objetivoTitle}>{objetivo.title}</h4>
                    <p style={styles.objetivoText}>{objetivo.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Compromisos Section */}
      <section style={styles.compromisosSection}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ ...styles.sectionTitle, color: '#fff' }}>Nuestros Compromisos</h2>
            <p style={{ ...styles.sectionSubtitle, color: 'rgba(255,255,255,0.9)' }}>
              Garantías que ofrecemos a nuestra comunidad educativa
            </p>
          </div>
          <Row className="g-4">
            {compromisos.map((compromiso, idx) => (
              <Col md={6} lg={3} key={idx}>
                <div style={styles.compromisoCard}>
                  <div style={styles.compromisoIcon}>{compromiso.icon}</div>
                  <h5 style={styles.compromisoTitle}>{compromiso.title}</h5>
                  <p style={styles.compromisoText}>{compromiso.text}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </main>
  );
}

export default MisionVision;

const misionPuntos = [
  'Excelencia académica con enfoque personalizado',
  'Desarrollo integral: académico, social y emocional',
  'Integración efectiva de tecnología educativa',
  'Formación en valores y ciudadanía responsable'
];

const visionPuntos = [
  'Liderazgo en innovación pedagógica nacional',
  'Comunidad educativa feliz y comprometida',
  'Graduados destacados en ámbitos diversos',
  'Sostenibilidad y responsabilidad social'
];

const objetivos = [
  {
    icon: '📈',
    title: 'Excelencia Académica',
    description: 'Mantener y mejorar nuestros estándares académicos, alcanzando el top 5% nacional en evaluaciones estandarizadas.'
  },
  {
    icon: '🌐',
    title: 'Innovación Digital',
    description: 'Implementar tecnologías educativas de vanguardia y plataformas digitales que enriquezcan el aprendizaje.'
  },
  {
    icon: '👥',
    title: 'Desarrollo Docente',
    description: 'Invertir en capacitación continua de nuestros profesores en metodologías innovadoras y habilidades del siglo XXI.'
  },
  {
    icon: '🌱',
    title: 'Bienestar Integral',
    description: 'Priorizar la salud mental, emocional y física de estudiantes y colaboradores en todos nuestros programas.'
  },
  {
    icon: '🤝',
    title: 'Alianzas Estratégicas',
    description: 'Establecer colaboraciones con universidades, empresas y organizaciones para enriquecer la experiencia educativa.'
  },
  {
    icon: '🌍',
    title: 'Sostenibilidad',
    description: 'Implementar prácticas ecológicas y formar conciencia ambiental en toda la comunidad educativa.'
  }
];

const compromisos = [
  {
    icon: '⭐',
    title: 'Calidad',
    text: 'Educación de primer nivel'
  },
  {
    icon: '🛡️',
    title: 'Seguridad',
    text: 'Ambiente protegido y seguro'
  },
  {
    icon: '💬',
    title: 'Comunicación',
    text: 'Diálogo abierto y transparente'
  },
  {
    icon: '🎓',
    title: 'Resultados',
    text: 'Éxito académico comprobado'
  }
];

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #004aad 0%, #0066cc 100%)',
    color: '#fff',
  },
  heroOverlay: {
    background: 'rgba(0,0,0,0.1)',
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: 800,
    marginBottom: 20,
  },
  heroSubtitle: {
    fontSize: '1.3rem',
    opacity: 0.95,
    maxWidth: 700,
    margin: '0 auto',
  },
  section: {
    padding: '80px 0',
  },
  visionSection: {
    padding: '80px 0',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
  },
  badge: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
    color: '#004aad',
    padding: '8px 20px',
    borderRadius: 20,
    fontWeight: 700,
    fontSize: 14,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 'clamp(2rem, 4vw, 2.5rem)',
    fontWeight: 800,
    color: '#1a1a2e',
    marginBottom: 20,
  },
  sectionSubtitle: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: 0,
    maxWidth: 700,
    margin: '0 auto',
  },
  text: {
    fontSize: '1.05rem',
    lineHeight: 1.8,
    color: '#555',
    marginBottom: 16,
  },
  iconBox: {
    background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f0fe 100%)',
    borderRadius: 20,
    padding: 60,
    textAlign: 'center',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
  },
  checkList: {
    marginTop: 30,
    display: 'grid',
    gap: 16,
  },
  checkItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkIcon: {
    background: '#004aad',
    color: '#fff',
    width: 24,
    height: 24,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 14,
    flexShrink: 0,
  },
  checkText: {
    fontSize: '1rem',
    color: '#555',
    lineHeight: 1.6,
  },
  objetivoCard: {
    border: 'none',
    borderRadius: 16,
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transition: 'all 0.3s',
  },
  objetivoIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  objetivoTitle: {
    fontSize: '1.3rem',
    fontWeight: 700,
    color: '#1a1a2e',
    marginBottom: 12,
  },
  objetivoText: {
    color: '#666',
    lineHeight: 1.6,
    fontSize: '0.95rem',
  },
  compromisosSection: {
    padding: '80px 0',
    background: 'linear-gradient(135deg, #004aad 0%, #0066cc 100%)',
    color: '#fff',
  },
  compromisoCard: {
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: 16,
    padding: 30,
    textAlign: 'center',
    border: '1px solid rgba(255,255,255,0.2)',
    transition: 'all 0.3s',
  },
  compromisoIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  compromisoTitle: {
    fontSize: '1.2rem',
    fontWeight: 700,
    marginBottom: 8,
  },
  compromisoText: {
    fontSize: '0.95rem',
    opacity: 0.9,
    marginBottom: 0,
  },
};
