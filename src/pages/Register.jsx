// src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import './Login.css';

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    rol: 'estudiante'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password,
          rol: formData.rol
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar datos en localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('userRole', data.rol);
        localStorage.setItem('userName', data.nombre);
        localStorage.setItem('user', JSON.stringify(data));

        // Disparar evento para notificar al NavBar que hay usuario logueado
        window.dispatchEvent(new Event('userChanged'));

        // Redirigir según el rol
        switch (data.rol.toLowerCase()) {
          case 'estudiante':
          case 'alumno':
            navigate('/estudiantes');
            break;
          case 'profesor':
            navigate('/profesores');
            break;
          case 'apoderado':
            navigate('/apoderados');
            break;
          default:
            navigate('/');
        }
      } else {
        setError(data.message || 'Error al registrarse');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="login-card shadow-lg">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-2">📝 Crear Cuenta</h2>
                  <p className="text-muted">Regístrate en AulaPlus</p>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-3">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="nombre">
                    <Form.Label className="fw-semibold">Nombre Completo</Form.Label>
                    <Form.Control
                      type="text"
                      name="nombre"
                      placeholder="Ingresa tu nombre completo"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="py-2"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label className="fw-semibold">Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="py-2"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="rol">
                    <Form.Label className="fw-semibold">Tipo de Usuario</Form.Label>
                    <Form.Select
                      name="rol"
                      value={formData.rol}
                      onChange={handleChange}
                      required
                      className="py-2"
                    >
                      <option value="estudiante">👨‍🎓 Estudiante</option>
                      <option value="profesor">👨‍🏫 Profesor</option>
                      <option value="apoderado">👨‍👩‍👧 Apoderado</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label className="fw-semibold">Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Mínimo 4 caracteres"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="py-2"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="confirmPassword">
                    <Form.Label className="fw-semibold">Confirmar Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      placeholder="Repite tu contraseña"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="py-2"
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 py-2 fw-semibold mb-3"
                    disabled={loading}
                  >
                    {loading ? '⏳ Registrando...' : '✅ Crear Cuenta'}
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <p className="text-muted mb-0">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="text-primary fw-semibold text-decoration-none">
                      Inicia sesión aquí
                    </Link>
                  </p>
                </div>

                <div className="text-center mt-4">
                  <small className="text-muted">
                    📌 Nota: Los usuarios registrados verán datos de ejemplo
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
