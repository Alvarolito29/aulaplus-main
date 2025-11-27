import React from "react";
import DemoApi from "../components/DemoApi";

function DemoApiPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Integración Frontend + Backend (API REST)</h1>
      <p>
        Esta página demuestra cómo el frontend (React) se comunica con el
        backend (Spring Boot) usando una petición HTTP GET.
      </p>
      <ol>
        <li>React renderiza este componente y ejecuta el hook <code>useEffect</code>.</li>
        <li>
          Dentro del <code>useEffect</code> se llama a <code>fetch()</code> a la URL del
          backend <code>http://localhost:8080/api/demo/mensaje</code>.
        </li>
        <li>El backend responde con un JSON que contiene texto y fecha.</li>
        <li>El estado local de React se actualiza y la interfaz muestra los datos.</li>
      </ol>

      <DemoApi />
    </main>
  );
}

export default DemoApiPage;
