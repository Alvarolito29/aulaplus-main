import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const baseFont =
  "'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  // Estados para los menús
  const [institucionOpen, setInstitucionOpen] = useState(false);
  const [accesoOpen, setAccesoOpen] = useState(false);
  const [contactoOpen, setContactoOpen] = useState(false);
  
  const navigate = useNavigate();

  // Función para verificar usuario logueado
  const checkUser = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Verificar usuario al cargar
    checkUser();
    
    // Escuchar cambios en el localStorage (cuando se hace login/logout)
    const handleStorageChange = () => {
      checkUser();
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    // También escuchar un evento personalizado para cambios en la misma pestaña
    window.addEventListener("userChanged", handleStorageChange);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userChanged", handleStorageChange);
    };
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    setUser(null);
    // Disparar evento para notificar cambio
    window.dispatchEvent(new Event('userChanged'));
    navigate('/login');
  };

  // Función para cerrar todos los menús
  const closeAllMenus = () => {
    setInstitucionOpen(false);
    setAccesoOpen(false);
    setContactoOpen(false);
  };

  return (
    <div style={styles.navbar}
      onMouseLeave={closeAllMenus}
    >
      <nav style={{
        ...styles.nav,
        padding: scrolled ? "12px 40px" : "20px 40px",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.15)" : "0 2px 10px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
      }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            fontSize: scrolled ? 32 : 36,
            transition: "font-size 0.3s ease",
          }}>🎓</div>
          <h2 style={{
            ...styles.logo,
            fontSize: scrolled ? 24 : 28,
            transition: "font-size 0.3s ease",
          }}>
            AulaPlus
          </h2>
        </Link>

        <ul style={styles.menu}>
          <li>
            <Link to="/" style={styles.link}>
              🏠 Inicio
            </Link>
          </li>

          <li>
            <Link to="/biblioteca" style={styles.link}>
              📚 Biblioteca
            </Link>
          </li>

          {/* INSTITUCIÓN DROPDOWN */}
          <li
            style={styles.menuItem}
            onMouseEnter={() => {
              setInstitucionOpen(true);
              setAccesoOpen(false);
              setContactoOpen(false);
            }}
          >
            <span style={styles.link}>
              🏫 Institución ▾
            </span>
            {institucionOpen && (
              <div
                style={styles.dropdown}
              >
                <div style={styles.dropHeader}>Nuestra Institución</div>
                <Link to="/sobre-nosotros" style={styles.dropItem}>
                  <span style={styles.dropIcon}>📖</span>
                  Sobre Nosotros
                </Link>
                <Link to="/mision-vision" style={styles.dropItem}>
                  <span style={styles.dropIcon}>🎯</span>
                  Misión y Visión
                </Link>
                <Link to="/infraestructura" style={styles.dropItem}>
                  <span style={styles.dropIcon}>🏛️</span>
                  Infraestructura
                </Link>
                <Link to="/noticias-eventos" style={styles.dropItem}>
                  <span style={styles.dropIcon}>📰</span>
                  Noticias y Eventos
                </Link>
                <Link to="/funcionarios" style={styles.dropItem}>
                  <span style={styles.dropIcon}>👔</span>
                  Funcionarios
                </Link>
                <Link to="/cursos" style={styles.dropItem}>
                  <span style={styles.dropIcon}>📚</span>
                  Cursos
                </Link>
              </div>
            )}
          </li>

          {/* ACCESOS DROPDOWN */}
          <li
            style={styles.menuItem}
            onMouseEnter={() => {
              setInstitucionOpen(false);
              setAccesoOpen(true);
              setContactoOpen(false);
            }}
          >
            <span style={styles.link}>
              🔐 Accesos ▾
            </span>
            {accesoOpen && (
              <div
                style={styles.dropdown}
              >
                <div style={styles.dropHeader}>Plataformas de Acceso</div>
                <Link to="/estudiantes" style={styles.dropItem}>
                  <span style={styles.dropIcon}>👨‍🎓</span>
                  Estudiantes
                </Link>
                <Link to="/apoderados" style={styles.dropItem}>
                  <span style={styles.dropIcon}>👪</span>
                  Apoderados
                </Link>
                <Link to="/profesores" style={styles.dropItem}>
                  <span style={styles.dropIcon}>👨‍🏫</span>
                  Profesores
                </Link>
              </div>
            )}
          </li>

          {/* CONTACTO DROPDOWN */}
          <li
            style={styles.menuItem}
            onMouseEnter={() => {
              setInstitucionOpen(false);
              setAccesoOpen(false);
              setContactoOpen(true);
            }}
          >
            <span style={styles.link}>
              📧 Contacto ▾
            </span>
            {contactoOpen && (
              <div
                style={styles.dropdown}
              >
                <div style={styles.dropHeader}>Contacto y Admisión</div>
                <Link to="/contact" style={styles.dropItem}>
                  <span style={styles.dropIcon}>📧</span>
                  Contacto
                </Link>
                <div style={styles.dropDivider}></div>
                <Link to="/admision" style={{...styles.dropItem, background: 'linear-gradient(135deg, #004aad 0%, #0066cc 100%)', color: '#fff'}}>
                  <span style={styles.dropIcon}>📝</span>
                  Proceso de Admisión
                </Link>
              </div>
            )}
          </li>
          
          {/* Mostrar información del usuario si está logueado */}
          {user && (
            <li style={{...styles.link, background: 'rgba(255,255,255,0.1)', borderRadius: 8}}>
              <span style={{marginRight: 8}}>👤</span>
              {user.nombre}
            </li>
          )}
          
          {/* Botón de Login/Logout */}
          {user ? (
            <li>
              <button 
                onClick={handleLogout}
                style={{
                  ...styles.link,
                  background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '10px 20px',
                  borderRadius: 8,
                  fontWeight: 600,
                }}
              >
                🚪 Cerrar Sesión
              </button>
            </li>
          ) : (
            <li>
              <Link 
                to="/login" 
                style={{
                  ...styles.link,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  padding: '10px 20px',
                  borderRadius: 8,
                }}
              >
                🔐 Iniciar Sesión
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    fontFamily: baseFont,
    position: "sticky",
    top: 0,
    zIndex: 9999,
  },

  logo: {
    color: "#fff",
    margin: 0,
    fontWeight: 800,
    cursor: "pointer",
  },

  menu: {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    gap: 32,
    margin: 0,
    padding: 0,
  },

  menuItem: {
    position: "relative",
  },

  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
    padding: "8px 12px",
    borderRadius: 8,
    display: "inline-block",
  },

  dropdown: {
    position: "absolute",
    top: "calc(100% + 12px)",
    right: 0,
    background: "#ffffff",
    padding: "8px",
    minWidth: "260px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    borderRadius: 12,
    boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
    zIndex: 10000,
    animation: "slideDown 0.3s ease",
  },

  dropHeader: {
    padding: "12px 14px 8px",
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    color: "#999",
    letterSpacing: "0.5px",
  },

  dropItem: {
    padding: "12px 14px",
    borderRadius: 8,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: 12,
    textDecoration: "none",
    color: "#1a1a2e",
    background: "transparent",
    transition: "all 0.2s",
    cursor: "pointer",
  },

  dropIcon: {
    fontSize: 18,
  },

  dropDivider: {
    height: 1,
    background: "#e0e0e0",
    margin: "8px 0",
  },

  navbar: {
    position: "relative",
  },
};
