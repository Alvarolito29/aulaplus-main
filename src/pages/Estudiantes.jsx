import { useState, useMemo, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge, ListGroup, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import CalendarioPruebas from "../components/CalendarioPruebas";
import eventosEscolares from "../data/eventosEscolares"; // ✔ Import definitivo correcto
import "./Estudiantes.css";

// Cursos base
const COURSES_BASE = [
  { id: "historia", title: "Historia", category: "Asignatura", color: "secondary" },
  { id: "lenguaje", title: "Lenguaje", category: "Asignatura", color: "secondary" },
  { id: "matematicas", title: "Matemáticas", category: "Asignatura", color: "secondary" },
  { id: "ingles", title: "Inglés", category: "Asignatura", color: "secondary" },
  { id: "religion", title: "Religión", category: "Asignatura", color: "secondary" },
  { id: "fisica", title: "Física", category: "Asignatura", color: "secondary" },
  { id: "biologia", title: "Biología", category: "Asignatura", color: "secondary" },
  { id: "ed-fisica", title: "Educación Física", category: "Asignatura", color: "secondary" },
  { id: "futbol", title: "Taller de Fútbol", category: "Taller", color: "success" },
];

// Contenido ficticio por curso
function getFakeCourseContent(id) {
  const common = {
    historia: {
      description: 'Estudio de procesos históricos y pensamiento crítico aplicado a la sociedad.',
      objectives: ['Comprender hechos históricos', 'Analizar fuentes primarias', 'Relacionar pasado y presente'],
      syllabus: ['Unidad 1: Civilizaciones', 'Unidad 2: Edad Media', 'Unidad 3: Edad Moderna'],
      assignments: ['Ensayo: impacto de la Revolución Industrial', 'Mapa conceptual: economía antigua']
    },
    lenguaje: {
      description: 'Desarrollo de comprensión lectora, expresión escrita y análisis literario.',
      objectives: ['Mejorar lectura crítica', 'Producir textos coherentes', 'Analizar géneros literarios'],
      syllabus: ['Unidad 1: Narrativa', 'Unidad 2: Poesía', 'Unidad 3: Ensayo'],
      assignments: ['Comentario de texto', 'Producción: cuento breve']
    },
    matematicas: {
      description: 'Razonamiento lógico-matemático y resolución de problemas prácticos.',
      objectives: ['Resolver ecuaciones','Aplicar geometría básica','Interpretar datos'],
      syllabus: ['Álgebra básica','Geometría','Función y gráficas'],
      assignments: ['Control de álgebra','Proyecto: datos y gráficas']
    },
  };

  return common[id] || {
    description: 'Descripción general del curso.',
    objectives: ['Objetivo general 1', 'Objetivo general 2'],
    syllabus: ['Unidad A', 'Unidad B'],
    assignments: ['Tarea 1']
  };
}

// ✔ Seguridad: siempre será un array
const EXAM_EVENTS = Array.isArray(eventosEscolares) ? eventosEscolares : [];

export default function Estudiantes() {

  // Estado para el nombre del estudiante
  const [studentName, setStudentName] = useState(() => localStorage.getItem('studentName') || '');

  useEffect(() => {
    localStorage.setItem('studentName', studentName);
  }, [studentName]);

  // LocalStorage
  const [notes] = useState(() => JSON.parse(localStorage.getItem("notes") || "{}"));
  const [favCourses, setFavCourses] = useState(() => JSON.parse(localStorage.getItem("favCourses") || "[]"));

  const [q] = useState("");
  const [activeView, setActiveView] = useState("activities"); // activities | courses | course | calendar | messages
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [completedActivities] = useState(() => JSON.parse(localStorage.getItem('completedActivities')||'[]'));
  const [showMoreActivities, setShowMoreActivities] = useState(false);
  const [dismissedAnnouncements, setDismissedAnnouncements] = useState(() => JSON.parse(localStorage.getItem('dismissedAnnouncements') || '[]'));
  // Announcements derived from upcoming events + manual posts
  const announcements = useMemo(() => {
    const now = new Date();
    const limit = new Date(); limit.setDate(now.getDate() + 90); // next 90 days
    // center announcements (Centro de Alumnos) - recreativos y fines de semana
    const CENTER_ANNOUNCEMENTS = [
      { id: 'c1', date: new Date().toISOString().slice(0,10), title: 'Feria deportiva en el patio (sábado)', course: 'Comunidad', place: 'Patio central', image: 'center-sport' },
      { id: 'c2', date: new Date(new Date().getTime()+86400000*3).toISOString().slice(0,10), title: 'Cine al aire libre - Trae tu manta', course: 'Centro de Alumnos', place: 'Anfiteatro', image: 'center-cine' },
      { id: 'c3', date: new Date(new Date().getTime()+86400000*7).toISOString().slice(0,10), title: 'Taller de música y bandas', course: 'Centro de Alumnos', place: 'Sala multiuso', image: 'center-musica' },
      { id: 'c4', date: new Date(new Date().getTime()+86400000*9).toISOString().slice(0,10), title: 'Excursión: Ruta al mirador', course: 'Centro de Alumnos', place: 'Salida escolar', image: 'center-excursion' },
      { id: 'c5', date: new Date(new Date().getTime()+86400000*14).toISOString().slice(0,10), title: 'Competencia de robótica - inscripciones abiertas', course: 'Talleres', place: 'Laboratorio', image: 'center-robot' },
      { id: 'c6', date: new Date(new Date().getTime()+86400000*18).toISOString().slice(0,10), title: 'Kermés solidaria - puestos y voluntariado', course: 'Comunidad', place: 'Patio trasero', image: 'center-kermes' },
      { id: 'c7', date: new Date(new Date().getTime()+86400000*21).toISOString().slice(0,10), title: 'Feria del libro - Intercambio de lecturas', course: 'Biblioteca', place: 'Biblioteca central', image: 'center-books' },
      { id: 'c8', date: new Date(new Date().getTime()+86400000*25).toISOString().slice(0,10), title: 'Intercambio de idiomas - práctica conversacional', course: 'Lenguas', place: 'Sala B', image: 'center-idiomas' },
      { id: 'c9', date: new Date(new Date().getTime()+86400000*28).toISOString().slice(0,10), title: 'Maratón de programación - Coding Jam', course: 'Informática', place: 'Laboratorio', image: 'center-coding' },
      { id: 'c10', date: new Date(new Date().getTime()+86400000*31).toISOString().slice(0,10), title: 'Hackathon estudiantil - equipos mixtos', course: 'Informática', place: 'Sala multiuso', image: 'center-hack' },
      { id: 'c11', date: new Date(new Date().getTime()+86400000*35).toISOString().slice(0,10), title: 'Reunión padres y apoderados - temas generales', course: 'Comunidad', place: 'Auditorio', image: 'center-parents' }
    ];

    const fromEvents = EXAM_EVENTS.map(ev => normalizeEvent(ev)).filter(ev => {
      const d = new Date(ev.date);
      return !isNaN(d) && d >= now && d <= limit;
    });

    // merge center announcements first, then events
    return [...CENTER_ANNOUNCEMENTS.map(c=> ({...c, image:`center-${c.id}`})), ...fromEvents].slice(0, 12);
  }, []);

  function removeAnnouncement(id) {
    setDismissedAnnouncements(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem('dismissedAnnouncements', JSON.stringify(next));
      return next;
    });
  }

  // helper to check dismissed announcements
  function isDismissed(id){
    return dismissedAnnouncements.includes(id);
  }

  // Protected events (no se pueden descartar): pruebas, controles, examenes
  function isProtectedEvent(ev){
    const t = (ev.type || '').toString().toLowerCase();
    const title = (ev.title || '').toString().toLowerCase();
    if (t.includes('prueba') || t.includes('control') || t.includes('exam') ) return true;
    if (title.includes('prueba') || title.includes('control') || title.includes('examen')) return true;
    return false;
  }

  function removeTimelineItem(id){
    // don't remove protected events
    const ev = EXAM_EVENTS.map(e=>normalizeEvent(e)).find(x=>x.id===id);
    if (ev && isProtectedEvent(ev)) return; // do nothing for protected
    setDismissedAnnouncements(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem('dismissedAnnouncements', JSON.stringify(next));
      return next;
    });
  }

  useEffect(() => localStorage.setItem("notes", JSON.stringify(notes)), [notes]);
  useEffect(() => localStorage.setItem("favCourses", JSON.stringify(favCourses)), [favCourses]);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return COURSES_BASE;

    return COURSES_BASE.filter(c =>
      c.title.toLowerCase().includes(term) ||
      c.category.toLowerCase().includes(term)
    );
  }, [q]);

  const [showCourseModal, setShowCourseModal] = useState(false);
  const [modalCourse, setModalCourse] = useState(null);


  function toggleFav(courseId) {
    setFavCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  }

  // updateNote eliminado (no usado)

  // openCourse eliminado (no usado)

  // toggleComplete eliminado (no usado)

  // createPost removed: posting manual avisos no persistente (no guardar en localStorage)

  // Normalizar eventos (acepta keys en español o inglés)
  function normalizeEvent(ev) {
    return {
      id: ev.id ?? ev.uid ?? Date.now(),
      date: ev.date || ev.fecha || ev.datetime || '',
      title: ev.title || ev.titulo || ev.name || 'Evento',
      course: ev.course || ev.curso || '',
      type: ev.tipo || ev.type || 'evento',
      place: ev.place || ev.lugar || ''
    };
  }


  return (
  <main className="estudiantes-root">
      <Container fluid="xl">

        {/* ENCABEZADO */}
        <Row className="mb-4 align-items-center">
          <Col>
            <h1 className="est-header">Panel Alumno</h1>
            <p className="text-muted est-sub">Gestione sus actividades, cursos y comunicaciones.</p>
          </Col>

          {/* Removed search input as requested */}
          <Col md={4} className="d-flex align-items-end">
            {/* espacio reservado para acciones futuras */}
          </Col>
        </Row>

  <Row className="g-4">

          {/* MENÚ LATERAL: controla vistas internas */}
          <Col lg={2}>
            <ListGroup className="side-menu" >
                <ListGroup.Item className="menu-item" active={activeView === "activities"} onClick={() => setActiveView("activities")}><span role="img" aria-label="activ">📝</span> Actividades</ListGroup.Item>
              <ListGroup.Item className="menu-item" active={activeView === "courses" || activeView === "course"} onClick={() => setActiveView("courses")}>📚 Cursos</ListGroup.Item>
              <ListGroup.Item className="menu-item" active={activeView === "calendar"} onClick={() => setActiveView("calendar")}>📆 Calendario</ListGroup.Item>
              <ListGroup.Item className="menu-item" active={activeView === "messages"} onClick={() => setActiveView("messages")}>✉️ Mensajes</ListGroup.Item>
            </ListGroup>
          </Col>

          {/* CONTENIDO PRINCIPAL: vistas internas */}
          <Col lg={7}>

            {activeView === "overview" && (
              <section>
                <h5 className="fw-bold mb-3">Resumen</h5>
                <Card className="mb-3">
                  <Card.Body>
                    <Badge bg="info" className="mb-2">Estado</Badge>
                    <Card.Title>
                      Bienvenido{studentName ? `, ${studentName}` : ''}
                    </Card.Title>
                    <Form className="mb-3" onSubmit={e => e.preventDefault()}>
                      <Form.Label>¿Cuál es tu nombre?</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Escribe tu nombre..."
                        value={studentName}
                        onChange={e => setStudentName(e.target.value)}
                        maxLength={32}
                      />
                    </Form>
                    <Card.Text>Acceda a sus cursos, calendario y mensajes desde las pestañas a la izquierda.</Card.Text>
                    <div className="d-flex gap-2 mt-2">
                      <Button size="sm" onClick={() => setActiveView('courses')}>Ver cursos</Button>
                      <Button size="sm" variant="outline-secondary" onClick={() => setActiveView('calendar')}>Abrir calendario</Button>
                      <Button size="sm" variant="outline-primary" onClick={() => setActiveView('messages')}>Mensajes</Button>
                    </div>
                  </Card.Body>
                </Card>
              </section>
            )}

            {activeView === "courses" && (
              <section id="cursos" className="mt-2">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold">Cursos</h5>
                  <small className="text-muted">Catálogo personal</small>
                </div>
                <Row className="g-3">
                  {list.map(c => (
                    <Col md={4} lg={3} key={c.id}>
                      <Card className="shadow-sm course-card">
                        <div className="course-cover">
                          <img src={`https://picsum.photos/seed/${c.id}/320/140`} alt="portada" />
                        </div>
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <div className="course-title">{c.title}</div>
                              <div className="course-cat">{c.category}</div>
                            </div>
                            <div>
                              <Button size="sm" variant={favCourses.includes(c.id)?'warning':'outline-secondary'} onClick={() => toggleFav(c.id)} className="fav-btn">{favCourses.includes(c.id)?'★':'☆'}</Button>
                            </div>
                          </div>
                          <p className="course-desc mt-2">{getFakeCourseContent(c.id).description}</p>
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <Button size="sm" onClick={() => { setModalCourse(c); setShowCourseModal(true); }} className="btn-details">Ver detalles</Button>
                            <small className="text-muted">{getFakeCourseContent(c.id).syllabus.slice(0,2).join(' · ')}</small>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </section>
            )}

            {activeView === "course" && selectedCourse && (
              <section className="mt-2">
                <Button size="sm" variant="link" onClick={() => setActiveView('courses')}>← Volver a Cursos</Button>
                <h4 className="mt-2">{selectedCourse.title}</h4>
                <Card className="mb-3">
                  <Card.Body>
                    <p><strong>Categoría:</strong> {selectedCourse.category}</p>
                    <p><strong>Descripción:</strong> {getFakeCourseContent(selectedCourse.id).description}</p>
                    <p><strong>Objetivos:</strong></p>
                    <ul>
                      {getFakeCourseContent(selectedCourse.id).objectives.map((o, i)=>(<li key={i}>{o}</li>))}
                    </ul>
                    <p><strong>Programa y tareas:</strong></p>
                    <ul>
                      {getFakeCourseContent(selectedCourse.id).syllabus.map((s,i)=>(<li key={i}>{s}</li>))}
                    </ul>
                    <p><strong>Entregas:</strong></p>
                    <ul>
                      {getFakeCourseContent(selectedCourse.id).assignments.map((a,i)=>(<li key={i}>{a}</li>))}
                    </ul>
                    <div className="d-flex gap-2 mt-3">
                      <Button size="sm">Acceder a clases</Button>
                      <Button size="sm" variant="outline-secondary">Material</Button>
                    </div>
                  </Card.Body>
                </Card>
              </section>
            )}

            {activeView === "calendar" && (
              <section id="calendario" className="mt-2">
                <h5 className="fw-bold mb-3">Calendario</h5>
                <Card>
                  <Card.Body>
                    <CalendarioPruebas events={EXAM_EVENTS} />
                  </Card.Body>
                </Card>
              </section>
            )}

            {activeView === "activities" && (
              <section className="mt-2">
                <div className="timeline mb-4">
                  <h5 className="fw-bold">Flujo de actividades <small className="text-muted">(importante • próximo • hoy)</small></h5>
                  <div className="mt-3">
                    <h6 className="important">Importante</h6>
                    {EXAM_EVENTS.filter(evRaw=>!isDismissed(normalizeEvent(evRaw).id)).slice(0, showMoreActivities ? 12 : 4).map(evRaw => {
                      const ev = normalizeEvent(evRaw);
                      const protectedEvent = isProtectedEvent(ev);
                      return (
                        <div key={ev.id} className={`item ${ev.type === 'importante' ? 'important' : ''} ${completedActivities.includes(ev.id) ? 'completed' : ''}`}>
                          <div className="date">{ev.date}</div>
                          <div className={`dot ${ev.type === 'importante' ? 'important' : ''}`}></div>
                          <div className="body">
                            <div className="title">{ev.title}</div>
                            <div className="meta">{ev.course || 'General'} — {ev.type}</div>
                          </div>
                          <div>
                            {!protectedEvent ? (
                              <Button size="sm" variant="outline-secondary" onClick={() => removeTimelineItem(ev.id)}>Descartar</Button>
                            ) : (
                              <Badge bg="danger">Protegido</Badge>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {!showMoreActivities && (
                      <div className="mt-3 text-center">
                        <Button variant="link" onClick={() => setShowMoreActivities(true)}>Ver más ▾</Button>
                      </div>
                    )}
                    {showMoreActivities && (
                      <div className="mt-3 text-center">
                        <Button variant="link" onClick={() => setShowMoreActivities(false)}>Ver menos ▴</Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Avisos y Comunicados */}
                <div className="mb-3 announcements">
                  <h6 className="fw-bold">Avisos y Comunicados</h6>

                  {/* Announcements generated from events */}
                  <Row className="g-3 mb-2">
                    {announcements.length === 0 && <Col><Card><Card.Body><p className="text-muted">No hay avisos recientes.</p></Card.Body></Card></Col>}
                    {announcements.filter(a=>!isDismissed(a.id)).map(a => (
                      <Col md={12} key={a.id}>
                        <Card className={`shadow-sm announcement-card ${completedActivities.includes(a.id)?'border-success':''}`}>
                          <Card.Body className="d-flex gap-3 align-items-start">
                            <div style={{flex:'0 0 84px'}}>
                              <img src={`https://picsum.photos/seed/ann${a.id}/120/84`} alt="aviso" style={{width:84,height:84, objectFit:'cover', borderRadius:8}} />
                            </div>
                            <div style={{flex:1}}>
                              <div className="post-title">{a.title}</div>
                              <div className="post-meta">{a.date} • {a.course || 'General'}</div>
                              <p className="mt-2">{a.place ? `Lugar: ${a.place}` : ''}</p>
                            </div>
                            <div className="text-end">
                              <Button size="sm" variant="outline-secondary" onClick={() => removeAnnouncement(a.id)}>Descartar</Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>

                  <p className="text-muted">Los avisos que ves arriba proceden del Centro de Alumnos (actividades recreativas, fines de semana). Las actividades formales del colegio y pruebas aparecen en el flujo y no se pueden descartar.</p>
                </div>
              </section>
            )}

            {activeView === "messages" && (
              <section className="mt-2">
                <h5 className="fw-bold mb-3">Mensajes</h5>
                <Card>
                  <Card.Body>
                    <p className="text-muted">Bandeja de mensajes (simulada).</p>
                    <Form onSubmit={(e)=>{e.preventDefault(); alert('Mensaje enviado (simulado)')}}>
                      <Form.Control placeholder="Escribe un mensaje..." />
                      <div className="mt-2"><Button type="submit">Enviar</Button></div>
                    </Form>
                  </Card.Body>
                </Card>
              </section>
            )}
          </Col>

          {/* (el calendario se muestra únicamente en la vista 'Calendario' dentro de la columna principal) */}

        </Row>

      </Container>
      {/* Course details modal */}
      <Modal show={showCourseModal} onHide={() => setShowCourseModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalCourse ? modalCourse.title : 'Detalle curso'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalCourse && (
            <div>
              <p><strong>Categoría:</strong> {modalCourse.category}</p>
              <p><strong>Descripción:</strong> {getFakeCourseContent(modalCourse.id).description}</p>
              <p><strong>Objetivos:</strong></p>
              <ul>{getFakeCourseContent(modalCourse.id).objectives.map((o,i)=>(<li key={i}>{o}</li>))}</ul>
              <p><strong>Programa:</strong></p>
              <ul>{getFakeCourseContent(modalCourse.id).syllabus.map((s,i)=>(<li key={i}>{s}</li>))}</ul>
              <p><strong>Entregas:</strong></p>
              <ul>{getFakeCourseContent(modalCourse.id).assignments.map((a,i)=>(<li key={i}>{a}</li>))}</ul>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCourseModal(false)}>Cerrar</Button>
          <Button variant="primary" onClick={() => { if(modalCourse){ setSelectedCourse(modalCourse); setActiveView('course'); setShowCourseModal(false); } }}>Abrir curso</Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}
