// src/app/routes.js
import Home from "../pages/Home";
import Products from "../pages/Products";
import Contact from "../pages/Contact";
import Cursos from "../pages/Cursos";

import Estudiantes from "../pages/Estudiantes";
import Apoderados from "../pages/Apoderados";
import Profesores from "../pages/Profesores";
import Funcionarios from "../pages/Funcionarios";
import Admision from "../pages/Admision";
import SobreNosotros from "../pages/SobreNosotros";
import MisionVision from "../pages/MisionVision";
import Infraestructura from "../pages/Infraestructura";
import NoticiasEventos from "../pages/NoticiasEventos";


import CursoDetalle from "../pages/CursoDetalle";
import DemoApiPage from "../pages/DemoApiPage";


// Componentes placeholder para las herramientas docentes
import { Fragment } from "react";
const Placeholder = ({ title }) => (
  <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
    <h2 style={{ fontWeight: 800, color: '#004aad', fontSize: '2.2rem', marginBottom: 16 }}>{title}</h2>
    <p style={{ color: '#555', fontSize: '1.15rem', maxWidth: 520, textAlign: 'center' }}>Próximamente aquí podrás gestionar todo lo relacionado con {title.toLowerCase()}.</p>
  </div>
);

const routes = [
  { path: "/", element: <Home /> },
  { path: "/products", element: <Products /> },
  { path: "/contact", element: <Contact /> },
  { path: "/cursos", element: <Cursos /> },

  { path: "/estudiantes", element: <Estudiantes /> },
  { path: "/apoderados", element: <Apoderados /> },
  { path: "/profesores", element: <Profesores /> },
  { path: "/profesores/clases-horario", element: <Placeholder title="Clases y Horario" /> },
  { path: "/profesores/asistencia", element: <Placeholder title="Asistencia" /> },
  { path: "/profesores/notas-evaluaciones", element: <Placeholder title="Notas y Evaluaciones" /> },
  { path: "/profesores/mensajeria", element: <Placeholder title="Mensajería" /> },
  { path: "/funcionarios", element: <Funcionarios /> },
  { path: "/admision", element: <Admision /> },
  { path: "/sobre-nosotros", element: <SobreNosotros /> },
  { path: "/mision-vision", element: <MisionVision /> },
  { path: "/infraestructura", element: <Infraestructura /> },
  { path: "/noticias-eventos", element: <NoticiasEventos /> },

  // Ruta demostrativa para mostrar integración API REST
  { path: "/demo", element: <DemoApiPage /> },

  { path: "/curso/:id", element: <CursoDetalle /> },

  { path: "*", element: <Home /> },
];

export default routes;





