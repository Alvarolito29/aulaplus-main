import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";  // ✅ esta ruta exacta
import routes from "./app/routes";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {routes.map((r, i) => (
          <Route key={i} path={r.path} element={r.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
