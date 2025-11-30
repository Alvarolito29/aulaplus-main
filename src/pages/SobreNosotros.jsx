import { Container, Row, Col, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Componente animado para números
function AnimatedNumber({ value, duration = 1200, format = v => v }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    let startTime = null;
    let frame;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = Math.floor(progress * (value - start) + start);
      setDisplay(current);
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setDisplay(value);
      }
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);
  return <span>{format(display)}</span>;
}

function SobreNosotros() {
  return (
    <main>
      {/* Hero Banner */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay}>
          <Container>
            <div style={{ padding: '80px 0', textAlign: 'center' }}>
              <h1 style={styles.heroTitle}>Sobre Nosotros</h1>
              <p style={styles.heroSubtitle}>
                Conoce nuestra historia, visión y el compromiso que tenemos con la educación de excelencia
              </p>
            </div>
          </Container>
        </div>
      </section>

      {/* Historia Section */}
      <section style={styles.section}>
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <div style={styles.badge}>📖 Nuestra Historia</div>
              <h2 style={styles.sectionTitle}>Más de 25 años transformando vidas</h2>
              <p style={styles.text}>
                Fundado en el año 2000, <strong>AulaPlus</strong> nació con el sueño de revolucionar 
                la educación en Chile, combinando metodologías pedagógicas innovadoras con tecnología 
                de vanguardia para ofrecer una experiencia educativa única.
              </p>
              <p style={styles.text}>
                Desde nuestros humildes inicios con apenas 150 estudiantes, hemos crecido hasta 
                convertirnos en una institución reconocida que alberga a más de 1,200 estudiantes 
                y cuenta con un equipo de 85 profesionales comprometidos con la excelencia académica.
              </p>
              <p style={styles.text}>
                Nuestro enfoque integral contempla no solo el desarrollo académico, sino también 
                el crecimiento personal, social y emocional de cada uno de nuestros estudiantes.
              </p>
            </Col>
            <Col lg={6}>
              <div style={styles.imageBox}>
                <div style={styles.statsGrid}>
                  <div style={styles.statBox} className="stat-box-animated">
                    <h3 style={styles.statNumber} className="stat-number-animated">
                      <AnimatedNumber value={2000} duration={1200} />
                    </h3>
                    <p style={styles.statText}>Año de fundación</p>
                  </div>
                  <div style={styles.statBox} className="stat-box-animated">
                    <h3 style={styles.statNumber} className="stat-number-animated">
                      <AnimatedNumber value={1200} duration={1200} format={v => v.toLocaleString()} />+
                    </h3>
                    <p style={styles.statText}>Estudiantes activos</p>
                  </div>
                  <div style={styles.statBox} className="stat-box-animated">
                    <h3 style={styles.statNumber} className="stat-number-animated">
                      <AnimatedNumber value={85} duration={1200} />+
                    </h3>
                    <p style={styles.statText}>Profesionales</p>
                  </div>
                  <div style={styles.statBox} className="stat-box-animated">
                    <h3 style={styles.statNumber} className="stat-number-animated">
                      <AnimatedNumber value={98} duration={1200} format={v => v + '%'} />
                    </h3>
                    <p style={styles.statText}>Satisfacción</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Valores Section */}
      <section style={styles.valuesSection}>
        <Container>
          <div className="text-center mb-5">
            <div style={styles.badge}>💎 Nuestros Valores</div>
            <h2 style={styles.sectionTitle}>Pilares que nos definen</h2>
            <p style={styles.sectionSubtitle}>
              Principios fundamentales que guían nuestro quehacer educativo
            </p>
          </div>
          <Row className="g-4">
            {valores.map((valor, idx) => (
              <Col md={6} lg={3} key={idx}>
                <Card style={styles.valueCard} className="h-100 value-card-animated">
                  <Card.Body className="text-center p-4">
                    <div style={styles.valueIcon} className="value-icon-animated">{valor.icon}</div>
                    <h4 style={styles.valueTitle}>{valor.title}</h4>
                    <p style={styles.valueText}>{valor.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Equipo Section */}
      <section style={styles.section}>
        <Container>
          <div className="text-center mb-5">
            <div style={styles.badge}>👥 Nuestro Equipo</div>
            <h2 style={styles.sectionTitle}>Liderazgo comprometido</h2>
            <p style={styles.sectionSubtitle}>
              Profesionales apasionados dedicados a la excelencia educativa
            </p>
          </div>
          <Row className="g-4">
            {equipo.map((miembro, idx) => (
              <Col md={6} lg={4} key={idx}>
                <Card style={styles.teamCard}>
                  <Card.Body className="text-center p-4">
                    <div style={styles.avatar}>{miembro.avatar}</div>
                    <h4 style={styles.memberName}>{miembro.name}</h4>
                    <p style={styles.memberRole}>{miembro.role}</p>
                    <p style={styles.memberBio}>{miembro.bio}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <Container>
          <div className="text-center">
            <h2 style={styles.ctaTitle}>¿Quieres ser parte de nuestra comunidad?</h2>
            <p style={styles.ctaText}>
              Descubre cómo podemos acompañarte en tu camino educativo
            </p>
            <Link to="/admision">
              <button style={styles.ctaButton}>Proceso de Admisión</button>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default SobreNosotros;

const valores = [
  {
    icon: '🎯',
    title: 'Excelencia',
    description: 'Buscamos la mejora continua en todos los aspectos de nuestra labor educativa.'
  },
  {
    icon: '🤝',
    title: 'Respeto',
    description: 'Valoramos la diversidad y promovemos un ambiente de tolerancia y empatía.'
  },
  {
    icon: '💡',
    title: 'Innovación',
    description: 'Adoptamos nuevas metodologías y tecnologías para enriquecer el aprendizaje.'
  },
  {
    icon: '❤️',
    title: 'Compromiso',
    description: 'Nos dedicamos plenamente al desarrollo integral de nuestros estudiantes.'
  }
];

const equipo = [
  {
    avatar: '👨‍💼',
    name: 'Dr. Roberto Martínez',
    role: 'Director General',
    bio: '20 años de experiencia en gestión educativa y desarrollo curricular.'
  },
  {
    avatar: '👩‍🏫',
    name: 'Dra. María González',
    role: 'Directora Académica',
    bio: 'Especialista en pedagogía innovadora y evaluación del aprendizaje.'
  },
  {
    avatar: '👨‍💻',
    name: 'Ing. Carlos Rojas',
    role: 'Director de Tecnología',
    bio: 'Experto en plataformas educativas digitales y transformación tecnológica.'
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
  },
  text: {
    fontSize: '1.05rem',
    lineHeight: 1.8,
    color: '#555',
    marginBottom: 16,
  },
  imageBox: {
    background: '#fff',
    borderRadius: 16,
    padding: 30,
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 20,
  },
  statBox: {
    background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f0fe 100%)',
    padding: 30,
    borderRadius: 12,
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: 800,
    color: '#004aad',
    marginBottom: 8,
  },
  statText: {
    fontSize: '0.95rem',
    color: '#666',
    marginBottom: 0,
  },
  valuesSection: {
    padding: '80px 0',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
  },
  valueCard: {
    border: 'none',
    borderRadius: 16,
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transition: 'all 0.3s',
    cursor: 'pointer',
  },
  valueIcon: {
    fontSize: 56,
    marginBottom: 20,
  },
  valueTitle: {
    fontSize: '1.4rem',
    fontWeight: 700,
    color: '#1a1a2e',
    marginBottom: 12,
  },
  valueText: {
    color: '#666',
    lineHeight: 1.6,
  },
  teamCard: {
    border: 'none',
    borderRadius: 16,
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transition: 'all 0.3s',
  },
  avatar: {
    fontSize: 80,
    marginBottom: 20,
  },
  memberName: {
    fontSize: '1.3rem',
    fontWeight: 700,
    color: '#1a1a2e',
    marginBottom: 8,
  },
  memberRole: {
    color: '#004aad',
    fontWeight: 600,
    marginBottom: 12,
  },
  memberBio: {
    color: '#666',
    fontSize: '0.95rem',
    lineHeight: 1.6,
  },
  ctaSection: {
    padding: '100px 0',
    background: 'linear-gradient(135deg, #004aad 0%, #0066cc 100%)',
    color: '#fff',
  },
  ctaTitle: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 800,
    marginBottom: 20,
  },
  ctaText: {
    fontSize: '1.2rem',
    marginBottom: 40,
    opacity: 0.95,
  },
  ctaButton: {
    background: '#ffd700',
    border: 'none',
    color: '#004aad',
    fontWeight: 700,
    padding: '16px 40px',
    borderRadius: 12,
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
};
