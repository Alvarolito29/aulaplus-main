import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const usuarioString = localStorage.getItem('usuario');
  const token = localStorage.getItem('token');

  // Si no hay usuario o token, redirigir al login
  if (!usuarioString || !token) {
    return <Navigate to="/login" replace />;
  }

  const usuario = JSON.parse(usuarioString);

  // Si hay roles permitidos, verificar que el usuario tenga uno de esos roles
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = usuario.rol?.toUpperCase();
    const hasPermission = allowedRoles.some(role => 
      userRole === role.toUpperCase()
    );

    if (!hasPermission) {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
