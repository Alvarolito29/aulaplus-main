import React from "react";
import "./CalendarioPruebas.css";

const CalendarioPruebas = ({ events = [] }) => {
  // Asegurar que events es un array SIEMPRE
  const listaEventos = Array.isArray(events) ? events : [];

  // Generar días del mes actual
  const hoy = new Date();
  const year = hoy.getFullYear();
  const month = hoy.getMonth();

  const primerDia = new Date(year, month, 1);
  const ultimoDia = new Date(year, month + 1, 0);

  const diasMes = [];
  for (let i = 1; i <= ultimoDia.getDate(); i++) {
    diasMes.push(new Date(year, month, i));
  }

  return (
    <div className="calendario-container">
      <h2>Calendario Escolar</h2>

      <div className="calendario-grid">
        {diasMes.map((dia) => {
          const fechaStr = dia.toISOString().split("T")[0];

          const eventosDia = listaEventos.filter(
            (ev) => ev.fecha === fechaStr
          );

          return (
            <div key={fechaStr} className="calendario-dia">
              <span className="dia-numero">{dia.getDate()}</span>

              {eventosDia.map((ev) => (
                <div key={ev.id} className={`evento evento-${ev.tipo}`}>
                  {ev.titulo}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarioPruebas;
