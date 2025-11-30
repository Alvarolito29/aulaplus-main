import { useState, useMemo, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge, ListGroup, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import CalendarioPruebas from "../components/CalendarioPruebas";
import eventosEscolares from "../data/eventosEscolares"; // ✔ Import definitivo correcto
import { cursosService, eventosService, mensajesService } from "../services/api";
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

// Contenido específico por curso
function getFakeCourseContent(id) {
  const common = {
    historia: {
      description: 'Estudio de procesos históricos y pensamiento crítico aplicado a la sociedad.',
      objectives: ['Comprender hechos históricos', 'Analizar fuentes primarias', 'Relacionar pasado y presente'],
      syllabus: ['Unidad 1: Civilizaciones antiguas', 'Unidad 2: Edad Media', 'Unidad 3: Edad Moderna', 'Unidad 4: Historia contemporánea'],
      assignments: ['Ensayo: impacto de la Revolución Industrial', 'Mapa conceptual: economía antigua', 'Línea de tiempo: acontecimientos clave'],
      books: [
        { icon: '📕', title: 'Historia Universal', desc: 'Texto oficial - Capítulos 1-8' },
        { icon: '📜', title: 'Atlas histórico', desc: 'Mapas y cronologías' },
        { icon: '🎥', title: 'Documentales históricos', desc: 'Serie educativa canal Historia' },
        { icon: '🔗', title: 'Museo virtual', desc: 'Tours y exposiciones online' }
      ],
      studyTips: [
        'Crea líneas de tiempo para visualizar eventos',
        'Relaciona acontecimientos históricos con contexto actual',
        'Usa mapas para entender la geografía histórica',
        'Lee fuentes primarias y secundarias'
      ],
      tools: ['📊 Líneas de tiempo', '🗺️ Mapas históricos', '📝 Fichas de estudio', '❓ Foro de historia']
    },
    lenguaje: {
      description: 'Desarrollo de comprensión lectora, expresión escrita y análisis literario.',
      objectives: ['Mejorar lectura crítica', 'Producir textos coherentes', 'Analizar géneros literarios', 'Dominar ortografía y gramática'],
      syllabus: ['Unidad 1: Narrativa y cuento', 'Unidad 2: Poesía lírica', 'Unidad 3: Teatro y drama', 'Unidad 4: Ensayo argumentativo'],
      assignments: ['Comentario de texto narrativo', 'Producción: cuento breve', 'Análisis de poema', 'Ensayo argumentativo'],
      books: [
        { icon: '📘', title: 'Libro de Lenguaje', desc: 'Texto oficial - Unidades 1-4' },
        { icon: '📖', title: 'Antología literaria', desc: 'Lecturas obligatorias' },
        { icon: '✍️', title: 'Guía de redacción', desc: 'Técnicas de escritura' },
        { icon: '🎭', title: 'Obras teatrales', desc: 'Lectura dramatizada' }
      ],
      studyTips: [
        'Lee al menos 30 minutos diarios',
        'Haz resúmenes y esquemas de las lecturas',
        'Practica la escritura creativa semanalmente',
        'Amplía tu vocabulario con nuevas palabras'
      ],
      tools: ['📚 Biblioteca digital', '✏️ Corrector ortográfico', '📝 Generador de ideas', '❓ Consultas literarias']
    },
    matematicas: {
      description: 'Razonamiento lógico-matemático y resolución de problemas prácticos.',
      objectives: ['Resolver ecuaciones','Aplicar geometría básica','Interpretar datos', 'Desarrollar pensamiento lógico'],
      syllabus: ['Álgebra y ecuaciones','Geometría plana','Funciones y gráficas', 'Estadística básica'],
      assignments: ['Control de álgebra','Proyecto: datos y gráficas', 'Problemas de geometría', 'Ejercicios de funciones'],
      books: [
        { icon: '📗', title: 'Matemáticas 1° Medio', desc: 'Texto oficial - Todos los capítulos' },
        { icon: '📊', title: 'Guía de ejercicios', desc: 'Práctica adicional 500+ problemas' },
        { icon: '🎥', title: 'Video tutoriales', desc: 'Canal Matemáticas Fácil' },
        { icon: '🧮', title: 'Ejercicios interactivos', desc: 'Plataforma online' }
      ],
      studyTips: [
        'Practica problemas todos los días',
        'Comprende el concepto antes de memorizar fórmulas',
        'Revisa tus errores para aprender de ellos',
        'Usa recursos visuales como gráficos'
      ],
      tools: ['🧮 Calculadora científica', '📐 Graficador online', '📝 Formulario', '❓ Foro de matemáticas']
    },
    ingles: {
      description: 'Desarrollo de habilidades comunicativas en inglés: speaking, listening, reading y writing.',
      objectives: ['Comprender textos en inglés', 'Expresarse oralmente con fluidez', 'Escribir textos coherentes', 'Ampliar vocabulario'],
      syllabus: ['Unit 1: Daily routines', 'Unit 2: Past experiences', 'Unit 3: Future plans', 'Unit 4: Conditional sentences'],
      assignments: ['Reading comprehension test', 'Oral presentation: My city', 'Writing: Personal letter', 'Vocabulary quiz'],
      books: [
        { icon: '📙', title: 'English Student Book', desc: 'Units 1-8' },
        { icon: '🎧', title: 'Listening exercises', desc: 'Audio files + transcripts' },
        { icon: '💬', title: 'Conversation guide', desc: 'Common phrases & dialogues' },
        { icon: '🔗', title: 'English apps', desc: 'Duolingo, BBC Learning' }
      ],
      studyTips: [
        'Escucha música y podcasts en inglés',
        'Ve películas y series con subtítulos',
        'Practica speaking con compañeros',
        'Lee artículos y libros simples en inglés'
      ],
      tools: ['🎤 Pronunciación', '📖 Diccionario', '✍️ Conjugador', '❓ Gramática online']
    },
    religion: {
      description: 'Reflexión sobre valores, ética y el sentido de la vida desde diversas perspectivas.',
      objectives: ['Reflexionar sobre valores humanos', 'Comprender diferentes tradiciones', 'Desarrollar pensamiento crítico ético'],
      syllabus: ['Unidad 1: Valores y ética', 'Unidad 2: Religiones del mundo', 'Unidad 3: Espiritualidad', 'Unidad 4: Servicio comunitario'],
      assignments: ['Ensayo sobre valores personales', 'Investigación: religiones comparadas', 'Proyecto solidario'],
      books: [
        { icon: '📕', title: 'Ética y valores', desc: 'Texto de reflexión' },
        { icon: '🌍', title: 'Religiones del mundo', desc: 'Guía comparativa' },
        { icon: '🎥', title: 'Documentales', desc: 'Temas de espiritualidad' },
        { icon: '💭', title: 'Textos filosóficos', desc: 'Lecturas reflexivas' }
      ],
      studyTips: [
        'Reflexiona sobre tus propios valores',
        'Respeta la diversidad de creencias',
        'Participa activamente en discusiones',
        'Aplica valores en tu vida diaria'
      ],
      tools: ['💭 Diario reflexivo', '📚 Biblioteca ética', '🤝 Proyectos sociales', '❓ Foro de reflexión']
    },
    fisica: {
      description: 'Estudio de las leyes que rigen el universo físico y sus aplicaciones prácticas.',
      objectives: ['Comprender leyes físicas fundamentales', 'Resolver problemas aplicados', 'Realizar experimentos', 'Analizar fenómenos naturales'],
      syllabus: ['Unidad 1: Mecánica', 'Unidad 2: Energía y trabajo', 'Unidad 3: Ondas y sonido', 'Unidad 4: Electricidad básica'],
      assignments: ['Informe de laboratorio: movimiento', 'Problemas de energía', 'Proyecto: péndulo simple', 'Experimento de electricidad'],
      books: [
        { icon: '📘', title: 'Física 1° Medio', desc: 'Teoría y ejercicios' },
        { icon: '🔬', title: 'Manual de laboratorio', desc: 'Guía de experimentos' },
        { icon: '🎥', title: 'Física visual', desc: 'Simulaciones y videos' },
        { icon: '📐', title: 'Formulario físico', desc: 'Ecuaciones y constantes' }
      ],
      studyTips: [
        'Relaciona conceptos con situaciones cotidianas',
        'Practica con muchos problemas resueltos',
        'Realiza los experimentos con atención',
        'Comprende el "por qué" de las fórmulas'
      ],
      tools: ['🧮 Calculadora física', '🔬 Simuladores', '📊 Graficador', '❓ Foro de física']
    },
    biologia: {
      description: 'Estudio de los seres vivos, ecosistemas y procesos biológicos fundamentales.',
      objectives: ['Comprender estructuras celulares', 'Estudiar ecosistemas', 'Conocer el cuerpo humano', 'Valorar la biodiversidad'],
      syllabus: ['Unidad 1: La célula', 'Unidad 2: Genética básica', 'Unidad 3: Ecosistemas', 'Unidad 4: Cuerpo humano'],
      assignments: ['Informe: observación microscópica', 'Maqueta de célula', 'Investigación: ecosistema local', 'Presentación: sistemas del cuerpo'],
      books: [
        { icon: '📗', title: 'Biología 1° Medio', desc: 'Texto completo ilustrado' },
        { icon: '🔬', title: 'Atlas de biología', desc: 'Imágenes y diagramas' },
        { icon: '🌿', title: 'Guía de ecosistemas', desc: 'Flora y fauna local' },
        { icon: '🎥', title: 'Documentales nature', desc: 'Vida salvaje y ciencia' }
      ],
      studyTips: [
        'Observa la naturaleza a tu alrededor',
        'Usa diagramas e ilustraciones para estudiar',
        'Relaciona conceptos biológicos con tu salud',
        'Participa en salidas a terreno'
      ],
      tools: ['🔬 Microscopio virtual', '🌱 Guía de especies', '🧬 Modelos 3D', '❓ Foro de biología']
    },
    'ed-fisica': {
      description: 'Desarrollo de habilidades físicas, deportivas y promoción de vida saludable.',
      objectives: ['Mejorar condición física', 'Desarrollar habilidades deportivas', 'Trabajar en equipo', 'Promover hábitos saludables'],
      syllabus: ['Unidad 1: Calentamiento y flexibilidad', 'Unidad 2: Deportes colectivos', 'Unidad 3: Atletismo', 'Unidad 4: Vida saludable'],
      assignments: ['Test de resistencia cardiovascular', 'Práctica: básquetbol', 'Carrera de velocidad', 'Plan de ejercicios personal'],
      books: [
        { icon: '⚽', title: 'Guía de deportes', desc: 'Reglas y técnicas' },
        { icon: '💪', title: 'Entrenamiento físico', desc: 'Rutinas y ejercicios' },
        { icon: '🥗', title: 'Nutrición deportiva', desc: 'Alimentación saludable' },
        { icon: '🎥', title: 'Videos técnicos', desc: 'Tutoriales deportivos' }
      ],
      studyTips: [
        'Calienta siempre antes de ejercitarte',
        'Mantén una rutina de actividad física regular',
        'Hidrátate adecuadamente',
        'Descansa y recupérate entre sesiones',
        'Come balanceado y nutritivo'
      ],
      tools: ['⏱️ Cronómetro', '📊 Registro de progreso', '🏃 Plan de entrenamiento', '❓ Consultas deportivas']
    },
    futbol: {
      description: 'Taller práctico de fútbol: técnica, táctica y trabajo en equipo.',
      objectives: ['Dominar técnicas de fútbol', 'Comprender tácticas de juego', 'Trabajar en equipo', 'Participar en competencias'],
      syllabus: ['Fundamentos técnicos', 'Posiciones y roles', 'Tácticas de juego', 'Preparación física específica'],
      assignments: ['Práctica: control y pase', 'Ejercicio táctico: 4-4-2', 'Partido de práctica', 'Análisis de partido profesional'],
      books: [
        { icon: '⚽', title: 'Manual de fútbol', desc: 'Técnicas y ejercicios' },
        { icon: '📋', title: 'Tácticas de juego', desc: 'Formaciones y estrategias' },
        { icon: '🎥', title: 'Videos profesionales', desc: 'Análisis de jugadas' },
        { icon: '🏃', title: 'Preparación física', desc: 'Entrenamiento específico' }
      ],
      studyTips: [
        'Practica toques al balón diariamente',
        'Estudia movimientos de jugadores profesionales',
        'Mejora tu visión de juego',
        'Trabaja en tu condición física',
        'Comunícate con tus compañeros en cancha'
      ],
      tools: ['⚽ Videos tácticos', '📊 Estadísticas', '🗺️ Posicionamiento', '❓ Consultas técnicas']
    }
  };

  return common[id] || {
    description: 'Descripción general del curso.',
    objectives: ['Objetivo general 1', 'Objetivo general 2'],
    syllabus: ['Unidad A', 'Unidad B'],
    assignments: ['Tarea 1'],
    books: [
      { icon: '📕', title: 'Material del curso', desc: 'Contenido general' },
      { icon: '📝', title: 'Guía de estudio', desc: 'Ejercicios prácticos' }
    ],
    studyTips: ['Estudia regularmente', 'Pregunta tus dudas'],
    tools: ['📚 Recursos', '❓ Ayuda']
  };
}

// ✔ Seguridad: siempre será un array
const EXAM_EVENTS = Array.isArray(eventosEscolares) ? eventosEscolares : [];

export default function Estudiantes() {

  // Estado para el nombre del estudiante
  const [studentName, setStudentName] = useState(() => localStorage.getItem('studentName') || '');

  // Estados para datos del backend
  const [cursosBackend, setCursosBackend] = useState([]);
  const [eventosBackend, setEventosBackend] = useState([]);
  const [mensajesRecibidos, setMensajesRecibidos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos del backend
  useEffect(() => {
    async function cargarDatos() {
      try {
        const [cursos, eventos, mensajes] = await Promise.all([
          cursosService.getAll(),
          eventosService.getAll(),
          mensajesService.getRecibidos()
        ]);
        
        setCursosBackend(cursos);
        setEventosBackend(eventos);
        setMensajesRecibidos(mensajes);
        setLoading(false);
      } catch (error) {
        console.error('Error cargando datos:', error);
        setLoading(false);
      }
    }
    cargarDatos();
  }, []);

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
    // Usar cursosBackend si están disponibles, si no usar COURSES_BASE como fallback
    const cursos = cursosBackend.length > 0 ? cursosBackend : COURSES_BASE;
    
    if (!term) return cursos;

    return cursos.filter(c => {
      const titulo = c.nombre || c.title || '';
      const categoria = c.categoria || c.category || '';
      return titulo.toLowerCase().includes(term) || categoria.toLowerCase().includes(term);
    });
  }, [q, cursosBackend]);

  const [showCourseModal, setShowCourseModal] = useState(false);
  const [modalCourse, setModalCourse] = useState(null);
  const [showRespuestaModal, setShowRespuestaModal] = useState(false);
  const [mensajeAResponder, setMensajeAResponder] = useState(null);

  function abrirRespuesta(profesor, asignatura, mensajeOriginal) {
    setMensajeAResponder({ profesor, asignatura, mensajeOriginal });
    setShowRespuestaModal(true);
  }

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
                {loading ? (
                  <Card>
                    <Card.Body className="text-center py-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando cursos...</span>
                      </div>
                      <p className="mt-2 text-muted">Cargando cursos...</p>
                    </Card.Body>
                  </Card>
                ) : list.length === 0 ? (
                  <Card>
                    <Card.Body>
                      <p className="text-muted mb-0">No hay cursos disponibles.</p>
                    </Card.Body>
                  </Card>
                ) : (
                  <Row className="g-3">
                    {list.map(c => {
                      const cursoId = c.id || c._id;
                      const cursoTitulo = c.nombre || c.title;
                      return (
                        <Col md={4} lg={3} key={cursoId}>
                          <Card className="shadow-sm course-card-simple" onClick={() => { setModalCourse(c); setShowCourseModal(true); }}>
                            <div className="course-cover">
                              <img src={`https://picsum.photos/seed/${cursoId}/320/200`} alt="portada" />
                            </div>
                            <Card.Body className="text-center">
                              <div className="course-title">{cursoTitulo}</div>
                              <Button size="sm" variant="primary" className="mt-2 btn-details">Ver materia</Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                )}
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
                    {loading ? (
                      <div className="text-center py-4">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Cargando calendario...</span>
                        </div>
                        <p className="mt-2 text-muted">Cargando eventos...</p>
                      </div>
                    ) : (
                      <CalendarioPruebas events={eventosBackend.length > 0 ? eventosBackend : EXAM_EVENTS} />
                    )}
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
              <section className="mt-2 mensajes-section">
                <h5 className="fw-bold mb-3">💬 Mensajes</h5>
                
                {/* Mensajes recibidos */}
                <div className="mensajes-recibidos mb-4">
                  <h6 className="text-muted mb-3">📥 Bandeja de entrada</h6>
                  
                  {loading ? (
                    <Card>
                      <Card.Body className="text-center py-4">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Cargando mensajes...</span>
                        </div>
                        <p className="mt-2 text-muted">Cargando mensajes...</p>
                      </Card.Body>
                    </Card>
                  ) : mensajesRecibidos.length === 0 ? (
                    <Card>
                      <Card.Body>
                        <p className="text-muted mb-0">No hay mensajes en la bandeja de entrada.</p>
                      </Card.Body>
                    </Card>
                  ) : (
                    mensajesRecibidos.map((mensaje, index) => {
                      // Generar iniciales del remitente
                      const iniciales = mensaje.remitenteNombre
                        .split(' ')
                        .map(n => n[0])
                        .join('')
                        .toUpperCase();
                      
                      // Colores para los avatares
                      const colores = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#6C5CE7', '#FFA07A'];
                      const colorAvatar = colores[index % colores.length];
                      
                      // Formatear fecha
                      const fechaMensaje = new Date(mensaje.fecha);
                      const ahora = new Date();
                      const diffHoras = Math.floor((ahora - fechaMensaje) / (1000 * 60 * 60));
                      let fechaTexto;
                      if (diffHoras < 1) fechaTexto = 'Hace menos de 1 hora';
                      else if (diffHoras < 24) fechaTexto = `Hace ${diffHoras} hora${diffHoras > 1 ? 's' : ''}`;
                      else if (diffHoras < 48) fechaTexto = 'Ayer';
                      else if (diffHoras < 168) fechaTexto = `Hace ${Math.floor(diffHoras / 24)} días`;
                      else fechaTexto = `Hace ${Math.floor(diffHoras / 168)} semana${Math.floor(diffHoras / 168) > 1 ? 's' : ''}`;
                      
                      return (
                        <Card className="mensaje-card mb-3" key={mensaje.id}>
                          <Card.Body>
                            <div className="d-flex align-items-start gap-3">
                              <div className="mensaje-avatar" style={{backgroundColor: colorAvatar}}>{iniciales}</div>
                              <div className="flex-grow-1">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                  <div>
                                    <h6 className="mb-0">{mensaje.remitenteNombre}</h6>
                                    <small className="text-muted">{mensaje.remitenteRol}</small>
                                  </div>
                                  <small className="text-muted">{fechaTexto}</small>
                                </div>
                                <p className="mensaje-texto mb-2">
                                  {mensaje.contenido}
                                </p>
                                <Button 
                                  size="sm" 
                                  variant="outline-primary" 
                                  onClick={() => abrirRespuesta(mensaje.remitenteNombre, mensaje.asunto, mensaje.contenido)}
                                >
                                  Responder
                                </Button>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      );
                    })
                  )}
                </div>

                {/* Formulario para enviar mensajes */}
                <Card className="nuevo-mensaje-card">
                  <Card.Header className="bg-primary text-white">
                    <h6 className="mb-0">✉️ Enviar nuevo mensaje</h6>
                  </Card.Header>
                  <Card.Body>
                    <Form onSubmit={(e)=>{
                      e.preventDefault(); 
                      const formData = new FormData(e.target);
                      alert(`Mensaje enviado a ${formData.get('destinatario')}:\n\n"${formData.get('mensaje')}"\n\n✓ El profesor recibirá tu mensaje.`);
                      e.target.reset();
                    }}>
                      <Form.Group className="mb-3">
                        <Form.Label>Para:</Form.Label>
                        <Form.Select name="destinatario" required>
                          <option value="">Selecciona un profesor...</option>
                          <option value="María González - Historia">María González - Historia</option>
                          <option value="Carlos Muñoz - Lenguaje">Carlos Muñoz - Lenguaje</option>
                          <option value="Patricia Rojas - Matemáticas">Patricia Rojas - Matemáticas</option>
                          <option value="John Smith - Inglés">John Smith - Inglés</option>
                          <option value="Luis Vargas - Ciencias">Luis Vargas - Ciencias</option>
                          <option value="Ana Torres - Educación Física">Ana Torres - Educación Física</option>
                          <option value="Roberto Silva - Religión">Roberto Silva - Religión</option>
                        </Form.Select>
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Asunto:</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="asunto"
                          placeholder="Ej: Consulta sobre la tarea..."
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Mensaje:</Form.Label>
                        <Form.Control 
                          as="textarea" 
                          rows={4} 
                          name="mensaje"
                          placeholder="Escribe tu mensaje aquí..."
                          required
                        />
                      </Form.Group>

                      <div className="d-flex gap-2">
                        <Button type="submit" variant="primary">
                          📤 Enviar mensaje
                        </Button>
                        <Button type="reset" variant="outline-secondary">
                          🗑️ Limpiar
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </section>
            )}
          </Col>

          {/* (el calendario se muestra únicamente en la vista 'Calendario' dentro de la columna principal) */}

        </Row>

      </Container>
      {/* Course details modal - Panel de estudio completo */}
      <Modal show={showCourseModal} onHide={() => setShowCourseModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalCourse ? modalCourse.title : 'Detalle curso'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalCourse && (
            <div className="course-detail-panel">
              {/* Imagen de la materia */}
              <div className="course-detail-header mb-3">
                <img src={`https://picsum.photos/seed/${modalCourse.id}/800/200`} alt={modalCourse.title} className="w-100" style={{borderRadius:'8px', objectFit:'cover', height:'180px'}} />
              </div>

              <p className="text-muted"><strong>Categoría:</strong> {modalCourse.category}</p>
              <p>{getFakeCourseContent(modalCourse.id).description}</p>

              {/* Actividades */}
              <Card className="mb-3">
                <Card.Header className="bg-primary text-white">📝 Actividades y Tareas</Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    {getFakeCourseContent(modalCourse.id).assignments.map((a, i) => (
                      <ListGroup.Item key={i} className="d-flex justify-content-between align-items-center">
                        <span>{a}</span>
                        <Badge bg="info">Pendiente</Badge>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>

              {/* Programa/Unidades */}
              <Card className="mb-3">
                <Card.Header className="bg-success text-white">📚 Programa del Curso</Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    {getFakeCourseContent(modalCourse.id).syllabus.map((s, i) => (
                      <ListGroup.Item key={i}>{s}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>

              {/* Libros y Recursos - PERSONALIZADO POR MATERIA */}
              <Card className="mb-3">
                <Card.Header className="bg-warning text-dark">📖 Libros y Recursos</Card.Header>
                <Card.Body>
                  <Row className="g-2">
                    {getFakeCourseContent(modalCourse.id).books.map((book, i) => (
                      <Col md={6} key={i}>
                        <div className="d-flex align-items-center gap-2 p-2 border rounded">
                          <span style={{fontSize:'32px'}}>{book.icon}</span>
                          <div>
                            <div style={{fontWeight:'600', fontSize:'14px'}}>{book.title}</div>
                            <small className="text-muted">{book.desc}</small>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>

              {/* Panel de Ayuda para Estudiar - PERSONALIZADO POR MATERIA */}
              <Card className="mb-3">
                <Card.Header className="bg-info text-white">💡 Panel de Ayuda para Estudiar</Card.Header>
                <Card.Body>
                  <h6 className="fw-bold mb-2">Consejos de estudio para {modalCourse.title}:</h6>
                  <ul className="mb-3">
                    {getFakeCourseContent(modalCourse.id).studyTips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                  <h6 className="fw-bold mb-2">Herramientas disponibles:</h6>
                  <div className="d-flex gap-2 flex-wrap">
                    {getFakeCourseContent(modalCourse.id).tools.map((tool, i) => (
                      <Button key={i} size="sm" variant="outline-primary">{tool}</Button>
                    ))}
                  </div>
                </Card.Body>
              </Card>

              {/* Objetivos */}
              <Card>
                <Card.Header>🎯 Objetivos de Aprendizaje</Card.Header>
                <Card.Body>
                  <ul className="mb-0">
                    {getFakeCourseContent(modalCourse.id).objectives.map((o, i) => (
                      <li key={i}>{o}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCourseModal(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de respuesta a mensajes */}
      <Modal show={showRespuestaModal} onHide={() => setShowRespuestaModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>✉️ Responder mensaje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {mensajeAResponder && (
            <div>
              <div className="mb-3 p-3" style={{backgroundColor: '#f7fafc', borderRadius: '8px', borderLeft: '4px solid #667eea'}}>
                <div className="mb-2">
                  <strong>Para:</strong> {mensajeAResponder.profesor} - {mensajeAResponder.asignatura}
                </div>
                <div className="mb-2">
                  <strong>Mensaje original:</strong>
                </div>
                <p className="text-muted mb-0" style={{fontStyle: 'italic'}}>
                  "{mensajeAResponder.mensajeOriginal}"
                </p>
              </div>

              <Form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                alert(`✔ Respuesta enviada a ${mensajeAResponder.profesor}\n\n"${formData.get('respuesta')}"\n\nEl profesor recibirá tu mensaje.`);
                setShowRespuestaModal(false);
                e.target.reset();
              }}>
                <Form.Group className="mb-3">
                  <Form.Label>Tu respuesta:</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={5} 
                    name="respuesta"
                    placeholder="Escribe tu respuesta aquí..."
                    required
                  />
                </Form.Group>

                <div className="d-flex gap-2 justify-content-end">
                  <Button variant="secondary" onClick={() => setShowRespuestaModal(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" variant="primary">
                    📤 Enviar respuesta
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </main>
  );
}
