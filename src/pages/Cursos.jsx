import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const cursos = [
  {
    id: 1,
    nombre: 'Lenguaje y Comunicación',
    descripcion: 'Desarrollo de habilidades de lectura, escritura y comprensión lectora.',
    nivel: 'Básica y Media',
    color: '#e74c3c',
    icono: '📚'
  },
  {
    id: 2,
    nombre: 'Matemáticas',
    descripcion: 'Álgebra, geometría, cálculo y resolución de problemas matemáticos.',
    nivel: 'Básica y Media',
    color: '#3498db',
    icono: '🔢'
  },
  {
    id: 3,
    nombre: 'Inglés',
    descripcion: 'Aprendizaje del idioma inglés: gramática, conversación y comprensión.',
    nivel: 'Básica y Media',
    color: '#2ecc71',
    icono: '🌍'
  },
  {
    id: 4,
    nombre: 'Ciencias Naturales',
    descripcion: 'Biología, física, química y comprensión del mundo natural.',
    nivel: 'Básica y Media',
    color: '#27ae60',
    icono: '🔬'
  },
  {
    id: 5,
    nombre: 'Historia y Geografía',
    descripcion: 'Estudio de la historia de Chile y el mundo, geografía y ciencias sociales.',
    nivel: 'Básica y Media',
    color: '#f39c12',
    icono: '🗺️'
  },
  {
    id: 6,
    nombre: 'Educación Física',
    descripcion: 'Desarrollo físico, deportes, salud y bienestar integral.',
    nivel: 'Básica y Media',
    color: '#e67e22',
    icono: '⚽'
  },
  {
    id: 7,
    nombre: 'Artes Visuales',
    descripcion: 'Expresión artística, dibujo, pintura y apreciación del arte.',
    nivel: 'Básica y Media',
    color: '#9b59b6',
    icono: '🎨'
  },
  {
    id: 8,
    nombre: 'Música',
    descripcion: 'Teoría musical, interpretación de instrumentos y apreciación musical.',
    nivel: 'Básica y Media',
    color: '#8e44ad',
    icono: '🎵'
  },
  {
    id: 9,
    nombre: 'Tecnología',
    descripcion: 'Informática, programación, robótica y uso de herramientas digitales.',
    nivel: 'Básica y Media',
    color: '#34495e',
    icono: '💻'
  },
  {
    id: 10,
    nombre: 'Filosofía',
    descripcion: 'Pensamiento crítico, ética y reflexión sobre grandes preguntas.',
    nivel: 'Media',
    color: '#95a5a6',
    icono: '🤔'
  },
  {
    id: 11,
    nombre: 'Química',
    descripcion: 'Estudio de la materia, reacciones químicas y aplicaciones prácticas.',
    nivel: 'Media',
    color: '#16a085',
    icono: '⚗️'
  },
  {
    id: 12,
    nombre: 'Educación Cívica',
    descripcion: 'Formación ciudadana, derechos, deberes y participación democrática.',
    nivel: 'Básica y Media',
    color: '#d35400',
    icono: '🏛️'
  }
];

function Cursos() {
  const [flippedCards, setFlippedCards] = useState({});

  const handleFlip = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <main style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      {/* Banner con imagen de fondo */}
      <div 
        style={{ 
          background: 'linear-gradient(135deg, #004aad 0%, #0066cc 100%)',
          color: '#fff', 
          padding: '100px 0 120px 0',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Patrón decorativo de fondo */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.3
          }}
        />
        
        <Container style={{ position: 'relative', zIndex: 1 }}>
          <Row className="align-items-center">
            <Col lg={7}>
              <h1 className="display-3 fw-bold mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
                Nuestros Cursos
              </h1>
              <p className="lead mb-4" style={{ fontSize: '1.3rem', lineHeight: '1.6' }}>
                Ofrecemos una amplia variedad de cursos para educación básica y media, 
                diseñados para el desarrollo integral de nuestros estudiantes.
              </p>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '15px 25px', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
                  <h3 className="fw-bold mb-0">10+</h3>
                  <small>Asignaturas</small>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '15px 25px', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
                  <h3 className="fw-bold mb-0">100%</h3>
                  <small>Calidad</small>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '15px 25px', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
                  <h3 className="fw-bold mb-0">24/7</h3>
                  <small>Soporte</small>
                </div>
              </div>
            </Col>
            <Col lg={5} className="d-none d-lg-block text-center">
              <div style={{ fontSize: '200px', opacity: 0.9, textShadow: '4px 4px 8px rgba(0,0,0,0.3)' }}>
                🎓
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Grid de cursos */}
      <Container style={{ marginTop: '-60px', paddingBottom: '60px' }}>
        <Row className="g-4">
          {cursos.map((curso) => (
            <Col key={curso.id} xs={12} sm={6} lg={4}>
              <div 
                style={{ 
                  perspective: '1500px', 
                  height: '100%',
                  minHeight: '450px'
                }}
                onMouseEnter={(e) => {
                  if (!flippedCards[curso.id]) {
                    const card = e.currentTarget.querySelector('.card-front');
                    if (card) {
                      card.style.transform = 'scale(1.05)';
                      card.style.boxShadow = '0 12px 28px rgba(0,74,173,0.2)';
                    }
                  }
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget.querySelector('.card-front');
                  if (card) {
                    card.style.transform = 'scale(1)';
                    card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                  }
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transition: 'transform 0.8s',
                    transformStyle: 'preserve-3d',
                    transform: flippedCards[curso.id] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* FRENTE DE LA TARJETA */}
                  <Card 
                    className="border-0 card-front"
                    style={{ 
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                  >
                {/* Header decorativo del card */}
                <div 
                  style={{
                    background: `linear-gradient(135deg, ${curso.color} 0%, ${curso.color}dd 100%)`,
                    padding: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '48px',
                    minHeight: '120px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ position: 'relative', zIndex: 1 }}>{curso.icono}</div>
                  <div 
                    style={{
                      position: 'absolute',
                      top: '-20px',
                      right: '-20px',
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.1)',
                      filter: 'blur(20px)'
                    }}
                  />
                </div>
                
                <Card.Body className="d-flex flex-column" style={{ padding: '24px' }}>
                  
                  <Card.Title className="fw-bold mb-2" style={{ color: '#2c3e50' }}>
                    {curso.nombre}
                  </Card.Title>
                  
                  <Badge 
                    bg="light" 
                    text="dark" 
                    className="mb-3 align-self-start"
                    style={{ fontSize: '12px' }}
                  >
                    {curso.nivel}
                  </Badge>
                  
                  <Card.Text style={{ color: '#6c757d', flexGrow: 1 }}>
                    {curso.descripcion}
                  </Card.Text>
                  
                  <button 
                    onClick={() => handleFlip(curso.id)}
                    className="btn btn-outline-primary fw-semibold mt-3 w-100"
                    style={{ borderWidth: '2px' }}
                  >
                    Ver más detalles
                  </button>
                </Card.Body>
              </Card>

              {/* REVERSO DE LA TARJETA */}
              <Card 
                className="border-0"
                style={{ 
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: `linear-gradient(135deg, ${curso.color} 0%, ${curso.color}dd 100%)`,
                  color: '#fff'
                }}
              >
                <Card.Body className="d-flex flex-column justify-content-between" style={{ padding: '28px', height: '100%' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '16px' }}>
                      {curso.icono}
                    </div>
                    <h3 className="fw-bold text-center mb-3" style={{ fontSize: '1.5rem' }}>{curso.nombre}</h3>
                    <div style={{ 
                      background: 'rgba(255,255,255,0.2)', 
                      padding: '18px', 
                      borderRadius: '12px', 
                      backdropFilter: 'blur(10px)',
                      flex: 1
                    }}>
                      <h6 className="fw-bold mb-2">Descripción Detallada:</h6>
                      <p className="mb-2" style={{ lineHeight: '1.5', fontSize: '0.95rem' }}>{curso.descripcion}</p>
                      <p className="mb-1" style={{ fontSize: '0.9rem' }}><strong>Nivel:</strong> {curso.nivel}</p>
                      <p className="mb-0" style={{ fontSize: '0.9rem' }}><strong>Modalidad:</strong> Presencial y Online</p>
                    </div>
                  </div>
                  <div style={{ marginTop: '16px' }}>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFlip(curso.id);
                      }}
                      className="btn btn-light fw-semibold w-100"
                      style={{ borderRadius: '8px', padding: '12px', fontSize: '1rem' }}
                    >
                      ← Volver
                    </button>
                  </div>
                </Card.Body>
              </Card>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Sección informativa */}
      <Container className="pb-5">
        <Card 
          className="border-0" 
          style={{ 
            background: 'linear-gradient(135deg, #004aad 0%, #0066cc 100%)',
            color: '#fff',
            borderRadius: '20px',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {/* Patrón decorativo */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              transform: 'translate(30%, -30%)'
            }}
          />
          
          <Card.Body className="p-5" style={{ position: 'relative', zIndex: 1 }}>
            <Row className="align-items-center">
              <Col md={8}>
                <h3 className="fw-bold mb-3" style={{ fontSize: '2rem' }}>
                  ¿Necesitas más información?
                </h3>
                <p className="mb-0" style={{ fontSize: '1.1rem', opacity: 0.95 }}>
                  Si tienes dudas sobre nuestros cursos, horarios, metodologías o requisitos, 
                  no dudes en contactarnos. Nuestro equipo estará encantado de ayudarte.
                </p>
              </Col>
              <Col md={4} className="text-md-end mt-3 mt-md-0">
                <Link 
                  to="/contact" 
                  className="btn btn-light btn-lg fw-semibold"
                  style={{ 
                    borderRadius: '12px',
                    padding: '12px 32px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                >
                  Contáctanos
                </Link>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </main>
  );
}

export default Cursos;
