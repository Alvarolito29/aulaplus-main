import { Container, Row, Col, Card } from 'react-bootstrap';

function Infraestructura() {
  return (
    <main>
      {/* Hero Banner */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay}>
          <Container fluid>
            <div style={styles.heroCenterBox}>
              <h1 style={styles.heroTitle}>Infraestructura</h1>
              <p style={styles.heroSubtitle}>
                Instalaciones modernas diseñadas para potenciar el aprendizaje y el bienestar
              </p>
            </div>
          </Container>
        </div>
      </section>

      {/* Campus Overview */}
      <section style={styles.section}>
        <Container>
          <div className="text-center mb-5">
            <div style={styles.badge}>🏫 Nuestro Campus</div>
            <h2 style={styles.sectionTitle}>Espacios que inspiran</h2>
            <p style={styles.sectionSubtitle}>
              Más de 5,000 m² dedicados a crear la mejor experiencia educativa
            </p>
          </div>
          <Row className="g-4">
            <Col lg={4} md={6}>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>📐</div>
                <h3 style={styles.statNumber}>5,000 m²</h3>
                <p style={styles.statLabel}>Área total del campus</p>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>🚪</div>
                <h3 style={styles.statNumber}>45</h3>
                <p style={styles.statLabel}>Salas equipadas</p>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>🌳</div>
                <h3 style={styles.statNumber}>1,200 m²</h3>
                <p style={styles.statLabel}>Áreas verdes</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Instalaciones Académicas */}
      <section style={styles.instalacionesSection}>
        <Container>
          <div className="text-center mb-5">
            <div style={styles.badge}>📚 Espacios Académicos</div>
            <h2 style={styles.sectionTitle}>Ambientes para el aprendizaje</h2>
          </div>
          <Row className="g-4">
            {instalacionesAcademicas.map((instalacion, idx) => (
              <Col md={6} lg={4} key={idx}>
                <Card style={styles.instalacionCard} className="h-100">
                  <Card.Body className="p-4">
                    <div style={styles.instalacionIcon}>{instalacion.icon}</div>
                    <h4 style={styles.instalacionTitle}>{instalacion.title}</h4>
                    <p style={styles.instalacionDesc}>{instalacion.description}</p>
                    <ul style={styles.featureList}>
                      {instalacion.features.map((feature, i) => (
                        <li key={i} style={styles.featureItem}>
                          <span style={styles.bullet}>•</span> {feature}
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Instalaciones Deportivas */}
      <section style={styles.section}>
        <Container>
          <div className="text-center mb-5">
            <div style={styles.badge}>⚽ Instalaciones Deportivas</div>
            <h2 style={styles.sectionTitle}>Espacios para el desarrollo físico</h2>
          </div>
          <Row className="g-4">
            {instalacionesDeportivas.map((instalacion, idx) => (
              <Col md={6} key={idx}>
                <Card style={styles.deportivaCard}>
                  <Card.Body className="p-4">
                    <div style={styles.deportivaHeader}>
                      <div style={styles.deportivaIcon}>{instalacion.icon}</div>
                      <div>
                        <h4 style={styles.deportivaTitle}>{instalacion.title}</h4>
                        <p style={styles.deportivaArea}>{instalacion.area}</p>
                      </div>
                    </div>
                    <p style={styles.deportivaDesc}>{instalacion.description}</p>
                    <div style={styles.tagContainer}>
                      {instalacion.deportes.map((deporte, i) => (
                        <span key={i} style={styles.tag}>{deporte}</span>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Servicios Adicionales */}
      <section style={styles.serviciosSection}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ ...styles.sectionTitle, color: '#fff' }}>Servicios Complementarios</h2>
            <p style={{ ...styles.sectionSubtitle, color: 'rgba(255,255,255,0.9)' }}>
              Facilidades que enriquecen la experiencia educativa
            </p>
          </div>
          <Row className="g-4">
            {servicios.map((servicio, idx) => (
              <Col md={6} lg={3} key={idx}>
                <div style={styles.servicioCard}>
                  <div style={styles.servicioIcon}>{servicio.icon}</div>
                  <h5 style={styles.servicioTitle}>{servicio.title}</h5>
                  <p style={styles.servicioText}>{servicio.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Tecnología */}
      <section style={styles.section}>
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <div style={styles.badge}>💻 Tecnología</div>
              <h2 style={styles.sectionTitle}>Innovación en cada espacio</h2>
              <p style={styles.text}>
                Nuestras instalaciones están equipadas con tecnología de vanguardia para 
                garantizar una experiencia educativa del siglo XXI.
              </p>
              <div style={styles.techGrid}>
                {tecnologia.map((tech, idx) => (
                  <div key={idx} style={styles.techItem}>
                    <span style={styles.techIcon}>{tech.icon}</span>
                    <span style={styles.techText}>{tech.text}</span>
                  </div>
                ))}
              </div>
            </Col>
            <Col lg={6}>
              <div style={styles.imageBox}>
                <div style={styles.imagePlaceholder}>
                  <span style={{ fontSize: 100 }}>🖥️</span>
                  <p style={{ marginTop: 20, color: '#666', fontSize: '1.1rem' }}>
                    Espacios tecnológicos de última generación
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}

export default Infraestructura;

const instalacionesAcademicas = [
  {
    icon: '🏫',
    title: 'Salas de Clase',
    description: '30 aulas modernas con capacidad flexible',
    features: [
      'Pizarras interactivas',
      'Proyectores 4K',
      'Mobiliario ergonómico',
      'Climatización inteligente'
    ]
  },
  {
    icon: '🔬',
    title: 'Laboratorios',
    description: 'Espacios equipados para ciencias',
    features: [
      'Lab. de Química',
      'Lab. de Física',
      'Lab. de Biología',
      'Equipamiento profesional'
    ]
  },
  {
    icon: '💻',
    title: 'Salas de Computación',
    description: '3 laboratorios tecnológicos',
    features: [
      '120 computadores',
      'Software especializado',
      'Internet de alta velocidad',
      'Impresoras 3D'
    ]
  },
  {
    icon: '📚',
    title: 'Biblioteca',
    description: 'Centro de recursos del aprendizaje',
    features: [
      '+15,000 volúmenes',
      'Sala de estudio silenciosa',
      'Bases de datos digitales',
      'Espacios de lectura'
    ]
  },
  {
    icon: '🎨',
    title: 'Salas de Arte',
    description: 'Talleres creativos equipados',
    features: [
      'Materiales diversos',
      'Mesas amplias',
      'Iluminación profesional',
      'Área de exposición'
    ]
  },
  {
    icon: '🎵',
    title: 'Sala de Música',
    description: 'Espacio acústicamente tratado',
    features: [
      'Instrumentos variados',
      'Equipos de grabación',
      'Aislamiento acústico',
      'Sala de ensayo'
    ]
  }
];

const instalacionesDeportivas = [
  {
    icon: '🏃',
    title: 'Gimnasio Multiuso',
    area: '800 m²',
    description: 'Espacio cubierto con piso especializado, graderías para 300 personas y sistema de iluminación profesional.',
    deportes: ['Básquetbol', 'Vóleibol', 'Fútbol Sala', 'Bádminton']
  },
  {
    icon: '⚽',
    title: 'Cancha de Fútbol',
    area: '1,200 m²',
    description: 'Campo reglamentario con césped sintético de última generación, iluminación nocturna y graderías.',
    deportes: ['Fútbol', 'Rugby', 'Atletismo']
  },
  {
    icon: '🏊',
    title: 'Piscina Temperada',
    area: '25 m',
    description: 'Piscina semiolímpica climatizada, con sistema de filtración automático y áreas de descanso.',
    deportes: ['Natación', 'Waterpolo', 'Aquagym']
  },
  {
    icon: '🏀',
    title: 'Canchas Exteriores',
    area: '600 m²',
    description: 'Dos canchas multipropósito con superficie de acrílico y cerco perimetral. Ideales para la práctica de deportes al aire libre, cuentan con iluminación nocturna, señalización reglamentaria y áreas de descanso para deportistas y espectadores.',
    deportes: ['Tenis', 'Básquetbol', 'Patinaje']
  }
];

const servicios = [
  {
    icon: '🍽️',
    title: 'Cafetería',
    description: 'Menú saludable y nutritivo supervisado por nutricionista'
  },
  {
    icon: '🏥',
    title: 'Enfermería',
    description: 'Atención de primeros auxilios con personal calificado'
  },
  {
    icon: '🚌',
    title: 'Transporte',
    description: 'Servicio de buses con rutas a toda la ciudad'
  },
  {
    icon: '🔒',
    title: 'Seguridad',
    description: 'Vigilancia 24/7 y control de acceso con credencial'
  },
  {
    icon: '🅿️',
    title: 'Estacionamiento',
    description: 'Amplio estacionamiento para familias y personal'
  },
  {
    icon: '♿',
    title: 'Accesibilidad',
    description: 'Instalaciones adaptadas para personas con movilidad reducida'
  },
  {
    icon: '📡',
    title: 'WiFi Campus',
    description: 'Red inalámbrica de alta velocidad en todo el campus'
  },
  {
    icon: '🌱',
    title: 'Áreas Verdes',
    description: 'Espacios de esparcimiento con vegetación nativa'
  }
];

const tecnologia = [
  { icon: '📱', text: 'App móvil institucional' },
  { icon: '🖥️', text: 'Plataforma e-learning' },
  { icon: '📹', text: 'Sistema de videoconferencia' },
  { icon: '🔔', text: 'Notificaciones en tiempo real' },
  { icon: '☁️', text: 'Almacenamiento en la nube' },
  { icon: '🎮', text: 'Herramientas de gamificación' }
];

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #004aad 0%, #0066cc 100%)',
    color: '#fff',
    minHeight: '340px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  heroOverlay: {
    background: 'rgba(0,0,0,0.08)',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  heroCenterBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '340px',
    zIndex: 2,
    position: 'relative',
    width: '100%',
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: 800,
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: '-1px',
    lineHeight: 1.1,
    textShadow: '0 4px 24px rgba(0,0,0,0.18)',
  },
  heroSubtitle: {
    fontSize: '1.35rem',
    opacity: 0.98,
    maxWidth: 700,
    margin: '0 auto',
    textAlign: 'center',
    fontWeight: 400,
    textShadow: '0 2px 8px rgba(0,0,0,0.10)',
  },
  section: {
    padding: '80px 0',
  },
  instalacionesSection: {
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
    maxWidth: 700,
    margin: '0 auto',
  },
  text: {
    fontSize: '1.05rem',
    lineHeight: 1.8,
    color: '#555',
    marginBottom: 24,
  },
  statCard: {
    background: '#fff',
    padding: 32,
    borderRadius: 16,
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    textAlign: 'center',
    transition: 'all 0.3s',
  },
  statIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: 800,
    color: '#004aad',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: 0,
  },
  instalacionCard: {
    border: 'none',
    borderRadius: 16,
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transition: 'all 0.3s',
  },
  instalacionIcon: {
    fontSize: 56,
    marginBottom: 20,
  },
  instalacionTitle: {
    fontSize: '1.4rem',
    fontWeight: 700,
    color: '#1a1a2e',
    marginBottom: 12,
  },
  instalacionDesc: {
    color: '#666',
    marginBottom: 20,
    lineHeight: 1.6,
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  featureItem: {
    color: '#555',
    padding: '6px 0',
    fontSize: '0.95rem',
  },
  bullet: {
    color: '#004aad',
    fontWeight: 700,
    marginRight: 8,
  },
  deportivaCard: {
    border: 'none',
    borderRadius: 16,
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transition: 'all 0.3s',
    minHeight: 260,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch',
  },
  deportivaHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  deportivaIcon: {
    fontSize: 56,
  },
  deportivaTitle: {
    fontSize: '1.4rem',
    fontWeight: 700,
    color: '#1a1a2e',
    marginBottom: 4,
  },
  deportivaArea: {
    color: '#004aad',
    fontWeight: 600,
    marginBottom: 0,
  },
  deportivaDesc: {
    color: '#666',
    lineHeight: 1.6,
    marginBottom: 16,
  },
  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    background: '#e8f0fe',
    color: '#004aad',
    padding: '4px 12px',
    borderRadius: 12,
    fontSize: '0.85rem',
    fontWeight: 600,
  },
  serviciosSection: {
    padding: '80px 0',
    background: 'linear-gradient(135deg, #004aad 0%, #0066cc 100%)',
    color: '#fff',
  },
  servicioCard: {
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: 16,
    padding: 24,
    textAlign: 'center',
    border: '1px solid rgba(255,255,255,0.2)',
    transition: 'all 0.3s',
    height: '100%',
  },
  servicioIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  servicioTitle: {
    fontSize: '1.2rem',
    fontWeight: 700,
    marginBottom: 8,
  },
  servicioText: {
    fontSize: '0.9rem',
    opacity: 0.9,
    marginBottom: 0,
    lineHeight: 1.5,
  },
  techGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 20,
    marginTop: 30,
  },
  techItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '16px 20px',
    background: '#f0f7ff',
    borderRadius: 12,
    transition: 'all 0.3s',
  },
  techIcon: {
    fontSize: 32,
  },
  techText: {
    fontSize: '1rem',
    color: '#1a1a2e',
    fontWeight: 600,
  },
  imageBox: {
    background: '#fff',
    borderRadius: 16,
    padding: 40,
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  },
  imagePlaceholder: {
    background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f0fe 100%)',
    borderRadius: 12,
    padding: '80px 40px',
    textAlign: 'center',
  },
};
