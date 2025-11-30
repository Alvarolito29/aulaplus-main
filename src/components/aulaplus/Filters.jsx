export default function Filters({ onFilter }) {
  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Buscar por profesor o colegio..."
        onChange={(e) => onFilter(e.target.value)}
        style={styles.input}
      />
    </div>
  );
}

const styles = {
  container: { marginBottom: "20px", textAlign: "center" },
  input: {
    padding: "8px",
    width: "60%",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
};
