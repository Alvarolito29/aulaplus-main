
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const noticiasEventos = [
  {
    titulo: 'Inauguración de la nueva biblioteca',
    fecha: '15 de diciembre de 2025',
    descripcion: 'Celebramos la apertura de un espacio moderno para el aprendizaje y la lectura. El evento contó con la presencia de autoridades, estudiantes y familias, quienes recorrieron las nuevas instalaciones y participaron en actividades culturales.',
    imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    tipo: 'Noticia',
    detalles: 'La biblioteca cuenta con más de 10,000 libros, zonas de estudio colaborativo y acceso a recursos digitales de última generación.'
  },
  {
    titulo: 'Feria de Ciencias 2025',
    fecha: '10 de enero de 2026',
    descripcion: 'Estudiantes presentan sus proyectos innovadores en la feria anual de ciencias. Este año, la temática fue la sostenibilidad y la tecnología aplicada a la vida diaria.',
    imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    tipo: 'Evento',
    detalles: 'Participaron más de 30 equipos, con proyectos destacados en energías renovables, robótica y biotecnología.'
  },
  {
    titulo: 'Concierto de fin de año',
    fecha: '20 de diciembre de 2025',
    descripcion: 'Disfruta de la música y el talento de nuestros estudiantes en el auditorio principal. El repertorio incluyó piezas clásicas y modernas, interpretadas por la orquesta y el coro escolar.',
    imagen: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    tipo: 'Evento',
    detalles: 'El evento fue transmitido en vivo y recibió excelentes comentarios de la comunidad.'
  },
  {
    titulo: 'Reconocimiento a docentes destacados',
    fecha: '5 de diciembre de 2025',
    descripcion: 'Premiamos la dedicación y excelencia de nuestro equipo docente. Se entregaron distinciones a profesores por su innovación y compromiso con la educación.',
    imagen: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=600&q=80',
    tipo: 'Noticia',
    detalles: 'Los docentes reconocidos participarán en un programa internacional de intercambio educativo.'
  },
  {
    titulo: 'Taller de habilidades digitales',
    fecha: '8 de enero de 2026',
    descripcion: 'Nuevo taller dirigido a estudiantes y apoderados para potenciar el uso seguro y creativo de la tecnología en el aprendizaje.',
    imagen: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
    tipo: 'Evento',
    detalles: 'Incluye sesiones prácticas sobre programación, ciberseguridad y herramientas colaborativas.'
  },
  {
    titulo: 'Campaña solidaria de verano',
    fecha: '2 de enero de 2026',
    descripcion: 'Nuestra comunidad se une para recolectar útiles escolares y alimentos para familias vulnerables. ¡Súmate y haz la diferencia!',
    imagen: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80',
    tipo: 'Noticia',
    detalles: 'Puntos de acopio disponibles en la entrada principal hasta el 20 de enero.'
  },
];

const NoticiasEventos = () => {
  return (
    <main style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e9ecef 100%)', minHeight: '100vh', padding: '60px 0' }}>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <span style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #004aad 0%, #0066cc 100%)',
            color: '#fff',
            padding: '8px 24px',
            borderRadius: 20,
            fontWeight: 700,
            fontSize: 16,
            marginBottom: 18,
            letterSpacing: 1,
          }}>
            Noticias y Eventos
          </span>
          <h1 style={{ fontWeight: 800, fontSize: '2.7rem', color: '#1a1a2e', marginBottom: 12 }}>Actualidad y próximos eventos</h1>
          <p style={{ color: '#555', fontSize: '1.15rem', maxWidth: 600, margin: '0 auto' }}>
            Mantente informado sobre las últimas noticias y participa en los eventos más importantes de nuestra comunidad educativa.
          </p>
        </div>
        <Row className="g-4">
          {noticiasEventos.map((item, idx) => (
            <Col md={6} lg={4} key={idx}>
              <Card style={{ border: 'none', borderRadius: 18, boxShadow: '0 4px 18px rgba(0,0,0,0.08)', overflow: 'hidden', transition: 'transform 0.2s', minHeight: 440 }} className="h-100">
                <div style={{ height: 180, overflow: 'hidden' }}>
                  <Card.Img src={item.imagen} alt={item.titulo} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                </div>
                <Card.Body style={{ padding: 24 }}>
                  <span style={{
                    display: 'inline-block',
                    background: item.tipo === 'Evento' ? 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)' : 'linear-gradient(135deg, #004aad 0%, #0066cc 100%)',
                    color: item.tipo === 'Evento' ? '#1a1a2e' : '#fff',
                    padding: '4px 14px',
                    borderRadius: 12,
                    fontWeight: 600,
                    fontSize: 13,
                    marginBottom: 10,
                  }}>{item.tipo}</span>
                  <Card.Title style={{ fontWeight: 700, fontSize: '1.25rem', color: '#1a1a2e', marginBottom: 8 }}>{item.titulo}</Card.Title>
                  <Card.Text style={{ color: '#666', fontSize: '1rem', marginBottom: 12 }}>{item.descripcion}</Card.Text>
                  <div style={{ color: '#004aad', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{item.fecha}</div>
                  {item.detalles && (
                    <div style={{ fontSize: '0.97rem', color: '#888', borderTop: '1px solid #eee', paddingTop: 8 }}>{item.detalles}</div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default NoticiasEventos;
