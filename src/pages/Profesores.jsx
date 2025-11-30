
import React, { useState } from 'react';
import './Profesores.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserCheck, FaChartBar, FaEnvelopeOpenText, FaBell, FaClipboardList, FaUsers, FaBookOpen, FaCalendarAlt } from 'react-icons/fa';

export default function Profesores() {
  // Simulación de datos
  const [notificaciones] = useState([
    { icon: <FaBell />, text: '3 estudiantes con asistencia baja en 2°B' },
    { icon: <FaEnvelopeOpenText />, text: 'Nuevo mensaje de apoderado: Juan Pérez' },
    { icon: <FaClipboardList />, text: 'Evaluación pendiente por corregir en Matemáticas' },
  ]);
  const clasesHoy = [
    { hora: '08:00', asignatura: 'Matemáticas', curso: '2°B', sala: '201' },
    { hora: '10:00', asignatura: 'Lenguaje', curso: '2°B', sala: '201' },
    { hora: '12:00', asignatura: 'Consejo de curso', curso: '2°B', sala: '201' },
  ];
  const resumen = [
    { icon: <FaUserCheck />, label: 'Asistencia promedio', value: '92%' },
    { icon: <FaChartBar />, label: 'Promedio general', value: '5.8' },
    { icon: <FaUsers />, label: 'Estudiantes con riesgo', value: '2' },
    { icon: <FaBookOpen />, label: 'Cursos asignados', value: '3' },
  ];

  return (
    <main style={{ background: '#f6f8fa', minHeight: '100vh' }}>
      {/* Hero y resumen */}
      <section style={{ background:'linear-gradient(135deg, #1a1a2e 0%, #004aad 100%)', color:'#fff', borderBottomLeftRadius:32, borderBottomRightRadius:32 }}>
        <Container>
          <div style={{ padding:'56px 0 32px 0' }}>
            <h1 style={{ fontWeight:800, fontSize:'2.6rem', letterSpacing:'-1px' }}>Panel Docente</h1>
            <p style={{ opacity:.95, maxWidth:760, fontSize:'1.2rem' }}>
              Accede a tus clases, gestiona asistencia, notas y mantente informado de todo lo relevante para tu labor docente.
            </p>
            <Row className="g-4 mt-4">
              {resumen.map((r, i) => (
                <Col xs={6} md={3} key={i}>
                  <div style={{ background:'rgba(255,255,255,0.12)', borderRadius:16, padding:'24px 0', textAlign:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.07)' }}>
                    <div style={{ fontSize:32, marginBottom:8 }}>{r.icon}</div>
                    <div style={{ fontWeight:700, fontSize:'1.1rem' }}>{r.value}</div>
                    <div style={{ opacity:.85, fontSize:'.98rem' }}>{r.label}</div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </section>

      {/* Notificaciones */}
      <section style={{ background:'#fff', borderRadius:24, margin:'40px auto 0 auto', maxWidth:1100, boxShadow:'0 4px 24px rgba(0,0,0,0.07)', position:'relative', zIndex:2, padding:'32px 0 0 0' }}>
        <Container>
          <Row>
            <Col md={8} className="mb-4 mb-md-0">
              <h4 style={{ fontWeight:700, marginBottom:20 }}>Clases de hoy</h4>
              <div style={{ display:'flex', gap:24, flexWrap:'wrap' }}>
                {clasesHoy.map((c, i) => (
                  <div key={i} style={{ background:'#f1f4f8', borderRadius:12, padding:'18px 28px', minWidth:180, boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
                    <div style={{ fontWeight:700, fontSize:'1.1rem', color:'#004aad' }}>{c.asignatura}</div>
                    <div style={{ fontSize:'.98rem', color:'#222' }}>{c.curso} - Sala {c.sala}</div>
                    <div style={{ fontSize:'.95rem', color:'#666' }}>🕒 {c.hora}</div>
                  </div>
                ))}
              </div>
            </Col>
            <Col md={4}>
              <h4 style={{ fontWeight:700, marginBottom:20 }}>Notificaciones</h4>
              <ul style={{ listStyle:'none', padding:0, margin:0 }}>
                {notificaciones.map((n, i) => (
                  <li key={i} style={{ display:'flex', alignItems:'center', background:'#f8f9fa', borderRadius:10, padding:'12px 16px', marginBottom:12, boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
                    <span style={{ fontSize:22, marginRight:12, color:'#004aad' }}>{n.icon}</span>
                    <span style={{ fontSize:'.98rem', color:'#222' }}>{n.text}</span>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Herramientas principales */}
      <section style={{ padding:'48px 0 32px 0' }}>
        <Container>
          <h3 style={{ fontWeight:800, marginBottom:32 }}>Herramientas docentes</h3>
          <Row className="g-4">
            {tools.map((t, i) => (
              <Col md={6} lg={3} key={i}>
                <Card
                  style={{
                    ...styles.card,
                    transition: 'transform 0.18s cubic-bezier(.4,2,.6,1)',
                    cursor: 'pointer',
                      boxShadow: '0 6px 24px rgba(0,74,173,0.10)',
                  }}
                  className="h-100 tool-card"
                  as={Link}
                  to={t.route}
                  tabIndex={0}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-7px) scale(1.03)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                  onFocus={e => e.currentTarget.style.transform = 'translateY(-7px) scale(1.03)'}
                  onBlur={e => e.currentTarget.style.transform = 'none'}
                >
                  <Card.Body className="p-4 text-center">
                    <div style={styles.icon}>{t.icon}</div>
                    <h5 style={{ ...styles.title, marginBottom: 8 }}>{t.title}</h5>
                    <div style={{ ...styles.text, marginBottom: 18 }}>
                      <div style={{ fontWeight: 500, color: '#222', fontSize: '1.08rem', marginBottom: 2 }}>{t.subtitle}</div>
                      <ul style={{ textAlign: 'left', fontSize: '.98rem', color: '#444', margin: '10px auto 0', paddingLeft: 18, maxWidth: 220, listStyle: 'disc' }}>
                        {t.items.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      style={{ fontWeight: 600, borderRadius: 8, pointerEvents: 'none', opacity: .92 }}
                      tabIndex={-1}
                    >Abrir</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

    </main>
  );
}


const tools = [
  {
    icon: <FaCalendarAlt />,
    title: 'Clases y Horario',
    subtitle: 'Organiza tu día a día docente.',
    items: [
      'Consulta tu horario semanal',
      'Visualiza próximas clases y detalles de la sesión. ',
      'Accede a materiales y planificaciones',
    ],
    route: '/profesores/clases-horario',
  },
  {
    icon: <FaClipboardList />,
    title: 'Asistencia',
    subtitle: 'Controla la asistencia de tus estudiantes.',
    items: [
      'Registra asistencia diaria',
      'Visualiza reportes de inasistencia',
      'Descarga informes en PDF',
    ],
    route: '/profesores/asistencia',
  },
  {
    icon: <FaChartBar />,
    title: 'Notas y Evaluaciones',
    subtitle: 'Gestiona el rendimiento académico.',
    items: [
      'Ingresa y edita calificaciones',
      'Genera reportes de curso',
      'Analiza promedios y tendencias',
    ],
    route: '/profesores/notas-evaluaciones',
  },
  {
    icon: <FaEnvelopeOpenText />,
    title: 'Mensajería',
    subtitle: 'Comunícate de forma efectiva.',
    items: [
      'Envía mensajes a estudiantes',
      'Contacta apoderados fácilmente',
      'Recibe notificaciones importantes',
    ],
    route: '/profesores/mensajeria',
  },
];

const styles = {
  card: { border:'none', borderRadius:16, boxShadow:'0 4px 12px rgba(0,0,0,0.08)', background:'#fff' },
  icon: { fontSize:40, marginBottom:12, color:'#004aad' },
  title: { fontWeight:700 },
  text: { color:'#666', minHeight:48 },
  tile: { background:'#fff', borderRadius:12, boxShadow:'0 4px 12px rgba(0,0,0,0.08)', padding:16, textAlign:'center' },
};
