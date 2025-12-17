import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/AuthService';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validaciones en tiempo real
  const validateEmail = (value) => {
    const errors = { ...fieldErrors };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {
      errors.email = 'El email es obligatorio';
    } else if (!emailRegex.test(value)) {
      errors.email = 'Formato de email inválido (ej: usuario@dominio.com)';
    } else {
      delete errors.email;
    }

    setFieldErrors(errors);
    return !errors.email;
  };

  const validatePassword = (value) => {
    const errors = { ...fieldErrors };

    if (!value) {
      errors.password = 'La contraseña es obligatoria';
    } else if (value.length < 3) {
      errors.password = 'La contraseña debe tener al menos 3 caracteres';
    } else {
      delete errors.password;
    }

    setFieldErrors(errors);
    return !errors.password;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (touched.email) {
      validateEmail(value);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (touched.password) {
      validatePassword(value);
    }
  };

  const handleEmailBlur = () => {
    setTouched({ ...touched, email: true });
    validateEmail(email);
  };

  const handlePasswordBlur = () => {
    setTouched({ ...touched, password: true });
    validatePassword(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Marcar campos como tocados
    setTouched({ email: true, password: true });

    // Validar antes de enviar
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      setError('⚠️ Por favor corrige los errores antes de continuar');
      return;
    }

    setLoading(true);

    try {
      const data = await AuthService.login(email, password);

      // Disparar evento para notificar al NavBar que hay usuario logueado
      window.dispatchEvent(new Event('userChanged'));

      // Redirigir según el rol
      const rol = data.usuario.rol;
      switch (rol) {
        case 'ESTUDIANTE':
          navigate('/estudiantes');
          break;
        case 'PROFESOR':
          navigate('/profesores');
          break;
        case 'APODERADO':
          navigate('/apoderados');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Email o contraseña incorrectos');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fillTestUser = (role) => {
    switch (role) {
      case 'estudiante':
        setEmail('estudiante@test.com');
        setPassword('123');
        break;
      case 'profesor':
        setEmail('profesor@test.com');
        setPassword('123');
        break;
      case 'apoderado':
        setEmail('apoderado@test.com');
        setPassword('123');
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

              {error && <Alert variant="danger" dismissible onClose={() => setError('')}>
                <strong>Error:</strong> {error}
              </Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Correo Electrónico *</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="usuario@aulaplus.com"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    required
                    autoFocus
                    autoComplete="email"
                    className={touched.email ? (fieldErrors.email ? 'is-invalid' : 'is-valid') : ''}
                    aria-label="Correo electrónico"
                    aria-describedby="emailHelpLogin"
                  />
                  {touched.email && fieldErrors.email && (
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.email}
                    </Form.Control.Feedback>
                  )}
                  {touched.email && !fieldErrors.email && (
                    <Form.Control.Feedback type="valid">
                      ✓ Email válido
                    </Form.Control.Feedback>
                  )}
                  <Form.Text id="emailHelpLogin" className="text-muted">
                    Ingresa tu correo registrado
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Contraseña *</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                    required
                    autoComplete="current-password"
                    className={touched.password ? (fieldErrors.password ? 'is-invalid' : 'is-valid') : ''}
                    aria-label="Contraseña"
                    aria-describedby="passwordHelpLogin"
                  />
                  {touched.password && fieldErrors.password && (
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.password}
                    </Form.Control.Feedback>
                  )}
                  {touched.password && !fieldErrors.password && (
                    <Form.Control.Feedback type="valid">
                      ✓ Contraseña ingresada
                    </Form.Control.Feedback>
                  )}
                  <Form.Text id="passwordHelpLogin" className="text-muted">
                    Mínimo 3 caracteres
                  </Form.Text>
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
