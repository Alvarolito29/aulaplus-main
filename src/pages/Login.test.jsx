import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

// Mocks
jest.mock('../services/AuthService');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

import Login from './Login';
import AuthService from '../services/AuthService';

describe('Login Component - Pruebas Unitarias', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza correctamente el formulario de login', () => {
    render(<Login />);

    expect(screen.getByRole('heading', { name: /🎓 AulaPlus/i })).toBeInTheDocument();
    expect(screen.getByText(/Sistema de Gestión Escolar/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument();
  });

  test('muestra botones de usuarios de prueba', () => {
    render(<Login />);

    expect(screen.getByRole('button', { name: /👨‍🎓 Estudiante/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /👨‍🏫 Profesor/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /👨‍👩‍👧 Apoderado/i })).toBeInTheDocument();
  });

  test('valida email inválido y muestra error', async () => {
    render(<Login />);

    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);

    await userEvent.type(emailInput, 'correo-invalido');
    await userEvent.click(passwordInput); // Trigger blur

    expect(await screen.findByText(/Formato de email inválido/i)).toBeInTheDocument();
  });

  test('valida contraseña corta y muestra error', async () => {
    render(<Login />);

    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);

    await userEvent.type(emailInput, 'test@test.com');
    await userEvent.type(passwordInput, '12');
    await userEvent.tab(); // Trigger blur on password

    expect(await screen.findByText(/debe tener al menos 3 caracteres/i)).toBeInTheDocument();
  });

  test('login exitoso con estudiante redirige correctamente', async () => {
    AuthService.login.mockResolvedValue({
      usuario: { rol: 'ESTUDIANTE', nombre: 'Test Student' },
      token: 'fake-token',
    });

    render(<Login />);

    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });

    await userEvent.type(emailInput, 'estudiante@test.com');
    await userEvent.type(passwordInput, '123456');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(AuthService.login).toHaveBeenCalledWith('estudiante@test.com', '123456');
      expect(mockNavigate).toHaveBeenCalledWith('/estudiantes');
    });
  });

  test('login exitoso con profesor redirige correctamente', async () => {
    AuthService.login.mockResolvedValue({
      usuario: { rol: 'PROFESOR', nombre: 'Test Professor' },
      token: 'fake-token',
    });

    render(<Login />);

    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });

    await userEvent.type(emailInput, 'profesor@test.com');
    await userEvent.type(passwordInput, '123456');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/profesores');
    });
  });

  test('login fallido muestra mensaje de error', async () => {
    AuthService.login.mockRejectedValue(new Error('Email o contraseña incorrectos'));

    render(<Login />);

    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });

    await userEvent.type(emailInput, 'wrong@test.com');
    await userEvent.type(passwordInput, 'wrongpass');
    await userEvent.click(submitButton);

    expect(await screen.findByText(/Email o contraseña incorrectos/i)).toBeInTheDocument();
  });

  test('botón "Estudiante" rellena el formulario correctamente', async () => {
    render(<Login />);

    const estudianteButton = screen.getByRole('button', { name: /👨‍🎓 Estudiante/i });
    await userEvent.click(estudianteButton);

    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);

    expect(emailInput).toHaveValue('estudiante@test.com');
    expect(passwordInput).toHaveValue('123');
  });

  test('deshabilita el botón submit mientras carga', async () => {
    AuthService.login.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    );

    render(<Login />);

    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });

    await userEvent.type(emailInput, 'test@test.com');
    await userEvent.type(passwordInput, '12345');
    await userEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/Iniciando sesión.../i)).toBeInTheDocument();
  });

  test('muestra feedback visual cuando los campos son válidos', async () => {
    render(<Login />);

    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);

    await userEvent.type(emailInput, 'test@test.com');
    await userEvent.tab();

    await userEvent.type(passwordInput, '123456');
    await userEvent.tab();

    expect(await screen.findByText(/✓ Email válido/i)).toBeInTheDocument();
    expect(await screen.findByText(/✓ Contraseña ingresada/i)).toBeInTheDocument();
  });
});
