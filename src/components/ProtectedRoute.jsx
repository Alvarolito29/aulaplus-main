import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const token = localStorage.getItem('token');

  // Si no hay usuario o token, redirigir al login
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay roles permitidos, verificar que el usuario tenga uno de esos roles
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user.rol?.toLowerCase();
    const hasPermission = allowedRoles.some(role => 
      userRole === role.toLowerCase() || userRole === role
    );

    if (!hasPermission) {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
