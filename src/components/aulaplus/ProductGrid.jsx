import ProductCard from "./ProductCard";

export default function ProductGrid({ cursos }) {
  return (
    <div style={styles.grid}>
      {cursos.map((curso) => (
        <ProductCard key={curso.id} curso={curso} />
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px"
  },
};
