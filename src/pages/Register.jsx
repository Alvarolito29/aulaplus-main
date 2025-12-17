// src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import AuthService from '../services/AuthService';
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
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validaciones en tiempo real
  const validateField = (name, value) => {
    const errors = { ...fieldErrors };

    switch (name) {
      case 'nombre':
        if (!value.trim()) {
          errors.nombre = 'El nombre es obligatorio';
        } else if (value.trim().length < 3) {
          errors.nombre = 'El nombre debe tener al menos 3 caracteres';
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
          errors.nombre = 'El nombre solo puede contener letras';
        } else {
          delete errors.nombre;
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          errors.email = 'El email es obligatorio';
        } else if (!emailRegex.test(value)) {
          errors.email = 'Email inválido (ej: usuario@dominio.com)';
        } else if (value.length > 100) {
          errors.email = 'El email es demasiado largo';
        } else {
          delete errors.email;
        }
        break;

      case 'password':
        if (!value) {
          errors.password = 'La contraseña es obligatoria';
        } else if (value.length < 8) {
          errors.password = 'Mínimo 8 caracteres';
        } else if (!/[A-Z]/.test(value)) {
          errors.password = 'Debe incluir al menos una mayúscula';
        } else if (!/[a-z]/.test(value)) {
          errors.password = 'Debe incluir al menos una minúscula';
        } else if (!/[0-9]/.test(value)) {
          errors.password = 'Debe incluir al menos un número';
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          errors.password = 'Debe incluir al menos un símbolo (!@#$%...)';
        } else {
          delete errors.password;
        }
        break;

      case 'confirmPassword':
        if (!value) {
          errors.confirmPassword = 'Debes confirmar tu contraseña';
        } else if (value !== formData.password) {
          errors.confirmPassword = '❌ Las contraseñas no coinciden';
        } else {
          delete errors.confirmPassword;
        }
        break;

      default:
        break;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validar solo si el campo ya fue tocado
    if (touched[name]) {
      validateField(name, value);
    }

    // Validar confirmPassword automáticamente si password cambia
    if (name === 'password' && touched.confirmPassword) {
      validateField('confirmPassword', formData.confirmPassword);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Marcar todos los campos como tocados
    setTouched({
      nombre: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    // Validar todos los campos
    const isNombreValid = validateField('nombre', formData.nombre);
    const isEmailValid = validateField('email', formData.email);
    const isPasswordValid = validateField('password', formData.password);
    const isConfirmValid = validateField('confirmPassword', formData.confirmPassword);

    if (!isNombreValid || !isEmailValid || !isPasswordValid || !isConfirmValid) {
      setError('⚠️ Por favor corrige los errores antes de continuar');
      return;
    }

    setLoading(true);

    try {
      const data = await AuthService.register(
        formData.email,
        formData.password,
        formData.nombre,
        formData.rol.toUpperCase()
      );

      // Disparar evento para notificar cambios
      window.dispatchEvent(new Event('userChanged'));

      // Redirigir según rol
      const rol = data.usuario.rol;
      if (rol === 'ESTUDIANTE') {
        navigate('/estudiantes');
      } else if (rol === 'PROFESOR') {
        navigate('/profesores');
      } else if (rol === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Error al registrarse');
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
                  <Alert variant="danger" className="mb-3" dismissible onClose={() => setError('')}>
                    <strong>Error:</strong> {error}
                  </Alert>
                )}

                {success && (
                  <Alert variant="success" className="mb-3" dismissible onClose={() => setSuccess('')}>
                    <strong>✅ Éxito:</strong> {success}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="nombre">
                    <Form.Label className="fw-semibold">Nombre Completo *</Form.Label>
                    <Form.Control
                      type="text"
                      name="nombre"
                      placeholder="Ej: Juan Pérez González"
                      value={formData.nombre}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      autoComplete="name"
                      className={`py-2 ${
                        touched.nombre
                          ? fieldErrors.nombre
                            ? 'is-invalid'
                            : 'is-valid'
                          : ''
                      }`}
                      aria-label="Nombre completo del usuario"
                      aria-describedby="nombreHelp"
                    />
                    {touched.nombre && fieldErrors.nombre && (
                      <Form.Control.Feedback type="invalid">
                        {fieldErrors.nombre}
                      </Form.Control.Feedback>
                    )}
                    {touched.nombre && !fieldErrors.nombre && (
                      <Form.Control.Feedback type="valid">
                        ✓ Nombre válido
                      </Form.Control.Feedback>
                    )}
                    <Form.Text id="nombreHelp" className="text-muted">
                      Solo letras, mínimo 3 caracteres
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label className="fw-semibold">Correo Electrónico *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="usuario@ejemplo.com"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      autoComplete="email"
                      className={`py-2 ${
                        touched.email
                          ? fieldErrors.email
                            ? 'is-invalid'
                            : 'is-valid'
                          : ''
                      }`}
                      aria-label="Correo electrónico"
                      aria-describedby="emailHelp"
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
                    <Form.Text id="emailHelp" className="text-muted">
                      Formato: usuario@dominio.com
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="rol">
                    <Form.Label className="fw-semibold">Tipo de Usuario *</Form.Label>
                    <Form.Select
                      name="rol"
                      value={formData.rol}
                      onChange={handleChange}
                      required
                      className="py-2"
                      aria-label="Tipo de usuario"
                      aria-describedby="rolHelp"
                    >
                      <option value="estudiante">👨‍🎓 Estudiante</option>
                      <option value="profesor">👨‍🏫 Profesor</option>
                      <option value="apoderado">👨‍👩‍👧 Apoderado</option>
                    </Form.Select>
                    <Form.Text id="rolHelp" className="text-muted">
                      Selecciona el rol que mejor te represente
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label className="fw-semibold">Contraseña *</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Mínimo 8 caracteres"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      autoComplete="new-password"
                      className={`py-2 ${
                        touched.password
                          ? fieldErrors.password
                            ? 'is-invalid'
                            : 'is-valid'
                          : ''
                      }`}
                      aria-label="Contraseña"
                      aria-describedby="passwordHelp"
                    />
                    {touched.password && fieldErrors.password && (
                      <Form.Control.Feedback type="invalid">
                        {fieldErrors.password}
                      </Form.Control.Feedback>
                    )}
                    {touched.password && !fieldErrors.password && (
                      <Form.Control.Feedback type="valid">
                        ✓ Contraseña segura
                      </Form.Control.Feedback>
                    )}
                    <Form.Text id="passwordHelp" className="text-muted">
                      Debe incluir: 8+ caracteres, mayúsculas, minúsculas, números y símbolos
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="confirmPassword">
                    <Form.Label className="fw-semibold">Confirmar Contraseña *</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      placeholder="Repite tu contraseña"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      autoComplete="new-password"
                      className={`py-2 ${
                        touched.confirmPassword
                          ? fieldErrors.confirmPassword
                            ? 'is-invalid'
                            : 'is-valid'
                          : ''
                      }`}
                      aria-label="Confirmar contraseña"
                      aria-describedby="confirmPasswordHelp"
                    />
                    {touched.confirmPassword && fieldErrors.confirmPassword && (
                      <Form.Control.Feedback type="invalid">
                        {fieldErrors.confirmPassword}
                      </Form.Control.Feedback>
                    )}
                    {touched.confirmPassword && !fieldErrors.confirmPassword && (
                      <Form.Control.Feedback type="valid">
                        ✓ Las contraseñas coinciden
                      </Form.Control.Feedback>
                    )}
                    <Form.Text id="confirmPasswordHelp" className="text-muted">
                      Debe coincidir con la contraseña anterior
                    </Form.Text>
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
