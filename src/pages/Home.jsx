import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

// Componente para animar números
function AnimatedNumber({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000; // 2 segundos
          const steps = 60;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [target, hasAnimated]);

  return (
    <h3 ref={ref} style={styles.statNumber}>
      {count.toLocaleString()}{suffix}
    </h3>
  );
}

function Home() {
  return (
    <main>
      {/* Hero Banner - Mejorado */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay}>
          <Container>
            <Row className="align-items-center" style={{ minHeight: '600px' }}>
              <Col lg={7}>
                <h1 style={styles.heroTitle}>
                  Bienvenido a <span style={styles.brandAccent}>AulaPlus</span>
                </h1>
                <p style={styles.heroSubtitle}>
                  La plataforma integral que conecta estudiantes, profesores y familias. 
                  Gestión académica, evaluaciones en línea y comunicación efectiva en un solo lugar.
                </p>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <Link to="/cursos" style={{ textDecoration: 'none' }}>
                    <Button size="lg" style={styles.btnPrimary}>
                      Explorar Cursos
                    </Button>
                  </Link>
                  <Link to="/contact" style={{ textDecoration: 'none' }}>
                    <Button size="lg" variant="outline-light" style={styles.btnSecondary}>
                      Contáctanos
                    </Button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        <Container>
          <Row className="g-4 text-center">
            <Col md={3} sm={6}>
              <div style={styles.statCard} className="stat-card">
                <div style={styles.statIcon}>👨‍🎓</div>
                <AnimatedNumber target={1200} suffix="+" />
                <p style={styles.statLabel}>Estudiantes</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div style={styles.statCard} className="stat-card">
                <div style={styles.statIcon}>👨‍🏫</div>
                <AnimatedNumber target={85} suffix="+" />
                <p style={styles.statLabel}>Profesores</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div style={styles.statCard} className="stat-card">
                <div style={styles.statIcon}>📚</div>
                <AnimatedNumber target={40} suffix="+" />
                <p style={styles.statLabel}>Cursos</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div style={styles.statCard} className="stat-card">
                <div style={styles.statIcon}>🏆</div>
                <AnimatedNumber target={98} suffix="%" />
                <p style={styles.statLabel}>Satisfacción</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={styles.sectionTitle}>¿Por qué elegir AulaPlus?</h2>
            <p style={styles.sectionSubtitle}>
              Descubre las ventajas de nuestra plataforma educativa
            </p>
          </div>
          <Row className="g-4">
            {features.map((feature, idx) => (
              <Col md={4} key={idx}>
                <Card style={styles.featureCard} className="feature-card">
                  <Card.Body className="text-center p-4">
                    <div style={styles.featureIcon} className="feature-icon">{feature.icon}</div>
                    <h4 style={styles.featureTitle}>{feature.title}</h4>
                    <p style={styles.featureText}>{feature.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section style={styles.aboutSection}>
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <h2 style={styles.aboutTitle}>Nuestra Misión</h2>
              <p style={styles.aboutText}>
                En AulaPlus nos dedicamos a crear una experiencia educativa excepcional, 
                integrando tecnología de vanguardia con metodologías pedagógicas innovadoras.
              </p>
              <p style={styles.aboutText}>
                Creemos en el potencial de cada estudiante y trabajamos para proporcionar 
                las herramientas necesarias para su desarrollo académico y personal.
              </p>
              <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
                <div style={styles.valueBox}>
                  <strong>✓ Excelencia</strong>
                </div>
                <div style={styles.valueBox}>
                  <strong>✓ Innovación</strong>
                </div>
                <div style={styles.valueBox}>
                  <strong>✓ Comunidad</strong>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div style={styles.imageBox}>
                <div style={styles.imagePlaceholder}>
                  <span style={{ fontSize: 80 }}>🏫</span>
                  <p style={{ marginTop: 16, color: '#666' }}>Instalaciones modernas</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer style={footerStyles.wrap}>
        <Container>
          <Row className="gy-4">
            <Col md={5} className="text-center mx-auto">
              <h5 style={footerStyles.brand}>AulaPlus</h5>
              <p style={footerStyles.text}>
                Dirección de ejemplo 123, Santiago, Chile
              </p>
              <p style={footerStyles.text}>
                <a href="mailto:contacto@aulaplus.cl" style={footerStyles.linkMuted}>
                  contacto@aulaplus.cl
                </a>
              </p>
              <h6 style={footerStyles.section}>Redes Sociales</h6>
              <div style={footerStyles.socialRow}>
                <button type="button" style={footerStyles.socialBtn} aria-label="Twitter/X">X</button>
                <button type="button" style={footerStyles.socialBtn} aria-label="Facebook">f</button>
                <button type="button" style={footerStyles.socialBtn} aria-label="YouTube">▶</button>
              </div>
            </Col>
          </Row>
          <hr style={footerStyles.hr} />
          <p style={footerStyles.quote}>
            Copyright © 2025 AulaPlus. Todos los derechos reservados.
          </p>
        </Container>
      </footer>
    </main>
  );
}

export default Home;

const features = [
  {
    icon: '💻',
    title: 'Plataforma Digital',
    description: 'Accede a todos tus recursos educativos desde cualquier dispositivo, en cualquier momento.'
  },
  {
    icon: '📊',
    title: 'Seguimiento Académico',
    description: 'Monitorea el progreso de tus estudiantes con reportes detallados y análisis en tiempo real.'
  },
  {
    icon: '🤝',
    title: 'Comunicación Efectiva',
    description: 'Mantén conectada a toda la comunidad educativa: profesores, estudiantes y apoderados.'
  },
  {
    icon: '📱',
    title: 'App Móvil',
    description: 'Lleva AulaPlus en tu bolsillo. Notificaciones instantáneas y acceso rápido.'
  },
  {
    icon: '🔒',
    title: 'Seguridad Garantizada',
    description: 'Protección de datos con los más altos estándares de seguridad y privacidad.'
  },
  {
    icon: '🎯',
    title: 'Personalización',
    description: 'Adapta la plataforma a las necesidades específicas de tu institución educativa.'
  }
];

const styles = {
  hero: {
    backgroundImage: 'url(/Portada.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  heroOverlay: {
    background: 'linear-gradient(135deg, rgba(0,74,173,0.75) 0%, rgba(0,102,204,0.70) 100%)',
    color: '#fff',
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: 800,
    marginBottom: 24,
    lineHeight: 1.2,
  },
  brandAccent: {
    background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    marginBottom: 32,
    lineHeight: 1.6,
    opacity: 0.95,
  },
  btnPrimary: {
    background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
    border: 'none',
    color: '#004aad',
    fontWeight: 700,
    padding: '14px 32px',
    borderRadius: 12,
    transition: 'transform 0.2s',
  },
  btnSecondary: {
    borderWidth: 2,
    borderColor: '#fff',
    fontWeight: 700,
    padding: '14px 32px',
    borderRadius: 12,
    transition: 'all 0.2s',
  },
  statsSection: {
    padding: '80px 0',
    background: '#f8f9fa',
  },
  statCard: {
    background: '#fff',
    padding: 32,
    borderRadius: 16,
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
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
  featuresSection: {
    padding: '80px 0',
  },
  sectionTitle: {
    fontSize: 'clamp(2rem, 4vw, 2.5rem)',
    fontWeight: 800,
    color: '#1a1a2e',
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: '1.1rem',
    color: '#666',
  },
  featureCard: {
    border: 'none',
    borderRadius: 16,
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    height: '100%',
  },
  featureIcon: {
    fontSize: 56,
    marginBottom: 20,
  },
  featureTitle: {
    fontSize: '1.4rem',
    fontWeight: 700,
    color: '#1a1a2e',
    marginBottom: 12,
  },
  featureText: {
    color: '#666',
    lineHeight: 1.6,
  },
  aboutSection: {
    padding: '80px 0',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
  },
  aboutTitle: {
    fontSize: '2.5rem',
    fontWeight: 800,
    color: '#1a1a2e',
    marginBottom: 24,
  },
  aboutText: {
    fontSize: '1.1rem',
    color: '#666',
    lineHeight: 1.8,
    marginBottom: 16,
  },
  valueBox: {
    background: '#fff',
    padding: '12px 20px',
    borderRadius: 8,
    color: '#004aad',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  imageBox: {
    background: '#fff',
    borderRadius: 16,
    padding: 40,
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  },
  imagePlaceholder: {
    background: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)',
    borderRadius: 12,
    padding: '80px 40px',
    textAlign: 'center',
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
  btnCta: {
    background: '#ffd700',
    border: 'none',
    color: '#004aad',
    fontWeight: 700,
    padding: '14px 36px',
    borderRadius: 12,
  },
  btnCtaOutline: {
    borderWidth: 2,
    borderColor: '#fff',
    color: '#fff',
    fontWeight: 700,
    padding: '14px 36px',
    borderRadius: 12,
  },
};

const footerStyles = {
  wrap: {
    background: '#004aad',
    color: '#fff',
    padding: '48px 0 28px',
    fontFamily: "'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
  brand: { marginTop: 8, marginBottom: 8, fontWeight: 800, letterSpacing: '.4px' },
  text: { marginBottom: 6, opacity: .9 },
  section: { fontWeight: 700, marginBottom: 8, letterSpacing: '.4px', textTransform: 'uppercase' },
  linkMuted: { color: 'rgba(255,255,255,.85)', textDecoration: 'none' },
  socialRow: { display: 'flex', gap: 8, marginTop: 8, justifyContent: 'center' },
  socialBtn: {
    width: 44, height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    border: '2px solid #fff', borderRadius: 4, color: '#1829b9ff', textDecoration: 'none', fontWeight: 700,
    background: '#fff',
  },
  hr: { borderTop: '1px solid rgba(255,255,255,.25)', margin: '24px 0' },
  quote: { textAlign: 'center', fontStyle: 'italic', opacity: .85, marginBottom: 8 },
};
