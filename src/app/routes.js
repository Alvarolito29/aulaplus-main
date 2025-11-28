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

const routes = [
  { path: "/", element: <Home /> },
  { path: "/products", element: <Products /> },
  { path: "/contact", element: <Contact /> },
  { path: "/cursos", element: <Cursos /> },

  { path: "/estudiantes", element: <Estudiantes /> },
  { path: "/apoderados", element: <Apoderados /> },
  { path: "/profesores", element: <Profesores /> },
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





