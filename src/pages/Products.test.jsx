import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Products from './Products';

describe('Componente Products', () => {
  test('se monta y muestra el título y el buscador', () => {
    render(<Products />);
    expect(screen.getByRole('heading', { level: 1, name: /cursos/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/buscar por profesor o colegio/i)).toBeInTheDocument();
  });

  test('renderiza todas las tarjetas de curso', () => {
    render(<Products />);
    const courseHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(courseHeadings).toHaveLength(2);
    expect(screen.getByText(/Matemáticas 1° Medio/i)).toBeInTheDocument();
    expect(screen.getByText(/Lenguaje 2° Medio/i)).toBeInTheDocument();
  });

  test('filtra por profesor/colegio desde el buscador', async () => {
    render(<Products />);
    const input = screen.getByPlaceholderText(/buscar por profesor o colegio/i);

    // Versión legacy (sin setup)
    await userEvent.type(input, 'Carlos');

    expect(screen.getByText(/Lenguaje 2° Medio/i)).toBeInTheDocument();
    expect(screen.queryByText(/Matemáticas 1° Medio/i)).not.toBeInTheDocument();
  });

  test('muestra la sección de evaluaciones y sus ítems', () => {
    render(<Products />);
    const evalHeadings = screen.getAllByRole('heading', { level: 4, name: /evaluaciones/i });
    expect(evalHeadings).toHaveLength(2);

    expect(screen.getByText(/Prueba Unidad 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Trabajo Integrador/i)).toBeInTheDocument();
    expect(screen.getByText(/Lectura Comprensiva/i)).toBeInTheDocument();
  });
});
