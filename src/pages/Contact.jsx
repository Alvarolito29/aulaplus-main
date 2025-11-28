import { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col, Card, InputGroup, Accordion } from 'react-bootstrap';

function Contact() {
    const [msg, setMsg] = useState('');
    const [errors, setErrors] = useState([]);
    const [service, setService] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const name = (data.get('name') || '').trim();
        const email = (data.get('email') || '').trim();
        const message = (data.get('message') || '').trim();
        const selectedService = (data.get('service') || '').trim();

        const errs = [];
        if(!selectedService) errs.push('Debes seleccionar el tipo de servicio.');
        if(!name) errs.push('El nombre es obligatorio');
        if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.push('El correo es obligatorio y debe ser válido');
        if(!message) errs.push('El mensaje es obligatorio');

        setErrors(errs);
        if(errs.length === 0) {
            setMsg(`¡Mensaje enviado exitosamente para "${selectedService}"! Nos pondremos en contacto pronto.`);
            setService('');
            e.currentTarget.reset();
        }
    };

    return (
        <main style={{ background: '#f8f9fa', minHeight: '100vh' }}>
            {/* Banner con imagen de fondo como en Cursos */}
            <div 
                style={{ 
                    background: 'linear-gradient(135deg, #004aad 0%, #0066cc 100%)',
                    color: '#fff', 
                    padding: '80px 0',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <div 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        opacity: 0.3
                    }}
                />
                
                <Container style={{ position: 'relative', zIndex: 1 }}>
                    <Row className="align-items-center">
                        <Col lg={7}>
                            <h1 className="display-4 fw-bold mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
                                Contáctanos
                            </h1>
                            <p className="lead mb-4" style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
                                Estamos aquí para ayudarte. Envíanos tu consulta y te responderemos lo antes posible.
                            </p>
                            {/* Acciones rápidas removidas a solicitud */}
                            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '15px 25px', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
                                    <h3 className="fw-bold mb-0">24/7</h3>
                                    <small>Soporte</small>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '15px 25px', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
                                    <h3 className="fw-bold mb-0">&lt; 24h</h3>
                                    <small>Tiempo de respuesta</small>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '15px 25px', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
                                    <h3 className="fw-bold mb-0">100%</h3>
                                    <small>Compromiso</small>
                                </div>
                            </div>
                        </Col>
                        <Col lg={5} className="d-none d-lg-block text-center">
                            <div style={{ fontSize: '180px', opacity: 0.9, textShadow: '4px 4px 8px rgba(0,0,0,0.3)' }}>
                                📧
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Contenido principal */}
            {/* Contenido principal con superposición agradable */}
            <Container style={{ marginTop: '-60px', paddingBottom: '60px' }}>
                <Row className="g-4 align-items-stretch">
                  <>
                    {/* Formulario */}
                    <Col lg={7} className="d-flex">
                        <Card 
                            className="border-0 shadow-sm h-100 flex-fill" 
                            style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 12px 28px rgba(0,0,0,0.08)' }}
                        >
                            <Card.Body style={{ padding: '40px', background: '#fff' }}>
                                <h3 className="fw-bold mb-4" style={{ color: '#2c3e50', fontSize: '1.8rem' }}>
                                    Envíanos un mensaje
                                </h3>
                                {msg && (
                                    <Alert 
                                        variant="success" 
                                        className="d-flex align-items-center"
                                        style={{ borderRadius: '12px', padding: '16px' }}
                                    >
                                        <span style={{ fontSize: '24px', marginRight: '12px' }}>✅</span>
                                        <span style={{ fontSize: '1.05rem' }}>{msg}</span>
                                    </Alert>
                                )}
                                {errors.length > 0 && (
                                    <Alert 
                                        variant="danger"
                                        className="d-flex align-items-start"
                                        style={{ borderRadius: '12px', padding: '16px' }}
                                    >
                                        <span style={{ fontSize: '24px', marginRight: '12px' }}>⚠️</span>
                                        <div>
                                            {errors.map((err, idx) => (
                                                <div key={idx} style={{ fontSize: '1.05rem' }}>• {err}</div>
                                            ))}
                                        </div>
                                    </Alert>
                                )}
                                <Form onSubmit={onSubmit} noValidate>
                                    {/* ...campos del formulario... */}
                                    <Form.Group className="mb-4" controlId="service">
                                        <Form.Label style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2c3e50' }}>
                                            Tipo de servicio
                                        </Form.Label>
                                        <InputGroup>
                                            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                                <span style={{ background: '#f1f4f8', border: '2px solid #e0e0e0', borderRight: 'none', padding: '14px 16px', borderRadius: '10px 0 0 10px', fontSize: '1.3rem', display: 'flex', alignItems: 'center', height: '48px' }}>🛎️</span>
                                                <div style={{ position: 'relative', flex: 1 }}>
                                                    <Form.Select
                                                        name="service"
                                                        required
                                                        value={service}
                                                        onChange={e => setService(e.target.value)}
                                                        style={{
                                                            padding: '0 60px 0 16px',
                                                            fontSize: '1.08rem',
                                                            borderRadius: '0 10px 10px 0',
                                                            border: '2px solid #e0e0e0',
                                                            borderLeft: 'none',
                                                            background: '#fff',
                                                            color: service ? '#2c3e50' : '#888',
                                                            appearance: 'none',
                                                            WebkitAppearance: 'none',
                                                            MozAppearance: 'none',
                                                            height: '48px',
                                                            width: '100%',
                                                            minWidth: '270px',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            lineHeight: '48px',
                                                            boxSizing: 'border-box'
                                                        }}
                                                    >
                                                        <option value="">Selecciona una opción...</option>
                                                        <option value="Admisión">Admisión</option>
                                                        <option value="Soporte">Soporte</option>
                                                        <option value="Consultas generales">Consultas generales</option>
                                                        <option value="Reclamos o sugerencias">Reclamos o sugerencias</option>
                                                    </Form.Select>
                                                    {/* Flecha personalizada */}
                                                    <span style={{
                                                        position: 'absolute',
                                                        right: 14,
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        pointerEvents: 'none',
                                                        fontSize: '1.2rem',
                                                        color: '#888'
                                                    }}>▼</span>
                                                </div>
                                            </div>
                                        </InputGroup>
                                        <Form.Text muted>Elige el motivo principal de tu contacto.</Form.Text>
                                    </Form.Group>
                                    {/* ...resto de campos del formulario... */}
                                    <Form.Group className="mb-4" controlId="name">
                                        <Form.Label style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2c3e50' }}>
                                            Nombre completo
                                        </Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text style={{ background: '#f1f4f8', border: '2px solid #e0e0e0', borderRight: 'none', paddingRight: 16, fontSize: '1.3rem' }}>👤</InputGroup.Text>
                                            <Form.Control 
                                                name="name" 
                                                required 
                                                placeholder="Ingresa tu nombre"
                                                style={{ 
                                                    padding: '14px 16px', 
                                                    fontSize: '1.05rem',
                                                    borderRadius: '10px',
                                                    border: '2px solid #e0e0e0',
                                                    borderLeft: 'none'
                                                }}
                                            />
                                        </InputGroup>
                                        <Form.Text muted>Por ejemplo: María Rodríguez</Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="email">
                                        <Form.Label style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2c3e50' }}>
                                            Correo electrónico
                                        </Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text style={{ background: '#f1f4f8', border: '2px solid #e0e0e0', borderRight: 'none', paddingRight: 16, fontSize: '1.3rem' }}>📧</InputGroup.Text>
                                            <Form.Control 
                                                type="email" 
                                                name="email" 
                                                required 
                                                placeholder="ejemplo@correo.com"
                                                style={{ 
                                                    padding: '14px 16px', 
                                                    fontSize: '1.05rem',
                                                    borderRadius: '10px',
                                                    border: '2px solid #e0e0e0',
                                                    borderLeft: 'none'
                                                }}
                                            />
                                        </InputGroup>
                                        <Form.Text muted>Te contactaremos a este correo.</Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="message">
                                        <Form.Label style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2c3e50' }}>
                                            Tu mensaje
                                        </Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text style={{ background: '#f1f4f8', border: '2px solid #e0e0e0', borderRight: 'none', paddingRight: 16, fontSize: '1.3rem' }}>💬</InputGroup.Text>
                                            <Form.Control 
                                                as="textarea" 
                                                rows={6} 
                                                name="message" 
                                                required 
                                                placeholder="Escribe tu consulta aquí..."
                                                style={{ 
                                                    padding: '14px 16px', 
                                                    fontSize: '1.05rem',
                                                    borderRadius: '10px',
                                                    border: '2px solid #e0e0e0',
                                                    borderLeft: 'none',
                                                    resize: 'vertical'
                                                }}
                                            />
                                        </InputGroup>
                                        <Form.Text muted>Describe tu consulta con el máximo detalle posible.</Form.Text>
                                    </Form.Group>
                                    <Button 
                                        type="submit" 
                                        size="lg"
                                        className="w-100 fw-semibold"
                                        style={{ 
                                            padding: '14px',
                                            fontSize: '1.1rem',
                                            borderRadius: '10px',
                                            background: 'linear-gradient(135deg, #004aad 0%, #0066cc 100%)',
                                            border: 'none',
                                            boxShadow: '0 6px 16px rgba(0,74,173,0.35)'
                                        }}
                                    >
                                        Enviar mensaje 📤
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                  </>

                    {/* Información de contacto */}
                    <Col lg={5} className="d-flex">
                        <div className="flex-fill d-flex flex-column">
                            {/* Tarjeta de información */}
                            <Card 
                                className="border-0 shadow-sm h-100 flex-fill" 
                                style={{ borderRadius: '20px', background: 'linear-gradient(135deg, #004aad 0%, #0066cc 100%)', color: '#fff', boxShadow: '0 12px 28px rgba(0,0,0,0.12)' }}
                            >
                                <Card.Body style={{ padding: '32px' }}>
                                    <h4 className="fw-bold mb-4">Información de contacto</h4>
                                    
                                    <div className="mb-4">
                                        <div style={{ fontSize: '32px', marginBottom: '12px' }}>📍</div>
                                        <h6 className="fw-bold">Dirección</h6>
                                        <p style={{ opacity: 0.95, fontSize: '1.05rem', marginBottom: 0 }}>
                                            Dirección de ejemplo 123<br />
                                            Santiago, Chile
                                        </p>
                                    </div>

                                    <div className="mb-4">
                                        <div style={{ fontSize: '32px', marginBottom: '12px' }}>📧</div>
                                        <h6 className="fw-bold">Email</h6>
                                        <p style={{ opacity: 0.95, fontSize: '1.05rem', marginBottom: 0 }}>
                                            <a href="mailto:contacto@aulaplus.cl" style={{ color: '#fff', textDecoration: 'none' }}>
                                                contacto@aulaplus.cl
                                            </a>
                                        </p>
                                    </div>

                                    <div className="mb-4">
                                        <div style={{ fontSize: '32px', marginBottom: '12px' }}>📞</div>
                                        <h6 className="fw-bold">Teléfono</h6>
                                        <p style={{ opacity: 0.95, fontSize: '1.05rem', marginBottom: 0 }}>
                                            +56 9 1234 5678
                                        </p>
                                    </div>

                                    <div>
                                        <div style={{ fontSize: '32px', marginBottom: '12px' }}>🕒</div>
                                        <h6 className="fw-bold">Horario de atención</h6>
                                        <p style={{ opacity: 0.95, fontSize: '1.05rem', marginBottom: 0 }}>
                                            Lunes a Viernes<br />
                                            9:00 AM - 6:00 PM
                                        </p>
                                    </div>
                                </Card.Body>
                            </Card>

                            {/* Tarjeta de ayuda rápida removida a solicitud */}
                        </div>
                    </Col>
                </Row>
                {/* FAQs estilo acordeón */}
                <Row className="mt-4">
                    <Col lg={12}>
                        <Card className="border-0 shadow-sm" style={{ borderRadius: '20px' }}>
                            <Card.Body className="p-4">
                                <h4 className="fw-bold mb-3" style={{ color: '#2c3e50' }}>Preguntas frecuentes</h4>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>¿Cuándo me responderán?</Accordion.Header>
                                        <Accordion.Body>
                                            Respondemos usualmente en menos de 24 horas hábiles. Si es urgente, usa el botón de soporte.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>¿Qué información debo incluir?</Accordion.Header>
                                        <Accordion.Body>
                                            Indica tu nombre, correo y describe tu consulta con el mayor detalle posible para agilizar la respuesta.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>¿Tienen atención telefónica?</Accordion.Header>
                                        <Accordion.Body>
                                            Sí, nuestro número es +56 9 1234 5678. También puedes escribir por WhatsApp en cualquier momento.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Sin banda inferior: se replica el estilo de Cursos con banner arriba */}
        </main>
    );
}

export default Contact;
