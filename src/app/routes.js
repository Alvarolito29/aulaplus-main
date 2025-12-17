// src/app/routes.js
import Home from "../pages/Home";
import Products from "../pages/Products";
import Contact from "../pages/Contact";
import Cursos from "../pages/Cursos";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";

import Estudiantes from "../pages/Estudiantes";
import Apoderados from "../pages/Apoderados";
import Profesores from "../pages/Profesores";
import Funcionarios from "../pages/Funcionarios";
import Admision from "../pages/Admision";
import SobreNosotros from "../pages/SobreNosotros";
import MisionVision from "../pages/MisionVision";
import Infraestructura from "../pages/Infraestructura";
import NoticiasEventos from "../pages/NoticiasEventos";

import Biblioteca from "../pages/Biblioteca";
import MisPedidos from "../pages/MisPedidos";

import CursoDetalle from "../pages/CursoDetalle";
import DemoApiPage from "../pages/DemoApiPage";


// Componentes placeholder para las herramientas docentes
import ClasesHorario from "../pages/ClasesHorario";
import Asistencia from "../pages/Asistencia";
import NotasEvaluaciones from "../pages/NotasEvaluaciones";
import Mensajeria from "../pages/Mensajeria";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/products", element: <Products /> },
  { path: "/contact", element: <Contact /> },
  { path: "/cursos", element: <Cursos /> },
  { 
    path: "/biblioteca", 
    element: (
      <ProtectedRoute allowedRoles={['ESTUDIANTE', 'PROFESOR', 'APODERADO']}>
        <Biblioteca />
      </ProtectedRoute>
    )
  },

  { 
    path: "/estudiantes", 
    element: (
      <ProtectedRoute allowedRoles={['ESTUDIANTE']}>
        <Estudiantes />
      </ProtectedRoute>
    )
  },
  { 
    path: "/estudiantes/mis-pedidos", 
    element: (
      <ProtectedRoute allowedRoles={['ESTUDIANTE', 'PROFESOR', 'APODERADO']}>
        <MisPedidos />
      </ProtectedRoute>
    )
  },
  { 
    path: "/apoderados", 
    element: (
      <ProtectedRoute allowedRoles={['APODERADO']}>
        <Apoderados />
      </ProtectedRoute>
    )
  },
  { 
    path: "/profesores", 
    element: (
      <ProtectedRoute allowedRoles={['PROFESOR']}>
        <Profesores />
      </ProtectedRoute>
    )
  },
  { 
    path: "/profesores/clases-horario", 
    element: (
      <ProtectedRoute allowedRoles={['PROFESOR']}>
        <ClasesHorario />
      </ProtectedRoute>
    )
  },
  { 
    path: "/profesores/asistencia", 
    element: (
      <ProtectedRoute allowedRoles={['PROFESOR']}>
        <Asistencia />
      </ProtectedRoute>
    )
  },
  { 
    path: "/profesores/notas-evaluaciones", 
    element: (
      <ProtectedRoute allowedRoles={['PROFESOR']}>
        <NotasEvaluaciones />
      </ProtectedRoute>
    )
  },
  { 
    path: "/profesores/mensajeria", 
    element: (
      <ProtectedRoute allowedRoles={['PROFESOR']}>
        <Mensajeria />
      </ProtectedRoute>
    )
  },
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





