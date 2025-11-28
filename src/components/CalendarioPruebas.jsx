import React, { useState, useMemo } from "react";
import "./CalendarioPruebas.css";

const MONTHS = [
  { key: 2, name: 'Marzo' },
  { key: 3, name: 'Abril' },
  { key: 4, name: 'Mayo' },
  { key: 5, name: 'Junio' },
  { key: 6, name: 'Julio' },
  { key: 7, name: 'Agosto' },
  { key: 8, name: 'Septiembre' },
  { key: 9, name: 'Octubre' },
  { key: 10, name: 'Noviembre' },
  { key: 11, name: 'Diciembre' },
];

function normalize(ev) {
  return {
    id: ev.id ?? ev.uid ?? Date.now(),
    date: ev.date || ev.fecha || '',
    title: ev.title || ev.titulo || 'Evento',
    type: ev.tipo || ev.type || 'otro',
    place: ev.place || ev.lugar || ''
  };
}

const CalendarioPruebas = ({ events = [] }) => {
  const listaEventos = Array.isArray(events) ? events.map(normalize) : [];
  const [monthIdx, setMonthIdx] = useState(2); // Marzo por defecto (2 = Marzo en 0-based)

  const year = new Date().getFullYear();
  const diasMes = useMemo(() => {
    const primerDia = new Date(year, monthIdx, 1);
    const ultimoDia = new Date(year, monthIdx + 1, 0);
    const days = [];
    for (let i = 1; i <= ultimoDia.getDate(); i++) days.push(new Date(year, monthIdx, i));
    return days;
  }, [monthIdx, year]);

  return (
    <div className="calendario-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Calendario Escolar — {MONTHS.find(m=>m.key===monthIdx)?.name || 'Mes'}</h2>
        <div>
          <select value={monthIdx} onChange={(e)=>setMonthIdx(Number(e.target.value))}>
            {MONTHS.map(m => <option key={m.key} value={m.key}>{m.name}</option>)}
          </select>
        </div>
      </div>

      <div className="calendario-grid">
        {diasMes.map((dia) => {
          const fechaStr = dia.toISOString().split("T")[0];
          const eventosDia = listaEventos.filter(ev => ev.date === fechaStr);
          return (
            <div key={fechaStr} className="calendario-dia">
              <span className="dia-numero">{dia.getDate()}</span>
              {eventosDia.map(ev => (
                <div key={ev.id} className={`evento evento-${ev.type}`}>
                  {ev.title}
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
