import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://aulaplus-main-1.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar datos del usuario en localStorage
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('userRole', data.rol);
        localStorage.setItem('userName', data.nombre);

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
        setError(data.message || 'Email o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error de conexión. Verifica que el servidor esté corriendo.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fillTestUser = (role) => {
    switch (role) {
      case 'estudiante':
        setEmail('estudiante@aulaplus.com');
        setPassword('password');
        break;
      case 'profesor':
        setEmail('profesor@aulaplus.com');
        setPassword('password');
        break;
      case 'apoderado':
        setEmail('apoderado@aulaplus.com');
        setPassword('password');
        break;
      default:
        break;
    }
  };

  return (
    <div className="login-page">
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div style={{ width: '100%', maxWidth: '450px' }}>
          <Card className="shadow-lg">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">🎓 AulaPlus</h2>
                <p className="text-muted">Sistema de Gestión Escolar</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="usuario@aulaplus.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mb-3"
                  disabled={loading}
                  size="lg"
                >
                  {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>
              </Form>

              <hr />

              <div className="mt-3">
                <p className="text-muted text-center mb-2"><small>Usuarios de prueba:</small></p>
                <div className="d-flex gap-2 flex-wrap justify-content-center">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => fillTestUser('estudiante')}
                  >
                    👨‍🎓 Estudiante
                  </Button>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => fillTestUser('profesor')}
                  >
                    👨‍🏫 Profesor
                  </Button>
                  <Button
                    variant="outline-info"
                    size="sm"
                    onClick={() => fillTestUser('apoderado')}
                  >
                    👨‍👩‍👧 Apoderado
                  </Button>
                </div>
              </div>

              <div className="text-center mt-4">
                <p className="text-muted mb-0">
                  ¿No tienes cuenta?{' '}
                  <Link to="/register" className="text-primary fw-semibold text-decoration-none">
                    Regístrate aquí
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>

          <div className="text-center mt-3">
            <small className="text-muted">
              © 2025 AulaPlus - Todos los derechos reservados
            </small>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
