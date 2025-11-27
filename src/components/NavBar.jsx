import { Link } from "react-router-dom";
import { useState } from "react";

const baseFont =
  "'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>AulaPlus</h2>

      <ul style={styles.menu}>
        <li><Link to="/" style={styles.link}>Inicio</Link></li>
        <li><Link to="/cursos" style={styles.link}>Cursos</Link></li>
        <li><Link to="/contact" style={styles.link}>Contacto</Link></li>

        {/* ACCESOS DROPDOWN */}
        <li style={{ position: "relative" }}>
          <span
            onClick={() => setOpen(!open)}
            style={styles.link}   // mismo estilo que los otros
          >
            Accesos ▾
          </span>

          {open && (
            <div style={styles.dropdown}>
              <Link to="/estudiantes" style={styles.dropItem}>Estudiantes</Link>
              <Link to="/apoderados" style={styles.dropItem}>Apoderados</Link>
              <Link to="/profesores" style={styles.dropItem}>Profesores</Link>
              <Link to="/admision" style={styles.dropItem}>Admisión</Link>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "25px 40px",
    background: "#004aad",
    fontFamily: baseFont,
    position: "relative",
    zIndex: 9999,
  },

  logo: {
    color: "#fff",
    margin: 0,
    fontWeight: 800,
    fontSize: 28,
  },

  menu: {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    gap: 28,
    margin: 0,
    padding: 0,
  },

  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 600,
    cursor: "pointer",
  },

  dropdown: {
    position: "absolute",
    top: "35px",
    right: 0,
    background: "#ffffff",
    padding: "14px",
    width: "220px",
    display: "grid",
    rowGap: "8px",
    borderRadius: 10,

    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    zIndex: 9999,
  },

  dropItem: {
    padding: "10px 10px",
    borderRadius: 6,
    fontWeight: 600,
    display: "block",
    textDecoration: "none",
    color: "#004aad",
    background: "#f4f4f4",
  },
};
