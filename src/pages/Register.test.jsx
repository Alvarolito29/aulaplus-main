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

import Register from './Register';
import AuthService from '../services/AuthService';

describe('Register Component - Pruebas Unitarias', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza correctamente el formulario de registro', () => {
    const { container } = render(<Register />);

    expect(screen.getByRole('heading', { name: /📝 Crear Cuenta/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre Completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tipo de Usuario/i)).toBeInTheDocument();
    expect(container.querySelector('#password')).toBeInTheDocument();
    expect(container.querySelector('#confirmPassword')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /✅ Crear Cuenta/i })).toBeInTheDocument();
  });

  test('valida que el nombre solo contenga letras', async () => {
    render(<Register />);

    const nombreInput = screen.getByLabelText(/Nombre Completo/i);

    await userEvent.type(nombreInput, 'Juan123');
    await userEvent.tab(); // Trigger blur

    expect(await screen.findByText(/El nombre solo puede contener letras/i)).toBeInTheDocument();
  });

  test('valida que el nombre tenga al menos 3 caracteres', async () => {
    render(<Register />);

    const nombreInput = screen.getByLabelText(/Nombre Completo/i);

    await userEvent.type(nombreInput, 'Jo');
    await userEvent.tab();

    expect(await screen.findByText(/debe tener al menos 3 caracteres/i)).toBeInTheDocument();
  });

  test('valida formato de email', async () => {
    render(<Register />);

    const emailInput = screen.getByLabelText(/Correo Electrónico/i);

    await userEvent.type(emailInput, 'correo-invalido');
    await userEvent.tab();

    expect(await screen.findByText(/Email inválido/i)).toBeInTheDocument();
  });

  test('valida que la contraseña tenga al menos 8 caracteres', async () => {
    const { container } = render(<Register />);

    const passwordInput = container.querySelector('#password');

    await userEvent.type(passwordInput, 'Ab1!');
    await userEvent.tab();

    expect(await screen.findByText(/Mínimo 8 caracteres/i)).toBeInTheDocument();
  });

  test('valida que la contraseña incluya mayúscula', async () => {
    const { container } = render(<Register />);

    const passwordInput = container.querySelector('#password');

    await userEvent.type(passwordInput, 'password123!');
    await userEvent.tab();

    expect(await screen.findByText(/Debe incluir al menos una mayúscula/i)).toBeInTheDocument();
  });

  test('valida que la contraseña incluya minúscula', async () => {
    const { container } = render(<Register />);

    const passwordInput = container.querySelector('#password');

    await userEvent.type(passwordInput, 'PASSWORD123!');
    await userEvent.tab();

    expect(await screen.findByText(/Debe incluir al menos una minúscula/i)).toBeInTheDocument();
  });

  test('valida que la contraseña incluya número', async () => {
    const { container } = render(<Register />);

    const passwordInput = container.querySelector('#password');

    await userEvent.type(passwordInput, 'Password!');
    await userEvent.tab();

    expect(await screen.findByText(/Debe incluir al menos un número/i)).toBeInTheDocument();
  });

  test('valida que la contraseña incluya símbolo', async () => {
    const { container } = render(<Register />);

    const passwordInput = container.querySelector('#password');

    await userEvent.type(passwordInput, 'Password123');
    await userEvent.tab();

    expect(await screen.findByText(/Debe incluir al menos un símbolo/i)).toBeInTheDocument();
  });

  test('valida que las contraseñas coincidan', async () => {
    const { container } = render(<Register />);

    const passwordInput = container.querySelector('#password');
    const confirmInput = container.querySelector('#confirmPassword');

    await userEvent.type(passwordInput, 'Password123!');
    await userEvent.type(confirmInput, 'Password456!');
    await userEvent.tab();

    expect(await screen.findByText(/❌ Las contraseñas no coinciden/i)).toBeInTheDocument();
  });

  test('muestra feedback positivo cuando todos los campos son válidos', async () => {
    const { container } = render(<Register />);

    const nombreInput = screen.getByLabelText(/Nombre Completo/i);
    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = container.querySelector('#password');
    const confirmInput = container.querySelector('#confirmPassword');

    await userEvent.type(nombreInput, 'Juan Pérez');
    await userEvent.tab();
    await userEvent.type(emailInput, 'juan@test.com');
    await userEvent.tab();
    await userEvent.type(passwordInput, 'Password123!');
    await userEvent.tab();
    await userEvent.type(confirmInput, 'Password123!');
    await userEvent.tab();

    expect(await screen.findByText(/✓ Nombre válido/i)).toBeInTheDocument();
    expect(await screen.findByText(/✓ Email válido/i)).toBeInTheDocument();
    expect(await screen.findByText(/✓ Contraseña segura/i)).toBeInTheDocument();
    expect(await screen.findByText(/✓ Las contraseñas coinciden/i)).toBeInTheDocument();
  });

  test('registro exitoso redirige al estudiante correctamente', async () => {
    AuthService.register.mockResolvedValue({
      usuario: { rol: 'ESTUDIANTE', nombre: 'Juan Pérez' },
      token: 'fake-token',
    });

    const { container } = render(<Register />);

    const nombreInput = screen.getByLabelText(/Nombre Completo/i);
    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = container.querySelector('#password');
    const confirmInput = container.querySelector('#confirmPassword');
    const submitButton = screen.getByRole('button', { name: /✅ Crear Cuenta/i });

    await userEvent.type(nombreInput, 'Juan Pérez');
    await userEvent.type(emailInput, 'juan@test.com');
    await userEvent.type(passwordInput, 'Password123!');
    await userEvent.type(confirmInput, 'Password123!');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(AuthService.register).toHaveBeenCalledWith(
        'juan@test.com',
        'Password123!',
        'Juan Pérez',
        'ESTUDIANTE'
      );
      expect(mockNavigate).toHaveBeenCalledWith('/estudiantes');
    });
  });

  test('registro fallido muestra mensaje de error', async () => {
    AuthService.register.mockRejectedValue(new Error('Email ya registrado'));

    const { container } = render(<Register />);

    const nombreInput = screen.getByLabelText(/Nombre Completo/i);
    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = container.querySelector('#password');
    const confirmInput = container.querySelector('#confirmPassword');
    const submitButton = screen.getByRole('button', { name: /✅ Crear Cuenta/i });

    await userEvent.type(nombreInput, 'Juan Pérez');
    await userEvent.type(emailInput, 'juan@test.com');
    await userEvent.type(passwordInput, 'Password123!');
    await userEvent.type(confirmInput, 'Password123!');
    await userEvent.click(submitButton);

    expect(await screen.findByText(/Email ya registrado/i)).toBeInTheDocument();
  });

  test('deshabilita el botón submit mientras carga', async () => {
    AuthService.register.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    );

    const { container } = render(<Register />);

    const nombreInput = screen.getByLabelText(/Nombre Completo/i);
    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = container.querySelector('#password');
    const confirmInput = container.querySelector('#confirmPassword');
    const submitButton = screen.getByRole('button', { name: /✅ Crear Cuenta/i });

    await userEvent.type(nombreInput, 'Juan Pérez');
    await userEvent.type(emailInput, 'juan@test.com');
    await userEvent.type(passwordInput, 'Password123!');
    await userEvent.type(confirmInput, 'Password123!');
    await userEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/⏳ Registrando.../i)).toBeInTheDocument();
  });

  test('no envía el formulario si hay errores de validación', async () => {
    render(<Register />);

    const submitButton = screen.getByRole('button', { name: /✅ Crear Cuenta/i });

    await userEvent.click(submitButton);

    expect(await screen.findByText(/⚠️ Por favor corrige los errores/i)).toBeInTheDocument();
    expect(AuthService.register).not.toHaveBeenCalled();
  });
});

