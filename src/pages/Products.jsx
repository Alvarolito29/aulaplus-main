import React, { useState } from "react";
import { cursos } from "../data/aulaplus.mock";
import Filters from "../components/aulaplus/Filters";
import ProductGrid from "../components/aulaplus/ProductGrid";

export default function Products() {
  const [filtro, setFiltro] = useState("");

  const cursosFiltrados = cursos.filter(
    (c) =>
      c.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      c.profesor.toLowerCase().includes(filtro.toLowerCase()) ||
      c.colegio.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cursos</h1>
      <Filters onFilter={setFiltro} />
      <ProductGrid cursos={cursosFiltrados} />
    </div>
  );
}
