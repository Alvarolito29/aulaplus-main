# AulaPlus – Portal Escolar Integral

**AulaPlus** es una plataforma web integral para la gestión escolar, diseñada para conectar a apoderados, estudiantes, profesores y administrativos en un entorno moderno, visualmente atractivo y fácil de usar. El sistema incluye un portal de apoderados con métricas completas y simuladas, herramientas docentes, navegación intuitiva y paneles informativos, todo construido con tecnologías actuales y buenas prácticas de desarrollo.

---

## 🚀 Instalación y Puesta en Marcha

1. Clona el repositorio:
  ```bash
  git clone https://github.com/Alvarolito29/aulaplus-main.git
  cd aulaplus-main
  ```
2. Instala las dependencias:
  ```bash
  npm install
  ```
3. Ejecuta el entorno de desarrollo:
  ```bash
  npm start
  ```
4. Ejecuta los tests:
  ```bash
  npm test
  ```
5. Construye el proyecto para producción:
  ```bash
  npm run build
  ```

---

## 🧩 Características principales

- **Portal de Apoderados**: Visualización de hijos/as, métricas de asistencia, inasistencias, próximas reuniones, evaluaciones, mensajes de profesores, anotaciones, promedio general, ranking, historial de reuniones, pagos pendientes y contacto directo con el profesor jefe.
- **Herramientas Docentes**: Gestión de clases, asistencia, evaluaciones, mensajería interna, calendario de pruebas y eventos escolares.
- **Navegación Moderna**: Menú principal con rutas protegidas, navegación contextual y diseño responsivo.
- **Simulación de Datos**: Mock data para pruebas y visualización realista de métricas.
- **Paneles Visuales**: Tarjetas, gráficos y calendarios interactivos para una experiencia profesional y amigable.
- **Pruebas Automatizadas**: Cobertura de componentes clave con Jest y React Testing Library.

---

## Estructura del Proyecto

- `backend/`: Backend Java Spring Boot (API, seguridad, repositorios)
- `public/`: Archivos públicos (index.html, manifest, robots)
- `src/`
  - `app/routes.js`: Definición de rutas principales
  - `components/`
    - `NavBar.jsx`: Navegación principal
    - `CalendarioPruebas.jsx`, `.css`: Calendario de pruebas
    - `SupportButton.jsx`: Botón de soporte
    - `aulaplus/`: Cards, grids y filtros personalizados
  - `context/AppContext.js`: Contexto global de la app
  - `data/`
    - `aulaplus.mock.js`: Datos simulados para métricas escolares
    - `eventosEscolares.js`: Eventos escolares simulados
  - `pages/`
    - `Home.jsx`: Landing page con stats y misión
    - `Apoderados.jsx`: Portal de apoderados con métricas completas
    - `ClasesHorario.jsx`, `Asistencia.jsx`, `NotasEvaluaciones.jsx`, `Mensajeria.jsx`: Herramientas docentes
    - `Products.jsx`, `Contact.jsx`, etc.: Otras páginas
  - `App.js`, `App.css`, `index.js`, `index.css`: Archivos principales de la app
  - `reportWebVitals.js`, `setupTests.js`: Utilidades y configuración de tests
- `package.json`, `README.md`: Configuración y documentación

# AulaPlus – Portal Escolar Integral

**AulaPlus** es una plataforma web integral para la gestión escolar, diseñada para conectar a apoderados, estudiantes, profesores y administrativos en un entorno moderno, visualmente atractivo y fácil de usar. El sistema incluye un portal de apoderados con métricas completas y simuladas, herramientas docentes, navegación intuitiva y paneles informativos, todo construido con tecnologías actuales y buenas prácticas de desarrollo.

---

---


## 🚀 Instalación y Puesta en Marcha

1. Clona el repositorio:
  ```bash
  git clone https://github.com/Alvarolito29/aulaplus-main.git
  cd aulaplus-main
  ```
2. Instala las dependencias:
  ```bash
  npm install
  ```
3. Ejecuta el entorno de desarrollo:
  ```bash
  npm start
  ```
4. Ejecuta los tests:
  ```bash
  npm test
  ```
5. Construye el proyecto para producción:
  ```bash
  npm run build
  ```


---

## 🧩 Características principales

- **Portal de Apoderados**: Visualización de hijos/as, métricas de asistencia, inasistencias, próximas reuniones, evaluaciones, mensajes de profesores, anotaciones, promedio general, ranking, historial de reuniones, pagos pendientes y contacto directo con el profesor jefe.
- **Herramientas Docentes**: Gestión de clases, asistencia, evaluaciones, mensajería interna, calendario de pruebas y eventos escolares.
- **Navegación Moderna**: Menú principal con rutas protegidas, navegación contextual y diseño responsivo.
- **Simulación de Datos**: Mock data para pruebas y visualización realista de métricas.
- **Paneles Visuales**: Tarjetas, gráficos y calendarios interactivos para una experiencia profesional y amigable.
- **Pruebas Automatizadas**: Cobertura de componentes clave con Jest y React Testing Library.

---


## 📁 Estructura del Proyecto


## Estructura del Proyecto

- `backend/`: Backend Java Spring Boot (API, seguridad, repositorios)
- `public/`: Archivos públicos (index.html, manifest, robots)
- `src/`
  - `app/routes.js`: Definición de rutas principales
  - `components/`
    - `NavBar.jsx`: Navegación principal
    - `CalendarioPruebas.jsx`, `.css`: Calendario de pruebas
    - `SupportButton.jsx`: Botón de soporte
    - `aulaplus/`: Cards, grids y filtros personalizados
  - `context/AppContext.js`: Contexto global de la app
  - `data/`
    - `aulaplus.mock.js`: Datos simulados para métricas escolares
    - `eventosEscolares.js`: Eventos escolares simulados
  - `pages/`
    - `Home.jsx`: Landing page con stats y misión
    - `Apoderados.jsx`: Portal de apoderados con métricas completas
    - `ClasesHorario.jsx`, `Asistencia.jsx`, `NotasEvaluaciones.jsx`, `Mensajeria.jsx`: Herramientas docentes
    - `Products.jsx`, `Contact.jsx`, etc.: Otras páginas
  - `App.js`, `App.css`, `index.js`, `index.css`: Archivos principales de la app
  - `reportWebVitals.js`, `setupTests.js`: Utilidades y configuración de tests
- `package.json`, `README.md`: Configuración y documentación


## 🧰 Scripts principales

| Comando         | Descripción                                              |
|-----------------|---------------------------------------------------------|
| npm start       | Ejecuta el servidor de desarrollo en http://localhost:3000/ |
| npm test        | Ejecuta los tests de Jest + Testing Library             |
| npm run build   | Genera una versión optimizada para producción           |
| npm run eject   | Expone la configuración interna de CRA (no recomendado) |


## 🧪 Pruebas Automatizadas

El proyecto utiliza **Jest** y **React Testing Library** para asegurar la calidad de los componentes y páginas clave. Los archivos de prueba terminan en `.test.jsx` y cubren rutas, formularios y visualización de métricas.

Ejemplo de test simple:
```js
import { render, screen } from '@testing-library/react';
import Contact from './Contact';

test('se monta correctamente y muestra el título', () => {
  render(<Contact />);
  const titulo = screen.getByRole('heading', { name: /contacto/i });
  expect(titulo).toBeInTheDocument();
});
```


## 🎨 Estilos y UI

El proyecto utiliza **Bootstrap 5**, **React Bootstrap**, **react-calendar**, **react-icons** y **animate.css** para una experiencia visual moderna y profesional.

Importa Bootstrap en `src/index.js`:
```js
import 'bootstrap/dist/css/bootstrap.min.css';
```

## 🧩 Navegación y Rutas

La navegación se gestiona con **React Router 7**. El archivo `src/app/routes.js` centraliza todas las rutas, incluyendo portales de apoderados, herramientas docentes y páginas informativas.

Ejemplo básico de rutas:
```js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Apoderados from './pages/Apoderados';
import ClasesHorario from './pages/ClasesHorario';
// ...otros imports

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apoderados" element={<Apoderados />} />
        <Route path="/clases" element={<ClasesHorario />} />
        {/* ...otras rutas */}
      </Routes>
    </Router>
  );
}

export default App;
```

## 🧩 Formularios y Manejo de Datos

Se utiliza **React Hook Form** para formularios eficientes y validaciones. Ejemplo:
```js
import { useForm } from 'react-hook-form';

function ContactForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('nombre')} placeholder="Nombre" />
      <input {...register('correo')} placeholder="Correo" />
      <textarea {...register('mensaje')} placeholder="Mensaje" />
      <button type="submit">Enviar</button>
    </form>
  );
}
```


---

## 🏫 ¿Qué hace único a AulaPlus?

- **Portal de Apoderados**: Visualización de métricas completas por hijo/a (asistencia, inasistencias, evaluaciones, reuniones, pagos, contacto directo, recomendaciones personalizadas, etc.)
- **Herramientas Docentes**: Gestión de clases, asistencia, evaluaciones, mensajería y calendario escolar.
- **Simulación de Datos**: Mock data para pruebas y visualización realista.
- **UI profesional y amigable**: Tarjetas, paneles, animaciones y navegación moderna.
- **Backend Java Spring Boot**: API robusta y segura para autenticación y gestión de datos.
- **Pruebas Automatizadas**: Cobertura de componentes clave.

---

## 📦 Dependencias principales

```json
{
  "react": "^19.2.0",
  "react-bootstrap": "^2.10.10",
  "react-router-dom": "^7.9.4",
  "react-calendar": "^4.x",
  "react-icons": "^5.x",
  "animate.css": "^4.x",
  "@testing-library/react": "^16.3.0",
  // ...otras
}
```

---

## 📞 Contacto y soporte

Para dudas, sugerencias o soporte, contacta al equipo de AulaPlus.

---

> _Este README fue adaptado para reflejar la estructura y funcionalidades reales del proyecto **AulaPlus**. Se han conservado ejemplos y fragmentos útiles del template original._