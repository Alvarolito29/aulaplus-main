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
import ClasesHorario from "../pages/ClasesHorario";
import Asistencia from "../pages/Asistencia";
import NotasEvaluaciones from "../pages/NotasEvaluaciones";
import Mensajeria from "../pages/Mensajeria";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/products", element: <Products /> },
  { path: "/contact", element: <Contact /> },
  { path: "/cursos", element: <Cursos /> },

  { path: "/estudiantes", element: <Estudiantes /> },
  { path: "/apoderados", element: <Apoderados /> },
  { path: "/profesores", element: <Profesores /> },
  { path: "/profesores/clases-horario", element: <ClasesHorario /> },
  { path: "/profesores/asistencia", element: <Asistencia /> },
  { path: "/profesores/notas-evaluaciones", element: <NotasEvaluaciones /> },
  { path: "/profesores/mensajeria", element: <Mensajeria /> },
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





