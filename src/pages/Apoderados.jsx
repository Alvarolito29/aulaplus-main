// src/pages/Apoderados.jsx
import { useState } from 'react';
import { Container, Card, Button, Form, Row, Col, Alert, Table, ListGroup } from 'react-bootstrap';

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
      <Container className="my-4">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-sm rounded-3">
              <Card.Header as="h5" className="fw-bold">
                Ingreso Apoderados
              </Card.Header>
              <Card.Body>
                {!sesion ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <div className="fw-bold">Hola, {sesion.nombre}</div>
                        <div className="text-muted small">RUT: {rut || sesion.rut}</div>
                      </div>
                      <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                        Cerrar sesión
                      </Button>
                    </div>

                    <Card className="border-0">
                      <Card.Title className="h6">Hijos a cargo</Card.Title>
                      {sesion.hijos?.length ? (
                        <ListGroup variant="flush">
                          {sesion.hijos.map((h) => (
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
                                  {abierto === h.id ? 'Ocultar notas' : 'Ver notas'}
                                </Button>
                              </div>

                              {abierto === h.id && (
                                <div className="mt-3">
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
                                </div>
                              )}
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      ) : (
                        <Alert variant="warning" className="mb-0">
                          No se encontraron hijos asociados a este apoderado.
                        </Alert>
                      )}
                    </Card>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}


