// src/app/routes.js
import Home from "../pages/Home";
import Products from "../pages/Products";
import Contact from "../pages/Contact";

import Estudiantes from "../pages/Estudiantes";
import Apoderados from "../pages/Apoderados";
import Profesores from "../pages/Profesores";
import Admision from "../pages/Admision";

import CursoDetalle from "../pages/CursoDetalle";
import DemoApiPage from "../pages/DemoApiPage";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/products", element: <Products /> },
  { path: "/contact", element: <Contact /> },

  { path: "/estudiantes", element: <Estudiantes /> },
  { path: "/apoderados", element: <Apoderados /> },
  { path: "/profesores", element: <Profesores /> },
  { path: "/admision", element: <Admision /> },

  // Ruta demostrativa para mostrar integración API REST
  { path: "/demo", element: <DemoApiPage /> },

  { path: "/curso/:id", element: <CursoDetalle /> },

  { path: "*", element: <Home /> },
];

export default routes;





