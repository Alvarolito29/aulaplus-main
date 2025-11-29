// src/pages/Apoderados.jsx
import { useState } from 'react';
import { Container, Card, Button, Form, Row, Col, Alert, Table, ListGroup } from 'react-bootstrap';
import { FaCalendarAlt, FaUserCheck, FaChartLine, FaExclamationCircle, FaBookOpen } from 'react-icons/fa';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import 'animate.css';

// Mock simple (reemplázalo por tu API cuando quieras).
// Las llaves están "normalizadas" (RUT sin puntos ni guión, DV mayúscula).
const FAKE_DB = {
  '123456785': {
    nombre: 'María Gómez',
    password: '1234',
    hijos: [
      {
        id: 'h1',
        nombre: 'Matías Pérez',
        curso: '2° Medio A',
        notas: [
          { asignatura: 'Matemáticas', nota: 5.8 },
          { asignatura: 'Lenguaje', nota: 6.2 },
          { asignatura: 'Historia', nota: 5.4 },
        ],
      },
      {
        id: 'h2',
        nombre: 'Sofía Pérez',
        curso: '6° Básico B',
        notas: [
          { asignatura: 'Matemáticas', nota: 6.0 },
          { asignatura: 'Ciencias', nota: 5.7 },
        ],
      },
    ],
  },
  '98765432': {
    nombre: 'Juan Castillo',
    password: 'abcd',
    hijos: [
      {
        id: 'h3',
        nombre: 'Benjamín Castillo',
        curso: '1° Medio C',
        notas: [
          { asignatura: 'Inglés', nota: 6.1 },
          { asignatura: 'Ed. Física', nota: 6.5 },
        ],
      },
    ],
  },
};

// Normaliza RUT: quita puntos/guión y DV a mayúscula
function normalizeRut(str) {
  return (str || '').replace(/\./g, '').replace(/-/g, '').toUpperCase();
}

export default function Apoderados() {
  // Auth
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [sesion, setSesion] = useState(null); // { rut, nombre, hijos }
  const [abierto, setAbierto] = useState(null); // id del hijo expandido

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const key = normalizeRut(rut);
    const user = FAKE_DB[key];

    if (!user || user.password !== password) {
      setError('Credenciales inválidas. Verifica RUT y contraseña.');
      return;
    }

    setSesion({ rut: key, nombre: user.nombre, hijos: user.hijos });
    setPassword('');
    setAbierto(null);
  };

  const handleLogout = () => {
    setSesion(null);
    setRut('');
    setPassword('');
    setError('');
    setAbierto(null);
  };

  const toggleNotas = (id) => {
    setAbierto((prev) => (prev === id ? null : id));
  };
  return (
    <main>
      {!sesion ? (
        <Container className="my-4">
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="shadow-sm rounded-3">
                <Card.Header as="h5" className="fw-bold">
                  Ingreso Apoderados
                </Card.Header>
                <Card.Body>
                  {error && (
                    <Alert variant="danger" className="mb-3">
                      {error}
                    </Alert>
                  )}
                  <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="rut">
                      <Form.Label>RUT</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="12.345.678-5"
                        value={rut}
                        onChange={(e) => setRut(e.target.value)}
                        autoComplete="username"
                        required
                      />
                      <Form.Text className="text-muted">
                        Usa formato chileno. Ej: 12.345.678-5
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                      />
                    </Form.Group>
                    <div className="d-flex gap-2">
                      <Button type="submit" variant="primary" className="fw-semibold">
                        Ingresar
                      </Button>
                      <Button
                        type="button"
                        variant="outline-secondary"
                        onClick={() => {
                          setRut('');
                          setPassword('');
                          setError('');
                        }}
                      >
                        Limpiar
                      </Button>
                    </div>
                  </Form>
                  {/* Ayuda demo (quita en producción) */}
                  <Alert variant="light" className="mt-3 mb-0">
                    <div className="small mb-1 fw-semibold">Datos de prueba</div>
                    <div className="small">RUT: 12.345.678-5 — Clave: 1234</div>
                    <div className="small">RUT: 9.876.543-2 — Clave: abcd</div>
                  </Alert>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          {/* Hero */}
          <section style={{
            background: 'linear-gradient(135deg, #004aad 0%, #0066cc 100%)',
            color: '#fff'
          }}>
            <Container>
              <div style={{ padding: '56px 0' }}>
                <h1 style={{ fontWeight: 800 }}>Portal de Apoderados</h1>
                <p style={{ opacity: .95, maxWidth: 720 }}>
                  Accede a información académica, comunicación con el colegio y herramientas para acompañar a tus hijos.
                </p>
              </div>
            </Container>
          </section>
          <Container className="my-4">
            {/* Saludo y resumen general */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2">
              <div>
                <div className="fw-bold display-6 mb-1" style={{color:'#004aad'}}>¡Hola, {sesion.nombre}!</div>
                <div className="text-muted small">RUT: {rut || sesion.rut}</div>
                <div className="mt-2">
                  <span className="badge bg-primary me-2">{sesion.hijos.length} hijo{sesion.hijos.length>1?'s':''} a cargo</span>
                  <span className="badge bg-success">Portal actualizado</span>
                </div>
              </div>
              <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </div>
            <Card className="mb-4 border-0 shadow-sm" style={{background:'#f0f6ff'}}>
              <Card.Body className="d-flex flex-wrap gap-4 align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <FaCalendarAlt size={22} className="text-primary" />
                  <span className="fw-semibold">Próxima reunión: <span style={{color:'#2563eb'}}>10/12/2025</span></span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <FaUserCheck size={22} className="text-success" />
                  <span className="fw-semibold">Asistencia promedio: <span style={{color:'#16a34a'}}>96%</span></span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <FaChartLine size={22} className="text-info" />
                  <span className="fw-semibold">Promedio general: <span style={{color:'#0ea5e9'}}>6.1</span></span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <FaExclamationCircle size={22} className="text-danger" />
                  <span className="fw-semibold">Pagos pendientes: <span style={{color:'#dc2626'}}>1</span></span>
                </div>
              </Card.Body>
            </Card>
            <Card className="border-0">
              <Card.Title className="h6">Hijos a cargo</Card.Title>
              {sesion.hijos?.length ? (
                <ListGroup variant="flush">
                  {sesion.hijos.map((h, idx) => {
                    // Simulación de datos de asistencia y faltas
                    const asistencia = [
                      { porcentaje: 96, faltas: ['2025-11-10'] },
                      { porcentaje: 92, faltas: ['2025-10-05', '2025-11-15'] },
                      { porcentaje: 98, faltas: [] }
                    ];
                    // Elegir datos simulados según idx o id
                    const datosAsistencia = asistencia[idx % asistencia.length];
                    return (
                      <ListGroup.Item key={h.id} className="py-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <div className="fw-semibold">{h.nombre}</div>
                            <div className="text-muted small">{h.curso}</div>
                          </div>
                          <Button
                            variant={abierto === h.id ? 'secondary' : 'primary'}
                            size="sm"
                            onClick={() => toggleNotas(h.id)}
                          >
                            {abierto === h.id ? 'Ocultar detalles' : 'Ver detalles'}
                          </Button>
                        </div>
                        {abierto === h.id && (
                          <div className="mt-3 animate__animated animate__fadeIn">
                            {/* Notas */}
                            <Card className="mb-3 border-0 shadow-sm">
                              <Card.Body>
                                <div className="d-flex align-items-center gap-2 mb-2">
                                  <FaBookOpen className="text-secondary" />
                                  <span className="fw-semibold">Notas</span>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Promedio de notas del periodo actual</Tooltip>}>
                                    <span className="badge bg-info ms-2" style={{fontSize:'0.95em'}}>Prom: {((h.notas.reduce((a,b)=>a+b.nota,0)/h.notas.length)||0).toFixed(1)}</span>
                                  </OverlayTrigger>
                                </div>
                                <Table bordered hover responsive className="mb-0">
                                  <thead>
                                    <tr>
                                      <th>Asignatura</th>
                                      <th>Nota</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {h.notas.map((n, idx) => (
                                      <tr key={idx}>
                                        <td>{n.asignatura}</td>
                                        <td>{n.nota}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </Table>
                              </Card.Body>
                            </Card>
                            {/* Asistencia y faltas */}
                            <Card className="mb-3 border-0 shadow-sm" style={{background:'#f8fafc'}}>
                              <Card.Body>
                                <div className="d-flex align-items-center gap-2 mb-2">
                                  <FaUserCheck className="text-success" />
                                  <span className="fw-semibold">Asistencia</span>
                                  <span className="badge bg-success ms-2">{datosAsistencia.porcentaje}%</span>
                                </div>
                                {datosAsistencia.faltas.length === 0 ? (
                                  <div className="text-muted small">No registra inasistencias recientes.</div>
                                ) : (
                                  <>
                                    <div className="fw-semibold mb-1">Días de inasistencia:</div>
                                    <ul className="mb-0 ps-3">
                                      {datosAsistencia.faltas.map((f, i) => (
                                        <li key={i} style={{color:'#dc2626'}}><FaExclamationCircle className="me-1" />{f}</li>
                                      ))}
                                    </ul>
                                  </>
                                )}
                              </Card.Body>
                            </Card>
                            <Row className="g-3">
                              {/* ...tarjetas de resumen... */}
                            </Row>
                          </div>
                        )}
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              ) : (
                <div className="text-muted">No hay hijos registrados.</div>
              )}
            </Card>
          </Container>
        </>
      )}
    </main>
  );
}



