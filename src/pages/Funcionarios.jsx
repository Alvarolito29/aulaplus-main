import { Container, Row, Col, Card } from 'react-bootstrap';

const funcionarios = [
  {
    nombre: 'María González',
    cargo: 'Directora Administrativa',
    descripcion: 'Responsable de la gestión global del establecimiento, coordinación de áreas y supervisión de procesos institucionales.',
    foto: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    nombre: 'Carlos Pérez',
    cargo: 'Encargado de Finanzas',
    descripcion: 'Gestión de presupuestos, pagos, compras y rendiciones. Asegura la transparencia y el uso eficiente de los recursos.',
    foto: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    nombre: 'Ana Torres',
    cargo: 'Secretaria Académica',
    descripcion: 'Apoyo administrativo a la dirección y coordinación de matrículas, certificados y atención a apoderados.',
    foto: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    nombre: 'Luis Ramírez',
    cargo: 'Inspector General',
    descripcion: 'Supervisa la convivencia escolar, disciplina y seguridad en el recinto.',
    foto: 'https://randomuser.me/api/portraits/men/41.jpg',
  },
  {
    nombre: 'Patricia Soto',
    cargo: 'Encargada de Recursos Humanos',
    descripcion: 'Gestión de contratos, licencias, capacitaciones y bienestar del personal.',
    foto: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    nombre: 'Jorge Medina',
    cargo: 'Auxiliar de Servicios',
    descripcion: 'Apoya en la mantención, limpieza y logística de las instalaciones.',
    foto: 'https://randomuser.me/api/portraits/men/55.jpg',
  },
];

export default function Funcionarios() {
  return (
    <main>
      {/* Hero funcionarios */}
      <section style={{ background:'linear-gradient(135deg, #003049 0%, #1a759f 100%)', color:'#fff', minHeight:220, display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
        <Container>
          <div style={{ padding:'64px 0', textAlign:'center', position:'relative', zIndex:2 }}>
            <span style={{
              display:'inline-block',
              background:'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
              color:'#003049',
              padding:'8px 24px',
              borderRadius:20,
              fontWeight:700,
              fontSize:16,
              marginBottom:18,
              letterSpacing:1,
            }}>Funcionarios y Personal</span>
            <h1 style={{ fontWeight:800, fontSize:'2.7rem', margin:'18px 0 10px', letterSpacing:'-1px', textShadow:'0 4px 24px rgba(0,0,0,0.18)' }}>Nuestro Equipo de Apoyo</h1>
            <p style={{ opacity:.97, maxWidth:760, margin:'0 auto', fontSize:'1.18rem', color:'#e0e6ed' }}>
              Conoce a los funcionarios y personal administrativo que hacen posible el funcionamiento y la excelencia de nuestra institución. Su labor es fundamental para el bienestar de toda la comunidad educativa.
            </p>
          </div>
        </Container>
      </section>


      {/* Perfiles de funcionarios */}
      <section style={{ padding:'56px 0', background:'linear-gradient(135deg, #f8fafc 0%, #e9ecef 100%)' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ fontWeight:800, color:'#003049', fontSize:'2.1rem', marginBottom:10 }}>Personal no docente</h2>
            <p style={{ color:'#555', fontSize:'1.08rem', maxWidth:600, margin:'0 auto' }}>
              Administrativos, inspectores, auxiliares y encargados que apoyan la gestión y el día a día escolar.
            </p>
          </div>
          <Row className="g-4">
            {funcionarios.map((f, i) => (
              <Col md={6} lg={4} key={i}>
                <Card style={{ border:'none', borderRadius:18, boxShadow:'0 4px 18px rgba(0,0,0,0.08)', overflow:'hidden', minHeight:340 }} className="h-100">
                  <div style={{ background:'#e9ecef', display:'flex', alignItems:'center', justifyContent:'center', height:160 }}>
                    <img src={f.foto} alt={f.nombre} style={{ width:90, height:90, borderRadius:'50%', objectFit:'cover', border:'4px solid #fff', boxShadow:'0 2px 8px rgba(0,0,0,0.08)' }} />
                  </div>
                  <Card.Body style={{ padding:24 }}>
                    <h5 style={{ fontWeight:700, color:'#003049', marginBottom:6 }}>{f.nombre}</h5>
                    <div style={{ color:'#1a759f', fontWeight:600, marginBottom:10 }}>{f.cargo}</div>
                    <Card.Text style={{ color:'#555', fontSize:'1.01rem' }}>{f.descripcion}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Franja de contacto */}
      <section style={{ background:'linear-gradient(90deg, #1a759f 0%, #004aad 100%)', color:'#fff', padding:'32px 0', marginTop:32 }}>
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <h3 style={{ fontWeight:800, marginBottom:6 }}>¿Tienes dudas o necesitas ayuda administrativa?</h3>
              <p style={{ fontSize:'1.08rem', marginBottom:0 }}>Nuestro equipo de funcionarios está disponible para apoyarte en todo momento. Escríbenos y te responderemos a la brevedad.</p>
            </Col>
            <Col md={4} className="text-md-end text-center" style={{marginTop:12}}>
              <a href="/contact" style={{ background:'#fff', color:'#004aad', fontWeight:700, padding:'12px 32px', borderRadius:24, textDecoration:'none', fontSize:'1.1rem', boxShadow:'0 2px 8px rgba(0,0,0,0.08)', display:'inline-block' }}>Contactar Funcionarios</a>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}

