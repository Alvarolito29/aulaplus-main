import React, { useEffect, useState } from "react";

function DemoApi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("http://localhost:8080/api/demo/mensaje");
        if (!response.ok) {
          throw new Error("Error al llamar a la API: " + response.status);
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: 8, marginTop: "1rem" }}>
      <h2>Demo integración API REST</h2>
      <p>
        Al cargar este componente, React hace una petición HTTP GET al
        backend en <code>http://localhost:8080/api/demo/mensaje</code>.
      </p>

      {loading && <p>Cargando datos desde el servidor...</p>}
      {error && <p style={{ color: "red" }}>Ocurrió un error: {error}</p>}

      {data && (
        <div style={{ marginTop: "0.5rem" }}>
          <p><strong>Mensaje del backend:</strong> {data.mensaje}</p>
          <p><strong>Fecha y hora (servidor):</strong> {data.fechaHora}</p>
          <p><strong>Detalle:</strong> {data.detalle}</p>
        </div>
      )}
    </div>
  );
}

export default DemoApi;
