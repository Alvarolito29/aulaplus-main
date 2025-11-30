import React, { useState, useMemo } from "react";
import { Button, Modal } from "react-bootstrap";
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

const DIAS_SEMANA = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'];

// Mapeo de materias a colores específicos
const MATERIA_COLORS = {
  'historia': '#FF6B6B',
  'lenguaje': '#4ECDC4',
  'matemáticas': '#45B7D1',
  'matematicas': '#45B7D1',
  'inglés': '#96CEB4',
  'ingles': '#96CEB4',
  'física': '#FFEAA7',
  'fisica': '#FFEAA7',
  'biología': '#74B9FF',
  'biologia': '#74B9FF',
  'religión': '#DDA15E',
  'religion': '#DDA15E',
  'educación física': '#FD79A8',
  'ed-fisica': '#FD79A8',
  'ciencias': '#6C5CE7',
  'todos': '#A29BFE',
  'default': '#B2BEC3'
};

function normalize(ev) {
  return {
    id: ev.id ?? ev.uid ?? Date.now(),
    date: ev.date || ev.fecha || '',
    title: ev.title || ev.titulo || 'Evento',
    course: ev.course || ev.curso || '',
    type: ev.tipo || ev.type || 'otro',
    place: ev.place || ev.lugar || ''
  };
}

// Función para obtener color basado en título o curso del evento
function getEventColor(event) {
  const searchText = `${event.title} ${event.course}`.toLowerCase();
  
  // Buscar materia específica
  for (const [materia, color] of Object.entries(MATERIA_COLORS)) {
    if (searchText.includes(materia)) {
      return color;
    }
  }
  
  // Eventos especiales
  if (searchText.includes('feriado') || searchText.includes('vacaciones')) return '#95A5A6';
  if (searchText.includes('prueba') || searchText.includes('control') || searchText.includes('evaluación')) return '#E74C3C';
  if (searchText.includes('salida') || searchText.includes('excursión')) return '#F39C12';
  if (searchText.includes('acto') || searchText.includes('celebración')) return '#9B59B6';
  if (searchText.includes('reunión')) return '#E67E22';
  if (searchText.includes('taller')) return '#16A085';
  
  return MATERIA_COLORS.default;
}

// Función para generar hora aleatoria (simulada)
function getEventTime(eventId) {
  const horas = ['08:00', '09:45', '11:30', '14:00', '15:45'];
  const index = eventId % horas.length;
  return horas[index];
}

const CalendarioPruebas = ({ events = [] }) => {
  const listaEventos = Array.isArray(events) ? events.map(normalize) : [];
  const [monthIdx, setMonthIdx] = useState(2); // Marzo por defecto
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const year = new Date().getFullYear();
  
  const { diasMes, primerDiaSemana } = useMemo(() => {
    const primerDia = new Date(year, monthIdx, 1);
    const ultimoDia = new Date(year, monthIdx + 1, 0);
    const days = [];
    
    // Filtrar solo días de semana (Lunes a Viernes)
    for (let i = 1; i <= ultimoDia.getDate(); i++) {
      const dia = new Date(year, monthIdx, i);
      const diaSemana = dia.getDay();
      // 0 = Domingo, 6 = Sábado - excluir
      if (diaSemana !== 0 && diaSemana !== 6) {
        days.push(dia);
      }
    }
    
    // Calcular el primer día (ajustado para comenzar en lunes)
    const primerDiaDelMes = new Date(year, monthIdx, 1);
    let primerDiaSemanaAjustado = primerDiaDelMes.getDay() - 1; // Ajustar para que lunes = 0
    if (primerDiaSemanaAjustado < 0) primerDiaSemanaAjustado = 4; // Si es domingo, ajustar
    
    return { 
      diasMes: days, 
      primerDiaSemana: primerDiaSemanaAjustado
    };
  }, [monthIdx, year]);

  const prevMonth = () => {
    setMonthIdx(prev => prev > 2 ? prev - 1 : 11);
  };

  const nextMonth = () => {
    setMonthIdx(prev => prev < 11 ? prev + 1 : 2);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  // Días vacíos al inicio (solo para días de semana)
  const diasVacios = Array(primerDiaSemana).fill(null);

  return (
    <div className="calendario-container">
      <div className="calendario-header">
        <Button 
          variant="outline-primary" 
          size="sm" 
          onClick={prevMonth}
          className="nav-btn"
        >
          ← Anterior
        </Button>
        <div className="month-display">
          <h2>Calendario Escolar — {MONTHS.find(m=>m.key===monthIdx)?.name || 'Mes'}</h2>
        </div>
        <Button 
          variant="outline-primary" 
          size="sm" 
          onClick={nextMonth}
          className="nav-btn"
        >
          Siguiente →
        </Button>
      </div>

      {/* Encabezados de días de la semana */}
      <div className="dias-semana-header">
        {DIAS_SEMANA.map((dia, idx) => (
          <div key={idx} className="dia-semana-nombre">{dia}</div>
        ))}
      </div>

      <div className="calendario-grid">
        {/* Días vacíos al inicio */}
        {diasVacios.map((_, idx) => (
          <div key={`empty-${idx}`} className="calendario-dia empty"></div>
        ))}
        
        {/* Días del mes (solo lunes a viernes) */}
        {diasMes.map((dia) => {
          const fechaStr = dia.toISOString().split("T")[0];
          const eventosDia = listaEventos.filter(ev => ev.date === fechaStr);
          const esHoy = new Date().toISOString().split("T")[0] === fechaStr;
          
          return (
            <div 
              key={fechaStr} 
              className={`calendario-dia ${esHoy ? 'hoy' : ''}`}
            >
              <span className="dia-numero">{dia.getDate()}</span>
              <div className="eventos-container">
                {eventosDia.map(ev => {
                  const color = getEventColor(ev);
                  return (
                    <div 
                      key={ev.id} 
                      className="evento"
                      style={{ backgroundColor: color }}
                      onClick={() => handleEventClick(ev)}
                      title="Click para ver detalles"
                    >
                      <span className="evento-text">{ev.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Leyenda de colores */}
      <div className="calendario-leyenda">
        <h6>Leyenda de colores:</h6>
        <div className="leyenda-items">
          <div className="leyenda-item"><span className="color-box" style={{backgroundColor: '#FF6B6B'}}></span> Historia</div>
          <div className="leyenda-item"><span className="color-box" style={{backgroundColor: '#4ECDC4'}}></span> Lenguaje</div>
          <div className="leyenda-item"><span className="color-box" style={{backgroundColor: '#45B7D1'}}></span> Matemáticas</div>
          <div className="leyenda-item"><span className="color-box" style={{backgroundColor: '#96CEB4'}}></span> Inglés</div>
          <div className="leyenda-item"><span className="color-box" style={{backgroundColor: '#6C5CE7'}}></span> Ciencias</div>
          <div className="leyenda-item"><span className="color-box" style={{backgroundColor: '#E74C3C'}}></span> Pruebas</div>
          <div className="leyenda-item"><span className="color-box" style={{backgroundColor: '#F39C12'}}></span> Salidas</div>
          <div className="leyenda-item"><span className="color-box" style={{backgroundColor: '#9B59B6'}}></span> Actos</div>
        </div>
      </div>

      {/* Modal con detalles del evento */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton style={{backgroundColor: selectedEvent ? getEventColor(selectedEvent) : '#fff', color: 'white'}}>
          <Modal.Title>📅 Detalles del Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <div className="event-details">
              <h5 className="mb-3">{selectedEvent.title}</h5>
              <div className="detail-row">
                <strong>📆 Fecha:</strong>
                <span>{new Date(selectedEvent.date + 'T00:00:00').toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="detail-row">
                <strong>🕐 Hora:</strong>
                <span>{getEventTime(selectedEvent.id)}</span>
              </div>
              {selectedEvent.course && (
                <div className="detail-row">
                  <strong>📚 Curso/Materia:</strong>
                  <span>{selectedEvent.course}</span>
                </div>
              )}
              {selectedEvent.place && (
                <div className="detail-row">
                  <strong>📍 Lugar:</strong>
                  <span>{selectedEvent.place}</span>
                </div>
              )}
              <div className="detail-row">
                <strong>🏷️ Tipo:</strong>
                <span className="badge" style={{backgroundColor: getEventColor(selectedEvent), color: 'white', padding: '4px 8px', borderRadius: '4px'}}>
                  {selectedEvent.type}
                </span>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CalendarioPruebas;
