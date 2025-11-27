import { Container, Card, Button, Row, Col } from 'react-bootstrap';

function Home() {
  return (
    <main>
      {/* Banner full-width con overlay */}
      <Card className="text-white border-0 rounded-3 overflow-hidden shadow-sm mb-0">
        <Card.Img
          src="/Portada.png"            // 👈 usa /Portada.png si está en /public
          alt="AulaPlus"
          style={{ height: '722px', objectFit: 'cover' }}
        />
        <Card.ImgOverlay
          className="d-flex align-items-center"
          style={{ background: 'rgba(0,0,0,0.45)' }}
        >
          <Container>
            <h1 className="display-5 fw-bold">Bienvenido a AulaPlus</h1>
            <p className="lead mb-3">
              Planes, evaluaciones y comunicación en un solo lugar.
            </p>
            {/* Este botón funciona porque usa href → navegacion por ancla */}
            <Button variant="light" size="lg" href="/demo" className="fw-semibold">
              Panel
            </Button>
          </Container>
        </Card.ImgOverlay>
      </Card>

      {/* ===== Footer institucional ===== */}
      <footer style={footerStyles.wrap}>
        <Container>
          <Row className="gy-4">
            {/* Columna 1: logo + datos */}
            <Col md={5} className="text-center text-md-start">
              {/* <img src="/logo.svg" alt="AulaPlus" height="72" /> */}
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

/* ===== Estilos del footer (inline para que pegues sin más) ===== */
const footerStyles = {
  wrap: {
    background: '#004aad',
    color: '#fff',
    padding: '48px 0 28px',
    fontFamily: "'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    position: 'relative',
    zIndex: 1,
  },
  brand: { marginTop: 8, marginBottom: 8, fontWeight: 800, letterSpacing: '.4px' },
  text: { marginBottom: 6, opacity: .9 },
  section: { fontWeight: 700, marginBottom: 8, letterSpacing: '.4px', textTransform: 'uppercase' },
  ul: { listStyle: 'none', padding: 0, margin: 0, display: 'grid', rowGap: 8 },
  btn: { width: '100%', textAlign: 'left', fontWeight: 600, borderWidth: 2, borderRadius: 6 },
  link: { color: '#fff', textDecoration: 'none' },
  linkMuted: { color: 'rgba(255,255,255,.85)', textDecoration: 'none' },
  socialRow: { display: 'flex', gap: 8, marginTop: 8 },
  socialBtn: {
    width: 44, height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    border: '2px solid #fff', borderRadius: 4, color: '#1829b9ff', textDecoration: 'none', fontWeight: 700,
  },
  hr: { borderTop: '1px solid rgba(255,255,255,.25)', margin: '24px 0' },
  quote: { textAlign: 'center', fontStyle: 'italic', opacity: .85, marginBottom: 8 },
};
