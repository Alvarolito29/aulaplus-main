export default function ProductCard({ curso }) {
  return (
    <div style={styles.card}>
      <h3>{curso.nombre}</h3>
      <p><strong>Profesor:</strong> {curso.profesor}</p>
      <p><strong>Colegio:</strong> {curso.colegio}</p>
      <p><strong>Estudiantes:</strong> {curso.estudiantes}</p>
      <h4>Evaluaciones:</h4>
      <ul>
        {curso.evaluaciones.map((e) => (
          <li key={e.id}>{e.titulo} – Promedio: {e.promedio}</li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "15px",
    background: "#f9f9f9"
  },
};
