import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Modal } from 'react-bootstrap';
import Calendar from 'react-calendar';
import './ClasesHorario.css';
import { FaCalendarAlt, FaChalkboardTeacher, FaCloudUploadAlt } from 'react-icons/fa';

export default function ClasesHorario() {
  // Simulación de clases del profesor
  const clases = [
    { id: 1, asignatura: 'Matemáticas', curso: '2°B', sala: '201', inicio: '2025-11-29T08:00', fin: '2025-11-29T09:30' },
    { id: 2, asignatura: 'Lenguaje', curso: '2°B', sala: '201', inicio: '2025-11-29T10:00', fin: '2025-11-29T11:30' },
    { id: 3, asignatura: 'Consejo de curso', curso: '2°B', sala: '201', inicio: '2025-11-29T12:00', fin: '2025-11-29T13:00' },
    { id: 4, asignatura: 'Historia', curso: '1°A', sala: '105', inicio: '2025-11-30T09:00', fin: '2025-11-30T10:30' },
  ];

  const [date, setDate] = useState(new Date());
  const [material, setMaterial] = useState({ claseId: '', archivo: null });
  const [mensaje, setMensaje] = useState('');

  // Buscar próxima clase
  const ahora = new Date();
  const proximaClase = clases.filter(c => new Date(c.inicio) > ahora).sort((a, b) => new Date(a.inicio) - new Date(b.inicio))[0];

  // (clasesDia ya no se usa en la vista actual)

  const handleMaterialChange = e => {
    setMaterial({ ...material, [e.target.name]: e.target.value || e.target.files?.[0] });
  };
  const handleMaterialSubmit = e => {
    e.preventDefault();
    setMensaje('¡Material subido correctamente!');
    setTimeout(() => setMensaje(''), 2500);
  };

  // --- NUEVO: CALENDARIO COMPACTO Y MODAL ---
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const [viewDate, setViewDate] = useState(new Date(date));
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const [showModal, setShowModal] = useState(false);

  // Eventos del mes (simulación, puedes adaptar a tus datos reales)
  const eventos = [
    { dia: 3, texto: 'Inicio del Año Escolar', tipo: 'inicio', descripcion: 'Comienzo oficial del año escolar para todos los cursos.' },
    { dia: 7, texto: 'Bienvenida de curso', tipo: 'social', descripcion: 'Actividad de bienvenida para los estudiantes.' },
    { dia: 10, texto: 'Entrega Materiales JUNAEB', tipo: 'material', descripcion: 'Entrega de materiales escolares JUNAEB.' },
    { dia: 14, texto: 'Prueba Diagnóstica Lenguaje', tipo: 'prueba', descripcion: 'Evaluación diagnóstica de lenguaje para todos los cursos.' },
    { dia: 17, texto: 'Convivencia curso', tipo: 'social', descripcion: 'Jornada de convivencia y actividades grupales.' },
    { dia: 21, texto: 'Prueba Diagnóstica Matemáticas', tipo: 'prueba', descripcion: 'Evaluación diagnóstica de matemáticas.' },
    { dia: 24, texto: 'Visita Inspectora General', tipo: 'visita', descripcion: 'Supervisión y visita de la Inspectora General.' },
    { dia: 26, texto: 'Simulacro de Emergencia', tipo: 'simulacro', descripcion: 'Simulacro general de emergencia escolar.' },
    { dia: 28, texto: 'Viernes Santo (Feriado)', tipo: 'feriado', descripcion: 'Día feriado nacional.' },
  ];

  // Modal para evento seleccionado
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  const tileContent = ({ date: d, view }) => {
    if (view === 'month') {
      const evento = eventos.find(ev => ev.dia === d.getDate() && d.getMonth() === month);
      if (evento) {
        // Colores por tipo
        const tipoColor = {
          inicio: '#2563eb',
          social: '#06b6d4',
          material: '#a3e635',
          prueba: '#f59e42',
          visita: '#6366f1',
          simulacro: '#f43f5e',
          feriado: '#64748b',
        };
        const color = tipoColor[evento.tipo] || '#2563eb';
        const texto = evento.texto.length > 18 ? evento.texto.slice(0, 16) + '…' : evento.texto;
        return (
          <div
            className="evento-dia"
            title={evento.texto}
            style={{ background: color, cursor: 'pointer' }}
            onClick={e => { e.stopPropagation(); setEventoSeleccionado(evento); }}
          >
            {texto}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="prof-bg-gradient min-vh-100 py-5">
      <Container>
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold text-primary display-5 mb-2" style={{letterSpacing:'-1px'}}>Clases y Horario</h2>
            <p className="lead" style={{color:'#333'}}>Consulta y organiza tu horario semanal, visualiza tus próximas clases y accede rápidamente a materiales y planificaciones.</p>
          </Col>
        </Row>
        <Row className="g-4 mb-4 justify-content-center align-items-stretch">
          <Col md={4} className="d-flex align-items-stretch">
            <Card className="prof-card w-100 text-center p-2 d-flex flex-column justify-content-between">
              <Card.Body className="d-flex flex-column align-items-center justify-content-between h-100">
                <div className="prof-icon-circle bg-primary mb-2 mx-auto"><FaCalendarAlt size={28} color="#fff" /></div>
                <Card.Title className="fw-bold" style={{fontSize:'1.2rem'}}>Calendario</Card.Title>
                <div className="mb-2 w-100">
                  <Calendar
                    value={viewDate}
                    onActiveStartDateChange={({ activeStartDate }) => setViewDate(activeStartDate)}
                    onChange={setDate}
                    className="calendar-compact"
                    tileContent={tileContent}
                    activeStartDate={new Date(year, month, 1)}
                    prev2Label={null}
                    next2Label={null}
                  />
                </div>
                <Button size="sm" variant="outline-primary" onClick={()=>setShowModal(true)} className="mb-2 w-100">
                  Ver calendario grande
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="d-flex align-items-stretch">
            <Card className="prof-card w-100 text-center d-flex flex-column justify-content-between">
              <Card.Body className="d-flex flex-column align-items-center justify-content-between h-100">
                <div className="prof-icon-circle bg-success mb-3 mx-auto"><FaChalkboardTeacher size={32} color="#fff" /></div>
                <Card.Title className="fw-bold">Próximas Clases</Card.Title>
                <Card.Text>
                  {proximaClase ? (
                    <>
                      <strong>Tu próxima clase:</strong><br/>
                      {proximaClase.asignatura} ({proximaClase.curso})<br/>
                      {new Date(proximaClase.inicio).toLocaleDateString()}<br/>
                      {new Date(proximaClase.inicio).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})} - {new Date(proximaClase.fin).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})} | Sala {proximaClase.sala}
                    </>
                  ) : 'No tienes clases próximas programadas.'}
                </Card.Text>
                <Button variant="success" className="w-100 mb-2">Ver Detalles</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="d-flex align-items-stretch">
            <Card className="prof-card w-100 text-center d-flex flex-column justify-content-between">
              <Card.Body className="d-flex flex-column align-items-center justify-content-between h-100">
                <div className="prof-icon-circle bg-secondary mb-3 mx-auto"><FaCloudUploadAlt size={32} color="#fff" /></div>
                <Card.Title className="fw-bold">Materiales y Planificaciones</Card.Title>
                <Card.Text>
                  Sube materiales escolares y planificaciones para tus clases. Selecciona la clase a la que deseas asociar el material.
                </Card.Text>
                <Form onSubmit={handleMaterialSubmit} className="mb-2 w-100">
                  <Form.Group className="mb-2" controlId="claseSelect">
                    <Form.Select name="claseId" value={material.claseId} onChange={handleMaterialChange} required>
                      <option value="">Selecciona una clase</option>
                      {clases.map(c => (
                        <option key={c.id} value={c.id}>{c.asignatura} ({c.curso}) - {new Date(c.inicio).toLocaleDateString()}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="archivoInput">
                    <Form.Control type="file" name="archivo" onChange={handleMaterialChange} required />
                  </Form.Group>
                  <Button type="submit" variant="secondary" className="w-100">Subir Material</Button>
                </Form>
                {mensaje && <Alert variant="success" className="mt-2">{mensaje}</Alert>}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* Botones de navegación global mejorados */}
        <Row className="justify-content-center mt-4">
          <Col xs={12} className="d-flex justify-content-center gap-3">
            {/* No mostrar botón de la página actual */}
            {/* window.location.pathname puede variar según el router, aquí se asume '/clases-horario' */}
            {window.location.pathname !== '/profesores/clases-horario' && (
              <Button
                variant="outline-success"
                className="rounded-pill px-4 nav-btn-shadow"
                style={{minWidth:220, fontWeight:500, fontSize:'1.08em', borderWidth:2}}
                onClick={()=>window.location.href='/clases-horario'}
              >
                Ir a Clases y Horario
              </Button>
            )}
            {window.location.pathname !== '/profesores/asistencia' && (
              <Button
                variant="outline-success"
                className="rounded-pill px-4 nav-btn-shadow"
                style={{minWidth:220, fontWeight:500, fontSize:'1.08em', borderWidth:2}}
                onClick={()=>window.location.href='/profesores/asistencia'}
              >
                Ir a Asistencia
              </Button>
            )}
            {window.location.pathname !== '/notas-evaluaciones' && (
              <Button
                variant="outline-success"
                className="rounded-pill px-4 nav-btn-shadow"
                style={{minWidth:220, fontWeight:500, fontSize:'1.08em', borderWidth:2}}
                onClick={()=>window.location.href='/notas-evaluaciones'}
              >
                Ir a Notas y Evaluaciones
              </Button>
            )}
            {window.location.pathname !== '/mensajeria' && (
              <Button
                variant="outline-success"
                className="rounded-pill px-4 nav-btn-shadow"
                style={{minWidth:220, fontWeight:500, fontSize:'1.08em', borderWidth:2}}
                onClick={()=>window.location.href='/mensajeria'}
              >
                Ir a Mensajería
              </Button>
            )}
          </Col>
        </Row>

        <Modal show={showModal} onHide={()=>setShowModal(false)} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Calendario Escolar — {meses[month]}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-end mb-2">
              <select className="form-select w-auto" value={month} onChange={e => {
                const newMonth = parseInt(e.target.value, 10);
                setViewDate(new Date(year, newMonth, 1));
                setDate(new Date(year, newMonth, 1));
              }}>
                {meses.map((m, idx) => (
                  <option key={m} value={idx}>{m}</option>
                ))}
              </select>
            </div>
            <Calendar
              value={viewDate}
              onActiveStartDateChange={({ activeStartDate }) => setViewDate(activeStartDate)}
              onChange={setDate}
              className="panel-alumno-calendar"
              tileContent={tileContent}
              activeStartDate={new Date(year, month, 1)}
              prev2Label={null}
              next2Label={null}
            />
          </Modal.Body>
        </Modal>

        {/* Modal de información de evento */}
        <Modal show={!!eventoSeleccionado} onHide={()=>setEventoSeleccionado(null)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Detalle del Evento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {eventoSeleccionado && (
              <>
                <h5 style={{color:'#2563eb'}}>{eventoSeleccionado.texto}</h5>
                <p><strong>Tipo:</strong> {eventoSeleccionado.tipo.charAt(0).toUpperCase() + eventoSeleccionado.tipo.slice(1)}</p>
                <p><strong>Fecha:</strong> {eventoSeleccionado.dia} de {meses[month]}</p>
                <p><strong>Descripción:</strong> {eventoSeleccionado.descripcion}</p>
              </>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}
